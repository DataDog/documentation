---
title: Android Log Collection
kind: documentation
description: Collect logs from your Android applications.
further_reading:
- link: "https://github.com/DataDog/dd-sdk-android"
  tag: Source Code
  text: dd-sdk-android Source code
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs
---

## Overview

Send logs to Datadog from your Android applications with [Datadog's `dd-sdk-android-logs` client-side logging library][1] and leverage the following features:

* Log to Datadog in JSON format natively.
* Add `context` and extra custom attributes to each log sent.
* Forward Java or Kotlin caught exceptions.
* Record real client IP addresses and User-Agents.
* Optimized network usage with automatic bulk posts.

## Setup

1. Add the Gradle dependency by declaring the library as a dependency in the module-level `build.gradle` file. Make sure to replace `x.x.x` in the following example with the latest version of [dd-sdk-android-logs][2].

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-logs:x.x.x"
    }
    ```

2. Initialize Datadog SDK with your application context, tracking consent, as well as the [Datadog client token][3]. For security reasons, you must use a client token; you cannot use [Datadog API keys][4] to configure the Datadog SDK, as they would be exposed client-side in the Android application APK byte code.

   The `APP_VARIANT_NAME` specifies the variant of the application that generates data. This is required in the initialization credentials; use your `BuildConfig.FLAVOR` value or an empty string if you do not have variants. The appropriate ProGuard `mapping.txt` file will be automatically uploaded at build time, allowing you to view de-obfuscated error stack traces. For more information, see [Android Crash Reporting and Error Tracking][5].

   For more information about setting up a client token, see the [client token documentation][3].

   {{< site-region region="us" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                   clientToken = <CLIENT_TOKEN>,
                   env = <ENV_NAME>,
                   variant = <APP_VARIANT_NAME>
               ).build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="eu" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.EU1)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.EU1)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="us3" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.US3)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US3)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="us5" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.US5)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US5)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="gov" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.US1_FED)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US1_FED)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="ap1" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.AP1)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.AP1)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   To be compliant with the GDPR regulation, the SDK requires the tracking consent value at initialization.
   The tracking consent can be one of the following values:
   * `TrackingConsent.PENDING`: The SDK starts collecting and batching the data but does not send it to the data
     collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
   * `TrackingConsent.GRANTED`: The SDK starts collecting the data and sends it to the data collection endpoint.
   * `TrackingConsent.NOT_GRANTED`: The SDK does not collect any data. You will not be able to manually send any logs, traces, or
     RUM events.

   To update the tracking consent after the SDK is initialized, call: `Datadog.setTrackingConsent(<NEW CONSENT>)`.
   The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.PENDING` and you update it to:
   * `TrackingConsent.GRANTED`: The SDK sends all current batched data and future data directly to the data collection endpoint.
   * `TrackingConsent.NOT_GRANTED`: The SDK wipes all batched data and does not collect any future data.

   Use the utility method `isInitialized` to check if the SDK is properly initialized:

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```

   When writing your application, you can enable development logs by calling the `setVerbosity` method. All internal messages in the library with a priority equal to or higher than the provided level are then logged to Android's Logcat:
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. Configure and enable Logs feature:

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logsConfig = LogsConfiguration.Builder().build()
        Logs.enable(logsConfig)
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        LogsConfiguration logsConfig = new LogsConfiguration.Builder().build();
        Logs.enable(logsConfig);
   ```
   {{% /tab %}}
   {{< /tabs >}}

4. Configure the Android Logger:

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logger = Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build()
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        Logger logger = new Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

5. Send a custom log entry directly to Datadog with one of the following functions:

    ```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning...")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
    ```

