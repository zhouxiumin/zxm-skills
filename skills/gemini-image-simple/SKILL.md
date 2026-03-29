---
name: gemini-image-simple
version: 1.1.0
description: 使用纯 Python 标准库通过 Gemini API 生成和编辑图片。零依赖，适用于无法使用 pip/uv 的受限环境。
metadata:
  openclaw:
    emoji: "🎨"
    requires:
      env: ["ZXM_GEMINI_API_KEY", "ZXM_GEMINI_API_BASE_URL"]
---

# Gemini Image Simple

使用纯 Python 标准库通过 Gemini API 生成和编辑图片。默认使用 `gemini-3.1-flash-image-preview-2k`，也支持通过 `--model` 参数切换到其他模型（如 `gemini-3-pro-image-preview`）。

## 为什么用这个 Skill

| 特性 | 这个 Skill | 其他方案（nano-banana-pro 等） |
|---------|------------|-------------------------------|
| **依赖** | 无（仅 stdlib） | google-genai、pillow 等 |
| **需要 pip/uv** | ❌ 不需要 | ✅ 需要 |
| **能在 Fly.io free 跑** | ✅ 可以 | ❌ 会失败 |
| **能在容器里跑** | ✅ 可以 | ❌ 经常失败 |
| **图片生成** | ✅ 完整支持 | ✅ 完整支持 |
| **图片编辑** | ✅ 支持 | ✅ 支持 |
| **配置复杂度** | 只要设置 API key | 先安装依赖包 |

**一句话总结：** 只要有 Python 3，这个 skill 基本就能跑。不需要包管理器、不需要虚拟环境，也少碰权限问题。

## 快速开始

```bash
# 生成
python3 /data/clawd/skills/gemini-image-simple/scripts/generate.py "A cat wearing a tiny hat" cat.png

# 编辑现有图片
python3 /data/clawd/skills/gemini-image-simple/scripts/generate.py "Make it sunset lighting" edited.png --input original.png
```

## 用法

### 生成新图片

```bash
python3 {baseDir}/scripts/generate.py "your prompt" output.png
```

### 编辑现有图片

```bash
python3 {baseDir}/scripts/generate.py "edit instructions" output.png --input source.png
```

### 指定模型

```bash
python3 {baseDir}/scripts/generate.py "your prompt" output.png --model gemini-3-pro-image-preview
```

支持的输入格式：PNG、JPG、JPEG、GIF、WEBP

## 环境变量

设置以下环境变量：

- `ZXM_GEMINI_API_KEY`：Gemini API Key，可在 https://aistudio.google.com/apikey 获取。
- `ZXM_GEMINI_API_BASE_URL`：Gemini API 基础地址，默认值为 `https://generativelanguage.googleapis.com`。

## 工作原理

使用 **Gemini 3 Pro Image**（`gemini-3-pro-image-preview`），也就是 Google 当前画质最高的图像生成模型：
- 用纯 `urllib.request` 发 HTTP 请求（不依赖 requests）
- 用纯 `json` 做解析（stdlib）
- 用纯 `base64` 做编码（stdlib）

就这些。没有外部依赖，任何 Python 3.10+ 环境都能跑。

## 模型

当前默认：`gemini-3.1-flash-image-preview-2k`

其他可用模型（如有需要，可在 `generate.py` 中修改）：
- `gemini-3-pro-preview` - Gemini 3 Pro（通用）
- `gemini-3.1-flash-image-preview-0.5k` - Flash Image，0.5k 输出
- `gemini-3.1-flash-image-preview-2k` - Flash Image，2k 输出
- `gemini-3.1-flash-image-preview-4k` - Flash Image，4k 输出

## 示例

```bash
# 风景
python3 {baseDir}/scripts/generate.py "Misty mountains at sunrise, photorealistic" mountains.png

# 产品图
python3 {baseDir}/scripts/generate.py "Minimalist product photo of a coffee cup, white background" coffee.png

# 编辑：切换风格
python3 {baseDir}/scripts/generate.py "Convert to watercolor painting style" watercolor.png --input photo.jpg

# 编辑：添加元素
python3 {baseDir}/scripts/generate.py "Add a rainbow in the sky" rainbow.png --input landscape.png
```
