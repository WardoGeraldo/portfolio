import { useRef, useState, useEffect, useCallback } from 'react';
import { CyberShelfCard, type CyberProject } from './CyberShelfCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PROJECTS: CyberProject[] = [
  {
    id: 'singaplan',
    title: 'Singaplan — Travel Itinerary Engine',
    category: 'iOS',
    codeNumber: 'CASE // 001',
    subtitle: 'Heuristic Decision Matrix',
    synopsis:
      'Native iOS application engineered to filter multi-dimensional destination data and synthesize personalized itineraries, eliminating traveler decision paralysis through real-time heuristic pruning.',
    architectureSpecs: [
      'SwiftData Local Cache & Offline State',
      'Heuristic Multi-Criteria Decision Solver',
      'Async/Await Concurrency & TaskTree Pipelines',
    ],
    metric: 'Sub-10ms Filter',
    metricLabel: 'Search latency',
    tags: ['Swift', 'SwiftUI', 'SwiftData', 'CoreLocation', 'MapKit'],
    liveUrl: 'https://apple.com',
    githubUrl: 'https://github.com/WardoGeraldo',
    accent: '#00F0FF',
    glyph: '⌘',
    status: 'APP STORE DEPLOYED',
    telemetryChip: 'LATENCY: <10ms',
  },
  {
    id: 'queue-ease',
    title: 'QueueEase — Digital Queue Platform',
    category: 'Web',
    codeNumber: 'CASE // 002',
    subtitle: 'Operational Flow Engine',
    synopsis:
      'A centralized digital queue management platform designed to eliminate physical waiting lines, stream live ticket states across distributed counters, and maximize operational throughput.',
    architectureSpecs: [
      'WebSocket Full-Duplex Telemetry Stream',
      'Distributed Counter Dispatch Matrix',
      'Atomic Ticket State & Concurrency Lock',
    ],
    metric: '-45% Wait Time',
    metricLabel: 'Throughput lift',
    tags: ['TypeScript', 'React', 'Next.js', 'TailwindCSS', 'WebSocket'],
    liveUrl: 'https://github.com/WardoGeraldo',
    githubUrl: 'https://github.com/WardoGeraldo',
    accent: '#FF2E9A',
    glyph: '⬡',
    status: 'PRODUCTION LIVE',
    telemetryChip: 'WS LATENCY: <8ms',
  },
  {
    id: 'lilzbake-analytics',
    title: 'LilzBake Analytics — Bakery Telemetry',
    category: 'Data',
    codeNumber: 'CASE // 003',
    subtitle: 'Campaign & Inventory Intelligence',
    synopsis:
      'Commercial bakery analytics pipeline and promotional content tracking engine, transforming raw transactional POS feeds and social campaigns into predictive sales velocity models.',
    architectureSpecs: [
      'FastAPI Streaming Ingestion Node',
      'Pandas Predictive Sales Velocity Pipeline',
      'Algorithmic Demand Smoothing & Restock',
    ],
    metric: '+38.4% Promo ROI',
    metricLabel: 'Conversion lift',
    tags: ['Python', 'Pandas', 'FastAPI', 'SQL', 'NumPy'],
    liveUrl: 'https://github.com/WardoGeraldo',
    githubUrl: 'https://github.com/WardoGeraldo',
    accent: '#FFE600',
    glyph: '◈',
    status: 'ENGAGEMENT PIPELINE',
    telemetryChip: 'ETL: 1,420 EVT/SEC',
  },
];

