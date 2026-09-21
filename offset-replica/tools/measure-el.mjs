import { chromium } from 'playwright'; import { pathToFileURL } from 'node:url'; import path from 'node:path';
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:1672,height:941}})).newPage();
await pg.goto(pathToFileURL(path.resolve('index.html')).href,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
console.log(JSON.stringify(await pg.evaluate(()=>[...document.querySelectorAll('p, nav a, label')].filter(e=>e.getBoundingClientRect().left>500).map(e=>{const r=e.getBoundingClientRect();return [e.textContent.trim().slice(0,14),+r.left.toFixed(1),+r.right.toFixed(1),+r.width.toFixed(1)];}))));
await b.close();
