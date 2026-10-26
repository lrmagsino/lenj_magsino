"use client";

import Image from "next/image";
import { useState } from "react";
import CinematicDialog from "@/components/CinematicDialog";
import CardInteractionHint from "@/components/CardInteractionHint";

type EvidenceImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type ResearchCase = {
  id: string;
  name: string;
  document: string;
  description: string;
  input?: EvidenceImage;
  baseline?: EvidenceImage;
  baselineOcr?: EvidenceImage;
  proposed?: EvidenceImage;
  proposedOcr?: EvidenceImage;
  withheld?: string;
  findings: [string, string, string][];
  readingOrder: string;
};

const evidencePath = "/images/projects/docugraph/evidence";

const testCases: ResearchCase[] = [
  {
    id: "flowchart",
    name: "Flowchart",
    document: "Test case 1",
    description:
      "The provided sample is a flowchart describing a performance-metrics collection pipeline. Values printed inside that sample diagram are input content, not measured DocuGraph performance.",
    input: {
      src: `${evidencePath}/flowchart-input.png`,
      alt: "Thesis flowchart sample titled Performance Metrics and Evaluation Dashboard Layout",
      caption:
        "Original sample from the thesis evidence document. The 245-documents and 96.3% labels belong to the diagram itself, not the experiment.",
      width: 1183,
      height: 506,
    },
    baseline: {
      src: `${evidencePath}/flowchart-cnn-layout.png`,
      alt: "CNN-only layout-analysis screenshot for the flowchart sample",
      caption: "CNN-only layout-analysis screenshot from Test Case 1.",
      width: 864,
      height: 708,
    },
    baselineOcr: {
      src: `${evidencePath}/flowchart-cnn-ocr.png`,
      alt: "CNN-only OCR output screenshot for the flowchart sample",
      caption: "CNN-only extracted-text screenshot from Test Case 1.",
      width: 824,
      height: 449,
    },
    proposed: {
      src: `${evidencePath}/flowchart-docugraph-layout.png`,
      alt: "DocuGraph layout-analysis screenshot for the flowchart sample",
      caption: "DocuGraph layout-analysis screenshot from Test Case 1.",
      width: 869,
      height: 607,
    },
    proposedOcr: {
      src: `${evidencePath}/flowchart-docugraph-ocr.png`,
      alt: "DocuGraph OCR output screenshot for the flowchart sample",
      caption: "DocuGraph extracted-text screenshot from Test Case 1.",
      width: 822,
      height: 368,
    },
    findings: [
      ["Diagram structure", "Partial", "Complete (as reported in the thesis summary)"],
      ["Node detection", "Moderate", "High (as reported in the thesis summary)"],
      ["Edge relationships", "Limited", "Accurate (as reported in the thesis summary)"],
      ["Graph connectivity", "Not available", "Available (as reported in the thesis summary)"],
    ],
    readingOrder:
      "The evidence screenshots show region/order views, but the thesis does not provide a ground-truth sequence or a reading-order accuracy score. No accuracy claim is made here.",
  },
  {
    id: "form",
    name: "Form / Contract",
    document: "Test case 2",
    description:
      "A blank gym-membership cancellation form was used as the input. The displayed OCR contains field labels only; there are no filled personal details in the published sample.",
    input: {
      src: `${evidencePath}/form-input.png`,
      alt: "Blank gym membership cancellation form used as the thesis sample",
      caption: "Original blank form screenshot from Test Case 2.",
      width: 382,
      height: 527,
    },
    baseline: {
      src: `${evidencePath}/form-cnn-layout.png`,
      alt: "CNN-only layout-analysis screenshot for the blank form",
      caption: "CNN-only layout-analysis screenshot from Test Case 2.",
      width: 829,
      height: 676,
    },
    baselineOcr: {
      src: `${evidencePath}/form-cnn-ocr.png`,
      alt: "CNN-only OCR output screenshot for the blank form",
      caption: "CNN-only extracted-text screenshot from Test Case 2.",
      width: 818,
      height: 425,
    },
    proposed: {
      src: `${evidencePath}/form-docugraph-layout.png`,
      alt: "DocuGraph layout-analysis screenshot for the blank form",
      caption: "DocuGraph layout-analysis screenshot from Test Case 2.",
      width: 394,
      height: 706,
    },
    proposedOcr: {
      src: `${evidencePath}/form-docugraph-ocr.png`,
      alt: "DocuGraph table and OCR output screenshot for the blank form",
      caption: "DocuGraph detected-table screenshot from Test Case 2.",
      width: 362,
      height: 266,
    },
    findings: [
      ["Form-field detection", "Good", "Excellent (as reported in the thesis summary)"],
      ["Table detection", "Not supported", "Supported (as reported in the thesis summary)"],
      ["Key-value recognition", "Moderate", "High (as reported in the thesis summary)"],
      ["Structured output", "Partial", "Complete (as reported in the thesis summary)"],
    ],
    readingOrder:
      "The source shows extracted field labels and a detected-table view. It does not report a ground-truth reading order or a scored reading-order evaluation.",
  },
  {
    id: "invoice",
    name: "Invoice",
    document: "Test case 3",
    description:
      "The evidence document includes an invoice input and output screenshots. Those images contain contact details and a handwritten signature, so the images are withheld from this public portfolio until they can be safely redacted.",
    withheld:
      "Evidence screenshots withheld: the provided invoice includes contact information and a handwritten signature. Qualitative results below are transcribed from the thesis summary only.",
    findings: [
      ["OCR accuracy", "High", "Very high (as reported in the thesis summary)"],
      ["Table detection", "Limited", "Complete (as reported in the thesis summary)"],
      ["Item extraction", "Partial", "Complete (as reported in the thesis summary)"],
      ["Total-amount detection", "Moderate", "Accurate (as reported in the thesis summary)"],
      ["Structured output", "Moderate", "Excellent (as reported in the thesis summary)"],
    ],
    readingOrder:
      "No ground-truth item order or scored reading-order result is included in the source summary.",
  },
  {
    id: "receipt",
    name: "Receipt",
    document: "Test case 4",
    description:
      "The evidence document includes a mobile payment receipt with a masked recipient name and phone number, plus a transaction reference. Its screenshots are withheld to avoid publishing financial identifiers.",
    withheld:
      "Evidence screenshots withheld: the receipt contains financial transaction identifiers and partially masked personal information. Qualitative results below are transcribed from the thesis summary only.",
    findings: [
      ["Merchant information", "Good", "Excellent (as reported in the thesis summary)"],
      ["Line-item detection", "Partial", "Complete (as reported in the thesis summary)"],
      ["Total-amount recognition", "Good", "Excellent (as reported in the thesis summary)"],
      ["Overall structured output", "Moderate", "Excellent (as reported in the thesis summary)"],
    ],
    readingOrder:
      "No ground-truth item order or scored reading-order result is included in the source summary.",
  },
];

