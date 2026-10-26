"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "@/components/Tilt";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  "Joaquin Franco T. Centeno",
  "Lenj Jesther R. Magsino",
  "James A. Ocasiones",
  "Nicole T. Oliva",
];

const docuGraphRolePhotos = [
  {
    src: "/images/projects/docugraph/team-roles-management-qa.png",
    alt: "DocuGraph team photo with the embedded role labels Project Manager and Researcher / Quality Assurance.",
    label: "Project coordination & quality",
    width: 768,
    height: 960,
  },
  {
    src: "/images/projects/docugraph/team-roles-development-research.png",
    alt: "DocuGraph team photo with the embedded role labels Full-Stack Developer and Researcher / Documenter.",
    label: "Development & research",
    width: 768,
    height: 960,
  },
];

const docuGraphGroupPhoto = {
  src: "/images/projects/docugraph/team-group-collage.png",
  alt: "DocuGraph team group photo collage featuring the team in two framed compositions.",
  label: "The DocuGraph team",
  width: 768,
  height: 960,
};

type TeamPhoto = (typeof docuGraphGroupPhoto) | (typeof docuGraphRolePhotos)[number];

type TeamShowcaseProps = {
  projectName?: string;
  teamName?: string;
  membersTitle?: string;
  members?: string[];
  groupPhoto?: TeamPhoto;
  rolePhotos?: TeamPhoto[];
  subtitle?: string;
  collaboration?: string;
};

