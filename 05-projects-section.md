# 05 — Projects Section `[02]`

## Goal

Interactive 3D Cyber Shelf with expansive cards aligned to the header margins. The left side provides technical architecture details; the right side showcases a high-fidelity, completely unprocessed screenshot of the actual project framed inside a futuristic chassis.

**NON-NEGOTIABLE CLARITY & FIDELITY RULES:**
- **Zero Effects on Project Imagery:** The actual screenshot/image must NEVER have CSS filters, duotone grading, blurs, saturation changes, or glitch overlays. It must remain 100% natural, crisp, and true to the original app/web UI.
- **Zero Text Blurs:** Retain zero `filter: blur()` across all cards and typography.
- **Hardware-Accelerated 3D Transforms Only:** Pure CSS 3D (`perspective: 1400px`, `transform: translate3d(...) rotateY(...)`).

## Stage & Shelf Geometry

- **Alignment:** The active card remains centered and aligned flush with the left and right layout margins of the `[02] // Projects` and `Featured Case Files.` headers.
- **Dimensions:** Active card width: `min-w-[80vw]` (capped at `max-w-6xl`), minimum height: `min-h-[540px]`.
- **Pinned Track:** Outer container `height: 300vh` with inner container `position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: center;`.
- **Rail Interpolation:**
  - **Active Center:** `transform: translateZ(80px) rotateY(0deg) scale(1); opacity: 1; border-color: var(--violet-bright);`
  - **Left/Right Inactive:** `transform: translateZ(-100px) rotateY(±20deg) scale(0.90); opacity: 0.35;`

## Card Architecture — Split Cyber Dossier

Every card is structured as a 12-column engineering console (`grid grid-cols-12 gap-8 p-8 items-center`):

### Left Side (5 Cols) — Technical Specifications & Actions
- **Header Meta Bar:** Category tag (e.g. `[IOS] // CASE // 001`), live status indicator (`APP STORE DEPLOYED`), and performance telemetry chip (`LATENCY: <10ms`).
- **Title & Overview:** High-contrast title followed by the technical synopsis.
- **Core Architecture Specs:** Bullet chips detailing engineering highlights (e.g., "SwiftData Local Cache & Offline State", "Heuristic Multi-Criteria Decision Solver", "Async/Await Concurrency").
- **Compiled Tech Stack:** Monospace pill badges with subtle cyan border accents.
- **Action Matrix:** High-visibility primary button (`APP STORE` or `LIVE DEMO`) and ghost button (`SOURCE CODE`).

### Right Side (7 Cols) — Clean Screenshot in Futuristic Frame Chassis
Replace the simulated telemetry code block with a dedicated image display chassis:
- **Project Image Assets:**
  - **Case 01 (Singaplan):** `/public/assets/projects/singaplan-preview.png` (iOS app preview)
  - **Case 02 (QueueEase):** `/public/assets/projects/queueease-preview.png` (Web platform preview)
  - **Case 03 (LilzBake):** `/public/assets/projects/lilzbake-preview.png` (Data dashboard preview)
  *(If the file is not yet uploaded, use a styled placeholder frame with an image icon).*
- **Clean Image Rule:** Rendered using standard `<img />` or `next/image` with `object-fit: cover` or `object-fit: contain`. **Strictly NO filters, tints, duotones, scanlines, or glitches over the image.**
- **Futuristic Chassis (Behind & Around the Image):**
  - Surrounding cyber border: `--border-hairline` with corner crosshairs or target brackets (`┌ ┐ └ ┘`).
  - Top chassis bar: Monospace metadata label (`DISPLAY_PORT // 01`, resolution tag `1920x1080_RAW`, signal indicator).
  - Subtle drop shadow / ambient neon backlight (`box-shadow: 0 0 30px -10px rgba(168, 85, 247, 0.2)`).

## Micro-Interactions
- Hovering the chassis creates a subtle elevation lift (`translateY(-2px)`) and slightly brightens the surrounding hairline frame.
- The image itself stays clean and undisturbed on hover.