const reportedConfidence = [
  ["Flowchart", "78.42%", "94.16%"],
  ["Form / Contract", "81.53%", "95.22%"],
  ["Invoice", "83.91%", "96.01%"],
  ["Receipt", "80.67%", "94.88%"],
  ["Overall average", "81.13%", "95.07%"],
];

type ArchitectureNode = {
  name: string;
  short: string;
  detail: string;
};

const architectures: Record<"baseline" | "docugraph", ArchitectureNode[]> = {
  baseline: [
    {
      name: "Document image",
      short: "Input",
      detail: "The independent CNN-only project accepts a document image for layout analysis.",
    },
    {
      name: "Detectron2 / PubLayNet",
      short: "CNN layout detection",
      detail:
        "The baseline source configures LayoutParser Detectron2 with the PubLayNet Faster R-CNN ResNeSt-50 FPN model and a 0.5 score threshold.",
    },
    {
      name: "Region predictions",
      short: "Boxes + labels",
      detail:
        "The analyzer returns region classes, bounding boxes, confidence scores, and summary counts. Its metadata explicitly says graphs and connectors are not included.",
    },
    {
      name: "OCR endpoint",
      short: "Separate text extraction",
      detail:
        "OCR is a separate pipeline in the baseline backend: EasyOCR is used by the OCR endpoint, with a Tesseract path and EasyOCR fallback in the word-level scanner.",
    },
    {
      name: "Linear ordering",
      short: "Top-to-bottom sort",
      detail:
        "The baseline feature helper sorts predictions by vertical position and then horizontal position. This is a geometric heuristic, not a scored reading-order model.",
    },
  ],
  docugraph: [
    {
      name: "Document image",
      short: "Input",
      detail: "The public DocuGraph website includes a separate upload and analysis workflow.",
    },
    {
      name: "Preprocessing + regions",
      short: "Image analysis",
      detail:
        "The browser analyzer converts to grayscale, applies adaptive contrast and Otsu binarization, then uses edge, line, texture, and region-detection routines. The backend scanner also contains Sauvola binarization and pixel scanning.",
    },
    {
      name: "Node and edge features",
      short: "Spatial graph",
      detail:
        "The JavaScript GraphAttentionNetwork code builds region nodes from bounding boxes, text, type, and confidence; candidate edges use distance and alignment features.",
    },
    {
      name: "Context aggregation",
      short: "GAT-labelled step",
      detail:
        "The source aggregates neighboring feature vectors using a distance-based attention heuristic for two iterations. The inspected code does not show learned weights or a training procedure, so this is described as heuristic attention—not a verified trained GNN.",
    },
    {
      name: "OCR + structured output",
      short: "Text, structure, export",
      detail:
        "The repository documents Tesseract.js in the browser and EasyOCR/Tesseract in the backend. Results include regions, relationships/connectivity, reading-order output, and structured exports, depending on the selected workflow.",
    },
  ],
};

