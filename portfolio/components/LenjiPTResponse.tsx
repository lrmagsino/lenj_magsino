"use client";

import type {
  LenjiPTAction,
  LenjiPTResponse,
} from "@/lib/lenjiptCore";
import { isSafeActionHref } from "@/lib/lenjiptCore";

function ActionLink({
  action,
  onInternalNavigate,
}: {
  action: LenjiPTAction;
  onInternalNavigate?: (href: string) => void;
}) {
  return (
    <a
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noreferrer" : undefined}
      download={action.download || undefined}
      onClick={(event) => {
        if (action.href.startsWith("#") && onInternalNavigate) {
          event.preventDefault();
          onInternalNavigate(action.href);
        }
      }}
      className="holo-link inline-flex min-h-10 items-center justify-center rounded-full border border-cyan/35 bg-cyan/5 px-3 py-2 text-xs font-medium text-cyan hover:border-cyan/70 hover:bg-cyan/10 sm:text-sm"
    >
      {action.label}
      {action.external && (
        <span aria-hidden="true" className="ml-1">
          ↗
        </span>
      )}
    </a>
  );
}

export default function LenjiPTResponseView({
  response,
  onFollowUp,
  onInternalNavigate,
  isThinking,
}: {
  response: LenjiPTResponse;
  onFollowUp: (question: string) => void;
  onInternalNavigate?: (href: string) => void;
  isThinking: boolean;
}) {
  const actions = response.actions.filter((action) =>
    isSafeActionHref(action.href),
  );
  const sources = response.sources.filter(
    (source) => !source.href || isSafeActionHref(source.href),
  );
  const language = response.language ?? "en";
  const labels =
    language === "fil"
      ? {
          sourceReviewed: "Mga detalye ng portfolio na sinuri sa source",
          portfolioListed: "Mga detalyeng nakatala sa portfolio",
          sources: "Mga Sanggunian",
          exploreNext: "Tingnan pa",
        }
      : language === "taglish"
        ? {
            sourceReviewed: "Source-reviewed portfolio details",
            portfolioListed: "Portfolio-listed details",
            sources: "Sources",
            exploreNext: "Explore Next",
          }
        : {
            sourceReviewed: "Source-reviewed portfolio details",
            portfolioListed: "Portfolio-listed details",
            sources: "Sources",
            exploreNext: "Explore next",
          };

  return (
    <div className="space-y-4">
      <div>
        {response.evidenceStatus && (
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">
            {response.evidenceStatus === "source-reviewed"
              ? labels.sourceReviewed
              : labels.portfolioListed}
          </p>
        )}
        <h3 className="font-display text-base font-semibold leading-snug text-[color:var(--color-text-primary)]">
          {response.title}
        </h3>
        <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-[color:var(--color-text-primary)]">
          {response.summary}
        </p>
      </div>

      {response.sections.map((section, sectionIndex) => (
        <section
          key={`${section.heading}-${sectionIndex}`}
          className="space-y-2.5"
        >
          <h4 className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan">
            {section.heading}
          </h4>
          {section.paragraphs?.map((paragraph, paragraphIndex) => (
            <p
              key={`${section.heading}-paragraph-${paragraphIndex}`}
              className="whitespace-pre-line text-sm leading-relaxed text-[color:var(--color-text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
              {section.bullets.map((bullet, bulletIndex) => (
                <li key={`${section.heading}-bullet-${bulletIndex}`}>{bullet}</li>
              ))}
            </ul>
          )}
          {section.chips && section.chips.length > 0 && (
            <ul className="flex flex-wrap gap-1.5" aria-label={section.heading}>
              {section.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] leading-relaxed text-[color:var(--color-text-secondary)]"
                >
                  {chip}
                </li>
              ))}
            </ul>
          )}
          {section.items && section.items.length > 0 && (
            <ul className="grid gap-2 sm:grid-cols-2">
              {section.items.map((item, itemIndex) => (
                <li
                  key={`${item.title}-${itemIndex}`}
                  className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <p className="text-sm font-semibold leading-snug text-[color:var(--color-text-primary)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[color:var(--color-text-secondary)]">
                    {item.summary}
                  </p>
                  {item.chips && item.chips.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-1" aria-label={`${item.title} details`}>
                      {item.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] leading-relaxed text-[color:var(--color-text-muted)]"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.action && isSafeActionHref(item.action.href) && (
                    <div className="mt-2">
                      <ActionLink
                        action={item.action}
                        onInternalNavigate={onInternalNavigate}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          {section.table && (
            <div className="max-w-full overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[34rem] text-left text-xs leading-relaxed">
                <caption className="sr-only">{section.heading}</caption>
                <thead className="bg-white/5 text-[color:var(--color-text-muted)]">
                  <tr>
                    {section.table.headers.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-3 py-2.5 font-mono font-medium uppercase tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-[color:var(--color-text-secondary)]">
                  {section.table.rows.map((row, rowIndex) => (
                    <tr
                      key={`${row[0] ?? "row"}-${rowIndex}`}
                      className="border-t border-white/10 align-top"
                    >
                      {row.map((cell, cellIndex) =>
                        cellIndex === 0 ? (
                          <th
                            key={`${rowIndex}-${cellIndex}`}
                            scope="row"
                            className="px-3 py-2.5 font-semibold text-[color:var(--color-text-primary)]"
                          >
                            {cell}
                          </th>
                        ) : (
                          <td
                            key={`${rowIndex}-${cellIndex}`}
                            className="max-w-[18rem] px-3 py-2.5"
                          >
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      {sources.length > 0 && (
        <div className="border-t border-white/10 pt-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">
            {labels.sources}
          </p>
          <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[color:var(--color-text-muted)]">
            {sources.map((source, index) => {
              const external = source.href?.startsWith("https://");
              return (
                <li key={`${source.label}-${index}`}>
                  {source.href ? (
                    <a
                      href={source.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      onClick={(event) => {
                        if (
                          source.href?.startsWith("#") &&
                          onInternalNavigate
                        ) {
                          event.preventDefault();
                          onInternalNavigate(source.href);
                        }
                      }}
                      className="underline decoration-white/20 underline-offset-2 hover:text-cyan"
                    >
                      {source.label}
                    </a>
                  ) : (
                    source.label
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {actions.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <li key={`${action.href}-${action.label}`}>
              <ActionLink
                action={action}
                onInternalNavigate={onInternalNavigate}
              />
            </li>
          ))}
        </ul>
      )}

      {response.followUps.length > 0 && (
        <div className="border-t border-white/10 pt-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">
            {labels.exploreNext}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {response.followUps.map((question) => (
              <li key={question}>
                <button
                  type="button"
                  onClick={() => onFollowUp(question)}
                  disabled={isThinking}
                  className="holo-link min-h-9 rounded-full border border-violet/25 px-3 py-1.5 text-left text-xs leading-relaxed text-[color:var(--color-text-secondary)] hover:border-violet/55 hover:text-violet disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:transform-none"
                >
                  {question}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
