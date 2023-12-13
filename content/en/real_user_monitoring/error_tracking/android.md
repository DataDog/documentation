---
title: Android Crash Reporting and Error Tracking
kind: documentation
description: Set up Error Tracking for your Android applications.
further_reading:
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Error Tracking'
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
3. Run the Gradle task to upload your Proguard/R8 mapping file to Datadog in order to access deobfuscated stack traces. 

For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.

## Upload your mapping file

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
       site = "US1"
   }
   ```

4. Run the upload task after your obfuscated APK builds:
    
   ```bash
   ./gradlew uploadMappingRelease
   ```

**Note**: If your project uses additional flavors, the plugin provides an upload task for each variant with obfuscation enabled. In this case, initialize the RUM Android SDK with a proper variant name (the necessary API is available in versions `1.8.0` and later).

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api

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

**Note**: If your project uses additional flavors, the plugin provides an upload task for each variant with obfuscation enabled. In this case, initialize the RUM Android SDK with a proper variant name (the necessary API is available in versions `1.8.0` and later).

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api

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

{{< site-region region="us,us3,us5,eu" >}}
Mapping files are limited to **300** MB. If your project has a mapping file larger than this, use one of the following options to reduce the file size:
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/mobile_and_tv_monitoring/setup/android#setup
[4]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[5]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tabs=kotlin#initialization-parameters
