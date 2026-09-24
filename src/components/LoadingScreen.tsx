/**
 * LoadingScreen — Industrial cyber terminal boot preloader
 * per 14-loading-screen.md.
 *
 * Visual anatomy:
 * - Full-screen fixed overlay at z-[9999] with --bg-void + scanline texture
 * - Center: non-linear 0→100 % counter with CMYK chromatic-aberration jitter
 * - Horizontal gauge bar underneath the counter
 * - Four corner HUD telemetry readouts (monospace)
 * - Exit: shutter-wipe (top/bottom halves translate away) → dispatch
 *   "boot-complete" custom event → unmount from DOM
 *
 * Accessibility:
 * - prefers-reduced-motion: skip jitter, use a simple linear opacity fade
 * - Strict 2 s hard-cap timeout: if anything stalls, force dismiss
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

// ── Non-linear progress curve ──────────────────────────────────
// Fast burst → stall around 68-84 % (shader compilation feel) → snap to 100

const TOTAL_DURATION_MS = 1400; // target ~1.4 s nominal
const HARD_TIMEOUT_MS = 2000;   // spec: force-dismiss at 2 s max
const HOLD_MS = 120;            // hold "100% // READY" before exit
const EXIT_MS = 400;            // shutter-wipe / fade-out duration

/** Attempt to produce a non-linear 0→1 curve with a stall band. */
function progressCurve(t: number): number {
  // t is linear 0→1 over TOTAL_DURATION_MS
  if (t <= 0) return 0;
  if (t >= 1) return 1;

  // Phase 1: fast ramp 0 → 0.68 over first 40 % of time
  if (t < 0.4) {
    return 0.68 * (t / 0.4);
  }
  // Phase 2: stall 0.68 → 0.84 over next 40 % of time
  if (t < 0.8) {
    const local = (t - 0.4) / 0.4;
    return 0.68 + 0.16 * easeInOutSine(local);
  }
  // Phase 3: snap 0.84 → 1.0 over last 20 % of time
  const local = (t - 0.8) / 0.2;
  return 0.84 + 0.16 * easeOutExpo(local);
}

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ── Jitter offset generator (erratic 1–3 px horizontal CMYK split) ──
function jitterPx(progress: number): number {
  // Intensify during the stall band (68–84 %)
  const base = progress >= 0.68 && progress < 0.84 ? 3 : progress < 0.5 ? 1.5 : 2;
  return base * (Math.random() > 0.5 ? 1 : -1);
}

