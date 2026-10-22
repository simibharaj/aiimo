# aiimo build kit

the source of truth for building an edition of "ai, in my opinion". scheduled builds copy from here.

## engine (copy into a new edition folder)
- `engine/index.html`: page shell. change the edition number in the title, brand line and `editions/NN/edition.js` script tag.
- `engine/bites.js`, `engine/term.js`, `engine/lab.js`, `engine/builder.js`: engine. don't edit per edition.
- `bites.css` = `cat engine/base.css engine/extra.css > bites.css`
- `engine/assets/glass-1.jpg` to `glass-6.jpg`: bite numerals. add `glass-0N.jpg` (cover numeral) per edition.
- `engine/example-edition-01.js` (drink counter), `engine/example-edition-02.js` (website builder in a browser window) and `engine/example-edition-03.js` (instagram playbook): working open-mode terminals to copy from.
- `engine/clipart.js`: cute flat cartoon drawings made in code (`AiimoArt.draw(key)`, `AiimoArt.find(text)`). when a reader asks for a picture, draw it with this. never use photos.

## bite 4 standard (every edition)
- `E.term.open = true`. the reader types anything, any time. every message updates the preview through `update(text, vals)` which returns `{reply, changed, note}`. edits after the first answer must work ("make it bold", "no emojis", "add oat milk").
- the ai can ask one question at a time, but a plain answer goes to the open question and explicit edits always apply. never block on a wrong answer; nudge and keep going.
- `isDone` on "that's it". `finishSay` points to bite 5.
- `E.ui.b4.steps`: exactly three short steps shown under the headline, beside the full-size glass 4. plain words a parent could follow. no long how-to box.
- `E.take` has `empty`, `emptyButton` and `mine`. bite 5 says "waiting for bite 4" until the reader types, then updates live as they type.
- phone first: test at 390x844 with isMobile. the pinned preview is compact and solid, the rail fits on one line, inputs are 16px.
- sound is off by default. the button reads "turn sound on".

## direction standard (every bite, every edition)
- every bite has one **your move** box (`.move`) that says exactly what to tap, in plain words. set `ui.b1.move`, `ui.b2.move` (defaults to the poll question + "tap one."), `ui.b3.move`, `ui.b5.move`, `ui.b6.move` when the default doesn't fit.
- the box only states the move. no countdowns, no "done" states, no "my take is below".
- simi's take ("in my opinion") unlocks only after the move in bites 1, 2 and 3. a bite 3 meter is a guess first, then the reveal.
- every bite ends with a **next** button. the cover explains the pattern in one line.
- interactive things must look tappable: flip cards carry a dark "tap to flip" pill and a "flip back" pill.
- bite 6: headline is simi's verbatim essay subtitle only. then one clear-glass end card on the grid stage: the essay as the main glass card (eyebrow, title, by simi bharaj, lavender gel "read the essay" pill), two equal gel pills (get the next edition, share this edition), four equal clear glass pills for socials. no your-move box, no stickers.
- phones first: on screens under 860px the terminal is one fixed-height card with the preview on top and the chat below. never a pinned preview floating over the chat. after sending on a phone, the keyboard drops so the change is visible.
- glass is CLEAR crystal (apple liquid glass), never frosted: transparent panels over a light grid stage, bright rims, lifted shadow, rainbow caustic underneath, lavender and mint gel pills. no colored shapes behind text.
- terminals in bites 4 and 5 are CLEAR liquid glass, not frosted and not black: see-through panels (blur 2px max) on a lit stage with crisp colored shapes behind, thick bright rims, a diagonal sheen, glossy periwinkle and mint pills, a white input pill with a round send button.
- the terminal feels real: thinking dots, replies type themselves out, and every change logs a green ✓ line. anything the reader types lands in the preview, in their words if nothing else matches.
- website previews are a full browser window (address bar, nav, hero, sections, footer), never a phone or watch frame.
- yellow is a bright golden #ffb30f.
- labels are rounded stickers in the bite color, not tiny gray mono text. body text 18-19px.

## the interview pattern (edition 02 is the reference)
- a vague first ask builds a generic draft on purpose. then an "interview me" button.
- the ai asks a few questions one at a time; the header shows "question 2 of 4" (`T.progress`, `T.noRail`).
- every question has one "✦ autofill a detailed answer" chip (`{label,text,kind:'fill'}`). autofill answers are rich, so autofill builds a polished result.
- short answers build a thin result on purpose, with visible dashed gaps ("nothing here. you didn't say what makes you different."). that's the lesson: detail buys quality.

## cover (substack thumbnail, social preview, og:image)
```
npm i playwright @fontsource/geist-sans @fontsource/geist-mono
node tools/cover.mjs '{"n":"02","title":"let it interview you.","date":"oct 27, 2026","img":"02/assets/glass-0N.jpg","accent":"#2fa4a8","out":"02/assets/cover.jpg"}'
```
same template every week. only the number, title, date, numeral image and accent change.
