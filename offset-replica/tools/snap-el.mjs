// node tools/snap-el.mjs <url> <out.png> <selector> <w> <h> -> element screenshot (full element height)
import { chromium } from 'playwright';
const [url,out,sel,w='390',h='844']=process.argv.slice(2);
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:+w,height:+h}})).newPage();
await pg.goto(url,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
await pg.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>{i.loading='eager';});window.scrollTo(0,document.body.scrollHeight);await new Promise(r=>setTimeout(r,600));});
await pg.addStyleTag({content:'nextjs-portal{display:none!important} header{position:absolute!important}'});
await pg.waitForTimeout(800);
await pg.locator(sel).first().screenshot({path:out}); await b.close();
