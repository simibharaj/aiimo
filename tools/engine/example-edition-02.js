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

/* bite 4: a real interview. a vague ask gets a generic draft. then the ai interviews you, one question at a time,
   and the site gets better with every detail. autofill gives a detailed answer, so autofill builds a polished site.
   short answers build a thin site on purpose: the empty spots show what detail buys you. */
(function(E){
const COLORS={sage:'#8fae8b',cream:'#f5efe3',pink:'#f08db5',blush:'#f6c9d6',blue:'#4f7fe0',navy:'#1f2a44',green:'#3f9d6a',gold:'#c9a86a',black:'#111114',white:'#ffffff',red:'#e5484d',orange:'#ff8a3d',peach:'#ffb48f',lavender:'#b9a7f0',purple:'#8a6cd8',yellow:'#f2cb4d',teal:'#2fa4a8',brown:'#7a5a44',beige:'#e9dcc6',grey:'#9a9aa2',gray:'#9a9aa2'};
const BGS={cream:1,white:1,black:1,navy:1,blush:1,beige:1};
const THEMES={soft:{bg:'#f6f1ea',fg:'#3b3833',ac:'#8fae8b'},bold:{bg:'#121214',fg:'#ffffff',ac:'#ff5a36'},luxe:{bg:'#0f0f10',fg:'#f1e7d6',ac:'#c9a86a'},warm:{bg:'#fbf3ea',fg:'#3d2f27',ac:'#d9895b'},bright:{bg:'#fff8ef',fg:'#2b2b33',ac:'#ff8a3d'}};
const DONE=/^(that'?s it|that is it|done|i'?m done|perfect|looks good|love it|finished|all good)\b/i;
const clean=(t,re)=>String(t||'').replace(re||/^$/,'').replace(/^[\s"'“]+|[\s."'”!]+$/g,'').trim();
const words=t=>String(t||'').trim().split(/\s+/).filter(Boolean).length;
function vibe(t){t=t.toLowerCase();let key=/bold|loud|bright|fun|punch|energ|friendly/.test(t)?(/friendly|fun/.test(t)?'bright':'bold'):/luxe|lux|fancy|elegant|premium|dark|moody|rich/.test(t)?'luxe':/warm|cozy/.test(t)?'warm':/soft|calm|clean|minimal|gentle|light|airy/.test(t)?'soft':null;
  const th=Object.assign({},THEMES[key||'soft']);const found=Object.keys(COLORS).filter(c=>new RegExp('\\b'+c+'\\b').test(t));
  found.forEach(c=>{if(BGS[c]){th.bg=COLORS[c];th.fg=(c==='black'||c==='navy')?'#f4f1ea':'#2f2c28';}else th.ac=COLORS[c];});
  const cols=found.length>1?found.slice(0,-1).join(', ')+' and '+found[found.length-1]:found.join('');
  return {key:key||(found.length?'custom':'soft'),th,label:[key,cols].filter(Boolean).join(', ')||t};}
function noun(what){const m=what.match(/(?:for|about)\s+(?:my|our|a|an|the)?\s*([^.,!]+)/i);return clean(m?m[1]:what.replace(/^(?:i want |i need |make |build |help me make )?(?:me )?(?:a |an )?(?:website|site|page|landing page)?\s*/i,''))||'your business';}
const kind=v=>/dog|pet|walk|puppy/i.test(v.what||'')?'dog':/candle|wax/i.test(v.what||'')?'candle':'any';
/* the autofill answers: detailed on purpose */
const FILL={
  candle:{start:'a website for my candle business',q1:'luna candle co. hand-poured soy candles, made in small batches in tampa.',q2:'people who host dinner parties and want their home to smell like a slow sunday.',q3:'every scent is named after a tampa neighborhood, and each candle burns for 60 hours.',q4:'warm and calm. sage and cream. the button should say shop the collection.'},
  dog:{start:'a page for my dog walking side hustle',q1:'walk this way. private dog walks and puppy check-ins around downtown tampa.',q2:'busy owners who work long days and want someone their dog actually loves.',q3:'solo walks only, a photo after every visit, and the same walker every time.',q4:'bright and friendly. orange and cream. the button should say book a walk.'},
  any:{q1:v=>`golden hour studio. small-batch ${v.noun} made by hand in tampa.`,q2:()=>'locals who care where things come from and like knowing the maker.',q3:()=>'everything is made to order, and we answer every message ourselves.',q4:()=>'warm and soft. peach and cream. the button should say get in touch.'}};
const fill=(v,q)=>{const f=FILL[kind(v)][q];return typeof f==='function'?f(v):f;};
const Q={q1:"question 1 of 4. what's it called, and what exactly do you sell?",
  q2:v=>`question 2 of 4. who is ${v.name||'it'} for? describe your favorite customer.`,
  q3:"question 3 of 4. what makes yours different from everyone else's?",
  q4:"question 4 of 4. how should it feel, and what's the one thing a visitor should do?"};
const ORDER=['q1','q2','q3','q4'];
const THIN="a short answer makes a short site. add a detail anytime, or keep going.";
function readQ(q,t,v){t=clean(t);
  if(q==='q1'){const m=t.match(/^([^.,:;!]{1,40})[.,:;!]\s*(.+)$/);if(m&&words(m[1])<=5){v.name=clean(m[1]);v.product=clean(m[2]);}else if(words(t)<=4){v.name=t;v.product=null;}else{v.name=t.split(/\s+/).slice(0,3).join(' ');v.product=t;}}
  if(q==='q2')v.who=clean(t,/^(?:it'?s |its |mostly |mainly )?(?:for )?/i);
  if(q==='q3')v.diff=t;
  if(q==='q4'){v.vibe=vibe(t);const m=t.match(/(?:button|cta)[^:]*?(?:say|read|says|reads|be|:)\s*["'“]?([^."'”!]+)/i)||t.match(/(?:visitors?|people|they)\s+should\s+([^.!]+)/i);v.cta=m?clean(m[1]):(kind(v)==='dog'?'book a walk':kind(v)==='candle'?'shop now':'get in touch');}
  v.thin=v.thin||{};v.thin[q]=words(t)<5;}
/* edits after it's built (or any time): "call it x", "make it bold", "black and gold", "the button should say x", "add pictures of a cake", "add reviews" */
const SEC=[['reviews',/\b(review|reviews|testimonial|testimonials)\b/i],['prices',/\b(price|prices|pricing|menu)\b/i],['contact',/\b(contact|email|phone|address|location|hours|map)\b/i],['faq',/\b(faq|questions)\b/i]];
function edits(t,v){const got=[];const AA=window.AiimoArt;const rm=/\b(remove|delete|no more|take out|get rid of|without)\b/i.test(t);
  let m=t.match(/(?:call(?:ed)? it|name(?:d)? it|rename it(?: to)?|change the name to|the name is)\s+["“]?([^."”!,]+)/i);if(m){v.name=clean(m[1]);got.push('renamed it to '+v.name+'.');}
  m=t.match(/(?:button|cta)[^:]*?(?:say|read|says|reads|to|:)\s*["'“]?([^."'”!]+)/i);if(m){v.cta=clean(m[1]);got.push('the button now says '+v.cta+'.');}
  if(/\b(bold|loud|bright|fun|luxe|fancy|elegant|dark|moody|soft|calm|minimal|warm|cozy)\b/i.test(t)||new RegExp('\\b('+Object.keys(COLORS).join('|')+')\\b','i').test(t)){v.vibe=vibe(t);got.push('new look: '+v.vibe.label+'.');}
  const isPic=/\b(pic|pics|picture|pictures|photo|photos|image|images|gallery|drawing|drawings)\b/i.test(t);
  const asked=AA&&(AA.wanted(t)||(/\b(add|put|draw|show|include)\b/i.test(t)&&!SEC.some(([,re])=>re.test(t))?AA.find(t.replace(/\b(pictures?|photos?|images?|gallery|pics?|drawings?)\b/ig,'')):null));
  if(rm&&isPic){v.pics=[];v.gallery=false;got.push('took the pictures out.');}
  else if(asked&&/\b(main|hero|top|header|big)\b/i.test(t)){v.heroArt=asked;got.push('drew a '+asked+' as the main picture.');}
  else if(asked||isPic){v.gallery=true;if(asked)v.pics=[asked,...(v.pics||[])];got.push(asked?'drew a '+asked+' into the gallery.':'added a gallery of drawings.');}
  SEC.forEach(([k,re])=>{if(re.test(t)){v.sec=v.sec||{};if(rm){delete v.sec[k];got.push('removed the '+k+'.');}else{v.sec[k]=1;got.push('added a '+k+' section.');}}});
  if(/\b(font|text|headline|title|words)\b/i.test(t)&&/\b(bigger|larger|huge|smaller)\b/i.test(t)){v.big=/bigger|larger|huge/i.test(t);got.push(v.big?'bigger headline.':'smaller headline.');}
  return got;}
const after='change anything: try "add a picture of a cake", "make it bold" or "add reviews". type "that\'s it" when it\'s right.';
E.term={open:true,noRail:true,title:'the interview · build a website',previewLabel:'preview · your site',device:'browser',
  placeholder:'type here',startNote:'your site shows up here.',
  ai:"what do you want to build? say it messy. half an idea is fine.",
  parts:[{k:'ask',short:'ask messy',c:'#ff6fa3',why:'say it half formed. no perfect prompt needed.'},
         {k:'interview',short:'make it ask',c:'#ffb30f',why:'tell it to interview you before it builds.'},
         {k:'answer',short:'answer with detail',c:'#2fc4c8',why:'every detail you give ends up on the page.'},
         {k:'go',short:'then go',c:'#4fbf6a',why:'it builds once it has enough. then you fix what you want.'}],
  progress:v=>!v.stage?'':v.stage==='draft'?'first draft':v.stage==='built'?'built from your answers':'question '+(ORDER.indexOf(v.stage)+1)+' of 4',
  chips:v=>{const k=kind(v);
    if(!v.stage)return[{label:'✦ autofill',text:FILL.candle.start,kind:'fill'},{label:'dog walking idea',text:FILL.dog.start}];
    if(v.stage==='draft')return[{label:'interview me',text:'interview me',kind:'fill'}];
    if(v.stage!=='built')return[{label:'✦ autofill a detailed answer',text:fill(v,v.stage),kind:'fill'},{label:'skip',text:'skip'}];
    return[{label:'add a picture of a cake',text:'add a picture of a cake',kind:'fill'},{label:'make it bold',text:'make it bold. black and orange'},{label:'add reviews',text:'add reviews'},{label:"that's it",text:"that's it"}];},
  lit:()=>[],
  isDone:(t,v)=>DONE.test(t.trim())&&v.stage==='built',
  finishSay:()=>"done. your opening message is waiting in bite 5.",
  update(t,v){const s=t.trim();
    if(!v.stage){v.started=true;v.stage='draft';v.what=clean(s);v.noun=noun(s);
      return {changed:true,note:'built a first draft from one vague line.',reply:"here's a first draft. it's generic because i had to guess everything. good ai asks before it builds. tap \"interview me\" and i'll ask you 4 quick questions."};}
    if(v.stage==='draft'){
      if(/\b(interview|ask|question|questions|yes|yeah|sure|ok|okay|go)\b/i.test(s)){v.stage='q1';return {changed:false,note:'',reply:"good call. i'll stop guessing. "+Q.q1};}
      const got=edits(s,v);
      return {changed:!!got.length,note:got.join(' '),reply:(got.length?'changed it. ':'')+'it still has to guess the rest. tap "interview me" and it gets specific.'};}
    if(ORDER.includes(v.stage)){
      const q=v.stage;
      if(/^(skip|next|pass|idk|i don'?t know)\.?$/i.test(s)){v.thin=v.thin||{};v.thin[q]=true;}
      else readQ(q,s,v);
      const i=ORDER.indexOf(q),nx=ORDER[i+1];
      const thin=v.thin&&v.thin[q];
      const notes={q1:v.product?'put '+v.name+' and what you sell at the top.':'put your name on it. no product line yet, so the headline stays vague.',q2:v.who?'the page now speaks to '+v.who+'.':'no customer yet, so it talks to "everyone."',q3:v.diff?'added a "why '+(v.name||'us')+'" section in your words.':'the "why us" section is empty. that space is what detail fills.',q4:v.vibe?'new look: '+v.vibe.label+'. button: '+v.cta+'.':'kept the default look.'};
      if(nx){v.stage=nx;const ask=typeof Q[nx]==='function'?Q[nx](v):Q[nx];return {changed:true,note:notes[q],reply:(thin?THIN+' ':'got it. ')+ask};}
      v.stage='built';v.gallery=true;
      const thinN=ORDER.filter(k=>v.thin&&v.thin[k]).length;
      return {changed:true,note:notes[q]+' built the full site.',reply:(thinN?`built it. ${thinN} of your answers were short, and you can see the gaps. `:"that's everything i need. here's your site, built from your answers. ")+after};}
    /* built: edits */
    const got=edits(s,v);
    if(!got.length){v.extra=(v.extra||[]).concat(clean(s));got.push('added that to the page, in your words.');}
    return {changed:true,note:got.join(' '),reply:'done. '+after};},
  render(v,{hl,esc}){
    const AA=window.AiimoArt;
    const th=v.vibe?v.vibe.th:{bg:'#f4f4f6',fg:'#4a4a52',ac:'#a9a9b3'},st=`--bg:${th.bg};--fg:${th.fg};--ac:${th.ac}`;
    const base=(AA&&AA.find((v.what||'')+' '+(v.product||'')+' '+(v.noun||'')))||'sparkle';
    const art=k=>AA?AA.draw(k,{a:th.ac,t:th.ac}):'';
    const url=(v.name?v.name.toLowerCase().replace(/[^a-z0-9]+/g,''):'your-site')+'.com';
    const chrome=`<div class="bw-chrome"><span class="bw-dots"><i></i><i></i><i></i></span><span class="bw-url">${esc(url)}</span></div>`;
    if(!v.stage)return `<div class="bw">${chrome}<div class="pg generic empty"><div class="empty-msg"><div class="ph-art"></div><h4>your site goes here.</h4><p>type an idea, or tap autofill.</p></div></div></div>`;
    const gap=t=>`<span class="gapnote">${esc(t)}</span>`;
    const name=v.name?hl('answer',v.name):'logo';
    const eyebrow=v.name?`<small class="eyebrow">${hl('answer',v.name)}</small>`:'';
    const h=v.product?hl('answer',v.product):v.name?`welcome to ${hl('answer',v.name)}.`:'welcome to our website.';
    const sub=v.who?`made for ${hl('answer',v.who)}.`:v.stage==='draft'?`we offer high quality ${esc(v.noun)} for everyone. your satisfaction is our priority.`:gap('who is this for? nobody said.');
    const cta=v.cta?hl('go',v.cta):'learn more';
    const heroArt=(v.name||v.stage==='built')?`<div class="hero-art">${art(v.heroArt||base)}</div>`:'<div class="ph-art"></div>';
    const blocks=[];
    if(v.stage!=='draft'&&ORDER.indexOf(v.stage)>2||v.stage==='built')blocks.push(`<section class="blk why"><h5>why ${esc(v.name||'us')}</h5>${v.diff?`<p>${hl('answer',v.diff)}</p>`:gap('nothing here. you didn\'t say what makes you different.')}</section>`);
    if(v.stage==='built'){
      if(v.gallery!==false){const picks=[...new Set([...(v.pics||[]),...((AA&&AA.set(base))||[])])].slice(0,Math.max(3,(v.pics||[]).length));
        blocks.push(`<section class="blk"><h5>${v.product?'what we make':'gallery'}</h5><div class="gal">${picks.map(k=>`<figure>${art(k)}<figcaption>${esc(k==='icecream'?'ice cream':k)}</figcaption></figure>`).join('')}</div></section>`);}
      const S=v.sec||{};
      if(S.reviews)blocks.push(`<section class="blk"><h5>what people say</h5><div class="rev">${[1,2].map(()=>`<div><span class="stars">★★★★★</span><p>a real review from a customer goes here.</p></div>`).join('')}</div></section>`);
      if(S.prices)blocks.push(`<section class="blk"><h5>prices</h5><div class="price">${[v.noun||'the classic','gift set','custom order'].map(x=>`<p><span>${esc(x)}</span><b>$ —</b></p>`).join('')}</div></section>`);
      if(S.faq)blocks.push(`<section class="blk"><h5>questions</h5><p>your most asked questions go here.</p></section>`);
      if(S.contact)blocks.push(`<section class="blk"><h5>say hi</h5><div class="contact"><div>${art('pin')}<span>visit</span></div><div>${art('chat')}<span>message</span></div><div>${art('calendar')}<span>${esc(v.cta||'book')}</span></div></div></section>`);
      (v.extra||[]).forEach(x=>blocks.push(`<section class="blk"><h5>you asked for</h5><p>${hl('go',x)}</p></section>`));
      blocks.push(`<section class="band"><b>${v.who?'for '+esc(v.who):'ready when you are'}</b><span class="cta">${cta}</span></section>`);}
    return `<div class="bw">${chrome}<div class="pg ${v.vibe?v.vibe.key:'generic'}${v.big?' big':''}" style="${st}">
      <nav><b>${name}</b><span class="links"><span>shop</span><span>about</span><span>contact</span></span><span class="cta sm">${cta}</span></nav>
      <section class="hero"><div>${eyebrow}<h4>${h}</h4><p>${sub}</p><span class="cta">${cta}</span></div>${heroArt}</section>
      ${blocks.join('')}
      <footer>© ${esc(v.name||'your site')}</footer></div></div>`;},
  prompt:v=>{const known=[v.name&&`it's called ${v.name}`,v.product&&`we sell ${v.product.replace(/\.$/,'')}`,v.who&&`it's for ${v.who.replace(/\.$/,'')}`,v.diff&&`what makes us different: ${v.diff.replace(/\.$/,'')}`,v.vibe&&`it should feel ${v.vibe.label}`,v.cta&&`the main button says ${v.cta}`].filter(Boolean);
    return [`i want to build ${(v.what||'a website').replace(/\.$/,'')}.`,known.length?`here's what i know so far: ${known.join('. ')}.`:"i don't know exactly what i want yet.",
      'before you build anything, interview me. ask one question at a time and wait for my answer. ask about anything still missing.',
      'when you have enough, build it as a single page i can open and share.'].join('\n');},
  done:{title:'let it interview you.',say:"you didn't write a perfect prompt. you answered four questions. every detail you gave ended up on the page, and every gap showed.",
    rule:'works anywhere: before you answer, interview me. one question at a time.'}};
E.take={label:'your opening message',mine:'made from your answers in bite 4',
  empty:'start bite 4 first. your opening message shows up here as soon as you do.',emptyButton:'go to bite 4',
  hint:'tap a button. claude or chatgpt opens with this already typed in. press send, answer its questions, and it builds the real page.'};
E.ui.b4={h2:"build a website without a perfect prompt. *let it interview you.*",say:"practice the move that fixes vague ai: let it interview you.",
  steps:['type what you want to build in the box below, or tap autofill.','tap "interview me." answer each question, or tap autofill.','watch your site get built. change anything, then type "that\'s it."']};
E.ui.b5={h2:'now build *the real one.*',say:'your answers from bite 4 just became an opening message for a real ai. it changes as you type up there.',hint:"same skill, any task: a plan, a decision, a hard message. let it interview you first."};
})(window.EDITION);
/* your-move lines (engine shows them in a box in each bite) */
(function(E){E.ui.b1.move='tap each card to flip it.';E.ui.b3.move='tap each one to see what they built.';})(window.EDITION);
