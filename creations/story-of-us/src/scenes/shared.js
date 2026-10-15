// All geometry is 2D, all randomness is seeded, and every frame is a pure function of song time.
(() => {
  const C={paper:'#F3EBDC',ink:'#40373F',clay:'#D97757',rose:'#C98991',gold:'#D5AB68',sage:'#839982',blue:'#A5B6BE',deep:'#667B88',cream:'#F7EDDA',red:'#B85C5F',night:'#566377'};
  const shape=(p,col,sw=1,ink=C.ink)=>paint(p,{wash:col,ink,sw});
  const box=(x,y,w,h,c,sw=1)=>shape(rectPts(x,y,w,h,1),c,sw,sw?C.ink:null);
  const oval=(x,y,rx,ry,c,sw=0)=>shape(ellPts(x,y,rx,ry,22,1),c,sw,sw?C.ink:null);
  const stroke=(p,sw=1,c=C.ink)=>inkLine(p,sw,c,'inkfine',.25);
  function backdrop(t,kind='garden',warm=.5,options={}){
    boilSeed('sky');
    const sky=mixCol('#CFDADE','#F0DEC5',warm);
    box(-30,-30,W+60,H+60,C.paper,0);
    shape([[44,175],[W-50,160],[W-35,1025],[48,1040]],kind==='night'?C.night:sky,0,null);
    paint(ellPts(735,400,235,175,20,9),{fill:kind==='night'?'#BBAA94':'#FFF1CE',fillOp:80,bleed:.18,tex:.55,ink:null});
    if(kind!=='room'){
      if(kind==='night'){oval(810,304,72,72,'#E6D6B7');for(let i=0;i<9;i++)oval(110+hash(i)*860,225+hash(i+20)*420,2+2*pulse(t+i),3,C.cream);}
      else {if(!options.noSun)oval(818,330-20*Math.sin(t*.04),73,73,'#EAD0A0');cloud(260+18*Math.sin(t*.07),304,1.15);cloud(720+12*Math.sin(t*.09),520,.7);}
    }
    boilSeed('ground');
    shape([[38,941],[300,926],[600,946],[W-34,916],[W-34,1115],[40,1130]],kind==='night'?'#79818B':mixCol('#C3CEBE','#D4C3A6',warm),0,null);
    stroke([[60,995],[320,988],[600,1004],[1005,985]],.6,'#A69787');
    if(kind==='street'){
      for(let i=0;i<4;i++){
        boilSeed('houses'+i);const x=45+i*275,y=565+(i%2)*50;
        box(x,y,220,366,['#C0C2B9','#B2BEC0','#DDC6B1','#B7BBB0'][i],0);
        shape([[x-12,y],[x+110,y-99],[x+230,y],[x+220,y+22],[x,y+22]],'#918F8E',.7);
        for(let j=0;j<2;j++)box(x+40+j*105,y+65,42,64,'#E7DCC5',.6);
      }
    }
    if(kind==='garden'||kind==='river'){
      shape([[42,841],[236,747],[489,838],[762,760],[W-34,839],[W-34,955],[42,955]],'#A9B9A7',0,null);
      shape([[42,910],[278,839],[540,880],[834,836],[W-34,900],[W-34,967],[42,967]],'#99AF9C',0,null);
      if(kind==='river'){shape([[44,1001],[265,943],[611,967],[W-36,918],[W-36,1100],[44,1100]],'#A5BCC0',0,null);for(let i=0;i<5;i++)stroke([[140+i*170,1010+15*Math.sin(t+i)],[215+i*170,1010+15*Math.sin(t+i)]],.5,C.cream);}
    }
    if(kind==='room'){
      box(95,285,360,400,'#A9B9BA',1.5);box(112,303,326,362,'#CAD4CE',0);oval(352,389,47,47,'#EFDBB6');
      stroke([[275,304],[275,664]],1.8,'#8E8276');stroke([[111,477],[439,477]],1.8,'#8E8276');
      for(let side of [100,441]){shape([[side,288],[side+18,280],[side+36,639],[side-18,688],[side-28,390]],'#E9DCCA',.6);}
      stroke([[53,1015],[1024,1015]],1,'#B4A08A');
      for(let i=0;i<4;i++)stroke([[60,1060+i*32],[1020,1050+i*32]],.4,'#C1AB92');
    }
    boilSeed('grass');
    if(kind==='garden'||kind==='river')for(let i=0;i<8;i++){
      const x=95+i*127,y=1030+(i%3)*15;
      stroke([[x,y],[x+6*Math.sin(t*.7+i),y-27],[x-12,y-38]],.75,'#80947D');
    }
  }
  function cloud(x,y,s){boilSeed('cloud'+Math.round(y));push();translate(x,y);scale(s);shape([[-110,18],[-97,-5],[-59,-12],[-39,-34],[2,-31],[23,-12],[64,-7],[91,14],[112,21],[20,34],[-75,32]],'#E6E7DB',0,null);pop();}
  function actor(id,x,y,u,t,lt,keys=[[0,'neutral']],o={}){
    const m=emotions(lt,keys,{take:.45});
    clawd(x,y,u,{...m,tintK:.18,boilKey:'actor-'+id,seed:id==='b'?7:2,swMul:.75,
      ...(id==='b'?{col:C.rose,dk:'#AA6E7D',lt:'#E8B6B7',hat:'flower'}:{}),...o});
  }
  function flower(x,y,s,t=0){boilSeed('flower'+Math.round(x));stroke([[x,y],[x+3*Math.sin(t),y-58*s]],1.2,C.sage);shape([[x,y-20*s],[x-26*s,y-39*s],[x-21*s,y-18*s],[x,y-12*s]],C.sage,.4);for(let i=0;i<5;i++){const a=i*TAU/5;oval(x+14*s*Math.cos(a),y-65*s+14*s*Math.sin(a),12*s,11*s,'#EBD9AD',.25);}oval(x,y-65*s,7*s,7*s,C.gold,.3);}
  function sprout(x,y,s,g,t){boilSeed('pot');shape([[x-54*s,y-79*s],[x+54*s,y-79*s],[x+42*s,y],[x-42*s,y]],'#CFA28A',1);oval(x,y-80*s,58*s,14*s,'#927B64',.6);if(g>.01){stroke([[x,y-86*s],[x+9*Math.sin(t*.6)*g,y-(90+110*g)*s]],2,C.sage);for(let i=0;i<3;i++){const yy=y-(106+i*30*g)*s;shape([[x,yy],[x+(i%2?-45:45)*g*s,yy-20*s*g],[x+(i%2?-24:24)*g*s,yy+4*s]],C.sage,.4);}if(g>.7)flower(x+9*Math.sin(t*.6)*g,y-(122*g)*s,s*1.1*g,t);}}
  function mug(x,y,s,t,col=C.cream){boilSeed('mug'+Math.round(x));oval(x+33*s,y-17*s,16*s,20*s,col,1);oval(x+34*s,y-17*s,8*s,12*s,'#DDCEB9',0);shape([[x-29*s,y-51*s],[x+28*s,y-51*s],[x+25*s,y],[x-22*s,y]],col,1);oval(x,y-49*s,28*s,8*s,'#9A806D',.5);for(let i=0;i<2;i++)stroke([[x+(i-.5)*20*s,y-67*s],[x+(i-.5)*20*s+8*Math.sin(t*1.6+i),y-89*s],[x+(i-.5)*20*s-7*Math.sin(t*1.5+i),y-120*s]],.65,'#B8A58E');}
  function book(x,y,s,open=1,pair=0,t=0){boilSeed('book');push();translate(x,y);scale(s);shape([[-325,30],[-20,65],[325,30],[325,260],[-10,292],[-325,255]],'#B9836E',1.2);shape([[-310,15],[-35,-12],[0,24],[38,-12],[310,15],[309,237],[31,215],[0,248],[-36,216],[-310,232]],C.cream,1.1);stroke([[0,24],[0,248]],1,'#BAA894');for(let side of [-1,1])for(let i=0;i<4;i++)stroke([[side*40,155+i*16],[side*265,168+i*16]],.45,'#D7C9B3');
    if(pair>=0){clawd(-153,136,12,{...feel('neutral',t),noShadow:true,boilKey:'book-a',swMul:.6});}
    if(pair>0){clawd(157,136,12,{...feel('happy',t),col:C.rose,dk:'#AA6E7D',lt:'#E8B6B7',hat:'flower',noShadow:true,boilKey:'book-b',swMul:.6});}
    if(open<1){const k=1-open;shape([[-327,4],[-327+650*k,15],[-327+650*k,264],[-327,256]],'#B9836E',1.1);}
    pop();}
  function pencil(x,y,s,rot=0){boilSeed('pencil');push();translate(x,y);rotate(rot);shape([[-7*s,-84*s],[9*s,-84*s],[8*s,15*s],[0,34*s],[-7*s,15*s]],C.gold,1);shape([[-7*s,15*s],[0,34*s],[8*s,15*s]],'#E6C6A3',.5);stroke([[0,29*s],[0,34*s]],2,C.ink);pop();}
  function redThread(points,sw=2.2){boilSeed('red-thread');stroke(points,sw,C.red);}
  function heart(x,y,s,t=0){boilSeed('heart');shape(heartPts(x,y,s*(1+.035*Math.sin(t*2))),C.red,.55);}
  function lamp(x,y,t,on=1){boilSeed('lamp');stroke([[x,y],[x,y-425]],3.3,'#7C7C77');shape([[x-38,y-425],[x+38,y-425],[x+24,y-353],[x-25,y-353]],on?'#E9C484':'#BDBCB0',1.2);shape([[x-47,y-430],[x,y-456],[x+47,y-430]],'#7C7C77',1);if(on)glow(x,y-389,94,'#F1CB84',.45);}
  function umbrella(x,y,s,t,tilt=0){boilSeed('umbrella');push();translate(x,y);rotate(tilt);stroke([[0,0],[0,-277*s]],2.4,'#89796B');stroke([[0,0],[0,29*s],[20*s,36*s],[31*s,14*s]],2,'#89796B');const a=[];for(let i=0;i<=20;i++){const q=Math.PI+i*Math.PI/20;a.push([Math.cos(q)*240*s,-220*s+Math.sin(q)*139*s]);}a.push([240*s,-220*s],[125*s,-207*s],[0,-224*s],[-128*s,-207*s],[-240*s,-220*s]);shape(a,'#819F9D',1.3);stroke([[0,-360*s],[0,-225*s]],.8,'#596F72');for(let side of [-1,1])stroke([[0,-360*s],[side*96*s,-306*s],[side*126*s,-210*s]],.75,'#596F72');pop();}
  function rain(t,intensity=1){for(let i=0;i<24*intensity;i++){boilSeed('rain'+i);const x=65+hash(i)*945,y=210+((t*240+hash(i+42)*820)%810);stroke([[x,y],[x-8,y+25]],.45,'#A6BAC3');}}
  function house(x,y,s,t,lit=1){boilSeed('home');push();translate(x,y);scale(s);shape([[-220,-270],[0,-417],[220,-270],[207,0],[-205,0]],'#E6CCAD',1.2);shape([[-246,-268],[0,-440],[246,-268],[224,-235],[0,-380],[-228,-236]],'#B2806D',1.3);box(-55,-201,113,201,lit?'#E5B66E':'#9A8B7E',1.1);box(-164,-214,66,85,'#95AFB0',1);box(99,-214,65,85,'#95AFB0',1);stroke([[-131,-214],[-131,-130]],.7);stroke([[132,-214],[132,-130]],.7);oval(32,-92,5,5,C.ink);if(lit)glow(0,-110,140,'#F5CA80',.3);pop();}
  function tree(x,y,s,t,season=0){boilSeed('tree');stroke([[x,y],[x+4*Math.sin(t*.15),y-345*s],[x-51*s,y-490*s]],6*s,'#978575');stroke([[x,y-295*s],[x+100*s,y-397*s]],3*s,'#978575');for(let i=0;i<6;i++){const xx=x+(hash(i)-.5)*340*s, yy=y-(390+hash(i+20)*110)*s;paint(ellPts(xx,yy,100*s,82*s,16,6),{wash:['#A1B495','#A0B6A7','#D7B77E','#D1D7D0'][season],washOp:235,ink:null});}}
  function petals(t,cx=540,cy=500,n=9,range=750,col='#E6B5AF'){for(let i=0;i<n;i++){boilSeed('petal'+i);const x=cx+((hash(i)*range+t*(14+hash(i+8)*20))%range)-range/2,y=cy+((t*28+hash(i+2)*480)%480)-240;shape(ellPts(x,y,9,4.5,9,1,Math.sin(t+i)),col,0,null);}}
  function suitcase(x,y,s,t){boilSeed('case');shape(rrPts(x-66*s,y-102*s,132*s,100*s,9,1),'#A2B4B3',1.4);stroke([[x-24*s,y-102*s],[x-24*s,y-122*s],[x+25*s,y-122*s],[x+25*s,y-102*s]],2,'#7D817B');stroke([[x-35*s,y-97*s],[x-35*s,y-4*s]],1.3,'#DCC5A3');stroke([[x+35*s,y-97*s],[x+35*s,y-4*s]],1.3,'#DCC5A3');oval(x,y-43*s,9*s,8*s,C.gold,.5);}
  function frameFinish(t,lt,dur,index){
    // A painted page passes across every scene seam. Alternate direction, preserve paper colour.
    let cover=0,enter=false;
    if(lt<.38){cover=1-ease(lt/.38);enter=true;}
    if(lt>dur-.38){cover=ease((lt-(dur-.38))/.38);enter=false;}
    if(cover>.001){boilSeed('page-turn');const sign=index%2?1:-1;let edge=enter?W*(1-cover):W*cover;
      if(sign<0)edge=W-edge;
      const base=enter?(sign<0?-50:W+50):(sign<0?W+50:-50);
      shape([[base,-40],[edge,-40],[edge+20*Math.sin(cover*Math.PI),H*.5],[edge,H+40],[base,H+40]],C.paper,0,null);
      stroke([[edge,10],[edge+20*Math.sin(cover*Math.PI),H*.5],[edge,H-20]],.6,'#D0C0AB');
    }
  }
  window.S={C,shape,box,oval,stroke,backdrop,actor,flower,sprout,mug,book,pencil,redThread,heart,lamp,umbrella,rain,house,tree,petals,suitcase,frameFinish};
})();
