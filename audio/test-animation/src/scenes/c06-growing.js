// Chapter 6 · tending the little flower into spring (137.5–165 s).
(() => {
  const M = window.MV, C = M.C;
  const seams = [
    [C.rainDk, '#B7C4B8'], ['#87946E', '#E5D7B6'],
    ['#87946E', '#E5D7B6'], ['#A2765E', '#E8D9BD'],
    ['#A2765E', '#E8D9BD'], ['#82966F', '#E7DDB8'],
    ['#82966F', '#E7DDB8'], [C.wood, '#E8D9BD']
  ];

  function plant(t, lt, dur) {
    camBegin(960 + 12 * Math.sin(lt * .2), 550, 1.03 + .015 * Math.sin(lt * .35));
    M.background('garden', t);
    const lean = ease(clamp((lt - 1.1) / 2.1));
    M.actor(730, 875, t, 'a', lt < 1.5 ? 'thinking' : 'hopeful', { u: 32, view: 'q', aR: .35 + .5 * lean, dy: -1.1 * lean });
    M.actor(1190, 875, t + 1, 'b', lt < 1.5 ? 'happy' : 'proud', { u: 31, view: 'q', aL: .3 + .4 * lean, lookX: -.25 });
    M.pot(960, 870, 1.15, .12 + .12 * ease(clamp((lt - 2) / 3)));
    M.flower(960, 815, 12, t, C.gold);
    if (lt > 2.7) {
      M.actor(730, 875, t, 'a', 'happy', { u: 32, view: 'q', aR: .65 });
      M.actor(1190, 875, t + 1, 'b', 'love', { u: 31, view: 'q', aL: .5 });
    }
    camEnd(); M.wipeIn(lt, seams[0]); M.wipeOut(lt, dur, seams[1]);
  }

  function waterAndGrow(t, lt, dur) {
    camBegin(960, 545, 1.06 + .02 * Math.sin(lt * .22));
    M.background('garden', t);
    // The watering can tips in a short arc; the plant's height follows a slow spring growth.
    const pour = ease(clamp((lt - 1.4) / 1.2));
    const growth = .24 + .76 * ease(clamp((lt - .4) / 5.6));
    M.pot(960, 870, 1.15, growth);
    M.actor(760 + 24 * Math.sin(lt * .35), 875, t, 'a', lt < 1.3 ? 'thinking' : 'happy', {
      u: 31, view: 'q', aR: .2 + .5 * pour, dy: -1.3 * pour,
      armR: (u, sw) => {
        push(); rotate(-.18 - .48 * pour);
        paint(rrPts(3 * u, -14 * u, 1.7 * u, 2.1 * u, .28 * u, 3), { wash: '#829A91', ink: C.ink, sw: 1.4 });
        paint(ellPts(3.85 * u, -14 * u, .75 * u, .45 * u, 10, 1), { wash: '#B7D7C5', ink: C.ink, sw: 1 }); pop();
      }
    });
    M.actor(1190, 875, t + 1, 'b', growth < .78 ? 'hopeful' : 'excited', { u: 31, view: 'q', aL: .38, lookX: -.4 });
    if (lt > 2.4 && lt < 4.3) {
      const drip = clamp((lt - 2.4) / 1.9);
      for (let i = 0; i < 4; i++) {
        const x = 978 + i * 10, y = 695 + ((lt * 145 + i * 26) % 110);
        paint(ellPts(x, y, 3, 7, 8, 1), { wash: '#A9C9C0', ink: null });
      }
    }
    if (growth > .82) M.heart(1090, 560 - 8 * Math.sin(lt * 2), .42, 110);
    camEnd(); M.wipeIn(lt, seams[2]); M.wipeOut(lt, dur, seams[3]);
  }

  function transplant(t, lt, dur) {
    camBegin(960 + 8 * Math.sin(lt * .24), 545, 1.04);
    M.background('home', t);
    const spill = ease(clamp((lt - 1.45) / .55));
    const recover = ease(clamp((lt - 3.5) / 1.7));
    M.pot(1050, 875, 1.05, .98);
    // Larger receiving pot and the slipped clump make the mishap legible before they react.
    M.pot(790, 895, 1.32, .88);
    paint(ellPts(906 + 38 * spill, 879, 76 * spill, 27 * spill, 18, 3), { wash: '#705844', ink: C.ink, sw: 1.2 });
    for (let i = 0; i < 7; i++) {
      const k = hash(i + 31), x = 820 + 190 * k + 75 * spill, y = 870 + (i % 3) * 19 + 18 * spill;
      paint(ellPts(x, y, 6 + 4 * k, 4 + 3 * k, 8, 1), { wash: '#82694F', ink: null });
    }
    M.actor(735 - 22 * recover, 875, t, 'a', lt < 2.2 ? 'surprised' : 'laugh', { u: 32, view: 'q', aR: lt < 2.5 ? .8 : -.15, dy: -1.2 * spill * (1 - recover) });
    M.actor(1190 + 18 * recover, 875, t + 1, 'b', lt < 2.2 ? 'surprised' : 'laugh', { u: 31, view: 'q', aL: lt < 2.5 ? .65 : -.1 });
    if (lt > 2.1) {
      // Hands work at different rhythms, sweeping the loose earth toward the pot.
      const sweep = Math.sin((lt - 2.1) * 2.3);
      inkLine([[870, 875], [910 + 35 * sweep, 865], [946, 876]], 4, '#8A7155', 'dry');
      inkLine([[1090, 876], [1050 - 30 * sweep, 864], [1016, 876]], 4, '#8A7155', 'dry');
    }
    M.flower(1053, 740, 15, t, C.gold);
    camEnd(); M.wipeIn(lt, seams[4]); M.wipeOut(lt, dur, seams[5]);
  }

  function springHold(t, lt, dur) {
    camBegin(960 + 10 * Math.sin(lt * .18), 540, 1.07 + .012 * Math.sin(lt * .4));
    M.background('garden', t);
    const glow = ease(clamp(lt / 4.8));
    M.pot(960, 875, 1.18, 1);
    M.flower(966, 744, 16, t, C.gold);
    M.actor(790, 875, t, 'a', 'relieved', { u: 33, view: 'q', aR: .18 + .14 * Math.sin(lt * 1.1) });
    M.actor(1130, 875, t + 1, 'b', 'love', { u: 32, view: 'q', aL: .2 - .1 * Math.sin(lt * 1.25) });
    if (lt > 1.4) M.heart(965, 560 - 12 * Math.sin(lt * 1.8), .5, 100 + 45 * glow);
    // Their attention settles together on the flower, then their shoulders ease closer.
    const close = ease(clamp((lt - 2.5) / 2.8));
    M.actor(790 + 30 * close, 875, t, 'a', 'happy', { u: 33, view: 'q', aR: .12 });
    M.actor(1130 - 30 * close, 875, t + 1, 'b', 'happy', { u: 32, view: 'q', aL: .14 });
    camEnd(); M.wipeIn(lt, seams[6]); M.wipeOut(lt, dur, seams[7]);
  }

  shots([[137.5, plant], [144.3, waterAndGrow], [151.2, transplant], [158.1, springHold]]);
})();
