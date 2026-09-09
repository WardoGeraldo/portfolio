/**
 * Hero — scroll-scrub implementation per 11-hero-scroll-scrub.md.
 *
 * Architecture:
 * - 400vh scroll spacer with a sticky 100svh stage inside
 * - Scroll progress (0→1) drives a Three.js node-graph canvas
 * - 4 story cards synced to progress beats
 * - CMYK glitch-resolve entrance on name/title (plays once on load)
 * - prefers-reduced-motion: no pinning, static layout, all cards visible
 */

import {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useScrollScrub } from '../../hooks/useScrollScrub'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GlitchText } from '../shared/GlitchText'
import StoryCard, { type Beat } from './StoryCard'

// Lazy-load Three.js canvas (per 09-technical-architecture.md: don't block first paint)
const HeroCanvas = lazy(() => import('./HeroCanvas'))

// ── Beat definitions from 11-hero-scroll-scrub.md ────────────

const BEATS: Beat[] = [
  {
    index: 1,
    total: 4,
    label: 'Build',
    title: 'I build things end-to-end.',
    description:
      '[PLACEHOLDER: one line on iOS + Web craft — e.g. "Native iOS apps and modern web products, from first sketch to shipped release."]',
    icon: '▹',
    color: '#00F0FF', // --channel-cyan
    from: 0,
    to: 0.25,
  },
  {
    index: 2,
    total: 4,
    label: 'Analyze',
    title: 'I make sense of the data.',
    description:
      '[PLACEHOLDER: e.g. "Turning raw datasets into decisions — analysis that actually gets used."]',
    icon: '▦',
    color: '#FF2E9A', // --channel-magenta
    from: 0.25,
    to: 0.5,
  },
  {
    index: 3,
    total: 4,
    label: 'Craft',
    title: 'Precision in every layer.',
    description:
      '[PLACEHOLDER: e.g. "Clean architecture, considered UX, code built to last past launch day."]',
    icon: '◆',
    color: '#7C3AED', // --violet-bright
    from: 0.5,
    to: 0.75,
  },
  {
    index: 4,
    total: 4,
    label: 'Ship',
    title: 'Currently building. Always learning.',
    description:
      '[PLACEHOLDER: e.g. "Open to new opportunities — let\'s build something."]',
    icon: '▪',
    color: '#FF2E9A', // Full CMYK split in scene
    from: 0.75,
    to: 1.0,
    ctaHref: '#contact',
    ctaLabel: 'Get in touch',
  },
]

/**
 * Determine which beat is active and the local progress within it.
 */
function getActiveBeat(progress: number): {
  activeIndex: number
  localProgress: number
} {
  const p = Math.max(0, Math.min(1, progress))

  for (let i = 0; i < BEATS.length; i++) {
    const beat = BEATS[i]
    if (p >= beat.from && (p < beat.to || i === BEATS.length - 1)) {
      const range = beat.to - beat.from
      const local = range > 0 ? (p - beat.from) / range : 0
      return { activeIndex: i, localProgress: Math.min(1, Math.max(0, local)) }
    }
  }

  return { activeIndex: 0, localProgress: 0 }
}

// ── Scroll affordance ──────────────────────────────────────────

