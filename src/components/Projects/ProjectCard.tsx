import { useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GlitchText } from '../shared/GlitchText';

export type ProjectCategory = 'iOS' | 'Web' | 'Data';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
  iconGlyph: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView?: boolean;
}

export function ProjectCard({ project, index, isInView = true }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const delayMs = Math.min(index * 65, 300);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between rounded-card border border-border-hairline bg-panel-raised overflow-hidden ${
        project.featured ? 'lg:col-span-7' : 'lg:col-span-5'
      } ${
        isHovered
          ? 'border-violet-bright shadow-[0_12px_36px_rgba(124,58,237,0.15)]'
          : 'border-border-hairline'
      }`}
      style={{
        opacity: isInView || prefersReducedMotion ? 1 : 0,
        transform:
          isInView || prefersReducedMotion
            ? isHovered && !prefersReducedMotion
              ? 'translateY(-4px)'
              : 'translateY(0)'
            : 'translateY(24px)',
        transition: prefersReducedMotion
          ? 'none'
          : `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, border-color 250ms ease, box-shadow 300ms ease`,
      }}
    >
      {/* Visual Header / Generative Thumbnail Preview */}
      <div
        className="relative w-full h-48 sm:h-56 overflow-hidden border-b border-border-hairline flex items-center justify-center"
        style={{ background: project.gradient }}
      >
        {/* Procedural Grid Pattern inside preview */}
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

        {/* Ambient Glow */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-300 group-hover:opacity-70"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255, 46, 154, 0.25) 0%, transparent 70%)',
          }}
        />

        {/* Center Graphic Motif */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center text-text-primary transition-transform duration-500 ${
            isHovered && !prefersReducedMotion ? 'scale-110' : 'scale-100'
          }`}
        >
          <span className="font-mono text-4xl opacity-80 mb-2">{project.iconGlyph}</span>
          <span className="font-mono text-[11px] tracking-widest uppercase text-text-secondary bg-void/70 px-3 py-1 rounded-sm border border-border-hairline backdrop-blur-md">
            CASE FILE // 0{index + 1}
          </span>
        </div>

        {/* Category Pill Tag (top-left) */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`font-mono text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm border ${
              project.category === 'iOS'
                ? 'bg-channel-cyan/10 border-channel-cyan/40 text-channel-cyan'
                : project.category === 'Web'
                ? 'bg-accent/10 border-accent/40 text-accent'
                : 'bg-violet-bright/15 border-violet-bright/40 text-violet-bright'
            }`}
          >
            {project.category}
          </span>
        </div>

        {/* Metric Callout Pill (top-right) */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-1.5 bg-void/80 backdrop-blur-md border border-border-hairline px-2.5 py-1 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[11px] text-text-primary font-medium">
              {project.metric}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          {/* Title & Description */}
          <div className="flex items-start justify-between gap-4">
            {project.featured ? (
              <GlitchText
                as="h3"
                trigger={isInView}
                delay={delayMs + 120}
                hoverGlitch
                className="text-card-h3 text-text-primary group-hover:text-white transition-colors"
              >
                {project.title}
              </GlitchText>
            ) : (
              <h3 className="text-card-h3 text-text-primary group-hover:text-white transition-colors">
                {project.title}
              </h3>
            )}

            {/* Quick Links Header */}
            <div className="flex items-center gap-2 shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm border border-border-hairline flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-violet-bright transition-colors"
                  aria-label={`View ${project.title} source on GitHub`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm border border-border-hairline flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors"
                  aria-label={`Open ${project.title} live demo`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <p className="text-body text-text-secondary mt-3 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills Footer */}
        <div className="mt-6 pt-5 border-t border-border-hairline/60 flex flex-wrap items-center gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-text-secondary bg-void/60 px-2.5 py-1 rounded-sm border border-border-hairline transition-all duration-200 hover:border-violet-bright hover:text-text-primary hover:-translate-y-0.5 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
