"use client";

import { useState, type FormEvent } from "react";

type ExpoView = "Showcase" | "DevDay" | "Visit";

const expoViews: Record<ExpoView, { eyebrow: string; title: string; detail: string }> = {
  Showcase: {
    eyebrow: "Chapter 02 · The Showcase",
    title: "Capstone projects, live.",
    detail:
      "The public event overview describes team booths, posters, and industry judging. This preview uses the published description rather than inventing project listings.",
  },
  DevDay: {
    eyebrow: "Chapter 03 · DevDay",
    title: "Talks from industry practitioners.",
    detail:
      "The public event overview advertises 12 DevDay sessions and 20+ industry panelists. Individual session details are not reproduced in this portfolio demo.",
  },
  Visit: {
    eyebrow: "Visitor information",
    title: "Plan a visit to FEU Tech.",
    detail:
      "The published event page lists November 9–12, 2026 at FEU Tech. This interaction is an informational preview; it does not reserve a pass.",
  },
};

export default function CSExpoDemo() {
  const [view, setView] = useState<ExpoView>("Showcase");
  const [showRegistration, setShowRegistration] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Project showcase");
  const [message, setMessage] = useState("");
  const [registration, setRegistration] = useState<string | null>(null);

  function reset() {
    setView("Showcase");
    setShowRegistration(false);
    setName("");
    setEmail("");
    setInterest("Project showcase");
    setMessage("");
    setRegistration(null);
  }

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setMessage("Enter a name and a valid email address to preview the form confirmation.");
      return;
    }
    setRegistration(trimmedName);
    setMessage("");
  }

  return (
    <div className="fixed-dark-surface overflow-hidden rounded-3xl border border-[#1c9a9d]/30 bg-[#07191d] text-[#f4eee3]">
      <header className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(244,118,55,.22),transparent_38%),linear-gradient(120deg,#0b3035,#07191d_65%,#281b18)] p-5 sm:p-7">
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7bd0c8]">
              CS Expo 2026 · Mission: Tomorrow
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Reimagining tomorrow, today.</h3>
            <p className="mt-2 text-sm text-white/70">Published event overview · interactive portfolio preview</p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="min-h-10 rounded-xl border border-white/25 bg-black/10 px-3 text-xs font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7bd0c8]"
          >
            Reset demo
          </button>
        </div>
        <div className="relative z-10 mt-5 grid grid-cols-3 gap-2">
          {[
            ["Projects", "90+"],
            ["DevDay sessions", "12"],
            ["Industry panelists", "20+"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-black/15 p-3">
              <p className="font-display text-lg font-bold text-[#ffad70] sm:text-2xl">{value}</p>
              <p className="mt-1 text-[10px] leading-snug text-white/65 sm:text-xs">{label}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.85fr)]">
        <div>
          <div className="flex flex-wrap gap-2">
            {(["Showcase", "DevDay", "Visit"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={view === item}
                onClick={() => setView(item)}
                className={`min-h-11 rounded-full border px-4 text-xs font-semibold ${
                  view === item
                    ? "border-[#7bd0c8] bg-[#7bd0c8] text-[#07191d]"
                    : "border-white/20 text-white/75 hover:border-[#7bd0c8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <article aria-live="polite" className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffad70]">
              {expoViews[view].eyebrow}
            </p>
            <h4 className="mt-2 font-display text-xl font-bold">{expoViews[view].title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{expoViews[view].detail}</p>
            {view === "Visit" && (
              <p className="mt-4 rounded-xl border border-[#7bd0c8]/20 bg-[#7bd0c8]/5 p-3 text-xs text-[#b8e3dd]">
                November 9–12, 2026 · FEU Tech
              </p>
            )}
          </article>
          <p className="mt-4 text-xs leading-relaxed text-white/50">
            Facts and dates above are taken from the public CS Expo event website. This portfolio demonstration does not connect to its registration or publishing systems.
          </p>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#7bd0c8]">Try the form</p>
              <h4 className="mt-1 font-display text-lg font-bold">Pass registration preview</h4>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowRegistration((value) => !value);
                setRegistration(null);
                setMessage("");
              }}
              className="min-h-10 rounded-lg border border-white/20 px-3 text-xs font-semibold text-white/80"
            >
              {showRegistration ? "Close" : "Open"}
            </button>
          </div>
          {showRegistration && (
            registration ? (
              <div role="status" className="mt-4 rounded-xl border border-[#7bd0c8]/25 bg-[#7bd0c8]/10 p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#7bd0c8]">Demo confirmation</p>
                <p className="mt-2 text-sm font-semibold">Thanks, {registration}.</p>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  Your sample form passed local validation. No pass was reserved and no data was sent or saved.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setRegistration(null);
                    setName("");
                    setEmail("");
                  }}
                  className="mt-3 min-h-10 rounded-lg border border-white/20 px-3 text-xs font-semibold"
                >
                  Try another entry
                </button>
              </div>
            ) : (
              <form onSubmit={submitDemo} className="mt-4 space-y-3">
                <label className="block text-xs font-semibold text-white/80" htmlFor="expo-demo-name">
                  Name
                  <input
                    id="expo-demo-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    maxLength={80}
                    autoComplete="name"
                    className="mt-1 min-h-11 w-full rounded-lg border border-white/15 bg-[#061317] px-3 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7bd0c8]"
                  />
                </label>
                <label className="block text-xs font-semibold text-white/80" htmlFor="expo-demo-email">
                  Email
                  <input
                    id="expo-demo-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    maxLength={254}
                    autoComplete="email"
                    className="mt-1 min-h-11 w-full rounded-lg border border-white/15 bg-[#061317] px-3 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7bd0c8]"
                  />
                </label>
                <label className="block text-xs font-semibold text-white/80" htmlFor="expo-demo-interest">
                  I’m interested in
                  <select
                    id="expo-demo-interest"
                    value={interest}
                    onChange={(event) => setInterest(event.target.value)}
                    className="mt-1 min-h-11 w-full rounded-lg border border-white/15 bg-[#061317] px-3 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7bd0c8]"
                  >
                    <option>Project showcase</option>
                    <option>DevDay sessions</option>
                    <option>Industry panel</option>
                  </select>
                </label>
                <button type="submit" className="min-h-11 w-full rounded-lg bg-[#f47637] px-4 text-sm font-bold text-[#07191d] hover:bg-[#ff985c]">
                  Validate demo registration
                </button>
                {message && <p role="alert" className="text-xs text-[#ffad70]">{message}</p>}
                <p className="text-[10px] leading-relaxed text-white/45">
                  Local-only form preview for {interest.toLowerCase()}. Do not enter real personal information.
                </p>
              </form>
            )
          )}
        </aside>
      </div>
    </div>
  );
}
