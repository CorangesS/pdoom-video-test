// Chapter 1 · a small kindness under the station shelter (0–27.5 s).
(() => {
  const M = window.MV, C = M.C;

  function arrive(t, lt, dur) {
    camBegin(960 + 15 * Math.sin(lt * .16), 540, 1 + .018 * lt);
    M.background('station', t); M.rain(t, 23, 95);
    M.flower(1000, 840, 17, t, C.gold);
    const x = lerp(390, 690, ease(clamp(lt / 4.5)));
    M.actor(x, 870, t, 'a', lt < 3.7 ? 'thinking' : 'surprised', { u: 30, view: 'side', walk: lt < 4.5 ? 3.5 : 0 });
    M.actor(1235, 870, t + 1, 'b', 'hopeful', { u: 29, lookX: -.4 });
    if (lt > 2.7) {
      M.umbrella(1220, 675, 360, t, -.08, '#8D9D91');
      M.actor(1235, 870, t + 1, 'b', 'hopeful', { u: 29, lookX: -.4 });
    }
    const at = toScreen(1000, 790); camEnd();
    if (lt < .55) iris(...at, lerp(0, 1600, easeOut(lt / .55)), C.rainDk);
    M.wipeOut(lt, dur, [C.rainDk, '#B7C4B8']);
  }

  function notice(t, lt, dur) {
    camBegin(960 + 24 * Math.sin(lt * .2), 540, 1.04 + .02 * Math.sin(lt * .12));
    M.background('station', t); M.rain(t, 27, 100);
    M.umbrella(970, 655, 510, t, lerp(-.3, -.03, ease(clamp(lt / 2.8))), '#9E746F');
    const bend = ease(clamp((lt - 1) / 2));
    M.flower(1000, 850 - 28 * bend, 18, t, C.gold);
    M.actor(760 + 25 * Math.sin(lt * .4), 870, t, 'a', lt < 2 ? 'confused' : 'shy', { u: 32, aR: .55 * bend, dy: -1.5 * bend });
    M.actor(1190, 870, t + 1, 'b', lt < 2.2 ? 'thinking' : 'love', { u: 31, aL: .3 * bend, lookX: -.5 });
    camEnd(); M.wipeIn(lt, [C.rainDk, '#B7C4B8']); M.wipeOut(lt, dur, [C.rainDk, C.rose]);
  }

  function shareShelter(t, lt, dur) {
    camBegin(960 + 16 * Math.sin(lt * .25), 535, 1.1);
    M.background('station', t); M.rain(t, 24, 85);
    M.umbrella(960, 650, 550, t, -.025 + .04 * Math.sin(lt * .5), '#A46F6A');
    const approach = ease(clamp(lt / 3.4));
    M.actor(790 + 65 * approach, 870, t, 'a', lt < 3 ? 'nervous' : 'relieved', { u: 33, view: 'q', aR: .28 });
    M.actor(1180 - 60 * approach, 870, t + 1, 'b', lt < 3 ? 'shy' : 'happy', { u: 32, view: 'q', aL: .16 });
    if (lt > 3) M.heart(980, 595 - 15 * Math.sin(lt * 2), .42, 130);
    M.flower(963, 855, 18, t, C.gold);
    camEnd(); M.wipeIn(lt, [C.rainDk, C.rose]); M.wipeOut(lt, dur, [C.rainDk, '#E1C9A9']);
  }

  function carryFlower(t, lt, dur) {
    camBegin(960, 545, 1.12 + .025 * Math.sin(lt * .18));
    M.background('station', t); M.rain(t, 16, 65);
    M.umbrella(965, 655, 550, t, -.02, '#A46F6A');
    const sip = ease(clamp((lt - 1.3) / 1.8));
    M.actor(875, 870, t, 'a', 'hopeful', { u: 34, aR: .6 * sip, view: 'q' });
    M.actor(1055, 870, t + 1, 'b', 'love', { u: 33, aL: .5 * sip, view: 'q' });
    M.cup(966, 833, .7, t);
    M.flower(966, 778 - 12 * Math.sin(lt * 1.5), 14, t, C.gold);
    if (lt > 3.7) {
      M.actor(890 + 12 * Math.sin(lt), 870, t, 'a', 'happy', { u: 34, view: 'side', walk: 2.3 });
      M.actor(1080 + 12 * Math.sin(lt), 870, t + 1, 'b', 'happy', { u: 33, view: 'side', walk: 2.3 });
    }
    camEnd(); M.wipeIn(lt, [C.rainDk, '#E1C9A9']); M.wipeOut(lt, dur, [C.rainDk, '#E7D6B8']);
  }

  shots([[0, arrive], [6.8, notice], [13.7, shareShelter], [20.6, carryFlower]]);
})();
