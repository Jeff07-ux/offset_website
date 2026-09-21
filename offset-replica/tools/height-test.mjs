import { chromium } from 'playwright'; import { pathToFileURL } from 'node:url'; import path from 'node:path';
const b=await chromium.launch(); const pg=await (await b.newContext({viewport:{width:1672,height:941}})).newPage();
await pg.goto(pathToFileURL(path.resolve('index.html')).href,{waitUntil:'networkidle'}); await pg.evaluate(()=>document.fonts.ready);
for(const [w,h] of [[1672,941],[1920,1080],[1440,700],[1280,1000],[2560,1080],[1100,800],[1099,800],[768,1024],[390,844],[360,640],[844,390],[667,375],[740,360],[915,412]]){
  await pg.setViewportSize({width:w,height:h}); await pg.waitForTimeout(150);
  const r=await pg.evaluate(()=>({sec:document.querySelector('#hero').getBoundingClientRect().height,sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight}));
  console.log(`${w}x${h}  section=${r.sec.toFixed(1)}  ${Math.abs(r.sec-h)<1?'== viewport':'!= viewport'}  scrollW=${r.sw} scrollH=${r.sh}`);
}
await b.close();
