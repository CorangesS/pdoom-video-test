(() => {
 const rows=V.sceneList.sort((a,b)=>a.start-b.start);
 window.STORY_SHOTS=rows.map((s,i)=>({start:s.start,end:rows[i+1]?.start??DUR,label:s.label,lens:s.lens,transition:s.transition,reads:s.reads}));
 function transition(kind,k,incoming){
  if(kind==='cut')return;
  if(kind==='iris'){iris(960,550,Math.max(1,2200*(incoming?easeOut(k):1-ease(k))),V.C.paper);return;}
  if(kind==='fade'){flash(incoming?1-ease(k):ease(k),V.C.paper);return;}
  brushWipe(incoming?.5+k*.5:k*.5,[V.C.paper,'#DDC9A8']);
 }
 shots(rows.map((s,i)=>[s.start,(t,l,d)=>{
  s.fn(t,l,d);
  const w=.3;
  if(l<w)transition(s.transition,l/w,true);
  const next=rows[i+1]?.transition??'fade';
  if(l>d-w)transition(next,(l-(d-w))/w,false);
 }]));
})();
