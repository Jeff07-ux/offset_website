// node tools/dark.mjs img y0 y1 x0 x1 thr gap -> x-runs of DARK pixels (sum<thr)
import fs from 'node:fs'; import pngjs from 'pngjs'; const {PNG}=pngjs;
const [f,y0,y1,x0,x1,thr='250',gap='8']=process.argv.slice(2);const p=PNG.sync.read(fs.readFileSync(f));
const cols=[];for(let x=+x0;x<+x1;x++){let n=0;for(let y=+y0;y<+y1;y++){const i=(y*p.width+x)*4;if(p.data[i]+p.data[i+1]+p.data[i+2]<+thr)n++;}cols.push(n>0);}
let s=null,last=-99;const out=[];cols.forEach((c,i)=>{const x=+x0+i;if(c){if(s===null)s=x;else if(x-last>+gap){out.push([s,last]);s=x;}last=x;}});if(s!==null)out.push([s,last]);console.log(out.map(r=>r.join('-')).join('  '));
