# 10 — Asset Sourcing

All assets must be free-to-use (with proper license check) or AI-generated —
per Edward's explicit preference, **do not** copy, reference, or derive assets
from the ThreeUI `kage.html` package (its WebP scene layers, fonts.css, or
three.min.js bundle). Everything below is sourced independently.

## Fonts (free, self-hostable)

- **Space Grotesk** — Google Fonts, OFL license. https://fonts.google.com/specimen/Space+Grotesk
- **Inter** — Google Fonts, OFL license. https://fonts.google.com/specimen/Inter
- **JetBrains Mono** — Google Fonts / JetBrains, OFL license. https://fonts.google.com/specimen/JetBrains+Mono

Download the woff2 files and self-host per `09-technical-architecture.md`
rather than linking Google's CDN.

## Textures / background layers

- **Grid/graph-line texture:** generate procedurally in CSS/SVG (a repeating
  `linear-gradient` grid pattern) rather than sourcing an image — this is more
  performant, infinitely scalable, and easy to recolor to `--violet-deep` at
  low opacity. No external asset needed.
- **Noise/grain overlay (optional, adds premium texture):** a small tileable
  SVG noise filter (`<feTurbulence>`) generated inline in CSS — again no
  external file needed. If a pre-made texture is preferred: Unsplash or
  Pexels ("grain texture", "noise texture" search) — verify license is free
  for commercial/personal portfolio use (Unsplash License / Pexels License
  both allow this).

## Photography (About section, if using a real photo)

- Use Edward's own photo — apply the duotone violet treatment described in
  `04-about-section.md` (this can be done with a CSS `filter` combination of
  `grayscale(1) contrast(1.1)` plus a `mix-blend-mode: color` overlay div in
  `--violet-mid`, or pre-processed once in an image editor for a crisper result).
- If a placeholder is needed before Edward supplies a photo: do **not** use a
  generic stock headshot (breaks authenticity). Use the abstract avatar
  alternative described in the About spec instead.

## Icons

- **Lucide Icons** (open source, MIT license, https://lucide.dev) — clean,
  thin-stroke line icons that suit the technical/mono aesthetic. Use for
  copy/checkmark, arrow, external-link, mail, and social icons (LinkedIn,
  GitHub logos are typically sourced as brand SVGs directly from each
  platform's official press/brand assets page to stay accurate).
- Avoid filled/rounded icon sets (e.g. generic "flat design" icon packs) —
  they clash with the precise/technical direction.

## 3D / generative hero centerpiece (if chosen)

- No external 3D model files needed — build the node-graph or wireframe
  geometry procedurally in Three.js (`THREE.IcosahedronGeometry`,
  `THREE.BufferGeometry` with generated point positions + `THREE.Line`/
  `THREE.Points`) rather than importing a model. This keeps the effect
  fully original, license-free, and small in file size.
- If an AI-generated static image is preferred instead of a live 3D scene:
  generate an abstract violet/black composition (e.g. "abstract wireframe
  network, deep violet and black, thin glowing lines, minimal, high
  contrast, 4k" as a starting prompt direction) using whatever image
  generation tool/skill is available in the target environment, then treat
  it as a background layer per the Hero spec.

## Project preview screenshots/recordings

- Real screenshots/screen-recordings of Edward's actual projects — no
  external sourcing needed, these must be authentic. For iOS projects,
  use the Simulator's built-in screenshot/recording tools for clean,
  device-framed captures; consider a subtle device-frame mockup (free
  frame assets: https://www.figma.com/community — search "device mockup
  free," verify individual asset license) to present iOS screens.

## License-check reminder for the agent

Whenever sourcing any asset not generated procedurally or by AI, the agent
must confirm the specific license (OFL for fonts; Unsplash/Pexels License
for stock imagery; MIT/OFL for icon sets) permits use in a personal
portfolio site, and should note the license + source URL in a comment or
`ASSETS.md` credit file if attribution is required or good practice.
