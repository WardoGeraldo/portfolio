# 05 — Projects Section `[02]`

## Goal

An expansive, interactive, scroll-driven 3D Cyber Shelf / Cover Flow. The active card expands to command the center viewport—aligned flush with the section header container margins—while preserving the 3D curved horizontal shelf mechanics. The interior of each card is split into a high-density technical console and a custom interactive visual stage.

**NON-NEGOTIABLE PERFORMANCE & CLARITY RULES:**
- **Zero CSS Blur:** Never apply `filter: blur()` or backdrop blurs to any card or text. Every element must remain razor-sharp and readable at all times.
- **Hardware-Accelerated 3D Transforms Only:** Rely strictly on pure CSS 3D (`perspective: 1400px`, `transform: translate3d(...) rotateY(...)`). Do NOT use Three.js, canvas, or WebGL.
- **Continuous Sharp Rendering:** Use CSS opacity (`opacity: 0.35` to `1.0`) and scale (`0.90` to `1.0`) for depth hierarchy, never blur filters.

## Stage Sizing & Container Alignment

- **Container Alignment:** The active card must align with the left and right layout margins of the `[02] // Projects` and `Featured Case Files.` headers above it.
- **Dimensions:** Active card width set to `min-w-[80vw]` (capped at `max-w-6xl`) and `min-h-[520px]` to fill the vertical breathing room symmetrically.
- **Pinned Track:** Outer container `height: 300vh` with inner container `position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: center;`.

## 3D Shelf Mechanics (Curved Rail)

- **Perspective Stage:** Wrap the track in a container with `perspective: 1400px; transform-style: preserve-3d;`.
- **Horizontal Rail Track:**
  - Cards arranged in a row with generous spacing (`display: flex; gap: 6rem; align-items: center;`).
  - As scroll progress transitions ($0 \to 1$), map scroll progress directly to horizontal translation so the active card centers in the viewport.
- **Card Angle & Depth Interpolation:**
  - **Center (Active) Card:** `transform: translateZ(80px) rotateY(0deg) scale(1); opacity: 1; border-color: var(--violet-bright); box-shadow: 0 0 40px -10px rgba(168, 85, 247, 0.25);`
  - **Left (Past) Cards:** `transform: translateZ(-100px) rotateY(20deg) scale(0.90); opacity: 0.35;`
  - **Right (Upcoming) Cards:** `transform: translateZ(-100px) rotateY(-20deg) scale(0.90); opacity: 0.35;`
- **Transitions:** Smooth interpolation via scroll-listener or CSS spring transitions. Zero blur filters.

## Split Dossier Card Layout (2-Column Console)

Each card uses `--bg-panel-raised` with a hairline border, corner `+` crosshair accents, and a 12-column sub-grid (`grid grid-cols-12 gap-8 p-8`):

### Left Side (5 Cols) — Technical Specification & Controls
- **Header Meta Bar:** Category badge (`[IOS] // CASE // 001`), deployment status indicator with green pulsating dot (`APP STORE DEPLOYED`), and performance telemetry chip (`LATENCY: <10ms`).
- **Title & Overview:** High-contrast header with concise technical synopsis (problem statement and architecture solution).
- **Core Architecture Specs:** Key feats listed as terminal bullet chips (e.g., "SwiftData Local Cache", "Heuristic Decision Matrix", "Async Await Concurrency").
- **Compiled Tech Stack:** Monospace pill tags with subtle cyan accent borders.
- **Action Matrix:** High-visibility primary button (`LIVE DEMO / APP STORE` with directional arrow) and ghost button (`SOURCE CODE`).

### Right Side (7 Cols) — Interactive Visual Telemetry Stage
A rich visual stage customized per project:
- **Case 01 — Singaplan:** Holographic mobile itinerary simulator. Displays a dynamic UI card mockup showing live GPS coordinates (`1.35°N 103.82°E`), a styled travel route timeline with animated connection pulses, and decision filter metrics.
- **Case 02 — QueueEase:** Live operational queue terminal. Visualizes active ticket numbers streaming, counter status indicators (`COUNTER 01: ACTIVE`), and an animated throughput load graph.
- **Case 03 — LilzBake Analytics:** Live data-pipeline visualizer. Displays SVG telemetry bar charts, sales velocity sparklines, and ingestion node graphs with monospace KPI chips (`+38.4% VELOCITY`).

## Micro-Interactions & Styling
- Hovering the visual stage triggers a momentary CMYK RGB channel-split twitch.
- Status indicator dots pulse continuously using CSS keyframes.
- Inactive cards brighten on hover to `opacity: 0.7` and slightly ease their rotation angle toward the camera.
