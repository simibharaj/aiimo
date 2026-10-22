/* edition 03 · builds on simi's essay "i trained a human. then i wrote the playbook for an ai." news checked october 18, 2026; recheck before publishing. */
window.EDITION={
  number:'03',
  date:'october 2026',
  ui:{
    cover:{sub:"food for thought, in bites. this week: you'd train a new hire. so train your ai."},
    b1:{tag:'the model',h2:'google gave its agent a work email. *not a price tag.*',say:'tap each card. one is the launch. one is the part they skipped.',
      cards:[{small:'what they show you',title:'a coworker account',back:'the gemini agent gets its own google workspace account and email. you can tag it, email it or add it to a group chat. its actions are logged under its own name.'},
             {small:"what they didn't show",title:'the meter',back:"google hasn't published how the agent is billed. it only mentions flexible spending options, smart routing and real-time spend caps."}]},
    b2:{tag:'the number',h2:'*25%* of finance firms tie raises to ai skills.',ask:'should ai skills count toward your raise?',poll:[['yes','yes. it\'s a real skill'],['define','only if they define it']]},
    b3:{tag:'the culture',h2:'more people know ai. *fewer people like it.*'},
    b4:{h2:'train it like a new hire. *write the playbook.*',say:'four steps. after each one, the preview shows how the answer changes. pick a task, or bring your own.'},
    b5:{h2:'build *your* playbook.',say:'pick a task you repeat every week. this turns it into a playbook you can paste into any ai, or save as a custom instruction, project, gem or skill.',hint:"same lesson as bite 4: write it once, reuse it forever. update it when it misses."}
  },
  sections:[
    {type:'teardown',
     take:"a coworker with no salary listed is a coworker you meet on the invoice. ask for the meter before you hire it.",
     sources:[{label:'techcrunch · oct 8',href:'https://techcrunch.com/2026/10/08/google-brings-agentic-ai-to-gemini-starting-with-businesses/'},{label:'google cloud',href:'https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026'}]},
    {type:'number',
     dek:"that's from a survey of 500 us hr professionals in finance. 30% now require people to disclose their ai use in performance reviews.",
     quote:'"ai fluency has become the industry\'s most urgent hiring priority, and its least defined one."',by:'selby jennings · ai talent pulse report',
     take:"if it counts toward your raise, it needs a definition. \"good at ai\" isn't one. a playbook you can show is.",
     sources:[{label:'selby jennings · ai talent pulse',href:'https://www.selbyjennings.com/insights/ai-talent-pulse-report/'}]},
    {type:'quote',
     reception:{value:39,label:'say ai will do more harm than good',note:'up from 31% in 2024 · bentley-gallup, july 2026'},
     quote:'"the progress in ai and the sentiment toward it are inversely related."',by:'pete pachal · fast company · sept 18',
     fact:'the same poll: 70% now call themselves somewhat or extremely knowledgeable about ai, up from 64% in 2024.',
     take:"the fix isn't better marketing. it's more people building one small thing and watching it work. confidence comes from reps.",
     sources:[{label:'fast company',href:'https://fastcompany.com/91606908/why-every-ai-launch-now-makes-backlash-worse'}]},
    {type:'aside',
     paragraphs:['prompt engineering is just onboarding with worse documentation.'],
     essay:{title:'i trained a human. then i wrote the playbook for an ai.',label:'read the essay: i trained a human. then i wrote the playbook for an ai.',href:'https://aiimo.substack.com/p/i-trained-a-human-then-i-wrote-the'},
     sig:'simi'},
    {type:'signoff',
     lede:'i build with ai every day and tell you exactly what i think of it. brilliant gets called brilliant. overhyped gets called out.',
     card:{name:'simi bharaj',handle:'@_simisim',links:{instagram:'https://www.instagram.com/_simisim/',linkedin:'https://www.linkedin.com/in/simibharaj',github:'https://github.com/simibharaj',substack:'https://aiimo.substack.com'}},
     subscribe:{label:'get the next edition',href:'https://aiimo.substack.com/subscribe'},
     dm:{label:'dm me your playbook',href:'https://ig.me/m/_simisim'},
     closing:'next edition drops in two weeks.'}
  ],

  /* bite 4: write the playbook */
  lab:{
    parts:[
      {k:'role',short:'the job',c:'#ff6fa3',title:'give it the job.',why:'who it is, who it serves, what is happening. a new hire needs a title before a task.'},
      {k:'example',short:'an example',c:'#e6b92e',title:'show it good.',why:'paste one example you love. it copies a shape better than it follows a description.'},
      {k:'rules',short:'the rules',c:'#2fc4c8',title:'write the rules.',why:"the dos and don'ts you'd tell a new hire on day one."},
      {k:'check',short:'a check',c:'#4fbf6a',title:'make it check its work.',why:'tell it what to check before it hands anything back. the review is part of the job.'}
    ],
    notes:{none:'start with the job. a new hire needs a title before a task.',
      role:'a title helps. without an example, it guesses what good looks like.',
      example:'now it copies the shape you love. the highlighted parts came from your example.',
      rules:'rules turn your taste into policy. it follows them every time.',
      check:"now it reviews its own work before you see it. that's the playbook."},
    takeaway:{title:'write the playbook once.',say:"you wouldn't hand a new hire a one-line task and walk away. give ai the job, an example, the rules and a check. then reuse it every time.",
      hint:'save it as a custom instruction, a project, a gem or a skill. same playbook, every time.',extra:'build my playbook'},
    ownText:'a real ai would now work from your playbook.',
    ownNote:'each color is one part of the playbook. aim for all four.',
    scenarios:{
      care:{label:'reply to a customer',extra:true,
        ex:{role:"you're customer care for luna candle co., a small candle shop in tampa. jess emailed asking where her order is. it shipped tuesday.",example:"a reply i loved: \"hi sam! your candles left tuesday. tracking's below. we pour every batch by hand, so we get the excitement.\"",rules:'first names only. one apology max. always include tracking. never promise a delivery date.',check:'before you answer, check: under 60 words, tracking included, no corporate phrases.'},
        answer(f){
          if(!f.role)return {kind:'ask',text:'sure. who am i writing as, and who is it to?'};
          const P=[];
          P.push(f.example?['hi jess! ','example']:['dear valued customer, ']);
          P.push(['your luna candle co. order shipped tuesday. ','role']);
          if(!f.rules)P.push(['we sincerely apologize for any inconvenience this may have caused. please allow 5 to 7 business days for delivery. ']);
          else P.push(["here's your tracking link. ",'rules']);
          P.push(f.example?['we pour every batch by hand, so we get the excitement. ','example']:['your satisfaction is our top priority. ']);
          P.push(f.example?['enjoy!','example']:['warm regards, the customer service team']);
          const n=P.map(x=>x[0]).join('').trim().split(/\s+/).length;
          return {kind:'para',parts:P,meta:f.check?'checked: '+n+' words · tracking included · no corporate phrases':n+' words · not checked'};
        }},
      update:{label:'my weekly update',extra:true,
        ex:{role:'you write my weekly update for my manager. this week i closed 2 accounts, legal is holding the abc contract, and i demo to a clinic friday.',example:'the format she loved: shipped / stuck / next. one line each.',rules:'no adjectives. use my numbers. never more than 3 lines.',check:'before you answer, check every line is under 12 words and nothing is invented.'},
        answer(f){
          if(!f.role)return {kind:'ask',text:'happy to. what happened this week, and who is it for?'};
          if(!f.example)return {kind:'para',parts:[['this week was productive and exciting! i made great progress across several key initiatives, '],['closing 2 accounts ','role'],['and continuing to drive momentum on ',null],['the abc contract, which is with legal. ','role'],["looking ahead, i'm thrilled to ",null],['demo to a clinic on friday ','role'],['and keep building strong relationships!']]};
          const L=f.rules?[['shipped','closed 2 accounts.','rules'],['stuck','abc contract is with legal.','rules'],['next','clinic demo friday.','rules']]
                         :[['shipped','closed 2 amazing new accounts!','example'],['stuck','the exciting abc contract is still with legal.','example'],['next','a big, important clinic demo friday!','example']];
          if(f.check)L.push(['check','3 lines · each under 12 words · nothing invented','check']);
          return {kind:'list',lines:L};
        }},
      own:{label:'my own task',own:true,
        ex:{role:"you're my [job]. you help me with [task] for [who].",example:'here is one i loved: [paste it]',rules:'always [x]. never [y].',check:'before you answer, check [the thing that usually goes wrong].'},
        answer(f){const n=['role','example','rules','check'].filter(k=>f[k]).length;return n?{kind:'own'}:{kind:'ask',text:"start with the job in step 1. your preview shows the playbook you're writing."};}}
    }
  },

  /* bite 5: the playbook builder */
  tool:{kind:'builder',outTitle:'your playbook',filename:'aiimo-03-my-playbook.txt',
    note:"saved on this device as you type. paste it at the top of any chat, or save it as a custom instruction.",
    presets:[
      {label:'customer replies',vals:{name:'customer replies',role:"you're customer care for my small business. you reply to customer emails as us.",example:'"hi sam! your order left tuesday. tracking\'s below. we make every piece by hand, so we get the excitement."',rules:'first names only. one apology max. always include tracking. never promise a date.',check:'under 60 words. tracking included. no corporate phrases.'}},
      {label:'weekly update',vals:{name:'weekly update',role:'you write my weekly update for my manager from the notes i paste.',example:'shipped / stuck / next. one line each.',rules:'no adjectives. use my numbers. never more than 3 lines.',check:'every line under 12 words. nothing invented.'}},
      {label:'social captions',vals:{name:'social captions',role:'you write instagram captions for my posts, in my voice.',example:'"made for slow sundays. small batch, poured by hand. link in bio."',rules:'all lowercase. no hashtags. no exclamation points. under 25 words.',check:'it sounds like me, not like a brand.'}}
    ],
    fields:[{k:'name',label:'name this playbook',placeholder:'customer replies'},{k:'role',label:'the job',placeholder:"you're my… you help me with… for…"},{k:'example',label:'one example you love',placeholder:'paste it'},{k:'rules',label:'the rules',placeholder:'always… never…'},{k:'check',label:'what to check before handing it back',placeholder:'the thing that usually goes wrong'}],
    compose(v){return ['playbook: '+(v.name||'[name it]'),'','the job: '+(v.role||'[who it is and who it serves]'),'','what good looks like:',(v.example||'[paste one example you love]'),'','the rules: '+(v.rules||'[always… never…]'),'','before you give me anything, check: '+(v.check||'[what usually goes wrong]'),'','if anything is unclear, ask me before you guess.'].join('\n');}}
};

