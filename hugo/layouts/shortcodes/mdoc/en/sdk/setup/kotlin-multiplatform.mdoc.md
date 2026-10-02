<!--
This partial contains setup instructions for the Kotlin Multiplatform SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your applications with the Datadog Kotlin Multiplatform SDK.

The Kotlin Multiplatform SDK supports [Real User Monitoring (RUM)][1], [Error Tracking][2], [Session Replay][3], and [Product Analytics][4], and works with Android 5.0+ (API level 21) and iOS v12+.

## Setup

{% stepper level="h4" %}

{% step title="Add the dependencies" %}
Declare [`dd-sdk-kotlin-multiplatform-rum`][5] as a common source set dependency in your Kotlin Multiplatform module's `build.gradle.kts` file.

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

Then, add the native dependencies for iOS.

{% alert level="info" %}
Kotlin 2.0.20 or higher is required if crash tracking is enabled on iOS. Otherwise, due to the compatibility with `PLCrashReporter`, the application may hang if crash tracking is enabled.
{% /alert %}

Add the following Datadog iOS SDK dependencies, which are needed for the linking step:

* `DatadogCore`
* `DatadogRUM`
* `DatadogCrashReporting`

**Note**: Versions of these dependencies should be aligned with the version used by the Datadog Kotlin Multiplatform SDK itself. You can find the complete mapping of iOS SDK versions for each Kotlin Multiplatform SDK release in the [version compatibility guide][7]. If you are using Kotlin Multiplatform SDK version 1.3.0 or below, add `DatadogObjc` dependency instead of `DatadogCore` and `DatadogRUM`.

##### Add native iOS dependencies using the CocoaPods plugin

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

   pod("DatadogRUM") {
     linkOnly = true
     version = x.x.x
   }

   pod("DatadogCrashReporting") {
     linkOnly = true
     version = x.x.x
   }
}
```

##### Add native iOS dependencies using Xcode

If you are integrating Kotlin Multiplatform library as a framework with an `embedAndSignAppleFrameworkForXcode` Gradle task as a part of your Xcode build, you can add the necessary dependencies directly in Xcode as following:

1. Click on your project in Xcode and go to the {% ui %}Package Dependencies{% /ui %} tab.
2. Add the iOS SDK package dependency by adding `https://github.com/DataDog/dd-sdk-ios.git` as a package URL.
3. Select the version that matches your Kotlin Multiplatform SDK version in the [version compatibility guide][7].
4. Click on the necessary application target and open the {% ui %}General{% /ui %} tab.
5. Scroll down to the {% ui %}Frameworks, Libraries, and Embedded Content{% /ui %} section and add the dependencies mentioned above.
{% /step %}

{% step title="Initialize the SDK" %}

In the initialization snippet, set an environment name. For Android, set a variant name if it exists. For more information, see [Using Tags][6]. See [other configuration options][8] to initialize the library.

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
    ){% region-param key="kotlin_multiplatform_site_config" /%}
        .build()

    Datadog.initialize(context, configuration, trackingConsent)
}
```
{% /step %}

{% step title="Configure tracking consent (GDPR compliance)" %}

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
{% /step %}

{% step title="Enable RUM to start sending data" %}

To start sending RUM data, see [Enable the Datadog RUM module][9].
{% /step %}

{% /stepper %}

## Sending data when device is offline

RUM keeps data available when your user device is offline. In case of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches. 

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough that the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.
 
This means that even if users open your application while offline, no data is lost. To keep the SDK from using too much disk space, the data on the disk is automatically discarded if it gets too old.

[1]: /real_user_monitoring/
[2]: /error_tracking/frontend/mobile/kotlin-multiplatform/
[3]: /session_replay/mobile/
[4]: /product_analytics/
[5]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/features/rum
[6]: /getting_started/tagging/using_tags/
[7]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/blob/develop/NATIVE_SDK_VERSIONS.md
[8]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=kotlin_multiplatform#initialization-parameters
[9]: /real_user_monitoring/setup/enable_rum/?platform=kotlin_multiplatform
