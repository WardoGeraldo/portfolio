import { useState } from 'react';

interface SingaplanStageProps {
  isGlitching?: boolean;
}

const ITINERARY_STOPS = [
  {
    time: '09:30',
    title: 'Jewel Changi Rain Vortex',
    nodeType: 'ORIGIN // CONCURRENCY DISPATCH',
    metric: 'Transit: 0m (Entry)',
    color: 'var(--channel-cyan, #00F0FF)',
    bgBadge: 'bg-channel-cyan/15 text-channel-cyan border-channel-cyan/40',
  },
  {
    time: '12:15',
    title: 'Maxwell Culinary Center',
    nodeType: 'FOOD // HEURISTIC SELECTION',
    metric: 'Transit: 24m (MRT East-West)',
    color: 'var(--channel-magenta, #FF2E9A)',
    bgBadge: 'bg-channel-magenta/15 text-channel-magenta border-channel-magenta/40',
  },
  {
    time: '15:45',
    title: 'Marina Bay Skydeck & Sands',
    nodeType: 'VIEWPOINT // OPTIMAL LIGHTING',
    metric: 'Transit: 14m (Downtown Line)',
    color: 'var(--channel-yellow, #FFE600)',
    bgBadge: 'bg-channel-yellow/15 text-channel-yellow border-channel-yellow/40',
  },
  {
    time: '19:15',
    title: 'Gardens by the Bay Supertree',
    nodeType: 'LIGHT SHOW // CHRONO-SYNCED',
    metric: 'Transit: 8m (Footbridge)',
    color: 'var(--channel-cyan, #00F0FF)',
    bgBadge: 'bg-channel-cyan/15 text-channel-cyan border-channel-cyan/40',
  },
];

export function SingaplanStage({ isGlitching = false }: SingaplanStageProps) {
  const [activeStop, setActiveStop] = useState<number>(0);

  return (
    <div
      className={`h-full w-full flex flex-col justify-between bg-void/90 rounded-md border border-border-hairline p-4 sm:p-5 relative font-mono text-xs overflow-hidden transition-all duration-300 ${
        isGlitching ? 'ring-1 ring-channel-cyan/60 translate-x-[1px]' : ''
      }`}
    >
      {/* Background procedural grid */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-border-hairline/80 pb-2.5 text-[10px] sm:text-[11px] text-text-tertiary">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-channel-cyan animate-pulse" />
          <span className="text-channel-cyan font-bold tracking-wider">
            SINGAPLAN // NAV_ENGINE v1.4
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-text-secondary hidden sm:inline">GPS: 1.3521°N, 103.8198°E</span>
          <span className="text-channel-cyan font-semibold px-1.5 py-0.5 rounded bg-channel-cyan/10 border border-channel-cyan/30 text-[9px]">
            FIXED 99.8%
          </span>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="relative z-10 grid grid-cols-3 gap-1.5 sm:gap-2 my-1.5 sm:my-3 text-[9px] sm:text-[10px]">
        <div className="p-1.5 sm:p-2 rounded bg-panel/80 border border-border-hairline flex flex-col">
          <span className="text-text-tertiary text-[8px] sm:text-[9px] uppercase">Heuristic Solver</span>
          <span className="text-channel-cyan font-bold font-mono text-[11px] sm:text-xs mt-0.5">6.4ms Latency</span>
        </div>
        <div className="p-1.5 sm:p-2 rounded bg-panel/80 border border-border-hairline flex flex-col">
          <span className="text-text-tertiary text-[8px] sm:text-[9px] uppercase">Route Efficiency</span>
          <span className="text-text-primary font-bold font-mono text-[11px] sm:text-xs mt-0.5">98.4% Optimal</span>
        </div>
        <div className="p-1.5 sm:p-2 rounded bg-panel/80 border border-border-hairline flex flex-col">
          <span className="text-text-tertiary text-[8px] sm:text-[9px] uppercase">Paralysis Filter</span>
          <span className="text-channel-yellow font-bold font-mono text-[11px] sm:text-xs mt-0.5">34 Pruned</span>
        </div>
      </div>

      {/* Interactive Itinerary Timeline */}
      <div className="relative z-10 space-y-2 my-auto">
        <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider flex items-center justify-between mb-1">
          <span>Synthesized Day Timeline</span>
          <span className="text-channel-cyan text-[9px] animate-pulse">● LIVE ROUTE STREAM</span>
        </div>

        <div className="space-y-1.5 relative">
          {/* Vertical connecting route pulse line */}
          <div className="absolute left-[17px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-channel-cyan via-channel-magenta to-channel-yellow opacity-40 pointer-events-none" />

          {ITINERARY_STOPS.map((stop, idx) => {
            const isCurrent = activeStop === idx;
            return (
              <div
                key={stop.title}
                onMouseEnter={() => setActiveStop(idx)}
                className={`relative ${idx >= 2 ? 'hidden sm:flex' : 'flex'} items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-sm border transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-panel border-channel-cyan/60 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                    : 'bg-panel/40 border-border-hairline/60 hover:border-border-hairline hover:bg-panel/60'
                }`}
              >
                {/* Time badge / Node circle */}
                <div className="flex items-center gap-2 min-w-[58px]">
                  <span
                    className="w-2 h-2 rounded-full transition-transform duration-200"
                    style={{
                      backgroundColor: stop.color,
                      transform: isCurrent ? 'scale(1.4)' : 'scale(1)',
                      boxShadow: isCurrent ? `0 0 8px ${stop.color}` : 'none',
                    }}
                  />
                  <span className={`text-[10px] font-bold ${isCurrent ? 'text-text-primary' : 'text-text-tertiary'}`}>
                    {stop.time}
                  </span>
                </div>

                {/* Stop Title & Meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold truncate ${isCurrent ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {stop.title}
                    </span>
                    <span className={`hidden sm:inline text-[9px] font-mono px-1.5 py-0.2 rounded border uppercase tracking-wider ${stop.bgBadge}`}>
                      {stop.nodeType}
                    </span>
                  </div>
                  <div className="text-[10px] text-text-tertiary mt-0.5 truncate">
                    {stop.metric}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decision Matrix Status Footer */}
      <div className="relative z-10 pt-2.5 border-t border-border-hairline/80 flex items-center justify-between text-[10px] text-text-tertiary">
        <div className="flex items-center gap-2">
          <span className="text-channel-cyan font-bold">DECISION_SOLVER:</span>
          <span className="text-text-secondary truncate max-w-[240px] sm:max-w-none">
            [BUDGET: $$] · [TRANSIT: MINIMAL] · [WEATHER: ADAPTIVE]
          </span>
        </div>
        <span className="text-channel-cyan/90 font-mono hidden md:inline">
          34 NODES PRUNED
        </span>
      </div>
    </div>
  );
}

export default SingaplanStage;
