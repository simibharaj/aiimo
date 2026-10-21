# aiimo build kit

the source of truth for building an edition of "ai, in my opinion". scheduled builds copy from here.

## engine (copy into a new edition folder)
- `engine/index.html`: page shell. change the edition number in the title, brand line and `editions/NN/edition.js` script tag.
- `engine/bites.js`, `engine/term.js`, `engine/lab.js`, `engine/builder.js`: engine. don't edit per edition.
- `bites.css` = `cat engine/base.css engine/extra.css > bites.css`
- `engine/assets/glass-1.jpg` to `glass-6.jpg`: bite numerals. add `glass-0N.jpg` (cover numeral) per edition.
- `engine/example-edition-01.js` (drink counter) and `engine/example-edition-03.js` (instagram playbook): working open-mode terminals to copy from.

## bite 4 standard (every edition)
- `E.term.open = true`. the reader types anything, any time. every message updates the preview through `update(text, vals)` which returns `{reply, changed, note}`. edits after the first answer must work ("make it bold", "no emojis", "add oat milk").
- the ai can ask one question at a time, but a plain answer goes to the open question and explicit edits always apply. never block on a wrong answer; nudge and keep going.
- `isDone` on "that's it". `finishSay` points to bite 5.
- `E.ui.b4.steps`: exactly three short steps shown under the headline, beside the full-size glass 4. plain words a parent could follow. no long how-to box.
- `E.take` has `empty`, `emptyButton` and `mine`. bite 5 says "waiting for bite 4" until the reader types, then updates live as they type.
- phone first: test at 390x844 with isMobile. the pinned preview is compact and solid, the rail fits on one line, inputs are 16px.
- sound is off by default. the button reads "turn sound on".

## cover (substack thumbnail, social preview, og:image)
```
npm i playwright @fontsource/geist-sans @fontsource/geist-mono
node tools/cover.mjs '{"n":"02","title":"let it interview you.","date":"oct 27, 2026","img":"02/assets/glass-0N.jpg","accent":"#2fa4a8","out":"02/assets/cover.jpg"}'
```
same template every week. only the number, title, date, numeral image and accent change.
