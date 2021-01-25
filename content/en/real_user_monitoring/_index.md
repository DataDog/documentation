---
title: Real User Monitoring
kind: documentation
description: "Visualize and analyze the performance of your front end applications as seen by your users."
disable_toc: true
aliases:
  - /real_user_monitoring/installation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

{{< img src="real_user_monitoring/rum_full_dashboard.png" alt="RUM Dashboard"  >}}

## What is Real User Monitoring?


Datadog's Real User Monitoring (RUM) gives you end-to-end visibility into the real-time activity and experience of individual users. It is designed to solve 4 types of use cases for web and mobile applications:

* **Performance**: Track the performance of web pages, mobile application screens, user actions, network requests, and your front-end code
* **Error Management**: Monitor the ongoing bugs and issues and track them over time and versions
* **Analytics / Usage**: Understand who is using your application (country, device, OS…), monitor individual users journeys, and analyze how users interact with your application (most common page visited, clicks, interactions, feature usage…)
* **Support**: Retrieve all of the information related to one user session to troubleshoot an issue (session duration, pages visited, interactions, resources loaded, errors…)

{{< whatsnext desc="Get started with RUM:">}}
  {{< nextlink href="/real_user_monitoring/browser">}}<u>Browser Monitoring</u>: Create an application by configuring the browser SDK.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/android">}}<u>Android Monitoring</u>: Create an application by configuring the Android SDK.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards">}}<u>Dashboards</u>: Discover all data collected out of the box within an out of the box Dashboard.{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="Explore your RUM events:">}}
  {{< nextlink href="/real_user_monitoring/explorer/">}}<u>RUM Search</u>: Search through your page views.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/explorer/analytics">}}<u>RUM Analytics</u>: Get insights from all your events.{{< /nextlink >}}
{{< /whatsnext >}}

## Getting started

Select your application type to start collecting RUM data:

{{< partial name="rum/rum-getting-started.html" >}}
</br>
## Explore Datadog RUM

### Out of the Box Dashboards

Analyze information about your user journeys, performance, network requests, and errors collected automatically with out of the box dashboards.

{{< img src="real_user_monitoring/dashboards/rum_dashboard.png" alt="RUM dashboard" >}}

### RUM Explorer and Analytics

Slice and dice user sessions by segments such as checking when latency impacts your premium customers with customizable analytics widgets. Explore, save views and create monitors on your customized searches.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mov" alt="RUM Analytics"  >}}

### Seamless integration with Logs, APM and Profiler

View your backend traces, logs, infrastructure metrics to line of code impacting your application performance that correspond  to user experiences and reported issues.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs.png" alt="RUM and APM">}}

### Error tracking and crash reporting

Get automated alerts on outliers and groups of errors, timeouts, crashes to significantly reduce your MTTR.

{{< img src="real_user_monitoring/error_tracking/rum_errors.mov" alt="RUM error tracking">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


