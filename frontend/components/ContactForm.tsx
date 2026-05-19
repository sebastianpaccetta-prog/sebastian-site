"use client";

import { useState } from "react";
import Button from "./Button";
import { Check, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <div>
        <label className="block text-xs font-mono uppercase tracking-[0.18em] text-ink-500 mb-2">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-xl border border-bg-line bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-accent transition-colors"
          placeholder="What's on your mind?"
        />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <Button
          type="submit"
          variant="primary"
          disabled={status === "submitting"}
          arrow
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </Button>

        {status === "success" && (
          <span className="inline-flex items-center gap-2 text-sm text-accent">
            <Check size={16} /> Sent. I&apos;ll get back to you soon.
          </span>
        )}
        {status === "error" && (
          <span className="inline-flex items-center gap-2 text-sm text-red-600">
            <AlertCircle size={16} /> {error}
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-[0.18em] text-ink-500 mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-bg-line bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-accent transition-colors"
      />
    </div>
  );
}