function TeamPhotoLightbox({
  photo,
  source,
  onClose,
}: {
  photo: TeamPhoto;
  source: HTMLButtonElement;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Animation | null>(null);
  const frameRef = useRef<number | null>(null);
  const closingRef = useRef(false);
  const savedPositionRef = useRef<{
    parent: HTMLDialogElement | null;
    parentScrollTop: number;
    pageScrollY: number;
  } | null>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog || !panel || dialog.open) return;

    const parent = dialog.parentElement?.closest<HTMLDialogElement>("dialog") ?? null;
    savedPositionRef.current = {
      parent,
      parentScrollTop: parent?.scrollTop ?? 0,
      pageScrollY: window.scrollY,
    };
    closingRef.current = false;
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });
    if (parent) parent.scrollTop = savedPositionRef.current.parentScrollTop;
    window.scrollTo({
      top: savedPositionRef.current.pageScrollY,
      behavior: "instant",
    });

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      if (parent) parent.scrollTop = savedPositionRef.current?.parentScrollTop ?? 0;
      window.scrollTo({
        top: savedPositionRef.current?.pageScrollY ?? 0,
        behavior: "instant",
      });
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
          opacity: 0.78,
        },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          duration: 0.55,
          ease: "power3.inOut",
          clearProps: "transform,opacity",
        },
      );
    });

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      timelineRef.current?.kill();
    };
  }, [source]);

  const finishClose = () => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog?.open || !panel || closingRef.current) return;
    closingRef.current = true;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    timelineRef.current?.kill();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!source.isConnected || reducedMotion) {
      dialog.close();
      return;
    }

    const current = {
      x: Number(gsap.getProperty(panel, "x")),
      y: Number(gsap.getProperty(panel, "y")),
      scaleX: Number(gsap.getProperty(panel, "scaleX")),
      scaleY: Number(gsap.getProperty(panel, "scaleY")),
      opacity: Number(gsap.getProperty(panel, "opacity")),
    };
    gsap.set(panel, { clearProps: "transform" });
    const targetRect = panel.getBoundingClientRect();
    const sourceRect = source.getBoundingClientRect();
    gsap.set(panel, current);

    timelineRef.current = gsap.to(panel, {
      x: sourceRect.left - targetRect.left,
      y: sourceRect.top - targetRect.top,
      scaleX: sourceRect.width / targetRect.width,
      scaleY: sourceRect.height / targetRect.height,
      opacity: 0.78,
      duration: 0.42,
      ease: "power3.inOut",
      onComplete: () => dialog.close(),
    });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Photo preview: ${photo.label}`}
      className="team-photo-lightbox fixed inset-0 m-0 grid h-dvh w-screen max-h-none max-w-none place-items-center overflow-hidden border-0 bg-transparent p-0 text-white"
      onCancel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        finishClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          finishClose();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) finishClose();
      }}
      onClose={(event) => {
        event.stopPropagation();
        timelineRef.current?.kill();
        gsap.set(panelRef.current, { clearProps: "all" });
        const savedPosition = savedPositionRef.current;
        if (savedPosition?.parent) {
          savedPosition.parent.scrollTop = savedPosition.parentScrollTop;
        }
        window.scrollTo({ top: savedPosition?.pageScrollY ?? 0, behavior: "instant" });
        if (source.isConnected) source.focus({ preventScroll: true });
        savedPositionRef.current = null;
        closingRef.current = false;
        onClose();
      }}
    >
      <div
        ref={panelRef}
        className="theme-dialog relative grid max-h-[90dvh] max-w-[94vw] place-items-center rounded-xl border border-cyan/40 bg-charcoal p-2 shadow-[0_30px_120px_-30px_#2f6bffcc] sm:p-3"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 640px) 94vw, 80vw"
          priority
          className="block h-auto max-h-[86dvh] w-auto max-w-[90vw] rounded-lg object-contain"
        />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={finishClose}
          aria-label="Close photo preview"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-midnight/90 text-2xl text-white shadow-lg transition hover:border-cyan hover:text-cyan focus-visible:outline-cyan"
        >
          <span aria-hidden="true">×</span>
        </button>
        <p className="absolute inset-x-3 bottom-4 rounded-lg bg-midnight/85 px-3 py-2 text-center font-mono text-xs text-white/80 sm:inset-x-5 sm:bottom-5">
          {photo.label}
        </p>
      </div>
    </dialog>
  );
}

export default function DocuGraphTeam({
  projectName = "DocuGraph",
  teamName = "DocuGraph",
  membersTitle = "Four collaborators",
  members = teamMembers,
  groupPhoto = docuGraphGroupPhoto,
  rolePhotos = docuGraphRolePhotos,
  subtitle = "The minds behind DocuGraph — combining research, development, and collaboration to build intelligent document understanding solutions.",
  collaboration = "Built through collaboration, research, and a shared commitment to improving document understanding.",
}: TeamShowcaseProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [activePhoto, setActivePhoto] = useState<TeamPhoto | null>(null);
  const [photoSource, setPhotoSource] = useState<HTMLButtonElement | null>(null);
  const headingId = `${projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-team-heading`;

  useEffect(() => {
    const root = rootRef.current;
    const scroller = root?.closest<HTMLDialogElement>("dialog");
    if (!root || !scroller) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const context = gsap.context(() => {
      if (reducedMotion) return;

      root.querySelectorAll<HTMLElement>("[data-team-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 28,
          autoAlpha: 0,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            scroller,
            start: "top 88%",
            once: true,
          },
        });
      });

      const groupVisual = root.querySelector<HTMLElement>("[data-team-parallax]");
      if (groupVisual) {
        gsap.to(groupVisual, {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: groupVisual,
            scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      }
    }, root);

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby={headingId}
      className="relative isolate mt-10 overflow-hidden border-t border-white/10 px-4 py-10 sm:mt-12 sm:px-0 sm:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 -z-10 h-80 w-80 rounded-full bg-violet/15 blur-3xl"
      />
      <div className="mb-7 max-w-3xl sm:mb-10">
        <p data-team-reveal className="eyebrow">
          The people behind the system
        </p>
        <h3
          id={headingId}
          data-team-reveal
          className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Meet the team
        </h3>
        <p data-team-reveal className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,.9fr)] lg:gap-8">
        <div data-team-parallax data-team-reveal className="min-w-0">
          <Tilt className="rounded-2xl">
            <figure className="theme-image-frame overflow-hidden rounded-2xl border border-cyan/25 bg-[#11182A] shadow-[0_24px_80px_-38px_#2f6bff99]">
              <button
                type="button"
                onClick={(event) => {
                  setPhotoSource(event.currentTarget);
                  setActivePhoto(groupPhoto);
                }}
                aria-label={`Enlarge the ${projectName} group photo`}
                className="group relative block w-full cursor-zoom-in focus-visible:outline-cyan"
              >
                <div
                  className="relative w-full"
                  style={{
                    aspectRatio: `${groupPhoto.width} / ${groupPhoto.height}`,
                  }}
                >
                  <Image
                    src={groupPhoto.src}
                    alt={groupPhoto.alt}
                    fill
                    sizes="(max-width: 1023px) 90vw, 56vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <span className="absolute bottom-3 right-3 rounded-full border border-cyan/40 bg-midnight/90 px-3 py-1.5 text-xs text-cyan opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  View group photo
                </span>
              </button>
              <figcaption className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
                <span className="font-display text-sm font-semibold text-white/85">
                  {groupPhoto.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[.16em] text-cyan/65">
                  {teamName === projectName
                    ? `${projectName} · team`
                    : `${teamName} · ${projectName}`}
                </span>
              </figcaption>
            </figure>
          </Tilt>
        </div>

        <aside
          data-team-reveal
          className="rounded-2xl border border-white/10 bg-charcoal/55 p-5 sm:p-6"
          aria-label={`${projectName} team members`}
        >
          <p className="eyebrow text-[10px]">{membersTitle}</p>
          <ul className="mt-4 divide-y divide-white/10">
            {members.map((member, index) => (
              <li
                key={member}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span className="font-mono text-xs text-cyan/65">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-sm font-medium text-white/85 sm:text-base">
                  {member}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/50">
            Team members are listed together; names are not assigned to
            individual people in the photographs.
          </p>
        </aside>
      </div>

      {rolePhotos.length > 0 && (
        <div className="mt-10 sm:mt-14">
          <div data-team-reveal className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-[10px]">Shared responsibilities</p>
              <h4 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
                Research, development & quality
              </h4>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-white/50 sm:text-sm">
              Role labels are preserved as shown in the original team photographs.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {rolePhotos.map((photo) => (
              <Tilt key={photo.src} className="rounded-2xl">
                <figure
                  data-team-reveal
                  className="theme-image-frame overflow-hidden rounded-2xl border border-white/10 bg-[#11182A]"
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      setPhotoSource(event.currentTarget);
                      setActivePhoto(photo);
                    }}
                    aria-label={`Enlarge team photo: ${photo.label}`}
                    className="group relative block w-full cursor-zoom-in focus-visible:outline-cyan"
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 639px) 90vw, 46vw"
                        className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                    <span className="absolute bottom-3 right-3 rounded-full border border-cyan/40 bg-midnight/90 px-3 py-1.5 text-xs text-cyan opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                      View full photo
                    </span>
                  </button>
                  <figcaption className="border-t border-white/10 px-4 py-3 font-display text-sm font-semibold text-white/85">
                    {photo.label}
                  </figcaption>
                </figure>
              </Tilt>
            ))}
          </div>
        </div>
      )}

      <p
        data-team-reveal
        className="mt-8 border-l border-cyan/50 pl-4 text-sm leading-relaxed text-white/65 sm:mt-10 sm:text-base"
      >
        {collaboration}
      </p>

      {activePhoto && photoSource && (
        <TeamPhotoLightbox
          photo={activePhoto}
          source={photoSource}
          onClose={() => {
            setActivePhoto(null);
            setPhotoSource(null);
          }}
        />
      )}
    </section>
  );
}
