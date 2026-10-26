import Image from "next/image";

export default function ExperienceActivities() {
  return (
    <section
      id="activities"
      data-bg="#0a1330"
      data-bg-light="#eaf1fa"
      className="relative z-10 overflow-hidden px-5 py-20 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        data-depth="0.12"
        className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full bg-electric/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        <div data-reveal className="mb-8 sm:mb-12">
          <p className="eyebrow mb-3">05 — Activities</p>
          <h2 className="h2">Learning by building together.</h2>
        </div>

        <article
          data-reveal
          className="grid overflow-hidden rounded-2xl border border-cyan/25 bg-charcoal/75 shadow-[0_20px_70px_-35px_#2F6BFF88] md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="grid grid-cols-1 items-center gap-2 p-2 sm:grid-cols-[1.25fr_1fr] md:min-h-[22rem]">
            <figure className="relative aspect-[16/10] w-full self-center overflow-hidden rounded-xl">
              <Image
                src="/images/activities/acm-developers-week-2026.jpg"
                alt="Students collaborating at laptops during the ACM Developers Week Hackathon."
                fill
                sizes="(max-width: 768px) 55vw, 32vw"
                className="object-contain"
              />
              <figcaption className="theme-image-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/90 to-transparent px-3 pb-2 pt-6 font-mono text-[10px] text-white/80">
                Hackathon
              </figcaption>
            </figure>
            <figure className="relative aspect-[4/3] w-full self-center overflow-hidden rounded-xl">
              <Image
                src="/images/activities/acm-developers-week-group-photo.png"
                alt="Lenj and fellow students together at ACM Developers Week."
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 768px) 45vw, 25vw"
                className="object-contain object-center"
              />
              <figcaption className="theme-image-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/90 to-transparent px-3 pb-2 pt-6 font-mono text-[10px] text-white/80">
                With fellow participants
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="eyebrow">Participant · 2026</p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl">
              ACM Developers Week Hackathon
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              FEU Institute of Technology
            </p>
            <div className="mt-6 h-px w-16 bg-gradient-to-r from-cyan to-violet" />
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Participant in the 2026 ACM Developers Week Hackathon at FEU
              Institute of Technology.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
