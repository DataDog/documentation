---
title: iOS Web View Tracking
kind: documentation
description: Monitor web views in your hybrid iOS applications.
beta: true
further_reading:
- link: "/real_user_monitoring/ios/"
  tag: "Documentation"
  text: "iOS Monitoring"
- link: "/real_user_monitoring/browser/"
  tag: "Documentation"
  text: "Browser Monitoring"
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

### Instrument your web views

The RUM iOS SDK provides APIs for you to control web view tracking. To add Web View Tracking, declare the following as an extension of `WKUserContentController`.

`trackDatadogEvents(in hosts: Set<String>)`
: Enables RUM event tracking in a web view for certain `hosts`.

`stopTrackingDatadogEvents()`
: Disables RUM event tracking in a web view. When a web view is about to be de-allocated or you are done with the web view, call this API.

For example:

```
import WebKit
import Datadog
 
webView.configuration.userContentController.trackDatadogEvents(in: ["example.com"])
```

## Access your web views

Your web views appear as events and views in the [RUM Explorer][4] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform, such as iOS. 

Filter on your iOS and tvOS applications, and click a session. A side panel with a list of events in the session appears. 

{{< img src="real_user_monitoring/ios/ios-webview-tracking.png" alt="Webview events captured in a session in the RUM Explorer" style="width:100%;">}}

Click **Open View waterfall** to navigate from the session to a resource waterfall visualization in the view's **Performance** tab. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/real_user_monitoring/browser/#npm
[2]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.10.0-beta1
[3]: https://docs.datadoghq.com/real_user_monitoring/ios/
[4]: https://app.datadoghq.com/rum/explorer
