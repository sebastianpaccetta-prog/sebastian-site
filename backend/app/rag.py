"""
Retrieval-augmented generation pipeline.

The flow:
  1. User question (+ optional history) comes in.
  2. We retrieve the top-K most relevant chunks from Chroma.
  3. We assemble a system prompt that:
       - tells the model it's Sebastian's assistant,
       - injects the retrieved context with source/page tags,
       - instructs it to ground every claim in the sources and abstain
         when sources don't cover the question.
  4. We call the chat model and return the answer plus structured sources.

Swap providers by replacing ChatOpenAI / OpenAIEmbeddings.
"""

from __future__ import annotations

from typing import Any

from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma

from .config import settings


SYSTEM_TEMPLATE = """You are Sebastian's personal AI assistant on his portfolio website.

You answer questions about Sebastian's background using ONLY the context below, which is drawn from his resume, his career deck, and the consulting project reports he has led at 180 Degrees Consulting.

Rules:
- Speak in third person about Sebastian (e.g. "Sebastian led..."), in a confident, conversational tone.
- Ground every factual claim in the provided context. Don't invent roles, dates, employers, or accomplishments.
- If the context doesn't contain enough to answer, say so plainly and suggest the visitor check the relevant section of the site or use the contact page.
- Be concise. Default to 2 to 5 sentences. Use a short bullet list only when the user asks for a list or comparison.
- When you reference something specific, you may briefly cite the source inline like "(resume)" or "(career deck, slide 3)" — keep it light, not academic.

Context:
{context}
"""


def _format_context(docs: list[Document]) -> str:
    lines: list[str] = []
    for i, d in enumerate(docs, start=1):
        src = d.metadata.get("source", "unknown")
        page = d.metadata.get("page")
        tag = f"{src}" + (f" · page {page}" if page else "")
        lines.append(f"[{i}] {tag}\n{d.page_content.strip()}")
    return "\n\n---\n\n".join(lines) if lines else "(no relevant context retrieved)"


def _format_history(history: list[dict[str, str]]) -> list[dict[str, str]]:
    """
    Convert prior chat turns into the LangChain message format.
    We only keep user/assistant turns; system goes in separately.
    """
    out = []
    for m in history:
        role = m.get("role")
        content = (m.get("content") or "").strip()
        if not content:
            continue
        if role in ("user", "assistant"):
            out.append({"role": role, "content": content})
    # Keep history bounded so context doesn't blow up
    return out[-8:]


class RAG:
    """Lightweight wrapper. Retrieves, formats, generates, returns."""

    def __init__(self) -> None:
        self.embeddings = OpenAIEmbeddings(
            model=settings.embed_model,
            api_key=settings.openai_api_key,
        )
        self.vectorstore = Chroma(
            collection_name="sebastian_docs",
            embedding_function=self.embeddings,
            persist_directory=settings.chroma_dir,
        )
        self.llm = ChatOpenAI(
            model=settings.chat_model,
            api_key=settings.openai_api_key,
            temperature=0.2,
        )

    def retrieve(self, query: str, k: int | None = None) -> list[Document]:
        return self.vectorstore.similarity_search(query, k=k or settings.top_k)

    def answer(
        self,
        question: str,
        history: list[dict[str, str]] | None = None,
    ) -> dict[str, Any]:
        history = history or []
        docs = self.retrieve(question)

        system = SYSTEM_TEMPLATE.format(context=_format_context(docs))
        messages: list[dict[str, str]] = [{"role": "system", "content": system}]
        messages.extend(_format_history(history))
        messages.append({"role": "user", "content": question})

        resp = self.llm.invoke(messages)
        text = resp.content if isinstance(resp.content, str) else str(resp.content)

        # Build a deduplicated, structured source list for the UI.
        seen: set[tuple[str, int | None]] = set()
        sources: list[dict[str, Any]] = []
        for d in docs:
            key = (d.metadata.get("source", "unknown"), d.metadata.get("page"))
            if key in seen:
                continue
            seen.add(key)
            snippet = d.page_content.strip().replace("\n", " ")
            if len(snippet) > 220:
                snippet = snippet[:217] + "..."
            sources.append(
                {
                    "source": key[0],
                    "page": key[1],
                    "snippet": snippet,
                }
            )

        return {"answer": text.strip(), "sources": sources}


# Singleton-style accessor; FastAPI will call this once on startup.
_rag: RAG | None = None


def get_rag() -> RAG:
    global _rag
    if _rag is None:
        _rag = RAG()
    return _rag
