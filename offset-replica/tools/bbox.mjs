// node tools/bbox.mjs refs/sheet-1.png shots/hero.png -> ink bbox per named region, ref vs render, with deltas
import fs from 'node:fs'; import pngjs from 'pngjs'; const {PNG}=pngjs;
const [A,B]=process.argv.slice(2); const a=PNG.sync.read(fs.readFileSync(A)), b=PNG.sync.read(fs.readFileSync(B));
// [name, mode(d=dark sum<t | l=light min>t), t, x0,y0,x1,y1]
const R=[
 ['logo','d',250,40,38,270,82],['nav WORK','d',250,560,44,660,74],['nav SERVICES','d',250,680,44,800,74],['nav ABOUT','d',250,840,44,930,74],['nav CONTACT','d',250,970,44,1090,74],
 ['hamburger','d',250,1575,42,1626,74],
 ['rtag l1','d',480,1455,100,1600,117],['rtag l2','d',480,1455,121,1600,138],['rtag l3','d',480,1455,143,1600,160],
 ['ltag l1','d',330,60,206,330,224],['ltag l2','d',330,60,228,330,246],
 ['h1 l1 R','l',235,60,300,100,420],
 ['subtitle','l',240,60,522,720,570],
 ['btn1 text','d',300,75,610,250,650],['btn1 arrow','d',300,250,610,290,650],
 ['btn2 text','l',235,340,612,505,650],['btn2 arrow','l',235,510,612,545,650],
 ['trusted l1','l',225,60,762,430,782],['trusted l2','l',225,60,784,430,806],
 ['pager 01','l',225,1590,700,1626,740],['pager 03','l',225,1590,780,1626,806],
 ['time','l',225,98,872,195,900],['play','l',235,60,868,95,902],['mute','l',235,1510,868,1555,902],['full','l',235,1590,868,1626,902],
];
function bb(p,[n,m,t,x0,y0,x1,y1]){let mnx=1e9,mxx=-1,mny=1e9,mxy=-1;for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const i=(y*p.width+x)*4;const r=p.data[i],g=p.data[i+1],bl=p.data[i+2];const hit=m==='d'?(r+g+bl<t):(Math.min(r,g,bl)>t);if(hit){mnx=Math.min(mnx,x);mxx=Math.max(mxx,x);mny=Math.min(mny,y);mxy=Math.max(mxy,y);}}return mxx<0?null:[mnx,mny,mxx,mxy];}
for(const r of R){const u=bb(a,r),v=bb(b,r);const d=u&&v?v.map((q,i)=>q-u[i]):null;console.log(r[0].padEnd(13),'ref',JSON.stringify(u),'got',JSON.stringify(v),'d[x0,y0,x1,y1]',JSON.stringify(d));}
