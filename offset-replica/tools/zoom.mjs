// node tools/zoom.mjs refs/x.png x y w h scale out.png  (nearest-neighbour crop+zoom)
import fs from 'node:fs'; import pngjs from 'pngjs';
const { PNG } = pngjs;
const [f,x,y,w,h,s,out]=process.argv.slice(2); const [X,Y,W,H,S]=[x,y,w,h,s].map(Number);
const src=PNG.sync.read(fs.readFileSync(f)); const o=new PNG({width:W*S,height:H*S});
for(let j=0;j<H*S;j++)for(let i=0;i<W*S;i++){const sx=X+Math.floor(i/S),sy=Y+Math.floor(j/S);const a=(sy*src.width+sx)*4,b=(j*o.width+i)*4;for(let k=0;k<4;k++)o.data[b+k]=src.data[a+k];}
fs.writeFileSync(out,PNG.sync.write(o));
