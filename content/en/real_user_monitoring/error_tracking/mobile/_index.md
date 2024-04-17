---
title: Mobile Crash Reporting
kind: documentation
description: Set up crash reporting for your mobile applications.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualize Error Tracking data in the RUM Explorer
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: Source code for dd-sdk-reactnative
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: Source code for dd-sdk-ios
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Source code for dd-sdk-flutter 
- link: https://www.datadoghq.com/blog/debug-android-crashes/
  tag: Blog
  text: Debug Android crashes faster with Datadog
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: Blog
  text: Debug iOS crashes efficiently with Datadog
- link: https://www.datadoghq.com/blog/rum-now-offers-react-native-crash-reporting-and-error-tracking/
  tag: Blog
  text: RUM now offers React Native Crash Reporting and Error Tracking

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM for Roku is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

## Overview

Error Tracking processes errors collected from the RUM SDK.

{{< tabs >}}

{{% tab "Android" %}}

Error Tracking processes errors collected from the RUM Android SDK. 

Enable Android Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

- Aggregated Android crash dashboards and attributes
- Deobfuscated Android crash reports
- Trend analysis with Android error tracking

Your crash reports appear in [**Error Tracking**][1].

[1]: https://app.datadoghq.com/rum/error-tracking

{{% /tab %}}

{{% tab "iOS" %}}

Enable iOS Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

 - Aggregated iOS crash dashboards and attributes
 - Symbolicated iOS crash reports
 - Trend analysis with iOS error tracking

In order to symbolicate your stack traces, find and upload your `.dSYM` files to Datadog. Then, verify your configuration by running a test crash and restarting your application. 

Your crash reports appear in [**Error Tracking**][1].

[1]: https://app.datadoghq.com/rum/error-tracking

{{% /tab %}}

{{% tab "Expo" %}}
Enable Expo Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring.

With this feature, you can access the following features:

-   Aggregated Expo crash dashboards and attributes
-   Symbolicated iOS and deobfuscated Android crash reports
-   Trend analysis with Expo error tracking

In order to symbolicate your stack traces and deobfuscate Android crashes, upload your .dSYM, Proguard mapping files and source maps to Datadog using the `expo-datadog` config plugin.

Your crash reports appear in [**Error Tracking**][1].

[1]: https://app.datadoghq.com/rum/error-tracking

{{% /tab %}}

{{% tab "React Native" %}}
Enable React Native Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

-   Aggregated React Native crash dashboards and attributes
-   Symbolicated React Native (JavaScript and native iOS or Android) crash reports
-   Trend analysis with React Native Error Tracking

In order to symbolicate your stack traces, manually upload your mapping files into Datadog.

Your crash reports appear in [**Error Tracking**][1].

[1]: https://app.datadoghq.com/rum/error-tracking

{{% /tab %}}

{{% tab "Flutter" %}}

Enable Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring.

Your crash reports appear in [**Error Tracking**][1].

[1]: https://app.datadoghq.com/rum/error-tracking

{{% /tab %}}

{{% tab "Roku" %}}

Error Tracking processes errors collected from the RUM Roku SDK. 

Enable Roku Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

- Aggregated Roku crash dashboards and attributes
- Trend analysis with Roku error tracking

Your crash reports appear in [**Error Tracking**][1].

[1]: https://app.datadoghq.com/rum/error-tracking

{{% /tab %}}

{{< /tabs >}}

## Setup

{{< tabs >}}

{{% tab "Android" %}}

If you have not set up the Android SDK yet, follow the [in-app setup instructions][1] or see the [Android RUM setup documentation][2].

1. Add the latest version of the [RUM Android SDK][3] to your Gradle dependencies.
2. Configure your application's `env` and `variant` when [initializing the SDK][4].
3. Run the Gradle task to upload your Proguard/R8 mapping file to Datadog in order to access deobfuscated stack traces. 

For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/mobile_and_tv_monitoring/setup/android#setup
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[4]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tabs=kotlin#initialization-parameters

{{% /tab %}}

{{% tab "iOS" %}}

If you have not set up the iOS SDK yet, follow the [in-app setup instructions][1] or see the [iOS RUM setup documentation][2].

### Add Crash Reporting 

