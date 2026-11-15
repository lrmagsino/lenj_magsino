import type { Project } from "@/lib/content";
import { projectEngineeringNotes } from "@/lib/projectEngineeringNotes";

type ChallengeLabel =
  | "challenge"
  | "approach"
  | "implementation"
  | "outcome"
  | "lesson";

const labels: ChallengeLabel[] = [
  "challenge",
  "approach",
  "implementation",
  "outcome",
  "lesson",
];

const headings: Record<ChallengeLabel, string> = {
  challenge: "Challenge",
  approach: "Approach",
  implementation: "Implementation",
  outcome: "Outcome",
  lesson: "Lessons learned",
};

export default function EngineeringChallenges({ project }: { project: Project }) {
  const note = projectEngineeringNotes[project.id];
  if (!note) return null;
  const details: Record<ChallengeLabel, string> = {
    challenge: project.problem,
    approach: project.approach,
    implementation: note.facts
      .map((fact) => fact.detail)
      .join(" "),
    outcome: project.outcome,
    lesson: note.lesson,
  };

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
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {details[label]}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
