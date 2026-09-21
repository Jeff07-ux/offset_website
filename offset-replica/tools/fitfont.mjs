// node tools/fitfont.mjs  -> for each candidate font solve size+tracking from the two ink widths, then score mask IoU vs ref
import { chromium } from 'playwright'; import pngjs from 'pngjs'; import fs from 'node:fs';
const {PNG}=pngjs;
const ref=PNG.sync.read(fs.readFileSync('refs/sheet-1.png'));
const fonts=[['Plus Jakarta Sans',300],['Figtree',300],['Manrope',300],['Albert Sans',300],['Instrument Sans',400],['Outfit',300],['Inter Tight',300],['Hanken Grotesk',300],['DM Sans',300],['Onest',300],['Urbanist',300],['Red Hat Display',300],['Public Sans',300],['Be Vietnam Pro',300],['Sora',300],['Inter',300],['Geist',300],['Plus Jakarta Sans',200],['Manrope',200],['Albert Sans',200],['Figtree',200],['Instrument Sans',400]];
const uniq=[...new Set(fonts.map(f=>f.join(':')))].map(s=>{const [n,w]=s.split(':');return [n,+w];});
const link='https://fonts.googleapis.com/css2?'+[...new Set(uniq.map(f=>f[0]))].map(n=>`family=${n.replace(/ /g,'+')}:wght@200;300;400`).join('&')+'&display=swap';
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:3200,height:400}})).newPage();
await pg.setContent(`<link href="${link}" rel="stylesheet"><body style="margin:0;background:#000">`); await pg.waitForTimeout(1500);
async function ink(font,w,text,size,ls){
  await pg.evaluate(([f,w,t,s,l])=>{document.body.innerHTML=`<div style="position:absolute;left:50px;top:50px;font:${w} ${s}px '${f}';letter-spacing:${l}px;color:#fff;white-space:nowrap;line-height:1.2">${t}</div>`;},[font,w,text,size,ls]);
  await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(80);
  const png=PNG.sync.read(await pg.screenshot());
  let x0=1e9,x1=-1,y0=1e9,y1=-1; for(let y=0;y<png.height;y++)for(let x=0;x<png.width;x++){if(png.data[(y*png.width+x)*4]>128){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}}
  return {png,x0,x1,y0,y1,w:x1-x0+1,h:y1-y0+1};
}
const rows=[];
for(const [f,w] of uniq){
  const H=(await ink(f,w,'H',200,0)).h/200, X=(await ink(f,w,'x',200,0)).h/200;
  const a1=(await ink(f,w,'Real estate,',200,0)).w/200, a2=(await ink(f,w,'seen differently.',200,0)).w/200;
  const size=75/H; const ls=(682-size*a2)/16; const p1=size*a1+11*ls;
  rows.push({font:f,w,cap:H.toFixed(3),xh:(X/H).toFixed(3),size:size.toFixed(1),lsEm:(ls/size).toFixed(3),line1err:(p1-507).toFixed(1)});
}
rows.sort((p,q)=>Math.abs(p.line1err)+Math.abs(p.xh-0.71)*300-Math.abs(q.line1err)-Math.abs(q.xh-0.71)*300);
console.table(rows); await b.close();
