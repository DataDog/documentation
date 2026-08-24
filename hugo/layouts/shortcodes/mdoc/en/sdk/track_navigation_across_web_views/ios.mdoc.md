Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid mobile applications. You can track user journeys across web and native components, scope the root cause of latency to web pages or native components, and support users that have difficulty loading web pages on mobile devices.

You can also record the entire user journey across both web and native views and watch it in a single Session Replay. See [Web View Instrumentation][1] to learn more.

### Prerequisites

Set up the RUM Browser SDK for the web page you want rendered on your mobile application. For more information, see [RUM Browser Monitoring][2].

### Declare `DatadogWebViewTracking` as a dependency

1. Make sure to also enable [RUM][3] and/or [Logs][4].
2. Add the `DatadogWebViewTracking` library according to your dependency manager.
3. Update your initialization snippet by declaring `DatadogWebViewTracking` as a dependency, as shown below.

{% collapse-content title="CocoaPods" level="h4" %}
You can use [CocoaPods][5] to install `dd-sdk-ios`:
```
pod 'DatadogWebViewTracking'
```
{% /collapse-content %}

{% collapse-content title="Swift Package Manager (SPM)" level="h4" %}
To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

In your project, link the following libraries:
```
DatadogCore
DatadogWebViewTracking
```
{% /collapse-content %}

{% collapse-content title="Carthage" level="h4" %}
You can use [Carthage][6] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

In Xcode, link the following frameworks:
```
DatadogWebViewTracking.xcframework
```
{% /collapse-content %}

### Instrument your web views

The RUM iOS SDK provides APIs for you to control web view tracking. To enable Web View Tracking, provide the `WKWebView` instance.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView, hosts: ["example.com", "*.example.com"])
```

To disable Web View Tracking:

```swift
WebViewTracking.disable(webView: webView)
```

`hosts` accepts plain hostnames (for example, `"example.com"`, which also matches its subdomains) and wildcard patterns with a single `*` (for example, `"*.example.com"` or `"preview-*.example.com"`). Invalid entries are dropped with a warning.

### Access your web views

Your web views appear in the [RUM Explorer][7] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform.

To access your web views:

1. Navigate to {% ui %}Digital Experiences{% /ui %} > {% ui %}Real User Monitoring{% /ui %} > {% ui %}(Sessions) Explorer{% /ui %}.
2. Create a query to filter on the following:
   - Your iOS applications using either `application.id` or `application.name`
   - The web component using `service`
   - The platform using `source`

   **Note**: If you see unrecognized version numbers reporting in your mobile app, they might belong to the Browser SDK version. In that case, you can filter out the Browser platform session, for example, `source: ios`.
3. Click a session. A side panel with a list of events in the session appears. Any service with the web icon indicates a web view.

From here, you can hover over a session event and click {% ui %}Open View waterfall{% /ui %} to navigate from the session to a resource waterfall visualization in the view's {% ui %}Performance{% /ui %} tab.

### Billing implications

See [RUM & Session Replay Billing][8] for details on how web views in mobile applications impact session recordings and billing.

[1]: /session_replay/setup_and_configuration/#web-view-instrumentation
[2]: /real_user_monitoring/application_monitoring/browser/setup/#npm
[3]: /real_user_monitoring/application_monitoring/ios/
[4]: https://docs.datadoghq.com/logs/log_collection/ios
[5]: https://cocoapods.org/
[6]: https://github.com/Carthage/Carthage
[7]: https://app.datadoghq.com/rum/explorer
[8]: /account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing
