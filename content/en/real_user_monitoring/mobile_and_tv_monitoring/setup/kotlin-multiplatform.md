---
title: RUM Kotlin Multiplatform Monitoring Setup
is_beta: true
private: true
description: Collect RUM data from your Kotlin Multiplatform projects.
aliases:
    - /real_user_monitoring/kotlin-multiplatform/
    - /real_user_monitoring/kotlin-multiplatform/setup
code_lang: kotlin-multiplatform
type: multi-code-lang
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: "Source Code"
  text: Source code for dd-sdk-kotlin-multiplatform
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## Overview

{{< beta-callout url="#" btn_hidden="true" >}}
Kotlin Multiplatform Monitoring is in Preview.
{{< /beta-callout >}}

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

The Datadog Kotlin Multiplatform SDK supports Android 5.0+ (API level 21) and iOS v12+.

## Setup

1. Declare the Datadog RUM SDK as a dependency.
2. Add native dependencies for iOS.
3. Specify application details in the UI.
4. Initialize the Datadog SDK.
5. Enable RUM to start sending data.
6. Initialize the RUM Ktor plugin to track network events made with Ktor.

### Declare the Datadog RUM SDK as a dependency

Declare [`dd-sdk-kotlin-multiplatform-rum`][1] as a common source set dependency in your Kotlin Multiplatform module's `build.gradle.kts` file.

```kotlin
kotlin {
  // declare targets
  // ...

  sourceSets {
    // ...
    commonMain.dependencies {
      implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-rum:<latest_version>")
    }
  }
}
```

### Add native dependencies for iOS

**Note**: Kotlin 2.0.20 or higher is required if crash tracking is enabled on iOS. Otherwise, due to the compatibility with `PLCrashReporter`, the application may hang if crash tracking is enabled.

Add the following Datadog iOS SDK dependencies, which are needed for the linking step:

* `DatadogObjc`
* `DatadogCrashReporting`

**Note**: Versions of these dependencies should be aligned with the version used by the Datadog Kotlin Multiplatform SDK itself.

| Datadog Kotlin Multiplatform SDK version | Datadog iOS SDK version |
|------------------------------------------|-------------------------| 
| 0.0.1                                    | 2.14.1                  |
| 0.0.2                                    | 2.17.0                  |
| 0.0.3                                    | 2.17.0                  |

#### Adding native iOS dependencies using the CocoaPods plugin

If you are using Kotlin Multiplatform library as a CocoaPods dependency for your iOS application, you can add dependencies as following:

```kotlin
cocoapods {
   // ...

   framework {
     baseName = "sharedLib"
   }

   pod("DatadogObjc") {
     linkOnly = true
     version = 2.17.0
   }

   pod("DatadogCrashReporting") {
     linkOnly = true
     version = 2.17.0
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

### Specify application details in the UI

1. Navigate to [**Digital Experience** > **Add an Application**][2].
2. Select `Kotlin Multiplatform` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM Kotlin Multiplatform Data Collected][10].

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][3] to configure the Datadog SDK, they would be exposed client-side in the Android application's APK byte code. 

For more information about setting up a client token, see the [Client Token documentation][4].

### Initialize Datadog SDK

In the initialization snippet, set an environment name. For Android, set a variant name if it exists. For more information, see [Using Tags][9].

See [`trackingConsent`](#set-tracking-consent-gdpr-compliance) to add GDPR compliance for your EU users, and [other configuration options][6] to initialize the library.

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
        .trackCrashes(true)
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

### Sample RUM sessions

To control the data your application sends to Datadog RUM, you can specify a sample rate for RUM sessions while [initializing the RUM feature][2] as a percentage between 0 and 100.

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

### Enable RUM to start sending data

```kotlin
// in a common source set
fun initializeRum(applicationId: String) {
    val rumConfiguration = RumConfiguration.Builder(applicationId)
            .trackLongTasks(durationThreshold)
            .apply {
                // platform specific setup
                rumPlatformSetup(this)
            }
            .build()

    Rum.enable(rumConfiguration)
}

internal expect fun rumPlatformSetup(rumConfigurationBuilder: RumConfiguration.Builder)

// in iOS source set
internal actual fun rumPlatformSetup(rumConfigurationBuilder: RumConfiguration.Builder) {
    with(rumConfigurationBuilder) {
        trackUiKitViews()
        trackUiKitActions()
        // check more iOS-specific methods
    }
}

// in Android source set
internal actual fun rumPlatformSetup(rumConfigurationBuilder: RumConfiguration.Builder) {
    with(rumConfigurationBuilder) {
        useViewTrackingStrategy(/** choose view tracking strategy **/)
        trackUserInteractions()
        // check more Android-specific methods
    }
}
```

See [Automatically track views][5] to enable automatic tracking of all your views.

### Set tracking consent (GDPR compliance)

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

### Initialize the RUM Ktor plugin to track network events made with Ktor

1. Add the Gradle dependency to the `dd-sdk-kotlin-multiplatform-ktor` library in the your `build.gradle.kts` file:

```kotlin
kotlin {
    // ...
    sourceSets {
        // ...
        commonMain.dependencies {
            implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-ktor:x.x.x")
        }
    }
}
```

2. To track your Ktor requests as resources, add the provided [Datadog Ktor plugin][7]:

```kotlin
val ktorClient = HttpClient {
    install(
        datadogKtorPlugin(
            tracedHosts = mapOf(
                "example.com" to setOf(TracingHeaderType.DATADOG),
                "example.eu" to setOf(TracingHeaderType.DATADOG)
            ),
            traceSamplingRate = 100f
        )
    )
}
```

This records each request processed by the `HttpClient` as a resource in RUM, with all the relevant information automatically filled (URL, method, status code, and error). Only the network requests that started when a view is active are tracked. To track requests when your application is in the background, [create a view manually][8] or enable [background view tracking](#track-background-events).

## Track background events

You can track events such as crashes and network requests when your application is in the background (for example, no active view is available). 

Add the following snippet during RUM configuration:

```kotlin
.trackBackgroundEvents(true)
```
<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

## Track errors

[Kotlin Multiplatform Crash Reporting and Error Tracking][11] displays any issues in your application and the latest available errors. You can view error details and attributes including JSON in the [RUM Explorer][12].

## Sending data when device is offline

RUM ensures availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches. 

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.
 
This means that even if users open your application while offline, no data is lost. To ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/features/rum
[2]: https://app.datadoghq.com/rum/application/create
[3]: /account_management/api-app-keys/#api-keys
[4]: /account_management/api-app-keys/#client-tokens
[5]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/kotlin-multiplatform/#automatically-track-views
[6]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/kotlin-multiplatform/#initialization-parameters
[7]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/integrations/ktor
[8]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/kotlin-multiplatform/#custom-views
[9]: /getting_started/tagging/using_tags/
[10]: /real_user_monitoring/kotlin-multiplatform/data_collected/
[11]: /real_user_monitoring/error_tracking/kotlin-multiplatform/
[12]: /real_user_monitoring/explorer/
