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

/* bite 4: the counter. order any drink the way you'd say it out loud, then keep changing it.
   every message updates the drink. anything the counter doesn't know still lands on the ticket in your words. */
(function(E){
const N={one:1,two:2,three:3,four:4,five:5,six:6,a:1,single:1,double:2,triple:3,quad:4};
/* [match, name, color, vessel] vessel: cup (coffee shop), mug (tea), martini, rocks, wine, flute, pint, highball */
const DRINKS=[
  [/espresso martini/,'espresso martini','#3a2214','martini'],[/dirty martini/,'dirty martini','#d9dcc0','martini'],[/martini|vodka (with|and) olives|vermouth/,'martini','#eef1e4','martini'],
  [/margarita/,'margarita','#e6efb0','rocks'],[/old fashioned/,'old fashioned','#c27a2c','rocks'],[/negroni/,'negroni','#c8332a','rocks'],[/whiskey|whisky|bourbon|scotch/,'whiskey','#c58a3a','rocks'],
  [/mojito/,'mojito','#e9f3d8','highball'],[/gin and tonic|g&t|vodka soda|vodka tonic|ranch water|paloma|highball/,'highball','#eef4f2','highball'],[/aperol|spritz/,'aperol spritz','#f08a3c','wine'],
  [/ros[eé]\b/,'rosé','#f4b4b8','wine'],[/white wine|chardonnay|sauvignon|pinot grigio/,'white wine','#f3e6a6','wine'],[/red wine|cabernet|pinot noir|merlot|malbec|\bwine\b/,'red wine','#6e1426','wine'],
  [/champagne|prosecco|bubbly|cava/,'champagne','#f4e6a8','flute'],[/beer|ipa|lager|pilsner|stout|ale\b/,'beer','#d99a2b','pint'],
  [/dirty chai/,'dirty chai latte','#b47a4c','cup'],[/chai/,'chai latte','#c8915f','cup'],[/matcha/,'matcha latte','#8fbf6a','cup'],[/london fog/,'london fog','#c9b79c','mug'],[/hot choc|hot cocoa|cocoa/,'hot chocolate','#6b3f2a','cup'],
  [/frap|frappuccino|frappe|blended/,'frappuccino','#b08a68','cup'],[/nitro/,'nitro cold brew','#2e1c12','cup'],[/cold brew/,'cold brew','#3d2618','cup'],[/americano/,'americano','#4a2d1b','cup'],[/cortado/,'cortado','#8a5a3a','cup'],[/flat white/,'flat white','#a77a55','cup'],
  [/cappuccino|\bcapp\b/,'cappuccino','#a8805c','cup'],[/caramel macchiato/,'caramel macchiato','#b5875c','cup'],[/macchiato/,'macchiato','#7a4c2e','cup'],[/white mocha/,'white mocha','#c9a582','cup'],[/mocha/,'mocha','#5b3524','cup'],
  [/refresher|lemonade|pink drink/,'refresher','#f07aa0','cup'],[/smoothie/,'smoothie','#f28aa6','cup'],[/espresso|doppio/,'espresso','#3a2214','cup'],[/latte/,'latte','#b98a62','cup'],
  [/green tea|jasmine/,'green tea','#b9c46a','mug'],[/chamomile|herbal|peppermint tea|mint tea/,'herbal tea','#d9b45a','mug'],[/earl grey|english breakfast|black tea/,'black tea','#8a4a1e','mug'],[/iced tea|sweet tea/,'iced tea','#a3561c','cup'],[/\btea\b/,'tea','#b06a26','mug'],
  [/coffee|drip|\bjoe\b/,'drip coffee','#4b2e1d','cup'],[/\bwater\b/,'water','#e6f1f7','highball'],[/soda|coke|sprite/,'soda','#5a2a1a','highball']];
const MILKS=[['oat','#e9d8b4'],['almond','#efe4d2'],['soy','#efe2c9'],['coconut','#f6f1e7'],['cashew','#f1e6d4'],['macadamia','#f3e9d6'],['pistachio','#e6ecc9'],['lactose free','#f6f0e4'],['whole','#fbf6ee'],['skim','#f4f2ee'],['nonfat','#f4f2ee'],['2%','#f8f3ea'],['two percent','#f8f3ea'],['half and half','#fbf3e4'],['breve','#fbf3e4'],['heavy cream','#fdf6e8']];
const FLAVORS='brown sugar|toffee nut|cinnamon dolce|white mocha|salted caramel|caramel|vanilla|hazelnut|mocha|peppermint|lavender|pumpkin spice|pumpkin|honey|maple|raspberry|cinnamon|banana|strawberry|irish cream|java chip|cookies and cream|chocolate chip';
const FOAM={banana:'#f7e7a4',vanilla:'#f8f0dc','salted caramel':'#ecd2a8',caramel:'#ecd2a8',pumpkin:'#f4c48a',strawberry:'#f7c6d3',matcha:'#cfe3b5',chocolate:'#cfae94',mocha:'#cfae94',lavender:'#e2d6f2',cinnamon:'#ecd6bd'};
const SIZES=['short','tall','grande','venti','trenta'];
const num=s=>N[s]||parseInt(s,10)||0;
const FILLER=/^(?:(?:can|could|may) i (?:get|have|grab)|i'?ll (?:have|get|take|do)|i (?:want|need)|i'?d like|let me (?:get|have)|give me|gimme|please|thanks|thank you|hi|hey|hello|um+|uh+|yeah|yes|okay|ok|so|a|an|the|and|also|actually|instead|just|make it|make that|for me|real quick)\b[\s,]*/;
const strip=c=>{let s=c.trim(),p;do{p=s;s=s.replace(FILLER,'').trim();}while(s!==p);return s.replace(/[.!?]+$/,'').trim();};

function absorb(t,v){
  const l=' '+t.toLowerCase().replace(/[’']/g,"'")+' ';const before=JSON.stringify(v);
  const rm=w=>new RegExp('\\b(no|without|hold the|remove the|remove|minus|skip the|take off the|take out the|lose the)\\s+(\\w+\\s+)?'+w).test(l);
  if(rm('(cold )?foam'))v.foam=null;
  if(rm('whip(ped cream)?'))v.whip=false,v.noWhip=true;
  if(rm('ice'))v.ice='no ice';
  if(rm('(syrup|pumps|flavor|sweetener|vanilla|caramel)'))v.pumps=null,v.flavor=null;
  if(rm('drizzle'))v.drizzle=null;
  if(rm('(protein|topper)'))v.protein=false;
  if(rm('(extra shot|shot|espresso)'))v.shots=null;
  if(rm('(olives?|garnish|twist|lime|lemon|cherry)'))v.garnish=null;
  if(rm('salt'))v.noSalt=true,v.salt=false;
  if(rm('milk')||/\bblack\b(?! tea)/.test(l))v.milk=null,v.black=true;
  /* the drink */
  const d=DRINKS.find(x=>x[0].test(l));
  if(d&&(!v.drink||d[1]!=='drip coffee'||v.drink.name==='drip coffee'))v.drink={name:d[1],c:d[2],vessel:d[3]};
  const sp=l.match(/\b(vodka|gin|tequila|mezcal|rum|whiskey|bourbon|rye|scotch)\b/);if(sp)v.spirit=sp[1];
  if(v.drink&&v.drink.vessel==='martini'&&/dirty/.test(l)&&v.drink.name==='martini')v.drink={name:'dirty martini',c:'#d9dcc0',vessel:'martini'};
  /* context: size, who, when */
  const sz=l.match(/\b(short|tall|grande|venti|trenta|small|medium|large|extra large|(8|12|16|20|24|30) ?oz)\b/);
  if(sz)v.size=({small:'small',medium:'medium',large:'large','extra large':'extra large'})[sz[1]]||sz[1].replace(/ ?oz/,' oz');
  if(/\bdouble\b(?! shot)/.test(l)&&v.drink&&/martini|rocks|highball/.test(v.drink.vessel))v.size='double';
  if(/\b(size up|bigger|go bigger|upsize)\b/.test(l))v.size=SIZES[Math.min(4,Math.max(0,SIZES.indexOf(v.size||'grande'))+1)];
  if(/\b(size down|smaller)\b/.test(l))v.size=SIZES[Math.max(0,Math.max(0,SIZES.indexOf(v.size||'grande'))-1)];
  if(/long (drive|day|night|shift)|all.?nighter|exhausted|so tired|road trip/.test(l)&&!v.size)v.size='large';
  if(/\b(to go|on the go|in a rush|drive.?thru|for the road)\b/.test(l))v.togo=true;
  if(/\bfor here\b|in a mug/.test(l))v.togo=false,v.mug=true;
  const who=l.match(/\bfor (my boss|my mom|my dad|my wife|my husband|my friend|my partner|a friend|the team|her|him|them)\b/);if(who)v.who=who[1];
  const when=l.match(/\b(before bed|this morning|after work|at brunch|for brunch|happy hour|for dinner|with dinner|for a date|celebrat\w+)\b/);if(when)v.when=when[1];
  /* limits: swaps and avoids */
  const mk=MILKS.find(m=>new RegExp('\\b'+m[0]+'\\b').test(l)&&!rm(m[0]));if(mk)v.milk=mk,v.black=false;
  if(/\b(regular|normal) milk\b/.test(l))v.milk=['2%','#f8f3ea'],v.black=false;
  if(/dairy.?free|non.?dairy/.test(l)&&!v.milk)v.milk=['oat','#e9d8b4'];
  if(/\bsugar.?free\b|\bsf\b|no sugar|unsweet|splenda|stevia|\bskinny\b/.test(l))v.sf=true;
  if(/half (sweet|the syrup|the pumps)|less sweet|light (syrup|sweet)|not too sweet/.test(l))v.lessSweet=true;
  if(/\bdecaf\b/.test(l))v.decaf='decaf';else if(/half.?caff?/.test(l))v.decaf='half caf';
  /* format: temperature, build, garnish, name */
  if(/frap|frappuccino|frappe|blended|frozen/.test(l))v.temp='blended';
  else if(/\biced\b|over ice|on ice|on the rocks|\bcold\b(?! foam| brew)/.test(l))v.temp='iced';
  else if(/\b(hot|warm|steamed)\b/.test(l))v.temp=/extra hot/.test(l)?'extra hot':'hot';
  const style=l.match(/\b(shaken|stirred|neat|straight up|up)\b/);if(style&&v.drink&&!/cup|mug/.test(v.drink.vessel))v.style=style[1];
  if(/extra dirty/.test(l))v.dirty='extra dirty';else if(/\bdirty\b/.test(l)&&v.drink&&v.drink.vessel==='martini')v.dirty='dirty';
  if(/\bextra dry\b/.test(l))v.dry='extra dry';else if(/\bdry\b/.test(l))v.dry='dry';
  const ol=l.match(/(\d+|one|two|three|four|five) olives?/);if(ol&&!rm('(olives?|garnish)'))v.garnish=num(ol[1])+' olive'+(num(ol[1])>1?'s':'');
  else if(/olives?/.test(l)&&!rm('(olives?|garnish)'))v.garnish=v.garnish&&/olive/.test(v.garnish)?v.garnish:'olives';
  const gn=l.match(/\b(lemon twist|twist|lime wedge|lime|lemon wedge|lemon|orange peel|orange|cherry|cherries|mint)\b/);if(gn&&!/lemonade/.test(l)&&!rm('(twist|lime|lemon|cherry|garnish)'))v.garnish=gn[1];
  if(/salt(ed)? rim|with salt/.test(l)&&!rm('salt'))v.salt=true;if(/sugar rim|tajin/.test(l))v.rim=/tajin/.test(l)?'tajin rim':'sugar rim';
  if(/light ice|easy ice/.test(l))v.ice='light ice';if(/extra ice/.test(l))v.ice='extra ice';
  const fm=l.match(new RegExp('((?:'+FLAVORS+'|chocolate|matcha|sweet cream)\\s+)?(?:cream\\s+)?cold foam'));if(fm&&!rm('(cold )?foam'))v.foam=((fm[1]||'').trim()+' cold foam').trim();
  if(/extra foam|\bfoamy\b/.test(l))v.foam=v.foam||'extra foam';
  const pm=[...l.matchAll(new RegExp('(\\d+|one|two|three|four|five|six)\\s*pumps?\\s*(?:of\\s*)?((?:sf|sugar.?free)\\s*)?('+FLAVORS+')?','g'))];
  if(pm.length)v.pumps=pm.map(m=>num(m[1])+' pump'+(num(m[1])>1?'s':'')+(m[2]?' sf':'')+(m[3]?' '+m[3]:'')).join(', ');
  const fl=l.match(new RegExp('\\b('+FLAVORS+')\\b(?!\\s*(cold foam|drizzle|milk|cream|pumps?|tea))'));
  if(fl&&!pm.length&&!rm(fl[1])&&!(v.drink&&v.drink.name.includes(fl[1])))v.flavor=fl[1];
  if(/\bhoney\b/.test(l)&&v.drink&&v.drink.vessel==='mug')v.flavor='honey';
  const sh=l.match(/\b(extra|double|triple|quad|\d|one|two|three|four) (espresso )?shots?\b|\bextra shot\b|\bblonde\b|\bristretto\b|\bupside down\b/);if(sh&&!rm('(extra shot|shot|espresso)'))v.shots=sh[0];
  if(/protein/.test(l)&&!rm('(protein|topper)'))v.protein=true;
  const dz=l.match(new RegExp('(?:extra )?('+FLAVORS+'|chocolate)? ?drizzle'));if(dz&&!rm('drizzle'))v.drizzle=((dz[1]||'')+' drizzle').trim();
  if(/\bwhip(ped cream)?\b/.test(l)&&!rm('whip(ped cream)?'))v.whip=true,v.noWhip=false;
  const nm=l.match(/name(?: on (?:the |my )?cup)?(?: is| should say| says)?\s*[:=]?\s*([a-z]+)/)||l.match(/\bfor ([a-z]+) on the cup/);if(nm)v.name=nm[1];
  return JSON.stringify(v)!==before;}

const has={goal:v=>!!v.drink,context:v=>!!(v.size||v.togo||v.who||v.mug||v.when),limits:v=>!!(v.milk||v.black||v.sf||v.noWhip||v.decaf||v.lessSweet||v.ice==='no ice'||v.noSalt),
  format:v=>!!(v.temp||v.foam||v.pumps||v.shots||v.protein||v.drizzle||v.whip||v.name||v.flavor||v.style||v.dirty||v.dry||v.garnish||v.salt||v.rim||v.spirit||(v.ice&&v.ice!=='no ice')||(v.extras&&v.extras.length))};
const items=v=>[v.size,v.temp,v.decaf,v.black?'black':v.milk&&v.milk[0]+' milk',v.spirit,v.flavor,v.drink&&v.drink.name,v.dirty&&!(v.drink&&v.drink.name.includes('dirty'))&&v.dirty,v.dry,v.style,v.shots,v.pumps,v.sf&&!/sf/.test(v.pumps||'')&&'sugar free',v.lessSweet&&'less sweet',v.foam,v.whip&&'whip',v.noWhip&&'no whip',v.drizzle,v.protein&&'protein topper',v.garnish,v.salt&&'salt rim',v.rim,v.noSalt&&'no salt',v.ice,v.togo&&'to go',v.mug&&'for here',v.who&&'for '+v.who,v.when,v.name&&'name: '+v.name,...(v.extras||[])].filter(Boolean);
const vague=t=>/^(whatever|idk|i don'?t know|nothing|none|nah|anything|nope|n\/a|skip|surprise me)\.?$/i.test(t.trim());
const bar=v=>v.drink&&!/cup|mug/.test(v.drink.vessel);
const MISSING={context:v=>bar(v)?"what's the occasion? or is it a double?":'what size? or is it for someone?',limits:v=>bar(v)?'anything to leave out? like no salt or light ice.':'any swaps? like oat milk, sugar free or decaf.',format:v=>bar(v)?'how do you want it? shaken or stirred, a garnish?':'hot or iced? any foam, syrup or your name on the cup?'};
const kind=v=>{const n=v.drink?v.drink.name:'',vs=v.drink?v.drink.vessel:'cup';if(vs!=='cup')return vs;
  if(v.temp==='blended'||/frappuccino|smoothie/.test(n))return 'blended';if(/^(espresso|cortado)$/.test(n)&&!v.temp)return 'mini';
  if(v.temp==='iced'||(!v.temp&&/cold brew|refresher|iced tea/.test(n)))return 'iced';return 'hot';};

E.term={open:true,title:'the counter',previewLabel:'preview · what you get handed',device:'cup',
  placeholder:'type your drink here',
  startNote:'your drink will show up here.',
  ai:"hi! what can i get you? type any drink, exactly how you'd order it.",
  parts:[{k:'goal',short:'goal',c:'#ff6fa3',why:'what you actually want.'},
         {k:'context',short:'context',c:'#e6b92e',why:"who it's for and what's going on."},
         {k:'limits',short:'limits',c:'#2fc4c8',why:'what to avoid or swap.'},
         {k:'format',short:'format',c:'#4fbf6a',why:'exactly how you want it made.'}],
  lit:v=>Object.keys(has).filter(k=>has[k](v)),
  chips:v=>{if(!v.started)return ['a coffee','a tea','a martini'];const c=[];
    if(bar(v)){if(!v.dirty&&/martini/.test(v.drink.name))c.push('make it dirty');if(!v.garnish)c.push('add a lemon twist');if(!v.style)c.push('shaken, not stirred');}
    else{if(!has.context(v))c.push('make it large');if(!has.limits(v))c.push(/tea/.test(v.drink.name)?'add honey':'swap to oat milk');if(v.temp!=='iced'&&v.temp!=='blended')c.push('make it iced');else if(!v.foam&&kind(v)!=='mug')c.push('add vanilla cold foam');}
    c.push("that's it");return c.slice(-3);},
  isDone:t=>/^(that'?s it|thats it|that'?s all|that'?s everything|done|perfect|nothing else|i'?m good|all good|finish)\b/i.test(t.trim()),
  finishSay:v=>'one '+items(v).join(', ')+'. coming right up.',
  update(t,v){
    if(vague(t))return {reply:'give me something to make. even "a coffee" works.',changed:false};
    const before=items(v),pre=JSON.stringify(v);let changed=absorb(t,v);
    t.split(/,|;|\band\b|\bwith\b|\bplus\b|\.\s+|\balso\b/i).map(strip).filter(c=>c.length>2).forEach(c=>{const probe=JSON.parse(pre);if(!absorb(c,probe)&&!/^(that'?s it|please|thanks?)$/i.test(c)){v.extras=v.extras||[];if(!v.extras.includes(c)&&v.extras.length<6){v.extras.push(c);changed=true;}}});
    if(!v.drink&&v.extras&&v.extras.length)v.drink={name:v.extras.shift(),c:'#9a6b4a',vessel:'cup'};
    const first=!v.started;v.started=true;
    const after=[...new Set(items(v))],add=after.filter(x=>!before.includes(x)),gone=[...new Set(before)].filter(x=>!after.includes(x));
    const miss=['context','limits','format'].filter(k=>!has[k](v));
    let reply;
    if(first&&v.drink&&after.length===1)reply='one '+v.drink.name+', the default way. that\'s what a short order gets you. now make it yours. '+MISSING[miss[0]||'format'](v);
    else if(!add.length&&!gone.length)reply="i didn't catch a change there. try something like \"make it hot\" or \"add whipped cream.\"";
    else{reply=(first?'got it: ':'updated: ')+(add.length?add.join(', '):'')+(gone.length?(add.length?'. ':'')+'took off '+gone.join(', '):'')+'.';
      reply+=miss.length?' '+MISSING[miss[0]](v):" that's your whole order. change anything, or type \"that's it.\"";}
    const note=first&&after.length===1?"a short order gets the default. it isn't wrong. it just isn't yours.":'every highlighted line on the ticket came from your words.';
    return {reply,changed,note};},
  render(v,{hl,esc}){
    const g=v.drink;
    if(!g)return `<div class="cupm"><div class="cupwrap s-grande"><div class="cup empty"><span class="lid"></span><div class="liq" style="--liq:#e9e6e1"></div></div></div><div class="ticket"><b>order ticket</b><p>waiting for your order.</p></div></div>`;
    const k=kind(v),sizeKey=/venti|trenta|large|20|24|30|double/.test(v.size||'')?'venti':/tall|short|small|8|12/.test(v.size||'')?'tall':'grande';
    const creamy=/latte|macchiato|cappuccino|flat white|frappuccino|mocha|chai|matcha|london fog/.test(g.name);
    const base=v.black?g.c:v.milk?`color-mix(in srgb,${g.c} 58%,${v.milk[1]})`:(creamy?`color-mix(in srgb,${g.c} 72%,#f8f3ea)`:g.c);
    const fk=v.foam&&Object.keys(FOAM).find(x=>v.foam.includes(x));
    const whipOn=v.whip||(k==='blended'&&!v.noWhip&&!/smoothie/.test(g.name))||(/hot chocolate|mocha/.test(g.name)&&!v.noWhip&&k==='hot');
    const iceOn=v.ice!=='no ice'&&(k==='iced'||((k==='rocks'||k==='highball')&&v.style!=='neat'&&v.style!=='up'&&v.style!=='straight up'));
    const ice=iceOn?`<div class="ice">${'<i></i>'.repeat(v.ice==='light ice'?2:v.ice==='extra ice'?6:k==='rocks'?1:4)}</div>`:'';
    let vessel;
    if(k==='martini'){const n=v.garnish&&/olive/.test(v.garnish)?(parseInt(v.garnish)||2):0;const liq=v.dirty==='extra dirty'?'#cfd2a2':v.dirty?'#dcdfbe':g.c;
      vessel=`<div class="glass g-martini"><div class="bowl"><div class="liq" style="--liq:${liq}"></div></div><i class="stem"></i><i class="foot"></i>${n?`<span class="pick">${'<i class="olive"></i>'.repeat(Math.min(n,4))}</span>`:''}${v.garnish&&/twist|lemon/.test(v.garnish)?'<span class="peel"></span>':''}</div>`;}
    else if(k==='wine'||k==='flute'){vessel=`<div class="glass g-${k}"><div class="bowl"><div class="liq" style="--liq:${g.c}">${k==='flute'?'<i class="bub"></i><i class="bub"></i><i class="bub"></i>':''}</div></div><i class="stem"></i><i class="foot"></i>${v.garnish?'<span class="slice"></span>':''}</div>`;}
    else if(k==='rocks'||k==='highball'||k==='pint'){vessel=`<div class="glass g-${k}${v.salt||v.rim?' rim':''}"><div class="body"><div class="liq" style="--liq:${g.c}">${ice}${k==='pint'?'<div class="head"></div>':''}</div></div>${v.garnish?`<span class="slice${/lime|mint|mojito/.test(v.garnish+g.name)?' lime':/cherr/.test(v.garnish)?' cherry':''}"></span>`:''}${k==='highball'?'<span class="straw"></span>':''}</div>`;}
    else if(k==='mug'){vessel=`<div class="glass g-mug"><div class="body"><div class="liq" style="--liq:${v.milk?`color-mix(in srgb,${g.c} 60%,${v.milk[1]})`:g.c}"></div></div><i class="handle"></i>${/tea/.test(g.name)?'<span class="teatag"></span>':''}</div>`;}
    else{const layers=[whipOn?`<div class="whip">${v.drizzle?'<i class="dz"></i>':''}</div>`:'',v.foam?`<div class="foam" style="--foam:${fk?FOAM[fk]:'#f6efe6'}"></div>`:'',v.protein?'<div class="topper"></div>':'',(!whipOn&&v.drizzle)?'<div class="dzline"></div>':''].join('');
      vessel=`${(k==='iced'||k==='blended')?'<span class="straw"></span>':''}<div class="cup k-${k}"><span class="lid"></span>${k==='hot'?'<span class="sleeve"></span>':''}<div class="liq" style="--liq:${base}">${ice}${layers}</div>${v.name?`<span class="name">${hl('format',v.name)}</span>`:''}</div>`;}
    const steam=(k==='hot'||k==='mini'||(k==='mug'&&v.temp!=='iced'))?'<div class="steam"><i></i><i></i><i></i></div>':'';
    const L=[`<li>${hl('goal',[v.spirit&&!g.name.includes(v.spirit)?v.spirit:'',g.name].filter(Boolean).join(' '))}</li>`];
    L.push(`<li>${has.context(v)?hl('context',[v.size,v.togo&&'to go',v.mug&&'for here',v.who&&'for '+v.who,v.when].filter(Boolean).join(' · ')):(bar(v)?'a single, the default':'medium, the default')}</li>`);
    L.push(`<li>${has.limits(v)?hl('limits',[v.black?'black':v.milk&&v.milk[0]+' milk',v.decaf,v.sf&&'sugar free',v.lessSweet&&'less sweet',v.noWhip&&'no whip',v.ice==='no ice'&&'no ice',v.noSalt&&'no salt'].filter(Boolean).join(' · ')):(bar(v)?'nothing left out':/tea/.test(g.name)?'plain':'regular milk, the default')}</li>`);
    const F=[v.temp,v.dirty&&!g.name.includes('dirty')&&v.dirty,v.dry,v.style,v.shots,v.flavor,v.pumps,v.foam,whipOn&&'whip',v.drizzle,v.protein&&'protein topper',v.garnish,v.salt&&'salt rim',v.rim,v.ice&&v.ice!=='no ice'&&v.ice,v.name&&'name: '+v.name].filter(Boolean);
    L.push(`<li>${F.length?hl('format',F.join(' · ')):(g.name==='drip coffee'?'black. whatever is in the pot.':'the standard recipe.')}</li>`);
    if(v.extras&&v.extras.length)L.push(`<li>${hl('format',v.extras.join(' · '))}</li>`);
    return `<div class="cupm"><div class="cupwrap s-${sizeKey} k-${k}">${steam}${vessel}</div><div class="ticket"><b>order ticket</b><ul>${L.join('')}</ul></div></div>`;},
  prompt:v=>`i want to make this drink at home: ${items(v).filter(x=>!/^name: |^to go$|^for here$/.test(x)).join(', ')}.\ngoal: a recipe that tastes like the version i'd order out.\ncontext: i'm making it in my own kitchen with normal tools.\nlimits: no special equipment, and ready in 10 minutes or less.\nformat: a short ingredient list, then numbered steps.`,
  done:{title:'goal, context, limits, format.',say:"a short order gets you the default. your real order gets you exactly what you want, and you can keep changing it until it's right. talking to ai works the same way.",
    rule:'works for anything you ask ai: say what you want, give the details, then keep fixing it.'}};
E.take={label:'your request to ai',mine:'made from your drink in bite 4',
  empty:'order a drink in bite 4 first. your request shows up here as soon as you do.',emptyButton:'go to bite 4',
  hint:'tap a button. claude or chatgpt opens with this already typed in. press send and you get a recipe for your exact drink. notice the four parts: goal, context, limits, format.'};
E.ui.b5={h2:'now get ai to *make it for you.*',say:'your drink from bite 4 just became a real request to ai, written the same way you ordered: what you want, what is true about you, what to avoid, how you want it back.',hint:'try it with anything. a dinner plan, a text to your landlord, a gift. same four parts.'};
E.ui.b4={h2:'order exactly what you want. *it works on ai too.*',say:"practice talking to ai with something you already know how to do: ordering a drink.",
  steps:["type your drink in the black box below, the way you'd say it out loud.","press enter. watch it get made.",'change anything. type "that\'s it" when it\'s right.']};
})(window.EDITION);
