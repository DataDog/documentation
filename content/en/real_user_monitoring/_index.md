---
title: RUM & Session Replay
description: "Visualize, observe, and analyze the performance of your front-end applications as seen by your users."
disable_sidebar: true
aliases:
  - /real_user_monitoring/installation
  - /real_user_monitoring/faq/
further_reading:
- link: "https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams"
  tag: "Blog"
  text: "From performance to impact: Bridging frontend teams through shared context"
- link: "https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring"
  tag: "Release Notes"
  text: "Check out the latest Datadog RUM releases! (App login required)"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to gain insights through Real User Monitoring"
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Introducing Datadog Real User Monitoring"
- link: "https://www.datadoghq.com/blog/datadog-mobile-rum/"
  tag: "Blog"
  text: "Improve mobile user experience with Datadog Mobile Real User Monitoring"
- link: "https://www.datadoghq.com/blog/mobile-monitoring-best-practices/"
  tag: "Blog"
  text: "Best practices for monitoring mobile app performance"
- link: "https://www.datadoghq.com/blog/error-tracking/"
  tag: "Blog"
  text: "Make sense of application issues with Datadog Error Tracking"
- link: "https://www.datadoghq.com/blog/unify-apm-rum-datadog/"
  tag: "Blog"
  text: "Unify APM and RUM data for full-stack visibility"
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: "Blog"
  text: "Use geomaps to visualize your app data by location"
- link: "https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection"
  tag: "Blog"
  text: "Get better RUM data with our custom React components"
- link: "https://www.datadoghq.com/blog/hybrid-app-monitoring/"
  tag: "Blog"
  text: "Monitor your hybrid mobile applications with Datadog"
- link: "https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/"
  tag: "Blog"
  text: "How Datadog's Technical Solutions team uses RUM, Session Replay, and Error Tracking to resolve customer issues"
- link: "https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/"
  tag: "Blog"
  text: "Best practices for monitoring static web applications"
- link: "/real_user_monitoring/application_monitoring/browser/data_collected/"
  tag: "Documentation"
  text: "RUM Browser Data Collected"
- link: "https://www.datadoghq.com/blog/progressive-web-application-monitoring/"
  tag: "Blog"
  text: "Best practices for monitoring progressive web applications"
- link: "https://www.datadoghq.com/blog/datadog-executive-dashboards"
  tag: "Blog"
  text: "Design effective executive dashboards with Datadog"
algolia:
  tags: ['rum', 'real user monitoring']
cascade:
    algolia:
        rank: 70
---


{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  Discover how to create custom user actions tailored to specific business needs, enabling precise tracking of user behavior.
{{< /learning-center-callout >}}

## What is Real User Monitoring?

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="RUM Dashboard" >}}

Datadog's *Real User Monitoring (RUM)* gives you end-to-end visibility into the real-time activity and experience of individual users. RUM solves four types of use cases for monitoring web and mobile applications:

* **Performance**: Track the performance of web pages, mobile application screens, user actions, network requests, and your frontend code.
* **Error Management**: Monitor the ongoing bugs and issues and track them over time and versions.
* **Analytics / Usage**: Understand who is using your application (country, device, OS), monitor individual users journeys, and analyze how users interact with your application (most common page visited, clicks, interactions, and feature usage).
* **Support**: Retrieve all of the information related to one user session to troubleshoot an issue (session duration, pages visited, interactions, resources loaded, and errors).

### Session definition

A user session is a user journey on your web or mobile application. A session includes all related navigation events (RUM Views), user actions (RUM Actions), network requests (RUM Resources), crashes and errors (RUM Errors), and other events and signals that collectively produce a faithful representation of the user experience.

A RUM session can last up to 4 hours, and expires after 15 minutes of inactivity. If the user interacts with the application after either limit, a new session starts automatically.

### Technical limitations

| Property                                   | Limitation               |
| ------------------------------------------ | ------------------------ |
| Maximum duration of a session              | 4 hours                  |
| Timeout of a session                       | 15 minutes of inactivity |
| Maximum number of events per session       | 10 million              |
| Maximum number of attributes per event     | 1,000                    |
| Maximum attribute depth per event          | 20                       |
| Maximum event size                         | 1 MB                     |
| Maximum intake payload size                | 5 MB                     |
| Maximum source maps and mapping files size | 500 MB per file          |
| Maximum dSYM files size                    | 2 GB per file            |
| Maximum delay at ingestion                 | 24 hours                 |

If an event goes beyond any of the technical limitations listed above, it is rejected by the Datadog intake.

## What is Session Replay?

Datadog's *Session Replay* allows you to capture and visually replay the web browsing experience of your users.

Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application's usage patterns and design pitfalls.

## Get started

Select an application type to start collecting RUM data:

{{< partial name="rum/rum-getting-started.html" >}}

</br>

### Capabilities and platform support

**Note**: The Datadog Flutter SDK is not supported for MacOS, Windows, or Linux.

The following table shows which RUM capabilities are supported on each platform:

