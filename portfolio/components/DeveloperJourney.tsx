"use client";

import { useEffect, useRef, useState } from "react";

const milestones = [
  {
    period: "2021–2023",
    title: "University of the East – Caloocan",
    summary: "Information and Communications Technology.",
  },
  {
    period: "2023–Present",
    title: "FEU Institute of Technology",
    summary: "BS Computer Science, Specialization in Software Engineering.",
  },
  {
    period: "2025–2026",
    title: "Credentials and academic activities",
    summary:
      "The portfolio documents certifications issued during this period and participation in the 2026 ACM Developers Week Hackathon. Project dates are not inferred.",
  },
  {
    period: "2027",
    title: "Expected graduation",
    summary: "FEU Institute of Technology, BS Computer Science.",
  },
] as const;

export default function DeveloperJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [revealEnabled, setRevealEnabled] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;
    setRevealEnabled(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const selected = milestones[activeMilestone];

  return (
    <section
      ref={sectionRef}
      id="journey"
      className={`rounded-2xl border border-white/10 bg-charcoal/70 p-5 transition-[opacity,transform] duration-700 motion-reduce:transform-none motion-reduce:transition-none sm:p-7 ${
        !revealEnabled || isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <p className="eyebrow">Developer journey</p>
      <h2 className="mt-2 font-display text-2xl font-bold">Verified milestones</h2>
      <p className="mt-2 text-sm text-white/60">
        Select a milestone to read its documented details.
      </p>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((milestone, index) => (
          <li key={milestone.period}>
            <button
              type="button"
              onClick={() => setActiveMilestone(index)}
              aria-pressed={activeMilestone === index}
              className={`h-full min-h-28 w-full rounded-xl border p-4 text-left transition-colors motion-reduce:transition-none ${
                activeMilestone === index
                  ? "border-cyan/50 bg-cyan/10"
                  : "border-white/10 bg-midnight/50 hover:border-cyan/30"
              }`}
            >
              <span className="font-mono text-sm text-cyan">{milestone.period}</span>
              <span className="mt-2 block font-display text-sm font-semibold text-white">
                {milestone.title}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div
        aria-live="polite"
        className="mt-4 rounded-xl border border-violet/20 bg-violet/5 p-4"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-violet">
          {selected.period}
        </p>
        <h3 className="mt-2 font-display font-semibold">{selected.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/65">{selected.summary}</p>
      </div>
    </section>
  );
}