To enable Crash Reporting, make sure to also enable [RUM][2] and, or [Logs][3]. Then, add the package according to your dependency manager and update your initialize snippet.  

{{< collapse-content title="CocoaPods" level="h4" >}}

You can use [CocoaPods][1] to install `dd-sdk-ios`:
```
pod 'DatadogCrashReporting'
```

[1]: https://cocoapods.org/

{{< /collapse-content >}} 

{{< collapse-content title="Swift Package Manager (SPM)" level="h4" >}}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

In your project, link the following libraries:
```
DatadogCrashReporting
```

{{< /collapse-content >}}

{{< collapse-content title="Carthage" level="h4" >}}

You can use [Carthage][5] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

In Xcode, link the following frameworks:
```
DatadogCrashReporting.xcframework
CrashReporter.xcframework
```

[5]: https://github.com/Carthage/Carthage

{{< /collapse-content >}}

Update your initialization snippet to include Crash Reporting:

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    service: "<service name>"
  ), 
  trackingConsent: trackingConsent
)

CrashReporting.enable()
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/real_user_monitoring/ios
[3]: https://docs.datadoghq.com/logs/log_collection/ios
[4]: https://github.com/marketplace/actions/datadog-upload-dsyms
[5]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}

{{% tab "Expo" %}}
Use the [`expo-datadog` package and configuration plugin][1]. For more information, see the [Expo and Expo Go documentation][2].

Add `@datadog/datadog-ci` as a development dependency. This package contains scripts to upload the source maps. You can install it with NPM:

```sh
npm install @datadog/datadog-ci --save-dev
```

or with Yarn:

```sh
yarn add -D @datadog/datadog-ci
```

Run `eas secret:create` to set `DATADOG_API_KEY` to your Datadog API key.

### Add git repository data to your mapping files on Expo Application Services (EAS)

If you are using EAS to build your Expo application, set `cli.requireCommit` to `true` in your `eas.json` file to add git repository data to your mapping files.

```json
{
    "cli": {
        "requireCommit": true
    }
}
```

### Setting the Datadog site

Run `eas secret:create` to set `DATADOG_SITE` to the host of your Datadog site, for example: `datadoghq.eu`. By default, `datadoghq.com` is used.

### Plugin configuration options

| Parameter                     | Default | Description                                                                                                                        |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `iosDsyms`                    | `true`  | Enables the uploading of dSYMS files for the symbolication of native iOS crashes.                                                  |
| `iosSourcemaps`               | `true`  | Enables the uploading of JavaScript source maps on iOS builds.                                                                     |
| `androidSourcemaps`           | `true`  | Enables the uploading of JavaScript source maps on Android builds.                                                                 |
| `androidProguardMappingFiles` | `true`  | Enables the uploading of Proguard mapping files to deobfuscate native Android crashes (is only applied if obfuscation is enabled). |
| `datadogGradlePluginVersion`  | `"1.+"` | Version of `dd-sdk-android-gradle-plugin` used for uploading Proguard mapping files.     |

### Limitations

