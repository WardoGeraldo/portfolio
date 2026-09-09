# 11 — Hero: Scroll-Scrub Implementation (supersedes simple centerpiece in `03-hero-section.md`)

## What this is

An adaptation of the "pinned stage + scroll-driven frame progress + synced story
cards" pattern (the kind Apple product pages use) — but instead of swapping
between hundreds of photographed JPEG frames, the "frame" is a `<canvas>` that
**redraws procedurally** based on scroll progress. Same UX architecture, zero
external image dependency, fully on-brand with the CMYK-glitch/violet system
from `01-design-system.md`.

This component becomes the actual implementation of the Hero section
(`03-hero-section.md`) — treat this file as the authoritative build spec for
the hero; `03-hero-section.md` still governs copy and the non-scrubbing
fallback state.

## Architecture (kept from the reference pattern)

- A **pinned stage**: `position: sticky; top: 0; height: 100svh` inside a tall
  scroll spacer (`height: 400vh` — 4 beats × 100vh each, see below).
- Scroll position within that spacer maps to a `progress` value `0 → 1` via a
  scroll listener (throttled with `requestAnimationFrame`, exactly like the
  reference `onScroll`/`loop` functions — reuse that eased-follow logic:
  `displayProgress += (targetProgress - displayProgress) * 0.28` per frame,
  so the visual lags the raw scroll slightly for a smooth "physical" feel
  rather than snapping 1:1 to scroll).
- **Story cards** synced to `progress`, one active at a time, each owning a
  sub-range of progress (`from`/`to`) — same mechanism as the reference
  `steps` array and `activeIdx`/`stepLocal` logic. Directly reuse this state
  logic; only the visual driven by progress changes (canvas draw call instead
  of `<img src>` swap).
- **Loader:** since there are no images to preload, drop the loader entirely
  (or replace with a near-instant canvas/WebGL context-ready check). This
  removes the biggest performance liability of the original pattern (941
  eagerly-loading images) for free.

## What changes: the visual driven by progress

Instead of `framePath(i)` returning an image URL, drive a canvas render
function `drawFrame(ctx, progress, activeStepIndex)`:

- **Base scene:** the node-graph/wireframe motif from `03-hero-section.md`
  option 1 or 2 — a set of points connected by thin lines, rendered in 2D
  canvas (cheap) or via a Three.js scene rendered to the same canvas element
  (if richer depth/lighting is wanted; still no external assets, geometry is
  generated in code).
- **Progress-driven transform:** as `progress` advances 0→1, animate the
  scene's rotation, camera distance/parallax offset, and point-density or
  connection-opacity — e.g. at progress 0 the graph is sparse and slowly
  rotating; by progress 1 it's denser/more connected, suggesting "the network
  coming together" as the visitor scrolls — a nice metaphor for a
  developer+data-analyst portfolio (data points connecting into insight).
- **Per-beat color tint:** each of the 4 steps below gets a distinct tint
  applied to the graph's glow/line color, cross-fading as `progress` crosses
  each step boundary — cyan for beat 1, magenta for beat 2, the violet accent
  for beat 3, and the full CMYK-split glitch treatment (all channels at once)
  for beat 4 as a climactic moment before settling into the resting hero
  state below the fold.
- **No preloading needed** — canvas draws are computed, not fetched. This
  also means the effect **degrades trivially**: if `prefers-reduced-motion`
  is set or WebGL/canvas isn't available, render one static frame (progress
  frozen at the beat-1 state) instead of trying to load a fallback image.

## The 4 beats (content)

Replace the reference demo's MacBook color/design/display/battery copy with:

| # | Range | Channel color | Label | Title | Description |
|---|---|---|---|---|---|
| 01 | 0.00–0.25 | `--channel-cyan` `#00F0FF` | Build | "I build things end-to-end." | `[PLACEHOLDER: one line on iOS + Web craft — e.g. "Native iOS apps and modern web products, from first sketch to shipped release."]` |
| 02 | 0.25–0.50 | `--channel-magenta` `#FF2E9A` | Analyze | "I make sense of the data." | `[PLACEHOLDER: e.g. "Turning raw datasets into decisions — analysis that actually gets used."]` |
| 03 | 0.50–0.75 | `--violet-bright` `#7C3AED` | Craft | "Precision in every layer." | `[PLACEHOLDER: e.g. "Clean architecture, considered UX, code built to last past launch day."]` |
| 04 | 0.75–1.00 | full CMYK split | Ship | "Currently building. Always learning." | `[PLACEHOLDER: e.g. "Open to new opportunities — let's build something."]` (this card's CTA links to Contact) |

Keep the same card UI as the reference: index number (`01 / 04`), icon slot
(use a simple mono glyph — `▹` `▦` `◆` `▪` or similar per beat — not emoji),
title, description, and the segmented progress ticks at the card foot showing
beat completion (reuse the reference's tick-fill logic exactly, it's already
well-built: `scaleX` transform per tick, instant fill for completed beats,
animated fill for the current one).

## Header/name integration

The name + title from `03-hero-section.md` (`Edward Geraldo Kristian` / `iOS &
Web Developer | Data Analyst`) sit pinned in the stage alongside the canvas,
same as the reference's `fsh-title`/`fsh-sub` — run the CMYK glitch-resolve
entrance on them once on load (per `03-hero-section.md`), independent of the
scroll-scrub beats. The subtitle can fade out on first scroll (reuse
`subHidden` state from the reference) since the story cards take over the
narrative role once scrolling begins.

## Scroll spacer sizing

Reference used `600vh` for 4 beats of dense photographic detail. For a
procedural canvas hero with 4 shorter copy beats, **`400vh` is enough**
(100vh settle time per beat) — going longer than that risks feeling padded
on a portfolio (visitors are scanning for projects/skills, not buying a
laptop). Keep this shorter than the reference default.

## What NOT to carry over from the reference prompt

- Do not hotlink or reference the `duthiljean/hero-apple` repo or any of its
  frame images — not used at all in this implementation.
- Do not fabricate Unsplash image URLs. If a photographic layer is ever
  wanted later, source it properly (real search + license check, per
  `10-asset-sourcing.md`) rather than guessing IDs.
- Drop `eagerCount`/image-preload loader logic entirely — not applicable
  without an image sequence.
- The `fsh-shimmer` keyframe from the reference CSS is fine to keep as a
  small utility (e.g. for a loading-state shimmer elsewhere in the site) but
  is not required for this hero specifically.

## Accessibility / reduced motion

- `prefers-reduced-motion: reduce`: disable the scroll-scrub entirely — pin
  nothing, render the hero as a normal static section at beat-1's visual
  state, with all 4 cards shown stacked/simplified below the name (or as a
  simple 4-item list) instead of scroll-synced. Content must not be lost,
  only the scrub mechanic.
- Ensure the pinned stage doesn't trap keyboard/scroll focus — a keyboard or
  screen-reader user should be able to tab through the cards' content
  (links, if any) without needing to "scroll-scrub" to reach them; consider
  rendering all card content in the DOM at all times (just visually
  de-emphasized when inactive) rather than mounting/unmounting on activation.
