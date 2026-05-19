"""
Ingestion script — chunks documents and uploads embeddings to Pinecone.

Run once locally after adding/changing files in data/source:
    python -m app.ingest
"""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Iterable

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from pinecone import Pinecone, ServerlessSpec
from pptx import Presentation

from .config import settings

SUPPORTED_EXT = {".pdf", ".pptx"}
EMBEDDING_DIM = 1536  # text-embedding-3-small default


def load_pdf(path: Path) -> list[Document]:
    loader = PyPDFLoader(str(path))
    docs = loader.load()
    for d in docs:
        d.metadata["source"] = path.name
        d.metadata["doc_type"] = "pdf"
        if "page" in d.metadata:
            d.metadata["page"] = int(d.metadata["page"]) + 1
    return docs


def load_pptx(path: Path) -> list[Document]:
    prs = Presentation(str(path))
    docs: list[Document] = []
    for idx, slide in enumerate(prs.slides, start=1):
        parts: list[str] = []
        title = ""
        for shape in slide.shapes:
            if not shape.has_text_frame:
                continue
            text = "\n".join(
                run.text
                for paragraph in shape.text_frame.paragraphs
                for run in paragraph.runs
                if run.text
            ).strip()
            if not text:
                continue
            if shape == slide.shapes.title and not title:
                title = text
            else:
                parts.append(text)
        notes = ""
        if slide.has_notes_slide and slide.notes_slide.notes_text_frame:
            notes = slide.notes_slide.notes_text_frame.text.strip()
        body = "\n".join(parts).strip()
        if not (title or body or notes):
            continue
        full = ""
        if title:
            full += f"# {title}\n\n"
        if body:
            full += body + "\n\n"
        if notes:
            full += f"[Speaker notes]\n{notes}"
        docs.append(
            Document(
                page_content=full.strip(),
                metadata={"source": path.name, "doc_type": "pptx", "page": idx},
            )
        )
    return docs


def load_one(path: Path) -> list[Document]:
    if path.suffix.lower() == ".pdf":
        return load_pdf(path)
    if path.suffix.lower() == ".pptx":
        return load_pptx(path)
    raise ValueError(f"Unsupported file: {path}")


def chunk_documents(docs: Iterable[Document]) -> list[Document]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
        separators=["\n\n", "\n", ". ", " ", ""],
    )
    return splitter.split_documents(list(docs))


def get_index():
    pc = Pinecone(api_key=settings.pinecone_api_key)
    existing = [i.name for i in pc.list_indexes()]
    if settings.pinecone_index not in existing:
        pc.create_index(
            name=settings.pinecone_index,
            dimension=EMBEDDING_DIM,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
        print(f"Created Pinecone index '{settings.pinecone_index}'")
    return pc.Index(settings.pinecone_index)


def main() -> int:
    if not settings.openai_api_key:
        print("ERROR: OPENAI_API_KEY is not set.")
        return 1
    if not settings.pinecone_api_key:
        print("ERROR: PINECONE_API_KEY is not set.")
        return 1

    data_dir = Path(settings.data_dir)
    if not data_dir.exists():
        print(f"ERROR: {data_dir} does not exist.")
        return 1

    files = sorted(
        p for p in data_dir.iterdir()
        if p.is_file() and p.suffix.lower() in SUPPORTED_EXT
    )
    if not files:
        print(f"No PDF or PPTX files found in {data_dir}.")
        return 0

    index = get_index()
    embeddings = OpenAIEmbeddings(
        model=settings.embed_model,
        api_key=settings.openai_api_key,
    )
    total_chunks = 0

    for path in files:
        print(f"→ {path.name}")
        try:
            index.delete(filter={"source": path.name})
        except Exception as e:
            print(f"  (warn) could not delete existing vectors: {e}")

        try:
            raw = load_one(path)
        except Exception as e:
            print(f"  (skip) failed to load: {e}")
            continue

        chunks = chunk_documents(raw)
        if not chunks:
            print("  (skip) no chunks produced")
            continue

        texts = [c.page_content for c in chunks]
        vectors = embeddings.embed_documents(texts)

        batch = []
        for i, (chunk, vector) in enumerate(zip(chunks, vectors)):
            meta: dict = {
                "text": chunk.page_content[:2000],
                "source": chunk.metadata.get("source", path.name),
            }
            page = chunk.metadata.get("page")
            if page is not None:
                meta["page"] = page
            batch.append({"id": f"{path.stem}_{i}", "values": vector, "metadata": meta})
            if len(batch) >= 100:
                index.upsert(vectors=batch)
                batch = []

        if batch:
            index.upsert(vectors=batch)

        total_chunks += len(chunks)
        print(f"  + {len(chunks)} chunks uploaded")

    print(f"\nDone. {total_chunks} chunks across {len(files)} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
