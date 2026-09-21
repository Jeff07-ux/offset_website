#!/usr/bin/env node
// Print the exact colour of pixels in a reference screenshot.
//   node tools/sample.mjs refs/home-hero.png 40,120 800,300 1200,640
// Each point is x,y in IMAGE pixels (top-left = 0,0).
import fs from 'node:fs';
import pngjs from 'pngjs';

const { PNG } = pngjs;
const [file, ...points] = process.argv.slice(2);
if (!file || points.length === 0) {
  console.error('Usage: node tools/sample.mjs <image.png> x,y [x,y ...]');
  process.exit(2);
}

const png = PNG.sync.read(fs.readFileSync(file));
const hex = (n) => n.toString(16).padStart(2, '0');

console.log(`${file}: ${png.width}x${png.height}px`);
for (const p of points) {
  const [x, y] = p.split(',').map(Number);
  if (!(x >= 0 && y >= 0 && x < png.width && y < png.height)) {
    console.log(`(${x},${y})  out of bounds`);
    continue;
  }
  const i = (y * png.width + x) * 4;
  const [r, g, b, a] = [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]];
  console.log(`(${x},${y})  #${hex(r)}${hex(g)}${hex(b)}${a < 255 ? hex(a) : ''}  rgb(${r}, ${g}, ${b})`);
}
