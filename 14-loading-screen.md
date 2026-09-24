# 14 — Loading Screen `[SYS.BOOT]`

## Goal

Create a minimal, atmospheric preloader sequence inspired by industrial cyber terminals. It acts as an intentional 1.2s–1.8s "system compilation" stage that initializes canvas assets, fonts, and scroll observers before transitioning smoothly into the Hero section.

## Visual Reference & Anatomy

Based on industrial CRT/telemetry boot sequences:
- **Background:** Strict `--bg-void` (`#0A0612`) with an ultra-subtle, repeating scanline texture (`2px` pitch, 4% opacity) and low-opacity graph grid lines (4%).
- **Centerpiece:** Monospace counter percentage (`00%` to `100%`) running an erratic CMYK chromatic-aberration channel split, anchored by an expanding horizontal gauge bar.
- **Peripheral HUD Elements:** Four tiny monospace telemetry anchors positioned in the viewport corners:
  - Top-Center: Stylized crosshair/node icon (subtle `--text-tertiary` `#6B5B8A`).
  - Bottom-Left: Boot status index `SYS.INIT // EGK_KERNEL_V1.4`.
  - Bottom-Right: Frame timing / execution tick (e.g. `TICKS: 60FPS // 127.0.0.1`).
  - Bottom-Center: Row of 4–5 micro abstract glyphs/status icons (`✦ ⬡ ⨁ ⏣`).

## Layout & Architecture

- **Wrapper:** Fixed, full-screen overlay (`fixed inset-0 z-[9999] bg-[var(--bg-void)] flex flex-col justify-between p-6 sm:p-10 pointer-events-none`).
- **Typography:**
  - Center Counter: `JetBrains Mono`, 500 weight, `text-2xl sm:text-4xl`, tracking tight.
  - HUD Readouts: `JetBrains Mono`, 400 weight, `text-[11px] sm:text-[12px] text-[var(--text-tertiary)]`.

## Counter & Gauge Behavior

1. **Progress Sequence (0% → 100%):**
   - The counter animates rapidly from `00%` to `100%` over 1200ms–1600ms using non-linear easing (fast burst → slight stall at 68%–84% simulating shader compilation → quick snap to 100%).
2. **Gauge Bar:**
   - A thin horizontal rule (`2px` height) sits to the left of (or directly underneath) the percentage numerals.
   - Background track: `--border-hairline` (`#2A1B45`).
   - Active fill: `--channel-magenta` / `--accent` (`#FF2E9A`) or a violet gradient (`--violet-mid` to `--violet-bright`), expanding proportionally with the counter.
3. **Chromatic Aberration (Glitch Effect):**
   - The central percentage text uses dual pseudo-elements or offset cloned spans with `mix-blend-mode: screen`.
   - As numbers increment, apply an erratic 1–3px horizontal CMYK jitter:
     - Red/Magenta layer offset by `+2px, 0` (`#FF2E9A`)
     - Cyan layer offset by `-2px, 0` (`#00F0FF`)
   - The jitter intensifies during the stall phase and snaps back to pure `--text-primary` (`#F4F1FA`) at exactly `100%`.

## Exit & Reveal Choreography

Once the counter strikes `100%`:
1. **Hold Frame (120ms):** The text snaps solid white/primary, displaying `100% // READY`.
2. **Shutter Wipe / Fade Out (400ms):**
   - The loader splits vertically (top half translates `-100% Y`, bottom half translates `+100% Y`), OR smoothly dissolves with `opacity: 0; filter: brightness(1.5); transition: opacity 400ms ease-out;`.
3. **Hero Handoff:**
   - Unlocks document scroll (`overflow: auto`).
   - Dispatches a `boot-complete` event that triggers the hero headline glitch sequence and node graph initialization.
   - Unmounts the loading component from the DOM completely to free memory.

## Fallback & Performance
- Enforce a strict timeout: if assets or models take longer than 2.0s to respond, force the counter to jump to 100% and dismiss the screen immediately.
- Honor `prefers-reduced-motion`: skip jitter offsets and display a simple linear opacity fade.
