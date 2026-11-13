## Instrument your web views

1. If you want to forward RUM events coming from web pages, download the [latest version][1] of RUM Android SDK and set up RUM following the [dedicated guide][2].
2. If you want to forward Log events coming from web pages, download the [latest version][3] of Logs Android SDK and set up Logs following the [dedicated guide][4].
3. Add the Gradle dependency by declaring the `dd-sdk-android-webview` library as a dependency in the module-level `build.gradle` file:

   ```groovy
   dependencies {
       implementation "com.datadoghq:dd-sdk-android-webview:x.x.x"
   }
   ```

4. Enable tracking for web views with the following code snippet:

   ```kotlin
   WebViewTracking.enable(webView, allowedHosts)
   ```

`allowedHosts` accepts plain hostnames (for example, `"example.com"`, which also matches its subdomains) and wildcard patterns with a single `*` (for example, `"*.example.com"` or `"preview-*.example.com"`). Invalid entries are dropped with a warning.

**Note**: For instrumentation to work on the WebView component, JavaScript must be enabled on the WebView. To enable it, use the following code snippet:

```kotlin
webView.settings.javaScriptEnabled = true
```

[1]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[2]: /real_user_monitoring/setup/install/?platform=android
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[4]: /logs/log_collection/android/?tab=kotlin#setup
