"use client";

import { useState } from "react";

const applications = {
  aos: {
    name: "Advanced Ordering System",
    shortName: "AOS",
    audience: "Customer-facing Android prototype",
    summary:
      "Explores a customer ordering flow: choose a canteen, browse sample menu categories, adjust quantities, review an in-memory cart, and request a locally generated queue number.",
    technologies: [
      "Java 8",
      "Android SDK · min 24 / target 33",
      "AndroidX AppCompat 1.6.1",
      "Material Components",
      "ConstraintLayout 2.1.4",
      "XML layouts",
      "Gradle 7.5 · Android Gradle Plugin 7.4.2",
    ],
    features: [
      {
        title: "Canteen and category navigation",
        detail:
          "The chooser presents LCT, TYK, and Urban Canteen entry points. Food, drinks, breads, and chips screens display hard-coded sample items with previous/next controls.",
        source: "canteenchoose.java · MainActivity.java · *intro.java",
      },
      {
        title: "Quantity and cart preview",
        detail:
          "Menu screens adjust item quantity and append item name, quantity, and calculated line price to static in-process lists. The cart screen renders those entries and a total.",
        source: "Food_layout.java · Drinks_layout.java · breads_layout.java · chips_layout.java · FoodCart.java · addtocart_layout.java",
      },
      {
        title: "Queue-number screen",
        detail:
          "A button generates a random number locally from 0 to 1000. The screen's message says an order was emailed, but the source contains no email, network, or order-submission implementation.",
        source: "queue_number.java",
      },
      {
        title: "Login and profile screens",
        detail:
          "A login form is present, but its credential validation is commented out and the submit action advances regardless of input. The profile activity only provides return navigation.",
        source: "loginaos.java · ProfileActivity.java",
      },
    ],
    nodes: [
      {
        label: "Login screen",
        source: "loginaos",
        detail:
          "Displays email and password fields. Its current click handler does not authenticate the entered values; the validation block is commented out.",
      },
      {
        label: "Canteen chooser",
        source: "canteenchoose · *intro",
        detail:
          "Routes to LCT, TYK, or Urban Canteen entry screens. The intro activities then open the shared MainActivity without persisting a selected canteen.",
      },
      {
        label: "Menu activities",
        source: "MainActivity · Food_layout · Drinks_layout · breads_layout · chips_layout",
        detail:
          "Shows hard-coded sample products. Visitors can step through items, increment/decrement quantity, and add the selected item to the cart.",
      },
      {
        label: "Process-local cart",
        source: "FoodCart · addtocart_layout",
        detail:
          "Stores names, quantities, and line prices in static Java ArrayLists. This is in-memory app state, not a database or shared service.",
      },
      {
        label: "Queue display",
        source: "queue_number",
        detail:
          "Creates a random queue value on device. No order is transmitted to a canteen or email service in the inspected implementation.",
      },
    ],
    flow: ["Login", "Canteen", "Menu", "Cart", "Queue"],
  },
  pos: {
    name: "Point of Sale",
    shortName: "POS",
    audience: "Canteen-operator navigation prototype",
    summary:
      "A separate Android app with a local login check, a three-canteen menu, and dashboard/task navigation. The destination screen currently displays “No records found.”",
    technologies: [
      "Java 8",
      "Android SDK · min 24 / target 33",
      "AndroidX AppCompat 1.6.1",
      "Material Components 1.9.0",
      "ConstraintLayout 2.1.4",
      "XML layouts",
      "Gradle 7.5 · Android Gradle Plugin 7.4.2",
    ],
    features: [
      {
        title: "Local login check",
        detail:
          "The login activity compares entered values to a credential pair embedded in the Java source. It is not a remote or secure authentication service.",
        source: "login.java",
      },
      {
        title: "Canteen-specific menus",
        detail:
          "The main screen opens separate LCT, TYK, and Urban Canteen pages. Each page lists Dashboard, Completed Tasks, Employment Records, and Issues.",
        source: "main.java · lctcanteen.java · tykcanteen.java · urbancanteen.java",
      },
      {
        title: "Placeholder destinations",
        detail:
          "All four menu actions on each canteen page open the same temporarydata activity, whose layout says “No records found.” No sales or transaction workflow is implemented in these destinations.",
        source: "temporarydata.java · activity_temporarydata.xml",
      },
    ],
    nodes: [
      {
        label: "Local login",
        source: "login",
        detail:
          "Checks form values against credentials hard-coded in the app source, then opens the main menu. No remote identity provider or account service is used.",
      },
      {
        label: "Canteen menu",
        source: "main",
        detail:
          "Routes to one of three separate canteen activities: LCT, TYK, or Urban Canteen.",
      },
      {
        label: "Operations menu",
        source: "*canteen",
        detail:
          "Each canteen activity exposes Dashboard, Completed Tasks, Employment Records, and Issues buttons.",
      },
      {
        label: "Empty placeholder",
        source: "temporarydata",
        detail:
          "Every operations button opens the same screen, which currently reports “No records found.” No records are loaded or saved.",
      },
    ],
    flow: ["Login", "Canteen", "Operations", "Placeholder"],
  },
} as const;

