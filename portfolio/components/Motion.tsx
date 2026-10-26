"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useExperience } from "@/components/Experience";
import {
  clearPortfolioReturn,
  readPortfolioReturn,
} from "@/lib/portfolioNavigation";

gsap.registerPlugin(ScrollTrigger);

export default function Motion() {
  const { phase, resumePortfolio } = useExperience();

  useEffect(() => {
    if (phase !== "ready") return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const returnState = resumePortfolio ? readPortfolioReturn() : null;
    const previousScrollRestoration = history.scrollRestoration;
    const restoreScrollMode = () => {
      history.scrollRestoration = previousScrollRestoration;
    };

    if (resumePortfolio) history.scrollRestoration = "manual";

    if (reducedMotion) {
      let frame = requestAnimationFrame(() => {
        if (returnState) {
          window.scrollTo({ top: returnState.scrollY, behavior: "instant" });
          clearPortfolioReturn();
        } else if (location.hash) {
          const target = document.querySelector(location.hash);
          if (target) {
            const offset = matchMedia("(max-width: 767px)").matches ? -72 : -88;
            const targetY =
              target.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top: targetY, behavior: "instant" });
          }
        }
        restoreScrollMode();
      });
      return () => cancelAnimationFrame(frame);
    }

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
      const targetY =
        target.getBoundingClientRect().top + window.scrollY + offset;
      lenis.scrollTo(targetY);
    };
    document.addEventListener("click", handleAnchorClick);

    const horizontalSection = document.querySelector<HTMLElement>("[data-hscroll]");
    const horizontalTrack = horizontalSection?.querySelector<HTMLElement>("[data-project-track]");
    const sectionBackground = (section: HTMLElement) =>
      document.documentElement.dataset.theme === "light"
        ? section.dataset.bgLight || "#eef3fa"
        : section.dataset.bg || "#050B1A";
    const updateSectionBackground = () => {
      const activeSection = gsap.utils
        .toArray<HTMLElement>("section[data-bg]")
        .find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= innerHeight * 0.55 && bounds.bottom >= innerHeight * 0.55;
        });
      if (activeSection) {
        gsap.to(document.body, {
          backgroundColor: sectionBackground(activeSection),
          duration: 0.45,
          overwrite: true,
        });
      }
    };
    const handleThemeChange = () => updateSectionBackground();
    window.addEventListener("portfolio:theme-change", handleThemeChange);
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

      const worldLayers = select("[data-world-layer]");
      const worldTravel = [
        { fromY: 0, toY: -5, fromX: 0, toX: 0.8, toScale: 1.22, toScaleMobile: 1.1, rotate: 0 },
        { fromY: 0, toY: -10, fromX: 0, toX: -1.5, toScale: 1.48, toScaleMobile: 1.28, rotate: 1 },
        { fromY: 0, toY: -17, fromX: 0, toX: 3, toScale: 1.72, toScaleMobile: 1.48, rotate: -2 },
      ];
      const worldTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: () => `+=${Math.max(1, ScrollTrigger.maxScroll(window))}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      worldLayers.forEach((layer, index) => {
        const travel = worldTravel[index];
        if (!travel) return;
        const mobile = () => matchMedia("(max-width: 767px)").matches;
        worldTimeline.fromTo(
          layer,
          {
            x: () =>
              document.documentElement.clientWidth *
              (travel.fromX / 100) *
              (mobile() ? 0.45 : 1),
            y: () => innerHeight * (travel.fromY / 100) * (mobile() ? 0.55 : 1),
            scale: 1,
            rotation: () => travel.rotate * (mobile() ? 0.5 : 1),
            transformOrigin: "50% 50%",
          },
          {
            x: () =>
              document.documentElement.clientWidth *
              (travel.toX / 100) *
              (mobile() ? 0.45 : 1),
            y: () => innerHeight * (travel.toY / 100) * (mobile() ? 0.55 : 1),
            scale: () => (mobile() ? travel.toScaleMobile : travel.toScale),
            rotation: () => -travel.rotate * (mobile() ? 0.5 : 1),
            ease: "none",
          },
          0,
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
                backgroundColor: sectionBackground(section),
                duration: 0.9,
                overwrite: true,
              });
            }
          },
        });
      });

      if (horizontalSection && horizontalTrack) {
        horizontalSection.classList.add("is-scroll-driven");
        const projectCount = horizontalTrack.querySelectorAll(
          "[data-project-card]",
        ).length;
        const snapIncrement = 1 / Math.max(1, projectCount - 1);
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
              `top top+=${Math.ceil(document.querySelector("header nav")?.getBoundingClientRect().height ?? 64) + 8}`,
            pin: true,
            scrub: true,
            snap: {
              snapTo: snapIncrement,
              directional: true,
              delay: 0.12,
              duration: { min: 0.18, max: 0.32 },
              ease: "power1.out",
              inertia: false,
            },
            end: () =>
              `+=${Math.max(1, horizontalTrack.scrollWidth - document.documentElement.clientWidth)}`,
            invalidateOnRefresh: true,
          },
        });
      }
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
          refreshFrame = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            if (returnState) {
              lenis.resize();
              lenis.scrollTo(returnState.scrollY, {
                immediate: true,
                force: true,
              });
              ScrollTrigger.update();
              clearPortfolioReturn();
            } else if (location.hash) {
              const target = document.querySelector(location.hash);
              if (target) {
                const offset = matchMedia("(max-width: 767px)").matches ? -72 : -88;
                const targetY =
                  target.getBoundingClientRect().top + window.scrollY + offset;
                lenis.scrollTo(targetY, { immediate: true });
              }
            }
            restoreScrollMode();
          });
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
      window.removeEventListener("portfolio:theme-change", handleThemeChange);
      horizontalSection?.classList.remove("is-scroll-driven");
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (resumePortfolio) restoreScrollMode();
    };
  }, [phase, resumePortfolio]);

  return (
    <>
      <div
        aria-hidden="true"
        data-scroll-world
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          data-world-layer="far"
          className="world-far-layer absolute -inset-[24%] origin-center opacity-70 [will-change:transform]"
        >
          <svg
            className="absolute inset-0 h-full w-full opacity-80"
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="far-structure" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="var(--world-cyan)" stopOpacity=".22" />
                <stop offset="1" stopColor="var(--world-blue)" stopOpacity=".015" />
              </linearGradient>
              <linearGradient id="far-horizon" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="var(--world-cyan)" stopOpacity="0" />
                <stop offset=".5" stopColor="var(--world-cyan)" stopOpacity=".28" />
                <stop offset="1" stopColor="var(--world-violet)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g fill="url(#far-structure)" stroke="var(--world-cyan)" strokeOpacity=".14">
              <path d="M0 542 110 438 176 458 176 329 250 254 324 328 324 520 388 478 388 359 456 292 525 357 525 545Z" />
              <path d="M1080 535 1080 350 1144 282 1208 348 1208 475 1290 430 1290 300 1374 210 1458 300 1458 474 1520 430 1600 480 1600 560Z" />
              <path d="M585 520 585 400 640 342 695 400 695 502M900 510 900 380 955 320 1010 380 1010 516" />
            </g>
            <g fill="none" stroke="var(--world-cyan)" strokeOpacity=".14" strokeWidth="2">
              <path d="M40 600H1560M0 630H1600M80 472l80-72 80 72M1170 480l78-88 78 88" />
              <path d="M128 458v-93l46-46 46 46v138M1330 450V319l44-48 45 48v134" />
              <path d="M680 534V438l42-44 42 44v90M840 530V420l50-52 50 52v118" />
            </g>
            <path d="M0 610H1600" stroke="url(#far-horizon)" strokeWidth="3" />
            <g fill="var(--world-cyan)" fillOpacity=".35">
              <circle cx="175" cy="365" r="3" />
              <circle cx="1375" cy="319" r="3" />
              <circle cx="720" cy="430" r="2.5" />
              <circle cx="890" cy="411" r="2.5" />
            </g>
          </svg>
        </div>

        <svg
          data-world-layer="middle"
          className="absolute -inset-[18%] h-[136%] w-[136%] origin-center opacity-[0.32] [will-change:transform] max-md:opacity-[0.24]"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="corridor-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="var(--world-cyan)" stopOpacity=".025" />
              <stop offset=".52" stopColor="var(--world-blue)" stopOpacity=".08" />
              <stop offset="1" stopColor="var(--world-cyan)" stopOpacity=".015" />
            </linearGradient>
            <radialGradient id="corridor-core">
              <stop stopColor="var(--world-cyan)" stopOpacity=".4" />
              <stop offset="1" stopColor="var(--world-cyan)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="800" cy="472" rx="310" ry="190" fill="url(#corridor-core)" />
          <g fill="url(#corridor-fill)" stroke="var(--world-cyan)" strokeOpacity=".42" strokeWidth="2">
            <path d="M-60 54 340 170 620 400 620 696 280 956 -60 1000Z" />
            <path d="M1660 54 1260 170 980 400 980 696 1320 956 1660 1000Z" />
            <path d="M0 0 430 88 680 360 680 704 430 1000 0 1000Z" />
            <path d="M1600 0 1170 88 920 360 920 704 1170 1000 1600 1000Z" />
          </g>
          <g fill="none" stroke="var(--world-cyan)" strokeOpacity=".36" strokeWidth="2">
            <path d="M-20 140 360 238 650 430M-20 270 330 340 650 462M-20 440 300 460 650 486M-20 650 330 586 650 510M-20 850 370 700 650 536" />
            <path d="M1620 140 1240 238 950 430M1620 270 1270 340 950 462M1620 440 1300 460 950 486M1620 650 1270 586 950 510M1620 850 1230 700 950 536" />
            <path d="M200 0 500 206 700 408M1400 0 1100 206 900 408M320 1000 610 704 750 530M1280 1000 990 704 850 530" />
            <path d="M800 410 800 600M650 455H950M700 440H900M730 425H870" strokeOpacity=".55" />
          </g>
          <g fill="none" stroke="var(--world-violet)" strokeOpacity=".42" strokeWidth="3">
            <path d="M82 96 430 174 617 356M1518 96 1170 174 983 356" />
            <path d="M78 904 430 750 620 604M1522 904 1170 750 980 604" />
            <path d="M800 92v118M800 738v170" />
          </g>
          <g fill="var(--world-cyan)" fillOpacity=".74">
            <circle cx="430" cy="174" r="4" />
            <circle cx="1170" cy="174" r="4" />
            <circle cx="617" cy="356" r="4" />
            <circle cx="983" cy="356" r="4" />
            <circle cx="620" cy="604" r="3" />
            <circle cx="980" cy="604" r="3" />
          </g>
          <g fill="none" stroke="var(--world-cyan)" strokeOpacity=".2">
            <path d="M530 140h64v34h-64zM1006 140h64v34h-64zM350 785h78v34h-78zM1172 785h78v34h-78z" />
            <path d="M548 151h28M548 161h38M1024 151h28M1024 161h38M368 796h38M1190 796h38" />
          </g>
        </svg>

        <svg
          data-world-layer="near"
          className="absolute -inset-[16%] h-[132%] w-[132%] origin-center opacity-[0.27] [will-change:transform] max-md:hidden"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="near-edge" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--world-cyan)" stopOpacity=".42" />
              <stop offset="1" stopColor="var(--world-violet)" stopOpacity=".04" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#near-edge)" strokeWidth="3">
            <path d="M-40 120 130 70 278 158 278 365M-25 166 112 126 230 192 230 340" />
            <path d="M1640 120 1470 70 1322 158 1322 365M1625 166 1488 126 1370 192 1370 340" />
            <path d="M-60 820 160 740 340 806 465 1000M1660 820 1440 740 1260 806 1135 1000" />
            <path d="M74 480h170v94H74zM1356 480h170v94h-170z" />
            <path d="M100 506h42M100 528h96M1382 506h42M1382 528h96" />
          </g>
          <g fill="none" stroke="var(--world-cyan)" strokeOpacity=".32">
            <circle cx="310" cy="274" r="31" />
            <circle cx="310" cy="274" r="18" />
            <circle cx="1290" cy="274" r="31" />
            <circle cx="1290" cy="274" r="18" />
            <path d="M310 230v-36h58l48-46M1290 230v-36h-58l-48-46M310 318v40h-62l-48 48M1290 318v40h62l48 48" />
          </g>
          <g fill="var(--world-cyan)" fillOpacity=".6">
            <circle cx="416" cy="148" r="4" />
            <circle cx="1184" cy="148" r="4" />
            <circle cx="200" cy="406" r="3" />
            <circle cx="1400" cy="406" r="3" />
            <circle cx="800" cy="850" r="3" />
          </g>
        </svg>

        <div
          aria-hidden="true"
          className="world-grid absolute inset-0 opacity-30 max-md:opacity-15"
          style={{ backgroundSize: "84px 84px", maskImage: "radial-gradient(ellipse at 50% 50%, black 4%, transparent 80%)" }}
        />
      </div>

    </>
  );
}
