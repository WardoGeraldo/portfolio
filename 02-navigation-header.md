# 02 — Navigation / Header

## Structure

Fixed header, full width, `position: sticky; top: 0`, height **72px** (56px mobile).
Background: transparent over hero, transitions to `--bg-void` at 85% opacity with
a `backdrop-filter: blur(12px)` and a bottom hairline border once the user scrolls
past ~80px.

Layout (desktop, 3 zones):
- **Left:** wordmark — `EGK` in mono font, or a small custom monogram glyph. On hover,
  trigger the CMYK glitch-split effect once.
- **Center or right-aligned nav:** jump-links to each section, styled as mono labels
  with index numbers: `[00] Hero  [01] About  [02] Projects  [03] Skills  [04] Contact`
  (Hero link can just be the wordmark itself — don't duplicate it as a nav item if
  the wordmark already scrolls to top).
- **Right:** a single CTA button, e.g. "Let's talk" or "Contact" (`--accent` background,
  `--bg-void` text), that jump-links to Contact.

Mobile (<768px): wordmark left, hamburger/menu icon right. Tapping opens a full-screen
overlay (`--bg-void`, 98% opacity) with the same nav items stacked, large (28px) mono
type, index numbers included.

## Behavior

- **Smooth scroll:** clicking a nav item scrolls to the section with `scroll-behavior: smooth`
  (or a custom eased scroll if the framework's default easing feels too linear/robotic —
  prefer `ease-in-out` over ~700ms).
- **Active section indicator:** use an `IntersectionObserver` on each section (threshold
  ~0.4) to detect which is currently in view. The active nav item gets:
  - Text color shifts from `--text-secondary` to `--text-primary`
  - The index number (`[02]`) shifts to `--accent`
  - A small underline/dot indicator slides to that item (animate `transform`, not
    `left`, for performance — ~250ms ease-out)
- **Scroll progress:** thin (2px) progress bar along the very top edge of the header,
  filled with a violet→accent gradient, width tied to total page scroll percentage.
- **Header hide-on-scroll-down (optional but recommended):** header stays visible
  scrolling up, subtly translates up and out of view scrolling down past the hero,
  to keep focus on content. Always reappears near the top.

## Accessibility

- Nav is a real `<nav>` with a `<ul>`/`<li>` list of anchor links (`href="#projects"`
  etc.), not click-only divs — keyboard tab order must work, and each link needs a
  visible focus ring using `--accent` (2px outline, 2px offset), not just a color change.
- Respect `prefers-reduced-motion`: disable the smooth-scroll easing (use instant
  jump) and the header hide/show translate; keep the active-state color change only.
