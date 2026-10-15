// Character preview using the painted-animation template's original Clawd body.
(() => {
  const SEA = '#83B9BD', DEEP = '#4F8295', LILAC = '#B6A1C9', GOLD = '#E5B968';

  function backdrop(cx, wash, edge, key) {
    boilSeed(`aura-${key}`);
    paint(ellPts(cx, 510, 390, 430, 38, 10),
      { fill: wash, fillOp: 70, bleed: .28, tex: .7, border: .7, ink: null });
    boilSeed(`aura-inner-${key}`);
    paint(ellPts(cx, 530, 280, 315, 34, 7),
      { fill: edge, fillOp: 38, bleed: .3, tex: .8, border: .7, ink: null });
    for (let i = 0; i < 22; i++) {
      const a = hash(i * 2.7 + key) * TAU, r = Math.sqrt(hash(i * 3.9 + key + 11));
      boilSeed(`speck-${key}-${i}`);
      paint(ellPts(cx + Math.cos(a) * 370 * r, 500 + Math.sin(a) * 420 * r, 2 + 4 * hash(i + key), 2 + 4 * hash(i + key), 9),
        { wash: edge, washOp: 70 + 70 * hash(i * 4 + key), ink: null });
    }
  }

  function cancerMark(u, sw) {
    // Two small claw shapes sit above the head as a removable accessory.
    for (const s of [-1, 1]) {
      boilSeed(`cancer-head-claw-${s}`);
      paint([
        [s * 1.75 * u, -7.9 * u], [s * 1.82 * u, -9.25 * u],
        [s * 2.85 * u, -10.22 * u], [s * 3.92 * u, -9.85 * u],
        [s * 3.28 * u, -9.52 * u], [s * 2.72 * u, -9.59 * u],
        [s * 3.58 * u, -8.78 * u], [s * 2.86 * u, -8.48 * u],
      ], { wash: SEA, fill: DEEP, fillOp: 42, ink: PAL.ink, sw: sw * .65 });
    }
    boilSeed('cancer-charm');
    paint(ellPts(0, -2.95 * u, .67 * u, .36 * u, 20),
      { wash: PAL.cream, fill: SEA, fillOp: 80, ink: PAL.ink, sw: sw * .55 });
    for (const s of [-1, 1])
      inkLine([[s * .54 * u, -3.0 * u], [s * 1.08 * u, -3.4 * u], [s * 1.35 * u, -3.17 * u]], sw * .6, DEEP, 'inkfine', .4);
  }

  function geminiMark(u, sw) {
    for (const s of [-1, 1]) {
      boilSeed(`gemini-charm-${s}`);
      paint(starPts(s * .9 * u, -3.02 * u, .42 * u, .49, 4),
        { wash: GOLD, ink: PAL.ink, sw: sw * .5 });
    }
    inkLine([[-.45 * u, -3.02 * u], [.45 * u, -3.02 * u]], sw * .4, GOLD, 'inkfine', 0);
  }

  function moon(x, y) {
    boilSeed('moon');
    paint(ellPts(x, y, 93, 93, 28, 4),
      { wash: PAL.cream, fill: GOLD, fillOp: 65, ink: PAL.ink, sw: .85 });
    boilSeed('moon-cut');
    paint(ellPts(x + 38, y - 25, 82, 83, 28, 4),
      { wash: mixCol(PAL.paper, SEA, .17), ink: null });
  }

  function twinStars(x, y) {
    for (const s of [-1, 1]) {
      boilSeed(`twin-star-${s}`);
      paint(starPts(x + s * 72, y + (s + 1) * 21, 62, .48, 5),
        { wash: PAL.cream, fill: GOLD, fillOp: 100, ink: PAL.ink, sw: 1 });
    }
    inkLine([[x - 27, y + 20], [x + 26, y + 42]], 1.2, PAL.violet, 'inkfine', 0);
  }

  function preview(t) {
    backdrop(500, SEA, DEEP, 31);
    backdrop(1420, LILAC, PAL.violet, 97);
    boilSeed('water-ribbon');
    paint(ribbon([[105, 830], [275, 798], [463, 823], [650, 790], [860, 815]], 23, 8),
      { wash: SEA, washOp: 180, fill: DEEP, fillOp: 40, ink: null });
    boilSeed('twin-ribbon');
    paint(ribbon([[1055, 814], [1242, 785], [1410, 817], [1563, 781], [1780, 812]], 18, 5),
      { wash: LILAC, washOp: 170, fill: GOLD, fillOp: 35, ink: null });
    moon(225, 275);
    twinStars(1652, 270);

    // Same terracotta silhouette and face in both portraits; only the motifs differ.
    clawd(500, 803, 64, {
      ...feel('hopeful', t), boilKey: 'cancer', eyes: 'normal', mouth: 'smile',
      aL: .52, aR: .15, lookX: .15, draw: cancerMark,
    });
    clawd(1420, 803, 64, {
      ...feel('playful', t), boilKey: 'gemini', eyes: 'normal', mouth: 'smile',
      aL: .12, aR: .62, lookX: -.2, draw: geminiMark,
    });

    for (const s of [-1, 1]) {
      boilSeed(`crab-claw-${s}`);
      inkLine([[500 + s * 268, 590], [500 + s * 302, 558], [500 + s * 327, 570]], 2, DEEP, 'ink', .5);
      paint(ellPts(500 + s * 329, 568, 11, 11, 12), { wash: PAL.cream, ink: DEEP, sw: .45 });
      const gx = 1420 + s * 287;
      boilSeed(`gemini-trace-${s}`);
      inkLine([[gx, 423], [gx + s * 44, 368], [gx + s * 80, 416], [gx + s * 44, 470]],
        1.25, PAL.violet, 'inkfine', .2);
      for (const p of [[gx, 423], [gx + s * 44, 368], [gx + s * 80, 416], [gx + s * 44, 470]])
        paint(ellPts(p[0], p[1], 6, 6, 10), { wash: GOLD, ink: PAL.violet, sw: .35 });
    }
  }

  shots([[0, preview]]);
})();
