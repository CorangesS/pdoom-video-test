(() => {
 const M=window.V,E=M.E,C=M.C;
 M.register(0,'只有一人的书页','insert',(t,l,d)=>{
  M.begin(l,d,960,535,1.04,.035);M.bg('desk',t,.65);M.table(960,846,1720);
  M.book(935,500,1.38,t,0,1-E(l,.3,1.65));M.mug(1618,734,1.85,t);M.pencil(325,652,1.7,-.4);
  const k=E(l,1.3,2.7);M.redThread([[904,769],[1100,808],[1350,810],[1350+490*k,782-94*k]],2.7);
  camEnd();
 },'iris','0–1.2 空白另一页；1.2–2.7 打开书与红线；2.7–3.2 停留');
 M.register(3.2,'红线引向街角','wide',(t,l,d)=>{
  M.begin(l,d,960,525,1,.02);M.bg('street',t,.25);M.lamp(960,841,t,1);M.sprout(1620,870,1,1,t);
  const q=E(l,.3,2.7);const a=lerp(340,708,q),b=lerp(1600,1210,q);
  M.actor('a',a,887,34,t,l,[[0,'thinking'],[2.65,'surprised'],[3.2,'shy']],{...turn(l,2.5,2.8,.25,0),walk:bpOf(t)*.37*(1-q),aR:0,armR:()=>M.envelope(35,0,.65)});
  M.actor('b',b,887,34,t,l,[[0,'neutral'],[2.8,'surprised'],[3.5,'shy']],{...turn(l,2.55,2.85,-.25,0),walk:bpOf(t)*.4*(1-q)});
  M.foreground(t);camEnd();
 },'wipe','0–1 地点；1–2.7 走近；2.7–4.3 注意彼此');
 M.register(7.5,'风中的信','insert',(t,l,d)=>{
  M.begin(l,d,960,525,1,.025);M.bg('garden',t,.25);
  const q=E(l,.65,2.25),p=arcPt([603,680],[1339,680],235,q);
  M.actor('a',85,1008,73,t,l,[[0,'neutral'],[.8,'surprised']],{aR:.04,lookX:1,emote:null});
  M.actor('b',1857,1008,73,t,l,[[0,'thinking'],[2.4,'happy']],{aL:.04,lookX:-1,emote:null});
  M.envelope(p[0],p[1],1.55,-.12+.5*Math.sin(q*Math.PI));
  if(q<.96)M.stroke([[p[0]-180,p[1]+47],[p[0]-120,p[1]+54],[p[0]-90,p[1]+40]],1,'#EAE4CE');
  camEnd();
 },'cut','0–.65 持信；.65–2.25 飞行；2.25–3.5 接住');
 M.register(11,'把信递回给你','medium',(t,l,d)=>{
  M.begin(l,d,960,540,1,.04);M.bg('street',t,.3);const q=E(l,.4,1.5);
  M.actor('a',605,900,51,t,l,[[0,'surprised'],[1.7,'shy']],{aR:0,lookX:.8});
  M.actor('b',1315,900,51,t,l,[[0,'hopeful'],[2,'happy']],{aL:0,lookX:-.8});
  M.envelope(lerp(1132,967,q),666,1.1,0);M.foreground(t);camEnd();
 },'cut','0–1.5 递信；1.5–2.3 对视；2.3–3.3 害羞回应');
})();