/* bite 4: the terminal. brief your ai like a new hire and watch its instagram post change with every line.
   open mode: type anything, any time. every message updates the post. the reader decides when it's done. */
(function(E){
const clean=t=>t.replace(/^[\s"'“]+|[\s"'”]+$/g,'').trim();
const DONE=/^(that'?s it|that is it|done|perfect|looks good|love it|i'?m done|finished|all good|good)\b/i;
function brandOf(job){const m=job.match(/,\s*([^,.]+?)\s*\.?$/)||job.match(/for (?:my |our )?([^,.]+?)(?:\s+shop|\s+business|\s+brand)?\s*[,.]?$/i);return clean(m?m[1]:'my shop');}
function nounOf(job){return /dog/i.test(job)?'dog walks':/candle/i.test(job)?'candles':/coffee|cafe/i.test(job)?'coffee':/cookie|bake|bakery/i.test(job)?'cookies':'our new drop';}
/* rules: add with "no hashtags", remove with "hashtags are fine" / "use emojis" */
function ruleEdits(t,r){t=t.toLowerCase();const before=JSON.stringify(r);
  if(/lower ?case/.test(t))r.lower=1;
  if(/no hashtag|without hashtag|zero hashtag|never (use )?hashtag/.test(t))r.nohash=1;
  if(/no emoji|without emoji|zero emoji|never (use )?emoji/.test(t))r.noemoji=1;
  if(/no exclamation|no !|never (use )?exclamation/.test(t))r.noex=1;
  const m=t.match(/(?:under|less than|max(?:imum)?|no more than|at most)\s*(\d+)\s*words/);if(m)r.max=+m[1];
  if(/(hashtags? (are|is) (fine|ok|okay)|use hashtags|add hashtags|allow hashtags)/.test(t))delete r.nohash;
  if(/(emojis? (are|is) (fine|ok|okay)|use emojis|add emojis|allow emojis)/.test(t))delete r.noemoji;
  if(/(capitals? (are|is) (fine|ok)|normal case|use capitals|not lowercase)/.test(t))delete r.lower;
  if(/(any length|no word limit|longer is fine)/.test(t))delete r.max;
  return JSON.stringify(r)!==before;}
const EMO=/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2728}\u{1F56F}]️?/gu;
function caption(v){const n=v.noun||'our new drop';
  /* with an example, it writes in the shape of your example: your words, plus the habits your rules haven't removed yet */
  const ex=v.example&&v.example.replace(/(^|[.!?]\s+)([a-z])/g,(a,b,c)=>b+c.toUpperCase()).replace(/\s*link in bio\.?$/i,'');
  let c=v.example?`${ex}${/[.!?]$/.test(ex)?'':'.'} Link in bio! ${/dog/.test(n)?'🐾':'✨'} #${n.replace(/\s/g,'')} #shopsmall`
             :`✨ Elevate your everyday with ${v.brand?v.brand+"'s":'our'} amazing ${n}! 🔥 Treat yourself today because you DESERVE it! 💫 Shop now!! #${n.replace(/\s/g,'')} #selfcare #musthave #trending #shopsmall`;
  const r=v.rules||{};
  if(r.noemoji)c=c.replace(EMO,'');if(r.nohash)c=c.replace(/#\w+/g,'');if(r.noex)c=c.replace(/!+/g,'.');if(r.lower)c=c.toLowerCase();
  c=c.replace(/\s+([.,])/g,'$1').replace(/\.\./g,'.').replace(/\s{2,}/g,' ').trim();
  if(r.max&&c.split(/\s+/).length>r.max){const sents=c.match(/[^.!?]+[.!?]*/g)||[c];let out='';
    for(const x of sents){const next=(out+' '+x.trim()).trim();if(next.split(/\s+/).length>r.max)break;out=next;}
    c=out||c.split(/\s+/).slice(0,r.max).join(' ').replace(/[,]$/,'')+'.';}
  return c;}
const ORDER=['example','rules','check'];
const nextQ=v=>ORDER.find(k=>k==='rules'?!(v.rules&&Object.keys(v.rules).length):!v[k]);
const ruleText=r=>[r.lower&&'all lowercase',r.nohash&&'no hashtags',r.noemoji&&'no emojis',r.noex&&'no exclamation points',r.max&&'under '+r.max+' words'].filter(Boolean).join('. ')+(Object.keys(r).length?'.':'');
const checkText=t=>t.replace(/^(?:always check|check|make sure|before you hand it back)(?: that)?[:,]?\s*/i,'');
const ASK={example:'got it. show me one caption you love. paste it, or tap one.',
  rules:'now the rules. what should i always or never do?',
  check:'last one. what should i check before i hand it back?'};
const NOTE={job:'a job title helps. without an example, it writes like every brand on earth.',
  example:'it copied the shape of your example. shorter, calmer, more like you.',
  rules:v=>{const n=Object.keys(v.rules||{}).length;return n?'it follows '+n+' rule'+(n>1?'s':'')+'. every post, every time.':'no rules right now. it goes back to its habits.';},
  check:"now it reviews its own work before you see it. that's the playbook."};
const after='change anything: add a rule like "no emojis", drop one like "hashtags are fine", or say "new example: ___". type "that\'s it" when it\'s right.';
E.term={open:true,title:'new hire · instagram captions',previewLabel:'preview · what your ai posts',device:'post',
  placeholder:'type here',startNote:'your post shows up here.',
  ai:"hi, i'm your new hire. what's my job? one or two lines.",
  parts:[{k:'role',short:'the job',c:'#ff6fa3',why:'who it is, who it serves.'},
         {k:'example',short:'an example',c:'#e6b92e',why:'one you love. it copies the shape.'},
         {k:'rules',short:'the rules',c:'#2fc4c8',why:"your always and never. it follows them every time."},
         {k:'check',short:'a check',c:'#4fbf6a',why:'what it checks before you see anything.'}],
  chips:v=>{if(!v.job)return['you write instagram captions for my candle shop, luna candle co.','you write instagram captions for my dog walking business, walk this way.'];
    if(v.q==='example')return [/dog/.test(v.noun)?'the walk is the best part of their day. ours too.':'made for slow sundays. small batch, poured by hand. link in bio.'];
    if(v.q==='rules')return['all lowercase. no hashtags. no emojis. no exclamation points.','no hashtags. under 15 words.'];
    if(v.q==='check')return['check it sounds like me, not a brand, and that every rule was followed.'];
    return['no emojis','hashtags are fine',"that's it"];},
  lit:v=>[v.job&&'role',v.example&&'example',v.rules&&Object.keys(v.rules).length&&'rules',v.check&&'check'].filter(Boolean),
  isDone:(t,v)=>DONE.test(t.trim())&&!!v.job,
  finishSay:()=>"done. your playbook is waiting in bite 5.",
  update(t,v){const s=t.trim();
    if(!v.job){v.started=true;v.job=s;v.brand=brandOf(s);v.noun=nounOf(s);v.q=nextQ(v);
      const thin=s.split(/\s+/).length<4;
      return {changed:true,reply:(thin?"i'll start with that. more detail gets you a better hire: who i write for, what they sell. ":'')+ASK.example,note:NOTE.job};}
    const got=[];
    /* explicit edits work at any point */
    let m=s.match(/^(?:new job|the job is|your job is)[:\s]+(.+)/i)||(/^(?:you'?re my|you are my|you write)\b/i.test(s)?[s,s]:null);
    if(m){v.job=clean(m[1]);v.brand=brandOf(v.job);v.noun=nounOf(v.job);got.push('job');}
    m=s.match(/^(?:new example|example|here'?s an example|use this example|try this one)[:\s]+(.+)/i);
    if(m){v.example=clean(m[1]);got.push('example');}
    m=s.match(/^(?:check|before you hand it back|make sure|always check)[:\s]+(.+)/i);
    if(m&&v.q!=='check'){v.check=checkText(s);got.push('check');}
    if(!got.length||v.q==='rules'){const r=Object.assign({},v.rules||{});if(ruleEdits(s,r)){v.rules=r;v.ruletext=ruleText(r);got.push('rules');}}
    /* a plain answer goes to the question it just asked */
    if(v.q&&!got.includes(v.q)&&!got.length){
      if(v.q==='example'){v.example=clean(s);got.push('example');}
      else if(v.q==='check'){v.check=checkText(s);got.push('check');}
      else if(v.q==='rules')return {changed:false,reply:'give me at least one i can follow every time. like: no hashtags, or all lowercase.',note:''};}
    if(!got.length)return {changed:false,reply:"i didn't catch a change. "+after,note:''};
    const last=got[got.length-1],n=NOTE[last];
    v.q=nextQ(v);
    const reply=v.q?(last==='rules'?'noted. ':'got it. ')+ASK[v.q].replace(/^got it\. /,''):(got.includes('check')&&!v.toldDone?"that's a real playbook. ":'updated. ')+after;
    if(!v.q)v.toldDone=true;
    return {changed:true,reply,note:typeof n==='function'?n(v):n};},
  render(v,{hl,esc}){
    const handle=v.brand?v.brand.toLowerCase().replace(/[^a-z0-9]+/g,'.').replace(/^\.|\.$/g,''):'your.brand';
    const c=v.job?caption(v):'your caption shows up here.';
    const hasR=v.rules&&Object.keys(v.rules).length;
    const part=hasR?'rules':v.example?'example':v.job?'role':null;
    const r=v.rules||{},words=c.split(/\s+/).filter(Boolean).length;
    const checks=v.check?[`✓ ${words} words`,r.nohash&&'✓ no hashtags',r.noemoji&&'✓ no emojis',r.lower&&'✓ lowercase',/sound|voice|like me/i.test(v.check)&&'✓ sounds like you'].filter(Boolean):[];
    return `<div class="post-m"><header><i></i><span>${part?hl('role',handle):esc(handle)}</span></header>
      <div class="sq"><strong>${esc(v.brand||'your brand')}</strong>${checks.length?`<div class="checks">${checks.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}</div>
      <div class="acts"><i></i><i></i><i></i></div><p class="cap"><b>${esc(handle)}</b>${part?hl(part,c):esc(c)}</p></div>`;},
  prompt:v=>['playbook: instagram captions','','the job: '+(v.job||''),v.example?'\nwhat good looks like:\n'+v.example:'',v.ruletext&&Object.keys(v.rules||{}).length?'\nthe rules: '+v.ruletext:'',v.check?'\nbefore you give me anything, check: '+v.check:'','','if anything is unclear, ask me before you guess.','','first task: write 3 captions for this week.'].filter((x,i,a)=>x!==''||a[i-1]!=='').join('\n'),
  done:{title:'write the playbook once.',say:"you wouldn't hand a new hire one line and walk away. give ai the job, an example, the rules and a check. then reuse it every time.",
    rule:'save it as custom instructions, a project or a gem. same playbook, every chat.'}};
E.take={label:'your playbook',mine:'made from your playbook in bite 4',
  empty:'give your new hire a job in bite 4 first. your playbook shows up here as soon as you do.',emptyButton:'go to bite 4',
  hint:'tap a button. claude or chatgpt opens with your playbook already typed in. press send and it writes three captions. save it as a project to reuse it.'};
E.ui.b4={h2:'train it like a new hire. *write the playbook.*',say:'practice training ai once so it gets it right every time.',
  steps:["type its job in the black box below, like you'd brief a new hire.",'answer what it asks: an example you love, your rules, what to check.','change anything. type "that\'s it" when it\'s right.']};
E.ui.b5={h2:'put your playbook *to work.*',say:'your playbook from bite 4, ready for a real ai. it changes as you type up there.',hint:'same shape works for emails, updates and replies. write it once, fix it when it misses.'};
})(window.EDITION);
/* your-move lines (engine shows them in a box in each bite) */
(function(E){E.ui.b3.move='guess the number first. tap one.';})(window.EDITION);
