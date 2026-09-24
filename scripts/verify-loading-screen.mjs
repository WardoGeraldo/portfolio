/**
 * Puppeteer verification script for the LoadingScreen preloader.
 *
 * Captures:
 *   1. loading-initial.png  — the boot screen ~200ms into the animation (counter mid-progress)
 *   2. loading-ready.png    — the "100% // READY" hold frame
 *   3. loading-dismissed.png — the hero section after the loader has exited
 *
 * Run: node scripts/verify-loading-screen.mjs
 */

import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';

const QA_DIR =
  '/Users/edwardgk/.gemini/antigravity-cli/brain/da44984d-1126-4606-ad49-87598d865bde/scratch/qa';
const URL = 'http://localhost:5173';

async function run() {
  await mkdir(QA_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  // ── 1440px Desktop ─────────────────────────────────────
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Navigate — the loading screen renders immediately on mount
  await page.goto(URL, { waitUntil: 'domcontentloaded' });

  // Wait a beat then capture the in-progress counter
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({
    path: `${QA_DIR}/loading-initial.png`,
    fullPage: false,
  });
  console.log('✓ loading-initial.png (counter mid-progress)');

  // Wait for "100% // READY" text to appear
  try {
    await page.waitForFunction(
      () => document.body.innerText.includes('100% // READY'),
      { timeout: 3000 },
    );
    await page.screenshot({
      path: `${QA_DIR}/loading-ready.png`,
      fullPage: false,
    });
    console.log('✓ loading-ready.png (hold frame)');
  } catch {
    console.warn('⚠ Could not capture READY frame (timing)');
  }

  // Wait for loader to fully exit (the z-[9999] overlay should disappear)
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: `${QA_DIR}/loading-dismissed.png`,
    fullPage: false,
  });
  console.log('✓ loading-dismissed.png (hero visible after boot)');

  // ── Check loader is fully unmounted ─────────────────────
  const loaderStillPresent = await page.evaluate(
    () => !!document.querySelector('[aria-label^="Loading"]'),
  );
  console.log(
    loaderStillPresent
      ? '✗ FAIL: loader still in DOM after exit'
      : '✓ PASS: loader fully unmounted from DOM',
  );

  // ── 375px Mobile ───────────────────────────────────────
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 375, height: 812 });
  await mobilePage.goto(URL, { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 350));
  await mobilePage.screenshot({
    path: `${QA_DIR}/loading-375-initial.png`,
    fullPage: false,
  });
  console.log('✓ loading-375-initial.png (mobile)');

  // Wait for dismissal
  await new Promise((r) => setTimeout(r, 2000));
  await mobilePage.screenshot({
    path: `${QA_DIR}/loading-375-dismissed.png`,
    fullPage: false,
  });
  console.log('✓ loading-375-dismissed.png (mobile after boot)');

  await browser.close();
  console.log('\n✅ LoadingScreen verification complete.');
}

run().catch(console.error);
