// node tools/regions.mjs diffs/hero.diff.png -> red-pixel count per named box (share of total mismatch)
import fs from 'node:fs'; import pngjs from 'pngjs'; const {PNG}=pngjs;
const d=PNG.sync.read(fs.readFileSync(process.argv[2]));
const B={logo:[40,38,270,82],nav:[565,44,1085,74],burger:[1575,42,1626,74],rtag:[1452,96,1626,162],ltag:[58,204,325,248],h1:[58,306,775,520],sub:[58,520,700,568],btns:[58,595,570,662],trusted:[58,760,425,806],pager:[1592,660,1626,806],video:[58,868,1626,902]};
let tot=0;const c={};for(let y=0;y<d.height;y++)for(let x=0;x<d.width;x++){const i=(y*d.width+x)*4;if(d.data[i]===255&&d.data[i+1]===0&&d.data[i+2]===0){tot++;for(const k in B){const[a,b,e,f]=B[k];if(x>=a&&x<e&&y>=b&&y<f){c[k]=(c[k]||0)+1;break;}}}}
const sum=Object.values(c).reduce((a,b)=>a+b,0);
for(const k in c)console.log(k.padEnd(8),String(c[k]).padStart(6),(c[k]/tot*100).toFixed(1)+'%');console.log('other'.padEnd(8),String(tot-sum).padStart(6),((tot-sum)/tot*100).toFixed(1)+'%');console.log('total',tot);
