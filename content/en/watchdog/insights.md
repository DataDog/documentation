---
title: Watchdog Insights
kind: documentation
description: View anomalies and outliers in context with Watchdog Insights
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/"
  tag: "Blog"
  text: "Augmented troubleshooting with Watchdog Insights"
- link: "https://www.datadoghq.com/blog/watchdog-insights-apm/"
  tag: "Blog"
  text: "Automatically detect error and latency patterns with Watchdog Insights for APM"
---

## Overview

Watchdog Insights inform you of anomalies and error outliers that relate to your current view, including any facets or search terms. During an incident, use Watchdog Insights to focus on the highest priority data and speed up investigation.

Each Insight highlights one outlier or anomaly affecting a subset of users. Depending on the product area, Watchdog Insights can detect different types of anomalies.

## Locations within Datadog

Three areas within Datadog feature Watchdog Insights: Log Management, RUM, and APM.

### Log Management

In the Log Explorer, Watchdog Insights finds two types of insights:
- [Log Anomaly Detection][1]
- [Error Outliers][2]

To locate Watchdog Insights in the Log Management UI, take the following steps:
1. In the left navigation, hover over **Logs**
2. Click **Search**

The pink Watchdog Insights banner appears in the middle of your screen, above your logs. If Watchdog cannot find any issues, the banner is gray.

For more information, see [Watchdog Insights for Logs][3].

### RUM

In the RUM explorer, Watchdog Insights finds two types of insights:
- [Error Outliers][4]
- [Latency Outliers][5]

To locate Watchdog Insights in the RUM UI, take the following steps:
1. In the left navigation, hover over **UX Monitoring**
2. Click **Sessions & Replays**

The pink Watchdog Insights banner appears in the middle of your screen, above your sessions. If Watchdog cannot find any issues, the banner is gray.

For more information, see [Watchdog Insights for RUM][6].

### APM

Watchdog Insights appear on several pages within APM:
- [Trace Explorer][7]
- [Continuous Profiler][8]
- Service Catalog (beta)
- [Service Page][9]
- [Resource Page][10]

## Navigation

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="The Watchdog Insights banner on the Logs Explorer, showing three anomalies: new error logs in the web-store service, a spike in error logs in the product-recommendation service, and another spike in error logs in the product-recommendation service" >}}

The Watchdog Insights banner sits near the top of each page. Expand the banner for an overview. The highest priority Insights appear on the left. 

Click **View all** to expand the panel.

Click an individual panel for a detailed view.

[1]: /logs/explorer/watchdog_insights/#log-anomaly-detection
[2]: /logs/explorer/watchdog_insights/#error-outliers
[3]: /logs/explorer/watchdog_insights/
[4]: /real_user_monitoring/explorer/watchdog_insights/#error-outliers
[5]: /real_user_monitoring/explorer/watchdog_insights/#latency-outliers
[6]: /real_user_monitoring/explorer/watchdog_insights/
[7]: /tracing/trace_explorer/
[8]: /tracing/profiler/
[9]: /tracing/services/service_page/
[10]: /tracing/services/resource_page/
