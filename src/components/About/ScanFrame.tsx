import { useState, useRef, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ScanFrame() {
  const prefersReducedMotion = useReducedMotion();
  const [isScanning, setIsScanning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasScrolledIn) {
          setHasScrolledIn(true);
          setIsScanning(true);
          const timer = setTimeout(() => setIsScanning(false), 2400);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (frameRef.current) observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [hasScrolledIn, prefersReducedMotion]);

  // Periodic subtle glitch trigger
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.65) {
        setIsScanning(true);
        setTimeout(() => setIsScanning(false), 900);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const activeGlitch = (isHovered || isScanning) && !prefersReducedMotion;

  return (
    <div
      ref={frameRef}
      onMouseEnter={() => {
        setIsHovered(true);
        if (!prefersReducedMotion) setIsScanning(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsScanning(false);
      }}
      className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-none mx-auto h-[460px] sm:h-[500px] lg:h-full rounded-card bg-panel-raised border border-border-hairline overflow-hidden flex flex-col justify-between p-4 sm:p-5 group cursor-pointer select-none shadow-2xl transition-all duration-300"
      style={{
        boxShadow: activeGlitch
          ? '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 25px -4px rgba(124, 58, 237, 0.3)'
          : '0 16px 36px -10px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* ── Background & Duotone Image Stage ────────────────── */}
      <div className="absolute inset-0 overflow-hidden bg-void">
        {!imageError ? (
          <>
            {/* Base Grayscale Image */}
            <img
              src="/assets/edward-portrait.jpg"
              alt="Edward Geraldo Kristian"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover object-center transition-all duration-700 ${
                imageLoaded ? 'opacity-90' : 'opacity-0'
              }`}
              style={{
                filter: 'grayscale(100%) contrast(125%) brightness(88%)',
                transform: activeGlitch ? 'scale(1.02)' : 'scale(1)',
              }}
            />

            {/* Duotone Layer 1: Multiply Shadow Color Grading */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(76, 29, 149, 0.75) 0%, rgba(19, 11, 34, 0.85) 55%, rgba(10, 6, 18, 0.98) 100%)',
                mixBlendMode: 'multiply',
              }}
            />

            {/* Duotone Layer 2: Screen Highlight Grading (Violet + Cyan) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.55) 0%, rgba(0, 240, 255, 0.2) 65%, transparent 100%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* Vignette Edge Shading */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 40%, rgba(10, 6, 18, 0.75) 100%)',
              }}
            />

            {/* CRT Scanline Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 3px)',
              }}
            />

            {/* CMYK RGB Channel-Split Glitch Layers on Hover */}
            {activeGlitch && (
              <>
                {/* Cyan Offset Slice */}
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{
                    transform: 'translate(-3px, 1px)',
                    mixBlendMode: 'screen',
                    opacity: 0.75,
                    clipPath: 'polygon(0 15%, 100% 15%, 100% 32%, 0 32%, 0 62%, 100% 62%, 100% 78%, 0 78%)',
                  }}
                >
                  <img
                    src="/assets/edward-portrait.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{
                      filter: 'grayscale(100%) contrast(150%) brightness(120%) drop-shadow(0 0 3px var(--channel-cyan))',
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'rgba(0, 240, 255, 0.35)',
                      mixBlendMode: 'screen',
                    }}
                  />
                </div>

                {/* Magenta Offset Slice */}
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{
                    transform: 'translate(3px, -1px)',
                    mixBlendMode: 'screen',
                    opacity: 0.75,
                    clipPath: 'polygon(0 8%, 100% 8%, 100% 22%, 0 22%, 0 48%, 100% 48%, 100% 58%, 0 58%)',
                  }}
                >
                  <img
                    src="/assets/edward-portrait.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    style={{
                      filter: 'grayscale(100%) contrast(150%) brightness(120%) drop-shadow(0 0 3px var(--channel-magenta))',
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'rgba(255, 46, 154, 0.35)',
                      mixBlendMode: 'screen',
                    }}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          /* Fallback if image not yet present: Geometric Monogram */
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="w-36 h-36 border border-dashed border-violet-mid rounded-full flex items-center justify-center">
              <span className="font-display text-4xl font-bold text-text-primary">EGK</span>
            </div>
            <span className="font-mono text-xs text-text-secondary mt-4 tracking-widest">
              EDWARD G. KRISTIAN
            </span>
          </div>
        )}

        {/* Ambient Top Light Beam */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 10%, rgba(124, 58, 237, 0.25) 0%, transparent 65%)',
          }}
        />

        {/* Vertical Laser Scanline Beam */}
        {activeGlitch && (
          <div
            className="absolute left-0 right-0 h-[2px] pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--channel-cyan) 30%, var(--accent) 70%, transparent 100%)',
              boxShadow: '0 0 14px var(--channel-cyan)',
              animation: 'laser-scan 2.4s ease-in-out infinite alternate',
            }}
          />
        )}
      </div>

      {/* ── Viewfinder HUD Overlay ───────────────────────────── */}
      {/* Top Header Telemetry */}
      <div className="relative z-20 flex items-center justify-between text-text-secondary font-mono text-[10px] sm:text-[11px] tracking-widest uppercase bg-void/80 px-3 py-1.5 rounded-sm border border-border-hairline/80 backdrop-blur-sm">
        <span className="flex items-center gap-1.5 text-channel-cyan font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-channel-cyan animate-pulse" />
          SYS.SCAN // 01
        </span>
        <span className="text-text-tertiary">LAT: -6.2088</span>
      </div>

      {/* Center Reticle Crosshairs */}
      <div className="relative z-10 my-auto flex items-center justify-center pointer-events-none">
        <div
          className={`w-28 h-28 sm:w-32 sm:h-32 border border-dashed rounded-full transition-all duration-700 flex items-center justify-center ${
            activeGlitch
              ? 'border-accent scale-105 rotate-45'
              : 'border-violet-mid/40 scale-100 rotate-0'
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-channel-cyan/80" />
        </div>
        <div className="absolute w-8 h-[1px] bg-channel-cyan/60" />
        <div className="absolute h-8 w-[1px] bg-channel-cyan/60" />
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="relative z-20 flex items-center justify-between text-text-secondary font-mono text-[10px] sm:text-[11px] tracking-wider uppercase bg-void/80 px-3 py-1.5 rounded-sm border border-border-hairline/80 backdrop-blur-sm">
        <span className="text-text-primary font-medium tracking-wide">
          TARGET: EDWARD G. KRISTIAN
        </span>
        <span className="text-channel-cyan font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-channel-cyan" />
          99.8% CALIBRATED
        </span>
      </div>

      {/* ── 4 Precision Corner HUD Brackets ─────────────────── */}
      {/* Top Left */}
      <div
        className={`absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-accent transition-all duration-300 z-30 ${
          hasScrolledIn ? 'translate-x-0 translate-y-0' : '-translate-x-1 -translate-y-1'
        }`}
      />
      {/* Top Right */}
      <div
        className={`absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-accent transition-all duration-300 z-30 ${
          hasScrolledIn ? 'translate-x-0 translate-y-0' : 'translate-x-1 -translate-y-1'
        }`}
      />
      {/* Bottom Left */}
      <div
        className={`absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-accent transition-all duration-300 z-30 ${
          hasScrolledIn ? 'translate-x-0 translate-y-0' : '-translate-x-1 translate-y-1'
        }`}
      />
      {/* Bottom Right */}
      <div
        className={`absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-accent transition-all duration-300 z-30 ${
          hasScrolledIn ? 'translate-x-0 translate-y-0' : 'translate-x-1 translate-y-1'
        }`}
      />

      <style>{`
        @keyframes laser-scan {
          0% { top: 6%; }
          100% { top: 94%; }
        }
      `}</style>
    </div>
  );
}

export default ScanFrame;
