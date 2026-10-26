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
- Authentic project screenshots are stored in `public/images/projects/` by project. Replace an image file and update its metadata in `lib/content.ts` when a new screenshot is available.
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

Featured project cards and case studies use responsive, aspect-ratio-preserving screenshots. Missing live demos or repositories are omitted rather than shown as unavailable links.

## Motion

`components/Motion.tsx` contains the shared fixed digital-architecture scene. Distant structures, the illuminated corridor, and close architectural details share one page-scroll-scrubbed camera timeline (desktop scales 1.0×–1.22×, 1.0×–1.48×, and 1.0×–1.72×); the mobile scene simplifies foreground detail and uses a shorter camera travel. The navbar percentage pill reports actual document scroll progress and updates on scrolling, resizing, and document-size changes. Motion is disabled when the visitor requests reduced motion.

The navbar theme control switches between the saved dark palette and a coordinated daylight palette. The initial theme is applied before hydration from the saved choice or the operating-system preference; theme tokens transition without remounting the page or resetting scroll/ScrollTrigger progress. Certificate, school, and project imagery remains unchanged.

The Selected Work showcase uses vertical scroll to scrub through its horizontal project track on all motion-enabled screen sizes. Project cards share a consistent width, image ratio, and track height; directional snapping settles the active card in the center. The card surface opens its cinematic overview, while case-study, demo, and repository links remain separate controls. Returning from a case study restores the saved portfolio scroll position without replaying the intro; a full page refresh starts the intro normally. With reduced motion enabled, projects remain in a normally scrollable vertical list.

`components/Experience.tsx` coordinates the `intro → intro-exiting → main-entering → ready` lifecycle. The main page is inert and its CSS animations are paused during the intro; the hero starts only after the intro exit, and Lenis/ScrollTrigger start after the hero entrance. `components/PortfolioIntro.tsx` plays on each page load, supports pointer/keyboard skipping, and follows the same exit transition when skipped. Reduced-motion preferences bypass the intro and animation playback.
