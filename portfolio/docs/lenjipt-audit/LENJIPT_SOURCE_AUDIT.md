# LenjiPT Source Audit

## Scope and evidence labels

This audit examines the local portfolio implementation, the current LenjiPT code and evaluation script, the public résumé included in the repository, and the portfolio's locally documented project demos and case studies. External repositories and live sites are recorded as portfolio-listed links, not claimed as independently re-verified in this pass.

- **Portfolio-listed**: stated in the current portfolio data, résumé, or page content.
- **Source-reviewed**: supported by inspected local implementation or engineering notes. Where a local note summarizes recovered external source, that limitation is stated.
- **Inference**: a reasonable conclusion from the inspected code, not an explicit portfolio claim.
- **Missing**: not established by the reviewed sources.

No environment files, secret values, authentication tokens, or visitor data were inspected or copied into these reports.

## Executive finding

LenjiPT is a deterministic, browser-side retrieval and template system over a curated TypeScript knowledge base. It is not a generative AI model and has no inference API route, API key, embedding model, or vector database. It handles English, Filipino, and Taglish through normalization, hand-authored synonyms and aliases, fielded BM25-style ranking, typo-tolerant matching, rule-based intent/scope handling, localized response framing, and bounded conversational context.

The implementation returns evidence labels, source links, project cards, tables, actions, and suggested follow-ups. It now exposes credential IDs on request, shares one canonical set of project engineering facts between case studies and retrieval, and keeps raw ranking scores internal rather than presenting them as confidence probabilities. Remaining limits are finite hand-authored language coverage and deterministic rules; substantive evidence paragraphs remain in their canonical source language while summaries, headings, fallbacks, and suggestions use the detected language.

## Architecture and question path

1. **Knowledge construction** — `LenjiPTProvider` calls `buildLenjiPTKnowledge(resumeAvailable)` using portfolio data for profile, projects, skills, education, and certifications. Project deep-dive facts are stored once in `lib/projectEngineeringNotes.ts` and shared with `EngineeringChallenges` and the knowledge builder. Records carry `portfolio-listed` or `source-reviewed` evidence labels.
2. **Input handling** — `LenjiPTChat` accepts a maximum of 500 characters. Enter submits; Shift+Enter inserts a line break. Autocomplete and suggested questions are local.
3. **Normalization and language detection** — text is Unicode-normalized, diacritics are removed, text is lowercased, `&` becomes “and,” punctuation is replaced with spaces, whitespace is collapsed, synonyms are substituted, and stop words are removed. A local marker/phrase detector distinguishes English, Filipino, and Taglish for response presentation.
4. **Intent and scope rules** — regular expressions and normalized tokens classify the request (for example, technology, problem, role, outcome, demo, repository, contact, certification, or comparison). Separate rules distinguish supported answers, related-but-missing details, and genuinely out-of-scope requests.
5. **Context resolution** — the active context and up to five recent matched records support pronouns, “what about,” previous-project references, and ordinal references after a project, education, certification, or comparison list. The embedded and floating chats share provider state. There is no transcript summarizer or persistent memory.
6. **Retrieval** — `rankKnowledge` applies fielded BM25-style scoring to title, aliases, keywords, curated query examples, summary, and text. Field weights, document frequency, term frequency, length normalization, synonym/concept expansion, typo tolerance, and explicit-alias boosts are used. The field index is cached per knowledge array; no model is downloaded.
7. **Response generation** — record facts and intent select deterministic templates. Special comparison paths generate project-comparison tables and a clarification when fewer than two projects are identified. Missing details can yield an “unknown” response instead of a fabricated answer.
8. **Safe rendering and actions** — `LenjiPTResponse` renders React text/elements rather than injected HTML. Links are checked against section, project-route, résumé, mailto, and HTTPS-host allowlists. The UI shows evidence status, sources, actions, and follow-ups.

### Matching algorithm: what it is and is not

- **Present:** normalization; curated synonyms and aliases; manually authored query examples; stop-word removal; concept expansion; fielded BM25-style ranking; per-field length normalization; token-level Levenshtein-style typo tolerance; record ranking; rule-based intent/scope detection; project/entity mention detection; language-aware response framing; and bounded follow-up context.
- **Not present:** embeddings; vector similarity; TF-IDF; a language model; machine-learned intent/entity models; online learning; external search; or a remote inference service.
- The raw ranking score is an internal retrieval value used for record selection and a minimum-match guard. It is not a probability, is not exposed as response confidence, and has not been statistically calibrated.
- Typo matching applies only to sufficiently long tokens, with an edit-distance tolerance of one or two depending on token length. `DocuGrahp` resolves to DocuGraph; this does not imply broad spell-correction support.

