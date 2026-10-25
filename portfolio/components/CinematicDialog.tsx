"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

export default function CinematicDialog({
  source,
  title,
  children,
  onClose,
}: {
  source: HTMLElement | null;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Animation | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const sourceRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!source || !dialog || !panel || dialog.open) return;

    sourceRef.current = source;
    closingRef.current = false;
    dialog.showModal();
    window.dispatchEvent(new CustomEvent("portfolio:overlay-open"));

    const animateIn = () => {
      const sourceRect = source.getBoundingClientRect();
      const targetRect = panel.getBoundingClientRect();
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(panel, { transformOrigin: "top left" });
      if (reducedMotion || !sourceRect.width || !sourceRect.height) {
        gsap.set(panel, { clearProps: "transform,opacity" });
        return;
      }

      timelineRef.current = gsap.fromTo(
        panel,
        {
          x: sourceRect.left - targetRect.left,
          y: sourceRect.top - targetRect.top,
          scaleX: sourceRect.width / targetRect.width,
          scaleY: sourceRect.height / targetRect.height,
          opacity: 0.82,
        },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          duration: 0.62,
          ease: "power3.inOut",
          clearProps: "transform,opacity",
        },
      );
    };

    openFrameRef.current = requestAnimationFrame(() => {
      openFrameRef.current = null;
      animateIn();
    });
  }, [source]);

  useLayoutEffect(
    () => () => {
      if (openFrameRef.current !== null) {
        cancelAnimationFrame(openFrameRef.current);
      }
      timelineRef.current?.kill();
    },
    [],
  );

  const finishClose = () => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog?.open || !panel || closingRef.current) return;
    closingRef.current = true;
    if (openFrameRef.current !== null) {
      cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
    timelineRef.current?.kill();

    const origin = sourceRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!origin?.isConnected || reducedMotion) {
      dialog.close();
      return;
    }
    dialog.classList.add("is-closing");

    const current = {
      x: Number(gsap.getProperty(panel, "x")),
      y: Number(gsap.getProperty(panel, "y")),
      scaleX: Number(gsap.getProperty(panel, "scaleX")),
      scaleY: Number(gsap.getProperty(panel, "scaleY")),
      opacity: Number(gsap.getProperty(panel, "opacity")),
    };
    gsap.set(panel, { clearProps: "transform" });
    const targetRect = panel.getBoundingClientRect();
    const sourceRect = origin.getBoundingClientRect();
    gsap.set(panel, current);

    timelineRef.current = gsap.to(panel, {
      x: sourceRect.left - targetRect.left,
      y: sourceRect.top - targetRect.top,
      scaleX: sourceRect.width / targetRect.width,
      scaleY: sourceRect.height / targetRect.height,
      opacity: 0.82,
      duration: 0.48,
      ease: "power3.inOut",
      onComplete: () => dialog.close(),
    });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        finishClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          finishClose();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) finishClose();
      }}
      onClose={() => {
        timelineRef.current?.kill();
        gsap.set(panelRef.current, { clearProps: "all" });
        dialogRef.current?.classList.remove("is-closing");
        window.dispatchEvent(new CustomEvent("portfolio:overlay-close"));
        const sourceElement = sourceRef.current;
        if (sourceElement?.isConnected) {
          sourceElement.focus({ preventScroll: true });
        }
        sourceRef.current = null;
        closingRef.current = false;
        onCloseRef.current();
      }}
      className="cinematic-dialog m-auto max-h-[90vh] max-h-[90dvh] w-[min(94vw,72rem)] max-w-none overflow-x-hidden overflow-y-auto rounded-2xl border border-cyan/25 bg-[#080e20] p-0 text-white shadow-[0_30px_120px_-30px_#2f6bff88] backdrop:bg-midnight/80 backdrop:backdrop-blur-md sm:max-h-[94vh] sm:max-h-[94dvh] sm:w-[min(96vw,72rem)]"
    >
      <div
        ref={panelRef}
        className="cinematic-dialog-panel relative rounded-2xl"
      >
        <button
          type="button"
          autoFocus
          onClick={finishClose}
          aria-label="Close preview"
          className="sticky top-3 z-20 ml-auto mr-3 mt-3 -mb-11 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-midnight/90 text-2xl text-white transition hover:border-cyan hover:text-cyan"
        >
          <span aria-hidden="true">×</span>
        </button>
        {children}
      </div>
    </dialog>
  );
}
