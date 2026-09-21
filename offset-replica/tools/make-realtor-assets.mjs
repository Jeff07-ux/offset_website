// node tools/make-realtor-assets.mjs
// Crops the photos of the "03 Realtors" section out of refs/sheet-2.png into ../public/assets/realtors/
// (stopgap until the original photos exist). Overlay UI on the portrait (play ring, caption, duration) is erased.
import fs from 'node:fs'; import path from 'node:path'; import pngjs from 'pngjs';
const { PNG } = pngjs;
const src = PNG.sync.read(fs.readFileSync('refs/sheet-2.png'));
const OUT = path.resolve('..', 'public', 'assets', 'realtors');
fs.mkdirSync(OUT, { recursive: true });

function crop(x0, y0, x1, y1) { // inclusive x0..x1, y0..y1
  const w = x1 - x0 + 1, h = y1 - y0 + 1; const o = new PNG({ width: w, height: h });
  PNG.bitblt(src, o, x0, y0, w, h, 0, 0); return o;
}
function erase(png, boxes) { // boxes in png coords: [x0,y0,x1,y1,minChannelThreshold]
  const W = png.width, H = png.height; let mask = new Uint8Array(W * H);
  for (const [x0, y0, x1, y1, t] of boxes) for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    const i = (y * W + x) * 4; if (Math.min(png.data[i], png.data[i + 1], png.data[i + 2]) >= t) mask[y * W + x] = 1;
  }
  for (let k = 0; k < 4; k++) { const m2 = mask.slice(); for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) if (mask[y * W + x]) for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) m2[(y + j) * W + x + i] = 1; mask = m2; }
  const known = new Uint8Array(W * H); let left = 0; for (let p = 0; p < W * H; p++) { known[p] = mask[p] ? 0 : 1; left += mask[p]; }
  for (let pass = 0; pass < 60 && left > 0; pass++) {
    const fill = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const p = y * W + x; if (known[p]) continue; let n = 0, r = 0, g = 0, b = 0;
      for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) { const xx = x + i, yy = y + j; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const q = yy * W + xx; if (!known[q]) continue; n++; r += png.data[q * 4]; g += png.data[q * 4 + 1]; b += png.data[q * 4 + 2]; }
      if (n >= 3) fill.push([p, r / n, g / n, b / n]); }
    for (const [p, r, g, b] of fill) { png.data[p * 4] = r; png.data[p * 4 + 1] = g; png.data[p * 4 + 2] = b; known[p] = 1; left--; }
  }
  return png;
}
const save = (name, png) => fs.writeFileSync(path.join(OUT, name), PNG.sync.write(png));

// portrait card: sheet box x86..549, y84..901 -> local offset (86,84)
const portrait = crop(86, 84, 549, 901);
erase(portrait, [
  [186, 356, 290, 460, 205],   // play ring + triangle (sheet 272..376 x 440..544)
  [24, 738, 224, 786, 170],    // caption (sheet 110..310 x 822..870)
  [298, 756, 446, 788, 150],   // rule + duration (sheet 384..532 x 840..872)
]);
save('portrait.png', portrait);
save('property.png', crop(602, 457, 1075, 702));
save('lifestyle.png', crop(1090, 457, 1587, 702));
// thumbs: the first one has a 3px cobalt selection border which is cropped away
save('thumb-1.png', crop(623, 767, 722, 847));
save('thumb-2.png', crop(730, 764, 831, 850));
save('thumb-3.png', crop(838, 764, 954, 850));
save('thumb-4.png', crop(961, 764, 1075, 850));
save('thumb-5.png', crop(1083, 764, 1198, 850));
console.log('assets written to', OUT);
