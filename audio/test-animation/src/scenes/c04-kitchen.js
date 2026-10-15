// Chapter 4 · a small supper made together (82.5–110 s).
(() => {
  const M = window.MV, C = M.C;

  function counterToast(lt) {
    // A toast slice slowly darkens, then A tries to turn its charred side away.
    const burn = ease(clamp((lt - 1.6) / 1.5));
    const x = 1005 + 7 * Math.sin(lt * 2.3), y = 735;
    paint([[x-50,y],[x-44,y-100],[x-30,y-126],[x+27,y-126],[x+45,y-99],[x+50,y]], {
      wash: burn > .6 ? '#74534A' : '#D9A96E', ink: C.ink, sw: 2.4
    });
    if (burn > .35) {
      paint([[x-30,y-92],[x-26,y-112],[x+12,y-117],[x+34,y-91],[x+32,y-24],[x-31,y-23]], { wash: '#66504B', washOp: 175, ink: null });
    }
  }

  function burn(t, lt, dur) {
    camBegin(960 + 12*Math.sin(lt*.2), 545, 1.02 + .025*Math.sin(lt*.16));
    M.background('home', t);
    // Warm oven glow and the first wisp of smoke are painted marks, not lettering.
    paint(ellPts(1020, 654, 205, 118, 22, 5), { wash:'#D9A879', washOp:75, ink:null });
    counterToast(lt);
    if (lt > 2.4) inkLine([[1035,585],[1018,559+7*Math.sin(lt*2)],[1032,536],[1018,515]], 3, '#8A7770', 'dry');
    const hide = ease(clamp((lt-3.0)/1.5));
    M.actor(775 + 38*hide, 870, t, 'a', lt < 2.3 ? 'confused' : lt < 4.1 ? 'nervous' : 'shy', {u:32, view:'q', aR:.55*hide, lookX:.7});
    M.actor(1265, 870, t+1, 'b', lt < 3.5 ? 'thinking' : 'hopeful', {u:31, view:'q', lookX:-.55});
    M.flower(1450, 800, 15, t, C.gold);
    camEnd(); M.wipeIn(lt,[C.wood,'#E7D7BC']); M.wipeOut(lt,dur,[C.wood,'#D6B57D']);
  }

  function saveToast(t, lt, dur) {
    camBegin(960, 545, 1.08 + .018*Math.sin(lt*.2)); M.background('home',t);
    const offer=ease(clamp((lt-.65)/2.0));
    counterToast(Math.max(2.2,lt));
    // Egg and pan: B quietly sets a golden cover over the burned edge.
    paint(ellPts(1055-30*offer, 710, 69, 24, 16, 2), {wash:'#F0D9A1',ink:C.ink,sw:1.4});
    paint(ellPts(1047-30*offer, 707, 18, 14, 12, 1), {wash:'#E2A35C',ink:null});
    M.actor(805,870,t,'a',lt<2.5?'nervous':'surprised',{u:33,view:'q',lookX:.65});
    M.actor(1195-42*offer,870,t+1,'b',lt<1.6?'thinking':'happy',{u:32,view:'q',aL:.35*offer,lookX:-.4});
    if(lt>3.4) M.heart(1000,555-12*Math.sin(lt*2),.36,105);
    M.flower(1450,800,15,t,C.gold);
    camEnd(); M.wipeIn(lt,[C.wood,'#D6B57D']); M.wipeOut(lt,dur,[C.wood,'#E4C69B']);
  }

  function lastBite(t, lt, dur) {
    camBegin(960+10*Math.sin(lt*.2),545,1.12); M.background('home',t);
    // One little bite travels between them; the eyes follow, then the shared laugh lands.
    const pass=ease(clamp((lt-1.5)/2.3));
    paint(ellPts(960+245*(pass-.5), 704-18*Math.sin(pass*Math.PI), 31, 21, 14, 2), {wash:'#D9A96E',ink:C.ink,sw:1.5});
    M.actor(795,870,t,'a',lt<1.4?'hopeful':lt<3.8?'happy':'laugh',{u:34,view:'q',aR:.22,lookX:.7});
    M.actor(1125,870,t+1,'b',lt<2.5?'happy':'laugh',{u:33,view:'q',aL:.24,lookX:-.55});
    if(lt>4) M.heart(960,550-14*Math.sin(lt*2),.42,120);
    M.flower(1440,800,15,t,C.gold);
    camEnd(); M.wipeIn(lt,[C.wood,'#E4C69B']); M.wipeOut(lt,dur,[C.wood,'#B7C6C1']);
  }

  function flowerCup(t, lt, dur) {
    camBegin(960,545,1.08+.018*Math.sin(lt*.2)); M.background('home',t);
    M.actor(820,870,t,'a',lt<2?'thinking':'relieved',{u:32,view:'q',aR:.25});
    M.actor(1100,870,t+1,'b',lt<2.2?'hopeful':'love',{u:32,view:'q',aL:.35});
    M.cup(963,842,.86,t);
    const seat=ease(clamp((lt-.9)/2.4));
    M.flower(963+65*(1-seat), 747+78*seat+5*Math.sin(lt*2), 15, t, C.gold);
    if(lt>3.5) M.heart(970,560-10*Math.sin(lt*2),.34,95);
    camEnd(); M.wipeIn(lt,[C.wood,'#B7C6C1']); M.wipeOut(lt,dur,[C.wood,'#718A9B']);
  }

  shots([[82.5,burn],[89.3,saveToast],[96.2,lastBite],[103.1,flowerCup]]);
})();
