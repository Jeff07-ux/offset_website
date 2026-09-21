// node tools/ink.mjs img.png x0 x1 y0 y1 thrSum(dark<sum) -> y-runs + x extent of dark ink
import fs from 'node:fs'; import pngjs from 'pngjs'; const {PNG}=pngjs;
const [f,x0,x1,y0,y1,thr]=process.argv.slice(2);const p=PNG.sync.read(fs.readFileSync(f));const o=[];let s=null,mn=1e9,mx=-1;
for(let y=+y0;y<=+y1;y++){let n=0;for(let x=+x0;x<+x1;x++){const i=(y*p.width+x)*4;if(p.data[i]+p.data[i+1]+p.data[i+2]<+thr){n++;mn=Math.min(mn,x);mx=Math.max(mx,x);}}
 if(n&&s===null){s=y;mn=1e9;mx=-1;for(let x=+x0;x<+x1;x++){const i=(y*p.width+x)*4;if(p.data[i]+p.data[i+1]+p.data[i+2]<+thr){mn=Math.min(mn,x);mx=Math.max(mx,x);}}}
 else if(n&&s!==null){for(let x=+x0;x<+x1;x++){const i=(y*p.width+x)*4;if(p.data[i]+p.data[i+1]+p.data[i+2]<+thr){mn=Math.min(mn,x);mx=Math.max(mx,x);}}}
 if(!n&&s!==null){o.push(`${s}-${y-1} x${mn}-${mx}`);s=null;}}
console.log(o.join(' | '));
