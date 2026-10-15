// Chapter 02: choosing a life together. Flat painted geometry; pure song-time functions.
(() => {
 const M=window.V,E=M.E,C=M.C;
 const end=()=>camEnd();
 const overcast=()=>{M.box(-150,-150,2220,416,'#B0BEC0',0);for(let i=0;i<5;i++)M.oval(i*461,233,306,73,'#A6B8BB',0);};
 const start=(l,d,kind='room',warm=.6,z=1)=>{M.begin(l,d,960,525,z,.025);M.bg(kind,T,warm);};
 function hand(x,y,w,col,side=1){boilSeed('life-hand-'+col);M.shape([[x-w*side,y-38],[x-12*side,y-38],[x+18*side,y-26],[x+22*side,y+22],[x-8*side,y+38],[x-w*side,y+38]],col,1.2);}
 function heldUmbrella(s,t,tilt=0){push();rotate(tilt);M.box(-4,-279*s,8,281*s,'#89796B',.3);pop();M.umbrella(0,0,s,t,tilt);}
 function drizzle(t,canopy=null){
  for(let i=0;i<34;i++){boilSeed('life-rain-'+i);const x=hash(i+808)*2010-40,y=(t*193+hash(i+916)*1000)%1000-30;
   if(canopy&&x>canopy[0]&&x<canopy[1]&&y>canopy[2])continue;
   M.shape([[x,y],[x+2,y],[x-8,y+28],[x-10,y+28]],'#829EA8',0,null);}
 }
 function scarf(x1,y1,x2,y2,k=1){boilSeed('life-scarf');const x=lerp(x1,x2,k),y=lerp(y1,y2,k);
  M.shape([[x1,y1-23],[x,y-23],[x+24,y+1],[x,y+25],[x1,y1+25]],'#CDA56E',.8);
  M.shape([[x-20,y],[x+19,y],[x+27,y+111],[x-13,y+118]],'#CDA56E',.8);
  for(let j=0;j<4;j++)M.stroke([[x-12+j*10,y+114],[x-10+j*10,y+134]],.7,'#9B745C');
 }
 function hammer(x,y,s=1,rot=0){boilSeed('life-hammer');push();translate(x,y);rotate(rot);M.box(-7*s,-100*s,14*s,110*s,'#B18B68',.8);M.box(-43*s,-127*s,82*s,29*s,'#8B9691',.8);pop();}
 function ringBox(x,y,s,opened,t){boilSeed('life-ring-box');push();translate(x,y);scale(s);const h=128*opened;
  M.shape([[-130,-9],[-130,-30-h],[129,-30-h],[130,-9]],'#A86F75',1.1);
  if(opened>.05)M.box(-110,-23-h,220,Math.max(1,h-8),'#D9B7AD',.7);
  M.box(-130,-5,260,96,'#A86F75',1.1);M.oval(0,5,108,32,'#E6CCAF',.8);
  if(opened>.04){const yy=13-62*opened;M.oval(0,yy,31,34,'#D9B45D',.8);M.oval(0,yy,19,22,'#E6CCAF',.6);M.shape([[-17,yy-25],[-10,yy-44],[11,yy-44],[20,yy-26],[0,yy-12]],'#F0EBD2',.7);}
  if(opened<1)M.box(-130,-23,260,31*(1-opened),'#BC8890',.7);
  pop();
 }
 function train(x,t,open=1){boilSeed('life-train');push();translate(x,0);
  M.box(-1700,275,3400,489,'#91ACA7',1);M.box(-1700,689,3400,60,'#C4AB83',0);
  M.box(-1700,251,3400,30,'#6E8C89',.8);
  for(let i=-3;i<4;i++){if(i===1)continue;M.box(i*440-70,333,290,229,'#E6D6B6',1);M.box(i*440-55,348,260,198,'#C3D2CA',0);M.stroke([[i*440+80,348],[i*440+80,546]],1,'#7D9690');}
  M.box(371,303,265,462,'#526E72',1);M.box(371,303,132*(1-open),462,'#AAC1B3',.6);M.box(636-132*(1-open),303,132*(1-open),462,'#AAC1B3',.6);
  M.box(365,756,287,33,'#C9B69A',.8);M.box(335,789,348,30,'#A3927B',.8);
  for(let x of [-960,-360,940])M.oval(x,782,66,57,'#657776',1);
  pop();
 }
 function movingWindow(t,l,x=260,y=134,w=1410,h=453){
  boilSeed('life-train-window');M.box(x-29,y-26,w+58,h+60,'#7B9690',1);M.box(x,y,w,h,'#B9D0D2',0);
  for(let i=0;i<7;i++){const xx=x+((i*263-l*115+4200)%(w+280))-240;M.shape([[xx,y+h],[xx,y+h-130],[xx+90,y+h-202],[xx+177,y+h-130],[xx+177,y+h]],'#91AFA5',0,null);}
  for(let i=0;i<4;i++){const xx=x+((i*421-l*175+4200)%(w+280))-210;M.box(xx,y+h-103,124,103,'#BBAE97',0);M.shape([[xx-9,y+h-103],[xx+62,y+h-168],[xx+133,y+h-103]],'#AB8973',.7);}
  // The flat wall masks passing scenery outside the window, so scenery never leaks into the carriage.
  M.box(-150,-130,x+150,1110,'#DBC9AE',0);M.box(x+w,-130,2080-x-w,1110,'#DBC9AE',0);
  M.box(x,-140,w,y+140,'#DBC9AE',0);M.box(x,y+h,w,1000-y-h,'#DBC9AE',0);
  M.stroke([[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]],3,'#708E89');
  M.stroke([[x+w*.5,y],[x+w*.5,y+h]],2,'#708E89');M.box(x-42,y+h+10,w+84,22,'#AA8C73',.8);
 }
 M.register(105.43,'这次我在街角等你','wide',(t,l,d)=>{
  start(l,d,'street',.45);M.lamp(940,858,t,1);M.bench(280,880,.7);M.sprout(1733,882,1,1,t);
  const arrive=E(l,2.35,5.7),look=E(l,1.1,1.9);
  M.actor('a',720,894,40,t,l,[[0,'hopeful'],[1.2,'thinking'],[4.5,'happy']],{...turn(l,3.5,3.85,0,.125),lookX:look,aR:-.2,armR:()=>M.envelope(20,0,.76,.05)});
  M.actor('b',lerp(2100,1370,arrive),894,38,t,l,[[0,'neutral'],[5.15,'happy']],{view:'side',flip:true,walk:bpOf(t)*.48*(1-arrive)});
  M.foreground(t);end();
 },'wipe','0–2.35 熟悉街角主动等候；2.35–5.7 对方走来；5.7–6.87 认出、准备递信');
 M.register(112.30,'不用风也会把信交给你','medium',(t,l,d)=>{
  start(l,d,'street',.52);const p=E(l,.8,2.6),q=E(l,3.3,4.1);
  // Keep arm geometry fixed through contact; receiver moves closer after the envelope arrives.
  M.actor('a',560,896,49,t,l,[[0,'hopeful'],[3.15,'relieved']],{aR:0,lookX:1,sq:0});
  M.actor('b',lerp(1420,1310,q),896,49,t,l,[[0,'thinking'],[2.75,'happy']],{aL:0,lookX:-1,sq:0});
  hand(lerp(913,1072,p),676,Math.max(35,lerp(35,195,p)),C.clay,1);
  M.envelope(lerp(946,1090,p)-110*q,676,1.1,0);
  M.foreground(t);end();
 },'cut','0–.8 想交给对方；.8–2.6 递信；2.6–4.1 接住靠近；4.1–7.07 熟悉地相视');
 M.register(119.37,'雨落下来先看见你','medium',(t,l,d)=>{
  start(l,d,'street',.02);overcast();const q=E(l,1.3,3.3),bx=lerp(1510,1320,q);
  M.actor('a',600,904,43,t,l,[[0,'neutral'],[1.1,'surprised'],[2.8,'determined']],{aR:0,lookX:1,sq:0,armR:()=>heldUmbrella(1.32,t,lerp(0,.26,q))});
  M.actor('b',bx,904,43,t,l,[[0,'sad'],[3.25,'hopeful']],{view:'q',flip:true,walk:bpOf(t)*.36*(1-q),aL:-.6,rot:.018*Math.sin(t*11)*(1-q)});
  drizzle(t,[550,1120,380]);M.oval(1450,918,220,23,'#A0B8BB');end();
 },'fade','0–1.3 看见对方淋雨；1.3–3.3 倾伞与走近；3.3–4.23 对方看见邀请');
 M.register(123.60,'把持伞的你也拉进来','close',(t,l,d)=>{
  start(l,d,'garden',.06);overcast();const p=E(l,.65,2.4),q=E(l,2.6,3.4),ax=lerp(585,740,q),bx=lerp(1335,1250,p),s=1.92;
  M.actor('a',ax,1015,61,t,l,[[0,'determined'],[2.8,'surprised'],[3.5,'relieved']],{aR:0,lookX:.8,sq:0,armR:()=>heldUmbrella(s,t,.14)});
  M.actor('b',bx+240,1015,61,t,l,[[0,'hopeful'],[1.8,'determined'],[3.3,'happy']],{aL:0,lookX:-.8,sq:0});
  // Joining nubs makes the pull legible; the canopy is mechanically attached to A's arm hook.
  hand(lerp(1060,1105,p),741,lerp(45,120,p),C.rose,-1);
  drizzle(t,[710,1550,180]);end();
 },'cut','0–.65 伞只偏向一人；.65–2.4 拉住手；2.6–3.4 持伞者被拉近；3.4–4.73 一起遮雨');
 M.register(128.33,'雨天也收进故事里','insert',(t,l,d)=>{
  start(l,d,'desk',.7);M.table(960,834,1740);M.book(930,525,1.3,t,2);
  const p=E(l,.65,2.2);M.photo(lerp(1620,1215,p),lerp(180,460,p),1.18,t,1);hand(lerp(1780,1490,p),lerp(254,540,p),1100,C.rose,-1);
  const k=E(l,2.55,3.65);M.redThread([[1125,715],[1245,754],[1245+210*k,710]],2);
  M.pencil(383,696,1.25,-.4);end();
 },'wipe','0–.65 已有两人和花的书；.65–2.2 放入雨伞照片；2.55–3.65 红线固定；3.65–5.35 留住回忆');
 M.register(133.68,'你回家时茶已经热了','medium',(t,l,d)=>{
  start(l,d,'room',.76);const p=E(l,.25,2.6);M.bench(635,912,1.2);
  M.actor('b',lerp(1820,1345,p),900,45,t,l,[[0,'sleepy'],[2.25,'surprised']],{view:'side',flip:true,walk:bpOf(t)*.4*(1-p),aL:-.3});
  M.actor('a',570,885,40,t,l,[[0,'hopeful'],[2.5,'happy']],{aR:0,lookX:1});
  M.table(974,742,700);M.mug(1083,738,1.75,t);M.mug(798,738,1.45,t,C.rose);
  M.book(401,316,.29,t,3,1);end();
 },'fade','0–1.3 疲惫回家；1.3–2.6 走到已放好的热茶；2.6–3.57 注意到照顾');
 M.register(137.25,'疲惫终于松开','close',(t,l,d)=>{
  start(l,d,'room',.77);M.actor('b',1060,1003,76,t,l,[[0,'sleepy'],[1.1,'surprised'],[2.1,'relieved']],{lookX:lerp(-.2,-.75,E(l,1.4,2.3)),aL:-.35,aR:-.5});
  M.table(930,838,1220);M.mug(736,822,2.7,t);hand(lerp(1034,860,E(l,1.25,2.1)),786,320,C.rose,-1);M.flower(1610,774,1.35,t);end();
 },'cut','0–1.1 低头看茶；1.1–2.1 望向画外的人；2.1–3.49 放松下来');
 M.register(140.74,'扶住窗框敲好最后一钉','close',(t,l,d)=>{
  start(l,d,'desk',.65);M.box(120,-60,1680,970,'#DFC6A6',0);M.box(775,153,541,548,'#8CAAA8',.8);M.box(809,188,470,481,'#B9D0CB',.5);
  const p=E(l,.45,1.2),hit=E(l,1.55,1.76),release=E(l,2.5,3.45);
  push();translate(1044,688);rotate(lerp(-.14,0,p));M.box(-287,-567,573,29,'#B69371',.9);M.box(-287,-560,27,563,'#B69371',.8);M.box(261,-560,27,563,'#B69371',.8);M.box(-287,-8,574,31,'#B69371',.8);pop();
  M.actor('b',474-80*release,937,47,t,l,[[0,'determined'],[2.2,'happy']],{aR:0,lookX:1,sq:0});
  M.actor('a',1710,942,56,t,l,[[0,'determined'],[2.15,'proud']],{aL:0,lookX:-1,sq:0,armL:()=>hammer(0,0,1,lerp(.67,0,hit)+.035*spring(l,1.76,4,17))});
  M.oval(1312,563,5,5,C.ink);end();
 },'cut','0–1.2 扶正歪窗框；1.2–1.76 举锤敲钉；1.76–2.5 检查；2.5–4.06 放手窗框仍正');
 M.register(144.80,'退后看我们修好的家','wide',(t,l,d)=>{
  start(l,d,'garden',.78);M.house(1110,874,1.46,t,1);M.tree(212,899,1.1,t,0);M.sprout(1510,887,1,1,t);
  const p=E(l,.15,1.7);M.actor('a',lerp(910,725,p),912,34,t,l,[[0,'proud']],{view:'back',walk:bpOf(t)*.35*(1-p)});M.actor('b',lerp(1350,1420,p),912,34,t,l,[[0,'happy']],{view:'qback',flip:true,walk:bpOf(t)*.3*(1-p)});end();
 },'cut','0–1.7 一起退后；1.7–2.75 看修好的同一座小屋');
 M.register(147.55,'共同生活让相册变厚','insert',(t,l,d)=>{
  start(l,d,'desk',.8);M.table(960,838,1720);M.book(960,510,1.35,t,3);
  const p=E(l,.7,2.35);M.photo(lerp(1730,1250,p),lerp(60,430,p),1,t,2);hand(lerp(1900,1470,p),lerp(180,527,p),1000,C.clay,-1);
  M.mug(1634,764,1.4,t);M.flower(280,733,1.2,t);
  const f=E(l,3.9,5.8);if(f>.001){M.shape([[961,218],[961+535*f,232],[961+535*f,785],[961,765]],'#F1E4C9',.8);M.stroke([[961+535*f,232],[961+535*f,785]],.8,'#C5B398');}
  end();
 },'wipe','0–.7 增厚书页；.7–2.35 放入修好的家；2.35–3.9 看累计回忆；3.9–6.47 翻往冬天');
 M.register(154.02,'把围巾也分给你','medium',(t,l,d)=>{
  start(l,d,'river',.02);M.tree(240,885,1.15,t,3);const p=E(l,1.6,3.1),q=E(l,3.5,4.8),ax=lerp(620,750,q),bx=lerp(1330,1220,q);
  M.actor('a',ax,908,44,t,l,[[0,'neutral'],[1.1,'thinking'],[2.8,'hopeful'],[4.8,'relieved']],{aR:0,lookX:1,sq:0});
  M.actor('b',bx+4*Math.sin(t*17)*(1-q),908,44,t,l,[[0,'sad'],[3,'surprised'],[4.8,'happy']],{aL:0,lookX:-1,sq:0,rot:.012*Math.sin(t*17)*(1-q)});
  scarf(ax-207,774,lerp(ax+250,bx+213,p),774,1);M.foreground(t,'#85978B');end();
 },'fade','0–1.6 注意对方发抖；1.6–3.1 围巾绕过去；3.5–4.8 靠近；4.8–6.33 一起取暖');
 M.register(160.35,'把我们的东西装进行李','insert',(t,l,d)=>{
  start(l,d,'desk',.58);M.table(960,815,1670);M.box(581,369,768,344,'#8FA5A1',1.1);M.box(608,397,714,287,'#DBC7A8',.7);M.box(581,706,768,94,'#9CAFAB',1.1);
  const p=E(l,.4,1.75);M.book(lerp(408,887,p),lerp(176,552,p),.49,t,3,1);M.mug(1152,666,1.48,t);M.flower(1177,496,1.2,t);hand(lerp(281,754,p)-850*E(l,1.85,2.32),lerp(215,590,p),1200,C.clay,1);
  const close=E(l,2.1,3.25);if(close>.001){M.box(581,371,768,425*close,'#9CAFAA',1.1);M.stroke([[762,371],[762,371+425*close]],3,'#DAC6A4');M.stroke([[1168,371],[1168,371+425*close]],3,'#DAC6A4');M.oval(965,572,22,18,C.gold,.7);}
  M.stroke([[889,370],[889,330],[1040,330],[1040,370]],3,'#748680');end();
 },'wipe','0–.4 花与杯在箱中；.4–1.75 放入共同相册；2.1–3.25 合箱；3.25–3.65 停留');
 M.register(164.00,'一起登上列车','wide',(t,l,d)=>{
  start(l,d,'station',.35);train(335,t,1);M.box(-100,820,2140,140,'#C4B698',0);M.stroke([[-100,828],[2040,828]],3,'#EEE0C2');
  const a=E(l,.3,2.5),b=E(l,1.45,3.55),ax=lerp(560,841,a),bx=lerp(263,800,b);
  M.actor('a',ax,lerp(919,756,a),31,t,l,[[0,'determined']],{view:'side',walk:bpOf(t)*.55*(1-a),aL:-.3,armL:()=>M.suitcase(0,71,.64,t)});
  M.actor('b',bx,lerp(919,756,b),31,t,l,[[0,'hopeful']],{view:'side',walk:bpOf(t)*.5*(1-b)});
  // Door jamb occludes the boarding characters only after they have stepped across it.
  const door=E(l,3.62,4.1);M.box(706,304,132*door,460,'#AAC1B3',.7);M.box(971-132*door,304,132*door,460,'#AAC1B3',.7);end();
 },'cut','0–.3 站台与开门；.3–2.5 提箱上台阶；1.45–3.55 另一人跟上；3.62–4.18 门合拢');
 M.register(168.18,'车窗外旧城慢慢后退','medium',(t,l,d)=>{
  start(l,d,'desk',.55);movingWindow(t,l);M.bench(960,919,2.2);
  M.actor('a',698,919,42,t,l,[[0,'thinking'],[2.9,'hopeful']],{...turn(l,2.4,2.8,.5,.125),aR:-.4});
  M.actor('b',1267,919,42,t,l,[[0,'thinking'],[3.2,'happy']],{...turn(l,2.7,3.05,.5,-.125),aL:-.4});M.suitcase(1616,927,1.25,t);end();
 },'fade','0–2.4 看旧城离开；2.4–3.05 从背影转向彼此；3.05–4.22 确认共同选择');
 M.register(172.40,'望向你就知道往哪里去','close',(t,l,d)=>{
  start(l,d,'desk',.6);movingWindow(t,l+4,115,70,1650,478);
  M.actor('b',1262,1061,77,t,l,[[0,'thinking'],[1.2,'hopeful'],[2.3,'happy']],{view:'q',flip:true,lookX:-1,aL:-.4});
  M.actor('a',137,1166,82,t,l,[[0,'neutral']],{view:'qback',noShadow:true});end();
 },'cut','0–1.2 越肩看她；1.2–2.3 目光相接；2.3–3.39 释然微笑');
 M.register(175.79,'把熟悉的东西带进新家','medium',(t,l,d)=>{
  start(l,d,'room',.74);const p=E(l,.35,2.1);
  M.actor('a',lerp(250,660,p),905,42,t,l,[[0,'determined'],[2.5,'relieved']],{view:'side',walk:bpOf(t)*.42*(1-p),aL:-.25,armL:()=>M.suitcase(0,103,.92,t)});
  M.actor('b',1310,906,42,t,l,[[0,'hopeful'],[2.4,'happy']],{view:'q',aL:-.2,armL:()=>M.flower(0,45,1.28,t)});M.foreground(t);end();
 },'wipe','0–2.1 提箱进入；2.1–2.8 放缓脚步；2.8–3.61 看见熟悉的花');
 M.register(179.40,'同一朵花有了新的窗台','insert',(t,l,d)=>{
  start(l,d,'desk',.75);M.windowFrame(674,96,758,623,t,false);const p=E(l,.4,1.7);
  M.flower(lerp(1640,1140,p),lerp(799,721,p),2.15,t);M.box(1094,680,100,113,'#B18B71',.8);
  hand(lerp(1646,1150,p)+950*E(l,1.9,2.8),lerp(814,704,p),1200,C.rose,-1);M.mug(790,751,1.8,t);end();
 },'cut','0–.4 新的窗台；.4–1.7 把花放进花盆；1.7–3.11 熟悉的杯和花留下');
 M.register(182.51,'先试探再握住','insert',(t,l,d)=>{
  start(l,d,'garden',.75);M.bench(960,870,2.5);const p=E(l,.65,2.1),q=E(l,2.25,3.15);
  M.actor('a',0,1325,117,t,l,[[0,'neutral']],{aR:0,sq:0,noShadow:true});M.actor('b',1930,1325,117,t,l,[[0,'neutral']],{aL:0,sq:0,noShadow:true});
  hand(lerp(839,964,p),793,200,C.clay,1);hand(lerp(1110,986,q),793-10*q,250,C.rose,-1);
  end();
 },'cut','0–.65 两只手有间距；.65–2.1 试探伸过来；2.25–3.15 另一只手握住；3.15–3.64 停留');
 M.register(186.15,'手心的答案','close',(t,l,d)=>{
  start(l,d,'garden',.8);M.actor('a',1060,986,76,t,l,[[0,'nervous'],[.8,'surprised'],[1.6,'relieved']],{lookX:lerp(.7,0,E(l,.8,1.6)),aR:-.3,rot:-.02*E(l,1.4,2.2)});M.tree(180,910,1.3,t,0);end();
 },'cut','0–.8 等待答案；.8–1.6 感觉到握紧；1.6–2.71 放心微笑');
 M.register(188.86,'把未来小心打开','insert',(t,l,d)=>{
  start(l,d,'garden',.82);const p=E(l,.35,1.3),o=E(l,1.65,2.55),yy=lerp(991,624,p);
  hand(978,yy+128,1200,C.clay,1);ringBox(962,yy,1.65,o,t);
  if(o>.7)glow(959,yy-83,74,'#F1D393',.23);end();
 },'cut','0–1.3 拿出盒子；1.3–1.65 稍停；1.65–2.55 打开；2.55–4.14 看清戒指');
 M.register(193.00,'意外之后认真点头','close',(t,l,d)=>{
  start(l,d,'garden',.84);const nod=E(l,1.55,1.9)-E(l,2.08,2.43),reach=E(l,2.5,3.35);
  M.actor('b',1112,997+26*nod,78,t,l,[[0,'surprised'],[1.4,'shy'],[2.4,'happy']],{lookX:-.5,lookY:.45,rot:-.025*nod,aL:lerp(-.1,-.85,reach),sq:0});
  // The box enters this reaction framing at the same lower-left screen position as A's offer.
  hand(620,859,720,C.clay,1);ringBox(620,809,.76,1,t);end();
 },'cut','0–1.4 意外看清；1.55–2.43 认真点头；2.5–3.35 伸手接受；3.35–3.7 停留');
})();
