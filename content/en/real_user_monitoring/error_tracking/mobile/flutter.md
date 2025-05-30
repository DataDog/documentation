---
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/error_tracking.md
description: Learn how to track Flutter errors with Error Tracking.
aliases:
- /real_user_monitoring/error_tracking/flutter
type: multi-code-lang
code_lang: flutter
code_lang_weight: 40
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: "Source Code"
  text: dd-sdk-flutter Source code
- link: real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking
title: Flutter Crash Reporting and Error Tracking
---
## Overview

Enable Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring.

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the Datadog Flutter SDK for yet, follow the [in-app setup instructions][2] or see the [Flutter setup documentation][3].

### Add Dart error tracking

If you are using `DatadogSdk.runApp`, then the Datadog Flutter SDK automatically tracks and reports uncaught Dart exceptions.

If you are **not** using `DatadogSdk.runApp`, you need to setup Dart error tracking manually with the following code before you initialize Datadog:

```dart
final originalOnError = FlutterError.onError;
FlutterError.onError = (details) {
  DatadogSdk.instance.rum?.handleFlutterError(details);
  originalOnError?.call(details);
};
final platformOriginalOnError = PlatformDispatcher.instance.onError;
PlatformDispatcher.instance.onError = (e, st) {
  DatadogSdk.instance.rum?.addErrorInfo(
    e.toString(),
    RumErrorSource.source,
    stackTrace: st,
  );
  return platformOriginalOnError?.call(e, st) ?? false;
};
```

### Add native crash reporting

Update your initialization snippet to enable native crash reporting for iOS and Android by setting `nativeCrashReportEnabled` to `true`.

For example:

```dart
final configuration = DatadogConfiguration(
  clientToken: '<DD_CLIENT_TOKEN>'
  env: '<DD_ENV>'
  site: DatadogSite.us1,
  nativeCrashReportEnabled: true, // Set this flag
  loggingConfiguration: DatadogLoggingConfiguration(),
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<DD_APP_ID>',
  ),
);
```

If your application suffers a fatal crash, the Datadog Flutter SDK uploads a crash report to Datadog *after* your application restarts. For non-fatal errors, the Datadog Flutter SDK uploads these errors with other RUM data.

## Get deobfuscated stack traces

Mapping files are used to deobfuscate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding mapping files. This ensures that regardless of when the mapping file was uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

For Flutter applications, the matching of stack traces and source maps relies on their `service`, `version`, `variant`, and `architecture` fields.

### Upload symbol files to Datadog

Native iOS crash reports are collected in a raw format and mostly contain memory addresses. To map these addresses into legible symbol information, Datadog requires that you upload .dSYM files, which are generated in your application's build process.

Crash reports and errors sent from Flutter iOS and Android applications that are built with the `--split-debug-info` option set and/or with the `--obfuscate` option set will also be in a raw or obfuscated format. For these applications, you need to upload their Android Proguard mapping file and Dart symbol files generated by the Flutter build process.

Errors sent from Flutter Web applications will send unmapped JavaScript file and line numbers, which need to be mapped to Dart file and line numbers. For these applications, you need to upload the Flutter generated JavaScript source map generated by the Flutter build process.

The [@datadog/datadog-ci][4] command line tool supports uploading all of the necessary files (dSYMs, Android Proguard Mapping, and Dart Symbol Files) in one command.

First, install the `datadog-ci` tool from the instructions above and create a `datadog-ci.json` file at the root of your project, containing your API key and (optionally) your Datadog site:
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // Optional if you are using datadoghq.com
}
```

Because this file contains your API key, it should not be checked in to version control.

Alternately, you can set the `DATADOG_API_KEY` and `DATADOG_SITE` environment variables.

Then, you can use the following command to upload all the necessary files for symbolication and deobfuscation of your crash reports:
```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms
```

**Note**: Re-uploading a source map does not override the existing one if the version has not changed.

For a full list of options, see the `datadog-ci` [Flutter Symbols documentation][5].

### List uploaded symbol files

See the [RUM Debug Symbols][10] page to view all uploaded symbols.

## Limitations

Mapping files are limited in size to **500 MB** each, while dSYM files can go up to **2 GB** each.

## Test your implementation

To verify your Flutter Crash Reporting and Error Tracking configuration, issue an error in your application and confirm that the error appears in Datadog.

1. Run your application on a simulator, emulator, or a real device. If you are running on iOS, ensure that the debugger is not attached. Otherwise, Xcode captures the crash before the Datadog SDK does.
2. Execute code containing an error or crash. For example:

   ```dart
   void throwError() {
    throw Exception("My Exception")
   }
   ```

3. For obfuscated error reports that do not result in a crash, you can verify symbolication and deobfuscation in [**Error Tracking**][8].
4. For crashes, after the crash happens, restart your application and wait for the Flutter SDK to upload the crash report in [**Error Tracking**][8].

### Flavors and build numbers

Datadog uses the combination of the `service-name`, `version`, and `flavor` to locate the correct symbols for deobfuscation. For your crash reports to have complete information, the parameters sent to the `datadog-ci` command and the parameters set in [DatadogConfiguration][6] must match exactly.

If you are using app [flavors][7] in Flutter, you need to set the name of the flavor in [DatadogConfiguration.flavor][8] since we cannot detect the flavor automatically. You can then pass this to the `--flavor` parameter of the `datadog-ci` command:

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --flavor my_flavor
```

The Datadog SDK automatically detects the version number of your application specified in your `pubspec.yaml` up to but not including the build number. If you are using build numbers as part of the version in your application and need to upload symbols for each build, you need to add the version to [DatadogConfiguration.version][9]. You can then pass this to the `--version` parameter of the `datadog-ci` command:

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --version 1.2.3+22
```

**Note**: Datadog uses tags for versions which do not allow `+`. All tooling automatically replaces `+` with `-` so that the version tags are searchable in Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/flutter-symbols
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[7]: https://docs.flutter.dev/deployment/flavors
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/flavor.html
[9]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/version.html
[10]: https://app.datadoghq.com/source-code/setup/rum