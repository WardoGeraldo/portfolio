import { useState } from 'react';

interface Discipline {
  id: string;
  codeNumber: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: 'architecture',
    codeNumber: '// 01 ARCHITECTURE',
    category: 'MOBILE & WEB CRAFT',
    title: 'Native Ergonomics & Systems',
    description:
      'High-performance Swift concurrency, SwiftUI component trees, and reactive web applications engineered for sub-frame response and modular architecture.',
    tags: ['SwiftUI', 'Concurrency', 'React', 'Systems'],
    accentColor: 'var(--channel-cyan)',
  },
  {
    id: 'rigor',
    codeNumber: '// 02 RIGOR',
    category: 'EMPIRICAL DATA ANALYSIS',
    title: 'Quantitative Validation',
    description:
      'Telemetry-backed engineering, large-scale dataset pipelines, and algorithmic optimization to eliminate guesswork through predictive analytics.',
    tags: ['FastAPI', 'Pandas', 'SQL', 'Telemetry'],
    accentColor: 'var(--channel-magenta)',
  },
];

export function DisciplineCards() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {DISCIPLINES.map((item) => {
        const isHovered = hoveredId === item.id;
        const isCyan = item.id === 'architecture';

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative rounded-card bg-panel-raised border border-border-hairline p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 group cursor-default"
            style={{
              borderColor: isHovered
                ? isCyan
                  ? 'var(--channel-cyan)'
                  : 'var(--channel-magenta)'
                : 'var(--border-hairline)',
              boxShadow: isHovered
                ? isCyan
                  ? '0 12px 28px -8px rgba(0, 0, 0, 0.7), 0 0 20px -4px rgba(0, 240, 255, 0.25)'
                  : '0 12px 28px -8px rgba(0, 0, 0, 0.7), 0 0 20px -4px rgba(255, 46, 154, 0.25)'
                : '0 8px 20px -6px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Top Hairline Channel Accent */}
            <div
              className="h-[2px] w-full mb-3 rounded-full transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, ${item.accentColor} 0%, transparent 100%)`,
                opacity: isHovered ? 1 : 0.6,
              }}
            />

            <div>
              {/* Header Telemetry */}
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-wider mb-2">
                <span
                  className="font-bold tracking-widest"
                  style={{ color: item.accentColor }}
                >
                  {item.codeNumber}
                </span>
                <span className="text-text-tertiary">[{item.category}]</span>
              </div>

              {/* Sub-headline */}
              <h4 className="text-sm sm:text-base font-bold text-text-primary tracking-tight mb-2">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-body text-text-secondary text-xs sm:text-[13px] leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-2 border-t border-border-hairline/60 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-text-secondary bg-void/80 px-2 py-0.5 rounded-sm border border-border-hairline transition-colors group-hover:text-text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DisciplineCards;
