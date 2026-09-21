// Derive Private Transfers page photos from the per-section refs (text/UI erased). Stopgap until real photos exist.
import fs from 'node:fs';
import { PNG, rd, save, inpaint } from './inpaint.mjs';
fs.mkdirSync('assets', { recursive: true });

let hero = rd('refs/svc-hero.png');
hero = inpaint(hero, [[28,4,168,46],[236,16,502,36],[596,8,696,42],[44,88,132,104],[44,108,252,168],[44,174,256,192],[44,210,308,234]]);
save(hero, 'assets/svc-hero-bg.png');

let cta = rd('refs/svc-cta.png');
cta = inpaint(cta, [[44,20,272,140]], [[555,88,678,118]]);
save(cta, 'assets/svc-cta-bg.png');

const crop = (img, [x0,y0,x1,y1], f) => { const w=x1-x0+1,h=y1-y0+1; const o=new PNG({width:w,height:h}); PNG.bitblt(img,o,x0,y0,w,h,0,0); save(o,f); };
crop(rd('refs/svc-intro.png'), [47,22,375,265], 'assets/svc-intro.png');
const fleet = rd('refs/svc-fleet.png');
[[49,88,194,164],[210,88,353,164],[369,88,514,164],[530,88,674,164]].forEach((r,i)=>crop(fleet,r,`assets/svc-fleet-${i+1}.png`));
console.log('svc assets done');
