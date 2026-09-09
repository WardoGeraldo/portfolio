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

  console.log('=== VERIFYING EXPANDED 3D CYBER SHELF (1440x900) ===');
  await page.setViewport({ width: 1440, height: 900, isMobile: false });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  // Scroll to Projects section
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1000));

  // 1. Verify alignment of Active Card vs Header Container at 1440px
  const alignmentMetrics = await page.evaluate(() => {
    const projects = document.getElementById('projects');
    if (!projects) return null;

    // Header container
    const headerContainer = projects.querySelector('.max-w-\\[1222px\\]');
    const headerRect = headerContainer?.getBoundingClientRect();

    // Active Card
    const cards = Array.from(projects.querySelectorAll('article'));
    const activeCard = cards[0];
    const cardRect = activeCard?.getBoundingClientRect();

    // Check blur on cards
    const blurFound = cards.some((card) => {
      const style = window.getComputedStyle(card);
      return style.filter.includes('blur') || style.backdropFilter.includes('blur');
    });

    return {
      headerRect: headerRect ? { left: headerRect.left, right: headerRect.right, width: headerRect.width } : null,
      cardRect: cardRect ? { left: cardRect.left, right: cardRect.right, width: cardRect.width, height: cardRect.height } : null,
      leftEdgeDiff: headerRect && cardRect ? Math.abs(headerRect.left - cardRect.left) : null,
      rightEdgeDiff: headerRect && cardRect ? Math.abs(headerRect.right - cardRect.right) : null,
      hasBlurFilter: blurFound,
    };
  });

  console.log('1440px Alignment & Sharpness Metrics:', alignmentMetrics);

  // Capture Card 1: Singaplan
  await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-1440-card1-singaplan.png') });

  // Click Tab 02: QueueEase
  console.log('Switching to Case 002: QueueEase...');
  const tabs = await page.$$(('#projects [role="tab"]'));
  if (tabs.length >= 2) {
    await tabs[1].click();
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-1440-card2-queueease.png') });
  }

  // Click Tab 03: LilzBake Analytics
  console.log('Switching to Case 003: LilzBake Analytics...');
  if (tabs.length >= 3) {
    await tabs[2].click();
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-1440-card3-lilzbake.png') });
  }

  // Hover over the active visual stage on Card 3
  console.log('Hovering over LilzBake visual stage...');
  const stage = await page.$('#projects article:nth-child(3) .lg\\:col-span-7');
  if (stage) {
    await stage.hover();
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-1440-stage-hover.png') });
  }

  // Test 1024px Small Desktop
  console.log('Verifying 1024px breakpoint...');
  await page.setViewport({ width: 1024, height: 768 });
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-1024.png') });

  // Test 768px Tablet
  console.log('Verifying 768px breakpoint...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-768.png') });

  // Test 375px Mobile
  console.log('Verifying 375px breakpoint...');
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-375.png') });

  // Test prefers-reduced-motion
  console.log('Verifying prefers-reduced-motion...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUT_DIR, 'cybershelf-reduced-motion.png') });

  await browser.close();
  console.log('=== CYBER SHELF VERIFICATION COMPLETE ===');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
