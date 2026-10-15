// Shared art direction. All positions are in a 1920 x 1080 frame.
(() => {
 const P=window.S,C={...P.C,ink:'#493C42',sky:'#CBD8D4',wood:'#B69272'};
 const box=P.box,oval=P.oval,shape=P.shape,stroke=P.stroke;
 const E=(t,a,b)=>ease(seg(t,a,b));
 const sceneList=[];
 function actor(id,x,y,u,t,l,keys=[[0,'neutral']],o={}){
  P.actor(id,x,y,u,t,l,keys,{emote:null,dy:0,tintK:.08,swMul:.6,...o});
 }
 function cloud(x,y,s,t){P.cloud(x+Math.sin(t*.13+x)*12,y,s);}
 function bg(kind,t,warm=.5){
  boilSeed('v2-background-'+kind);
  box(-160,-180,2240,1440,C.paper,0);
  const night=kind==='night',inside=kind==='room'||kind==='desk';
  if(inside){
   box(-150,-150,2220,1150,mixCol('#DCE0D1','#EBD4B4',warm),0);
   box(-100,778,2120,450,'#BFA58C',0);
   for(let i=0;i<5;i++)stroke([[-100,827+i*55],[2020,827+i*55]],.5,'#A88E77');
   if(kind==='room'){
    windowFrame(1330,157,390,420,t,warm>.8);
    box(140,330,418,19,C.wood,.6);
    for(let i=0;i<5;i++)box(168+i*62,245-(i%2)*16,42,85+(i%2)*16,['#97AAA5','#C88F78','#D5B37F'][i%3],.5);
    P.sprout(482,327,.6,1,t);
    oval(853,186,67,67,'#EADDC5',.8);stroke([[853,186],[853,144]],.8);stroke([[853,186],[880,197]],.8);
    box(1210,821,560,32,'#AD8C73',.7);box(1240,853,22,105,C.wood,.5);box(1710,853,22,105,C.wood,.5);
   }
   return;
  }
  const sky=night?'#3D5266':mixCol('#B6CED3','#F0D3A8',warm);
  box(-150,-150,2220,1170,sky,0);
  if(night){oval(1530,205,67,67,'#F0DFB6');for(let i=0;i<17;i++)oval(120+hash(i)*1680,90+hash(i+52)*390,2+hash(i+9)*2,3,C.cream);}
  else {oval(1460,198,76,76,'#E9BB78');cloud(341,195,1.45,t);cloud(1020,301,.95,t);}
  shape([[-100,580],[260,430],[650,550],[970,380],[1330,530],[1690,439],[2040,580],[2040,910],[-100,910]],night?'#607D80':'#9EB5AC',0,null);
  shape([[-100,724],[250,605],[653,713],[1160,560],[1560,697],[2040,598],[2040,970],[-100,970]],night?'#577977':'#839E91',0,null);
  if(kind==='street'||kind==='station'){
   for(let i=0;i<6;i++){
    boilSeed('v2-town-'+i);const x=-100+i*365,y=405+(i%3)*40;
    box(x,y,330,390,['#CACAB4','#C4B6A1','#9CAEAD'][i%3],0);
    shape([[x-12,y],[x+160,y-121],[x+340,y],[x+325,y+24],[x,y+24]],i%2?'#A87866':'#8B8E81',.6);
    for(let j=0;j<2;j++){box(x+47+j*166,y+70,61,102,'#DFD9BB',.6);stroke([[x+77+j*166,y+70],[x+77+j*166,y+172]],.5,'#8C9A8E');}
    box(x+136,y+229,75,159,'#818E89',.5);
   }
  }
  if(kind==='river'){
   shape([[-150,638],[600,576],[1410,648],[2040,590],[2040,879],[-150,901]],'#89B2B8',0,null);
   for(let i=0;i<9;i++)stroke([[100+i*219,665+(i%3)*42],[210+i*219,663+(i%3)*42]],.65,'#CDDDD3');
   box(-150,813,2240,320,'#C8BBA0',0);
   stroke([[-150,811],[2020,811]],2,'#8A978B');
   for(let i=0;i<7;i++)box(i*335,705,13,145,'#6D8B82',0);
   stroke([[-150,731],[2030,731]],2.5,'#6D8B82');
  }else{
   shape([[-150,815],[412,792],[992,823],[1543,777],[2060,811],[2060,1140],[-150,1140]],night?'#74877D':kind==='street'||kind==='station'?'#C9BEA7':'#B5BDA0',0,null);
   stroke([[-100,886],[620,863],[1230,885],[2020,864]],.55,'#A49A80');
  }
 }
 function windowFrame(x,y,w,h,t,night=false){
  box(x-18,y-18,w+36,h+36,'#718F8C',1);
  box(x,y,w,h,night?'#425B72':'#BBD0CE',0);oval(x+w*.72,y+h*.25,38,38,night?'#EFE0B7':'#E8D3A3');
  stroke([[x+w/2,y],[x+w/2,y+h]],2,'#718F8C');stroke([[x,y+h*.53],[x+w,y+h*.53]],2,'#718F8C');
  for(const q of [x-30,x+w-16])shape([[q,y-30],[q+66,y-30],[q+49+6*Math.sin(t*.5),y+h+25],[q-5,y+h+20]],'#EAE1C8',.5);
  box(x-43,y+h+13,w+87,22,'#B99175',.5);
 }
 function table(x=960,y=770,w=1160){box(x-w/2,y,w,37,'#BD9276',1);box(x-w/2+57,y+37,27,145,'#A78065',.7);box(x+w/2-84,y+37,27,145,'#A78065',.7);}
 function bench(x,y,s=1){box(x-265*s,y-105*s,530*s,30*s,'#B38E6C',.7);box(x-265*s,y-205*s,530*s,65*s,'#C6A47C',.7);for(let z of [-205,205])box(x+z*s,y-75*s,18*s,75*s,'#829185',.6);}
 function foreground(t,col='#667F73'){
  for(const [x,flip] of [[-15,1],[1938,-1]]){boilSeed('fg'+x);stroke([[x,974],[x+flip*74,839],[x+flip*41,716]],3,col);for(let j=0;j<3;j++)shape([[x+flip*(34+j*12),928-j*59],[x+flip*(119+j*9),858-j*53],[x+flip*(98+j*5),926-j*46]],col,0,null);}
 }
 function tree(x,y,s,t,season=0){P.tree(x,y,s,t,season);}
 function book(x,y,s,t,stage=0,close=0){
  boilSeed('v2-album');push();translate(x,y);scale(s);
  // Larger page stack is earned over the film, with distinct accumulated memories.
  const thick=12+Math.min(stage,5)*7;
  box(-422,190,844,thick,'#AA7560',.7);
  for(let i=0;i<Math.min(stage+2,7);i++)stroke([[-411,194+i*5],[406,194+i*5]],.5,'#EDD8B7');
  shape([[-425,-200],[-24,-219],[0,-190],[29,-219],[425,-200],[425,199],[29,179],[0,201],[-27,179],[-425,199]],'#F4E7CB',.7);
  stroke([[0,-189],[0,198]],.7,'#B6A48A');
  if(stage>=0)clawd(-218,56,21,{...feel('neutral',t),noShadow:true,swMul:.4,emote:null,boilKey:'portrait-a'});
  if(stage>=1)clawd(219,56,21,{...feel('happy',t),col:C.rose,dk:'#AA6E7D',lt:'#E8B6B7',hat:'flower',noShadow:true,swMul:.4,emote:null,boilKey:'portrait-b'});
  if(stage>=2){P.flower(-336,170,.65,t);P.mug(305,152,.6,t);P.redThread([[-185,118],[-56,139],[61,113],[173,141]],1.4);}
  if(stage>=3){P.house(-201,172,.18,t,1);P.umbrella(80,163,.2,t);}
  if(stage>=4)P.suitcase(352,-93,.5,t);
  if(close>0){const e=E(close,0,1);shape([[-426,-214],[-426+854*e,-214],[-426+854*e,220],[-426,220]],'#AD7660',.8);}
  pop();
 }
 function envelope(x,y,s=1,rot=0){boilSeed('envelope');push();translate(x,y);rotate(rot);box(-70*s,-43*s,140*s,86*s,C.cream,.65);stroke([[-70*s,-43*s],[0,12*s],[70*s,-43*s]],.75,C.red);pop();}
 function photo(x,y,s,t,kind=0){
  boilSeed('memory-photo'+kind);push();translate(x,y);scale(s);
  box(-150,-120,300,258,'#F3E5C9',.6);box(-130,-100,260,190,'#B2C8B8',0);
  if(kind===0){push();translate(0,72);scale(.33);P.lamp(0,0,t,.7);pop();actor('a',-62,64,8,t,0,[[0,'happy']],{noShadow:true});actor('b',62,64,8,t,0,[[0,'shy']],{noShadow:true});}
  else if(kind===1){P.umbrella(0,65,.32,t);actor('a',-52,67,7,t,0,[[0,'happy']],{noShadow:true});actor('b',52,67,7,t,0,[[0,'happy']],{noShadow:true});}
  else P.house(0,68,.38,t,1);
  pop();
 }
 function begin(l,d,x=960,y=540,z=1,pushIn=.025){camBegin(x+7*Math.sin(l*.24),y,z+pushIn*E(l,0,d));}
 function register(start,label,lens,fn,transition='wipe',reads='establish → action → reaction → hold') {sceneList.push({start,label,lens,fn,transition,reads});}
 window.V={...P,C,E,actor,bg,windowFrame,table,bench,foreground,tree,book,envelope,photo,begin,register,sceneList};
})();
