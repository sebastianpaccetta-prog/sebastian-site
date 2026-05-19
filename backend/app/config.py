"""Centralized configuration loaded from environment variables."""

import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()


@dataclass
class Settings:
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    data_dir: str = os.getenv("DATA_DIR", "./data/source")
    chroma_dir: str = os.getenv("CHROMA_DIR", "./data/chroma")
    chunk_size: int = int(os.getenv("CHUNK_SIZE", "900"))
    chunk_overlap: int = int(os.getenv("CHUNK_OVERLAP", "120"))
    top_k: int = int(os.getenv("TOP_K", "5"))
    embed_model: str = os.getenv("EMBED_MODEL", "text-embedding-3-small")
    chat_model: str = os.getenv("CHAT_MODEL", "gpt-4o-mini")
    allowed_origins: list[str] = None  # type: ignore

    def __post_init__(self):
        raw = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
        self.allowed_origins = [o.strip() for o in raw.split(",") if o.strip()]


settings = Settings()
