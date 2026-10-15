# Final chapter: years, return, completed book

Owned source: `src/scenes/c03_years.js`. Time range **196.70–283.40 s**, 13 shots. No end-of-film registration is added. Shared art, engine, lyrics, timing and original V1 are untouched by this chapter author.

The source uses five wides, two closes, two mediums and four inserts. New 215.50 s boundary splits the window scene into an individual look and its answer. Reprises show changes: the other partner fixes the scarf; the train returns to the old town; gray tufts and wrinkles mark age; the seedling becomes the tree beside their bench; the original letter, umbrella and train-window moment appear in distinct album images; the opening desk returns with a thick book, both portraits and two cups.

## Timing and reads

Times below are local to the shot. All actions retain held reactions before the next cut.

| Range | Lens | Reads |
|---|---|---|
| 196.70–203.67 | wide | 0–1.6 door opens; 1.6–4.9 enter in sequence; 4.9–5.75 close door and light window; hold |
| 203.67–210.91 | wide | Walk on the explicit dry path; seasonal match changes at 1.81, 3.62 and 5.43; winter scarves are added |
| 210.91–215.50 | close | 0–1.55 look through window; 1.55–2.2 turn toward partner; hold expression |
| 215.50–220.40 | close | 0–1.45 answer the look; 1.45–3.15 lean together; hold with paired cups |
| 220.40–226.93 | insert | .6–2.05 page turns; see first meeting; 2.6–3.8 older hand rests on the thicker book; hold |
| 226.93–233.29 | medium | See loose scarf; 1.35–3.45 reciprocal adjustment; 3.65 surprise and 4.35 relief; hold |
| 233.29–241.22 | wide | 0–1.5 train arrives; 2–5.05 step down with original suitcase; face old town; hold |
| 241.22–248.71 | medium | 1.45–3.2 offer flower; 3.3 discover it; 4.6 shy response; approach and hold |
| 248.71–255.35 | wide | Mature tree and old pot establish the payoff; .5–2.6 sit; 2.8–4.15 open lap book; hold |
| 255.35–261.84 | insert | 0–1.5 old hand and ring; 1.5–3.2 partner covers hand; held contact |
| 261.84–269.69 | insert | First meeting already in album; 1.5–2.75 umbrella picture arrives; 3.6–4.95 train-window picture; 5.3–6.4 hand rests; hold |
| 269.69–276.80 | wide | .4–3.65 return home; 3.65–4.3 door closes; 4.35–5.1 window lights with two silhouettes; hold |
| 276.80–283.40 | insert | 0–2.1 both portraits and full book; 2.1–3.95 close book; 3.85–5.15 red thread completes its circle; hold and final fade |

## Render and visual review

The reproducible review runner is `out/check/years/review.mjs`:

- `shot-01.jpg` through `shot-13.jpg`: early/middle/late frames for every shot, 39 frames.
- `seam-01.jpg` through `seam-13.jpg`: 24 fps strips spanning every incoming seam, 208 frames.
- `motion-01.jpg` through `motion-21.jpg`: 21 one-second action strips, 525 frames.
- Eight face/prop/contact/ending crop sheets, 24 frames.
- `review.json` records actual shot registrations, reads, motion ranges and browser errors; the completed review had zero page errors.
- `home-entry-final.jpg`: final 31-frame verification of entry, after removing a facade-mask pop.
- `final-engine-check.jpg`: current source sampled after the parent fixed the shared two-point stroke renderer.

All 13 shot sheets, 13 seam strips, 21 motion strips and eight crops were visually opened and inspected. Rendering was typically 40–210 ms/frame, with the three memory-picture collage approximately 350 ms/frame. The known startup p5.brush `WebGL INVALID_OPERATION` warnings were the only console noise.

Issues found and corrected:

1. The private postcard lamppost extended above the picture; replaced it with correctly scaled local geometry.
2. An early facade-mask trigger erased the following partner before they reached the door. Removed that mask; complete silhouettes now fit within the opening before the door closes. `home-entry-final.jpg` supersedes older home-entry strips.
3. Feet remained visible below a closed door. Adjusted their ending ground positions to lie within the opening.
4. Return actors initially stood independently of the arriving train. They now move with the train, then step down in sequence.
5. The suitcase hung below foot level. Its arm angle and hook-space base now attach the handle to the hand and align the bottom with the feet.
6. The bench album obscured faces. Lowered its center from y=803 to y=860 and reduced scale from .48 to .32.

The chapter uses deliberate graphic match/reaction cuts, two chapter/travel wipes and five paper fades. It does not use heart symbols. Review is of the rendered chapter images and motion strips; final full-film encode, audio verification and cross-chapter acceptance remain with the parent task. Parent consolidated renders under the corrected shared stroke engine supersede earlier pre-fix review images.
