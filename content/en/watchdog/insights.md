---
title: Watchdog Insights
kind: documentation
description: View anomalies and outliers that match your search query with Watchdog Insights.
further_reading:
- link: "/logs/explorer/watchdog_insights/"
  tag: "Documentation"
  text: "Watchdog Insights for Logs"
- link: "/real_user_monitoring/explorer/watchdog_insights/"
  tag: "Documentation"
  text: "Watchdog Insights for RUM"
- link: "https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/"
  tag: "Blog"
  text: "Augmented troubleshooting with Watchdog Insights"
- link: "https://www.datadoghq.com/blog/watchdog-insights-apm/"
  tag: "Blog"
  text: "Automatically detect error and latency patterns with Watchdog Insights for APM"
---

## Overview

Investigating an incident requires trial and error. Drawing from their experience, engineers familiar with a particular area know where to first look for potential problems. Using Watchdog Insights allows all engineers, including less experienced ones, to pay attention to the most important data and accelerate their incident investigations.

When visiting most of Datadog product explorers or pages, Watchdog returns two types of insights:

- Anomalies: All the pre-calculated [Watchdog alerts][11] matching the active search query that Watchdog found by scanning your organisation's data. Access the full list in the [Watchdog Alert explorer][12].
- Outliers: Calculated on the product data matching the active query, it surfaces tags that either appear too frequently in some event types (e.g: errors) or drive some continuous metrics upwards (e.g: latency).

<<PICTURE FOR AN EXPLORER>>

## Explore insights

The Watchdog Insights carousel  sits near the top of the following product pages:

- [Log explorer][1]
- APM:
    - [Trace explorer][2]
    - [Service Page][3]
    - [Resource Page][4]
    - [Database explorer][5]
    - [Profile explorer][6]
- Infrastructure:
    - [Live Processes explorer][7]
    - [Serverless explorer][8]
    - [Containers explorer][9]
- [Real User Monitoring (RUM) explorer][10]

Expand the carousel for an overview. The highest priority insights (based on `State`, `Status`, `Start time`, `Anomaly type`) appear on the left.

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="The Watchdog Insights carousel on the Logs Explorer, showing three anomalies: new error logs in the web-store service, a spike in error logs in the product-recommendation service, and another spike in error logs in the product-recommendation service" >}}

Click **View all** to expand the panel. A side panel opens from the right, containing a vertical list of Watchdog Insights. Each entry shows a detailed view, with more information than the summary card.

Every insight comes with embedded interactions and a side panel with troubleshooting information. The insight interactions and side panel vary based on the Watchdog Insight type.

**Filter on Insight query**:

To refine your current view to match a Watchdog Insight, hover over the top right corner of an insight summary card. Two icons appear. Click on the inverted triangle icon with the tooltip **Filter on Insight**. The page refreshes to show a list of entries corresponding to the insight.

<<<<IMAGE TO INCLUDE>>>>>>>

## Outlier types

{{< tabs >}}
{{% tab "Log Management" %}}


{{% /tab %}}
{{% tab "APM" %}}



{{% /tab %}}
{{% tab "Profiling" %}}

- Error outlier
- Latency outlier

{{% /tab %}}
{{% tab "Databases" %}}

{{% /tab %}}
{{% tab "RUM" %}}

{{% /tab %}}
{{% tab "Serverless" %}}

For serverless infrastructures, Watchdog surfaces the following outliers:

- `Cold Start Ratio Up/Down`
- `Error Invocation Ratio Up/Down`
- `Memory Usage Up/Down`
- `OOM Ratio Up/Down`
- `Estimated Cost Up/Down`
- `Init Duration Up/Down`
- `Runtime Duration Up/Down`

{{% /tab %}}
{{% tab "Processes" %}}

- CPU
- Memory
  
{{% /tab %}}
{{% tab "Containers" %}}

- 

{{% /tab %}}
{{< /tabs >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/apm/traces
[3]: /tracing/services/service_page/
[4]: /tracing/services/resource_page/
[5]: https://app.datadoghq.com/databases/list
[6]: https://app.datadoghq.com/profiling/search
[7]: https://app.datadoghq.com/process
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/orchestration/overview/pod
[10]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aview
[11]: /watchdog/#overview
[12]: https://app.datadoghq.com/watchdog
