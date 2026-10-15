# 在 Codex 中制作音乐视频

提供一首 MP3，指定本仓库的 `SKILL.md`，再说明想要的风格、时长和画幅，即可让 Codex 按技能流程制作视频：分析音频 → 编写分镜 → 编写动画 → 渲染检查 → 导出 MP4。

## 1. 准备环境和素材

在 Codex 中打开本仓库目录。电脑需要 Node.js / npm、Google Chrome、FFmpeg；手绘动画的节拍分析还需要 Python 3 和 numpy。可以先让 Codex 检查依赖并协助安装。

将音频放到 `audio/my-song.mp3`，也可以在提示词中提供其他本地文件的绝对路径。

- **只提供 MP3**：可以制作配乐动画；同时描述故事或主题。
- **需要歌词字幕**：最好一起提供对应版本的 LRC；只有歌词文本时，还需要对齐时间。仅有 MP3 不保证能得到准确歌词或逐字时间。

## 2. 选择 Skill，直接发送提示词

| 想做的视频 | 引用的 Skill |
| --- | --- |
| 手绘卡通、角色故事、歌曲 MV | [painted-animation](opus-video-skills-main/skills/painted-animation/SKILL.md) |
| 动态文字、产品宣传、作品集短片 | [kinetic-reel](opus-video-skills-main/skills/kinetic-reel/SKILL.md) |

当前最直接的用法是让 Codex **读取具体的 Skill 文件并按其执行**，无需先安装 Claude Code 插件。仓库中的技能目录不等于已经注册到 Codex 技能列表，因此首次使用请写出文件路径。

复制下面这段，将音频路径和需求换成自己的：

```text
请读取并使用 opus-video-skills-main/skills/painted-animation/SKILL.md。

音频：audio/my-song.mp3
主题：两个角色从相遇到共同生活的温暖故事。
画幅：1920×1080 横屏。
时长：使用整首歌。
字幕：先不加歌词字幕。
输出目录：creations/my-song/，不要覆盖已有作品。

先检查制作环境、分析音频节奏，给我分镜方案；确认后再制作。
按 Skill 检查关键帧、动作和转场，最终输出 MP4 和可编辑工程。
Skill 中的 ~/.claude/skills/ 路径请替换为本仓库
opus-video-skills-main/skills/ 下的对应路径。
```

要做歌词 MV，将字幕要求改为“使用 audio/my-song.lrc 制作歌词字幕并校验同步”。要做产品宣传片，换用 `kinetic-reel/SKILL.md`，并补充产品介绍、文案和素材；使用已有 MP3 时，说明保留该配乐。

## 3. 查看和修改结果

新作品放在 `creations/<作品名>/`：分镜为 `STORYBOARD.md`，动画源码与素材保存在工程中，成片和检查图片输出到 `out/`。后续直接告诉 Codex 要修改哪个镜头、动作或字幕，再渲染对应片段。

已有作品源码见 [creations](creations/)，成片下载见 [Releases](https://github.com/CorangesS/pdoom-video-test/releases)。

代码与模板遵循各目录的 LICENSE；音乐、歌词等素材保留各自权利归属。
