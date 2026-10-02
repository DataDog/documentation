[iOS Crash Reporting and Error Tracking][1] displays any issues in your application and the latest available errors. You can view error details and attributes, including JSON, in the [RUM Explorer][3].

## Automatically report errors

To report fatal crashes, add the Crash Reporting module and enable it after initializing the SDK:

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(...)

CrashReporting.enable()
```

To also report **App Hangs** (the app becomes unresponsive for too long), enable Crash Reporting and set an `appHangThreshold`, in seconds:

```swift
RUM.enable(
    with: RUM.Configuration(
        applicationID: "<application id>",
        appHangThreshold: 0.25
    )
)
```

To also report **Watchdog Terminations** (the OS kills the app for being unresponsive or using excessive resources), enable Crash Reporting and set `trackWatchdogTerminations`:

```swift
RUM.enable(
    with: RUM.Configuration(
        applicationID: "<application id>",
        trackWatchdogTerminations: true
    )
)
```

### Report errors from logs and traces

All "error" and "critical" logs sent with `Logger` are automatically reported as RUM errors and linked to the current RUM view:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogLogs;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```

{% /tab %}
{% /tabs %}

Similarly, all finished spans marked as error are reported as RUM errors:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogTrace

let span = Tracer.shared().startSpan(operationName: "operation")
// ... capture the `error`
span.setError(error)
span.finish()
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```

{% /tab %}
{% /tabs %}

## Manually report errors

To track specific errors, notify `RUMMonitor.shared()` when an error occurs using one of following methods:

- `.addError(message:)`
- `.addError(error:)`

{% tabs %}
{% tab label="Swift" %}

```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```

{% /tab %}
{% /tabs %}

For more details and available options, see [`RUMMonitorProtocol` in GitHub][2].

For the attributes collected, see [Data Collected](/real_user_monitoring/setup/data_collected/?platform=ios#error-attributes).

## Upload debug symbols to get deobfuscated stack traces

Crash reports are collected in a raw format and mostly contain memory addresses. To map these addresses into legible symbol information (a process called symbolication), upload the `.dSYM` files generated in your application's build or distribution process. Datadog matches stack traces with symbol files using their `uuid` field.

Xcode exports `.dSYM` files to `$DWARF_DSYM_FOLDER_PATH` at the end of your application's build. Make sure that the `DEBUG_INFORMATION_FORMAT` build setting is set to {% ui %}DWARF with dSYM File{% /ui %}. If Bitcode is enabled, download the `.dSYM` files from [App Store Connect][4] after it finishes processing your build.

Upload your `.dSYM` files with one of the following tools. Re-uploading a `.dSYM` file with the same application version does not override the existing one.

{% tabs %}
{% tab label="Datadog CI" %}

Use the [`@datadog/datadog-ci`][5] command line tool:

```sh
export DATADOG_API_KEY="<API KEY>"

# if you have a zip file containing dSYM files
npx @datadog/datadog-ci dsyms upload appDsyms.zip

# if you have a folder containing dSYM files
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

To upload to a Datadog site other than US1, set the `DATADOG_SITE` environment variable (for example, `datadoghq.eu`).

{% /tab %}
{% tab label="Fastlane" %}

1. Add [`fastlane-plugin-datadog`][6] to your project:

   ```sh
   fastlane add_plugin datadog
   ```

2. Configure Fastlane to upload your symbols:

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

{% /tab %}
{% tab label="GitHub Actions" %}

Use the [Datadog Upload dSYMs GitHub Action][7] in your GitHub Action jobs:

```yaml
- name: Upload dSYMs to Datadog
  uses: DataDog/upload-dsyms-github-action@v1
  with:
    api_key: ${{ secrets.DATADOG_API_KEY }}
    site: datadoghq.com
    dsym_paths: |
      path/to/dsyms/folder
      path/to/zip/dsyms.zip
```

{% /tab %}
{% /tabs %}

`.dSYM` files are limited to 2 GB each, and symbols are not available for crashes on simulators. For these limitations and other options, see [iOS Crash Reporting and Error Tracking][1].

[1]: /error_tracking/frontend/mobile/ios/
[2]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[3]: /real_user_monitoring/investigate_problems/explore_retained_data/
[4]: https://appstoreconnect.apple.com/
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://github.com/DataDog/datadog-fastlane-plugin
[7]: https://github.com/marketplace/actions/datadog-upload-dsyms
