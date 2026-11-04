# Premium SAT Tutor Website

A premium, editorial-style one-page website for a private SAT tutor, built with
**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # type-check
```

## Customising content

**All copy, numbers and contact details live in [`src/content/site.ts`](src/content/site.ts).**
Anything in `[square brackets]` or marked `PLACEHOLDER` is sample content — replace
it before launch (name, prices, qualifications, results, testimonials, contact info,
social links, `site.url`).

- **Portrait:** add a photo to `public/images/` (e.g. `portrait.jpg`) and set
  `site.tutor.portrait = "/images/portrait.jpg"`. Until then a designed placeholder is shown.
- **Contact form:** currently validates input and opens the visitor's email client with
  the request pre-filled. To use a real backend (Formspree, Resend, a route handler…),
  edit `onSubmit` in `src/components/sections/Contact.tsx`.

## Structure

```
src/
  app/                 layout, page, SEO (metadata, OG image, robots, sitemap, icon)
  content/site.ts      ← all editable content
  components/
    sections/          Navbar, Hero, Marquee, About, Process, Programs,
                       Results, Testimonials, FAQ, Contact, Footer
    ui/                Button (magnetic), SplitText, Reveal, Counter, ScrollText,
                       Magnetic, Cursor, ScrollProgress, Preloader, Portrait, …
  lib/                 helpers (cn, easing, media query)
```

## Motion & accessibility

- Word-by-word heading reveals, scroll-linked text, parallax, clip-path image reveals,
  animated counters/charts, magnetic CTAs, tilt & spotlight cards, animated accordion,
  scroll progress bar, custom cursor (fine pointers only) and a short branded preloader.
- Animations use transforms/opacity and honour `prefers-reduced-motion`
  (global `MotionConfig reducedMotion="user"`, plus CSS fallbacks).
- Semantic landmarks, skip link, labelled controls, `aria-expanded` accordion and menu,
  focus-visible styles, and JSON-LD (EducationalOrganization + FAQPage).
