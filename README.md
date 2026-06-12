# Build in Motion

Event website for **Build in Motion** — an exclusive after-hours AI build sprint inside the Kochi Metro, organized by Codex Community Kochi in collaboration with Kochi Metro Rail Limited, supported through the Codex Ambassador programme.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Editing event details

All copy, dates, times, route, stats, schedule, tracks, rules, prizes, and FAQ live in a single file:

```
lib/content.ts
```

Update constants like `DATE`, `BUILD_WINDOW`, `ROUTE`, `APPLY_LINK` (currently a `#apply` placeholder — point it at Tally/Typeform/Luma/Devfolio when ready), and the data arrays (`statsData`, `scheduleData`, `routeLegs`, `tracksData`, `rulesData`, `prizesData`, `faqData`).

## Logos and branding

The site uses **text-based partner labels by default** (see `PartnerStrip` in `components/Sections.tsx`). Do not add unofficial, AI-generated, or low-resolution logo approximations.

If approved official logos are supplied (SVG or transparent 2x/3x PNG only), place them in:

```
public/brand/
  build-in-motion-wordmark.svg
  codex-community-wordmark.svg
  kmrl-logo.svg
```

then replace the text labels in `PartnerStrip` with `<img>` elements at 28–40px height, max-width 180px, with at least 16px clear space. Never apply glows, gradients, blend modes, transforms, or animations to logos.

## Structure

- `app/layout.tsx` — metadata, fonts, Event JSON-LD schema
- `app/page.tsx` — section composition
- `components/Hero.tsx` — hero with route line, light streaks, departure board
- `components/RouteScroller.tsx` — pinned route scrollytelling (desktop) / vertical timeline (mobile)
- `components/Sections.tsx` — concept, stats, schedule, format, tracks, rules, why, prizes, apply, media, final CTA, footer
- `components/FAQ.tsx` — accessible accordion
- `components/ui.tsx` — Reveal, MagneticButton, TiltCard, CountUp primitives

All animations respect `prefers-reduced-motion`.
