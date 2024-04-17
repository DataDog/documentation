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
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: Source code for dd-sdk-ios
- link: https://www.datadoghq.com/blog/debug-android-crashes/
  tag: Blog
  text: Debug Android crashes faster with Datadog
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: Blog
  text: Debug iOS crashes efficiently with Datadog

---

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

{{% /tab %}}

{{% tab "Flutter" %}}

{{% /tab %}}

{{% tab "Roku" %}}

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

{{% /tab %}}

{{% tab "Flutter" %}}

{{% /tab %}}

{{% tab "Roku" %}}

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

{{% /tab %}}

{{% tab "Flutter" %}}

{{% /tab %}}

{{% tab "Roku" %}}

{{% /tab %}}

{{< /tabs >}}

## Verify crash reports

{{< tabs >}}

{{% tab "Android" %}}

{{% /tab %}}

{{% tab "iOS" %}}

To verify your iOS Crash Reporting and Error Tracking configuration, issue a crash in your RUM application and confirm that the error appears in Datadog. 

1. Run your application on an iOS simulator or a real device. Ensure that the debugger is not attached. Otherwise, Xcode captures the crash before the iOS SDK does.
2. Execute the code containing the crash:

   ```swift
   func didTapButton() {
   fatalError(“Crash the app”)
   }
   ```

3. After the crash happens, restart your application and wait for the iOS SDK to upload the crash report in [**Error Tracking**][1].

**Note:** RUM supports symbolication of system symbol files for iOS v14+ arm64 and arm64e architecture.

[1]: https://app.datadoghq.com/rum/error-tracking

{{% /tab %}}

{{% tab "Expo" %}}

{{% /tab %}}

{{% tab "React Native" %}}

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

{{% /tab %}}

{{% tab "Flutter" %}}

{{% /tab %}}

{{% tab "Roku" %}}

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
