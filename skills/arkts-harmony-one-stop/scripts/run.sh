#!/usr/bin/env bash
# ArkTS 项目构建脚本（macOS/Linux）
# 执行依赖安装与构建验证。

set -euo pipefail

print_green() {
  printf "\033[32m%s\033[0m\n" "$1"
}

print_red() {
  printf "\033[31m%s\033[0m\n" "$1"
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    print_red "命令不存在: $1"
    exit 1
  fi
}

require_cmd ohpm
require_cmd hvigorw

print_green "[1/2] 安装依赖..."
ohpm install --all --registry https://ohpm.openharmony.cn/ohpm/ --strict_ssl true

print_green "[2/2] 编译项目..."
hvigorw assembleApp

print_green "构建成功。"
