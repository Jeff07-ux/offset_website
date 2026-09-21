import { chromium } from 'playwright';
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:1672,height:941}})).newPage();
const fails=[]; pg.on('requestfailed',r=>fails.push(r.url().slice(0,90)+' '+r.failure()?.errorText));
pg.on('console',m=>{if(m.type()==='error'||m.type()==='warning')console.log('console',m.type(),m.text().slice(0,160));});
await pg.goto('http://localhost:3000/',{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
console.log(JSON.stringify(await pg.evaluate(()=>({body:getComputedStyle(document.body).fontFamily,h2:getComputedStyle(document.querySelector('#realtors h2')).fontFamily,loaded:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight).slice(0,12),plus:document.fonts.check("500 20px 'Plus Jakarta Sans'")}))));
console.log('failed',fails.slice(0,8)); await b.close();
