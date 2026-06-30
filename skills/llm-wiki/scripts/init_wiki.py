#!/usr/bin/env python3
"""Initialize a LLM Wiki directory structure with templates."""

import argparse
import os
from datetime import datetime


def init_wiki(target_dir: str):
    raw_dir = os.path.join(target_dir, "raw")
    raw_assets = os.path.join(raw_dir, "assets")
    wiki_dir = os.path.join(target_dir, "wiki")

    os.makedirs(raw_assets, exist_ok=True)
    os.makedirs(wiki_dir, exist_ok=True)

    index_path = os.path.join(wiki_dir, "index.md")
    if not os.path.exists(index_path):
        with open(index_path, "w", encoding="utf-8") as f:
            f.write("# Wiki 索引\n\n")
            f.write("## 资料摘要\n\n")
            f.write("## 实体\n\n")
            f.write("## 概念\n\n")
            f.write("## 工作流\n\n")

    log_path = os.path.join(wiki_dir, "log.md")
    if not os.path.exists(log_path):
        today = datetime.now().strftime("%Y-%m-%d")
        with open(log_path, "w", encoding="utf-8") as f:
            f.write("# 操作日志\n\n")
            f.write(f"## [{today}] init | Wiki 创建\n\n")
            f.write("初始化 Wiki 目录结构。\n")

    schema_path = os.path.join(target_dir, "CLAUDE.md")
    if not os.path.exists(schema_path):
        with open(schema_path, "w", encoding="utf-8") as f:
            f.write("# Wiki Schema\n\n")
            f.write("## 目录结构\n")
            f.write("- raw/ — 原始资料（不可变）\n")
            f.write("- raw/assets/ — 图片等附件\n")
            f.write("- wiki/ — LLM 维护的 Wiki 页面\n")
            f.write("- wiki/index.md — 内容索引\n")
            f.write("- wiki/log.md — 操作日志\n\n")
            f.write("## 页面类型\n")
            f.write("- source-{关键词}.md — 料摘要页\n")
            f.write("- {实体名}.md — 实体页\n")
            f.write("- {概念名}.md — 概念页\n")
            f.write("- {场景}-workflow.md — 工作流页\n\n")
            f.write("## Frontmatter 约定\n")
            f.write("每个页面必须包含 tags 和 type 字段。\n\n")
            f.write("## 交叉引用\n")
            f.write("页面间使用 [[wikilink]] 语法。\n\n")
            f.write("## 操作日志格式\n")
            f.write("log.md 每条：## [YYYY-MM-DD] 操作类型 | 主题\n")

    print(f"Wiki initialized at: {target_dir}")
    print(f"  {raw_dir}/")
    print(f"  {raw_assets}/")
    print(f"  {wiki_dir}/")
    print(f"  {index_path}")
    print(f"  {log_path}")
    print(f"  {schema_path}")


def main():
    parser = argparse.ArgumentParser(description="Initialize LLM Wiki directory")
    parser.add_argument("target_dir", help="Target directory for the wiki")
    args = parser.parse_args()
    init_wiki(args.target_dir)


if __name__ == "__main__":
    main()
