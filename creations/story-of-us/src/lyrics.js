// Sentence subtitles; source is the user's local lyric video, normalized after OCR.
// Line timing is verified against that file, not a different performance.
(() => {
  window.overlayHook=(ctx,t)=>{
    const row=window.LYRICS.find(r=>t>=r.start&&t<r.end);
    if(!row)return;
    const a=Math.min(1,(t-row.start)/.16,(row.end-t)/.16);
    ctx.save();ctx.globalAlpha=Math.max(0,a);ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillStyle='#615248';
    let size=40;ctx.font=`500 ${size}px "Songti SC", "STSong", "PingFang SC", serif`;
    while(ctx.measureText(row.text).width>920&&size>29){size--;ctx.font=`500 ${size}px "Songti SC", "STSong", "PingFang SC", serif`;}
    ctx.fillText(row.text,540,1275);
    // A discreet red thread below the sentence echoes the story's visual motif.
    const p=(t-row.start)/(row.end-row.start);ctx.strokeStyle='#D7C5B2';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(438,1332);ctx.lineTo(642,1332);ctx.stroke();
    ctx.fillStyle='#B85C5F';ctx.beginPath();ctx.arc(438+204*p,1332,3,0,Math.PI*2);ctx.fill();
    ctx.restore();
  };
})();
