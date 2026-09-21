// node tools/fitwords.mjs -> per-word left / letter-spacing so each word's ink box equals the reference ink box
import { chromium } from 'playwright';
const specs={
 h1:{font:"300 107.1px 'Hanken Grotesk'",words:[['Real',73,258,0],['estate,',291,579,0],['seen',69,273,97],['differently.',310,750,97]]},
 sub:{font:"300 30px 'Hanken Grotesk'",words:[['Digital',67,144,0],['presence',159,281,0],['for',294,328,0],['properties',341,476,0],['worth',489,562,0],['noticing.',576,686,0]]},
};
const b=await chromium.launch(); const pg=await (await b.newContext()).newPage();
await pg.setContent(`<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300&family=Geist:wght@300&display=swap" rel="stylesheet"><body>`);
await pg.waitForTimeout(1500);
const fam=process.argv[2]; 
for(const k in specs){
  const {font,words}=specs[k]; const out=[];
  for(const [w,x0,x1,y] of words){
    const m=await pg.evaluate(async([font,w])=>{await document.fonts.load(font,w);const c=document.createElement('canvas').getContext('2d');c.font=font;c.letterSpacing='0px';const t=c.measureText(w);return {l:t.actualBoundingBoxLeft,r:t.actualBoundingBoxRight};},[font,w]);
    const ink0=m.l+m.r; const n=[...w].length; const ls=((x1-x0+1)-ink0)/(n-1); const left=x0+m.l;
    out.push({w,left:+left.toFixed(1),ls:+ls.toFixed(2),y});
  }
  console.log(k,JSON.stringify(out));
}
await b.close();
