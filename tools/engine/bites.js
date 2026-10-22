/* builds an edition's six bites from window.EDITION (sections + ui + lab + tool), then wires every interaction.
   *word* in ui strings becomes the accent-colored emphasis. */
(function(){
'use strict';
const E=window.EDITION,U=E.ui,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const em=s=>esc(s).replace(/\*([^*]+)\*/g,'<em>$1</em>');
const strip=s=>String(s||'').replace(/<\/?b>/g,'');
const store=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);return v;}catch(_){return null;}};
const copy=(text,btn,label)=>{const done=t=>{btn.textContent=t;setTimeout(()=>btn.textContent=label,1600);};try{navigator.clipboard.writeText(text).then(()=>done('copied'),()=>done('select and copy it instead'));}catch(_){done('select and copy it instead');}};
const S=Object.fromEntries(E.sections.map(s=>[s.type,s]));
const T=S.teardown,N=S.number,Q=S.quote,A=S.aside,O=S.signoff;
const src=list=>list&&list.length?`<div class="src reveal">${list.map(s=>`<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}</div>`:'';
const take=(t,label)=>`<div class="take reveal"><span class="sticker">${esc(label||'in my opinion')}</span><p>${esc(t)}</p></div>`;
const obj=(n,alt)=>`<div class="obj"><img src="assets/glass-${n}.jpg" alt="${esc(alt)}" width="512" height="512" loading="lazy"></div>`;
const KEY='aiimo-'+E.number;
/* the one pattern every bite repeats: a "your move" box says exactly what to tap, my take unlocks after, then a next button */
const move=(t,id)=>`<div class="move reveal"${id?` id="${id}"`:''}><b class="sticker">your move</b><span>${esc(t)}</span></div>`;
const nextb=(to,label)=>`<button class="nextb reveal" type="button" data-to="${to}">${esc(label)} <i aria-hidden="true">↓</i></button>`;
const gate=(id,inner)=>`<div class="gate" id="${id}" hidden>${inner}</div>`;

const R=Q.reception,guesses=R?(R.guesses||[Math.max(1,R.value-20),R.value,Math.min(99,R.value+20)]):[];
const b3inner=R?`${move(U.b3.move||'guess the number first. tap one.','m3')}<div class="poll guess reveal" id="guess">${guesses.map(g=>`<button type="button" data-g="${g}">${g}%</button>`).join('')}</div>
  <div class="meter reveal" id="meterBox" hidden><span class="num" id="meterNum">0%</span><div class="track"><b id="meterBar"></b></div><span class="hint">${esc(R.label)} · ${esc(R.note)}</span></div>`
  :Q.chips?`${move(U.b3.move||'tap each one.','m3')}<div class="scen reveal" id="chips3">${Q.chips.map((c,i)=>`<button type="button" data-i="${i}" aria-pressed="false">${esc(c.label)}</button>`).join('')}</div><p class="say reveal" id="chipText" hidden></p>`:'';

const html=`
<section class="bite cover" id="cover" style="--accent:var(--pink)">
  <p class="tag reveal">edition ${esc(E.number)} · ${esc(E.date)} · 6 bites · 4 min</p>
  <h1 class="mast reveal">ai, in my opinion</h1>
  <div class="obj reveal"><img src="assets/glass-0N.jpg" alt="the number ${esc(E.number)} in glass" width="1536" height="1024" fetchpriority="high"></div>
  <p class="sub reveal">${esc(U.cover.sub)}</p>
  <div class="row reveal" style="justify-content:center"><button class="go" type="button" id="start">start</button></div>
  <p class="howit reveal">6 short bites. each one has a <b>your move</b>. do it, then tap <b>next</b>.</p>
</section>
${(E.open||[]).length?`<section class="opennow" id="open" aria-label="open now">${E.open.map(o=>`<div class="oncard reveal"><span class="tag">${esc(o.tag)}</span><h3>${em(o.title)}</h3><p>${esc(o.say)}</p><div class="row"><a class="go" href="${esc(o.cta.href)}" target="_blank" rel="noopener">${esc(o.cta.label)} ↗</a>${(o.more||[]).map(m=>`<a class="go light2" href="${esc(m.href)}" target="_blank" rel="noopener">${esc(m.label)} ↗</a>`).join('')}</div></div>`).join('')}</section>`:''}

