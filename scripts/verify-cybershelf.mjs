import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = '/Users/edwardgk/.gemini/antigravity-cli/brain/da44984d-1126-4606-ad49-87598d865bde/scratch/qa';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('--- Verifying Cyber Shelf Desktop (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900, isMobile: false });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const projectsInfo = await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: rect.height,
    };
  });

  console.log('Projects section info:', projectsInfo);

  if (projectsInfo) {
    const trackHeight = projectsInfo.height - 900;

    // Card 1 position: top of the sticky container
    console.log('Capturing Card 1 (Singaplan)...');
    await page.evaluate((top) => window.scrollTo(0, top), projectsInfo.top);
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-1440-card1.png') });

    // Scroll 1/2 of track (Card 2 QueueEase)
    console.log('Capturing Card 2 (QueueEase)...');
    await page.evaluate((top, th) => window.scrollTo(0, top + th * 0.5), projectsInfo.top, trackHeight);
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-1440-card2.png') });

    // Scroll to end of track (Card 3 LilzBake)
    console.log('Capturing Card 3 (LilzBake Analytics)...');
    await page.evaluate((top, th) => window.scrollTo(0, top + th * 1.0), projectsInfo.top, trackHeight);
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-1440-card3.png') });
  }

  // Breakpoints test
  const breakpoints = [
    { name: '1024', width: 1024, height: 800, isMobile: false },
    { name: '768', width: 768, height: 1024, isMobile: false },
    { name: '375', width: 375, height: 812, isMobile: true, hasTouch: true },
  ];

  for (const bp of breakpoints) {
    console.log(`Verifying breakpoint ${bp.name} (${bp.width}x${bp.height})...`);
    await page.setViewport({
      width: bp.width,
      height: bp.height,
      isMobile: bp.isMobile,
      hasTouch: bp.hasTouch,
    });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1000));

    await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top);
      }
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUT_DIR, `cybershelf-${bp.name}.png`) });
  }

  // Reduced motion test
  console.log('Testing prefers-reduced-motion...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 1440, height: 900, isMobile: false });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top);
    }
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-reduced-motion.png') });

  await browser.close();

  console.log('--- Verification Complete ---');
  console.log(`Console errors captured: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  } else {
    console.log('Zero errors captured!');
  }
}

run().catch(console.error);
