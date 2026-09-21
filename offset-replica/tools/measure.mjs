import { chromium } from 'playwright'; import { pathToFileURL } from 'node:url'; import path from 'node:path';
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:1800,height:900}})).newPage();
await pg.goto(pathToFileURL(path.resolve('shots/fonttest.html')).href,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
const r=await pg.evaluate(()=>[...document.querySelectorAll('div')].map(d=>{const n=d.querySelector('small').textContent;const fam=getComputedStyle(d).fontFamily;const w=getComputedStyle(d).fontWeight;
 const m=(t)=>{const s=document.createElement('span');s.style.cssText=`font:${w} 100px ${fam};white-space:nowrap;position:absolute`;s.textContent=t;document.body.appendChild(s);const x=s.getBoundingClientRect().width;s.remove();return x;};
 return {n, ratio:(m('seen differently.')/m('Real estate,')).toFixed(3), w2:m('seen differently.').toFixed(0)};}));
console.table(r); await b.close();
