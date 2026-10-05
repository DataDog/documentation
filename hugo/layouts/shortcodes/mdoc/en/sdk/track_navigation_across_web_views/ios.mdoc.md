## Declare `DatadogWebViewTracking` as a dependency

1. Enable [RUM][1], [Logs][2], or both.
2. Add the `DatadogWebViewTracking` library according to your dependency manager.
3. Update your initialization snippet by declaring `DatadogWebViewTracking` as a dependency, as shown below.

{% collapse-content title="CocoaPods" level="h4" %}
You can use [CocoaPods][3] to install `dd-sdk-ios`:
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
You can use [Carthage][4] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

In Xcode, link the following frameworks:
```
DatadogWebViewTracking.xcframework
```
{% /collapse-content %}

## Instrument your web views

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

[1]: /real_user_monitoring/setup/install/?platform=ios
[2]: https://docs.datadoghq.com/logs/log_collection/ios
[3]: https://cocoapods.org/
[4]: https://github.com/Carthage/Carthage
