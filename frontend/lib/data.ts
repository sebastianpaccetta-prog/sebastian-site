export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  image?: string;
  link?: string;
  linkLabel?: string;
  pdf?: string;
  status?: "live" | "coming-soon";
};

export const personalProjects: Project[] = [
  {
    slug: "purdue-co-rec",
    title: "Purdue Co-Rec Project",
    summary:
      "Served as a student consultant advising Purdue RecWell leadership on an $8M facility plan featuring 28 pickleball courts, yielding $160K in procurement savings and a $1M capital donation.",
    tags: ["Operations", "On-campus"],
    image: "/projects/project-1.jpg",
    link: "https://www.purdue.edu/recwell/who-we-are/master-plan/index.php",
    status: "live",
  },
  {
    slug: "w4h-ioi",
    title: "W4H IOI Project",
    summary:
      "I designed and developed a locally hosted, AI-powered application for the non-profit Wisdom for Humanity that utilizes Ollama to extract claims from interview transcripts and applies a custom physics-based formula to calculate a defensible Impact of Investment (IOI) metric.",
    tags: ["Strategy", "KPI Measurement", "Non-Profit", "Product"],
    image: "/projects/w4h-ioi.png",
    link: "https://ioi-sable.vercel.app/",
    status: "live",
  },
  {
    slug: "purdue-pickleball-midwest",
    title: "Purdue Pickleball — Midwest Championships",
    summary:
      "Directed logistics and sponsorships for the largest collegiate pickleball tournament in the Midwest (12 schools, 28 teams, 120+ students) alongside active on-court competition.",
    tags: ["Events", "Athletics"],
    image: "/projects/pickleball-midwest.jpg",
    link: "https://www.youtube.com/watch?v=egvGN5Pw0_g",
    linkLabel: "View livestream",
    status: "live",
  },
];

export const ledProjects: Project[] = [
  {
    slug: "180dc-project-1",
    title: "180DC · Purdue Branch Establishment",
    summary:
      "Developed the comprehensive founding proposal to establish the Purdue University branch of 180 Degrees Consulting. This strategic business plan detailed the organizational structure, financial forecasting, and client acquisition frameworks required to secure official global network approval.",
    tags: ["Strategy", "Operations"],
    pdf: "/reports/180dc-project-1.pdf",
  },
  {
    slug: "180dc-project-2",
    title: "180DC · Forest Academy Financial Sustainability",
    summary:
      "Led a consulting team to develop a comprehensive grant-writing toolkit and revenue sustainability plan for Forest Academy. The final deliverables included an automated outcome measurement framework, multi-year financial projections, and structured budget narratives to secure the organization's long-term funding stability.",
    tags: ["Finance"],
    pdf: "/reports/180dc-project-2.pdf",
  },
  {
    slug: "180dc-project-3",
    title: "180DC · Food Finders Technological Transformation",
    summary:
      "Designed and implemented a centralized, automated dashboard system to resolve data fragmentation across the organization's program verticals. This standardized workbook eliminated manual calculation errors and provided board leadership with clear visibility into key performance indicators for future scalability.",
    tags: ["Strategy", "Technological Transformation"],
    pdf: "/reports/180dc-project-3.pdf",
  },
  {
    slug: "180dc-project-4",
    title: "180DC · University Day of Scouting",
    summary:
      "Directed a strategic growth and financial optimization plan for the nation's largest University Day of Scouting to manage a 400% surge in attendance. Deliverables included a tiered registration pricing model, structured cost-reduction frameworks, and a targeted recruitment strategy that integrated college exploration to attract older demographics.",
    tags: ["Growth", "Profitability"],
    pdf: "/reports/180dc-project-4.pdf",
  },
  {
    slug: "180dc-project-5",
    title: "180DC · United Way Donor Conversion Pipeline",
    summary:
      "Developed a targeted cultivation strategy and a four-stage email marketing pipeline designed to transition young professional volunteers into recurring donors. The project delivered data-driven outreach templates, engagement event frameworks, and digital communication optimizations to successfully bridge the organization's donor acquisition gap.",
    tags: ["Marketing", "Fundraising"],
    pdf: "/reports/180dc-project-5.pdf",
  },
  {
    slug: "180dc-project-6",
    title: "180DC · Food Finders Data Visualization",
    summary:
      "Led a consulting team to design and implement interactive Tableau dashboards for Food Finders Food Bank, resolving complex data fragmentation issues across the organization. The final deliverables included a streamlined Excel-to-Tableau data pipeline and comprehensive training materials, empowering the board of directors to easily track and visualize key performance indicators.",
    tags: ["Strategy"],
    pdf: "/reports/180dc-project-6.pdf",
  },
  {
    slug: "180dc-project-7",
    title: "180DC · Homestead Resources Marketing Strategy",
    summary:
      "Conducted comprehensive market research and designed a targeted marketing strategy to increase campus visibility and program registrations for Homestead Resources. Delivered data-driven recommendations on workshop topics and promotional channels to effectively engage the untapped Purdue student demographic and secure ongoing grant funding.",
    tags: ["Marketing"],
    pdf: "/reports/180dc-project-7.pdf",
  },
  {
    slug: "180dc-project-8",
    title: "180DC · United Way Read to Succeed Expansion",
    summary:
      "Developed a comprehensive volunteer recruitment strategy to reverse post-COVID participation declines for the Read to Succeed program. Deliverables included targeted university outreach frameworks, student-tailored promotional materials, and centralized communication plans designed to sustainably grow the volunteer base and scale long-term community impact.",
    tags: ["Growth"],
    pdf: "/reports/180dc-project-8.pdf",
  },
];
