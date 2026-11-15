"use client";

import LenjiPTChat from "@/components/LenjiPTChat";

export default function LenjiPTSection() {
  return (
    <section
      id="lenjipt"
      data-city-district="command"
      data-bg="#0b142d"
      data-bg-light="#eef3fa"
      className="relative z-10 isolate overflow-hidden px-5 py-20 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        data-depth="0.14"
        className="pointer-events-none absolute -right-36 top-8 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/35 to-transparent"
      />
      <div className="relative mx-auto max-w-6xl">
        <div data-motion-heading="focus" className="mb-8 max-w-3xl sm:mb-12">
          <p className="eyebrow mb-3">04 — MEET LENJIPT</p>
          <h2 className="h2">A clearer way to explore my work.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Meet LenjiPT, your interactive guide to my portfolio. Ask about my
            projects, technical skills, education, certifications, and
            development journey—and discover the information that matters to
            you.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan sm:text-xs">
              Your Portfolio Companion
            </p>
            <span className="rounded-full border border-cyan/25 bg-cyan/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">
              Beta
            </span>
          </div>
        </div>
        <div data-reveal>
          <LenjiPTChat idPrefix="section" />
        </div>
      </div>
    </section>
  );
}
