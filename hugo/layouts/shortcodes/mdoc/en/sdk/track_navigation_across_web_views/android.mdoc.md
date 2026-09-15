Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid mobile applications. You can track user journeys across web and native components, scope the root cause of latency to web pages or native components, and support users that have difficulty loading web pages on mobile devices.

You can also record the entire user journey across both web and native views and watch it in a single Session Replay. See [Web View Instrumentation][1] to learn more.

### Prerequisites

Set up the RUM Browser SDK for the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][2].

### Instrument your web views

1. If you want to forward RUM events coming from web pages, download the [latest version][3] of RUM Android SDK and set up RUM following the [dedicated guide][4].
2. If you want to forward Log events coming from web pages, download the [latest version][5] of Logs Android SDK and set up Logs following the [dedicated guide][6].
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

### Access your web views

Your web views appear in the [RUM Explorer][7] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform, such as Android.

To access your web views:

1. Navigate to {% ui %}Digital Experiences{% /ui %} > {% ui %}Real User Monitoring{% /ui %} > {% ui %}(Sessions) Explorer{% /ui %}.
2. Create a query to filter on the following:
   - Your Android and Android TV applications using either `application.id` or `application.name`
   - The web component using `service`
   - The platform using `source`

   **Note**: If you see unrecognized version numbers reporting in your mobile app, they might belong to the Browser SDK version. In that case, you can filter out the Browser platform session, for example, `source: react-native`.
3. Click a session. A side panel with a list of events in the session appears. Any service with the web icon indicates a web view.

From here, you can hover over a session event and click {% ui %}Open View waterfall{% /ui %} to navigate from the session to a resource waterfall visualization in the view's {% ui %}Performance{% /ui %} tab.

### Billing implications

See [RUM & Session Replay Billing][8] for details on how web views in mobile applications impact session recordings and billing.

[1]: /session_replay/setup_and_configuration/#web-view-instrumentation
[2]: /real_user_monitoring/application_monitoring/browser/setup/#npm
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[4]: /real_user_monitoring/application_monitoring/android/?tab=kotlin#setup
[5]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[6]: /logs/log_collection/android/?tab=kotlin#setup
[7]: https://app.datadoghq.com/rum/explorer
[8]: /account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing
