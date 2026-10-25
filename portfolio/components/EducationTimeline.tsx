"use client";

import Image from "next/image";
import { useState } from "react";
import { education } from "@/lib/education";
import CinematicDialog from "@/components/CinematicDialog";
import Tilt from "@/components/Tilt";

export default function EducationTimeline() {
  const [selected, setSelected] = useState<(typeof education)[number] | null>(
    null,
  );
  const [previewSource, setPreviewSource] = useState<HTMLElement | null>(null);

  return (
    <section
      id="education"
      data-bg="#11182A"
      className="relative z-10 isolate overflow-hidden px-5 py-20 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        data-depth="0.12"
        className="pointer-events-none absolute -right-28 top-20 -z-10 h-80 w-80 rounded-full bg-violet/15 blur-3xl"
      />
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="mb-12">
          <p className="eyebrow mb-3">04 — Education</p>
          <h2 className="h2">Where I’m learning.</h2>
          <p className="mt-5 max-w-2xl text-white/65">
            My academic path from ICT in senior high school to an undergraduate
            Computer Science program.
          </p>
        </div>

        <ol className="relative grid gap-6 md:gap-10">
          <span
            aria-hidden="true"
            data-line
            className="absolute bottom-8 left-[15px] top-8 w-px bg-gradient-to-b from-cyan via-electric to-violet md:left-1/2"
          />
          {education.map((school, index) => (
            <li
              key={school.id}
              data-reveal
              className={`relative grid min-w-0 items-center gap-5 pl-8 md:grid-cols-[1fr_3rem_1fr] md:gap-6 md:pl-0 ${
                index % 2 === 1 ? "md:[&>div:first-of-type]:order-3" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute left-[9px] top-7 z-10 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-midnight bg-cyan shadow-[0_0_18px_#3CE0F0] md:left-1/2 md:top-1/2 md:-translate-x-1/2"
              />
              <Tilt
                className={`rounded-2xl ${
                  index % 2 === 1
                    ? "md:col-start-3 md:row-start-1"
                    : "md:col-start-1 md:row-start-1"
                }`}
              >
                <div className="flex min-w-0 flex-col items-start gap-4 rounded-2xl border border-white/10 bg-charcoal/75 p-4 shadow-[0_20px_60px_-35px_#2F6BFF88] min-[480px]:flex-row min-[480px]:items-center min-[480px]:p-5 sm:gap-5 sm:p-7">
                  <div
                    data-logo-reveal
                    className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-white shadow-lg min-[480px]:h-24 min-[480px]:w-24 sm:h-28 sm:w-28"
                  >
                    <div className="relative h-16 w-16 min-[480px]:h-20 min-[480px]:w-20 sm:h-24 sm:w-24">
                      <Image
                        src={school.logo}
                        alt={school.logoAlt}
                        fill
                        sizes="(max-width: 640px) 80px, 96px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow text-xs">{school.level}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug sm:text-2xl">
                      {school.institution}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {school.program}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                      <span className="font-mono text-cyan">{school.dates}</span>
                      <span className="rounded-full border border-cyan/30 px-3 py-1 text-xs text-cyan">
                        {school.status}
                      </span>
                    </div>
                    <a
                      href={school.logoSource}
                      target="_blank"
                      rel="noreferrer"
                      className="holo-link mt-3 inline-flex text-xs text-white/40 underline decoration-white/20 underline-offset-4 hover:text-cyan"
                    >
                      Official logo source ↗
                    </a>
                    <button
                      type="button"
                      onClick={(event) => {
                        setSelected(school);
                        setPreviewSource(event.currentTarget);
                      }}
                      className="holo-link mt-3 flex min-h-11 items-center rounded-full border border-cyan/30 px-4 text-xs text-cyan hover:border-cyan"
                      aria-label={`View education details for ${school.institution}`}
                    >
                      View education details
                    </button>
                  </div>
                </div>
              </Tilt>
              <div aria-hidden="true" className="hidden md:block" />
              <div
                aria-hidden="true"
                className={`hidden md:block ${
                  index % 2 === 1 ? "md:col-start-1 md:row-start-1" : "md:col-start-3 md:row-start-1"
                }`}
              />
            </li>
          ))}
        </ol>

        <p data-reveal className="mt-12 border-l border-violet/50 pl-4 text-sm text-white/55">
          Professional employment and internship details have not been provided.
        </p>
      </div>
      <CinematicDialog
        source={previewSource}
        title={selected ? `${selected.institution} education details` : "Education details"}
        onClose={() => {
          setSelected(null);
          setPreviewSource(null);
        }}
      >
        {selected && (
          <div className="grid gap-8 p-6 sm:grid-cols-[minmax(12rem,0.7fr)_1.3fr] sm:p-10">
            <div className="flex min-h-56 items-center justify-center rounded-2xl bg-white p-8">
              <Image
                src={selected.logo}
                alt={selected.logoAlt}
                width={240}
                height={240}
                className="max-h-56 w-full object-contain"
                priority
              />
            </div>
            <div className="self-center">
              <p className="eyebrow">{selected.level}</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                {selected.institution}
              </h2>
              <p className="mt-5 text-lg text-white/80">{selected.program}</p>
              <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-white/45">Academic period</dt>
                  <dd className="mt-1 font-mono text-cyan">{selected.dates}</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/45">Status</dt>
                  <dd className="mt-1 text-white/80">{selected.status}</dd>
                </div>
              </dl>
              <a
                href={selected.logoSource}
                target="_blank"
                rel="noreferrer"
                className="holo-link mt-8 inline-flex min-h-11 items-center rounded-full border border-cyan/35 px-5 text-sm text-cyan"
              >
                Official logo source ↗
              </a>
            </div>
          </div>
        )}
      </CinematicDialog>
    </section>
  );
}
