/* weekly cover for "ai, in my opinion". same layout every edition; only the number, title, date and accent change.
   usage: node cover.mjs '{"n":"01","title":"order exactly what you want.","date":"oct 21, 2026","img":"/path/glass-0N.jpg","accent":"#e8457f","out":"/path/cover.png"}' */
import { chromium } from 'playwright';import fs from 'fs';
const o=JSON.parse(process.argv[2]);
const NM=process.env.FONTSOURCE||new URL('./node_modules/@fontsource',import.meta.url).pathname;
const f=p=>fs.readFileSync(NM+p).toString('base64');
const img=fs.readFileSync(o.img).toString('base64');const acc=o.accent||'#e8457f';
const blob=(x,y,w,h,r,rot,blur)=>`<i class="w" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${r};transform:rotate(${rot}deg);${blur?`filter:blur(${blur}px)`:''}"></i>`;
const html=`<html><head><style>
@font-face{font-family:G;font-weight:600;src:url(data:font/woff2;base64,${f('/geist-sans/files/geist-sans-latin-600-normal.woff2')})}
@font-face{font-family:G;font-weight:400;src:url(data:font/woff2;base64,${f('/geist-sans/files/geist-sans-latin-400-normal.woff2')})}
@font-face{font-family:M;font-weight:500;src:url(data:font/woff2;base64,${f('/geist-mono/files/geist-mono-latin-500-normal.woff2')})}
body{margin:0}
.c{position:relative;width:1536px;height:1024px;overflow:hidden;font-family:G;color:#121216;
  background:radial-gradient(40% 50% at 82% 18%,rgba(255,170,205,.32),transparent 70%),radial-gradient(40% 45% at 10% 92%,rgba(255,226,140,.32),transparent 70%),radial-gradient(35% 40% at 62% 100%,rgba(150,230,232,.30),transparent 70%),#fff}
/* liquid glass water shapes */
.w{position:absolute;background:radial-gradient(60% 50% at 30% 25%,rgba(255,255,255,.95),rgba(255,255,255,.15) 60%),linear-gradient(135deg,rgba(255,170,205,.22),rgba(242,203,77,.18) 35%,rgba(47,196,200,.22) 70%,rgba(143,155,255,.18));
  box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.9),inset 10px 14px 30px rgba(255,255,255,.7),inset -14px -18px 40px rgba(120,170,200,.18),0 30px 60px -30px rgba(18,18,22,.25)}
.w::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:2px;background:conic-gradient(from 120deg,rgba(255,111,163,.7),rgba(242,203,77,.6),rgba(47,196,200,.7),rgba(143,155,255,.6),rgba(255,111,163,.7));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.75}
.num{position:absolute;right:30px;top:120px;width:900px;height:600px;background:url(data:image/jpeg;base64,${img}) center/contain no-repeat;mix-blend-mode:multiply;
  -webkit-mask-image:radial-gradient(50% 50% at 50% 50%,#000 78%,transparent 100%)}
.mast{position:absolute;left:96px;top:84px;font:600 34px G;letter-spacing:-.03em}
.mast span{color:#5d5d66;font-weight:400}
.k{position:absolute;left:98px;top:600px;font:500 22px M;letter-spacing:.08em;color:#5d5d66;text-transform:lowercase}
.k b{color:${acc};font-weight:500}
h1{position:absolute;left:92px;top:640px;margin:0;width:880px;font-size:92px;line-height:.98;letter-spacing:-.055em;font-weight:600}
.foot{position:absolute;left:98px;bottom:70px;display:flex;gap:14px;font:500 20px M;color:#5d5d66}
.foot i{font-style:normal;padding:10px 18px;border-radius:99px;background:rgba(255,255,255,.75);box-shadow:inset 0 0 0 1px rgba(18,18,22,.1)}
</style></head><body><div class="c">
${blob(1180,640,300,220,'58% 42% 63% 37% / 46% 52% 48% 54%',-12)}${blob(1050,-60,220,170,'42% 58% 37% 63% / 55% 40% 60% 45%',18)}${blob(-70,250,210,150,'63% 37% 54% 46% / 45% 55% 45% 55%',8)}${blob(760,800,140,100,'50% 50% 42% 58% / 60% 44% 56% 40%',-20)}${blob(660,190,90,66,'55% 45% 50% 50%',0)}${blob(1400,420,110,80,'40% 60% 55% 45%',30)}
<div class="num"></div>
<div class="mast">ai, in my opinion <span>· by simi bharaj</span></div>
<div class="k"><b>edition ${o.n}</b> · ${o.date}</div>
<h1>${o.title}</h1>
<div class="foot"><i>interactive</i><i>6 bites · 4 min</i><i>a new one every tuesday</i></div>
</div></body></html>`;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});
const p=await b.newPage({viewport:{width:1536,height:1024}});await p.setContent(html);await p.waitForTimeout(300);
await p.screenshot({path:o.out});await b.close();
