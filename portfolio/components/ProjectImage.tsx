import Image from "next/image";
import type { Project } from "@/lib/content";

export default function ProjectImage({
  project,
  compact = false,
  preview = false,
  preload = false,
}: {
  project: Pick<Project, "image">;
  compact?: boolean;
  preview?: boolean;
  preload?: boolean;
}) {
  const { image } = project;

  return (
    <figure className="min-w-0">
      <div
        className={`theme-image-frame relative overflow-hidden rounded-xl border border-white/10 bg-[#090f20] ${
          compact
            ? "aspect-[2/1]"
            : `aspect-[16/10] ${preview ? "max-h-[42dvh] sm:max-h-[52dvh]" : ""}`
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={
            compact
              ? "(min-width: 1024px) 44rem, 85vw"
              : "(min-width: 1024px) 60rem, 95vw"
          }
          {...(preload ? { preload: true } : { loading: "eager" as const })}
          className="h-full w-full object-contain"
        />
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