const ScrollAffordance = memo(function ScrollAffordance({
  visible,
}: {
  visible: boolean
}) {
  return (
    <div
      className={`
        absolute bottom-6 left-1/2 -translate-x-1/2 z-20
        flex flex-col items-center gap-1.5
        transition-opacity duration-500
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      aria-hidden="true"
    >
      <span className="font-mono text-xs tracking-[0.1em] uppercase text-text-tertiary">
        scroll
      </span>
      <span className="font-mono text-accent text-sm animate-pulse">█</span>
    </div>
  )
})

// ── Main Hero component ────────────────────────────────────────

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const spacerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollScrub(spacerRef)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [subHidden, setSubHidden] = useState(false)

  // Track first scroll for affordance fade-out
  useEffect(() => {
    if (progress > 0.01 && !hasScrolled) {
      setHasScrolled(true)
    }
  }, [progress, hasScrolled])

  // Subtitle fades out on first scroll (per spec: "subHidden" state)
  useEffect(() => {
    if (progress > 0.02 && !subHidden) {
      setSubHidden(true)
    } else if (progress <= 0.02 && subHidden) {
      setSubHidden(false)
    }
  }, [progress, subHidden])

  // Active beat calculation
  const { activeIndex, localProgress } = useMemo(
    () => getActiveBeat(progress),
    [progress]
  )

  // ── Reduced motion: static layout ──
  if (reducedMotion) {
    return (
      <section id="hero" className="bg-void" aria-label="Hero">
        <div className="min-h-svh flex items-center relative pt-20 pb-16">
          {/* Grid + glow backgrounds */}
          <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(46, 16, 101, 0.35) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="section-container relative z-10 w-full">
            {/* Kicker */}
            <p className="text-small-meta text-text-tertiary mb-4">
              [00] // Portfolio.compile()
            </p>

            {/* Name */}
            <h1 className="text-hero-h1 text-text-primary mb-3">
              Edward Geraldo Kristian
            </h1>

            {/* Title */}
            <p className="font-mono text-base md:text-lg text-text-secondary tracking-wide">
              iOS &amp; Web Developer | Data Analyst
            </p>

            {/* One-liner */}
            <p className="text-body text-text-secondary mt-5 max-w-[640px]">
              [PLACEHOLDER: one sentence — e.g. &quot;I build things that ship,
              and I make sense of the data behind them.&quot;]
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="inline-flex items-center px-6 py-3 rounded-sm bg-accent text-void font-mono text-sm font-medium tracking-wide uppercase hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_0_24px_rgba(255,46,154,0.3)]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-4 py-3 text-text-secondary hover:text-accent font-mono text-sm tracking-wide transition-colors"
              >
                Get in touch →
              </a>
            </div>

            {/* All 4 cards shown stacked in a clean grid */}
            <div className="mt-14 grid gap-5 sm:grid-cols-2 max-w-[840px]">
              {BEATS.map((beat) => (
                <StoryCard
                  key={beat.index}
                  beat={beat}
                  isActive={true}
                  localProgress={1}
                  globalProgress={1}
                  allBeats={BEATS}
                  reducedMotion={true}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Full scroll-scrub layout ──
  return (
    <section id="hero" aria-label="Hero">
      {/* 400vh scroll spacer */}
      <div ref={spacerRef} className="relative" style={{ height: '400vh' }}>
        {/* Sticky stage — pinned at top of viewport */}
        <div className="sticky top-0 h-svh overflow-hidden bg-void">
          {/* ── Three.js canvas (lazy-loaded) ── */}
          <div className="absolute inset-0 z-0">
            <Suspense fallback={null}>
              <HeroCanvas progress={progress} />
            </Suspense>
          </div>

          {/* ── Grid background ── */}
          <div className="bg-grid pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

          {/* ── Violet radial glow ── */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(46, 16, 101, 0.35) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          {/* ── Content layer ── */}
          <div className="relative z-10 flex h-full items-center pt-16 md:pt-20 lg:pt-0 pb-16 lg:pb-0">
            <div className="w-full px-6 md:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 max-w-[1200px] mx-auto">
              {/* Left: name/title/kicker */}
              <div className="flex-1 max-w-[620px]">
                {/* Kicker */}
                <p className="text-small-meta text-text-tertiary mb-4 md:mb-6">
                  [00] // Portfolio.compile()
                </p>

                {/* Name with CMYK glitch-resolve */}
                <GlitchText
                  as="h1"
                  className="text-hero-h1 text-text-primary mb-3 md:mb-4"
                  delay={120}
                >
                  Edward Geraldo Kristian
                </GlitchText>

                {/* Title and one-liner block */}
                <div
                  className={`
                    transition-all duration-500
                    ${subHidden ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'}
                  `}
                >
                  <GlitchText
                    as="p"
                    className="font-mono text-base md:text-lg text-text-secondary tracking-wide"
                    delay={220}
                  >
                    iOS &amp; Web Developer | Data Analyst
                  </GlitchText>

                  {/* One-liner */}
                  <p className="text-body text-text-secondary mt-5 max-w-[560px]">
                    [PLACEHOLDER: one sentence — e.g. &quot;I build things that
                    ship, and I make sense of the data behind them.&quot;]
                  </p>

                  {/* CTA row */}
                  <div className="mt-8 flex flex-wrap gap-4 items-center">
                    <a
                      href="#projects"
                      className="inline-flex items-center px-6 py-3 rounded-sm bg-accent text-void font-mono text-sm font-medium tracking-wide uppercase hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_0_24px_rgba(255,46,154,0.3)]"
                    >
                      View Projects
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center px-4 py-3 text-text-secondary hover:text-accent font-mono text-sm tracking-wide transition-colors"
                    >
                      Get in touch →
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: active story card (stacked via grid, one visible at a time) */}
              <div
                className={`
                  w-full sm:w-[380px] lg:w-[400px] flex-shrink-0 grid [&>*]:col-start-1 [&>*]:row-start-1
                  transition-all duration-500
                  ${hasScrolled ? 'opacity-100 translate-y-0' : 'max-lg:hidden lg:opacity-100 lg:translate-y-0'}
                `}
              >
                {BEATS.map((beat, i) => (
                  <StoryCard
                    key={beat.index}
                    beat={beat}
                    isActive={i === activeIndex}
                    localProgress={i === activeIndex ? localProgress : 0}
                    globalProgress={progress}
                    allBeats={BEATS}
                    reducedMotion={false}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Scroll affordance ── */}
          <ScrollAffordance visible={!hasScrolled} />
        </div>
      </div>
    </section>
  )
}
