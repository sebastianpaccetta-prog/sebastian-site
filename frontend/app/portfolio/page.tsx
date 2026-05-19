import ProjectCard from "@/components/ProjectCard";
import { personalProjects, ledProjects } from "@/lib/data";

export const metadata = {
  title: "Portfolio — Sebastian",
  description:
    "Personal projects and led consulting engagements at 180 Degrees Consulting.",
};

export default function Portfolio() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-bg-line">
        <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-12">
          <p className="eyebrow">Portfolio</p>
          <h1 className="h-display text-5xl md:text-7xl mt-5 leading-[1.02]">
            The work,
            <br />
            <span className="italic">not the talking points.</span>
          </h1>
          <p className="mt-6 max-w-prose2 text-ink-500 text-lg leading-relaxed">
            A mix of personal projects and engagements I&apos;ve led. 
          </p>
        </div>
      </section>

      {/* Personal projects */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow">Category 01</p>
            <h2 className="h-display text-3xl md:text-4xl mt-3">
              Personal projects
            </h2>
          </div>
          <span className="font-mono text-xs text-ink-500 uppercase tracking-[0.18em]">
            {personalProjects.length} projects
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* Led projects */}
      <section className="border-t border-bg-line bg-bg-alt">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow">Category 02</p>
              <h2 className="h-display text-3xl md:text-4xl mt-3">
                Led projects ·{" "}
                <span className="text-accent italic">180 Degrees Consulting</span>
              </h2>
              <p className="mt-3 text-ink-500 max-w-prose2 text-sm">
                A portfolio of eight client engagements I oversaw as Managing Director of 
                180 Degrees Consulting at Purdue. Click any card to download the final report.
              </p>
            </div>
            <span className="font-mono text-xs text-ink-500 uppercase tracking-[0.18em]">
              {ledProjects.length} engagements
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ledProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
