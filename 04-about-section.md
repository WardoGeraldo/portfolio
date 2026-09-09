# 04 — About Section `[01]`

## Goal

Establish Edward's dual identity as an iOS/Web developer and data analyst. The layout must feel like an advanced cybernetic diagnostics dashboard: a holographic glitch portrait on the left, and an interactive telemetry overview with an embedded "EGK Core" HUD on the right.

## Layout & Architecture

Two-column asymmetric cyber grid (`grid-cols-12 gap-8 items-stretch`):

### Left Column (5 Cols) — Viewfinder Glitch Portrait
- **Image Source:** `/public/assets/edward-portrait.jpg` (with elegant fallback if not yet uploaded).
- **Styling & Cybernetic Treatments:**
  - Duotone violet color grade: shadows to `--bg-void`, highlights to `--text-primary`, midtones to `--violet-bright`.
  - Corner-bracket target HUD (`┌ ┐ └ ┘`) with telemetry readouts (`SYS.SCAN // 01`, `LAT: -6.2088`, `CALIBRATED 99.8%`).
  - Subtle animated scanline overlay (`repeating-linear-gradient`).
- **Interactive Glitch:**
  - On hover or periodic interval: CMYK RGB channel-split twitch (`clip-path` horizontal slice offset) + vertical laser sweep animation.

### Right Column (7 Cols) — "Identity Core" & Dual Telemetry Deck

Instead of a plain block of paragraphs, structure the right column into three distinct visual tiers:

#### Tier 1: Identity Core & Lead Header (Flex Row)
- **Embedded EGK Core:** Re-purpose the circular EGK radar badge into an active system status node (approx. 90px–110px diameter) placed adjacent to the header copy.
  - Rotating concentric ring with subtle pulse animation.
  - Telemetry ping dot synced with live system heartbeat.
- **Lead Statement:**
  "iOS & Full-Stack Engineer bridging tactile native interfaces with telemetry-driven web architectures."

#### Tier 2: Dual Discipline Modules (2-Column Sub-Grid)
Two interactive cyber cards with hairline borders (`--bg-panel-raised`):
- **Deck `// 01 ARCHITECTURE` (Mobile & Web Craft):**
  - High-performance Swift concurrency, SwiftUI component trees, and reactive web applications.
  - Focus on native ergonomics, sub-frame response, and modular systems.
- **Deck `// 02 RIGOR` (Empirical Data Analysis):**
  - Telemetry-backed engineering, large-scale dataset pipelines, and algorithmic optimization.
  - Eliminating guesswork through predictive analytics and quantitative validation.

#### Tier 3: Philosophy Chip & Live Metrics
- **Philosophy Chip:** Monospace terminal quote in `--accent`:
  `"Code with architectural intent. Data with empirical rigor."`
- **Metric HUD Row:**
  - `3+` Apps Shipped
  - `14+` Datasets Analyzed
  - `50k+` Data Points Processed
  - Large mono numerals with smooth count-up scroll-trigger animation.

## Micro-Interactions
- Hovering the EGK Core speeds up its orbital ring rotation.
- Hovering either discipline deck triggers a momentary CMYK border flicker.
- Metric counter scrolls up from 0 when entering viewport.
