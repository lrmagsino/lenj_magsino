# LenjiPT Improvement Plan

## Goal

Make portfolio-related requests broadly understandable while preserving factual grounding and zero inference cost. Keep the current deterministic client-side architecture unless measured gaps justify a change. Do not require a paid API or an LLM.

## Phase 2 completed

- Replaced the previous weighted-token ranker with cached fielded BM25-style scoring and typo-tolerant matching. On the separate 22-question held-out set, entity retrieval moved from 19/20 to 20/20; the latest local evaluation measured a mean of 23.31 ms/query.
- Added query-language detection and localized response summaries, headings, fallbacks, and follow-up suggestions for English, Filipino, and Taglish. Canonical project/certification facts remain shared; no language-specific record copies or translation service were added.
- Added a bounded recent-record trail for follow-ups, including references to the earlier project, while keeping messages and context in memory and shared between both chat interfaces.
- Corrected the Mayari deadline-workflow intent and Filipino `problema` matching; surfaced certification IDs on request; added a focused wedding RSVP preview limitation answer; and abstained for undocumented team details.
- Centralized deep project evidence in `lib/projectEngineeringNotes.ts`, consumed by both the case-study engineering-notes section and the LenjiPT knowledge builder.
- Preserved the 103-case regression suite and added a separate 22-question held-out evaluation. Current results: 22/22 status, intent, language, and localized heading checks; 20/20 entity retrieval checks; 6/6 context turns.

## Priority 0 — canonical facts and provenance

1. Keep the user-confirmed PMI Project Management Ready issue date, March 18, 2026, consistent across the certification record, generated LenjiPT answers, résumé, and evaluation suite.
2. Keep project claims at fact level: each fact should have a source label/path, evidence status, and a clear “not listed / not measured” state. Separate original-project functionality from the portfolio demo’s sample behavior.
3. Add missing structured fields only after confirmation: team size, specific contributions, outcomes/metrics, lessons learned, and any approved additional contact details.
4. Treat the resume as a source to reconcile, not an automatic override of the portfolio. Preserve both conflicting values until the owner confirms the canonical date.

**Why first:** retrieval improvements cannot repair incomplete or contradictory source facts.

## Priority 1 — widen query normalization safely

- Extend `normalizeText`/`SYNONYMS` with reviewed English, Filipino, and Taglish variants for problem/goal/implementation/role/outcome/verification/time/date/metric, common inflections, and spelling variants.
- Add phrase aliases and entity aliases for projects, credentials, school names, and acronyms. Keep entity matching separate from broad token similarity so a typo does not attach an unrelated record.
- Add hand-authored paraphrases for common recruiter intents and informal questions, but attach them to one canonical topic rather than duplicating answers.
- Preserve the original query for response semantics and diagnostics; do not silently rewrite an ambiguous query into a different intent.
- Avoid aggressive fuzzy matching for short tokens, IDs, dates, or credentials. Prefer clarification over guessing when two records are close.

**Small zero-cost option:** retain the current tokenizer and expand its dictionaries with unit-tested Filipino/Taglish variants. No dependency is required.

## Priority 2 — retrieval and intent selection

1. Separate **entity detection**, **intent detection**, **scope detection**, and **record ranking**. Currently an entity match can be right while the ordered intent rules produce the wrong answer type.
2. The raw BM25 score remains an internal heuristic with a minimum-match guard; do not expose it as probability. Expand labeled cases before adding a score-margin clarification rule.
3. Keep the lightweight phrase/alias/entity layer for Filipino and Taglish; multilingual embeddings are not necessary and would add model size/runtime complexity.
4. Continue treating related-but-missing information separately from out-of-scope requests. Expand the missing-fact patterns only when a source establishes the requested topic is within the portfolio domain.

## Priority 3 — contextual follow-ups and clarification

- The provider now retains the active context and up to five recent matched record IDs. Future changes should keep this bounded, in-memory, and explicit about ambiguity.
- Resolve “that one,” “the other one,” “second project,” “yung isa,” and code-switched variants only when the reference is unambiguous; otherwise ask a short clarification.
- Add explicit conversational tests for topic shifts, multiple entities, comparisons, ordinal references, repeated follow-ups, and clearing the conversation.
- Continue to avoid retaining transcripts in storage or sending them to external services unless the owner explicitly requests a privacy-reviewed change.

## Priority 4 — structured, concise, evidence-aware answers

- Keep the current typed response model. Expand it with optional ordered steps, inline emphasis, and code snippets only when use cases justify those fields; do not parse arbitrary Markdown or inject HTML.
- Ensure every answer section contains only facts relevant to the intent. For example, a deadline-workflow question should not return only Mayari’s technology stack.
- Keep verified metadata, including credential IDs, available on direct request and connect each field to its source.
- Prefer short answer-first summaries followed by one or two focused sections. Avoid repeating a full `record.text` list in both prose and cards.
- Show “portfolio-listed” versus “source-reviewed” with a concise explanation; do not imply an external credential or production deployment was verified if it was not.
- Use a focused unknown response for missing facts and suggest the nearest supported question. Keep actions fixed/allowlisted and rendered as React elements.

## Priority 5 — evaluation before release

Keep `scripts/lenjipt-evaluate.mjs` as the regression suite and expand the separate held-out evaluation with:

- English, Filipino, and Taglish question variants, including informal/spelled variants;
- recruiter questions, technical questions, navigation requests, comparisons, and multi-turn follow-ups;
- paraphrases not used as knowledge-record examples, to reduce test leakage;
- answer-level expected facts and forbidden claims, not only expected status/record ID;
- cases where a related fact is absent, where two records compete, and where the question is genuinely out-of-scope;
- factual safeguards for metrics, project-demo limitations, credential metadata, role attribution, and résumé conflicts;
- separate counts for correct answer, correct clarification, unknown, and false out-of-scope classifications.

Track accuracy by language/intent and inspect every failure. Add human-reviewed expected facts and forbidden claims to the held-out set; do not copy those prompts into runtime examples. A passing suite is a regression check, not a claim of general language understanding.

## Suggested zero-cost sequence

1. Confirm outstanding missing or disputed facts and mark unverified fields.
2. Expand the held-out set with balanced, human-reviewed paraphrases and answer-level fact checks.
3. Review any new retrieval/intent failures before changing aliases, scoring, or scope rules.
4. Add clarification behavior only for measured ambiguous cases.
5. Continue desktop/mobile checks for both interfaces and validate safe actions after UI changes.

## Non-goals for the next phase

- No mandatory hosted AI provider, API key, billing account, or user-query transmission.
- No dependency installation unless a measured need and dependency change are approved.
- No mass generation of near-duplicate Q&A pairs. Maintain canonical topic records and add varied query examples to evaluate coverage.

## Relevant implementation

[Core matching and response generation](../../lib/lenjiptCore.ts), [knowledge records](../../lib/lenjiptKnowledge.ts), [current evaluation](../../scripts/lenjipt-evaluate.mjs), and [structured response renderer](../../components/LenjiPTResponse.tsx).

