/* the prompt lab, data-driven: each edition supplies its own steps, scenarios and takeaway in EDITION.lab.
   guided one step at a time, an example for every step, a live preview after each step, a note on what changed, a takeaway card. */
(function(){
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function mount(root,ctx,L){
  const PARTS=L.parts,COLOR=Object.fromEntries(PARTS.map(p=>[p.k,p.c])),SCEN=L.scenarios,keys=Object.keys(SCEN);
  let scen=keys[0],vals={},cur=0,last='none';
  const reset=()=>{vals=Object.fromEntries(PARTS.map(p=>[p.k,'']));cur=0;last='none';};reset();
  root.innerHTML=`<div class="lab-grid"><div class="steps-col"><div class="scen" role="group" aria-label="pick a task to practice on">${keys.map(k=>`<button type="button" data-s="${k}" aria-pressed="${k===scen}">${esc(SCEN[k].label)}</button>`).join('')}</div><div class="steps" id="steps"></div></div>
    <div class="preview" aria-live="polite"><div class="pv-top"><span>preview · what ai gives you back</span><b>${PARTS.map(p=>`<i data-k="${p.k}" style="--c:${p.c}"></i>`).join('')}</b></div><div class="pv-body"></div><div class="pv-note"></div></div></div>
    <div class="takeaway" hidden><span class="tag" style="--accent:${PARTS[0].c}">your takeaway</span><h3>${esc(L.takeaway.title)}</h3><p class="say">${esc(L.takeaway.say)}</p>
      <div class="formula">${PARTS.map(p=>`<div style="--c:${p.c}"><b>${esc(p.short||p.k)}</b><span>${esc(p.why.split('.')[0])}.</span></div>`).join('')}</div>
      <div class="row"><button class="go" type="button" data-act="copy">copy my prompt</button><button class="go light2" type="button" data-act="again">try another task</button>${L.takeaway.extra?`<button class="go light2" type="button" data-act="extra">${esc(L.takeaway.extra)}</button>`:''}</div>
      <p class="hint">${esc(L.takeaway.hint)}</p></div>`;
  const steps=root.querySelector('#steps'),take=root.querySelector('.takeaway');
  function renderSteps(){
    const ex=SCEN[scen].ex;
    steps.innerHTML=PARTS.map((p,i)=>`<div class="step ${i===cur?'cur':i<cur?'done fold':'fold'}" style="--c:${p.c}" data-i="${i}"><header><span class="dot">${vals[p.k]&&i<cur?'✓':i+1}</span><h3>${esc(p.title)}</h3></header>
      <p class="why">${esc(p.why)}</p><textarea aria-label="${esc(p.title)}" placeholder="${esc(ex[p.k])}">${esc(vals[p.k])}</textarea>
      <div class="acts"><button type="button" class="mini" data-ex="${i}">use the example</button><button type="button" class="mini pri" data-next="${i}">${i<PARTS.length-1?'next step':'see my takeaway'}</button></div></div>`).join('');
    steps.querySelectorAll('textarea').forEach((t,i)=>t.addEventListener('input',()=>{vals[PARTS[i].k]=t.value.trim();last=PARTS[i].k;preview();}));
  }
  steps.addEventListener('click',e=>{const exb=e.target.closest('[data-ex]'),nx=e.target.closest('[data-next]'),st=e.target.closest('.step.fold');
    if(exb){const i=+exb.dataset.ex,p=PARTS[i];vals[p.k]=SCEN[scen].ex[p.k];last=p.k;exb.closest('.step').querySelector('textarea').value=vals[p.k];preview();ctx.tone&&ctx.tone(520+i*90,.5,.05);return;}
    if(nx){const i=+nx.dataset.next;if(!vals[PARTS[i].k]){const t=nx.closest('.step').querySelector('textarea');t.focus();t.placeholder='try: '+SCEN[scen].ex[PARTS[i].k];return;}
      if(i<PARTS.length-1){cur=i+1;renderSteps();steps.querySelector('.step.cur textarea').focus({preventScroll:true});}else{cur=PARTS.length;renderSteps();finish();}return;}
    if(st&&!e.target.closest('textarea')){cur=+st.dataset.i;renderSteps();}
  });
  root.querySelector('.scen').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;scen=b.dataset.s;reset();
    root.querySelectorAll('.scen button').forEach(x=>x.setAttribute('aria-pressed',x===b));take.hidden=true;renderSteps();preview();});
  function prompt(){return PARTS.filter(p=>vals[p.k]).map(p=>vals[p.k]).join('\n');}
  function preview(){
    const f=Object.fromEntries(PARTS.map(p=>[p.k,!!vals[p.k]]));
    root.querySelectorAll('.pv-top i').forEach(i=>i.classList.toggle('on',f[i.dataset.k]));
    const body=root.querySelector('.pv-body');body.textContent='';
    const you=document.createElement('div');you.className='pv-you';
    const have=PARTS.filter(p=>vals[p.k]);
    if(have.length)have.forEach(p=>{const s=document.createElement('span');s.textContent=vals[p.k]+' ';s.style.background=p.c+'33';you.append(s);});else you.textContent='…';
    body.append(you);
    const a=SCEN[scen].answer(f),ai=document.createElement('div');ai.className='pv-ai';
    const mk=(txt,src)=>{const s=document.createElement('span');s.textContent=txt;if(src&&COLOR[src]){s.className='mark';s.style.background=COLOR[src]+'38';s.style.setProperty('--c',COLOR[src]);if(src===L.problemKey)s.style.textDecoration='line-through';}return s;};
    if(a.kind==='ask')ai.textContent=a.text;
    else if(a.kind==='list'){const ul=document.createElement('ul');a.lines.forEach(([t,x,src])=>{const li=document.createElement('li');const b=document.createElement('b');b.textContent=t;li.append(b,mk(x,src));ul.append(li);});ai.append(ul);}
    else if(a.kind==='para'){a.parts.forEach(([t,src])=>ai.append(mk(t,src)));if(a.meta){const w=document.createElement('div');w.className='hint';w.style.marginTop='8px';w.textContent=a.meta;ai.append(w);}}
    else{const p=document.createElement('p');p.textContent=L.ownText||'a real ai would now answer this. your prompt has '+have.length+' of '+PARTS.length+' parts.';ai.append(p);
      const miss=PARTS.filter(x=>!f[x.k]).map(x=>x.short||x.k);if(miss.length){const m=document.createElement('p');m.className='hint';m.style.marginTop='6px';m.textContent='still missing: '+miss.join(', ')+'.';ai.append(m);}}
    body.append(ai);
    root.querySelector('.pv-note').textContent=(SCEN[scen].own&&last!=='none')?(L.ownNote||'each color is one part of your prompt.'):(L.notes[last]||L.notes.none);
  }
  function finish(){take.hidden=false;const x=take.querySelector('[data-act="extra"]');if(x)x.hidden=!(SCEN[scen].extra);take.scrollIntoView({behavior:ctx.reduce?'auto':'smooth',block:'nearest'});}
  take.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;
    if(b.dataset.act==='copy')ctx.copy(prompt(),b,'copy my prompt');
    if(b.dataset.act==='again'){const nxt=keys[(keys.indexOf(scen)+1)%keys.length];root.querySelector(`.scen [data-s="${nxt}"]`).click();root.querySelector('.scen').scrollIntoView({behavior:ctx.reduce?'auto':'smooth',block:'center'});}
    if(b.dataset.act==='extra'&&ctx.extra)ctx.extra();});
  renderSteps();preview();
}
window.AiimoLab={mount};
})();
