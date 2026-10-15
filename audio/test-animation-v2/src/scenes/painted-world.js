window.F = (() => {
  const C={ink:'#393343',paper:'#F4EBDD',warm:'#E9B06D',rose:'#C96F72',brick:'#A9594C',blue:'#647F91',deep:'#405366',leaf:'#728B64',cream:'#F8EBD1',skin:'#E5AE8C',hair:'#493C40',gold:'#E3B659'};
  const seed=k=>boilSeed('film-'+k), V=(x,y)=>[x,y], P=(pts,col,sw=1,fill=col)=>paint(pts,{wash:col,fill,fillOp:64,bleed:.05,tex:.35,ink:C.ink,sw,curv:.035});
  const ell=(x,y,rx,ry,col,sw=.8)=>paint(ellPts(x,y,rx,ry,18,2),{wash:col,fill:col,fillOp:72,bleed:.07,ink:C.ink,sw});
  const line=(pts,w,col=C.ink)=>inkLine(pts,w,col);
  function tint(a,b,k){const c=s=>s.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)),x=c(a),y=c(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*clamp(k)).toString(16).padStart(2,'0')).join('');}
  function sky(t,p='dusk'){
    const colors={dusk:['#667C8B','#D5A17D','#586978'],street:['#92A9AB','#E7C9A5','#728B84'],home:['#8B8190','#E4B47F','#665C65'],hometown:['#77949A','#D9C3A2','#60766C'],beach:['#668A9C','#E7B77E','#547579'],memory:['#746D84','#E9C68E','#66606C']},a=colors[p]||colors.dusk;
    seed('sky');paint(rectPts(-40,-40,W+80,H+80,4),{wash:a[0],ink:null});
    paint(ellPts(270+9*Math.sin(t*.13),H*.32,420,300,30,5),{fill:a[1],fillOp:110,bleed:.28,tex:.6,ink:null});
    // Each lyric world has its own silhouette; only the street gets a low, drifting roofline.
    if(p==='street'||p==='dusk'){seed('farline');for(let i=0;i<8;i++){const x=i*112-25-(t*10%112),h=68+hash(i+17)*100;P([[x,H*.72-h],[x+31,H*.72-h-17],[x+82,H*.72-h-5],[x+105,H*.72-h],[x+105,H*.72],[x,H*.72]],i%2?'#7B8284':'#64777B',.5);for(let j=0;j<2;j++)ell(x+26+j*39,H*.72-h+31,3.5,5,'#F4D79F',.2);}}
    if(p==='hometown'){seed('old-roofs');for(let i=0;i<5;i++){const x=i*132-30-(t*5%132),h=120+hash(i+3)*95;P([[x,H*.68-h],[x+54,H*.68-h-35],[x+114,H*.68-h],[x+114,H*.68],[x,H*.68]],i%2?'#9C755E':'#81756E',.55,i%2?'#A27A60':'#8D8176');for(let j=0;j<3;j++)line([[x+22+j*28,H*.68-h+37],[x+42+j*28,H*.68-h+34]],1,'#D6BC98');}}
    if(p==='beach'){P([[0,H*.53],[W,H*.53],[W,H*.72],[0,H*.72]],'#57858C',.2,'#6E999B');for(let i=0;i<3;i++)ell(60+i*220,H*.56+i%2*15,155,18,'#A6B5A5',.1);}
    if(p==='memory'){for(let i=0;i<6;i++){const x=30+i*102-t*13%102,y=H*.66+36*Math.sin(t*.33+i);ell(x,y,32+hash(i)*18,2,'#EAD3A9',.1);}}
    P([[0,H*.72],[W,H*.69],[W,H+20],[0,H+20]],a[2],1,a[2]);
    if(p!=='beach'&&p!=='hometown')for(let i=0;i<7;i++){const x=((i*103-t*14)%700+700)%700-80,y=H*.75+24*Math.sin(t*.7+i);line([[x,y],[x-9,y+45],[x-22,y+78]],2,'#65765E');ell(x-23,y+76,14,5,C.leaf,.3);}
  }
  function room(t,light=0){
    seed('room');paint(rectPts(-20,-20,W+40,H+40,4),{wash:light?'#B49B90':'#8D8990',ink:null});
    P([[35,145],[505,145],[505,625],[35,625]],'#725F63',1.2,'#C5B6A3');
    P([[54,165],[486,165],[486,598],[54,598]],light?'#D8B893':'#8FA4A6',.7,light?'#E8C89B':'#A7BBC0');
    line([[270,165],[270,598]],4,'#776A67');line([[54,377],[486,377]],4,'#776A67');
    for(let i=0;i<9;i++){const x=35+i*61;P([[x,680],[x+61,680],[x+51,H],[x-8,H]],i%2?'#8D766D':'#A28673',.8);}
    // keepsake books and small objects make the room feel inhabited
    for(let i=0;i<4;i++)P([[70+i*21,720-i*5],[83+i*21,720-i*5],[83+i*21,778-i*5],[70+i*21,778-i*5]],['#B36F61','#71818C','#D1AC6E','#758B68'][i],.4);
    ell(430,220,44,44,light?'#F5D795':'#D6A47B',.4);
  }
  function view(t,kind='dawn'){
    const palettes={dawn:['#91A8AA','#E9BD83','#72847A'],night:['#5E7186','#CAB0A2','#687682'],hometown:['#8AA39B','#D9B78B','#788A72'],memory:['#A3ABA5','#EBD3A3','#7B897A']},a=palettes[kind]||palettes.dawn;
    seed('outside-view');P([[55,166],[485,166],[485,597],[55,597]],a[0],.4,a[0]);
    ell(365+30*Math.sin(t*.12),245,42,42,a[1],.2);
    P([[55,470],[160,365],[245,458],[335,340],[485,450],[485,597],[55,597]],a[2],.3,a[2]);
    // A nearby branch crosses the window at another speed, giving the room a living exterior.
    line([[60+14*Math.sin(t*.35),205],[130,278],[105+16*Math.sin(t*.4),370]],5,'#5E725F');
    for(let i=0;i<12;i++){const x=76+i*31+12*Math.sin(t*.35+i),y=245+(i%4)*38+7*Math.cos(t*.5+i);ell(x,y,8,4,i%2?'#728B68':'#8C9A70',.2);}
    line([[270,165],[270,598]],4,'#776A67');line([[55,377],[485,377]],4,'#776A67');
  }
  function person(x,y,h,kind,t,o={}){
    // Clawd, the blocky orange Claude Code crab. The song changes its gestures,
    // age and setting; the recognizable pixel mascot remains the protagonist.
    const age=clamp(o.age||0),gait=(o.walk||0)*(1-.48*age),phase=t*8+(o.phase||0),lean=o.lean||0;
    const X=v=>x+v*h*.68,Y=v=>y+v*h,orange=tint('#F28A3D','#B97C58',age*.7),light=tint('#FFB45E','#D3A17A',age*.55),dark=tint('#D96731','#766D68',age*.72);
    const poly=(pts,col)=>paint(pts,{wash:col,fill:col,fillOp:100,bleed:0,tex:0,ink:'#8E4B32',sw:Math.max(.7,h*.003)});
    const swing=Math.sin(phase)*gait*.07,bob=Math.abs(Math.sin(phase))*gait*.018;
    seed('clawd-'+kind);
    // Pixel-stepped square shell, with age shown as gentle fading rather than human traits.
    const tilt=(o.twirl||0)*.06*Math.sin(t*8)+lean*.08,local=(pts,col)=>poly(pts.map(([a,b])=>[a*h*.68,b*h]),col);
    push();translate(x,y);rotate(tilt);
    // Four compact pixel legs with a small alternating step.
    for(let i=0;i<4;i++){
      const side=i<2?-1:1,back=i%2===0?-1:1,step=Math.sin(phase+(i%2)*Math.PI)*gait*.035,lift=Math.max(0,Math.cos(phase+(i%2)*Math.PI))*gait*.025;
      const ex=side*(.15+Math.abs(back)*.09+step),ey=-.34+lift;
      local([[side*.12,-.51+bob],[side*.19,-.51+bob],[ex+.035,ey],[ex-.025,ey]],dark);
      local([[ex-.035,ey-.025],[ex+.05,ey-.025],[ex+.05,ey+.015],[ex-.035,ey+.015]],light);
    }
    // The two claws reach outward and inward to make contact with the other Clawd.
    for(const side of [-1,1]){
      const reach=side<0?o.left:o.right,ex=side*(reach?.46:.40)+side*swing*.25,ey=reach?-.69+(reach[1]+.45)*.16:-.73+Math.cos(phase+side)*.025;
      local([[side*.24,-.69+bob],[side*.31,-.66+bob],[ex,ey+.025],[ex-side*.025,ey-.025]],dark);
      local([[ex-side*.045,ey-.045],[ex+side*.025,ey-.065],[ex+side*.075,ey-.02],[ex+side*.025,ey+.005]],light);
      local([[ex-side*.045,ey+.045],[ex+side*.025,ey+.065],[ex+side*.075,ey+.02],[ex+side*.025,ey-.005]],orange);
    }
    local([[-.27,-.94+bob],[.25,-.94+bob],[.25,-.89+bob],[.31,-.89+bob],[.31,-.55+bob],[.25,-.55+bob],[.25,-.50+bob],[-.25,-.50+bob],[-.25,-.55+bob],[-.31,-.55+bob],[-.31,-.89+bob],[-.27,-.89+bob]],orange);
    local([[-.24,-.89+bob],[.23,-.89+bob],[.23,-.84+bob],[-.24,-.84+bob]],light);
    local([[-.25,-.56+bob],[.25,-.56+bob],[.25,-.51+bob],[-.25,-.51+bob]],dark);
    // Tiny dark square eyes sit directly on the shell, like the terminal sprite.
    for(const side of [-1,1]){
      local([[side*.14-.018,-.82+bob],[side*.14+.018,-.82+bob],[side*.14+.018,-.77+bob],[side*.14-.018,-.77+bob]],C.ink);
      local([[side*.14-.009,-.81+bob],[side*.14,-.81+bob],[side*.14,-.80+bob],[side*.14-.009,-.80+bob]],C.cream);
    }
    if(age>.5)for(let i=0;i<4;i++)local([[-.18+i*.1,-.67+bob],[-.145+i*.1,-.67+bob],[-.145+i*.1,-.64+bob],[-.18+i*.1,-.64+bob]],'#DED0B6');
    pop();
    return {handL:[X(lean-.48),Y(-.64)],handR:[X(lean+.48),Y(-.64)]};
  }
  function bike(x,y,s,t,tilt=0){seed('bike');const r=30*s,spin=t*4;push();translate(x,y);rotate(tilt);
    for(const cx of [-r,r]){ell(cx,0,r,r,'#8CA2A0',1);line([[cx-Math.cos(spin)*r*.82,-Math.sin(spin)*r*.82],[cx+Math.cos(spin)*r*.82,Math.sin(spin)*r*.82]],.8,C.cream);}
    const crank=Math.sin(spin)*r*.35;line([[-r,0],[-r*.1,-r*.72],[r*.1,0],[r,0],[-r,0],[r*.25,-r*.2],[r*.1,0]],3,'#484850');
    line([[r*.1,-r*.72],[r*.37,-r*.92],[r*.52,-r*.92]],3,'#484850');line([[-r*.1,-r*.72],[-r*.28,-r*.92],[-r*.48,-r*.92]],2,'#6E5B55');
    ell(r*.08+crank,crank,3,3,C.warm,.2);pop();}
  function petals(t,x,y,n=14,spread=28,wind=1){seed('petals');for(let i=0;i<n;i++){const a=i*2.4+t*(.25+hash(i)*.2),r=spread*(.3+hash(i+3))*wind;ell(x+Math.cos(a)*r,y+Math.sin(a)*r*.7,3+hash(i+5)*3,2,C.rose,.15);}}
  function page(t,progress=0){seed('page');P([[75,790],[260,830],[260,920],[75,876]],'#D6C2A4',1,'#F2E5CE');P([[260,830],[468,780],[468,866],[260,920]],'#C5AA8C',1,'#E8D8BD');
    const curl=progress;line([[260,830],[260+80*curl,824-110*curl],[260+82*curl,918-120*curl],[260,920]],2,'#F8EBD6');}
  function window(t){for(let i=0;i<12;i++){const x=(i*71-t*46)%650;ell(x,H*.56+36*Math.sin(t*.5+i),3+hash(i)*5,2,C.cream,.2);}}
  function wipe(lt,dur,c1='#8B6570',c2='#E5C39D'){if(lt<.32)brushWipe(.5+lt/.64,[c1,c2]);if(lt>dur-.32)brushWipe((lt-(dur-.32))/.64,[c1,c2]);}
  return {C,sky,room,view,person,bike,petals,page,window,wipe,ell,line,P};
})();
