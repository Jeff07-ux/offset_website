// Derive service card photos from refs/services-section.png with number+label erased (stopgap until real photos exist).
import fs from 'node:fs'; import pngjs from 'pngjs';
const { PNG } = pngjs;
const src = PNG.sync.read(fs.readFileSync('refs/services-section.png'));
const W = src.width;
const xs = [[23,167],[178,327],[337,485],[495,641],[652,796]];
const ys = [[100,255],[268,422]];
fs.mkdirSync('assets', { recursive: true });
let n = 0;
for (const [y0,y1] of ys) for (const [x0,x1] of xs) {
  n++; const w=x1-x0+1, h=y1-y0+1;
  const card = new PNG({width:w,height:h}); PNG.bitblt(src,card,x0,y0,w,h,0,0);
  const L = new Float32Array(w*h); for(let p=0;p<w*h;p++) L[p]=0.299*card.data[p*4]+0.587*card.data[p*4+1]+0.114*card.data[p*4+2];
  const med=(x,y,r)=>{const v=[];for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){const xx=x+i,yy=y+j;if(xx>=0&&yy>=0&&xx<w&&yy<h)v.push(L[yy*w+xx]);}v.sort((a,b)=>a-b);return v[v.length>>1];};
  let mask=new Uint8Array(w*h);
  for(let y=100;y<h-8;y++)for(let x=8;x<w-6;x++) if(L[y*w+x]-med(x,y,4)>20) mask[y*w+x]=1;
  for(let k=0;k<2;k++){const m2=mask.slice();for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++)if(mask[y*w+x])for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)m2[(y+j)*w+x+i]=1;mask=m2;}
  const known=new Uint8Array(w*h);let left=0;for(let p=0;p<w*h;p++){known[p]=mask[p]?0:1;left+=mask[p];}
  for(let pass=0;pass<40&&left>0;pass++){const fill=[];
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){const p=y*w+x;if(known[p])continue;let c=0,r=0,g=0,b=0;
      for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const xx=x+i,yy=y+j;if(xx<0||yy<0||xx>=w||yy>=h)continue;const q=yy*w+xx;if(!known[q])continue;c++;r+=card.data[q*4];g+=card.data[q*4+1];b+=card.data[q*4+2];}
      if(c>=3)fill.push([p,r/c,g/c,b/c]);}
    for(const [p,r,g,b] of fill){card.data[p*4]=r;card.data[p*4+1]=g;card.data[p*4+2]=b;known[p]=1;left--;}}
  fs.writeFileSync(`assets/service-${String(n).padStart(2,'0')}.png`,PNG.sync.write(card));
}
console.log('done', n);
