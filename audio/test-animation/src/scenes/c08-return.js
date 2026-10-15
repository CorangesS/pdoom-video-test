// Chapter 8 · return to the same shelter, no longer alone (192.5–220.22 s).
(() => {
  const M = window.MV, C = M.C;

  function returnToShelter(t, lt, dur) {
    camBegin(960 + 12 * Math.sin(lt * .14), 540, 1.02);
    M.background('station', t); M.rain(t, 20, 80);
    M.actor(720, 870, t, 'a', lt < 3 ? 'thinking' : 'hopeful', { u: 32, view: 'side', walk: lt < 2.8 ? 2.1 : 0 });
    M.actor(1270, 870, t + 1, 'b', 'hopeful', { u: 31, lookX: -.5 });
    M.flower(1000, 840, 17, t, C.gold);
    M.umbrella(720, 655, 410, t, -.06, '#8D9D91');
    camEnd(); M.wipeIn(lt, [C.rainDk, '#B7C4B8']); M.wipeOut(lt, dur, [C.rainDk, C.rose]);
  }

  function offerUmbrella(t, lt, dur) {
    camBegin(960, 540, 1.08);
    M.background('station', t); M.rain(t, 20, 72);
    const meet = ease(clamp(lt / 4.5));
    M.umbrella(lerp(745, 955, meet), 650, 530, t, lerp(-.16, -.01, meet), '#A46F6A');
    M.actor(720 + 92 * meet, 870, t, 'a', lt < 3.7 ? 'shy' : 'love', { u: 33, view: 'q', aR: .65 * meet, lookX: .6 });
    M.actor(1250 - 85 * meet, 870, t + 1, 'b', lt < 3.7 ? 'surprised' : 'love', { u: 32, view: 'q', aL: .3 * meet, lookX: -.5 });
    M.flower(1000, 850, 17, t, C.gold);
    if (lt > 4) M.heart(960, 540 - 10 * Math.sin(lt * 1.8), .52, 145);
    camEnd(); M.wipeIn(lt, [C.rainDk, C.rose]); M.wipeOut(lt, dur, [C.rainDk, '#E6D5B6']);
  }

  function walkHome(t, lt, dur) {
    camBegin(960 + 45 * Math.sin(lt * .12), 535, 1.08 + .015 * Math.sin(lt * .17));
    M.background('street', t); M.rain(t, 11, 48);
    M.umbrella(960, 652, 550, t, .02 * Math.sin(lt * .55), '#A46F6A');
    const step = 18 * Math.sin(lt * 2.2);
    M.actor(865 + step, 870, t, 'a', 'happy', { u: 33, view: 'q', walk: 2.2, aR: .35 });
    M.actor(1052 - step, 870, t + 1, 'b', 'happy', { u: 33, view: 'q', walk: 2.7, aL: .2 });
    M.flower(960, 850, 17, t, C.gold);
    if (lt > 2.2) M.heart(960 + 30 * Math.sin(lt), 530, .36, 120);
    camEnd(); M.wipeIn(lt, [C.rainDk, '#E6D5B6']); M.wipeOut(lt, dur, [C.rainDk, '#EBDABF']);
  }

  function lastRain(t, lt, dur) {
    camBegin(960, 540, 1.08 + .02 * Math.sin(lt * .14));
    M.background('station', t); M.rain(t, Math.max(0, 14 - lt * 1.8), Math.max(0, 56 - lt * 7));
    M.umbrella(960, 655, 590, t, .01 * Math.sin(lt * .45), '#A46F6A');
    M.actor(872, 870, t, 'a', 'love', { u: 34, view: 'q', aR: .2 });
    M.actor(1048, 870, t + 1, 'b', 'love', { u: 34, view: 'q', aL: .16 });
    M.flower(960, 834 - 4 * Math.sin(lt * 1.1), 18, t, C.gold);
    if (lt > 1.2) M.heart(960, 526 - 12 * Math.sin(lt), .35 + .08 * Math.sin(lt * .7), 120);
    camEnd(); M.wipeIn(lt, [C.rainDk, '#EBDABF']);
    if (lt > dur - .7) {
      const p = clamp((lt - (dur - .7)) / .7);
      iris(960, 790, lerp(1700, 0, ease(p)), C.rainDk);
    }
  }

  shots([[192.5, returnToShelter], [199.4, offerUmbrella], [206.3, walkHome], [213.1, lastRain]]);
})();
