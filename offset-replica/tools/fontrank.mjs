// node tools/fontrank.mjs -> rank candidate fonts for the headline by white-mask XOR vs ref (per-word fitted)
import { chromium } from 'playwright'; import pngjs from 'pngjs'; import fs from 'node:fs';
const {PNG}=pngjs; const ref=PNG.sync.read(fs.readFileSync('refs/sheet-1.png'));
const X0=58,Y0=306,X1=775,Y1=520,W=X1-X0,H=Y1-Y0;
const rm=new Uint8Array(W*H); for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=((Y0+y)*ref.width+X0+x)*4;rm[y*W+x]=Math.min(ref.data[i],ref.data[i+1],ref.data[i+2])>205?1:0;}
const words=[['Real',73,258,394],['estate,',291,579,394],['seen',69,273,491],['differently.',310,750,491]];
const cands=[['Be Vietnam Pro',300],['Geist',300],['Manrope',300],['Manrope',200],['Plus Jakarta Sans',300],['Plus Jakarta Sans',200],['Instrument Sans',400],['Public Sans',300],['Public Sans',200],['Sora',300],['Sora',200],['Urbanist',300],['Outfit',300],['Outfit',200],['Figtree',300],['Albert Sans',300],['Albert Sans',200],['DM Sans',300],['Hanken Grotesk',300],['Inter Tight',300],['Inter',300],['Inter',200],['Red Hat Display',300],['Onest',300],['Lexend',300],['Lexend',200],['Poppins',300],['Poppins',200],['Montserrat',300],['Montserrat',200],['Work Sans',300],['Work Sans',200],['Nunito Sans',300],['Nunito Sans',200],['Rubik',300],['Karla',300],['Space Grotesk',300],['Epilogue',300],['Epilogue',200],['Schibsted Grotesk',400],['Bricolage Grotesque',300],['Wix Madefor Display',400],['Familjen Grotesk',400],['Reddit Sans',300],['Reddit Sans',200],['Golos Text',400],['Mulish',300],['Mulish',200],['Kumbh Sans',300],['Kumbh Sans',200],['Jost',300],['Jost',200],['Raleway',300],['Raleway',200],['Lato',300],['Open Sans',300],['Roboto',300],['Roboto',100],['Heebo',300],['Heebo',200],['Assistant',300],['Assistant',200],['Barlow',300],['Barlow',200],['Red Hat Text',300],['Libre Franklin',300],['Libre Franklin',200],['Instrument Sans',500]];
const fams=[...new Set(cands.map(c=>c[0]))]; const wg=[...new Set(cands.map(c=>c[1]))].join(';');
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:900,height:600}})).newPage();
const link=`https://fonts.googleapis.com/css2?${fams.map(f=>`family=${f.replace(/ /g,'+')}:wght@100..900`).join('&')}&display=swap`;
await pg.setContent(`<link href="${link}" rel="stylesheet"><body style="margin:0;background:#000">`);
await pg.waitForTimeout(2500);
const res=[];
for(const [f,w] of cands){
  const font=`${w} 100px '${f}'`;
  const ok=await pg.evaluate(async(font)=>{try{await document.fonts.load(font,'Real');return document.fonts.check(font,'Real');}catch(e){return false;}},font);
  if(!ok){continue;}
  const cap=await pg.evaluate(([font])=>{const c=document.createElement('canvas').getContext('2d');c.font=font;const t=c.measureText('H');return t.actualBoundingBoxAscent;},[font]);
  const size=75/(cap/100);
  const fit=await pg.evaluate(async([f,w,size,words])=>{const font=`${w} ${size}px '${f}'`;await document.fonts.load(font,'Real');const c=document.createElement('canvas').getContext('2d');c.font=font;c.letterSpacing='0px';
    return words.map(([t,x0,x1,y])=>{const m=c.measureText(t);const ink=m.actualBoundingBoxLeft+m.actualBoundingBoxRight;const n=[...t].length;return {t,left:x0+m.actualBoundingBoxLeft-58,ls:((x1-x0+1)-ink)/(n-1),y:y-306};});},[f,w,size,words]);
  await pg.setViewportSize({width:W,height:H});
  await pg.evaluate(([f,w,size,fit,W,H])=>{document.body.innerHTML=`<svg width="${W}" height="${H}" style="display:block"><g font-family="'${f}'" font-weight="${w}" font-size="${size}" fill="#fff">${fit.map(q=>`<text x="${q.left}" y="${q.y}" letter-spacing="${q.ls}">${q.t}</text>`).join('')}</g></svg>`;},[f,w,size,fit,W,H]);
  await pg.evaluate(()=>document.fonts.ready);
  const png=PNG.sync.read(await pg.screenshot());
  let x=0,a=0,u=0; for(let i=0;i<W*H;i++){const m=png.data[i*4]>128?1:0; if(m!==rm[i])x++; if(m&&rm[i])a++; if(m||rm[i])u++;}
  const lsAvg=fit.reduce((s,q)=>s+q.ls,0)/fit.length;
  res.push({font:f,w,size:size.toFixed(1),lsAvg:lsAvg.toFixed(2),xor:x,iou:(a/u).toFixed(3)});
}
res.sort((p,q)=>p.xor-q.xor); console.table(res.slice(0,15)); await b.close();
