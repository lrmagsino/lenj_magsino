"use client";

import { useState } from "react";
import Link from "next/link";
import CinematicDialog from "@/components/CinematicDialog";
import Tilt from "@/components/Tilt";
import { projects, skills } from "@/lib/content";
import { savePortfolioReturn } from "@/lib/portfolioNavigation";

export default function SkillShowcase() {
  const [selected, setSelected] = useState<string | null>(null);
  const [source, setSource] = useState<HTMLElement | null>(null);

  const relatedProjects = selected
    ? projects.filter((project) =>
        project.stack.some((technology) => {
          const normalized = technology.toLowerCase();
          return (
            normalized === selected.toLowerCase() ||
            normalized.includes(selected.toLowerCase()) ||
            selected.toLowerCase().includes(normalized)
          );
        }),
      )
    : [];

  return (
    <>
      <section
        id="skills"
        data-bg="#11182A"
        data-bg-light="#edf3fa"
        className="relative z-10 overflow-hidden px-5 py-20 sm:py-28 lg:py-32"
      >
        {["</>", "{ }", "SQL", "AI", "::"].map((glyph, index) => (
          <span
            key={glyph}
            aria-hidden="true"
            data-depth={0.15 + index * 0.1}
            className="float pointer-events-none absolute font-mono text-3xl text-electric/25"
            style={{
              left: `${8 + index * 21}%`,
              top: `${12 + (index % 3) * 30}%`,
              animationDelay: `${index}s`,
            }}
          >
            {glyph}
          </span>
        ))}
        <div className="relative mx-auto max-w-6xl">
          <div data-reveal className="mb-10 sm:mb-12">
            <p className="eyebrow mb-3">02 — Skills</p>
            <h2 className="h2">Tools I work with.</h2>
          </div>
          <div className="grid gap-x-10 gap-y-9 md:grid-cols-2 md:gap-y-12">
            {skills.map((group, index) => (
              <div
                key={group.title}
                data-reveal
                className={index % 2 ? "md:mt-12" : ""}
              >
                <h3 className="mb-4 font-display text-lg text-violet sm:text-xl">
                  {group.title}
                </h3>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    data-hline
                    className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-cyan/60 to-transparent"
                  />
                  <ul className="relative flex flex-wrap gap-2.5 sm:gap-3">
                    {group.items.map((skill) => (
                      <li key={skill}>
                        <Tilt className="rounded-lg">
                          <button
                            type="button"
                            onClick={(event) => {
                              setSelected(skill);
                              setSource(event.currentTarget);
                            }}
                            aria-haspopup="dialog"
                            className="holo-link min-h-11 rounded-lg border border-electric/30 bg-charcoal px-3.5 py-2 text-left text-sm text-white/85 hover:border-cyan hover:text-cyan sm:px-4"
                          >
                            {skill}
                            <span aria-hidden="true" className="ml-2 text-cyan/70">
                              ↗
                            </span>
                          </button>
                        </Tilt>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CinematicDialog
        source={source}
        title={selected ? `${selected} skill overview` : "Skill overview"}
        onClose={() => {
          setSelected(null);
          setSource(null);
        }}
      >
        {selected && (
          <div className="p-4 pt-14 sm:p-10 sm:pt-16">
            <p className="eyebrow">Technical skill</p>
            <h2 className="mt-3 font-display text-2xl font-bold leading-snug sm:text-4xl sm:leading-tight">
              {selected}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              This skill is listed in the portfolio’s technical skills. Related
              featured projects are shown below when the project’s documented
              technology stack includes it.
            </p>
            <div className="mt-6 sm:mt-8">
              <h3 className="font-display text-base font-semibold text-cyan sm:text-lg">
                Related featured projects
              </h3>
              {relatedProjects.length > 0 ? (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {relatedProjects.map((project) => (
                    <li
                      key={project.id}
                      className="rounded-xl border border-white/10 bg-charcoal/65 p-4"
                    >
                      <h4 className="font-display font-semibold">{project.name}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">
                        {project.tag}
                      </p>
                      <Link
                        href={`/projects/${project.id}`}
                        onClick={(event) => {
                          if (
                            event.button === 0 &&
                            !event.metaKey &&
                            !event.ctrlKey &&
                            !event.shiftKey &&
                            !event.altKey
                          ) {
                            savePortfolioReturn(project.id);
                          }
                        }}
                        className="holo-link mt-3 inline-flex min-h-10 items-center text-sm text-cyan hover:underline"
                      >
                        Open case study →
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  No featured project currently lists this skill in its verified
                  technology stack.
                </p>
              )}
            </div>
          </div>
        )}
      </CinematicDialog>
    </>
  );
}
