import { useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';

interface SkillItem {
  name: string;
  level: number; // 1 to 5 (density dots)
  focus?: boolean;
}

interface SkillCluster {
  id: string;
  index: string;
  title: string;
  summary: string;
  accentColor: string;
  skills: SkillItem[];
}

const CLUSTERS: SkillCluster[] = [
  {
    id: 'ios',
    index: '01',
    title: 'iOS & Native Mobile Engineering',
    summary:
      'Architecting end-to-end native iOS experiences with Swift Concurrency, SwiftUI, Metal shaders, and hardware-level security.',
    accentColor: 'var(--channel-cyan)',
    skills: [
      { name: 'Swift', level: 5, focus: true },
      { name: 'SwiftUI', level: 5, focus: true },
      { name: 'UIKit', level: 4 },
      { name: 'Combine', level: 4 },
      { name: 'RealityKit / VisionOS', level: 4, focus: true },
      { name: 'CoreData / SwiftData', level: 4 },
      { name: 'Metal Shaders', level: 3 },
      { name: 'XCTest & CI Workflows', level: 4 },
    ],
  },
  {
    id: 'web',
    index: '02',
    title: 'Full-Stack Web Architecture',
    summary:
      'Building blazing-fast reactive web applications, scalable APIs, and interactive 3D spatial experiences with strict type safety.',
    accentColor: 'var(--accent)',
    skills: [
      { name: 'TypeScript', level: 5, focus: true },
      { name: 'React', level: 5, focus: true },
      { name: 'Next.js', level: 4 },
      { name: 'Tailwind CSS v4', level: 5, focus: true },
      { name: 'Three.js / WebGL', level: 4, focus: true },
      { name: 'Node.js / Express', level: 4 },
      { name: 'GraphQL / REST APIs', level: 4 },
      { name: 'Vite & Build Tooling', level: 5 },
    ],
  },
  {
    id: 'data',
    index: '03',
    title: 'Data Science & Analytical Telemetry',
    summary:
      'Extracting mathematical clarity from raw event streams, modeling predictive distributions, and orchestrating analytical pipelines.',
    accentColor: 'var(--violet-bright)',
    skills: [
      { name: 'Python', level: 5, focus: true },
      { name: 'Pandas & NumPy', level: 5, focus: true },
      { name: 'SQL & Database Design', level: 5, focus: true },
      { name: 'Scikit-learn', level: 4 },
      { name: 'Data Visualization (D3.js)', level: 4, focus: true },
      { name: 'Statistical Modeling', level: 4 },
      { name: 'DuckDB / Parquet', level: 4 },
      { name: 'ETL Pipeline Design', level: 4 },
    ],
  },
  {
    id: 'tools',
    index: '04',
    title: 'Tooling, Systems & Workflow',
    summary:
      'Professional engineering environments, disciplined Git hygiene, automated testing suites, and collaborative UI/UX prototyping.',
    accentColor: 'var(--channel-yellow)',
    skills: [
      { name: 'Git & GitHub Actions', level: 5 },
      { name: 'Xcode Instruments', level: 5 },
      { name: 'Docker / Containers', level: 4 },
      { name: 'Figma UI/UX Design', level: 4 },
      { name: 'Linux / Shell Scripting', level: 4 },
      { name: 'Postman / API Spec', level: 5 },
    ],
  },
];

export function Skills() {
  const prefersReducedMotion = useReducedMotion();
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-void border-t border-border-hairline overflow-hidden"
      aria-label="Skills"
    >
      {/* Background procedural grid motif */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-10" aria-hidden="true" />

      {/* Subtle radial ambient illumination */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, var(--violet-deep) 0%, transparent 70%)',
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
          <p className="text-small-meta text-accent mb-3">[03] // Skills</p>
          <h2 className="text-section-h2 text-text-primary">
            Technical Capabilities Map.
          </h2>
          <p className="text-body text-text-secondary mt-3 max-w-[580px]">
            Engineered capabilities grouped by problem domain. Discrete density ratings 
            reflect production depth rather than arbitrary percentages.
          </p>
        </div>

        {/* 2x2 Grid of Clusters with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CLUSTERS.map((cluster, idx) => (
            <div
              key={cluster.id}
              className="rounded-card border border-border-hairline bg-panel/60 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between hover:border-violet-mid transition-colors duration-300"
              style={{
                opacity: isInView || prefersReducedMotion ? 1 : 0,
                transform: isInView || prefersReducedMotion ? 'translateY(0)' : 'translateY(24px)',
                transition: prefersReducedMotion
                  ? 'none'
                  : `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms, border-color 300ms ease`,
              }}
            >
              <div>
                {/* Cluster Header */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span
                    className="font-mono text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5"
                    style={{ color: cluster.accentColor }}
                  >
                    <span
                      className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: cluster.accentColor }}
                    />
                    CLUSTER [{cluster.index}]
                  </span>
                  <span className="font-mono text-[11px] text-text-tertiary">
                    {cluster.skills.length} CORE CAPABILITIES
                  </span>
                </div>

                <h3 className="text-card-h3 text-text-primary mb-2.5">
                  {cluster.title}
                </h3>

                <p className="text-body text-text-secondary text-sm leading-relaxed mb-6">
                  {cluster.summary}
                </p>
              </div>

              {/* Skill Tag Matrix with Discrete Density Indicators */}
              <div
                className="pt-6 border-t border-border-hairline/60 flex flex-wrap gap-2.5"
                role="list"
                aria-label={`${cluster.title} skills`}
              >
                {cluster.skills.map((skill) => {
                  const isHovered = hoveredSkill === skill.name;
                  return (
                    <div
                      key={skill.name}
                      role="listitem"
                      tabIndex={0}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onFocus={() => setHoveredSkill(skill.name)}
                      onBlur={() => setHoveredSkill(null)}
                      aria-label={`${skill.name}, proficiency level ${skill.level} out of 5`}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-sm border font-mono text-xs cursor-default transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                        isHovered
                          ? 'border-accent bg-accent/10 text-white -translate-y-0.5 shadow-[0_0_12px_rgba(255,46,154,0.25)]'
                          : skill.focus
                          ? 'border-border-hairline bg-panel-raised text-text-primary hover:border-violet-bright'
                          : 'border-border-hairline/60 bg-void/70 text-text-secondary hover:border-border-hairline hover:text-text-primary'
                      }`}
                      style={{
                        transition: prefersReducedMotion ? 'none' : undefined,
                      }}
                    >
                      <span className="font-medium">{skill.name}</span>

                      {/* Discrete 5-dot matrix indicator */}
                      <span
                        className="flex items-center gap-0.5 text-[9px] opacity-70"
                        aria-hidden="true"
                      >
                        {Array.from({ length: 5 }).map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`w-1 h-1 rounded-full ${
                              dotIdx < skill.level
                                ? isHovered
                                  ? 'bg-accent'
                                  : 'bg-text-secondary'
                                : 'bg-border-hairline'
                            }`}
                          />
                        ))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