{{< site-region region="us,us3,us5,eu,gov" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
{{< /site-region >}}

### Disable file uploads

You can disable some files from uploading by setting the `iosDsyms`, `iosSourcemaps`, `androidProguardMappingFiles`, or `androidSourcemaps` parameters to `false`.

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": false
                    }
                }
            ]
        ]
    }
}
```

If you want to disable **all file uploads**, remove `expo-datadog` from the list of plugins.


### Using with Sentry

Both Datadog and Sentry config plugins use regular expressions to modify the "Bundle React Native code and images" iOS build phase to send the sourcemap. This can make your EAS builds fail with a `error: Found argument 'datadog-ci' which wasn't expected, or isn't valid in this context` error.

To use both plugins, make sure to add the `expo-datadog` plugin first in order in your `app.json` file:

```
"plugins": [
    "expo-datadog",
    "sentry-expo"
]
```

If you are using the `expo-dev-client` and already have the `expo-datadog` plugin, revert its changes to the `project.pbxproj` file before adding `sentry-expo` and running `npx expo prebuild` with both plugins.

[1]: https://github.com/DataDog/expo-datadog
[2]: /real_user_monitoring/mobile_and_tv_monitoring/setup/expo/#usage
{{% /tab %}}

{{% tab "React Native" %}}
If you have not set up the RUM React Native SDK yet, follow the [in-app setup instructions][1] or see the [React Native RUM setup documentation][2].

### Add Crash Reporting

Update your initialization snippet to enable native JavaScript crash reporting:

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true // enable JavaScript crash reporting
);
config.nativeCrashReportEnabled = true; // enable native crash reporting
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/reactnative/

{{% /tab %}}

{{% tab "Flutter" %}}

If you have not set up the Datadog Flutter SDK for RUM yet, follow the [in-app setup instructions][1] or see the [Flutter setup documentation][2].

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter#setup

{{% /tab %}}

{{% tab "Roku" %}}

If you have not set up the Roku SDK yet, follow the [in-app setup instructions][1] or see the [Roku RUM setup documentation][2].

1. Add the latest version of the [RUM Roku SDK][3] to your ROPM dependencies (or download the zip archive).
2. Configure your application's `env` when [initializing the SDK][4].

For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/
[3]: https://github.com/DataDog/dd-sdk-roku
[4]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tabs=kotlin#initialization-parameters

{{% /tab %}}

{{< /tabs >}}

## Upload your mapping file

Uploading a source map is a way to enable the browser to reconstruct the original source and present the reconstructed original in a debugger.

**Note**: Re-uploading a source map does not override the existing one if the version has not changed.

To upload your mapping file:

{{< tabs >}}

{{% tab "Android" %}}

1. Add the [Android Gradle Plugin][1] to your Gradle project using the following code snippet.

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Create a dedicated Datadog API key][2] and export it as an environment variable named `DD_API_KEY` or `DATADOG_API_KEY`. Alternatively, pass it as a task property, or if you have `datadog-ci.json` file in the root of your project, it can be taken from an `apiKey` property there.
3. Optionally, configure the plugin to upload files to the EU region by configuring the plugin in your `build.gradle` script:
   
   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. Run the upload task after your obfuscated APK builds:
    
   ```bash
   ./gradlew uploadMappingRelease
   ```

**Note**: If your project uses additional flavors, the plugin provides an upload task for each variant with obfuscation enabled. In this case, initialize the RUM Android SDK with a proper variant name (the necessary API is available in versions `1.8.0` and later).

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api

### Plugin Configuration Options

There are several plugin properties that can be configured through the plugin extension. In case you are using multiple variants, you can set a property value for a specific flavor in the variant.

For example, for a `fooBarRelease` variant, you can use the following configuration:

```groovy
datadog {
    foo {
        versionName = "foo"
    }
    bar {
        versionName = "bar"
    }
    fooBar {
        versionName = "fooBar"
    }
}
```

The task configuration for this variant is merged from all three flavor configurations provided in the following order:

1. `bar`
2. `foo`
3. `fooBar`

This resolves the final value for the `versionName` property as `fooBar`.

| Property name              | Description                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | The version name of the application (by default, the version declared in the `android` block of your `build.gradle` script).                                                                                                               |
| `serviceName`              | The service name of the application (by default, the package name of your application as declared in the `android` block of your `build.gradle` script).                                                                                                                          |
| `site`                     | The Datadog site to upload your data to (US1, US3, US5, EU1, US1_FED, or AP1).                                                                                                                                       |
| `remoteRepositoryUrl`      | The URL of the remote repository where the source code was deployed. If this is not provided, this value is resolved from your Git configuration during the task execution time.                     |
| `checkProjectDependencies` | This property controls if the plugin should check if the Datadog Android SDK is included in the dependencies. If not, "none" is ignored, "warn" logs a warning, and "fail" fails the build with an error (default). |

### Integrate with a CI/CD pipeline

By default, the upload mapping task is independent from other tasks in the build graph. Run the task manually when you need to upload mapping.

If you want to run this task in a CI/CD pipeline, and the task is required as part of the build graph, you can set the upload task to run after the mapping file is generated.

For example:

```groovy
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```

### Limitations

{{< site-region region="us,us3,us5,eu,gov" >}}
Mapping files are limited to **500** MB. If your project has a mapping file larger than this, use one of the following options to reduce the file size:
{{< /site-region >}}
{{< site-region region="ap1" >}}
Mapping files are limited to **50** MB. If your project has a mapping file larger than this, use one of the following options to reduce the file size:
{{< /site-region >}}

- Set the `mappingFileTrimIndents` option to `true`. This reduces your file size by 5%, on average.
- Set a map of `mappingFilePackagesAliases`: This replaces package names with shorter aliases. **Note**: Datadog's stacktrace uses the same alias instead of the original package name, so it's better to use this option for third party dependencies.

```groovy
datadog {
    mappingFileTrimIndents = true
    mappingFilePackageAliases = mapOf(
        "kotlinx.coroutines" to "kx.cor",
        "com.google.android.material" to "material",
        "com.google.gson" to "gson",
        "com.squareup.picasso" to "picasso"
    )
}
```

{{% /tab %}}

{{% tab "iOS" %}}

{{% /tab %}}

{{% tab "Expo" %}}

See [Plugin configuration options][1]

[1]: /real_user_monitoring/error_tracking/mobile/?tab=expo#plugin-configuration-options

{{% /tab %}}

{{% tab "React Native" %}}

{{% /tab %}}

{{% tab "Flutter" %}}

{{% /tab %}}

{{% tab "Roku" %}}

{{% /tab %}}

{{< /tabs >}}

## Symbolicate crash reports

{{< tabs >}}

{{% tab "Android" %}}

{{% /tab %}}

{{% tab "iOS" %}}

Crash reports are collected in a raw format and mostly contain memory addresses. To map these addresses into legible symbol information, Datadog requires .dSYM files, which are generated in your application's build or distribution process.

### Find your dSYM file

Every iOS application produces .dSYM files for each application module. These files minimize an application's binary size and enable faster download speed. Each application version contains a set of .dSYM files. 

Depending on your setup, you may need to download `.dSYM` files from App Store Connect or find them on your local machine. 

| Bitcode Enabled | Description |
|---|---|
| Yes | `.dSYM` files are available after [App Store Connect][1] completes processing your application's build. |
| No | Xcode exports `.dSYM` files to `$DWARF_DSYM_FOLDER_PATH` at the end of your application's build. Ensure that the `DEBUG_INFORMATION_FORMAT` build setting is set to **DWARF with dSYM File**. By default, Xcode projects only set `DEBUG_INFORMATION_FORMAT` to **DWARF with dSYM File** for the Release project configuration. |

### Upload your dSYM file

By uploading your `.dSYM` file to Datadog, you gain access to the file path and line number of each frame in an error's related stack trace.

Once your application crashes and you restart the application, the iOS SDK uploads a crash report to Datadog.

**Note**: Re-uploading a source map does not override the existing one if the version has not changed.

#### Datadog CI

You can use the command line tool [@datadog/datadog-ci][2] to upload your dSYM file:

```sh
export DATADOG_API_KEY="<API KEY>"

