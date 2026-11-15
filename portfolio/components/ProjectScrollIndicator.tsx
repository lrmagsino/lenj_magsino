"use client";

import { useEffect, useState } from "react";

type ProjectProgress = {
  current: number;
  total: number;
  visible: boolean;
  prompt: boolean;
};

const initialProgress: ProjectProgress = {
  current: 1,
  total: 0,
  visible: false,
  prompt: false,
};

function readProgress(): ProjectProgress {
  const section = document.querySelector<HTMLElement>("[data-hscroll]");
  const { projectCurrent, projectTotal, projectIndicatorVisible, projectPrompt } =
    section?.dataset ?? {};
  const current = Number(projectCurrent);
  const total = Number(projectTotal);
  return {
    current: Number.isFinite(current) && current > 0 ? current : 1,
    total: Number.isFinite(total) && total > 0 ? total : 0,
    visible: projectIndicatorVisible === "true",
    prompt: projectPrompt === "true",
  };
}

export default function ProjectScrollIndicator() {
  const [progress, setProgress] = useState(initialProgress);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const updateProgress = (event: Event) => {
      const customEvent = event as CustomEvent<ProjectProgress>;
      setProgress(customEvent.detail);
    };
    const handleOverlayOpen = () => setOverlayOpen(true);
    const handleOverlayClose = () => setOverlayOpen(false);

    setProgress(readProgress());
    window.addEventListener("portfolio:project-progress", updateProgress);
    window.addEventListener("portfolio:overlay-open", handleOverlayOpen);
    window.addEventListener("portfolio:overlay-close", handleOverlayClose);
    return () => {
      window.removeEventListener("portfolio:project-progress", updateProgress);
      window.removeEventListener("portfolio:overlay-open", handleOverlayOpen);
      window.removeEventListener("portfolio:overlay-close", handleOverlayClose);
    };
  }, []);

  const visible = progress.visible && progress.total > 0 && !overlayOpen;
  const digits = Math.max(2, String(progress.total || 1).length);

  return (
    <div
      aria-hidden={!visible}
      role="status"
      aria-live="polite"
      className={`project-scroll-indicator theme-aware-content pointer-events-none fixed bottom-5 left-1/2 z-[60] inline-flex max-w-[calc(100vw-7rem)] -translate-x-1/2 items-center justify-center gap-2.5 rounded-full border border-cyan/25 bg-midnight/75 px-3.5 py-2.5 font-mono text-[10px] tracking-[0.12em] text-cyan shadow-[0_8px_32px_-14px_rgba(60,224,240,.55)] backdrop-blur-xl transition-[opacity,transform] duration-300 sm:bottom-6 sm:gap-3 sm:px-4 sm:py-3 sm:text-xs ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <span className="whitespace-nowrap font-semibold tabular-nums">
        <span className="sm:hidden">
          {String(progress.current).padStart(digits, "0")} /{" "}
          {String(progress.total).padStart(digits, "0")}
        </span>
        <span className="hidden sm:inline">
          PROJECT {String(progress.current).padStart(digits, "0")} /{" "}
          {String(progress.total).padStart(digits, "0")}
        </span>
      </span>
      {progress.prompt && (
        <>
          <span aria-hidden="true" className="h-3 w-px bg-cyan/25" />
          <span className="whitespace-nowrap">
            <span className="sm:hidden">SCROLL DOWN</span>
            <span className="hidden sm:inline">SCROLL TO NEXT PROJECT</span>
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5 shrink-0 animate-bounce"
          >
            <path
              d="M8 2.5v10m0 0-4-4m4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}
    </div>
  );
}
