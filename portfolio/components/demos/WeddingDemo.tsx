"use client";

import { useState, type FormEvent } from "react";

type WeddingTab = "Our story" | "Timeline" | "Event details" | "RSVP";
type RSVPConfirmation = { name: string; attendance: "yes" | "no" };

const tabs: WeddingTab[] = ["Our story", "Timeline", "Event details", "RSVP"];

export default function WeddingDemo() {
  const [opened, setOpened] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [tab, setTab] = useState<WeddingTab>("Our story");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [message, setMessage] = useState("");
  const [confirmation, setConfirmation] = useState<RSVPConfirmation | null>(null);

  function reset() {
    setOpened(false);
    setGuestName("");
    setTab("Our story");
    setAttendance("yes");
    setMessage("");
    setConfirmation(null);
  }

  function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = guestName.trim();
    if (!name) {
      setMessage("Enter a display name to preview the RSVP.");
      return;
    }
    setConfirmation({ name, attendance });
    setMessage("");
  }

  return (
    <div className="fixed-light-surface overflow-hidden rounded-3xl border border-[#8e2638]/25 bg-[#f7f1e8] text-[#332528]">
      <header className="relative overflow-hidden border-b border-[#8e2638]/15 bg-[radial-gradient(ellipse_at_90%_15%,rgba(142,38,56,.12),transparent_36%),linear-gradient(135deg,#fffaf1,#f4e9e1)] p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8e2638]">
              Fritz & Princess · Invitation preview
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Together today, tomorrow, and always.
            </h3>
            <p className="mt-2 text-sm text-[#705e61]">
              Travel-inspired digital invitation · burgundy and ivory
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="min-h-10 rounded-xl border border-[#8e2638]/30 bg-white/70 px-3 text-xs font-semibold text-[#8e2638] hover:bg-white"
          >
            Reset demo
          </button>
        </div>
        {!opened ? (
          <div className="mt-5 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <label className="text-xs font-semibold text-[#705e61]" htmlFor="wedding-demo-guest">
              Personalize this local preview
              <input
                id="wedding-demo-guest"
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                maxLength={60}
                autoComplete="off"
                placeholder="Guest name (optional)"
                className="mt-1 min-h-11 w-full rounded-lg border border-[#dacbc5] bg-white px-3 text-sm text-[#332528] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8e2638]"
              />
            </label>
            <button
              type="button"
              onClick={() => setOpened(true)}
              className="min-h-11 self-end rounded-lg bg-[#8e2638] px-5 text-sm font-semibold text-white hover:bg-[#70202e]"
            >
              Open invitation
            </button>
          </div>
        ) : (
          <div role="status" className="mt-5 rounded-xl border border-[#8e2638]/15 bg-white/75 p-4">
            <p className="font-serif text-lg italic text-[#8e2638]">
              {guestName.trim() ? `Dear ${guestName.trim()},` : "You are warmly invited."}
            </p>
            <p className="mt-1 text-sm text-[#705e61]">
              Fritz & Princess · April 23, 2027 · Antipolo, Rizal
            </p>
          </div>
        )}
      </header>

      {opened && (
        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.8fr)]">
          <div>
            <div role="tablist" aria-label="Invitation sections" className="flex flex-wrap gap-2">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={tab === item}
                  onClick={() => {
                    setTab(item);
                    setConfirmation(null);
                    setMessage("");
                  }}
                  className={`min-h-10 rounded-full border px-3 text-xs font-semibold ${
                    tab === item
                      ? "border-[#8e2638] bg-[#8e2638] text-white"
                      : "border-[#d9c9c4] bg-white/75 text-[#705e61]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {tab === "Our story" && (
              <article role="tabpanel" className="mt-4 rounded-2xl border border-[#e4d7cf] bg-white/75 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8e2638]">A journey together</p>
                <h4 className="mt-2 font-display text-xl font-bold">A day to celebrate their story</h4>
                <p className="mt-3 text-sm leading-relaxed text-[#705e61]">
                  The original invitation uses a travel-inspired visual story, with a compass, globe, airplane, and route as symbols of a shared journey.
                </p>
                <p className="mt-3 font-serif text-lg italic text-[#8e2638]">
                  “Together today, tomorrow, and always.”
                </p>
              </article>
            )}
            {tab === "Timeline" && (
              <ol role="tabpanel" className="mt-4 space-y-3">
                {[
                  ["April 23, 2027", "Wedding day · Antipolo, Rizal"],
                  ["Ceremony", "See the couple’s invitation for the current ceremony details."],
                  ["Reception", "See the couple’s invitation for the current reception details."],
                ].map(([title, detail], index) => (
                  <li key={title} className="flex gap-3 rounded-xl border border-[#e4d7cf] bg-white/75 p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8e2638] font-mono text-xs text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#705e61]">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            {tab === "Event details" && (
              <article role="tabpanel" className="mt-4 rounded-2xl border border-[#e4d7cf] bg-white/75 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8e2638]">Save the date</p>
                <h4 className="mt-2 font-display text-xl font-bold">April 23, 2027</h4>
                <p className="mt-2 text-sm text-[#705e61]">Antipolo, Rizal</p>
                <p className="mt-4 rounded-lg bg-[#f7f1e8] p-3 text-xs leading-relaxed text-[#705e61]">
                  Specific ceremony and reception times and locations are intentionally not recreated here. Consult the current invitation for the couple’s confirmed details.
                </p>
              </article>
            )}
            {tab === "RSVP" && (
              <div role="tabpanel" className="mt-4 rounded-2xl border border-[#e4d7cf] bg-white/75 p-5">
                {confirmation ? (
                  <div role="status">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8e2638]">Local preview only</p>
                    <h4 className="mt-2 font-display text-xl font-bold">
                      Thank you, {confirmation.name}.
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#705e61]">
                      Your sample response ({confirmation.attendance === "yes" ? "joyfully accepts" : "regretfully declines"}) is ready to preview. It was not sent, stored, or added to the couple’s guest list.
                    </p>
                    <button
                      type="button"
                      onClick={() => setConfirmation(null)}
                      className="mt-4 min-h-10 rounded-lg border border-[#8e2638]/30 px-4 text-xs font-semibold text-[#8e2638]"
                    >
                      Edit response
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitRsvp} className="space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8e2638]">RSVP form preview</p>
                    <label className="block text-xs font-semibold text-[#705e61]" htmlFor="wedding-demo-rsvp-name">
                      Display name
                      <input
                        id="wedding-demo-rsvp-name"
                        value={guestName}
                        onChange={(event) => setGuestName(event.target.value)}
                        maxLength={60}
                        required
                        autoComplete="off"
                        className="mt-1 min-h-11 w-full rounded-lg border border-[#dacbc5] bg-white px-3 text-sm text-[#332528] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8e2638]"
                      />
                    </label>
                    <fieldset>
                      <legend className="text-xs font-semibold text-[#705e61]">Will you celebrate with them?</legend>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {([
                          ["yes", "Joyfully accepts"],
                          ["no", "Regretfully declines"],
                        ] as const).map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            aria-pressed={attendance === value}
                            onClick={() => setAttendance(value)}
                            className={`min-h-11 rounded-lg border px-2 text-xs font-semibold ${
                              attendance === value
                                ? "border-[#8e2638] bg-[#8e2638] text-white"
                                : "border-[#dacbc5] text-[#705e61]"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <button type="submit" className="min-h-11 w-full rounded-lg bg-[#8e2638] px-4 text-sm font-semibold text-white">
                      Preview RSVP response
                    </button>
                    {message && <p role="alert" className="text-xs text-[#8e2638]">{message}</p>}
                    <p className="text-[10px] leading-relaxed text-[#705e61]">
                      Attendance choice: {attendance === "yes" ? "accepting" : "declining"}. This is a browser-only demo; do not enter real guest information.
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-[#e4d7cf] bg-[#fffaf4] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8e2638]">Invitation details</p>
            <h4 className="mt-2 font-serif text-2xl font-semibold">Fritz & Princess</h4>
            <p className="mt-2 text-sm leading-relaxed text-[#705e61]">
              The public project describes a personalized invitation, story timeline, event details, and Google Forms RSVP. This preview keeps all responses local.
            </p>
            <div className="mt-4 border-t border-[#e4d7cf] pt-4 text-sm">
              <p className="font-semibold">April 23, 2027</p>
              <p className="mt-1 text-[#705e61]">Antipolo, Rizal</p>
            </div>
            <p className="mt-4 rounded-lg bg-[#f4e9e1] p-3 text-[10px] leading-relaxed text-[#705e61]">
              RSVP submission, guest wishes, public messages, and the live invitation are not contacted by this demo.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
