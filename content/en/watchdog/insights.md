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

Datadog Watchdog constantly runs in the background, scanning for anomalies in your organization's entire data set. In contrast, Watchdog Insights meet you where you are within Datadog. Insights operate on your active product and your active query to show you a filtered, sorted list of anomalies. Using Watchdog Insights draws your attention to the most important data and accelerates your incident investigations.

Each Insight highlights one outlier or anomaly affecting a subset of users. Depending on the product area, Watchdog Insights can detect different types of anomalies. Examples include the following:
- Error outliers
- Latency outliers
- Log anomalies
- Lock pressure
- Deadlocked threads

## Navigation

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="The Watchdog Insights banner on the Logs Explorer, showing three anomalies: new error logs in the web-store service, a spike in error logs in the product-recommendation service, and another spike in error logs in the product-recommendation service" >}}

The Watchdog Insights banner sits near the top of each page. Expand the banner for an overview. The highest priority Insights appear on the left. 

Click **View all** to expand the panel.

To refine your current view to match a Watchdog Insight, hover over the top right corner of an Insight summary card. Two icons appear. Click on the inverted triangle icon with the tooltip **Filter on Insight**. The page refreshes to show a list of entries corresponding to the Insight.

For a detailed view of an Insight, click on the individual card. The full side panel opens from the right.

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
- [Service Page][9]
- [Resource Page][10]

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
