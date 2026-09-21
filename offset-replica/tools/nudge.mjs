// node tools/nudge.mjs -> search 1px offsets per headline line to minimise pixelmatch mismatch in the line box
import { chromium } from 'playwright'; import pngjs from 'pngjs'; import pixelmatch from 'pixelmatch'; import fs from 'node:fs'; import path from 'node:path'; import { pathToFileURL } from 'node:url';
const {PNG}=pngjs; const ref=PNG.sync.read(fs.readFileSync('refs/sheet-1.png'));
const crop=(png,x,y,w,h)=>{const o=new PNG({width:w,height:h});PNG.bitblt(png,o,x,y,w,h,0,0);return o;};
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:1672,height:941}})).newPage();
await pg.goto(pathToFileURL(path.resolve('index.html')).href,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
const lines=[{n:'l1',box:[58,306,775,404],sel:'#hero h1 span:nth-child(-n+2)'},{n:'l2',box:[58,404,775,520],sel:'#hero h1 span:nth-child(n+3)'}];
for(const L of lines){
  const [x,y,x2,y2]=L.box,w=x2-x,h=y2-y; const r=crop(ref,x,y,w,h); let best=null; const res=[];
  for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){
    await pg.evaluate(([s,dx,dy])=>document.querySelectorAll(s).forEach(e=>{e.style.transform=`translate(${dx}px,${dy}px)`;}),[L.sel,dx,dy]);
    const s=PNG.sync.read(await pg.screenshot({clip:{x,y,width:w,height:h}}));
    const n=pixelmatch(r.data,s.data,null,w,h,{threshold:0.1}); res.push([n,dx,dy]); if(!best||n<best[0])best=[n,dx,dy];
  }
  const base=res.find(q=>q[1]===0&&q[2]===0)[0];
  console.log(L.n,'base',base,'best',JSON.stringify(best));
}
await b.close();
