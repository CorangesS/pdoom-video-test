import puppeteer from 'puppeteer-core';
import {writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,protocolTimeout:0,args:['--allow-file-access-from-files','--use-angle=metal','--ignore-gpu-blocklist','--disable-renderer-backgrounding']});
const errors=[];const costs=[];
try{
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(resolve('studio.html')).href+'?render',{waitUntil:'networkidle0'});
 await page.waitForFunction('window.ready===true');
 const shots=await page.evaluate(()=>window.STORY_SHOTS);
 if(shots.length<55)throw Error('Incomplete chapter assembly: '+shots.length);
 const dir='out/check/final';mkdirSync(dir,{recursive:true});
 async function sheet(times,file,cols=3,w=480,crop=null){
  const r=await page.evaluate((ts,c,w,cr)=>window.renderSheet(ts,c,w,cr),times,cols,w,crop);
  writeFileSync(`${dir}/${file}.jpg`,Buffer.from(r.url.split(',')[1],'base64'));costs.push(...r.ms);
 }
 const samples=shots.map(s=>{const d=s.end-s.start;return[s.start+Math.min(.5,d*.16),s.start+d*.51,s.end-.42];});
 for(let i=0;i<shots.length;i++){
  await sheet(samples[i],`shot-${String(i+1).padStart(2,'0')}`);
  console.log(`shot ${i+1}/${shots.length} ${shots[i].label}`);
 }
 for(let i=0;i<shots.length;i+=5)await sheet(samples.slice(i,i+5).flat(),`board-${1+Math.floor(i/5)}`,3,380);
 for(let i=1;i<shots.length;i+=5){
  const ts=shots.slice(i,i+5).flatMap(s=>[-.31,-.12,0,.12,.31].map(dt=>s.start+dt));
  await sheet(ts,`seams-${1+Math.floor((i-1)/5)}`,5,240);
 }
 const keyMoments=[[8,10.8,'letter'],[29.4,31.9,'tea'],[48.3,50.6,'pen'],[67.5,70.5,'kiss'],[95.8,98.7,'door'],[121,124,'umbrella'],[164,167.8,'boarding'],[185,188.5,'hands'],[190,193,'proposal'],[256,259,'old-hands']];
 for(const [a,b,label] of keyMoments){const ts=Array.from({length:Math.round((b-a)*12)+1},(_,i)=>a+i/12);await sheet(ts,`motion-${label}`,6,260);}
 for(const [a,b,label] of [[33,35,'tea-face'],[62,64.5,'book-face'],[193.5,196,'proposal-face'],[244,247,'older-face']]){
  await sheet([a,(a+b)/2,b],`face-${label}`,3,640,[480,240,1100,690]);
 }
 const lenses=Object.fromEntries(['wide','medium','close','insert'].map(k=>[k,shots.filter(s=>s.lens===k).length]));
 writeFileSync('out/shot-manifest.json',JSON.stringify(shots,null,2));
 writeFileSync(`${dir}/render-review.json`,JSON.stringify({shotCount:shots.length,shotSamples:samples.flat().length,seams:shots.length-1,continuousMotionStrips:keyMoments.length,faceSheets:4,lenses,pageErrors:errors,meanMsPerReviewFrame:Math.round(costs.reduce((a,b)=>a+b,0)/costs.length),gpu:await page.evaluate(()=>window.gpuInfo()),note:'These files support visual review; generation alone does not certify artistic quality.'},null,2));
 if(errors.length)throw Error(errors.join('\n'));
 console.log('Review artifacts ready.');
}finally{await browser.close();}
