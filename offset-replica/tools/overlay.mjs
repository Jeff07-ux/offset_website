// node tools/overlay.mjs -> shots/overlay.png : candidate fonts as red SVG text over the ref headline crop
import { chromium } from 'playwright'; import { pathToFileURL } from 'node:url'; import path from 'node:path'; import fs from 'node:fs';
const c=[['Be Vietnam Pro',300,101.4,-0.049],['Geist',300,105.6,-0.029],['Manrope',200,104.2,-0.025],['Hanken Grotesk',300,107.1,-0.032],['Urbanist',300,107.1,-0.023],['Plus Jakarta Sans',300,100.7,-0.045]];
const ref=pathToFileURL(path.resolve('refs/sheet-1.png')).href;
const fams=c.map(f=>`family=${f[0].replace(/ /g,'+')}:wght@${f[1]}`).join('&');
const cell=([n,w,s,l])=>`<div class=c><div class=bg></div><svg width=720 height=220 style="position:absolute;left:0;top:0"><g font-family="'${n}'" font-weight="${w}" font-size="${s}" letter-spacing="${(l*s).toFixed(2)}" fill="rgba(255,0,0,.6)"><text x="${18-0.07*s}" y="94">Real estate,</text><text x="${14-0.07*s}" y="191">seen differently.</text></g></svg><small>${n} ${w}</small></div>`;
fs.writeFileSync('shots/overlay.html',`<meta charset=utf-8><link href="https://fonts.googleapis.com/css2?${fams}&display=swap" rel=stylesheet><style>body{margin:0;display:grid;grid-template-columns:720px 720px;gap:6px;background:#222}.c{position:relative;width:720px;height:220px;overflow:hidden}.bg{position:absolute;inset:0;background:url(${ref}) -55px -300px}small{position:absolute;right:6px;bottom:4px;font:14px monospace;color:#ff0;background:#000}</style>${c.map(cell).join('')}`);
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:1446,height:700},allowedFileAccess:true})).newPage();
await pg.goto(pathToFileURL(path.resolve('shots/overlay.html')).href,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(400);
await pg.screenshot({path:'shots/overlay.png',fullPage:true}); await b.close();
