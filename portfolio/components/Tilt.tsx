"use client";
import { useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

export default function Tilt({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      if (touchTimer.current) clearTimeout(touchTimer.current);
      const element = event.currentTarget;
      touchTimer.current = setTimeout(() => {
        element.dataset.touchActive = "false";
        touchTimer.current = null;
      }, 180);
    } else {
      event.currentTarget.dataset.touchActive = "false";
    }
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  useEffect(
    () => () => {
      if (touchTimer.current) clearTimeout(touchTimer.current);
    },
    [],
  );

  return (
    <div
      className={`holo-tilt [perspective:1000px] ${className}`}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          matchMedia("(prefers-reduced-motion: reduce)").matches ||
          !cardRef.current
        ) {
          return;
        }
        const bounds = event.currentTarget.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
        event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
        cardRef.current.style.transform = `rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 6}deg) scale(1.015)`;
      }}
      onPointerLeave={reset}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") {
          if (touchTimer.current) clearTimeout(touchTimer.current);
          event.currentTarget.dataset.touchActive = "true";
        }
      }}
      onPointerUp={reset}
      onPointerCancel={reset}
    >
      <div
        ref={cardRef}
        className="relative h-full transition-transform duration-300 ease-out [transform-style:preserve-3d]"
      >
        {children}
      </div>
    </div>
  );
}
