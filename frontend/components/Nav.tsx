"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/ask", label: "Ask My AI" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-bg/80 border-b border-bg-line">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="font-display text-xl tracking-tightish">
            Sebastian
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path === l.href ? "page" : undefined}
              className="link-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Open menu"
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-bg-line bg-bg">
          <nav className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={path === l.href ? "page" : undefined}
                className="py-1 link-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
