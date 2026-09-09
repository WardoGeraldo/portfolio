import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = '/Users/edwardgk/Desktop/EXPLORE/edward-portfolio-claude-7sept/public/assets/projects';

const SINGAPLAN_HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; }
  body { background: #0c0d14; color: #fff; width: 800px; height: 500px; display: flex; overflow: hidden; padding: 20px; gap: 16px; }
  .sidebar { width: 220px; background: #151722; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); padding: 16px; display: flex; flex-direction: column; justify-content: space-between; }
  .logo { font-size: 16px; font-weight: 700; color: #00F0FF; display: flex; align-items: center; gap: 8px; }
  .badge { background: rgba(0,240,255,0.15); color: #00F0FF; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; }
  .nav-item { padding: 8px 12px; border-radius: 8px; font-size: 12px; color: #8A8AA3; margin-top: 6px; font-weight: 500; display: flex; justify-content: space-between; }
  .nav-item.active { background: rgba(0,240,255,0.1); color: #fff; font-weight: 600; border-left: 2px solid #00F0FF; }
  .main-content { flex: 1; display: flex; flex-direction: column; gap: 12px; }
  .top-bar { display: flex; justify-content: space-between; align-items: center; background: #151722; padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); }
  .route-card { background: #151722; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); padding: 14px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .stop-row { display: flex; align-items: center; gap: 12px; padding: 8px 10px; border-radius: 8px; background: rgba(255,255,255,0.02); margin-bottom: 6px; border: 1px solid rgba(255,255,255,0.04); }
  .stop-dot { width: 10px; height: 10px; border-radius: 50%; }
  .stop-time { font-size: 11px; font-weight: 700; color: #00F0FF; font-family: monospace; width: 45px; }
  .stop-name { font-size: 12px; font-weight: 600; flex: 1; }
  .stop-meta { font-size: 10px; color: #8A8AA3; }
  .stat-grid { display: grid; grid-cols-3; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .stat-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 8px; border-radius: 8px; text-align: center; }
  .stat-val { font-size: 14px; font-weight: 700; color: #00F0FF; font-family: monospace; }
  .stat-lbl { font-size: 9px; color: #8A8AA3; text-transform: uppercase; margin-top: 2px; }
</style>
</head>
<body>
  <div class="sidebar">
    <div>
      <div class="logo">
        <div style="width:12px;height:12px;background:#00F0FF;border-radius:3px;"></div>
        Singaplan iOS
        <span class="badge">v1.4</span>
      </div>
      <div style="margin-top: 20px;">
        <div class="nav-item active"><span>Day 01: Core Urban</span><span>4 stops</span></div>
        <div class="nav-item"><span>Day 02: Heritage Trail</span><span>3 stops</span></div>
        <div class="nav-item"><span>Day 03: Nature & Coast</span><span>5 stops</span></div>
      </div>
    </div>
    <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
      <div style="font-size: 10px; color: #8A8AA3; font-family: monospace;">GPS LOC: 1.35°N 103.82°E</div>
      <div style="font-size: 11px; font-weight: 600; color: #34d399; margin-top: 4px;">● Sat Link Calibrated</div>
    </div>
  </div>

  <div class="main-content">
    <div class="top-bar">
      <div>
        <div style="font-size: 13px; font-weight: 700;">Synthesized Dynamic Itinerary</div>
        <div style="font-size: 10px; color: #8A8AA3;">Multi-criteria heuristic solver completed in 6.4ms</div>
      </div>
      <div style="display:flex;gap:6px;">
        <span style="background:rgba(0,240,255,0.1);color:#00F0FF;font-size:10px;padding:4px 8px;border-radius:4px;border:1px solid rgba(0,240,255,0.3);font-family:monospace;">TRANSIT: MINIMAL</span>
        <span style="background:rgba(255,46,154,0.1);color:#FF2E9A;font-size:10px;padding:4px 8px;border-radius:4px;border:1px solid rgba(255,46,154,0.3);font-family:monospace;">EFFICIENCY: 98.4%</span>
      </div>
    </div>

    <div class="route-card">
      <div>
        <div class="stop-row">
          <div class="stop-dot" style="background:#00F0FF;box-shadow:0 0 8px #00F0FF;"></div>
          <div class="stop-time">09:30</div>
          <div class="stop-name">Jewel Changi Rain Vortex & Canopy Park</div>
          <div class="stop-meta">Airport Hub · 0m Transfer</div>
        </div>
        <div class="stop-row">
          <div class="stop-dot" style="background:#FF2E9A;box-shadow:0 0 8px #FF2E9A;"></div>
          <div class="stop-time">12:15</div>
          <div class="stop-name">Maxwell Culinary & Chinatown Heritage</div>
          <div class="stop-meta">Culinary Core · 24m MRT</div>
        </div>
        <div class="stop-row">
          <div class="stop-dot" style="background:#FFE600;box-shadow:0 0 8px #FFE600;"></div>
          <div class="stop-time">15:45</div>
          <div class="stop-name">Marina Bay Sands Skydeck & Bayfront</div>
          <div class="stop-meta">Scenic Viewpoint · 14m MRT</div>
        </div>
        <div class="stop-row">
          <div class="stop-dot" style="background:#00F0FF;box-shadow:0 0 8px #00F0FF;"></div>
          <div class="stop-time">19:15</div>
          <div class="stop-name">Gardens by the Bay (Supertree Light Show)</div>
          <div class="stop-meta">Evening Event · 8m Footbridge</div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-box">
          <div class="stat-val">34</div>
          <div class="stat-lbl">Nodes Filtered</div>
        </div>
        <div class="stat-box">
          <div class="stat-val">6.4ms</div>
          <div class="stat-lbl">Solver Latency</div>
        </div>
        <div class="stat-box">
          <div class="stat-val">0 Lock</div>
          <div class="stat-lbl">Offline Cache Ready</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

const QUEUEEASE_HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; }
  body { background: #0c0d14; color: #fff; width: 800px; height: 500px; display: flex; flex-direction: column; padding: 20px; gap: 14px; }
  .header { display: flex; justify-content: space-between; align-items: center; background: #151722; padding: 12px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); }
  .grid-top { display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; }
  .serving-card { background: #151722; border-radius: 14px; border: 1px solid rgba(255,46,154,0.3); padding: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 0 25px rgba(255,46,154,0.08); }
  .pool-card { background: #151722; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); padding: 18px; display: flex; flex-direction: column; justify-content: space-between; }
  .counters-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .counter-box { background: #151722; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); padding: 12px; }
  .bar-chart { background: #151722; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); padding: 12px 16px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .bars { display: flex; align-items: flex-end; gap: 12px; height: 48px; }
  .bar { flex: 1; background: #FF2E9A; border-radius: 3px; opacity: 0.85; }
</style>
</head>
<body>
  <div class="header">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="color:#FF2E9A;font-weight:800;font-size:16px;">QueueEase Web</span>
      <span style="background:rgba(255,46,154,0.15);color:#FF2E9A;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;font-family:monospace;">DISPATCH CONSOLE</span>
    </div>
    <div style="display:flex;align-items:center;gap:16px;font-size:11px;font-family:monospace;color:#8A8AA3;">
      <span>WS NODE: <strong style="color:#34d399;">CONNECTED (8ms)</strong></span>
      <span>SYNC RATE: <strong style="color:#fff;">100%</strong></span>
    </div>
  </div>

  <div class="grid-top">
    <div class="serving-card">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:11px;text-transform:uppercase;color:#8A8AA3;font-family:monospace;">Now Serving // Target Call</span>
        <span style="font-size:10px;color:#FF2E9A;font-family:monospace;font-weight:700;">● REAL-TIME DISPATCH</span>
      </div>
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin: 8px 0;">
        <div style="font-size: 42px; font-weight: 900; color: #FF2E9A; font-family: monospace; letter-spacing: 2px;">#A-042</div>
        <div style="text-align:right;">
          <div style="font-size:10px;color:#8A8AA3;font-family:monospace;">ASSIGNED TARGET</div>
          <div style="font-size:14px;font-weight:700;color:#fff;font-family:monospace;">COUNTER 02</div>
        </div>
      </div>
      <div style="font-size:11px;color:#8A8AA3;border-top:1px solid rgba(255,255,255,0.06);padding-top:8px;display:flex;justify-content:space-between;">
        <span>Service Time: <strong>3.2m</strong></span>
        <span style="color:#00F0FF;font-family:monospace;">Throughput: +45% Lift</span>
      </div>
    </div>

    <div class="pool-card">
      <div style="font-size:11px;text-transform:uppercase;color:#8A8AA3;font-family:monospace;">Waiting Pool Telemetry</div>
      <div style="margin: 6px 0;">
        <div style="font-size:32px;font-weight:800;color:#fff;font-family:monospace;">14 <span style="font-size:13px;color:#8A8AA3;font-weight:400;">In Queue</span></div>
      </div>
      <div style="font-size:11px;color:#8A8AA3;border-top:1px solid rgba(255,255,255,0.06);padding-top:6px;display:flex;justify-content:space-between;">
        <span>Est. Wait: <strong>4.8m</strong></span>
        <span style="color:#34d399;font-family:monospace;">Zero Drop Rate</span>
      </div>
    </div>
  </div>

  <div class="counters-grid">
    <div class="counter-box">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#8A8AA3;"><span>CTR 01</span><span style="color:#00F0FF;">● DONE</span></div>
      <div style="font-size:14px;font-weight:700;margin-top:4px;font-family:monospace;">#A-041</div>
    </div>
    <div class="counter-box" style="border-color:rgba(255,46,154,0.4);background:rgba(255,46,154,0.05);">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#FF2E9A;"><span>CTR 02</span><span>● ACTIVE</span></div>
      <div style="font-size:14px;font-weight:700;margin-top:4px;font-family:monospace;color:#FF2E9A;">#A-042</div>
    </div>
    <div class="counter-box">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#8A8AA3;"><span>CTR 03</span><span style="color:#FFE600;">● CALL</span></div>
      <div style="font-size:14px;font-weight:700;margin-top:4px;font-family:monospace;">#A-043</div>
    </div>
    <div class="counter-box">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#8A8AA3;"><span>CTR 04</span><span style="color:#34d399;">● IDLE</span></div>
      <div style="font-size:14px;font-weight:700;margin-top:4px;font-family:monospace;color:#8A8AA3;">STANDBY</div>
    </div>
  </div>
</body>
</html>
`;

const LILZBAKE_HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; }
  body { background: #0c0d14; color: #fff; width: 800px; height: 500px; display: flex; flex-direction: column; padding: 20px; gap: 14px; }
  .header { display: flex; justify-content: space-between; align-items: center; background: #151722; padding: 12px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); }
  .kpi-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .kpi-card { background: #151722; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); padding: 12px 16px; }
  .sku-card { background: #151722; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); padding: 18px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .sku-row { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
  .sku-header { display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; }
  .bar-wrap { height: 8px; background: rgba(0,0,0,0.4); border-radius: 4px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 4px; }
</style>
</head>
<body>
  <div class="header">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="color:#FFE600;font-weight:800;font-size:16px;">LilzBake Analytics</span>
      <span style="background:rgba(255,230,0,0.15);color:#FFE600;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;font-family:monospace;">PREDICTIVE TELEMETRY</span>
    </div>
    <div style="display:flex;align-items:center;gap:16px;font-size:11px;font-family:monospace;color:#8A8AA3;">
      <span>ETL STREAM: <strong style="color:#FFE600;">1,420 EVT/SEC</strong></span>
      <span>SYNC: <strong style="color:#34d399;">REAL-TIME</strong></span>
    </div>
  </div>

  <div class="kpi-row">
    <div class="kpi-card" style="border-color:rgba(255,230,0,0.3);">
      <div style="font-size:10px;color:#8A8AA3;font-family:monospace;text-transform:uppercase;">Promo ROI Lift</div>
      <div style="font-size:24px;font-weight:900;color:#FFE600;font-family:monospace;margin-top:2px;">+38.4%</div>
    </div>
    <div class="kpi-card">
      <div style="font-size:10px;color:#8A8AA3;font-family:monospace;text-transform:uppercase;">Forecast Accuracy</div>
      <div style="font-size:24px;font-weight:900;color:#00F0FF;font-family:monospace;margin-top:2px;">96.7%</div>
    </div>
    <div class="kpi-card">
      <div style="font-size:10px;color:#8A8AA3;font-family:monospace;text-transform:uppercase;">Stockout Incidents</div>
      <div style="font-size:24px;font-weight:900;color:#34d399;font-family:monospace;margin-top:2px;">0.0%</div>
    </div>
  </div>

  <div class="sku-card">
    <div style="display:flex;justify-content:space-between;font-size:11px;color:#8A8AA3;font-family:monospace;margin-bottom:12px;">
      <span>LIVE SKU SALES VELOCITY & RESTOCK AUTOMATION</span>
      <span style="color:#FFE600;">ALGORITHMIC DEMAND SMOOTHING</span>
    </div>

    <div>
      <div class="sku-row">
        <div class="sku-header">
          <span>Country Sourdough Loaf</span>
          <span style="color:#00F0FF;font-family:monospace;">+42.1% YoY (92% Cap)</span>
        </div>
        <div class="bar-wrap"><div class="bar-fill" style="width:92%;background:#00F0FF;"></div></div>
      </div>

      <div class="sku-row">
        <div class="sku-header">
          <span>Twice-Baked Almond Croissant</span>
          <span style="color:#FF2E9A;font-family:monospace;">+28.4% YoY (74% Cap)</span>
        </div>
        <div class="bar-wrap"><div class="bar-fill" style="width:74%;background:#FF2E9A;"></div></div>
      </div>

      <div class="sku-row">
        <div class="sku-header">
          <span>Artisan Brioche Burger Buns</span>
          <span style="color:#FFE600;font-family:monospace;">+19.2% YoY (58% Cap)</span>
        </div>
        <div class="bar-wrap"><div class="bar-fill" style="width:58%;background:#FFE600;"></div></div>
      </div>
    </div>

    <div style="font-size:10px;color:#8A8AA3;font-family:monospace;border-top:1px solid rgba(255,255,255,0.06);padding-top:8px;display:flex;justify-content:space-between;">
      <span>INGESTION: POS Transaction Stream &rarr; FastAPI ETL &rarr; Pandas Predictive Model</span>
      <span style="color:#34d399;">-34% INVENTORY WASTE</span>
    </div>
  </div>
</body>
</html>
`;

async function render() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 500, deviceScaleFactor: 2 });

  console.log('Generating singaplan-preview.png...');
  await page.setContent(SINGAPLAN_HTML);
  await page.screenshot({ path: path.join(OUT_DIR, 'singaplan-preview.png'), type: 'png' });

  console.log('Generating queueease-preview.png...');
  await page.setContent(QUEUEEASE_HTML);
  await page.screenshot({ path: path.join(OUT_DIR, 'queueease-preview.png'), type: 'png' });

  console.log('Generating lilzbake-preview.png...');
  await page.setContent(LILZBAKE_HTML);
  await page.screenshot({ path: path.join(OUT_DIR, 'lilzbake-preview.png'), type: 'png' });

  await browser.close();
  console.log('All 3 project preview screenshots generated in', OUT_DIR);
}

render().catch(console.error);
