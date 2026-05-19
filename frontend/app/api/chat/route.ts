import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

export const runtime = "nodejs";

const SYSTEM_TEMPLATE = `You are Sebastian's personal AI assistant on his portfolio website.

You answer questions about Sebastian's background using ONLY the context below, which is drawn from his resume, his career deck, and the consulting project reports he has led at 180 Degrees Consulting.

Rules:
- Speak in third person about Sebastian (e.g. "Sebastian led..."), in a confident, conversational tone.
- Ground every factual claim in the provided context. Don't invent roles, dates, employers, or accomplishments.
- If the context doesn't contain enough to answer, say so plainly and suggest the visitor check the relevant section of the site or use the contact page.
- Be concise. Default to 2 to 5 sentences. Use a short bullet list only when the user asks for a list or comparison.
- When you reference something specific, you may briefly cite the source inline like "(resume)" or "(career deck, slide 3)" — keep it light, not academic.

Context:
{context}`;

function formatContext(matches: { metadata?: Record<string, unknown> }[]): string {
  if (!matches.length) return "(no relevant context retrieved)";
  return matches
    .map((m, i) => {
      const src = (m.metadata?.source as string) ?? "unknown";
      const page = m.metadata?.page as number | undefined;
      const tag = page ? `${src} · page ${page}` : src;
      return `[${i + 1}] ${tag}\n${(m.metadata?.text as string) ?? ""}`;
    })
    .join("\n\n---\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: { role: string; content: string }[] = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages[] required" }, { status: 400 });
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      return NextResponse.json({ error: "no user message" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const index = pinecone.index(process.env.PINECONE_INDEX ?? "sebastian-docs");

    // Embed the question
    const embedRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: lastUser.content,
    });
    const queryVector = embedRes.data[0].embedding;

    // Retrieve from Pinecone
    const queryRes = await index.query({
      vector: queryVector,
      topK: 5,
      includeMetadata: true,
    });
    const matches = queryRes.matches ?? [];

    // Build context + chat messages
    const context = formatContext(matches);
    const history = messages
      .slice(0, -1)
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-8);

    const chatRes = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: SYSTEM_TEMPLATE.replace("{context}", context) },
        ...history,
        { role: "user", content: lastUser.content },
      ],
    });

    const answer = chatRes.choices[0].message.content ?? "";

    // Deduplicated sources
    const seen = new Set<string>();
    const sources: { source: string; page: number | null; snippet: string }[] = [];
    for (const m of matches) {
      const key = `${m.metadata?.source}::${m.metadata?.page ?? ""}`;
      if (seen.has(key)) continue;
      seen.add(key);
      let snippet = ((m.metadata?.text as string) ?? "").replace(/\n/g, " ").trim();
      if (snippet.length > 220) snippet = snippet.slice(0, 217) + "...";
      sources.push({
        source: (m.metadata?.source as string) ?? "unknown",
        page: (m.metadata?.page as number) ?? null,
        snippet,
      });
    }

    return NextResponse.json({ answer: answer.trim(), sources });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown error" },
      { status: 500 }
    );
  }
}
