# Portfolio Website — Master Brief

**Owner:** Edward Geraldo Kristian
**Role:** iOS & Web Developer | Data Analyst
**Codename:** "Signal / Compile"

## What this is

This folder is a complete design + engineering spec for a one-page, scroll-driven
portfolio site. It is written to be handed directly to a coding agent
(Antigravity / Claude Opus 4.6 Thinking) as ground truth. Read every file before
writing any code — later files assume the design system in `01-design-system.md`.

## Read order

**0. `PROGRESS.md` — read this FIRST, every session.** It tracks what's
already built, locked decisions, and open questions, so you don't redo work
or re-ask things across separate sessions/context windows. Update it last,
before ending every session.

1. `01-design-system.md` — colors, type, spacing, the CMYK-glitch visual language
2. `02-navigation-header.md` — sticky header + section-jump behavior
3. `03-hero-section.md`
4. `04-about-section.md`
5. `05-projects-section.md`
6. `06-skills-section.md`
7. `07-contact-section.md`
8. `08-motion-interactions.md` — scroll choreography, glitch/parallax mechanics
9. `09-technical-architecture.md` — stack, file structure, performance budget
10. `10-asset-sourcing.md` — where to get/generate every visual asset, with fallback rules
11. `11-hero-scroll-scrub.md` — **authoritative Hero build spec.** A scroll-scrubbed,
    procedural-canvas hero (pinned stage + synced story cards, 4 beats). Supersedes
    the simple centerpiece options listed in `03-hero-section.md` — build the hero
    from this file; `03-hero-section.md` still governs its copy and static fallback.
12. `12-ui-ux-pro-max-usage.md` — **optional, supplementary only.** Rules for using
    the installed `ui-ux-pro-max` skill as an accessibility/QA cross-check during
    
    Phases 5–6. Does not add or change any design decisions — read `01` first.
13. `13-visual-qa-protocol.md` — **run this any time the layout looks off, and
    always at the end of every phase.** Forces the agent to actually screenshot
    and look at its own rendered output across breakpoints and compare it
    against spec, rather than assuming code correctness equals visual correctness.

## Non-negotiable creative direction

- **Do not** produce a generic "dark portfolio with a gradient blob and fade-in-on-scroll"
  site. That is the exact default this spec exists to prevent.
- The site's identity is: **near-black violet base + CMYK channel-split glitch as the
  signature motion/visual motif**, applied specifically to code/data metaphors (compiling,
  parsing, rendering) rather than generic UI sparkle.
- Every section should feel like it belongs to a developer/data-analyst, not a designer
  portfolio — motifs: terminal cursors, grid/graph lines, node graphs, monospace data
  labels, subtle scanlines. Avoid literal "AI robot" or "coding matrix rain" clichés.
- One long scrollable page, five sections (Hero, About, Projects, Skills, Contact),
  fixed header with jump-links that smooth-scroll to each section and highlight the
  active one.

## Definition of "done" / award-bait checklist

- [ ] First 3 seconds create a distinct visual signature (not a stock gradient hero)
- [ ] Scroll has intentional choreography, not just fade-ins (see `08-motion-interactions.md`)
- [ ] Works and still feels premium with `prefers-reduced-motion` on
- [ ] Lighthouse performance ≥ 90 on mobile
- [ ] No layout shift; hero loads perceptibly instant
- [ ] Keyboard navigable, header nav has visible focus states
- [ ] All copy uses the real name/title given below (no lorem ipsum placeholders)
- [ ] `13-visual-qa-protocol.md` has been run against the finished section/page,
      not just code-reviewed — every phase must pass a visual check before being
      marked done in `PROGRESS.md`

## Copy to use verbatim

- Name: **Edward Geraldo Kristian**
- Title: **iOS & Web Developer | Data Analyst**
- (Other section copy: agent should draft based on structure in each section file,
  using bracketed `[PLACEHOLDER: ...]` markers for anything Edward needs to fill in
  himself — projects, real metrics, contact links, etc.)
