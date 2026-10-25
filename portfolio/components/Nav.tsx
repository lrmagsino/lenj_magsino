"use client";

import { useEffect, useState } from "react";
import { links } from "@/lib/content";
import { useExperience } from "@/components/Experience";

const items = ["home", "about", "skills", "projects", "education", "activities", "certifications", "contact"];

export default function Nav({ resumeAvailable }: { resumeAvailable: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { phase } = useExperience();
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
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 pb-3 pt-[max(.75rem,env(safe-area-inset-top))] md:py-4">
        <a href="#home" className="holo-link font-display font-bold tracking-tight">
          LJM<span className="text-cyan">.</span>
        </a>
        <button
          className="holo-link min-h-11 min-w-11 rounded-lg p-2 md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <ul
          id="menu"
          className={`absolute left-0 right-0 top-full flex-col gap-1 border-b border-white/10 bg-midnight/95 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 ease-out md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none md:opacity-100 md:translate-y-0 md:visible md:pointer-events-auto ${
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
                className={`holo-link flex min-h-11 items-center rounded-lg px-3 text-sm capitalize transition-colors hover:bg-white/5 hover:text-cyan md:min-h-0 md:px-0 md:hover:bg-transparent ${
                  active === item ? "text-cyan" : "text-white/70"
                }`}
              >
                {item}
              </a>
            </li>
          ))}
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
      </nav>
    </header>
  );
}
