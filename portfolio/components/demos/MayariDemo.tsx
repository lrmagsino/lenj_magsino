"use client";

import { useMemo, useState, type FormEvent } from "react";

type Assignment = {
  id: string;
  title: string;
  course: string;
  due: string;
  window: "Today" | "This week" | "Overdue";
  locked?: string;
  prerequisites?: string;
};

type DemoClass = {
  id: number;
  name: string;
  meeting: string;
};

const initialAssignments: Assignment[] = [
  { id: "a1", title: "Interface critique", course: "Human Computer Interaction", due: "Today · 11:59 PM", window: "Today" },
  { id: "a2", title: "API integration exercise", course: "Web Development", due: "In 3 days", window: "This week", prerequisites: "Complete the routing activity first." },
  { id: "a3", title: "Research outline", course: "Software Engineering", due: "In 6 days", window: "This week", locked: "Available after the proposal is reviewed." },
  { id: "a4", title: "Reflection journal", course: "General Education", due: "Past due · sample", window: "Overdue" },
];

const initialClasses: DemoClass[] = [
  { id: 1, name: "Web Development", meeting: "Monday · 10:00 AM" },
  { id: 2, name: "Software Engineering", meeting: "Wednesday · 1:00 PM" },
];

type Tab = "Assignments" | "Classes" | "Updates";
type Filter = "All" | "Today" | "This week" | "Overdue";

