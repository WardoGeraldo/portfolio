# PROGRESS.md — Build Log & Session Handoff

**Read this file FIRST, before README.md or any spec file, at the start of
every session.** It tells you exactly what's already built, what decisions
have already been made (don't re-litigate them), and what to do next.

**Update this file continuously — not just at the end of a session.** Update
it the moment you finish a meaningful chunk of work (a component, a phase, a
decision made, a question resolved), and again before ending every session,
even if the user hasn't explicitly asked. Sessions can be cut off by time/
usage limits without warning, so don't save all your logging for a "wrap up"
step that might never happen. Append entries under the current phase (or
start a new phase section) following the template at the bottom of this
file. This is what lets a fresh session (new context window, new 5-hour
block) pick up exactly where the last one left off without the user having
to re-explain anything.

---

## Current status

**Project:** `edward-portfolio/` (Vite + React + TypeScript + Tailwind CSS v4)
**Active phase:** Complete — All phases (1–6) built, verified, and audited (with 2.5D CSS Cyber Shelf Projects pivot)
**Last updated:** 2026-09-08T15:45 — 2.5D CSS Cyber Shelf implemented, verified across breakpoints, and audited

| Phase | Status | Notes |
|---|---|---|
| 1 — Foundation | ✅ Done | scaffold, tokens, fonts, app shell |
| 2 — Hero (`11-hero-scroll-scrub.md`) | ✅ Done | scroll-scrub, Three.js canvas, glitch entrance, story cards |
| 3 — Header/nav (`02-navigation-header.md`) | ✅ Done | fixed header, nav links, active section, progress bar, mobile overlay, hide-on-scroll |
| 4 — Remaining sections (04–07) | ✅ Done | About, Projects (2.5D CSS Cyber Shelf), Skills (matrix), Contact (timezone/copy), Footer |
| 5 — Motion + accessibility pass | ✅ Done | ui-ux-pro-max accessibility/QA cross-check, inView stagger, keyboard tabs, precision cursor |
| 6 — Performance pass | ✅ Done | bundle budgets (76.99KB gzip JS, 10.05KB gzip CSS), Three.js lazy-loaded, zero TS errors |

**Legend:** ⏳ not started · 🔧 in progress · ✅ done · ⚠️ done with open questions · ❌ blocked

---

## Locked decisions (do not re-ask or redo these)

Decisions already made and resolved — treat as final unless the user
explicitly says to change them.

1. **Variable fonts:** Inter and JetBrains Mono are used as single variable
   woff2 files covering weights 400–500 (`font-weight: 400 500` in
   `@font-face`), not separate per-weight files. Space Grotesk uses two
   separate static files (Medium 500, Bold 700) since 700 is needed for
   headings and Google's variable file didn't cover it cleanly.
2. **Tailwind v4:** using native `@theme` blocks in `index.css`, not
   `tailwind.config.js` (v4 convention). All design-system tokens are
   registered as Tailwind theme values AND as raw CSS custom properties in
   `tokens.css`, so both utility classes (`bg-void`, `text-text-primary`,
   `font-mono`, `rounded-card`) and direct `var(--token)` usage work.
3. **Breakpoints:** all 5 from `09-technical-architecture.md` are registered
   in the Tailwind theme, but typography mobile-overrides use a single
   `max-width: 767px` query (matches spec's "single column below 768px"
   rule) rather than a distinct rule per breakpoint.
4. **Hero implementation:** `11-hero-scroll-scrub.md` is authoritative and
   supersedes the simpler centerpiece options in `03-hero-section.md`.
5. **Hero canvas rendering: Three.js**, not plain 2D canvas. Chosen for real
   depth/lighting on the node-graph/wireframe motif — worth the extra weight
   since the hero is the single highest-leverage section on the site. Lazy-
   load the Three.js bundle (dynamic `import()`) per `09-technical-
   architecture.md` so it doesn't block first paint of the name/title text;
   text renders immediately, canvas fades in once the scene is ready.
6. **ui-ux-pro-max skill:** installed for Phases 5–6 use only (accessibility/
   QA cross-check), per `12-ui-ux-pro-max-usage.md`. Its auto design-system
   generator (`--design-system`) is explicitly NOT to be used — our design
   system in `01-design-system.md` is final and already partially built.
7. **Projects implementation: 2.5D CSS Cyber Shelf (`05-projects-section.md`)**,
   not WebGL / Three.js or ThreeUI component. Pure hardware-accelerated CSS 3D
   transforms (`perspective: 1200px`, `translate3d`, `rotateX`, `scale`, `blur`,
   `opacity`) driven by scroll progress. Zero WebGL overhead in Projects section.
   Includes accessible tabbed fallback for `prefers-reduced-motion`.

---

## Open questions for the user

Running list — the agent should add to this whenever it hits a genuine
ambiguity the spec doesn't resolve, instead of guessing silently. The user
should answer these here (or in chat, then have the agent transcribe the
answer here) so future sessions don't hit the same question twice.

- [ ] Beat copy for the 4 hero story cards (Build/Analyze/Craft/Ship) —
      still placeholder text from `11-hero-scroll-scrub.md`
- [ ] About section bio copy, stats, and photo — still placeholder
- [x] Real project list — mapped to Singaplan (iOS), QueueEase (Web), and
      LilzBake Analytics (Data) per `05-projects-section.md`
- [ ] Contact links (email, LinkedIn, GitHub, resume PDF)
- [ ] Contact links (email, LinkedIn, GitHub, resume PDF)
- [ ] **Visual QA debt:** Phases 1–2 (Foundation, Hero) and any of Phase 3 done
      so far were built before `13-visual-qa-protocol.md` existed. Run the
      protocol against everything built to date before continuing forward —
      user has flagged the current layout as inconsistent/rough, so this is
      not optional cleanup, it's the immediate next action.

---

## Phase log

### Phase 1 — Foundation — ✅ Done

**Built:**
- Vite + React + TypeScript scaffold at `edward-portfolio/`
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Design tokens from `01-design-system.md` implemented in `tokens.css`
  (CSS custom properties) + `index.css` `@theme` block (Tailwind mapping) —
  full coverage: backgrounds, violet core, CMYK channels, text scale, accent,
  8px spacing grid, radii, header heights, easing, hero glow shadow
- Typography utility classes: `.text-hero-h1`, `.text-section-h2`,
  `.text-card-h3`, `.text-body`, `.text-small-meta`, `.text-nav-label`
- Self-hosted fonts (Space Grotesk 500/700, Inter 400–500 variable,
  JetBrains Mono 400–500 variable), `font-display: swap`, critical fonts
  preloaded in `index.html`, no Google Fonts CDN dependency
- App shell (`App.tsx`): sticky header w/ EGK wordmark, hero w/ real name/
  title/kicker/CTAs/grid motif/glow, About/Projects/Skills/Contact section
  placeholders with `[0X]` indexing, correct bg alternation
  (void→panel→void→void+grid→void), footer, semantic HTML throughout,
  global focus ring (2px accent, 2px offset)
- Global styles: `prefers-reduced-motion` disables smooth scroll, procedural
  `.bg-grid` (CSS only, no image), custom scrollbar, violet `::selection`,
  `.section-container` layout helper

**Deviations/decisions:** see Locked Decisions #1–#3 above.

**Build output:** 194 KB JS / 61 KB gzipped (under 150 KB gzip budget from
spec — actually check this against `09-technical-architecture.md`'s 150KB
*gzipped* target before Phase 6; current gzip figure is compliant), 15 KB
CSS / 4 KB gzipped.

**Next:** Phase 2 — Hero, per `11-hero-scroll-scrub.md`. Canvas approach is
now locked (Three.js, see Locked Decisions #5) — proceed straight to
building, no need to re-decide.

---

### Phase 2 — Hero — ✅ Done (pending user review)

**Built:**
- **Hero scroll-scrub component** (`src/components/Hero/Hero.tsx`) — full
  implementation of `11-hero-scroll-scrub.md`:
  - 400vh scroll spacer with `position: sticky; top: 0; height: 100svh` stage
  - Eased-follow scroll progress (`displayProgress += (target - display) * 0.28`)
  - 4 story cards (Build/Analyze/Craft/Ship) with per-beat color, progress
    ticks (`scaleX` fill), index numbers, icon glyphs, descriptions
  - All 4 cards always in DOM (opacity/translate toggle, not mount/unmount)
    for accessibility — keyboard/screen-reader can reach all content
  - Subtitle fades out on first scroll (`subHidden` state per spec)
  - Scroll affordance ("scroll" + blinking `█` cursor) at bottom center,
    fades out after first scroll
- **CMYK glitch-resolve entrance** (`src/components/shared/GlitchText.tsx`) —
  3-layer text: cyan offset, magenta offset, base. Converges over 400ms with
  expo ease-out. Staggered 80ms between name and title. `aria-hidden` on
  decorative layers. Also exports `useGlitchHover()` for future hover effects.
- **Three.js node-graph scene** (`src/components/Hero/NodeGraphScene.ts`) —
  80 procedural nodes on a sphere, connected by distance-based edges,
  additive-blended for glow. Progress drives: rotation, camera pull-in,
  connection density (sparse→dense), per-beat color tint (cyan→magenta→
  violet→full CMYK split with ghost offset layers). Lazy-loaded via
  `HeroCanvas.tsx` so text renders instantly, canvas fades in after.
- **Scroll scrub hook** (`src/hooks/useScrollScrub.ts`) — rAF-based loop
  with passive scroll listener and eased-follow logic from the spec.
- **Reduced motion hook** (`src/hooks/useReducedMotion.ts`) — reactive
  `matchMedia` wrapper for `(prefers-reduced-motion: reduce)`.

**prefers-reduced-motion behavior:**
- Scroll-scrub disabled entirely — no pinning, no 400vh spacer
- Hero renders as a static section at beat-1 state
- All 4 cards shown stacked below the name as a 2-column grid
- GlitchText shows text with no animation (or 150ms opacity fade)
- Canvas does not load

**Build output:**
- Main JS: 205 KB / 64 KB gzipped (under budget)
- HeroCanvas chunk: 525 KB / 131 KB gzipped (Three.js, lazy-loaded)
- CSS: 23 KB / 5.4 KB gzipped
- Zero TypeScript errors

**Deviations/decisions:**
1. Used CSS grid `[&>*]:col-start-1 [&>*]:row-start-1` to stack story cards
   on top of each other (only active one visible via opacity) rather than
   absolute positioning — keeps the container's height driven by content.
2. Keyframes for GlitchText injected at runtime via a singleton `<style>`
   element, keeping the component self-contained (no separate CSS file).
3. Beat 4's CMYK split effect uses separate cyan/magenta ghost `LineSegments`
   and `Points` meshes offset in the Three.js scene, not CSS — this gives a
   more convincing 3D chromatic aberration than 2D CSS offsets could.

**Open questions raised this phase:**
- None new (existing placeholder questions in the Open Questions section
  still apply — beat copy, about bio, project list, contact links).

**Next:** Phase 3 — Header/nav, per `02-navigation-header.md`.

---

### Phase 3 — Header/nav — ✅ Done

**Built:**
- **`useActiveSection` hook** (`src/hooks/useActiveSection.ts`) —
  `IntersectionObserver` with rootMargin `'-40% 0px -50% 0px'` and multiple
  thresholds to detect which section is centered in the viewport. Returns the
  active section id. Tracks the section with the highest intersection ratio
  when multiple are visible.
- **`useScrollDirection` hook** (`src/hooks/useScrollDirection.ts`) — rAF-
  throttled scroll listener that tracks scroll direction and provides
  `isHeaderHidden` boolean (true when scrolling down past 80px threshold).
  Respects `prefers-reduced-motion` — header never hides when motion is
  reduced (per spec).
- **`useScrollProgress` hook** (`src/hooks/useScrollProgress.ts`) — returns
  total page scroll as 0–1 for the progress bar.
- **`Header` component** (`src/components/Header/Header.tsx`) — full
  implementation of `02-navigation-header.md`:
  - `position: fixed` header, 72px desktop / 56px mobile
  - Transparent over hero, transitions to `--bg-void` at 85% opacity with
    `backdrop-blur(12px)` + hairline border after scrolling past 80px
  - **Wordmark:** `EGK` using `GlitchText` with `hoverGlitch` for CMYK
    jitter on hover, acts as scroll-to-top link
  - **Desktop nav:** `[01] About  [02] Projects  [03] Skills  [04] Contact`
    in mono font with active state: text → `--text-primary`, index → `--accent`,
    sliding 2px underline indicator (animated via `transform: translateX()`,
    250ms ease-out)
  - **CTA button:** "Let's talk" with `--accent` bg, jump-links to `#contact`
  - **Scroll progress bar:** 2px at top edge, violet→accent gradient, `scaleX`
    driven by scroll progress (accessible `role="progressbar"`)
  - **Hide-on-scroll-down:** header `translateY(-100%)` when scrolling down
    past hero, reveals on scroll-up (350ms ease-out-expo transition)
  - **Mobile:** hamburger (3 bars → X animated transform), full-screen overlay
    at 98% `--bg-void` opacity, 28px mono nav items with staggered entrance
    (60ms per item), Escape key closes, body scroll locked when open
  - Smooth scroll on nav click; instant jump when `prefers-reduced-motion`
- **Barrel export** (`src/components/Header/index.ts`)
- **App.tsx:** replaced placeholder `<header>` with `<Header />` component

**Also fixed (pre-existing from Phase 2):**
- Removed unused `handleProgressUpdate` callback and `useCallback` import from
  `Hero.tsx` (was causing TS6133 warning)

**Accessibility:**
- `<nav>` with `<ul>`/`<li>` list of anchor links (`href="#section"`)
- `aria-label` on both desktop and mobile nav
- `aria-current="true"` on active nav item
- `aria-expanded` + `aria-controls` on hamburger button
- `tabIndex={-1}` on mobile nav links when overlay is closed
- Focus trap: Escape closes mobile menu, returns focus to hamburger
- Visible focus ring (2px `--accent`, 2px offset) via global `:focus-visible`
- `prefers-reduced-motion`: no header hide/show translate, no smooth scroll,
  no staggered mobile nav entrance, instant overlay open/close

**Build output:**
- Main JS: 213 KB / 66 KB gzipped (under 150 KB gzip budget)
- CSS: 25.5 KB / 5.8 KB gzipped
- Zero TypeScript errors

**Deviations/decisions:**
1. Header is `position: fixed` (not `sticky`) so it can hide/reveal via
   `translateY(-100%)` — sticky headers can't translate off-screen. The hero
   already uses its own 400vh scroll spacer with a sticky stage, so there's no
   overlap issue.
2. Sliding underline uses `width: 25%` per nav item (evenly split) with
   `translateX(N * 100%)` rather than measuring real DOM widths — keeps it
   pure CSS-driven without `useRef` measurements.
3. Mobile menu uses inline styles for staggered entrance rather than a
   CSS animation library — zero extra dependencies.

**Open questions raised this phase:**
- None new.

**Next:** Phase 4 — Remaining sections (About, Projects, Skills, Contact), per
`04-about-section.md`, `05-projects-section.md`, `06-skills-section.md`,
`07-contact-section.md`.

---

### Visual QA Pass (`13-visual-qa-protocol.md`) — ✅ Done & Fixed

**Audit Date:** 2026-09-08
**Tested Breakpoints:** 375px (Mobile), 768px (Tablet), 1024px (Desktop), 1440px (Desktop-LG)
**Capture Method:** Automated headless Chrome run via Puppeteer-Core, capturing initial paint, mid-scroll hero, full-page scroll, mobile menu overlay, and `prefers-reduced-motion` states.

**Critical Issues Identified & Fixed:**
1. **Destructive CSS Reset (`index.css`):**
   - *Issue:* An unlayered `*, *::before, *::after { margin: 0; padding: 0; }` rule had been placed outside `@layer` blocks, causing native CSS cascade layer precedence to wipe out all Tailwind v4 utility classes for padding (`px-*`, `py-*`, `p-*`) and margin (`mx-auto`, `my-*`, `mb-*`). This resulted in 0 padding on CTA buttons, collapsed nav items, and destroyed container centering.
   - *Fix:* Removed unlayered `margin: 0; padding: 0;` reset completely. Scoped base resets inside `@layer base` and custom utility classes inside `@layer utilities`.
2. **Invisible Hero One-Liner & CTA Buttons (`Hero.tsx`):**
   - *Issue:* Hero bio and CTA buttons had `opacity-0 animate-[glitch-fade-in...]` attached, but the keyframe wasn't loaded globally, leaving the elements permanently invisible at 0 opacity.
   - *Fix:* Registered `@keyframes glitch-fade-in`, `@keyframes glitch-cyan`, `@keyframes glitch-magenta`, and `@keyframes glitch-jitter` directly in `index.css`. Removed permanent `opacity-0` blocker.
3. **Desktop & Mobile Header Alignment (`Header.tsx`):**
   - *Issue:* Header content was touching extreme viewport borders with no gutter spacing. Nav links had 0 horizontal gap. "LET'S TALK" button wrapped into two lines on tablet.
   - *Fix:* Standardized header inner container to `w-full max-w-[1200px] h-full mx-auto px-6 md:px-8 lg:px-16 flex items-center justify-between`. Added `whitespace-nowrap` to CTA button. Added per-link `px-3 py-1.5` padding with individual active underline bars.
4. **Mobile (375px) Horizontal Clipping & Vertical Overflow:**
   - *Issue:* `Edward Geraldo Kristian` heading was clipped horizontally on 375px mobile screens. In addition, the Hero stage was cramming the heading, bio, CTAs, and a 330px StoryCard simultaneously into an 812px viewport, causing the top kicker to overlap behind the fixed header.
   - *Fix:* Added `font-size: clamp(32px, 9vw, 44px); overflow-wrap: break-word;` to `.text-hero-h1`. Added `pt-16 md:pt-20 lg:pt-0` to content layer. On mobile (`max-lg:`), the StoryCard transitions in smoothly once scrolling begins (`hasScrolled`), allowing the hero introduction at progress 0 to have generous, comfortable breathing room.
5. **Tablet (768px) StoryCard Overflow:**
   - *Issue:* `md:flex-row` forced a 640px text block and 400px card side-by-side on 768px screens, overflowing by >300px.
   - *Fix:* Changed to `lg:flex-row` so side-by-side layout activates at 1024px+ desktop breakpoint, while tablet stacks vertically with zero overflow.

**Verification:**
- Re-tested all 4 breakpoints with automated screenshot inspection. Zero horizontal overflow, clean type rendering, working mobile hamburger overlay, fully functional scroll-scrubbing. Build passes cleanly with zero TypeScript errors.

---

### Phase 4 — Remaining sections (About, Projects, Skills, Contact, Footer) — ✅ Done

**Built:**
- **About (`src/components/About/`):**
  - Viewfinder corner-bracket scan-frame (`ScanFrame.tsx`) with animated cyan/magenta laser sweep on hover and viewport entry.
  - Dual-identity bio emphasizing native iOS performance, robust full-stack web architecture, and data science telemetry.
  - Pull-quote / engineering thesis: *"Code with architectural intent. Data with empirical rigor."*
  - Scroll-triggered rAF count-up statistics (`StatCounter.tsx`) with cubic ease-out (`3+ Yrs`, `14+ Products`, `50+ Datasets`).
- **Projects (`src/components/Projects/`):**
  - **2.5D CSS "Cyber Shelf" (`CyberShelf.tsx`, `CyberShelfCard.tsx`):** Spatial depth stage arranging project cards along the Z-axis using hardware-accelerated CSS transforms (`perspective: 1200px`, `translate3d`, `rotateX`, `scale`, `blur`, `opacity`) tied to scroll progress via rAF.
  - Case file cards styled with `--bg-panel-raised`, `--border-hairline`, 12px border radius, top CMYK hairline accent, `GlitchText` hover animations, monospace stack pills, external links (`Live Demo ↗`, `Source`), and responsive technical mockups.
  - Interactive stage controls: Top telemetry bar with active project counter, direct stepper tabs (`01 // iOS`, `02 // WEB`, `03 // DATA`), bottom Z-depth distance readouts, CMYK progress bar, and accessible single-card fallback for `prefers-reduced-motion`.
- **Skills (`src/components/Skills/`):**
  - Technical capability map grouped into 4 clusters: iOS & Mobile, Web Architecture, Data Science & Telemetry, Tooling & Systems.
  - Discrete 5-dot matrix density ratings reflecting production mastery rather than arbitrary percentage bars.
  - Contextual cluster summaries and color-coded accent indicators.
- **Contact (`src/components/Contact/`):**
  - Live Jakarta, ID timezone clock (`GMT+7`) running on continuous 1s interval.
  - Prominent interactive email box with one-click clipboard copy, animated "Copied!" feedback, and bottom accent line draw-in on hover.
  - Secondary social links (GitHub, LinkedIn, Curriculum Vitae PDF) with icon glyphs and handle pills.
- **Footer (`src/components/Footer/`):**
  - Minimal copyright and smooth "Back to top ↑" trigger with reduced-motion support.
- **App.tsx:** Full vertical assembly with semantic HTML and section index sequence `[00]`–`[04]`.

---

### Phase 5 — Motion & Accessibility Pass — ✅ Done

**Built & Verified:**
- **Scroll reveal choreography (`useInView.ts`):** Lightweight `IntersectionObserver` hook triggering section entrance animations once on first entry:
  - About: Viewfinder brackets converge, narrative text fades/slides up (`opacity 0→1, translateY 24px→0`), stats count up.
  - Projects: Heading and filter row fade up; project cards animate with a ~65ms staggered entrance delay.
  - Featured Project card: Title activates with CMYK `GlitchText` resolve and hover jitter.
  - Skills: 4 clusters stagger in (`idx * 80ms`), skill chips feature micro-interaction hover lift and accent glow.
  - Contact: Big headline triggers `GlitchText` entrance when scrolled into view (bookending the Hero entrance); email box and social links fade/slide up.
- **Accessibility enhancements (ui-ux-pro-max cross-check):**
  - **Skip Link:** Accessible "Skip to main content" link (`sr-only focus:not-sr-only`) targeting `<main id="main-content">`, visible immediately on first `Tab` press with high-contrast accent pill.
  - **Keyboard Tablist Navigation:** Project category filter supports full standard WAI-ARIA tablist arrow navigation (`ArrowRight`, `ArrowLeft`, `Home`, `End`), with automatic focus management and `aria-selected` / `aria-controls`.
  - **Mobile Dialog Trap:** Mobile navigation overlay upgraded with `role="dialog"`, `aria-modal="true"`, `aria-label="Mobile navigation menu"`, `Escape` key close listener, and `Tab`/`Shift+Tab` focus wrapping within the active menu items.
  - **Focus States:** High-visibility focus indicators across all interactive elements (`:focus-visible` outline 2px accent, 2px offset).
  - **Semantic HTML & ARIA:** Strict semantic hierarchy (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `role="tablist"`, `role="tab"`, `role="tabpanel"`, `role="progressbar"`).
  - **Color Contrast:** Verified WCAG AAA compliance (>8.5:1 ratio for `--text-secondary` and >17:1 for `--text-primary` against void and panel backgrounds).
- **Desktop Precision Cursor (`PrecisionCursor.tsx`):**
  - Architectural reticle ring + center dot that follows cursor with 0.22 easing.
  - Snaps to accent glow and scales up (`scale-150`) when hovering interactive elements (`a`, `button`, tabs, inputs).
  - Automatically disabled on touch screens via `(pointer: fine)` media query and when `prefers-reduced-motion` is active.
  - `pointer-events-none` prevents interference with native clicks or selections.

---

### Phase 4.1 Override — Projects Section: 3D Curved Cyber Shelf / Cover Flow (`05-projects-section.md`) — ✅ Done

**Architecture & Rationale:**
- **Zero CSS Blur:** Completely eliminated all `filter: blur()` and `backdrop-blur-*` styles from cards, backgrounds, and HUD elements. Every single card, title, and telemetry pixel remains 100% razor-sharp and readable across all scroll states.
- **3D Curved Horizontal Rail Track (Cover Flow):** Re-engineered the spatial stage from a stacked Z-pile into a true 3D Cover Flow horizontal rail. As the user scrolls vertically through the pinned stage (`300vh`), the rail slides horizontally along the X-axis:
  - **Active Center Card:** Snaps forward with `translateZ(60px) rotateY(0deg) scale(1)`, full opacity (`1.0`), and highlighted `border-violet-bright`.
  - **Left Wing (Past Cards):** Angles inward with `translateZ(-80px) rotateY(25deg) scale(0.88)` and subtle opacity (`0.5`).
  - **Right Wing (Upcoming Cards):** Angles inward with `translateZ(-80px) rotateY(-25deg) scale(0.88)` and subtle opacity (`0.5`).
- **Pixel-Perfect Centering Math:** Track is anchored at `left: 50%; top: 50%` with dynamic card measurement (`cardRef.offsetWidth`) and responsive gap (`64px` on desktop, `32px` on mobile). `translate3d(calc(-${cardWidth / 2}px - ${activeFloat * step}px), -50%, 0)` guarantees the active card centers in the viewport with symmetrical left and right wings.

**Built & Configured:**
1. **`src/components/Projects/CyberShelf.tsx`:**
   - 3D perspective viewport (`perspective: 1200px`) pinned over `h-[300vh]` scroll track with rAF scroll scrubbing.
   - Smooth Cover Flow interpolation: $rotY = -c \times 25^\circ$, $Z = 60 - |c| \times 140\text{px}$, $scale = 1 - |c| \times 0.12$, $opacity = 1 - |c| \times 0.5$, $zIndex = 30 - |rel| \times 10$.
   - Stepper tabs (`01 // iOS`, `02 // WEB`, `03 // DATA`) and direct card click triggers for seamless navigation.
   - Spatial HUD with horizontal slide direction indicator (`◀ / ▶`), active project name, and CMYK progress bar.
   - Accessible fallback for `prefers-reduced-motion`.
2. **`src/components/Projects/CyberShelfCard.tsx`:**
   - Solid `--bg-panel-raised` background with top CMYK hairline accent.
   - `forwardRef` support for responsive geometry calculations.
   - Zero `backdrop-blur-xl`. Razor-sharp typography and terminal aesthetics.
   - Active card highlights with `border-violet-bright` (`#7C3AED`) and `ring-1 ring-violet-bright/30`. Inactive hover transitions to `opacity: 0.9` and `border-violet-mid`.
   - Technical preview panels:
     - **Singaplan (`[iOS]`):** App Store Deployed, GPS matrix & heuristic itinerary solver.
     - **QueueEase (`[WEB]`):** Production Live, live ticket ticker (`#A-042`), counter matrix, WebSocket throughput.
     - **LilzBake Analytics (`[DATA]`):** Engagement Pipeline, sales velocity bars (Sourdough, Almond Croissant, Brioche) and ROI stats.

**Visual QA Capture:**
- Captured high-resolution screenshots across all states and viewports:
  - `cybershelf-1440-card1.png`: Singaplan centered, QueueEase angled on right wing.
  - `cybershelf-1440-card2.png`: QueueEase centered, Singaplan on left wing, LilzBake on right wing.
  - `cybershelf-1440-card3.png`: LilzBake centered, QueueEase on left wing.
  - `cybershelf-1024.png`, `cybershelf-768.png`, `cybershelf-375.png`.
  - `cybershelf-reduced-motion.png`: Static accessible tabbed view.

---

### Phase 6 — Performance & Production Audit Pass — ✅ Done

**Verification & Metrics:**
- **Zero TypeScript Errors:** Strict type checks pass with `tsc -b`.
- **Bundle Budgets Met:**
  - Initial JS Bundle: **256.57 KB** (raw) / **77.05 KB** (gzipped) — well below the 150 KB gzip budget target.
  - CSS Bundle: **55.01 KB** (raw) / **10.12 KB** (gzipped) — well below the 60 KB budget.
  - Three.js WebGL Chunk: **525.06 KB** (131.26 KB gzipped) — strictly isolated to Hero canvas via `React.lazy`; 0 KB WebGL overhead in Projects section.
- **Zero External Animation Libraries:** 100% native CSS keyframes + GPU transforms + rAF hooks. Zero Framer Motion or GSAP bloat.
- **Self-Hosted Variable Fonts:** Inter & JetBrains Mono woff2 with `@font-face` and swap display, preloaded in `index.html`. Zero external Google Fonts requests.
- **Full Visual QA Across 4 Breakpoints:**
  - 375px (Mobile): Zero horizontal scroll, clean typographic clamp, fully functional accessible hamburger drawer.
  - 768px (Tablet): Side-by-side header nav, clean card layout, zero overflow.
  - 1024px & 1440px (Desktop / LG): 3D Curved Cyber Shelf (Cover Flow) with symmetrical angled wings, interactive Three.js hero node graph, precision custom reticle cursor.
  - `prefers-reduced-motion`: 100% static accessible layout, no pinning, tabbed project navigation, zero blur, zero motion.


