"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useExperience } from "@/components/Experience";

gsap.registerPlugin(ScrollTrigger);

export default function Motion() {
  const { phase } = useExperience();

  useEffect(() => {
    if (phase !== "ready") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const pauseForOverlay = () => lenis.stop();
    const resumeAfterOverlay = () => {
      lenis.start();
      ScrollTrigger.update();
    };
    window.addEventListener("portfolio:overlay-open", pauseForOverlay);
    window.addEventListener("portfolio:overlay-close", resumeAfterOverlay);

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href")!);
      if (!target) return;
      event.preventDefault();
      const offset = matchMedia("(max-width: 767px)").matches ? -72 : -88;
      lenis.scrollTo(target, { offset });
    };
    document.addEventListener("click", handleAnchorClick);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const select = gsap.utils.toArray<HTMLElement>;

      select("[data-reveal], .certification-card").forEach((element) => {
        gsap.from(element, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 85%" },
        });
      });

      select("[data-depth]").forEach((element) => {
        const depth = Number.parseFloat(element.dataset.depth || "0.2");
        gsap.to(element, {
          y: () =>
            matchMedia("(max-width: 767px)").matches
              ? -Math.min(depth * 400, innerHeight * 0.12)
              : -depth * 400,
          ease: "none",
          scrollTrigger: {
            trigger: element.closest("section") || document.body,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const worldScroll = {
        trigger: document.documentElement,
        start: "top top",
        end: () => `+=${ScrollTrigger.maxScroll(window)}`,
        scrub: 1,
        invalidateOnRefresh: true,
      };
      const worldLayers = select("[data-world-layer]");
      const worldTravel = [
        { fromY: 5, toY: -5, fromX: -1, toX: 1.5, fromScale: 1.04, toScale: 1.1, rotate: 0 },
        { fromY: 12, toY: -12, fromX: 2, toX: -2, fromScale: 1, toScale: 1.04, rotate: 3 },
        { fromY: 19, toY: -19, fromX: -4, toX: 4, fromScale: 0.98, toScale: 1.04, rotate: -5 },
      ];
      worldLayers.forEach((layer, index) => {
        const travel = worldTravel[index];
        if (!travel) return;
        gsap.fromTo(
          layer,
          {
            x: () => document.documentElement.clientWidth * (travel.fromX / 100),
            y: () => innerHeight * (travel.fromY / 100),
            scale: travel.fromScale,
            rotation: travel.rotate,
          },
          {
            x: () => document.documentElement.clientWidth * (travel.toX / 100),
            y: () => innerHeight * (travel.toY / 100),
            scale: travel.toScale,
            rotation: -travel.rotate,
            ease: "none",
            scrollTrigger: worldScroll,
          },
        );
      });

      select("[data-rot]").forEach((element) => {
        gsap.fromTo(
          element,
          {
            rotateY: () => (matchMedia("(max-width: 767px)").matches ? -8 : -22),
            rotateX: () => (matchMedia("(max-width: 767px)").matches ? 3 : 8),
            scale: () => (matchMedia("(max-width: 767px)").matches ? 0.98 : 0.92),
          },
          {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 95%",
              end: "top 35%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      select(".h2").forEach((element) => {
        gsap.fromTo(
          element,
          {
            letterSpacing: () =>
              matchMedia("(max-width: 767px)").matches ? "0.015em" : "0.06em",
          },
          {
            letterSpacing: () =>
              matchMedia("(max-width: 767px)").matches ? "-0.005em" : "-0.01em",
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              end: "top 45%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      select("[data-line]").forEach((element) => {
        gsap.from(element, {
          scaleY: 0,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: element, start: "top 80%", end: "bottom 60%", scrub: true },
        });
      });

      select("[data-logo-reveal]").forEach((element) => {
        gsap.from(element, {
          scale: 0.82,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      });

      select("[data-hline]").forEach((element) => {
        gsap.from(element, {
          scaleX: 0,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: { trigger: element, start: "top 90%", end: "top 60%", scrub: true },
        });
      });

      select("section[data-bg]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(document.body, {
                backgroundColor: section.dataset.bg,
                duration: 0.9,
                overwrite: true,
              });
            }
          },
        });
      });

      const horizontalSection = document.querySelector<HTMLElement>("[data-hscroll]");
      const horizontalTrack = horizontalSection?.querySelector<HTMLElement>("[data-project-track]");
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (horizontalSection && horizontalTrack) {
          horizontalSection.classList.add("is-scroll-driven");
          gsap.to(horizontalTrack, {
            x: () =>
              -Math.max(
                0,
                horizontalTrack.scrollWidth -
                  document.documentElement.clientWidth,
              ),
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSection,
              start: () =>
                innerWidth < 768
                  ? `top top+=${Math.ceil(document.querySelector("header nav")?.getBoundingClientRect().height ?? 64) + 8}`
                  : "top top",
              pin: true,
              scrub: 0.6,
              snap: {
                snapTo: (progress) => {
                  const viewportWidth = document.documentElement.clientWidth;
                  const maxTravel = Math.max(
                    1,
                    horizontalTrack.scrollWidth - viewportWidth,
                  );
                  const viewportCenter = viewportWidth / 2;
                  const snapPoints = gsap
                    .utils
                    .toArray<HTMLElement>("[data-project-card]", horizontalTrack)
                    .map((card) => {
                      const wrapper = card.parentElement;
                      if (!wrapper) return 0;
                      return gsap.utils.clamp(
                        0,
                        1,
                        (wrapper.offsetLeft +
                          wrapper.offsetWidth / 2 -
                          viewportCenter) /
                          maxTravel,
                      );
                    });
                  return gsap.utils.snap(snapPoints, progress);
                },
                delay: 0.08,
                duration: { min: 0.2, max: 0.55 },
                ease: "power2.inOut",
              },
              end: () =>
                `+=${Math.max(1, horizontalTrack.scrollWidth - document.documentElement.clientWidth)}`,
              invalidateOnRefresh: true,
            },
          });
        }
        return () => horizontalSection?.classList.remove("is-scroll-driven");
      });
    });

    let mounted = true;
    let refreshFrame = requestAnimationFrame(() => {
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    const refreshAfterFonts = () => {
      document.fonts.ready.then(() => {
        if (!mounted) return;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
      });
    };
    refreshAfterFonts();
    const refreshForOrientation = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    };
    window.addEventListener("orientationchange", refreshForOrientation);
    return () => {
      mounted = false;
      cancelAnimationFrame(refreshFrame);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("portfolio:overlay-open", pauseForOverlay);
      window.removeEventListener("portfolio:overlay-close", resumeAfterOverlay);
      window.removeEventListener("orientationchange", refreshForOrientation);
      media.revert();
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [phase]);

  return (
    <div
      aria-hidden="true"
      data-scroll-world
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        data-world-layer="far"
        className="absolute -inset-[24%] opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 18% 24%, rgba(47,107,255,.20), transparent 34%), radial-gradient(ellipse at 78% 62%, rgba(139,124,246,.17), transparent 32%), radial-gradient(ellipse at 46% 88%, rgba(60,224,240,.08), transparent 30%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(60,224,240,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(60,224,240,.12) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
            maskImage: "linear-gradient(to bottom, transparent, black 24%, black 78%, transparent)",
          }}
        />
      </div>

      <svg
        data-world-layer="middle"
        className="absolute -inset-[18%] h-[136%] w-[136%] opacity-[0.17]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <g fill="none" stroke="#3CE0F0" strokeWidth="1">
          <path d="M90 160 310 95 505 210 730 105 990 220 1120 130M60 460 260 330 475 450 685 300 905 430 1160 320M150 710 365 590 560 735 785 570 1035 700" />
          <path d="M310 95 260 330 365 590M505 210 475 450 560 735M730 105 685 300 785 570M990 220 905 430 1035 700M90 160 60 460 150 710M1120 130 1160 320" />
          <circle cx="310" cy="95" r="4" fill="#3CE0F0" />
          <circle cx="505" cy="210" r="5" fill="#8B7CF6" />
          <circle cx="685" cy="300" r="4" fill="#3CE0F0" />
          <circle cx="905" cy="430" r="5" fill="#8B7CF6" />
          <circle cx="560" cy="735" r="4" fill="#3CE0F0" />
        </g>
      </svg>

      <div data-world-layer="near" className="absolute -inset-[16%] opacity-25">
        <span className="absolute left-[12%] top-[18%] h-28 w-28 rounded-full border border-cyan/40" />
        <span className="absolute left-[13.5%] top-[20%] h-20 w-20 rounded-full border border-violet/30" />
        <span className="absolute right-[11%] top-[42%] h-44 w-44 rotate-45 border border-electric/35" />
        <span className="absolute bottom-[14%] left-[54%] h-3 w-3 rounded-full bg-cyan shadow-[0_0_28px_8px_#3CE0F044]" />
        <span className="absolute right-[28%] top-[13%] h-2 w-2 rounded-full bg-violet shadow-[0_0_24px_8px_#8B7CF644]" />
      </div>
    </div>
  );
}
