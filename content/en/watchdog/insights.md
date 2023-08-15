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

The Watchdog Insights carousel sits near the top of the following product pages:

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

**Error outliers**

Error outliers display fields such as [faceted tags or attributes][1] containing characteristics of errors that match the current query. Statistically overrepresented `key:value` pairs among errors provide hints into the root cause of problems.

Typical examples of error outliers include `env:staging`, `docker_image:acme:3.1`, and `http.useragent_details.browser.family:curl`.

In the **banner card** view, you can see:

  * The field name.
  * The proportion of errors and overall logs that the field contributes to.

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="The error outlier card showing a red bar with 73.3% of total errors and a blue bar with 8.31% of total errors" style="width:50%;" >}}

In the **side panel card** view, you can see the main [log pattern][2] of error logs with the field.

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="Error Outlier card (L)" style="width:100%;" >}}

In the **full side panel** view, you can see:

  * The timeseries of error logs that contain the field.
  * Tags that are often associated with the error logs.
  * A comprehensive list of [log patterns][2].

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier side panel" style="width:100%;" >}}

[1]: /logs/explorer/facets/
[2]: /logs/explorer/analytics/patterns
{{% /tab %}}
{{% tab "APM" %}}

APM Outliers are available on all APM pages where the carousel is available:
 - [Trace explorer](/tracing/trace_explorer/?tab=listview)
 - [Service Page](/tracing/services/service_page/)
 - [Resource Page](/tracing/services/resource_page/)

**Error outliers**

Error outliers display fields such as tags containing characteristics of errors that match the current query. Statistically overrepresented `key:value` pairs among errors provide hints into the root cause of problems.

Typical examples of error outliers include `env:staging`, `availability_zone:us-east-1a`, `cluster_name:chinook`, and `version:v123456`.

In the **banner card** view, you can see:

  * The field name.
  * The proportion of errors and overall traces that the field contributes to.

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_s_card.png" alt="The error outlier card showing a red bar with 24.2% of total errors and a blue bar with 12.1% of total errors" style="width:100%;" >}}

In the **full side panel** view, you can see:

  * The timeseries of error traces that contain the field.
  * Tags that are often associated with the error traces.
  * A comprehensive list of related Error Tracking Issues and failing spans.

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier side panel" style="width:100%;" >}}

**Latency Outlier**

Latency outliers display fields such as tags that are associated with performance bottlenecks that match the current search query. `key:value` pairs with worse performance than the baseline can provide hints into the performance bottlenecks among a subset of APM spans.

Latency outliers are computed for the span duration.

In the **banner card** view, you can see:

* The field name
* The latency distribution for spans containing the tag and the baseline for the rest of the data
* A percentile of interest latency value for the outlier tag and the difference with the baseline for the rest of the data

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outlier_s_card.png" alt="Latency Outlier banner card" style="width:100%;" >}}

In the **full side panel**, you can see a latency distribution graph for the tag and the baseline with an X axis of increments of `p50`, `p75`, `p99`, and `max`, along with a list of APM events that contain the field.

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outlier_side_panel.png" alt="Latency Outlier full side panel view" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Profiling" %}}

TODO

{{% /tab %}}
{{% tab "Databases" %}}

{{% /tab %}}
{{% tab "RUM" %}}

**Error Outlier**

Error outliers display fields such as [faceted tags or attributes][3] that contain characteristics of errors that match the current search query. Statistically overrepresented `key:value` pairs among errors can provide hints into the root cause of issues. Typical examples of error outliers include `env:staging`, `version:1234`, and `browser.name:Chrome`.

In the **banner card** view, you can see:

* The field name
* The proportion of total errors and overall RUM events that the field contributes to
* Related tags

In the **full side panel**, you can see a timeseries graph about the total number of RUM errors with the field along with a impact pie charts and a list of RUM events that contain the field.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="Error Outlier full side panel" style="width:100%;" >}}

**Latency Outlier**

Latency outliers display fields such as [faceted tags or attributes][1] that are associated with performance bottlenecks that match the current search query. `key:value` pairs with worse performance than the baseline can provide hints into the performance bottlenecks among a subset of real users.

Latency outliers are computed for [Core Web Vitals][2] such as First Contentful Paint, First Input Delay, Cumulative Layout Shift, and [Loading Time][3]. For more information, see [Monitoring Page Performance][2].

In the **banner card** view, you can see:

* The field name
* The performance metric value containing the field and the baseline for the rest of the data

In the **full side panel**, you can see a timeseries graph about the performance metric with an X axis of increments of `p50`, `p75`, `p99`, and `max`, along with a list of RUM events that contain the field.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="Latency Outlier full side panel view" style="width:100%;" >}}

[1]: /real_user_monitoring/explorer/search/#facets
[2]: /real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[3]: /real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
{{% /tab %}}
{{% tab "Serverless" %}}

TODO

For serverless infrastructures, Watchdog surfaces the following outliers:

- `Cold Start Ratio Up/Down`
- `Error Invocation Ratio Up/Down`
- `Memory Usage Up/Down`
- `OOM Ratio Up/Down`
- `Estimated Cost Up/Down`
- `Init Duration Up/Down`
- `Runtime Duration Up/Down`

{{% /tab %}}
{{% tab "Live Processes" %}}

TODO
For live Processes Watchdog calculate outliers on the following metrics:

- CPU
- Memory

{{% /tab %}}
{{% tab "Containers" %}}

TODO
For Containers Watchdog calculate outliers on the following:

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
