# 04 — About Section `[01]`

## Goal

Establish Edward as both a developer (craft/build) and a data analyst (rigor/insight)
— the section should visually acknowledge this dual identity rather than reading as
a generic "I'm a passionate developer" bio.

## Content

- Section header: `[01] About` (mono index + Space Grotesk heading, per header
  convention used across sections).
- Bio copy: `[PLACEHOLDER: 2–3 short paragraphs. Suggested structure —
  paragraph 1: who he is / what he builds (iOS + web); paragraph 2: the data-analyst
  side, how he thinks about problems; paragraph 3: what he's currently focused on
  or looking for.]`
- Optional pull-quote or highlighted line in larger type breaking up the paragraphs
  — mono font, `--accent` color, e.g. a personal engineering philosophy one-liner.
- **Stat/metric row** (mono numerals, large, with small labels underneath) — a
  strong device for a data-analyst identity. Examples of the *kind* of stat
  (Edward should supply real numbers): `[PLACEHOLDER: e.g. "3+ yrs experience",
  "12 shipped apps", "40+ datasets analyzed"]`. Animate these counting up from 0
  when the section scrolls into view (see motion spec).

## Layout

- Two-column desktop layout: left column = photo or abstract avatar treatment
  (see below), right column = bio text + stat row. Reverse or stack on mobile.
- **Photo treatment (if using a real photo):** avoid a plain rounded headshot.
  Apply a duotone/violet treatment matching the palette (CSS `filter` or
  pre-processed image: map shadows to `--bg-void`, highlights to `--text-primary`,
  with a violet mid-tone), inside a hairline-bordered frame with a corner-bracket
  motif (like a viewfinder/scan-target — ties into the "data analysis" concept).
  On hover/scroll-in, run a brief horizontal-scan-line animation across it once.
- **If no photo is provided:** use a generative avatar alternative — e.g. an
  abstract geometric portrait-shaped silhouette filled with the node-graph motif
  from the hero, or a large stylized monogram in the corner-bracket frame.
- Background: `--bg-panel` for this section (alternate from hero's `--bg-void`)
  to create rhythm as user scrolls.

## Micro-interactions

- Stat numbers: count-up animation on scroll-into-view, `--accent` color while
  counting, settles to `--text-primary` at rest.
- Corner-bracket frame around photo/avatar: brackets animate inward from slightly
  outside their resting position on scroll-in (150ms stagger per corner).
