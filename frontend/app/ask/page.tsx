import Chat from "@/components/Chat";

export const metadata = {
  title: "Ask My AI — Sebastian",
  description:
    "An AI assistant trained on Sebastian's resume, career deck, and consulting projects. Ask anything about his background.",
};

export default function Ask() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-16 md:pt-20 pb-20">
      <p className="eyebrow">Ask My AI</p>
      <h1 className="h-display text-4xl md:text-6xl mt-5 leading-[1.05]">
        The fastest way to get to know me.
      </h1>
      <p className="mt-5 max-w-prose2 text-ink-500 leading-relaxed">
        This assistant has read my resume, my career deck, and the eight
        project reports I&apos;ve led at 180 Degrees Consulting. It cites its
        sources, so you can trust the answers.
      </p>

      <div className="mt-10">
        <Chat />
      </div>

      <p className="mt-6 text-xs font-mono text-ink-500 max-w-prose2">
        Note: answers are generated from my own documents using a
        retrieval-augmented pipeline. The model only speaks from sources it
        was given. If a question goes outside that scope, it will say so.
      </p>
    </section>
  );
}
