# 将故事写成我们 · claw'd

4 分 43 秒的手绘叙事音乐动画。陶土橙 claw'd 和戴花的玫瑰色同伴，从街口相遇到一起走进亮灯的小屋；回忆册与红线串起 39 个镜头。

## 查看

- `out/将故事写成我们-clawd.mp4`：1080 × 1440，H.264 + 原 AAC 音轨，24 fps 容器，12 张手绘画面/秒。
- `preview.html`：本地播放器和章节跳转。
- `out/story-of-us.srt`：可编辑的 39 句字幕。
- `STORYBOARD.md`：故事与角色约束。

## 编辑和重新导出

需要 Node.js、Google Chrome、FFmpeg。当前工作区复用 `../../audio/test-animation/node_modules`；在当前目录无需安装依赖。独立复制时不要复制此链接，随后运行 `npm install`。

```bash
npm install
node render.mjs --sheet=6,32,69,92,194,218,274,281 --cols=4 --w=300 --out=out/check/selection.jpg
node render.mjs --frames --workers=3 --fps=12
bash scripts/encode.sh
```

`src/scenes/story.js` 是全部镜头与时间线，`src/scenes/shared.js` 是场景和道具，`src/lyrics-data.js` 是字幕，`src/lyrics.js` 是字幕排版，`src/config.js` 是音乐节奏配置。`src/clawd.js` 与技能模板相同，主角造型没有重画成人形。

帧渲染支持断点续传。修改镜头后，先把对应范围的旧帧移动到备份目录，再用 `--range=起点:终点` 重渲染；否则既有帧会被跳过。动画的可编辑逻辑独立于 MP4。

## 来源与校准

参考：`../../audio/将故事写成我们.mp4`，720 × 960，283.4 秒。参考画面是滚动歌词，因此新画面为原创叙事；音频直接提取自该文件，没有从网上下载歌曲。

歌词信息检索：[酷狗](https://www.kugou.com/song-36/zmbg998.html)、[JOOX](https://www.joox.com/mo/single/5cDLE29ztjdNMm30h6aO2g%3D%3D)。作词方文山，作曲/演唱林俊杰。字幕文本来自用户提供视频的本地 OCR，修正明显识别错误；时间用公开 LRC 减去 33 秒，并与视频高亮行交叉核对。稳定 OCR 行首次出现与采用切点的差值不超过 0.4 秒；不是逐字强制对齐。

`reference/provenance.json` 记录制作来源，`reference/ocr-verified.json` 保留识别证据，`reference/lyrics-timed.json` 保留切点。`out/check/` 包含逐镜、转场、动作条带和表情接触检查；最终媒体校验记录于 `out/validation.json`。

使用本仓库提供的 `painted-animation` 技能，底层模板为 MIT 的 p5.js / p5.brush Clawd 动画工程。
