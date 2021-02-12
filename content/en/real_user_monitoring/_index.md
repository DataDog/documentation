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
  text: "Real User Monitoring"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

{{< img src="real_user_monitoring/rum_full_dashboard.png" alt="RUM Dashboard"  >}}

## What is Real User Monitoring?


Datadog's Real User Monitoring (RUM) gives you end-to-end visibility into the real-time activity and experience of individual users. It is designed to solve 4 types of use cases for web and mobile applications:

* **Performance**: track the performance of web pages, application screens, but also of user actions, network requests, and the performance of your front-end code
* **Error Management**: monitor the ongoing bugs and issues and track them over time
* **Analytics / Usage**: understand who is using your application (country, device, OS…), monitor individual users journeys, and analyze how users interact with your application (most common page visited, clicks, interactions, feature usage…)
* **Support**: retrieve all of the information related to one user session to troubleshoot an issue (session duration, pages visited, interactions, resources loaded, errors…)

{{< whatsnext desc="Get started with RUM:">}}
  {{< nextlink href="/real_user_monitoring/browser">}}<u>Browser Monitoring</u>: Create an application by configuring the browser SDK.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/android">}}<u>Android Monitoring</u>: Create an application by configuring the Android SDK.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards">}}<u>Dashboards</u>: Discover all data collected out of the box within an out of the box Dashboard.{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="Explore your RUM events:">}}
  {{< nextlink href="/real_user_monitoring/explorer/">}}<u>RUM Search</u>: Search through your page views.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/explorer/analytics">}}<u>RUM Analytics</u>: Get insights from all your events.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
