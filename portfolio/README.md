# Lenj Jesther Magsino — Portfolio

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
- `lib/education.ts` contains the education timeline entries.
- `lib/certifications.ts` contains the 13 credential entries, category tags, optional logo/document paths, and verification URLs.
- Original certificate images/PDFs and generated PDF-page previews are stored in `public/certificates/`; the original PDFs are available from the preview modal for download.
- Official school logo assets are stored under `public/images/schools/`; their sources are listed in `CONTENT_TODO.md`.
- `public/resume/lenj-magsino.pdf` is the expected résumé file. Résumé links remain unavailable until the file exists.
- Put authentic certificate files in `public/certificates/` and update their paths and credential links in `lib/certifications.ts`.
- Issuer names use accessible text marks until verified official brand assets are added.
- `CONTENT_TODO.md` records details that are still needed to complete the content.

Featured project cards and case studies use responsive, aspect-ratio-preserving screenshots. Missing live demos or repositories are omitted rather than shown as unavailable links.

## Motion

`components/Motion.tsx` contains the shared fixed background scene. Its distant gradient/grid, network lines, and foreground geometry move at different rates with page scroll; section-level `data-depth` elements add foreground parallax. Motion is disabled when the visitor requests reduced motion.

The Selected Work showcase uses vertical scroll to scrub through its horizontal project track on all motion-enabled screen sizes. With reduced motion enabled, projects remain in a normally scrollable vertical list.

`components/Experience.tsx` coordinates the `intro → intro-exiting → main-entering → ready` lifecycle. The main page is inert and its CSS animations are paused during the intro; the hero starts only after the intro exit, and Lenis/ScrollTrigger start after the hero entrance. `components/PortfolioIntro.tsx` plays on each page load, supports pointer/keyboard skipping, and follows the same exit transition when skipped. Reduced-motion preferences bypass the intro and animation playback.
