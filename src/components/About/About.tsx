import { ScanFrame } from './ScanFrame';
import { StatCounter } from './StatCounter';
import { IdentityCore } from './IdentityCore';
import { DisciplineCards } from './DisciplineCards';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function About() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({ threshold: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-panel border-t border-border-hairline overflow-hidden"
      aria-label="About"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--violet-bright) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div
          className="mb-10 md:mb-12"
          style={{
            opacity: isInView || prefersReducedMotion ? 1 : 0,
            transform: isInView || prefersReducedMotion ? 'translateY(0)' : 'translateY(20px)',
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="text-small-meta text-accent mb-3">[01] // About</p>
          <h2 className="text-section-h2 text-text-primary">
            Engineering Craft <br className="hidden sm:inline" />
            <span className="text-text-secondary font-normal">&amp; Empirical Rigor.</span>
          </h2>
        </div>

        {/* Two-column layout: Left = Viewfinder Glitch Portrait, Right = Identity Core & Dual Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (5 Cols: Viewfinder Glitch Portrait) */}
          <div
            className="lg:col-span-5 h-full flex flex-col"
            style={{
              opacity: isInView || prefersReducedMotion ? 1 : 0,
              transform: isInView || prefersReducedMotion ? 'translateY(0)' : 'translateY(24px)',
              transition: prefersReducedMotion
                ? 'none'
                : 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 100ms',
            }}
          >
            <ScanFrame />
          </div>

          {/* Right Column (7 Cols: Identity Core + Dual Disciplines + Metrics) */}
          <div
            className="lg:col-span-7 h-full flex flex-col justify-between gap-5"
            style={{
              opacity: isInView || prefersReducedMotion ? 1 : 0,
              transform: isInView || prefersReducedMotion ? 'translateY(0)' : 'translateY(24px)',
              transition: prefersReducedMotion
                ? 'none'
                : 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 180ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 180ms',
            }}
          >
            {/* Tier 1: Identity Core & Lead Header */}
            <div className="rounded-card bg-panel-raised border border-border-hairline p-4 sm:p-5 flex items-center gap-4 sm:gap-6 group">
              <IdentityCore />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-accent tracking-widest uppercase">
                    [01] // IDENTITY CORE
                  </span>
                  <span className="text-border-hairline">|</span>
                  <span className="font-mono text-[10px] text-text-tertiary uppercase hidden sm:inline">
                    ENGINEERING THESIS
                  </span>
                </div>
                <p className="text-base sm:text-lg lg:text-[19px] font-bold text-text-primary leading-snug tracking-tight">
                  iOS &amp; Full-Stack Engineer bridging tactile native interfaces with telemetry-driven web architectures.
                </p>
              </div>
            </div>

            {/* Tier 2: Dual Discipline Modules (Side-by-side cards) */}
            <DisciplineCards />

            {/* Tier 3: Philosophy Chip & Live Metrics */}
            <div className="flex flex-col gap-4">
              {/* Philosophy Terminal Chip */}
              <div className="px-4 py-2.5 rounded-sm bg-void/90 border-l-2 border-accent border-y border-r border-border-hairline flex items-center gap-3">
                <span className="font-mono text-accent font-bold text-sm select-none">&gt;</span>
                <span className="font-mono text-xs sm:text-[13px] text-text-primary tracking-wide italic">
                  &ldquo;Code with architectural intent. Data with empirical rigor.&rdquo;
                </span>
              </div>

              {/* Metric Counter HUD */}
              <StatCounter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
