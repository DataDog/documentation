---
title: Alerting With RUM Data

description: Guide for creating alerts on RUM events.
further_reading:
- link: '/real_user_monitoring/platform/dashboards/'
  tag: 'Documentation'
  text: 'RUM Dashboards'
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'RUM Monitor'
- link: '/monitors/'
  tag: 'Documentation'
  text: 'Alerting'
---

## Overview

Real User Monitoring allows you to create alerts which notify you about atypical behavior in your applications. You can create RUM monitors with complex conditions, predefined thresholds, and multiple queries to calculate averages, ratios, and performance indicator metrics (such as Apdex).

## Define your search query

To create a RUM monitor, see the [RUM Monitor documentation][1] first. You can add one or many queries to filter through your RUM data in the [RUM Explorer][2]. For each query, you can scope it on an application level or a more granular level like a specific page.

You can use any facets that RUM collects, including [custom facets and measures][3]. Use the `measure by` field to measure view-related counts such as load time, time spent, and error count.

{{< img src="real_user_monitoring/guide/alerting-with-rum/high-rum-views-errors.png" alt="Search query for an alert where a view exceeds more than eight errors" style="width:100%;">}}

The example above is a search query for a RUM monitor configured for views on the Shopist iOS application with facets such as `Application ID` and `View Path`. This example monitor alerts when a view has a high amount of errors (for example, more than 8).

## Export your query to a monitor

You can export search queries from the [RUM Explorer][2] to a monitor to retain all the context for the query.

{{< img src="real_user_monitoring/guide/alerting-with-rum/export-to-monitor-3.mp4" alt="Export button to the right hand corner of the RUM Explorer" video="true" style="width:100%;" >}}

The example above is a search query for a RUM monitor configured for images that are larger than 1Mb. Large images may reduce your application's performance. 

Click the **Export** button to export your search query to a pre-configured RUM monitor. For more information, see [Export RUM Events][4].

## Route your alert

Once you have created an alert, route the alert to an individual or a team channel by writing a message and sending a test notification. For more information, see [Notifications][5].

## Alerting examples

The following examples highlight use cases for alerting with your RUM data.

### Revenue dips

With RUM's [global context][6], you can enrich your RUM events with business-specific attributes such as the purchase amount for each user.

Assuming that most users of the example application spend between $800 to $1000, this example shows a RUM monitor configured to spot deviations in users' spending patterns week by week. 

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-monitor.png" alt="RUM Monitor for revenue dips" style="width:100%;" >}}

To compare this week's spending to last week's spending, add a function such as `week_before` next to the `roll up every` field. You can also apply the absolute value to calculate the difference in purchasing amount from last week to this week. When the week-over-week difference exceeds $50, the alert sends a notification.

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-alerting-conditions.png" alt="Alerting conditions for a RUM monitor about revenue dips" style="width:100%;" >}}

### Error rates

The ratio of errors to requests allows you to calculate what percentage of requests are resulting in errors.

This example shows a RUM monitor for the error rate of the `/cart` page on a sample Shop.ist application.

{{< img src="real_user_monitoring/guide/alerting-with-rum/error-rate-example-monitor.png" alt="RUM monitor for error rates" style="width:100%;" >}}

### Performance vitals

Real User Monitoring measures, calculates, and scores application performance as [Core Web Vitals][7] and [Mobile Vitals][8]. For example, Largest Contentful Paint (LCP) measures loading performance and is benchmarked at 2.5 seconds when the page starts loading.

This example shows a RUM monitor for the LCP of the `/cart` page on a sample Shop.ist application.
 
{{< img src="real_user_monitoring/guide/alerting-with-rum/high-largest-contentful-paint-example-monitor.png" alt="RUM monitor for high Largest Contentful Paint" style="width:100%;" >}}

This example monitor warns when the LCP takes 2 seconds to load and alerts when the LCP takes longer than 2.5 seconds to load.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/real_user_monitoring/#create-a-rum-monitor
[2]: https://app.datadoghq.com/rum/explorer
[3]: /real_user_monitoring/guide/send-rum-custom-actions/#create-facets-and-measures-on-attributes
[4]: /real_user_monitoring/explorer/export/
[5]: /monitors/notify/
[6]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[7]: /real_user_monitoring/browser/monitoring_page_performance/#all-performance-metrics
[8]: /real_user_monitoring/android/mobile_vitals/
