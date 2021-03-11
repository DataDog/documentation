---
title: Real User Monitoring
kind: documentation
description: "Visualize and analyze the performance of your front end applications as seen by your users."
disable_sidebar: true
aliases:
  - /real_user_monitoring/installation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Introducing Datadog Real User Monitoring"
- link: "https://www.datadoghq.com/blog/datadog-mobile-rum/"
  tag: "Blog"
  text: "Improve mobile user experience with Datadog Mobile Real User Monitoring"
- link: "https://www.datadoghq.com/blog/error-tracking/"
  tag: "Blog"
  text: "Make sense of application issues with Datadog Error Tracking"
- link: "https://www.datadoghq.com/blog/unify-apm-rum-datadog/"
  tag: "Blog"
  text: "Unify APM and RUM data for full-stack visibility"
- link: "https://www.datadoghq.com/blog/datadog-geomaps/"
  tag: "Blog"
  text: "Use geomaps to visualize your app data by location"
- link: "/real_user_monitoring/browser/data_collected/"
  tag: "Documentation"
  text: "RUM Browser Data Collected"
---

{{< img src="real_user_monitoring/rum_full_dashboard.png" alt="RUM Dashboard"  >}}

## What is Real User Monitoring?


Datadog's Real User Monitoring (RUM) gives you end-to-end visibility into the real-time activity and experience of individual users. It is designed to solve 4 types of use cases for web and mobile applications:

* **Performance**: Track the performance of web pages, mobile application screens, user actions, network requests, and your front-end code.
* **Error Management**: Monitor the ongoing bugs and issues and track them over time and versions.
* **Analytics / Usage**: Understand who is using your application (country, device, OS), monitor individual users journeys, and analyze how users interact with your application (most common page visited, clicks, interactions, feature usage).
* **Support**: Retrieve all of the information related to one user session to troubleshoot an issue (session duration, pages visited, interactions, resources loaded, errors).



## Getting started

Select your application type to start collecting RUM data:

{{< partial name="rum/rum-getting-started.html" >}}
</br>
## Explore Datadog RUM

### Out of the box dashboards

Analyze information about your user journeys, performance, network requests, and errors collected automatically with [out of the box dashboards][1].

{{< img src="real_user_monitoring/dashboards/rum_dashboard.png" alt="RUM dashboard" >}}

### RUM Explorer and Analytics

View user sessions in segments, such as checking when latency impacts your premium customers with [customizable analytics widgets][2]. Explore, save views, and create monitors on your customized searches.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.gif" alt="RUM Analytics"  >}}

### Seamless integration with Logs, APM and Profiler

View your [backend traces, logs, infrastructure metrics][1] down to the exact line of code impacting your application performance, corresponding to user experiences and reported issues.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM and APM">}}

### Error tracking and crash reporting

Get automated alerts on outliers and groups of errors, timeouts, and crashes to significantly reduce your MTTR with [Error Tracking][4].

{{< img src="real_user_monitoring/error_tracking/rum_errors.gif" alt="RUM error tracking">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]:/real_user_monitoring/dashboards
[2]:/real_user_monitoring/explorer/analytics
[4]:/real_user_monitoring/error_tracking
[1]: /real_user_monitoring/connect_rum_and_traces
