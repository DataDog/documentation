---
title: Upgrade RUM Mobile SDKs
kind: guide
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
- link: '/real_user_monitoring/guide/mobile-sdk-deprecation-policy'
  tag: 'Documentation'
  text: 'Deprecation Policy for Datadog Mobile SDKs'
---

## Overview

Follow this guide to migrate between major versions of the Mobile RUM, Logs, and Trace SDKs. See each SDK's documentation for details on its features and capabilities.

## From v1 to v2
{{< tabs >}}
{{% tab "Android" %}}

The migration from v1 to v2 represents a migration from a monolith SDK into a modular architecture. RUM, Trace, Logs, Session Replay, and so on each have individual modules, allowing you to integrate only what is needed into your application.

SDK v2 offers a unified API layout and naming alignment between the iOS SDK, the Android SDK, and other Datadog products.

SDK v2 enables the usage of [Mobile Session Replay][1] on Android and iOS applications.

[1]: /real_user_monitoring/session_replay/mobile/

{{% /tab %}}
{{% tab "iOS" %}}

The migration from v1 to v2 represents a migration from a monolith SDK into a modular architecture. RUM, Trace, Logs, Session Replay, and so on each have individual modules, allowing you to integrate only what is needed into your application.

SDK v2 offers a unified API layout and naming alignment between the iOS SDK, the Android SDK, and other Datadog products.

SDK v2 enables the usage of [Mobile Session Replay][1] on Android and iOS applications.

[1]: /real_user_monitoring/session_replay/mobile/

{{% /tab %}}
{{% tab "React Native" %}}

The migration from v1 to v2 comes with improved performance.

{{% /tab %}}
{{% tab "Flutter" %}}

The migration from v1 to v2 comes with improved performance and additional features supplied by the v2 Native SDKs.

{{% /tab %}}
{{< /tabs >}}
### Modules
{{< tabs >}}
{{% tab "Android" %}}

Artifacts are modularized in v2. Adopt the following artifacts:

* RUM: `com.datadoghq:dd-sdk-android-rum:x.x.x`
* Logs: `com.datadoghq:dd-sdk-android-logs:x.x.x`
* Trace: `com.datadoghq:dd-sdk-android-trace:x.x.x`
* Session Replay: `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* WebView Tracking: `com.datadoghq:dd-sdk-android-webview:x.x.x`
* OkHttp instrumentation: `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**Note**: If you use NDK Crash Reporting and WebView Tracking, you must add RUM and Logs artifacts to report events to RUM and Logs respectively.

Reference to the `com.datadoghq:dd-sdk-android` artifact should be removed from your Gradle build script, as this artifact doesn't exist anymore.

**Note**: The Maven coordinates of all the other artifacts stay the same.

<div class="alert alert-warning">v2 does not support Android API 19 (KitKat). The minimum SDK supported is now API 21 (Lollipop). Kotlin 1.7 is required. The SDK itself is compiled with Kotlin 1.8, so a compiler of Kotlin 1.6 and below cannot read SDK classes metadata.</div>

Should you encounter an error such as the following:

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

Add the following rules to your build script (more details in the relevant [Stack Overflow issue][2]):

```kotlin
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

See the [Android sample application][3] for an example of how to set up the SDK.

[2]: https://stackoverflow.com/a/75298544
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample

{{% /tab %}}
{{% tab "iOS" %}}

Libraries are modularized in v2. Adopt the following libraries:

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

These come in addition to the existing `DatadogCrashReporting` and `DatadogObjc`.

<details>
  <summary>SPM</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "2.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogWebViewTracking", package: "dd-sdk-ios"),
            ]
        ),
    ]
)
  ```

</details>

<details>
  <summary>CocoaPods</summary>

  ```ruby
  pod 'DatadogCore'
  pod 'DatadogLogs'
  pod 'DatadogTrace'
  pod 'DatadogSessionReplay'
  pod 'DatadogRUM'
  pod 'DatadogCrashReporting'
  pod 'DatadogWebViewTracking'
  pod 'DatadogObjc'
  ```
</details>

