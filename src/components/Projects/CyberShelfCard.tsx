import { useState, forwardRef, type CSSProperties } from 'react';
import { GlitchText } from '../shared/GlitchText';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SingaplanStage } from './stages/SingaplanStage';
import { QueueEaseStage } from './stages/QueueEaseStage';
import { LilzBakeStage } from './stages/LilzBakeStage';

export interface CyberProject {
  id: string;
  title: string;
  category: 'iOS' | 'Web' | 'Data';
  codeNumber: string;
  subtitle: string;
  synopsis: string;
  architectureSpecs: string[];
  metric: string;
  metricLabel: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  accent: string;
  glyph: string;
  status: string;
  telemetryChip: string;
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
    const [isStageHovered, setIsStageHovered] = useState(false);

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
        className={`w-[92vw] sm:w-[88vw] lg:w-[80vw] max-w-6xl min-h-fit lg:min-h-[540px] flex-shrink-0 rounded-card bg-panel-raised border overflow-hidden shadow-2xl select-none transition-[border-color,box-shadow,opacity] duration-300 cursor-pointer relative ${
          isActive
            ? 'border-violet-bright ring-1 ring-violet-bright/30'
            : isHovered
            ? 'border-violet-mid ring-1 ring-violet-mid/20'
            : 'border-border-hairline'
        }`}
        style={{
          ...style,
          boxShadow: isActive
            ? `0 24px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px -10px rgba(168, 85, 247, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)`
            : isHovered
            ? '0 20px 40px -10px rgba(0, 0, 0, 0.75), 0 0 25px -8px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 16px 36px -10px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Precision Corner + Crosshair Accents */}
        <span
          className="absolute top-2 left-2.5 font-mono text-xs text-text-tertiary/60 select-none pointer-events-none z-30"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute top-2 right-2.5 font-mono text-xs text-text-tertiary/60 select-none pointer-events-none z-30"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-2 left-2.5 font-mono text-xs text-text-tertiary/60 select-none pointer-events-none z-30"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-2 right-2.5 font-mono text-xs text-text-tertiary/60 select-none pointer-events-none z-30"
          aria-hidden="true"
        >
          +
        </span>

        {/* Top Hairline Channel Accent */}
        <div
          className="h-[2px] w-full transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${categoryColor} 30%, ${categoryColor} 70%, transparent 100%)`,
            opacity: isActive || isHovered ? 0.95 : 0.4,
          }}
        />

        {/* Cyber Card Header / Telemetry Bar */}
        <div className="px-5 sm:px-6 py-2.5 bg-void/90 border-b border-border-hairline/80 flex items-center justify-between text-small-meta relative z-20">
          {/* Left: Category Tag & Case Code */}
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

          {/* Center: Status indicator with pulsating emerald dot */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="tracking-widest uppercase font-semibold text-[10px] sm:text-[11px]">
              {project.status}
            </span>
          </div>

          {/* Right: Performance Telemetry Chip */}
          <div className="flex items-center gap-1.5 bg-panel px-2.5 py-0.5 rounded-sm border border-border-hairline">
            <span
              className="font-mono text-[11px] font-semibold tracking-wider uppercase"
              style={{ color: categoryColor }}
            >
              {project.telemetryChip}
            </span>
          </div>
        </div>

        {/* Card Content Grid: 12-Column Sub-grid (5 cols left, 7 cols right) */}
        <div className="p-5 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch h-full">
          {/* Left Side (5 Cols) — Technical Specification & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-text-tertiary text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">
                <span>VOL. 0{index + 1}</span>
                <span>—</span>
                <span className="text-text-secondary">{project.subtitle}</span>
              </div>

              <GlitchText
                as="h3"
                hoverGlitch={!prefersReducedMotion}
                className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight leading-snug"
              >
                {project.title}
              </GlitchText>

              <p className="text-body text-text-secondary text-xs sm:text-sm leading-relaxed hidden sm:block">
                {project.synopsis}
              </p>
            </div>

            {/* Core Architecture Specs */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">
                Core Architecture Specs:
              </div>
              <div className="space-y-1.5">
                {project.architectureSpecs.map((spec, specIdx) => (
                  <div
                    key={spec}
                    className={`${
                      specIdx >= 2 ? 'hidden sm:flex' : 'flex'
                    } items-center gap-2 text-[11px] font-mono text-text-secondary bg-void/60 px-2.5 py-1 rounded-sm border border-border-hairline/80`}
                  >
                    <span className="text-accent font-bold">›</span>
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compiled Tech Stack */}
            <div>
              <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1.5">
                COMPILED TECH STACK:
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] sm:text-[11px] text-text-secondary bg-void/80 px-2 sm:px-2.5 py-0.5 rounded-sm border border-channel-cyan/30 hover:border-channel-cyan hover:text-text-primary transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Matrix */}
            <div className="pt-1.5 sm:pt-2 flex items-center gap-2 sm:gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-200 border cursor-pointer group shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                  style={{
                    backgroundColor: `${categoryColor}18`,
                    borderColor: `${categoryColor}70`,
                    color: categoryColor,
                  }}
                >
                  <span>{project.category === 'iOS' ? 'App Store' : 'Live Demo'}</span>
                  <svg
                    className="w-3.5 h-3.5 fill-none stroke-current stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-xs text-text-secondary hover:text-text-primary bg-panel border border-border-hairline hover:border-border-hairline/80 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Side (7 Cols) — Interactive Visual Telemetry Stage */}
          <div
            className="lg:col-span-7 flex flex-col justify-stretch min-h-[340px] sm:min-h-[380px]"
            onMouseEnter={() => setIsStageHovered(true)}
            onMouseLeave={() => setIsStageHovered(false)}
          >
            {project.id === 'singaplan' && (
              <SingaplanStage isGlitching={isStageHovered && !prefersReducedMotion} />
            )}
            {project.id === 'queue-ease' && (
              <QueueEaseStage isGlitching={isStageHovered && !prefersReducedMotion} />
            )}
            {project.id === 'lilzbake-analytics' && (
              <LilzBakeStage isGlitching={isStageHovered && !prefersReducedMotion} />
            )}
          </div>
        </div>
      </article>
    );
  }
);

export default CyberShelfCard;
