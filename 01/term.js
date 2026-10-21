/* bite 4 terminal + bite 5 take-it-with-you.
   the reader types into a terminal (or taps a suggestion). every answer changes a live visual preview,
   so they can see what each part of the skill does. no forms. no live ai: the edition's render() is deterministic. */
(function(){
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const val=(v,x)=>typeof v==='function'?v(x):v;

function mount(root,ctx,T){
  const parts=T.parts,color=k=>(parts.find(p=>p.k===k)||{}).c||'#999';
  let vals={},step=0,lit=new Set(),done=false,first=null;
  const hl=(k,text)=>`<mark class="hl" style="--c:${color(k)}">${esc(text)}</mark>`;
  root.innerHTML=`${T.howto?`<div class="howto"><b>how to do it</b><ol>${T.howto.map(h=>`<li>${esc(h)}</li>`).join('')}</ol>${T.why?`<p>${esc(T.why)}</p>`:''}</div>`:''}<div class="tgrid">
    <div class="tpv" aria-live="polite"><div class="pv-top"><span>${esc(T.previewLabel||'preview')}</span><b>${parts.map(p=>`<i data-k="${p.k}" style="--c:${p.c}" title="${esc(p.short)}"></i>`).join('')}</b></div>
      <div class="tscreen ${esc(T.device||'')}"><div class="tview"></div></div><p class="tnote"></p></div>
    <div class="term" role="region" aria-label="terminal">
      <div class="term-top"><span class="lights"><i></i><i></i><i></i></span><span>${esc(T.title)}</span><button type="button" class="term-reset">start over</button></div>
      <ol class="rail">${parts.map((p,i)=>`<li data-k="${p.k}" style="--c:${p.c}"><span>${i+1}</span>${esc(p.short)}</li>`).join('')}</ol>
      <div class="log" aria-live="polite"></div>
      <div class="sugs" aria-label="suggestions"></div>
      <form class="tin" autocomplete="off"><span aria-hidden="true">›</span><input type="text" aria-label="type to the ai" placeholder="type here, or tap a suggestion"><button type="submit" aria-label="send">↵</button></form>
    </div></div>
    <div class="tdone" hidden></div>`;
  const $=s=>root.querySelector(s),log=$('.log'),input=$('.tin input'),view=$('.tview'),note=$('.tnote'),sugs=$('.sugs');

  function say(who,html){const d=document.createElement('div');d.className='ln '+who;d.innerHTML=`<b>${who==='ai'?'ai ›':'you ›'}</b><span>${html}</span>`;log.append(d);log.scrollTop=log.scrollHeight;}
  function paint(flash){view.innerHTML=T.render(vals,{hl,esc,step,done});
    root.querySelectorAll('.pv-top i').forEach(i=>i.classList.toggle('on',lit.has(i.dataset.k)));
    root.querySelectorAll('.rail li').forEach(li=>{li.classList.toggle('on',lit.has(li.dataset.k));li.classList.toggle('now',!done&&!!T.steps&&!!T.steps[step]&&T.steps[step].part===li.dataset.k);});
    if(flash&&!ctx.reduce){view.classList.remove('flash');void view.offsetWidth;view.classList.add('flash');}}
  /* open mode: a real back-and-forth. every message updates the result; the reader decides when it's done. */
  function chips(){sugs.innerHTML=(val(T.chips,vals)||[]).map(c=>`<button type="button">${esc(c)}</button>`).join('');}
  function openSubmit(text){text=text.trim();if(!text||done)return;say('you',esc(text));input.value='';
    if(T.isDone&&T.isDone(text,vals)&&vals.started){const r=T.finishSay?T.finishSay(vals):'';if(r)say('ai',esc(r));finish();return;}
    const res=T.update(text,vals)||{};if(!first&&vals.started)first=JSON.parse(JSON.stringify(vals));
    lit=new Set(T.lit(vals));note.textContent=res.note||'';paint(true);ctx.tone&&ctx.tone(res.changed?620:330,.4,.05);
    if(res.reply)setTimeout(()=>say('ai',esc(res.reply)),ctx.reduce?0:200);chips();
    /* bite 5 follows along live, so the note there always matches the drink here */
    if(vals.started){const p=T.prompt(vals);try{ctx.store&&ctx.store(ctx.key+'-p2',p);}catch(_){}window.dispatchEvent(new CustomEvent('aiimo:prompt',{detail:p}));}}
  function ask(){if(T.open){say('ai',esc(val(T.ai,vals)));chips();return;}const s=T.steps[step];say('ai',esc(val(s.ai,vals)));sugs.innerHTML=(val(s.chips,vals)||[]).map(c=>`<button type="button">${esc(c)}</button>`).join('');}
  function submit(text){text=text.trim();if(!text||done)return;say('you',esc(text));input.value='';
    const s=T.steps[step];const ok=s.check?s.check(text,vals):true;
    if(ok!==true){setTimeout(()=>say('ai',esc(ok)),ctx.reduce?0:250);ctx.tone&&ctx.tone(330,.3,.04);return;}
    s.save(text,vals);lit.add(s.part);if(T.lit)T.lit(vals).forEach(k=>lit.add(k));
    note.textContent=val(s.note,vals)||'';ctx.tone&&ctx.tone(520+step*60,.45,.05);
    if(step===0)first=JSON.parse(JSON.stringify(vals));
    step++;
    /* a real, detailed answer can cover later parts already. skip those steps and say so. */
    const skipped=[];while(step<T.steps.length&&T.steps[step].skip&&T.steps[step].skip(vals)){skipped.push(T.steps[step].part);lit.add(T.steps[step].part);step++;}
    paint(true);
    let reply=s.reply?val(s.reply,vals):'';
    if(skipped.length&&T.skipSay)reply=(reply?reply+' ':'')+T.skipSay(skipped.map(k=>(parts.find(p=>p.k===k)||{}).short||k),vals,step>=T.steps.length);
    if(reply)setTimeout(()=>say('ai',esc(reply)),ctx.reduce?0:200);
    if(step<T.steps.length)setTimeout(ask,ctx.reduce?0:(reply?500:250));else setTimeout(finish,ctx.reduce?0:(reply?400:0));}
  function finish(){done=true;sugs.innerHTML='';paint(false);const p=T.prompt(vals);
    try{ctx.store&&ctx.store(ctx.key+'-p2',p);}catch(_){}
    window.dispatchEvent(new CustomEvent('aiimo:prompt',{detail:p}));
    const d=$('.tdone');d.hidden=false;
    d.innerHTML=`<span class="tag" style="--accent:${parts[0].c}">your takeaway</span><h3>${esc(T.done.title)}</h3><p class="say">${esc(T.done.say)}</p>
      <div class="formula">${parts.map(x=>`<div style="--c:${x.c}"><b>${esc(x.short)}</b><span>${esc(x.why)}</span></div>`).join('')}</div>
      <div class="row"><button class="go" type="button" data-a="ba">see before and after</button><button class="go light2" type="button" data-a="take">take it with you ↓</button><button class="go light2" type="button" data-a="again">try my own idea</button></div>
      <div class="ba" hidden><div><small>your first ask</small><div class="tscreen ${esc(T.device||'')}"><div class="tview">${T.render(first||{},{hl,esc,step:1,done:false})}</div></div></div><div><small>after the skill</small><div class="tscreen ${esc(T.device||'')}"><div class="tview">${T.render(vals,{hl,esc,step,done:true})}</div></div></div></div>
      <p class="hint">${esc(T.done.rule)}</p>`;}
  function reset(){vals={};step=0;lit=new Set();done=false;first=null;log.innerHTML='';note.textContent=T.startNote||'';$('.tdone').hidden=true;paint(false);ask();}
  const go=t=>T.open?openSubmit(t):submit(t);
  if(T.placeholder)input.placeholder=T.placeholder;
  $('.tin').addEventListener('submit',e=>{e.preventDefault();go(input.value);});
  sugs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(b.textContent);});
  $('.term-reset').addEventListener('click',reset);
  $('.tdone').addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;
    if(b.dataset.a==='ba'){const ba=root.querySelector('.ba');ba.hidden=!ba.hidden;b.textContent=ba.hidden?'see before and after':'hide before and after';}
    if(b.dataset.a==='take')ctx.next&&ctx.next();
    if(b.dataset.a==='again'){reset();input.focus({preventScroll:true});}});
  reset();
}

