import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const RAG_URL = process.env.RAG_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages[] required" },
        { status: 400 }
      );
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      return NextResponse.json(
        { error: "no user message" },
        { status: 400 }
      );
    }

    const upstream = await fetch(`${RAG_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: lastUser.content,
        history: messages.slice(0, -1),
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return NextResponse.json(
        { error: `RAG service error: ${upstream.status} ${errText}` },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown error" },
      { status: 500 }
    );
  }
}
