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

Real User Monitoring (RUM) lets you create alerts about atypical behavior in your applications. With [RUM without Limits™][1], use metric-based monitors to alert on your full unsampled traffic with 15-month retention. Metric-based monitors support advanced alerting conditions such as anomaly detection.

## Create a RUM monitor

To create a RUM monitor in Datadog, first, navigate to [Monitors > New Monitor > Real User Monitoring][2].

Next, choose one of the following methods to create your monitor:

- **[Start with a template][3]**: Datadog provides several pre-built templates for common RUM monitoring scenarios like error rates, performance vitals, or availability checks. Browse the [full template gallery][3] to get started.
- **Build a custom monitor**: Choose from out-of-the-box metrics or custom metrics, then scope to your application, specific pages, or views.

Learn more about [creating RUM Monitors][4].

## Choosing between monitoring metrics and events

Choose what to monitor based on your use case:

- **Full traffic metrics** - Best for monitoring availability, loading times, error rates, and user experience trends. For RUM without Limits™ customers, metric-based monitors provide full unsampled traffic visibility (before retention filters apply), 15-month retention, and advanced capabilities like anomaly detection and forecasts.
- **Retained events** - Best for detecting critical, low-frequency issues that require full event context. Use event-based monitors when you need to alert on indexed data or specific attributes not available as metrics. Configure retention filters to ensure the relevant data is captured.


  To create an event-based monitor, you can export search queries from the [RUM Explorer][5]. Use any facets that RUM collects, including [custom facets and measures][6], and the `measure by` field for view-related counts like load time and error count.

## Export queries from the RUM homepage

You can export existing queries from the [RUM homepage][12] to create a monitor with all queries and context preserved. For customers on [RUM without Limits™][1], the queries powering those widgets are based on the [out-of-the-box metrics][13]. For customers on the legacy model, they are based on [events][14].

{{< img src="real_user_monitoring/guide/alerting-with-rum/create-monitor-homepage.png" alt="Export button to the right hand corner of the RUM Explorer" style="width:100%;" >}}

Click the **Export > Create Monitor** button to export a widget to a pre-configured RUM monitor. For more information, see [Export RUM Events][7]. Remember that event-based monitors should be used alongside properly configured retention filters.

## Route your alert

After creating an alert, route it to people or channels by writing a message and sending a test notification. For more information, see [Notifications][8].

## Alerting examples

The following examples highlight common use cases for RUM monitors. For RUM without Limits customers, these scenarios can be implemented using metric-based monitors for visibility into your full traffic and advanced alerting capabilities.

### Traffic monitoring with anomaly detection

Session count monitoring helps teams detect unusual traffic patterns that could indicate issues or opportunities. Unlike threshold-based alerts, anomaly detection automatically learns normal traffic patterns and alerts when behavior deviates significantly.

This example shows a RUM monitor using anomaly detection to track session counts over time. The monitor can be scoped to a specific application or service to detect unexpected drops or spikes in user traffic. Anomaly detection is particularly useful for traffic monitoring because it adapts to daily and weekly patterns, reducing false alerts from expected traffic variations.

{{< img src="real_user_monitoring/guide/alerting-with-rum/traffic-anomaly.png" alt="RUM monitor query showing count of sessions metric summed by application name, with anomaly alert conditions configured to trigger when values deviate from expected patterns" style="width:100%;" >}}

### Crash-free sessions

The crash-free rate helps teams track how often mobile sessions complete without errors.

This example uses mobile RUM to evaluate application stability across release versions. The monitor is filtered to a specific application (for example, `Shop.ist iOS`) and grouped by `version` to help identify regressions tied to specific releases. The query combines crash-free sessions and total sessions to calculate the crash-free rate as a percentage.

{{< img src="real_user_monitoring/guide/alerting-with-rum/crash-free-sessions.png" alt="Query view showing two RUM metric queries for crash-free and inactive sessions, filtered on the Shop.ist iOS app and grouped by version, combined into a formula to calculate a crash-free rate." style="width:100%;" >}}

### Performance vitals

Real User Monitoring measures, calculates, and scores application performance as [Core Web Vitals][10] and [Mobile Vitals][11]. For example, Interaction to Next Paint (INP) measures responsiveness by tracking the time from a user interaction to the next paint. A widely used benchmark is 200 milliseconds or less for good responsiveness.

This example shows a RUM monitor for the INP metric filtered to a specific application (for example, `Shop.ist`) and grouped by `view name` to track performance across different pages. Grouping by view name helps pinpoint which pages have performance issues.
 
{{< img src="real_user_monitoring/guide/alerting-with-rum/core-web-vital-1.png" alt="RUM monitor query showing Interaction to Next Paint (INP) metric with p75 aggregation grouped by view name, with threshold alert conditions set for warning and alert levels" style="width:100%;" >}}

This example monitor warns when INP exceeds 200 milliseconds and alerts when INP exceeds 500 milliseconds. With metric-based monitors, you can also use anomaly detection to help identify when performance metrics deviate from normal patterns, or use forecast alerts to predict when thresholds might be breached.

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
[13]: /real_user_monitoring/rum_without_limits/metrics
[14]: /real_user_monitoring/explorer/events/