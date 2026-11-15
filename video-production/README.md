# LJM Portfolio Video Production

This Remotion workspace is separate from the Next.js portfolio app. It renders all five videos locally to `../portfolio/public/videos/` and does not use a cloud renderer, paid API, account, or billing setup.

## Remotion license

Remotion's [License FAQ](https://www.remotion.dev/docs/license/faq#who-is-eligible-for-the-free-license) lists individuals as eligible for its Free License, for personal or commercial use, without requiring an account. Re-check the current terms if the videos are later produced for a company or by a team.

## Render

```powershell
npm install
npm run typecheck
npm run render
```

The renderer uses the original project covers and selected screenshots from `../portfolio/public/images/`. Output is H.264 MP4, 1280×720, 30 fps, 12 seconds, muted, and loopable.

## Accuracy notes

- **DocuGraph:** The scanning, region, comparison, and relationship visuals are an illustrative workflow. No performance percentages are shown.
- **Mayari:** The assignment panel uses sample data. It is not a live Canvas connection; reminder preferences are not presented as scheduled notifications.
- **Red Warriors:** The AOS/POS screens represent the portfolio's local browser simulation and sample state. The original Android prototypes are separate and do not share a verified service.
- **CS Expo:** Published event details are used. The public speakers page listed speaker placeholders as TBC at render time.
- **Fritz & Princess:** Public invitation date and location are shown. Ceremony/reception specifics are not invented, and the RSVP scene is a non-submitting preview.
