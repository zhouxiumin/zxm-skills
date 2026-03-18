# 安装依赖

在编译项目前，先安装项目依赖。

## macOS

```bash
/Applications/DevEco-Studio.app/Contents/tools/ohpm/bin/ohpm install --all --registry https://ohpm.openharmony.cn/ohpm/ --strict_ssl true
```

## Windows

```powershell
"<DevEco Studio 安装目录>\tools\ohpm\bin\ohpm.exe" install --all --registry https://ohpm.openharmony.cn/ohpm/ --strict_ssl true
```

## 说明

- `--all`: 安装所有依赖包。
- `--registry`: 指定 ohpm 仓库地址。
- `--strict_ssl true`: 开启证书校验。
- 该命令会读取项目的 `oh-package.json5` 并安装声明依赖。

## 常见问题

### 找不到 ohpm 命令

如果系统提示找不到 `ohpm`：

- macOS: `/Applications/DevEco-Studio.app/Contents/tools/ohpm/bin/`
- Windows: `<DevEco Studio 安装目录>\tools\ohpm\bin\`

可以将路径加入 `PATH`，或始终使用完整路径执行。
