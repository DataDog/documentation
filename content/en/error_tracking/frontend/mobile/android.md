---
title: Android Crash Reporting and Error Tracking
description: Set up Error Tracking for your Android applications to monitor crashes, exceptions, and application errors.
type: multi-code-lang
code_lang: android
code_lang_weight: 10
further_reading:
- link: /error_tracking/frontend
  tag: Documentation
  text: Frontend Error Tracking
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'

---

## Overview

Android [Error Tracking][1] gives you comprehensive visibility into your mobile app's health by automatically capturing crashes, exceptions, and errors. With this feature, you can:

- Monitor app stability in real-time with instant crash alerts and error rate tracking across versions, devices, and user segments.
- Debug issues faster with deobfuscated stack traces and automatic ProGuard mapping file uploads for easier problem identification.
- Improve app quality by pinpointing crash-prone features, tracking error trends, and prioritizing fixes for better user satisfaction.
- Access aggregated Android crash dashboards and attributes.
- View deobfuscated Android crash reports with trend analysis.

The Datadog Android SDK supports Android 5.0+ (API level 21) and Android TV.

Your crash reports appear in [**Error Tracking**][2].

## Setup

If you have not set up the Android SDK yet, follow the [in-app setup instructions][3] or see the [Android setup documentation][4].

### Step 1 - Declare the Android SDK as a dependency

Declare [dd-sdk-android-rum][5] and the [Gradle plugin][6] as dependencies in your **application module's** `build.gradle` file:

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

1. Navigate to [**Errors** > **Settings** > **Browser and Mobile** > **+ New Application**][7].
2. Select `android` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. Click **Create Application**.



### Step 3 - Initialize the Datadog SDK with application context

#### Update the initialization snippet

In the initialization snippet, set an environment name, service name, and version number. In the examples below, `APP_VARIANT_NAME` specifies the variant of the application that generates data. For more information, see [Using Tags][10].

During initialization, you can also set the sample rate (RUM sessions) and set the tracking consent for GDPR compliance, as described below. See [other configuration options][11] to initialize the library.

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

{{< site-region region="ap2" >}}
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
            .useSite(DatadogSite.AP2)
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
                        .useSite(DatadogSite.AP2)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

The initialization credentials require your application's variant name and use the value of `BuildConfig.FLAVOR`. With the variant, the SDK can match the errors reported from your application to the mapping files uploaded by the Gradle plugin. If you do not have variants, the credentials use an empty string.

The Gradle plugin automatically uploads the appropriate ProGuard `mapping.txt` file at build time so you can view deobfuscated error stack traces. For more information, see the [Upload your mapping file](#upload-your-mapping-file) section.

#### Enable the feature to start sending data

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

See [`ViewTrackingStrategy`][12] to enable automatic tracking of all your views (activities, fragments, and more).

#### Instrument your webviews (optional)

If your Android application uses WebViews to display web content, you can instrument them to track JavaScript errors and crashes that occur within the web content.

To instrument your web views:

1. Add the Gradle dependency by declaring the dd-sdk-android-webview as dependency in your build.gradle file:

   ```groovy
   dependencies {
    implementation "com.datadoghq:dd-sdk-android-webview:<latest_version>"
   }
   ```
2. Enable webview tracking for a given WebView instance by providing a list of hosts to track:

   ```groovy
   WebViewTracking.enable(webView, hosts)
   ```

For more information, see [Web View Tracking][8].

### Step 4 - Add NDK crash reporting

If your Android app uses native code (C/C++) through the Android NDK (Native Development Kit), you can track crashes that occur in this native code. Native code is often used for performance-critical operations, image processing, or when reusing existing C/C++ libraries.

Without NDK crash reporting, crashes in your native code do not appear in Error Tracking, making it difficult to debug issues in this part of your application.

To enable NDK crash reporting, use the Datadog NDK plugin:

1. Add the Gradle dependency by declaring the library as a dependency in your `build.gradle` file:

   ```kotlin
    dependencies {
        implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
        //(...)
    }
   ```
2. Enable NDK crash collection after initializing the SDK:

    ``` kotlin
    NdkCrashReports.enable()
    ```

### Step 5 - Add ANR reporting

An "Application Not Responding" ([ANR][18]) is an Android-specific type of error that gets triggered when the application is unresponsive for too long. You can add ANR reporting to your RUM configuration to monitor these application responsiveness issues.

To enable ANR reporting, add the following to your RUM configuration:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .trackInteractions()
    .trackLongTasks(durationThreshold)
    .trackNonFatalAnrs(true) // Enable non-fatal ANR reporting
    .useViewTrackingStrategy(strategy)
    .build()
Rum.enable(rumConfig)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    .trackInteractions()
    .trackLongTasks(durationThreshold)
    .trackNonFatalAnrs(true) // Enable non-fatal ANR reporting
    .useViewTrackingStrategy(strategy)
    .build();
Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

ANRs are only reported through the SDK (not through Logs).

#### Reporting fatal ANRs
Fatal ANRs result in crashes. The application reports them when it's unresponsive, leading to the Android OS displaying a popup dialog to the user, who chooses to force quit the app through the popup.

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="A fatal crash report in Error Tracking." >}}

