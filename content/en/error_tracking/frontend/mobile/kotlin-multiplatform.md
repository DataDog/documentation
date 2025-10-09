---
title: Kotlin Multiplatform Crash Reporting and Error Tracking
type: multi-code-lang
code_lang: kotlin-multiplatform
code_lang_weight: 50
---

## Overview

Error Tracking processes errors collected from the Kotlin Multiplatform SDK. 

Enable Kotlin Multiplatform Crash Reporting and Error Tracking to get comprehensive crash reports and error trends. With this feature, you can access:

- Aggregated Kotlin Multiplatform crash dashboards and attributes
- Deobfuscated Kotlin Multiplatform (iOS and Android) crash reports
- Trend analysis with Kotlin Multiplatform error tracking

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the Kotlin Multiplatform SDK yet, follow the [in-app setup instructions][2] or see the [Kotlin Multiplatform setup documentation][3]. Then, follow the steps on this page to enable React Native Crash Reporting and Error Tracking.

**Note**: For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.


### Step 1 - Declare the Kotlin Multiplatform SDK as a dependency

Declare [`dd-sdk-kotlin-multiplatform-rum`][301] as a common source set dependency in your Kotlin Multiplatform module's `build.gradle.kts` file.

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

### Step 2 - Add native dependencies

{{< tabs >}}
{{% tab "Android" %}}
All uncaught exceptions and ANRs resulting in a crash are reported by the Kotlin Multiplatform SDK (see [limitations](#limitations)). On top of these crashes, you can configure the SDK to report NDK crashes, and control the reporting of non-fatal ANRs.

#### Add NDK crash reporting

Your Android application may be running native code (C/C++) for performance or code reusability. To enable NDK crash reporting, use the Datadog NDK library. 

1. Add the Gradle dependency to your Android source set by declaring the library as a dependency in your `build.gradle.kts` file:

```kotlin
kotlin {
  sourceSets {
    androidMain.dependencies {
      implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
    }
  }
}
```

2. Enable NDK crash collection after initializing the SDK.

``` kotlin
// in Android source set
NdkCrashReports.enable()
```

An "Application Not Responding" ([ANR][4]) is an Android-specific type of error that gets triggered when the application is unresponsive for too long.

For any Android version, you can override the default setting for reporting non-fatal ANRs by setting `trackNonFatalAnrs` (available from Android source set only) to `true` or `false` when initializing the SDK.

ANRs are only reported through RUM (not through logs). For more information, see [Android Crash Reporting and Error Tracking - Add ANR Reporting][5].


[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: /real_user_monitoring/error_tracking/mobile/android/#add-anr-reporting

{{% /tab %}}

{{% tab "iOS" %}}

**Note**: Kotlin 2.0.20 or higher is required if crash tracking is enabled on iOS. Otherwise, due to the compatibility with `PLCrashReporter`, the application may hang if crash tracking is enabled. 

All uncaught exceptions resulting in a crash are reported by the Kotlin Multiplatform SDK.


Add the following Datadog iOS SDK dependencies, which are needed for the linking step:

* `DatadogObjc`
* `DatadogCrashReporting`

**Note**: Versions of these dependencies should be aligned with the version used by the Datadog Kotlin Multiplatform SDK itself. You can find the complete mapping of iOS SDK versions for each Kotlin Multiplatform SDK release in the [version compatibility guide][501].


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

#### Add app hang reporting

App hangs are an iOS-specific type of error that happens when the application is unresponsive for too long.

By default, app hangs reporting is **disabled**, but you can enable it and set your own threshold to monitor app hangs that last more than a specified duration by using the `setAppHangThreshold` (available from iOS source set only) initialization method.

App hangs are only reported through RUM (not through logs). For more information, see [iOS Crash Reporting and Error Tracking - Add ANR Reporting][6].


[501]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/blob/develop/NATIVE_SDK_VERSIONS.md
[6]: /real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
{{% /tab %}}
{{< /tabs >}}



### Step 3 - Specify application details in the UI

1. Navigate to [**Digital Experience** > **Add an Application**][601].
2. Select `Kotlin Multiplatform` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM Kotlin Multiplatform Data Collected][602].

To ensure the safety of your data, you must use a client token. If you use only [Datadog API keys][603] to configure the Datadog SDK, they are exposed client-side in the Android application's APK byte code.

For more information about setting up a client token, see the [Client Token documentation][604].












## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/setup
[301]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/features/rum
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: /real_user_monitoring/error_tracking/mobile/android/#add-anr-reporting
[501]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/blob/develop/NATIVE_SDK_VERSIONS.md
[6]: /real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
[601]: https://app.datadoghq.com/error-tracking/settings/setup/client
[602]: /real_user_monitoring/kotlin_multiplatform/data_collected/
[603]: /account_management/api-app-keys/#api-keys
[604]: /account_management/api-app-keys/#client-tokens

<!-- 


[7]: /real_user_monitoring/error_tracking/mobile/android/#get-deobfuscated-stack-traces
[8]: /real_user_monitoring/error_tracking/mobile/ios/#get-deobfuscated-stack-traces
[9]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/#track-background-events
[10]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/#add-native-dependencies-for-ios -->


<!-- 
[1]: /real_user_monitoring/
[2]: /error_tracking/


[6]: /getting_started/tagging/using_tags/
[7]: /real_user_monitoring/application_monitoring/advanced_configuration/kotlin_multiplatform/#initialization-parameters
[8]: https://app.datadoghq.com/rum/application/create
[9]: /real_user_monitoring/application_monitoring/advanced_configuration/kotlin_multiplatform/#automatically-track-views
[10]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/integrations/ktor
[11]: /real_user_monitoring/application_monitoring/advanced_configuration/kotlin_multiplatform/#custom-views
[12]: /real_user_monitoring/error_tracking/kotlin_multiplatform/
[13]: /real_user_monitoring/explorer/


 -->