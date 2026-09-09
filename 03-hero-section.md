# 03 — Hero Section `[00]`

## Goal

The first 3 seconds must feel distinct and intentional — not a stock "gradient
blob + fade-in headline" hero. This is the section that carries the most creative
weight.

## Content (use verbatim)

- Eyebrow/kicker (mono, small, `--text-tertiary`): `[00] // Portfolio.compile()`
  or similar code-flavored kicker — agent may vary wording but keep the
  `[00]` index + code-comment feel.
- **Name (H1):** Edward Geraldo Kristian
- **Title (subhead, mono or Inter medium):** iOS & Web Developer | Data Analyst
- **One-liner** (Inter, `--text-secondary`, ~18px): `[PLACEHOLDER: one sentence —
  e.g. "I build things that ship, and I make sense of the data behind them."]`
- CTA row: primary button "View Projects" (scrolls to Projects), secondary text-link
  "Get in touch" (scrolls to Contact).

## Visual composition

- Full viewport height (`100svh` to handle mobile browser chrome correctly).
- Background: `--bg-void` base with a very low-opacity (4–6%) animated grid-line
  layer (see `08-motion-interactions.md` for parallax behavior) and a soft violet
  radial glow centered behind the name, using `--violet-deep` → transparent.
- **Centerpiece motif options (pick one, don't combine):**
  1. A generative/procedural node-graph — small glowing points connected by thin
     lines that very slowly drift, representing a "network" — rendered in Canvas/WebGL
     or lightweight SVG+JS, tinted violet with occasional `--accent` node pulses.
  2. A single large geometric form (e.g. a slowly rotating wireframe icosahedron or
     abstract crystalline shape, Three.js) positioned to one side (not centered
     behind text — keep text legible), reacting subtly to cursor position (parallax
     tilt, max ~8° rotation).
  3. If assets/time are constrained: a static high-quality AI-generated or free-stock
     abstract violet/black texture (nebula-like, architectural-line-art, or circuit-
     like) as a background layer with slow CSS `background-position` drift — see
     `10-asset-sourcing.md` for exact sourcing guidance.
- On page load, the Name and Title run the **CMYK glitch-resolve entrance**: text
  starts in 3 offset/split copies (cyan/magenta/base), converges to aligned position
  over ~400ms, staggered 80ms between Name and Title. This should feel like the
  page "compiling into focus."
- Scroll-down affordance: small mono label `scroll` + animated blinking cursor
  (`█`) or a thin downward-animating line, bottom center, fades out after first scroll.

## Layout

- Desktop: text block left/center-aligned (max-width ~640px), centerpiece motif
  positioned right half or full-bleed behind with text on top (ensure contrast —
  add a subtle `--bg-void` gradient scrim behind text if motif is full-bleed).
- Mobile: centerpiece motif simplified or reduced-motion-static; text stacks full width,
  centered or left-aligned, kicker → name → title → one-liner → CTAs.

## Performance note

Whatever centerpiece is chosen, it must not block first paint. Load it after the
text/critical CSS, and provide a static-image or CSS-gradient fallback for slow
connections / `prefers-reduced-motion` / WebGL-unavailable contexts.
