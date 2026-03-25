#!/usr/bin/env python3
"""
Gemini Image Generation - Pure Python stdlib, no dependencies.

Usage:
    python3 generate.py "prompt" output.png
    python3 generate.py "edit instructions" output.png --input original.png

Requires ZXM_GEMINI_API_KEY environment variable.
"""

import os
import sys
import json
import base64
import urllib.request
import urllib.error
from pathlib import Path


def get_api_key():
    """从环境变量中获取 API Key。"""
    key = os.environ.get("ZXM_GEMINI_API_KEY")
    if not key:
        print("Error: ZXM_GEMINI_API_KEY environment variable not set", file=sys.stderr)
        sys.exit(1)
    return key


def get_api_base_url():
    """从环境变量中获取 Gemini API 基础地址。"""
    return os.environ.get("ZXM_GEMINI_API_BASE_URL", "https://generativelanguage.googleapis.com")


def load_image_as_base64(path):
    """读取图片文件并返回 Base64 编码字符串。"""
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()


def detect_mime_type(path):
    """根据文件扩展名推断 MIME 类型。"""
    ext = Path(path).suffix.lower()
    mime_types = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
    }
    return mime_types.get(ext, "image/png")


def generate_image(prompt, output_path, input_image_path=None):
    """使用 Gemini API 生成或编辑图片。"""
    api_key = get_api_key()
    api_base_url = get_api_base_url().rstrip("/")

    url = f"{api_base_url}/v1beta/models/nano-banana-pro-preview:generateContent?key={api_key}"

    # 构造请求内容片段
    parts = [{"text": prompt}]

    # 如果传入原图，则将其附加到请求中用于编辑
    if input_image_path:
        if not os.path.exists(input_image_path):
            print(f"Error: Input image not found: {input_image_path}", file=sys.stderr)
            sys.exit(1)
        
        img_data = load_image_as_base64(input_image_path)
        mime_type = detect_mime_type(input_image_path)
        parts.append({
            "inlineData": {
                "mimeType": mime_type,
                "data": img_data
            }
        })
    
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"]
        }
    }
    
    headers = {"Content-Type": "application/json"}
    data = json.dumps(payload).encode()
    
    req = urllib.request.Request(url, data=data, headers=headers)
    
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            result = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        print(f"HTTP Error {e.code}: {error_body}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"URL Error: {e.reason}", file=sys.stderr)
        sys.exit(1)

    # 从响应中提取图片数据
    try:
        candidates = result.get("candidates", [])
        if not candidates:
            print("Error: No candidates in response", file=sys.stderr)
            print(json.dumps(result, indent=2), file=sys.stderr)
            sys.exit(1)
        
        content = candidates[0].get("content", {})
        parts = content.get("parts", [])
        
        for part in parts:
            if "inlineData" in part:
                img_data = base64.b64decode(part["inlineData"]["data"])

                # 确保输出目录存在
                output_dir = Path(output_path).parent
                if output_dir and not output_dir.exists():
                    output_dir.mkdir(parents=True, exist_ok=True)
                
                with open(output_path, "wb") as f:
                    f.write(img_data)
                
                print(f"Saved: {output_path}")
                return output_path
        
        print("Error: No image data in response", file=sys.stderr)
        print(json.dumps(result, indent=2), file=sys.stderr)
        sys.exit(1)
        
    except (KeyError, IndexError) as e:
        print(f"Error parsing response: {e}", file=sys.stderr)
        print(json.dumps(result, indent=2), file=sys.stderr)
        sys.exit(1)


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="使用 Gemini API 生成或编辑图片（纯标准库，无额外依赖）"
    )
    parser.add_argument("prompt", help="图片提示词或编辑指令")
    parser.add_argument("output", help="输出文件路径（例如 output.png）")
    parser.add_argument("--input", "-i", help="用于编辑的输入图片（可选）")

    args = parser.parse_args()

    generate_image(args.prompt, args.output, args.input)


if __name__ == "__main__":
    main()
