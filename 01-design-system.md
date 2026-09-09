# 01 — Design System

## 1. Color Palette

### Base
| Token | Hex | Use |
|---|---|---|
| `--bg-void` | `#0A0612` | Primary background, near-black violet |
| `--bg-panel` | `#130B22` | Card/panel backgrounds, section alternation |
| `--bg-panel-raised` | `#1C1130` | Hover/elevated panel state |
| `--border-hairline` | `#2A1B45` | 1px borders, dividers |

### Violet core
| Token | Hex | Use |
|---|---|---|
| `--violet-deep` | `#2E1065` | Gradient stops, glow bases |
| `--violet-mid` | `#4C1D95` | Secondary accents, active nav underline |
| `--violet-bright` | `#7C3AED` | Interactive highlights, link hover |

### CMYK glitch channels (used ONLY for the chromatic-split effect, never as flat fills)
| Token | Hex | Use |
|---|---|---|
| `--channel-cyan` | `#00F0FF` | Glitch offset layer (top/left shift) |
| `--channel-magenta` | `#FF2E9A` | Glitch offset layer (bottom/right shift) |
| `--channel-yellow` | `#FFE600` | Glitch offset layer (rare 3rd-channel accent, used sparingly — e.g. cursor blink, error/success states) |

### Text
| Token | Hex | Use |
|---|---|---|
| `--text-primary` | `#F4F1FA` | Headings, primary copy |
| `--text-secondary` | `#B3A3D6` | Body copy, muted labels |
| `--text-tertiary` | `#6B5B8A` | Captions, metadata, timestamps |

### Single hero accent (use sparingly — CTAs, active states, one hero element)
| Token | Hex | Use |
|---|---|---|
| `--accent` | `#FF2E9A` | Primary CTA, active nav dot, cursor |

**Rule:** 90% of the UI is `--bg-void` / `--bg-panel` / violet tones / text tones.
The CMYK channels and `--accent` are reserved for *moments* — hover states,
section transitions, the hero glitch treatment — never large fills. If a screen
looks "colorful" at a glance, that's wrong; it should look monochrome-violet
until something moves or is interacted with.

## 2. Typography

- **Display/Headings:** `Space Grotesk` (free, Google Fonts) — weights 500/700.
  Alternative if a licensed option is available: `Clash Display`.
- **Body:** `Inter` — weights 400/500.
- **Mono (labels, code snippets, data values, nav numbers):** `JetBrains Mono` —
  weights 400/500.

### Scale (desktop / mobile)
| Role | Desktop | Mobile | Font | Weight | Letter-spacing |
|---|---|---|---|---|---|
| Hero H1 | 88px / 1.0 | 44px / 1.05 | Space Grotesk | 700 | -0.02em |
| Section H2 | 48px / 1.1 | 32px / 1.15 | Space Grotesk | 700 | -0.015em |
| Card title (H3) | 22px | 19px | Space Grotesk | 500 | -0.01em |
| Body | 17px / 1.6 | 16px / 1.6 | Inter | 400 | 0 |
| Small/meta | 13px | 12px | JetBrains Mono | 400 | 0.02em |
| Nav label | 13px | — | JetBrains Mono | 500 | 0.08em, uppercase |

## 3. Spacing & Grid

- Base unit: **8px**. All spacing is a multiple of it (8/16/24/32/48/64/96/128).
- Max content width: **1200px**, centered, with 24px side gutter on mobile, 64px on desktop.
- Section vertical padding: **160px** desktop / **96px** mobile (top and bottom).
- 12-column grid for desktop layout (projects grid, skills grid); single column stacked on mobile below 768px.

## 4. The CMYK Glitch Motif — Visual Rules

This is the site's signature and should read as **"data render artifact"**, not
"broken screen" or "80s VHS." Think: the moment a shader compiles, or a value
misaligns for one frame before snapping into place.

- **Where it appears:** hero name/title on load, section headings on scroll-into-view
  (once, not looping), interactive hover on project cards and nav links, page-section
  transition boundaries.
- **How it works technically:** duplicate the text/element 2–3 times, offset each
  copy by 2–6px on X/Y, tint each with `mix-blend-mode: screen` using cyan/magenta
  (and rarely yellow), then animate the offset back to 0 over 180–280ms with an
  `ease-out` curve. On hover states it can be a continuous subtle 1–2px jitter,
  not the full separation.
- **Frequency discipline:** the full separation effect should be rare and purposeful
  — it marks a *state change* (page load, new section entering, hover intent).
  It must never be ambient/looping in the background, or it reads as a bug rather
  than a design decision.
- **Never** apply it to body paragraph text (readability), form inputs, or more
  than one element at a time.

## 5. Iconography & Motifs

Use these instead of generic dev-portfolio clichés (no matrix rain, no literal robot/AI head, no floating laptop mockup as the hero centerpiece):

- Thin (1px) node-graph / dependency-graph line art — good for background texture
  and the About section.
- Grid/graph-paper lines at very low opacity (4–8%) as a background layer, subtly
  parallaxing.
- A blinking terminal-style cursor (`█` block, monospace, `--accent` color) used as
  a recurring small motif — e.g. next to the hero title, next to section numbers.
- Section numbers formatted like array/object indices in mono font: `[00] Hero`,
  `[01] About`, `[02] Projects`, `[03] Skills`, `[04] Contact` — reinforces the
  developer identity in the nav and section headers.

## 6. Radii, Shadows, Borders

- Border radius: **4px** for buttons/inputs, **12px** for cards. Sharp corners
  elsewhere — avoid overly rounded "friendly SaaS" shapes; keep it precise/technical.
- No drop shadows for depth — use **1px hairline borders** (`--border-hairline`)
  plus subtle background elevation (`--bg-panel` → `--bg-panel-raised`) instead.
  A single soft violet glow (`box-shadow: 0 0 60px rgba(124,58,237,0.15)`) is
  allowed behind the hero centerpiece only.