<details>
  <summary>Carthage</summary>

  The `Cartfile` stays the same:
  ```
  github "DataDog/dd-sdk-ios"
  ```

  In Xcode, you **must** link the following frameworks:
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

  Then you can select the modules you want to use:
  ```
  DatadogLogs.xcframework
  DatadogTrace.xcframework
  DatadogSessionReplay.xcframework
  DatadogRUM.xcframework
  DatadogCrashReporting.xcframework + CrashReporter.xcframework
  DatadogWebViewTracking.xcframework
  DatadogObjc.xcframework
  ```
</details>

**Note**: When using Crash Reporting and WebView Tracking, you must add the RUM and Logs modules to report events to RUM and Logs respectively.

{{% /tab %}}

{{% tab "React Native" %}}

Update `@datadog/mobile-react-native` in your package.json:

```json
"@datadog/mobile-react-native": "2.0.0"
```

Update your iOS pods:

```bash
(cd ios && bundle exec pod update)
```

If you use a React Native version strictly over `0.67`, use Java version 17. If you use React Native version equal or below ot `0.67`, use Java version 11. To check your Java version, run the following in a terminal:

```bash
java --version
```

### For React Native < 0.73

In your `android/build.gradle` file, specify the `kotlinVersion` to avoid clashes among Kotlin dependencies:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

### For React Native < 0.68

In your `android/build.gradle` file, specify the `kotlinVersion` to avoid clashes among Kotlin dependencies:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

If you are using a version of `com.android.tools.build:gradle` below `5.0` in your `android/build.gradle`, add in your `android/gradle.properties` file:

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### Troubleshooting

#### Android build fails with `Unable to make field private final java.lang.String java.io.File.path accessible`

If your Android build fails with an error like:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

You are using Java 17, which is not compatible with your React Native version. Switch to Java 11 to solve the issue.

#### Android build fails with `Unsupported class file major version 61`

If your Android build fails with an error like:

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:lintVitalRelease'.
> Could not resolve all artifacts for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Failed to transform '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
```

You use a version of Android Gradle Plugin below `5.0`. To fix the issue, add in your `android/gradle.properties` file:

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

#### Android build fails with `Duplicate class kotlin.collections.jdk8.*`

If your Android build fails with an error like:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkReleaseDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

You need to set a Kotlin version for your project to avoid clashes among Kotlin dependencies. In your `android/build.gradle` file, specify the `kotlinVersion`:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Alternatively, you can add the following rules to your build script in your `android/app/build.gradle` file:

```groovy
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

{{% /tab %}}
{{% tab "Flutter" %}}

Update `datadog_flutter_plugin` in your pubspec.yaml:

```yaml
dependencies:
  'datadog_flutter_plugin: ^2.0.0
```

## Troubleshooting

### Duplicate interface (iOS)

If you see this error while building iOS after upgrading to `datadog_flutter_plugin` v2.0:

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

Try performing `flutter clean && flutter pub get` and rebuilding. This usually resolves the issue.

### Duplicate classes (Android)

If you see this error while building Android after the upgrading to `datadog_flutter_plugin` v2.0:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

Make sure that you've updated your version of Kotlin to at least 1.8 in your `build.gradle` file.

{{% /tab %}}

{{< /tabs >}}

### SDK initialization
{{< tabs >}}
{{% tab "Android" %}}
With the extraction of different products into independent modules, the SDK configuration is organized by module.

`com.datadog.android.core.configuration.Configuration.Builder` class has the following changes:

* Client token, env name, variant name (default value is empty string), and service name (default value is application ID taken from the manifest) should be provided in the constructor.
* The `com.datadog.android.core.configuration.Credentials` class is removed.
* `logsEnabled`, `tracesEnabled`, and `rumEnabled` are removed from the constructor in favour of individual product configuration (see below).
* `crashReportsEnabled` constructor argument is removed. You can enable or disable JVM crash reporting with the `Configuration.Builder.setCrashReportsEnabled` method. By default, JVM crash reporting is enabled.
* RUM, Logs, and Trace product configuration methods are removed from `Configuration.Builder` in favor of the individual product configuration (see below).

The `Datadog.initialize` method has the `Credentials` class removed from the list of the arguments.

