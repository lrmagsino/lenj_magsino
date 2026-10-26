import type { Project } from "@/lib/content";

type ChallengeNote = {
  challenge: string;
  approach: string;
  implementation: string;
  outcome: string;
  lesson: string;
};

const notes: Record<string, ChallengeNote> = {
  docugraph: {
    challenge:
      "Document pages can contain connected regions—such as flowchart nodes, table fields, and labels—that a flat text extraction does not represent by itself.",
    approach:
      "The project separates a CNN-only baseline from the proposed DocuGraph workflow, then adds spatial relationships and document structure to the proposed analysis.",
    implementation:
      "The baseline uses LayoutParser/Detectron2 region predictions and a separate OCR path. The proposed repository contains browser-side region analysis, a graph-attention-named module with fixed spatial heuristics, and backend shape/connector and OCR processing.",
    outcome:
      "The thesis evidence reports qualitative improvements for the tested document types. Its reported confidence values have an undocumented method and conflict with some individual screenshots, so they are not presented as validated accuracy.",
    lesson:
      "A model confidence score is not ground-truth accuracy; reliable comparisons need an explicit annotation set, metric definition, and repeatable evaluation protocol.",
  },
  mayari: {
    challenge:
      "Students need a single place to track Canvas assignments, due dates, course updates, and class links.",
    approach:
      "The extension connects directly to a configured Canvas instance through the Canvas REST API and presents assignment deadlines with filters, urgency categories, and reminders.",
    implementation:
      "The Manifest V3 extension uses a popup, background service worker, Chrome storage, alarms, and notifications. The repository documents completion tracking, course announcements, and class/meeting-link management.",
    outcome:
      "The repository documents an unpacked browser extension; no hosted demonstration or user outcome measurements are provided.",
    lesson:
      "Keeping the workflow in the browser makes setup and credential handling important: users configure their own Canvas instance and token locally.",
  },
  "red-warriors": {
    challenge:
      "The recovered code contains two separate apps: a customer ordering prototype and an operator-side navigation prototype. No shared service or data flow between them is present.",
    approach:
      "The AOS keeps sample menu and cart flow in Java activities; the POS separates canteen menus and their destination activities. The case study distinguishes implemented navigation from unfinished service-backed workflows.",
    implementation:
      "Both projects use Java 8, Android SDK compile/target 33 with min SDK 24, XML layouts, AndroidX AppCompat, Material Components, and ConstraintLayout. AOS cart entries are held in static in-process lists and its queue number is locally randomized. POS menu actions currently open a shared “No records found” screen. Firebase, an API, persistence, and shared AOS/POS transaction handling were not found.",
    outcome:
      "The source demonstrates UI navigation and prototype-level interactions, but does not establish real order delivery, transaction processing, payment, receipts, or operational records. No usage, transaction, or queue-time measurements are available.",
    lesson:
      "A screen or success message is not proof of a completed backend workflow. Keep local prototype behavior distinct from authenticated, persisted, or synchronized operations.",
  },
  "cs-expo-2026": {
    challenge:
      "The event platform needs to distinguish production-ready event content and CMS workflows from browser-only demo sections that are not released to production.",
    approach:
      "The first release uses Supabase for the schedule, speakers, sponsors, publications, and admin CMS. A production release gate hides the remaining browser-only demo routes; Lenj's contribution was on the frontend registration experience.",
    implementation:
      "The frontend uses Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, CSS springs, the Web Animations API, Lenis, and an SVG parallax scene. Supabase provides Postgres, Auth, and Storage for released sections; CMS writes use Zod validation, server-side role checks, and row-level security. Lenj contributed registration validation, error handling, and responsive interface improvements as part of the frontend team; backend ownership belongs to the backend team.",
    outcome:
      "The live platform releases schedule, speakers, sponsors, publications, and the admin CMS while keeping demo-only sections out of production. No individual registration, conversion, or usage metrics have been provided.",
    lesson:
      "For a collaborative platform, distinguish the production release boundary, team ownership, and an individual's verified contribution instead of implying every demo feature is deployed or solely authored.",
  },
  wedding: {
    challenge:
      "A personalized invitation combines an animated opening, story content, event information, RSVP, and mobile-responsive layouts.",
    approach:
      "The site coordinates its journey-themed visual narrative with event details and an external Google Forms RSVP.",
    implementation:
      "The repository documents Next.js, React, TypeScript, CSS motion, SVG parallax, Web Animations API, and Lenis, along with reduced-motion and keyboard-accessibility support.",
    outcome:
      "A responsive live invitation is published. The repository states that RSVP submissions are handled by Google Forms; no engagement metrics are claimed.",
    lesson:
      "Motion, accessibility, responsive layout, and external form behavior need to work together rather than being treated as separate visual features.",
  },
};

const labels: (keyof ChallengeNote)[] = [
  "challenge",
  "approach",
  "implementation",
  "outcome",
  "lesson",
];

const headings: Record<keyof ChallengeNote, string> = {
  challenge: "Challenge",
  approach: "Approach",
  implementation: "Implementation",
  outcome: "Outcome",
  lesson: "Lessons learned",
};

export default function EngineeringChallenges({ project }: { project: Project }) {
  const note = notes[project.id];
  if (!note) return null;

  return (
    <section className="mt-14 rounded-3xl border border-violet/25 bg-charcoal/60 p-5 sm:p-7 lg:p-8">
      <p className="eyebrow">Engineering notes</p>
      <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
        Challenge → approach → outcome
      </h2>
      <ol className="mt-5 grid gap-3 md:grid-cols-2">
        {labels.map((label, index) => (
          <li
            key={label}
            className={`rounded-2xl border border-white/10 bg-midnight/50 p-4 sm:p-5 ${
              index === labels.length - 1 ? "md:col-span-2" : ""
            }`}
          >
            <h3 className="font-display text-base font-semibold text-cyan sm:text-lg">
              <span className="mr-2 font-mono text-xs text-violet">
                {String(index + 1).padStart(2, "0")}
              </span>
              {headings[label]}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{note[label]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
