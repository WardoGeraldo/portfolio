import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  meta: string;
}

const STATS: StatItem[] = [
  { value: 3, suffix: '+', label: 'Apps Shipped', meta: 'Native & Web Platforms' },
  { value: 14, suffix: '+', label: 'Datasets Analyzed', meta: 'Telemetry & Analytics' },
  { value: 50, suffix: 'k+', label: 'Data Points Processed', meta: 'Live Pipeline Throughput' },
];

export function StatCounter() {
  const prefersReducedMotion = useReducedMotion();
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));

  useEffect(() => {
    if (prefersReducedMotion) {
      setCounts(STATS.map((s) => s.value));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          const duration = 1400; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS.map((stat) => Math.floor(easeProgress * stat.value))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(STATS.map((s) => s.value));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTriggered, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 border-t border-border-hairline"
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className="flex flex-col">
          <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary flex items-baseline gap-0.5">
            <span
              className={`transition-colors duration-500 ${
                hasTriggered && !prefersReducedMotion ? 'text-accent' : 'text-text-primary'
              }`}
              style={{
                color: counts[i] < stat.value ? 'var(--accent)' : 'var(--text-primary)',
              }}
            >
              {counts[i]}
            </span>
            <span className="text-accent text-xl sm:text-2xl">{stat.suffix}</span>
          </div>
          <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-text-secondary mt-1 line-clamp-1">
            {stat.label}
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] text-text-tertiary mt-0.5 line-clamp-1">
            {stat.meta}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCounter;
