// Cut the Private Transfers (service) page out of the ChatGPT mockup into per-section refs (x 787..1506).
import fs from 'node:fs'; import pngjs from 'pngjs'; const {PNG}=pngjs;
const src=PNG.sync.read(fs.readFileSync('images/ChatGPT Image 20 sept. 2026, 22_18_28.png'));
const bands=JSON.parse(process.argv[2]||'{"svc-hero":[20,285],"svc-mid":[286,792],"svc-cta":[793,954],"svc-footer":[955,1005]}');
for(const [n,[y0,y1]] of Object.entries(bands)){const w=720,h=y1-y0+1;const o=new PNG({width:w,height:h});PNG.bitblt(src,o,787,y0,w,h,0,0);fs.writeFileSync(`refs/${n}.png`,PNG.sync.write(o));console.log(n,w,h);}
