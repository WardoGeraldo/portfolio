import { useState } from 'react';

interface ProjectImageChassisProps {
  src: string;
  alt: string;
  projectIndex: number;
  projectCategory: 'iOS' | 'Web' | 'Data';
  resolutionTag?: string;
  categoryColor: string;
}

export function ProjectImageChassis({
  src,
  alt,
  projectIndex,
  projectCategory,
  resolutionTag = '1920x1080_RAW',
  categoryColor,
}: ProjectImageChassisProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative flex flex-col justify-between h-full w-full rounded-md bg-void/90 border border-border-hairline p-3 sm:p-3.5 transition-all duration-300 hover:border-violet-bright/50 hover:-translate-y-0.5 overflow-hidden select-none"
      style={{
        boxShadow: `0 0 30px -10px ${categoryColor}25, 0 12px 30px -10px rgba(0,0,0,0.8)`,
      }}
    >
      {/* 4 Precision Corner Targeting Brackets ┌ ┐ └ ┘ */}
      <span
        className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none z-20 transition-colors duration-300 group-hover:opacity-100 opacity-70"
        style={{ borderColor: categoryColor }}
        aria-hidden="true"
      />
      <span
        className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none z-20 transition-colors duration-300 group-hover:opacity-100 opacity-70"
        style={{ borderColor: categoryColor }}
        aria-hidden="true"
      />
      <span
        className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none z-20 transition-colors duration-300 group-hover:opacity-100 opacity-70"
        style={{ borderColor: categoryColor }}
        aria-hidden="true"
      />
      <span
        className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none z-20 transition-colors duration-300 group-hover:opacity-100 opacity-70"
        style={{ borderColor: categoryColor }}
        aria-hidden="true"
      />

      {/* Top Metadata Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-border-hairline/80 pb-2 text-[10px] sm:text-[11px] font-mono text-text-tertiary">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: categoryColor,
              boxShadow: `0 0 8px ${categoryColor}`,
            }}
          />
          <span className="font-bold tracking-wider" style={{ color: categoryColor }}>
            DISPLAY_PORT // 0{projectIndex + 1}
          </span>
          <span className="text-text-tertiary hidden md:inline">
            [{projectCategory.toUpperCase()}_UI]
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-text-secondary hidden sm:inline">{resolutionTag}</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[9px] sm:text-[10px]">
            SIGNAL: 100%
          </span>
        </div>
      </div>

      {/* Image Viewport: Clean, 100% unadulterated screenshot */}
      <div className="relative w-full flex-1 min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] rounded-sm overflow-hidden bg-void/95 flex items-center justify-center border border-border-hairline/60 my-2">
        {!imageError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover sm:object-contain object-center"
            style={{
              // STRICTLY ZERO FILTERS, ZERO BLUR, ZERO DUOTONE, ZERO GLITCH OVERLAYS
              filter: 'none',
              mixBlendMode: 'normal',
            }}
          />
        ) : (
          /* Fallback styled frame if image file is not yet uploaded */
          <div className="flex flex-col items-center justify-center p-6 text-center font-mono text-xs text-text-tertiary">
            <svg
              className="w-10 h-10 mb-2 opacity-40 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="text-text-secondary font-semibold">{alt}</div>
            <div className="text-[10px] text-text-tertiary mt-1">
              Awaiting upload: {src.split('/').pop()}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Chassis Footer Bar */}
      <div className="relative z-10 pt-2 border-t border-border-hairline/80 flex items-center justify-between text-[10px] font-mono text-text-tertiary">
        <div className="flex items-center gap-2">
          <span className="text-text-secondary">SECURE_VIEWPORT //</span>
          <span className="text-channel-cyan font-bold">UNPROCESSED_RAW</span>
        </div>
        <span className="text-text-tertiary hidden sm:inline">
          COLOR_SPACE: DCI-P3 · 100% TRUE COLOR
        </span>
      </div>
    </div>
  );
}

export default ProjectImageChassis;