- In the **Error Tracking** page, fatal ANRs are grouped based on their similarity, which can result in several **individual issues** being created.
- By default, Datadog catches fatal ANRs through the [ApplicationExitInfo API][19] (available since *[Android 30+][20]*), which can be read on the next app launch.
- In *[Android 29][21] and below*, reporting on fatal ANRs is not possible.

#### Reporting non-fatal ANRs
Non-fatal ANRs may or may not have led to the application being terminated (crashing).

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="A non-fatal crash report in Error Tracking." >}}

- In the **Error Tracking** page, non-fatal ANRs are grouped under a **single** issue due to their level of noise.
- By default, the reporting of non-fatal ANRs on *Android 30+* is **disabled** because it would create too much noise over fatal ANRs. On *Android 29* and below, however, the reporting of non-fatal ANRs is **enabled** by default, as fatal ANRs cannot be reported on those versions.

For any Android version, you can override the default setting for reporting non-fatal ANRs by setting `trackNonFatalAnrs` to `true` or `false` when initializing the SDK.


###  Step 6 - Get deobfuscated stack traces

When your Android app is built for production, the code is typically obfuscated using ProGuard or R8 to reduce app size and protect intellectual property. This obfuscation makes stack traces in crash reports unreadable, showing meaningless class and method names like `a.b.c()` instead of `com.example.MyClass.myMethod()`.

To make these stack traces readable for debugging, you need to upload your mapping files to Datadog. These files contain the mapping between obfuscated and original code, allowing Datadog to automatically deobfuscate stack traces in your error reports.

#### How it works

Datadog uses a unique build ID generated for each build to automatically match stack traces with the correct mapping files. This ensures that:

- Stack traces are always deobfuscated with the correct mapping file, regardless of when it was uploaded.
- You can upload mapping files during pre-production or production builds.
- The process works seamlessly across different build variants and environments.

The matching process depends on your [Android Gradle plugin][22] version:

- **Versions 1.13.0 and higher**: Uses the `build_id` field (requires Datadog Android SDK 2.8.0 or later)
- **Older versions**: Uses a combination of `service`, `version`, and `variant` fields

#### Upload your mapping file

The Android Gradle plugin automates the mapping file upload process. After configuration, it automatically uploads the appropriate ProGuard/R8 mapping file for each build variant when you build your app.

**Note**: Re-uploading a mapping file does not override the existing one if the version has not changed. For information about file size limitations and other constraints, see the [Limitations](#limitations) section.

#### Run the upload tasks

After configuring the plugin, run the Gradle tasks to upload your Proguard/R8 mapping file and NDK symbol files to Datadog:

```bash
./gradlew uploadMappingRelease
./gradlew uploadNdkSymbolFilesRelease
```

For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.

{{< tabs >}}
{{% tab "US" %}}

1. Add the [Android Gradle Plugin][22] to your Gradle project using the following code snippet.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Create a dedicated Datadog API key][23] and export it as an environment variable named `DD_API_KEY` or `DATADOG_API_KEY`. Alternatively, pass it as a task property, or if you have `datadog-ci.json` file in the root of your project, it can be taken from an `apiKey` property there.
3. Optionally, configure the plugin to upload files to the EU region by configuring the plugin in your `build.gradle` script:
   
   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Run the upload task after your obfuscated APK builds:
    
   ```bash
   ./gradlew uploadMappingRelease
   ```

