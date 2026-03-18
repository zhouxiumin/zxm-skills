# ArkTS 项目构建脚本（Windows PowerShell）
# 执行依赖安装与构建验证。

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Assert-CommandExists {
    param([Parameter(Mandatory = $true)][string]$Name)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "命令不存在: $Name"
    }
}

try {
    Assert-CommandExists -Name 'ohpm'
    Assert-CommandExists -Name 'hvigorw'

    Write-Host '[1/2] 安装依赖...' -ForegroundColor Green
    ohpm install --all --registry https://ohpm.openharmony.cn/ohpm/ --strict_ssl true
    if ($LASTEXITCODE -ne 0) {
        throw "ohpm install 执行失败，退出码: $LASTEXITCODE"
    }

    Write-Host '[2/2] 编译项目...' -ForegroundColor Green
    hvigorw assembleApp
    if ($LASTEXITCODE -ne 0) {
        throw "hvigorw assembleApp 执行失败，退出码: $LASTEXITCODE"
    }

    Write-Host '构建成功。' -ForegroundColor Green
} catch {
    Write-Host "构建失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
