---
beta: true
title: Android Web View Tracking
kind: documentation
description: Monitor web views in your hybrid Android applications.
further_reading:
- link: "/real_user_monitoring/android/"
  tag: "Documentation"
  text: "Android Monitoring"
- link: "/real_user_monitoring/browser/"
  tag: "Documentation"
  text: "Browser Monitoring"
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

1. Download the [latest version][2] of the RUM Android SDK.
2. Edit your existing Android SDK setup from [RUM Android Monitoring][3].
3. Add tracking for web views with the following example:

   ```
            val configuration = Configuration.Builder(
                    rumEnabled = true
                )
               .useSite()
               .trackInteractions()
               .setWebViewTrackingHosts(hosts)
               .trackLongTasks(durationThreshold)
               .useViewTrackingStrategy(strategy)
               .build()
            val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
            Datadog.initialize(this, credentials, configuration, trackingConsent)
        }
    }
   ```

4. Configure the `DatadogEventBridge` for web views you want to track in your mobile Android application using `DatadogEventBridge.setup(webView)` in the configuration file when you initialize the RUM Android SDK.

## Access your web views

Your web views appear in the [RUM Explorer][4] with associated `service` and `source` attributes. The `service` attribute indicates the web component the web view is generated from, and the `source` attribute denotes the mobile application's platform, such as Android. 

Filter on your Android and Android TV applications, and click a session. A side panel with a list of events in the session appears. 

{{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="Webview events captured in a session in the RUM Explorer" style="width:100%;">}}

Click **Open View waterfall** to navigate from the session to a resource waterfall visualization in the view's **Performance** tab. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#npm
[2]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android/1.12.0-beta1/aar
[3]: /real_user_monitoring/android/?tab=kotlin#setup
[4]: https://app.datadoghq.com/rum/explorer
