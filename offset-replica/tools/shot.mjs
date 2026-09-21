// node tools/shot.mjs page.html out.png [width] [height] -> full-page screenshot
import { chromium } from 'playwright'; import { pathToFileURL } from 'node:url'; import path from 'node:path';
const [p,out,w='1672',h='941']=process.argv.slice(2);
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:+w,height:+h}})).newPage();
await pg.goto(pathToFileURL(path.resolve(p)).href,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(300);
await pg.screenshot({path:out,fullPage:true}); await b.close();
