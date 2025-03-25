---
title: Android and Android TV Monitoring Setup
description: Collect RUM and Error Tracking data from your Android projects.
aliases:
    - /real_user_monitoring/android/
    - /real_user_monitoring/setup/android
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration
  tag: Documentation
  text: RUM Android Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## Overview

This page describes how to instrument your applications for both [Real User Monitoring (RUM)][1] or [Error Tracking][2] with the Android SDK. You can follow the steps below to instrument your applications for RUM (includes Error Tracking), or Error Tracking if you have purchased it as a standalone product.

The Datadog Android SDK supports Android 5.0+ (API level 21) and Android TV.

## Setup

To start sending RUM or Error Tracking data from your Android or Android TV application to Datadog:

### Step 1 - Declare the Android SDK as a dependency

Declare [dd-sdk-android-rum][3] and the [Gradle plugin][4] as dependencies in your **application module's** `build.gradle` file.

```groovy
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
android {
    //(...)
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-rum:x.x.x" 
    //(...)
}

```

### Step 2 - Specify application details in the UI

{{< tabs >}}
{{% tab "RUM" %}}

1. Navigate to [**Digital Experience** > **Add an Application**][1].
2. Select `android` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To instrument your web views, click the **Instrument your webviews** toggle. For more information, see [Web View Tracking][2].
4. To disable automatic user data collection for either client IP or geolocation data, use the toggles for those settings. For more information, see [RUM Android Data Collected][3].

   {{< img src="real_user_monitoring/android/android-new-application.png" alt="Create a RUM application for Android in Datadog" style="width:90%;">}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/android/web_view_tracking/
[3]: /real_user_monitoring/android/data_collected/

{{% /tab %}}
{{% tab "Error Tracking" %}}

1. Navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][1].
2. Select `android` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To instrument your web views, click the **Instrument your webviews** toggle. For more information, see [Web View Tracking][2].
4. To disable automatic user data collection for either client IP or geolocation data, use the toggles for those settings. For more information, see [Android Data Collected][3].

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application-1.png" alt="Create an application for Android in Datadog" style="width:90%;">}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /real_user_monitoring/android/web_view_tracking/
[3]: /real_user_monitoring/android/data_collected/

{{% /tab %}}
{{< /tabs >}}

For more information about setting up a client token, see the [Client Token documentation][6].

### Step 3 - Initialize the Datadog SDK with application context

#### Update the initialization snippet

In the initialization snippet, set an environment name, service name, and version number. In the examples below, `APP_VARIANT_NAME` specifies the variant of the application that generates data. For more information, see [Using Tags][7].

During initialization, you can also set the sample rate (RUM sessions) and set the tracking consent for GDPR compliance, as described below. See [other configuration options][8] to initialize the library.

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

The initialization credentials require your application's variant name and use the value of `BuildConfig.FLAVOR`. With the variant, the SDK can match the errors reported from your application to the mapping files uploaded by the Gradle plugin. If you do not have variants, the credentials use an empty string.

The Gradle plugin automatically uploads the appropriate ProGuard `mapping.txt` file at build time so you can view deobfuscated error stack traces. For more information, see the [Track Android Errors][9].

#### Sample session rates

<div class="alert alert-warning">Configuring the session sample rate does not apply to Error Tracking.</div>

To control the data your application sends to Datadog, you can specify a sample rate for sessions when [initializing RUM][8]. The sample rate is a percentage between 0 and 100. By default, `sessionSamplingRate` is set to 100 (keep all sessions).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

#### Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation, the SDK requires the tracking consent value upon initialization.

Tracking consent can be one of the following values:

- `TrackingConsent.PENDING`: (Default) The SDK starts collecting and batching the data but does not send it to the
 collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `TrackingConsent.GRANTED`: The SDK starts collecting the data and sends it to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK does not collect any data. You are not able to manually send any logs, traces, or events.

To **update the tracking consent** after the SDK is initialized, call `Datadog.setTrackingConsent(<NEW CONSENT>)`. The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.PENDING` and you update it to:

- `TrackingConsent.GRANTED`: The SDK sends all current batched data and future data directly to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK wipes all batched data and does not collect any future data.

### Step 4 - Enable the feature to start sending data

To enable the Android SDK to start sending data:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
    val rumConfig = RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
      .useViewTrackingStrategy(strategy)
      .build()
    Rum.enable(rumConfig)
```
{{% /tab %}}

{{% tab "Java" %}}
```java
    RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
      .useViewTrackingStrategy(strategy)
      .build();
    Rum.enable(rumConfig);
```

{{% /tab %}}
{{< /tabs >}}

See [`ViewTrackingStrategy`][10] to enable automatic tracking of all your views (activities, fragments, and more).

### Step 5 - Initialize the Interceptor to track network events

To initialize an interceptor for tracking network events:

1. For distributed tracing, [add and enable the Trace feature][11].
2. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. To track your OkHttp requests as resources, add the provided [Interceptor][12]:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHostsWithHeaderType = mapOf(
    "example.com" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT),
    "example.eu" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT))
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
Map<String, Set<TracingHeaderType>> tracedHostsWithHeaderType = new HashMap<>();
Set<TracingHeaderType> datadogAndW3HeadersTypes = new HashSet<>(Arrays.asList(TracingHeaderType.DATADOG, TracingHeaderType.TRACECONTEXT));
tracedHostsWithHeaderType.put("example.com", datadogAndW3HeadersTypes);
tracedHostsWithHeaderType.put("example.eu", datadogAndW3HeadersTypes);
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

This records each request processed by the `OkHttpClient` as a resource, with all the relevant information (URL, method, status code, and error) automatically filled in. Only the network requests that started when a view is active are tracked. To track requests when your application is in the background, [create a view manually][13].

**Note**: If you also use multiple Interceptors, add `DatadogInterceptor` first.

You can also add an `EventListener` for the `OkHttpClient` to [automatically track resource timing][14] for third-party providers and network requests.

## Track background events

You can track events such as crashes and network requests when your application is in the background (for example, no active view is available). 

Add the following snippet during configuration:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

## Sending data when device is offline

The Android SDK ensures availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. 

Each batch follows the intake specification. Batches are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.
 
This means that even if users open your application while offline, no data is lost. To ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

## Kotlin Extensions

### `Closeable` extension

You can monitor `Closeable` instance usage with the `useMonitored` method, which reports errors to Datadog and closes the resource afterwards.

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}

```

### Track local assets as resources

You can track access to the assets by using `getAssetAsRumResource` extension method:

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

Usage of the local resources can be tracked by using `getRawResAsRumResource` extension method:

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]:/real_user_monitoring/
[2]: /error_tracking/
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[4]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[5]: /account_management/api-app-keys/#api-keys
[6]: /account_management/api-app-keys/#client-tokens
[7]: /getting_started/tagging/using_tags/#rum--session-replay
[8]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#initialization-parameters
[9]: /real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[10]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#automatically-track-views
[11]: /tracing/trace_collection/dd_libraries/android/?tab=kotlin
[12]: https://square.github.io/okhttp/interceptors/
[13]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#custom-views
[14]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/#automatically-track-network-requests