// if you have a zip file containing dSYM files
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// if you have a folder containing dSYM files
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**Note**: To configure the tool using the EU endpoint, set the `DATADOG_SITE` environment variable to `datadoghq.eu`. To override the full URL for the intake endpoint, define the `DATADOG_DSYM_INTAKE_URL` environment variable. 

Alternatively, if you use Fastlane or GitHub Actions in your workflows, you can leverage these integrations instead of `datadog-ci`:

#### Fastlane Plugin

The Datadog plugin helps you upload dSYM files to Datadog from your Fastlane configuration.

1. Add [`fastlane-plugin-datadog`][3] to your project.

   ```sh
   fastlane add_plugin datadog
   ```

2. Configure Fastlane to upload your symbols.

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

For more information, see [`fastlane-plugin-datadog`][3].

#### GitHub Action

The [Datadog Upload dSYMs GitHub Action][4] allows you to upload your symbols in your GitHub Action jobs:

```yml
name: Upload dSYM Files

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Generate/Download dSYM Files
        uses: ./release.sh

      - name: Upload dSYMs to Datadog
        uses: DataDog/upload-dsyms-github-action@v1
        with:
          api_key: ${{ secrets.DATADOG_API_KEY }}
          site: datadoghq.com
          dsym_paths: |
            path/to/dsyms/folder
            path/to/zip/dsyms.zip
```

For more information, see [dSYMs commands][5].

### Limitations

{{< site-region region="us,us3,us5,eu,gov" >}}
dSYM files are limited to **500** MB.
{{< /site-region >}}
{{< site-region region="ap1" >}}
dSYM files are limited to **500** MB.
{{< /site-region >}}

[1]: https://appstoreconnect.apple.com/
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/DataDog/datadog-fastlane-plugin
[4]: https://github.com/marketplace/actions/datadog-upload-dsyms
[5]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/dsyms/README.md

{{% /tab %}}

{{% tab "Expo" %}}

{{% /tab %}}

{{% tab "React Native" %}}

In order to make your application's size smaller, its code is minified when it is built for release. To link errors to your actual code, you need to upload the following symbolication files:

-   JavaScript source map for your iOS JavaScript bundle
-   JavaScript source map for your Android JavaScript bundle
-   dSYMs for your iOS native code
-   Proguard mapping files if you have enabled code obfuscation for your Android native code

To set your project up to send the symbolication files automatically, run `npx datadog-react-native-wizard`.

See the wizard [official documentation][1] for options.

[1]: https://github.com/DataDog/datadog-react-native-wizard

### Passing options for your uploads

#### On Android using the `datadog-sourcemaps.gradle` script

To specify a different service name, add the following code to your `android/app/build.gradle` file, before the `apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"` line:

```groovy
project.ext.datadog = [
    serviceName: "com.my.custom.service"
]
```

#### On iOS using the `datadog-ci react-native xcode` command

Options for the `datadog-ci react-native xcode` command are available on the [command documentation page][1].

#### Limitations