The `com.datadog.android.plugin` package and all related classes/methods are removed.

### Logs

All the classes related to the Logs product are strictly contained in the `com.datadog.android.log` package.

To use Logs product, import the following artifact:

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

You can enable the Logs product with the following snippet:

```kotlin
val logsConfig = LogsConfiguration.Builder()
    ...
    .build()

Logs.enable(logsConfig)

val logger = Logger.Builder()
    ...
    .build()
```

API changes:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setLogEventMapper`|`com.datadog.android.log.LogsConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomLogsEndpoint`|`com.datadog.android.log.LogsConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.log.Logger.Builder.setLoggerName`|`com.datadog.android.log.Logger.Builder.setName`|
|`com.datadog.android.log.Logger.Builder.setSampleRate`|`com.datadog.android.log.Logger.Builder.setRemoteSampleRate`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|This method has been removed. Use `com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)` instead to disable sending logs to Datadog.|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### Trace

All the classes related to the Trace product are strictly contained in the `com.datadog.android.trace` package (this means that all classes residing in `com.datadog.android.tracing` before have moved).

To use the Trace product, import the following artifact:

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

You can enable the Trace product with the following snippet:

```kotlin
val traceConfig = TraceConfiguration.Builder()
    ...
    .build()

Trace.enable(traceConfig)

val tracer = AndroidTracer.Builder()
    ...
    .build()

GlobalTracer.registerIfAbsent(tracer)
```

API changes:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setSpanEventMapper`|`com.datadog.android.trace.TraceConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomTracesEndpoint`|`com.datadog.android.trace.TraceConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setSamplingRate`|`com.datadog.android.trace.AndroidTracer.Builder.setSampleRate`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setServiceName`|`com.datadog.android.trace.AndroidTracer.Builder.setService`|

### RUM

All classes related to the RUM product are strictly contained in the `com.datadog.android.rum` package.

To use the RUM product, import the following artifact:

```kotlin
implementation("com.datadoghq:dd-sdk-android-rum:x.x.x")
```

You can enable the RUM product with the following snippet:

```kotlin
val rumConfig = RumConfiguration.Builder(rumApplicationId)
    ...
    .build()

Rum.enable(rumConfig)
```

API changes:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumViewEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setViewEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumResourceEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setResourceEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumActionEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setActionEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumErrorEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setErrorEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumLongTaskEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setLongTaskEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomRumEndpoint`|`com.datadog.android.rum.RumConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.event.ViewEventMapper`|`com.datadog.android.rum.event.ViewEventMapper`|
|`com.datadog.android.core.configuration.VitalsUpdateFrequency`|`com.datadog.android.rum.configuration.VitalsUpdateFrequency`|
|`com.datadog.android.core.configuration.Configuration.Builder.trackInteractions`|`com.datadog.android.rum.RumConfiguration.Builder.trackUserInteractions`|
|`com.datadog.android.core.configuration.Configuration.Builder.disableInteractionTracking`|`com.datadog.android.rum.RumConfiguration.Builder.disableUserInteractionTracking`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleTelemetry`|`com.datadog.android.rum.RumConfiguration.Builder.setTelemetrySampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder`|This class has been removed. The RUM monitor is created and registered during the `Rum.enable` call.|
|`com.datadog.android.rum.RumMonitor.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder.setSessionListener`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionListener`|
|`com.datadog.android.rum.RumMonitor.addUserAction`|`com.datadog.android.rum.RumMonitor.addAction`|
|`com.datadog.android.rum.RumMonitor.startUserAction`|`com.datadog.android.rum.RumMonitor.startAction`|
|`com.datadog.android.rum.RumMonitor.stopUserAction`|`com.datadog.android.rum.RumMonitor.stopAction`|
|`com.datadog.android.rum.GlobalRum.registerIfAbsent`|This method has been removed. The RUM monitor is created and registered during the `Rum.enable` call.|
|`com.datadog.android.rum.GlobalRum`|`com.datadog.android.rum.GlobalRumMonitor`|
|`com.datadog.android.rum.GlobalRum.addAttribute`|`com.datadog.android.rum.RumMonitor.addAttribute`|
|`com.datadog.android.rum.GlobalRum.removeAttribute`|`com.datadog.android.rum.RumMonitor.removeAttribute`|

