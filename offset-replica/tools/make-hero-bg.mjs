// Derive hero background from refs/sheet-1.png by erasing overlaid text/UI (stopgap until the real photo/video exists).
// hp  = erase only pixels that differ from the local median (thin text/lines)
// full = erase the whole box (solid shapes: buttons, icons)
import fs from 'node:fs'; import pngjs from 'pngjs';
const { PNG } = pngjs;
const src = PNG.sync.read(fs.readFileSync('refs/sheet-1.png'));
const W = src.width, H = src.height;
const boxes = [
  ['hp',48,36,268,82,4],       // logo
  ['hp',565,44,1085,74,4],     // nav
  ['hp',1575,42,1626,74,4],    // hamburger
  ['hp',1452,96,1626,162,4],   // right tag + rule
  ['hp',58,204,325,248,4],     // left tag
  ['wt',58,306,775,522,205],     // headline
  ['wt',58,522,700,568,215],     // subtitle
  ['full',62,597,306,661,0],   // button 1
  ['wt',332,604,555,655,215],    // button 2 text
  ['hp',322,597,565,606,4],['hp',322,652,565,661,4],['hp',322,597,334,661,4],['hp',551,597,565,661,4], // button 2 outline
  ['hp',1596,660,1622,806,3],  // pager
  ['wt',58,760,425,806,205],     // trusted by
  ['full',60,868,90,902,0],    // play icon
  ['wt',100,868,190,902,215],    // time
  ['hp',200,878,1480,892,4],   // progress bar
  ['full',1512,868,1552,902,0],// mute
  ['full',1590,868,1626,902,0],// fullscreen
];
const L = new Float32Array(W*H);
for (let p=0;p<W*H;p++) L[p]=0.299*src.data[p*4]+0.587*src.data[p*4+1]+0.114*src.data[p*4+2];
const med=(x,y,r)=>{const v=[];for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){const xx=x+i,yy=y+j;if(xx>=0&&yy>=0&&xx<W&&yy<H)v.push(L[yy*W+xx]);}v.sort((a,b)=>a-b);return v[v.length>>1];};
let mask=new Uint8Array(W*H);
for(const [t,x0,y0,x1,y1,r] of boxes){
  for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){
    if(t==='full') mask[y*W+x]=1;
    else if(t==='wt'){const i=(y*W+x)*4;if(Math.min(src.data[i],src.data[i+1],src.data[i+2])>=r)mask[y*W+x]=1;}
    else if(Math.abs(L[y*W+x]-med(x,y,r))>16) mask[y*W+x]=1;
  }
}
for(let k=0;k<4;k++){const m2=mask.slice();for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(mask[y*W+x])for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)m2[(y+j)*W+x+i]=1;mask=m2;}
const out=new PNG({width:W,height:H}); out.data=Buffer.from(src.data);
const known=new Uint8Array(W*H); let left=0; for(let p=0;p<W*H;p++){known[p]=mask[p]?0:1; left+=mask[p];}
const total=left;
for(let pass=0;pass<80&&left>0;pass++){
  const fill=[];
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=y*W+x;if(known[p])continue;let n=0,r=0,g=0,b=0;
    for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const xx=x+i,yy=y+j;if(xx<0||yy<0||xx>=W||yy>=H)continue;const q=yy*W+xx;if(!known[q])continue;n++;r+=out.data[q*4];g+=out.data[q*4+1];b+=out.data[q*4+2];}
    if(n>=3)fill.push([p,r/n,g/n,b/n]);}
  for(const [p,r,g,b] of fill){out.data[p*4]=r;out.data[p*4+1]=g;out.data[p*4+2]=b;known[p]=1;left--;}
}
fs.mkdirSync('assets',{recursive:true});
fs.writeFileSync('assets/hero-bg.png',PNG.sync.write(out));
console.log(`masked ${total}px, ${W}x${H}, unfilled ${left}`);
