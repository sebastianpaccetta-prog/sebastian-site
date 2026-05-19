# Sebastian — Personal Brand Site + RAG Assistant

A minimalist personal brand site for Sebastian with an AI assistant ("Ask My AI") powered by a RAG pipeline over his resume, career deck, and 180 Degrees Consulting project reports.

## Stack

**Frontend** — Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
**Backend (RAG)** — Python 3.11, FastAPI, LangChain, ChromaDB, OpenAI (swap for Anthropic if preferred)
**Deploy targets** — Frontend on Vercel, backend on Render / Fly.io / Railway / your own VPS

## Project structure

```
sebastian-site/
├── frontend/                    # Next.js app
│   ├── app/
│   │   ├── layout.tsx           # Root layout, fonts, nav, footer
│   │   ├── page.tsx             # Homepage / hero
│   │   ├── about/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── ask/page.tsx         # Ask My AI chat UI
│   │   ├── api/
│   │   │   ├── chat/route.ts    # Proxy to Python RAG backend
│   │   │   └── contact/route.ts # Contact form submission
│   │   └── globals.css
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Chat.tsx
│   ├── lib/
│   │   └── data.ts              # Project data (portfolio entries)
│   ├── public/                  # Headshots, project photos, PDFs
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.local.example
│
├── backend/                     # Python RAG service
│   ├── app/
│   │   ├── main.py              # FastAPI app + /chat endpoint
│   │   ├── ingest.py            # PDF + PPTX ingestion script
│   │   ├── rag.py               # Retrieval + generation pipeline
│   │   └── config.py
│   ├── data/
│   │   ├── source/              # Drop PDFs / PPTX here
│   │   └── chroma/              # Vector DB persisted here
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

## Quickstart

### 1. Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # set NEXT_PUBLIC_RAG_URL etc.
npm run dev                         # http://localhost:3000
```

### 2. Backend (RAG service)

```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env                # set OPENAI_API_KEY

# Drop source documents into backend/data/source/
#   - resume.pdf
#   - career-deck.pptx
#   - 180dc-project-1.pdf ... 180dc-project-8.pdf

python -m app.ingest                # builds the vector store
uvicorn app.main:app --reload --port 8000
```

The frontend's `/api/chat` route proxies to `http://localhost:8000/chat`.

## Adding new source documents

Drop new PDFs or PPTX files into `backend/data/source/` and re-run `python -m app.ingest`. Ingestion is idempotent per filename.
