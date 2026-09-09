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

  for (const bp of BREAKPOINTS) {
    console.log(`Auditing breakpoint ${bp.name} (${bp.width}x${bp.height})...`);
    await page.setViewport({
      width: bp.width,
      height: bp.height,
      isMobile: bp.isMobile,
      hasTouch: bp.isMobile,
    });

    await page.goto('http://localhost:5176/', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    // 1. Initial Hero
    await page.screenshot({ path: path.join(OUT_DIR, `phase5-${bp.name}-hero.png`) });

    // 2. Scroll to About
    await page.evaluate(() => document.getElementById('about')?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, `phase5-${bp.name}-about.png`) });

    // 3. Scroll to Projects
    await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, `phase5-${bp.name}-projects.png`) });

    // 4. Scroll to Skills
    await page.evaluate(() => document.getElementById('skills')?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, `phase5-${bp.name}-skills.png`) });

    // 5. Scroll to Contact
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, `phase5-${bp.name}-contact.png`) });
  }

  // Mobile menu test
  console.log('Testing mobile menu overlay...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));
  await page.click('button[aria-controls="mobile-nav"]');
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT_DIR, 'phase5-mobile-menu-open.png') });

  // Reduced motion test
  console.log('Testing prefers-reduced-motion...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, 'phase5-reduced-motion-hero.png') });

  // Keyboard accessibility check: Tab into skip link
  console.log('Testing skip link...');
  await page.emulateMediaFeatures([]);
  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle0' });
  await page.keyboard.press('Tab');
  await new Promise((r) => setTimeout(r, 200));
  await page.screenshot({ path: path.join(OUT_DIR, 'phase5-skip-link-focused.png') });

  // Full page scroll of 1440
  console.log('Capturing 1440 fullpage...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5176/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUT_DIR, `phase5-1440-fullpage.png`), fullPage: true });

  await browser.close();
  console.log('Phase 5 Visual QA & A11y screenshots captured successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
