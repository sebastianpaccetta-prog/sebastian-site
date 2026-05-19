import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

const base =
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-ink-900 hover:bg-accent-hover hover:text-white shadow-soft",
  secondary:
    "bg-ink-900 text-white hover:bg-ink-700",
  ghost:
    "border border-bg-line text-ink-900 hover:border-accent hover:text-accent",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  arrow = false,
  className = "",
  type = "button",
  disabled,
  external,
}: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowUpRight size={16} className="-mr-1" strokeWidth={2} />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
