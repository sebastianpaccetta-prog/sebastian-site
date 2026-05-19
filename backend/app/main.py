"""FastAPI server exposing the RAG pipeline at /chat."""

from __future__ import annotations

from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .config import settings
from .rag import get_rag

app = FastAPI(title="Sebastian RAG", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


class ChatTurn(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=2000)
    history: list[ChatTurn] = Field(default_factory=list)


class Source(BaseModel):
    source: str
    page: int | None = None
    snippet: str | None = None


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]


@app.get("/health")
def health() -> dict[str, Any]:
    return {"ok": True, "model": settings.chat_model}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    if not settings.openai_api_key:
        raise HTTPException(
            status_code=500,
            detail="OPENAI_API_KEY is not configured on the backend.",
        )
    try:
        rag = get_rag()
        result = rag.answer(
            question=req.question,
            history=[t.model_dump() for t in req.history],
        )
        return ChatResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
