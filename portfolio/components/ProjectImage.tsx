import Image from "next/image";
import type { Project } from "@/lib/content";
import ProjectPreviewVideo from "@/components/ProjectPreviewVideo";

export default function ProjectImage({
  project,
  source = "screenshot",
  compact = false,
  preview = false,
  preload = false,
  videoProjectNumber,
  isHovered = false,
}: {
  project: Pick<Project, "cover" | "image" | "video" | "name">;
  source?: "cover" | "screenshot";
  compact?: boolean;
  preview?: boolean;
  preload?: boolean;
  videoProjectNumber?: number;
  isHovered?: boolean;
}) {
  const image = source === "cover" ? project.cover : project.image;
  const aspectRatio =
    source === "cover" ? "aspect-video" : compact ? "aspect-[2/1]" : "aspect-[16/10]";

  return (
    <figure className="min-w-0">
      <div className="project-preview-window overflow-hidden rounded-xl border border-white/10 bg-charcoal/75 shadow-[0_16px_44px_-32px_rgba(47,107,255,.55)]">
        <div
          aria-hidden="true"
          className="project-preview-chrome flex h-8 items-center justify-between border-b border-white/10 px-3"
        >
          <span className="flex items-center gap-1.5">
            <i className="h-1.5 w-1.5 rounded-full bg-cyan/70" />
            <i className="h-1.5 w-1.5 rounded-full bg-electric/70" />
            <i className="h-1.5 w-1.5 rounded-full bg-violet/70" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
            {image.label}
          </span>
          <span className="font-mono text-[10px] text-cyan">LJM.</span>
        </div>
        <div
          data-project-image
          className={`theme-image-frame relative w-full overflow-hidden bg-[#090f20] ${aspectRatio} ${
            preview ? "max-h-[42dvh] sm:max-h-[52dvh]" : ""
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={
              compact
                ? "(min-width: 640px) 33.5rem, 85vw"
                : "(min-width: 1024px) 60rem, 95vw"
            }
            {...(preload ? { preload: true } : { loading: "lazy" as const })}
            className="h-full w-full object-contain"
          />
          {source === "cover" && project.video && videoProjectNumber ? (
            <ProjectPreviewVideo
              src={project.video}
              poster={project.cover.src}
              projectNumber={videoProjectNumber}
              projectName={project.name}
              isHovered={isHovered}
            />
          ) : null}
        </div>
      </div>
      <figcaption
        className={`mt-2 text-center text-[10px] leading-4 text-white/45 sm:text-xs ${
          compact ? "hidden sm:block" : ""
        }`}
      >
        {image.caption}
      </figcaption>
    </figure>
  );
}
