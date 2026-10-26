"use client";

import { useEffect, useState } from "react";
import { links, profile } from "@/lib/content";

type PublicRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  fork: boolean;
};

type PublicEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
};

type LoadState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

const username = new URL(links.github).pathname.split("/").filter(Boolean)[0];
const apiRoot = `https://api.github.com/users/${username}`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseRepositories(value: unknown): PublicRepository[] {
  if (!Array.isArray(value)) {
    throw new Error("GitHub returned an unexpected repositories response.");
  }

  return value.flatMap((item): PublicRepository[] => {
    if (
      !isRecord(item) ||
      typeof item.id !== "number" ||
      typeof item.name !== "string" ||
      typeof item.html_url !== "string" ||
      !item.html_url.startsWith("https://github.com/") ||
      typeof item.updated_at !== "string" ||
      !Number.isFinite(Date.parse(item.updated_at)) ||
      typeof item.fork !== "boolean" ||
      !(typeof item.description === "string" || item.description === null) ||
      !(typeof item.language === "string" || item.language === null)
    ) {
      return [];
    }

    return [
      {
        id: item.id,
        name: item.name,
        html_url: item.html_url,
        description: item.description,
        language: item.language,
        updated_at: item.updated_at,
        fork: item.fork,
      },
    ];
  });
}

function parseEvents(value: unknown): PublicEvent[] {
  if (!Array.isArray(value)) {
    throw new Error("GitHub returned an unexpected public activity response.");
  }

  return value.flatMap((item): PublicEvent[] => {
    if (
      !isRecord(item) ||
      typeof item.id !== "string" ||
      typeof item.type !== "string" ||
      typeof item.created_at !== "string" ||
      !Number.isFinite(Date.parse(item.created_at)) ||
      !isRecord(item.repo) ||
      typeof item.repo.name !== "string" ||
      !/^[\w.-]+\/[\w.-]+$/.test(item.repo.name)
    ) {
      return [];
    }

    return [
      {
        id: item.id,
        type: item.type,
        created_at: item.created_at,
        repo: { name: item.repo.name },
      },
    ];
  });
}

function getFailureMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "GitHub data could not be loaded. Please try again.";
}

function eventLabel(type: string): string {
  const labels: Record<string, string> = {
    PushEvent: "Pushed to",
    PullRequestEvent: "Pull request activity in",
    IssuesEvent: "Issue activity in",
    CreateEvent: "Created in",
    ForkEvent: "Forked",
    WatchEvent: "Starred",
    ReleaseEvent: "Released in",
    IssueCommentEvent: "Commented in",
  };

  return labels[type] ?? `${type.replace(/Event$/, "")} activity in`;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}

async function fetchGitHubData<T>(
  path: string,
  signal: AbortSignal,
  parse: (value: unknown) => T,
): Promise<T> {
  const response = await fetch(`${apiRoot}/${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error("GitHub is rate-limiting public requests. Please try again later.");
    }
    throw new Error(`GitHub returned HTTP ${response.status}. Please try again later.`);
  }

  const value: unknown = await response.json();
  return parse(value);
}

function DataError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-4 rounded-xl border border-amber-300/25 bg-amber-300/5 p-3 text-sm leading-relaxed text-amber-100/80">
      {message}
    </p>
  );
}

export default function GitHubActivity() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [repositories, setRepositories] = useState<LoadState<PublicRepository[]>>({
    status: "loading",
  });
  const [events, setEvents] = useState<LoadState<PublicEvent[]>>({
    status: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();
    setRepositories({ status: "loading" });
    setEvents({ status: "loading" });

    void fetchGitHubData(
      "repos?type=owner&sort=updated&per_page=100",
      controller.signal,
      parseRepositories,
    )
      .then((items) => {
        const latest = items
          .filter((repository) => !repository.fork)
          .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
          .slice(0, 5);
        setRepositories({ status: "success", data: latest });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setRepositories({ status: "error", message: getFailureMessage(error) });
        }
      });

    void fetchGitHubData(
      "events/public?per_page=10",
      controller.signal,
      parseEvents,
    )
      .then((items) => {
        setEvents({ status: "success", data: items.slice(0, 5) });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setEvents({ status: "error", message: getFailureMessage(error) });
        }
      });

    return () => controller.abort();
  }, [refreshKey]);

  return (
    <section id="github" className="rounded-2xl border border-white/10 bg-charcoal/70 p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Public GitHub snapshot</p>
          <h2 className="mt-2 font-display text-2xl font-bold">Recent work, straight from GitHub</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">
            Public repositories and public events only. This feed does not expose private activity
            or infer contribution totals. GitHub does not provide a public contribution-graph
            endpoint without authentication, so no contribution graph is shown.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setRefreshKey((key) => key + 1)}
            className="holo-link inline-flex min-h-10 items-center rounded-full border border-white/20 px-4 text-sm text-white/75 hover:border-cyan hover:text-cyan"
          >
            Refresh public data
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="holo-link inline-flex min-h-10 items-center text-sm text-cyan hover:underline"
          >
            Open GitHub profile ↗
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-cyan">Public repositories</h3>
          {repositories.status === "loading" && (
            <p role="status" className="mt-3 text-sm text-white/55">Loading public repositories…</p>
          )}
          {repositories.status === "error" && <DataError message={repositories.message} />}
          {repositories.status === "success" &&
            (repositories.data.length > 0 ? (
              <ul className="mt-3 space-y-3">
                {repositories.data.map((repository) => (
                  <li key={repository.id} className="rounded-xl border border-white/10 bg-midnight/50 p-4">
                    <a
                      href={repository.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="holo-link font-medium text-white hover:text-cyan"
                    >
                      {repository.name} ↗
                    </a>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                      {repository.description || "No public repository description provided."}
                    </p>
                    <p className="mt-2 font-mono text-xs text-white/45">
                      {repository.language || "Language not specified"} · Updated {formatDate(repository.updated_at)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-white/55">No owned public repositories were returned.</p>
            ))}
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-cyan">Recent public activity</h3>
          {events.status === "loading" && (
            <p role="status" className="mt-3 text-sm text-white/55">Loading recent public events…</p>
          )}
          {events.status === "error" && <DataError message={events.message} />}
          {events.status === "success" &&
            (events.data.length > 0 ? (
              <ol className="mt-3 space-y-3">
                {events.data.map((event) => (
                  <li key={event.id} className="rounded-xl border border-white/10 bg-midnight/50 p-4">
                    <p className="text-sm text-white/80">{eventLabel(event.type)}</p>
                    <a
                      href={`https://github.com/${event.repo.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="holo-link mt-1 inline-flex min-h-8 items-center text-sm text-cyan hover:underline"
                    >
                      {event.repo.name} ↗
                    </a>
                    <p className="mt-1 font-mono text-xs text-white/45">{formatDate(event.created_at)}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-sm text-white/55">No recent public events were returned by GitHub.</p>
            ))}
        </div>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-white/40">
        GitHub’s unauthenticated public API may limit requests or omit older activity. The cards
        above reflect only the current public API response.
      </p>
    </section>
  );
}
