---
title: RUM & Session Replay
kind: documentation
description: "Visualize, observe, and analyze the performance of your front-end applications as seen by your users."
disable_sidebar: true
aliases:
  - /real_user_monitoring/installation
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring"
    tag: "Release Notes"
    text: "Check out the latest Datadog RUM releases! (App login required)."
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
  - link: "/real_user_monitoring/browser/data_collected/"
    tag: "Documentation"
    text: "RUM Browser Data Collected"
  - link: "https://www.datadoghq.com/blog/hybrid-app-monitoring/"
    tag: "Blog"
    text: "Monitor your hybrid mobile applications with Datadog"
---

{{< img src="real_user_monitoring/RUM-perf-dashboard.jpeg" alt="RUM Dashboard" >}}

## What is Real User Monitoring?

Datadog's *Real User Monitoring (RUM)* gives you end-to-end visibility into the real-time activity and experience of individual users. RUM solves four types of use cases for monitoring web and mobile applications:

* **Performance**: Track the performance of web pages, mobile application screens, user actions, network requests, and your front-end code.
* **Error Management**: Monitor the ongoing bugs and issues and track them over time and versions.
* **Analytics / Usage**: Understand who is using your application (country, device, OS), monitor individual users journeys, and analyze how users interact with your application (most common page visited, clicks, interactions, and feature usage).
* **Support**: Retrieve all of the information related to one user session to troubleshoot an issue (session duration, pages visited, interactions, resources loaded, and errors).

## What is Session Replay?

Datadog's *Session Replay* allows you to capture and visually replay the web browsing experience of your users.

Combined with RUM performance data, Session Replay is beneficial for error identification, reproduction, and resolution, and provides insights into your web application’s usage patterns and design pitfalls.

## Get started

Select your application type to start collecting RUM data:

{{< partial name="rum/rum-getting-started.html" >}}

</br>

## Explore Datadog RUM

### Out-of-the-box dashboards

Analyze information about your user journeys, performance, network requests, and errors collected automatically with [out-of-the-box dashboards][1].

{{< img src="real_user_monitoring/RUM-session-dashboard.jpeg" alt="RUM dashboard" >}}

### RUM Explorer and visualizations

View user sessions in segments, such as checking when latency impacts your premium customers, with [visualizations][2]. Explore data, save views, and create monitors on your customized searches.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="RUM Analytics" video=true >}}

### Integration with logs, APM, and profiler

View your [backend traces, logs, and infrastructure metrics][3] down to the exact line of code impacting your application performance, corresponding to user experiences and reported issues.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM and APM" >}}

### Error tracking and crash reporting

Get automated alerts on outliers and groups of errors, timeouts, and crashes to significantly reduce your MTTR with [Error Tracking][4].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM error tracking" video=true >}}

## Explore Datadog Session Replay

### Session replays

Watch [browser recordings][5] of real users interacting with your website.

### Developer tools

Access triggered logs, errors, and performance information when troubleshooting application issues using [Browser Dev Tools][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/dashboards/
[2]: /real_user_monitoring/explorer/visualize/
[3]: /real_user_monitoring/connect_rum_and_traces/
[4]: /real_user_monitoring/error_tracking/
[5]: /real_user_monitoring/session_replay/
[6]: /real_user_monitoring/session_replay/developer_tools/
