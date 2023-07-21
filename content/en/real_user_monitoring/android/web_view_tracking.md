---
beta: true
title: Android Web View Tracking
kind: documentation
description: Monitor web views in your hybrid Android applications.
further_reading:
- link: "/real_user_monitoring/android/"
  tag: "Documentation"
  text: "Android monitoring"
- link: "/real_user_monitoring/browser/"
  tag: "Documentation"
  text: "Browser monitoring"
---

## Overview

Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid Android and Android TV applications.

You can perform the following:

- Track user journeys across web and native components in mobile applications
- Scope the root cause of latency to web pages or native components in mobile applications
- Support users that have difficulty loading web pages on mobile devices

## Setup

### Prerequisites

Set up the web page you want rendered on your mobile Android and Android TV application with the RUM Browser SDK first. For more information, see [RUM Browser Monitoring][1].

### Update your existing SDK setup

1. If you want to forward RUM events coming from web pages, download the [latest version][2] of RUM Android SDK and setup RUM feature following the [dedicated guide][3].
2. If you want to forward Log events coming from web pages, download the [latest version][4] of Logs Android SDK and setup Logs feature following the [dedicated guide][5].
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

## Access your web views

Your web views appear in the [RUM Explorer][6] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform, such as Android. 

Filter on your Android and Android TV applications, and click a session. A side panel with a list of events in the session appears. 

{{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="Webview events captured in a session in the RUM Explorer" style="width:100%;">}}

Click **Open View waterfall** to navigate from the session to a resource waterfall visualization in the view's **Performance** tab. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#npm
[2]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[3]: /real_user_monitoring/android/?tab=kotlin#setup
[4]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[5]: /logs/log_collection/android/?tab=kotlin#setup
[6]: https://app.datadoghq.com/rum/explorer
