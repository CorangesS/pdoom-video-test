# 将故事写成我们 · Version 2

横屏手绘叙事 MV，1920×1080，283.4 秒，57 个镜头，24 fps 动作 / 12 Hz 手绘线条。沿用 V1 的本地歌曲、歌词时间与 Clawd 原生角色；重新编排横屏环境、道具动作、近景和重复副歌。

- 成片：[out/story-of-us-v2.mp4](out/story-of-us-v2.mp4)
- 播放器：[preview.html](preview.html)
- 方案：[STORYBOARD.md](STORYBOARD.md)
- 镜头清单：[out/shot-manifest.json](out/shot-manifest.json)
- 视觉检查：[REVIEW.md](REVIEW.md)
- 媒体验证：[out/validation.json](out/validation.json)

## 制作与重渲染

Mac：Node.js、FFmpeg、Google Chrome。当前工作区依赖软链接到 `../../audio/test-animation/node_modules`。独立搬走工程时使用 `npm install` 安装 package-lock 中的依赖；不要复制失效软链接。

```bash
node render.mjs --sheet=5.8,30.8,69.4,164,191,251 --cols=3 --w=640 --out=out/check/selection.jpg
node scripts/review.mjs
node render.mjs --frames --workers=3 --fps=24
bash scripts/encode.sh
python3 scripts/validate.py
python3 scripts/inspect_encoded.py
```

主逻辑：`src/scenes/c00_open.js`（序章）、`c01_first.js`（初遇相恋）、`c02_life.js`（共同生活）、`c03_years.js`（多年以后）；共同美术与镜头登记在 `world.js`，转场在 `assemble.js`。`props.js` 复用旧版的基础绘制道具，旧竖版背景函数不参与新场景。

帧渲染会跳过已存在的文件；修改后将受影响帧移入备份目录，再按区间重渲染。编码脚本使用 `-n`，避免覆盖既有成片。V1 完整保留在相邻目录。

音轨直接沿用用户提供的本地文件，编码时复制 AAC 流。字幕沿用 V1 的句级切点，未经逐字强制对齐。验证脚本检查音轨流一致性、时长、分辨率、连续帧、解码与本次渲染前保存的源码哈希；不把这些技术检查当作美术质量评分。若有意修改源码，应在下一次完整渲染前另行更新源码快照，不能沿用旧帧和旧验证报告。
