## Automated error reporting

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

## Manually report errors

To track specific errors, notify the monitor when an error occurs with the message, source, exception, and additional attributes:

```kotlin
GlobalRumMonitor.get().addError(message, source, throwable, attributes)
```

An `addError` overload that accepts `NSError` is also available from the iOS source set.

For the attributes collected, see [Data Collected][3].

## Upload debug symbols to get deobfuscated stack traces

Upload your Android mapping files and iOS `.dSYM` files so Datadog can deobfuscate and symbolicate your stack traces. Datadog uses a build ID generated for each build to match stack traces with the correct files.

### Upload mapping files (Android)

1. Add the [Datadog Android Gradle plugin][4] to your Android application module:

   ```kotlin
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Create a dedicated Datadog API key][5] and export it as an environment variable named `DD_API_KEY` or `DATADOG_API_KEY`.
3. If your organization is not on the US1 site, set your site in the plugin configuration (for example, `datadog { site = "EU1" }`).
4. Run the upload task after your obfuscated APK builds:

   ```bash
   ./gradlew uploadMappingRelease
   ```

### Upload dSYM files (iOS)

Use the [@datadog/datadog-ci][6] command line tool to upload your `.dSYM` files, either as a zip archive or as a folder:

```bash
export DATADOG_API_KEY="<API KEY>"
npx @datadog/datadog-ci dsyms upload appDsyms.zip
```

If your organization is not on the US1 site, also set the `DATADOG_SITE` environment variable.

Mapping files are limited to 500 MB each, and dSYM files are limited to 2 GB. For more options, see the [Android][7] and [iOS][8] Error Tracking documentation.

[1]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=android#automated-error-reporting
[2]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=ios#automatically-report-errors
[3]: /real_user_monitoring/setup/data_collected/?platform=kotlin_multiplatform
[4]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://www.npmjs.com/package/@datadog/datadog-ci
[7]: /error_tracking/frontend/mobile/android/#step-6---get-deobfuscated-stack-traces
[8]: /error_tracking/frontend/mobile/ios/#step-6---get-deobfuscated-stack-traces
