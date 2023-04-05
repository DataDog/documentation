---
title: RUM Android and Android TV Monitoring
kind: documentation
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Github
  text: dd-sdk-android Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

The Datadog Android SDK supports Android 4.4 (API level 19)+ and Android TV.

## Setup

1. Declare the SDK as a dependency.
2. Specify application details in the UI.
3. Initialize the library with application context.
4. Initialize the RUM Monitor and Interceptor to start sending data.

### Declare the SDK as a dependency

Declare [dd-sdk-android][1] and the [Gradle plugin][12] as a dependency in your **application module's** `build.gradle` file.

```
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
    implementation "com.datadoghq:dd-sdk-android:x.x.x" 
    //(...)
}

```

### Specify application details in the UI

1. Navigate to [**UX Monitoring** > **RUM Applications** > **New Application**][2].
2. Select `android` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To instrument your web views, click the **Instrument your webviews** toggle. For more information, see [Web View Tracking][13].
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM Android Data Collected][15].

   {{< img src="real_user_monitoring/android/android-new-application.png" alt="Create a RUM application for Android in Datadog" style="width:90%;">}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][3] to configure the `dd-sdk-android` library, they would be exposed client-side in the Android application's APK byte code. 

For more information about setting up a client token, see the [Client Token documentation][4].

### Initialize the library with application context

In the initialization snippet, set an environment name, service name, and version number. In the examples below, `APP_VARIANT_NAME` specifies the variant of the application that generates data. For more information, see [Using Tags][14].

See [`ViewTrackingStrategy`][5] to enable automatic tracking of all your views (activities, fragments, and more), [`trackingConsent`][6] to add GDPR compliance for your EU users, and [other configuration options][7] to initialize the library.

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.US1)
            .trackInteractions()
            .trackLongTasks(durationThreshold)
            .useViewTrackingStrategy(strategy)
            .build()
        val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
        Datadog.initialize(this, credentials, configuration, trackingConsent)
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
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.US1)
                        .build();
            final Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
            Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.EU1)
            .trackInteractions()
            .trackLongTasks(durationThreshold)
            .useViewTrackingStrategy(strategy)
            .build()
        val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
        Datadog.initialize(this, credentials, configuration, trackingConsent)
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
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.EU1)
                        .build();
        Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
        Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.US3)
            .trackInteractions()
            .trackLongTasks(durationThreshold)
            .useViewTrackingStrategy(strategy)
            .build()
        val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
        Datadog.initialize(this, credentials, configuration, trackingConsent)
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
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.US3)
                        .build();
        Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
        Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.US5)
            .trackInteractions()
            .trackLongTasks(durationThreshold)
            .useViewTrackingStrategy(strategy)
            .build()
        val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
        Datadog.initialize(this, credentials, configuration, trackingConsent)
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
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.US5)
                        .build();
        Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
        Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.US1_FED)
            .trackInteractions()
            .trackLongTasks(durationThreshold)
            .useViewTrackingStrategy(strategy)
            .build()
        val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
        Datadog.initialize(this, credentials, configuration, trackingConsent)
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
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.US1_FED)
                        .build();
        Credentials credentials = new Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>);
        Datadog.initialize(this, credentials, configuration, trackingConsent); 
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

The initialization credentials require your application's variant name and uses the value of `BuildConfig.FLAVOR`. With the variant, RUM can match the errors reported from your application with the mapping files uploaded by the Gradle plugin. If you do not have variants, the credentials use an empty string. 

The Gradle plugin automatically uploads the appropriate ProGuard `mapping.txt` file at build time so you can view deobfuscated RUM error stack traces. For more information, see the [Track Android Errors][8].

### Initialize the RUM Monitor and Interceptor

Configure and register the RUM Monitor. You only need to do it once in your application's `onCreate()` method.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val monitor = RumMonitor.Builder().build()
GlobalRum.registerIfAbsent(monitor)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final RumMonitor monitor = new RumMonitor.Builder().build();
GlobalRum.registerIfAbsent(monitor);
```
{{% /tab %}}
{{< /tabs >}}

To track your OkHttp requests as resources, add the provided [Interceptor][9]:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient =  OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final OkHttpClient okHttpClient =  new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

This records each request processed by the `OkHttpClient` as a resource in RUM, with all the relevant information automatically filled (URL, method, status code, and error). Only the network requests that started when a view is active are tracked. To track requests when your application is in the background, [create a view manually][10].

**Note**: If you also use multiple Interceptors, call `DatadogInterceptor` first.

You can also add an `EventListener` for the `OkHttpClient` to [automatically track resource timing][11] for third-party providers and network requests.

### Track background events

You can track events such as crashes and network requests when your application is in the background (for example, no active view is available). 

Add the following snippet during initialization in your Datadog configuration:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
.trackBackgroundRumEvents(true)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
.trackBackgroundRumEvents(true)
```
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://app.datadoghq.com/rum/application/create
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#client-tokens
[5]: /real_user_monitoring/android/advanced_configuration/#automatically-track-views
[6]: /real_user_monitoring/android/troubleshooting/#set-tracking-consent-gdpr-compliance
[7]: /real_user_monitoring/android/advanced_configuration/#initialization-parameters
[8]: /real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[9]: https://square.github.io/okhttp/interceptors/
[10]: /real_user_monitoring/android/advanced_configuration/#custom-views
[11]: /real_user_monitoring/android/advanced_configuration/#automatically-track-network-requests
[12]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[13]: /real_user_monitoring/android/web_view_tracking/
[14]: /getting_started/tagging/using_tags/#rum--session-replay
[15]: /real_user_monitoring/android/data_collected/
