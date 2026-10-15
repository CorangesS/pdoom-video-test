#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
ffmpeg -hide_banner -loglevel warning -stats -n \
  -framerate 12 -i out/frames/f%05d.jpg -i assets/song.m4a \
  -map 0:v:0 -map 1:a:0 -vf fps=24 -t 283.4 \
  -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -c:a copy -movflags +faststart \
  -metadata title="将故事写成我们 · claw'd 手绘故事" \
  -metadata comment="Original narrative animation; audio from user-provided reference" \
  out/将故事写成我们-clawd.mp4
