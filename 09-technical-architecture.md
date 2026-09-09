# 09 — Technical Architecture

## Recommended stack

- **Framework:** React (Vite) or Next.js (static export) — either is fine;
  prefer whichever the target project/agent environment already defaults to.
  A one-page portfolio does not need SSR/routing complexity — a static site
  is sufficient and fastest.
- **Styling:** CSS with custom properties (design tokens from
  `01-design-system.md` as `:root` variables) + CSS Modules or Tailwind
  (if Tailwind, define the palette/type scale as theme tokens rather than
  using arbitrary values inline, to keep consistency enforced).
- **Animation:**
  - CSS transitions/keyframes for simple state changes (hover, focus).
  - `IntersectionObserver` (native, no library needed) for scroll-triggered
    reveals.
  - A lightweight animation library (e.g. Motion/Framer Motion) is acceptable
    for orchestrating staggered sequences (hero entrance, project card
    stagger) if it simplifies the code — not required if native CSS/JS
    covers it cleanly.
- **3D/generative visuals (if hero centerpiece option 1 or 2 chosen):**
  Three.js, kept minimal — a single scene, low poly count, no post-processing
  pipeline needed. Alternative: plain `<canvas>` 2D for the node-graph motif
  (cheaper, sufficient, no WebGL dependency risk).
- **Fonts:** self-hosted via `@font-face` (Space Grotesk, Inter, JetBrains
  Mono — all free/open-source, available via Google Fonts, download and
  self-host woff2 files rather than a Google Fonts CDN link, for performance
  and to avoid a third-party render-blocking request).
- **Deployment:** static hosting (Vercel/Netlify/GitHub Pages) — no backend
  required unless the contact section grows into a real form with a mail
  service (in which case a simple serverless function or a service like
  Formspree/Resend is sufficient; no need for a custom backend).

## File/folder structure (suggested)

```
src/
  components/
    Header/
    Hero/
    About/
    Projects/
      ProjectCard.tsx
    Skills/
    Contact/
    shared/
      GlitchText.tsx        # reusable CMYK glitch-entrance component
      SectionHeading.tsx     # consistent [0X] index + heading pattern
      Chip.tsx                # reusable tag/pill (tech stack, skills)
  styles/
    tokens.css               # design system variables from 01-design-system.md
    global.css
  hooks/
    useInView.ts              # IntersectionObserver wrapper
    useScrollProgress.ts       # header progress bar
    useActiveSection.ts         # nav active-state tracking
  assets/
    fonts/
    images/
    icons/
public/
  resume.pdf (if applicable)
```

## Performance budget

- Lighthouse mobile performance ≥ 90, accessibility ≥ 95.
- Total initial JS payload (excluding any 3D library) target < 150KB gzipped.
- If Three.js is used, lazy-load it (dynamic `import()`) so it doesn't block
  first paint of the text content; show the hero text immediately with the
  centerpiece motif fading in once loaded.
- Images: WebP/AVIF, properly sized (`srcset`), lazy-loaded below the fold
  (`loading="lazy"`), with explicit `width`/`height` to prevent layout shift.
- Fonts: `font-display: swap`, preload the critical heading + body weights
  used above the fold.

## Responsive breakpoints

| Name | Width |
|---|---|
| Mobile | < 480px |
| Mobile-large | 480–767px |
| Tablet | 768–1023px |
| Desktop | 1024–1439px |
| Desktop-large | ≥ 1440px |

Design system spacing/type values given in `01-design-system.md` are desktop
defaults with mobile overrides noted; tablet can generally interpolate between
the two or reuse mobile values for a single-column layout up to 1023px.

## Accessibility requirements

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>` with
  `aria-label` or heading per section, `<footer>`).
- Color contrast: verify `--text-secondary` (#B3A3D6) on `--bg-void`/`--bg-panel`
  meets at least WCAG AA for body text size; adjust lightness if it falls short.
- All interactive elements reachable and operable by keyboard, with visible
  focus states (not just hover states).
- `prefers-reduced-motion` handling as specified in `08-motion-interactions.md`
  is mandatory, not optional.
- Alt text on all meaningful images; decorative background textures/motifs
  marked `aria-hidden="true"`.
