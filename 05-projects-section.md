# 05 — Projects Section `[02]`

## Goal

An interactive, scroll-driven 3D Cyber Shelf / Cover Flow. As the user scrolls vertically, the stage pins and slides cards along a curved 3D horizontal rail (`translateX` + `rotateY` + `translateZ`). The active card faces straight ahead at full brightness, while neighboring cards angle slightly away like volumes on an illuminated holographic shelf.

**NON-NEGOTIABLE PERFORMANCE & CLARITY RULES:**
- **Zero CSS Blur:** Never apply `filter: blur()` or backdrop blurs to any card, active or inactive. Every card must remain razor-sharp and readable at all times.
- **Hardware-Accelerated 3D Transforms Only:** Use pure CSS 3D (`perspective: 1200px`, `transform: translate3d(...) rotateY(...)`). Do NOT use Three.js, canvas, or WebGL.
- **Continuous Sharp Text:** Use CSS opacity (`opacity: 0.4` to `1.0`) and scale (`0.85` to `1.0`) for depth hierarchy, never blur filters.

## Content Structure

Retain the existing card data model and terminal styling currently rendered:

1. **Singaplan**
   - Type: iOS // CASE // 001
   - Title: Singaplan — Travel Itinerary Engine
   - Stack: `Swift` `SwiftUI` `SwiftData` `CoreLocation` `MapKit`
   - Telemetry/Status: `APP STORE DEPLOYED`, `Sub-10ms Filter`

2. **QueueEase**
   - Type: Web // CASE // 002
   - Title: QueueEase — Digital Queue Platform
   - Stack: `TypeScript` `React` `Next.js` `TailwindCSS`
   - Telemetry/Status: `PRODUCTION LIVE`

3. **LilzBake Analytics**
   - Type: Data // CASE // 003
   - Title: LilzBake Analytics — Bakery Telemetry
   - Stack: `Python` `Pandas` `FastAPI` `SQL`
   - Telemetry/Status: `ENGAGEMENT PIPELINE`

## 3D Shelf Mechanics (Curved Rail)

- **Pinned Viewport:** Outer container `height: 300vh` with inner container `position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center;`.
- **Perspective Stage:** Wrap the track in a container with `perspective: 1200px; transform-style: preserve-3d;`.
- **3D Horizontal Rail Track:**
  - Cards are arranged in a horizontal row (`display: flex; gap: 4rem;`).
  - As scroll progress changes ($0 \to 1$), the track translates horizontally along the X-axis so each project centers in the viewport.
- **Card Angle & Depth Calculations:**
  - **Center (Active) Card:** `transform: translateZ(60px) rotateY(0deg) scale(1); opacity: 1; border-color: var(--violet-bright);`
  - **Left (Past) Cards:** `transform: translateZ(-80px) rotateY(25deg) scale(0.88); opacity: 0.5;`
  - **Right (Upcoming) Cards:** `transform: translateZ(-80px) rotateY(-25deg) scale(0.88); opacity: 0.5;`
- **Transitions:** Smooth interpolation via scroll-listener or CSS spring transitions. No blur filters anywhere.

## Visual Styling
- Preserve all existing terminal UI elements: badge headers, status indicators, live telemetry chips, and monospace data readouts.
- Hovering any visible card transitions it to `opacity: 0.9` and highlights its hairline border.
