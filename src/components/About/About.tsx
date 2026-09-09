import { ScanFrame } from './ScanFrame';
import { StatCounter } from './StatCounter';
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
          className="mb-12 md:mb-16"
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

        {/* Two-column layout: Left = ScanFrame Viewfinder, Right = Narrative & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (Viewfinder Avatar Treatment) */}
          <div
            className="lg:col-span-5 flex justify-center"
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

          {/* Right Column (Narrative Bio + Pull Quote + Stat Row) */}
          <div
            className="lg:col-span-7 flex flex-col gap-6"
            style={{
              opacity: isInView || prefersReducedMotion ? 1 : 0,
              transform: isInView || prefersReducedMotion ? 'translateY(0)' : 'translateY(24px)',
              transition: prefersReducedMotion
                ? 'none'
                : 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 180ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 180ms',
            }}
          >
            <p className="text-body text-text-primary leading-relaxed text-lg font-normal">
              I am an <span className="text-white font-medium">iOS &amp; Full-Stack Engineer</span> who 
              treats software as both high-performance craft and measurable science. My work bridges the 
              tactile elegance of native mobile interfaces with robust full-stack web architectures.
            </p>

            <p className="text-body text-text-secondary leading-relaxed">
              With a background in data science and analytics, I don't build in a vacuum. Every latency 
              optimization, interaction model, and pipeline is grounded in telemetry and empirical 
              insights. Whether orchestrating Swift concurrency or optimizing complex SQL pipelines, 
              my focus is clean architecture and products built to endure.
            </p>

            {/* Pull-quote / Engineering Philosophy One-Liner */}
            <div className="my-2 pl-4 border-l-2 border-accent bg-white/[0.02] py-3 pr-4 rounded-r-sm">
              <blockquote className="font-mono text-sm sm:text-base text-accent italic tracking-wide">
                &ldquo;Code with architectural intent. Data with empirical rigor.&rdquo;
              </blockquote>
            </div>

            <p className="text-body text-text-secondary leading-relaxed">
              Currently focused on next-generation native iOS experiences, WebGL spatial interactions, 
              and automated data pipelines that transform ambiguity into clarity.
            </p>

            {/* Live Count-up Stat Row */}
            <div className="mt-4">
              <StatCounter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
