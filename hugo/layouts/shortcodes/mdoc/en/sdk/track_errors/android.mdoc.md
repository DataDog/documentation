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

## Manually report errors

To track specific errors, notify the monitor when an error occurs with the message, source, exception, and additional attributes:

```kotlin
GlobalRumMonitor.get().addError(message, source, throwable, attributes)
```

### Monitor `Closeable` usage

You can monitor `Closeable` instance usage with the `useMonitored` extension method, which reports errors to Datadog and closes the resource afterward:

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}
```

For the attributes collected, see [Data Collected][1].

## Upload debug symbols to get deobfuscated stack traces

When your Android app is built for production, the code is typically obfuscated with ProGuard or R8, which makes stack traces unreadable. Upload your mapping files (and NDK symbol files, if you use native code) so Datadog can deobfuscate your stack traces. Datadog uses a build ID generated for each build to match stack traces with the correct mapping file.

1. Add the [Datadog Android Gradle plugin][2] to your Gradle project:

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Create a dedicated Datadog API key][3] and export it as an environment variable named `DD_API_KEY` or `DATADOG_API_KEY`. Alternatively, pass it as a task property, or set an `apiKey` property in a `datadog-ci.json` file at the root of your project.
3. If your organization is not on the US1 site, configure the plugin with your site in your app's `build.gradle` script. For example:

   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Run the upload task after your obfuscated APK builds:

   ```bash
   ./gradlew uploadMappingRelease
   ```

5. If your app runs native code, also upload the NDK symbol files:

   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

If your project uses additional flavors, the plugin provides an upload task for each variant with obfuscation enabled. In this case, initialize the Android SDK with the matching variant name.

For build ID matching, file size limits, and how to list uploaded mapping files, see [Android Crash Reporting and Error Tracking][4].

[1]: /real_user_monitoring/setup/data_collected/?platform=android#error-attributes
[2]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /error_tracking/frontend/mobile/android/#step-6---get-deobfuscated-stack-traces
