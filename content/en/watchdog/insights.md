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

Throughout most of Datadog, Watchdog returns two types of insights:

- **Anomalies**: All the pre-calculated [Watchdog alerts][11] matching the active search query that Watchdog found by scanning your organization's data. Access the full list in the [Watchdog Alert explorer][12].
- **Outliers**: Tags that appear too frequently in some event types (for example, errors) or drive some continuous metrics upwards (for example, latency).  Outliers are dynamically calculated on the data matching the active query and the time frame.

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="The log explorer showing the Watchdog Insights banner with five log anomalies" style="width:100%;" >}}

## Explore insights

The Watchdog Insights carousel sits near the top of the following product pages:

- [Log explorer][1]
- APM:
    - [Trace Explorer][2]
    - [Service Page][3]
    - [Resource Page][4]
    - [Database Explorer][5]
    - [Profile Explorer][6]
- Infrastructure:
    - [Processes Explorer][7]
    - [Serverless Explorer][8]
    - [Kubernetes Explorer][9]
- [Real User Monitoring (RUM) Explorer][10]
- [Synthetic Monitoring & Testing Explorer][14]
- [Error Tracking issue side panel][13]

Expand the carousel for an overview. The highest priority insights (based on `Insight type`, `State`, `Status`, `Start time`, `Anomaly type`) appear on the left.

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="The Watchdog Insights carousel on the Logs Explorer, showing three anomalies: new error logs in the web-store service, a spike in error logs in the product-recommendation service, and another spike in error logs in the product-recommendation service" style="width:100%;">}}

Click **View all** to expand the panel. A side panel opens from the right, containing a vertical list of Watchdog Insights. Each entry shows a detailed view, with more information than the summary card.

Every outlier comes with embedded interactions and a side panel with troubleshooting information. Each Insight's interactions and side panel vary based on the Watchdog Insight type.

### Filter on Insight query

To refine your current view to match a Watchdog Insight, hover over the top right corner of an Insight summary card. Two icons appear. Click on the inverted triangle icon with the tooltip **Filter on Insight**. The page refreshes to show a list of entries corresponding to the insight.

{{< img src="watchdog/filter_on_insight.png" alt="Filtering the explorer on the insight context" style="width:70%;">}}

### Share an outlier

To share a given outlier, click on it in the insight panel to open the details side panel. Click the **Copy Link** button at the top of the details panel:

{{< img src="watchdog/share-outlier.png" alt="Outlier side panel showing how to copy the link" style="width:80%;">}}

The link to the outlier expires with the retention of the underlying data. For instance, if the logs used to build the outlier are retained for 15 days, the link to the outlier expires with the logs after 15 days.

## Outlier types

{{< tabs >}}
{{% tab "Log Management" %}}

### Error outliers

Error outliers display fields such as [faceted tags or attributes][1] containing characteristics of errors that match the current query. Statistically overrepresented `key:value` pairs among errors provide hints into the root causes of problems.

Typical examples of error outliers include `env:staging`, `docker_image:acme:3.1`, and `http.useragent_details.browser.family:curl`.

In the banner card view, you can see:

  * The field name
  * The proportion of errors and overall logs that the field contributes to

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="The error outlier card showing a red bar with 73.3% of total errors and a blue bar with 8.31% of total errors" style="width:50%;" >}}

In the full side panel view, you can see:

  * The timeseries of error logs that contain the field
  * Tags that are often associated with the error logs
  * A comprehensive list of [log patterns][2]

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier side panel" style="width:100%;" >}}

[1]: /logs/explorer/facets/
[2]: /logs/explorer/analytics/patterns
{{% /tab %}}
{{% tab "APM" %}}

APM outliers are available on all APM pages where the Watchdog Insights carousel is available:
 - [Trace Explorer](/tracing/trace_explorer/?tab=listview)
 - [Service Page](/tracing/services/service_page/)
 - [Resource Page](/tracing/services/resource_page/)

### Error outliers

