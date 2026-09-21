import { chromium } from 'playwright'; import { pathToFileURL } from 'node:url'; import path from 'node:path';
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:320,height:640}})).newPage();
await pg.goto(pathToFileURL(path.resolve('index.html')).href,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
await pg.click('label[for=menu]'); await pg.waitForTimeout(200);
await pg.screenshot({path:'shots/r320-menu.png'});
const over=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
console.log('320 overflow',JSON.stringify(over));
for(const w of [1099,1100,1440,2560]){await pg.setViewportSize({width:w,height:900});await pg.waitForTimeout(150);
 console.log(w,JSON.stringify(await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h:document.querySelector('#hero').getBoundingClientRect().height,navDisplay:getComputedStyle(document.querySelector('nav')).display}))));}
await b.close();
