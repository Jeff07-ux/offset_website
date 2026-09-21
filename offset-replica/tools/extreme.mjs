// node tools/extreme.mjs img x0 y0 x1 y1 [dark|light] -> extreme-colour pixel (mean of 5 most extreme) in box
import fs from 'node:fs'; import pngjs from 'pngjs'; const {PNG}=pngjs;
const [f,x0,y0,x1,y1,mode='dark']=process.argv.slice(2);const p=PNG.sync.read(fs.readFileSync(f));const a=[];
for(let y=+y0;y<+y1;y++)for(let x=+x0;x<+x1;x++){const i=(y*p.width+x)*4;a.push([p.data[i]+p.data[i+1]+p.data[i+2],p.data[i],p.data[i+1],p.data[i+2]]);}
a.sort((u,v)=>mode==='dark'?u[0]-v[0]:v[0]-u[0]);const t=a.slice(0,5);const m=[1,2,3].map(k=>Math.round(t.reduce((s,q)=>s+q[k],0)/5));
console.log(`${mode} #${m.map(n=>n.toString(16).padStart(2,'0')).join('')} rgb(${m})`);
