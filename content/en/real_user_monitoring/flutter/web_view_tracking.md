---
title: Web View Tracking
kind: documentation
description: Monitor web views in your hybrid Flutter applications.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---

## Overview

Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid Flutter applications.

You can perform the following:

- Track user journeys across web and native components in mobile applications
- Scope the root cause of latency to web pages or native components in mobile applications
- Support users that have difficulty loading web pages on mobile devices

## Setup

### Prerequisites

Set up the web page you want rendered on your mobile Flutter application with the RUM Browser SDK first. For more information, see [RUM Browser Monitoring][1].

### Instrument your web views

The RUM Flutter SDK provides APIs for you to control web view tracking when using the [`webview_flutter`][2] package. To add Web View Tracking, call the `trackDatadogEvents` extension method on `WebViewController`, providing the list of allowed hosts.

For example:

```dart
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

webViewController = WebViewController()
  ..setJavaScriptMode(JavaScriptMode.unrestricted)
  ..trackDatadogEvents(
    DatadogSdk.instance,
    ['myapp.example'],
  )
  ..loadRequest(Uri.parse('myapp.example'));
```

Note that `JavaScriptMode.unrestricted` is required for tracking to work on Android.

## Access your web views

Your web views appear as events and views in the [RUM Explorer][3] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform, such as Flutter. 

Filter on your Flutter application and click a session. A side panel with a list of events in the session appears. 

{{< img src="real_user_monitoring/ios/ios-webview-tracking.png" alt="Webview events captured in a session in the RUM Explorer" style="width:100%;">}}

Click **Open View waterfall** to navigate from the session to a resource waterfall visualization in the view's **Performance** tab. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#npm
[2]: https://pub.dev/packages/webview_flutter
[3]: https://app.datadoghq.com/rum/explorer