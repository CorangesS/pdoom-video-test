"""Extract evidence from the encoded MP4, independent of the browser renderer."""
import json
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
video = root / 'out/story-of-us-v2.mp4'
times = [5.8, 30.8, 49.9, 69.4, 97.4, 126.8, 163.7, 168.05, 194.7, 237.3, 253.9, 280.1]
indices = [round(t * 24) for t in times]
select = '+'.join(f'eq(n,{n})' for n in indices)
subprocess.run([
    'ffmpeg', '-hide_banner', '-loglevel', 'error', '-n', '-i', str(video),
    '-vf', f"select='{select}',scale=480:270,tile=4x3", '-frames:v', '1',
    '-q:v', '2', '-update', '1', str(root / 'out/check/encoded-overview.jpg')
], check=True)
subprocess.run([
    'ffmpeg', '-hide_banner', '-loglevel', 'error', '-n', '-ss', '69.4', '-i', str(video),
    '-frames:v', '1', '-q:v', '2', '-update', '1', str(root / 'out/poster.jpg')
], check=True)
(root / 'out/check/encoded-samples.json').write_text(json.dumps({
    'source': 'out/story-of-us-v2.mp4',
    'order': 'left to right, top to bottom',
    'frame_indices': indices,
    'seconds': [n / 24 for n in indices],
    'overview': 'out/check/encoded-overview.jpg',
    'poster': 'out/poster.jpg'
}, indent=2))
print('Encoded-media overview and poster extracted.')
