import puppeteer from 'puppeteer-core';
import {writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,protocolTimeout:0,args:['--allow-file-access-from-files','--use-angle=metal','--ignore-gpu-blocklist','--disable-renderer-backgrounding']});
try{
 const page=await browser.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(resolve('studio.html')).href+'?render',{waitUntil:'networkidle0'});
 await page.waitForFunction('window.ready===true');
 const shots=await page.evaluate(()=>window.STORY_SHOTS);mkdirSync('out/check',{recursive:true});
 async function sheet(times,path,cols=3,w=300,crop=null){const r=await page.evaluate((ts,c,w,cr)=>window.renderSheet(ts,c,w,cr),times,cols,w,crop);writeFileSync(path,Buffer.from(r.url.split(',')[1],'base64'));return r.ms;}
 const times=[];
 for(let i=0;i<shots.length;i++){
  const s=shots[i],d=s.end-s.start,ts=[s.start+Math.min(.65,d*.1),s.start+d*.5,s.end-.65];
  await sheet(ts,`out/check/shot-${String(i+1).padStart(2,'0')}.jpg`);
  times.push(ts);console.log(`reviewed geometry ${i+1}/${shots.length} ${s.label}`);
 }
 for(let i=0;i<shots.length;i+=6)await sheet(times.slice(i,i+6).flat(),`out/check/board-${1+Math.floor(i/6)}.jpg`,3,260);
 for(let i=1;i<shots.length;i+=5){
  const ts=shots.slice(i,i+5).flatMap(s=>[-.35,-.1,0,.1,.35].map(dt=>s.start+dt));
  await sheet(ts,`out/check/seams-${1+Math.floor((i-1)/5)}.jpg`,5,200);
 }
 const moments=[[30.5,31.5,'tea'],[67.4,68.4,'kiss'],[88,89,'plant'],[185,186,'hands'],[191.4,192.4,'ring']];
 for(const [a,b,name] of moments){const ts=Array.from({length:13},(_,i)=>a+(b-a)*i/12);await sheet(ts,`out/check/motion-${name}.jpg`,5,240);}
 await sheet([32,68.2,185.5,193], 'out/check/face-contact.jpg',2,540,[80,560,920,510]);
 writeFileSync('out/check/render-review.json',JSON.stringify({shots:shots.length,allShotSamples:times.flat().length,seamSamples:(shots.length-1)*5,pageErrors:errors,resolution:[1080,1440],gpu:await page.evaluate(()=>window.gpuInfo())},null,2));
 if(errors.length)throw Error(errors.join('\n'));
}finally{await browser.close();}