### NDK Crash Reporting

The artifact name stays the same as before: `com.datadoghq:dd-sdk-android-ndk:x.x.x`.

You can enable NDK Crash Reporting with the following snippet:

```kotlin
NdkCrashReports.enable()
```

This configuration replaces the `com.datadog.android.core.configuration.Configuration.Builder.addPlugin` call.

**Note**: You should have RUM and Logs products enabled to receive NDK crash reports in RUM and Logs respectively.

### WebView Tracking

The artifact name stays the same as before: `com.datadoghq:dd-sdk-android-webview:x.x.x`

You can enable WebView Tracking with the following snippet:

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**Note**: You should have RUM and Logs products enabled to receive events coming from WebView in RUM and Logs respectively.

API changes:

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|This method became an `internal` class. Use `WebViewTracking` instead.|
|`com.datadog.android.rum.webview.RumWebChromeClient`|This class was removed. Use `WebViewTracking` instead.|
|`com.datadog.android.rum.webview.RumWebViewClient`|This class was removed. Use `WebViewTracking` instead.|

### OkHttp Tracking

To use OkHttp Tracking, import the following artifact:

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

OkHttp instrumentation supports the initialization of the Datadog SDK after the OkHttp client, allowing you to create `com.datadog.android.okhttp.DatadogEventListener`, `com.datadog.android.okhttp.DatadogInterceptor`, and `com.datadog.android.okhttp.trace.TracingInterceptor` before the Datadog SDK. OkHttp instrumentation starts reporting events to Datadog once the Datadog SDK is initialized.

Both `com.datadog.android.okhttp.DatadogInterceptor` and `com.datadog.android.okhttp.trace.TracingInterceptor` allow you to control sampling dynamically through integration with a remote configuration system.

To dynamically adjust sampling, provide your own implementation of the `com.datadog.android.core.sampling.Sampler` interface in the `com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor` constructor. It is queried for each request to make the sampling decision.

### `dd-sdk-android-ktx` module removal

To improve granularity for the Datadog SDK libraries used, the `dd-sdk-android-ktx` module is removed. The code is distributed between the other modules to provide extension methods for both RUM and Trace features.

| `1.x`                                                                                     | '2.0'                                                                                       | Module name                       |
|-------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------|
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.launchTraced`        | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.launchTraced`       | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#runBlockingTraced`                                     | `com.datadog.android.trace.coroutines#runBlockingTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.asyncTraced`         | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.asyncTraced`        | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.Deferred<T>.awaitTraced`            | `com.datadog.android.trace.coroutines#kotlinx.coroutines.Deferred<T>.awaitTraced`           | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#withContextTraced`                                     | `com.datadog.android.trace.coroutines#withContextTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine.CoroutineScopeSpan`                                    | `com.datadog.android.trace.coroutines.CoroutineScopeSpan`                                   | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `com.datadog.android.trace.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#io.opentracing.Span.setError`                            | `com.datadog.android.trace#io.opentracing.Span.setError`                                    | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#withinSpan`                                              | `com.datadog.android.trace#withinSpan`                                                      | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.coroutine#sendErrorToDatadog`                                    | `com.datadog.android.rum.coroutines#sendErrorToDatadog`                                     | `dd-sdk-android-rum-coroutines`   |
| `com.datadog.android.ktx.rum#java.io.Closeable.useMonitored`                              | `com.datadog.android.rum#java.io.Closeable.useMonitored`                                    | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getAssetAsRumResource`               | `com.datadog.android.rum.resource#android.content.Context.getAssetAsRumResource`            | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getRawResAsRumResource`              | `com.datadog.android.rum.resource#android.content.Context.getRawResAsRumResource`           | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#java.io.InputStream.asRumResource`                           | `com.datadog.android.rum.resource#java.io.InputStream.asRumResource`                        | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.tracing#okhttp3.Request.Builder.parentSpan`                      | `com.datadog.android.okhttp.trace#okhttp3.Request.Builder.parentSpan`                       | `dd-sdk-android-okhttp`           |

