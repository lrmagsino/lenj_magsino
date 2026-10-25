export const profile = {
  name: "Lenj Jesther Magsino",
  headline: "Computer Science Student | Aspiring Software Engineer",
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
      "Firebase Authentication",
    ],
    role:
      "Listed as a member of the DocuGraph team on the public project site. Specific individual responsibilities have not been confirmed.",
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
      "The public project materials describe a Python/Flask analysis pipeline that combines OCR engines, layout analysis, and graph-based document understanding, with authentication and document export flows.",
    outcome:
      "The public site provides an overview and entry points for document analysis. No additional outcome metrics are included here.",
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
    role:
      "A collaborative project in the supplied public repository. The repository does not identify Lenj's specific responsibilities.",
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
    tag: "School canteen ordering and point of sale",
    desc: "A school canteen application designed to streamline food ordering, improve transaction management, and reduce queues for students.",
    stack: [
      "Kotlin",
      "Android Studio",
      "Firebase",
      "Android SDK",
      "MVVM",
    ],
    role:
      "Individual responsibilities and implementation technologies have not yet been confirmed.",
    image: {
      src: "/images/projects/red-warriors/presentation.webp",
      width: 1439,
      height: 688,
      alt: "Lenj presenting an Android application with code and a University of the East login screen visible",
      caption: "Presenting the Red Warriors Advanced Ordering System & Point of Sale.",
    },
    problem:
      "Canteen ordering can involve queues and manual transaction handling during busy school periods.",
    approach:
      "The project is described as an advanced ordering and point-of-sale application for a school canteen. Feature and implementation details are not yet documented.",
    outcome:
      "The application was presented as a project. No usage data or measured queue-time changes have been provided.",
  },
  {
    id: "cs-expo-2026",
    name: "CS Expo 2026 — Mission: Tomorrow",
    tag: "FEU Tech Computer Science event website",
    desc: "An event website for the four-day CS Expo, bringing together capstone showcases, DevDay sessions, schedules, speakers, and attendee registration.",
    stack: ["Next.js", "React"],
    role:
      "Collaborative project. The public website does not specify Lenj's individual responsibilities.",
    demo: "https://cs-expo-main-website.vercel.app/",
    image: {
      src: "/images/projects/cs-expo/hero.png",
      width: 1572,
      height: 768,
      alt: "CS Expo 2026 Mission: Tomorrow event website hero artwork",
      caption: "CS Expo 2026 — Reimagining tomorrow, today.",
    },
    problem:
      "Attendees need one place to discover the event, plan sessions, explore capstone projects, and register.",
    approach:
      "The public site presents the expo through a cinematic landing page and links to event information, schedules, speakers, projects, and registration.",
    outcome:
      "The live website is available at the CS Expo public domain. No individual contribution breakdown is published.",
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
    role:
      "The public repository is under Lenj's GitHub account. Specific individual responsibilities are not separated in the project documentation.",
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
    items: ["Artificial Intelligence", "Machine Learning", "Generative AI"],
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