export default function MayariDemo() {
  const [tab, setTab] = useState<Tab>("Assignments");
  const [filter, setFilter] = useState<Filter>("All");
  const [assignments, setAssignments] = useState(initialAssignments);
  const [completed, setCompleted] = useState<string[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);
  const [classes, setClasses] = useState(initialClasses);
  const [name, setName] = useState("");
  const [meeting, setMeeting] = useState("");
  const [editingClass, setEditingClass] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  const visibleAssignments = useMemo(
    () =>
      assignments.filter(
        (assignment) =>
          filter === "All" ||
          assignment.window === filter ||
          (filter === "This week" && assignment.window === "Today"),
      ),
    [assignments, filter],
  );
  const dueToday = assignments.filter(
    (assignment) => assignment.window === "Today" && !completed.includes(assignment.id),
  ).length;
  const dueThisWeek = assignments.filter(
    (assignment) =>
      (assignment.window === "Today" || assignment.window === "This week") &&
      !completed.includes(assignment.id),
  ).length;
  const overdue = assignments.filter(
    (assignment) => assignment.window === "Overdue" && !completed.includes(assignment.id),
  ).length;

  function reset() {
    setTab("Assignments");
    setFilter("All");
    setAssignments(initialAssignments);
    setCompleted([]);
    setReminders([]);
    setClasses(initialClasses);
    setName("");
    setMeeting("");
    setEditingClass(null);
    setNotice("Demo reset. Sample tasks and classes have been restored.");
  }

  function saveClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMeeting = meeting.trim();
    if (!trimmedName || !trimmedMeeting) {
      setNotice("Enter a class name and meeting time.");
      return;
    }
    if (editingClass !== null) {
      setClasses((current) =>
        current.map((item) =>
          item.id === editingClass
            ? { ...item, name: trimmedName, meeting: trimmedMeeting }
            : item,
        ),
      );
      setNotice(`${trimmedName} updated in this browser demo.`);
    } else {
      setClasses((current) => [
        ...current,
        { id: Math.max(0, ...current.map((item) => item.id)) + 1, name: trimmedName, meeting: trimmedMeeting },
      ]);
      setNotice(`${trimmedName} added to this browser demo.`);
    }
    setName("");
    setMeeting("");
    setEditingClass(null);
  }

  return (
    <div className="fixed-light-surface overflow-hidden rounded-3xl border border-violet/25 bg-gradient-to-br from-[#faf8ff] via-white to-[#f0eafe] text-[#292536]">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e7e0f0] p-4 sm:p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7259af]">
            Mayari · Canvas companion
          </p>
          <h3 className="mt-1 font-display text-xl font-bold">Deadline Guardian</h3>
          <p className="mt-1 text-xs text-[#625b70]">Sample dashboard · no Canvas connection or account access</p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="min-h-10 rounded-xl border border-[#7259af]/35 bg-white px-3 text-xs font-semibold text-[#644ca2] hover:bg-[#f8f5ff]"
        >
          Reset demo
        </button>
      </header>

      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(15rem,.8fr)]">
        <div className="min-w-0">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Due today", dueToday],
              ["This week", dueThisWeek],
              ["Overdue", overdue],
            ].map(([label, count]) => (
              <div key={label} className="rounded-xl border border-[#e9e3f0] bg-white p-3">
                <p className="text-[10px] text-[#625b70]">{label}</p>
                <p className="mt-1 font-display text-xl font-bold text-[#7259af]">{count}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-b border-[#e7e0f0]">
            {(["Assignments", "Classes", "Updates"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={tab === item}
                onClick={() => setTab(item)}
                className={`min-h-11 border-b-2 px-3 text-sm font-semibold ${
                  tab === item
                    ? "border-[#7259af] text-[#644ca2]"
                    : "border-transparent text-[#6d6676] hover:text-[#644ca2]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {tab === "Assignments" && (
            <div className="pt-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {(["All", "Today", "This week", "Overdue"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                    className={`min-h-9 shrink-0 rounded-full px-3 text-xs font-semibold ${
                      filter === item
                        ? "bg-[#7259af] text-white"
                        : "border border-[#e1d9ec] bg-white text-[#625b70]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <ul className="mt-2 space-y-3">
                {visibleAssignments.length ? (
                  visibleAssignments.map((assignment) => {
                    const isDone = completed.includes(assignment.id);
                    const hasReminder = reminders.includes(assignment.id);
                    return (
                      <li
                        key={assignment.id}
                        className={`rounded-2xl border bg-white p-4 ${
                          isDone ? "border-emerald-200" : "border-[#e9e3f0]"
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-[#7259af]">
                              {assignment.course}
                            </p>
                            <h4 className={`mt-1 font-display font-semibold ${isDone ? "text-[#6d6676] line-through" : ""}`}>
                              {assignment.title}
                            </h4>
                          </div>
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            assignment.window === "Overdue"
                              ? "bg-rose-100 text-rose-800"
                              : assignment.window === "Today"
                                ? "bg-amber-100 text-amber-900"
                                : "bg-violet-100 text-[#644ca2]"
                          }`}>
                            {isDone ? "Done" : assignment.due}
                          </span>
                        </div>
                        {assignment.prerequisites && (
                          <p className="mt-3 rounded-lg bg-[#f7f4fb] px-3 py-2 text-xs text-[#625b70]">
                            Prerequisite: {assignment.prerequisites}
                          </p>
                        )}
                        {assignment.locked && (
                          <p className="mt-2 text-xs text-[#6d6676]">🔒 Sample lock: {assignment.locked}</p>
                        )}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setCompleted((current) =>
                                isDone
                                  ? current.filter((id) => id !== assignment.id)
                                  : [...current, assignment.id],
                              )
                            }
                            className="min-h-10 rounded-lg bg-[#7259af] px-3 text-xs font-semibold text-white"
                          >
                            {isDone ? "Undo done" : "Mark done"}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setReminders((current) =>
                                hasReminder
                                  ? current.filter((id) => id !== assignment.id)
                                  : [...current, assignment.id],
                              )
                            }
                            className="min-h-10 rounded-lg border border-[#dcd3e8] px-3 text-xs font-semibold text-[#644ca2]"
                          >
                            {hasReminder ? "Reminder set · remove" : "Set demo reminder"}
                          </button>
                        </div>
                        {hasReminder && (
                          <p className="mt-2 text-[10px] text-[#625b70]">
                            Reminder preference is active in this demo only; no browser notification is scheduled.
                          </p>
                        )}
                      </li>
                    );
                  })
                ) : (
                  <li className="rounded-xl border border-dashed border-[#dcd3e8] bg-white p-5 text-center text-sm text-[#625b70]">
                    No sample assignments in this filter.
                  </li>
                )}
              </ul>
            </div>
          )}

          {tab === "Classes" && (
            <div className="pt-4">
              <form onSubmit={saveClass} className="grid gap-2 rounded-xl border border-[#e9e3f0] bg-white p-3 sm:grid-cols-[1fr_1fr_auto]">
                <label className="sr-only" htmlFor="mayari-class-name">Class name</label>
                <input
                  id="mayari-class-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Class name"
                  className="min-h-11 min-w-0 rounded-lg border border-[#ded7e7] px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7259af]"
                  required
                />
                <label className="sr-only" htmlFor="mayari-class-meeting">Meeting time</label>
                <input
                  id="mayari-class-meeting"
                  value={meeting}
                  onChange={(event) => setMeeting(event.target.value)}
                  placeholder="Meeting time"
                  className="min-h-11 min-w-0 rounded-lg border border-[#ded7e7] px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7259af]"
                  required
                />
                <button type="submit" className="min-h-11 rounded-lg bg-[#7259af] px-4 text-xs font-bold text-white">
                  {editingClass === null ? "Add class" : "Save class"}
                </button>
              </form>
              <ul className="mt-3 space-y-2">
                {classes.map((item) => (
                  <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e9e3f0] bg-white p-3">
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-[#625b70]">{item.meeting}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingClass(item.id);
                          setName(item.name);
                          setMeeting(item.meeting);
                        }}
                        className="min-h-9 rounded-lg border border-[#ded7e7] px-3 text-xs font-semibold text-[#644ca2]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setClasses((current) => current.filter((entry) => entry.id !== item.id))}
                        className="min-h-9 rounded-lg border border-[#ded7e7] px-3 text-xs font-semibold text-[#8b3e50]"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "Updates" && (
            <div className="space-y-3 pt-4">
              {[
                ["Sample course update", "A reminder that the next project checkpoint is approaching."],
                ["Sample message", "Your instructor shared a new note in the course inbox."],
              ].map(([title, body]) => (
                <article key={title} className="rounded-xl border border-[#e9e3f0] bg-white p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#7259af]">Sample · not synced</p>
                  <h4 className="mt-1 font-semibold">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#625b70]">{body}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-[#e9e3f0] bg-white p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#7259af]">Interactive extension preview</p>
          <h4 className="mt-2 font-display text-lg font-bold">Your workload at a glance</h4>
          <p className="mt-2 text-sm leading-relaxed text-[#625b70]">
            Explore sample assignments, local completion tracking, reminder preferences, and class scheduling. This preview does not contact Canvas or access browser data.
          </p>
          <div className="mt-4 rounded-xl bg-[#f7f4fb] p-4">
            <p className="text-xs font-semibold text-[#644ca2]">Sample activity</p>
            <p className="mt-2 text-sm">{completed.length} of {assignments.length} assignments marked done</p>
            <p className="mt-1 text-sm">{reminders.length} local reminder preferences</p>
            <p className="mt-1 text-sm">{classes.length} sample classes</p>
          </div>
          {notice && <p aria-live="polite" className="mt-3 rounded-lg bg-[#f7f4fb] p-3 text-xs text-[#625b70]">{notice}</p>}
        </aside>
      </div>
    </div>
  );
}
