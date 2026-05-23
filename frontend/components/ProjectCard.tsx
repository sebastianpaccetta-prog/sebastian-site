import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileDown, Clock } from "lucide-react";
import { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  const isLed = !!project.pdf;

  return (
    <article className="group relative rounded-2xl border border-bg-line bg-white card-lift overflow-hidden">
      {project.image && (
        <div className="aspect-[16/10] relative bg-ink-900 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-500 bg-bg-alt rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
          {project.status === "coming-soon" && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.18em] text-accent bg-accent-soft rounded-full px-2.5 py-1">
              <Clock size={10} /> Coming soon
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl tracking-tightish mt-4 text-ink-900">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-ink-500 leading-relaxed">
          {project.summary}
        </p>

        <div className="mt-5 pt-4 border-t border-bg-line flex items-center justify-between">
          {isLed ? (
            <Link
              href={project.pdf!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-accent transition-colors"
            >
              <FileDown size={14} />
              Download report
            </Link>
          ) : project.link ? (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-accent transition-colors"
            >
              {project.linkLabel ?? "View project"}
              <ArrowUpRight size={14} />
            </Link>
          ) : (
            <span className="text-sm text-ink-300">Link coming soon</span>
          )}

          <span className="text-xs font-mono text-ink-300 group-hover:text-accent transition-colors">
            {project.slug}
          </span>
        </div>
      </div>
    </article>
  );
}
