"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useExperience } from "@/components/Experience";

const CODE_SYMBOLS = [
  { value: "const", left: "18%", top: "28%" },
  { value: "</>", left: "78%", top: "24%" },
  { value: "{ }", left: "15%", top: "69%" },
  { value: "01", left: "81%", top: "70%" },
  { value: "=>", left: "32%", top: "16%" },
  { value: ".ts", left: "68%", top: "82%" },
  { value: "async", left: "86%", top: "47%" },
  { value: "[ ]", left: "11%", top: "47%" },
];

export default function PortfolioIntro() {
  const { phase, initialized, beginIntroExit, enterMain } = useExperience();
  const visible = phase === "intro" || phase === "intro-exiting";
  const rootRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const exitTweenRef = useRef<gsap.core.Tween | null>(null);
  const exitingRef = useRef(false);

  useEffect(() => {
    const skip = () => {
      if (!initialized || phase !== "intro" || exitingRef.current) return;
      exitingRef.current = true;
      timelineRef.current?.kill();
      timelineRef.current = null;
      beginIntroExit();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!initialized || phase !== "intro" || event.metaKey || event.ctrlKey || event.altKey) return;
      event.preventDefault();
      event.stopPropagation();
      skip();
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [initialized, phase, beginIntroExit]);

  useEffect(() => {
    if (!initialized || phase !== "intro") return;
    const root = rootRef.current;
    if (!root) return;

    exitingRef.current = false;
    skipButtonRef.current?.focus({ preventScroll: true });
    const symbols = gsap.utils.toArray<HTMLElement>("[data-intro-code]", root);
    const nameLines = gsap.utils.toArray<HTMLElement>("[data-intro-name]", root);
    const timeline = gsap.timeline({
      onComplete: beginIntroExit,
      defaults: { ease: "power3.out" },
    });
    timelineRef.current = timeline;

    gsap.set(root, { autoAlpha: 1, scale: 1 });
    timeline
      .fromTo(
        "[data-intro-orbit]",
        { scale: 0.76, rotation: -14, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8 },
        0,
      )
      .fromTo(
        symbols,
        { x: -110, y: 80, scale: 0.4, rotation: -24, opacity: 0 },
        {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 0.58,
          duration: 0.72,
          stagger: 0.045,
        },
        0.05,
      )
      .fromTo(
        "[data-intro-monogram]",
        { y: 22, scale: 0.78, opacity: 0, letterSpacing: "0.42em" },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          letterSpacing: "0.16em",
          duration: 0.72,
        },
        0.48,
      )
      .to(
        "[data-intro-monogram]",
        { y: -18, scale: 0.86, opacity: 0, duration: 0.32, ease: "power2.in" },
        "+=0.36",
      )
      .fromTo(
        nameLines,
        { yPercent: 110, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.62,
          stagger: 0.1,
        },
        "-=0.08",
      )
      .fromTo(
        "[data-intro-role]",
        { y: 14, opacity: 0, letterSpacing: "0.28em" },
        { y: 0, opacity: 1, letterSpacing: "0.16em", duration: 0.48 },
        "-=0.1",
      )
      .fromTo(
        "[data-intro-tagline]",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 0.78, duration: 0.48 },
        "-=0.12",
      );

    return () => {
      timeline.kill();
      if (timelineRef.current === timeline) timelineRef.current = null;
    };
  }, [initialized, phase, beginIntroExit]);

  useEffect(() => {
    if (phase !== "intro-exiting") return;
    const root = rootRef.current;
    if (!root) {
      enterMain();
      return;
    }

    const tween = gsap.to(root, {
      autoAlpha: 0,
      scale: 1.025,
      duration: 0.42,
      ease: "power2.inOut",
      onComplete: enterMain,
    });
    exitTweenRef.current = tween;
    return () => {
      tween.kill();
      if (exitTweenRef.current === tween) exitTweenRef.current = null;
    };
  }, [phase, enterMain]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-intro-name"
      aria-describedby="portfolio-intro-tagline"
      onPointerDown={() => {
        if (initialized && phase === "intro" && !exitingRef.current) {
          exitingRef.current = true;
          timelineRef.current?.kill();
          timelineRef.current = null;
          beginIntroExit();
        }
      }}
      className="fixed inset-0 z-[100] grid min-h-dvh place-items-center overflow-hidden overscroll-none bg-[#050B1A]/80 px-4 py-16 text-center backdrop-blur-[2px] touch-none sm:px-5 sm:py-12"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 45%, rgba(47,107,255,.2), transparent 48%), radial-gradient(ellipse at 18% 82%, rgba(139,124,246,.12), transparent 36%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(60,224,240,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(60,224,240,.13) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 78%)",
        }}
      />

      <div
        data-intro-orbit
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(72vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10 opacity-0 sm:w-[min(76vw,34rem)]"
      >
        <span className="absolute inset-[9%] rounded-full border border-violet/15" />
        <span className="absolute inset-[21%] rounded-full border border-electric/15" />
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_24px_8px_#3CE0F044]" />
        <span className="absolute bottom-[16%] right-[8%] h-2 w-2 rounded-full bg-violet shadow-[0_0_24px_8px_#8B7CF644]" />
      </div>

      {CODE_SYMBOLS.map((symbol) => (
        <span
          key={`${symbol.value}-${symbol.left}`}
          data-intro-code
          aria-hidden="true"
          className="pointer-events-none absolute font-mono text-[10px] tracking-wider text-cyan/70 opacity-0 sm:text-sm"
          style={{ left: symbol.left, top: symbol.top }}
        >
          {symbol.value}
        </span>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div
          data-intro-monogram
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-display text-[clamp(4rem,20vw,12rem)] font-extrabold leading-none text-white opacity-0"
        >
          <span className="bg-gradient-to-br from-white via-cyan to-violet bg-clip-text text-transparent">
            LJM
          </span>
        </div>
        <h1
          id="portfolio-intro-name"
          className="font-display text-[clamp(2rem,9vw,6.75rem)] font-extrabold leading-[0.98] tracking-[-0.055em]"
        >
          <span className="block overflow-hidden pb-1">
            <span data-intro-name className="block bg-gradient-to-r from-white to-cyan bg-clip-text text-transparent opacity-0">
              LENJ JESTHER
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span data-intro-name className="block bg-gradient-to-r from-cyan to-white bg-clip-text text-transparent opacity-0">
              MAGSINO
            </span>
          </span>
        </h1>
        <p
          data-intro-role
          className="mt-5 font-mono text-[clamp(.6rem,2.5vw,1rem)] font-medium uppercase tracking-[0.12em] text-cyan opacity-0 sm:mt-7 sm:tracking-[0.16em]"
        >
          Software Engineer in the Making
        </p>
        <p
          id="portfolio-intro-tagline"
          data-intro-tagline
          className="mx-auto mt-3 max-w-xl text-balance text-sm leading-relaxed text-white/80 opacity-0 sm:mt-4 sm:text-base"
        >
          Building Intelligent Systems. Creating Meaningful Digital Experiences.
        </p>
      </div>

      <button
        ref={skipButtonRef}
        type="button"
        onClick={() => {
          if (initialized && phase === "intro" && !exitingRef.current) {
            exitingRef.current = true;
            timelineRef.current?.kill();
            timelineRef.current = null;
            beginIntroExit();
          }
        }}
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-20 min-h-11 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-midnight/45 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/70 transition hover:border-cyan/60 hover:text-cyan focus-visible:outline-cyan sm:bottom-10 sm:px-5 sm:text-xs sm:tracking-[0.18em]"
      >
        Tap or press any key to skip
      </button>
    </div>
  );
}
