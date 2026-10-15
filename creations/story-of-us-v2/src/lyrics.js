// The source lyric timing is unchanged. A quiet paper band keeps type off the acting area.
window.overlayHook=(ctx,t)=>{
 const row=window.LYRICS.find(r=>t>=r.start&&t<r.end);if(!row)return;
 const a=Math.max(0,Math.min(1,(t-row.start)/.18,(row.end-t)/.18));
 ctx.save();ctx.globalAlpha=a;
 ctx.fillStyle='rgba(243,235,220,0.94)';ctx.fillRect(0,962,1920,118);
 ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#514744';
 ctx.font='500 38px "Songti SC", "STSong", serif';ctx.fillText(row.text,960,1008);
 ctx.restore();
};
