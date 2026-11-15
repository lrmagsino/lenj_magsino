"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type ProjectProgress = {
  current: number;
  visible: boolean;
};

export default function ProjectPreviewVideo({
  src,
  poster,
  projectNumber,
  projectName,
  isHovered,
}: {
  src: string;
  poster: string;
  projectNumber: number;
  projectName: string;
  isHovered: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [projectActive, setProjectActive] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [supportsHover, setSupportsHover] = useState(false);
  const [previewAllowed, setPreviewAllowed] = useState(true);
  const [previewRequested, setPreviewRequested] = useState(false);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const reducedDataQuery = window.matchMedia("(prefers-reduced-data: reduce)");

    const updatePreferences = () => {
      setSupportsHover(hoverQuery.matches);
      setPreviewAllowed(
        !reducedMotionQuery.matches && !reducedDataQuery.matches,
      );
      if (reducedMotionQuery.matches || reducedDataQuery.matches) {
        setPreviewRequested(false);
      }
    };
    const updateVisibility = () => {
      const visible = document.visibilityState === "visible";
      setDocumentVisible(visible);
      if (!visible) setPreviewRequested(false);
    };

    updatePreferences();
    updateVisibility();
    hoverQuery.addEventListener("change", updatePreferences);
    reducedMotionQuery.addEventListener("change", updatePreferences);
    reducedDataQuery.addEventListener("change", updatePreferences);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      hoverQuery.removeEventListener("change", updatePreferences);
      reducedMotionQuery.removeEventListener("change", updatePreferences);
      reducedDataQuery.removeEventListener("change", updatePreferences);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const section = document.querySelector<HTMLElement>("[data-hscroll]");
    if (!section) return;

    const readProgress = () => {
      const active =
        section.dataset.projectIndicatorVisible === "true" &&
        Number(section.dataset.projectCurrent) === projectNumber;
      setProjectActive(active);
      if (!active) setPreviewRequested(false);
    };
    const handleProgress = (event: Event) => {
      const progress = (event as CustomEvent<ProjectProgress>).detail;
      if (!progress) return;
      const active =
        progress.visible && progress.current === projectNumber;
      setProjectActive(active);
      if (!active) setPreviewRequested(false);
    };
    const handleOverlayOpen = () => {
      setOverlayOpen(true);
      setPreviewRequested(false);
    };
    const handleOverlayClose = () => {
      setOverlayOpen(false);
      readProgress();
    };

    window.addEventListener("portfolio:project-progress", handleProgress);
    window.addEventListener("portfolio:overlay-open", handleOverlayOpen);
    window.addEventListener("portfolio:overlay-close", handleOverlayClose);
    readProgress();

    return () => {
      window.removeEventListener("portfolio:project-progress", handleProgress);
      window.removeEventListener("portfolio:overlay-open", handleOverlayOpen);
      window.removeEventListener("portfolio:overlay-close", handleOverlayClose);
    };
  }, [projectNumber]);

  useEffect(() => {
    const card = videoRef.current?.closest<HTMLElement>("[data-project-card]");
    if (!card || !("IntersectionObserver" in window)) {
      setCardVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        setCardVisible(visible);
        if (!visible) setPreviewRequested(false);
      },
      { threshold: [0, 0.35] },
    );
    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  const shouldPlay =
    previewAllowed &&
    projectActive &&
    cardVisible &&
    !overlayOpen &&
    documentVisible &&
    (supportsHover ? isHovered || previewRequested : previewRequested);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldPlay) {
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
      setHasPlayed(false);
      return;
    }

    let cancelled = false;
    void video.play().then(
      () => {
        if (!cancelled) setHasPlayed(true);
      },
      (error: unknown) => {
        if (
          cancelled ||
          (error instanceof DOMException && error.name === "AbortError")
        ) {
          return;
        }
        setHasPlayed(false);
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          console.warn(`Autoplay was blocked for project video: ${src}`);
          return;
        }
        console.error(`Project video playback failed: ${src}`, error);
      },
    );

    return () => {
      cancelled = true;
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
    };
  }, [shouldPlay, src]);

  const activatePreview = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (previewAllowed) setPreviewRequested(true);
  };

  return (
    <>
      <video
        ref={videoRef}
        data-project-video
        data-project-number={projectNumber}
        aria-hidden="true"
        tabIndex={-1}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        onError={(event) => {
          if (!shouldPlay && event.currentTarget.error?.code === 1) return;
          setHasPlayed(false);
          console.error(
            `Could not load project video: ${src}`,
            event.currentTarget.error?.message,
          );
        }}
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-300 ease-in-out"
        style={{ opacity: hasPlayed ? 1 : 0 }}
      />
      {!hasPlayed && previewAllowed ? (
        <button
          type="button"
          aria-label={`Play ${projectName} preview`}
          onClick={activatePreview}
          className="project-preview-action pointer-events-auto absolute bottom-3 left-3 z-20 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 bg-midnight/90 px-3 text-xs font-semibold text-text-primary shadow-lg backdrop-blur-md transition-[opacity,transform,background-color] duration-300 ease-out hover:bg-electric/90 hover:text-text-on-accent focus-visible:opacity-100 focus-visible:pointer-events-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 fill-current"
          >
            <path d="M5 3.25a.75.75 0 0 1 1.14-.64l6.5 4.25a.75.75 0 0 1 0 1.28l-6.5 4.25A.75.75 0 0 1 5 11.75z" />
          </svg>
          <span>Play Preview</span>
        </button>
      ) : null}
    </>
  );
}
