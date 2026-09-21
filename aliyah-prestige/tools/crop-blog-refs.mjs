// Cut the Journal page out of the ChatGPT mockup into per-section refs (x 29..758).
import fs from 'node:fs'; import pngjs from 'pngjs'; const {PNG}=pngjs;
const src=PNG.sync.read(fs.readFileSync('images/ChatGPT Image 20 sept. 2026, 22_18_28.png'));
const bands={'blog-hero':[20,281],'blog-articles':[282,837],'blog-newsletter':[838,953],'blog-footer':[954,1004]};
for(const [n,[y0,y1]] of Object.entries(bands)){const w=730,h=y1-y0+1;const o=new PNG({width:w,height:h});PNG.bitblt(src,o,29,y0,w,h,0,0);fs.writeFileSync(`refs/${n}.png`,PNG.sync.write(o));console.log(n,w,h);}
