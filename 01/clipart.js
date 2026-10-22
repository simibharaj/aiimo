/* cute flat clip art, drawn in code. AiimoArt.draw(key, {a, b}) returns an svg string.
   AiimoArt.find(text) maps whatever the reader typed ("a picture of my puppy") to a drawing key.
   no photos, no outside images: everything here is shapes. */
(function(){
const K='#2b2b33',W='#ffffff';
const s=(d)=>`stroke="${K}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" ${d||''}`;
const blob=(c)=>`<path d="M60 8c26 0 50 18 50 46s-20 58-52 58S8 92 8 62 32 8 60 8z" fill="${c}" opacity=".55"/>`;
const eyes=(x1,x2,y)=>`<circle cx="${x1}" cy="${y}" r="3.2" fill="${K}"/><circle cx="${x2}" cy="${y}" r="3.2" fill="${K}"/>`;
const cheeks=(x1,x2,y)=>`<circle cx="${x1}" cy="${y}" r="3.6" fill="#ff9fbf" opacity=".8"/><circle cx="${x2}" cy="${y}" r="3.6" fill="#ff9fbf" opacity=".8"/>`;
const smile=(x,y)=>`<path d="M${x-5} ${y}q5 5 10 0" fill="none" ${s()}/>`;
const A={
  candle:(p)=>`${blob(p.t)}<rect x="40" y="46" width="40" height="52" rx="8" fill="${W}" ${s()}/><path d="M40 58h40" ${s()}/><rect x="40" y="66" width="40" height="16" fill="${p.a}" opacity=".85"/><path d="M60 46v-8" ${s()}/><path d="M60 16c8 9 9 15 0 22-9-7-8-13 0-22z" fill="#ffc94d" ${s()}/>${eyes(53,67,90)}`,
  dog:(p)=>`${blob(p.t)}<path d="M34 46c-10 2-14 18-8 28l12-6z" fill="${p.a}" ${s()}/><path d="M86 46c10 2 14 18 8 28l-12-6z" fill="${p.a}" ${s()}/><ellipse cx="60" cy="62" rx="27" ry="25" fill="#f3d3a5" ${s()}/><ellipse cx="60" cy="74" rx="12" ry="9" fill="${W}" ${s()}/><ellipse cx="60" cy="70" rx="5" ry="3.6" fill="${K}"/>${eyes(50,70,58)}${cheeks(42,78,68)}<path d="M56 79q4 4 8 0" fill="none" ${s()}/>`,
  cat:(p)=>`${blob(p.t)}<path d="M36 50l-4-22 18 12M84 50l4-22-18 12" fill="${p.a}" ${s()}/><ellipse cx="60" cy="64" rx="28" ry="24" fill="${p.a}" ${s()}/>${eyes(50,70,60)}<path d="M57 68l3 3 3-3" fill="none" ${s()}/>${cheeks(43,77,70)}<path d="M30 66h10M80 66h10" ${s()}/>`,
  paw:(p)=>`${blob(p.t)}<ellipse cx="60" cy="72" rx="18" ry="15" fill="${p.a}" ${s()}/><circle cx="38" cy="50" r="8" fill="${p.a}" ${s()}/><circle cx="52" cy="38" r="8" fill="${p.a}" ${s()}/><circle cx="68" cy="38" r="8" fill="${p.a}" ${s()}/><circle cx="82" cy="50" r="8" fill="${p.a}" ${s()}/>`,
  coffee:(p)=>`${blob(p.t)}<path d="M32 50h48l-5 42a8 8 0 0 1-8 7H45a8 8 0 0 1-8-7z" fill="${W}" ${s()}/><path d="M80 58h6a10 10 0 0 1 0 20h-8" fill="none" ${s()}/><path d="M34 60h44" ${s()}/><path d="M35 60h42l-2 14H37z" fill="${p.a}" opacity=".8"/><path d="M48 40q-4-6 0-12M60 40q-4-6 0-12M72 40q-4-6 0-12" fill="none" ${s()}/>${eyes(51,65,82)}`,
  cake:(p)=>`${blob(p.t)}<rect x="28" y="58" width="64" height="38" rx="8" fill="${W}" ${s()}/><path d="M28 70c8 6 16 6 21 0s13-6 21 0 13 6 22 0" fill="none" ${s()}/><path d="M28 58c0-8 6-12 12-12h40c6 0 12 4 12 12" fill="${p.a}" ${s()}/><path d="M60 46V32" ${s()}/><path d="M60 18c6 7 6 10 0 14-6-4-6-7 0-14z" fill="#ffc94d" ${s()}/>${eyes(52,68,82)}`,
  cookie:(p)=>`${blob(p.t)}<circle cx="60" cy="62" r="32" fill="#e9b97a" ${s()}/><circle cx="48" cy="50" r="4" fill="${K}"/><circle cx="72" cy="48" r="4" fill="${K}"/><circle cx="76" cy="70" r="4" fill="${K}"/><circle cx="46" cy="76" r="4" fill="${K}"/><circle cx="62" cy="64" r="3" fill="${K}"/>`,
  icecream:(p)=>`${blob(p.t)}<path d="M42 62l18 42 18-42z" fill="#e9b97a" ${s()}/><circle cx="60" cy="48" r="20" fill="${p.a}" ${s()}/><circle cx="60" cy="24" r="5" fill="#ff5a6e" ${s()}/>${eyes(53,67,50)}`,
  pizza:(p)=>`${blob(p.t)}<path d="M24 34l72 0-36 66z" fill="#ffd36e" ${s()}/><path d="M24 34c12-10 60-10 72 0" fill="#e9a35a" ${s()}/><circle cx="50" cy="50" r="6" fill="#ff6b6b" ${s()}/><circle cx="70" cy="52" r="6" fill="#ff6b6b" ${s()}/><circle cx="60" cy="70" r="6" fill="#ff6b6b" ${s()}/>`,
  cocktail:(p)=>`${blob(p.t)}<path d="M28 32h64L60 66z" fill="${p.a}" ${s()}/><path d="M60 66v26M44 96h32" ${s()}/><path d="M74 32l12-14" ${s()}/><circle cx="88" cy="16" r="5" fill="#9ccc4a" ${s()}/>`,
  wine:(p)=>`${blob(p.t)}<path d="M42 22h36c0 26-6 40-18 40S42 48 42 22z" fill="${W}" ${s()}/><path d="M44 38h32c-2 14-8 22-16 22s-14-8-16-22z" fill="#b0123a" opacity=".85"/><path d="M60 62v28M46 94h28" ${s()}/>`,
  flower:(p)=>`${blob(p.t)}<path d="M60 70v32" ${s()}/><path d="M60 92c-10-2-16-10-16-16 8 0 14 6 16 16zM60 86c8-2 14-8 14-14-8 0-12 6-14 14z" fill="#9ccc4a" ${s()}/>${[0,72,144,216,288].map(r=>`<ellipse cx="60" cy="34" rx="10" ry="14" fill="${p.a}" transform="rotate(${r} 60 50)" ${s()}/>`).join('')}<circle cx="60" cy="50" r="10" fill="#ffc94d" ${s()}/>`,
  plant:(p)=>`${blob(p.t)}<path d="M38 70h44l-6 30H44z" fill="${p.a}" ${s()}/><path d="M60 70V44" ${s()}/><path d="M60 52c-16 0-22-12-22-20 14 0 22 8 22 20zM60 46c14 0 20-12 20-20-12 0-20 8-20 20z" fill="#7cc66b" ${s()}/>${eyes(53,67,84)}`,
  leaf:(p)=>`${blob(p.t)}<path d="M30 90C30 50 56 26 92 26c0 36-24 64-62 64z" fill="#7cc66b" ${s()}/><path d="M30 90L74 46" ${s()}/>`,
  heart:(p)=>`${blob(p.t)}<path d="M60 96S24 74 24 50c0-12 9-20 19-20 8 0 14 5 17 11 3-6 9-11 17-11 10 0 19 8 19 20 0 24-36 46-36 46z" fill="${p.a}" ${s()}/>${eyes(50,70,58)}${smile(60,66)}`,
  star:(p)=>`${blob(p.t)}<path d="M60 18l11 24 26 3-19 18 5 26-23-13-23 13 5-26-19-18 26-3z" fill="#ffc94d" ${s()}/>${eyes(52,68,58)}${smile(60,66)}`,
  sun:(p)=>`${blob(p.t)}${[0,45,90,135,180,225,270,315].map(r=>`<path d="M60 14v10" transform="rotate(${r} 60 60)" ${s()}/>`).join('')}<circle cx="60" cy="60" r="24" fill="#ffc94d" ${s()}/>${eyes(52,68,57)}${cheeks(46,74,64)}${smile(60,66)}`,
  moon:(p)=>`${blob(p.t)}<path d="M74 22a34 34 0 1 0 22 52A28 28 0 0 1 74 22z" fill="#ffe08a" ${s()}/><circle cx="34" cy="30" r="3" fill="${K}"/><circle cx="90" cy="34" r="2.4" fill="${K}"/>`,
  house:(p)=>`${blob(p.t)}<path d="M24 58L60 26l36 32" fill="none" ${s()}/><path d="M32 52v44h56V52" fill="${W}" ${s()}/><path d="M24 58L60 26l36 32z" fill="${p.a}" ${s()}/><rect x="52" y="72" width="16" height="24" rx="3" fill="${p.a}" ${s()}/><rect x="38" y="62" width="10" height="10" rx="2" fill="#bfe6ff" ${s()}/><rect x="72" y="62" width="10" height="10" rx="2" fill="#bfe6ff" ${s()}/>`,
  book:(p)=>`${blob(p.t)}<path d="M60 36c-10-8-22-8-34-4v56c12-4 24-4 34 4 10-8 22-8 34-4V32c-12-4-24-4-34 4z" fill="${W}" ${s()}/><path d="M60 36v56" ${s()}/><path d="M34 46c6-2 12-2 18 0M34 56c6-2 12-2 18 0M68 46c6-2 12-2 18 0M68 56c6-2 12-2 18 0" ${s()}/>`,
  gift:(p)=>`${blob(p.t)}<rect x="28" y="50" width="64" height="46" rx="6" fill="${p.a}" ${s()}/><rect x="24" y="40" width="72" height="14" rx="4" fill="${p.a}" ${s()}/><path d="M60 40v56" ${s()}/><path d="M60 40c-6-14-24-14-18-2 4 6 18 2 18 2zM60 40c6-14 24-14 18-2-4 6-18 2-18 2z" fill="#ffc94d" ${s()}/>`,
  bag:(p)=>`${blob(p.t)}<path d="M30 44h60l-6 54H36z" fill="${p.a}" ${s()}/><path d="M46 50V38a14 14 0 0 1 28 0v12" fill="none" ${s()}/>${eyes(52,68,70)}${smile(60,78)}`,
  shirt:(p)=>`${blob(p.t)}<path d="M44 26l-20 14 8 14 8-4v48h40V50l8 4 8-14-20-14c-2 8-8 12-16 12s-14-4-16-12z" fill="${p.a}" ${s()}/>`,
  shoe:(p)=>`${blob(p.t)}<path d="M20 78c0-14 6-30 14-30 6 10 18 12 26 12 18 0 38 6 40 18v6H20z" fill="${p.a}" ${s()}/><path d="M20 84h80" ${s()}/><path d="M44 58l6 6M52 56l6 6" ${s()}/>`,
  polish:(p)=>`${blob(p.t)}<rect x="48" y="18" width="24" height="30" rx="5" fill="${K}"/><path d="M36 54a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8z" fill="${p.a}" ${s()}/>${eyes(52,68,70)}${smile(60,78)}`,
  scissors:(p)=>`${blob(p.t)}<circle cx="40" cy="80" r="11" fill="${W}" ${s()}/><circle cx="80" cy="80" r="11" fill="${W}" ${s()}/><path d="M47 72l34-52M73 72L39 20" ${s()}/><circle cx="60" cy="46" r="3" fill="${p.a}" ${s()}/>`,
  dumbbell:(p)=>`${blob(p.t)}<path d="M40 60h40" ${s()}/><rect x="22" y="42" width="14" height="36" rx="5" fill="${p.a}" ${s()}/><rect x="84" y="42" width="14" height="36" rx="5" fill="${p.a}" ${s()}/><rect x="36" y="48" width="8" height="24" rx="3" fill="${W}" ${s()}/><rect x="76" y="48" width="8" height="24" rx="3" fill="${W}" ${s()}/>`,
  laptop:(p)=>`${blob(p.t)}<rect x="30" y="32" width="60" height="40" rx="6" fill="${p.a}" ${s()}/><path d="M20 80h80l-6 10H26z" fill="${W}" ${s()}/>${eyes(52,68,50)}${smile(60,58)}`,
  camera:(p)=>`${blob(p.t)}<path d="M26 44h16l6-10h24l6 10h16v46H26z" fill="${p.a}" ${s()}/><circle cx="60" cy="66" r="14" fill="${W}" ${s()}/><circle cx="60" cy="66" r="6" fill="${K}"/>`,
  music:(p)=>`${blob(p.t)}<path d="M50 84V34l34-8v50" fill="none" ${s()}/><ellipse cx="42" cy="86" rx="10" ry="8" fill="${p.a}" ${s()}/><ellipse cx="76" cy="78" rx="10" ry="8" fill="${p.a}" ${s()}/>`,
  car:(p)=>`${blob(p.t)}<path d="M20 76V64l12-18h48l14 18h6v12z" fill="${p.a}" ${s()}/><path d="M38 52h18v12H32zM62 52h14l8 12H62z" fill="#bfe6ff" ${s()}/><circle cx="38" cy="78" r="9" fill="${W}" ${s()}/><circle cx="84" cy="78" r="9" fill="${W}" ${s()}/>`,
  tooth:(p)=>`${blob(p.t)}<path d="M34 34c8-10 18-6 26-2 8-4 18-8 26 2 8 12 0 28-4 40-2 10-4 22-10 22s-6-18-12-18-6 18-12 18-8-12-10-22c-4-12-12-28-4-40z" fill="${W}" ${s()}/>${eyes(50,70,52)}${cheeks(44,76,60)}${smile(60,60)}`,
  pin:(p)=>`${blob(p.t)}<path d="M60 100S32 70 32 48a28 28 0 0 1 56 0c0 22-28 52-28 52z" fill="${p.a}" ${s()}/><circle cx="60" cy="48" r="10" fill="${W}" ${s()}/>`,
  calendar:(p)=>`${blob(p.t)}<rect x="26" y="32" width="68" height="62" rx="8" fill="${W}" ${s()}/><path d="M26 32h68v16H26z" fill="${p.a}" ${s()}/><path d="M44 24v14M76 24v14" ${s()}/><rect x="40" y="58" width="10" height="10" rx="2" fill="${p.a}"/><rect x="56" y="58" width="10" height="10" rx="2" fill="${K}" opacity=".15"/><rect x="72" y="58" width="10" height="10" rx="2" fill="${K}" opacity=".15"/><rect x="40" y="74" width="10" height="10" rx="2" fill="${K}" opacity=".15"/>`,
  chat:(p)=>`${blob(p.t)}<path d="M24 34a10 10 0 0 1 10-10h52a10 10 0 0 1 10 10v32a10 10 0 0 1-10 10H50L34 92V76a10 10 0 0 1-10-10z" fill="${p.a}" ${s()}/><circle cx="46" cy="50" r="3.4" fill="${K}"/><circle cx="60" cy="50" r="3.4" fill="${K}"/><circle cx="74" cy="50" r="3.4" fill="${K}"/>`,
  sparkle:(p)=>`${blob(p.t)}<path d="M60 20c4 20 10 26 30 30-20 4-26 10-30 30-4-20-10-26-30-30 20-4 26-10 30-30z" fill="${p.a}" ${s()}/><path d="M88 74c2 8 4 10 12 12-8 2-10 4-12 12-2-8-4-10-12-12 8-2 10-4 12-12z" fill="#ffc94d" ${s()}/>`,
  bike:(p)=>`${blob(p.t)}<circle cx="36" cy="76" r="16" fill="none" ${s()}/><circle cx="86" cy="76" r="16" fill="none" ${s()}/><path d="M36 76l18-28h26l6 28M54 48l12 28h20M48 40h12" fill="none" ${s()}/><circle cx="66" cy="76" r="3" fill="${p.a}"/>`,
};
/* words people type, mapped to a drawing */
const WORDS=[['dog','dog|dogs|puppy|puppies|pup|doggy|walker|walking'],['cat','cat|cats|kitten|kitty'],['paw','pet|pets|vet|groom|grooming|paw'],
 ['candle','candle|candles|wax|wick'],['coffee','coffee|cafe|café|latte|espresso|tea|mug'],['cake','cake|cakes|bakery|cupcake|cupcakes|dessert|birthday|baking'],
 ['cookie','cookie|cookies|biscuit'],['icecream','ice cream|icecream|gelato|sweets|candy'],['pizza','pizza|food|restaurant|catering|chef'],['cocktail','cocktail|cocktails|bar|drinks|mixology|martini'],
 ['wine','wine|winery|champagne'],['flower','flower|flowers|florist|bouquet|rose|roses|wedding'],['plant','plant|plants|garden|gardening|succulent|landscaping'],['leaf','leaf|green|organic|eco|nature|skincare|spa'],
 ['heart','heart|love|dating|charity|care|nurse|health'],['star','star|stars|award|best|review|reviews'],['sun','sun|sunny|summer|beach|travel|vacation'],['moon','moon|night|sleep|dream|astrology'],
 ['house','house|home|homes|realtor|real estate|cleaning|cleaner|airbnb|interior'],['book','book|books|tutor|tutoring|class|school|course|writing|author'],['gift','gift|gifts|present|shop|store|box'],
 ['bag','bag|bags|purse|boutique|market'],['shirt','shirt|clothes|clothing|fashion|merch|apparel|tee'],['shoe','shoe|shoes|sneaker|sneakers|boots'],['polish','nail|nails|manicure|polish|beauty|makeup|lash|lashes'],
 ['scissors','hair|salon|barber|haircut|stylist|sewing|tailor'],['dumbbell','gym|fitness|workout|trainer|training|yoga|pilates|coach'],['laptop','laptop|tech|app|code|coding|software|website|startup|ai'],
 ['camera','camera|photo|photos|photography|photographer|picture|pictures|video'],['music','music|dj|song|band|singer|podcast'],['car','car|cars|auto|detailing|uber|driving|mechanic'],
 ['bike','bike|bikes|cycling|bicycle'],['tooth','tooth|teeth|dentist|dental|smile'],['pin','location|map|visit|address|local'],['calendar','calendar|booking|book|appointment|appointments|schedule|event|events'],['chat','chat|contact|message|support|consulting|coach']];
const RX=WORDS.map(([k,w])=>[k,new RegExp('\\b('+w+')\\b','i')]);
function find(text){if(!text)return null;for(const [k,re] of RX)if(re.test(text))return k;return null;}
/* "a picture of a dog" wins over the business noun; otherwise the business picks the art */
function wanted(text){const m=String(text||'').match(/\b(?:of|with)\s+(?:a|an|the|my|some)?\s*([a-z][a-z ]{1,24})/i);return m?find(m[1]):null;}
function draw(key,p){p=Object.assign({a:'#ff8fb3',t:'#ffe1ec'},p||{});const f=A[key]||A.sparkle;return `<svg viewBox="0 0 120 120" class="art" role="img" aria-label="${key||'drawing'}">${f(p)}</svg>`;}
function set(base){const fam={dog:['dog','paw','calendar','heart'],cat:['cat','paw','heart','house'],candle:['candle','gift','moon','leaf'],coffee:['coffee','cake','book','sun'],cake:['cake','cookie','gift','star'],
  flower:['flower','plant','heart','gift'],polish:['polish','heart','sparkle','star'],scissors:['scissors','sparkle','star','calendar'],dumbbell:['dumbbell','heart','sun','calendar'],laptop:['laptop','chat','star','sparkle'],
  house:['house','pin','heart','calendar'],book:['book','star','laptop','chat']}[base];return fam||[base||'sparkle','star','heart','gift'];}
window.AiimoArt={draw,find,wanted,set,keys:Object.keys(A)};
})();
