export const profile = {
  name: "Lenj Jesther R. Magsino",
  headline: "Full-Stack Developer | Computer Science Student",
  tagline: "Building Intelligent Systems. Creating Meaningful Digital Experiences.",
  email: "lenjmagsino@gmail.com",
  linkedin: "https://www.linkedin.com/in/lenj-jesther-magsino-a69824396/",
  github: "https://github.com/lrmagsino",
  resume: "/resume/lenj-magsino.pdf",
};

export const email = profile.email;

export const links = {
  email: `mailto:${profile.email}`,
  linkedin: profile.linkedin,
  github: profile.github,
  resume: profile.resume,
};

export type Project = {
  id: string;
  name: string;
  fullTitle?: string;
  flagship?: boolean;
  tag: string;
  desc: string;
  stack: string[];
  role: string;
  repo?: string;
  demo?: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  };
  problem: string;
  approach: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    id: "docugraph",
    name: "DocuGraph",
    fullTitle:
      "DocuGraph: Graph-Based Document Layout Analysis Enhancing OCR for Researchers and Institutions",
    flagship: true,
    tag: "Graph-based document analysis for research workflows",
    desc: "A document-analysis platform that combines OCR and layout understanding to turn complex research documents into structured digital content.",
    stack: [
      "Python",
      "Flask",
      "EasyOCR",
      "Tesseract",
      "LayoutParser",
      "CNN (Detectron2)",
      "Graph attention (JavaScript)",
      "Firebase Authentication",
    ],
    role: "Full-stack developer on the DocuGraph project.",
    repo: "https://github.com/lenjimagsino/DOCUGRAPH_WEBSITE",
    demo: "https://docugraph.site/",
    image: {
      src: "/images/projects/docugraph/desktop.webp",
      width: 1440,
      height: 900,
      alt: "Screenshot of the DocuGraph live landing page and document-analysis overview",
      caption: "Captured from the public DocuGraph website.",
    },
    problem:
      "Research papers, forms, and reports often use multi-column layouts, tables, figures, and diagrams that are difficult for linear OCR alone to interpret.",
    approach:
      "The public project contains a browser-side region and graph-analysis workflow, plus a Python/Flask backend with LayoutParser, OCR, shape tracing, connector analysis, and structured export. The browser source labels a module GraphAttentionNetwork; its inspected context aggregation is heuristic and no training procedure or learned weights were found.",
    outcome:
      "The thesis evidence reports qualitative comparisons and confidence values. The confidence methodology is undocumented and some summary values conflict with individual screenshots, so no validated accuracy claim is made here.",
  },
  {
    id: "mayari",
    name: "Mayari",
    tag: "Canvas LMS deadline and study companion",
    desc: "A Chrome extension for tracking Canvas assignments, due dates, course updates, and class information in one dashboard.",
    stack: [
      "Chrome Extension Manifest V3",
      "HTML",
      "CSS",
      "JavaScript",
      "Canvas REST API",
      "Chrome Extension APIs",
    ],
    role: "Lead developer of Mayari.",
    repo: "https://github.com/ostol-uriel/Computahhh",
    image: {
      src: "/images/projects/mayari/extension-popup.webp",
      width: 425,
      height: 624,
      alt: "User-provided screenshot of the Mayari Chrome extension dashboard",
      caption: "Mayari extension screenshot supplied for this portfolio.",
    },
    problem:
      "Students need a clear way to monitor assignment deadlines and related course information without repeatedly checking each Canvas course.",
    approach:
      "Mayari is a Manifest V3 browser extension. Its repository documents Canvas assignment syncing, deadline filters and reminders, course notifications, and class-link management.",
    outcome:
      "The project is distributed as an unpacked Chrome extension configured with a Canvas URL and access token; no public hosted demo is provided.",
  },
  {
    id: "red-warriors",
    name: "Red Warriors Advanced Ordering System & Point of Sale",
    tag: "Two independent Android prototypes for canteen ordering and operations",
    desc: "A customer-facing Advanced Ordering System prototype and a separate canteen-side Point of Sale navigation prototype, reviewed against their recovered Java and XML source.",
    stack: [
      "Java 8",
      "Android SDK (min 24, target 33)",
      "AndroidX AppCompat",
      "Material Components",
      "ConstraintLayout",
      "XML layouts",
      "Gradle 7.5",
    ],
    role: "Full-Stack Developer · Academic Project.",
    image: {
      src: "/images/projects/red-warriors/presentation.webp",
      width: 1439,
      height: 688,
      alt: "Lenj presenting an Android application with code and a University of the East login screen visible",
      caption: "Presenting the Red Warriors Advanced Ordering System & Point of Sale.",
    },
    problem:
      "The project explores customer-side canteen ordering and canteen-side operations. The recovered source does not include user studies or measured queue, sales, or transaction outcomes.",
    approach:
      "The AOS uses Java activities and XML layouts for sample menu navigation, process-local cart data, and a locally generated queue number. The separate POS app provides local login and canteen operations navigation; its menu destinations currently lead to a no-records placeholder. No AOS/POS service integration was found.",
    outcome:
      "Two Android application prototypes are present in the recovered source folders. Their current code does not establish production authentication, remote order submission, sales processing, payment, or AOS/POS synchronization. No usage or performance measurements are available.",
  },
  {
    id: "cs-expo-2026",
    name: "CS Expo 2026 — Mission: Tomorrow",
    tag: "FEU Tech Computer Science · Neostalgia",
    desc: "The event platform for FEU Tech's annual Computer Science capstone showcase. Its first production release includes the schedule, speakers, sponsors, publications, and admin CMS; other sections remain browser-only demos hidden by the production release gate.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS v4",
      "Supabase (Postgres, Auth, Storage)",
      "Zod",
      "Vercel",
      "CSS springs",
      "Web Animations API",
      "Lenis",
      "SVG parallax",
      "Michroma · Space Grotesk",
    ],
    role:
      "Frontend team member; contributed registration form validation, error handling, and responsive interface improvements as part of the CS Expo Developers team.",
    demo: "https://cs-expo-main-website.vercel.app/",
    image: {
      src: "/images/projects/cs-expo/hero.png",
      width: 1572,
      height: 768,
      alt: "CS Expo 2026 Mission: Tomorrow event website hero artwork",
      caption: "CS Expo 2026 — Reimagining tomorrow, today.",
    },
    problem:
      "The Computer Science Department needs an event platform for its annual capstone showcase, with released event information and a controlled path for publishing content.",
    approach:
      "Contributed to registration validation, error handling, and responsive frontend improvements. The production release serves schedule, speakers, sponsors, and publications from Supabase; other sections remain browser-only demos and are hidden by the production release gate. Backend implementation is owned by the backend team.",
    outcome:
      "The event platform is live, with the first release's content and admin CMS backed by Supabase. Demo-only sections are not exposed in production. No registration, conversion, or usage metrics have been provided.",
  },
  {
    id: "wedding",
    name: "Fritz & Princess — Interactive Wedding Invitation Website",
    tag: "A travel-inspired digital invitation",
    desc: "A responsive wedding website with a personalized invitation, journey-themed visuals, a story timeline, event details, and an RSVP form.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS v4",
      "Lenis",
      "SVG parallax",
      "Web Animations API",
      "Supabase",
      "Google Forms",
    ],
    role: "Full-stack developer of the Fritz & Princess wedding website.",
    repo: "https://github.com/lrmagsino/FritzAndPrincess_Wedding2027",
    demo: "https://lrmagsino.github.io/FritzAndPrincess_Wedding2027/",
    image: {
      src: "/images/projects/wedding/desktop.webp",
      width: 1424,
      height: 749,
      alt: "Screenshot of the opened Fritz and Princess wedding invitation hero",
      caption: "Captured from the opened live Fritz & Princess invitation.",
    },
    problem:
      "A wedding invitation needs to share event information in a personal, accessible format that works across devices.",
    approach:
      "The public repository documents an invitation with a personalized greeting, journey-inspired animated visuals, a story timeline, accessible event details, and a Google Forms RSVP.",
    outcome:
      "A public live invitation is available. No engagement metrics or other measured outcomes have been provided.",
  },
];

export const skills: { title: string; items: string[] }[] = [
  { title: "Programming", items: ["Python", "JavaScript", "TypeScript", "Kotlin", "HTML"] },
  { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { title: "Database & APIs", items: ["SQL", "REST APIs", "Postman", "API Integration"] },
  {
    title: "AI & Machine Learning",
    items: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "CNN (Detectron2)",
      "Graph attention (JavaScript)",
    ],
  },
  {
    title: "Cloud & Data",
    items: ["Microsoft Azure", "Apache Kafka", "Stream Processing", "SAP Business Data Cloud"],
  },
  {
    title: "Additional",
    items: [
      "Android Development",
      "MATLAB",
      "UI/UX Design",
      "Agile Software Development",
      "Project Management",
    ],
  },
];

export const timeline = [
  {
    k: "Experience",
    t: "Professional experience",
    d: "No employment or internship details have been provided yet.",
  },
];
