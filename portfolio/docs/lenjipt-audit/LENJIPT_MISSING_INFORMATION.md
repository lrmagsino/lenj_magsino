# LenjiPT Missing and Conflicting Information

## Conflicts requiring owner confirmation

| Topic | Source A | Source B | Treatment |
|---|---|---|---|
| Skill inventory | [Portfolio skills](../../lib/content.ts): Python, JavaScript, TypeScript, Kotlin, HTML; React/Next/Tailwind; SQL/REST/Postman/API integration; AI/ML and cloud/data groups | [Résumé PDF](../../public/resume/lenj-magsino.pdf): additionally lists Java, C++, Flutter, Android Studio, MySQL, SQLite, Firebase; omits several portfolio-list skills | This is an inconsistent inventory, not necessarily a direct factual contradiction. Confirm which skills remain current and which should be represented in LenjiPT. |
| Certification inventory | [certifications.ts](../../lib/certifications.ts): 13 entries | [Résumé PDF](../../public/resume/lenj-magsino.pdf): 8 entries, omitting five portfolio credentials | Resume may be stale or intentionally abbreviated. Confirm and synchronize before treating it as canonical. |
| Public contact | Portfolio profile exposes email, GitHub, and LinkedIn; [résumé PDF](../../public/resume/lenj-magsino.pdf) also contains a phone number and city | No phone or city fields are present in the portfolio profile/LenjiPT data | The values are not reproduced here. Confirm whether those personal details should be exposed in the site or chatbot. |
| Canonical portfolio URL | Résumé lists `https://lenj-magsino-website.vercel.app/` | Current local site route/navigation establishes `/`, `/recruiter`, and project routes but does not establish that the résumé URL is the current canonical production domain | Confirm whether the résumé’s hosted URL remains current. |

The local portfolio README does **not** claim that the original Red Warriors applications use Kotlin or Firebase. It describes the synchronized AOS/POS behavior as a browser-only sample demo. Keep that demo distinct from the engineering notes’ separate Java/XML prototype description. [README](../../README.md), [canonical engineering facts](../../lib/projectEngineeringNotes.ts), [engineering-notes renderer](../../components/EngineeringChallenges.tsx), [demo](../../components/demos/RedWarriorsDemo.tsx).

## Confirmed update

The PMI Project Management Ready issue date is personally confirmed as **March 18, 2026**. The portfolio certification record already used this date; the résumé PDF and related documentation have now been aligned, and an evaluation assertion checks the generated LenjiPT answer. No editable résumé source file was present in the workspace.

## Missing personal, education, and career information

- No GPA, grades, honors, awards, or competition placement is provided. The recruiter page explicitly avoids claiming a hackathon award.
- FEU expected graduation is 2027, but no expected term or exact completion date is specified.
- No completed internship, formal employment, employer, job title, or professional employment dates are claimed.
- “Full-Stack Developer” and the résumé’s broad summary are present, but there is no separate verified career-interest taxonomy, target role level, preferred industry, or availability window.
- The résumé mentions hobbies and language fluency; hobbies are not in the portfolio knowledge base. No chatbot answer should be generated from them unless the owner wants that content included.
- Skills have no proficiency levels, recency, or evidence grading. Résumé-only technologies should not automatically be described as used in a specific project.

## Missing project facts

The current sources do not establish the following. They should remain unanswered or be explicitly qualified:

| Project | Missing or unverified |
|---|---|
| DocuGraph | Exact individual contributions; team composition; validated accuracy/ground-truth results; reproducible evaluation method; benchmark/runtime; project outcome metrics; explicit lessons learned; whether Firebase authentication is configured in the live deployment. |
| Mayari | Exact tasks performed by Lenj beyond lead-developer label; team composition; user count/adoption; measured outcomes; public hosted demo; actual live Canvas instance configuration and usage. |
| Red Warriors | Exact individual responsibilities; team composition; production use; real transactions, payments, remote persistence, shared service, or synchronization in the original apps; user or performance metrics; public source repository/demo link. |
| CS Expo 2026 | Exact production sections personally implemented by Lenj; team size; usage/registration/conversion metrics; direct repository link; independent verification of backend security/production claims. |
| Fritz & Princess | Exact individual tasks/team composition; meaning of Supabase in the production architecture; RSVP engagement or event metrics; explicit lessons learned. |

For all five projects, explicitly documented “lessons learned” sections were not found in the reviewed local sources. Do not synthesize lessons as though they were quotes or confirmed personal reflections.

## Missing or partial certification metadata

- Direct verification URLs are listed only for the two SAP credentials. Other entries have no verification URL in the portfolio data.
- No expiration is specified for TESDA Azure AI Fundamentals, Anthropic AI Fluency, LinkedIn Learning credentials, or MATLAB Onramp.
- MATLAB Onramp has no credential ID in the record.
- The portfolio records public certificate images/PDFs; external issuer verification was not performed for all records.
- Existing credential IDs are exposed by LenjiPT on direct request. The MATLAB Onramp ID remains missing from the source record.

## Missing conversational coverage / implementation limits

- The runtime uses hand-authored language rules, not general English/Filipino/Taglish comprehension. Filipino/Taglish response framing is localized, while detailed evidence paragraphs remain in their canonical source language.
- A query for Lenj’s phone should remain unanswered because phone is not part of portfolio runtime data. The phone value is intentionally omitted from this report.
- The raw BM25-style score remains an internal heuristic used for selection and a minimum-match guard; it is not exposed as a probability. The guard is not statistically calibrated.
- Conversation context includes an active context and up to five recent record IDs, remains in memory, and does not persist across reloads or routes.
- The 103-case regression suite and 22-question held-out evaluation do not establish broad natural-language accuracy. See [question coverage](./LENJIPT_QUESTION_COVERAGE.md).

## Recommended confirmation order

1. Decide whether résumé-only phone/city details should remain confined to the résumé or appear in the portfolio/chatbot.
2. Reconcile current skill and certification lists across the portfolio and résumé.
3. Confirm canonical public portfolio URL and whether existing project demo/repository links remain live.
4. Supply verified project-specific role, team, measurable outcomes, and lessons learned only where they can be substantiated.
5. Clarify the production role of Supabase in the wedding project and authentication status in DocuGraph.

