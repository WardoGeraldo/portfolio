import { useState, useEffect } from 'react';

interface QueueEaseStageProps {
  isGlitching?: boolean;
}

interface CounterState {
  id: string;
  name: string;
  ticket: string;
  status: 'ACTIVE' | 'DISPATCH' | 'COMPLETED' | 'STANDBY';
  color: string;
}

const COUNTERS: CounterState[] = [
  { id: '01', name: 'CTR 01', ticket: '#A-041', status: 'COMPLETED', color: 'var(--channel-cyan, #00F0FF)' },
  { id: '02', name: 'CTR 02', ticket: '#A-042', status: 'ACTIVE', color: 'var(--channel-magenta, #FF2E9A)' },
  { id: '03', name: 'CTR 03', ticket: '#A-043', status: 'DISPATCH', color: 'var(--channel-yellow, #FFE600)' },
  { id: '04', name: 'CTR 04', ticket: '#A-044', status: 'STANDBY', color: 'var(--text-tertiary, #8A8AA3)' },
];

const HOURLY_LOADS = [
  { time: '10:00', load: 42, height: '42%' },
  { time: '11:00', load: 68, height: '68%' },
  { time: '12:00', load: 95, height: '95%' },
  { time: '13:00', load: 88, height: '88%' },
  { time: '14:00', load: 62, height: '62%' },
  { time: '15:00', load: 50, height: '50%' },
];

export function QueueEaseStage({ isGlitching = false }: QueueEaseStageProps) {
  const [activeTicketNum, setActiveTicketNum] = useState(42);
  const [pulse, setPulse] = useState(false);

  // Subtle live ticket pulse and stream simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
      setActiveTicketNum((prev) => (prev >= 45 ? 40 : prev + 1));
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`h-full w-full flex flex-col justify-between bg-void/90 rounded-md border border-border-hairline p-4 sm:p-5 relative font-mono text-xs overflow-hidden transition-all duration-300 ${
        isGlitching ? 'ring-1 ring-channel-magenta/60 translate-x-[-1px]' : ''
      }`}
    >
      {/* Background procedural grid */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-border-hairline/80 pb-2.5 text-[10px] sm:text-[11px] text-text-tertiary">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-channel-magenta animate-pulse" />
          <span className="text-channel-magenta font-bold tracking-wider">
            QUEUE_EASE // WS_NODE_04
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-text-secondary hidden sm:inline">WS LATENCY: 8ms</span>
          <span className="text-channel-magenta font-semibold px-1.5 py-0.5 rounded bg-channel-magenta/10 border border-channel-magenta/30 text-[9px]">
            STREAM ACTIVE
          </span>
        </div>
      </div>

      {/* Live Operational Display: Now Serving Hero + Waiting Pool */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3 my-3">
        {/* Big Ticket Spotlight (7 cols) */}
        <div className="sm:col-span-7 p-3 rounded bg-panel/90 border border-channel-magenta/40 flex flex-col justify-between shadow-[0_0_20px_rgba(255,46,154,0.12)]">
          <div className="flex items-center justify-between text-[10px] text-text-tertiary">
            <span className="uppercase tracking-wider">Now Serving // Active Call</span>
            <span className="text-channel-magenta font-mono font-bold animate-pulse">
              ● REAL-TIME DISPATCH
            </span>
          </div>

          <div className="my-2 flex items-baseline justify-between">
            <span
              className={`text-3xl sm:text-4xl font-black font-mono tracking-wider transition-all duration-300 ${
                pulse ? 'text-channel-magenta scale-102' : 'text-text-primary'
              }`}
            >
              #A-{String(activeTicketNum).padStart(3, '0')}
            </span>
            <div className="text-right">
              <span className="text-[10px] text-text-tertiary block font-mono">ASSIGNED TARGET</span>
              <span className="text-xs font-bold text-channel-magenta font-mono">COUNTER 02</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-text-tertiary border-t border-border-hairline/60 pt-1.5">
            <span>Avg Service Time: 3.2m</span>
            <span className="text-channel-cyan font-mono font-semibold">Sub-second Sync</span>
          </div>
        </div>

        {/* Real-time Pool Stats (5 cols) */}
        <div className="sm:col-span-5 p-3 rounded bg-panel/70 border border-border-hairline flex flex-col justify-between">
          <div className="text-[10px] text-text-tertiary uppercase tracking-wider">
            Waiting Pool Metrics
          </div>

          <div className="my-1">
            <div className="text-2xl font-bold font-mono text-text-primary">14</div>
            <div className="text-[10px] text-text-secondary mt-0.5">Tickets In Queue</div>
          </div>

          <div className="space-y-1 border-t border-border-hairline/60 pt-1 text-[10px]">
            <div className="flex justify-between text-text-tertiary">
              <span>Est. Wait:</span>
              <span className="text-text-secondary font-mono font-semibold">4.8 mins</span>
            </div>
            <div className="flex justify-between text-text-tertiary">
              <span>Wait Reduction:</span>
              <span className="text-channel-magenta font-mono font-semibold">-45% YoY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Status Matrix */}
      <div className="relative z-10 space-y-2 my-auto">
        <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider flex items-center justify-between">
          <span>Active Counter Array</span>
          <span className="text-text-tertiary text-[9px]">4 NODES ONLINE</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COUNTERS.map((ctr, cIdx) => (
            <div
              key={ctr.id}
              className={`p-2 rounded bg-panel/50 border border-border-hairline hover:border-border-hairline/80 transition-colors ${
                cIdx >= 2 ? 'hidden sm:block' : 'block'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] text-text-tertiary mb-1">
                <span>{ctr.name}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: ctr.color,
                    boxShadow: ctr.status === 'ACTIVE' ? `0 0 6px ${ctr.color}` : 'none',
                  }}
                />
              </div>
              <div className="font-mono text-xs font-bold text-text-primary">{ctr.ticket}</div>
              <div className="text-[9px] font-mono mt-0.5" style={{ color: ctr.color }}>
                {ctr.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Throughput Load Histogram Bar */}
      <div className="relative z-10 pt-2.5 border-t border-border-hairline/80 hidden sm:block">
        <div className="flex items-center justify-between text-[10px] text-text-tertiary mb-2">
          <span className="font-mono text-channel-magenta font-bold">HOURLY THROUGHPUT LOAD</span>
          <span className="text-text-secondary">PEAK: 12:00 (95 CAP)</span>
        </div>

        <div className="grid grid-cols-6 gap-2 h-10 items-end bg-panel/40 p-1.5 rounded border border-border-hairline/60">
          {HOURLY_LOADS.map((load) => (
            <div key={load.time} className="flex flex-col items-center h-full justify-end group">
              <div
                className="w-full rounded-xs transition-all duration-300"
                style={{
                  height: load.height,
                  backgroundColor:
                    load.load > 90
                      ? 'var(--channel-magenta, #FF2E9A)'
                      : load.load > 60
                      ? 'var(--channel-cyan, #00F0FF)'
                      : 'var(--violet-bright, #7C3AED)',
                  opacity: 0.85,
                }}
              />
              <span className="text-[8px] font-mono text-text-tertiary mt-1">{load.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QueueEaseStage;
