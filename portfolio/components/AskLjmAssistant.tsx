"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LenjiPTChat from "@/components/LenjiPTChat";

export default function AskLjmAssistant() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionVisibleRef = useRef(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Animation | null>(null);
  const closingRef = useRef(false);
  const afterCloseRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = document.getElementById("lenjipt");
    if (!section) return;
    const updateVisibility = () => {
      const bounds = section.getBoundingClientRect();
      const visible =
        bounds.top < window.innerHeight * 0.9 &&
        bounds.bottom > window.innerHeight * 0.1;
      if (visible === sectionVisibleRef.current) return;
      sectionVisibleRef.current = visible;
      setSectionVisible(visible);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    window.visualViewport?.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      window.visualViewport?.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const openAssistant = () => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog || !panel || dialog.open) return;
    dialog.showModal();
    window.dispatchEvent(new CustomEvent("portfolio:overlay-open"));
    closingRef.current = false;
    closeRef.current?.focus({ preventScroll: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(panel, { clearProps: "all" });
      return;
    }

    timelineRef.current?.kill();
    timelineRef.current = gsap.fromTo(
      panel,
      { autoAlpha: 0, y: 18, scale: 0.985 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.24,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
      },
    );
  };

  const finishClose = (afterClose?: () => void) => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog?.open || !panel || closingRef.current) return;
    closingRef.current = true;
    afterCloseRef.current = afterClose ?? null;
    timelineRef.current?.kill();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }

    timelineRef.current = gsap.to(panel, {
      autoAlpha: 0,
      y: 14,
      scale: 0.985,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => dialog.close(),
    });
  };

  const navigateTo = (href: string) => {
    finishClose(() => {
      const navLink = document.querySelector<HTMLAnchorElement>(
        `nav a[href="${href}"]`,
      );
      if (navLink) navLink.click();
      else document.querySelector<HTMLElement>(href)?.scrollIntoView();
    });
  };

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        aria-label="Open LenjiPT portfolio assistant"
        aria-haspopup="dialog"
        aria-hidden={sectionVisible}
        aria-controls="lenjipt-chat-dialog"
        title="Ask LenjiPT"
        disabled={sectionVisible}
        tabIndex={sectionVisible ? -1 : undefined}
        onClick={openAssistant}
        className={`theme-aware-content holo-link fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[70] inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-full border border-cyan/40 bg-charcoal/90 px-3 text-cyan shadow-[0_8px_32px_-12px_rgba(60,224,240,.42)] backdrop-blur-xl transition-opacity hover:border-cyan/80 hover:bg-charcoal sm:px-4 ${
          sectionVisible
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-5 w-5 shrink-0"
        >
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-5.5A7.5 7.5 0 1 1 20 11.5Z" />
          <path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01" strokeWidth="2.5" />
        </svg>
        <span className="hidden font-mono text-xs font-semibold tracking-[0.14em] sm:inline">
          ASK LENJIPT
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="lenjipt-chat-dialog"
        aria-label="LenjiPT portfolio assistant"
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
          closingRef.current = false;
          window.dispatchEvent(new CustomEvent("portfolio:overlay-close"));
          openerRef.current?.focus({ preventScroll: true });
          const action = afterCloseRef.current;
          afterCloseRef.current = null;
          if (action) requestAnimationFrame(action);
        }}
        className="lenjipt-dialog theme-aware-content fixed inset-auto bottom-[calc(5rem+env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[80] m-0 h-[min(44rem,calc(100dvh-7rem))] w-[min(34rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-2xl border border-cyan/30 bg-midnight/95 p-0 text-[color:var(--color-text-primary)] shadow-[0_24px_90px_-28px_rgba(47,107,255,.48)] backdrop-blur-2xl max-[639px]:inset-x-0 max-[639px]:bottom-0 max-[639px]:top-auto max-[639px]:h-[min(88dvh,52rem)] max-[639px]:w-full max-[639px]:rounded-b-none max-[639px]:rounded-t-3xl"
      >
        <div ref={panelRef} className="h-full overflow-y-auto p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <p className="font-mono text-[10px] tracking-[0.18em] text-cyan">
              ASK · EXPLORE · DISCOVER
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => finishClose()}
              aria-label="Close LenjiPT"
              className="holo-link grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-2xl leading-none text-[color:var(--color-text-secondary)] hover:border-cyan/50 hover:text-cyan"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <LenjiPTChat idPrefix="dialog" onInternalNavigate={navigateTo} />
        </div>
      </dialog>
    </>
  );
}
