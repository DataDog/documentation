---
title: Troubleshooting Kotlin Multiplatform SDK issues
description: Learn how to troubleshoot issues with Kotlin Multiplatform Monitoring.
aliases:
- /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/kotlin-multiplatform
- /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/kotlin_multiplatform
- /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/troubleshooting
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: "Source Code"
  text: dd-sdk-kotlin-multiplatform Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Real User Monitoring
---

## Overview

If you experience unexpected behavior with the Datadog Kotlin Multiplatform SDK, use this guide to resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Check if Datadog RUM is initialized
Use the utility method `isInitialized` to check if the SDK is properly initialized:

```kotlin
if (Datadog.isInitialized()) {
    // your code here
}
```

## Debugging
When writing your application, you can enable development logs by calling the `setVerbosity` method. All internal messages in the library with a priority equal to or higher than the provided level are then logged either to Android's Logcat or to the debugger console in Xcode:

```kotlin
Datadog.setVerbosity(SdkLogVerbosity.DEBUG)
```

## Set tracking consent (GDPR compliance)

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

## Common problems

### iOS binary linking

#### Missing `PLCrashReporter` symbols

If there is an error during the linking step about missing `PLCrashReporter` symbols in the linker search paths, like the following:

```
Undefined symbols for architecture arm64:
  "_OBJC_CLASS_$_PLCrashReport", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
  "_OBJC_CLASS_$_PLCrashReportBinaryImageInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReportStackFrameInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReportThreadInfo", referenced from:
       in DatadogCrashReporting[arm64][7](CrashReport.o)
  "_OBJC_CLASS_$_PLCrashReporter", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
  "_OBJC_CLASS_$_PLCrashReporterConfig", referenced from:
       in DatadogCrashReporting[arm64][15](PLCrashReporterIntegration.o)
```

Then you need to explicitly pass the `CrashReporter` framework name to the linker:

```kotlin
targets.withType(KotlinNativeTarget::class.java) {
   compilations.getByName("main").compileTaskProvider {
       compilerOptions {
           freeCompilerArgs.addAll(
               listOf(
                  "-linker-option",
                  "-framework CrashReporter"
               )
           )
       }
   }
}

```

#### Missing `swiftCompatibility` symbols

If there is an error during the linking step about missing `swiftCompatibility` symbols in the linker search paths, like the following:

```
Undefined symbols for architecture arm64:
  "__swift_FORCE_LOAD_$_swiftCompatibility56", referenced from:
      __swift_FORCE_LOAD_$_swiftCompatibility56_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
  "__swift_FORCE_LOAD_$_swiftCompatibilityConcurrency", referenced from:
      __swift_FORCE_LOAD_$_swiftCompatibilityConcurrency_$_DatadogCrashReporting in DatadogCrashReporting[arm64][4](BacktraceReporter.o)
```

Then you can suppress this error:

```kotlin
targets.withType(KotlinNativeTarget::class.java) {
   compilations.getByName("main").compileTaskProvider {
       compilerOptions {
           freeCompilerArgs.addAll(
               listOf(
                  "-linker-option",
                  "-U __swift_FORCE_LOAD_\$_swiftCompatibility56",
                  "-linker-option",
                  "-U __swift_FORCE_LOAD_\$_swiftCompatibilityConcurrency"
               )
           )
       }
   }
}

```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
