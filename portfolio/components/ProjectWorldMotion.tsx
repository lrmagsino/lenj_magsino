"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectWorldMotion() {
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const worldLayer =
      document.querySelector<HTMLElement>("[data-world-layer]");
    if (!worldLayer) return;

    const mobile = () => matchMedia("(max-width: 767px)").matches;
    const context = gsap.context(() => {
      gsap.fromTo(
        worldLayer,
        { x: 0, y: 0, scale: 1 },
        {
          x: () =>
            document.documentElement.clientWidth *
            (mobile() ? motion.world.mobileX : motion.world.desktopX),
          y: () =>
            -innerHeight *
            (mobile() ? motion.world.mobileY : motion.world.desktopY),
          scale: () =>
            mobile() ? motion.world.mobileScale : motion.world.desktopScale,
          transformOrigin: () =>
            mobile()
              ? motion.world.mobileOrigin
              : motion.world.desktopOrigin,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: () =>
              `+=${Math.max(1, ScrollTrigger.maxScroll(window))}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => context.revert();
  }, []);

  return null;
}
