# 06 — Skills Section `[03]`

## Goal

Avoid the two most overused skills-section patterns: (a) a wall of logo icons,
and (b) horizontal "skill bar" percentage meters (these read as arbitrary/fake
— "87% JavaScript" means nothing). Instead, treat this section like a technical
capability map that mirrors Edward's dual identity.

## Content structure

Group into **two or three columns/clusters**, not one flat list:

1. **iOS & Web Development** — Swift, SwiftUI, TypeScript/JavaScript, React,
   [PLACEHOLDER: full real stack]
2. **Data Analysis** — Python, SQL, Pandas, visualization tools, [PLACEHOLDER:
   full real stack]
3. **Tools/Platforms** (optional 3rd cluster) — Git, Xcode, Figma, cloud/CI
   tools, [PLACEHOLDER: full real stack]

For each cluster: a short one-line description of *how* Edward uses that skill
set (not just a logo dump) — e.g. "Native iOS apps end-to-end, from UI to backend
integration" / "Turning raw datasets into decisions."

## Visual treatment

- Each skill listed as a mono-font tag/chip (matching the tech-pill style from
  Projects for visual consistency), grouped under its cluster heading.
- Instead of percentage bars, consider a **proficiency-by-density visual**: e.g.
  a small dot-matrix or bar-code-style indicator next to each skill using filled
  vs. unfilled dots (discrete steps like 4/5, not a fake precise percentage) —
  optional, only if it stays honest and simple; a clean tag list is also fine
  and arguably more credible.
- Background: `--bg-void` (alternating back from About's `--bg-panel`).
- Consider layering the low-opacity grid/graph-line motif from the hero behind
  this section for continuity, since "skills" is inherently structural/technical.

## Interaction

- Skill chips animate in with a stagger (~30ms each) on scroll-into-view, sliding
  up 8px + fade, grouped cluster by cluster (cluster 1 fully in before cluster 2
  starts, or all clusters staggered together — pick whichever reads cleaner given
  final layout).
- On hover, a skill chip does the subtle jitter/glow treatment (consistent with
  Projects tags) — keeps interaction language consistent site-wide rather than
  inventing a new effect per section.
