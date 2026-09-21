#!/usr/bin/env node
// Usage:
//   node tools/compare.mjs --ref refs/home-hero.png --selector "#home-hero"
//
// Options:
//   --ref        (required) reference screenshot PNG
//   --page       HTML file to render                 (default: index.html)
//   --selector   CSS selector of the section to shoot (default: full page)
//   --width      viewport width in CSS px            (default: ref width / dpr)
//   --height     viewport height in CSS px           (default: 900)
//   --shot       compare an existing screenshot PNG instead of rendering --page (e.g. from tools/snap-url.mjs)
//   --dpr        device scale factor of the ref      (default: 1)
//   --tolerance  pixelmatch colour tolerance 0..1    (default: 0.1)
//   --max        max allowed mismatch in %           (default: 1)
//   --name       output name                         (default: ref file name)
//
// Output: shots/<name>.png, diffs/<name>.diff.png (red = different pixels)
// Exit code: 0 = pass, 1 = fail (size mismatch or mismatch % above --max)

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import pngjs from 'pngjs';
import pixelmatch from 'pixelmatch';

const { PNG } = pngjs;

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[++i];
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
if (!args.ref) {
  console.error('Missing --ref <reference.png>');
  process.exit(2);
}

const refPath = path.resolve(args.ref);
const pagePath = path.resolve(args.page ?? 'index.html');
const dpr = Number(args.dpr ?? 1);
const tolerance = Number(args.tolerance ?? 0.1);
const maxMismatch = Number(args.max ?? 1);
const name = args.name ?? path.basename(refPath, path.extname(refPath));

const ref = PNG.sync.read(fs.readFileSync(refPath));
const width = Number(args.width ?? Math.round(ref.width / dpr));
const height = Number(args.height ?? 900);

fs.mkdirSync('shots', { recursive: true });
fs.mkdirSync('diffs', { recursive: true });
const shotPath = args.shot ? path.resolve(args.shot) : path.resolve('shots', `${name}.png`);
const diffPath = path.resolve('diffs', `${name}.diff.png`);

// ---- render ---------------------------------------------------------------
const { chromium } = args.shot ? { chromium: null } : await import('playwright');
const browser = args.shot ? null : await chromium.launch();
if (!args.shot) try {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: dpr,
  });
  const page = await context.newPage();
  await page.goto(pathToFileURL(pagePath).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  const shotOpts = { path: shotPath, animations: 'disabled', caret: 'hide' };
  if (args.selector) {
    await page.locator(args.selector).first().screenshot(shotOpts);
  } else {
    await page.screenshot({ ...shotOpts, fullPage: true });
  }
} finally {
  await browser.close();
}


// ---- compare --------------------------------------------------------------
const shot = PNG.sync.read(fs.readFileSync(shotPath));
const w = Math.min(ref.width, shot.width);
const h = Math.min(ref.height, shot.height);

function crop(png, cw, ch) {
  if (png.width === cw && png.height === ch) return png;
  const out = new PNG({ width: cw, height: ch });
  PNG.bitblt(png, out, 0, 0, cw, ch, 0, 0);
  return out;
}

const a = crop(ref, w, h);
const b = crop(shot, w, h);
const diff = new PNG({ width: w, height: h });
const diffPixels = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: tolerance });
fs.writeFileSync(diffPath, PNG.sync.write(diff));

const pct = (diffPixels / (w * h)) * 100;
const sizeOk = ref.width === shot.width && ref.height === shot.height;

// worst horizontal bands (40 CSS px tall) -> tells the agent WHERE to look
const bandH = Math.max(1, Math.round(40 * dpr));
const bands = [];
for (let y0 = 0; y0 < h; y0 += bandH) {
  let n = 0;
  for (let y = y0; y < Math.min(y0 + bandH, h); y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (diff.data[i] === 255 && diff.data[i + 1] === 0 && diff.data[i + 2] === 0) n++;
    }
  }
  bands.push({ y0: Math.round(y0 / dpr), n });
}
bands.sort((p, q) => q.n - p.n);

console.log(`ref   : ${ref.width}x${ref.height}px`);
console.log(`render: ${shot.width}x${shot.height}px  ${sizeOk ? '(size OK)' : '(SIZE MISMATCH - fix height/width first)'}`);
console.log(`mismatch: ${pct.toFixed(3)}%  (${diffPixels} px, allowed <= ${maxMismatch}%)`);
console.log('worst bands (CSS y, 40px tall):');
for (const b2 of bands.slice(0, 5).filter((x) => x.n > 0)) {
  console.log(`  y=${b2.y0}..${b2.y0 + 40}  ${b2.n} px`);
}
console.log(`shot: ${path.relative(process.cwd(), shotPath)}`);
console.log(`diff: ${path.relative(process.cwd(), diffPath)}`);

const pass = sizeOk && pct <= maxMismatch;
console.log(pass ? 'RESULT: PASS' : 'RESULT: FAIL');
process.exit(pass ? 0 : 1);