<section class="bite" id="b1" style="--accent:var(--pink)">${obj(1,'a pink glass number one')}
  <div class="copy"><span class="tag reveal">bite 1 · ${esc(U.b1.tag)}</span><h2 class="reveal">${em(U.b1.h2)}</h2>
  ${move(U.b1.move||U.b1.say||'tap each card to flip it.','m1')}
  <div class="cards reveal">${U.b1.cards.map(c=>`<button class="flip" type="button" aria-label="${esc(c.title)}. tap to flip"><div class="f"><small>${esc(c.small)}</small><strong>${esc(c.title)}</strong><span class="fliptag"><i aria-hidden="true">↻</i> tap to flip</span></div><div class="b"><small>${esc(c.small)}</small><p>${esc(c.back)}</p><span class="fliptag back"><i aria-hidden="true">↻</i> flip back</span></div></button>`).join('')}</div>
  ${gate('g1',take(T.take)+src(T.sources))}${nextb('b2','next: bite 2')}</div>
</section>

<section class="bite" id="b2" style="--accent:var(--butter)">${obj(2,'a yellow glass number two')}
  <div class="copy"><span class="tag reveal">bite 2 · ${esc(U.b2.tag)}</span><h2 class="reveal">${em(U.b2.h2)}</h2>
  <p class="say reveal">${esc(N.dek)}</p>
  ${N.quote?`<p class="quote reveal" style="font-size:clamp(20px,2.2vw,26px)">${esc(N.quote)}</p><span class="hint reveal">${esc(N.by)}</span>`:''}
  ${move(U.b2.move||(U.b2.ask+' tap one.'),'m2')}
  <div class="poll reveal" id="poll">${U.b2.poll.map(([v,l])=>`<button type="button" data-v="${esc(v)}" aria-pressed="false">${esc(l)}</button>`).join('')}</div>
  ${gate('pollTake',take(N.take)+src(N.sources))}${nextb('b3','next: bite 3')}</div>
</section>

<section class="bite" id="b3" style="--accent:var(--aqua)">${obj(3,'an aqua glass number three')}
  <div class="copy"><span class="tag reveal">bite 3 · ${esc(U.b3.tag)}</span><h2 class="reveal">${em(U.b3.h2)}</h2>
  ${b3inner}
  ${Q.quote?`<p class="quote reveal">${esc(Q.quote)}</p><span class="hint reveal">${esc(Q.by)}</span>`:''}
  <p class="say reveal">${esc(strip(Q.fact))}</p>${gate('g3',take(Q.take)+src(Q.sources))}${nextb('b4','next: bite 4')}</div>
</section>

<section class="bite lab" id="b4" style="--accent:var(--mint)">
  <div class="lab-head">${obj(4,'a mint glass number four')}<div class="copy"><span class="tag reveal">bite 4 · the skill</span><h2 class="reveal">${em(U.b4.h2)}</h2>
  <p class="say reveal">${esc(U.b4.say)}</p>${U.b4.steps?`<div class="move reveal"><b class="sticker">your move</b><ol class="steps3">${U.b4.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`:''}</div></div>
  <div id="lab" class="reveal"></div>${nextb('b5','next: bite 5')}
</section>

<section class="bite" id="b5" style="--accent:var(--peach)">${obj(5,'a peach glass number five')}
  <div class="copy"><span class="tag reveal">bite 5 · make it</span><h2 class="reveal">${em(U.b5.h2)}</h2>
  <p class="say reveal">${esc(U.b5.say)}</p>
  ${move(U.b5.move||'tap open in claude or chatgpt. then press send.','m5')}
  ${(E.take||(E.tool&&E.tool.kind==='builder'))?`<div id="tool" class="reveal"></div>`:`<div class="row reveal"><button class="go" type="button" id="openPlanner">open the planner</button><span class="hint" id="kept"></span></div>`}
  <p class="hint reveal">${esc(U.b5.hint)}</p>${nextb('b6','last bite')}</div>
</section>

