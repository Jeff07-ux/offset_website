// node tools/runs.mjs img.png row|col index lo hi -> runs of "not cream" pixels (lum < 215) along a row (y=index) or column (x=index)
import fs from 'node:fs'; import pngjs from 'pngjs'; const {PNG}=pngjs;
const [f,axis,idx,thr='215']=process.argv.slice(2); const p=PNG.sync.read(fs.readFileSync(f)); const n=axis==='row'?p.width:p.height; const out=[];let s=null;
for(let t=0;t<=n;t++){let dark=false;if(t<n){const x=axis==='row'?t:+idx,y=axis==='row'?+idx:t;const i=(y*p.width+x)*4;dark=(0.299*p.data[i]+0.587*p.data[i+1]+0.114*p.data[i+2])<+thr;}
 if(dark&&s===null)s=t;if(!dark&&s!==null){if(t-s>3)out.push(`${s}-${t-1}`);s=null;}}
console.log(out.join('  '));
