# LenjiPT Phase 3 Evaluation Results

## Scope and method

The local, deterministic evaluation exercised 300 prompts: 260 independent question cases and 40 turns across the conversation scenarios. The suite checks response status, intent, selected knowledge record where specified, detected language, safe navigation targets, evidence assertions, structured response shape, and contextual follow-up behavior.

These are results on a curated engineering test set, not a probability estimate or a guarantee about arbitrary visitor questions. Retrieval ranking scores are heuristic and must not be interpreted as confidence probabilities.

## Overall measurements

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

## Language detection

Language detection correctness is scored separately from full-case correctness. The following table compares the detected language with each case's expected language.

| Expected language | Correct | Rate |
| --- | --- | --- |
| en | 133/133 | 100.0% |
| fil | 81/81 | 100.0% |
| taglish | 86/86 | 100.0% |

A case is fully correct only when all of its applicable checks pass:

| Language | Fully correct | Rate |
| --- | --- | --- |
| en | 133/133 | 100.0% |
| fil | 81/81 | 100.0% |
| taglish | 86/86 | 100.0% |

## Full-case results by difficulty

| Difficulty | Fully correct | Rate |
| --- | --- | --- |
| easy | 98/98 | 100.0% |
| hard | 113/113 | 100.0% |
| medium | 89/89 | 100.0% |

## Full-case results by topic

| Topic | Fully correct | Rate |
| --- | --- | --- |
| Ambiguous references | 3/3 | 100.0% |
| Certifications | 30/30 | 100.0% |
| CS Expo 2026 | 18/18 | 100.0% |
| DocuGraph | 21/21 | 100.0% |
| Education | 15/15 | 100.0% |
| Mayari | 18/18 | 100.0% |
| Missing evidence | 16/16 | 100.0% |
| multi-turn context | 40/40 | 100.0% |
| Out-of-scope questions | 20/20 | 100.0% |
| Personal background | 18/18 | 100.0% |
| Portfolio navigation | 20/20 | 100.0% |
| Recruiter questions | 18/18 | 100.0% |
| Red Warriors AOS & POS | 21/21 | 100.0% |
| Technical skills | 24/24 | 100.0% |
| Wedding Website | 18/18 | 100.0% |

## Limitations

- The expected labels and required evidence are authored for this test set; passing it does not demonstrate coverage of every spelling, dialect, or conversational style.
- The language detector uses local phrase and token heuristics. It does not identify a visitor's language with probabilistic certainty.
- No visitor messages, API services, embeddings, or paid model calls are used by this evaluation.
