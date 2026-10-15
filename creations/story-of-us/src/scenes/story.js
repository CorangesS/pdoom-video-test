(() => {
  const M=window.S,C=M.C;
  const E=(lt,a,b)=>ease(seg(lt,a,b));
  const pair=(t,lt,ax=300,bx=780,y=992,u=34,ka=[[0,'happy']],kb=[[0,'shy']],oa={},ob={})=>{
    M.actor('a',ax,y,u,t,lt,ka,{dy:0,lookX:.5,...oa});
    M.actor('b',bx,y,u,t,lt,kb,{dy:0,lookX:-.5,...ob});
  };
  function bench(x,y,s){M.box(x-180*s,y-95*s,360*s,36*s,'#AF957B',1);M.box(x-180*s,y-162*s,360*s,43*s,'#C1AA8D',1);M.stroke([[x-138*s,y-59*s],[x-138*s,y]],2,'#857D70');M.stroke([[x+138*s,y-59*s],[x+138*s,y]],2,'#857D70');}
  function table(y=985){M.shape([[175,y],[905,y],[935,y+35],[145,y+35]],'#C7A486',1.2);M.stroke([[220,y+38],[209,y+137]],3,'#A28A76');M.stroke([[860,y+38],[871,y+137]],3,'#A28A76');}
  function connecting(ax,bx,y,u=34,sag=24){M.redThread([[ax+u*7.1,y-u*4.5],[540,y-u*4.5+sag],[bx-u*7.1,y-u*4.5]],1.4);}
  function meet(t,l,d,v=0){
    M.backdrop(t,'street',v?.63:.12);M.lamp(555,963,t,1);
    const go=E(l,.7,d*.59),ax=lerp(-170,301,go),bx=lerp(1250,779,go),walk=bpOf(t)*.32*(1-go);
    M.actor('a',ax,997,34,t,l,[[0,'thinking'],[d*.6,'surprised'],[d*.77,v?'happy':'shy']],{...turn(l,d*.58,d*.64,.125,0),walk,dy:0,aR:.18+.4*E(l,d*.72,d*.84),lookX:.7});
    M.actor('b',bx,997,34,t,l,[[0,'neutral'],[d*.59,'surprised'],[d*.78,'shy']],{...turn(l,d*.58,d*.64,-.125,0),walk:walk+.3,dy:0,lookX:-.7});
    if(l>d*.57){const q=E(l,d*.57,d*.78);M.redThread([[ax+238,844],[540,844+130*(1-q)],[bx-238,844]],1.2);}
    M.flower(913,999,.8,t);
  }
  function distance(t,l,d,v=0){
    M.backdrop(t,'garden',.3+v*.2);M.tree(125,1000,.76,t);M.tree(945,1000,.7,t);
    const q=E(l,.8,d*.62);const paper=arcPt([245,593],[796,594],160,q);
    M.shape([[paper[0]-45,paper[1]-27],[paper[0]+45,paper[1]-27],[paper[0]+45,paper[1]+27],[paper[0]-45,paper[1]+27]],C.cream,.8);
    M.stroke([[paper[0]-44,paper[1]-26],[paper[0],paper[1]+9],[paper[0]+44,paper[1]-26]],.6,C.red);
    pair(t,l,300,780,1000,34,[[0,'hopeful'],[d*.65,'happy']],[[0,'thinking'],[d*.65,'surprised'],[d*.79,'happy']],{aR:.7*(1-q)},{aL:.7*q});
    M.redThread([[78,1046],[294,1062],[537,1015],[782,1057],[1006,1038]],1.3);
    if(l>d*.72)M.heart(540,558,26*E(l,d*.72,d*.84),t);
  }
  function thoughts(t,l,d,v=0){
    M.backdrop(t,'room',.4+v*.3);M.sprout(765,570,.6,.92,t);M.box(643,577,245,13,'#C7AC91',.5);
    const swap=E(l,d*.3,d*.6);M.actor('a',350,1005,46,t,l,[[0,'thinking'],[d*.35,'hopeful'],[d*.73,'happy']],{lookX:.55,lookY:-.25,dy:0,aR:.35});
    const yy=610-30*Math.sin(l*.5);M.oval(773,yy,171,138,'#E7DDCB');
    M.actor('b',774,yy+89,23,t,l,[[0,'shy'],[d*.5,'happy']],{noShadow:true,dy:-.2*Math.sin(t),aL:.2+.45*swap});
    for(let i=0;i<3;i++)M.oval(562+i*43,766-i*35,7+i*3,7+i*3,'#DACBB8');
    M.redThread([[666,yy+100],[715,yy+144],[851,yy+150]],1.2);
  }
  function memories(t,l,d,v=0){
    M.backdrop(t,'room',.6);M.book(540,678,1.22,1,1,t);
    const q=E(l,.5,d*.6),p=arcPt([295,370],[652,773],-100,q);
    push();translate(p[0],p[1]);rotate(-.1*(1-q));M.shape([[-70,-84],[70,-84],[70,66],[-70,66]],'#E1C9AA',.8);M.shape([[-58,-72],[58,-72],[58,43],[-58,43]],'#BDD0C5',.4);M.flower(0,33,.62,t);pop();
    M.actor('a',204,1100,25,t,l,[[0,'happy'],[d*.65,'proud']],{dy:0,aR:.3});M.actor('b',875,1100,25,t,l,[[0,'hopeful'],[d*.65,'love']],{dy:0,aL:.3});
    M.redThread([[145,1115],[346,1160],[733,1155],[930,1116]],1.5);
    if(v)M.petals(t,540,442,6,480);
  }
  function tea(t,l,d,v=0){
    M.backdrop(t,'room',.66+v*.18);const q=E(l,1,d*.55);
    pair(t,l,300,780,1016,36,[[0,'shy'],[d*.62,'happy']],[[0,'thinking'],[d*.45,'surprised'],[d*.7,'happy']],{aR:.08},{aL:.08});
    table(938);M.mug(lerp(430,503,q),936,1.1,t);M.mug(lerp(720,651,q),936,1.1,t+.7,'#D7B3A4');
    M.flower(228,937,.75,t);M.oval(226,944,24,7,'#DBC7AB',.5);
    if(l>d*.65){const k=E(l,d*.65,d*.82);M.heart(575,675,34*k,t);}
  }
  function promise(t,l,d,v=0){
    M.backdrop(t,'garden',.63+v*.2);M.house(540,846,.87,t,E(l,d*.34,d*.6));
    pair(t,l,303,779,1055,33,[[0,'thinking'],[d*.3,'idea'],[d*.6,'hopeful']],[[0,'neutral'],[d*.52,'happy']],{aR:.35+.6*E(l,d*.23,d*.48)},{aL:.3});
    const q=E(l,1,d*.8);M.redThread([[58,1070],[140,1100],[540,1124],[933,1100],[1020,1070]],1.8);
    M.sprout(890,1010,.7,q,t);M.petals(t,540,400,5,740);
  }
  function storybook(t,l,d,v=0){
    M.backdrop(t,'room',.62+v*.12);const q=E(l,d*.25,d*.65);
    M.book(540,687,1.25,1,v||q>.55?1:0,t);
    const px=lerp(339,740,q),py=788-30*Math.sin(q*Math.PI);M.pencil(px,py,.85,-.5);
    M.actor('a',202,1115,27,t,l,[[0,'thinking'],[d*.62,'happy']],{dy:0,aR:.65});
    if(v||q>.2)M.actor('b',lerp(1220,876,E(l,d*.2,d*.7)),1115,27,t,l,[[0,'hopeful'],[d*.72,'happy']],{dy:0,aL:.65,walk:bpOf(t)*.35*(1-q)});
    M.redThread([[255,1030],[407,1071],[539,1030],[675,1072],[824,1030]],1.8);
    if(v>1)M.flower(944,558,1,t);
  }
  function stay(t,l,d){
    M.backdrop(t,'street',.61);const out=E(l,.3,1.5),back=E(l,2.1,d*.72),a=lerp(.125,0,back);
    const ax=300-80*out+80*back,bx=780+80*out-80*back;
    M.actor('a',ax,992,34,t,l,[[0,'thinking'],[1.85,'surprised'],[d*.65,'happy']],{...spinView(-a),dy:0,walk:bpOf(t)*.25*(1-back),aR:.1});
    M.actor('b',bx,992,34,t,l,[[0,'thinking'],[2,'shy'],[d*.65,'happy']],{...spinView(a),dy:0,walk:bpOf(t)*.25*(1-back),aL:.1});
    M.redThread([[ax+180,851],[540,903-45*back],[bx-180,851]],1.7);M.heart(540,642,25*back,t);
  }
  function rewrite(t,l,d){
    M.backdrop(t,'room',.8);M.book(540,783,1.24,1,1,t);
    const q=E(l,1,d*.6);M.pencil(lerp(770,564,q),773-50*Math.sin(q*Math.PI),1,-.3+.4*q);
    pair(t,l,298,779,813,31,[[0,'surprised'],[d*.55,'shy'],[d*.77,'happy']],[[0,'determined'],[d*.63,'proud']],{aR:.5},{aL:.6});
    // The two painted figures now share a heart stitched over the binding.
    if(l>d*.55)M.heart(540,974,31*E(l,d*.55,d*.76),t);
    M.redThread([[220,1108],[420,1117],[540,1034],[660,1118],[865,1107]],1.5);
  }
  function kiss(t,l,d,v=0){
    M.backdrop(t,'garden',.78);M.tree(76,1000,.67,t);M.tree(1010,1000,.6,t);
    const lean=E(l,d*.26,d*.45)*(1-E(l,d*.65,d*.8)),ax=300+35*lean,bx=780-35*lean;
    pair(t,l,ax,bx,989,41,[[0,'shy'],[d*.42,'love'],[d*.72,'happy']],[[0,'shy'],[d*.44,'love'],[d*.74,'shy']],{rot:.028*lean,lookX:.8,aR:-.15},{rot:-.028*lean,lookX:-.8,aL:-.15});
    if(l>d*.45){const q=E(l,d*.45,d*.58);M.heart(540,542-30*q,39*q,t);M.petals(t,540,527,7,660);}
    M.redThread([[120,1045],[331,1070],[540,1060],[761,1070],[967,1045]],1.4);
  }
  function together(t,l,d,v=0){
    M.backdrop(t,'garden',.66+v*.09);M.tree(100,995,.7,t,v===2?2:0);
    const go=E(l,.5,d*.63),ax=lerp(230,300,go),bx=lerp(860,780,go);
    pair(t,l,ax,bx,994,34,[[0,'hopeful'],[d*.67,'happy']],[[0,'happy']],{walk:bpOf(t)*.3*(1-go),aR:0},{walk:bpOf(t)*.3*(1-go)+.2,aL:0});
    connecting(ax,bx,994,34,25*(1-go));
    M.heart(540,611-24*Math.sin(l*.3),28+7*go,t);M.petals(t,540,492,7,810,v===2?'#D6B376':'#E1B0A7');
  }
  function waitSun(t,l,d,v=0){
    M.backdrop(t,'garden',.55+E(l,0,d)*.4,{noSun:true});bench(540,1060,1.6);
    const rise=E(l,.6,d*.75);M.oval(540,733-312*rise,79,79,'#EBC786');
    pair(t,l,309,771,930,32,[[0,'hopeful'],[d*.76,'happy']],[[0,'neutral'],[d*.7,'hopeful']],{aR:0},{aL:0});connecting(309,771,930,32,15);
    for(let i=0;i<3;i++){const x=365+i*136,y=349+22*Math.sin(l*.5+i);M.stroke([[x-14,y+6],[x,y],[x+14,y+6]],.9,'#958875');}
  }
  function grow(t,l,d,v=0){
    M.backdrop(t,'garden',.82);const q=E(l,1,d*.75);M.sprout(540,1000,1.38,q,t);
    pair(t,l,255,825,1000,31,[[0,'determined'],[d*.65,'surprised'],[d*.83,'happy']],[[0,'hopeful'],[d*.83,'happy']],{aR:.45},{aL:.45});
    // Pouring can stays on the claw tip; droplets follow its spout.
    const px=455,py=825;push();translate(px,py);rotate(-.12-.3*Math.sin(q*Math.PI));M.box(-47,-47,62,50,'#A9BFBB',.8);M.shape([[15,-31],[61,-61],[68,-45],[15,-5]],'#A9BFBB',.8);M.stroke([[-47,-35],[-64,-35],[-62,-10],[-47,-8]],1);pop();
    if(l>1&&l<d*.78)for(let i=0;i<4;i++){const yy=792+(l*100+i*37)%137;M.oval(517+(yy-792)*.11,yy,3,6,'#95B6C0');}
    M.redThread([[83,1050],[278,1061],[540,1089],[811,1061],[1000,1050]],1.5);
  }
  function home(t,l,d,v=0){
    const night=v>0;M.backdrop(t,night?'night':'garden',.87);M.house(540,1000,1.58,t,E(l,1.5,d*.58));M.sprout(900,1006,.85,.95,t);
    const qa=E(l,.7,d*.66),qb=E(l,1.05,d*.73),sc=lerp(30,11,qa),ax=lerp(270,483,qa),bx=lerp(820,592,qb),yy=lerp(1088,975,qa);
    M.actor('a',ax,yy,sc,t,l,[[0,'hopeful']],{...turn(l,.9,1.2,0,.5),walk:bpOf(t)*.35,dy:0});
    M.actor('b',bx,lerp(1088,975,qb),lerp(30,11,qb),t,l,[[0,'happy']],{...turn(l,1,1.3,0,.5),walk:bpOf(t)*.35+.3,dy:0});
    // At the threshold, jambs mask the outer silhouette; the doors close after both enter.
    if(qa>.8){M.box(350,820,103,178,'#E6CCAD',0);M.box(632,820,128,178,'#E6CCAD',0);}
    const shut=E(l,d*.76,d*.9);
    if(shut>0){M.box(453,683,89*shut,316,'#D9B47F',.6);M.box(632-89*shut,683,89*shut,316,'#D9B47F',.6);}
    if(shut>.98){M.oval(528,841,4,4,'#8E7862');M.oval(552,841,4,4,'#8E7862');}
    M.box(446,995,190,16,'#BE9973',.7);M.redThread([[72,1114],[359,1089],[540,1015],[785,1090],[1007,1114]],1.7);
    if(l>d*.8)M.heart(540,362,31*E(l,d*.8,d*.9),t);
  }
  function umbrella(t,l,d,v=0){
    M.backdrop(t,'street',.29);M.rain(t);const q=Math.sin(Math.PI*E(l,.5,d*.8));
    pair(t,l,328,752,1012,31,[[0,'nervous'],[d*.63,'happy']],[[0,'shy'],[d*.64,'happy']],{walk:bpOf(t)*.19,aR:0},{walk:bpOf(t)*.19+.25,aL:0});
    M.umbrella(540+45*q,882,1.4,t,.09*q);M.oval(540,1065,294,23,'#B4C5C8');
    M.redThread([[130,1104],[344,1121],[540,1088],[772,1121],[970,1102]],1.5);
  }
  function winter(t,l,d,v=0){
    M.backdrop(t,'street',.16);for(let i=0;i<14;i++){const x=85+(hash(i)*850+t*10)%890,y=227+(hash(i+3)*740+t*37)%740;M.oval(x,y,3+hash(i)*3,3+hash(i)*3,C.cream);}
    const q=E(l,.7,d*.56);pair(t,l,300,780,1000,34,[[0,'nervous'],[d*.66,'relieved']],[[0,'nervous'],[d*.68,'happy']],{aR:.15},{aL:.15});
    // One scarf stretches across both block bodies without changing their silhouette.
    M.shape([[137,915],[453,915],[628,915-35*q],[941,915-35*q],[941,948-35*q],[628,948-35*q],[453,948],[137,948]],'#C69A6C',.7);
    M.shape([[853,943-35*q],[901,943-35*q],[910+12*Math.sin(t),1012],[866,1019]],'#C69A6C',.7);
    for(let i=0;i<6;i++)M.stroke([[162+i*132,921],[162+i*132,940]],.7,'#E8C698');
    M.heart(540,591,31*q,t);
  }
  function station(t,l,d,v=0){
    M.backdrop(t,'street',.67);M.box(38,320,1005,385,'#A5B8B7',0);const travel=E(l,d*.2,d*.9);
    for(let i=0;i<4;i++){const x=83+i*320-180*travel;M.box(x,369,220,201,'#DCDCC7',1.3);M.stroke([[x+110,370],[x+110,568]],1,'#7E9696');}
    M.stroke([[50,656],[1030,656]],3,'#D3BC96');M.stroke([[53,1121],[1030,1121]],1.6,'#8E8476');M.stroke([[53,1147],[1030,1147]],1.6,'#8E8476');
    pair(t,l,300,780,1003,32,[[0,'thinking'],[d*.4,'determined'],[d*.76,'happy']],[[0,'hopeful'],[d*.7,'happy']],{aR:0,walk:bpOf(t)*.23},{aL:0,walk:bpOf(t)*.23+.2});
    M.suitcase(535,1061,1.15,t);M.flower(538,958,.62,t);M.redThread([[73,1090],[292,1099],[540,1078],[817,1100],[1008,1090]],1.4);
  }
  function hands(t,l,d,v=0){
    M.backdrop(t,'garden',.78);const q=E(l,.6,d*.55),u=43,ax=lerp(208,235,q),bx=lerp(873,845,q);
    pair(t,l,ax,bx,1011,u,[[0,'shy'],[d*.58,'happy']],[[0,'shy'],[d*.63,'love']],{aR:0,aL:-.2},{aL:0,aR:-.2});
    M.redThread([[ax+7.1*u,1011-u*4.5],[540,873-55*q],[bx-7.1*u,1011-u*4.5]],1.6);
    M.heart(540,461,43*E(l,d*.57,d*.75),t);M.petals(t,540,419,6,810);
  }
  function proposal(t,l,d,v=0){
    M.backdrop(t,'garden',.82);M.tree(70,1000,.7,t);M.tree(1018,1000,.67,t);
    const q=E(l,.7,d*.35);pair(t,l,292,788,1008,34,[[0,'nervous'],[d*.35,'hopeful'],[d*.72,'happy']],[[0,'thinking'],[d*.39,'surprised'],[d*.65,'love']],{aR:0,sq:.02+.05*q},{aL:0});
    // Ring box sits on their adjoining short arms, then the lid opens.
    const yy=862-8*q;M.box(499,yy,83,38,'#B47572',.8);M.shape([[498,yy],[580,yy],[580,yy-65*q],[499,yy-59*q]],'#C89186',.8);
    M.oval(540,yy-19,15,18,C.gold,.8);M.oval(540,yy-19,10,12,'#EFE0C5',.5);M.shape(starPts(540,yy-40,11,.5,4),C.cream,.5);
    if(l>d*.62){M.heart(541,558,37*E(l,d*.62,d*.77),t);M.petals(t,540,537,8,730);}
  }
  function seasons(t,l,d,v=0){
    const phase=Math.min(3,Math.floor(l/d*4));M.backdrop(t,'river',.55+phase*.1);M.tree(100,1000,.85,t,phase);M.tree(991,1000,.7,t,phase);
    const bob=4*Math.sin(bpOf(t)*Math.PI);pair(t,l,300,780,986+bob,34,[[0,'happy']],[[0,'happy']],{aR:0,walk:bpOf(t)*.25},{aL:0,walk:bpOf(t)*.25+.2});connecting(300,780,986+bob);
    M.petals(t,540,470,10,910,['#E6B6B0','#CAD5B0','#D8B16F','#E6E7DD'][phase]);
  }
  function gaze(t,l,d){
    M.backdrop(t,'night',.9);const q=E(l,.8,d*.58);pair(t,l,295+17*q,785-17*q,1010,40,[[0,'neutral'],[d*.31,'shy'],[d*.64,'love']],[[0,'hopeful'],[d*.39,'shy'],[d*.68,'love']],{lookX:.8,aR:0},{lookX:-.8,aL:0});
    M.heart(540,509,49*E(l,d*.37,d*.59),t);M.redThread([[98,1082],[355,1120],[540,1080],[736,1120],[983,1082]],1.6);
    M.petals(t,540,517,7,770,'#DDC39A');
  }
  function elders(t,l,d,v=0){
    M.backdrop(t,'garden',.96);M.tree(833,1000,1.28,t,2);bench(530,1090,1.8);
    pair(t,l,297,777,947,34,[[0,'happy'],[d*.5,'relieved']],[[0,'happy'],[d*.58,'shy']],{aR:0,emote:null,draw:(u)=>{M.stroke([[-3.7*u,-8.12*u],[-2.5*u,-8.55*u],[-1.4*u,-8.16*u]],2,C.cream);}},{aL:0,emote:null});
    M.book(540,983,.63,1,1,t);M.petals(t,540,505,7,850,'#D8B477');
    if(v)M.heart(540,579,30*E(l,1,d*.65),t);
  }
  function finale(t,l,d){
    M.backdrop(t,'room',.99);const close=E(l,d*.57,d*.92);M.book(540,724,1.32,1-close,1,t);
    M.actor('a',235,1135,28,t,l,[[0,'happy'],[d*.5,'relieved']],{dy:0,aR:0,emote:null});M.actor('b',845,1135,28,t,l,[[0,'happy'],[d*.5,'relieved']],{dy:0,aL:0,emote:null});
    M.redThread([[170,1178],[329,1201],[539,1140],[751,1201],[922,1177]],1.5);M.heart(540,1058,33,t);
    if(close>.75)flash(E(l,d*.87,d),C.paper);
  }
  const specs=[
    [0,meet,0,'初遇'],[7.5,distance,0,'远方的信'],[14.3,thoughts,0,'想念'],[23.61,memories,0,'收集回忆'],
    [28.96,tea,0,'两杯热茶'],[35.87,promise,0,'一个家'],[44.48,storybook,0,'一页到两页'],[51.05,stay,0,'不转身'],[57.10,rewrite,0,'一起写'],[65.11,kiss,0,'靠近'],
    [72.79,together,0,'两个人'],[79.4,waitSun,0,'一起等'],[85.72,grow,0,'扎根'],[93.73,home,0,'回家'],
    [105.43,meet,1,'熟悉的路口'],[112.39,distance,1,'等你的信'],[119.37,umbrella,0,'共伞'],[128.33,memories,1,'又一页回忆'],[133.68,tea,1,'两杯热茶再相逢'],[140.74,promise,1,'家慢慢长成'],
    [147.55,storybook,1,'写成我们'],[154.02,winter,0,'一条围巾'],[160.35,station,0,'一起出发'],[168.18,together,1,'认定彼此'],[175.79,waitSun,1,'一起等未来'],[182.51,hands,0,'牵手'],[188.86,proposal,0,'愿意'],[196.70,home,1,'灯亮了'],
    [203.67,seasons,0,'并肩四季'],[210.91,gaze,0,'凝望'],[220.4,storybook,2,'厚厚的故事册'],[226.93,winter,1,'再冷也有你'],[233.29,station,1,'去哪里都一起'],[241.22,kiss,1,'还会害羞'],[248.71,elders,0,'慢慢变老'],[255.35,hands,1,'手还牵着'],[261.84,elders,1,'再一次愿意'],[269.69,home,2,'一生的灯'],[276.8,finale,0,'合上我们的故事']
  ];
  window.STORY_SHOTS=specs.map(([start,fn,variant,label],i)=>({start,end:specs[i+1]?.[0]??DUR,label}));
  shots(specs.map(([start,fn,v],i)=>[start,(t,l,d)=>{fn(t,l,d,v);if(i!==specs.length-1||l<.38)M.frameFinish(t,l,d,i);}])) ;
})();
