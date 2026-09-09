# 07 — Contact Section `[04]`

## Goal

Closing section — should feel like a confident, uncluttered "here's how to reach
me," not a bloated contact form. Given this is a portfolio (not a SaaS product),
prefer direct links over a form unless Edward wants a form.

## Content

- Section header: `[04] Contact` — consider a slightly larger, bolder treatment
  than other section headers since it's the final beat of the page (e.g. run the
  full CMYK glitch-resolve entrance again here, mirroring the hero, to bookend
  the experience).
- Headline: `[PLACEHOLDER: e.g. "Let's build something." or "Open to new
  opportunities."]`
- Short supporting line: `[PLACEHOLDER: 1 sentence — availability status, what
  kind of work/roles he's open to]`
- **Primary contact method:** large, prominent — email address as a big
  clickable mono-font link (`mailto:`), with a "copy to clipboard" icon button
  next to it (small toast/confirmation on click: "Copied").
- **Secondary links row:** LinkedIn, GitHub, [PLACEHOLDER: any other relevant
  — Twitter/X, Dribbble if relevant, resume/CV PDF download]. Style as
  icon+label pairs, mono labels, hairline-bordered pill buttons.
- Optional: current local time / timezone indicator (mono, small, e.g.
  `Jakarta, ID — 14:32 GMT+7`, live-updating) — nice authentic touch for a
  data-minded developer, low effort to implement, adds personality.

## Layout

- Centered, generous whitespace, max-width ~800px. This section should feel
  spacious/exhale after the density of Projects and Skills.
- Background: return to `--bg-void` with the soft violet radial glow from the
  hero reappearing behind the email link — visually bookends the page (hero
  glow → contact glow).

## Footer (directly below, same section or separate `<footer>`)

- Small mono copyright line: `© [year] Edward Geraldo Kristian`
- Optional "Back to top" link, mono, with an upward-arrow icon, scrolls to hero.
- Keep it minimal — no repeated nav links, no newsletter signup, no extraneous content.

## Interaction

- Email link: on hover, run the subtle CMYK jitter (consistent hover language)
  plus an underline that draws in from left.
- Copy button: icon morphs from copy-icon to checkmark for ~1.5s after click,
  small toast text "Copied to clipboard" fades in/out near the button (not a
  blocking modal).
