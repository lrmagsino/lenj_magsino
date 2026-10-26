"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { links, profile } from "@/lib/content";
import { useExperience } from "@/components/Experience";

const N: [number, number][] = [
  [8, 10],
  [52, 4],
  [92, 14],
  [20, 40],
  [70, 36],
  [96, 52],
  [10, 72],
  [46, 64],
  [84, 80],
  [40, 94],
];
const L = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 4],
  [2, 5],
  [3, 4],
  [3, 6],
  [3, 7],
  [4, 7],
  [4, 5],
  [5, 8],
  [6, 7],
  [7, 8],
  [7, 9],
  [8, 9],
  [6, 9],
];

const Win = ({
  title,
  lines,
  className,
  depth,
  mouseDepth,
  delay,
}: {
  title: string;
  lines: string[][];
  className: string;
  depth: string;
  mouseDepth: string;
  delay: string;
}) => (
  <div data-depth={depth} className={`absolute ${className}`}>
    <div data-m={mouseDepth}>
      <div data-win>
        <div
          className="float rounded-xl border border-violet/30 bg-charcoal/80 shadow-[0_0_60px_-12px_#2F6BFF66] backdrop-blur-sm"
          style={{ animationDelay: delay }}
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <i className="h-2 w-2 rounded-full bg-violet" />
            <i className="h-2 w-2 rounded-full bg-cyan" />
            <i className="h-2 w-2 rounded-full bg-electric" />
            <span className="ml-2 font-mono text-[10px] text-white/40">{title}</span>
          </div>
          <pre className="p-3 font-mono text-[11px] leading-5">
            {lines.map((line, index) => (
              <span key={index} className="block">
                <span className="text-violet">{line[0]}</span>
                <span className="text-cyan/90">{line[1]}</span>
                <span className="text-white/60">{line[2]}</span>
              </span>
            ))}
          </pre>
        </div>
      </div>
    </div>
  </div>
);