Error outliers display fields such as tags containing characteristics of errors that match the current query. Statistically overrepresented `key:value` pairs among errors provide hints into the root cause of problems.

Typical examples of error outliers include `env:staging`, `availability_zone:us-east-1a`, `cluster_name:chinook`, and `version:v123456`.

In the banner card view, you can see:

  * The field name
  * The proportion of errors and overall traces that the field contributes to

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_s_card.png" alt="The error outlier card showing a red bar with 24.2% of total errors and a blue bar with 12.1% of total errors" style="width:30%;" >}}

In the full side panel view, you can see:

  * The timeseries of error traces that contain the field
  * Tags that are often associated with the error traces
  * A comprehensive list of related Error Tracking Issues and failing spans

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_side_panel.png" alt="Error Outlier side panel" style="width:100%;" >}}

### Latency outliers

Latency outliers display fields such as tags that are associated with performance bottlenecks that match the current search query. `key:value` pairs with worse performance than the baseline can provide hints into the performance bottlenecks among a subset of APM spans.

Latency outliers are computed for the span duration.

In the banner card view, you can see:

* The field name
* The latency distribution for spans containing the tag and the baseline for the rest of the data
* A percentile of interest latency value for the outlier tag and the difference with the baseline for the rest of the data

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outliers_s_card.png" alt="Latency Outlier banner card" style="width:30%;" >}}

In the full side panel, you can see a latency distribution graph for the tag and the baseline. The X axis has increments of `p50`, `p75`, `p99`, and `max`, along with a list of APM events that contain the field.

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outlier_side_panel.png" alt="Latency Outlier full side panel view" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Profiling" %}}

### Lock contention outlier

In the banner card view, you can see:

  * The name of the impacted service
  * The number of threads impacted
  * The potential CPU savings (and estimated cost savings)
    
{{< img src="watchdog/small_card_profiling_lock_pressure.png" alt="Profiling insight on Lock Contention" style="width:50%;">}}

In the full side panel, you can see instructions on how to resolve the lock contention:

{{< img src="watchdog/side_panel_profiling_lock_pressure.png" alt="Side panel with all the information on how to address the Lock Contention outlier" style="width:100%;">}}

### Garbage collection outlier

In the banner card view, you can see:

  * The name of the impacted service
  * The amount of CPU time used to perform garbage collection

{{< img src="watchdog/small_card_profiling_garbage_collection.png" alt="Profiling insight on Garbage Collection" style="width:30%;">}}

In the full side panel, you can see instructions on how to better configure garbage collection to free up some CPU time:

{{< img src="watchdog/side_panel_profiling_garbage_collection.png" alt="Side panel with all the information on how to address the Garbage Collection outlier" style="width:100%;">}}

### Regex compilation outlier

In the banner card view, you can see:

  * The name of the impacted service
  * The amount of CPU time spent on compiling regexes

{{< img src="watchdog/small_card_profiling_regex_compilation.png" alt="Profiling insight on Regex Compilation" style="width:30%;">}}

In the full side panel, you can see instructions on how to improve regex compilation time, as well as examples of functions within your code that could be improved:

{{< img src="watchdog/side_panel_profiling_regex_compilation.png" alt="Side panel with all the information on how to address the Regex Compilation outlier" style="width:100%;">}}

{{% /tab %}}
{{% tab "Databases" %}}

For Database Monitoring, Watchdog surfaces insights on the following metrics:

- `CPU`
- `Commits `
- `IO`
- `Background`
- `Concurrency`
- `Idle`

Find the databases impacted by one or multiple outliers by using the Insight carousel.

{{< img src="watchdog/side_panel_dbm_insights.png" alt="Carousel to filter the Databases with Insights" style="width:100%;">}}

An overlay is then set on the databases, with pink pills highlighting the different Insights and giving more information about what happened. 

{{< img src="watchdog/overlay_database_insight.png" alt="Watchdog insight overlay on the database to highlight what is happening" style="width:100%;">}}

