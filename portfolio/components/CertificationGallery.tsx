"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import CinematicDialog from "@/components/CinematicDialog";
import Tilt from "@/components/Tilt";
import {
  certificationCategories,
  certifications,
  type Certification,
  type CertificationCategory,
} from "@/lib/certifications";

type SortOrder = "newest" | "oldest" | "issuer";

function CertificateArtwork({
  certification,
  eager,
}: {
  certification: Certification;
  eager: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (certification.certificateImage) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-[#11182A]">
        {!loaded && (
          <div
            aria-live={failed ? "polite" : undefined}
            className="absolute inset-0 grid place-items-center"
          >
            {failed ? (
              <span className="px-4 text-center text-sm text-white/60">
                Certificate preview could not be loaded.
              </span>
            ) : (
              <span className="animate-pulse font-mono text-xs text-white/45">
                Loading certificate preview...
              </span>
            )}
          </div>
        )}
        <Image
          src={certification.certificateImage}
          alt={`Certificate preview for ${certification.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`object-contain transition-transform duration-500 group-hover:scale-[1.025] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_80%_15%,#2F6BFF22,transparent_45%),linear-gradient(135deg,#11182A,#080e20)] p-5 sm:p-6">
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-white/5" />
      <div className="absolute -right-2 -top-4 h-24 w-24 rounded-full border border-white/5" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Issuer
          </p>
          <p className="mt-1 max-w-[85%] font-display text-xl font-semibold text-white/90 sm:text-2xl">
            {certification.issuer}
          </p>
        </div>
        {certification.issuerLogo ? (
          <Image
            src={certification.issuerLogo}
            alt={`${certification.issuer} logo`}
            width={112}
            height={48}
            className="max-h-12 w-auto max-w-28 object-contain"
          />
        ) : (
          <span className="max-w-28 shrink-0 text-right font-display text-xs font-semibold text-white/55">
            {certification.issuer.split(" – ")[0].split(",")[0]}
          </span>
        )}
      </div>
      <div className="relative mt-5 border-l-2 border-cyan/50 pl-3">
        <p className="font-mono text-xs text-cyan/80">{certification.issueDate}</p>
        <p className="mt-2 line-clamp-2 max-w-xl font-display text-base font-semibold leading-snug text-white/80 sm:text-lg">
          {certification.title}
        </p>
      </div>
      <p className="relative mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
        Certificate preview not provided
      </p>
    </div>
  );
}

function CertificationCard({
  certification,
  index,
  eager,
  onOpen,
}: {
  certification: Certification;
  index: number;
  eager: boolean;
  onOpen: (certification: Certification, source: HTMLElement) => void;
}) {
  return (
    <Tilt className="rounded-2xl">
      <article
        className="certification-card group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-charcoal/75 transition duration-300 hover:-translate-y-1 hover:border-cyan/35 hover:shadow-[0_24px_70px_-36px_#2F6BFF88]"
        style={{ animationDelay: `${Math.min(index, 7) * 55}ms` }}
      >
        <button
          type="button"
          onClick={(event) => onOpen(certification, event.currentTarget)}
          className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-cyan"
          aria-label={`Open certificate preview for ${certification.title}`}
        >
          <CertificateArtwork certification={certification} eager={eager} />
          <span className="absolute bottom-3 right-3 translate-y-1 rounded-full border border-cyan/40 bg-midnight/90 px-3 py-1.5 text-xs text-cyan opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            View certificate
          </span>
        </button>
        <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow text-[10px]">{certification.issuer}</p>
          {certification.featured && (
            <span className="rounded-full border border-violet/40 px-2.5 py-1 text-[10px] text-violet">
              Featured
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug sm:text-xl">
          {certification.title}
        </h3>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:text-sm">
          <div>
            <dt className="text-white/40">Issued</dt>
            <dd className="mt-1 text-white/75">{certification.issueDate}</dd>
          </div>
          <div>
            <dt className="text-white/40">Expires</dt>
            <dd className="mt-1 text-white/75">{certification.expirationDate ?? "Not specified"}</dd>
          </div>
          {certification.credentialId && (
            <div className="col-span-2 min-w-0">
              <dt className="text-white/40">Credential ID</dt>
              <dd className="mt-1 break-all font-mono text-xs text-white/70">
                {certification.credentialId}
              </dd>
            </div>
          )}
        </dl>
        <ul aria-label="Skills" className="mt-4 flex flex-wrap gap-2">
          {certification.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-electric/25 bg-midnight/60 px-2.5 py-1 text-[11px] text-white/65"
            >
              {skill}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <span className="text-xs text-white/40">
            {certification.certificateFile ? "Certificate available" : "Certificate file pending"}
          </span>
          <button
            type="button"
            onClick={(event) => onOpen(certification, event.currentTarget)}
            className="rounded-full border border-cyan/30 px-4 py-2 text-sm text-cyan transition hover:bg-cyan/10 focus-visible:outline-cyan"
            aria-label={`View details for ${certification.title}`}
          >
            View details
          </button>
        </div>
        </div>
      </article>
    </Tilt>
  );
}

function CertificationPreviewModal({
  certification,
  source,
  onClose,
}: {
  certification: Certification | null;
  source: HTMLElement | null;
  onClose: () => void;
}) {
  if (!certification) return null;

  return (
    <CinematicDialog
      source={source}
      title={`${certification.title} certificate`}
      onClose={onClose}
    >
      <div className="overflow-hidden border-b border-white/10">
        {certification.certificateFile?.toLowerCase().endsWith(".pdf") ? (
          <iframe
            title={`Certificate PDF: ${certification.title}`}
            src={certification.certificateFile}
            className="h-[min(60dvh,46rem)] w-full bg-white"
          />
        ) : certification.certificateImage ? (
          <div           className="relative aspect-[1.414/1] min-h-48 bg-white sm:min-h-80">
            <Image
              src={certification.certificateImage}
              alt={`Full certificate for ${certification.title}`}
              fill
              sizes="94vw"
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <div className="grid min-h-56 place-items-center p-8 text-center sm:min-h-72">
            <div>
              {certification.issuerLogo ? (
                <Image
                  src={certification.issuerLogo}
                  alt={`${certification.issuer} logo`}
                  width={160}
                  height={64}
                  className="mx-auto max-h-16 w-auto object-contain"
                />
              ) : (
                <p className="font-display text-2xl font-semibold text-white/90">
                  {certification.issuer}
                </p>
              )}
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
                The authentic certificate image or document has not been supplied or found
                publicly. No substitute certificate artwork is shown.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <p className="eyebrow">{certification.issuer}</p>
        <h2 className="mt-2 max-w-3xl font-display text-2xl font-bold leading-tight sm:text-3xl">
          {certification.title}
        </h2>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-white/45">Issued</dt>
            <dd className="mt-1 text-white/85">{certification.issueDate}</dd>
          </div>
          <div>
            <dt className="text-white/45">Expires</dt>
            <dd className="mt-1 text-white/85">
              {certification.expirationDate ?? "Not specified"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-white/45">Credential ID</dt>
            <dd className="mt-1 break-all font-mono text-white/85">
              {certification.credentialId ?? "Not provided"}
            </dd>
          </div>
        </dl>
        <div className="mt-5">
          <p className="text-sm text-white/45">Skills</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {certification.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-violet/30 px-3 py-1 text-xs text-white/75"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          {certification.verificationUrl && (
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="holo-link rounded-full bg-electric px-5 py-3 text-sm font-medium hover:bg-electric/80"
            >
              Verify credential ↗
            </a>
          )}
          {certification.certificateFile && (
            <a
              href={certification.certificateFile}
              download
              className="holo-link rounded-full border border-white/20 px-5 py-3 text-sm hover:border-cyan hover:text-cyan"
            >
              Download certificate
            </a>
          )}
          {certification.certificateImage && (
            <a
              href={certification.certificateImage}
              target="_blank"
              rel="noreferrer"
              className="holo-link rounded-full border border-white/20 px-5 py-3 text-sm hover:border-cyan hover:text-cyan"
            >
              Open full-size image ↗
            </a>
          )}
          {!certification.verificationUrl && !certification.certificateFile && (
            <span className="self-center text-sm text-white/45">
              Verification link and certificate file pending
            </span>
          )}
        </div>
      </div>
    </CinematicDialog>
  );
}

export default function CertificationGallery() {
  const [category, setCategory] = useState<CertificationCategory | "All">("All");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Certification | null>(null);
  const [previewSource, setPreviewSource] = useState<HTMLElement | null>(null);

  const matching = useMemo(() => {
    const filtered = certifications.filter(
      (certification) => category === "All" || certification.categories.includes(category),
    );

    return filtered.sort((a, b) => {
      if (sort === "issuer") {
        return a.issuer.localeCompare(b.issuer) || a.title.localeCompare(b.title);
      }
      const dateOrder = a.issueSort.localeCompare(b.issueSort);
      return sort === "newest" ? -dateOrder : dateOrder;
    });
  }, [category, sort]);

  const showingAll = showAll || category !== "All" || sort !== "newest";
  const visible = showingAll ? matching : matching.filter((item) => item.featured);
  const loadAllImagesEagerly = showAll || category !== "All" || sort !== "newest";
  const featuredCount = certifications.filter((item) => item.featured).length;

  return (
    <section
      id="certifications"
      data-bg="#0a1330"
      className="relative z-10 isolate overflow-hidden px-5 py-20 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        data-depth="0.14"
        className="pointer-events-none absolute -left-32 top-24 -z-10 h-96 w-96 rounded-full bg-electric/10 blur-3xl"
      />
      <div className="pointer-events-none absolute bottom-10 right-[8%] -z-10 h-32 w-32 rounded-full border border-violet/10 sm:h-48 sm:w-48" />
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="mb-10">
          <p className="eyebrow mb-3">06 — Certifications</p>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="h2">Learning in practice.</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/65">
                Thirteen credentials and course completions, with the details supplied for this
                portfolio. Certificate scans and verification links are shown only when available.
              </p>
            </div>
            <p className="font-mono text-sm text-cyan">
              {certifications.length} credentials
            </p>
          </div>
        </div>

        <div data-reveal className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-white/45">
              Filter by category
            </p>
            <div className="flex flex-wrap gap-2" aria-label="Certification categories">
              {(["All", ...certificationCategories] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => {
                    setCategory(item);
                    setShowAll(item !== "All");
                  }}
                  className={`min-h-11 rounded-full border px-3 py-2 text-xs leading-tight transition sm:px-4 sm:text-sm ${
                    category === item
                      ? "border-cyan bg-cyan/10 text-cyan"
                      : "border-white/15 text-white/65 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <label className="grid gap-2 text-xs text-white/45">
            Sort credentials
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortOrder);
                setShowAll(true);
              }}
              className="min-h-11 rounded-lg border border-white/15 bg-charcoal px-3 text-sm text-white focus-visible:outline-cyan"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="issuer">Issuer name</option>
            </select>
          </label>
        </div>

        <div aria-live="polite" className="mb-4 text-sm text-white/50">
          Showing {visible.length} of {certifications.length} credentials
        </div>

        <div className="grid items-start gap-5 md:grid-cols-2">
          {visible.map((certification, index) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              index={index}
              eager={loadAllImagesEagerly}
              onOpen={(item, source) => {
                setSelected(item);
                setPreviewSource(source);
              }}
            />
          ))}
        </div>

        {category === "All" && sort === "newest" && !showAll && (
          <div className="mt-9 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="rounded-full border border-cyan/40 px-6 py-3 text-sm font-medium text-cyan transition hover:bg-cyan/10"
            >
              View all {certifications.length} credentials
            </button>
            <p className="mt-2 text-xs text-white/40">{featuredCount} featured credentials shown</p>
          </div>
        )}
        {showAll && category === "All" && sort === "newest" && (
          <div className="mt-9 text-center">
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="rounded-full border border-white/20 px-6 py-3 text-sm text-white/70 transition hover:border-cyan hover:text-cyan"
            >
              Show featured credentials
            </button>
          </div>
        )}
      </div>
      <CertificationPreviewModal
        certification={selected}
        source={previewSource}
        onClose={() => {
          setSelected(null);
          setPreviewSource(null);
        }}
      />
    </section>
  );
}
