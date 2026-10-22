/* edition 02 · builds on simi's essay "sometimes i don't know what i'm asking yet". news checked october 18, 2026. */
window.EDITION={
  number:'02',
  date:'october 2026',
  /* open now: real opportunities with a deadline. verified oct 20, 2026 on anthropic's greenhouse posting. remove after oct 28. */
  open:[{tag:'open now · apply by oct 28',
    title:'anthropic is hiring *conceptual reasoning fellows.*',
    say:"four months inside anthropic, jan 12 to may 8, 2027. you bring expertise where answers take judgment: philosophy, cognitive science, economics, policy or law. you help claude reason through it. $117k to $167k for the four months. you need daily hands-on use of claude and claude code, plus a phd or equivalent research experience. there's a stem track too.",
    cta:{label:'apply by oct 28',href:'https://job-boards.greenhouse.io/anthropic/jobs/5447080008'},
    more:[{label:'all anthropic fellowships',href:'https://www.anthropic.com/careers/jobs?team=4002065008'}]}],
  ui:{
    cover:{sub:"food for thought, in bites. this week: what to do when you don't know what you're asking yet."},
    b1:{tag:'the build',h2:'claude writes 90% of claude code. *humans still sign off.*',say:'two cards. tap each one.',
      cards:[{small:'what they show you',title:'90% written by claude',back:"anthropic says claude writes about 90% of claude code's own code. merged pull requests more than doubled from june to september. reverts fell by more than 40%."},
             {small:'what actually changed',title:'the review',back:"every change gets sorted by risk. docs and copy ship after automated checks. ordinary changes need one person. the riskiest code needs two. an agent's approval never counts as a human's."}]},
    b2:{tag:'the number',h2:'forward deployed engineer jobs in india grew *19x* in a year.',ask:'would you take the job that sits next to the customer?',poll:[['yes',"yes. that's the fun part"],['no','no. give me the backend']]},
    b3:{tag:'the culture',h2:'people are using claude code to make smart tvs *dumb again.*'},
    b4:{h2:"when you don't know what you're asking, *let it interview you.*",say:'four steps. after each one, the preview shows how the answer changes. pick a task, or bring your own.'},
    b5:{h2:'start your next chat *with questions.*',say:"pick what you need help with. this builds the opening message that makes ai interview you first. paste it into chatgpt, claude or gemini.",hint:'same lesson as bite 4: you don\'t need the perfect prompt. you need the right questions.'}
  },
  sections:[
    {type:'teardown',
     take:"the job didn't disappear. it moved to judgment: which change can break something, and who should check it. that's translator work.",
     sources:[{label:'anthropic · solving code review · oct 15',href:'https://claude.dev/blog/solving-code-review-at-anthropic/'}]},
    {type:'number',
     dek:"that's indeed's data on job posts, june 2025 to june 2026. growth cooled to about 16x in july and 6x in august. still a lot of companies asking for the same thing.",
     quote:'"companies want engineers who can sit with a customer, unpack a real problem and make the technology work in practice."',by:'sashi kumar · indeed india, via analytics india magazine · oct 14',
     take:"the scarce skill isn't building the model. it's making it work for one real customer. you can practice that.",
     sources:[{label:'analytics india magazine',href:'https://analyticsindiamag.com/ai-news/forward-deployed-engineer-job-postings-in-india-grew-nearly-19x-in-a-year-report'},{label:'deccan herald',href:'https://www.deccanherald.com/business/fde-postings-jump-19-fold-in-india-as-companies-want-engineers-next-to-customers-4182796'}]},
    {type:'quote',
     chipsAsk:'tap to see what they built',
     chips:[{label:'dumbtv',text:'an open project you point an ai agent at. tested on fire tv and on android and google tv sets from sony, tcl, hisense and more.'},
            {label:'cleanyourtv',text:'strips bloatware over wi-fi and swaps in a cleaner home screen. no root needed. its maker says a few thousand people ran his prompt in two days.'},
            {label:'the catch',text:"agents can switch off the wrong system app. one person bricked a tv. a plain \"hack my tv\" sometimes got declined. detailed prompts worked."}],
     quote:'"your tv should do what you paid for: your apps, your hdmi inputs, and nothing else."',by:'muzzammil yasin sabuwala · dumbtv, via techcrunch · oct 19',
     fact:'one person disabled 25 bloat apps and swapped a 192 mb stock launcher for an 83 mb custom one.',
     take:'this is vibe coding outside a demo. a normal annoyance, fixed by a normal person. the vague prompt got refused. the detailed one worked. bite 4 is how you get there.',
     sources:[{label:'techcrunch · oct 19',href:'https://techcrunch.com/2026/10/19/people-are-using-ai-to-make-their-smart-tvs-dumb-again/'}]},
    {type:'aside',
     paragraphs:['sales was deployment the whole time.'],
     essay:{title:'the deployment gap',label:'read the essay: the deployment gap',href:'https://aiimo.substack.com/p/the-deployment-gap'},
     sig:'simi'},
    {type:'signoff',
     lede:'i build with ai every day and tell you exactly what i think of it. brilliant gets called brilliant. overhyped gets called out.',
     card:{name:'simi bharaj',handle:'@_simisim',links:{instagram:'https://www.instagram.com/_simisim/',linkedin:'https://www.linkedin.com/in/simibharaj',github:'https://github.com/simibharaj',substack:'https://aiimo.substack.com'}},
     subscribe:{label:'get the next edition',href:'https://aiimo.substack.com/subscribe'},
     dm:{label:'dm me what you asked',href:'https://ig.me/m/_simisim'},
     closing:'next edition: you train a new hire. why not your ai?'}
  ],

  /* bite 4: let it interview you */
  lab:{
    problemKey:null,
    parts:[
      {k:'ask',short:'ask messy',c:'#ff6fa3',title:'ask the messy version.',why:"say what you want, even half formed. you don't need the perfect prompt yet."},
      {k:'interview',short:'make it ask',c:'#ffb30f',title:'tell it to interview you.',why:'ask for questions first, one at a time. it finds the gaps you didn\'t know were there.'},
      {k:'answer',short:'answer honestly',c:'#2fc4c8',title:"answer like you'd text a friend.",why:'short, honest answers. this is where your real context comes out.'},
      {k:'go',short:'then go',c:'#4fbf6a',title:'tell it when to start.',why:'say when you have answered enough. now it commits to one answer built on yours.'}
    ],
    notes:{none:"start with the messy version. it doesn't need to be good yet.",
      ask:"a vague ask gets a listicle. it isn't wrong. it just isn't yours.",
      interview:"now it's asking instead of guessing. those questions are the context you didn't know you needed.",
      answer:'your answers became the brief. the highlighted parts came from you.',
      go:'now it commits. one answer, built on yours.'},
    takeaway:{title:'let it interview you.',say:"when you don't know what you're asking yet, don't fake a perfect prompt. ask it to ask you. three questions in, you'll know exactly what you want.",
      hint:'add this line to any prompt: before you answer, ask me 3 questions, one at a time.',extra:'build my opening message'},
    ownText:'a real ai would now start asking you questions.',
    ownNote:'each color is one move. aim for all four.',
    scenarios:{
      side:{label:'start a side project',extra:true,
        ex:{ask:"i want to start a side project but i don't know what.",interview:'before you answer, ask me 3 questions, one at a time.',answer:'about 4 hours a week. i want a portfolio, not money. friends always ask me to fix their resumes.',go:"that's enough. give me one idea and a 4-week plan."},
        answer(f){
          if(!f.ask)return {kind:'ask',text:'happy to help. what would you like to work on?'};
          if(!f.interview)return {kind:'para',parts:[['here are 10 popular side projects: start a blog, sell on etsy, learn to code, launch a podcast, try dropshipping, freelance on fiverr, start a youtube channel, write an ebook, flip furniture, teach online. pick the one that excites you most!']]};
          if(!f.answer)return {kind:'para',parts:[['before i suggest anything: ','interview'],['1. how many hours a week do you really have? ','interview'],['2. do you want money, fun or a portfolio? ','interview'],['3. what do people already ask you for help with?','interview']]};
          if(!f.go)return {kind:'para',parts:[['got it. ',null],['4 hours a week, ','answer'],['a portfolio, not money, ','answer'],['and people already trust you with ','answer'],['their resumes. ','answer'],['one more: do you want to stay anonymous or put your name on it?','interview']]};
          return {kind:'list',lines:[['idea','a resume teardown series. one anonymous resume a week, before and after.','answer'],['week 1','pick 3 friends\' resumes. get permission. post the first teardown.','go'],['week 2','turn your edits into a 5-point checklist.','go'],['week 3','post teardown two. share the checklist.','go'],['week 4','collect your three best before-and-afters into one page. that\'s your portfolio.','go']]};
        }},
      gift:{label:'pick a gift',
        ex:{ask:'help me pick a birthday gift for my dad.',interview:'ask me 3 questions about him first, one at a time.',answer:'he restores old film cameras. under $100. he lost his favorite leather strap last month.',go:'pick one and tell me where to look.'},
        answer(f){
          if(!f.ask)return {kind:'ask',text:'sure. who is the gift for?'};
          if(!f.interview)return {kind:'para',parts:[['popular gifts for dads: a watch, a grill set, a leather wallet, golf balls, a smart speaker, a whiskey decanter. you can\'t go wrong with a classic!']]};
          if(!f.answer)return {kind:'para',parts:[['tell me a little first: ','interview'],['what does he do on a free saturday? ','interview'],["what's your budget? ",'interview'],["has he mentioned anything he lost or wants?",'interview']]};
          if(!f.go)return {kind:'para',parts:[['that narrows it a lot. ',null],['film cameras ','answer'],['and ','answer'],['a lost leather strap ','answer'],['point the same way. want me to pick one?',null]]};
          return {kind:'list',lines:[['the gift','a hand-stitched leather camera strap.','answer'],['budget','under $100.','answer'],['why it lands','it replaces the one he lost, for the hobby he loves.','answer'],['where','camera specialty shops and independent leather makers.','go']]};
        }},
      own:{label:'my own task',own:true,
        ex:{ask:'i want to change careers but i don\'t know to what.',interview:'before you answer, ask me 5 questions, one at a time.',answer:'(answer each question as it comes)',go:'when you have enough, tell me what you heard, then suggest 2 directions.'},
        answer(f){const n=['ask','interview','answer','go'].filter(k=>f[k]).length;return n?{kind:'own'}:{kind:'ask',text:"type your own messy ask in step 1. the preview shows the conversation you're setting up."};}}
    }
  },

  /* bite 5: the opening message builder */
  tool:{kind:'builder',outTitle:'your opening message',filename:'aiimo-02-opening-message.txt',
    note:"saved on this device as you type. it's yours to reuse.",
    presets:[
      {label:'a decision',vals:{task:'help me decide whether to take a new job offer.',matters:'money matters, but so does who i learn from.',count:'4',end:'tell me what you heard, then give me your honest pick.'}},
      {label:'a plan',vals:{task:'help me plan a weekend trip.',matters:'i hate rushing. good food matters more than sights.',count:'3',end:'give me a simple 2-day plan.'}},
      {label:'a hard message',vals:{task:'help me write a message to a friend i let down.',matters:'i want to own it without groveling.',count:'3',end:'draft it under 80 words. sound like me.'}}
    ],
    fields:[{k:'task',label:'what you need help with',placeholder:'help me…'},{k:'matters',label:'what matters to you (optional)',placeholder:'the one thing that matters most'},{k:'count',label:'how many questions',placeholder:'3'},{k:'end',label:'what you want at the end',placeholder:'one recommendation. a short plan. a draft.'}],
    compose(v){const n=(v.count||'3').replace(/[^0-9]/g,'')||'3';
      return [v.task||'[what you need help with]',v.matters?'what matters to me: '+v.matters:'',"i don't know exactly what i'm asking yet.",'before you answer, ask me '+n+' questions, one at a time. wait for my answer each time.','when you have enough, '+(v.end||'tell me what you understood, then give me one recommendation.')].filter(Boolean).join('\n');}}
};

