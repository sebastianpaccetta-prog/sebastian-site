import Link from "next/link";
import { Mail, Linkedin, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Sebastian",
  description:
    "Get in touch with Sebastian. Email, LinkedIn, or send a message directly.",
};

export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-24">
      <p className="eyebrow">Contact</p>
      <h1 className="h-display text-5xl md:text-7xl mt-5 leading-[1.02]">
        Let&apos;s talk.
      </h1>
      <p className="mt-6 max-w-prose2 text-ink-500 text-lg">
        Have a project, role, or idea? The fastest way to reach me is the
        form below. I usually reply within a day or two.
      </p>

      <div className="mt-14 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <ContactForm />
        </div>

        <aside className="md:col-span-5 md:border-l md:border-bg-line md:pl-12 space-y-8">
          <ContactRow
            icon={<Mail size={18} />}
            label="Email"
            value="sebastian@example.com"
            href="mailto:sebastian@example.com"
          />

          <div>
            <p className="eyebrow">Social</p>
            <Link
              href="https://www.linkedin.com/in/your-handle"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 rounded-full bg-ink-900 text-white px-5 py-3 text-sm font-medium hover:bg-accent hover:text-ink-900 transition-colors"
            >
              <Linkedin size={16} />
              Connect on LinkedIn
            </Link>
          </div>

          <ContactRow
            icon={<MapPin size={18} />}
            label="Based in"
            value="West Lafayette, Indiana"
          />

          <div className="rounded-xl bg-accent-soft border border-accent/20 p-5">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-accent">
              Tip
            </p>
            <p className="mt-2 text-sm text-ink-700 leading-relaxed">
              If you have a quick question about my background, my AI
              assistant on{" "}
              <Link href="/ask" className="link-accent">
                /ask
              </Link>{" "}
              can probably answer it instantly.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex items-center gap-2 text-accent">
        {icon}
        <span className="text-xs font-mono uppercase tracking-[0.18em] text-ink-500">
          {label}
        </span>
      </div>
      <div className="mt-1 text-ink-900">{value}</div>
    </>
  );
  return href ? (
    <Link href={href} className="block group">
      <div className="group-hover:text-accent transition-colors">{content}</div>
    </Link>
  ) : (
    <div>{content}</div>
  );
}
