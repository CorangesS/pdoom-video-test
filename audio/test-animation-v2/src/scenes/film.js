// A visual retelling of the song: a couple grows from a storybook evening into a shared lifetime.
(() => {
  const F=window.F,C=F.C,person=F.person;
  function opening(t,lt,d){F.room(t,1);F.page(t,clamp(lt/7));
    const glow=ease(clamp((lt-1)/4));F.ell(270,360,100+90*glow,90+60*glow,'#E9C27C',.2);
    if(lt>1){const k=ease(clamp((lt-1)/2));person(215,785,205,'a',t,{walk:.25*k,lean:-.02});person(345,785,205,'b',t,{walk:.2*k,lean:.02});}
    if(lt>4){F.petals(t,280,480,20,80,1.4);}
    F.wipe(lt,d,'#726F7B','#E9C27C');}
  function bicycle(t,lt,d){camBegin(270+25*Math.sin(lt*.12),480,1.04+.1*ease(clamp(lt/7)));F.sky(t,'dusk');
    const x=lerp(-130,675,ease(clamp(lt/7)));F.bike(x,700,1.35,t,.015*Math.sin(t*3));
    person(x,648,228,'b',t,{walk:1.15,lean:.04,left:[-.20,-.34],right:[.28,-.45]});
    person(x-48,632,228,'a',t,{walk:1.1,lean:.025,left:[-.26,-.42],right:[.23,-.37]});
    // sparks of reflected evening light stream behind the moving bicycle
    for(let i=0;i<11;i++){const q=(lt*85+i*49)%700,yy=690+Math.sin(i*3+t)*42;F.line([[W-q,yy],[W-q-20,yy+5]],1.2,i%3?'#F5D5A7':'#D88976');}
    camEnd();F.wipe(lt,d,'#776F7A','#DDA47F');}
  function dress(t,lt,d){camBegin(270,560,1.22+.05*Math.sin(lt*.35));F.sky(t,'street');
    const spin=TAU*ease(clamp((lt-1)/3.8)), orbit=92*Math.cos(spin),x=270+36*Math.sin(spin);
    person(x,744,285,'a',t,{walk:1.35,twirl:1,lean:.08*Math.sin(spin),right:[.10,-.42],left:[-.10,-.38]});
    person(270-orbit,744,254,'b',t,{walk:.95,lean:-.06,right:[-.10,-.42],left:[.10,-.36]});
    for(let i=0;i<7;i++){const a=spin+i*TAU/7;F.line([[x,610],[x+Math.cos(a)*105,620+Math.sin(a)*100]],2,'#F2E7D2');}
    F.petals(t,x,600,24,125,1.3);camEnd();F.wipe(lt,d,'#D38D7D','#E7C5A3');}
  function pages(t,lt,d){F.sky(t,'memory');F.page(t,1);
    const k=lt/8;for(let i=0;i<5;i++){const x=80+i*95-35*Math.sin(lt*.65+i);F.P([[x,390],[x+76,360],[x+91,720],[x+8,747]],i%2?'#D8BE9D':'#EDE0C8',.5,i%2?'#D8BE9D':'#EDE0C8');
      const s=.44+.06*Math.sin(lt+i);person(x+40,690,200*s,i%2?'b':'a',t+i,{walk:1.2,age:i<k*2.4?1:0});}
    if(lt>4)for(let i=0;i<9;i++){let x=80+i*52+lt*28,y=440+Math.sin(i*2+lt)*60;F.ell(x%550,y,3,2,C.gold,.1);}
    F.wipe(lt,d,'#776C82','#E3C7A1');}
  function pageArrival(t,lt,d){F.sky(t,'street');F.page(t,1);
    const roll=ease(clamp((lt-.35)/3.8));F.bike(lerp(650,292,roll),730,1.15,t,.1*(1-roll));
    person(286,676,228,'a',t,{walk:1.25*(1-roll),lean:-.08,right:[.24,-.44]});
    person(320,662,224,'b',t,{walk:1.15*(1-roll),lean:.04,left:[-.22,-.40]});
    // the drawn page turns into a real evening street; loose ink lines become the lane
    for(let i=0;i<9;i++){const x=(i*83+lt*64)%620-40;F.line([[x,490],[x-40,745]],1.2,'#E9D5B4');}
    F.wipe(lt,d,'#776C82','#DFAF89');}
  function firstKiss(t,lt,d){camBegin(270,700,1.22);F.sky(t,'street');
    const step=ease(clamp(lt/1.5)),kiss=ease(clamp((lt-3.2)/.18))*(1-ease(clamp((lt-4.7)/.55))),recoil=ease(clamp((lt-5.2)/.7));F.ell(270,770,145,19,'#607478',.4);
    const ax=186+29*step-8*recoil,bx=354-29*step+8*recoil,pa={lean:.025*step,headX:.12*kiss,right:[.22,-.47],left:[-.06,-.39]},pb={lean:-.02*step,headX:-.12*kiss,left:[-.22,-.47],right:[.06,-.39]};
    person(ax,760,270,'a',t,pa);person(bx,760,264,'b',t,pb);
    if(lt>3.5)F.petals(t,270,548,9,22,.65);
    camEnd();F.wipe(lt,d,'#B27571','#DBAD8F');}
  function handRun(t,lt,d){camBegin(270+15*Math.sin(lt*.5),550+8*Math.sin(lt*1.1),1.08+.06*Math.sin(lt*.4));F.sky(t,'street');
    const travel=ease(clamp((lt-1.1)/3.8)),center=lerp(135,405,travel)+9*Math.sin(lt*3),x1=center-72,x2=center+72;
    person(x1,760-28*Math.abs(Math.sin(lt*4)),252,'a',t,{walk:2.9,lean:.13,right:[.45,-.46],left:[-.25,-.42]});
    person(x2,760-28*Math.abs(Math.sin(lt*4+.5)),250,'b',t,{walk:2.7,lean:-.12,left:[-.45,-.45],right:[.25,-.35]});
    F.line([[x1+78,650],[x2-78,650]],5,'#E6AF88');
    for(let i=0;i<6;i++)F.line([[i*110-(lt*100%110),820],[i*110-(lt*100%110)-35,822]],1,'#E8D2B6');
    camEnd();F.wipe(lt,d,'#B27571','#CFA17E');}
  function hometown(t,lt,d){F.sky(t,'hometown');
    // tiled lane bends in perspective; camera follows them toward the old house
    for(let i=0;i<9;i++){let yy=530+i*55+16*Math.sin(t*.3+i);F.line([[0,yy],[540,yy-30]],1.1,'#D8C3A3');}
    for(let side of [0,1]){let x=side?430:0;F.P([[x,270],[x+110,240],[x+105,690],[x,725]],side?'#A96F5E':'#8F766B',1,side?'#BA8C73':'#A28877');
      for(let j=0;j<4;j++)F.P([[x+15,320+j*78],[x+43,310+j*78],[x+43,355+j*78],[x+15,363+j*78]],'#6E817E',.5);}
    F.P([[155,310],[385,310],[405,590],[137,590]],'#71806F',1,'#9E9D7E');
    const walk=ease(clamp(lt/6));person(205+35*walk,775,253,'a',t,{walk:1.25,right:[.30,-.42]});person(350+10*walk,775,248,'b',t,{walk:1.15,left:[-.29,-.42]});
    if(lt>3){F.line([[252,672],[293,670]],4,'#E1AF8C');F.petals(t,271,600,9,26,.3);}
    F.wipe(lt,d,'#71888B','#C8B493');}
  function oldNew(t,lt,d){F.sky(t,'hometown');const k=ease(clamp((lt-2)/9));
    // A hometown doorway anchors the camera while its weathered colour gently returns to the present.
    F.P([[64,340],[270,205],[476,340],[462,718],[78,718]],k>.5?'#B6886F':'#907E73',1,k>.5?'#C29A7D':'#A48F81');
    F.P([[54,340],[270,195],[486,340],[465,374],[270,255],[75,374]],'#8C6658',1,'#A97860');
    F.P([[204,410],[336,410],[336,700],[204,700]],'#615D5A',1,'#78685F');
    F.P([[218,422],[322,422],[322,700],[218,700]],'#B2A081',.7,'#BCA888');
    F.line([[269,420],[269,695]],2,'#756B5E');
    for(let i=0;i<15;i++){const x=55+i*30,y=680+18*Math.sin(i*2.4+t*.4);F.ell(x,y,5,10,i%2?'#71886D':'#83936E',.2);}
    person(207-16*k,790,255,'a',t,{age:k,walk:.65,right:[.25,-.39]});person(344+16*k,790,250,'b',t,{age:k,walk:.6,left:[-.24,-.39]});
    // one white dress / one raised hand carry the young couple into the same familiar street years later
    if(lt>5){F.ell(270,380,7,7,C.gold,.1);F.petals(t,270,400,8,45,.45);}
    F.wipe(lt,d,'#71888B','#E0BD92');}
  function chorusWalk(t,lt,d){F.sky(t,'memory');
    const p=lt/8,x1=lerp(165,220,p),x2=lerp(382,318,p);
    person(x1,755,263,'a',t,{walk:1.7,lean:.04,right:[.42,-.44]});person(x2,755,259,'b',t,{walk:1.65,lean:-.04,left:[-.42,-.43]});
    F.line([[x1+78,646],[x2-78,646]],4,'#E7B48D');
    for(let i=0;i<4;i++){const q=(lt*.24+i*.25)%1;F.ell(270,610-q*390,9+8*Math.sin(q*PI),10+8*Math.sin(q*PI),['#E6B25F','#E9D8BD','#CF7D77','#8B9A71'][i],.2);}
    if(lt>4)F.ell(270,420,45+8*Math.sin(t),40,'#D17A79',.15);
    F.wipe(lt,d,'#807487','#E8C49A');}
  function seasons(t,lt,d){F.sky(t,'memory');
    const k=ease(clamp(lt/19));
    // one continuous landscape cycles from falling blossoms to summer rain to gold leaves
    for(let i=0;i<42;i++){const x=(i*83+lt*(22+hash(i)*30))%600-25,y=(i*137+lt*(12+hash(i+4)*28))%800+30;F.ell(x,y,3+hash(i+8)*4,2+hash(i+6)*3,['#E8A0A0','#F3DFB3','#D59359','#E8DAD1'][Math.floor((lt/5+i)%4)],.1);}
    const x=160+160*Math.sin(lt*.28),x2=380-130*Math.sin(lt*.28);
    person(x,780,250,'a',t,{walk:.8,lean:.06});person(x2,780,246,'b',t,{walk:.8,lean:-.05});
    if(lt>5){F.bike(270,775,.95,t,.12*Math.sin(lt));}
    if(lt>10){F.ell(270,330,70,70,['#E6AFA0','#DCC68E','#91A28B'][Math.floor(lt/4)%3],.2);}
    if(lt>15)F.page(t,k);F.wipe(lt,d,'#77778A','#DEC29A');}
  function dessert(t,lt,d){camBegin(270,710+6*Math.sin(lt*.22),1.18);F.room(t,1);F.view(t,'night');F.P([[55,655],[490,655],[512,682],[28,682]],'#75584B',1,'#9A725B');
    const shift=ease(clamp((lt-2)/1.8));person(175+60*shift,775,252,'a',t,{lean:.04,right:[.35,-.36]});person(365-60*shift,775,252,'b',t,{lean:-.04,left:[-.3,-.38]});
    // dessert arrives on a lively high arc, then is shared
    const q=ease(clamp((lt-1)/2.8)),dx=lerp(80,270,q),dy=lerp(570,655,q)-140*Math.sin(PI*q);F.ell(dx,dy,31,16,'#F2D9AE',.8);F.ell(dx,dy-13,17,14,'#D97875',.4);
    if(lt>4){F.ell(270,615,11,11,C.gold,.1);F.line([[260,655],[280,655]],2,'#EEE0C9');}
    camEnd();F.wipe(lt,d,'#775F62','#E0B98E');}
  function bedsides(t,lt,d){camBegin(270,710,1.18);F.room(t,0);F.view(t,'night');F.P([[60,600],[480,600],[492,790],[45,790]],'#685C67',1,'#897381');
    const swap=ease(clamp((lt-2)/2));person(lerp(180,355,swap),765,236,'a',t,{walk:.2,lean:.15*Math.sin(lt*2)});person(lerp(360,185,swap),765,236,'b',t,{walk:.2,lean:-.12*Math.sin(lt*2)});
    F.P([[85,625],[455,625],[448,735],[92,735]],'#E3D7C4',.8,'#E8DDCC');
    for(let i=0;i<5;i++){F.ell(170+i*54,578+10*Math.sin(lt*2+i),5,6,'#E0AE7C',.3);}
    camEnd();F.wipe(lt,d,'#5F6678','#BCA6A1');}
  function beach(t,lt,d){camBegin(270,520,1.06+.06*Math.sin(lt*.3));F.sky(t,'beach');
    F.P([[0,550],[540,535],[540,780],[0,800]],'#55A1A7',.7,'#70ABB0');
    for(let i=0;i<8;i++){const yy=570+i*31+12*Math.sin(t*1.8+i);F.line([[0,yy],[105,yy+9],[245,yy-4],[390,yy+12],[540,yy]],2,'#D6E1D3');}
    F.P([[0,770],[540,735],[540,960],[0,960]],'#D6B285',.8,'#DFC49D');
    const run=ease(clamp(lt/2));person(lerp(125,215,run)+40*Math.sin(lt*2),780,255,'a',t,{walk:2.2,lean:.16,right:[.37,-.50]});person(lerp(410,330,run)-36*Math.sin(lt*2),780,252,'b',t,{walk:2.1,lean:-.14,left:[-.38,-.49]});
    F.petals(t,280,620,18,80,1.1);camEnd();F.wipe(lt,d,'#718B93','#E9C294');}
  function suitcase(t,lt,d){camBegin(270,710,1.18);F.room(t,1);F.view(t,'dawn');const k=ease(clamp((lt-.7)/2));
    F.P([[140,660],[399,660],[425,835],[115,835]],'#71808C',1,'#8192A0');F.line([[220,660],[220,620],[320,620],[320,660]],4,'#504C55');
    person(174,780,235,'a',t,{lean:.13,right:[.40,-.42],left:[-.25,-.37]});person(373,780,235,'b',t,{lean:-.08,left:[-.38,-.47],right:[.27,-.37]});
    const items=[['#F0E5D4',95,590],['#D87976',454,560],['#D1AD6E',100,500],['#728B78',450,475]];
    items.forEach(([col,x,y],i)=>{const q=ease(clamp((lt-.7-i*.32)/1.1));F.P([[lerp(x,270,q)-20,lerp(y,690,q)-12],[lerp(x,270,q)+20,lerp(y,690,q)-12],[lerp(x,270,q)+18,lerp(y,690,q)+12],[lerp(x,270,q)-18,lerp(y,690,q)+12]],col,.5,col);});
    if(lt>4){F.P([[118,655],[422,655],[414,687],[125,687]],'#D3C2A7',.5,'#E2D3BC');}
    camEnd();F.wipe(lt,d,'#71808C','#E5C59A');}
  function sunrise(t,lt,d){F.sky(t,'dusk');
    const dawn=ease(clamp(lt/6));F.ell(270,310+60*dawn,105,105,'#F4D196',.2);
    F.bike(lerp(-90,290,ease(clamp((lt-1)/4))),760,1.25,t,0);
    person(245,685,245,'a',t,{walk:1.15,right:[.26,-.42]});person(300,670,240,'b',t,{walk:1.15,left:[-.25,-.4]});
    F.petals(t,270,465,18,90,.7);F.wipe(lt,d,'#756C7E','#EEC99D');}
  function chorusOrbit(t,lt,d){F.sky(t,'memory');const a=lt*.6,cx=270,cy=510,r=125;
    const x1=cx+Math.cos(a)*r,x2=cx-Math.cos(a)*r,y1=750+Math.sin(a)*24,y2=750-Math.sin(a)*24;
    F.ell(cx,390,37+7*Math.sin(t*1.2),31,'#D8877D',.15);for(let i=0;i<5;i++){let yy=390-60+i*24;F.line([[45,yy],[120+40*Math.sin(lt+i),yy-10]],1,'#F1DEC2');}
    person(x1,y1,248,'a',t,{walk:1.3,lean:.09*Math.sin(a),right:[.36,-.46]});person(x2,y2,247,'b',t,{walk:1.2,lean:-.08*Math.sin(a),left:[-.36,-.46]});
    F.wipe(lt,d,'#847488','#EBC699');}
  function elder(t,lt,d){camBegin(270,710,1.15);F.room(t,1);F.view(t,'memory');const age=ease(clamp((lt-1)/4));
    person(210,785,250,'a',t,{age,walk:.3,lean:.02,right:[.34,-.42]});person(346,785,248,'b',t,{age,walk:.3,lean:-.02,left:[-.34,-.42]});
    if(lt>2){F.bike(270,777,.8,t,.02);}
    for(let i=0;i<6;i++){const x=65+i*78+40*Math.sin(lt*.15+i);F.ell(x,300+Math.sin(lt*.4+i)*24,4,3,'#E6BE79',.2);}
    camEnd();F.wipe(lt,d,'#82798A','#E5BD8F');}
  function closing(t,lt,d){F.room(t,1);F.view(t,'memory');const a=ease(clamp(lt/4));
    F.ell(270,465,75+8*Math.sin(t),64,'#E6B873',.13);F.petals(t,275,455,18,80,.65);
    F.page(t,1-a*.45);person(215,760,255,'a',t,{age:1,walk:.15,right:[.2,-.42]});person(342,760,252,'b',t,{age:1,walk:.15,left:[-.2,-.42]});
    if(lt>d-1.3)iris(270,500,lerp(620,0,ease(clamp((lt-(d-1.3))/1.3))),'#5D5869');}
  shots([[0,opening],[8,bicycle],[15,dress],[23,pages],[31,pageArrival],[37.11,firstKiss],[45.12,handRun],[52.37,hometown],[60.15,oldNew],[74.17,chorusWalk],[82.9,handRun],[91.4,chorusOrbit],[99.42,seasons],[121.91,dessert],[130.14,bedsides],[137.29,beach],[145.07,suitcase],[153.42,sunrise],[158.81,chorusOrbit],[167,chorusWalk],[175,elder],[184.4,seasons],[198.13,closing]]);
})();
