# LenjiPT Improvement Plan

## Implemented in this phase

- Expanded English, Filipino, and Taglish knowledge-query coverage while keeping one canonical factual record per topic.
- Improved field-weighted BM25-style retrieval with fuzzy token matching, query normalization, and portfolio terminology aliases; ranking scores remain heuristic.
- Added focused Filipino synonyms for technical, education, activity, evidence, and navigation wording, plus safe correction for a frequent certification typo.
- Resolved exact credential names and unique issuing organizations before falling back to grouped or complete certification indexes; broad plural certification questions return the collection rather than an arbitrary credential.
- Avoided false project matches from common Filipino words, improved project-vs-demo distinction, and prioritized contextual question resolution across multi-turn conversations.
- Kept missing-evidence questions in scope and out-of-scope questions distinct; retained structured responses and allowlisted portfolio navigation.
- Added a local diagnostics model for normalized question, language, intent, entities, context, top retrieval records, answer record, scope outcome, and processing time. The UI is gated by development mode.
- Added no dependency, paid inference, embedding service, or external database.

## Measured result

| Measure | Correct | Rate |
| --- | --- | --- |
| Fully correct | 300/300 | 100.0% |
| Status classification | 300/300 | 100.0% |
| Intent classification | 300/300 | 100.0% |
| Evidence checks | 300/300 | 100.0% |
| Language detection | 300/300 | 100.0% |
| Navigation actions | 29/29 | 100.0% |
| Conversation turns | 40/40 | 100.0% |
| Retrieved-record selection | 261/261 | 100.0% |

## Recommended next work

1. Validate with new, human-authored prompts not derived from the current fixture, especially Filipino spelling variants and regional Taglish phrasing.
2. Review development diagnostics when a response is wrong; classify the cause as language, intent, entity selection, evidence gap, or scope before changing logic.
3. Add a regression case only when its expected answer is source-backed and independently reviewed.
4. Periodically verify that navigation actions remain on allowlisted portfolio routes or approved external hosts and that diagnostics remain unavailable in production.
5. Keep factual updates in canonical portfolio sources and regenerate the knowledge records rather than adding duplicated Q&A responses.
