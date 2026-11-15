# LenjiPT Question Coverage

## Evaluation method and result

The regression harness is [scripts/lenjipt-evaluate.mjs](../../scripts/lenjipt-evaluate.mjs), run via `npm run test:lenjipt`; it passes **103/103** cases. A separate [held-out set](../../scripts/lenjipt-evaluate-heldout.mjs), run via `npm run test:lenjipt:heldout`, contains 22 English, Filipino, Taglish, typo, recruiter, technical, comparison, missing-information, and out-of-scope questions. These questions are not copied into runtime query examples.

The held-out pre-change baseline was status **20/22**, intent **19/22**, retrieval **19/20** on entity-scoped cases, and **5/5** on the original five-turn context chain; response-language classification was not implemented. After Phase 2, the held-out results are status **22/22**, intent **22/22**, retrieval **20/20**, language **22/22**, localized-heading checks **22/22**, and context **6/6**. The most recent local Node run averaged **23.31 ms/query**. These are scores on a small written set, not human ratings, general language accuracy, or a full answer-level precision/recall study.

## Observed representative query behavior

The following queries were run directly against `answerPortfolioQuestion` and the current runtime knowledge.

| Query | Observed result | Interpretation |
|---|---|---|
| “What is DocuGraph?” | `answer`, matched `project:docugraph`; returns the project summary | English overview works for a curated entity. |
| “Ano ang DocuGraph?” | `answer`, matched `project:docugraph`; returns the same project summary | This Filipino entity/overview pattern works, largely via project alias and curated data. |
| “What is DocuGrahp?” | `answer`, matched `project:docugraph` | The single transposition is tolerated by token-level edit-distance matching. Do not infer general spelling correction. |
| “Paano ginagamit ang Mayari para i-track ang deadlines?” | `answer`, matched `project:mayari`, intent `approach`; the response describes Canvas assignment filtering and browser reminders | `ginagamit` no longer forces technology intent; `paano` and workflow terms select implementation details. |
| “Ano ang problema sa Mayari?” | `answer`, matched `project:mayari`, intent `problem` | Filipino `problema` normalizes to the canonical problem intent. |
| “How many students actively use Mayari?” | `answer`, matched `project:mayari`, intent `outcome`; explicitly says user-count and usage metrics are not documented | The question is classified as a metric request and acknowledged without inventing a number. |
| “What GPA does Lenj have?” | `unknown`; no sections/actions | Missing personal facts are distinguished from unrelated topics. |
| “What is the PMI Project Management Ready credential ID?” | `answer`, matched `certification:pmi-project-management`; includes the listed credential ID in the answer and structured credential details | Credential IDs are exposed on direct request, while the certification record remains the source of truth. |
| “When was the PMI Project Management Ready certification issued?” | `answer`, matched `certification:pmi-project-management`; returns March 18, 2026 | The answer is now covered by a direct evaluation assertion. |
| “What phone number is listed for Lenj?” | `unknown`; no personal number is included in runtime knowledge | The user-facing response does not reproduce résumé-only personal contact details. The number itself is omitted from this report. |

These are measured outputs for a small selected sample, not estimates of language-wide performance.

## What LenjiPT currently answers

- **Project questions:** overview, problem, approach/implementation, technologies, role, outcome/evidence, demo, repository, selected case-study navigation, and featured-project listing.
- **Project comparisons:** general descriptive two-project table; special AOS-vs-POS and DocuGraph-baseline-vs-proposed comparisons; one-project/no-project clarification.
- **Skills:** skill group, whether a named skill is listed, and related projects where the skill appears in project stacks.
- **Education:** school/program, status, dates, and expected graduation where listed.
- **Certifications:** list, issuer/category groups, issuer/date, expiration where stored, skills, and credential IDs on direct request.
- **Profile and recruiter details:** contact destinations, résumé availability, internship interest, one academic activity, and assistant operation.
- **Selected conversational references:** pronouns, “what about,” previous-project references, ordinal references after list responses, and comparisons; the provider keeps a bounded recent-record trail in memory.
- **English/Filipino/Taglish:** local marker-based language detection, aliases/synonyms, localized summaries/headings/fallbacks/follow-ups, and canonical technology badges. Evidence paragraphs remain in their verified source language; this is not general-purpose machine translation.

## Gaps, misclassifications, and repetitive answers

1. **Vocabulary-dependent language understanding.** Language detection and localization use local markers and reviewed phrases. Inflections, spelling variants, code-switching, and natural phrasing outside the curated vocabulary are not systematically covered.
2. **Intent ambiguity.** Intent detection remains a deterministic rule system. The held-out set now checks intent, but it is small and cannot represent all combinations of projects, concepts, and informal phrasing.
3. **Out-of-scope false-rejection risk.** Aliases, related skill/entity matches, and context reduce false rejections, but there is no broad paraphrase/false-rejection estimate.
4. **Unknown vs answer boundary.** Missing team details and personal metrics return `unknown`; Mayari adoption/user counts return a documented “not measured” answer. Unknown detection is still rule-based, not a semantic guarantee.
5. **Localization coverage.** Response framing, summaries, headings, fallbacks, and suggestions localize; evidence paragraphs and many item descriptions remain in canonical English. No external or local translation model is used.
6. **Long or repetitive responses.** Project lists and comparisons are structured, and project questions return intent-specific sections. Some evidence details can still be long; there is no dedicated response-length or repetition metric.
7. **Context is bounded.** The active context and five recent matched record IDs support recent/previous-project references, but there is no transcript summarizer, persistent memory, or general multi-entity reasoning.
8. **Retrieval threshold is heuristic.** BM25-style raw scores are not exposed as probabilities. The minimum-match threshold is still an implementation guard rather than a statistically calibrated confidence boundary.
9. **Limited evaluation size.** The 22 held-out questions provide useful measurable checks but do not prove broad natural-language accuracy or comprehensive answer correctness.

## Response-format coverage

**Supported:** response title/summary; evidence label; multiple sections; paragraphs; unordered bullets; technology chips; item/project cards; tables for comparisons; safe clickable source/action links; follow-up buttons.

**Not supported by the renderer:** Markdown parsing, bold/italic syntax, numbered lists, nested structured lists, or code blocks. Raw strings display as text. Long continuous paragraphs result when the knowledge or template supplies concatenated prose; whitespace preservation is not semantic formatting.

## Evaluation conclusion

The local assistant passes its 103-case regression suite and the separate 22-case held-out checks, including selected misspellings, multilingual response framing, indirect recruiter requests, missing-information cases, and a six-turn context chain. The evidence does **not** justify claiming that it understands arbitrary English, Filipino, Taglish, informal, technical, recruiter, or follow-up questions. The next measurement should grow the held-out set with human-reviewed answer facts and broader paraphrase diversity without adding those prompts to runtime examples.

