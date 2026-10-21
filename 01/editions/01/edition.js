/* edition 01 · launch. bite 4 and 5 build on simi's essay "i trained a human. then i wrote the playbook for an ai." (the coffee order). news checked oct 20, 2026. */
window.EDITION={
  number:'01',
  date:'october 2026',
  /* open now: verified oct 20, 2026 on anthropic's greenhouse posting. remove after oct 28. */
  open:[{tag:'open now · apply by oct 28',
    title:'anthropic is hiring *conceptual reasoning fellows.*',
    say:"four months inside anthropic, jan 12 to may 8, 2027. you bring expertise where answers take judgment: philosophy, cognitive science, economics, policy or law. you help claude reason through it. $117k to $167k for the four months. you need daily hands-on use of claude and claude code, plus a phd or equivalent research experience. there's a stem track too.",
    cta:{label:'apply by oct 28',href:'https://job-boards.greenhouse.io/anthropic/jobs/5447080008'},
    more:[{label:'all anthropic fellowships',href:'https://www.anthropic.com/careers/jobs?team=4002065008'}]}],
  ui:{
    cover:{sub:"food for thought, in bites. this week: order exactly what you want."},
    b1:{tag:'the build',h2:'ai review found so many bugs, postgres *pushed its release.*',say:'two cards. tap each one.',
      cards:[{small:'what they show you',title:'ai found the bugs',back:"postgresql 19 was due around early october. llm-assisted code review turned up so many defects that it's now expected around november 19."},
             {small:'what actually changed',title:'the bar moved',back:'eight to 10 features got pulled and pushed to postgresql 20. a committer said the quality bar was raised after the code was written. it is not a vibe coding problem. most of it was written before that existed.'}]},
    b2:{tag:'the number',h2:'uber cut its ai token costs by *about 50%.*',ask:'does your job give you an ai budget?',poll:[['yes','yes. there is a budget'],['no',"no. i'm paying for it"]]},
    b3:{tag:'the culture',h2:'is ai a tool, or is it *doing the work for you?*'},
    b4:{h2:'order exactly what you want. *goal, context, limits, format.*',say:'type into the terminal, or tap a suggestion. watch your drink change with every detail you add.'},
    b5:{h2:'make it *remember* your order.',say:"a saved coffee order got me a 45 minute meeting. ai should work the same way. this turns your order from bite 4 into a note you save once, so the next chat already knows you.",hint:'in claude or chatgpt, paste it and say "remember this." works for anything you repeat: your tone, your clients, your usual.'}
  },
  sections:[
    {type:'teardown',
     take:"ai review didn't break postgres. it raised the bar on code written before the bar existed. deciding what good enough means is the job now.",
     sources:[{label:'the register · oct 16',href:'https://www.theregister.com/databases/2026/10/16/postgres-19-delayed-after-ai-reviewers-find-more-bugs-than-humans-can-fix/5303471'}]},
    {type:'number',
     dek:"every uber engineer gets a monthly ai spend tier. hit it and a manager can approve more. they can switch between claude code, codex and opencode without losing their settings. ci jobs more than doubled in a year.",
     quote:'"uber has reduced token costs by about 50% the last few months."',by:'the pragmatic engineer · oct 14',
     take:"the smart companies aren't picking one model. they're building the switch. knowing which tool fits the job is translator work.",
     sources:[{label:'the pragmatic engineer',href:'https://newsletter.pragmaticengineer.com/p/ubers-ai-infra-from-the-inside'}]},
    {type:'quote',
     chipsAsk:'tap a side',
     chips:[{label:"hickey's take",text:"rich hickey argues llms are automation, not tools. you can't really wield them, and outsourcing the work costs you the learning."},
            {label:'the reply',text:'huahai answers that using an llm well takes skill, feedback and judgment, like any tool. his line: the real split is skilled use versus delegating work you don\'t understand.'},
            {label:'the crowd',text:'on hacker news, the reply got 803 points. the original got 318.'}],
     quote:'"a tool does not stop being a tool because it is difficult to control or easy to misuse."',by:'huahai · yyhh.org · oct 12',
     fact:"both sides agree on one thing: if you can't say what you want, you're not using it. you're hoping.",
     take:"you don't need to pick a side. you need to be specific. that's bite 4.",
     sources:[{label:'rich hickey · linkedin',href:'https://www.linkedin.com/pulse/ai-tool-rich-hickey-kjl8e'},{label:'huahai · reply',href:'https://yyhh.org/blog/2026/10/ai-is-a-tool/'},{label:'vibe coding weekly',href:'https://vibecodingweekly.substack.com/p/vibe-coding-weekly-53'}]},
    {type:'aside',
     paragraphs:['silicon valley wants ai that sounds human. i want ai that remembers the exact coffee order.'],
     essay:{label:'read the essay: i trained a human. then i wrote the playbook for an ai.',href:'https://aiimo.substack.com/p/i-trained-a-human-then-i-wrote-the'},
     sig:'simi'},
    {type:'signoff',
     lede:'i build with ai every day and tell you exactly what i think of it. brilliant gets called brilliant. overhyped gets called out.',
     card:{name:'simi bharaj',handle:'@_simisim',links:{instagram:'https://www.instagram.com/_simisim/',linkedin:'https://www.linkedin.com/in/simibharaj',github:'https://github.com/simibharaj',substack:'https://aiimo.substack.com'}},
     subscribe:{label:'get the next edition',href:'https://aiimo.substack.com/subscribe'},
     dm:{label:'dm me your order',href:'https://ig.me/m/_simisim'},
     closing:'next edition drops next tuesday.'}
  ]
};