// ── Component ──────────────────────────────────────────────────

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'hold' | 'exit'>(
    'counting',
  );
  const [cyanOffset, setCyanOffset] = useState(0);
  const [magentaOffset, setMagentaOffset] = useState(0);

  const startRef = useRef(0);
  const rafRef = useRef(0);

  // ── Counting loop ──────────────────────────────────────────
  const tick = useCallback(
    (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / TOTAL_DURATION_MS, 1);
      const p = progressCurve(t);
      const pct = Math.round(p * 100);

      setPercent(pct);

      // CMYK jitter (skip if reduced-motion)
      if (!prefersReducedMotion) {
        setCyanOffset(jitterPx(p));
        setMagentaOffset(jitterPx(p));
      }

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Snap solid at 100 %
        setCyanOffset(0);
        setMagentaOffset(0);
        setPhase('hold');
      }
    },
    [prefersReducedMotion],
  );

  // Start the animation loop on mount
  useEffect(() => {
    // Lock body scroll while loader is visible
    document.body.style.overflow = 'hidden';
    rafRef.current = requestAnimationFrame(tick);

    // Hard-cap timeout
    const timeout = setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      setPercent(100);
      setCyanOffset(0);
      setMagentaOffset(0);
      setPhase('hold');
    }, HARD_TIMEOUT_MS);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timeout);
    };
  }, [tick]);

  // ── Hold → Exit → Done chain ──────────────────────────────
  useEffect(() => {
    if (phase === 'hold') {
      const t = setTimeout(() => setPhase('exit'), HOLD_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'exit') {
      const t = setTimeout(() => {
        // Restore scroll and notify hero
        document.body.style.overflow = '';
        window.dispatchEvent(new CustomEvent('boot-complete'));
        onComplete();
      }, EXIT_MS);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  const isExiting = phase === 'exit';
  const isReady = phase === 'hold' || isExiting;
  const displayText = isReady ? '100% // READY' : `${String(percent).padStart(2, '0')}%`;

  // Exit animation on the main overlay:
  // - Reduced-motion: simple opacity fade
  // - Full-motion: opacity + brightness boost (spec: brightness(1.5)) coordinated with shutter-wipe
  const exitStyle: React.CSSProperties = isExiting
    ? {
        opacity: 0,
        filter: prefersReducedMotion ? undefined : 'brightness(1.5)',
        transition: `opacity ${EXIT_MS}ms ease-out, filter ${EXIT_MS}ms ease-out`,
      }
    : {};

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-10 select-none"
      style={{
        backgroundColor: 'var(--bg-void)',
        fontFamily: 'var(--font-mono)',
        ...exitStyle,
      }}
      aria-live="polite"
      role="status"
      aria-label={`Loading ${percent}%`}
    >
      {/* ── Scanline + grid texture overlay ─────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: [
            // 2 px pitch scanlines at 4 % opacity
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(107,91,138,0.04) 2px, rgba(107,91,138,0.04) 4px)',
            // Graph grid at 4 %
            'linear-gradient(to right, rgba(46,16,101,0.04) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(46,16,101,0.04) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '100% 4px, 60px 60px, 60px 60px',
        }}
        aria-hidden="true"
      />

      {/* ── Top row: crosshair icon ────────────────────────── */}
      <div className="relative z-10 flex justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="opacity-50"
          aria-hidden="true"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {/* Crosshair / targeting node */}
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" />
          <line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeWidth="1" />
          <line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="1" />
          <line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1" />
          <line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* ── Center: counter + gauge ────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-4">
        {/* Counter with CMYK chromatic-aberration layers */}
        <div className="relative">
          {/* Cyan channel ghost (behind) */}
          {!prefersReducedMotion && !isReady && (
            <span
              className="absolute inset-0 text-2xl sm:text-4xl font-medium tracking-tight pointer-events-none"
              style={{
                color: 'var(--channel-cyan)',
                mixBlendMode: 'screen',
                transform: `translateX(${cyanOffset}px)`,
                opacity: 0.6,
              }}
              aria-hidden="true"
            >
              {displayText}
            </span>
          )}

          {/* Magenta channel ghost (behind) */}
          {!prefersReducedMotion && !isReady && (
            <span
              className="absolute inset-0 text-2xl sm:text-4xl font-medium tracking-tight pointer-events-none"
              style={{
                color: 'var(--channel-magenta)',
                mixBlendMode: 'screen',
                transform: `translateX(${magentaOffset}px)`,
                opacity: 0.6,
              }}
              aria-hidden="true"
            >
              {displayText}
            </span>
          )}

          {/* Primary (front) layer */}
          <span
            className="relative text-2xl sm:text-4xl font-medium tracking-tight transition-colors duration-150"
            style={{
              color: isReady
                ? 'var(--text-primary)'
                : 'var(--text-primary)',
            }}
          >
            {displayText}
          </span>
        </div>

        {/* Horizontal progress gauge */}
        <div className="w-48 sm:w-64 relative">
          {/* Track */}
          <div
            className="w-full h-[2px] rounded-full"
            style={{ backgroundColor: 'var(--border-hairline)' }}
          />
          {/* Fill */}
          <div
            className="absolute top-0 left-0 h-[2px] rounded-full"
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, var(--violet-mid), var(--violet-bright))',
              transition: 'width 60ms linear',
            }}
          />
        </div>
      </div>

      {/* ── Bottom row: HUD readouts ───────────────────────── */}
      <div className="relative z-10 flex items-end justify-between text-[11px] sm:text-[12px] tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
        {/* Bottom-left: boot status */}
        <span className="uppercase">
          SYS.INIT // EGK_KERNEL_V1.4
        </span>

        {/* Bottom-center: micro glyphs */}
        <span className="hidden sm:flex items-center gap-2 opacity-60 text-[13px]">
          <span>✦</span>
          <span>⬡</span>
          <span>⨁</span>
          <span>⏣</span>
        </span>

        {/* Bottom-right: frame timing */}
        <span className="uppercase text-right">
          TICKS: 60FPS // 127.0.0.1
        </span>
      </div>

      {/* ── Shutter-wipe exit overlays (non-reduced-motion) ── */}
      {!prefersReducedMotion && isExiting && (
        <>
          {/* Top half shutter — slides upward to reveal hero */}
          <div
            className="fixed top-0 left-0 right-0 h-1/2 z-[10000] pointer-events-none"
            style={{
              backgroundColor: 'var(--bg-void)',
              transform: 'translateY(-100%)',
              transition: `transform ${EXIT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
            aria-hidden="true"
          />
          {/* Bottom half shutter — slides downward to reveal hero */}
          <div
            className="fixed bottom-0 left-0 right-0 h-1/2 z-[10000] pointer-events-none"
            style={{
              backgroundColor: 'var(--bg-void)',
              transform: 'translateY(100%)',
              transition: `transform ${EXIT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
