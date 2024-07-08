---
title: Android Crash Reporting and Error Tracking
description: Set up Error Tracking for your Android applications.
aliases:
    - /real_user_monitoring/error_tracking/android
type: multi-code-lang
code_lang: android
code_lang_weight: 10
further_reading:
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'

---

## Overview

Error Tracking processes errors collected from the RUM Android SDK. 

Enable Android Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

- Aggregated Android crash dashboards and attributes
- Deobfuscated Android crash reports
- Trend analysis with Android error tracking

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the Android SDK yet, follow the [in-app setup instructions][2] or see the [Android RUM setup documentation][3].

1. Add the latest version of the [RUM Android SDK][4] to your Gradle dependencies.
2. Configure your application's `env` and `variant` when [initializing the SDK][5].
3. Run the Gradle tasks to upload your Proguard/R8 mapping file and NDK symbol files to Datadog to access deobfuscated stack traces. 

For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.

### Add NDK crash reporting

Your Android application may be running native code (C/C++) for performance or code reusability reasons. In order to enable NDK crash reporting, use the Datadog NDK plugin. 

1. Declare `dd-sdk-android-ndk` as a dependency in your application module's `build.gradle` file.

   ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-ndk:x.x.x" 
        //(...)
    }
   ```
2. Enable NDK crash collection after initializing the RUM SDK.

    ``` kotlin
    NdkCrashReports.enable()
    ```



### Add ANR reporting

An "Application Not Responding" ([ANR][6]) is an Android-specific type of error that gets triggered when the application is unresponsive for too long.

ANRs are only reported through the RUM SDK (not through Logs).

#### Report fatal ANRs
Fatal ANRs result in crashes. The application reports them when it's unresponsive, leading to the Android OS displaying a popup dialog to the user, who chooses to force quit the app through the popup.

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="A fatal crash report in Error Tracking." >}}

- In the **Error Tracking** page, fatal ANRs are grouped based on their similarity, which can result into several **individual issues** being created
- By default, Datadog catches fatal ANRs through the [ApplicationExitInfo API][7] (available since *[Android 30+][8]*), which can be read on the next app launch.
- In *[Android 29][9] and below*, reporting on fatal ANRs is not possible.

#### Report non-fatal ANRs
Non-fatal ANRs may or may not have led to the application being terminated (crashing).

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="A non-fatal crash report in Error Tracking." >}}

- In the **Error Tracking** page, non-fatal ANRs are grouped under a **single** issue due to their level of noise
- By default, the reporting of non-fatal ANRs on *Android 30+* is **disabled** because it would create too much noise over fatal ANRs. On *Android 29* and below, however, the reporting of non-fatal ANRs is **enabled** by default, as fatal ANRs cannot be reported on those versions.

For any Android version, you can override the default setting for reporting non-fatal ANRs by setting `trackNonFatalAnrs` to `true` or `false` when initializing the RUM SDK.

## Get deobfuscated stack traces

Mapping files are used to deobfuscate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding mapping files. This ensures that regardless of when the mapping file was uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

Depending on the [Android Gradle plugin][1] version, the matching of stack traces and mapping files relies on different fields:

- Version 1.13.0 uses the `build_id` field
- Older versions use a combination of the `service`, `version`, and `variant` fields

### Upload your mapping file

**Note**: Re-uploading a source map does not override the existing one if the version has not changed.

{{< tabs >}}
{{% tab "US" %}}

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

5. If running native code, run the NDK symbol upload task.
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Note**: If your project uses additional flavors, the plugin provides an upload task for each variant with obfuscation enabled. In this case, initialize the RUM Android SDK with a proper variant name (the necessary API is available in versions `1.8.0` and later).


[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "EU" %}}
1. Add the [Android Gradle Plugin][1] to your Gradle project using the following code snippet.

   ```groovy
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Create a dedicated Datadog API key][2] and export it as an environment variable named `DD_API_KEY` or `DATADOG_API_KEY`. Alternatively, pass it as a task property, or if you have `datadog-ci.json` file in the root of your project, it can be taken from an `apiKey` property there.
3. Configure the plugin to use the EU region by adding the following snippet in your app's `build.gradle` script file:

   ```groovy
   datadog {
       site = "EU1"
   }
   ```

4. Run the upload task after your obfuscated APK builds:
   
   ```bash
   ./gradlew uploadMappingRelease
   ```
   
5. If running native code, run the NDK symbol upload task.
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Note**: If your project uses additional flavors, the plugin provides an upload task for each variant with obfuscation enabled. In this case, initialize the RUM Android SDK with a proper variant name (the necessary API is available in versions `1.8.0` and later).


[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

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

## Limitations

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

## Test your implementation

To verify your Android Crash Reporting and Error Tracking configuration, you need to trigger a crash in your RUM application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on an Android emulator or a real device.
2. Execute some code containing an error or crash. For example:

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. After the crash happens, restart your application and wait for the Android SDK to upload the crash report in [**Error Tracking**][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/mobile_and_tv_monitoring/setup/android#setup
[4]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[5]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tabs=kotlin#initialization-parameters
[6]: https://developer.android.com/topic/performance/vitals/anr
[7]: https://developer.android.com/reference/android/app/ApplicationExitInfo
[8]: https://developer.android.com/tools/releases/platforms#11
[9]: https://developer.android.com/tools/releases/platforms#10
