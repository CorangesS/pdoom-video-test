import json,subprocess,hashlib,math
from pathlib import Path
root=Path(__file__).resolve().parents[1]
video=root/'out/story-of-us-v2.mp4'
def run(args):return subprocess.run(args,capture_output=True,text=True,check=True).stdout
probe=json.loads(run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(video)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
frames=sorted((root/'out/frames').glob('f*.jpg'));expected=math.ceil(283.4*24)
assert len(frames)==expected,(len(frames),expected)
assert [f.name for f in frames]==[f'f{i:05}.jpg' for i in range(expected)]
assert all(f.stat().st_size>1000 for f in frames)
assert (v['width'],v['height'])==(1920,1080)
assert v['r_frame_rate']=='24/1'
assert int(v['nb_frames'])==expected,(v['nb_frames'],expected)
assert abs(float(probe['format']['duration'])-283.4)<.1
assert abs(float(v['duration'])-float(a['duration']))<.1
checks=[run(['ffmpeg','-v','error','-i',str(p),'-map','0:a:0','-c:a','copy','-f','hash','-hash','sha256','-']).strip() for p in [root/'assets/song.m4a',video]]
assert checks[0]==checks[1]
assert (root/'src/clawd.js').read_bytes()==(root/'../story-of-us/src/clawd.js').read_bytes()
errors=subprocess.run(['ffmpeg','-v','error','-i',str(video),'-f','null','-'],capture_output=True,text=True)
assert errors.returncode==0 and not errors.stderr,errors.stderr
review=json.loads((root/'out/check/final/render-review.json').read_text());assert not review['pageErrors']
manifest=json.loads((root/'out/shot-manifest.json').read_text());assert manifest[0]['start']==0 and manifest[-1]['end']==283.4
assert all(s['start']<s['end'] for s in manifest)
assert len(manifest)==57
assert all(a['end']==b['start'] for a,b in zip(manifest,manifest[1:]))
source_hashes=json.loads((root/'out/render-source-hashes.json').read_text())
assert source_hashes
assert all(hashlib.sha256((root/path).read_bytes()).hexdigest()==digest for path,digest in source_hashes.items()),'Render sources changed after snapshot'
assert '[page error' not in (root/'out/render.log').read_text()
report={'technical_status':'passed','duration_seconds':float(probe['format']['duration']),'resolution':[1920,1080],'fps':v['r_frame_rate'],'line_boil_hz':12,'rendered_frames':len(frames),'encoded_frames':int(v['nb_frames']),'audio_identical_to_supplied_track':True,'audio_hash':checks[0],'clawd_source_unchanged':True,'decode_errors':errors.stderr,'shot_count':len(manifest),'visual_review_artifacts':review,'size_bytes':video.stat().st_size,'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'artistic_review':'See REVIEW.md for inspected evidence, corrections and limitations; technical pass is not an artistic score.'}
report['render_sources_match_snapshot']=True
report['source_files_verified']=len(source_hashes)
report['continuous_shot_timeline']=True
(root/'out/validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
