// node tools/rows.mjs img.png x0 x1 [y0 y1] [thr]  -> prints y-runs and x-extent of bright pixels (min channel > thr)
import fs from 'node:fs'; import pngjs from 'pngjs';
const {PNG}=pngjs; const [f,x0,x1,y0='0',y1='9999',thr='170']=process.argv.slice(2);
const p=PNG.sync.read(fs.readFileSync(f)); const T=+thr; const rows=[];
for(let y=+y0;y<Math.min(+y1,p.height);y++){let n=0,mn=1e9,mx=-1;for(let x=+x0;x<Math.min(+x1,p.width);x++){const i=(y*p.width+x)*4;if(Math.min(p.data[i],p.data[i+1],p.data[i+2])>T){n++;mn=Math.min(mn,x);mx=Math.max(mx,x);}}rows.push({y,n,mn,mx});}
let run=null;const out=[];for(const r of rows){if(r.n>0){if(!run)run={y0:r.y,y1:r.y,mn:r.mn,mx:r.mx};else{run.y1=r.y;run.mn=Math.min(run.mn,r.mn);run.mx=Math.max(run.mx,r.mx);}}else if(run){out.push(run);run=null;}}if(run)out.push(run);
for(const r of out)console.log(`y ${r.y0}-${r.y1} (h${r.y1-r.y0+1}) x ${r.mn}-${r.mx}`);