### Session Replay

For instructions on setting up Mobile Session Replay, see [Mobile Session Replay Setup and Configuration][4].

[4]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=android

{{% /tab %}}
{{% tab "iOS" %}}

With the extraction of different products into independent modules, the SDK configuration is organized by module.

> The SDK must be initialized before enabling any product.

The Builder pattern of the SDK initialization has been removed in favor of structure definitions. The following example shows how a `1.x` initialization would translate in `2.0`.

**V1 Initialization**
```swift
import Datadog

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
        .builderUsing(
            clientToken: "<client token>",
            environment: "<environment>"
        )
        .set(serviceName: "<service name>")
        .build()
```
**V2 Initialization**
```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

API changes:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.set(serviceName:)`|`Datadog.Configuration.service`|
|`Datadog.Configuration.Builder.set(batchSize:)`|`Datadog.Configuration.batchSize`|
|`Datadog.Configuration.Builder.set(uploadFrequency:)`|`Datadog.Configuration.uploadFrequency`|
|`Datadog.Configuration.Builder.set(proxyConfiguration:)`|`Datadog.Configuration.proxyConfiguration`|
|`Datadog.Configuration.Builder.set(encryption:)`|`Datadog.Configuration.encryption`|
|`Datadog.Configuration.Builder.set(serverDateProvider:)`|`Datadog.Configuration.serverDateProvider`|
|`Datadog.AppContext(mainBundle:)`|`Datadog.Configuration.bundle`|

### Logs

All the classes related to Logs are strictly in the `DatadogLogs` module. You first need to enable the product:

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

Then, you can create a logger instance:

```swift
import DatadogLogs

let logger = Logger.create(
    with: Logger.Configuration(name: "<logger name>")
)
```

API changes:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.setLogEventMapper(_:)`|`Logs.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(loggingSamplingRate:)`|`Logs.Configuration.eventMapper`|
|`Logger.Builder.set(serviceName:)`|`Logger.Configuration.service`|
|`Logger.Builder.set(loggerName:)`|`Logger.Configuration.name`|
|`Logger.Builder.sendNetworkInfo(_:)`|`Logger.Configuration.networkInfoEnabled`|
|`Logger.Builder.bundleWithRUM(_:)`|`Logger.Configuration.bundleWithRumEnabled`|
|`Logger.Builder.bundleWithTrace(_:)`|`Logger.Configuration.bundleWithTraceEnabled`|
|`Logger.Builder.sendLogsToDatadog(false)`|`Logger.Configuration.remoteSampleRate = 0`|
|`Logger.Builder.set(datadogReportingThreshold:)`|`Logger.Configuration.remoteLogThreshold`|
|`Logger.Builder.printLogsToConsole(_:, usingFormat)`|`Logger.Configuration.consoleLogFormat`|

### Trace

All the classes related to Trace are strictly in the `DatadogTrace` module. You first need to enable the product:

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

Then, you can access the shared Tracer instance:

```swift
import DatadogTrace

let tracer = Tracer.shared()
```

API changes:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`Trace.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.setSpanEventMapper(_:)`|`Trace.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(tracingSamplingRate:)`|`Trace.Configuration.sampleRate`|
|`Tracer.Configuration.serviceName`|`Trace.Configuration.service`|
|`Tracer.Configuration.sendNetworkInfo`|`Trace.Configuration.networkInfoEnabled`|
|`Tracer.Configuration.globalTags`|`Trace.Configuration.tags`|
|`Tracer.Configuration.bundleWithRUM`|`Trace.Configuration.bundleWithRumEnabled`|
|`Tracer.Configuration.samplingRate`|`Trace.Configuration.sampleRate`|

### RUM

All the classes related to RUM are strictly in the `DatadogRUM` module. You first need to enable the product:

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>")
)
```

Then, you can access the shared RUM monitor instance:

```swift
import DatadogRUM

let monitor = RUMMonitor.shared()
```

