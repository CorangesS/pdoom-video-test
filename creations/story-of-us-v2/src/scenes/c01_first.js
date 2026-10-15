(() => {
 const M=V,C=M.C,E=M.E;
 function windowLook(t,l,d,id){
  M.begin(l,d,id==='a'?900:1030,535,1.03,.045);M.bg('room',t,.62);
  const x=id==='a'?666:1175;
  M.actor(id,x,899,64,t,l,[[0,'thinking'],[d*.36,'hopeful'],[d*.72,'shy']],{lookX:id==='a'?.65:-.55,lookY:.25,aR:.23,armR:()=>M.envelope(55,-4,.85)});
  M.table(id==='a'?1180:520,823,510);M.flower(id==='a'?1180:520,817,1.65,t);
  M.mug(id==='a'?1335:375,821,1.2,t);camEnd();
 }
 M.register(14.3,'窗边读你的信','close',(t,l,d)=>windowLook(t,l,d,'a'),'wipe','0–1.5 看花；1.5–3 看信；3–4.7 微笑');
 M.register(19,'另一扇窗里的想念','close',(t,l,d)=>windowLook(t,l,d,'b'),'cut','0–1.2 反向看信；1.2–3 收藏；3–4.61 望向窗外');
 M.register(23.61,'第一张共同回忆','insert',(t,l,d)=>{
  M.begin(l,d,960,530,1.02,.04);M.bg('desk',t,.72);M.book(960,521,1.5,t,1);
  const q=E(l,.7,2.5),p=arcPt([715,70],[683,474],-65,q);push();translate(...p);rotate(-.13*(1-q));M.photo(0,0,.84,t,0);pop();
  const r=E(l,2.8,4.1);M.flower(1290,lerp(87,651,r),1.13,t);M.redThread([[566,776],[812,797],[962,758],[1147,792],[1400,758]],1.6);camEnd();
 },'wipe','0–.7 书页；.7–2.5 小画落页；2.8–4.1 收藏花；4.1–5.35 停留');
 M.register(28.96,'把热茶推到你手边','insert',(t,l,d)=>{
  M.begin(l,d,960,540,1,.02);M.bg('desk',t,.72);
  const q=E(l,.55,2.05),ax=lerp(115,490,q),bx=1564;
  // The cup is held by the hand, so it cannot float away from the action.
  M.actor('a',ax,1035,69,t,l,[[0,'shy']],{aR:0,armR:()=>M.mug(53,0,1.65,t),noLegs:true,lookX:1});
  M.actor('b',bx,1035,69,t,l,[[0,'thinking'],[2.2,'surprised']],{aL:0,lookX:-1,noLegs:true});
  M.table(960,830,2030);M.mug(1288,829,1.4,t+.6,'#D7B3A4');camEnd();
 },'cut','0–.55 手与杯；.55–2.05 推近；2.05–3.34 接住');
 M.register(32.3,'暖意在脸上停留','close',(t,l,d)=>{
  M.begin(l,d,1060,535,1,.025);M.bg('room',t,.78);
  M.actor('b',1100,942,78,t,l,[[0,'surprised'],[.8,'shy'],[2,'happy']],{lookX:-.7,aL:.05,armL:()=>M.mug(37,0,1.25,t)});
  M.actor('a',70,1150,86,t,l,[[0,'hopeful']],{view:'qback',noShadow:true});camEnd();
 },'cut','0–.8 看杯；.8–2 看向画外的人；2–3.57 放松');
 M.register(35.87,'一起看见未来的家','wide',(t,l,d)=>{
  M.begin(l,d,990,520,1,.04);M.bg('garden',t,.52);M.house(1160,812,1.34,t,0);M.tree(1780,824,1.3,t);
  M.actor('a',487,930,38,t,l,[[0,'hopeful']],{view:'qback',aR:.2+.7*E(l,.8,2)});
  M.actor('b',780,921,34,t,l,[[0,'thinking'],[2.5,'happy']],{view:'back'});
  M.sprout(1620,858,.82,.08,t);M.foreground(t);camEnd();
 },'wipe','0–.8 房屋；.8–2 指向它；2–4.33 一起想象');
 M.register(40.2,'第一次一起修窗','medium',(t,l,d)=>{
  M.begin(l,d,960,525,1,.02);M.bg('desk',t,.66);M.box(250,190,1420,740,'#DECAA9',0);
  M.windowFrame(749,278,440,405,t);const q=E(l,.5,2.8);
  M.actor('a',420,917,46,t,l,[[0,'determined'],[3,'proud']],{aR:.22,armR:()=>{M.stroke([[0,0],[42,-50]],4,C.wood);push();translate(44,-52);rotate(-.4+Math.sin(l*9)*(1-q)*.5);M.box(-35,-18,83,31,'#7E9291',.8);pop();}});
  M.actor('b',1440,917,46,t,l,[[0,'determined'],[3.2,'happy']],{aL:.38});
  push();translate(959,680);rotate(.09*(1-q));M.box(-268,-14,536,28,C.wood,1);pop();camEnd();
 },'cut','0–.5 歪框；.5–2.8 扶正修好；2.8–4.28 放手后仍平整');
 M.register(44.48,'空白页开始有了你','insert',(t,l,d)=>{
  M.begin(l,d,960,520,1.02,.045);M.bg('desk',t,.75);M.book(960,535,1.48,t,0);
  const q=E(l,.5,2.5);M.actor('b',1287,618,31*q,t,l,[[0,'happy']],{noShadow:true,hat:q>.6?'flower':null});
  M.pencil(1260-100*Math.sin(q*Math.PI),530-130*q,1.45,-.38);camEnd();
 },'wipe','0–.5 一人肖像；.5–2.5 第二幅出现；2.5–3.52 看懂我们');
 M.register(48,'两只手一起写','insert',(t,l,d)=>{
  M.begin(l,d,960,540,1,.015);M.bg('desk',t,.78);M.book(960,592,1.34,t,1);
  const q=E(l,.3,1.6),a=lerp(157,383,q),b=lerp(1763,1537,q);
  M.actor('a',a,1120,81,t,l,[[0,'hopeful']],{aR:0,noLegs:true,noShadow:true});
  M.actor('b',b,1120,81,t,l,[[0,'happy']],{aL:0,noLegs:true,noShadow:true});
  M.pencil(960,752,1.7,.12*Math.sin(l*2));
  M.redThread([[795,795],[874,808],[960,788],[1047,807],[1126,793]],1.8*E(l,1,2.3));camEnd();
 },'cut','0–1.6 两只手靠近同一支笔；1.6–2.3 落线；2.3–3.05 停留');
 M.register(51.05,'走开之前回头','medium',(t,l,d)=>{
  M.begin(l,d,950,535,1,.02);M.bg('street',t,.47);M.lamp(960,844,t,1);
  const q=E(l,.3,1.9),r=E(l,2.7,4.6),ax=700-190*q+190*r;
  M.actor('a',ax,899,44,t,l,[[0,'thinking'],[2.6,'surprised'],[4.5,'happy']],{...turn(l,2.6,3,-.25,0),walk:bpOf(t)*.22*(1-r),lookX:.8,aR:0});
  M.actor('b',1310,900,44,t,l,[[0,'thinking'],[2.5,'hopeful'],[4.8,'happy']],{aL:.2+.35*E(l,2,3.3),lookX:-.8});
  M.redThread([[ax+300,704],[960,760-45*r],[998,704]],1.4);M.foreground(t);camEnd();
 },'wipe','0–1.9 走开；1.9–2.7 停下；2.7–4.6 回来；4.6–6.05 选择留下');
 M.register(57.10,'把两条路写成一条','insert',(t,l,d)=>{
  M.begin(l,d,960,540,1,.025);M.bg('desk',t,.8);M.book(960,520,1.5,t,1);
  const q=E(l,.55,2.7);M.stroke([[600,682],[830,682],[960,682-60*q]],1.8,C.red);M.stroke([[1320,682],[1090,682],[960,682-60*q]],1.8,C.red);
  M.pencil(lerp(1340,960,q),683-60*q,1.7,-.5);camEnd();
 },'cut','0–.55 分开的线；.55–2.7 两线汇合；2.7–4.4 停留');
 M.register(61.5,'看到你写下的我们','close',(t,l,d)=>{
  M.begin(l,d,1015,530,1,.025);M.bg('room',t,.79);
  M.actor('a',1130,943,78,t,l,[[0,'surprised'],[.9,'shy'],[2.1,'happy']],{lookX:-.6,lookY:.4});
  M.actor('b',115,1100,73,t,l,[[0,'hopeful']],{view:'qback',noShadow:true});
  M.book(660,1070,1.1,t,2);camEnd();
 },'cut','0–.9 看书；.9–2.1 抬头；2.1–3.61 微笑');
 M.register(65.11,'花架下的第一次靠近','close',(t,l,d)=>{
  M.begin(l,d,960,520,1,.06);M.bg('garden',t,.75);
  M.box(193,260,24,683,'#9D9E7D',0);M.box(1699,260,24,683,'#9D9E7D',0);M.box(193,238,1530,34,'#9D9E7D',0);
  for(let i=0;i<7;i++)M.flower(220+i*236,373+(i%2)*29,.7,t+i);
  const q=E(l,1.2,3.5)*(1-E(l,5.4,6.5));
  M.actor('a',lerp(627,702,q),896,48,t,l,[[0,'shy'],[3.7,'happy'],[6.1,'shy']],{lookX:1,rot:.035*q,aR:0});
  M.actor('b',lerp(1293,1188,q),896,48,t,l,[[0,'shy'],[3.8,'happy'],[6,'shy']],{lookX:-1,rot:-.035*q,aL:0});
  M.foreground(t);camEnd();
 },'wipe','0–1.2 对视；1.2–3.5 靠近；3.5–5.4 轻碰；5.4–7.68 害羞退开');
 M.register(72.79,'同向沿河走','wide',(t,l,d)=>{
  const q=E(l,.5,d-.8);M.begin(l,d,960+170*q,535,1,.015);M.bg('river',t,.7);M.house(1670,654,.43,t,1);
  M.actor('a',550+350*q,923,35,t,l,[[0,'happy']],{view:'side',walk:bpOf(t)*.28});
  M.actor('b',985+350*q,923,35,t,l,[[0,'happy']],{view:'side',walk:bpOf(t)*.28+.14});M.foreground(t);camEnd();
 },'wipe','0–1 方向与步道；1–4 并肩走；4–6.61 远处的家');
 M.register(79.4,'在长椅上等天亮','wide',(t,l,d)=>{
  M.begin(l,d,960,520,1,.055);M.bg('river',t,.6);
  // Cover the shared sun with a distant ridge and paint the single rising sun here.
  M.shape([[0,0],[1920,0],[1920,420],[0,420]],mixCol('#BBCFD0','#F0D6B0',E(l,0,d)),0,null);
  M.oval(980,490-220*E(l,1,d-.7),74,74,'#EBC07F');M.bench(961,915,1.35);
  const lean=E(l,2.8,4.8);M.actor('a',783,810,29,t,l,[[0,'neutral']],{view:'back',rot:.025*lean});
  M.actor('b',1132-22*lean,810,29,t,l,[[0,'neutral']],{view:'back',rot:-.065*lean});
  M.tree(112,913,1.2,t);M.foreground(t);camEnd();
 },'fade','0–1 长椅背影；1–3.6 日出；3.6–5 靠肩；5–6.32 停留');
 M.register(85.72,'把种子放进共同的土','insert',(t,l,d)=>{
  M.begin(l,d,960,535,1,.02);M.bg('garden',t,.8);
  M.oval(960,848,290,90,'#957E65');M.oval(960,815,45,18,'#655E51');
  const q=E(l,.5,1.9),px=lerp(653,933,q),py=lerp(510,790,q);
  M.actor('a',177,990,78,t,l,[[0,'determined']],{aR:.1,lookX:1});
  M.actor('b',1710,990,78,t,l,[[0,'hopeful']],{aL:.1,lookX:-1});
  if(l<2)M.oval(px,py,14,22,'#D9B780');
  const r=E(l,2,3.2);M.shape([[852,838],[940,796-22*r],[1020,802-23*r],[1087,837]],'#A28A6C',0,null);
  camEnd();
 },'cut','0–.5 土与种子；.5–1.9 放入；2–3.2 覆土；3.2–4.08 停留');
 M.register(89.8,'我们一起照顾它','medium',(t,l,d)=>{
  M.begin(l,d,960,540,1,.03);M.bg('garden',t,.83);const q=E(l,.5,2.5);
  M.actor('a',620,915,42,t,l,[[0,'determined'],[2.6,'surprised'],[3.1,'happy']],{aR:0,armR:()=>{M.box(-25,-37,76,73,'#8FAAA6',.6);M.shape([[50,-19],[106,-44],[110,-26],[49,7]],'#8FAAA6',.6);}});
  M.actor('b',1310,915,42,t,l,[[0,'hopeful'],[2.7,'happy']],{aL:.35});
  M.sprout(999,928,1.05,q,t);
  if(l<2.9)for(let i=0;i<4;i++){const yy=752+((l*94+i*23)%105);M.oval(1020,yy,3,6,'#86AAB8');}
  M.foreground(t);camEnd();
 },'cut','0–.5 浇水；.5–2.5 生长；2.5–3.93 反应');
 M.register(93.73,'把生活搬进家','wide',(t,l,d)=>{
  M.begin(l,d,960,533,1,.035);M.bg('garden',t,.8);M.house(1220,923,1.63,t,1);M.sprout(1680,935,.8,1,t);
  const q=E(l,.5,d-1.3),r=E(l,1,d-.6),ax=lerp(425,1183,q),bx=lerp(815,1265,r);
  M.actor('a',ax,927,lerp(32,14,q),t,l,[[0,'happy']],{...turn(l,2.1,2.5,.25,.5),walk:bpOf(t)*.28,armR:()=>M.mug(20,-5,.6,t)});
  M.actor('b',bx,927,lerp(31,14,r),t,l,[[0,'happy']],{...turn(l,2.4,2.8,.25,.5),walk:bpOf(t)*.3,armR:()=>{M.box(0,-10,63,46,'#B9836E',.7);}});
  if(q>.73){M.box(1045,720,85,203,'#E6CCAD',0);M.box(1312,720,90,203,'#E6CCAD',0);}
  M.foreground(t);camEnd();
 },'wipe','0–.5 门与行李；.5–4.5 依次走入；4.5–5.77 落定');
 M.register(99.5,'窗里亮起两个人的灯','medium',(t,l,d)=>{
  M.begin(l,d,960,530,1,.055);M.bg('night',t,.9);
  M.box(299,105,1322,875,'#BDAB8B',0);M.box(517,197,886,641,'#DDC298',1);
  M.actor('a',791,807,35,t,l,[[0,'hopeful'],[2.7,'happy']],{aR:0});M.actor('b',1167,807,35,t,l,[[0,'happy']],{aL:0});
  M.table(988,732,659);M.mug(846,731,.97,t);M.mug(1101,731,.97,t,'#D7B3A4');
  M.box(493,176,935,32,'#6D8984',.8);M.box(493,813,935,32,'#6D8984',.8);M.box(493,176,32,669,'#6D8984',.8);M.box(1396,176,32,669,'#6D8984',.8);
  M.box(946,178,24,641,'#6D8984',.6);M.flower(1468,858,1.2,t);
  M.lamp(364,838,t,E(l,.6,2));camEnd();
 },'iris','0–.6 窗内两杯；.6–2 灯亮；2–4.5 两人安顿；4.5–5.93 停留');
})();
