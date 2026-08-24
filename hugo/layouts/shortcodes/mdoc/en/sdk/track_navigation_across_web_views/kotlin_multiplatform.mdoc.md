Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid mobile applications. You can track user journeys across web and native components, scope the root cause of latency to web pages or native components, and support users that have difficulty loading web pages on mobile devices.

You can also record the entire user journey across both web and native views and watch it in a single Session Replay. See [Web View Instrumentation][1] to learn more.

### Prerequisites

Set up the RUM Browser SDK for the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][2].

### Declare `DatadogWebViewTracking` as a dependency

Add the `DatadogWebViewTracking` library to your application by following the guide [here][3].

### Instrument your web views

1. If you want to forward RUM events coming from web pages, download the [latest version][4] of the RUM Kotlin Multiplatform SDK and set up RUM by following the [dedicated guide][5].
2. If you want to forward log events coming from web pages, download the [latest version][6] of the Logs Kotlin Multiplatform SDK and set up logs by following the [dedicated guide][7].
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

### Access your web views

Your web views appear in the [RUM Explorer][8] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform.

To access your web views:

1. Navigate to {% ui %}Digital Experiences{% /ui %} > {% ui %}Real User Monitoring{% /ui %} > {% ui %}(Sessions) Explorer{% /ui %}.
2. Create a query to filter on the following:
   - Your Kotlin Multiplatform applications using either `application.id` or `application.name`
   - The web component using `service`
   - The platform using `source`

   **Note**: If you see unrecognized version numbers reporting in your mobile app, they might belong to the Browser SDK version. In that case, you can filter out the Browser platform session, for example, `source: kotlin-multiplatform`.
3. Click a session. A side panel with a list of events in the session appears. Any service with the web icon indicates a web view.

From here, you can hover over a session event and click {% ui %}Open View waterfall{% /ui %} to navigate from the session to a resource waterfall visualization in the view's {% ui %}Performance{% /ui %} tab.

### Billing implications

See [RUM & Session Replay Billing][9] for details on how web views in mobile applications impact session recordings and billing.

[1]: /session_replay/setup_and_configuration/#web-view-instrumentation
[2]: /real_user_monitoring/application_monitoring/browser/setup/#npm
[3]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/#add-native-dependencies-for-ios
[4]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-rum
[5]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/#setup
[6]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-logs
[7]: /logs/log_collection/kotlin_multiplatform/#setup
[8]: https://app.datadoghq.com/rum/explorer
[9]: /account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing
