import Image from "next/image";
import type { Project } from "@/lib/content";

export default function ProjectImage({
  project,
  compact = false,
}: {
  project: Pick<Project, "image">;
  compact?: boolean;
}) {
  const { image } = project;

  return (
    <figure className="min-w-0">
      <div
        className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#090f20] ${
          compact ? "h-24 sm:aspect-[16/10] sm:h-auto" : "aspect-[16/10]"
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
          loading="eager"
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
