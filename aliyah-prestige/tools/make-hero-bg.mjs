// Derive hero background from refs/home-hero.png by erasing overlaid text/UI (stopgap until real photo exists).
import fs from 'node:fs'; import pngjs from 'pngjs';
const { PNG } = pngjs;
const src = PNG.sync.read(fs.readFileSync('refs/home-hero.png'));
const W = src.width, H = src.height;
const boxes = [[78,4,216,50],[275,18,548,36],[704,10,800,43],[76,80,320,140],[76,160,448,225],[76,232,348,278],[76,290,186,320]]; // logo, nav, header btn, hero text block
const lum = (i) => (0.299*src.data[i] + 0.587*src.data[i+1] + 0.114*src.data[i+2]);
const L = new Float32Array(W*H); for (let p=0;p<W*H;p++) L[p]=lum(p*4);
const inBox = (x,y)=>boxes.some(([a,b,c,d])=>x>=a&&x<c&&y>=b&&y<d);
const med = (x,y,r)=>{const v=[];for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){const xx=x+i,yy=y+j;if(xx>=0&&yy>=0&&xx<W&&yy<H)v.push(L[yy*W+xx]);}v.sort((a,b)=>a-b);return v[v.length>>1];};
let mask = new Uint8Array(W*H);
for(let y=0;y<H;y++)for(let x=0;x<W;x++) if(inBox(x,y) && L[y*W+x]-med(x,y,4) > 22) mask[y*W+x]=1;
for(let k=0;k<2;k++){const m2=mask.slice();for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(mask[y*W+x])for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)m2[(y+j)*W+x+i]=1;mask=m2;}
const out = new PNG({width:W,height:H}); out.data = Buffer.from(src.data);
let left = mask.reduce((a,b)=>a+b,0), total=left;
const known = new Uint8Array(W*H); for(let p=0;p<W*H;p++) known[p]=mask[p]?0:1;
for(let pass=0; pass<40 && left>0; pass++){
  const fill=[];
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=y*W+x;if(known[p])continue;let n=0,r=0,g=0,b=0;
    for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const xx=x+i,yy=y+j;if(xx<0||yy<0||xx>=W||yy>=H)continue;const q=yy*W+xx;if(!known[q])continue;n++;r+=out.data[q*4];g+=out.data[q*4+1];b+=out.data[q*4+2];}
    if(n>=3)fill.push([p,r/n,g/n,b/n]);}
  for(const [p,r,g,b] of fill){out.data[p*4]=r;out.data[p*4+1]=g;out.data[p*4+2]=b;known[p]=1;left--;}
}
// crop to the section padding box: x 2..W-2, y 1..H
const cx=2,cy=1,cw=W-4,ch=H-1; const c=new PNG({width:cw,height:ch}); PNG.bitblt(out,c,cx,cy,cw,ch,0,0);
fs.writeFileSync('assets/hero-bg.png',PNG.sync.write(c));
console.log(`masked ${total}px, cropped ${cw}x${ch}`);
