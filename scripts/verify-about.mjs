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

  console.log('--- Verifying About Section Desktop (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900, isMobile: false });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  // Scroll to About section
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Inspect column heights and alignment
  const metrics = await page.evaluate(() => {
    const about = document.getElementById('about');
    if (!about) return null;
    const grid = about.querySelector('.grid.items-stretch');
    if (!grid) return null;
    const cols = Array.from(grid.children);
    const leftCol = cols[0];
    const rightCol = cols[1];
    const leftRect = leftCol.getBoundingClientRect();
    const rightRect = rightCol.getBoundingClientRect();

    return {
      left: { top: leftRect.top, bottom: leftRect.bottom, height: leftRect.height, width: leftRect.width },
      right: { top: rightRect.top, bottom: rightRect.bottom, height: rightRect.height, width: rightRect.width },
      heightDiff: Math.abs(leftRect.height - rightRect.height),
      topDiff: Math.abs(leftRect.top - rightRect.top),
      bottomDiff: Math.abs(leftRect.bottom - rightRect.bottom),
    };
  });

  console.log('Column Alignment Metrics (1440px):', metrics);

  // Take full About section screenshot
  await page.screenshot({ path: path.join(OUT_DIR, 'about-1440-normal.png') });

  // Hover over the left portrait to capture the CMYK glitch and laser scan
  console.log('Hovering over portrait for CMYK glitch capture...');
  const portrait = await page.$('#about .lg\\:col-span-5 > div');
  if (portrait) {
    await portrait.hover();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(OUT_DIR, 'about-1440-portrait-glitch.png') });
  }

  // Breakpoints
  console.log('Verifying 1024 breakpoint...');
  await page.setViewport({ width: 1024, height: 800, isMobile: false });
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT_DIR, 'about-1024.png') });

  console.log('Verifying 768 breakpoint...');
  await page.setViewport({ width: 768, height: 1024, isMobile: false });
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT_DIR, 'about-768.png') });

  console.log('Verifying 375 breakpoint...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT_DIR, 'about-375.png') });

  await browser.close();
  console.log('--- About Section Verification Complete ---');
}

run().catch(console.error);
