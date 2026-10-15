// Years, return, and the completed book. Beat grid: .391 + n * 60 / 68.
// Each drawing is a pure function of time; chapter owns no shared state.
(() => {
 const M=window.V,E=M.E,C=M.C;
 function aged(id,x,y,u,t,l,keys,o={}){
  const extra=o.draw;M.actor(id,x,y,u,t,l,keys,{...o,draw:(q,sw)=>{
   boilSeed('years-grey-'+id);
   M.shape([[-4.8*q,-7.8*q],[-3.9*q,-8.18*q],[-2.4*q,-8*q],[-1.7*q,-7.74*q],[-3.1*q,-7.65*q]],'#D7D4C5',sw*.4);
   M.shape([[3*q,-8*q],[4.8*q,-7.87*q],[4.8*q,-6.45*q],[4.1*q,-6.75*q]],'#D7D4C5',sw*.4);
   M.stroke([[-3.5*q,-4.85*q],[-2.95*q,-4.65*q]],sw*.45,'#A57367');
   M.stroke([[3*q,-4.82*q],[3.5*q,-4.98*q]],sw*.45,'#A57367');
   if(extra)extra(q,sw);
  }});
 }
 function scarf(u,colour=C.red){
  M.shape([[-4.65*u,-3.58*u],[4.65*u,-3.58*u],[4.68*u,-2.83*u],[-4.65*u,-2.8*u]],colour,.6);
  M.shape([[2.6*u,-3.4*u],[3.8*u,-3.2*u],[3.46*u,-.1*u],[2.33*u,-.1*u]],colour,.6);
  for(let i=0;i<4;i++)M.stroke([[2.4*u+i*.27*u,-.2*u],[2.4*u+i*.27*u,.15*u]],.5,colour);
 }
 function hand(x,y,s,col,ring=false,flip=false){
  boilSeed('years-hand'+col);push();translate(x,y);scale(flip?-s:s,s);
  M.shape([[-260,-54],[-30,-54],[1,-34],[72,-37],[104,-12],[103,36],[74,57],[-28,53],[-260,53]],col,1.1);
  M.stroke([[33,9],[83,13]],.7,'#A17069');M.stroke([[25,30],[71,34]],.7,'#A17069');
  M.stroke([[-67,-20],[-47,-6]],.8,'#A17069');M.stroke([[-75,-4],[-56,7]],.8,'#A17069');
  if(ring){M.shape([[7,-35],[25,-36],[25,51],[7,53]],'#D8B76E',.75);M.stroke([[13,-31],[13,49]],.55,'#F2D89B');}
  pop();
 }
 function arch(t){
  M.stroke([[346,908],[346,271],[1568,271],[1568,908]],8,'#A6987D');
  for(let i=0;i<8;i++){const x=354+i*170;M.stroke([[x,272],[x+35,224],[x+101,273]],2,'#75947B');M.flower(x+45,294,.7,t);}
 }
 function homeStage(t,l,night=false){
  M.bg(night?'night':'garden',t,.85);M.tree(275,863,1.25,t,2);M.house(1295,884,1.45,t,0);
  M.shape([[860,962],[1180,876],[1406,876],[1630,962]],'#D6C4A2',0,null);
  const op=E(l,.6,1.6),light=E(l,4.9,5.75);M.box(1214,592,165,292,mixCol('#685B59','#F0CC89',light),0);
  // Flat drawn door slides within its frame; people crossing the threshold are masked by jambs.
  M.box(1214,592,165*(1-op),292,'#9A8B7E',.75);
  return {light};
 }
 function albumMemory(x,y,s,t,kind){
  M.box(x-178*s,y-144*s,356*s,298*s,'#F2E2C4',.65);
  M.box(x-161*s,y-127*s,322*s,237*s,kind===1?'#AAC1C5':'#C5D1BD',0);
  if(kind===0){M.stroke([[x,y+90*s],[x,y-77*s]],1.6*s,'#7C7C77');M.shape([[x-15*s,y-85*s],[x+15*s,y-85*s],[x+11*s,y-52*s],[x-11*s,y-52*s]],'#E9C484',.5);M.actor('a',x-79*s,y+92*s,13*s,t,0,[[0,'shy']],{noShadow:true});M.actor('b',x+81*s,y+92*s,13*s,t,0,[[0,'happy']],{noShadow:true});M.envelope(x,y+26*s,.34*s);}
  else if(kind===1){M.umbrella(x,y+91*s,.56*s,t,-.06);M.actor('a',x-60*s,y+98*s,12*s,t,0,[[0,'happy']],{noShadow:true});M.actor('b',x+63*s,y+98*s,12*s,t,0,[[0,'relieved']],{noShadow:true});}
  else {M.box(x-144*s,y-108*s,288*s,203*s,'#728F8E',.5);M.box(x-131*s,y-93*s,262*s,174*s,'#D0C9A7',0);M.actor('a',x-65*s,y+86*s,14*s,t,0,[[0,'happy']],{noShadow:true});M.actor('b',x+68*s,y+86*s,14*s,t,0,[[0,'shy']],{noShadow:true});M.stroke([[x-139*s,y+83*s],[x+139*s,y+83*s]],4*s,'#728F8E');}
 }

 M.register(196.70,'把灯留给我们','wide',(t,l,d)=>{
  M.begin(l,d,1000,526,1,.025);const {light}=homeStage(t,l);
  const q=E(l,1.6,4.55);const xa=lerp(780,1289,q),xb=lerp(575,1280,E(l,1.9,4.9));
  M.actor('a',xa,882,lerp(26,18,q),t,l,[[0,'happy']],{view:'side',walk:bpOf(t)*.34*(1-q),aL:.7,dx:0,sq:0,rot:0});
  M.actor('b',xb,lerp(894,880,E(l,1.9,4.9)),lerp(26,18,E(l,1.9,4.9)),t,l,[[0,'relieved']],{view:'side',walk:bpOf(t)*.32*(1-E(l,1.9,4.9)),aL:.65,dx:0,sq:0,rot:0});
  // Their silhouettes fit entirely inside the opening before the door closes.
  const shut=E(l,4.85,5.5);M.box(1214,592,165*shut,292,'#A5957D',.7);
  if(light>0){M.box(1439,574,90,123,mixCol('#95AFB0','#EFC986',light),.6);glow(1480,630,100,'#F5D99A',light*.42);}
  M.sprout(1562,900,1,1,t);camEnd();
 },'wipe','0–1.6 看见门打开；1.6–4.9 两人依次跨过门槛；4.9–5.75 关门亮灯；5.75–6.97 停留');

 M.register(203.67,'同一条路走过四季','wide',(t,l,d)=>{
  const season=Math.min(3,Math.floor(l/1.81));M.begin(l,d,960,535,1,.012);M.bg('river',t,[.4,.6,.8,.2][season]);
  M.tree(350,829,1.35,t,season);M.tree(1580,829,1.08,t,season);M.house(1310,610,.39,t,1);
  const q=E(l,.15,6.8),x=lerp(598,1224,q);M.actor('a',x,911,29,t,l,[[0,'happy']],{view:'side',walk:bpOf(t)*.42,aL:.7,dx:0,draw:u=>{if(season===3)scarf(u);}});
  M.actor('b',x-185,912,29,t,l,[[0,'relieved']],{view:'side',walk:bpOf(t)*.42+.12,aL:.7,dx:0,draw:u=>{if(season===3)scarf(u,'#D2B57E');}});
  // Falling seasonal accents remain above the dry, clearly separated walkway.
  for(let i=0;i<9;i++){boilSeed('season'+i);const xx=150+hash(i+12)*1650,yy=220+frac(t*.08+hash(i))*520;M.oval(xx,yy,season===3?3:8,season===3?3:3,['#DDBEAD','#D7CF9C','#C59464','#F0E9D4'][season]);}
  camEnd();
 },'fade','0–1.5 春天并肩；1.81–3.6 夏天；3.62–5.4 秋天；5.43–7.24 冬天围巾；脚始终在813以下的干步道');

 M.register(210.91,'窗边先看向你','close',(t,l,d)=>{
  M.begin(l,d,960,526,1,.028);M.bg('room',t,.93);M.table(940,865,1560);
  M.actor('b',753,970,76,t,l,[[0,'thinking',{lookX:1,lookY:-.1}],[2,'hopeful',{lookX:-.7}],[3.3,'shy']],{...turn(l,1.55,1.82,.125,0),aL:-.3,aR:-.3,dx:0,rot:0});
  M.mug(1390,853,1.55,t);M.flower(1640,819,1.35,t);camEnd();
 },'cut','0–1.55 看窗外；1.55–2.2 转向画外的爱人；2.2–4.59 留住目光与微笑');
 M.register(215.5,'回应是靠近','close',(t,l,d)=>{
  M.begin(l,d,960,526,1,.035);M.bg('room',t,.93);
  M.actor('a',706,958,71,t,l,[[0,'neutral',{lookX:1}],[1,'happy'],[2.5,'relieved']],{aR:-.15,dx:0,rot:.025});
  const k=E(l,1.45,3.15);M.actor('b',lerp(1517,1305,k),970,69,t,l,[[0,'shy'],[3.3,'relieved']],{view:'q',flip:true,dx:0,rot:-.035*k,aL:-.4,aR:-.3});
  M.table(960,912,1650);M.mug(835,902,1.25,t);M.mug(1024,902,1.25,t,'#B6C4B8');camEnd();
 },'cut','0–1.45 对方看懂目光；1.45–3.15 靠近到肩膀相接；3.15–4.9 两杯与两人一起停留');

 M.register(220.4,'一本越来越厚的书','insert',(t,l,d)=>{
  M.begin(l,d,960,528,1.03,.035);M.bg('desk',t,.86);M.table(960,848,1750);M.book(955,480,1.55,t,5,0);
  const q=E(l,.6,2.05);albumMemory(1170,474,1.02,t,0);M.shape([[302,151],[956-590*q,151],[956-590*q,790],[302,790]],'#ECDDBe',.6);
  M.redThread([[934,798],[1120,818],[1400,808]],2.8);
  hand(lerp(1740,1500,E(l,2.6,3.8)),735,1.2,C.rose,true,true);M.mug(1698,379,1.1,t);
  camEnd();
 },'cut','0–.6 看清书脊厚度；.6–2.05 翻过纸页；2.05–2.6 再见最初街角；2.6–3.8 年老的手按住；3.8–6.53 停留');

 M.register(226.93,'这次换我替你围好','medium',(t,l,d)=>{
  M.begin(l,d,960,532,1,.035);M.bg('garden',t,.35);M.tree(260,902,1.2,t,3);
  const q=E(l,1.35,3.45),rx=lerp(1560,1422,q);
  aged('a',660,909,54,t,l,[[0,'sleepy'],[3.65,'surprised'],[4.35,'relieved']],{dx:0,rot:0,aL:-.6,aR:-.5,draw:u=>scarf(u,'#D2B57E')});
  aged('b',rx,909,54,t,l,[[0,'thinking'],[3.8,'happy']],{dx:0,rot:0,aL:0,aR:-.65,armL:()=>{
   const reach=180+120*q;M.shape([[0,-21],[reach,-11],[reach+150,lerp(110,120,q)],[reach+134,160],[reach-16,40],[0,22]],'#D2B57E',.7);
  }});
  M.foreground(t,'#819087');camEnd();
 },'fade','0–1.35 看见松开的围巾；1.35–3.45 另一人靠近整理；3.65–4.35 意外后熟悉地笑；4.35–6.36 停留');

 M.register(233.29,'多年后回到老车站','wide',(t,l,d)=>{
  M.begin(l,d,960,531,1,.017);M.bg('station',t,.6);
  // Arrival direction is leftward, opposite to the outward journey. Train remains behind them.
  const tx=lerp(1620,1050,E(l,0,1.5));M.box(tx-520,304,1250,440,'#8FAAA6',1.2);M.box(tx-520,659,1250,68,'#D5BE96',0);
  for(let i=0;i<4;i++){M.box(tx-469+i*262,349,206,215,'#D8D6B6',1);M.stroke([[tx-366+i*262,350],[tx-366+i*262,563]],1,'#718A86');}
  M.box(tx-210,505,192,287,'#566D6E',1);M.box(tx-246,789,256,29,'#8A8B7C',.7);M.box(tx-270,818,300,26,'#ADAA94',.7);
  for(let i=0;i<4;i++)M.oval(tx-430+i*305,750,47,47,'#667D78',.5);
  const qa=E(l,2,4.55),qb=E(l,2.5,5.05);aged('b',lerp(tx-85,858,qb),lerp(780,895,qb),28,t,l,[[0,'hopeful'],[5.6,'relieved']],{view:'side',flip:true,walk:bpOf(t)*.34*qb*(1-qb)*4,dx:0,sq:0,rot:0});
  aged('a',lerp(tx-135,600,qa),lerp(780,895,qa),28,t,l,[[0,'thinking'],[5.6,'happy']],{view:'side',flip:true,walk:bpOf(t)*.36*qa*(1-qa)*4,dx:0,sq:0,rot:0,aL:.1,armL:()=>{push();rotate(-.6);M.suitcase(0,85.4,.7,t);pop();}});
  M.lamp(280,877,t,.7);camEnd();
 },'wipe','0–1.5 火车抵达旧城；1.5–2 车门；2–5.05 两人提同一个箱子下台阶；5.05–7.93 面向旧街停留');

 M.register(241.22,'花架下还是会害羞','medium',(t,l,d)=>{
  M.begin(l,d,960,527,1,.045);M.bg('garden',t,.8);arch(t);
  const k=E(l,1.45,3.2);aged('a',660+50*k,895,44,t,l,[[0,'hopeful'],[4.1,'shy']],{aR:.15+.5*k,aL:-.6,dx:0,rot:0,lookX:.8,armR:()=>M.flower(15,4,.7,t)});
  aged('b',1248-50*E(l,3.65,4.8),895,44,t,l,[[0,'thinking'],[3.3,'surprised'],[4.6,'shy'],[6,'happy']],{dx:0,rot:-.025*E(l,4,5),aL:.35,aR:-.5,lookX:-.8});
  M.foreground(t);camEnd();
 },'cut','0–1.45 看见他藏着花；1.45–3.2 递出；3.3–4.6 她发现并害羞；4.6–6 靠近；6–7.49 停留');

 M.register(248.71,'我们种下的树已经长大','wide',(t,l,d)=>{
  M.begin(l,d,960,515,1,.025);M.bg('garden',t,.85);M.tree(971,859,1.65,t,2);M.bench(971,901,1.43);
  // Original pot, cracked and empty, is beside the mature tree: the seedling has a visible payoff.
  M.sprout(470,908,.72,0,t);M.stroke([[468,854],[456,885],[470,905]],.8,'#8C7564');
  const q=E(l,.5,2.6),yy=lerp(872,904,q);
  aged('a',775,yy,31,t,l,[[0,'thinking'],[3.1,'relieved']],{view:'q',aL:-.3,aR:-.3,dx:0,rot:0});
  aged('b',1124,yy,31,t,l,[[0,'happy']],{view:'q',flip:true,aL:-.3,aR:-.3,dx:0,rot:0});
  M.book(953,860,.32,t,5,1-E(l,2.8,4.15));M.foreground(t);camEnd();
 },'fade','0–.5 看清大树和当年的花盆；.5–2.6 两人落座；2.8–4.15 打开书；4.15–6.64 在树荫下停留');

 M.register(255.35,'戒指和陪伴都还在','insert',(t,l,d)=>{
  M.begin(l,d,960,535,1,.045);M.bg('desk',t,.8);M.table(960,850,1770);M.book(958,438,1.47,t,5,0);
  hand(780,725,1.7,C.clay,true,false);
  const k=E(l,1.5,3.2);hand(lerp(1580,1030,k),lerp(544,693,k),1.64,C.rose,false,true);
  M.redThread([[320,835],[662,847],[1250,837],[1570,856]],2.4);camEnd();
 },'cut','0–1.5 年老的手和同一枚戒指；1.5–3.2 另一只手慢慢覆盖；3.2–6.49 接触后停留');

 M.register(261.84,'书里真的有我们的一生','insert',(t,l,d)=>{
  M.begin(l,d,960,525,1,.04);M.bg('desk',t,.88);M.table(960,859,1750);M.book(960,488,1.6,t,5,0);
  // Distinct recollections are brought in serially, not a simultaneous collage of symbols.
  albumMemory(592,448,.99,t,0);
  const k1=E(l,1.5,2.75),k2=E(l,3.6,4.95);
  albumMemory(1150+340*(1-k1),432-730*(1-k1),.96,t,1);
  albumMemory(1195+410*(1-k2),633-900*(1-k2),.9,t,2);
  hand(1580-110*E(l,5.3,6.4),797,.95,C.rose,true,true);
  M.flower(353,823,1.2,t);camEnd();
 },'cut','0–1.5 街角与信；1.5–2.75 雨伞照片落下；2.75–3.6 看懂雨中照顾；3.6–4.95 车窗照片；5.3–6.4 手按住；6.4–7.85 停留');

 M.register(269.69,'夜里窗内有两个人','wide',(t,l,d)=>{
  M.begin(l,d,960,518,1,.016);M.bg('night',t,.8);M.tree(280,882,1.55,t,2);M.house(1290,896,1.5,t,1);
  M.shape([[793,1010],[1206,879],[1390,879],[1666,1010]],'#A5A28D',0,null);
  M.box(1207,594,170,302,'#C4A983',0);M.box(1207,594,170*(1-E(l,.15,.75)),302,'#A9997F',.7);
  const k=E(l,.4,3.3);const ax=lerp(667,1280,k),bx=lerp(460,1280,E(l,.75,3.65));
  aged('a',ax,lerp(899,890,k),lerp(28,17,k),t,l,[[0,'relieved']],{view:'side',dx:0,sq:0,rot:0,walk:bpOf(t)*.28*(1-k)});
  aged('b',bx,lerp(903,890,E(l,.75,3.65)),lerp(28,17,E(l,.75,3.65)),t,l,[[0,'happy']],{view:'side',dx:0,sq:0,rot:0,walk:bpOf(t)*.28*(1-E(l,.75,3.65))});
  M.box(1207,594,170*E(l,3.65,4.3),302,'#B2A183',.7);
  // The visible room is painted first, with window crossbars in front.
  const lit=E(l,4.35,5.1);M.box(1437,575,99,128,mixCol('#95AFB0','#EAD099',lit),.65);
  if(lit>.5){M.shape([[1449,696],[1449,636],[1474,636],[1474,696]],'#826F63',0,null);M.shape([[1491,696],[1491,635],[1516,635],[1516,696]],'#927368',0,null);}
  M.stroke([[1486,575],[1486,703]],1.3,'#718F8C');M.stroke([[1437,623],[1536,623]],1,'#718F8C');glow(1486,640,120,'#F5D191',lit*.42);
  camEnd();
 },'fade','0–.4 月光与同一座家；.4–3.65 两人回家；3.65–4.3 门合上；4.35–5.1 窗灯亮；5.1–7.11 两道人影停留');

 M.register(276.8,'故事终于写成我们','insert',(t,l,d)=>{
  M.begin(l,d,960,535,1.04,-.025);M.bg('desk',t,.85);M.table(960,846,1720);
  M.book(935,500,1.38,t,5,E(l,2.1,3.95));M.mug(1618,734,1.85,t);M.mug(328,429,1.55,t,'#B7C6B8');M.pencil(325,652,1.7,-.4);
  // Matching opening desk; now both portraits, accumulated pages and two cups.
  const q=E(l,3.85,5.15),pts=[];for(let i=0;i<42;i++){const a=Math.PI*.3+TAU*q*i/41;pts.push([960+667*Math.cos(a),520+317*Math.sin(a)]);}if(q>.01)M.redThread(pts,2.6);
  camEnd();
 },'fade','0–2.1 两个人的肖像与写满的厚相册；2.1–3.95 合书；3.85–5.15 红线绕成圆；5.15–6.3 两杯蒸汽与停留；6.3–6.6 淡出');
})();
