# Example: One-Stop Build + Install + Run + Logs

## Use case
Run the standard workflow to build, install, start, and fetch logs.

## Steps
1) Confirm configuration values.
2) Run the core workflow in order.
3) Return build/install/start status and last logs.

## Sample commands
```
$HVIGORW assembleHap -p product=$PRODUCT -p module=$MODULE --daemon
$HDC shell hilog -r
$HDC install -r "$HAP_PATH"
$HDC shell aa force-stop $BUNDLE
$HDC shell aa start -a $ABILITY -b $BUNDLE
$HDC shell hilog -v time -T $LOG_TAG -z $LOG_LINES
```
