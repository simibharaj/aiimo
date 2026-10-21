/* bite 5 builder: a small, honest tool. fill a few fields (or tap a preset) and get a reusable prompt you can copy or download.
   no live ai. it assembles exactly what you give it, using the shape taught in the lab. */
(function(){
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function mount(root,ctx,C){
  const vals=Object.fromEntries(C.fields.map(f=>[f.k,'']));
  try{const d=JSON.parse(ctx.store(ctx.key+'-builder')||'null');if(d)Object.assign(vals,d);}catch(_){}
  root.innerHTML=`<div class="builder">
    ${C.presets?`<div class="scen" role="group" aria-label="start from an example">${C.presets.map((p,i)=>`<button type="button" data-p="${i}" aria-pressed="false">${esc(p.label)}</button>`).join('')}</div>`:''}
    <div class="b-fields">${C.fields.map(f=>`<label class="b-field"><span>${esc(f.label)}</span><textarea data-k="${f.k}" rows="2" placeholder="${esc(f.placeholder)}">${esc(vals[f.k])}</textarea></label>`).join('')}</div>
    <div class="b-out"><div class="pv-top"><span>${esc(C.outTitle)}</span><span id="bCount"></span></div><pre id="bOut"></pre></div>
    <div class="row"><button class="go" type="button" data-a="copy">copy it</button><button class="go light2" type="button" data-a="dl">download .txt</button><button class="go light2" type="button" data-a="clear">clear</button></div>
    <p class="hint" id="bNote">${esc(C.note)}</p></div>`;
  const out=root.querySelector('#bOut');
  function render(){const text=C.compose(vals);out.textContent=text;root.querySelector('#bCount').textContent=C.fields.filter(f=>vals[f.k]).length+' of '+C.fields.length+' filled';try{ctx.store(ctx.key+'-builder',JSON.stringify(vals));}catch(_){}}
  root.querySelectorAll('textarea').forEach(t=>t.addEventListener('input',()=>{vals[t.dataset.k]=t.value.trim();render();}));
  if(C.presets)root.querySelector('.scen').addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b)return;const p=C.presets[+b.dataset.p];root.querySelectorAll('.scen button').forEach(x=>x.setAttribute('aria-pressed',x===b));
    C.fields.forEach(f=>{vals[f.k]=p.vals[f.k]||'';root.querySelector(`textarea[data-k="${f.k}"]`).value=vals[f.k];});render();});
  root.querySelector('.row').addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;
    if(b.dataset.a==='copy')ctx.copy(out.textContent,b,'copy it');
    if(b.dataset.a==='dl'){try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([out.textContent],{type:'text/plain'}));a.download=C.filename;document.body.append(a);a.click();a.remove();root.querySelector('#bNote').textContent='download started. if nothing happened, use copy instead.';}catch(_){root.querySelector('#bNote').textContent='downloads are blocked here. use copy instead.';}}
    if(b.dataset.a==='clear'){C.fields.forEach(f=>{vals[f.k]='';root.querySelector(`textarea[data-k="${f.k}"]`).value='';});render();}});
  render();
}
window.AiimoBuilder={mount};
})();
