import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-24">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 animate-fadeUp">
              <p className="eyebrow">Strategy · Consulting · Product Management</p>
              <h1 className="h-display mt-5 text-5xl md:text-7xl leading-[1.02]">
                Hi, I&apos;m{" "}
                <span className="italic font-display">Sebastian</span>.
                <br />
                I turn complexity{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">into clarity.</span>
                  <span className="absolute inset-x-0 bottom-[-4px] h-3 bg-accent/40 -z-0" />
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink-500 leading-relaxed">
                I&apos;m a strategy consultant who works at the intersection of data and people. 
                I gravitate toward problems that don't come with a playbook,
                 turning ambiguity into action. 
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/portfolio" variant="primary" arrow>
                  View portfolio
                </Button>
                <Button href="/ask" variant="ghost">
                  <Sparkles size={14} className="text-accent" />
                  Ask my AI
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-6 text-xs font-mono uppercase tracking-[0.18em] text-ink-500">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  DRIVEN BY CURIOSITY AND OWNERSHIP   
                </span>
              </div>
            </div>

            {/* Headshot */}
            <div className="md:col-span-5 animate-fadeUp" style={{ animationDelay: "120ms" }}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-accent/10 blur-2xl" />
                <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-bg-alt border border-bg-line">
                  {/* Replace /headshot.jpg with your actual headshot */}
                  <Image
                    src="/headshot.JPG"
                    alt="Sebastian"
                    fill
                    priority
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                  {/* <div className="absolute inset-0 flex items-center justify-center text-ink-300 text-xs font-mono uppercase tracking-[0.2em]">
                    [ headshot.jpg ]
                  </div> */}
                </div>

                {/* Floating tag */}
                <div className="absolute -left-4 bottom-8 bg-white border border-bg-line shadow-soft rounded-xl px-3 py-2 text-xs font-mono">
                  <span className="text-ink-500">Currently:</span>{" "}
                  <span className="text-ink-900">Proxima · 180DC · Building</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I do */}
      <section className="border-t border-bg-line bg-bg-alt">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow">What I do</p>
              <h2 className="h-display text-3xl md:text-4xl mt-4">
                Strategy, structure, and the work that actually ships.
              </h2>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {[
                {
                  n: "01",
                  t: "Business Management",
                  d: "Building the systems and habits that let teams move from idea to operating reality.",
                },
                {
                  n: "02",
                  t: "Consulting",
                  d: "Eight projects led at 180 Degrees Consulting, working with mission-driven organizations.",
                },
                {
                  n: "03",
                  t: "Operational Leadership",
                  d: "Translating strategy into process, ownership, and KPIs that hold up under pressure.",
                },
                {
                  n: "04",
                  t: "Cross-functional Work",
                  d: "Comfortable across finance, operations, and stakeholder communication.",
                },
              ].map((item) => (
                <div key={item.n} className="border-t border-bg-line pt-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-accent">
                      {item.n}
                    </span>
                    <h3 className="font-medium text-ink-900">{item.t}</h3>
                  </div>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ask AI teaser */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">New</p>
              <h2 className="h-display text-4xl md:text-5xl mt-4 leading-[1.05]">
                Don&apos;t want to read the whole site?
                <br />
                <span className="italic text-accent">Just ask my AI.</span>
              </h2>
              <p className="mt-5 text-ink-500 max-w-prose2">
                I trained a small assistant on my resume, my career deck, and
                every consulting project I&apos;ve led. Ask it anything, from
                &ldquo;is Sebastian good at consulting?&rdquo; to &ldquo;what
                did he do at 180DC?&rdquo;
              </p>
              <div className="mt-7">
                <Button href="/ask" variant="primary" arrow>
                  Try it now
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-bg-line bg-white shadow-soft p-6 font-mono text-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-bg-line">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-ink-500 text-xs uppercase tracking-widest">
                  Ask My AI · live
                </span>
              </div>
              <div className="pt-4 space-y-3">
                <p className="text-ink-500">
                  &gt; Is Sebastian good at consulting?
                </p>
                <p className="text-ink-900 leading-relaxed">
                  Yes. He&apos;s led{" "}
                  <span className="bg-accent/30 px-1">8 projects</span> at 180
                  Degrees Consulting, ranging from operational redesigns to
                  market entry studies. Each shipped a final report and
                  measurable client recommendations.
                </p>
                <Link
                  href="/ask"
                  className="inline-flex items-center gap-1 text-accent text-xs uppercase tracking-widest pt-2"
                >
                  Continue conversation <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
