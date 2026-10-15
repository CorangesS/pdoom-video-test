// Chapter 2 · the first cafe visit (27.5–55 s).
(() => {
  const M = window.MV, C = M.C;
  const chair = (x, y, k, t) => {
    boilSeed('cafe-chair');
    const dx = (1 - k) * 250;
    paint(rrPts(x + dx - 64, y - 190, 128, 115, 22, 4), { wash: '#B98168', ink: C.ink, sw: 2.2 });
    paint(rrPts(x + dx - 75, y - 86, 150, 24, 8, 3), { wash: '#C38C6F', ink: C.ink, sw: 2 });
    inkLine([[x + dx - 61, y - 72], [x + dx - 72, y + 6]], 8, C.ink);
    inkLine([[x + dx + 61, y - 72], [x + dx + 72, y + 6]], 8, C.ink);
    inkLine([[x + dx - 60, y - 184], [x + dx - 56, y - 96]], 2, '#E4B79A', 'dry');
  };
  const sugar = (x, y, t) => {
    boilSeed('sugar-spill');
    for (let i = 0; i < 13; i++) {
      const a = i * 2.399 + .2, r = 11 + (i % 5) * 12;
      const gather = ease(clamp((t - 3.4) / 1.25));
      const sx = x + Math.cos(a) * r * (1 - .8 * gather);
      const sy = y + Math.sin(a) * r * .42 * (1 - .8 * gather);
      paint(ellPts(sx, sy, 4 + i % 2, 3 + i % 2, 6, 1), { wash: '#F1E1C5', ink: '#A8886B', sw: .6 });
    }
  };

  function arrive(t, lt, dur) {
    camBegin(960 + 10 * Math.sin(lt * .2), 545, 1.03 + .015 * Math.sin(lt * .3));
    M.background('cafe', t);
    chair(835, 860, ease(clamp(lt / 2.4)), t);
    const place = ease(clamp((lt - 1.15) / 1.2));
    M.actor(690 + 74 * (1 - place), 870, t, 'a', lt < 1.8 ? 'determined' : 'shy', { u: 32, view: 'q', aR: .3 + .25 * (1 - place), walk: lt < 1.4 ? 2.8 : 0 });
    M.actor(1255, 870, t + 1, 'b', lt < 2.2 ? 'hopeful' : 'happy', { u: 31, view: 'q', lookX: -.6 });
    M.cup(1070 - 30 * place, 782, .9, t);
    M.flower(1140, 744, 12, t, C.gold);
    if (lt > 2.2) M.heart(1120, 590 - 8 * Math.sin(lt * 2), .38, 105);
    camEnd();
    M.wipeIn(lt, [C.rainDk, '#E7D6B8']);
    M.wipeOut(lt, dur, [C.wood, '#D2C2AE']);
  }

  function sleeve(t, lt, dur) {
    camBegin(968, 548, 1.08 + .018 * Math.sin(lt * .22));
    M.background('cafe', t);
    M.actor(825, 870, t, 'a', lt < 2.5 ? 'nervous' : 'relieved', { u: 34, view: 'q', lookX: .65, aR: .45 });
    M.actor(1085, 870, t + 1, 'b', lt < 1.3 ? 'thinking' : 'hopeful', { u: 33, view: 'q', aL: .22 });
    M.cup(965, 789, 1.06, t);
    const sleeveK = ease(clamp((lt - 1.5) / 1.45));
    const sy = 747 + 24 * (1 - sleeveK);
    paint(rrPts(936, sy, 58, 28, 5, 3), { wash: '#D59A7B', ink: C.ink, sw: 1.5 });
    inkLine([[948, sy + 5], [978, sy + 5]], 1.1, '#F0D2B4', 'dry');
    if (lt > 3.1) M.heart(1008, 607 - 12 * Math.sin(lt * 1.7), .36, 135);
    M.flower(1260, 807, 12, t, C.gold);
    camEnd();
    M.wipeIn(lt, [C.wood, '#D2C2AE']);
    M.wipeOut(lt, dur, ['#8E7D75', '#B8C6BF']);
  }

  function sugarShare(t, lt, dur) {
    camBegin(960 + 8 * Math.sin(lt * .17), 540, 1.13 + .018 * Math.sin(lt * .2));
    M.background('cafe', t);
    M.actor(805 + 12 * Math.sin(lt * .6), 870, t, 'a', lt < 2.7 ? 'surprised' : (lt < 4.4 ? 'thinking' : 'laugh'), { u: 34, view: 'q', lookX: .7, aR: lt < 2.5 ? -.25 : .45 });
    M.actor(1110 - 10 * Math.sin(lt * .55), 870, t + 1, 'b', lt < 3.1 ? 'surprised' : (lt < 4.4 ? 'happy' : 'laugh'), { u: 33, view: 'q', lookX: -.55, aL: .35 });
    M.cup(963, 776, .88, t);
    const spill = ease(clamp((lt - .7) / 1.1));
    sugar(960, 832, lt);
    if (lt > 4.3) { M.heart(955, 584 - 10 * Math.sin(lt * 2), .55, 145); M.heart(1018, 620 - 7 * Math.sin(lt * 2 + 1), .32, 115); }
    camEnd();
    M.wipeIn(lt, ['#8E7D75', '#B8C6BF']);
    M.wipeOut(lt, dur, [C.rainDk, '#B8C6BF']);
  }

  function steamCarry(t, lt, dur) {
    camBegin(960, 540, 1.08 + .025 * Math.sin(lt * .2));
    M.background('cafe', t);
    M.actor(855, 870, t, 'a', 'happy', { u: 34, view: 'q', aR: .22 });
    M.actor(1065, 870, t + 1, 'b', 'love', { u: 33, view: 'q', aL: .2 });
    M.cup(960, 824, .78, t);
    M.flower(960, 767, 13, t, C.gold);
    const vapor = clamp((lt - 1.1) / 4.8);
    for (let i = 0; i < 3; i++) {
      const x = 948 + i * 23 + Math.sin(lt * 1.8 + i) * (8 + vapor * 22);
      const y = 738 - ((lt * 34 + i * 48) % 155);
      inkLine([[x, y + 24], [x - 8 * Math.sin(lt + i), y + 9], [x + 5, y - 8], [x + 2 * Math.cos(lt + i), y - 26]], 2.2, '#F1E5D2', 'dry');
    }
    if (lt > 3.4) {
      M.umbrella(960, 654, 460, t, -.05 + .02 * Math.sin(lt), '#9A7770');
      M.actor(855, 870, t, 'a', 'hopeful', { u: 34, view: 'q', aR: .42 });
      M.actor(1065, 870, t + 1, 'b', 'happy', { u: 33, view: 'q', aL: .35 });
    }
    camEnd();
    M.wipeIn(lt, [C.rainDk, '#B8C6BF']);
    M.wipeOut(lt, dur, [C.rainDk, '#B8C6BF']);
  }

  shots([[27.5, arrive], [34.3, sleeve], [41.2, sugarShare], [48.1, steamCarry]]);
})();