| Feature                               | Browser | Android | iOS |   Flutter   | React Native | Roku | KMP | Unity |  Notes |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-----|-------|--------|
| Send logs to Datadog  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Distributed tracing of network requests | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Roku** is only able to track some types of HTTP requests.<br> - **Unity** uses a wrapper around `UnityWebRequest` to perform request tracking. |
| Track Views and Actions (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - All actions tracked in **Flutter Web** are recorded as `custom`. <br> - **Roku** and **Unity** support only manual action tracking. |
| Feature Flags tracking and release tracking | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Error tracking and source mapping | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | Only partially supported for **React Native**. |
| Crash tracking, symbolication, and deobfuscation | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |  |
| Stop sessions (Kiosk Monitoring) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}}  |  |
| Track Events in WebViews |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Monitor platform-specific vitals | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Global context/attribute tracking in Logs  | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Client side tracing |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | **Flutter** Session Replay is in Preview. |
| Frustration signals | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | Only partially supported for all **mobile** and **Roku** devices. |

## Supported endpoints for SDK domains

All Datadog SDKs traffic is transmitted over SSL (default 443) to the following domains:

| Site | Site URL                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |
| AP2  | `https://browser-intake-ap2-datadoghq.com`    |

## Explore Datadog RUM

Access RUM by navigating to [**Digital Experience > Performance Summary**][1].

Select an application from the top navigation, or follow the setup instructions for [browser][15] or [mobile][16] to add your first application.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="Select a RUM application" >}}

**Tip**: To open RUM from Datadog's global search, press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> and search for `real user monitoring`.

## Performance monitoring summary

| Browser Performance Summary | Mobile Performance Summary |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="RUM Performance Monitoring summary page for a browser application" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="RUM Performance Monitoring summary page for a mobile application" >}} | 

The [RUM Performance Monitoring summary][1] page provides relevant and actionable insights for both web and mobile applications. You have a tailored experience for each platform that helps you:

- **Focus on key datapoints** by platform, such as the UI latency for web or mobile crashes
- **Monitor application health** through familiar KPIs, such as Core Web Vitals for web apps or hang rate for iOS, to assess app reliability
- **Dive into investigations directly** from interactive widgets without leaving the page

For **web apps**, use the search bar to filter data, identify slow pages, and follow the UI to the [RUM Optimization Inspect][17] page.

For **mobile apps**, review recent crashes at the bottom of the page and use the [Error Tracking][6] side panel for troubleshooting.

### Out-of-the-box dashboards

Analyze information about your user sessions, performance, mobile applications, frustration signals, network resources, and errors collected automatically with [out-of-the-box RUM dashboards][2].

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM dashboard" >}}

### RUM Explorer and visualizations

View user sessions in segments, such as checking when latency impacts your premium customers, with [visualizations][3]. Explore data, save views, and create [monitors][4] on your customized searches.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM Analytics" video=true >}}

### Integration with logs, APM, and profiler

View your [backend traces, logs, and infrastructure metrics][5] down to the exact line of code impacting your application performance, corresponding to user experiences and reported issues.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM and APM" >}}

### Error tracking and crash reporting

Get automated alerts on outliers and groups of errors, timeouts, and crashes to significantly reduce your MTTR with [Error Tracking][6].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM error tracking" video=true >}}

### Web and mobile vitals

View performance scores and telemetry for [browser applications][7] such as Core Web Vitals and Mobile Vitals for [iOS and tvOS][8] or [Android and Android TV applications][9].

### Web view tracking

Collect information from your native web applications and explore hybrid views with Web View Tracking for [iOS and tvOS][10] or [Android and Android TV][11].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Web Views captured in a user session in the RUM Explorer" >}}

## Explore Datadog Session Replay

### Session replays

Watch [browser recordings][12] of real users interacting with your website and set [privacy controls][13] for your organization.

### Developer tools

Access triggered logs, errors, and performance information when troubleshooting application issues using [Browser Dev Tools][14].


## Permissions

By default, all users can change an application's RUM configuration.

Use granular access controls to limit the [roles][18] that may edit a particular application's RUM configuration:
1. While viewing an application's RUM configuration, click on the **Edit application** button at the top of the screen. A dropdown appears.
1. Select **Manage App Permissions**.
1. Click **Restrict Access**.
1. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the dropdown to select one or more roles, teams, or users that may edit the notebook.
1. Click **Add**.
1. The dialog box updates to show that the role you selected has the **Editor** permission.
1. Click **Save**.

**Note:** To maintain your edit access to the application, the system requires you to include at least one role that you are a member of before saving.

You must have edit access to restore general access to a restricted application. Complete the following steps:
1. While viewing an application's RUM configuration, click on the **Edit application** button at the top of the screen. A dropdown appears.
1. Select **Manage App Permissions**.
1. Click **Restore Full Access**.
1. Click **Save**.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /real_user_monitoring/platform/dashboards/
[3]: /real_user_monitoring/explorer/visualize/
[4]: /monitors/types/real_user_monitoring/
[5]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[6]: /real_user_monitoring/error_tracking/
[7]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /real_user_monitoring/application_monitoring/ios/mobile_vitals/
[9]: /real_user_monitoring/application_monitoring/android/mobile_vitals/
[10]: /real_user_monitoring/application_monitoring/ios/web_view_tracking/
[11]: /real_user_monitoring/application_monitoring/android/web_view_tracking/
[12]: /session_replay/browser/
[13]: /session_replay/browser/privacy_options/
[14]: /session_replay/browser/developer_tools/
[15]: /real_user_monitoring/application_monitoring/browser/setup/
[16]: /real_user_monitoring/application_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /account_management/rbac/
