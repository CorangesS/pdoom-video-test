// Chapter 3 · the walk home beneath one umbrella (55–82.5 s).
(() => {
  const M = window.MV, C = M.C;
  function puddle(t, x, y, k = 1) {
    boilSeed('street-puddle');
    paint(ellPts(x, y, 195 * k, 30 * k, 25, 3), { wash: '#839CA0', fill: '#A7B7B2', fillOp: 58, bleed: .15, ink: '#718A8F', sw: 1.2 });
    for (let i = 0; i < 3; i++) inkLine([[x - 90 * k + i * 50 * k, y + 3 * i], [x - 55 * k + i * 50 * k, y + 3 * i]], 1.1, '#D9D8C9', 'dry');
  }
  function pair(t, ax, bx, walk = 0) {
    M.actor(ax, 874, t, 'a', walk ? 'hopeful' : 'shy', { u: 33, view: walk ? 'side' : 'q', walk, aR: .25 });
    M.actor(bx, 874, t + 1, 'b', walk ? 'happy' : 'love', { u: 32, view: walk ? 'side' : 'q', walk: walk ? walk + .35 : 0, aL: .24 });
  }

  function shareUmbrella(t, lt, dur) {
    camBegin(960 + 18 * Math.sin(lt * .2), 540, 1.04 + .02 * Math.sin(lt * .18));
    M.background('street', t); M.rain(t, 21, 96);
    const swap = ease(clamp((lt - 2.8) / 1.25));
    const tilt = lt < 2.8 ? -.18 : lerp(-.18, .16, swap);
    M.umbrella(962, 645, 505, t, tilt, '#A77770');
    pair(t, 818, 1104);
    M.flower(958, 855, 15, t, C.gold);
    const at = toScreen(960, 440); camEnd();
    if (lt < .42) iris(at[0], at[1], lerp(0, 1580, easeOut(lt / .42)), C.rainDk);
    M.wipeIn(lt, [C.rainDk, '#B8C6BF']);
    M.wipeOut(lt, dur, ['#6F8990', '#B1BDB7']);
  }

  function negotiatePuddle(t, lt, dur) {
    camBegin(960 + 10 * Math.sin(lt * .14), 550, 1.1 + .035 * Math.sin(lt * .15));
    M.background('street', t); M.rain(t, 24, 103);
    puddle(t, 960, 856, 1.05);
    const pause = ease(clamp((lt - 1.4) / .55));
    const step = ease(clamp((lt - 2.9) / .65));
    M.umbrella(958 + 22 * step, 640, 490, t, .06 * Math.sin(lt), '#A77770');
    M.actor(770 + 22 * step, 874 - 16 * step, t, 'a', lt < 2.4 ? 'confused' : 'determined', { u: 34, view: 'q', lookX: .7, aR: .25 + .22 * pause, walk: step > .2 ? 2.7 : 0 });
    M.actor(1145 - 20 * step, 874 - 10 * step, t + 1, 'b', lt < 2.4 ? 'thinking' : 'playful', { u: 33, view: 'q', lookX: -.65, aL: .35, walk: step > .2 ? 2.9 : 0 });
    M.flower(956 + 22 * step, 855 - 10 * step, 15, t, C.gold);
    if (lt > 2.15 && lt < 3.5) { M.heart(930, 572 - 9 * Math.sin(lt * 2), .28, 110); }
    camEnd();
    M.wipeIn(lt, ['#6F8990', '#B1BDB7']);
    M.wipeOut(lt, dur, ['#748C8B', '#D4D4C5']);
  }

  function shoulderTouch(t, lt, dur) {
    camBegin(960, 535, 1.19 + .025 * Math.sin(lt * .2));
    M.background('street', t); M.rain(t, 17, 79);
    puddle(t, 960, 879, .82);
    const close = ease(clamp((lt - 1.0) / 2.1));
    M.umbrella(960, 620, 485, t, -.015 + .04 * Math.sin(lt * .55), '#A77770');
    const ax = lerp(835, 906, close), bx = lerp(1090, 1020, close);
    M.actor(ax, 874, t, 'a', lt < 2.4 ? 'shy' : 'surprised', { u: 35, view: 'q', aR: .18 + .16 * close, lookX: .7 });
    M.actor(bx, 874, t + 1, 'b', lt < 2.4 ? 'hopeful' : 'love', { u: 34, view: 'q', aL: .2 + .12 * close, lookX: -.7 });
    M.flower(960, 850, 15, t, C.gold);
    if (lt > 3.0) { M.heart(960, 500 - 14 * Math.sin(lt * 2), .58, 150); }
    camEnd();
    M.wipeIn(lt, ['#748C8B', '#D4D4C5']);
    M.wipeOut(lt, dur, [C.rainDk, '#BDAF9E']);
  }

  function setOffTogether(t, lt, dur) {
    camBegin(960 + 18 * Math.sin(lt * .18), 540, 1.06 + .025 * Math.sin(lt * .15));
    M.background('street', t); M.rain(t, 16, 70);
    const p = ease(clamp((lt - .65) / 4.4));
    const cx = 900 + p * 170;
    M.umbrella(cx, 630, 500, t, -.015 + .02 * Math.sin(lt * .6), '#A77770');
    M.actor(805 + p * 170, 874, t, 'a', 'happy', { u: 34, view: 'side', walk: 3.1, aR: .24 });
    M.actor(1005 + p * 170, 874, t + 1, 'b', 'happy', { u: 33, view: 'side', walk: 3.45, aL: .22 });
    M.flower(cx + 1, 848, 15, t, C.gold);
    if (lt > 4.4) M.heart(cx + 18, 560 - 8 * Math.sin(lt * 2), .38, 115);
    camEnd();
    M.wipeIn(lt, [C.rainDk, '#BDAF9E']);
    M.wipeOut(lt, dur, [C.rainDk, '#E7D7BD']);
  }

  shots([[55.0, shareUmbrella], [61.9, negotiatePuddle], [68.8, shoulderTouch], [75.6, setOffTogether]]);
})();
