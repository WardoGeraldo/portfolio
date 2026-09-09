/**
 * StoryCard — a single beat card in the hero scroll-scrub sequence.
 *
 * From 11-hero-scroll-scrub.md:
 * - Index number (01/04), icon glyph, title, description
 * - Segmented progress ticks at card foot
 * - All card content in DOM at all times (for accessibility)
 * - Visually de-emphasized when inactive
 */

import { type FC } from 'react'

export interface Beat {
  index: number
  total: number
  label: string
  title: string
  description: string
  icon: string
  color: string
  from: number // progress range start
  to: number   // progress range end
  ctaHref?: string
  ctaLabel?: string
}

interface StoryCardProps {
  beat: Beat
  isActive: boolean
  /** 0-1 progress within this specific beat */
  localProgress: number
  /** 0-1 overall progress across all beats */
  globalProgress: number
  allBeats: Beat[]
  reducedMotion: boolean
}

const StoryCard: FC<StoryCardProps> = ({
  beat,
  isActive,
  localProgress,
  allBeats,
  reducedMotion,
}) => {
  return (
    <div
      className={`
        transition-all duration-500
        ${reducedMotion ? '' : 'ease-[cubic-bezier(0.16,1,0.3,1)]'}
        ${isActive
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
        ${reducedMotion ? 'opacity-100 translate-y-0 pointer-events-auto' : ''}
      `}
      aria-hidden={!isActive && !reducedMotion}
    >
      {/* Card container */}
      <div className="rounded-card border border-border-hairline bg-panel/80 backdrop-blur-sm p-6 max-w-[400px]">
        {/* Index + Icon row */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="font-mono text-sm font-medium"
            style={{ color: beat.color }}
          >
            {String(beat.index).padStart(2, '0')} / {String(beat.total).padStart(2, '0')}
          </span>
          <span
            className="text-lg"
            style={{ color: beat.color }}
            aria-hidden="true"
          >
            {beat.icon}
          </span>
        </div>

        {/* Label */}
        <p
          className="font-mono text-xs font-medium tracking-[0.08em] uppercase mb-2"
          style={{ color: beat.color }}
        >
          {beat.label}
        </p>

        {/* Title */}
        <h3 className="text-card-h3 text-text-primary mb-3">
          {beat.title}
        </h3>

        {/* Description */}
        <p className="text-body text-text-secondary text-sm leading-relaxed">
          {beat.description}
        </p>

        {/* CTA (beat 4 only) */}
        {beat.ctaHref && (
          <a
            href={beat.ctaHref}
            className="inline-flex items-center mt-4 px-5 py-2.5 rounded-sm bg-accent text-void font-mono text-xs font-medium tracking-wide uppercase hover:opacity-90 transition-opacity"
          >
            {beat.ctaLabel || 'Get in touch'}
          </a>
        )}

        {/* ── Segmented progress ticks ────────────────── */}
        <div className="flex gap-1 mt-5">
          {allBeats.map((b, i) => {
            const beatIdx = b.index - 1
            const currentIdx = beat.index - 1

            // Determine fill state
            let fillScale = 0
            if (beatIdx < currentIdx) {
              // Completed beat — full fill
              fillScale = 1
            } else if (beatIdx === currentIdx && isActive) {
              // Current beat — animated fill
              fillScale = localProgress
            }

            return (
              <div
                key={i}
                className="h-[3px] flex-1 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(42, 27, 69, 0.6)' }}
              >
                <div
                  className="h-full rounded-full transition-transform origin-left"
                  style={{
                    backgroundColor: beat.color,
                    transform: `scaleX(${fillScale})`,
                    transitionDuration: beatIdx === currentIdx ? '100ms' : '300ms',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StoryCard
