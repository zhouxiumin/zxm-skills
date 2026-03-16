# Example: Auto-detect hvigorw/hdc

## Strategy
1) Prefer explicit overrides (env or config values).
2) Try `command -v` for hvigorw/hdc.
3) Check known default paths.
4) If multiple candidates exist, pick the first valid executable and report the final choice.

## Sample detection snippet
```
# hvigorw
HVIGORW=${HVIGORW:-""}
if [ -z "$HVIGORW" ]; then
  HVIGORW=$(command -v hvigorw 2>/dev/null || true)
fi
if [ -z "$HVIGORW" ]; then
  for c in \
    /Users/vanicliu/Projects/ohos-build/command-line-tools-6.0.1/bin/hvigorw \
    /Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw
  do
    [ -x "$c" ] && HVIGORW="$c" && break
  done
fi

# hdc
HDC=${HDC:-""}
if [ -z "$HDC" ]; then
  HDC=$(command -v hdc 2>/dev/null || true)
fi
if [ -z "$HDC" ]; then
  for c in \
    /Users/vanicliu/Library/OpenHarmony/Sdk/20/toolchains/hdc \
    /Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc
  do
    [ -x "$c" ] && HDC="$c" && break
  done
fi
```
