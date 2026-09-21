// node tools/fontrank2.mjs -> rank fonts for the sheet-2 headline (dark text on white), per-word fitted
import { chromium } from 'playwright'; import pngjs from 'pngjs'; import fs from 'node:fs';
const {PNG}=pngjs; const ref=PNG.sync.read(fs.readFileSync('refs/sheet-2.png'));
const X0=595,Y0=160,X1=1145,Y1=290,W=X1-X0,H=Y1-Y0,CAP=41;
const rm=new Uint8Array(W*H); for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=((Y0+y)*ref.width+X0+x)*4;rm[y*W+x]=(ref.data[i]+ref.data[i+1]+ref.data[i+2])<330?1:0;}
const words=[['Build',606,748,209],['a',772,802,209],['name',825,986,209],['people',606,800,268],['remember.',823,1134,268]];
const names=['Plus Jakarta Sans','Montserrat','Work Sans','Raleway'];
const wts=[500,600,700,800];
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:W,height:H}})).newPage();
await pg.setContent(`<link href="https://fonts.googleapis.com/css2?${names.map(f=>`family=${f.replace(/ /g,'+')}:wght@200..800`).join('&')}&display=swap" rel="stylesheet"><body style="margin:0;background:#fff">`);
await pg.waitForTimeout(3000);
const res=[];
for(const f of names)for(const w of wts){
  const font=`${w} 100px '${f}'`;
  const cap=await pg.evaluate(async(font)=>{try{await document.fonts.load(font,'B');if(!document.fonts.check(font,'B'))return 0;}catch(e){return 0;}const c=document.createElement('canvas').getContext('2d');c.font=font;return c.measureText('H').actualBoundingBoxAscent;},font);
  if(!cap)continue; const size=CAP/(cap/100);
  const fit=await pg.evaluate(async([f,w,size,words,X0,Y0])=>{const font=`${w} ${size}px '${f}'`;await document.fonts.load(font,'B');const c=document.createElement('canvas').getContext('2d');c.font=font;
    return words.map(([t,x0,x1,y])=>{const m=c.measureText(t);const ink=m.actualBoundingBoxLeft+m.actualBoundingBoxRight;const n=[...t].length;return {t,left:x0+m.actualBoundingBoxLeft-X0,ls:n>1?((x1-x0+1)-ink)/(n-1):0,y:y-Y0};});},[f,w,size,words,X0,Y0]);
  await pg.evaluate(([f,w,size,fit,W,H])=>{document.body.innerHTML=`<svg width="${W}" height="${H}" style="display:block"><g font-family="'${f}'" font-weight="${w}" font-size="${size}" fill="#000">${fit.map(q=>`<text x="${q.left}" y="${q.y}" letter-spacing="${q.ls}">${q.t}</text>`).join('')}</g></svg>`;},[f,w,size,fit,W,H]);
  await pg.evaluate(()=>document.fonts.ready);
  const png=PNG.sync.read(await pg.screenshot());
  let x=0,a=0,u=0; for(let i=0;i<W*H;i++){const m=(png.data[i*4]+png.data[i*4+1]+png.data[i*4+2])<330?1:0; if(m!==rm[i])x++; if(m&&rm[i])a++; if(m||rm[i])u++;}
  res.push({font:f,w,size:size.toFixed(1),lsAvg:(fit.reduce((s,q)=>s+q.ls,0)/fit.length).toFixed(2),xor:x,iou:(a/u).toFixed(3)});
}
res.sort((p,q)=>p.xor-q.xor); console.table(res.slice(0,12)); console.log('Plus Jakarta:',JSON.stringify(res.filter(r=>r.font==='Plus Jakarta Sans'))); await b.close();
