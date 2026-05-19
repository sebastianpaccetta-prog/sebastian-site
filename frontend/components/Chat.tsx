"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, FileText, User as UserIcon } from "lucide-react";

type Source = { source: string; page?: number; snippet?: string };

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

const SUGGESTED = [
  "Is Sebastian good at consulting?",
  "What did he do at 180 Degrees Consulting?",
  "Tell me about his Purdue experience.",
  "What are his strongest operational skills?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Sebastian's AI assistant. I've read his resume, career deck, and every consulting project he's led. Ask me anything about his background.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(content: string) {
    if (!content.trim() || loading) return;

    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Request failed: ${res.status}`);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer ?? "I'm not sure how to answer that yet.",
          sources: data.sources ?? [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, something went wrong. ${err instanceof Error ? err.message : "Unknown error."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-bg-line bg-white shadow-soft overflow-hidden flex flex-col h-[70vh] min-h-[520px]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-bg-line flex items-center justify-between bg-bg-alt">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-ink-500">
            Ask My AI · trained on Sebastian&apos;s docs
          </span>
        </div>
        <Sparkles size={14} className="text-accent" />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {messages.map((m, i) => (
          <Bubble key={i} message={m} />
        ))}
        {loading && (
          <div className="flex items-start gap-3">
            <Avatar role="assistant" />
            <div className="rounded-2xl rounded-tl-sm bg-bg-alt px-4 py-3 text-ink-700 text-sm">
              <span className="cursor-blink">Thinking</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested */}
      {messages.length <= 1 && (
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-bg-line bg-white text-ink-700 hover:border-accent hover:text-accent transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-bg-line p-3 flex items-center gap-2 bg-white"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Sebastian's background..."
          className="flex-1 px-4 py-3 rounded-full bg-bg-alt border border-transparent focus:border-accent text-sm placeholder:text-ink-300 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="h-11 w-11 rounded-full bg-accent text-ink-900 hover:bg-accent-hover hover:text-white flex items-center justify-center transition-colors disabled:opacity-40"
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

function Avatar({ role }: { role: "user" | "assistant" }) {
  if (role === "user") {
    return (
      <div className="h-8 w-8 rounded-full bg-ink-900 text-white flex items-center justify-center shrink-0">
        <UserIcon size={14} />
      </div>
    );
  }
  return (
    <div className="h-8 w-8 rounded-full bg-accent text-ink-900 flex items-center justify-center shrink-0 font-display text-sm font-bold">
      S
    </div>
  );
}

function Bubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar role={message.role} />
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-ink-900 text-white rounded-2xl rounded-tr-sm"
              : "bg-bg-alt text-ink-900 rounded-2xl rounded-tl-sm"
          }`}
        >
          {message.content}
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.sources.map((s, i) => (
              <span
                key={i}
                title={s.snippet}
                className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.14em] text-ink-500 bg-white border border-bg-line rounded-full px-2 py-1"
              >
                <FileText size={10} className="text-accent" />
                {s.source}
                {s.page ? ` · p.${s.page}` : ""}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