<section class="bite" id="b6" style="--accent:var(--holo)">${obj(6,'a clear iridescent glass number six')}
  <div class="copy"><span class="tag reveal">bite 6 · simi, unprompted</span><h2 class="reveal">${esc(A.paragraphs[0])}</h2>
  ${A.paragraphs.slice(1).map(p=>`<p class="say reveal">${esc(p)}</p>`).join('')}
  <div class="bento reveal">
    ${move((U.b6&&U.b6.move)||"read the essay. then subscribe so next tuesday's edition finds you.",'m6')}
    ${A.essay?`<a class="tile essay" href="${esc(A.essay.href)}" target="_blank" rel="noopener"><span class="sticker">this week's essay</span><strong>${esc(A.essay.title||A.essay.label.replace(/^read the essay:\s*/i,''))}</strong><span class="by">by simi bharaj · on substack</span><span class="pill dark">read the essay ↗</span></a>`:''}
    <a class="tile sub" href="${esc(O.subscribe.href)}" target="_blank" rel="noopener"><span class="sticker">every tuesday</span><strong>${esc(O.subscribe.label)}</strong><span class="pill dark">subscribe ↗</span></a>
    <button class="tile share" type="button" id="share"><span class="sticker">send it on</span><strong>share this edition</strong><span class="pill">copy link</span></button>
    ${Object.entries(O.card.links).map(([k,h])=>{const t=h.replace(/\/$/,'').split('/').pop();const handle={instagram:'@'+t,linkedin:'simi bharaj',github:t,substack:'aiimo'}[k]||'';return `<a class="tile soc" href="${esc(h)}" target="_blank" rel="noopener"><b>${esc(k)}</b><span>${esc(handle)}</span></a>`;}).join('')}
  </div>
  <p class="hint reveal">${esc(O.closing)}</p></div>
