# 13 — Visual QA Protocol (Run Anytime the Layout Looks Off)

## Why this file exists

Code that compiles and matches the spec's *text* can still look inconsistent
or ugly — wrong spacing rhythm, misaligned elements, colors that drifted
from the tokens, type that doesn't follow the scale. The agent cannot catch
this by reading its own code; it has to **actually look at the rendered
page** the way a human would, at multiple screen sizes, and compare what it
sees against the spec — then fix what doesn't match.

This is not a one-time step. Run this protocol after finishing any section,
any time the user says the layout "feels off," and again as the final step
of Phase 6.

## Step 1 — Capture, don't assume

Before judging anything, render the live page and actually look at it:

1. Start the dev server if not already running.
2. Take a full-page screenshot (or use the browser preview tool) at these
   exact widths, matching `09-technical-architecture.md`'s breakpoints:
   **375px, 768px, 1024px, 1440px.**
3. Do this for the full scrolled page, not just the viewport — capture every
   section, not only what's visible on load.
4. If interactive/scroll-driven elements exist (the hero scroll-scrub, nav
   active-state, hover states), capture them in at least two states each
   (e.g. hero at progress 0 and progress 1; a project card at rest and on
   hover) — a single static screenshot won't catch broken transitions.

Do not skip straight to judging code correctness from the source files —
the whole point of this protocol is to catch what the code *produces*,
which is not always what the code *intends*.

## Step 2 — Check against the design system, section by section

For each section, go through this checklist against `01-design-system.md`
and the section's own spec file (`03` through `07`, `11`). Flag every
mismatch — don't silently "improve" something that wasn't actually wrong per
spec, but do flag anything spec-compliant that still looks bad (see Step 4).

**Spacing & grid**
- [ ] All spacing values are multiples of 8px — no arbitrary 13px/22px gaps
      that crept in from a default component style
- [ ] Section vertical padding matches spec (160px desktop / 96px mobile)
- [ ] Content respects the 1200px max-width + gutter (24px mobile / 64px
      desktop), not full-bleed or randomly narrower
- [ ] Spacing rhythm is consistent *between* sections, not just within one

**Color**
- [ ] Every color used traces back to a token in `01-design-system.md` —
      no off-palette grays, no default Tailwind blue/gray sneaking in from
      an unstyled default component
- [ ] The 90/10 rule is holding: base is void/panel/violet/text tones,
      CMYK channels and `--accent` appear only as intentional moments, not
      as large fills
- [ ] Background alternation between sections matches the sequence specified
      (void → panel → void → void+grid → void)
- [ ] Text contrast is actually legible at each breakpoint, not just on the
      design system's stated hex values in isolation (glow/gradient
      backgrounds can eat contrast in practice)

**Typography**
- [ ] Every heading/body/mono text uses the defined scale — no ad-hoc font
      sizes, no headings that are technically "close to" the spec size but
      not exact
- [ ] Font weights match spec (e.g. H1 is 700, not whatever the browser
      defaulted to)
- [ ] Line-height and letter-spacing match spec, especially on large
      headings where drift is most visible
- [ ] Mobile type sizes are the specified mobile values, not just the
      desktop values shrunk by the browser

**Layout & alignment**
- [ ] Elements that should align (card grids, nav items, section headers)
      actually align pixel-consistently, not "close enough"
- [ ] No unintended overlap, clipping, or text touching container edges
- [ ] Asymmetric layouts (e.g. Projects grid) are asymmetric *on purpose*
      per spec, not accidentally uneven due to unequal content length
- [ ] Consistent card/component heights within a row, unless the spec calls
      for intentional variation (e.g. the Projects "featured" card)

**Motion**
- [ ] Entrance animations trigger once per section, not on every scroll
      up/down re-entry (per `08-motion-interactions.md`)
- [ ] Stagger timing is present and consistent where specified (nav items,
      project cards, skill chips)
- [ ] `prefers-reduced-motion` actually removes the transform-based
      animations when toggled on (verify in devtools, don't assume)

## Step 3 — Cross-section consistency pass

After checking sections individually, compare them **against each other**:

- [ ] Do all section headers (`[0X] Section Name`) look and behave
      identically in style, size, and position?
- [ ] Is the hover/interaction language consistent (the same jitter/glow
      treatment on nav links, project cards, skill chips, contact links —
      not a different effect invented per section)?
- [ ] Does the CMYK glitch effect look and time the same everywhere it's
      used (hero entrance, contact bookend, hover states) — or did it drift
      into different durations/offsets in different components?
- [ ] Is button/CTA styling identical for equivalent actions across
      sections?

Inconsistency *between* sections is often more visually "horrible" than any
single section being imperfect — this pass exists specifically to catch that.

## Step 4 — Judgment calls beyond the letter of the spec

Some things can technically match every spec value and still look bad in
practice — token math doesn't guarantee taste. If something looks wrong even
though it's spec-compliant, say so explicitly (don't silently deviate from
spec without flagging it), propose a specific fix, and either apply it or
ask the user, depending on how large the deviation from spec would be:

- Small/local fix (adjusting one component's internal spacing, fixing an
  alignment bug) → just fix it, note it in the QA report.
- Fix that would change a spec value itself (a spacing constant, a color,
  a layout pattern) → flag it, propose the change, log it under "Open
  questions" in `PROGRESS.md`, and ask the user before changing the spec
  file itself.

## Step 5 — Report and fix loop

Produce a short QA report (this can go directly in chat, and a summary
should be logged in `PROGRESS.md`):

```
## Visual QA — [section or full-page] — [date/phase]

Checked at: 375px / 768px / 1024px / 1440px

Issues found:
1. [What's wrong] — [where] — [spec says X, actual is Y] — [fix applied / proposed]
2. ...

Fixed: [list]
Flagged for user decision: [list, if any — see Step 4]
```

Then: fix everything in the "just fix it" category, re-screenshot the
affected sections/breakpoints, and confirm the issue is actually resolved
before moving on — do not mark something fixed without re-verifying it
visually.

## When to run this

- After finishing any individual section/phase, before marking it done in
  `PROGRESS.md`.
- Whenever the user says the layout looks off, inconsistent, or "not right"
  — run the full protocol immediately rather than guessing at a fix from
  their description alone.
- As the mandatory final step of Phase 6 (Performance pass), across the
  entire finished site.
