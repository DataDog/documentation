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

Datadog Watchdog constantly runs in the background, scanning for anomalies in your organization's entire data set. As you navigate the Datadog UI, Watchdog Insights show you the information most relevant to your current context. Using your active product and your active query, Watchdog Insights displays a filtered and sorted list of anomalies.

Investigating an incident requires trial and error. Drawing from their experience, engineers familiar with a particular area know where to first look for potential problems. Using Watchdog Insights allows all engineers, including less experienced ones, to pay attention to the most important data and accelerate their incident investigations.

Each insight highlights one outlier or anomaly affecting a subset of users. Depending on the product area, Watchdog Insights displays different types of anomalies. Examples include, but are not limited to, the following:
- Error outliers
- Latency outliers
- Log anomalies
- Lock pressure
- Deadlocked threads

## Navigation

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="The Watchdog Insights banner on the Logs Explorer, showing three anomalies: new error logs in the web-store service, a spike in error logs in the product-recommendation service, and another spike in error logs in the product-recommendation service" >}}

The Watchdog Insights banner sits near the top of each page. Expand the banner for an overview. The highest priority insights appear on the left. 

Click **View all** to expand the panel.

To refine your current view to match a Watchdog Insight, hover over the top right corner of an insight summary card. Two icons appear. Click on the inverted triangle icon with the tooltip **Filter on Insight**. The page refreshes to show a list of entries corresponding to the insight.

For a detailed view of an insight, click on the individual card. The full side panel opens from the right.

{{< img src="watchdog/profiler_watchdog_insight.png" alt="A Watchdog Insights full side panel view, with the title 'Lock Pressure is high in service:product-recommendation'" >}}

To share an insight in one click, click the **Copy Link** button on the full side panel. Your clipboard populates with the query that produced the Insight.

## Locations within Datadog

Four areas within Datadog feature Watchdog Insights: Infrastructure, APM, Log Management, and RUM.

### Infrastructure

Watchdog Insights appear in the Kubernetes Explorer tab in [Live Containers][1].

1. In the left navigation, hover over **Infrastructure**
2. Click **Kubernetes**
3. Select the **Explorer** tab at the top of the page
4. Choose one of the Kubernetes resource types in the **Select Resources** box
5. A list of your Kubernetes resources appears, with the Watchdog Insights panel at the top

### APM

Watchdog Insights appear on several pages within APM:
- [Trace Explorer][2]
- [Continuous Profiler][3]
- [Service Page][4]
- [Resource Page][5]

### Log Management

In the Log Explorer, Watchdog Insights finds two types of insights:
- [Log Anomaly Detection][6]
- [Error Outliers][7]

To locate Watchdog Insights in the Log Management UI, take the following steps:
1. In the left navigation, hover over **Logs**
2. Click **Search**

The pink Watchdog Insights banner appears in the middle of your screen, above your logs. If Watchdog cannot find any issues, the banner is gray.

For more information, see [Watchdog Insights for Logs][8].

### RUM

In the RUM explorer, Watchdog Insights finds two types of insights:
- [Error Outliers][9]
- [Latency Outliers][10]

To locate Watchdog Insights in the RUM UI, take the following steps:
1. In the left navigation, hover over **UX Monitoring**
2. Click **Sessions & Replays**

The pink Watchdog Insights banner appears in the middle of your screen, above your sessions. If Watchdog cannot find any issues, the banner is gray.

For more information, see [Watchdog Insights for RUM][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /infrastructure/livecontainers/#kubernetes-resources-view
[2]: /tracing/trace_explorer/
[3]: /tracing/profiler/
[4]: /tracing/services/service_page/
[5]: /tracing/services/resource_page/
[6]: /logs/explorer/watchdog_insights/#log-anomaly-detection
[7]: /logs/explorer/watchdog_insights/#error-outliers
[8]: /logs/explorer/watchdog_insights/
[9]: /real_user_monitoring/explorer/watchdog_insights/#error-outliers
[10]: /real_user_monitoring/explorer/watchdog_insights/#latency-outliers
[11]: /real_user_monitoring/explorer/watchdog_insights/
