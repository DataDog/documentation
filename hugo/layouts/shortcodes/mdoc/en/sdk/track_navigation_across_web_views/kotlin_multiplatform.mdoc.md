## Declare `DatadogWebViewTracking` as a dependency

Add the `DatadogWebViewTracking` library to your application by following the guide [here][1].

## Instrument your web views

1. If you want to forward RUM events coming from web pages, download the [latest version][2] of the RUM Kotlin Multiplatform SDK and set up RUM by following the [dedicated guide][3].
2. If you want to forward log events coming from web pages, download the [latest version][4] of the Logs Kotlin Multiplatform SDK and set up logs by following the [dedicated guide][5].
3. Add the Gradle dependency for the common source set by declaring the `dd-sdk-kotlin-multiplatform-webview` library as a dependency in the module-level `build.gradle.kts` file:

   ```kotlin
   kotlin {
     // ...
     sourceSets {
       commonMain.dependencies {
         implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-webview:x.x.x")
       }
     }
   }
   ```

4. Enable tracking for web views with the following code snippet:

   ```kotlin
   // call it in Android or iOS source set, not in the common one
   WebViewTracking.enable(webView, allowedHosts)
   ```

5. Disable tracking of web views after the web view instance can be released (iOS only):

   ```kotlin
   // call it in iOS source set, not in the common one
   WebViewTracking.disable(webView, allowedHosts)
   ```

`allowedHosts` matches the given hosts and their subdomain. No regular expressions are allowed.

[1]: /real_user_monitoring/setup/install/?platform=kotlin_multiplatform
[2]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-rum
[3]: /real_user_monitoring/setup/install/?platform=kotlin_multiplatform
[4]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-logs
[5]: /logs/log_collection/kotlin_multiplatform/#setup
