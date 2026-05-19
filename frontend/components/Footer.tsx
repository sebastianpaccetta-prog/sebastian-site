import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-bg-line bg-bg-alt">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="font-display text-xl tracking-tightish">
              Sebastian
            </span>
          </div>
          <p className="mt-3 text-sm text-ink-500 max-w-xs">
            Business management, consulting, and operational leadership.
            Built at Purdue, sharpened on the field.
          </p>
        </div>

        <div className="text-sm">
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2">
            <li><Link href="/about" className="link-accent">About</Link></li>
            <li><Link href="/portfolio" className="link-accent">Portfolio</Link></li>
            <li><Link href="/ask" className="link-accent">Ask My AI</Link></li>
            <li><Link href="/contact" className="link-accent">Contact</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="eyebrow mb-4">Connect</p>
          <ul className="space-y-2">
            <li>
              <a
                className="link-accent"
                href="mailto:saccetta@purdue.edu"
              >
                saccetta@purdue.edu
              </a>
            </li>
            <li>
              <a
                className="link-accent"
                href="https://www.linkedin.com/in/sebastian-accetta"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bg-line">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between text-xs text-ink-500 font-mono">
          <span>© {new Date().getFullYear()} Sebastian. All rights reserved.</span>
          <span>West Lafayette, IN</span>
        </div>
      </div>
    </footer>
  );
}
