import { useState, useRef, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ScanFrame() {
  const prefersReducedMotion = useReducedMotion();
  const [isScanning, setIsScanning] = useState(false);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
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
      { threshold: 0.4 }
    );

    if (frameRef.current) observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [hasScrolledIn, prefersReducedMotion]);

  return (
    <div
      ref={frameRef}
      onMouseEnter={() => {
        if (!prefersReducedMotion) setIsScanning(true);
      }}
      onMouseLeave={() => setIsScanning(false)}
      className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] mx-auto group cursor-pointer"
    >
      {/* Outer Viewfinder Bracket Frame */}
      <div className="absolute inset-0 border border-border-hairline/60 rounded-sm bg-panel-raised/40 backdrop-blur-sm overflow-hidden p-6 flex flex-col justify-between">
        {/* Generative Tech Grid & Ambient Glow */}
        <div
          className="absolute inset-0 bg-grid opacity-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(124, 58, 237, 0.18) 0%, rgba(10, 6, 18, 0) 70%)',
          }}
          aria-hidden="true"
        />

        {/* Viewfinder Top Header Info */}
        <div className="relative z-10 flex items-center justify-between text-text-tertiary font-mono text-[10px] tracking-widest uppercase">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-channel-cyan animate-pulse" />
            SYS.SCAN // 01
          </span>
          <span>LAT: -6.2088</span>
        </div>

        {/* Center Generative Avatar / Monogram Representation */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          {/* Geometric Target Reticle */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Outer rotating dashed ring */}
            <div
              className={`absolute inset-0 border border-dashed border-violet-mid rounded-full transition-transform duration-1000 ${
                isScanning && !prefersReducedMotion ? 'rotate-90' : 'rotate-0'
              }`}
            />
            {/* Middle geometric square */}
            <div
              className={`absolute w-24 h-24 border border-border-hairline rounded-sm transition-transform duration-700 ${
                isScanning && !prefersReducedMotion ? 'scale-105 border-accent' : 'scale-100'
              }`}
            />
            {/* Inner Stylized Monogram */}
            <div className="font-display text-4xl font-bold tracking-tighter text-text-primary group-hover:text-accent transition-colors duration-300">
              EGK
            </div>

            {/* Target Crosshairs */}
            <div className="absolute -top-2 w-[1px] h-3 bg-text-tertiary" />
            <div className="absolute -bottom-2 w-[1px] h-3 bg-text-tertiary" />
            <div className="absolute -left-2 h-[1px] w-3 bg-text-tertiary" />
            <div className="absolute -right-2 h-[1px] w-3 bg-text-tertiary" />
          </div>

          <div className="mt-4 font-mono text-xs text-text-secondary tracking-widest uppercase flex items-center gap-2">
            <span>EDWARD G. KRISTIAN</span>
          </div>
          <div className="font-mono text-[11px] text-text-tertiary tracking-wider mt-0.5">
            DUAL-STACK // BUILD + ANALYZE
          </div>
        </div>

        {/* Viewfinder Bottom Status */}
        <div className="relative z-10 flex items-center justify-between text-text-tertiary font-mono text-[10px] tracking-wider uppercase border-t border-border-hairline/40 pt-3">
          <span>FRAME: CALIBRATED</span>
          <span className="text-channel-cyan font-semibold">99.8% CONF</span>
        </div>

        {/* Horizontal Laser Scanning Line */}
        {isScanning && !prefersReducedMotion && (
          <div
            className="absolute left-0 right-0 h-[2px] pointer-events-none z-20"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--channel-cyan), var(--accent), transparent)',
              boxShadow: '0 0 12px var(--channel-cyan)',
              animation: 'viewfinder-scan 2.4s ease-in-out infinite alternate',
            }}
          />
        )}
      </div>

      {/* 4 Precision Corner Brackets */}
      {/* Top Left */}
      <div
        className={`absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-accent transition-all duration-300 ${
          hasScrolledIn ? 'translate-x-0 translate-y-0' : '-translate-x-1 -translate-y-1'
        }`}
      />
      {/* Top Right */}
      <div
        className={`absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-accent transition-all duration-300 ${
          hasScrolledIn ? 'translate-x-0 translate-y-0' : 'translate-x-1 -translate-y-1'
        }`}
      />
      {/* Bottom Left */}
      <div
        className={`absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-accent transition-all duration-300 ${
          hasScrolledIn ? 'translate-x-0 translate-y-0' : '-translate-x-1 translate-y-1'
        }`}
      />
      {/* Bottom Right */}
      <div
        className={`absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-accent transition-all duration-300 ${
          hasScrolledIn ? 'translate-x-0 translate-y-0' : 'translate-x-1 translate-y-1'
        }`}
      />

      <style>{`
        @keyframes viewfinder-scan {
          0% { top: 4%; }
          100% { top: 96%; }
        }
      `}</style>
    </div>
  );
}

export default ScanFrame;
