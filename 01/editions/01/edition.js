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

/* bite 4: the coffee terminal. type your real order. every detail you give changes the cup.
   one parser reads every answer for everything (drink, size, milk, temp, foam, pumps, shots, toppings, name),
   so a full real order works on the first try and the steps it already covers get skipped. */
(function(E){
const N={one:1,two:2,three:3,four:4,five:5,six:6,a:1,single:1,double:2,triple:3,quad:4};
const DRINKS=[[/dirty chai/,'dirty chai latte','#b47a4c'],[/chai/,'chai latte','#c8915f'],[/matcha/,'matcha latte','#9cc27a'],[/london fog/,'london fog','#c9b79c'],[/hot choc|hot cocoa|cocoa/,'hot chocolate','#6b3f2a'],
  [/nitro/,'nitro cold brew','#2e1c12'],[/cold brew/,'cold brew','#3d2618'],[/americano/,'americano','#4a2d1b'],[/cortado/,'cortado','#8a5a3a'],[/flat white/,'flat white','#a77a55'],
  [/cappuccino|capp\b/,'cappuccino','#a8805c'],[/caramel macchiato/,'caramel macchiato','#b5875c'],[/macchiato/,'macchiato','#7a4c2e'],[/white mocha/,'white mocha','#c9a582'],[/mocha/,'mocha','#5b3524'],
  [/frap|frappuccino|blended/,'frappuccino','#b08a68'],[/refresher|lemonade/,'refresher','#f07aa0'],[/espresso|doppio|shot of/,'espresso','#3a2214'],[/latte/,'latte','#b98a62'],[/tea/,'tea','#b77a2e'],[/coffee|drip|joe/,'drip coffee','#4b2e1d']];
const MILKS=[['oat','#e9d8b4'],['almond','#efe4d2'],['soy','#efe2c9'],['coconut','#f6f1e7'],['cashew','#f1e6d4'],['macadamia','#f3e9d6'],['pistachio','#e6ecc9'],['lactose free','#f6f0e4'],['whole','#fbf6ee'],['skim','#f4f2ee'],['nonfat','#f4f2ee'],['2%','#f8f3ea'],['two percent','#f8f3ea'],['half and half','#fbf3e4'],['breve','#fbf3e4'],['heavy cream','#fdf6e8']];
const FLAVORS='brown sugar|toffee nut|cinnamon dolce|white mocha|salted caramel|caramel|vanilla|hazelnut|mocha|peppermint|lavender|pumpkin spice|pumpkin|honey|maple|coconut|raspberry|almond|cinnamon|banana|strawberry|irish cream';
const FOAM={banana:'#f7e7a4',vanilla:'#f8f0dc','salted caramel':'#ecd2a8',caramel:'#ecd2a8',pumpkin:'#f4c48a',strawberry:'#f7c6d3',matcha:'#cfe3b5',chocolate:'#cfae94',mocha:'#cfae94',lavender:'#e2d6f2',cinnamon:'#ecd6bd'};
const num=s=>N[s]||parseInt(s,10)||0;
function absorb(t,v){const l=' '+t.toLowerCase().replace(/[’']/g,"'")+' ';
  /* drink */
  const d=DRINKS.find(x=>x[0].test(l));
  if(d&&(!v.drink||v.drink.name==='drip coffee'||d[1]!=='drip coffee'))v.drink={name:d[1],c:d[2]};
  /* size: context */
  const sz=l.match(/\b(short|tall|grande|venti|trenta|small|medium|large|extra large|(8|12|16|20|24|30) ?oz)\b/);
  if(sz)v.size=({small:'tall',medium:'grande',large:'venti','extra large':'trenta'})[sz[1]]||sz[1].replace(/ ?oz/,' oz');
  else if(/long (drive|day|night)|all day|exhausted|tired|road trip/.test(l)&&!v.size)v.size='venti';
  else if(/quick|on the go|in a rush/.test(l)&&!v.size)v.size='tall';
  if(/to go|drive|commute|road|on the go|in a rush|walk/.test(l))v.togo=true;
  if(/for (my boss|my mom|my dad|my friend|a friend|the team|her|him|them)/.test(l))v.who=l.match(/for (my boss|my mom|my dad|my friend|a friend|the team|her|him|them)/)[1];
  /* limits: swaps and avoids */
  const mk=MILKS.find(m=>new RegExp('\\b'+m[0].replace('%','%')+'\\b').test(l)&&!new RegExp('no '+m[0]).test(l));if(mk)v.milk=mk;
  if(/dairy.?free|non.?dairy/.test(l)&&!v.milk)v.milk=['oat','#e9d8b4'];
  if(/\bsugar.?free\b|\bsf\b|no sugar|unsweet|splenda|stevia|skinny/.test(l))v.sf=true;
  if(/half (sweet|the syrup|pumps)|less sweet|light (syrup|sweet)/.test(l))v.lessSweet=true;
  if(/no whip|without whip|hold the whip/.test(l))v.noWhip=true;
  if(/\bdecaf\b/.test(l))v.decaf='decaf';else if(/half.?caff?/.test(l))v.decaf='half caf';
  if(/no ice/.test(l))v.ice='no ice';
  /* format: how it's made and handed over */
  if(/\biced\b|over ice|on ice/.test(l)||/\bcold\b(?! foam| brew)/.test(l)||(d&&/cold brew|refresher/.test(d[1])&&!v.temp))v.temp='iced';
  if(/\b(hot|warm|steamed)\b/.test(l))v.temp=/extra hot/.test(l)?'extra hot':'hot';
  if(/frap|blended/.test(l))v.temp='blended';
  if(/light ice|easy ice/.test(l))v.ice='light ice';if(/extra ice/.test(l))v.ice='extra ice';
  const fm=l.match(new RegExp('((?:'+FLAVORS+'|chocolate|matcha|sweet cream)\\s+)?(?:cream\\s+)?cold foam'));if(fm)v.foam=((fm[1]||'').trim()+' cold foam').trim();
  if(/extra foam|foamy/.test(l)&&!v.foam)v.foam='extra foam';
  const pm=[...l.matchAll(new RegExp('(\\d+|one|two|three|four|five|six)\\s*pumps?\\s*(?:of\\s*)?((?:sf|sugar.?free)\\s*)?('+FLAVORS+')?','g'))];
  if(pm.length)v.pumps=pm.map(m=>num(m[1])+' pump'+(num(m[1])>1?'s':'')+(m[2]?' sf':'')+(m[3]?' '+m[3]:'')).join(', ');
  else{const fl=l.match(new RegExp('\\b('+FLAVORS+')\\b(?!\\s*(cold foam|drizzle|milk|cream))'));if(fl&&!v.flavor&&!(d&&d[1].includes(fl[1])))v.flavor=fl[1];}
  const sh=l.match(/(extra|double|triple|quad|\d|one|two|three|four) (espresso )?shots?|extra shot|blonde|ristretto/);if(sh)v.shots=sh[0];
  if(/protein/.test(l))v.protein=true;
  const dz=l.match(new RegExp('('+FLAVORS+'|chocolate)? ?drizzle'));if(dz)v.drizzle=((dz[1]||'')+' drizzle').trim();
  if(/\bwhip\b/.test(l)&&!/no whip|without whip|hold the whip/.test(l))v.whip=true;
  const nm=l.match(/name(?: on (?:the |my )?cup)?(?: is| should say| says)?\s*[:=]?\s*([a-z]+)/)||l.match(/for ([a-z]+) on the cup/);if(nm)v.name=nm[1];
  return v;}
const has={goal:v=>!!v.drink,context:v=>!!(v.size||v.togo||v.who),limits:v=>!!(v.milk||v.sf||v.noWhip||v.decaf||v.lessSweet||v.ice==='no ice'),format:v=>!!(v.temp||v.foam||v.pumps||v.shots||v.protein||v.drizzle||v.whip||v.name||v.flavor||(v.ice&&v.ice!=='no ice'))};
const order=v=>[v.size,v.temp,v.decaf,v.milk&&v.milk[0]+' milk',v.flavor,v.drink&&v.drink.name,v.shots,v.pumps,v.sf&&!/sf/.test(v.pumps||'')&&'sugar free',v.lessSweet&&'less sweet',v.foam&&'with '+v.foam,v.protein&&'protein topper',v.drizzle,v.whip&&'whip',v.noWhip&&'no whip',v.ice,v.togo&&'to go',v.name&&'name on the cup: '+v.name].filter(Boolean).join(' · ');
const vague=t=>/^(whatever|idk|i don'?t know|nothing|none|no|nah|anything|nope|n\/a|skip)\.?$/i.test(t.trim());
E.term={title:'order mode · your barista',previewLabel:'preview · what the barista hands you',device:'cup',
  startNote:'order the way you really would. the preview shows what you actually get.',
  parts:[{k:'goal',short:'goal',c:'#ff6fa3',why:'what you actually want.'},
         {k:'context',short:'context',c:'#e6b92e',why:"who it's for and what's going on."},
         {k:'limits',short:'limits',c:'#2fc4c8',why:'what to avoid or swap.'},
         {k:'format',short:'format',c:'#4fbf6a',why:'exactly how you want it handed back.'}],
  lit:v=>Object.keys(has).filter(k=>has[k](v)),
  skipSay:(names,v,last)=>'you already gave me your '+(names.length>1?names.slice(0,-1).join(', ')+' and '+names[names.length-1]:names[0])+'.'+(last?" that's a full prompt. you've been doing this at the counter for years.":''),
  steps:[
    {part:'goal',ai:"hey. what can i get you? order it exactly how you'd say it at the counter.",chips:['a coffee','venti iced oat milk chai with 2 pumps sf vanilla and banana cold foam'],
     check:t=>vague(t)?'give me something to make. even "a coffee" works.':true,
     save:(t,v)=>{absorb(t,v);if(!v.drink)v.drink={name:t.replace(/^(i'?ll have |can i (get|have) |i want |a |an )+/i,'').replace(/[.!]$/,'').slice(0,40)||'drip coffee',c:'#4b2e1d'};},
     note:v=>(v.drink.name==='drip coffee'&&!has.context(v)&&!has.limits(v)&&!has.format(v))?"you asked for coffee. you got coffee. it isn't wrong. it just isn't yours.":'every highlighted line on the ticket came from your words.'},
    {part:'context',ai:"who's it for, and what's the day looking like?",chips:["it's for me. long drive ahead.","it's for my boss. big meeting at 9."],
     skip:v=>has.context(v),check:t=>vague(t)?"tell me a little. who's it for, or how big a day is it?":true,
     save:(t,v)=>{absorb(t,v);if(!has.context(v))v.size='grande';v.ctxText=t;},note:'context set the size and how you get it.'},
    {part:'limits',ai:'anything i should swap or avoid? milk, sugar, caffeine, whip.',chips:['oat milk. sugar free. no whip.','almond milk. decaf.'],
     skip:v=>has.limits(v),check:t=>vague(t)?"say it even if it's small. like: oat milk, or sugar free.":true,
     save:(t,v)=>{absorb(t,v);if(!has.limits(v))v.limitNote=t;},note:'limits changed what went in. nothing you said no to made it.'},
    {part:'format',ai:'how exactly do you want it? hot or iced, foam, pumps, toppings, name on the cup.',chips:['iced. banana cold foam. protein topper. 3 pumps sf vanilla.','hot. extra shot. name on the cup: simi.'],
     skip:v=>has.format(v),check:t=>vague(t)?'pick at least one: hot or iced, a syrup, a foam, or your name on the cup.':true,
     save:(t,v)=>{absorb(t,v);if(!has.format(v))v.formatNote=t;},note:"now it's exactly your order."}],
  render(v,{hl,esc}){
    const g=v.drink;
    if(!g)return `<div class="cupm"><div class="cupwrap s-grande"><div class="cup empty"><span class="lid"></span><div class="liq" style="--liq:#e9e6e1"></div></div></div><div class="ticket"><b>order</b><p>waiting for your order.</p></div></div>`;
    const sizeKey=/venti|trenta|20|24|30/.test(v.size||'')?'venti':/tall|short|8|12/.test(v.size||'')?'tall':'grande';
    const liq=v.milk?`color-mix(in srgb,${g.c} 60%,${v.milk[1]})`:g.c;
    const fk=v.foam&&Object.keys(FOAM).find(k=>v.foam.includes(k));
    const foam=v.foam?`<div class="foam" style="--foam:${fk?FOAM[fk]:'#f6efe6'}"></div>`:'';
    const whip=v.whip?'<div class="foam" style="--foam:#fffaf2;height:22px;border-radius:40% 40% 0 0"></div>':'';
    const top=v.protein?'<div class="topper"></div>':'';
    const dz=v.drizzle?'<div class="topper" style="background:repeating-linear-gradient(110deg,transparent 0 6px,#b0783f 6px 8px)"></div>':'';
    const iced=v.temp==='iced'||v.temp==='blended';
    const ice=iced&&v.ice!=='no ice'?`<div class="ice">${'<i></i>'.repeat(v.ice==='light ice'?2:v.ice==='extra ice'?6:4)}</div>`:'';
    const steam=(v.temp==='hot'||v.temp==='extra hot')?'<div class="steam"><i></i><i></i><i></i></div>':'';
    const name=v.name?`<span class="name">${hl('format',v.name)}</span>`:'';
    const L=[`<li>${hl('goal',g.name)}</li>`];
    L.push(`<li>${has.context(v)?hl('context',[v.size,v.togo&&'to go',v.who&&'for '+v.who].filter(Boolean).join(' · ')):'grande, the default'}</li>`);
    L.push(`<li>${has.limits(v)?hl('limits',[v.milk&&v.milk[0]+' milk',v.decaf,v.sf&&'sugar free',v.lessSweet&&'less sweet',v.noWhip&&'no whip',v.ice==='no ice'&&'no ice'].filter(Boolean).join(' · ')):'2% milk, the default'}</li>`);
    const F=[v.temp,v.shots,v.flavor,v.pumps,v.foam,v.protein&&'protein topper',v.drizzle,v.whip&&'whip',v.ice&&v.ice!=='no ice'&&v.ice,v.name&&'name: '+v.name].filter(Boolean);
    L.push(`<li>${F.length?hl('format',F.join(' · ')):(g.name==='drip coffee'?'black. whatever is in the pot.':'standard recipe.')}</li>`);
    [v.limitNote,v.formatNote].filter(Boolean).forEach(n=>L.push(`<li>note: ${esc(n)}</li>`));
    return `<div class="cupm"><div class="cupwrap s-${sizeKey}">${steam}<div class="cup${iced?' clear':''}"><span class="lid"></span><div class="liq" style="--liq:${liq}">${ice}${whip}${foam}${dz}${top}</div>${name}</div></div>
      <div class="ticket"><b>order ticket</b><ul>${L.join('')}</ul></div></div>`;},
  prompt:v=>`remember this about me for future chats.\nmy usual order: ${order(v)||'a coffee'}.\nwhen i say "the usual", that's what i mean.${v.ctxText?`\ncontext: ${v.ctxText.replace(/\.$/,'')}.`:''}\nbefore you help me with anything, use what you already know about me. if something important is missing, ask me once and remember the answer.`,
  done:{title:'goal, context, limits, format.',say:"\"a coffee\" gets you whatever's in the pot. your real order gets you exactly what you want. same with ai. vague in, generic out.",
    rule:'works on any prompt: say the goal, give context, set limits, describe the format.'}};
E.take={label:'your remember-me note',hint:'it opens a new chat with your note filled in. press send. next time, just say "the usual."',
  example:'remember this about me for future chats.\nmy usual order: venti · iced · oat milk · chai latte · 2 pumps sf vanilla · with banana cold foam.\nwhen i say "the usual", that\'s what i mean.\nbefore you help me with anything, use what you already know about me. if something important is missing, ask me once and remember the answer.'};
})(window.EDITION);