5. If running native code, run the NDK symbol upload task:
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Note**: If your project uses additional flavors, the plugin provides an upload task for each variant with obfuscation enabled. In this case, initialize the Android SDK with a proper variant name (the necessary API is available in versions `1.8.0` and later).

[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "EU" %}}
1. Add the [Android Gradle Plugin][22] to your Gradle project using the following code snippet.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Create a dedicated Datadog API key][23] and export it as an environment variable named `DD_API_KEY` or `DATADOG_API_KEY`. Alternatively, pass it as a task property, or if you have `datadog-ci.json` file in the root of your project, it can be taken from an `apiKey` property there.
3. Configure the plugin to use the EU region by adding the following snippet in your app's `build.gradle` script file:

   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Run the upload task after your obfuscated APK builds:
   
   ```bash
   ./gradlew uploadMappingRelease
   ```
   
5. If running native code, run the NDK symbol upload task:
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Note**: If your project uses additional flavors, the plugin provides an upload task for each variant with obfuscation enabled. In this case, initialize the Android SDK with a proper variant name (the necessary API is available in versions `1.8.0` and later).

[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

#### List uploaded mapping files

See the [RUM Debug Symbols][24] page to view all uploaded symbols.

## Advanced Error Tracking features

{{% collapse-content title="Set tracking consent (GDPR compliance)" level="h4" expanded=false id="set-tracking-consent" %}}

To be compliant with the GDPR regulation, the SDK requires the tracking consent value upon initialization.

Tracking consent can be one of the following values:

- `TrackingConsent.PENDING`: (Default) The SDK starts collecting and batching the data but does not send it to the
 collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `TrackingConsent.GRANTED`: The SDK starts collecting the data and sends it to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK does not collect any data. You are not able to manually send any logs, traces, or events.

To **update the tracking consent** after the SDK is initialized, call `Datadog.setTrackingConsent(<NEW CONSENT>)`. The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.PENDING` and you update it to:

- `TrackingConsent.GRANTED`: The SDK sends all current batched data and future data directly to the data collection endpoint.
- `TrackingConsent.NOT_GRANTED`: The SDK wipes all batched data and does not collect any future data.

{{% /collapse-content %}}

{{% collapse-content title="Sample session rates" level="h4" expanded=false id="sample-session-rates" %}}

To control the data your application sends to Datadog, you can specify a sample rate for sessions when [initializing RUM][11]. The sample rate is a percentage between 0 and 100. By default, `sessionSamplingRate` is set to 100 (keep all sessions).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

{{% /collapse-content %}}

{{% collapse-content title="Initialize the interceptor to track network events" level="h4" expanded=false id="interceptor" %}}

The network interceptor automatically tracks HTTP requests and responses, capturing network errors, timeouts, and performance issues that can help you correlate network problems with app crashes and user experience issues. To initialize an interceptor for tracking network events:

1. For distributed tracing, [add and enable the Trace feature][13].
2. Add the Gradle dependency to the `dd-sdk-android-okhttp` library in the module-level `build.gradle` file:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. To track your OkHttp requests as resources, add the provided [interceptor][14]:

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

4. To automatically create RUM resources and spans for your OkHttp requests, use the `DatadogInterceptor` as an interceptor.
   - This records each request processed by the `OkHttpClient` as a resource, with all the relevant information (URL, method, status code, and error) automatically filled in. Only the network requests that started when a view is active are tracked. To track requests when your application is in the background, [create a view manually][15].
      
5. To monitor the network redirects or retries, you can use the `DatadogInterceptor` as a [network interceptor][16]:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder()
    .addNetworkInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addNetworkInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

**Notes**:
- To use spans but not RUM resources, you can use the `TracingInterceptor` instead of `DatadogInterceptor` as described above.
- If you use multiple interceptors, add `DatadogInterceptor` first.

You can also add an `EventListener` for the `OkHttpClient` to [automatically track resource timing][17] for third-party providers and network requests.

{{% /collapse-content %}}

{{% collapse-content title="Track background events" level="h4" expanded=false id="track-background-events" %}}

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

{{% /collapse-content %}}

{{% collapse-content title="Sending data when device is offline" level="h4" expanded=false id="sending-data-device-offline" %}}

The Android SDK ensures availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. 

Each batch follows the intake specification. Batches are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.
 
This means that even if users open your application while offline, no data is lost. To ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

{{% /collapse-content %}}

{{% collapse-content title="Plugin configuration options" level="h4" expanded=false id="plugin-config-options" %}}

There are several plugin properties that can be configured through the plugin extension. In case you are using multiple variants, you can set a property value for a specific flavor in the variant.

For example, for a `fooBarRelease` variant, you can use the following configuration:

```kotlin
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
| `site`                     | The Datadog site to upload your data to (US1, US3, US5, EU1, US1_FED, AP1, or AP2).                                                                                                                                       |
| `remoteRepositoryUrl`      | The URL of the remote repository where the source code was deployed. If this is not provided, this value is resolved from your Git configuration during the task execution time.                     |
| `checkProjectDependencies` | This property controls if the plugin should check if the Datadog Android SDK is included in the dependencies. If not, `none` is ignored, `warn` logs a warning, and `fail` fails the build with an error (default). |

{{% /collapse-content %}}

{{% collapse-content title="Integrate with a CI/CD pipeline" level="h4" expanded=false id="plugin-config-options" %}}

By default, the upload mapping task is independent from other tasks in the build graph. Run the task manually when you need to upload mapping.

If you want to run this task in a CI/CD pipeline, and the task is required as part of the build graph, you can set the upload task to run after the mapping file is generated.

For example:

```kotlin
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```
{{% /collapse-content %}}

## Limitations

### File sizing
[Mapping files](#upload-your-mapping-file) are limited in size to **500 MB** each. If your project has a mapping file larger than this, use one of the following options to reduce the file size:

- Set the `mappingFileTrimIndents` option to `true`. This reduces your file size by 5%, on average.
- Set a map of `mappingFilePackagesAliases`: This replaces package names with shorter aliases. **Note**: Datadog's stacktrace uses the same alias instead of the original package name, so it's better to use this option for third party dependencies.

```kotlin
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

### Collection
When looking at RUM Crash Reporting behaviors for Android, consider the following:

- The crash can only be detected after the SDK is initialised. Given this, the recommendation is to initialize the SDK as soon as possible in your application's `onCreate` method.
- RUM crashes must be attached to a RUM view. If a crash occurs before a view is visible (typically an Activity or Fragment in an `onResume` state), or after the app is sent to the background by the end-user navigating away from it, the crash is muted and isn't reported for collection. To mitigate this, use the `trackBackgroundEvents()` [method][25] in your `RumConfiguration` builder.
- Only crashes that occur in sampled sessions are kept. If a [session sampling rate is not 100%][24], some crashes are not reported. 

## Test your implementation

To verify your Android Crash Reporting and Error Tracking configuration, you need to trigger a crash in your application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on an Android emulator or a real device.
2. Execute some code containing an error or crash. For example:

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. After the crash happens, restart your application and wait for the Android SDK to upload the crash report in [**Error Tracking**][2].

## Kotlin extensions

### `Closeable` extension

You can monitor `Closeable` instance usage with the `useMonitored` method, which reports errors to Datadog and closes the resource afterwards:

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

[1]: /error_tracking/
[2]: https://app.datadoghq.com/rum/error-tracking
[3]: https://app.datadoghq.com/rum/application/create
[4]: /real_user_monitoring/application_monitoring/android/setup/#setup
[5]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[6]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[7]: https://app.datadoghq.com/error-tracking/settings/setup/client
[8]: /real_user_monitoring/application_monitoring/android/web_view_tracking/
[9]: /real_user_monitoring/application_monitoring/android/data_collected/
[10]: /getting_started/tagging/using_tags/
[11]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters
[12]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
[13]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/android/
[14]: https://square.github.io/okhttp/features/interceptors/
[15]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#custom-views
[16]: https://square.github.io/okhttp/features/interceptors/#network-interceptors
[17]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
[18]: https://developer.android.com/topic/performance/vitals/anr
[19]: https://developer.android.com/reference/android/app/ApplicationExitInfo
[20]: https://developer.android.com/tools/releases/platforms#11
[21]: https://developer.android.com/tools/releases/platforms#10
[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
[24]: https://app.datadoghq.com/source-code/setup/rum
[25]: /real_user_monitoring/application_monitoring/android/setup/#track-background-events