---
title: Kotlin Multiplatform Log Collection
description: Collect logs from your Kotlin Multiplatform applications.
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: "Source Code"
  text: dd-sdk-kotlin-multiplatform source code
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs
---

## Overview

Send logs to Datadog from your Android or iOS applications with [Datadog's `dd-sdk-kotlin-multiplatform-logs` client-side logging library][1] and use the following features:

* Log to Datadog in JSON format natively.
* Add `context` and extra custom attributes to each log sent.
* Forward Java or Kotlin caught exceptions.
* Forward iOS errors.
* Record real client IP addresses and User-Agents.
* Optimize network usage with automatic bulk posts.

## Setup

1. Add the Gradle dependency to the common source set by declaring the library as a dependency in the module-level `build.gradle.kts` file. Make sure to replace `x.x.x` in the following example with the latest version of [`dd-sdk-kotlin-multiplatform-logs`][2].

```kotlin
kotlin {
  sourceSets {
    commonMain.dependencies {
      implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-logs:x.x.x")
    }
  }
}
```

2. Add native dependencies for iOS.

    **Note**: Kotlin 2.0.20 or higher is required if crash tracking is enabled on iOS. Otherwise, due to the compatibility with `PLCrashReporter`, the application may hang if crash tracking is enabled .

    Add the following Datadog iOS SDK dependencies, which are needed for the linking step:

    * `DatadogCore`
    * `DatadogLogs`
    * `DatadogCrashReporting`

    **Note**: Versions of these dependencies should be aligned with the version used by the Datadog Kotlin Multiplatform SDK itself. You can find the complete mapping of iOS SDK versions for each Kotlin Multiplatform SDK release in the [version compatibility guide][6]. If you are using Kotlin Multiplatform SDK version 1.3.0 or below, add `DatadogObjc` dependency instead of `DatadogCore` and `DatadogLogs`.

    #### Adding native iOS dependencies using the CocoaPods plugin

    If you are using Kotlin Multiplatform library as a CocoaPods dependency for your iOS application, you can add dependencies as following:

    ```kotlin
    cocoapods {
        // ...

        framework {
            baseName = "sharedLib"
        }

        pod("DatadogCore") {
            linkOnly = true
            version = x.x.x
        }

        pod("DatadogLogs") {
            linkOnly = true
            version = x.x.x
        }

        pod("DatadogCrashReporting") {
            linkOnly = true
            version = x.x.x
        }
    }
    ```

    #### Adding native iOS dependencies using Xcode

    If you are integrating Kotlin Multiplatform library as a framework with an `embedAndSignAppleFrameworkForXcode` Gradle task as a part of your Xcode build, you can add the necessary dependencies directly in Xcode as following:

    1. Click on your project in Xcode and go to the **Package Dependencies** tab.
    2. Add the iOS SDK package dependency by adding `https://github.com/DataDog/dd-sdk-ios.git` as a package URL.
    3. Select the version from the table above.
    4. Click on the necessary application target and open the **General** tab.
    5. Scroll down to the **Frameworks, Libraries, and Embedded Content** section and add the dependencies mentioned above.

3. Initialize the Datadog SDK with your application context (only for Android; can be `null` for iOS), tracking consent, and the [Datadog client token][2]. For security reasons, you must use a client token; you cannot use [Datadog API keys][3] to configure the Datadog SDK, as they would be exposed client-side in the Android application APK byte code.

   For more information about setting up a client token, see the [client token documentation][2].

   {{< site-region region="us" >}}
   ```kotlin
    // in common source set
    fun initializeDatadog(context: Any? = null) {
        // context should be application context on Android and can be null on iOS
        val appClientToken = <CLIENT_TOKEN>
        val appEnvironment = <ENV_NAME>
        val appVariantName = <APP_VARIANT_NAME>

        val configuration = Configuration.Builder(
                clientToken = appClientToken,
                env = appEnvironment,
                variant = appVariantName
        )
            .build()

        Datadog.initialize(context, configuration, trackingConsent)
    }
    ```
   {{< /site-region >}}

   {{< site-region region="eu" >}}
   ```kotlin
    // in common source set
    fun initializeDatadog(context: Any? = null) {
        // context should be application context on Android and can be null on iOS
        val appClientToken = <CLIENT_TOKEN>
        val appEnvironment = <ENV_NAME>
        val appVariantName = <APP_VARIANT_NAME>

        val configuration = Configuration.Builder(
                clientToken = appClientToken,
                env = appEnvironment,
                variant = appVariantName
        )
            .useSite(DatadogSite.EU1)
            .trackCrashes(true)
            .build()

        Datadog.initialize(context, configuration, trackingConsent)
    }
   ```
   {{< /site-region >}}

   {{< site-region region="us3" >}}
   ```kotlin
    // in common source set
    fun initializeDatadog(context: Any? = null) {
        // context should be application context on Android and can be null on iOS
        val appClientToken = <CLIENT_TOKEN>
        val appEnvironment = <ENV_NAME>
        val appVariantName = <APP_VARIANT_NAME>

        val configuration = Configuration.Builder(
                clientToken = appClientToken,
                env = appEnvironment,
                variant = appVariantName
        )
            .useSite(DatadogSite.US3)
            .trackCrashes(true)
            .build()

        Datadog.initialize(context, configuration, trackingConsent)
    }
   ```
   {{< /site-region >}}

   {{< site-region region="us5" >}}
   ```kotlin
    // in common source set
    fun initializeDatadog(context: Any? = null) {
        // context should be application context on Android and can be null on iOS
        val appClientToken = <CLIENT_TOKEN>
        val appEnvironment = <ENV_NAME>
        val appVariantName = <APP_VARIANT_NAME>

        val configuration = Configuration.Builder(
                clientToken = appClientToken,
                env = appEnvironment,
                variant = appVariantName
        )
            .useSite(DatadogSite.US5)
            .trackCrashes(true)
            .build()

        Datadog.initialize(context, configuration, trackingConsent)
    }
   ```
   {{< /site-region >}}

   {{< site-region region="gov" >}}
   ```kotlin
    // in common source set
    fun initializeDatadog(context: Any? = null) {
        // context should be application context on Android and can be null on iOS
        val appClientToken = <CLIENT_TOKEN>
        val appEnvironment = <ENV_NAME>
        val appVariantName = <APP_VARIANT_NAME>

        val configuration = Configuration.Builder(
                clientToken = appClientToken,
                env = appEnvironment,
                variant = appVariantName
        )
            .useSite(DatadogSite.US1_FED)
            .trackCrashes(true)
            .build()

        Datadog.initialize(context, configuration, trackingConsent)
    }
   ```
   {{< /site-region >}}

   {{< site-region region="ap1" >}}
   ```kotlin
    // in common source set
    fun initializeDatadog(context: Any? = null) {
        // context should be application context on Android and can be null on iOS
        val appClientToken = <CLIENT_TOKEN>
        val appEnvironment = <ENV_NAME>
        val appVariantName = <APP_VARIANT_NAME>

        val configuration = Configuration.Builder(
                clientToken = appClientToken,
                env = appEnvironment,
                variant = appVariantName
        )
            .useSite(DatadogSite.AP1)
            .trackCrashes(true)
            .build()

        Datadog.initialize(context, configuration, trackingConsent)
    }
   ```
   {{< /site-region >}}
   {{< site-region region="ap2" >}}
   ```kotlin
    // in common source set
    fun initializeDatadog(context: Any? = null) {
        // context should be application context on Android and can be null on iOS
        val appClientToken = <CLIENT_TOKEN>
        val appEnvironment = <ENV_NAME>
        val appVariantName = <APP_VARIANT_NAME>

        val configuration = Configuration.Builder(
                clientToken = appClientToken,
                env = appEnvironment,
                variant = appVariantName
        )
            .useSite(DatadogSite.AP2)
            .trackCrashes(true)
            .build()

        Datadog.initialize(context, configuration, trackingConsent)
    }
   ```
   {{< /site-region >}}

    To be compliant with GDPR, the SDK requires the tracking consent value at initialization.
    Tracking consent can be one of the following values:

    - `TrackingConsent.PENDING`: (Default) The SDK starts collecting and batching the data but does not send it to the
    collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
    - `TrackingConsent.GRANTED`: The SDK starts collecting the data and sends it to the data collection endpoint.
    - `TrackingConsent.NOT_GRANTED`: The SDK does not collect any data. You are not able to manually send any logs, traces, or
    RUM events.

    To update the tracking consent after the SDK is initialized, call `Datadog.setTrackingConsent(<NEW CONSENT>)`. The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.PENDING` and you update it to:

    - `TrackingConsent.GRANTED`: The SDK sends all current batched data and future data directly to the data collection endpoint.
    - `TrackingConsent.NOT_GRANTED`: The SDK wipes all batched data and does not collect any future data.

   Use the utility method `isInitialized` to check if the SDK is properly initialized:

   ```kotlin
   if (Datadog.isInitialized()) {
      // your code here
   }
   ```

   When writing your application, you can enable development logs by calling the `setVerbosity` method. All internal messages in the library with a priority equal to or higher than the provided level are then logged to Logcat (Android) or Xcode's debugger console (iOS):
   ```kotlin
   Datadog.setVerbosity(SdkLogVerbosity.INFO)
   ```

4. Configure and enable the Logs feature:

   ```kotlin
   val logsConfig = LogsConfiguration.Builder().build()
   Logs.enable(logsConfig)
   ```

5. Configure the Logger:

   ```kotlin
   val logger = Logger.Builder()
       .setNetworkInfoEnabled(true)
       .setPrintLogsToConsole(true)
       .setRemoteSampleRate(100f)
       .setBundleWithRumEnabled(true)
       .setName("<LOGGER_NAME>")
       .build()
   ```

6. Send a custom log entry directly to Datadog with one of the following functions:

    ```kotlin
    logger.debug("A debug message.")
    logger.info("Some relevant information?")
    logger.warn("An important warning...")
    logger.error("An error was met!")
    logger.critical("What a Terrible Failure!")
    ```
   
7. Exceptions caught can be sent with a message:

   ```kotlin
   try { 
       doSomething() 
   } catch (e: IOException) {
        logger.error("Error while doing something", e) 
   }
   ```

    **Note**: All logging methods can have a `Throwable` (or `NSError` is called from iOS source set) attached to them.

8. (Optional) Provide a map alongside your log message to add attributes to the emitted log. Each entry of the map is added as an attribute.

   ```kotlin
   logger.info("onPageStarted", attributes = mapOf("http.url" to url))
   ```

9. If you need to modify some attributes in your Log events before batching, you can do so by providing an implementation of `EventMapper<LogEvent>` when initializing the Logs feature:

   ```kotlin
   val logsConfig = LogsConfiguration.Builder()
               // ...
               .setEventMapper(logEventMapper)
               .build()
   ```

   **Note**: If you return null or a different instance from the `EventMapper<LogEvent>` implementation, the event will be dropped.

## Advanced logging

### Logger initialization

You can use the following methods in `Logger.Builder` when initializing the logger to send logs to Datadog:

| Method                           | Description                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | Add the `network.client.connectivity` attribute to all logs.<br/>**Android**: The data logged by default is:<ul><li/> `connectivity` <ul><li/>`Wifi`, `3G`, `4G`, etc.</ul> <li/>`carrier_name` - only available for Android API level 28+ <ul><li/>`AT&T - US`</ul></ul>. **iOS**: The data logged by default is: <ul> <li/>`reachability` <ul> <li/>`yes`, `no`, `maybe`</ul><li/>`available_interfaces` <ul> <li/>`wifi`, `cellular`, etc.</ul><li/> `sim_carrier.name` <ul> <li/>for example: `AT&T - US`</ul><li/>`sim_carrier.technology` <ul> <li/>`3G`, `LTE`, etc.</ul><li/> `sim_carrier.iso_country` <ul> <li/>for example: `US`</ul></ul>                                    |
| `setService(<SERVICE_NAME>)` | Set `<SERVICE_NAME>` as value for the `service` [standard attribute][4] attached to all logs sent to Datadog.                                                                                                                                                           |
| `setPrintLogsToConsole(true)`     | Set to `true` to use Logcat as a logger (Android) or print logs to debugger console in Xcode (iOS).                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| Set to `true` (default) to bundle the logs with the active trace in your application. This parameter lets you display all the logs sent during a specific trace by using the Datadog dashboard.                                                        |
| `setBundleWithRumEnabled(true)`| Set to `true` (default) to bundle the logs with the current RUM context in your application. This parameter lets you display all the logs sent while a specific View is active by using the Datadog RUM Explorer.                                                        |
| `setName(<LOGGER_NAME>)`   | Set `<LOGGER_NAME>` as the value for the `logger.name` attribute attached to all logs sent to Datadog.                                                                                                                                                                  |
| `setRemoteSampleRate(<SAMPLE_RATE>)`   | Set the sampling rate for this logger. All the logs produced by the logger instance are randomly sampled according to the provided sample rate (default 1.0 = all logs). **Note**: Console logs are not sampled.            |
| `setRemoteLogThreshold(LogLevel)`   | Sets a minimum threshold (priority) for the log to be sent to the Datadog servers. If log priority is below this one, then it won't be sent (default is to allow all). **Note**: Console logs are not sampled.            |
| `build()`                        | Build a new logger instance with all options set.                                                                                                                                                                                                                       |

### Global configuration

Use the following functions to add or remove tags and attributes to all logs sent by a given logger.

#### Global tags

##### Add tags

Use the `addTag("<TAG_KEY>", "<TAG_VALUE>")` function to add tags to all logs sent by a specific logger:

```kotlin
// This adds a tag "build_type:debug" or "build_type:release" accordingly
logger.addTag("build_type", BuildConfig.BUILD_TYPE)

// This adds a tag "device:android"
logger.addTag("device", "android")
```

The `<TAG_VALUE>` must be a `String`.

##### Remove tags

Use the `removeTagsWithKey("<TAG_KEY>")` function to remove tags from all logs sent by a specific logger:

```kotlin
// This removes any tag starting with "build_type"
logger.removeTagsWithKey("build_type")
```

For more information, see [Getting Started with Tags][5].

#### Global attributes

##### Add attributes

By default, the following attributes are added to all logs sent by a logger:

* `http.useragent` and its extracted `device` and `OS` properties
* `network.client.ip` and its extracted geographical properties (`country`, `city`)

Use the `addAttribute("<ATTRIBUTE_KEY>", "<ATTRIBUTE_VALUE>")` function to add a custom attribute to all logs sent by a specific logger:

```kotlin
// This adds an attribute "version_code" with an integer value
logger.addAttribute("version_code", BuildConfig.VERSION_CODE)

// This adds an attribute "version_name" with a String value
logger.addAttribute("version_name", BuildConfig.VERSION_NAME)
```

The `<ATTRIBUTE_VALUE>` can be any primitive, `String`, or `Date`.

##### Remove attributes

Use the `removeAttribute("<ATTRIBUTE_KEY>", "<ATTRIBUTE_VALUE>")` function to remove a custom attribute from all logs sent by a specific logger:

```kotlin
// This removes the attribute "version_code" from all further log send.
logger.removeAttribute("version_code")

// This removes the attribute "version_name" from all further log send.
logger.removeAttribute("version_name")
```

## Batch collection

All the logs are first stored on the local device in batches. Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

The data on disk is automatically discarded if it gets too old. This ensures that the SDK does not use too much disk space.

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/features/logs
[2]: /account_management/api-app-keys/#client-tokens
[3]: /account_management/api-app-keys/#api-keys
[4]: /logs/processing/attributes_naming_convention/
[5]: /getting_started/tagging/
[6]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/blob/develop/NATIVE_SDK_VERSIONS.md
