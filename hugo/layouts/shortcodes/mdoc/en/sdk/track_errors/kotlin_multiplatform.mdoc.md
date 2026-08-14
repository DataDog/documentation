### Automated error reporting

Enable crash reporting when you initialize the SDK in your common source set:

```kotlin
val configuration = Configuration.Builder(
        clientToken = appClientToken,
        env = appEnvironment,
        variant = appVariantName
    )
    .trackCrashes(true)
    .build()

Datadog.initialize(context, configuration, trackingConsent)
```

This reports uncaught exceptions and ANRs resulting in a crash on both Android and iOS.

- On **Android**, you can also enable [NDK crash reporting][1] and override the default non-fatal ANR reporting with `trackNonFatalAnrs` (available in the Android source set only).
- On **iOS**, you can also enable [App Hang reporting][2] with `setAppHangThreshold` (available in the iOS source set only).

### Get deobfuscated crash reports

Upload your Android mapping files and iOS `.dSYM` files so Datadog can deobfuscate your crash reports. See [Kotlin Multiplatform Crash Reporting and Error Tracking][3] for the full setup.

[1]: /real_user_monitoring/application_monitoring/android/error_tracking/?tab=kotlin#step-4---add-ndk-crash-reporting
[2]: /real_user_monitoring/application_monitoring/ios/error_tracking/#step-5---add-app-hang-reporting
[3]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/error_tracking/
