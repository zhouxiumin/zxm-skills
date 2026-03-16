---
name: ohos-one-stop-build
description: One-stop workflow to build a HarmonyOS module, install the HAP, launch the app, clear logs, and fetch fresh logs from hilog. Use this skill whenever asked to compile/build/run/install/start/logs for an OHOS app or module.
license: Internal use only
allowed-tools: [Bash]
---

created by vanicliu @ 2026-01-19 15:38:17

## When to use this skill
Use this skill for:
- One-command build/install/run on HarmonyOS
- Reproducing IDE "Run" behavior via CLI
- Clearing and fetching hilog after install/run
- Standardizing hvigorw + hdc workflows

## How to use this skill

1) **Confirm or set configuration**
   - PROJECT_ROOT
   - HVIGORW
   - HDC
   - MODULE / PRODUCT
   - BUNDLE / ABILITY
   - HAP_PATH
   - LOG_TAG / LOG_LINES

2) **Auto-detect tools if not set** (preferred)
   - Use `command -v` first
   - Fall back to known default paths
   - Report the final resolved paths
   - If multiple candidates exist, pick the first valid executable

3) **Set JAVA_HOME before build** (required if system has no JDK)
```
export JAVA_HOME=/Applications/DevEco-Studio.app/Contents/jbr/Contents/Home
```

4) **Run the core workflow** (in order)
```
$HVIGORW assembleHap -p product=$PRODUCT -p module=$MODULE --daemon
$HDC shell hilog -r
$HDC install -r "$HAP_PATH"
$HDC shell aa force-stop $BUNDLE
$HDC shell aa start -a $ABILITY -b $BUNDLE
$HDC shell hilog -v time -T $LOG_TAG -z $LOG_LINES
```

5) **Report results**
   - Build success or error
   - Install result
   - Start result
   - Latest logs (tail)

6) **UI automation testing (when user requests self-test)**

**Trigger**: User says "自测" / "你测一下" / "验证一下 UI" or similar.

**Test tool**:
```
UITEST=~/Projects/skills/ohos-ui-test.sh
```

**Test flow** (after successful build/install/start):
```bash
# 1. Screenshot + dump layout tree
$UITEST screenshot
$UITEST dump

# 2. Simulate user actions
$UITEST tap <x> <y>              # tap coordinates
$UITEST tap_text "button text"    # find element by text and tap
$UITEST swipe <x1> <y1> <x2> <y2> # swipe
$UITEST input "test text"         # input text

# 3. Verify results
$UITEST full_check               # screenshot + dump + hilog

# 4. Analyze screenshots, layout tree, and hilog

# 5. Cleanup temp files
$UITEST cleanup
```

**Other commands**:
```bash
$UITEST keyevent Back            # simulate key press
$UITEST long_press <x> <y>      # long press
$UITEST verify "expected text"   # verify page contains text
```

**Temp file paths**:
- Local: `/tmp/hm_test/`
- Device: `/data/local/tmp/`

**Note**: Run `$UITEST cleanup` before git commit.

## Configuration (defaults used in this repo)
- PROJECT_ROOT: /Users/vanicliu/Projects/HMProjects/FileComparator
- HVIGORW: /Users/vanicliu/Projects/ohos-build/command-line-tools-6.0.1/bin/hvigorw
- HDC: /Users/vanicliu/Library/OpenHarmony/Sdk/20/toolchains/hdc
- MODULE: entry
- PRODUCT: default
- BUNDLE: com.example.filecomparator
- ABILITY: EntryAbility
- HAP_PATH: entry/build/default/outputs/default/entry-default-unsigned.hap
- LOG_TAG: FileComparatorTag
- LOG_LINES: 500

## Examples
- examples/one-stop-run.md
- examples/auto-detect.md
- examples/naming.md

## Optional variants
- Build only:
```
$HVIGORW assembleHap -p product=$PRODUCT -p module=$MODULE --daemon
```

- Install only:
```
$HDC install -r "$HAP_PATH"
```

- Start only (no reinstall):
```
$HDC shell aa force-stop $BUNDLE
$HDC shell aa start -a $ABILITY -b $BUNDLE
```

- Fetch logs without tag filter:
```
$HDC shell hilog -v time -z $LOG_LINES
```

## Troubleshooting
- hvigorw not found: verify HVIGORW path or add to PATH
- hdc not found: verify HDC path or add to PATH
- No device: check `hdc list targets`
- HAP missing: verify HAP_PATH after build
- Signing warning: expected for unsigned debug HAP; configure signing if needed
- Java/JDK not found: `export JAVA_HOME=/Applications/DevEco-Studio.app/Contents/jbr/Contents/Home` (DevEco Studio bundled JBR)
- PackageHap fails with Java error: same fix — set JAVA_HOME before hvigorw

## Keywords
ohos, harmonyos, hvigorw, hdc, assembleHap, install, run, start, hilog, logs, uitest
