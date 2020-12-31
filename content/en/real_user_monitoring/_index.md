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

* **Performance**: track the performance of web pages, application screens, but also of user actions, network requests, and the performance of your front-end code
* **Error Management**: monitor the ongoing bugs and issues and track them over time
* **Analytics / Usage**: understand who is using your application (country, device, OS…), monitor individual users journeys, and analyze how users interact with your application (most common page visited, clicks, interactions, feature usage…)
* **Support**: retrieve all of the information related to one user session to troubleshoot an issue (session duration, pages visited, interactions, resources loaded, errors…)

## Getting started

Select your application type to start collecting RUM data:

{{< partial name="rum/rum-getting-started.html" >}}
</br>
## Explore Datadog RUM

### Out of the Box Dashboards

Discover all data collected automatically and displayed on out of the box dashboards.

{{< img src="real_user_monitoring/dashboards/rum_applications.gif" alt="RUM applications" >}}

### RUM Explorer

Explore through your page views and other user data.

{{< img src="real_user_monitoring/explorer/rum_explorer.png" alt="RUM explorer"  >}}

### RUM Analytics

Get insights from all the events happening in your UI.

{{< img src="real_user_monitoring/explorer/analytics/top_list_rum.png" alt="top list RUM example">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
