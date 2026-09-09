interface LilzBakeStageProps {
  isGlitching?: boolean;
}

const VELOCITY_PRODUCTS = [
  {
    name: 'Sourdough Country Loaf',
    growth: '+42.1% WoW',
    capacity: '92% Cap',
    width: '92%',
    color: 'var(--channel-cyan, #00F0FF)',
    tag: 'AUTO-RESTOCK FIRED',
  },
  {
    name: 'Almond Twice-Baked Croissant',
    growth: '+28.4% WoW',
    capacity: '74% Cap',
    width: '74%',
    color: 'var(--channel-magenta, #FF2E9A)',
    tag: 'CAMPAIGN SURGE',
  },
  {
    name: 'Artisan Brioche Buns (4pk)',
    growth: '+19.2% WoW',
    capacity: '58% Cap',
    width: '58%',
    color: 'var(--channel-yellow, #FFE600)',
    tag: 'STABLE INVENTORY',
  },
];

export function LilzBakeStage({ isGlitching = false }: LilzBakeStageProps) {
  return (
    <div
      className={`h-full w-full flex flex-col justify-between bg-void/90 rounded-md border border-border-hairline p-4 sm:p-5 relative font-mono text-xs overflow-hidden transition-all duration-300 ${
        isGlitching ? 'ring-1 ring-channel-yellow/60 translate-x-[1px]' : ''
      }`}
    >
      {/* Background procedural grid */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-border-hairline/80 pb-2.5 text-[10px] sm:text-[11px] text-text-tertiary">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-channel-yellow animate-pulse" />
          <span className="text-channel-yellow font-bold tracking-wider">
            LILZBAKE // PIPELINE_TELEMETRY
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-text-secondary hidden sm:inline">ETL INGESTION: 1,420 EVT/SEC</span>
          <span className="text-channel-yellow font-semibold px-1.5 py-0.5 rounded bg-channel-yellow/10 border border-channel-yellow/30 text-[9px]">
            PIPELINE SYNCED
          </span>
        </div>
      </div>

      {/* KPI Chips Row */}
      <div className="relative z-10 grid grid-cols-3 gap-2 my-3 text-[10px]">
        <div className="p-2 rounded bg-panel/80 border border-channel-yellow/30 flex flex-col">
          <span className="text-text-tertiary text-[9px] uppercase">Promo Conversion</span>
          <span className="text-channel-yellow font-bold font-mono text-xs mt-0.5">+38.4% ROI</span>
        </div>
        <div className="p-2 rounded bg-panel/80 border border-border-hairline flex flex-col">
          <span className="text-text-tertiary text-[9px] uppercase">Forecast Accuracy</span>
          <span className="text-channel-cyan font-bold font-mono text-xs mt-0.5">96.7% Matrix</span>
        </div>
        <div className="p-2 rounded bg-panel/80 border border-border-hairline flex flex-col">
          <span className="text-text-tertiary text-[9px] uppercase">Stockout Risk</span>
          <span className="text-text-primary font-bold font-mono text-xs mt-0.5">0.0% Nominal</span>
        </div>
      </div>

      {/* Architecture Ingestion Pipeline Diagram */}
      <div className="relative z-10 my-2 p-2.5 rounded bg-panel/50 border border-border-hairline/80 hidden sm:block">
        <div className="text-[9px] font-mono text-text-tertiary uppercase tracking-wider mb-1.5 flex justify-between">
          <span>Ingestion Flow Architecture</span>
          <span className="text-channel-cyan">FASTAPI STREAMING</span>
        </div>
        <div className="flex items-center justify-between text-[9px] text-text-secondary">
          <span className="p-1 rounded bg-void border border-border-hairline text-center flex-1 truncate mx-0.5">
            [POS STREAM]
          </span>
          <span className="text-channel-cyan font-bold">→</span>
          <span className="p-1 rounded bg-void border border-channel-cyan/40 text-channel-cyan text-center flex-1 truncate mx-0.5">
            [FASTAPI ETL]
          </span>
          <span className="text-channel-magenta font-bold">→</span>
          <span className="p-1 rounded bg-void border border-channel-magenta/40 text-channel-magenta text-center flex-1 truncate mx-0.5">
            [PANDAS ML]
          </span>
          <span className="text-channel-yellow font-bold">→</span>
          <span className="p-1 rounded bg-void border border-channel-yellow/40 text-channel-yellow text-center flex-1 truncate mx-0.5">
            [PREDICTIVE DEMAND]
          </span>
        </div>
      </div>

      {/* Telemetry Bar Charts: Sales Velocity by SKU */}
      <div className="relative z-10 space-y-2.5 my-auto">
        <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider flex items-center justify-between">
          <span>Sales Velocity & Production Capacity</span>
          <span className="text-channel-yellow text-[9px]">LIVE SKU TELEMETRY</span>
        </div>

        <div className="space-y-2">
          {VELOCITY_PRODUCTS.map((prod, pIdx) => (
            <div
              key={prod.name}
              className={`p-2 rounded bg-panel/60 border border-border-hairline ${
                pIdx >= 2 ? 'hidden sm:block' : 'block'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-text-primary font-semibold truncate">{prod.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-text-tertiary hidden sm:inline">{prod.tag}</span>
                  <span className="font-bold font-mono" style={{ color: prod.color }}>
                    {prod.growth}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-void rounded-full overflow-hidden border border-border-hairline/40">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: prod.width,
                    backgroundColor: prod.color,
                    boxShadow: `0 0 8px ${prod.color}60`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Smoothing Footer */}
      <div className="relative z-10 pt-2.5 border-t border-border-hairline/80 flex items-center justify-between text-[10px] text-text-tertiary">
        <div className="flex items-center gap-2">
          <span className="text-channel-yellow font-bold">DEMAND_SMOOTHING:</span>
          <span className="text-text-secondary truncate">ALGORITHMIC OPTIMIZATION ACTIVE</span>
        </div>
        <span className="text-channel-yellow/90 font-mono hidden md:inline">
          -34% INVENTORY WASTE
        </span>
      </div>
    </div>
  );
}

export default LilzBakeStage;