type ApplicationId = keyof typeof applications;

export default function RedWarriorsExplorer() {
  const [activeId, setActiveId] = useState<ApplicationId>("aos");
  const [selectedNode, setSelectedNode] = useState(0);
  const active = applications[activeId];
  const activeNode = active.nodes[selectedNode] ?? active.nodes[0];

  return (
    <section
      aria-labelledby="red-warriors-explorer-title"
      className="mt-14 overflow-hidden rounded-3xl border border-cyan/25 bg-charcoal/65 shadow-[0_24px_80px_-44px_#2f6bff88]"
    >
      <header className="border-b border-white/10 p-5 sm:p-7 lg:p-9">
        <p className="eyebrow">Source-reviewed system explorer</p>
        <h2
          id="red-warriors-explorer-title"
          className="mt-2 font-display text-2xl font-bold sm:text-3xl"
        >
          Two apps. Separate responsibilities.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">
          Switch between the customer-side AOS and the canteen-side POS. The
          diagrams describe the inspected Java source and XML layouts—not a
          claimed production deployment.
        </p>
        <div
          aria-label="Choose application"
          className="mt-6 grid gap-3 sm:grid-cols-2"
        >
          {(Object.keys(applications) as ApplicationId[]).map((id) => {
            const application = applications[id];
            const selected = activeId === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setActiveId(id);
                  setSelectedNode(0);
                }}
                className={`min-h-16 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-cyan ${
                  selected
                    ? "border-cyan/60 bg-cyan/10 text-white"
                    : "border-white/10 bg-midnight/45 text-white/70 hover:border-cyan/30"
                }`}
              >
                <span className="block font-mono text-xs uppercase tracking-[0.16em] text-cyan">
                  {application.shortName}
                </span>
                <span className="mt-1 block font-display font-semibold">
                  {application.name}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:p-9">
        <div>
          <p className="eyebrow">{active.audience}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
            {active.summary}
          </p>

          <h3 className="mt-7 font-display text-lg font-semibold text-cyan">
            Verified technologies
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {active.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-electric/30 bg-midnight/50 px-3 py-1.5 text-xs text-white/75"
              >
                {technology}
              </li>
            ))}
          </ul>

          <h3 className="mt-7 font-display text-lg font-semibold text-cyan">
            What the source implements
          </h3>
          <ul className="mt-3 space-y-3">
            {active.features.map((feature) => (
              <li
                key={feature.title}
                className="rounded-xl border border-white/10 bg-midnight/40 p-4"
              >
                <h4 className="font-display font-semibold text-white/90">
                  {feature.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {feature.detail}
                </p>
                <p className="mt-3 break-words font-mono text-[10px] leading-relaxed text-violet/90">
                  Source: {feature.source}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="eyebrow">Interactive architecture</p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                {active.shortName} source flow
              </h3>
            </div>
            <span className="font-mono text-[10px] text-white/40">
              Select a node for details
            </span>
          </div>

          <ol className="mt-5 grid gap-2 sm:grid-cols-2">
            {active.nodes.map((node, index) => (
              <li key={node.source} className="relative">
                <button
                  type="button"
                  aria-pressed={selectedNode === index}
                  aria-label={`${node.label}, source ${node.source}`}
                  onClick={() => setSelectedNode(index)}
                  className={`h-full min-h-24 w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-cyan ${
                    selectedNode === index
                      ? "border-cyan/60 bg-cyan/10 shadow-[inset_0_0_28px_#2f6bff18]"
                      : "border-white/10 bg-midnight/45 hover:border-cyan/30"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-violet">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block font-display font-semibold">
                    {node.label}
                  </span>
                  <span className="mt-1 block break-words font-mono text-[10px] text-white/45">
                    {node.source}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div
            aria-live="polite"
            className="mt-4 rounded-xl border border-violet/25 bg-violet/5 p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-violet">
              {activeNode.source}
            </p>
            <h4 className="mt-2 font-display font-semibold">{activeNode.label}</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {activeNode.detail}
            </p>
          </div>

          <h4 className="mt-6 font-display text-sm font-semibold text-white/75">
            Source flow
          </h4>
          <ol
            aria-label={`${active.shortName} source flow`}
            className="mt-3 flex flex-wrap items-center gap-2"
          >
            {active.flow.map((step, index) => (
              <li key={step} className="contents">
                {index > 0 && (
                  <span aria-hidden="true" className="font-mono text-cyan">
                    →
                  </span>
                )}
                <span className="rounded-lg border border-white/10 bg-midnight/55 px-3 py-2 font-mono text-[10px] text-white/70">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-midnight/35 px-5 py-4 sm:px-7 lg:px-9">
        <p className="text-xs leading-relaxed text-white/55">
          <strong className="font-semibold text-cyan">Integration check:</strong>{" "}
          the reviewed projects have different Android application IDs. No
          shared API, Firebase configuration, network permission, or shared
          database was found. The repository folders contain app resources, but
          no authentic in-app screenshots; the original presentation photo
          above remains the project image.
        </p>
      </footer>
    </section>
  );
}