function EvidenceCard({
  image,
  onPreview,
}: {
  image: EvidenceImage;
  onPreview: (source: HTMLButtonElement, image: EvidenceImage) => void;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-midnight/70">
      <button
        type="button"
        onClick={(event) => onPreview(event.currentTarget, image)}
        className="group block w-full cursor-zoom-in text-left focus-visible:outline-cyan"
        aria-label={`Expand evidence image: ${image.caption}`}
        aria-haspopup="dialog"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 42vw, 28vw"
            className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <figcaption className="min-h-16 px-3 py-3 text-xs leading-relaxed text-white/65 sm:text-sm">
          {image.caption}
          <CardInteractionHint
            desktopLabel="CLICK TO INSPECT"
            mobileLabel="TAP TO INSPECT"
            className="card-open-hint-inline mt-2"
          />
        </figcaption>
      </button>
    </figure>
  );
}

export default function DocuGraphResearchLab() {
  const [activeCaseId, setActiveCaseId] = useState(testCases[0].id);
  const [activeArchitecture, setActiveArchitecture] = useState<"baseline" | "docugraph">(
    "baseline",
  );
  const [selectedNode, setSelectedNode] = useState(0);
  const [systemView, setSystemView] = useState<"both" | "baseline" | "docugraph">("both");
  const [wipePosition, setWipePosition] = useState(50);
  const [preview, setPreview] = useState<{
    source: HTMLButtonElement;
    image: EvidenceImage;
  } | null>(null);

  const activeCase = testCases.find((testCase) => testCase.id === activeCaseId) ?? testCases[0];
  const currentArchitecture = architectures[activeArchitecture];

  const showPreview = (source: HTMLButtonElement, image: EvidenceImage) => {
    setPreview({ source, image });
  };

  return (
    <section className="mt-14 overflow-hidden rounded-[2rem] border border-cyan/30 bg-gradient-to-br from-midnight via-[#0b1224] to-charcoal shadow-[0_30px_120px_-35px_rgba(47,107,255,0.72)]">
      <header className="border-b border-white/10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
        <p className="eyebrow">DocuGraph research lab</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          CNN-Only vs. CNN + GNN
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">
          The thesis developed two separate implementations: an independent CNN-only baseline and
          the proposed DocuGraph system. The comparison asks whether modeling relationships between
          document regions helps preserve structure.
        </p>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-white/60">
          Source inspection note: the DocuGraph repository labels a JavaScript module
          &quot;GraphAttentionNetwork&quot;, but the inspected implementation uses fixed feature
          heuristics and does not show learned weights or training. The diagram below presents that
          code as implemented rather than implying a trained GNN.
        </p>
      </header>

      <div className="grid gap-4 px-5 py-6 sm:grid-cols-2 sm:px-8 sm:py-8 lg:px-10">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <p className="eyebrow">System A · independent baseline</p>
          <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
            CNN-Only
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Detectron2 / LayoutParser predicts document regions. OCR is available through a separate
            backend path. The baseline contains geometric ordering and spatial feature helpers, but
            explicitly marks graph and connector output as absent.
          </p>
        </article>
        <article className="rounded-2xl border border-cyan/30 bg-cyan/10 p-4 sm:p-5">
          <p className="eyebrow">System B · proposed website</p>
          <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
            DocuGraph
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            The public project combines document-region analysis, OCR, and graph-style relational
            steps. Its current code uses rule-based spatial edge features and neighbor aggregation;
            the repository evidence does not establish a trained graph model.
          </p>
        </article>
      </div>

      <div className="border-t border-white/10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Architecture explorer</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Follow the processing path
            </h3>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose system architecture">
            {(["baseline", "docugraph"] as const).map((system) => (
              <button
                key={system}
                type="button"
                onClick={() => {
                  setActiveArchitecture(system);
                  setSelectedNode(0);
                }}
                aria-pressed={activeArchitecture === system}
                className={`min-h-11 rounded-full border px-4 text-sm transition-colors ${
                  activeArchitecture === system
                    ? "border-cyan bg-cyan/15 text-cyan"
                    : "border-white/15 text-white/65 hover:border-cyan/40"
                }`}
              >
                {system === "baseline" ? "CNN-Only" : "DocuGraph"}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {currentArchitecture.map((node, index) => (
            <div key={node.name} className="relative">
              <button
                type="button"
                onClick={() => setSelectedNode(index)}
                aria-pressed={selectedNode === index}
                className={`h-full min-h-28 w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                  selectedNode === index
                    ? "border-cyan bg-cyan/10 shadow-[0_0_28px_-12px_#3CE0F0]"
                    : "border-white/10 bg-white/5 hover:border-cyan/40"
                }`}
              >
                <span className="font-mono text-xs text-violet">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 block font-display text-sm font-semibold text-white">
                  {node.short}
                </span>
              </button>
              {index < currentArchitecture.length - 1 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-cyan/70 lg:block"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div
          aria-live="polite"
          className="mt-4 rounded-xl border border-white/10 bg-midnight/70 p-4"
        >
          <h4 className="font-display font-semibold text-cyan">
            {currentArchitecture[selectedNode]?.name}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {currentArchitecture[selectedNode]?.detail}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Evidence explorer</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Research evidence &amp; test cases
            </h3>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Select document test case">
            {testCases.map((testCase) => (
              <button
                key={testCase.id}
                type="button"
                onClick={() => setActiveCaseId(testCase.id)}
                aria-pressed={activeCaseId === testCase.id}
                className={`min-h-11 rounded-full border px-3.5 text-sm transition-colors ${
                  activeCaseId === testCase.id
                    ? "border-cyan bg-cyan/15 text-cyan"
                    : "border-white/15 text-white/65 hover:border-cyan/40"
                }`}
              >
                {testCase.name}
              </button>
            ))}
          </div>
        </div>

        <article className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <p className="eyebrow">{activeCase.document}</p>
          <h4 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
            {activeCase.name}
          </h4>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/70">
            {activeCase.description}
          </p>

          {activeCase.withheld ? (
            <p className="mt-4 rounded-xl border border-violet/30 bg-violet/10 p-4 text-sm leading-relaxed text-white/75">
              {activeCase.withheld}
            </p>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeCase.input && (
                <EvidenceCard image={activeCase.input} onPreview={showPreview} />
              )}
              {activeCase.baseline && (
                <EvidenceCard image={activeCase.baseline} onPreview={showPreview} />
              )}
              {activeCase.proposed && (
                <EvidenceCard image={activeCase.proposed} onPreview={showPreview} />
              )}
            </div>
          )}

          {activeCase.baseline && activeCase.proposed && (
            <details className="mt-5 rounded-xl border border-white/10 bg-midnight/50 p-4">
              <summary className="cursor-pointer font-medium text-cyan">
                Open before-and-after screenshot wipe
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-white/55">
                This wipe compares the authentic application screenshots at a shared display scale.
                They are not pixel-registered; the reveal is not a detection overlay or a claim that
                region coordinates align.
              </p>
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#090f20]">
                <Image
                  src={activeCase.baseline.src}
                  alt={`CNN-only screenshot: ${activeCase.baseline.caption}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 60vw"
                  className="object-contain"
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - wipePosition}% 0 0)` }}
                >
                  <Image
                    src={activeCase.proposed.src}
                    alt={`DocuGraph screenshot: ${activeCase.proposed.caption}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 60vw"
                    className="object-contain"
                  />
                </div>
                <span className="absolute left-2 top-2 rounded bg-midnight/90 px-2 py-1 font-mono text-[10px] text-white/85">
                  DocuGraph
                </span>
                <span className="absolute right-2 top-2 rounded bg-midnight/90 px-2 py-1 font-mono text-[10px] text-white/85">
                  CNN-only
                </span>
              </div>
              <label
                htmlFor="docugraph-evidence-wipe"
                className="mt-4 block text-sm text-white/70"
              >
                Reveal DocuGraph screenshot
              </label>
              <input
                id="docugraph-evidence-wipe"
                type="range"
                min="0"
                max="100"
                value={wipePosition}
                aria-valuetext={`${wipePosition}% of the DocuGraph screenshot revealed`}
                onChange={(event) => setWipePosition(Number(event.currentTarget.value))}
                className="mt-2 min-h-11 w-full accent-cyan"
              />
            </details>
          )}

          {!activeCase.withheld && (
            <>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <h5 className="font-display text-lg font-semibold text-white">
                  OCR output screenshots
                </h5>
                <div className="flex gap-2" role="group" aria-label="Choose comparison view">
                  {(["both", "baseline", "docugraph"] as const).map((view) => (
                    <button
                      key={view}
                      type="button"
                      onClick={() => setSystemView(view)}
                      aria-pressed={systemView === view}
                      className={`min-h-10 rounded-full border px-3 text-xs transition-colors ${
                        systemView === view
                          ? "border-violet bg-violet/15 text-violet"
                          : "border-white/15 text-white/60 hover:border-violet/50"
                      }`}
                    >
                      {view === "both" ? "Side by side" : view === "baseline" ? "CNN-Only" : "DocuGraph"}
                    </button>
                  ))}
                </div>
              </div>
              <div
                className={`mt-3 grid gap-4 transition-opacity duration-300 ${
                  systemView === "both" ? "sm:grid-cols-2" : "grid-cols-1"
                }`}
              >
                {(systemView !== "docugraph" && activeCase.baselineOcr) && (
                  <EvidenceCard image={activeCase.baselineOcr} onPreview={showPreview} />
                )}
                {(systemView !== "baseline" && activeCase.proposedOcr) && (
                  <EvidenceCard image={activeCase.proposedOcr} onPreview={showPreview} />
                )}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/50">
                These are screenshots of the source system outputs, not re-created overlays. No
                bounding-box coordinates or text-region ground truth were available as machine-readable
                evidence for this portfolio.
              </p>
            </>
          )}

          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/55">
                <tr>
                  <th scope="col" className="px-4 py-3">Comparison</th>
                  <th scope="col" className="border-l border-white/10 px-4 py-3">CNN-Only</th>
                  <th scope="col" className="border-l border-white/10 px-4 py-3">DocuGraph summary</th>
                </tr>
              </thead>
              <tbody>
                {activeCase.findings.map(([label, baseline, proposed]) => (
                  <tr key={label} className="border-t border-white/10">
                    <th scope="row" className="px-4 py-3 font-medium text-white/80">{label}</th>
                    <td className="border-l border-white/10 px-4 py-3 text-white/65">{baseline}</td>
                    <td className="border-l border-white/10 px-4 py-3 text-cyan/90">{proposed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/50">
            Qualitative labels above are transcribed from the thesis summary. The document does not
            describe a ground-truth scoring protocol for these labels.
          </p>

          <details className="mt-4 rounded-xl border border-white/10 bg-midnight/50 p-4">
            <summary className="cursor-pointer font-medium text-cyan">
              Reading-order and structure interpretation
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{activeCase.readingOrder}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              A different line-break or text grouping is not by itself proof of a more correct
              reading order; correctness requires a defined ground truth and evaluation method.
            </p>
          </details>
        </article>
      </div>

      <div className="border-t border-white/10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
        <div className="max-w-4xl">
          <p className="eyebrow">Metrics with limitations</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            What the source reports—and what it does not
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            The thesis evidence summary lists the following average-confidence percentages. These
            are confidence values, not measured accuracy. The summary does not define their
            aggregation protocol, and the values do not match the individual flowchart and form
            screenshots; they are shown as source-reported figures only, not as a validated
            performance chart or a claim of improvement.
          </p>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/55">
              <tr>
                <th scope="col" className="px-4 py-3">Test case</th>
                <th scope="col" className="border-l border-white/10 px-4 py-3">CNN average confidence</th>
                <th scope="col" className="border-l border-white/10 px-4 py-3">DocuGraph average confidence</th>
              </tr>
            </thead>
            <tbody>
              {reportedConfidence.map(([label, baseline, proposed]) => (
                <tr key={label} className="border-t border-white/10">
                  <th scope="row" className="px-4 py-3 font-medium text-white/80">{label}</th>
                  <td className="border-l border-white/10 px-4 py-3 text-white/65">{baseline}</td>
                  <td className="border-l border-white/10 px-4 py-3 text-cyan/90">{proposed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/50">
          Source: provided thesis evidence document, &quot;Overall Performance Summary&quot; table.
          No OCR accuracy, layout accuracy, reading-order accuracy, or processing-time benchmark with
          a documented ground truth is presented here.
        </p>
      </div>

      <CinematicDialog
        source={preview?.source ?? null}
        title={preview?.image.caption ?? "Research evidence image"}
        onClose={() => setPreview(null)}
      >
        {preview && (
          <div className="theme-image-frame border-b border-white/10 bg-[#090f20] p-2 sm:p-6">
            <Image
              src={preview.image.src}
              alt={preview.image.alt}
              width={preview.image.width}
              height={preview.image.height}
              sizes="(max-width: 768px) 100vw, 90vw"
              priority
              className="mx-auto h-auto max-h-[78dvh] w-auto max-w-full object-contain"
            />
            <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed text-white/65">
              {preview.image.caption}
            </p>
          </div>
        )}
      </CinematicDialog>
    </section>
  );
}
