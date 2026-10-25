"use client";

import Link from "next/link";
import { useState } from "react";
import CinematicDialog from "@/components/CinematicDialog";
import Tilt from "@/components/Tilt";
import { projects, type Project } from "@/lib/content";
import ProjectImage from "@/components/ProjectImage";

export default function ProjectShowcase() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [previewSource, setPreviewSource] = useState<HTMLElement | null>(null);

  return (
    <>
      <section
        id="projects"
        data-bg="#070d20"
        className="relative z-10 py-20 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div data-reveal className="mb-8 sm:mb-12">
            <p className="eyebrow mb-3">03 — Projects</p>
            <h2 className="h2">Selected work.</h2>
          </div>
        </div>
        <div data-hscroll role="region" aria-label="Featured projects">
          <div
            data-project-track
            className="grid grid-cols-[minmax(0,1fr)] gap-4 px-5 pb-3 sm:gap-6 sm:pb-8 lg:px-12"
          >
            {projects.map((project, index) => (
              <Tilt
                key={project.id}
                className={`h-full shrink-0 rounded-2xl ${
                  project.flagship
                    ? "[width:min(88vw,44rem)]"
                    : "[width:min(85vw,30rem)]"
                }`}
              >
                <article
                  data-project-card
                  data-flagship={project.flagship || undefined}
                  className={`group flex h-full w-full min-w-0 flex-col gap-2.5 rounded-2xl border p-2.5 sm:gap-6 sm:p-6 ${
                    project.flagship
                      ? "border-cyan/50 bg-gradient-to-br from-electric/20 to-violet/15"
                      : "border-white/10 bg-charcoal/60"
                  }`}
                >
                  <ProjectImage project={project} compact />
                  <div className="flex flex-1 flex-col">
                    <p className="eyebrow">
                      {String(index + 1).padStart(2, "0")}
                      {project.flagship && " · Flagship"}
                    </p>
                    <h3 className="mt-1 font-display text-base font-bold leading-tight sm:mt-2 sm:text-3xl">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs leading-4 text-violet sm:text-base sm:leading-normal">
                      {project.tag}
                    </p>
                    <p className="mt-2 text-xs leading-[1.4] text-white/75 sm:mt-3 sm:text-base sm:leading-normal">
                      {project.desc}
                    </p>
                    {project.stack.length > 0 ? (
                      <ul
                        aria-label="Featured technologies"
                        className="mt-2 flex flex-wrap gap-2 sm:mt-3"
                      >
                        {project.stack.map((technology) => (
                          <li
                            key={technology}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] leading-4 text-white/75 sm:text-xs"
                          >
                            {technology}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-xs text-white/40 sm:mt-3">
                        Technology details not confirmed
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-2 text-[11px] sm:gap-4 sm:pt-5 sm:text-sm">
                      <button
                        type="button"
                        onClick={(event) => {
                          setSelected(project);
                          setPreviewSource(event.currentTarget);
                        }}
                        className="holo-link min-h-10 rounded-full border border-cyan/35 px-3 py-2 font-medium text-cyan hover:border-cyan sm:px-4"
                        aria-label={`Open overview for ${project.name}`}
                      >
                        Quick view
                      </button>
                      <Link
                        href={`/projects/${project.id}`}
                        className="holo-link font-medium text-cyan hover:underline"
                      >
                        Case study →
                      </Link>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="holo-link text-white/70 hover:text-cyan"
                        >
                          Live demo
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="holo-link text-white/70 hover:text-cyan"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Tilt>
            ))}
          </div>
        </div>
      </section>
      <CinematicDialog
        source={previewSource}
        title={selected ? `${selected.name} project overview` : "Project overview"}
        onClose={() => {
          setSelected(null);
          setPreviewSource(null);
        }}
      >
        {selected && (
          <div>
            <div className="border-b border-white/10 bg-[#090f20] p-2 sm:p-6">
              <ProjectImage project={selected} preview />
            </div>
            <div className="p-4 sm:p-10">
              <p className="eyebrow">Project overview</p>
              <h2 className="mt-2 max-w-4xl font-display text-2xl font-bold leading-snug sm:text-4xl sm:leading-tight">
                {selected.name}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-violet sm:mt-3 sm:text-lg">
                {selected.tag}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base">
                {selected.desc}
              </p>
              <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-2">
                {[
                  ["Problem", selected.problem],
                  ["Approach", selected.approach],
                  ["Outcome", selected.outcome],
                  ["Project context", selected.role],
                ].map(([label, text]) => (
                  <section
                    key={label}
                    className="rounded-xl border border-white/10 bg-charcoal/60 p-4 sm:p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-cyan sm:text-lg">
                      {label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {text}
                    </p>
                  </section>
                ))}
              </div>
              {selected.stack.length > 0 && (
                <div className="mt-6 sm:mt-7">
                  <h3 className="font-display font-semibold">Technologies</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {selected.stack.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-electric/30 bg-midnight/60 px-2.5 py-1 text-[11px] text-white/75 sm:px-3 sm:py-1.5 sm:text-xs"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                <Link
                  href={`/projects/${selected.id}`}
                  className="holo-link inline-flex min-h-11 items-center rounded-full border border-cyan/40 px-4 py-2.5 text-sm text-cyan sm:px-5 sm:py-3"
                >
                  Full case study →
                </Link>
                {selected.demo && (
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="holo-link inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 py-2.5 text-sm sm:px-5 sm:py-3"
                  >
                    Live demo ↗
                  </a>
                )}
                {selected.repo && (
                  <a
                    href={selected.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="holo-link inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 py-2.5 text-sm sm:px-5 sm:py-3"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </CinematicDialog>
    </>
  );
}