/* bite 4: the terminal. type a messy idea, tell it to interview you, watch a real site take shape.
   open mode: type anything, any time. every message updates the site. the reader decides when it's done. */
(function(E){
const COLORS={sage:'#8fae8b',cream:'#f5efe3',pink:'#f08db5',blush:'#f6c9d6',blue:'#4f7fe0',navy:'#1f2a44',green:'#3f9d6a',gold:'#c9a86a',black:'#111114',white:'#ffffff',red:'#e5484d',orange:'#ff8a3d',peach:'#ffb48f',lavender:'#b9a7f0',purple:'#8a6cd8',yellow:'#f2cb4d',teal:'#2fa4a8',brown:'#7a5a44',beige:'#e9dcc6',grey:'#9a9aa2',gray:'#9a9aa2'};
const BGS={cream:1,white:1,black:1,navy:1,blush:1,beige:1};
const THEMES={soft:{bg:'#f6f1ea',fg:'#3b3833',ac:'#8fae8b'},bold:{bg:'#121214',fg:'#ffffff',ac:'#ff5a36'},luxe:{bg:'#0f0f10',fg:'#f1e7d6',ac:'#c9a86a'}};
const VIBE=/\b(bold|loud|bright|fun|punchy|energetic|luxe|lux|luxury|fancy|elegant|premium|dark|moody|rich|soft|calm|clean|minimal|gentle|cozy|warm|airy|light)\b/i;
const COLOR_RE=new RegExp('\\b('+Object.keys(COLORS).join('|')+')\\b','i');
const DONE=/^(that'?s it|that is it|done|perfect|looks good|love it|i'?m done|finished|all good|good)\b/i;
const clean=(t,re)=>t.replace(re||/^$/,'').replace(/^[\s"'“]+|[\s."'”!]+$/g,'').trim();
function vibe(t){t=t.toLowerCase();let key=/bold|loud|bright|fun|punch|energ/.test(t)?'bold':/luxe|lux|fancy|elegant|premium|dark|moody|rich/.test(t)?'luxe':/soft|calm|clean|minimal|gentle|cozy|warm|light|airy/.test(t)?'soft':null;
  const th=Object.assign({},THEMES[key||'soft']);const found=Object.keys(COLORS).filter(c=>new RegExp('\\b'+c+'\\b').test(t));
  found.forEach(c=>{if(BGS[c]){th.bg=COLORS[c];th.fg=(c==='black'||c==='navy')?'#f4f1ea':'#2f2c28';}else th.ac=COLORS[c];});
  const cols=found.length>1?found.slice(0,-1).join(', ')+' and '+found[found.length-1]:found.join('');
  return {key:key||(found.length?'custom':'soft'),th,label:[key,cols].filter(Boolean).join(', ')||t};}
function noun(what){const m=what.match(/(?:for|about)\s+(?:my|our|a|an|the)?\s*([^.,!]+)/i);return clean(m?m[1]:what.replace(/^(?:i want |i need |make |build |help me make )?(?:me )?(?:a |an )?(?:website|site|page|landing page)?/i,''))||'your thing';}
const dog=v=>/dog|pet|walk/i.test(v.what||'');
const ORDER=['name','who','vibe'];
const nextQ=v=>ORDER.find(k=>!v[k]);
const answered=v=>ORDER.filter(k=>v[k]).length;
const qn=v=>`question ${(v.qn||0)+1} of ${v.qt||3}: `;
const ASK={name:v=>qn(v)+'what is it called?',
  who:v=>qn(v)+`who is ${v.name||'it'} for?`,
  vibe:v=>qn(v)+'what should it feel like? soft, bold or luxe? or name a couple of colors.'};
const NOTE={hero:v=>'drew '+v.heroArt+' as the main picture.',size:v=>v.big?'bigger headline.':'smaller headline.',gallery:v=>v.lastPic?'drew a '+v.lastPic+' and added it to the gallery.':'added a gallery of drawings for your '+(v.noun||'site')+'.',reviews:'added a reviews section. real reviews go there.',prices:'added a prices section.',contact:'added a contact section.',about:'added an about section.',removed:'removed it.',extra:'added what you asked for, in your words.',button:'new button text.',name:'your name went straight onto the page.',who:'now the headline talks to someone specific.',vibe:v=>'it took your words literally: '+v.vibe.label+'.'};
/* explicit edits work at any point: "call it x", "make it bold", "black and gold", "it's for x", "the button should say x" */
function edits(t,v,useVibe){const got=[];
  if(/\b(font|text|headline|title|words|letters)\b/i.test(t)&&/\b(bigger|larger|huge|smaller|tiny)\b/i.test(t)){v.big=/bigger|larger|huge/i.test(t);got.push('size');}
  let m=t.match(/(?:call(?:ed)? it|name(?:d)? it|rename it(?: to)?|change the name to|the name is|it'?s called|name:)\s+["“]?([^."”!,]+)/i);
  if(m){v.name=clean(m[1]);got.push('name');}
  m=t.match(/(?:button|cta)[^:]*?(?:say|read|says|reads|to|:)\s*["'“]?([^."'”!]+)/i);
  if(m){v.cta=clean(m[1]);got.push('button');}
  m=t.match(/(?:it'?s for|made for|for people who|audience is|aimed at|target is)\s+([^.!]+)/i);
  if(m){v.who=clean(m[0].replace(/^(?:it'?s for|made for|audience is|aimed at|target is)\s+/i,''));got.push('who');}
  if(useVibe!==false&&(VIBE.test(t)||COLOR_RE.test(t))){const nv=vibe(t);if(v.vibe&&!VIBE.test(t)){nv.key=v.vibe.key==='custom'?'custom':v.vibe.key;nv.th=Object.assign({},v.vibe.th);t.toLowerCase().match(new RegExp(COLOR_RE.source,'gi')).forEach(c=>{c=c.toLowerCase();if(BGS[c]){nv.th.bg=COLORS[c];nv.th.fg=(c==='black'||c==='navy')?'#f4f1ea':'#2f2c28';}else nv.th.ac=COLORS[c];});nv.label=(v.vibe.key!=='custom'?v.vibe.key+', ':'')+nv.label;}
    v.vibe=nv;got.push('vibe');}
  return got;}
function answer(t,v,q){
  if(q==='name')v.name=clean(t,/^(?:it'?s |its )?(?:called |named )?(?:the name is )?/i)||t;
  if(q==='who')v.who=clean(t,/^(?:it'?s |its |mostly |mainly )?(?:for )?/i)||t;
  if(q==='vibe')v.vibe=vibe(t);}
/* sections you can ask for at any point: "add pictures", "add reviews", "remove the prices" */
const ADD=[['gallery',/\b(pic|pics|picture|pictures|photo|photos|image|images|gallery)\b/i],['reviews',/\b(review|reviews|testimonial|testimonials)\b/i],
  ['prices',/\b(price|prices|pricing|menu|rates?)\b/i],['contact',/\b(contact|email|phone|address|location|hours|map)\b/i],['about',/\b(about|our story|story|bio)\b/i]];
const IMP=/\b(add|put|show|include|need|want|give|make|change|remove|delete|take out|get rid of|more|less|bigger|smaller|use)\b/i;
const ART=()=>window.AiimoArt;
function pics(t,v){const AA=ART();if(!AA)return [];const rm=/\b(remove|delete|no more|take out|get rid of|without)\b/i.test(t);
  const asked=AA.wanted(t)||(/\b(add|put|draw|show|include|want|need|make|change|swap|use|turn|set)\b/i.test(t)&&!ADD.slice(1).some(([,re])=>re.test(t))?AA.find(t.replace(/\b(pictures?|photos?|images?|gallery|pics?)\b/ig,'')):null);
  const isPic=ADD[0][1].test(t);
  if(rm&&isPic){if(v.sec&&v.sec.gallery){delete v.sec.gallery;v.pics=[];return ['removed'];}return [];}
  if(asked&&/\b(main|hero|top|header|first|big)\b/i.test(t)){v.heroArt=asked;v.last='hero';return ['hero'];}
  if(asked||isPic){v.sec=v.sec||{};if(!v.sec.gallery)v.sec.gallery=(v.secN=(v.secN||0)+1);if(asked)v.pics=(v.pics||[]).concat(asked);v.last='gallery';v.lastPic=asked||null;return ['gallery'];}
  return [];}
function adds(t,v){const got=pics(t,v);if(got.length)return got;const rm=/\b(remove|delete|no more|take out|get rid of|without)\b/i.test(t);
  for(const [k,re] of ADD)if(re.test(t)){v.sec=v.sec||{};if(rm){if(v.sec[k]){delete v.sec[k];got.push('removed');}}else{if(!v.sec[k])v.sec[k]=(v.secN=(v.secN||0)+1);v.last=k;got.push(k);}}
  return got;}
const BUILD=/\b(build it|build|go ahead|let'?s go|do it|ship it|i'?m ready|ready)\b|^go\b/i;
const after="change anything. try \"add pictures\", \"make it bold\" or \"the button should say ___\". type \"that's it\" when it's right.";
E.term={open:true,title:'the interview · build a website',previewLabel:'preview · the site it builds',device:'browser',
  placeholder:'type here',startNote:'your site shows up here.',
  ai:"what do you want to build? say it messy. half an idea is fine.",
  parts:[{k:'ask',short:'ask messy',c:'#ff6fa3',why:'say it half formed. no perfect prompt needed.'},
         {k:'interview',short:'make it ask',c:'#ffb30f',why:'tell it to ask you questions first.'},
         {k:'answer',short:'answer',c:'#2fc4c8',why:'short, honest answers. this is your real context.'},
         {k:'go',short:'then go',c:'#4fbf6a',why:'tell it when to build. it commits to your answers.'}],
  chips:v=>{if(!v.started)return['a website for my candle business','a page for my dog walking side hustle'];
    if(!v.interview&&!v.go)return['ask me 3 questions first, one at a time'];
    if(v.q==='name')return dog(v)?['walk this way','tampa tails']:['luna candle co.','slow burn studio'];
    if(v.q==='who')return dog(v)?['busy dog owners downtown','people who travel for work']:['people who host dinner parties','anyone who wants a slow sunday'];
    if(v.q==='vibe')return['soft. sage and cream','bold. black and orange','luxe. black and gold'];
    if(!v.go)return[dog(v)?'build it. the button should say book a walk.':'build it. the button should say book a tasting.'];
    return['add pictures','add a picture of a cake','make it bold. black and orange','add reviews',"that's it"];},
  lit:v=>[v.what&&'ask',v.interview&&'interview',(v.name||v.who||v.vibe)&&'answer',v.go&&'go'].filter(Boolean),
  isDone:(t,v)=>DONE.test(t.trim())&&!!v.go,
  finishSay:()=>"done. your opening message is waiting in bite 5.",
  update(t,v){
    if(!v.started){v.started=true;v.what=clean(t);v.noun=noun(t);edits(t.replace(/^.*?\b(for|about)\b[^.]*/i,''),v,true);
      return {changed:true,reply:"here's my guess. it's generic because i had to guess. want it to be yours? tell me to ask you questions first.",note:"a vague ask gets a template. it isn't wrong. it just isn't yours."};}
    if(!v.interview&&!v.go&&/\b(ask|question|questions|interview|quiz)\b/i.test(t)){v.interview=true;v.q=nextQ(v);v.qn=0;v.qt=ORDER.filter(k=>!v[k]).length;
      return {changed:false,reply:"love that. i'll stop guessing. "+(v.q?ASK[v.q](v):"actually, you've told me enough. tell me to build it."),note:"nothing changed yet. that's the point. it stopped guessing."};}
    const wantsBuild=!v.go&&BUILD.test(t);
    const shortBuild=wantsBuild&&t.trim().split(/\s+/).length<6;
    /* while a question is open, a plain answer goes to that question. "call it x" style edits still work. */
    v.last=null;
    const got=edits(t,v,!v.q);
    if(!/button|cta/i.test(t)&&(!v.q||IMP.test(t)))got.push(...adds(t,v));
    if(v.q&&!got.length&&!shortBuild){answer(t,v,v.q);got.push(v.q);v.qn=(v.qn||0)+1;}
    if(wantsBuild){v.go=true;v.q=null;if(!v.cta)v.cta=dog(v)?'book a walk':'get in touch';
      return {changed:true,reply:"built. every highlighted piece came from you. "+after,note:'now it commits. every highlighted piece came from you.'};}
    if(!got.length){
      if(!v.interview&&!v.go&&!IMP.test(t))return {changed:false,reply:"i can keep guessing, or you can tell me to ask you questions first. try: ask me 3 questions first.",note:''};
      /* anything else still lands on the page, in their words */
      v.extra=(v.extra||[]).concat(clean(t));v.sec=v.sec||{};v.sec['x'+v.extra.length]=(v.secN=(v.secN||0)+1);v.last='x'+v.extra.length;got.push('extra');}
    const last=got[got.length-1];const n=NOTE[last];
    const said=typeof n==='function'?n(v):(n||'updated.');
    if(v.go)return {changed:true,reply:said+' '+after,note:said};
    v.q=v.interview?nextQ(v):null;
    const reply=v.q?'got it. '+ASK[v.q](v):v.interview?"that's enough for me. tell me to build it, and add anything i missed.":"updated. want it to be yours? tell me to ask you questions first.";
    return {changed:true,reply,note:typeof n==='function'?n(v):(n||'')};},
  render(v,{hl,esc}){
    const AA=window.AiimoArt;
    const th=v.vibe?v.vibe.th:{bg:'#f5f5f7',fg:'#3a3a40',ac:'#a9a9b3'},st=`--bg:${th.bg};--fg:${th.fg};--ac:${th.ac}`;
    const P={a:th.ac,t:th.ac};
    const base=(AA&&AA.find((v.what||'')+' '+(v.noun||'')))||'sparkle';
    const art=k=>AA?AA.draw(k,P):'';
    const url=(v.name?v.name.toLowerCase().replace(/[^a-z0-9]+/g,''):'your-site')+'.com';
    const chrome=`<div class="bw-chrome"><span class="bw-dots"><i></i><i></i><i></i></span><span class="bw-url">${esc(url)}</span></div>`;
    if(!v.what)return `<div class="bw">${chrome}<div class="pg generic"><nav><b>logo</b><span class="links"><i></i><i></i><i></i></span></nav><section class="hero"><div><h4>your site goes here.</h4><p>type an idea and watch it get built.</p></div><div class="ph-art"></div></section></div></div>`;
    const generic=!v.name&&!v.vibe;
    const name=v.name?hl('answer',v.name):'logo';
    const h=v.who&&v.name?`${hl('answer',v.name)}. made for ${hl('answer',v.who)}.`:v.name?`welcome to ${hl('answer',v.name)}.`:v.who?`made for ${hl('answer',v.who)}.`:'welcome to our website.';
    const p=v.name||v.who?`${hl('ask',v.noun)}${v.who?', for the ones who notice the details.':', made with care.'}`:`we offer high quality ${hl('ask',v.noun)} for everyone. your satisfaction is our priority.`;
    const cta=v.cta?hl('go',v.cta):'learn more';
    const links=['shop','about',v.sec&&v.sec.reviews?'reviews':'faq','contact'];
    const heroArt=generic?'<div class="ph-art"></div>':`<div class="hero-art${v.last==='hero'?' new':''}">${art(v.heroArt||base)}</div>`;
    const picks=[...new Set([...(v.pics||[]),...((AA&&AA.set(base))||[])])].slice(0,Math.max(4,(v.pics||[]).length));
    const SEC={
      gallery:()=>`<h5>gallery</h5><div class="gal">${picks.map(k=>`<figure>${art(k)}<figcaption>${esc(k==='icecream'?'ice cream':k)}</figcaption></figure>`).join('')}</div>`,
      reviews:()=>`<h5>what people say</h5><div class="rev">${[1,2].map(()=>`<div><span class="stars">★★★★★</span><p>a real review from a customer goes here.</p><small>a happy customer</small></div>`).join('')}</div>`,
      prices:()=>`<h5>prices</h5><div class="price">${[v.noun||'the classic','gift set','custom order'].map(x=>`<p><span>${esc(x)}</span><b>$ —</b></p>`).join('')}</div>`,
      contact:()=>`<h5>say hi</h5><div class="contact"><div>${art('pin')}<span>visit</span></div><div>${art('chat')}<span>message</span></div><div>${art('calendar')}<span>${esc(v.cta||'book')}</span></div></div>`,
      about:()=>`<h5>about ${esc(v.name||'us')}</h5><div class="about">${art(base)}<p>${v.who?'made for '+esc(v.who)+'. ':''}the story behind ${esc(v.name||'it')} goes here.</p></div>`};
    const secs=Object.entries(v.sec||{}).sort((a,b)=>a[1]-b[1]).map(([k])=>{const body=k[0]==='x'?`<h5>you asked for</h5><p class="ask">${hl('go',v.extra[+k.slice(1)-1])}</p>`:SEC[k]();return `<section class="blk ${k[0]==='x'?'extra':k}${v.last===k?' new':''}">${body}</section>`;}).join('');
    const tiles=v.go?`<section class="blk tiles"><div><small>who it's for</small><b>${hl('answer',v.who||'you')}</b></div><div><small>${esc(v.cta)}</small><b>takes 30 seconds</b></div></section>`:'';
    return `<div class="bw">${chrome}<div class="pg ${v.vibe?v.vibe.key:'generic'}${v.big?' big':''}" style="${st}">
      <nav><b>${name}</b><span class="links">${links.map(l=>`<span>${l}</span>`).join('')}</span><span class="cta sm">${cta}</span></nav>
      <section class="hero"><div><h4>${h}</h4><p>${p}</p><span class="cta">${cta}</span></div>${heroArt}</section>
      ${tiles}${secs}
      <footer>© ${esc(v.name||'your site')} · ${v.go?'built from your answers':'draft'}</footer></div></div>`;},
  prompt:v=>{const known=[v.name&&`it's called ${v.name}`,v.who&&`it's for ${v.who}`,v.vibe&&`it should feel ${v.vibe.label}`,v.cta&&`the main button says ${v.cta}`,
      v.sec&&Object.keys(v.sec).filter(k=>k[0]!=='x').length&&`include ${Object.keys(v.sec).filter(k=>k[0]!=='x').map(k=>({gallery:'a photo gallery',reviews:'reviews',prices:'prices',contact:'contact info',about:'an about section'}[k])).join(', ')}`,
      v.extra&&v.extra.length&&`also: ${v.extra.join('; ')}`].filter(Boolean);
    return [`${v.what||'i want to build a website'}.`,"i don't know exactly what i want yet.",known.length?`what i know so far: ${known.join('. ')}.`:'',
      known.length?"before you build anything, ask me what's still missing, one question at a time. wait for my answer each time.":'before you build anything, ask me 3 questions, one at a time. wait for my answer each time.',
      'when you have enough, build it as a single page i can open and share.'].filter(Boolean).join('\n');},
  done:{title:'let it interview you.',say:"you didn't write a perfect prompt. you answered three questions. that's how you get something that's actually yours.",
    rule:'works anywhere: before you answer, ask me 3 questions, one at a time.'}};
E.take={label:'your opening message',mine:'made from your idea in bite 4',
  empty:'type an idea in bite 4 first. your opening message shows up here as soon as you do.',emptyButton:'go to bite 4',
  hint:'tap a button. claude or chatgpt opens with this already typed in. press send, answer its questions, and it builds the real page.'};
E.ui.b4={h2:"build a website without a perfect prompt. *let it interview you.*",say:"practice getting what you want when you don't know what to ask yet.",
  steps:['type what you want to build in the black box below. messy is fine.','type "ask me questions first." then answer each one.','type "build it." change anything after. type "that\'s it" when it\'s right.']};
E.ui.b5={h2:'now build *the real one.*',say:'your idea from bite 4 just became an opening message for a real ai. it changes as you type up there.',hint:"same skill, any task: a plan, a decision, a hard message. let it ask first."};
})(window.EDITION);
/* your-move lines (engine shows them in a box in each bite) */
(function(E){E.ui.b1.move='tap each card to flip it.';E.ui.b3.move='tap each one to see what they built.';})(window.EDITION);