export function CyberShelf() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [cardWidth, setCardWidth] = useState(1152);

  // Measure card width dynamically for pixel-perfect track centering
  useEffect(() => {
    const updateDimensions = () => {
      if (firstCardRef.current) {
        setCardWidth(firstCardRef.current.offsetWidth);
      }
    };
    updateDimensions();
    // Re-check after initial layout paint
    const timer = setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Scroll listener tracking continuous progress through the pinned container
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollProgress(rawProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [prefersReducedMotion]);

  // Map progress to floating active index [0..N-1]
  const cardCount = PROJECTS.length;
  const activeFloat = scrollProgress * (cardCount - 1);
  const activeIndex = Math.min(Math.round(activeFloat), cardCount - 1);

  // 6rem (96px) gap on desktop, 3rem (48px) gap on mobile (<640px)
  const gap = typeof window !== 'undefined' && window.innerWidth < 640 ? 48 : 96;
  const step = cardWidth + gap;

  // Scroll directly to a project card
  const scrollToCard = useCallback((index: number) => {
    if (prefersReducedMotion) {
      setActiveTab(index);
      return;
    }
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = containerTop + (index / (cardCount - 1)) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, [cardCount, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        prefersReducedMotion ? 'py-12' : 'h-[300vh]'
      }`}
    >
      {/* Sticky Full-Viewport Stage */}
      <div
        className={`${
          prefersReducedMotion
            ? 'relative w-[92vw] sm:w-[88vw] lg:w-[80vw] max-w-[1222px] mx-auto'
            : 'sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-3 sm:pb-4'
        }`}
      >
        {/* Section Header & Spatial HUD — Aligned flush with projected card width */}
        <div className="w-[92vw] sm:w-[88vw] lg:w-[80vw] max-w-[1222px] mx-auto relative z-30 mb-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 py-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-small-meta text-accent">[02] // Projects</span>
                <span className="text-border-hairline">|</span>
                <span className="font-mono text-[11px] text-text-tertiary">3D CURVED CYBER SHELF</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-section-h2 text-text-primary">
                Featured Case Files.
              </h2>
            </div>

            {/* Stepper Tabs */}
            <div
              className="flex items-center gap-1.5 p-1 rounded bg-void/90 border border-border-hairline self-start sm:self-auto"
              role="tablist"
              aria-label="Cyber shelf volume selector"
            >
              {PROJECTS.map((p, idx) => {
                const isSelected = prefersReducedMotion
                  ? activeTab === idx
                  : activeIndex === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => scrollToCard(idx)}
                    role="tab"
                    aria-selected={isSelected}
                    className={`px-3 py-1 rounded font-mono text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-accent/15 border-accent text-accent font-semibold shadow-[0_0_12px_rgba(255,46,154,0.3)]'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
                    }`}
                  >
                    0{idx + 1} // {p.category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3D Perspective Curved Rail Viewport */}
        <div
          className="w-full relative z-20 flex-1 flex items-center justify-center min-h-[420px] sm:min-h-[500px] overflow-hidden"
          style={{
            perspective: '1400px',
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
          }}
        >
          {prefersReducedMotion ? (
            // Reduced motion fallback: Clean static single card view
            <div className="w-full flex justify-center py-4">
              <CyberShelfCard
                project={PROJECTS[activeTab]}
                index={activeTab}
                isActive={true}
                style={{ position: 'relative' }}
              />
            </div>
          ) : (
            // 3D Horizontal Rail Track (Cover Flow Curved Shelf)
            <div
              className="flex items-center absolute top-[57%] sm:top-[50%]"
              style={{
                left: '50%',
                transformStyle: 'preserve-3d',
                gap: `${gap}px`,
                transform: `translate3d(calc(-${cardWidth / 2}px - ${activeFloat * step}px), -50%, 0)`,
                willChange: 'transform',
              }}
            >
              {PROJECTS.map((project, i) => {
                const rel = i - activeFloat;
                const isFocused = Math.abs(rel) < 0.45;

                // Clamp relative distance for smooth Cover Flow geometry [-1 .. 1]
                const c = Math.max(-1, Math.min(1, rel));
                const absC = Math.abs(c);

                // Center (Active): rotateY(0deg), Left (c < 0): rotateY(20deg), Right (c > 0): rotateY(-20deg)
                const rotY = -c * 20;

                // Center: translateZ(80px), Left/Right: translateZ(-100px)
                const z = 80 - absC * 180;

                // Center: scale(1.0), Left/Right: scale(0.90)
                const scale = 1 - absC * 0.10;

                // Center: opacity(1.0), Left/Right: opacity(0.35) - razor sharp without blur
                const opacity = 1 - absC * 0.65;

                // Active card stays in front in stacking hierarchy
                const zIndex = Math.round(30 - Math.abs(rel) * 10);

                const cardTransform = `translateZ(${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;

                return (
                  <CyberShelfCard
                    key={project.id}
                    ref={i === 0 ? firstCardRef : undefined}
                    project={project}
                    index={i}
                    isActive={isFocused}
                    onSelect={() => scrollToCard(i)}
                    style={{
                      transform: cardTransform,
                      opacity,
                      zIndex,
                      transformStyle: 'preserve-3d',
                      transformOrigin: '50% 50%',
                      willChange: 'transform, opacity',
                      // ZERO CSS BLUR — 100% razor sharp text rendering
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Spatial HUD: Bottom Status & CMYK Progress Bar — Aligned flush with card width */}
        <div className="w-[92vw] sm:w-[88vw] lg:w-[80vw] max-w-[1222px] mx-auto relative z-30 mt-2">
          <div className="flex items-center justify-between gap-4 py-2.5 px-4 rounded-sm bg-void/90 border border-border-hairline text-small-meta">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-text-tertiary">
              <span className="text-accent animate-pulse">◀ / ▶</span>
              <span className="hidden sm:inline">SCROLL TO SLIDE SHELF //</span>
              <span className="text-text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
                ACTIVE: {PROJECTS[activeIndex].title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] sm:text-[11px] text-text-secondary">
                0{activeIndex + 1} / 0{cardCount}
              </span>
              <div className="w-20 sm:w-36 h-1.5 bg-void rounded-full overflow-hidden border border-border-hairline">
                <div
                  className="h-full bg-gradient-to-r from-channel-cyan via-channel-magenta to-channel-yellow rounded-full transition-all duration-150"
                  style={{
                    width: `${Math.round(
                      ((activeFloat) / (cardCount - 1)) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CyberShelf;
