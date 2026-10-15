import json,subprocess,hashlib,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
video=root/'out/将故事写成我们-clawd.mp4'
def run(a):return subprocess.run(a,capture_output=True,text=True,check=True).stdout
probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(video)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
frames=sorted((root/'out/frames').glob('f*.jpg'))
assert len(frames)==3401,len(frames)
assert [f.name for f in frames]==[f'f{i:05}.jpg' for i in range(3401)]
assert all(f.stat().st_size>1000 for f in frames)
assert (v['width'],v['height'])==(1080,1440)
assert v['r_frame_rate']=='24/1'
assert abs(float(probe['format']['duration'])-283.4)<.1
assert abs(float(v['duration'])-float(a['duration']))<.1
lyrics=json.loads((root/'reference/lyrics-timed.json').read_text())
assert len(lyrics)==39
assert all(0<=r['start']<r['end']<=283.4 for r in lyrics)
assert all(abs(lyrics[i]['end']-lyrics[i+1]['start'])<1e-6 for i in range(len(lyrics)-1))
checks=[]
for name,p in [('source',root/'assets/song.m4a'),('output',video)]:
 h=run(['ffmpeg','-v','error','-i',str(p),'-map','0:a:0','-c:a','copy','-f','hash','-hash','sha256','-']).strip();checks.append(h)
assert checks[0]==checks[1],checks
char_same=(root/'src/clawd.js').read_bytes()==(root/'../../opus-video-skills-main/skills/painted-animation/template/src/clawd.js').read_bytes()
assert char_same
errors=subprocess.run(['ffmpeg','-v','error','-i',str(video),'-f','null','-'],capture_output=True,text=True)
assert errors.returncode==0 and not errors.stderr,errors.stderr
log=(root/'out/render.log').read_text()
assert '[page error' not in log, 'Render page errors found'
report={'status':'passed','duration_seconds':float(probe['format']['duration']),'resolution':[v['width'],v['height']],'video_codec':v['codec_name'],'container_fps':v['r_frame_rate'],'drawing_fps':12,'rendered_unique_frames':len(frames),'encoded_frames':int(v['nb_frames']),'audio_codec':a['codec_name'],'audio_duration':a['duration'],'audio_stream_identical_to_reference':checks[0]==checks[1],'audio_packet_hash':checks[0],'clawd_source_unchanged':char_same,'subtitle_count':len(lyrics),'frame_sequence_complete':True,'decode_errors':errors.stderr,'size_bytes':video.stat().st_size,'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'render_page_errors':False,'review':'39 shot sheets / 38 seam strips / 5 motion strips / face contact crops; home and sunrise corrections rechecked.','render_last_progress':re.findall(r'frame.*',log)[-1]}
(root/'out/validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False,indent=2))
