// Shared watercolor world and recurring props. Keep this file stable across chapters.
window.MV = (() => {
  const C = {
    ink: '#34323B', paper: '#F6EBDD', rain: '#78949B', rainDk: '#526F78',
    rose: '#D7837C', roseDk: '#9A5757', clay: '#C87853', clayDk: '#864B3F',
    gold: '#E6B958', leaf: '#76936C', leafDk: '#506D59', sky: '#B6C6C0',
    dusk: '#738B95', cream: '#F4DDB3', plum: '#756879', wood: '#A56F55'
  };
  const seed = k => boilSeed('mv-' + k);

  function background(place, t) {
    const palette = {
      station: ['#9EB5B6', '#D9D0BF', '#718489'], cafe: ['#B8C6BF', '#E7D6B9', '#93634F'],
      street: ['#9EB4B7', '#D4D4C5', '#687F86'], home: ['#C8B9A7', '#E7D7BC', '#846957'],
      winter: ['#718A9B', '#B7C7C5', '#495D70'], garden: ['#B4C7A3', '#DBD3AE', '#80916D'],
      evening: ['#7C8290', '#C4AA97', '#625F70']
    }[place] || ['#B6C6C0', '#E5D8C5', '#7D8982'];
    seed('sky');
    paint(rectPts(-60, -60, W + 120, H + 120, 3), { wash: palette[0], ink: null });
    paint(ellPts(960 + 18 * Math.sin(t * .18), 370, 810, 360, 24, 6), { fill: palette[1], fillOp: 90, bleed: .22, tex: .55, ink: null });
    if (place === 'station' || place === 'street') {
      seed('distant-city');
      for (let i = 0; i < 6; i++) {
        const x = -50 + i * 380, h = 180 + hash(i + 8) * 260;
        paint(rectPts(x, 505 - h, 300, h, 7), { wash: i % 2 ? '#A0B1AE' : '#899FA0', washOp: 155, ink: null });
        for (let j = 0; j < 3; j++) paint(rrPts(x + 32 + j * 76, 430 - h, 25, 38, 6), { wash: '#E8D6B8', washOp: 115, ink: null });
      }
    }
    if (place === 'cafe' || place === 'home' || place === 'winter' || place === 'evening' || place === 'garden') {
      seed('interior');
      paint(rectPts(190, 185, 1540, 560, 5), { wash: place === 'winter' ? '#B8C9CA' : '#EAD8BC', ink: C.ink, sw: 2 });
      paint(rectPts(255, 245, 1410, 450, 4), { wash: place === 'winter' ? '#93AEBB' : '#C8D4C7', ink: null });
      inkLine([[955, 245], [955, 695]], 4, C.ink);
      inkLine([[255, 470], [1665, 470]], 4, C.ink);
      paint(rectPts(-80, 760, W + 160, 420, 6), { wash: place === 'winter' ? '#7A7276' : '#AF8266', ink: null });
      if (place === 'garden') {
        for (let i = 0; i < 7; i++) flower(320 + i * 210, 290 + 24 * Math.sin(t * .4 + i), 10 + 4 * (i % 3), t + i, i % 2 ? '#E5A183' : C.gold);
      }
    } else {
      paint(ellPts(960, 900, 1320, 280, 28, 8), { wash: palette[2], fill: palette[2], fillOp: 65, bleed: .12, ink: C.ink, sw: 1.2 });
    }
    if (place === 'station') {
      seed('shelter');
      paint(rectPts(330, 275, 1250, 30, 4), { wash: '#697A7A', ink: C.ink, sw: 3 });
      inkLine([[420, 290], [420, 755]], 10, '#596D72');
      inkLine([[1500, 290], [1500, 755]], 10, '#596D72');
      paint(rectPts(430, 700, 1040, 26, 6), { wash: C.wood, ink: C.ink, sw: 2 });
      inkLine([[495, 725], [485, 880]], 8, C.ink); inkLine([[1410, 725], [1420, 880]], 8, C.ink);
    }
    if (place === 'cafe') {
      seed('cafe-details');
      paint(rectPts(350, 620, 1240, 34, 16), { wash: C.wood, ink: C.ink, sw: 2 });
      inkLine([[470, 650], [440, 890]], 11, C.ink); inkLine([[1480, 650], [1510, 890]], 11, C.ink);
      paint(rectPts(250, 760, 70, 180, 10), { wash: C.leaf, ink: null });
      flower(284, 735, 17, t, C.rose);
    }
    if (place === 'home' || place === 'winter' || place === 'evening') {
      seed('home-details');
      paint(rrPts(675, 705, 560, 155, 28, 5), { wash: place === 'winter' ? '#8E8990' : '#809486', ink: C.ink, sw: 2 });
      paint(rectPts(760, 836, 36, 100, 3), { wash: C.wood, ink: null }); paint(rectPts(1110, 836, 36, 100, 3), { wash: C.wood, ink: null });
    }
    if (place === 'garden') {
      seed('garden-ground');
      paint(ellPts(960, 920, 1500, 250, 28, 4), { wash: '#84966E', fill: '#A7AE78', fillOp: 60, bleed: .18, ink: null });
    }
  }

  function rain(t, amount = 22, alpha = 110) {
    seed('rain');
    for (let i = 0; i < amount; i++) {
      const x = hash(i * 17 + 2) * W, y = (hash(i * 29 + 4) * H + t * (350 + 90 * hash(i))) % (H + 70) - 35;
      inkLine([[x, y], [x - 20, y + 52]], .8 + hash(i + 44) * 1.1, `rgba(91,124,137,${alpha / 255})`, 'dry');
    }
  }

  function flower(x, y, r, t, col = C.gold) {
    seed(`flower-${Math.round(x)}-${Math.round(y)}`);
    const bob = 2.2 * Math.sin(t * 2.1 + x * .01);
    for (let i = 0; i < 5; i++) {
      const a = i * TAU / 5 + t * .035;
      paint(ellPts(x + Math.cos(a) * r * .68, y + bob + Math.sin(a) * r * .68, r * .48, r * .38, 9, 1), { wash: col, ink: C.ink, sw: .8 });
    }
    paint(ellPts(x, y + bob, r * .32, r * .32, 10, 1), { wash: '#D88D53', ink: C.ink, sw: .6 });
    inkLine([[x, y + r * .9], [x - 2, y + r * 2.5]], 2, C.leafDk);
    return [x, y + bob];
  }

  function umbrella(x, y, w, t, tilt = 0, col = '#A86561') {
    seed('umbrella-' + Math.round(x));
    const top = y - w * .43, pts = [[x - w / 2, y], [x - w * .43, y - w * .22], [x - w * .25, top + 8], [x, top], [x + w * .25, top + 8], [x + w * .43, y - w * .22], [x + w / 2, y]];
    push(); translate(x, y); rotate(tilt); translate(-x, -y);
    paint(pts, { wash: col, fill: col, fillOp: 72, bleed: .08, ink: C.ink, sw: 2, curv: .15 });
    inkLine([[x, top + 3], [x, y + w * .68]], 4, C.ink);
    inkLine([[x, y + w * .68], [x + 14, y + w * .76], [x + 23, y + w * .68]], 4, C.ink);
    for (let i = -1; i <= 1; i++) inkLine([[x + i * w * .25, top + 10], [x + i * w * .37, y - 2]], 1.2, '#F0D9BB', 'dry');
    pop();
  }

  function cup(x, y, s = 1, t = 0, drink = C.cream) {
    seed('cup-' + Math.round(x));
    paint(rrPts(x - 34 * s, y - 66 * s, 68 * s, 68 * s, 11 * s, 3), { wash: '#EBD8BC', ink: C.ink, sw: 2 });
    paint(ellPts(x, y - 65 * s, 34 * s, 11 * s, 14, 1), { wash: drink, ink: C.ink, sw: 1.5 });
    paint(ellPts(x + 40 * s, y - 38 * s, 16 * s, 24 * s, 12, 1), { wash: '#EBD8BC', ink: C.ink, sw: 2 });
    for (let i = 0; i < 2; i++) inkLine([[x - 10 * s + i * 20 * s, y - 82 * s], [x - 17 * s + i * 18 * s + Math.sin(t * 2 + i) * 5, y - 105 * s]], 1.4, '#F5EBD7', 'dry');
  }

  function heart(x, y, s = 1, alpha = 255) {
    seed('heart-' + Math.round(x));
    paint(heartPts(x, y, 24 * s), { wash: C.rose, washOp: alpha, ink: C.roseDk, sw: 1.2 });
  }

  function pot(x, y, s = 1, growth = 1) {
    seed('pot-' + Math.round(x));
    paint(ellPts(x, y - 35 * s, 47 * s, 12 * s, 14, 2), { wash: '#73594D', ink: C.ink, sw: 1.5 });
    paint([[x - 42 * s, y - 32 * s], [x + 42 * s, y - 32 * s], [x + 32 * s, y + 36 * s], [x - 32 * s, y + 36 * s]], { wash: '#BD7960', ink: C.ink, sw: 2 });
    inkLine([[x, y - 35 * s], [x + Math.sin(tick(growth)) * 6 * s, y - 100 * s * growth]], 4 * s, C.leafDk);
    if (growth > .35) inkLine([[x, y - 66 * s * growth], [x - 36 * s, y - 84 * s * growth], [x - 52 * s, y - 80 * s * growth]], 5 * s, C.leaf);
    if (growth > .62) inkLine([[x + 2 * s, y - 84 * s * growth], [x + 32 * s, y - 105 * s * growth], [x + 48 * s, y - 100 * s * growth]], 5 * s, C.leaf);
    if (growth > .94) flower(x + 4 * s, y - 108 * s, 11 * s, growth, C.gold);
  }
  function tick(v) { return v * 5.2; }

  function actor(x, y, t, role = 'a', mood = 'neutral', extra = {}) {
    const isB = role === 'b';
    const defaults = isB
      ? { col: C.rose, dk: C.roseDk, lt: '#F0B9A6', hat: 'flower', seed: 27, boilKey: 'partner-b' }
      : { col: C.clay, dk: C.clayDk, lt: '#E1A177', seed: 12, boilKey: 'partner-a' };
    const f = feel(mood, t, { view: 'front' });
    clawd(x, y, extra.u || 29, { ...f, ...defaults, ...extra });
  }

  function wipeIn(lt, cols = [C.rainDk, C.paper]) { if (lt < .32) brushWipe(.5 + lt / .64, cols); }
  function wipeOut(lt, dur, cols = [C.rainDk, C.paper]) { if (lt > dur - .32) brushWipe((lt - (dur - .32)) / .64, cols); }
  return { C, background, rain, flower, umbrella, cup, heart, pot, actor, wipeIn, wipeOut };
})();
