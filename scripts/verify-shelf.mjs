import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = '/Users/edwardgk/.gemini/antigravity-cli/brain/da44984d-1126-4606-ad49-87598d865bde/scratch/qa';

const BREAKPOINTS = [
  { name: 'mobile-375', width: 375, height: 812, isMobile: true },
  { name: 'tablet-768', width: 768, height: 1024, isMobile: false },
  { name: 'desktop-1024', width: 1024, height: 800, isMobile: false },
  { name: 'desktop-1440', width: 1440, height: 900, isMobile: false },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  for (const bp of BREAKPOINTS) {
    console.log(`Verifying breakpoint ${bp.name} (${bp.width}x${bp.height})...`);
    await page.setViewport({
      width: bp.width,
      height: bp.height,
      isMobile: bp.isMobile,
      hasTouch: bp.isMobile,
    });

    await page.goto('http://localhost:5176/', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    // Scroll directly to Projects
    await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
    // Give 2.5 seconds for Three.js WebGL and procedural canvas textures to render
    await new Promise((r) => setTimeout(r, 2500));

    await page.screenshot({ path: path.join(OUT_DIR, `shelf-${bp.name}-projects.png`) });
  }

  // Now test interacting with the shelf on 1440
  console.log('Testing interaction on desktop-1440 (inspect book detail)...');
  await page.setViewport({ width: 1440, height: 900, isMobile: false });
  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 2000));

  // Find the iframe and click the "Open" button inside the iframe
  const iframeHandle = await page.$('iframe');
  if (iframeHandle) {
    const frame = await iframeHandle.contentFrame();
    if (frame) {
      console.log('Found shelf frame. Clicking Open button (#inspect)...');
      await frame.click('#inspect');
      await new Promise((r) => setTimeout(r, 1500));
      await page.screenshot({ path: path.join(OUT_DIR, `shelf-desktop-1440-detail-open.png`) });

      // Click "Next volume"
      console.log('Clicking next volume (#next)...');
      await frame.click('#next');
      await new Promise((r) => setTimeout(r, 1500));
      await page.screenshot({ path: path.join(OUT_DIR, `shelf-desktop-1440-volume-2.png`) });
    } else {
      console.warn('Could not access iframe content frame.');
    }
  }

  await browser.close();

  console.log('--- QA Verification Summary ---');
  console.log(`Console errors count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  } else {
    console.log('Zero console errors captured!');
  }
}

run().catch(console.error);