## Conversation state and deployment

- The embedded section and floating dialog are children of the same `LenjiPTProvider` on the home page and therefore share the same in-memory messages, active context, and bounded list of recent matched record IDs.
- `clearConversation` clears both messages and the current context. State is React memory only; it is not stored in `localStorage`, `sessionStorage`, a database, or an API.
- Navigating to another page unmounts the home-page provider; cross-route persistence is not implemented.
- `AskLjmAssistant` controls the floating native dialog and internal navigation. It does not generate answers or call a model.
- The résumé availability flag is determined from the local résumé file at render time and controls whether a download action is included.
- `app/` contains the home, recruiter, and dynamic project pages; no `route.ts` API route was found. `package.json` has no chatbot/AI-provider dependency. The relevant runtime dependencies are Next.js, React, GSAP, and Lenis; the evaluation is a Node script.

## Structured response and presentation

The response schema supports a title, summary, evidence label, sections with paragraphs or bullets, technology chips, item cards, comparison tables, source references, safe actions, and follow-up questions. The UI supports clickable links, project/credential cards, and tables; it does not parse Markdown. It does not currently have a dedicated ordered-list or code-block renderer.

Answers can still feel like continuous paragraphs when record `text` or several facts are concatenated into a summary/paragraph and the template does not split them into semantic sections. The current UI’s `whitespace-pre-line` preserves line breaks, but it does not infer headings or lists from prose.

## Knowledge-base coverage

The runtime records cover profile/contact, internship availability, five projects, skills, education, certifications (including issuer/category groups), one academic activity, and assistant self-description. Most personal, skill, education, and credential facts are portfolio-listed. Project records include richer implementation/evidence notes.

The PMI Project Management Ready issue date is user-confirmed as March 18, 2026. `lib/certifications.ts` already held this value; `lenjiptKnowledge.ts` derives its certification facts from that source rather than maintaining a separate date.

Important provenance limits:

- Project metadata and links in `lib/content.ts` are portfolio statements. Local engineering notes and demo components add implementation details and clarify where the portfolio demo is only a simulation.
- The shared case-study route presents problem, role, approach, engineering notes, stack, demo, and outcome from project records.
- `source-reviewed` in the assistant knowledge distinguishes richer project notes from simple portfolio listings; it does not mean every external repository or live service was fetched during this audit.
- The résumé is public in the repository, but some details there are not present in LenjiPT’s runtime knowledge. The public résumé’s phone and city are intentionally not reproduced in the reports.

## Evaluation evidence

`npm run test:lenjipt` passes **103/103** regression cases. A separate `npm run test:lenjipt:heldout` run passed **22/22** held-out questions for status, intent, record retrieval (20 entity-scoped cases), response language, and localized heading checks. Its six-turn context chain passed **6/6**. The most recent local Node evaluation measured **23.31 ms per query**; this is a small timing sample, not a browser latency guarantee.

The held-out pre-change baseline was status **20/22**, intent **19/22**, and retrieval **19/20**; response language was not implemented, and the five-turn context chain passed **5/5**. The current scores measure these written cases only. They do not establish broad natural-language accuracy, recall/precision, low false-rejection rates, or comprehensive answer correctness.

## Source map

- [LenjiPT matching and rendering data](../../lib/lenjiptCore.ts)
- [LenjiPT knowledge construction](../../lib/lenjiptKnowledge.ts)
- [Shared chat state](../../components/LenjiPTProvider.tsx)
- [Chat input and message UI](../../components/LenjiPTChat.tsx)
- [Structured response renderer](../../components/LenjiPTResponse.tsx)
- [Floating assistant dialog](../../components/AskLjmAssistant.tsx)
- [Evaluation suite](../../scripts/lenjipt-evaluate.mjs)
- [Dependencies and scripts](../../package.json)
- [Portfolio project records](../../lib/content.ts)
- [Case-study route](../../app/projects/%5Bslug%5D/page.tsx)
- [Résumé PDF](../../public/resume/lenj-magsino.pdf)
- [Portfolio README](../../README.md)
