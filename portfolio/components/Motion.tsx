"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useExperience } from "@/components/Experience";
import BlueFutureWorld from "@/components/BlueFutureWorld";
import {
  clearPortfolioReturn,
  hasPendingPortfolioReturnMarker,
  readPortfolioReturn,
  type PortfolioReturnState,
} from "@/lib/portfolioNavigation";
import { motion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type ProjectProgress = {
  current: number;
  total: number;
  visible: boolean;
  prompt: boolean;
};

function publishProjectProgress(
  section: HTMLElement,
  current: number,
  total: number,
  visible: boolean,
) {
  const progress: ProjectProgress = {
    current,
    total,
    visible,
    prompt: visible && current < total,
  };
  const key = `${progress.current}:${progress.total}:${progress.visible}`;
  if (section.dataset.projectProgressKey === key) return;

  section.dataset.projectProgressKey = key;
  section.dataset.projectCurrent = String(progress.current);
  section.dataset.projectTotal = String(progress.total);
  section.dataset.projectIndicatorVisible = String(progress.visible);
  section.dataset.projectPrompt = String(progress.prompt);
  window.dispatchEvent(
    new CustomEvent<ProjectProgress>("portfolio:project-progress", {
      detail: progress,
    }),
  );
}

export default function Motion() {
  const { initialized } = useExperience();

  useEffect(() => {
    if (!initialized) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const horizontalSection =
      document.querySelector<HTMLElement>("[data-hscroll]");
    const horizontalTrack =
      horizontalSection?.querySelector<HTMLElement>("[data-project-track]");
    const projectCards = horizontalTrack
      ? Array.from(
          horizontalTrack.querySelectorAll<HTMLElement>("[data-project-card]"),
        )
      : [];
    const projectCount = projectCards.length;
    const readPendingReturnState = () =>
      hasPendingPortfolioReturnMarker() ? readPortfolioReturn() : null;
    const returnState = readPendingReturnState();
    const previousScrollRestoration = history.scrollRestoration;
    const restoreScrollMode = () => {
      history.scrollRestoration = previousScrollRestoration;
    };

    if (returnState) history.scrollRestoration = "manual";

    if (reducedMotion) {
      let frame = 0;
      let districtFrame = 0;
      let sectionVisible = false;
      const intersections = new Map<number, number>();
      const cityWorld =
        document.querySelector<HTMLElement>("[data-scroll-world]");
      const cityDistricts = Array.from(
        document.querySelectorAll<HTMLElement>("[data-city-district]"),
      );
      const updateCityDistrict = () => {
        districtFrame = 0;
        const viewportY = innerHeight * 0.55;
        const activeDistrict = cityDistricts.find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= viewportY && bounds.bottom >= viewportY;
        });
        if (activeDistrict && cityWorld) {
          cityWorld.dataset.cityZone =
            activeDistrict.dataset.cityDistrict ?? "hero";
        }
      };
      const scheduleCityDistrictUpdate = () => {
        if (districtFrame) return;
        districtFrame = requestAnimationFrame(updateCityDistrict);
      };
      const cardsObserver =
        horizontalSection && projectCards.length
          ? new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  const index = projectCards.indexOf(entry.target as HTMLElement);
                  if (index >= 0) {
                    intersections.set(
                      index,
                      entry.isIntersecting ? entry.intersectionRatio : 0,
                    );
                  }
                });
                const activeIndex = [...intersections.entries()].reduce(
                  (best, candidate) =>
                    candidate[1] > best[1] ? candidate : best,
                  [0, 0],
                )[0];
                const visible =
                  sectionVisible && activeIndex < projectCount - 1;
                publishProjectProgress(
                  horizontalSection,
                  activeIndex + 1,
                  projectCount,
                  visible,
                );
              },
              {
                rootMargin: "-25% 0px -25% 0px",
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
              },
            )
          : null;
      const sectionObserver =
        horizontalSection && cardsObserver
          ? new IntersectionObserver(([entry]) => {
              sectionVisible = Boolean(entry?.isIntersecting);
              const activeIndex = [...intersections.entries()].reduce(
                (best, candidate) =>
                  candidate[1] > best[1] ? candidate : best,
                [0, 0],
              )[0];
              publishProjectProgress(
                horizontalSection,
                activeIndex + 1,
                projectCount,
                sectionVisible && activeIndex < projectCount - 1,
              );
            })
          : null;
      projectCards.forEach((card) => cardsObserver?.observe(card));
      if (horizontalSection) sectionObserver?.observe(horizontalSection);
      const restorePendingReturn = () => {
        if (location.pathname !== "/") return;
        const pendingReturn = readPendingReturnState();
        if (!pendingReturn) return;
        history.scrollRestoration = "manual";
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const currentReturn = readPendingReturnState();
          if (!currentReturn) return;
          window.scrollTo({ top: currentReturn.scrollY, behavior: "instant" });
          clearPortfolioReturn();
          restoreScrollMode();
        });
      };
      const restoreInitialPosition = () => {
        const pendingReturn = readPendingReturnState();
        if (pendingReturn) {
          window.scrollTo({ top: pendingReturn.scrollY, behavior: "instant" });
          clearPortfolioReturn();
          restoreScrollMode();
        } else if (location.hash) {
          const target = document.querySelector(location.hash);
          if (target) {
            const offset = matchMedia("(max-width: 767px)").matches ? -72 : -88;
            const targetY =
              target.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top: targetY, behavior: "instant" });
          }
          restoreScrollMode();
        } else {
          restoreScrollMode();
        }
        updateCityDistrict();
      };
      frame = requestAnimationFrame(restoreInitialPosition);
      window.addEventListener("scroll", scheduleCityDistrictUpdate, {
        passive: true,
      });
      window.addEventListener("resize", scheduleCityDistrictUpdate);
      window.addEventListener("popstate", restorePendingReturn);
      window.addEventListener("pageshow", restorePendingReturn);
      return () => {
        cancelAnimationFrame(frame);
        if (districtFrame) cancelAnimationFrame(districtFrame);
        window.removeEventListener("scroll", scheduleCityDistrictUpdate);
        window.removeEventListener("resize", scheduleCityDistrictUpdate);
        cardsObserver?.disconnect();
        sectionObserver?.disconnect();
        window.removeEventListener("popstate", restorePendingReturn);
        window.removeEventListener("pageshow", restorePendingReturn);
      };
    }

    const cityWorld =
      document.querySelector<HTMLElement>("[data-scroll-world]");
    const cityDistricts = Array.from(
      document.querySelectorAll<HTMLElement>("[data-city-district]"),
    );
    let cityFrame = 0;
    const updateCityDistrict = () => {
      cityFrame = 0;
      const viewportY = innerHeight * 0.55;
      const activeDistrict = cityDistricts.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= viewportY && bounds.bottom >= viewportY;
      });
      if (activeDistrict && cityWorld) {
        cityWorld.dataset.cityZone =
          activeDistrict.dataset.cityDistrict ?? "hero";
      }
    };
    const scheduleCityDistrictUpdate = () => {
      if (cityFrame) return;
      cityFrame = requestAnimationFrame(updateCityDistrict);
    };
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", scheduleCityDistrictUpdate);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // Keep font and layout refreshes from moving the restored scroll position.
    let preserveRestoredProjectPosition = Boolean(returnState);
    let restoredReturnState: PortfolioReturnState | null = null;
    let mounted = true;
    const allowScrollPositionChanges = () => {
      preserveRestoredProjectPosition = false;
    };
    const scrollKeys = new Set([
      "ArrowDown",
      "ArrowUp",
      "PageDown",
      "PageUp",
      "Home",
      "End",
      " ",
    ]);
    const handleScrollKey = (event: KeyboardEvent) => {
      if (!scrollKeys.has(event.key)) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.matches("input, textarea, select"))
      ) {
        return;
      }
      allowScrollPositionChanges();
    };
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
      allowScrollPositionChanges();
      lenis.scrollTo(targetY);
    };
    document.addEventListener("click", handleAnchorClick);

    document.addEventListener("wheel", allowScrollPositionChanges, {
      passive: true,
    });
    document.addEventListener("touchstart", allowScrollPositionChanges, {
      passive: true,
    });
    document.addEventListener("pointerdown", allowScrollPositionChanges, {
      passive: true,
    });
    document.addEventListener("keydown", handleScrollKey);
    const sectionBackground = (section: HTMLElement) =>
      document.documentElement.dataset.theme === "light"
        ? section.dataset.bgLight || "#eef3fa"
        : section.dataset.bg || "#050B1A";
    const updateSectionBackground = (immediate = false) => {
      const activeSection = gsap.utils
        .toArray<HTMLElement>("section[data-bg]")
        .find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= innerHeight * 0.55 && bounds.bottom >= innerHeight * 0.55;
        });
      if (activeSection) {
        const backgroundColor = sectionBackground(activeSection);
        if (immediate) {
          gsap.killTweensOf(document.body, "backgroundColor");
          gsap.set(document.body, { backgroundColor });
          return;
        }
        gsap.to(document.body, {
          backgroundColor,
          duration: 0.45,
          overwrite: true,
        });
      }
    };
    const handleThemeChange = () => updateSectionBackground(true);
    window.addEventListener("portfolio:theme-change", handleThemeChange);
    const restorePortfolioPosition = (state: PortfolioReturnState) => {
      preserveRestoredProjectPosition = true;
      restoredReturnState = state;
      history.scrollRestoration = "manual";
      lenis.resize();
      lenis.scrollTo(state.scrollY, { immediate: true, force: true });
      ScrollTrigger.update();
      clearPortfolioReturn();
      restoreScrollMode();
    };
    const restorePendingReturn = () => {
      if (location.pathname !== "/") return;
      const pendingReturn = readPendingReturnState();
      if (!pendingReturn) return;
      preserveRestoredProjectPosition = true;
      history.scrollRestoration = "manual";
      ScrollTrigger.refresh();
      restorePortfolioPosition(pendingReturn);
    };
    window.addEventListener("popstate", restorePendingReturn);
    window.addEventListener("pageshow", restorePendingReturn);
    const context = gsap.context(() => {
      const select = gsap.utils.toArray<HTMLElement>;

      select("[data-motion-heading]").forEach((element) => {
        const preset = (() => {
          switch (element.dataset.motionHeading) {
            case "mask":
              return motion.section.headings.mask;
            case "glide":
              return motion.section.headings.glide;
            case "focus":
              return motion.section.headings.focus;
            case "rise":
              return motion.section.headings.rise;
            default:
              return null;
          }
        })();
        if (!preset) return;

        gsap.fromTo(
          element,
          {
            clipPath: preset.clipPath,
            x: preset.x,
            y: preset.y,
            scale: preset.scale,
            opacity: preset.opacity,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: preset.duration,
            ease: preset.ease,
            clearProps: "clipPath,transform,opacity",
            scrollTrigger: {
              trigger: element,
              start: motion.section.headingStart,
              once: true,
            },
          },
        );
      });

      select("[data-reveal], .certification-card").forEach((element) => {
        gsap.from(element, {
          y: motion.section.revealDistance,
          opacity: 0,
          duration: motion.section.revealDuration,
          ease: motion.section.revealEase,
          scrollTrigger: {
            trigger: element,
            start: motion.section.triggerStart,
          },
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

      const worldLayer = select("[data-world-layer]")[0];
      const mobile = () => matchMedia("(max-width: 767px)").matches;
      const worldTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      if (worldLayer) {
        worldTimeline.fromTo(
          worldLayer,
          {
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: () =>
              mobile()
                ? motion.world.mobileOrigin
                : motion.world.desktopOrigin,
          },
          {
            x: () =>
              document.documentElement.clientWidth *
              (mobile() ? motion.world.mobileX : motion.world.desktopX),
            y: () =>
              -innerHeight *
              (mobile() ? motion.world.mobileY : motion.world.desktopY),
            scale: () =>
              mobile() ? motion.world.mobileScale : motion.world.desktopScale,
            ease: "none",
          },
          0,
        );
      }

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
            onUpdate: (self) => {
              const current = Math.min(
                projectCount,
                Math.round(self.progress * Math.max(0, projectCount - 1)) + 1,
              );
              publishProjectProgress(
                horizontalSection,
                current,
                projectCount,
                self.isActive === true,
              );
            },
            onRefresh: (self) => {
              const current = Math.min(
                projectCount,
                Math.round(self.progress * Math.max(0, projectCount - 1)) + 1,
              );
              publishProjectProgress(
                horizontalSection,
                current,
                projectCount,
                self.isActive === true,
              );
            },
            onEnter: (self) => {
              const current = Math.min(
                projectCount,
                Math.round(self.progress * Math.max(0, projectCount - 1)) + 1,
              );
              publishProjectProgress(
                horizontalSection,
                current,
                projectCount,
                true,
              );
            },
            onEnterBack: (self) => {
              const current = Math.min(
                projectCount,
                Math.round(self.progress * Math.max(0, projectCount - 1)) + 1,
              );
              publishProjectProgress(
                horizontalSection,
                current,
                projectCount,
                true,
              );
            },
            onLeave: () =>
              publishProjectProgress(
                horizontalSection,
                projectCount,
                projectCount,
                false,
              ),
            onLeaveBack: () =>
              publishProjectProgress(horizontalSection, 1, projectCount, false),
            end: () =>
              `+=${Math.max(1, horizontalTrack.scrollWidth - document.documentElement.clientWidth)}`,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    let refreshFrame = requestAnimationFrame(() => {
      refreshFrame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        const pendingReturn = readPendingReturnState();
        if (pendingReturn) restorePortfolioPosition(pendingReturn);
      });
    });
    const refreshAfterFonts = () => {
      document.fonts.ready.then(() => {
        if (!mounted) return;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          refreshFrame = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            const pendingReturn = readPendingReturnState();
            if (pendingReturn) {
              restorePortfolioPosition(pendingReturn);
            } else if (restoredReturnState) {
              if (preserveRestoredProjectPosition) {
                restorePortfolioPosition(restoredReturnState);
              } else {
                restoreScrollMode();
              }
            } else if (location.hash) {
              const target = document.querySelector(location.hash);
              if (target) {
                const offset = matchMedia("(max-width: 767px)").matches ? -72 : -88;
                const targetY =
                  target.getBoundingClientRect().top + window.scrollY + offset;
                lenis.scrollTo(targetY, { immediate: true });
              }
              restoreScrollMode();
            } else {
              restoreScrollMode();
            }
          });
        });
      });
    };
    refreshAfterFonts();
    let resizeTimeout: number | null = null;
    const refreshForViewport = () => {
      scheduleCityDistrictUpdate();
      if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        resizeTimeout = null;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
      }, 120);
    };
    window.addEventListener("resize", refreshForViewport);
    window.addEventListener("orientationchange", refreshForViewport);
    // Keep ScrollTrigger's max endpoint aligned when fonts or pin spacing change page height.
    let observedDocumentHeight = document.documentElement.scrollHeight;
    const layoutObserver = new ResizeObserver(() => {
      const currentHeight = document.documentElement.scrollHeight;
      if (currentHeight === observedDocumentHeight) return;
      observedDocumentHeight = currentHeight;
      refreshForViewport();
    });
    layoutObserver.observe(document.body);
    return () => {
      mounted = false;
      cancelAnimationFrame(refreshFrame);
      if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
      layoutObserver.disconnect();
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("wheel", allowScrollPositionChanges);
      document.removeEventListener("touchstart", allowScrollPositionChanges);
      document.removeEventListener("pointerdown", allowScrollPositionChanges);
      document.removeEventListener("keydown", handleScrollKey);
      window.removeEventListener("popstate", restorePendingReturn);
      window.removeEventListener("pageshow", restorePendingReturn);
      window.removeEventListener("portfolio:overlay-open", pauseForOverlay);
      window.removeEventListener("portfolio:overlay-close", resumeAfterOverlay);
      window.removeEventListener("resize", refreshForViewport);
      window.removeEventListener("orientationchange", refreshForViewport);
      window.removeEventListener("portfolio:theme-change", handleThemeChange);
      horizontalSection?.classList.remove("is-scroll-driven");
      if (cityFrame) cancelAnimationFrame(cityFrame);
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (returnState) restoreScrollMode();
    };
  }, [initialized]);

  return <BlueFutureWorld />;
}
