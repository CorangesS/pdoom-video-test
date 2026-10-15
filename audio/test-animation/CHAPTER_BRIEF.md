# Chapter-author brief

Read `ANIMATION_GUIDE.md` and `STORYBOARD.md` before editing. The shared API is already implemented in `src/scenes/shared.js`; do not edit it, `studio.html`, `src/config.js`, or another chapter file. Edit only the chapter file assigned to you. If a shared helper is missing, keep any new helper private inside your scene IIFE and report it.

Frames are pure functions of song time: no state, counters, or `Math.random()`. Use the existing painted-animation engine (`paint`, `inkLine`, p5.brush); no HTML/CSS drawings or 3D. No text, captions, lyrics, or signs. Canvas is 1920×1080. Keep characters on model: actor A is terracotta; actor B is rose and wears the flower hat. The beat grid is half-time 65.4 BPM, offset 0.39 seconds. Use medium characters around 29–34 units, close shots around 40. Give each shot a cause, action, and readable reaction; keep the shared little flower present when the action allows it.

Use `window.MV` as `const M = window.MV, C = M.C`. Available helpers: `M.background(place,t)` where place is `station`, `cafe`, `street`, `home`, `winter`, `garden`, or `evening`; `M.rain(t, amount, alpha)`; `M.flower(x,y,r,t,color)`; `M.umbrella(x,y,width,t,tilt,color)`; `M.cup(x,y,scale,t)`; `M.heart(x,y,scale,alpha)`; `M.pot(x,y,scale,growth)`; `M.actor(x,y,t,'a'|'b',mood,options)`; and `M.wipeIn(lt, colors)` / `M.wipeOut(lt,dur,colors)`. Use `camBegin`/`camEnd`, beat-aware movement, and varied transitions as needed.

Each chapter is one IIFE with four scene functions around 6.8 seconds each, registered by `shots([[start, fn], ...])` using the exact global times below. At every shot seam call complementary `M.wipeOut` and `M.wipeIn`; chapter boundaries are seams too. Chapter 8 must end with a shaped iris/fade, not a hard stop. Keep drawing economical (hundreds of strokes at most; target under 2.5 s/frame). Run `node --check` on your file. The root agent will render the full timeline and handle continuity review.

## Assigned times and beats

- `c02-cafe.js`: 27.5, 34.3, 41.2, 48.1. A brings a chair and hot drink; B adds a cup sleeve; spilled sugar is gathered together and turns into a shared laugh. Cafe palette. End by carrying steam into the umbrella walk.
- `c03-walk.js`: 55.0, 61.9, 68.8, 75.6. A and B alternate tilting the shared umbrella toward each other; they negotiate a puddle, touch shoulders, then set off together. Rain/street palette.
- `c04-kitchen.js`: 82.5, 89.3, 96.2, 103.1. A burns toast and tries to hide it; B quietly saves it with an egg, they share the last bite, then put the flower in a cup. Home palette.
- `c05-winter.js`: 110.0, 116.8, 123.7, 130.6. B is sick in the cold; A brings warm water and a blanket; later A falls asleep and B covers them. Winter palette warming to lamplight.
- `c06-growing.js`: 137.5, 144.3, 151.2, 158.1. They plant the flower in a pot; through sunlight and watering it grows and blooms; a transplant spills soil and they clean up together. Garden/home palette, visibly shifting toward spring.
- `c07-home.js`: 165.0, 171.8, 178.7, 185.6. Small acts in an ordinary home: folding laundry, mending the old umbrella, leaving tea, and sharing a quiet window rest. Evening/home palette.

At shot start `lt` resets to zero; `t` remains absolute song time. Each file must register only its own four starts.
