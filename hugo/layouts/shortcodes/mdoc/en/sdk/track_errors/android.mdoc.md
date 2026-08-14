### Automated error reporting

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

### Get deobfuscated crash reports

Upload your ProGuard/R8 mapping files and NDK symbol files so Datadog can deobfuscate your crash reports. See [Android Crash Reporting and Error Tracking][1] for the full setup, including the Gradle plugin and upload tasks.

[1]: /real_user_monitoring/application_monitoring/android/error_tracking/
