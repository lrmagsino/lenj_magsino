"use client";

import DocuGraphResearchLab from "@/components/DocuGraphResearchLab";

export default function DocuGraphDemo() {
  return (
    <>
      <p className="fixed-dark-surface mb-4 rounded-xl border border-emerald-400/20 bg-[#11182A] p-4 text-sm leading-relaxed text-white/70">
        <strong className="text-emerald-300">Evidence replay, not live inference.</strong>{" "}
        The test-case selector and comparisons below replay the documented, saved project evidence. This portfolio does not upload documents, call the DocuGraph backend, run either model, or create new OCR results.
      </p>
      <DocuGraphResearchLab />
    </>
  );
}
