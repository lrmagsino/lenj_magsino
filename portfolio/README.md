# Lenj Jesther R. Magsino — Portfolio

An interactive portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, GSAP ScrollTrigger, and Lenis.

## Run locally

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To verify a production build, run `npm run build`.

## Contact form

The contact form sends messages through Web3Forms. Request an access key for the intended recipient at [web3forms.com](https://web3forms.com/), then create `portfolio/.env.local` with:

```sh
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

Restart the development server after adding the key. In Vercel, add the same variable under Project Settings → Environment Variables and redeploy. Environment files are ignored by Git; `.env.example` is a placeholder and must not contain a real key. The `NEXT_PUBLIC_` variable is included in browser code as required by Web3Forms' client-side integration, so use the access key issued for the form.

## Update portfolio content

- `lib/content.ts` contains the profile, projects, and skill groups.
- Featured project descriptions, verified links, technologies, image dimensions, captions, and case-study content are managed in `lib/content.ts`.
- User-supplied project covers are stored as `cover.png` in each `public/images/projects/<project>/` folder. Selected Work cards and cinematic overviews use these covers; each project's `image` in `lib/content.ts` remains separate for full case-study visuals and authentic screenshots.
- The DocuGraph and Mayari project overview team galleries are implemented in `components/DocuGraphTeam.tsx`; supplied original team photographs are stored in their respective `public/images/projects/` folders.
- The DocuGraph case study includes a source-informed comparison, interactive architecture explorer, thesis test-case selector, side-by-side and screenshot-wipe comparison views, and a cinematic evidence viewer. The wipe is explicitly labeled as an unregistered visual comparison, not a detection overlay. Public evidence screenshots are stored under `public/images/projects/docugraph/evidence/`; invoice and receipt screenshots are intentionally withheld until their contact, signature, and transaction details can be redacted.
- The DocuGraph comparison distinguishes model confidence from accuracy. The supplied thesis summary does not define a ground-truth evaluation protocol, and some summary confidence values conflict with individual test screenshots; those numbers are therefore labeled as source-reported confidence, not validated performance gains.
- `/recruiter` is a direct, minimal-motion overview of education, a selectable reduced-motion-aware milestone timeline, academic activities, skills, selected projects, featured certifications, résumé availability, and contact links. Its GitHub panel fetches only public repositories and recent public events from GitHub's unauthenticated API, with visible loading/error/rate-limit states and manual refresh. It does not expose private data or invent contribution totals; GitHub's contribution graph is omitted because it is not available through the public unauthenticated API.
- The recruiter view includes an optional, read-only portfolio terminal. It supports only `help`, `about`, `projects`, `skills`, `education`, `certifications`, `contact`, and `clear`; arbitrary shell commands are never executed.
- Featured case studies include an engineering-notes section. Claims are scoped to verified project details; missing implementation specifics and unmeasured outcomes are labeled rather than inferred.
- `lib/education.ts` contains the education timeline entries.
- `lib/certifications.ts` contains the 13 credential entries, category tags, optional logo/document paths, and verification URLs.
- Original certificate images/PDFs and generated PDF-page previews are stored in `public/certificates/`; the original PDFs are available from the preview modal for download.
- Official school logo assets are stored under `public/images/schools/`; their sources are listed in `CONTENT_TODO.md`.
- `public/resume/lenj-magsino.pdf` is the downloadable résumé linked from the navigation and hero section.
- Put authentic certificate files in `public/certificates/` and update their paths and credential links in `lib/certifications.ts`.
- Issuer names use accessible text marks until verified official brand assets are added.
- `CONTENT_TODO.md` records details that are still needed to complete the content.

Featured project cards and cinematic overviews use responsive, aspect-ratio-preserving project covers. Full case studies retain their existing visuals, screenshots, and evidence. Missing live demos or repositories are omitted rather than shown as unavailable links.

Five full case studies include lazy-loaded interactive portfolio demos: synchronized sample AOS/POS order flow for Red Warriors, local assignment and class tracking for Mayari, an informational event and registration-form preview for CS Expo, a personalized invitation and local RSVP preview for Wedding, and saved-evidence replay for DocuGraph. Each demo is isolated to its case-study page and clearly distinguishes browser-only sample behavior from the original project; none connects to production services or sends demo form data. The Red Warriors prototype was browser-tested at mobile widths down to 320px and on desktop.

## LenjiPT portfolio assistant

LenjiPT appears after Selected Work and before Education. The embedded section and floating chat share the same in-memory conversation, including recent project references and list context; clearing it removes the conversation, and it is not saved between page visits. Its records use portfolio data from `lib/content.ts`, `lib/education.ts`, and `lib/certifications.ts`, plus shared source-reviewed engineering facts in `lib/projectEngineeringNotes.ts`.

LenjiPT is a local retrieval-and-template guide, not a connected generative AI model. It uses fielded BM25-style ranking, curated English/Filipino/Taglish synonyms and examples, project aliases, typo-tolerant matching, rule-based intent/scope handling, language-aware response framing, and bounded in-memory follow-up context. The same canonical facts serve all detected languages; query examples guide retrieval but do not train a model. No embedding model, external inference service, API key, or usage charge is involved.

Answers use a reusable structured format with concise summaries, topic-specific sections, lists, technology chips, project comparison tables, source references, safe case-study/section actions, and contextual follow-up buttons. Project records identify whether information is portfolio-listed or source-reviewed and preserve important implementation boundaries—for example, heuristic graph aggregation versus a trained GNN, independent Red Warriors AOS/POS prototypes, and production versus browser-only demo features. Unknown portfolio details and out-of-scope requests remain explicit rather than being filled with guesses. External actions are limited to verified portfolio hosts. As with any hand-built retrieval vocabulary, it may miss phrasings or details not represented in its content.

Run the 103-case regression suite with `npm run test:lenjipt` and the separate 22-question held-out retrieval/language evaluation with `npm run test:lenjipt:heldout`. The held-out questions are not runtime query examples; their measured scores are a small evaluation result, not a claim of exhaustive language coverage.

## Motion

`components/Motion.tsx` drives the fixed Blue Future landscape with one reversible, page-scroll-scrubbed camera timeline from Hero through the document’s actual maximum scroll, including the Selected Work pin spacer and all sections after LenjiPT. The camera scales from 1.0× to 1.62× on desktop and 1.0× to 1.46× on mobile, with city-focused transform origins to keep the architecture visible. The 1672×941 artwork is a single flattened image, so the end scales are capped to retain background detail. Motion is disabled when the visitor requests reduced motion.

The navbar theme control switches between the saved dark palette and a coordinated daylight palette. The initial theme is applied before hydration from the saved choice or the operating-system preference; theme tokens transition without remounting the page or resetting scroll/ScrollTrigger progress. Certificate, school, and project imagery remains unchanged.

The Selected Work showcase uses vertical scroll to scrub through its horizontal project track on all motion-enabled screen sizes. Project cards share a consistent width, image ratio, and track height; directional snapping settles the active card in the center. The card surface opens its cinematic overview, while case-study, demo, and repository links remain separate controls. Featured videos play muted and inline only after desktop hover or explicit touch/keyboard Play Preview activation, loop while active, and crossfade back to their original covers when the pointer leaves, the card becomes inactive or leaves view, an overview opens, or the tab is hidden. Playback is disabled for reduced-motion or reduced-data preferences; no native video controls are shown. Returning from a case study restores the saved portfolio scroll position without replaying the intro; a full page refresh starts the intro normally. With reduced motion enabled, projects remain in a normally scrollable vertical list.

`components/Experience.tsx` coordinates the `intro → intro-exiting → main-entering → ready` lifecycle. The main page is inert and its CSS animations are paused during the intro; the hero starts only after the intro exit, and Lenis/ScrollTrigger start after the hero entrance. `components/PortfolioIntro.tsx` plays on each page load, supports pointer/keyboard skipping, and follows the same exit transition when skipped. Reduced-motion preferences bypass the intro and animation playback.