{{% /tab %}}
{{% tab "RUM" %}}

### Error outlier

Error outliers display fields such as [faceted tags or attributes][3] that contain characteristics of errors that match the current search query. Statistically overrepresented `key:value` pairs among errors can provide hints into the root causes of issues. Typical examples of error outliers include `env:staging`, `version:1234`, and `browser.name:Chrome`.

In the banner card view, you can see:

* The field name
* The proportion of total errors and overall RUM events that the field contributes to
* Related tags

In the full side panel, you can see a timeseries graph about the total number of RUM errors with the field, along with impact pie charts and a list of RUM events that contain the field.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="Error Outlier full side panel" style="width:100%;" >}}

### Latency outlier

Latency outliers display fields such as [faceted tags or attributes][1] that are associated with performance bottlenecks that match the current search query. `key:value` pairs with worse performance than the baseline can provide hints into the performance bottlenecks among a subset of real users.

Latency outliers are computed for [Core Web Vitals][2] such as First Contentful Paint, First Input Delay, Cumulative Layout Shift, and [Loading Time][3]. For more information, see [Monitoring Page Performance][2].

In the banner card view, you can see:

* The field name
* The performance metric value containing the field and the baseline for the rest of the data

In the full side panel, you can see a timeseries graph about the performance metric. The X axis has increments of `p50`, `p75`, `p99`, and `max`, along with a list of RUM events that contain the field.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="Latency Outlier full side panel view" style="width:100%;" >}}

[1]: /real_user_monitoring/explorer/search/#facets
[2]: /real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[3]: /real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
{{% /tab %}}
{{% tab "Synthetic Monitoring" %}}

<div class="alert alert-warning">Error Outliers for Synthetic Monitoring is in public beta.</div>

### Error outlier

Error outliers in Synthetic Monitoring display anomalies like unexpected behavior or deviations from expected performance metrics. These anomalies provide insights into potential issues affecting the reliability and performance of your [Synthetic browser tests][101].

Typical examples of error outliers include `Test Location:US-West`, `Browser:Chrome`, and `Page Load Time > 5 seconds`.

In the banner card view, you can see:

* The field name
* The proportion of total errors and overall RUM events that the field contributes to
* Related tags

In the full side panel, you can see a timeseries graph about the total number of RUM errors with the field, along with impact pie charts and a list of RUM events that contain the field.

// Add screenshot

[101]: /synthetics/browser_tests

{{% /tab %}}
{{% tab "Serverless" %}}

For serverless infrastructures, Watchdog surfaces the following insights:

- `Cold Start Ratio Up/Down`
- `Error Invocation Ratio Up/Down`
- `Memory Usage Up/Down`
- `OOM Ratio Up/Down`
- `Estimated Cost Up/Down`
- `Init Duration Up/Down`
- `Runtime Duration Up/Down`

Find the serverless functions impacted by one or multiple outliers by using the Insights carousel.

{{< img src="watchdog/side_panel_serverless_facet_insights.png" alt="Facet to filter the Serverless Functions with insights" style="width:30%;">}}

An overlay is then set on the function, with pink pills highlighting the different insights and giving more information about what happened.

{{< img src="watchdog/overlay_serverless_insight.png" alt="Watchdog insight overlay on the function to highlight what is happening" style="width:100%;">}}

[1]: /serverless/guide/serverless_warnings/#errors
{{% /tab %}}
{{% tab "Processes" %}}

For Process Explorer, the Watchdog Insight carousel reflects [all Process anomalies][1] for the current context of the Process Explorer.

[1]: /watchdog/#overview
{{% /tab %}}
{{% tab "Kubernetes" %}}

For Kubernetes Explorer, the Watchdog Insight carousel reflects [all the Kubernetes anomalies][1] for the current context of the Kubernetes Explorer.

[1]: /watchdog/#overview
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
[13]: https://app.datadoghq.com/rum/error-tracking
[14]: https://app.datadoghq.com/synthetics/explorer