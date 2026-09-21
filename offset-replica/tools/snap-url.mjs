// node tools/snap-url.mjs <url> <out.png> [selector] [offsetY] [w] [h]
// Loads a live URL, scrolls the selector to the top of the viewport (minus offsetY), waits for images, saves a viewport screenshot.
import { chromium } from 'playwright';
const [url,out,sel='#realtors',off='0',w='1672',h='941']=process.argv.slice(2);
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:+w,height:+h}})).newPage();
await pg.goto(url,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
await pg.evaluate(async([s,o])=>{const el=document.querySelector(s);el.scrollIntoView({block:'start',behavior:'instant'});window.scrollBy(0,-o);
  const imgs=[...document.images];imgs.forEach(i=>{i.loading='eager';});await Promise.all(imgs.map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r;})));},[sel,+off]);
await pg.addStyleTag({content:'nextjs-portal{display:none!important}'});await pg.waitForTimeout(900);
await pg.screenshot({path:out}); await b.close();
