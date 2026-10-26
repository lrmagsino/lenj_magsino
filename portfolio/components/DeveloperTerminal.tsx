"use client";

import { useState, type FormEvent } from "react";
import { certifications } from "@/lib/certifications";
import { education } from "@/lib/education";
import { profile, projects, skills } from "@/lib/content";

const commands = [
  "help",
  "about",
  "projects",
  "skills",
  "education",
  "certifications",
  "contact",
  "clear",
] as const;

type Command = (typeof commands)[number];
type TerminalEntry = { command: string; output: string };

function getOutput(command: Command): string {
  switch (command) {
    case "help":
      return `Available commands: ${commands.join(", ")}`;
    case "about":
      return `${profile.name} — ${profile.headline}. Seeking a software engineering internship; no professional employment is claimed.`;
    case "projects":
      return projects.map((project) => `${project.name} — ${project.tag}`).join("\n");
    case "skills":
      return skills
        .map((group) => `${group.title}: ${group.items.join(", ")}`)
        .join("\n");
    case "education":
      return education
        .map((school) => `${school.institution} — ${school.program} (${school.dates})`)
        .join("\n");
    case "certifications":
      return `${certifications.length} documented credentials. Featured: ${certifications
        .filter((certification) => certification.featured)
        .map((certification) => certification.title)
        .join("; ")}.`;
    case "contact":
      return `Email: ${profile.email}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}`;
    case "clear":
      return "";
  }
}

export default function DeveloperTerminal() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitted = input.trim();
    if (!submitted) return;

    const command = submitted.toLowerCase();
    setInput("");
    if (command === "clear") {
      setEntries([]);
      return;
    }

    const matchingCommand = commands.find((available) => available === command);
    if (matchingCommand) {
      setEntries((current) => [
        ...current,
        { command: submitted, output: getOutput(matchingCommand) },
      ]);
      return;
    }

    setEntries((current) => [
      ...current,
      {
        command: submitted,
        output: 'Command not available. Type "help" to see the supported commands.',
      },
    ]);
  };

  return (
    <section id="terminal" className="rounded-2xl border border-white/10 bg-charcoal/70 p-5 sm:p-7">
      <p className="eyebrow">Optional interactive extra</p>
      <h2 className="mt-2 font-display text-2xl font-bold">Portfolio terminal</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        Read-only portfolio commands only. No shell, scripts, or arbitrary command execution.
      </p>
      <details className="mt-4 overflow-hidden rounded-xl border border-cyan/20 bg-[#070c16]">
        <summary className="cursor-pointer px-4 py-3 font-mono text-sm text-cyan">
          Open terminal
        </summary>
        <div className="border-t border-white/10 p-4">
          <div
            className="max-h-72 space-y-3 overflow-y-auto font-mono text-xs leading-relaxed sm:text-sm"
            aria-live="polite"
          >
            <p className="text-white/55">
              Type <span className="text-cyan">help</span> to list available commands.
            </p>
            {entries.map((entry, index) => (
              <div key={`${entry.command}-${index}`}>
                <p className="text-violet">&gt; {entry.command}</p>
                <pre className="mt-1 whitespace-pre-wrap break-words text-white/75">{entry.output}</pre>
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label htmlFor="portfolio-terminal-command" className="sr-only">
              Enter a predefined portfolio command
            </label>
            <input
              id="portfolio-terminal-command"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              placeholder="help"
              className="min-h-11 min-w-0 flex-1 rounded-lg border border-white/15 bg-midnight px-3 font-mono text-sm text-white outline-none focus:border-cyan"
            />
            <button
              type="submit"
              className="holo-link min-h-11 rounded-lg border border-cyan/40 px-5 font-mono text-sm text-cyan hover:bg-cyan/10"
            >
              Run
            </button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Available terminal commands">
            {commands.map((command) => (
              <button
                key={command}
                type="button"
                onClick={() => {
                  if (command === "clear") {
                    setEntries([]);
                    return;
                  }
                  setEntries((current) => [
                    ...current,
                    { command, output: getOutput(command) },
                  ]);
                }}
                className="min-h-9 rounded-full border border-white/10 px-3 font-mono text-xs text-white/60 hover:border-cyan/40 hover:text-cyan"
              >
                {command}
              </button>
            ))}
          </div>
        </div>
      </details>
    </section>
  );
}