/* bite 4: the coffee terminal. goal, context, limits, format. the cup changes with every detail. */
(function(E){
const DRINKS=[[/chai/,'chai latte','#c8915f'],[/matcha/,'matcha latte','#9cc27a'],[/cold brew/,'cold brew','#3d2618'],[/americano/,'americano','#4a2d1b'],[/espresso/,'espresso','#3a2214'],[/mocha/,'mocha','#5b3524'],[/latte|cappuccino|flat white/,'latte','#b98a62'],[/tea/,'tea','#b77a2e'],[/coffee/,'drip coffee','#4b2e1d']];
const MILK={soy:'#efe2c9',oat:'#e9d8b4',almond:'#efe4d2',coconut:'#f6f1e7',whole:'#fbf6ee',skim:'#f4f2ee','2%':'#f8f3ea','two percent':'#f8f3ea',nonfat:'#f4f2ee'};
const lc=t=>t.toLowerCase();
function goal(t){t=lc(t);const d=DRINKS.find(x=>x[0].test(t));return d?{name:d[1],c:d[2]}:{name:t.replace(/^(?:a|an|one|some)\s+/,'').replace(/[.!]$/,'')||'drip coffee',c:'#4b2e1d'};}
function context(t){t=lc(t);return {size:/venti|large|long|drive|all day|tired|big|double/.test(t)?'venti':/tall|small|quick|short|light/.test(t)?'tall':'grande',togo:/drive|to go|commute|road|run|walk/.test(t),who:(t.match(/for (my [a-z]+|me|her|him|them)/)||[])[1]||'me',raw:t};}
function limits(t){t=lc(t);const m=t.match(/\b(soy|oat|almond|coconut|whole|skim|2%|two percent|nonfat)\b/);
  return {milk:m?m[1]:null,sf:/sugar.?free|\bsf\b|no sugar|unsweet/.test(t),nowhip:/no whip/.test(t),decaf:/decaf/.test(t)};}
function format(t){t=lc(t);const foam=t.match(/([a-z]+) cold foam/);const pumps=t.match(/(\d+)\s*pumps?(?:\s+of)?\s*((?:sf|sugar.?free)\s+)?([a-z]+)?/);const name=t.match(/name(?: on (?:the|my) cup)?\s*[:=]?\s*([a-z]+)/);
  return {iced:/iced|cold\b|over ice/.test(t)&&!/hot/.test(t),hot:/hot|warm/.test(t),foam:foam?foam[1]+' cold foam':(/cold foam/.test(t)?'cold foam':null),topper:/protein|topper/.test(t)?'protein topper':null,
    pumps:pumps?pumps[1]+' pumps'+(pumps[2]?' sf':'')+(pumps[3]&&!/of/.test(pumps[3])?' '+pumps[3]:''):null,name:name?name[1]:null,light:/light ice/.test(t)};}
function orderLine(v){const g=v.goal,c=v.ctx,l=v.lim,f=v.fmt;if(!g)return '';
  return [c&&c.size,f&&(f.iced?'iced':f.hot?'hot':''),l&&l.milk&&l.milk+' milk',g.name,f&&f.foam&&'with '+f.foam,f&&f.topper,f&&f.pumps,l&&l.sf&&!(f&&/sf/.test(f.pumps||''))&&'sugar free',l&&l.nowhip&&'no whip',l&&l.decaf&&'decaf'].filter(Boolean).join(' ').replace(/\s+/g,' ').trim();}
E.term={title:'order mode · your barista',previewLabel:'preview · what the barista hands you',device:'cup',
  startNote:'order like you usually would. the preview shows what you actually get.',
  parts:[{k:'goal',short:'goal',c:'#ff6fa3',why:'what you actually want.'},
         {k:'context',short:'context',c:'#e6b92e',why:"who it's for and what's going on."},
         {k:'limits',short:'limits',c:'#2fc4c8',why:'what to avoid or swap.'},
         {k:'format',short:'format',c:'#4fbf6a',why:'exactly how you want it handed back.'}],
  steps:[
    {part:'goal',ai:"hey. what can i get you?",chips:['a coffee','a chai latte'],
     save:(t,v)=>{v.goal=goal(t);},note:v=>/drip/.test(v.goal.name)?"you asked for coffee. you got coffee. it isn't wrong. it just isn't yours.":"a goal helps. but it's still the default version."},
    {part:'context',ai:"who's it for, and what's the day looking like?",chips:["it's for me. long drive ahead.","it's for my boss. big meeting at 9."],
     save:(t,v)=>{v.ctx=context(t);},note:v=>v.ctx.size==='venti'?'context changed the size. it knows the day is long.':'context changed the size to fit the moment.'},
    {part:'limits',ai:'anything i should swap or avoid?',chips:['soy milk. sugar free. no whip.','oat milk. decaf.'],
     check:t=>{const l=limits(t);return (l.milk||l.sf||l.nowhip||l.decaf)?true:'give me one swap or one avoid. like: soy milk, or sugar free.';},
     save:(t,v)=>{v.lim=limits(t);},note:'limits changed the milk. nothing you said no to made it in.'},
    {part:'format',ai:'how exactly do you want it?',chips:['hot. banana cold foam. protein topper. 3 pumps sf vanilla.','iced. light ice. name on the cup: simi.'],
     save:(t,v)=>{v.fmt=format(t);},note:"now it's exactly your order. every highlighted piece came from you."}],
  render(v,{hl,esc}){
    const g=v.goal,c=v.ctx||{},l=v.lim||{},f=v.fmt||{};
    if(!g)return `<div class="cupm"><div class="cupwrap s-grande"><div class="cup empty"><span class="lid"></span><div class="liq" style="--liq:#e9e6e1"></div></div></div><div class="ticket"><b>order</b><p>waiting for your order.</p></div></div>`;
    const size=c.size||'grande',liq=l.milk?`color-mix(in srgb,${g.c} 62%,${MILK[l.milk]||'#f3eadb'})`:g.c;
    const foam=f.foam?`<div class="foam" style="--foam:${/banana/.test(f.foam)?'#f7e7a4':/vanilla/.test(f.foam)?'#f8f0dc':'#f6efe6'}"></div>`:'';
    const top=f.topper?'<div class="topper"></div>':'';
    const ice=f.iced?`<div class="ice">${'<i></i>'.repeat(f.light?2:4)}</div>`:'';
    const steam=(f.hot||(!f.iced&&v.fmt))?'<div class="steam"><i></i><i></i><i></i></div>':'';
    const name=f.name?`<span class="name">${hl('format',f.name)}</span>`:c.who&&v.ctx?`<span class="name">${esc(c.who==='me'?'':c.who)}</span>`:'';
    const lines=[];
    lines.push(`<li>${hl('goal',g.name)}</li>`);
    lines.push(`<li>${v.ctx?hl('context',size):'grande'}${v.ctx&&c.togo?' · '+hl('context','to go'):''}</li>`);
    lines.push(`<li>${v.lim&&l.milk?hl('limits',l.milk+' milk'):'2% milk, the default'}</li>`);
    if(v.lim&&(l.sf||l.nowhip||l.decaf))lines.push(`<li>${hl('limits',[l.sf&&'sugar free',l.nowhip&&'no whip',l.decaf&&'decaf'].filter(Boolean).join(' · '))}</li>`);
    if(v.fmt)lines.push(`<li>${hl('format',[f.iced?'iced':f.hot?'hot':'',f.foam,f.topper,f.pumps,f.light&&'light ice'].filter(Boolean).join(' · ')||'as described')}</li>`);
    else lines.push(`<li>${g.name==='drip coffee'?'black. whatever is in the pot.':'standard recipe.'}</li>`);
    return `<div class="cupm"><div class="cupwrap s-${size}">${steam}<div class="cup${f.iced?' clear':''}"><span class="lid"></span><div class="liq" style="--liq:${liq}">${ice}${foam}${top}</div>${name}</div></div>
      <div class="ticket"><b>order ticket</b><ul>${lines.join('')}</ul></div></div>`;},
  prompt:v=>{const o=orderLine(v)||'a coffee';const c=v.ctx?v.ctx.raw.replace(/\.$/,''):'';
    return `remember this about me for future chats.\nmy usual order: ${o}.\nwhen i say "the usual", that's what i mean.${c?`\ncontext: ${c}.`:''}\nbefore you help me with anything, use what you already know about me. if something important is missing, ask me once and remember the answer.`;},
  done:{title:'goal, context, limits, format.',say:"\"a coffee\" gets you whatever's in the pot. the four parts get you exactly your order. same with ai. vague in, generic out.",
    rule:'works on any prompt: say the goal, give context, set limits, describe the format.'}};
E.take={label:'your remember-me note',hint:'it opens a new chat with your note filled in. press send. next time, just say "the usual."',
  example:'remember this about me for future chats.\nmy usual order: venti hot soy milk chai latte with banana cold foam protein topper 3 pumps sf vanilla.\nwhen i say "the usual", that\'s what i mean.\ncontext: it\'s for me. long drive ahead.\nbefore you help me with anything, use what you already know about me. if something important is missing, ask me once and remember the answer.'};
})(window.EDITION);
