import {
  createElement,
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
} from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/* ────────────────────────────────────────────────────────────
 * Types
 * ──────────────────────────────────────────────────────────── */

type GlitchElement = 'h1' | 'h2' | 'h3' | 'p' | 'span';

export interface GlitchTextProps {
  /** The text to render (string only — keeps layered duplicates simple). */
  children: string;
  /** The HTML element to render. @default 'span' */
  as?: GlitchElement;
  /** Additional CSS classes forwarded to the root element. */
  className?: string;
  /** Delay before the glitch animation starts (ms). @default 0 */
  delay?: number;
  /** Whether to trigger the entrance animation. @default true */
  trigger?: boolean;
  /** Enable a continuous subtle jitter on hover (nav links, cards). @default false */
  hoverGlitch?: boolean;
}

/* ────────────────────────────────────────────────────────────
 * Static layer styles (memoised outside the component)
 * ──────────────────────────────────────────────────────────── */

const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';
const ANIM_DURATION = '360ms';

const containerBase: CSSProperties = {
  position: 'relative',
  display: 'inline-block',
};

const layerBase: CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  userSelect: 'none',
  mixBlendMode: 'screen',
  willChange: 'transform, opacity',
};

/* ────────────────────────────────────────────────────────────
 * Component
 * ──────────────────────────────────────────────────────────── */

export function GlitchText({
  children,
  as: Tag = 'span',
  className,
  delay = 0,
  trigger = true,
  hoverGlitch = false,
}: GlitchTextProps): ReactElement {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);

  /* ── Hover handlers ────────────────────────────────────── */
  const onMouseEnter = useCallback(() => {
    if (hoverGlitch && !prefersReducedMotion) setIsHovering(true);
  }, [hoverGlitch, prefersReducedMotion]);

  const onMouseLeave = useCallback(() => {
    if (hoverGlitch) setIsHovering(false);
  }, [hoverGlitch]);

  /* ── Derived animation state ───────────────────────────── */
  const shouldAnimate = trigger && !prefersReducedMotion;
  const showJitter = isHovering && hoverGlitch && !prefersReducedMotion;

  /* ── Layer styles ──────────────────────────────────────── */
  const cyanStyle = useMemo<CSSProperties>(() => {
    if (showJitter) {
      return {
        ...layerBase,
        color: 'var(--channel-cyan, #00F0FF)',
        animation: 'glitch-jitter 200ms steps(3, end) infinite',
        opacity: 0.75,
      };
    }
    if (!shouldAnimate) return { ...layerBase, opacity: 0 };
    return {
      ...layerBase,
      color: 'var(--channel-cyan, #00F0FF)',
      animation: `glitch-cyan ${ANIM_DURATION} ${EASE_OUT_EXPO} ${delay}ms both`,
    };
  }, [shouldAnimate, showJitter, delay]);

  const magentaStyle = useMemo<CSSProperties>(() => {
    if (showJitter) {
      return {
        ...layerBase,
        color: 'var(--channel-magenta, #FF2E9A)',
        animation: 'glitch-jitter 250ms steps(4, end) infinite reverse',
        opacity: 0.75,
      };
    }
    if (!shouldAnimate) return { ...layerBase, opacity: 0 };
    return {
      ...layerBase,
      color: 'var(--channel-magenta, #FF2E9A)',
      animation: `glitch-magenta ${ANIM_DURATION} ${EASE_OUT_EXPO} ${delay}ms both`,
    };
  }, [shouldAnimate, showJitter, delay]);

  /* ── Event handler props ───────────────────────────────── */
  const eventProps: HTMLAttributes<HTMLElement> = hoverGlitch
    ? { onMouseEnter, onMouseLeave }
    : {};

  /* ── Render ────────────────────────────────────────────── */
  return createElement(
    Tag,
    {
      className,
      style: containerBase,
      ...eventProps,
    },
    // Base (readable) layer — always visible
    children,

    // Cyan offset layer (decorative, entrance or jitter)
    !prefersReducedMotion &&
      createElement(
        'span',
        {
          'aria-hidden': true as const,
          style: cyanStyle,
        },
        children,
      ),

    // Magenta offset layer (decorative, entrance or jitter)
    !prefersReducedMotion &&
      createElement(
        'span',
        {
          'aria-hidden': true as const,
          style: magentaStyle,
        },
        children,
      ),
  );
}

/* ────────────────────────────────────────────────────────────
 * useGlitchHover — standalone hook for external elements
 * ──────────────────────────────────────────────────────────── */

interface GlitchHoverResult {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isGlitching: boolean;
  style: CSSProperties;
}

export function useGlitchHover(): GlitchHoverResult {
  const prefersReducedMotion = useReducedMotion();
  const [isGlitching, setIsGlitching] = useState(false);

  const onMouseEnter = useCallback(() => {
    if (!prefersReducedMotion) setIsGlitching(true);
  }, [prefersReducedMotion]);

  const onMouseLeave = useCallback(() => {
    setIsGlitching(false);
  }, []);

  const style = useMemo<CSSProperties>(() => {
    if (!isGlitching || prefersReducedMotion) return {};
    return {
      animation: 'glitch-jitter 200ms steps(3, end) infinite',
    };
  }, [isGlitching, prefersReducedMotion]);

  return { onMouseEnter, onMouseLeave, isGlitching, style };
}

export default GlitchText;