API changes:

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`RUM.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.set(rumSessionsSamplingRate:)`|`RUM.Configuration.sessionSampleRate`|
|`Datadog.Configuration.Builder.onRUMSessionStart`|`RUM.Configuration.onSessionStart`|
|`Datadog.Configuration.Builder.trackUIKitRUMViews(using:)`|`RUM.Configuration.uiKitViewsPredicate`|
|`Datadog.Configuration.Builder.trackUIKitRUMActions(using:)`|`RUM.Configuration.uiKitActionsPredicate`|
|`Datadog.Configuration.Builder.trackRUMLongTasks(threshold:)`|`RUM.Configuration.longTaskThreshold`|
|`Datadog.Configuration.Builder.setRUMViewEventMapper(_:)`|`RUM.Configuration.viewEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceEventMapper(_:)`|`RUM.Configuration.resourceEventMapper`|
|`Datadog.Configuration.Builder.setRUMActionEventMapper(_:)`|`RUM.Configuration.actionEventMapper`|
|`Datadog.Configuration.Builder.setRUMErrorEventMapper(_:)`|`RUM.Configuration.errorEventMapper`|
|`Datadog.Configuration.Builder.setRUMLongTaskEventMapper(_:)`|`RUM.Configuration.longTaskEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceAttributesProvider(_:)`|`RUM.Configuration.urlSessionTracking.resourceAttributesProvider`|
|`Datadog.Configuration.Builder.trackBackgroundEvents(_:)`|`RUM.Configuration.trackBackgroundEvents`|
|`Datadog.Configuration.Builder.trackFrustrations(_:)`|`RUM.Configuration.frustrationsTracking`|
|`Datadog.Configuration.Builder.set(mobileVitalsFrequency:)`|`RUM.Configuration.vitalsUpdateFrequency`|
|`Datadog.Configuration.Builder.set(sampleTelemetry:)`|`RUM.Configuration.telemetrySampleRate`|

### Crash Reporting

To enable Crash Reporting, make sure to enable RUM and Logs to report to those products respectively.

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### WebView Tracking

