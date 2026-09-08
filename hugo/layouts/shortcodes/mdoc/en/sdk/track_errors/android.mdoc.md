## Automated error reporting

After you enable RUM, the Android SDK automatically reports uncaught exceptions and crashes.

To also report **ANRs** (Application Not Responding errors), add `trackNonFatalAnrs(true)` to your RUM configuration:

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .trackNonFatalAnrs(true) // Enable non-fatal ANR reporting
    .build()
Rum.enable(rumConfig)
```

Fatal ANRs are reported by default on Android 30+. Non-fatal ANRs are disabled by default on Android 30+ (to reduce noise) but enabled by default on Android 29 and below.

To also report native crashes reached through the Android NDK, add the Datadog NDK library and enable it after initializing the SDK:

```kotlin
NdkCrashReports.enable()
```

## Manual error reporting

To track specific errors, notify the monitor when an error occurs with the message, source, exception, and additional attributes. See the [Error Attributes documentation][7].

```kotlin
GlobalRumMonitor.get().addError(message, source, throwable, attributes)
```

## Get deobfuscated crash reports

Upload your ProGuard/R8 mapping files and NDK symbol files so Datadog can deobfuscate your crash reports. See [Android Crash Reporting and Error Tracking][15] for the full setup, including the Gradle plugin and upload tasks.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/android
[3]: /real_user_monitoring/android/data_collected
[4]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
[5]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters
[6]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
[7]: /real_user_monitoring/android/data_collected/#event-specific-attributes
[8]: /real_user_monitoring/application_monitoring/android/setup/#sending-data-when-device-is-offline
[9]: https://github.com/DataDog/dd-sdk-android/blob/eaa15cd344d1723fafaf179fcebf800d6030c6bb/sample/kotlin/src/main/kotlin/com/datadog/android/sample/SampleApplication.kt#L279
[10]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[11]: /real_user_monitoring/application_monitoring/android/monitoring_app_performance/#time-to-network-settled
[12]: https://square.github.io/okhttp/features/events/
[13]: /real_user_monitoring/application_monitoring/android/monitoring_app_performance/#interaction-to-next-view
[14]: /real_user_monitoring/application_monitoring/android/setup?tab=kotlin#setup
[15]: /real_user_monitoring/application_monitoring/android/error_tracking/
