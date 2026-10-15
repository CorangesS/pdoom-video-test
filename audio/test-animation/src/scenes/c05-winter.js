// Chapter 5 · taking turns keeping warm (110–137.5 s).
(() => {
  const M = window.MV, C = M.C;

  function blanket(x, y, width, t, spread=0) {
    const sway=3*Math.sin(t*1.7);
    paint([[x-width/2,y-28],[x-width*.42,y-68-spread],[x-width*.12,y-51-spread*.8],[x+width*.16,y-65-spread],[x+width/2,y-23],[x+width*.43,y+15],[x-width*.42,y+14]], {
      wash:'#8899A4', ink:C.ink, sw:1.7, curv:.2
    });
    inkLine([[x-width*.34,y-12+sway],[x-width*.12,y-7-sway],[x+width*.1,y-13+sway],[x+width*.32,y-5]],2,'#C4C9BD','dry');
  }

  function ill(t, lt, dur) {
    camBegin(960+14*Math.sin(lt*.18),545,1.03+.025*Math.sin(lt*.18)); M.background('winter',t);
    // Cool window light and a little shiver in B's curled pose.
    blanket(1090,826,520,t,0);
    M.actor(1110,867,t+1, 'b', lt<2.7?'sad':'sleepy', {u:31,view:'q',dy:2*Math.sin(lt*5),sq:.15,lookX:-.5});
    M.actor(600,870,t,'a','nervous',{u:30,view:'side',walk:lt<3?1.8:0});
    M.flower(1450,800,14,t,C.gold);
    camEnd(); M.wipeIn(lt,[C.wood,'#718A9B']); M.wipeOut(lt,dur,[C.wood,'#8A9BA0']);
  }

  function water(t, lt, dur) {
    camBegin(960,545,1.08); M.background('winter',t);
    // Cup arcs carefully from A's hand to B; B's eyes rise before the drink reaches them.
    const hand=ease(clamp((lt-.8)/2.2));
    M.cup(790+280*hand,690-44*Math.sin(hand*Math.PI),.72,t,'#D9B978');
    blanket(1090,826,520,t,12);
    M.actor(800-34*hand,870,t,'a',lt<1.5?'thinking':'hopeful',{u:32,view:'q',aR:.5*hand,lookX:.72});
    M.actor(1110,867,t+1,'b',lt<2.5?'sad':'relieved',{u:31,view:'q',dy:1.4*Math.sin(lt*3),lookX:-.65});
    // Warmth begins as a restrained pool of painted pigment around the cup.
    if(lt>2.4) paint(ellPts(1060,680,160,110,20,5),{wash:'#D5B878',washOp:38,ink:null});
    M.flower(1450,800,14,t,C.gold);
    camEnd(); M.wipeIn(lt,[C.wood,'#8A9BA0']); M.wipeOut(lt,dur,[C.wood,'#B28B6C']);
  }

  function doze(t, lt, dur) {
    camBegin(960+8*Math.sin(lt*.14),545,1.13);
    M.background('winter',t);
    // Lamplight gradually warms the shared room while A's head sinks into sleep.
    paint(ellPts(1280,575,340,270,24,6),{wash:'#D9B87C',washOp:58+20*Math.sin(lt),ink:null});
    blanket(915,840,540,t,4);
    M.actor(900,870,t,'a',lt<2?'determined':'sleepy',{u:33,view:'q',dy:lt<2?0:2*Math.sin(lt*2),lookX:-.35});
    M.actor(1175,866,t+1,'b',lt<2?'relieved':'thinking',{u:31,view:'q',lookX:-.55});
    M.cup(1440,844,.65,t,'#D9B978');
    M.flower(1440,800,14,t,C.gold);
    camEnd(); M.wipeIn(lt,[C.wood,'#B28B6C']); M.wipeOut(lt,dur,[C.wood,'#D0C4AF']);
  }

  function cover(t, lt, dur) {
    camBegin(960,545,1.12+.015*Math.sin(lt*.18)); M.background('winter',t);
    // B notices A asleep, then pulls the blanket and scarf up over A's shoulder.
    const tuck=ease(clamp((lt-1.4)/2.3));
    blanket(920,825,520,t,34*tuck);
    M.actor(900,870,t,'a','sleepy',{u:33,view:'q',dy:2*Math.sin(lt*1.7),noLegs:true});
    M.actor(1175-38*tuck,870,t+1,lt<1.4?'thinking':'love',{u:32,view:'q',aL:.55*tuck,lookX:-.65});
    // A soft rose scarf rests visibly across A's shoulder as the blanket settles.
    if(tuck>.2) inkLine([[842,658],[880,648],[916,660],[953,647]],7,'#D7837C','dry');
    M.flower(1440,800,14,t,C.gold);
    if(lt>4.3) M.heart(1010,552-10*Math.sin(lt*1.8),.34,90);
    camEnd(); M.wipeIn(lt,[C.wood,'#D0C4AF']); M.wipeOut(lt,dur,[C.wood,'#B4C69F']);
  }

  shots([[110.0,ill],[116.8,water],[123.7,doze],[130.6,cover]]);
})();