To enable WebViewTracking, make sure to also enable RUM and Logs to report to those products respectively.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView)
```

|`1.x`|`2.0`|
|---|---|
|`WKUserContentController.startTrackingDatadogEvents`|`WebViewTracking.enable(webView:)`|

### Session Replay

For instructions on setting up Mobile Session Replay, see [Mobile Session Replay Setup and Configuration][5].

[5]: /real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=ios

{{% /tab %}}
{{% tab "React Native" %}}

No change in the SDK initialization is needed.

{{% /tab %}}

{{% tab "Flutter" %}}

## SDK Configuration Changes

Certain configuration properties have been moved or renamed to support modularity in Datadog's native SDKs.

The following structures have been renamed:

| `1.x` | `2.x` |
|-------|-------|
| `DdSdkConfiguration` | `DatadogConfiguration` |
| `LoggingConfiguartion` | `DatadogLoggingConfiguration` |
| `RumConfiguration` | `DatadogRumConfiguration` |
| `DdSdkExistingConfiguration` | `DatadogAttachConfiguration` |

The following properties have changed:

| 1.x | 2.x | Notes |
|-------|-------|-------|
| `DdSdkConfiguration.trackingConsent`| Removed | Part of `Datadog.initialize` | |
| `DdSdkConfiguration.customEndpoint` | Removed | Now configured per-feature | |
| `DdSdkConfiguration.serviceName` | `DatadogConfiguration.service` | |
| `DdSdkConfiguration.logEventMapper` | `DatadogLoggingConfiguration.eventMapper` | |
| `DdSdkConfiguration.customLogsEndpoint` | `DatadogLoggingConfiguration.customEndpoint` | |
| `DdSdkConfiguration.telemetrySampleRate` | `DatadogRumConfiguration.telemetrySampleRate` | |

In addition, the following APIs have changed:

| 1.x | 2.x | Notes |
|-------|-------|-------|
| `Verbosity` | Removed | See `CoreLoggerLevel` or `LogLevel` |
| `DdLogs DatadogSdk.logs` | `DatadogLogging DatadogSdk.logs` | Type changed |
| `DdRum DatadogSdk.rum` | `DatadogRum DatadogSdk.rum` | Type changed
| `Verbosity DatadogSdk.sdkVerbosity` | `CoreLoggerLevel DatadogSdk.sdkVerbosity` |
| `DatadogSdk.runApp` | `DatadogSdk.runApp` | Added `trackingConsent` parameter |
| `DatadogSdk.initialize` | `DatadogSdk.initialize` | Added `trackingConsent` parameter |
| `DatadogSdk.createLogger` | `DatadogLogging.createLogger` | Moved |

## Flutter Web Changes

Clients using Flutter Web should update to using the Datadog Browser SDK v5. Change the following import in your `index.html`:

```diff
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```

**Note**: Datadog provides one CDN bundle per site. See the [Browser SDK README](https://github.com/DataDog/browser-sdk/#cdn-bundles) for a list of all site URLs.

## Logs product changes

As with v1, Datadog Logging can be enabled by setting the `DatadogConfiguration.loggingConfiguration` member. However, unlike v1, Datadog does not create a default logger for you. `DatadogSdk.logs` is now an instance of `DatadogLogging`, which can be used to create logs. Many options were moved to `DatadogLoggerConfiguration` to give developers more granular support over individual loggers.

The following APIs have changed:

| 1.x | 2.x | Notes |
|-------|-------|-------|
| `LoggingConfiguration` | `DatadogLoggingConfiguration` | Renamed most members are now on `DatadogLoggerConfiguration` |
| `LoggingConfiguration.sendNetworkInfo` | `DatadogLoggerConfiguration.networkInfoEnabled` | |
| `LoggingConfiguration.printLogsToConsole` | `DatadogLoggerConfiguration.customConsoleLogFunction` | |
| `LoggingConfiguration.sendLogsToDatadog` | Removed. Use `remoteLogThreshold` instead | |
| `LoggingConfiguration.datadogReportingThreshold` | `DatadogLoggerConfiguration.remoteLogThreshold` | |
| `LoggingConfiguration.bundleWithRum` | `DatadogLoggerConfiguration.bundleWithRumEnabled` | |
| `LoggingConfiguration.bundleWithTrace` | `DatadogLoggerConfiguration.bundleWithTraceEnabled` | |
| `LoggingConfiguration.loggerName` | `DatadogLoggerConfiguration.name` | |
| `LoggingConfiguration.sampleRate` | `DatadogLoggerConfiguration.remoteSampleRate` | |

## RUM Product Changes

The following APIs have changed:

| 1.x | 2.x | Notes |
|-------|-------|-------|
| `RumConfiguration` | `DatadogRumConfiguration` | Type renamed |
| `RumConfiguration.vitalsUpdateFrequency` | `DatadogRumConfiguration.vitalsUpdateFrequency` | Set to `null` to disable vitals updates |
| `RumConfiguration.tracingSampleRate` | `DatadogRumConfiguration.traceSampleRate` |
| `RumConfiguration.rumViewEventMapper` | `DatadogRumConfiguration.viewEventMapper` |
| `RumConfiguration.rumActionEventMapper` | `DatadogRumConfiguration.actionEventMapper` |
| `RumConfiguration.rumResourceEventMapper` | `DatadogRumConfiguration.resourceEventMapper` |
| `RumConfiguration.rumErrorEventMapper` | `DatadogRumConfiguration.rumErrorEventMapper` |
| `RumConfiguration.rumLongTaskEventMapper` | `DatadogRumConfiguration.longTaskEventMapper` |
| `RumUserActionType` | `RumActionType` | Type renamed |
| `DdRum.addUserAction` | `DdRum.addAction` | |
| `DdRum.startUserAction` | `DdRum.startAction` | |
| `DdRum.stopUserAction` | `DdRum.stopAction` | |
| `DdRum.startResourceLoading` | `DdRum.startResource` | |
| `DdRum.stopResourceLoading` | `DdRum.stopResource` | |
| `DdRum.stopResourceLoadingWithError` | `DdRum.stopResourceWithError` | |

Additionally, event mappers no longer allow you to modify their view names. To rename a view, use a custom [`ViewInfoExtractor`](https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html) instead.


{{% /tab %}}

{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
