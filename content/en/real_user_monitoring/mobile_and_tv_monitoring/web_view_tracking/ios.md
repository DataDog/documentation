---
title: iOS Web View Tracking
kind: documentation
description: Monitor web views in your hybrid iOS applications.
beta: true
further_reading:
- link: "/real_user_monitoring/ios/"
  tag: "Documentation"
  text: "iOS monitoring"
- link: "/real_user_monitoring/browser/"
  tag: "Documentation"
  text: "Browser monitoring"
---

## Overview

Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid iOS and tvOS applications.

You can perform the following:

- Track user journeys across web and native components in mobile applications
- Scope the root cause of latency to web pages or native components in mobile applications
- Support users that have difficulty loading web pages on mobile devices

## Setup

### Prerequisites

Set up the web page you want rendered on your mobile iOS and tvOS application with the RUM Browser SDK first. For more information, see [RUM Browser Monitoring][1].

### Declare `DatadogWebViewTracking` as a dependency

To enable Crash Reporting, make sure to also enable [RUM][3] and, or [Logs][5]. Then, add the package according to your dependency manager and update your initialization snippet.

{{< tabs >}}
{{% tab "CocoaPods" %}}

You can use [CocoaPods][4] to install `dd-sdk-ios`:
```
pod 'DatadogWebViewTracking'
```

[4]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

In your project, link the following libraries:
```
DatadogCore
DatadogWebViewTracking
```

{{% /tab %}}
{{% tab "Carthage" %}}

You can use [Carthage][5] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

In Xcode, link the following frameworks:
```
DatadogWebViewTracking.xcframework
```

[5]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

### Instrument your web views

The RUM iOS SDK provides APIs for you to control web view tracking. To enable Web View Tracking, provide the `WKWebView` instance.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView, hosts: ["example.com"])
```

To disable Web View Tracking:
```swift
WebViewTracking.disable(webView: webView)
```

## Access your web views

Your web views appear as events and views in the [RUM Explorer][4] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform, such as iOS. 

Filter on your iOS and tvOS applications, and click a session. A side panel with a list of events in the session appears. 

{{< img src="real_user_monitoring/ios/ios-webview-tracking.png" alt="Webview events captured in a session in the RUM Explorer" style="width:100%;">}}

Click **Open View waterfall** to navigate from the session to a resource waterfall visualization in the view's **Performance** tab. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#npm
[2]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.10.0-beta1
[3]: /real_user_monitoring/ios/
[4]: https://app.datadoghq.com/rum/explorer
[5]: https://docs.datadoghq.com/logs/log_collection/ios