6. Exceptions caught can be sent with a message:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       try { 
           doSomething() 
       } catch (e: IOException) {
           logger.e("Error while doing something", e) 
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       try {
           doSomething();
       } catch (IOException e) {
           logger.e("Error while doing something", e);
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}

    **Note**: All logging methods can have a throwable attached to them.

7. (Optional) Provide a map alongside your log message to add attributes to the emitted log. Each entry of the map is added as an attribute.

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       logger.i("onPageStarted", attributes = mapOf("http.url" to url))
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       Map<String, Object> attributes = new HashMap<>();
       attributes.put("http.url", url);
       logger.i("onPageStarted", null, attributes);
   ```
   {{% /tab %}}
   {{< /tabs >}}

8. If you need to modify some attributes in your Log events before batching you can do so by providing an implementation of `EventMapper<LogEvent>` when initializing Logs feature:

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       val logsConfig = LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       LogsConfiguration logsConfig = new LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **Note**: If you return null or a different instance from the `EventMapper<LogEvent>` implementation, the event will be dropped.

## Advanced logging

### Logger initialization

The following methods in `Logger.Builder` can be used when initializing the logger to send logs to Datadog:

| Method                           | Description                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | Add the `network.client.connectivity` attribute to all logs. The data logged by default is `connectivity` (`Wifi`, `3G`, `4G`...) and `carrier_name` (`AT&T - US`). `carrier_name` is only available for Android API level 28+.                                     |
| `setService(<SERVICE_NAME>)` | Set `<SERVICE_NAME>` as value for the `service` [standard attribute][6] attached to all logs sent to Datadog.                                                                                                                                                           |
| `setLogcatLogsEnabled(true)`     | Set to `true` to use Logcat as a logger.                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| Set to `true` (default) to bundle the logs with the active trace in your application. This parameter lets you display all the logs sent during a specific trace by using the Datadog dashboard.                                                        |
| `setBundleWithRumEnabled(true)`| Set to `true` (default) to bundle the logs with the current RUM context in your application. This parameter lets you display all the logs sent while a specific View is active by using the Datadog RUM Explorer.                                                        |
| `setName(<LOGGER_NAME>)`   | Set `<LOGGER_NAME>` as the value for the `logger.name` attribute attached to all logs sent to Datadog.                                                                                                                                                                  |
| `setRemoteSampleRate(<SAMPLE_RATE>)`   | Set the sampling rate for this logger. All the logs produced by the logger instance are randomly sampled according to the provided sample rate (default 1.0 = all logs). **Note**: The Logcat logs are not sampled.            |
| `build()`                        | Build a new logger instance with all options set.                                                                                                                                                                                                                       |

### Global configuration

Find below functions to add/remove tags and attributes to all logs sent by a given logger.

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

For more information, see [Getting Started with Tags][7].

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

The `<ATTRIBUTE_VALUE>` can be any primitive, `String`, or Date.

##### Remove attributes

Use the `removeAttribute("<ATTRIBUTE_KEY>", "<ATTRIBUTE_VALUE>")` function to remove a custom attribute from all logs sent by a specific logger:

```kotlin
// This removes the attribute "version_code" from all further log send.
logger.removeAttribute("version_code")

// This removes the attribute "version_name" from all further log send.
logger.removeAttribute("version_name")
```

## Batch collection

All the logs are first stored on the local device in batches. Each batch follows the intake specification. They are sent as soon as network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while being offline, no data will be lost.

The data on disk will automatically be discarded if it gets too old to ensure the SDK does not use too much disk space.

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. This cache folder is protected by [Android's Application Sandbox][8], meaning that on most devices this data cannot be read by other applications. However, if the mobile device is rooted, or someone tempers with the Linux kernel, the stored data might become readable.

## Extensions

### Timber

If your existing codebase is using Timber, you can forward all those logs to Datadog automatically by using the [dedicated library][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-logs
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/CHANGELOG.md
[3]: /account_management/api-app-keys/#client-tokens
[4]: /account_management/api-app-keys/#api-keys
[5]: /real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[6]: /logs/processing/attributes_naming_convention/
[7]: /getting_started/tagging/
[8]: https://source.android.com/security/app-sandbox
[9]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-timber
