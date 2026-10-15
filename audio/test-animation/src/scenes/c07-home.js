// Chapter 7 · ordinary care, folded into the evening (165–192.5 s).
(() => {
  const M = window.MV, C = M.C;
  const seams = [
    [C.wood, '#E8D9BD'], ['#A2765E', '#D5C3B0'],
    ['#A2765E', '#D5C3B0'], ['#77838A', '#D8C4AB'],
    ['#77838A', '#D8C4AB'], ['#897E79', '#D4BCA4'],
    ['#897E79', '#D4BCA4'], [C.plum, '#E4D2B7']
  ];

  function laundry(t, lt, dur) {
    camBegin(960 + 9 * Math.sin(lt * .2), 545, 1.04 + .01 * Math.sin(lt * .4));
    M.background('home', t);
    // A passes a soft shirt; B squares the fold and returns it with a small pleased take.
    const fold = ease(clamp((lt - 1.25) / 2));
    paint(rrPts(918, 752 - 36 * fold, 152, 90, 18, 4), { wash: '#A9B9B0', ink: C.ink, sw: 1.5 });
    inkLine([[925, 770 - 36 * fold], [992, 805 - 36 * fold], [1060, 770 - 36 * fold]], 2, '#E6D8C4', 'dry');
    M.actor(755 + 22 * fold, 875, t, 'a', lt < 2.7 ? 'thinking' : 'happy', { u: 31, view: 'q', aR: .15 + .36 * fold, dy: -1 * fold });
    M.actor(1170 - 18 * fold, 875, t + 1, 'b', lt < 2.7 ? 'thinking' : 'proud', { u: 31, view: 'q', aL: .12 + .32 * fold, lookX: -.35 });
    M.flower(1285, 820, 12, t, C.gold);
    camEnd(); M.wipeIn(lt, seams[0]); M.wipeOut(lt, dur, seams[1]);
  }

  function mendUmbrella(t, lt, dur) {
    camBegin(960, 545, 1.07 + .012 * Math.sin(lt * .28));
    M.background('evening', t);
    const mend = ease(clamp((lt - 1.3) / 2.7));
    // The old canopy begins lopsided; the curved seam and ribs settle into place as they mend it.
    M.umbrella(965, 700, 430, t, .19 * (1 - mend), '#8D777A');
    inkLine([[793, 686], [834, 605], [890, 561], [966, 548], [1043, 562], [1100, 612], [1137, 684]], 3, '#D7C7B2', 'dry');
    const stitch = clamp((lt - 1.7) / 2.5);
    for (let i = 0; i < 6; i++) {
      const x = 850 + i * 43, y = 613 - 45 * Math.sin(i * Math.PI / 6);
      if (stitch > i / 6) paint(ellPts(x, y, 4, 3, 8, 1), { wash: C.cream, ink: C.ink, sw: .5 });
    }
    M.actor(790, 875, t, 'a', lt < 2.5 ? 'thinking' : 'relieved', { u: 32, view: 'q', aR: .42, lookX: .3 });
    M.actor(1160, 875, t + 1, 'b', lt < 2.5 ? 'hopeful' : 'happy', { u: 31, view: 'q', aL: .35, lookX: -.3 });
    if (lt > 4.6) M.heart(973, 520 - 7 * Math.sin(lt * 2), .38, 100);
    camEnd(); M.wipeIn(lt, seams[2]); M.wipeOut(lt, dur, seams[3]);
  }

  function leaveTea(t, lt, dur) {
    camBegin(960 + 10 * Math.sin(lt * .16), 545, 1.06);
    M.background('home', t);
    M.actor(810, 875, t, 'a', lt < 2 ? 'thinking' : 'sleepy', { u: 32, view: 'q', aR: -.22, dy: lt > 3.5 ? .45 : 0 });
    M.actor(1135, 875, t + 1, 'b', lt < 2.3 ? 'hopeful' : 'relieved', { u: 31, view: 'q', aL: .3 });
    const place = ease(clamp((lt - 1.15) / 2.1));
    M.cup(958, 840, .74, t);
    if (lt < 4.7) {
      const bx = lerp(1100, 970, place), by = lerp(735, 742, place);
      inkLine([[1075, 820], [bx, by + 24]], 3, C.ink);
    }
    M.flower(1275, 813, 13, t, C.gold);
    if (lt > 3.4) M.heart(1010, 650 - 8 * Math.sin(lt * 2), .38, 110);
    camEnd(); M.wipeIn(lt, seams[4]); M.wipeOut(lt, dur, seams[5]);
  }

  function windowRest(t, lt, dur) {
    camBegin(960 + 14 * Math.sin(lt * .12), 540, 1.05 + .018 * Math.sin(lt * .25));
    M.background('evening', t);
    // Rain strokes outside soften as they settle by the same broad, pale window wash.
    M.rain(t, 10, 40);
    const lean = ease(clamp((lt - 1.2) / 3.2));
    M.actor(830 + 36 * lean, 875, t, 'a', 'sleepy', { u: 34, view: 'q', aR: -.2, dy: .4 });
    M.actor(1110 - 34 * lean, 875, t + 1, 'b', 'relieved', { u: 33, view: 'q', aL: -.08 });
    M.pot(1290, 875, .66, 1);
    M.flower(1293, 807, 12, t, C.gold);
    // A quiet shared beat: their heads tip, then remain together while the flower sways.
    if (lt > 2.2) M.heart(970, 565 - 5 * Math.sin(lt * 1.4), .32, 80);
    camEnd(); M.wipeIn(lt, seams[6]); M.wipeOut(lt, dur, seams[7]);
  }

  shots([[165.0, laundry], [171.8, mendUmbrella], [178.7, leaveTea], [185.6, windowRest]]);
})();
