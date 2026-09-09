import fs from 'fs';

async function run() {
  console.log("Fetching canonical complete-shelf-v2.html...");
  const res = await fetch("https://threeui.com/landing-pages/complete-shelf-v2.html");
  let html = await res.text();

  // 1. Meta & Title
  html = html.replace(
    "<title>Working Volumes — Seven Tools for Making</title>",
    "<title>Edward Geraldo — Featured Case Files</title>"
  );
  html = html.replace(
    `content="Working Volumes is an original interactive Three.js library of seven tactile field guides for contemporary creative tools."`,
    `content="Featured engineering case files and interactive 3D bookshelf archive of Edward Geraldo Kristian."`
  );

  // 2. Extra CSS for tags and links
  const extraCss = `
      .detail-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 12px 0 16px 0;
      }
      .tag-pill {
        display: inline-flex;
        align-items: center;
        padding: 3px 8px;
        border-radius: 9999px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.72rem;
        font-weight: 500;
        letter-spacing: 0.03em;
        background: rgba(244, 238, 230, 0.08);
        border: 1px solid rgba(244, 238, 230, 0.16);
        color: #f4eee6;
      }
      .tag-pill--accent {
        background: rgba(200, 112, 70, 0.18);
        border-color: var(--accent);
        color: var(--accent);
        font-weight: 600;
      }
      .detail-links {
        display: flex;
        gap: 10px;
        margin-top: 14px;
        margin-bottom: 6px;
      }
      .project-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 13px;
        border-radius: 8px;
        font-family: Inter, -apple-system, sans-serif;
        font-size: 0.8rem;
        font-weight: 500;
        text-decoration: none;
        color: #f4eee6;
        background: rgba(244, 238, 230, 0.07);
        border: 1px solid rgba(244, 238, 230, 0.2);
        transition: all 0.2s ease;
      }
      .project-link:hover {
        background: rgba(244, 238, 230, 0.16);
        border-color: rgba(244, 238, 230, 0.4);
        color: #ffffff;
      }
      .project-link--primary {
        background: var(--accent);
        border-color: var(--accent);
        color: #0b0d12;
      }
      .project-link--primary:hover {
        background: #ffffff;
        border-color: #ffffff;
        color: #0b0d12;
      }
  `;
  html = html.replace("</style>", extraCss + "\n  </style>");

  // 3. Editorial Header
  html = html.replace(
    `      <div class="editorial-identity">\n        <strong>Working Volumes</strong>\n        <span>Seven field guides for making</span>\n      </div>\n      <div class="editorial-index">\n        <span>Edition 02 · 2026</span>`,
    `      <div class="editorial-identity">\n        <strong>Edward Geraldo</strong>\n        <span>Featured Case Files · Interactive 3D Shelf</span>\n      </div>\n      <div class="editorial-index">\n        <span>Engineering Archive</span>`
  );

  // 4. Pointer and Selection Labels
  html = html.replace(
    `<strong id="pointer-label-title">Codex</strong>`,
    `<strong id="pointer-label-title">Pulse Spatial</strong>`
  );
  html = html.replace(
    `<h1 class="selection__title" id="selection-title">Codex</h1>\n          <p class="selection__note" id="selection-note">Precise intent, translated into tested systems.</p>`,
    `<h1 class="selection__title" id="selection-title">Pulse Spatial</h1>\n          <p class="selection__note" id="selection-note">Real-time cardiovascular telemetry in 3D floating volumetric graphs.</p>`
  );

  // 5. Detail Panel DOM
  const initialDetailOld = `<p class="eyebrow" id="detail-eyebrow">Volume I · Agentic craft</p>
      <h2 class="detail-title" id="detail-title">Codex</h2>
      <p class="detail-deck" id="detail-deck">
        A field manual for turning clear intent into working software, with verification treated as part of the craft.
      </p>
      <dl class="meta-list">
        <div>
          <dt>Binding</dt>
          <dd id="detail-binding">Evergreen cloth · antique brass foil</dd>
        </div>
        <div>
          <dt>Format</dt>
          <dd id="detail-format">148 × 216 mm · imagined edition</dd>
        </div>
        <div>
          <dt>Theme</dt>
          <dd id="detail-theme">Intent into implementation</dd>
        </div>
        <div>
          <dt>Motif</dt>
          <dd id="detail-motif">Nested brackets</dd>
        </div>
      </dl>`;

  const initialDetailNew = `<p class="eyebrow" id="detail-eyebrow">Volume I · iOS · Spatial Computing</p>
      <h2 class="detail-title" id="detail-title">Pulse Spatial</h2>
      <p class="detail-deck" id="detail-deck">
        Immersive spatial computing application built for Apple VisionOS and iOS. Renders real-time cardiovascular telemetry in 3D floating volumetric graphs with sub-16ms latency using RealityKit, Metal, and Swift Concurrency.
      </p>
      <div class="detail-tags" id="detail-tags">
        <span class="tag-pill">Swift</span>
        <span class="tag-pill">SwiftUI</span>
        <span class="tag-pill">RealityKit</span>
        <span class="tag-pill">Metal</span>
        <span class="tag-pill">Combine</span>
        <span class="tag-pill tag-pill--accent">60 FPS Metal</span>
      </div>
      <dl class="meta-list">
        <div>
          <dt>Metric</dt>
          <dd id="detail-metric">60 FPS Metal · Sub-16ms Latency</dd>
        </div>
        <div>
          <dt>Discipline</dt>
          <dd id="detail-discipline">iOS · Spatial Computing</dd>
        </div>
        <div>
          <dt>Binding</dt>
          <dd id="detail-binding">Ultramarine cloth · cyan foil</dd>
        </div>
        <div>
          <dt>Format</dt>
          <dd id="detail-format">156 × 232 mm · visionOS edition</dd>
        </div>
        <div>
          <dt>Theme</dt>
          <dd id="detail-theme">Pulse Spatial · spatial telemetry</dd>
        </div>
        <div>
          <dt>Motif</dt>
          <dd id="detail-motif">Suspended orbits</dd>
        </div>
      </dl>
      <div class="detail-links" id="detail-links">
        <a class="project-link project-link--primary" id="detail-live" href="https://apple.com" target="_blank" rel="noopener noreferrer">
          <span>Live Preview</span>
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12 12 4M6 4h6v6"/></svg>
        </a>
        <a class="project-link" id="detail-github" href="https://github.com" target="_blank" rel="noopener noreferrer">
          <span>Source Code</span>
          <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
        </a>
      </div>`;

  html = html.replace(initialDetailOld, initialDetailNew);

  // 6. Fallback markup
  const fallbackOld = `<div class="fallback__grid" aria-label="Seven conceptual hardcovers">
        <article class="fallback-book" style="--book-color:#182a43;--book-foil:#c87046;--book-height:390px"><span>Volume I</span><strong>Codex</strong></article>
        <article class="fallback-book" style="--book-color:#c24d24;--book-foil:#efc16d;--book-height:356px"><span>Volume II</span><strong>Claude Code</strong></article>
        <article class="fallback-book" style="--book-color:#afc400;--book-foil:#171a16;--book-height:374px"><span>Volume III</span><strong>Cursor</strong></article>
        <article class="fallback-book" style="--book-color:#1537a1;--book-foil:#dbe8f1;--book-height:404px"><span>Volume IV</span><strong>Antigravity</strong></article>
        <article class="fallback-book" style="--book-color:#c83222;--book-foil:#efb0aa;--book-height:365px"><span>Volume V</span><strong>Figma</strong></article>
        <article class="fallback-book" style="--book-color:#da3b2f;--book-foil:#ff8eab;--book-height:385px"><span>Volume VI</span><strong>Framer</strong></article>
        <article class="fallback-book" style="--book-color:#78a7bd;--book-foil:#e4e7e5;--book-height:398px"><span>Volume VII</span><strong>Xcode</strong></article>
      </div>`;

  const fallbackNew = `<div class="fallback__grid" aria-label="Seven engineering case files">
        <article class="fallback-book" style="--book-color:#142a54;--book-foil:#38bdf8;--book-height:390px"><span>Volume I</span><strong>Pulse Spatial</strong></article>
        <article class="fallback-book" style="--book-color:#4c1d95;--book-foil:#c084fc;--book-height:356px"><span>Volume II</span><strong>Strata</strong></article>
        <article class="fallback-book" style="--book-color:#9d174d;--book-foil:#f472b6;--book-height:374px"><span>Volume III</span><strong>Nexus</strong></article>
        <article class="fallback-book" style="--book-color:#0f766e;--book-foil:#5eead4;--book-height:404px"><span>Volume IV</span><strong>Aegis Core</strong></article>
        <article class="fallback-book" style="--book-color:#c2410c;--book-foil:#fb923c;--book-height:365px"><span>Volume V</span><strong>QuantVision</strong></article>
        <article class="fallback-book" style="--book-color:#1e293b;--book-foil:#94a3b8;--book-height:385px"><span>Volume VI</span><strong>Veloce</strong></article>
        <article class="fallback-book" style="--book-color:#1e3a5f;--book-foil:#67e8f9;--book-height:398px"><span>Volume VII</span><strong>Hyperion</strong></article>
      </div>`;

  html = html.replace(fallbackOld, fallbackNew);

  html = html.replace(
    `<p class="fallback__kicker">Working Volumes · Static catalog</p>\n          <h2 id="fallback-title">Seven tools for making.</h2>`,
    `<p class="fallback__kicker">Edward Geraldo · Case Files</p>\n          <h2 id="fallback-title">Featured engineering case files.</h2>`
  );

  // 7. BOOKS definition in JavaScript
  const newBooksCode = `const BOOKS = [
      {
        id: "pulse-spatial",
        title: "Pulse Spatial",
        roman: "I",
        discipline: "iOS · Spatial Computing",
        note: "Real-time cardiovascular telemetry in 3D floating volumetric graphs.",
        deck: "Immersive spatial computing application built for Apple VisionOS and iOS. Renders real-time cardiovascular telemetry in 3D floating volumetric graphs with sub-16ms latency using RealityKit, Metal, and Swift Concurrency.",
        binding: "Ultramarine cloth · cyan foil",
        format: "156 × 232 mm · visionOS edition",
        theme: "Pulse Spatial · spatial telemetry in motion",
        motif: "Suspended orbits",
        motifKey: "orbits",
        paletteLabel: "Ultramarine · cyan · copper",
        color: "#142a54",
        foil: "#38bdf8",
        palette: {
          paper: "#101e38",
          paperDeep: "#0a1324",
          paperPale: "#e0f2fe",
          ink: "#f0f9ff",
          inkSoft: "#93c5fd",
          wall: "#101e38",
          shelf: "#3a2118",
          shelfDark: "#1c0e0a",
          light: "#e0f2fe",
          fill: "#38bdf8"
        },
        width: 1.05,
        height: 1.62,
        depth: 0.27,
        chapters: ["Spatial intent", "RealityKit pipeline", "Biometric proof"],
        seed: 11,
        tags: ["Swift", "SwiftUI", "RealityKit", "Metal", "Combine"],
        metric: "60 FPS Metal",
        metricLabel: "Render performance",
        liveUrl: "https://apple.com",
        githubUrl: "https://github.com"
      },
      {
        id: "strata",
        title: "Strata",
        roman: "II",
        discipline: "Data · Analytics Engine",
        note: "Distributed telemetry pipeline processing 2.4M event streams/min.",
        deck: "Distributed telemetry pipeline capable of processing 2.4M event streams per minute. Features predictive anomaly detection models, automated time-series forecasting, and sub-second analytical querying via DuckDB.",
        binding: "Royal-violet cloth · amethyst foil",
        format: "152 × 226 mm · analytical folio",
        theme: "Strata · streaming analytics at scale",
        motif: "Connected modules",
        motifKey: "modules",
        paletteLabel: "Royal violet · plum · amethyst",
        color: "#4c1d95",
        foil: "#c084fc",
        palette: {
          paper: "#2e1065",
          paperDeep: "#1e0b4b",
          paperPale: "#f3e8ff",
          ink: "#faf5ff",
          inkSoft: "#d8b4fe",
          wall: "#2e1065",
          shelf: "#402015",
          shelfDark: "#1d0d08",
          light: "#f3e8ff",
          fill: "#c084fc"
        },
        width: 1.1,
        height: 1.48,
        depth: 0.29,
        chapters: ["Stream ingestion", "Predictive modeling", "Analytical proof"],
        seed: 22,
        tags: ["Python", "Pandas", "FastAPI", "DuckDB", "D3.js"],
        metric: "2.4M Events/m",
        metricLabel: "Ingestion throughput",
        liveUrl: "https://github.com",
        githubUrl: "https://github.com"
      },
      {
        id: "nexus",
        title: "Nexus",
        roman: "III",
        discipline: "Web · Generative Studio",
        note: "Canvas studio for generative multi-token design systems.",
        deck: "Modern web-based canvas studio for generative multi-token design architecture. Powers live token synthesis, WebGL preview shaders, and zero-runtime CSS generation with 99.9% uptime.",
        binding: "Magenta cloth · rose-gold foil",
        format: "144 × 212 mm · studio edition",
        theme: "Nexus · generative token synthesis",
        motif: "Directional caret",
        motifKey: "caret",
        paletteLabel: "Magenta · wine · rose-gold",
        color: "#9d174d",
        foil: "#f472b6",
        palette: {
          paper: "#701a75",
          paperDeep: "#4a044e",
          paperPale: "#fdf2f8",
          ink: "#fff1f2",
          inkSoft: "#fbcfe8",
          wall: "#701a75",
          shelf: "#3b2418",
          shelfDark: "#1c0f09",
          light: "#fdf2f8",
          fill: "#f472b6"
        },
        width: 0.94,
        height: 1.54,
        depth: 0.23,
        chapters: ["Token synthesis", "Shader canvas", "Production uptime"],
        seed: 33,
        tags: ["React", "TypeScript", "Tailwind CSS", "Three.js", "Vite"],
        metric: "99.9% Uptime",
        metricLabel: "Production grade",
        liveUrl: "https://github.com",
        githubUrl: "https://github.com"
      },
      {
        id: "aegis-core",
        title: "Aegis Core",
        roman: "IV",
        discipline: "iOS · Secure Enclave",
        note: "Zero-knowledge offline document vault backed by Secure Enclave.",
        deck: "Zero-knowledge secure offline document vault utilizing Secure Enclave hardware keys, biometric authentication, and custom AES-GCM encrypted local storage with 0.0ms memory leakage.",
        binding: "Teal cloth · aquamarine foil",
        format: "148 × 220 mm · cryptographic folio",
        theme: "Aegis Core · hardware cryptographic vault",
        motif: "Nested brackets",
        motifKey: "brackets",
        paletteLabel: "Teal · emerald · aquamarine",
        color: "#0f766e",
        foil: "#5eead4",
        palette: {
          paper: "#134e4a",
          paperDeep: "#042f2e",
          paperPale: "#ccfbf1",
          ink: "#f0fdfa",
          inkSoft: "#99f6e4",
          wall: "#134e4a",
          shelf: "#3b2117",
          shelfDark: "#1a0d08",
          light: "#ccfbf1",
          fill: "#5eead4"
        },
        width: 1.08,
        height: 1.66,
        depth: 0.26,
        chapters: ["Hardware enclave", "Cryptographic store", "Zero-leakage proof"],
        seed: 44,
        tags: ["Swift", "CryptoKit", "CoreData", "LocalAuth", "XCTest"],
        metric: "0.0ms Leakage",
        metricLabel: "Secure Enclave audited",
        liveUrl: "https://apple.com",
        githubUrl: "https://github.com"
      },
      {
        id: "quant-vision",
        title: "QuantVision",
        roman: "V",
        discipline: "Data · Market Heatmap",
        note: "Real-time Level-2 order book depth visualizer for algorithmic traders.",
        deck: "Real-time Level-2 order book depth visualizer for algorithmic traders. Processes continuous WebSocket feeds to render microsecond liquidity shifts via WebGL with sub-12ms feed latency.",
        binding: "Burnt-amber cloth · gold foil",
        format: "158 × 236 mm · quantitative edition",
        theme: "QuantVision · microsecond liquidity dynamics",
        motif: "Interlaced paths",
        motifKey: "paths",
        paletteLabel: "Burnt amber · warm cream · gold",
        color: "#c2410c",
        foil: "#fb923c",
        palette: {
          paper: "#7c2d12",
          paperDeep: "#431407",
          paperPale: "#ffedd5",
          ink: "#fff7ed",
          inkSoft: "#fed7aa",
          wall: "#7c2d12",
          shelf: "#432016",
          shelfDark: "#1f0d08",
          light: "#ffedd5",
          fill: "#fb923c"
        },
        width: 1.02,
        height: 1.50,
        depth: 0.29,
        chapters: ["Order-book stream", "WebGL heatmaps", "Low-latency proof"],
        seed: 55,
        tags: ["Python", "WebSockets", "WebGL", "NumPy", "React"],
        metric: "< 12ms Feed",
        metricLabel: "Microsecond latency",
        liveUrl: "https://github.com",
        githubUrl: "https://github.com"
      },
      {
        id: "veloce",
        title: "Veloce",
        roman: "VI",
        discipline: "iOS / Tooling · Build Cache",
        note: "Distributed Swift compilation cache cutting build times by 54%.",
        deck: "Distributed compiler caching system for Xcode and Swift toolchains. Intercepts LLVM AST artifacts and shares incremental compilation graphs across teams to slash build times by 54%.",
        binding: "Obsidian cloth · platinum foil",
        format: "150 × 218 mm · systems edition",
        theme: "Veloce · distributed compiler acceleration",
        motif: "Folded frames",
        motifKey: "frames",
        paletteLabel: "Slate · obsidian · platinum",
        color: "#1e293b",
        foil: "#94a3b8",
        palette: {
          paper: "#0f172a",
          paperDeep: "#020617",
          paperPale: "#f1f5f9",
          ink: "#f8fafc",
          inkSoft: "#cbd5e1",
          wall: "#0f172a",
          shelf: "#402016",
          shelfDark: "#1d0d08",
          light: "#f1f5f9",
          fill: "#94a3b8"
        },
        width: 0.98,
        height: 1.58,
        depth: 0.25,
        chapters: ["Compiler interception", "Artifact hashing", "Build performance"],
        seed: 66,
        tags: ["Swift", "LLVM", "Rust", "gRPC", "Docker"],
        metric: "54% Faster Builds",
        metricLabel: "Compilation cache",
        liveUrl: "https://github.com",
        githubUrl: "https://github.com"
      },
      {
        id: "hyperion",
        title: "Hyperion",
        roman: "VII",
        discipline: "Data / Web · Geospatial Engine",
        note: "Sub-millisecond geospatial engine indexing 10M+ coordinates.",
        deck: "High-density spatial indexing engine combining H3 hexagonal hierarchies and DuckDB columnar storage to execute sub-4ms polygon queries across 10M+ coordinate vertices in the browser.",
        binding: "Ocean cloth · cyan-silver foil",
        format: "160 × 240 mm · cartographic folio",
        theme: "Hyperion · sub-millisecond geospatial engine",
        motif: "Drafting compass",
        motifKey: "compass",
        paletteLabel: "Ocean · navy · icy cyan",
        color: "#1e3a5f",
        foil: "#67e8f9",
        palette: {
          paper: "#172554",
          paperDeep: "#0f172a",
          paperPale: "#e0f2fe",
          ink: "#f0f9ff",
          inkSoft: "#7dd3fc",
          wall: "#172554",
          shelf: "#382017",
          shelfDark: "#1b0e09",
          light: "#e0f2fe",
          fill: "#67e8f9"
        },
        width: 1.12,
        height: 1.64,
        depth: 0.28,
        chapters: ["Hexagonal indexing", "Wasm runtime", "Sub-4ms query proof"],
        seed: 77,
        tags: ["Go", "TypeScript", "DuckDB", "MapLibre", "Wasm"],
        metric: "< 4ms Query",
        metricLabel: "Query latency",
        liveUrl: "https://github.com",
        githubUrl: "https://github.com"
      }
    ];`;

  const booksStart = html.indexOf("const BOOKS = [");
  const booksEnd = html.indexOf("const COVER_ATLAS_DATA =", booksStart);
  html = html.slice(0, booksStart) + newBooksCode + "\n\n    " + html.slice(booksEnd);

  // 8. Add detail element queries
  const detailQueriesOld = `    const detailDeck = document.querySelector("#detail-deck");
    const detailBinding = document.querySelector("#detail-binding");
    const detailFormat = document.querySelector("#detail-format");
    const detailTheme = document.querySelector("#detail-theme");
    const detailMotif = document.querySelector("#detail-motif");`;

  const detailQueriesNew = `    const detailDeck = document.querySelector("#detail-deck");
    const detailBinding = document.querySelector("#detail-binding");
    const detailFormat = document.querySelector("#detail-format");
    const detailTheme = document.querySelector("#detail-theme");
    const detailMotif = document.querySelector("#detail-motif");
    const detailTags = document.querySelector("#detail-tags");
    const detailMetric = document.querySelector("#detail-metric");
    const detailDiscipline = document.querySelector("#detail-discipline");
    const detailLive = document.querySelector("#detail-live");
    const detailGithub = document.querySelector("#detail-github");`;

  html = html.replace(detailQueriesOld, detailQueriesNew);

  // 9. Update populateDetail
  const populateDetailOld = `    function populateDetail(book) {
      detailEyebrow.textContent = \`Volume \${book.roman} · \${book.discipline}\`;
      detailTitle.textContent = book.title;
      detailDeck.textContent = book.deck;
      detailBinding.textContent = book.binding;
      detailFormat.textContent = book.format;
      detailTheme.textContent = book.theme;
      detailMotif.textContent = book.motif;
    }`;

  const populateDetailNew = `    function populateDetail(book) {
      detailEyebrow.textContent = \`Volume \${book.roman} · \${book.discipline}\`;
      detailTitle.textContent = book.title;
      detailDeck.textContent = book.deck;
      detailBinding.textContent = book.binding;
      detailFormat.textContent = book.format;
      detailTheme.textContent = book.theme;
      detailMotif.textContent = book.motif;
      if (detailMetric) detailMetric.textContent = book.metric;
      if (detailDiscipline) detailDiscipline.textContent = book.discipline;
      if (detailTags && book.tags) {
        detailTags.innerHTML = book.tags.map(t => \`<span class="tag-pill">\${t}</span>\`).join("") +
          \`<span class="tag-pill tag-pill--accent">\${book.metric}</span>\`;
      }
      if (detailLive) {
        if (book.liveUrl) {
          detailLive.href = book.liveUrl;
          detailLive.style.display = "inline-flex";
        } else {
          detailLive.style.display = "none";
        }
      }
      if (detailGithub) {
        if (book.githubUrl) {
          detailGithub.href = book.githubUrl;
          detailGithub.style.display = "inline-flex";
        } else {
          detailGithub.style.display = "none";
        }
      }
    }`;

  html = html.replace(populateDetailOld, populateDetailNew);

  // 10. Ensure dynamic procedural cover rendering
  html = html.replace(
    `      try {\n        await coverAtlasImage.decode();\n        coverAtlasReady = true;\n      } catch {\n        coverAtlasReady = false;\n      }`,
    `      coverAtlasReady = false;`
  );

  // 11. Custom header text on book canvas textures
  html = html.replace(
    `ctx.fillText(\`WORKING VOLUMES  /  \${book.roman}\`, canvasTexture.width / 2, 92);`,
    `ctx.fillText(\`EDWARD GERALDO  /  \${book.roman}\`, canvasTexture.width / 2, 92);`
  );
  html = html.replace(
    `ctx.fillText(\`WORKING VOLUMES  /  \${pad(index)}\`, 58, 70);`,
    `ctx.fillText(\`CASE FILE  /  \${pad(index)}\`, 58, 70);`
  );
  html = html.replace(
    `ctx.fillText(\`WORKING VOLUMES  /  \${book.roman}\`, 48, 48);`,
    `ctx.fillText(\`CASE FILE  /  \${book.roman}\`, 48, 48);`
  );
  html = html.replace(
    `\`\${book.binding}. \${book.format}. Conceived as an original editorial study for Working Volumes.\``,
    `\`\${book.binding}. \${book.format}. Conceived as an original case file for Edward Geraldo's engineering archive.\``
  );
  html = html.replace(
    `ctx.fillText(\`SPECIMEN \${book.roman} / \${book.seed}  ·  IMAGINED EDITION\`, 54, 676);`,
    `ctx.fillText(\`SPECIMEN \${book.roman} / \${book.seed}  ·  CASE FILE ARCHIVE\`, 54, 676);`
  );

  fs.writeFileSync("public/landing-pages/complete-shelf-v2.html", html);
  console.log("Successfully wrote public/landing-pages/complete-shelf-v2.html, bytes:", html.length);
}

run();