/* bite 5: the prompt they just made, ready to open in a real ai */
function take(root,ctx,K){
  let p=null;try{p=ctx.store&&ctx.store(ctx.key+'-p2');}catch(_){}
  root.innerHTML=`<div class="take5"><div class="term"><div class="term-top"><span class="lights"><i></i><i></i><i></i></span><span>${esc(K.label)}</span><span class="t5state"></span></div><pre class="t5"></pre></div>
    <div class="row"><a class="go" data-app="claude" target="_blank" rel="noopener">open in claude ↗</a><a class="go light2" data-app="chatgpt" target="_blank" rel="noopener">open in chatgpt ↗</a><button class="go light2" type="button" data-a="copy">copy it</button></div>
    <p class="hint">${esc(K.hint)}</p></div>`;
  const pre=root.querySelector('.t5'),st=root.querySelector('.t5state');
  function set(text,mine){pre.textContent=text;st.textContent=mine?(K.mine||'yours, from bite 4'):'example · do bite 4 to make yours';
    root.querySelector('[data-app=claude]').href='https://claude.ai/new?q='+encodeURIComponent(text);
    root.querySelector('[data-app=chatgpt]').href='https://chatgpt.com/?q='+encodeURIComponent(text);}
  const btns=root.querySelector('.row');
  function empty(){pre.textContent=K.empty;st.textContent='waiting for bite 4';btns.hidden=true;
    if(!root.querySelector('.t5go')){const g=document.createElement('button');g.className='go t5go';g.type='button';g.textContent=K.emptyButton||'go to bite 4';g.onclick=()=>{const b=document.getElementById('b4');b&&b.scrollIntoView({behavior:'smooth'});};btns.after(g);}}
  function filled(text){const g=root.querySelector('.t5go');if(g)g.remove();btns.hidden=false;set(text,true);}
  if(K.fixed){set(K.example,false);st.textContent=K.state||'';}
  else if(K.empty){p?filled(p):empty();window.addEventListener('aiimo:prompt',e=>filled(e.detail));}
  else{set(p||K.example,!!p);window.addEventListener('aiimo:prompt',e=>set(e.detail,true));}
  root.querySelector('[data-a=copy]').addEventListener('click',e=>ctx.copy(pre.textContent,e.currentTarget,'copy it'));
}
window.AiimoTerm={mount,take};
})();
