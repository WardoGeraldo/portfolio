# 08 — Motion & Scroll Choreography

## Philosophy

Motion should feel like **precision engineering**, not decoration. Every
animation should have a clear trigger (scroll position, hover, load) and a
clear purpose (reveal hierarchy, confirm interaction, bookend a section). No
looping ambient animation that runs forever regardless of user attention
(drains battery, feels aimless, and is the first thing that reads as
"template site" if slightly off).

## Global rules

- **Easing:** default to `cubic-bezier(0.16, 1, 0.3, 1)` (a snappy "ease-out
  expo" feel) for most reveal/transition animations. Use plain `ease-in-out`
  for continuous/looping motion (like the header progress bar) to avoid a
  jarring feel.
- **Timing:** micro-interactions (hover, chip jitter) 120–220ms. Section-level
  reveals 300–500ms. Page-load hero entrance 400–700ms total sequence.
- **Stagger:** any group of similar elements (nav items, project cards, skill
  chips, stat numbers) that animate in together should stagger by 30–80ms per
  item, not appear simultaneously — this is what makes reveals feel designed
  rather than templated.
- **Respect `prefers-reduced-motion: reduce`:** disable all transform-based
  entrance animations (replace with instant or opacity-only fade ≤150ms),
  disable parallax layers entirely, disable the CMYK glitch entrance/hover
  effects (replace with a plain color-shift or nothing), keep functional
  motion only (e.g. active-nav-indicator can still slide, but keep it short).
- **Performance:** animate only `transform` and `opacity` wherever possible
  (GPU-accelerated, no layout thrash). Avoid animating `width`/`height`/`top`/
  `left` for anything that runs on scroll. Use `will-change` sparingly, only
  on elements actively animating.

## Scroll choreography (per section, on first entry into viewport)

Use an `IntersectionObserver` per section (not a scroll-position library that
recalculates on every scroll event, for performance) with thresholds around
0.2–0.3, and only trigger each section's entrance **once** (don't replay on
scroll-up/scroll-down re-entry — replaying reads as gimmicky).

1. **Hero:** plays automatically on page load (not scroll-triggered) — see
   `03-hero-section.md` for the glitch-resolve entrance sequence.
2. **About:** photo/avatar frame corner-brackets animate in (staggered),
   bio text fades up (`opacity 0→1`, `translateY 12px→0`), stat numbers
   count up from 0 (see `04-about-section.md`).
3. **Projects:** cards fade/slide up with a stagger, front-to-back in DOM
   order (~60ms stagger). If using the asymmetric layout, the large featured
   card can lead with the CMYK glitch-resolve treatment on its title (reuse
   hero device, but only once here, not on every card) while smaller cards
   use the plain fade+slide to keep hierarchy clear.
4. **Skills:** chip stagger by cluster (see `06-skills-section.md`).
5. **Contact:** headline plays the glitch-resolve treatment again (bookend
   with hero — see `07-contact-section.md`), supporting content fades up
   normally.

## Parallax layers (hero + optional background continuity through page)

- The low-opacity grid-line background layer introduced in the hero may
  continue faintly through the whole page (very subtle, ~4% opacity) as a
  unifying background texture, parallaxing at roughly 0.2–0.3x scroll speed
  (slower than content) via `transform: translateY()` driven by a throttled
  scroll listener or, preferably, CSS `@scroll-timeline`/`animation-timeline: scroll()`
  where browser support allows, with a JS fallback.
- Do not parallax foreground content (text, cards) — parallax is reserved for
  background texture only, to avoid the disorienting "everything is floating"
  effect some template sites have.

## Section transitions

- Alternate background tokens section-to-section as specified (`--bg-void` →
  `--bg-panel` → `--bg-void` → `--bg-void`/textured → `--bg-void`) to create
  scroll rhythm without needing hard visual dividers.
- Optional: a thin 1px hairline divider with a small mono section-index label
  (`[01]`) at each section boundary, consistent with the header's index
  numbering — reinforces the "structured document / codebase" feel.

## Cursor (desktop only, optional but on-brand)

Consider a custom cursor: default is a small mono `+` crosshair or thin ring;
on hovering any interactive element it snaps to a filled `--accent` dot with
a brief scale-up (~150ms). This reinforces the "precision/technical" feel
site-wide at near-zero cost. Must be entirely disabled on touch devices and
must not replace the native cursor's accessibility behavior (don't hide focus
rings).