</section>`;
$('#bites').innerHTML=html;
const bites=$$('.bite');

/* progress segments, arrival reveals, gentle parallax */
const segs=$('#segs');segs.innerHTML=bites.slice(1).map(()=>'<i><b></b></i>').join('');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');}}),{threshold:.25});bites.forEach(b=>io.observe(b));
function onScroll(){const vh=innerHeight;bites.slice(1).forEach((b,i)=>{const r=b.getBoundingClientRect();const p=Math.max(0,Math.min(1,(vh-r.top)/(r.height)));segs.children[i].firstChild.style.width=(p*100)+'%';});
  if(!reduce)bites.forEach(b=>{const r=b.getBoundingClientRect();const p=Math.max(-1,Math.min(1,(r.top+r.height/2-vh/2)/vh));const im=b.querySelector('.obj img');if(im)im.style.setProperty('--p',p.toFixed(3));});}
addEventListener('scroll',()=>requestAnimationFrame(onScroll),{passive:true});onScroll();
$('#start').addEventListener('click',()=>{$('#b1').scrollIntoView({behavior:reduce?'auto':'smooth'});});

/* bite 1 flips, bite 2 vote, bite 3 meter or label chips */
const setMove=(id,text,done)=>{const m=$('#'+id);if(!m)return;m.querySelector('span').textContent=text;m.classList.toggle('done',!!done);};
const unlock=id=>{const g=$('#'+id);if(g&&g.hidden){g.hidden=false;}};
$$('.nextb').forEach(b=>b.addEventListener('click',()=>{const t=$('#'+b.dataset.to);t&&t.scrollIntoView({behavior:reduce?'auto':'smooth'});}));
const flips=$$('.flip'),flipped=new Set();
flips.forEach((f,i)=>f.addEventListener('click',()=>{f.classList.toggle('on');flipped.add(i);$('#b1').classList.add('touched');tone(660,.4,.05);
  unlock('g1');}));
const poll=$('#poll');function vote(v){poll.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));$('#pollTake').hidden=false;}
poll.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;store(KEY+'-vote',b.dataset.v);vote(b.dataset.v);tone(784,.5,.05);});
const saved=store(KEY+'-vote');if(saved)vote(saved);
const gs=$('#guess');if(gs)gs.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||metered)return;const v=R.value,gv=+b.dataset.g;
  gs.querySelectorAll('button').forEach(x=>{x.classList.add(+x.dataset.g===v?'right':'wrong');x.disabled=true;});b.setAttribute('aria-pressed','true');
  $('#meterBox').hidden=false;meter();unlock('g3');tone(784,.5,.05);});
let metered=false;function meter(){if(metered||!Q.reception)return;metered=true;const v=Q.reception.value;$('#meterBar').style.width=v+'%';if(reduce){$('#meterNum').textContent=v+'%';return;}let t0=null;const step=t=>{t0=t0||t;const k=Math.min(1,(t-t0)/1400);$('#meterNum').textContent=Math.round(v*k*(2-k))+'%';if(k<1)requestAnimationFrame(step);};requestAnimationFrame(step);}
const c3=$('#chips3');if(c3)c3.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;c3.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));b.classList.add('seen');
  const t=$('#chipText');t.hidden=false;t.textContent=Q.chips[+b.dataset.i].text;tone(600,.4,.05);
  unlock('g3');});

/* bite 4 the lab, bite 5 the tool */
const sheet=$('#sheet');let studio=null;
function openPlanner(){if(!sheet||!window.AiimoStudio)return;sheet.classList.add('open');document.body.style.overflow='hidden';if(!studio)studio=window.AiimoStudio.mount($('#studio'),{store,copy,reduce});$('#closeSheet').focus();}
function closePlanner(){sheet.classList.remove('open');document.body.style.overflow='';$('#openPlanner')&&$('#openPlanner').focus();}
const toB5=()=>{$('#b5').scrollIntoView({behavior:reduce?'auto':'smooth'});};
if(E.term&&window.AiimoTerm)window.AiimoTerm.mount($('#lab'),{copy,reduce,store,key:KEY,tone:(f,d,v)=>tone(f,d,v),next:toB5},E.term);
else window.AiimoLab.mount($('#lab'),{copy,reduce,tone:(f,d,v)=>tone(f,d,v),extra:toB5},E.lab);
if(E.take&&window.AiimoTerm){window.AiimoTerm.take($('#tool'),{copy,store,key:KEY},E.take);
  if(E.take.empty&&!store(KEY+'-p2'))setMove('m5','do bite 4 first. your message shows up here when you do.');
  addEventListener('aiimo:prompt',()=>setMove('m5',U.b5.move||'tap open in claude or chatgpt. then press send.'));}else
if(E.tool&&E.tool.kind==='builder')window.AiimoBuilder.mount($('#tool'),{copy,reduce,store,key:KEY},E.tool);
else if($('#openPlanner')){$('#openPlanner').addEventListener('click',openPlanner);$('#closeSheet').addEventListener('click',closePlanner);addEventListener('keydown',e=>{if(e.key==='Escape'&&sheet.classList.contains('open'))closePlanner();});}

/* bite 6 share */
$('#share').addEventListener('click',e=>{const el=e.currentTarget.querySelector('.pill')||e.currentTarget;copy('ai, in my opinion · edition '+E.number+'. food for thought, in bites. '+location.href.split('#')[0],el,'copy link');});

/* sound: optional soft pad plus small chimes */
let ac=null,g=null,on=false;
function tone(f,d,v){if(!ac||!on)return;const t=ac.currentTime,o=ac.createOscillator(),k=ac.createGain();o.frequency.value=f;k.gain.setValueAtTime(0,t);k.gain.linearRampToValueAtTime(v,t+.01);k.gain.exponentialRampToValueAtTime(.0005,t+d);o.connect(k);k.connect(ac.destination);o.start(t);o.stop(t+d+.05);}
$('#sound').addEventListener('click',async e=>{const btn=e.currentTarget;try{if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();g=ac.createGain();g.gain.value=0;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=600;lp.connect(g);g.connect(ac.destination);[130.81,196,261.63,329.63].forEach(fq=>{const o=ac.createOscillator(),l=ac.createGain();o.frequency.value=fq;l.gain.value=.05;o.connect(l);l.connect(lp);o.start();});}
  await ac.resume();on=!on;g.gain.setTargetAtTime(on?.12:0,ac.currentTime,.5);btn.setAttribute('aria-pressed',on);btn.textContent=on?'sound on · tap to mute':'turn sound on';}catch(_){btn.textContent='no sound here';}});
document.addEventListener('visibilitychange',()=>{if(ac&&on)(document.hidden?ac.suspend():ac.resume()).catch(()=>{});});
})();