{{< site-region region="us,us3,us5,eu,gov" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
{{< /site-region >}}

To compute the size of your source maps and bundle, run the following command:

```shell
npx react-native bundle \
  --dev false \
  --platform ios \
  --entry-file index.js \
  --bundle-output build/main.jsbundle \
  --sourcemap-output build/main.jsbundle.map

sourcemapsize=$(wc -c build/main.jsbundle.map | awk '{print $1}')
bundlesize=$(wc -c build/main.jsbundle | awk '{print $1}')
payloadsize=$(($sourcemapsize + $bundlesize))

echo "Size of source maps and bundle is $(($payloadsize / 1000000))MB"
```

If a `build` directory does not already exist, create it first by running `mkdir build`, then run the command above.

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#xcode

{{% /tab %}}

{{% tab "Flutter" %}}

Native iOS crash reports are collected in a raw format and mostly contain memory addresses. To map these addresses into legible symbol information, Datadog requires that you upload .dSYM files, which are generated in your application's build process.

For all crash reports that are built with the `--split-debug-info` option set and/or with the `--obfuscate` option set, you need to upload their Android Proguard mapping file and Dart symbol files generated by the Flutter build process.


The [@datadog/datadog-ci][1] command line tool supports uploading all of the necessary files (dSYMs, Android Proguard Mapping, and Dart Symbol Files) in one command.

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

For a full list of options, see the `datadog-ci` [Flutter Symbols documentation][2].

### Limitations

{{< site-region region="us,us3,us5,eu,gov" >}}
Source maps and dSYM files are limited to **500** MB each.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Source maps and dSYM files are limited to **500** MB each.
{{< /site-region >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/flutter-symbols

{{% /tab %}}

{{% tab "Roku" %}}

{{% /tab %}}

{{< /tabs >}}

## Verify your crash reporting implementation

{{< tabs >}}

{{% tab "Android" %}}

{{% /tab %}}

{{% tab "iOS" %}}

To verify your iOS Crash Reporting and Error Tracking configuration, issue a crash in your RUM application and confirm that the error appears in Datadog. 

1. Run your application on an iOS simulator or a real device. Ensure that the debugger is not attached. Otherwise, Xcode captures the crash before the iOS SDK does.
2. Execute the code containing the crash:

   ```swift
   func didTapButton() {
   fatalError("Crash the app")
   }
   ```

3. After the crash happens, restart your application and wait for the iOS SDK to upload the crash report in [**Error Tracking**][1].

**Note:** RUM supports symbolication of system symbol files for iOS v14+ arm64 and arm64e architecture.

[1]: https://app.datadoghq.com/rum/error-tracking

{{% /tab %}}

{{% tab "Expo" %}}

{{% /tab %}}

{{% tab "React Native" %}}
To make sure your sourcemaps are correctly sent and linked to your application, you can generate crashes with the [`react-native-performance-limiter`][1] package.

Install it with yarn or npm then re-install your pods:

```shell
yarn add react-native-performance-limiter # or npm install react-native-performance-limiter
(cd ios && pod install)
```

Crash the JavaScript thread from your app:

```javascript
import { crashJavascriptThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashJavascriptThread('custom error message');
};
```

Re-build your application for release to send the new sourcemaps, trigger the crash and wait on the [Error Tracking][1] page for the error to appear.

To test your dSYMs and Proguard mapping files upload, crash the native main thread instead:

```javascript
import { crashNativeMainThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashNativeMainThread('custom error message');
};
```

[1]: https://github.com/DataDog/react-native-performance-limiter

{{% /tab %}}

{{% tab "Flutter" %}}

{{% /tab %}}

{{% tab "Roku" %}}

{{% /tab %}}

{{< /tabs >}}

## Advanced configuration

{{< tabs >}}

{{% tab "Android" %}}

{{% /tab %}}

{{% tab "iOS" %}}

{{% /tab %}}

{{% tab "Expo" %}}

{{% /tab %}}

{{% tab "React Native" %}}

### Alternatives to `datadog-react-native-wizard`

If using `datadog-react-native-wizard` did not succeed or if you don't want to upload your symbolication files automatically on each release, follow the next steps to symbolicate crash reports.

### Upload JavaScript source maps on iOS builds

You need to install `@datadog/datadog-ci` as a dev dependency to your project:

```bash
yarn add -D @datadog/datadog-ci
# or
npm install --save-dev @datadog/datadog-ci
```

{{< collapse-content title="Automatically on each release build (React Native >= 0.69)" level="h4" >}}

Manually uploading your source maps on every release build takes time and is prone to errors. Datadog recommends automatically sending your source maps every time you run a release build.

Create a script file named `datadog-sourcemaps.sh` at the root of your project containing the following:

```shell
#!/bin/sh
set -e

DATADOG_XCODE="../node_modules/.bin/datadog-ci react-native xcode"

/bin/sh -c "$DATADOG_XCODE"
```

This script runs a command that takes care of uploading the source maps with all the correct parameters. For more information, see the [datadog-ci documentation][1].

Open your `.xcworkspace` with Xcode, then select your project > Build Phases > Bundle React Native code and images. Edit the script to look like the following:

```shell
set -e
WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
# Add these two lines
REACT_NATIVE_XCODE="./datadog-sourcemaps.sh"
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map

# Edit the next line
/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

For the upload to work, you need to provide your Datadog API key. If you use a command-line tool or an external service, you can specify it as a `DATADOG_API_KEY` environment variable. If you run the build from Xcode, create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.

{{< /collapse-content >}}

{{< collapse-content title="Automatically on each release build (React Native < 0.69))" level="h4" >}}

Open your `.xcworkspace` with Xcode, then select your project > Build Phases > Bundle React Native code and images. Edit the script to look like the following:

```shell
set -e

export NODE_BINARY=node
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map
../node_modules/.bin/datadog-ci react-native xcode
```

This script runs a command that takes care of uploading the source maps with all the correct parameters. For more information, see the [datadog-ci documentation][1].

For the upload to work, you need to provide your Datadog API key. If you use a command-line tool or an external service, you can specify it as a `DATADOG_API_KEY` environment variable. If you run the build from Xcode, create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.

{{< /collapse-content >}}

{{< collapse-content title="Manually on each build" level="h4" >}}

To output a source map, you need to edit the Xcode build phase "Bundle React Native Code and Images".

1. Open the `ios/YourAppName.xcworkspace` file in Xcode.
2. In the left panel, select the "File" icon and click on your project.
3. In the central panel, select "Build Phases" from the top bar.

Change the script by adding this after the `set -e` line:

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- add this line to output source maps
# leave the rest of the script unchanged
```

Moving forward, you can find the source maps for your bundle on every iOS build.

To find the path to your bundle file from XCode, display the Report Navigator on Xcode and filter by `BUNDLE_FILE` for its location.

The usual location is `~/Library/Developer/Xcode/DerivedData/YourAppName-verylonghash/Build/Intermediates.noindex/ArchiveIntermediates/YourAppName/BuildProductsPath/Release-iphoneos/main.jsbundle`, where `YourAppName` is the name of your app, and `verylonghash` is a 28 letter hash.

To upload the source maps, run this from your React Native project:

```bash
export DATADOG_API_KEY= # fill with your API key
export SERVICE=com.myapp # replace by your service name
export VERSION=1.0.0 # replace by the version of your app in XCode
export BUILD=100 # replace by the build of your app in XCode
export BUNDLE_PATH= # fill with your bundle path

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

{{< /collapse-content >}}

{{< collapse-content title="Manually on each build (with Hermes for React Native < 0.71)" level="h4" >}}

There is a bug in React Native versions up to 0.71 that generates an incorrect source map when using Hermes.

To resolve this, you need to add more lines **at the very end** of the build phase to generate a correct source map file.

Edit your build phase like so:

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- add this line to output source maps
# For React Native 0.70, you need to set USE_HERMES to true for source maps to be generated
export USE_HERMES=true

# keep the rest of the script unchanged

# add these lines to compose the packager and compiler source maps into one file
REACT_NATIVE_DIR=../node_modules/react-native

if [ -f "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh" ]; then
    source "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh"
else
    # Before RN 0.70, the script was named find-node.sh
    source "$REACT_NATIVE_DIR/scripts/find-node.sh"
fi
source "$REACT_NATIVE_DIR/scripts/node-binary.sh"
"$NODE_BINARY" "$REACT_NATIVE_DIR/scripts/compose-source-maps.js" "$CONFIGURATION_BUILD_DIR/main.jsbundle.map" "$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/main.jsbundle.map" -o "../$SOURCEMAP_FILE"
```

To upload the source map, run this from your React Native project root:

```bash
export DATADOG_API_KEY= # fill with your API key
export SERVICE=com.myapp # replace by your service name
export VERSION=1.0.0 # replace by the version of your app in XCode
export BUILD=100 # replace by the build of your app in XCode
export BUNDLE_PATH= # fill with your bundle path

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

{{< /collapse-content >}}

### Upload JavaScript source maps on Android builds

{{< collapse-content title="Automatically on each release build (React Native >= 0.71)" level="h4" >}}

In your `android/app/build.gradle` file, add the following after the `apply plugin: "com.facebook.react"` line:

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

For the upload to work, you need to provide your Datadog API key. You can specify it as a `DATADOG_API_KEY` environment variable, or create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.

{{< /collapse-content >}}

{{< collapse-content title="Automatically on each release build (React Native < 0.71)" level="h4" >}}

In your `android/app/build.gradle` file, add the following after the `apply from: "../../node_modules/react-native/react.gradle"` line:

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

For the upload to work, you need to provide your Datadog API key. You can specify it as a `DATADOG_API_KEY` environment variable, or create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.

{{< /collapse-content >}}

{{< collapse-content title="Manually on each build" level="h4" >}}

On Android, the source map file is located at `android/app/build/generated/sourcemaps/react/release/index.android.bundle.map`.
The bundle file location depends on your React Native (RN) and Android Gradle Plugin (AGP) versions:

-   RN >= 0.71 and AGP >= 7.4.0: `android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN >= 0.71 and AGP < 7.4.0: `android/app/build/ASSETS/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN < 0.71: `android/app/build/generated/assets/react/release/index.android.bundle`

The Android Gradle Plugin version is specified in the `android/build.gradle` file under `com.android.tools.build:gradle`, for instance: `classpath("com.android.tools.build:gradle:7.3.1")`.

If your application has more comprehensive variants, replace `release` by your variant's name in the paths.
If you specified a `bundleAssetName` in your React config in `android/app/build.gradle`, replace `index.android.bundle` by its value.

After running your build, upload your source map by running this from your React Native project root:

```bash
export DATADOG_API_KEY= # fill with your API key
export SERVICE=com.myapp # replace by your service name
export VERSION=1.0.0 # replace by the versionName from android/app/build.gradle
export BUILD=100 # replace by the versionCode from android/app/build.gradle
export BUNDLE_PATH=android/app/build/generated/assets/react/release/index.android.bundle
export SOURCEMAP_PATH=android/app/build/generated/sourcemaps/react/release/index.android.bundle.map

yarn datadog-ci react-native upload --platform android --service $SERVICE --bundle $BUNDLE_PATH --sourcemap $SOURCEMAP_PATH --release-version $VERSION --build-version $BUILD
```

{{< /collapse-content >}}

### Upload iOS dSYM files

{{< collapse-content title="Manually on each build" level="h4" >}}

For more information, see the [iOS Crash Reporting and Error Tracking documentation][4].

{{< /collapse-content >}}

### Upload Android Proguard mapping files

First, ensure that Proguard minification is enabled on your project. By default, this is not enabled on React Native projects.

For more information, see [the React Native Proguard documentation][2].

If you are still unsure, you can see if running `(cd android && ./gradlew tasks --all) | grep minifyReleaseWithR8` returns anything. If so, minification is enabled.

{{< collapse-content title="Manually on each build" level="h4" >}}

In your `android/app/build.gradle` file, add the [latest version of the plugin][3] and configure it **at the top of the file**:

```groovy
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}

datadog {
    checkProjectDependencies = "none" // this is needed in any case for React Native projects
}
```

For the upload to work, you need to provide your Datadog API key. You can specify it as a `DATADOG_API_KEY` environment variable, or create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.
For more information, see the [Datadog Android SDK Gradle Plugin][4].

To run the plugin after a build run `(cd android && ./gradlew app:uploadMappingRelease)`.

{{< /collapse-content >}}

### Automate the upload on each build

Install the plugin like in the previous step.

Find the loop on `applicationVariants` in the `android/app/build.gradle` file. It should look like `applicationVariants.all { variant ->`.

Inside the loop, add the following snippet:

```groovy
        if (project.tasks.findByName("minify${variant.name.capitalize()}WithR8")) {
            tasks["minify${variant.name.capitalize()}WithR8"].finalizedBy { tasks["uploadMapping${variant.name.capitalize()}"] }
        }
```

**Note**: Re-uploading a source map does not override the existing one if the version has not changed.

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#xcode
[2]: https://reactnative.dev/docs/signed-apk-android#enabling-proguard-to-reduce-the-size-of-the-apk-optional
[3]: https://plugins.gradle.org/plugin/com.datadoghq.dd-sdk-android-gradle-plugin
[4]: https://github.com/DataDog/dd-sdk-android-gradle-plugin

{{% /tab %}}

{{% tab "Flutter" %}}

### Flavors and build numbers

Datadog uses the combination of the `service-name`, `version`, and `flavor` to locate the correct symbols for deobfuscation. For your crash reports to have complete information, the parameters sent to the `datadog-ci` command and the parameters set in [DatadogConfiguration][1] must match exactly.

If you are using app [flavors][2] in Flutter, you will need to set the name of the flavor in [DatadogConfiguration.flavor][3] since we cannot detect the flavor automatically. You can then pass this to the `--flavor` parameter of the `datadog-ci` command:

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --flavor my_flavor
```

The Datadog SDK automatically detects the version number of your application specified in your `pubspec.yaml` up to but not including the build number. If you are using build numbers as part of the version in your application and need to upload symbols for each build, you need to add the version to [DatadogConfiguration.version][4]. You can then pass this to the `--version` parameter of the `datadog-ci` command:

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --version 1.2.3+22
```

**Note**: Datadog uses tags for versions that do not allow `+`. All tooling automatically replaces `+` with `-` so that the version tags are searchable in Datadog.

[1]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[2]: https://docs.flutter.dev/deployment/flavors
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/flavor.html
[4]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/version.html

{{% /tab %}}

{{% tab "Roku" %}}

### Forward errors to Datadog

Whenever you perform an operation that might throw an exception, you can forward the error to Datadog by adding the following code snippet:

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
