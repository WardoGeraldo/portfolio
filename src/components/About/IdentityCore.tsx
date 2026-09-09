import { useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function IdentityCore() {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-void/90 border border-border-hairline p-2 flex items-center justify-center group cursor-pointer select-none transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? '0 0 25px -4px rgba(0, 240, 255, 0.35), inset 0 0 15px rgba(124, 58, 237, 0.25)'
          : '0 0 15px -4px rgba(124, 58, 237, 0.15)',
      }}
      aria-label="EGK Identity Core"
    >
      {/* Outer subtle glow ring */}
      <div
        className="absolute inset-0 rounded-full border border-violet-mid/30 transition-all duration-300"
        style={{
          borderColor: isHovered ? 'var(--channel-cyan)' : 'rgba(124, 58, 237, 0.3)',
        }}
      />

      {/* Rotating dashed orbital ring */}
      <div
        className="absolute inset-1 rounded-full border border-dashed border-violet-mid/60 pointer-events-none"
        style={{
          animation: prefersReducedMotion
            ? 'none'
            : `spin ${isHovered ? '2.5s' : '10s'} linear infinite`,
        }}
      />

      {/* Radar sweeping scanner cone */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-2 rounded-full pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0, 240, 255, 0.35) 360deg)',
            animation: `spin ${isHovered ? '1.8s' : '6s'} linear infinite`,
          }}
        />
      )}

      {/* Crosshairs */}
      <div className="absolute top-1 bottom-1 w-[1px] bg-border-hairline/60 pointer-events-none" />
      <div className="absolute left-1 right-1 h-[1px] bg-border-hairline/60 pointer-events-none" />

      {/* Inner Core Disc */}
      <div className="relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-panel-raised border border-border-hairline flex flex-col items-center justify-center p-1 shadow-inner">
        {/* Heartbeat pulse dot */}
        <div className="flex items-center gap-1 mb-0.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-channel-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-channel-cyan" />
          </span>
          <span className="font-mono text-[8px] text-text-tertiary tracking-wider">LIVE</span>
        </div>

        {/* Monogram */}
        <span className="font-display text-sm sm:text-base font-bold tracking-wider text-text-primary group-hover:text-accent transition-colors">
          EGK
        </span>

        <span className="font-mono text-[7px] text-channel-cyan/90 tracking-widest uppercase">
          CORE // 01
        </span>
      </div>
    </div>
  );
}

export default IdentityCore;
