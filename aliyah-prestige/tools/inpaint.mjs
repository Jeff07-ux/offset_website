import fs from 'node:fs'; import pngjs from 'pngjs';
export const { PNG } = pngjs;
export const rd = (f) => PNG.sync.read(fs.readFileSync(f));
export const save = (png, f) => fs.writeFileSync(f, PNG.sync.write(png));

// Erase overlaid text/UI: pixels brighter than their local median (within `boxes`) or anywhere in `forceBoxes` are refilled from neighbours.
export function inpaint(img, boxes, forceBoxes = [], r = 5, delta = 20) {
  const W = img.width, H = img.height;
  const L = new Float32Array(W*H); for (let p=0;p<W*H;p++) L[p]=0.299*img.data[p*4]+0.587*img.data[p*4+1]+0.114*img.data[p*4+2];
  const med=(x,y,rr)=>{const v=[];for(let j=-rr;j<=rr;j++)for(let i=-rr;i<=rr;i++){const xx=x+i,yy=y+j;if(xx>=0&&yy>=0&&xx<W&&yy<H)v.push(L[yy*W+xx]);}v.sort((a,b)=>a-b);return v[v.length>>1];};
  const inB=(b,x,y)=>x>=b[0]&&x<b[2]&&y>=b[1]&&y<b[3];
  let mask=new Uint8Array(W*H);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    if(forceBoxes.some(b=>inB(b,x,y))) mask[y*W+x]=1;
    else if(boxes.some(b=>inB(b,x,y)) && L[y*W+x]-med(x,y,r)>delta) mask[y*W+x]=1;
  }
  for(let k=0;k<2;k++){const m2=mask.slice();for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(mask[y*W+x])for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)m2[(y+j)*W+x+i]=1;mask=m2;}
  const known=new Uint8Array(W*H);let left=0;for(let p=0;p<W*H;p++){known[p]=mask[p]?0:1;left+=mask[p];}
  const out=new PNG({width:W,height:H});out.data=Buffer.from(img.data);
  for(let pass=0;pass<80&&left>0;pass++){const fill=[];
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=y*W+x;if(known[p])continue;let c=0,rr=0,g=0,b=0;
      for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const xx=x+i,yy=y+j;if(xx<0||yy<0||xx>=W||yy>=H)continue;const q=yy*W+xx;if(!known[q])continue;c++;rr+=out.data[q*4];g+=out.data[q*4+1];b+=out.data[q*4+2];}
      if(c>=3)fill.push([p,rr/c,g/c,b/c]);}
    for(const [p,rr,g,b] of fill){out.data[p*4]=rr;out.data[p*4+1]=g;out.data[p*4+2]=b;known[p]=1;left--;}}
  return out;
}
