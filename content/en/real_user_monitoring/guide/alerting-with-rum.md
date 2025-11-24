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

Real User Monitoring allows you to create alerts which notify you about atypical behavior in your applications. With [RUM without Limits][1], use metric-based monitors to alert on your full, unsampled traffic with 15-month retention. Metric-based monitors support advanced alerting conditions including anomaly detection, outlier detection, and forecasts.

## Create a RUM monitor

To create a RUM monitor in Datadog, first navigate to [Monitors > New Monitor > Real User Monitoring][2].

From there, you can click **New Monitor**, then:

- **[Start with a template][3]**: Select a pre-built template for common scenarios like error rates, performance vitals, or availability checks
- **Build a custom monitor**: Choose from out-of-the-box metrics or custom metrics, then scope to your application, specific pages, or views

Learn more about [creating RUM Monitors][4].

## Metric-based and event-based monitors

For RUM without Limits customers, metric-based monitors are the recommended standard for the following benefits:

- **Complete traffic visibility**: Metrics are computed over your full, unsampled traffic before retention filters apply, giving you an unbiased picture of application health
- **Avoid blind spots**: Event-based monitors depend on retention filters and can miss issues if relevant events aren't indexed
- **Advanced capabilities**: Metric-based monitors support anomaly detection, outlier detection, and forecasts
- **15-month retention**: Metrics provide long-term visibility into trends and patterns

Datadog recommends using **event-based monitors** for specific use cases where you need to alert on indexed events. When using event-based monitors, configure retention filters to ensure meaningful data is available.

To create an event-based monitor, you can export search queries from the [RUM Explorer][5]. Use any facets that RUM collects, including [custom facets and measures][6], and the `measure by` field for view-related counts like load time and error count.

## Export queries from the RUM homepage

For event-based monitoring use cases, you can export existing queries from the [RUM homepage][12] to create a monitor with all the query context preserved.

{{< img src="real_user_monitoring/guide/alerting-with-rum/create-monitor-homepage.png" alt="Export button to the right hand corner of the RUM Explorer" style="width:100%;" >}}

Click the **Export > Create Monitor** button to export a widget to a pre-configured RUM monitor. For more information, see [Export RUM Events][7]. Remember that event-based monitors should be used alongside properly configured retention filters.

## Route your alert

After you have created an alert, route the alert to an individual or a team channel by writing a message and sending a test notification. For more information, see [Notifications][8].

## Alerting examples

The following examples highlight common use cases for RUM monitors. For RUM without Limits customers, these scenarios can be implemented using metric-based monitors for complete traffic coverage and advanced alerting capabilities.

### Revenue dips

With RUM's [global context][9], you can enrich your RUM events with business-specific attributes such as the purchase amount for each user.

Assuming that most users of the example application spend between $800 to $1000, this example shows a RUM monitor configured to spot deviations in users' spending patterns week by week. 

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-monitor.png" alt="RUM Monitor for revenue dips" style="width:100%;" >}}

To compare this week's spending to last week's spending, add a function such as `week_before` next to the `roll up every` field. You can also apply the absolute value to calculate the difference in purchasing amount from last week to this week. When the week-over-week difference exceeds $50, the alert sends a notification.

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-alerting-conditions.png" alt="Alerting conditions for a RUM monitor about revenue dips" style="width:100%;" >}}

### Error rates

The ratio of errors to requests allows you to calculate what percentage of requests are resulting in errors.

This example shows a RUM monitor for the error rate of the `/cart` page on a sample Shop.ist application.

{{< img src="real_user_monitoring/guide/alerting-with-rum/error-rate-example-monitor.png" alt="RUM monitor for error rates" style="width:100%;" >}}

### Performance vitals

Real User Monitoring measures, calculates, and scores application performance as [Core Web Vitals][10] and [Mobile Vitals][11]. For example, Largest Contentful Paint (LCP) measures loading performance and is benchmarked at 2.5 seconds when the page starts loading.

This example shows a RUM monitor for the LCP of the `/cart` page on a sample Shop.ist application.
 
{{< img src="real_user_monitoring/guide/alerting-with-rum/high-largest-contentful-paint-example-monitor.png" alt="RUM monitor for high Largest Contentful Paint" style="width:100%;" >}}

This example monitor warns when the LCP takes 2 seconds to load and alerts when the LCP takes longer than 2.5 seconds to load. With metric-based monitors, you can also use anomaly detection to automatically identify when performance metrics deviate from normal patterns, or use forecast alerts to predict when thresholds might be breached.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/rum_without_limits
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: https://app.datadoghq.com/monitors/templates?q=real%20user%20monitoring&origination=installed&p=1
[4]: /monitors/types/real_user_monitoring/#create-a-rum-monitor
[5]: https://app.datadoghq.com/rum/explorer
[6]: /real_user_monitoring/guide/send-rum-custom-actions/#create-facets-and-measures-on-attributes
[7]: /real_user_monitoring/explorer/export/
[8]: /monitors/notify/
[9]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[10]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-metrics
[11]: /real_user_monitoring/android/mobile_vitals/
[12]: https://app.datadoghq.com/rum/performance-monitoring