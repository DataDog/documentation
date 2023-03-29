---
title: React Native Web View Tracking
kind: documentation
---

## Overview

Real User Monitoring (RUM) allows you to monitor web views and eliminate blind spots in your hybrid React Native applications.

You can perform the following:

-   Track user journeys across web and native components in mobile applications
-   Scope the root cause of latency to web pages or native components in mobile applications
-   Support users that have difficulty loading web pages on mobile devices

RUM supports web views created using [react-native-webview][3].

## Setup

### Prerequisites

Set up the RUM Browser SDK on the web page you want rendered on your mobile React Native application. For more information, see [RUM Browser Monitoring][1].

Add `react-native-webview` to your application following the [official installation documentation][4].

### Instrument your web views

Import `WebView` from `@datadog/mobile-react-native` instead of `react-native-webview`:

```javascript
import { WebView } from '@datadog/mobile-react-native';
```

You can use all existing functionalities from `react-native-webview` as the `WebView` component from `@datadog/mobile-react-native` wraps the `react-native-webview` component.

Provide the list of hosts to be tracked by Datadog inside the web view by using the `allowedHosts` prop of your `WebView` component:

```javascript
<WebView
    source={{ uri: 'https://www.example.com' }}
    allowedHosts={['example.com']}
/>
```

## Access your web views

Your web views appear in the [RUM Explorer][2] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform, such as React Native.

Filter on your React Native applications, and click a session. A side panel with a list of events in the session appears.

{{< img src="real_user_monitoring/react_native/reactnative_webview_session.png" alt="webview session example" >}}

Click **Open View waterfall** to navigate from the session to a resource waterfall visualization in the view's **Performance** tab.

[1]: https://docs.datadoghq.com/real_user_monitoring/browser/#npm
[2]: https://app.datadoghq.com/rum/explorer?_gl=1*1ftt3v2*_gcl_aw*R0NMLjE2NzE1MzAwMzUuQ2owS0NRaUExNFdkQmhEOEFSSXNBTmFvMDdnVzZFSGZaVXQ0dGRFY3ZwcERPVkpFUTJEWEZHYVhSd0djQmNGdDRnZ0pra0xGbW5uUjFHQWFBcjlZRUFMd193Y0I.*_ga*MTkyMzQ5MTc1MC4xNjc4MjczMTI3*_ga_KN80RDFSQK*MTY3ODI3OTIzNC4yLjAuMTY3ODI3OTIzNC42MC4wLjA.
[3]: https://github.com/react-native-webview/react-native-webview
[4]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md
