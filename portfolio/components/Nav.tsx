"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { links } from "@/lib/content";
import { useExperience } from "@/components/Experience";
import { usePortfolioTheme } from "@/components/ThemeProvider";

const items = ["home", "about", "skills", "projects", "education", "activities", "certifications", "contact"];

export default function Nav({ resumeAvailable }: { resumeAvailable: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { phase } = useExperience();
  const { theme, toggleTheme } = usePortfolioTheme();
  const mainActive = phase === "main-entering" || phase === "ready";

  useEffect(() => {
    if (!mainActive) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [mainActive]);

  useEffect(() => {
    if (phase !== "ready") {
      setScrollProgress(0);
      return;
    }

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        maxScroll > 0
          ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100))
          : 0;
      setScrollProgress(Math.round(progress));
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateProgress);
    };
    const resizeObserver = new ResizeObserver(scheduleUpdate);

    updateProgress();
    resizeObserver.observe(document.documentElement);
    if (document.body) resizeObserver.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.visualViewport?.addEventListener("resize", scheduleUpdate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [phase]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header
      aria-hidden={!mainActive}
      inert={!mainActive}
      className={`fixed inset-x-0 top-0 z-50 bg-midnight/60 backdrop-blur-md transition-opacity duration-500 ${
        mainActive ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 pb-3 pt-[max(.75rem,env(safe-area-inset-top))] sm:px-5 md:py-4">
        <a href="#home" className="holo-link font-display font-bold tracking-tight">
          LJM<span className="text-cyan">.</span>
        </a>
        <ul
          id="menu"
          className={`absolute left-0 right-0 top-full max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto border-b border-white/10 bg-midnight/95 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 ease-out lg:static lg:flex lg:max-h-none lg:flex-row lg:items-center lg:gap-6 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none lg:opacity-100 lg:translate-y-0 lg:visible lg:pointer-events-auto ${
            open
              ? "flex translate-y-0 opacity-100 visible pointer-events-auto"
              : "invisible -translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          {items.map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                onClick={() => setOpen(false)}
                aria-current={active === item ? "page" : undefined}
                className={`holo-link flex min-h-11 items-center rounded-lg px-3 text-sm capitalize transition-colors hover:bg-white/5 hover:text-cyan lg:min-h-0 lg:px-0 lg:hover:bg-transparent ${
                  active === item ? "text-cyan" : "text-white/70"
                }`}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/recruiter"
              onClick={() => setOpen(false)}
              className="holo-link flex min-h-11 items-center rounded-lg px-3 text-sm text-cyan transition-colors hover:bg-white/5 hover:text-cyan lg:min-h-0 lg:px-0 lg:hover:bg-transparent"
            >
              Recruiter View
            </Link>
          </li>
          <li>
            {resumeAvailable ? (
              <a href={links.resume} download className="holo-link rounded-full border border-electric/60 px-4 py-1.5 text-sm hover:bg-electric/20">
                Résumé
              </a>
            ) : (
              <span aria-disabled="true" title="Résumé coming soon" className="cursor-not-allowed rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/40">
                Résumé · soon
              </span>
            )}
          </li>
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <button
            className="holo-link min-h-11 min-w-11 rounded-lg p-2 lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="theme-toggle holo-link grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cyan/20 bg-charcoal/70 text-cyan hover:border-cyan/50 hover:text-electric"
          >
            {theme === "dark" ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="theme-toggle-icon h-5 w-5"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="theme-toggle-icon h-5 w-5"
              >
                <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.6 8.6 0 1 0 20.5 15.2Z" />
              </svg>
            )}
          </button>
          <span
            role="progressbar"
            aria-label="Page scroll progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={scrollProgress}
            className="scroll-progress-pill relative isolate inline-flex h-9 min-w-[3.75rem] items-center justify-center overflow-hidden rounded-full border border-cyan/20 px-3 font-mono text-xs font-semibold tabular-nums shadow-[inset_0_0_14px_rgba(60,224,240,.08)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 z-0 rounded-full bg-gradient-to-r from-electric/45 to-cyan/35 transition-[width] duration-200 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
            <span className="relative z-10">{scrollProgress}%</span>
          </span>
        </div>
      </nav>
    </header>
  );
}