export default function Hero({ resumeAvailable }: { resumeAvailable: boolean }) {
  const root = useRef<HTMLElement>(null);
  const { phase, markReady } = useExperience();

  useLayoutEffect(() => {
    if (phase !== "main-entering") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markReady();
      return;
    }

    const element = root.current;
    if (!element) return;

    let mouseMove: ((event: MouseEvent) => void) | null = null;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: markReady });
      timeline
        .from("[data-h]", {
          yPercent: 110,
          opacity: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: "power4.out",
        })
        .from(
          "[data-win]",
          { opacity: 0, scale: 0.9, y: 60, stagger: 0.18, duration: 1.4, ease: "power3.out" },
          "-=0.55",
        )
        .from("[data-mesh]", { opacity: 0, duration: 2 }, "-=1.1");

      if (window.matchMedia("(pointer:fine)").matches) {
        const mouseTargets = gsap.utils.toArray<HTMLElement>("[data-m]").map((layer) => ({
          x: gsap.quickTo(layer, "x", { duration: 0.9 }),
          y: gsap.quickTo(layer, "y", { duration: 0.9 }),
          depth: Number.parseFloat(layer.dataset.m || "10"),
        }));
        mouseMove = (event) => {
          const x = event.clientX / innerWidth - 0.5;
          const y = event.clientY / innerHeight - 0.5;
          mouseTargets.forEach((target) => {
            target.x(-x * target.depth);
            target.y(-y * target.depth);
          });
        };
        addEventListener("mousemove", mouseMove);
      }
    }, element);

    return () => {
      if (mouseMove) removeEventListener("mousemove", mouseMove);
      context.revert();
    };
  }, [phase, markReady]);

  return (
    <section id="home" ref={root} className="relative z-10 flex min-h-dvh items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="hero-atmosphere absolute inset-0"
      />
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-40" data-depth="0.08">
        <defs>
          <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" stroke="var(--color-electric)" strokeOpacity=".18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 lg:w-[55%] lg:opacity-100">
        <div data-mesh data-depth="0.12" className="absolute inset-[6%]">
          <div data-m="14" className="absolute inset-0">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <g className="pulse" stroke="var(--color-cyan)" strokeOpacity=".28" fill="none">
                {L.map(([start, end]) => (
                  <line
                    key={`${start}-${end}`}
                    x1={N[start][0]}
                    y1={N[start][1]}
                    x2={N[end][0]}
                    y2={N[end][1]}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
            </svg>
            {N.map(([x, y], index) => (
              <i
                key={index}
                className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_12px_#3CE0F0]"
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <Win
            title="pipeline.ts"
            depth="0.2"
            mouseDepth="24"
            delay="0s"
            className="left-[12%] top-[16%] w-[58%]"
            lines={[
              ["const ", "build", " = async () => {"],
              ["  const ", "docs", " = await scan();"],
              ["  return ", "graph", "(docs);"],
              ["};", "", ""],
            ]}
          />
          <Win
            title="schema.sql"
            depth="0.32"
            mouseDepth="34"
            delay="2s"
            className="right-[4%] top-[44%] w-[50%]"
            lines={[
              ["SELECT ", "title, layout", ""],
              ["FROM ", "documents", ""],
              ["WHERE ", "ocr = true", ";"],
            ]}
          />
          <Win
            title="model.py"
            depth="0.14"
            mouseDepth="18"
            delay="4s"
            className="left-[22%] bottom-[8%] w-[44%]"
            lines={[
              ["def ", "predict", "(x):"],
              ["  return ", "model", "(x)"],
            ]}
          />
        </div>
        <span data-depth="0.5" className="absolute bottom-[5%] right-[6%] font-mono text-xl text-electric/40">
          {"{ ai: true }"}
        </span>
        <span data-depth="0.45" className="absolute right-[8%] top-[10%] font-mono text-xl text-violet/40 lg:right-[40%]">
          {"</>"}
        </span>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:py-28">
        <p className="eyebrow mb-4 max-w-full overflow-hidden text-[10px] leading-relaxed sm:text-xs">
          <span data-h className="inline-block">{profile.headline}</span>
        </p>
        <h1 className="font-display text-[clamp(2.1rem,9vw,6.5rem)] font-extrabold leading-[.97] tracking-[-0.04em]">
          {["LENJ JESTHER", "R. MAGSINO"].map((word) => (
            <span key={word} className="block overflow-hidden">
              <span data-h className="block bg-gradient-to-r from-white to-cyan bg-clip-text text-transparent">{word}</span>
            </span>
          ))}
        </h1>
        <p className="mt-5 max-w-lg overflow-hidden text-balance text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg">
          <span data-h className="block">{profile.tagline}</span>
        </p>
        <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
          <a href="#projects" className="holo-link inline-flex min-h-11 items-center rounded-full bg-electric px-5 py-3 text-sm font-medium hover:bg-electric/80 sm:px-6 sm:text-base">Explore My Work</a>
          {resumeAvailable ? (
            <a href={links.resume} download className="holo-link inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 py-3 text-sm hover:border-cyan hover:text-cyan sm:px-6 sm:text-base">Download Résumé</a>
          ) : (
            <button type="button" disabled className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 py-3 text-sm text-white/45 sm:px-6 sm:text-base">Résumé · coming soon</button>
          )}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/60">
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="holo-link inline-flex min-h-10 items-center hover:text-cyan">LinkedIn ↗</a>
          <a href={links.github} target="_blank" rel="noreferrer" className="holo-link inline-flex min-h-10 items-center hover:text-cyan">GitHub ↗</a>
          <a href={links.email} className="holo-link inline-flex min-h-10 items-center hover:text-cyan">Email ↗</a>
        </div>
      </div>
      <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="block h-12 w-px bg-gradient-to-b from-cyan to-transparent pulse" />
      </a>
    </section>
  );
}
