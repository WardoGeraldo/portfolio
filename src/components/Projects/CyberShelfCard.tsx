import { useState, forwardRef, type CSSProperties } from 'react';
import { GlitchText } from '../shared/GlitchText';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface CyberProject {
  id: string;
  title: string;
  category: 'iOS' | 'Web' | 'Data';
  codeNumber: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  accent: string;
  glyph: string;
  status: string;
}

interface CyberShelfCardProps {
  project: CyberProject;
  index: number;
  isActive: boolean;
  style?: CSSProperties;
  onSelect?: () => void;
}

export const CyberShelfCard = forwardRef<HTMLElement, CyberShelfCardProps>(
  function CyberShelfCard(
    { project, index, isActive, style, onSelect },
    ref
  ) {
    const prefersReducedMotion = useReducedMotion();
    const [isHovered, setIsHovered] = useState(false);

    // Category accent colors (CMYK channel split)
    const categoryColor =
      project.category === 'iOS'
        ? 'var(--channel-cyan, #00F0FF)'
        : project.category === 'Web'
        ? 'var(--channel-magenta, #FF2E9A)'
        : 'var(--channel-yellow, #FFE600)';

    return (
      <article
        ref={ref}
        onClick={onSelect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-[88vw] sm:w-[560px] md:w-[620px] lg:w-[680px] max-w-[720px] flex-shrink-0 rounded-card bg-panel-raised border overflow-hidden shadow-2xl select-none transition-[border-color,box-shadow,opacity] duration-300 cursor-pointer ${
          isActive
            ? 'border-violet-bright ring-1 ring-violet-bright/30'
            : isHovered
            ? 'border-violet-mid ring-1 ring-violet-mid/20'
            : 'border-border-hairline'
        }`}
        style={{
          ...style,
          boxShadow: isActive
            ? `0 24px 50px -12px rgba(0, 0, 0, 0.9), 0 0 35px -8px ${categoryColor}25, inset 0 1px 0 rgba(255, 255, 255, 0.12)`
            : isHovered
            ? '0 20px 40px -10px rgba(0, 0, 0, 0.75), 0 0 25px -8px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 16px 36px -10px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
      {/* Top Hairline Channel Accent */}
      <div
        className="h-[2px] w-full transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${categoryColor} 30%, ${categoryColor} 70%, transparent 100%)`,
          opacity: isActive || isHovered ? 0.9 : 0.4,
        }}
      />

      {/* Cyber Card Header / Telemetry Bar */}
      <div className="px-4 sm:px-5 py-2.5 bg-void/80 border-b border-border-hairline/80 flex items-center justify-between text-small-meta">
        {/* Left: Category Tag & Glyph */}
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-sm border uppercase"
            style={{
              color: categoryColor,
              borderColor: `${categoryColor}50`,
              backgroundColor: `${categoryColor}15`,
            }}
          >
            [{project.category}]
          </span>
          <span className="font-mono text-text-tertiary text-[11px]">
            // {project.codeNumber}
          </span>
        </div>

        {/* Center: Status indicator */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-text-tertiary">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: categoryColor,
              boxShadow: `0 0 8px ${categoryColor}`,
            }}
          />
          <span className="tracking-widest uppercase">{project.status}</span>
        </div>

        {/* Right: Metric Callout Pill */}
        <div className="flex items-center gap-1.5 bg-panel px-2 py-0.5 rounded-sm border border-border-hairline">
          <span className="text-text-tertiary text-[10px] font-mono hidden md:inline">
            {project.metricLabel}:
          </span>
          <span
            className="font-mono text-xs font-semibold"
            style={{ color: categoryColor }}
          >
            {project.metric}
          </span>
        </div>
      </div>

      {/* Card Content Grid: 2 Columns on Desktop, 1 Column on Mobile */}
      <div className="p-4 sm:p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Column: Information & Specs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3 sm:space-y-4">
          <div>
            <div className="flex items-center gap-2 text-text-tertiary text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mb-1">
              <span>VOL. 0{index + 1}</span>
              <span>—</span>
              <span>{project.subtitle}</span>
            </div>

            <GlitchText
              as="h3"
              hoverGlitch={!prefersReducedMotion}
              className="text-lg sm:text-xl md:text-card-h3 font-bold text-text-primary tracking-tight leading-snug"
            >
              {project.title}
            </GlitchText>

            <p className="text-body text-text-secondary mt-2 text-xs sm:text-sm leading-relaxed line-clamp-3 lg:line-clamp-none">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1.5">
              COMPILED TECH STACK:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] sm:text-[11px] text-text-secondary bg-void/80 px-2 py-0.5 rounded-sm border border-border-hairline hover:border-violet-bright hover:text-text-primary transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-1 flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 border"
                style={{
                  backgroundColor: `${categoryColor}15`,
                  borderColor: `${categoryColor}60`,
                  color: categoryColor,
                }}
              >
                <span>Live Demo</span>
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm font-mono text-xs text-text-secondary hover:text-text-primary bg-panel border border-border-hairline hover:border-border-hairline/80 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Source</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Custom Domain Technical Preview Mockup (5 cols) */}
        <div className="hidden sm:block lg:col-span-5 bg-void/90 rounded-md border border-border-hairline p-3 sm:p-3.5 overflow-hidden relative font-mono text-xs">
          {/* Subtle Grid Watermark */}
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

          {/* Project Specific Renderers */}
          {project.id === 'singaplan' && (
            <div className="space-y-2.5 relative z-10">
              <div className="flex items-center justify-between border-b border-border-hairline/60 pb-1.5 text-[10px] text-text-tertiary">
                <span className="text-channel-cyan font-bold">SINGAPLAN // V1.4</span>
                <span>GPS: 1.35°N 103.82°E</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 p-1.5 rounded bg-panel/70 border border-border-hairline">
                  <span className="w-1.5 h-1.5 rounded-full bg-channel-cyan animate-pulse" />
                  <span className="text-text-primary text-[10px] sm:text-[11px] font-semibold">Jewel Rain Vortex</span>
                  <span className="ml-auto text-[9px] text-text-tertiary">09:30</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-panel/50 border border-border-hairline/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-channel-magenta" />
                  <span className="text-text-secondary text-[10px] sm:text-[11px]">Maxwell Culinary</span>
                  <span className="ml-auto text-[9px] text-text-tertiary">12:15</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded bg-panel/50 border border-border-hairline/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-channel-yellow" />
                  <span className="text-text-secondary text-[10px] sm:text-[11px]">Marina Bay Skydeck</span>
                  <span className="ml-auto text-[9px] text-text-tertiary">15:45</span>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-between text-[10px] text-text-tertiary">
                <span className="text-channel-cyan font-mono">PARALYSIS FILTER</span>
                <span className="bg-channel-cyan/10 text-channel-cyan px-1.5 py-0.5 rounded border border-channel-cyan/30 text-[9px]">
                  SOLVER: 6.4ms
                </span>
              </div>
            </div>
          )}

          {project.id === 'queue-ease' && (
            <div className="space-y-2.5 relative z-10">
              <div className="flex items-center justify-between border-b border-border-hairline/60 pb-1.5 text-[10px] text-text-tertiary">
                <span className="text-channel-magenta font-bold">QUEUE_EASE // WS_NODE</span>
                <span>WS: 8ms</span>
              </div>
              <div className="p-2.5 bg-panel/80 rounded border border-channel-magenta/30 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-text-tertiary block">NOW SERVING</span>
                  <span className="text-lg font-bold text-channel-magenta tracking-wider">#A-042</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-text-tertiary block">WAITING POOL</span>
                  <span className="text-xs font-semibold text-text-primary">14 In Queue</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                <div className="p-1.5 rounded bg-void/80 border border-border-hairline">
                  <span className="text-text-tertiary block">CTR 01</span>
                  <span className="text-channel-cyan">#A-041 [DONE]</span>
                </div>
                <div className="p-1.5 rounded bg-void/80 border border-border-hairline">
                  <span className="text-text-tertiary block">CTR 02</span>
                  <span className="text-channel-magenta">#A-042 [CALL]</span>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-between text-[10px] text-text-tertiary">
                <span className="text-channel-magenta font-mono">THROUGHPUT: +45%</span>
                <span className="bg-channel-magenta/10 text-channel-magenta px-1.5 py-0.5 rounded border border-channel-magenta/30 text-[9px]">
                  AVG: 3.2m
                </span>
              </div>
            </div>
          )}

          {project.id === 'lilzbake-analytics' && (
            <div className="space-y-2.5 relative z-10">
              <div className="flex items-center justify-between border-b border-border-hairline/60 pb-1.5 text-[10px] text-text-tertiary">
                <span className="text-channel-yellow font-bold">LILZBAKE // PIPELINE</span>
                <span>ETL: SYNCED</span>
              </div>
              <div className="space-y-1.5 text-[10px]">
                <div>
                  <div className="flex justify-between text-[9px] text-text-secondary mb-0.5">
                    <span>Sourdough Loaf</span>
                    <span className="text-channel-cyan font-bold">+42%</span>
                  </div>
                  <div className="w-full h-1 bg-void rounded-full overflow-hidden">
                    <div className="h-full bg-channel-cyan rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-text-secondary mb-0.5">
                    <span>Almond Croissant</span>
                    <span className="text-channel-magenta font-bold">+28%</span>
                  </div>
                  <div className="w-full h-1 bg-void rounded-full overflow-hidden">
                    <div className="h-full bg-channel-magenta rounded-full" style={{ width: '74%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-text-secondary mb-0.5">
                    <span>Brioche Buns</span>
                    <span className="text-channel-yellow font-bold">+19%</span>
                  </div>
                  <div className="w-full h-1 bg-void rounded-full overflow-hidden">
                    <div className="h-full bg-channel-yellow rounded-full" style={{ width: '58%' }} />
                  </div>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-between text-[10px] text-text-tertiary">
                <span className="text-channel-yellow font-mono">ROI: +38.4%</span>
                <span className="bg-channel-yellow/10 text-channel-yellow px-1.5 py-0.5 rounded border border-channel-yellow/30 text-[9px]">
                  ZERO STOCKOUTS
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
});

export default CyberShelfCard;
