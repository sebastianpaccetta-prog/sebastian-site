import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Users, Trophy, Plane } from "lucide-react";

export const metadata = {
  title: "About — Sebastian",
  description:
    "Sebastian's background: Purdue University, Delta Sigma Pi, 180 Degrees Consulting, collegiate pickleball, and travels through South Africa.",
};

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-bg-line">
        <div className="mx-auto max-w-5xl px-6 pt-16 md:pt-24 pb-12">
          <p className="eyebrow">About</p>
          <h1 className="h-display text-5xl md:text-7xl mt-5 leading-[1.02]">
            A student of business,
            <br />
            <span className="italic">and a few other things.</span>
          </h1>
        </div>
      </section>

      {/* Narrative */}
      <section className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4 md:sticky md:top-24 self-start">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-bg-alt border border-bg-line relative">
            <Image
              src="/about-portrait.jpg"
              alt="Sebastian"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-4 text-xs font-mono uppercase tracking-[0.18em] text-ink-500">
            Dallas, Texas
          </div>
        </div>

        <div className="md:col-span-8 prose-base">
          <p className="text-2xl leading-relaxed font-display tracking-tightish text-ink-900">
            I came to Purdue to study business, and I stayed for the
            problem-solving. The thing I keep coming back to, in classrooms,
            on consulting projects, and in clubs, is the same question:{" "}
            <span className="italic text-accent">how do we actually run this thing well?</span>
          </p>

          <div className="mt-8 space-y-6 text-ink-700 leading-relaxed">
            <p>
              That question has shaped most of what I do. It&apos;s why I
              gravitate toward consulting and product, why I take on
              project-lead roles instead of staying on the sidelines, and why
              I find as much meaning in a clean process map as in a sharp
              strategy deck.
            </p>
            <p>
              Outside of school and work I try to keep my life full of things
              that aren&apos;t spreadsheets. I play competitive pickleball,
              travel whenever I can, and spend as much time outdoors as the
              Indiana weather allows.
            </p>
          </div>

          {/* Pillars */}
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            <Pillar
              icon={<GraduationCap size={18} />}
              title="Academics"
              body="Studying business management at Purdue University's Daniels School of Business, with coursework concentrated in operations, strategy, and finance."
            />
            <Pillar
              icon={<Users size={18} />}
              title="Leadership"
              body="Led 8 strategic engagements as the Founder and Managing Director of 180 Degrees Consulting. Awarded Club Sport Leader of the Year for leading the Purdue Pickleball Club and its 2,300 members."
            />
            <Pillar
              icon={<Trophy size={18} />}
              title="Pickleball"
              body="Competing in collegiate pickleball events through DUPR, including helping organize the Purdue Pickleball Midwest Championships."
            />
            <Pillar
              icon={<Plane size={18} />}
              title="Travel"
              body="Global traveler. Recently safaried in Kruger National Park with my grandma, taught in Japan, and studied in Spain. Always looking for the next passport stamp."
            />
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <p className="eyebrow">Timeline</p>
            <ol className="mt-6 relative border-l border-bg-line pl-6 space-y-8">
              {timeline.map((t) => (
                <li key={t.heading} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg" />
                  <div className="font-mono text-xs text-ink-400 tracking-[0.12em]">
                    {t.date}
                  </div>
                  <h3 className="font-medium mt-1 text-ink-900">{t.heading}</h3>
                  <p className="mt-1 text-sm text-ink-500 max-w-prose2">
                    {t.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 flex items-center gap-4">
            <Link
              href="/portfolio"
              className="link-accent text-sm font-medium"
            >
              See the work →
            </Link>
            <Link href="/contact" className="link-accent text-sm font-medium">
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Pillar({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-bg-line p-5 card-lift bg-white">
      <div className="flex items-center gap-2 text-accent">
        {icon}
        <span className="text-xs font-mono uppercase tracking-[0.18em] text-ink-500">
          {title}
        </span>
      </div>
      <p className="mt-3 text-sm text-ink-700 leading-relaxed">{body}</p>
    </div>
  );
}

const timeline = [
  {
    date: "June 2026 – Present",
    heading: "Proxima, a part of Bain & Company | Procurement Consultant",
    body: "Advising clients on procurement strategy and cost optimization as part of Bain's specialized procurement arm.",
  },
  {
    date: "June 2025 – August 2025",
    heading: "RSM | Technology Consultant",
    body: "Designed a NetSuite MRP module from scratch and reduced raw material delivery time by 10%.",
  },
  {
    date: "February 2025 – May 2025",
    heading: "180 Degrees Consulting | Founder & Managing Director",
    body: "Founded the Purdue branch and scaled it to 62 members completing 8 consulting projects for mission-driven organizations.",
  },
  {
    date: "February 2024 – December 2024",
    heading: "Electrum Ventures | COO",
    body: "Managed all P&L operations, grew monthly revenue from $6K to $11K, and eliminated $40K in inherited debt leading to a profitable exit.",
  },
  {
    date: "August 2023 – June 2025",
    heading: "Purdue Pickleball Club | President & Co-Founder",
    body: "Grew the club from 10 to 2,900+ members, making it the largest wellbeing club on campus and earning Club Sport Leader of the Year.",
  },
];
