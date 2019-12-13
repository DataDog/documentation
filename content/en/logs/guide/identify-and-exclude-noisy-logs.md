---
title: Identify and Exclude Noisy Logs
kind: guide
disable_toc: true
further_reading:
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn more about Log Explorer"
- link: "logs/explorer/patterns/"
  tag: "Documentation"
  text: "Learn about log patterns"
- link: "logs/live_tail"
  tag: "Documentation"
  text: "Explore Live Tail"
- link: "logs/logs_to_metrics"
  tag: "Documentation"
  text: "Learn how to generate metrics from ingested logs"
---

## Overview

Datadog’s [Logging without Limits][1]&trade; removes logging limitations by decoupling log ingestion and indexing to give flexibility around log management. High volume log indexing is helpful when monitoring every aspect of a service, but it can be a distraction when serious problems occur.

For example, you may not find it beneficial to monitor every 200 response code log from a web server, as it's not always relevant for troubleshooting issues. While 4xx and 5xx response code are critical to investigate problems. 
However, exhaustive KPIs (i.e. Number of requests, ratio of errors, number of visitors...) should be computed upon all logs (including the 200 response code logs).

This guide uses Logging without Limits&trade; to identify a noisy logging service status, exclude irrelevant status logs, and set custom metrics from the excluded logs to continue to track KPI over time.

## 1. Identify a noisy logging service status

Your noisiest logging service contains several logs, some of which may be irrelevant for troubleshooting. By identifying your noisiest logging service, you can quickly find the information you need to filter irrelevant logs by status.

{{< img src="logs/guide/logging-without-limits.gif" alt="Log Patterns View" responsive="true" style="width:100%;">}}

**To identify your noisiest logging service status**:

1. In Log Explorer, select graph view located next to the search bar. 
2. Below the search bar, set `count` * group by `service` and `limit` to top 10.
3. Select `Top List` from the dropdown menu next to `hide controls`.
4. Click on the first listed service and select `search for` in the populated menu. This generates a search, which is visible in the search bar above, based on your `service` facet.
5. Switch group by `service` to group by `status`. This generates a top statuses list for your service.
6. Click on the first listed status and select `search for` in the populated menu. This adds your `status` facet to the search.

**Note**: These steps are applicable to any high volume logging query to generate a top list. You can group by any facet, such as `host` or `client name` versus `service` or `status`.

## 2. Identify noisy logs with log patterns
Switch to the [patterns][2] view, located next to the graph view, to view the patterns associated with your service and status.

{{< img src="logs/guide/patterns.png" alt="Log Patterns View" responsive="true" style="width:100%;">}}

The patterns view is helpful when identifying and filtering noisy patterns. It shows the number of logs matching a pattern, split by service and status. Click on the first pattern to view a detailed log of events relating to your status. A contextual panel will populate with information about your noisiest status pattern.

## 3. Exclude noisy logs with an exclusion filter

The selected pattern contextual panel lists every instance (event) of a log pattern and creates a custom search query based on the selected pattern. Use this query in an exclusion filter to remove those logs from your index. Note that excluded logs are still available in the [live tail view][3] and can be [sent to log archives][4], or used to [generate metrics][5].

**To create an exclusion filter for your top log pattern**:

{{< img src="logs/guide/exclusion-filter.png" alt="Log Patterns View" responsive="true" style="width:100%;">}}

1. Click on your top pattern from the pattern view list.
2. Click the *View All* button in the top right corner to automatically generate the search query associated with this pattern.
3. Select the `</>` option to the right of the search query and copy the search query.
4. Navigate to the Configuration page under Logs in the main left hand navigation. Select indexes and click on your associated index. This will populate the option to add an exclusion filter.
5. Select “Add an Exclusion Filter”.
6. Input the filter name, define the exclusion query by pasting the search query you copied, and set an exclusion percentage.

Exclusion filters can be disabled at any time by toggling the disable option to the right of the filter. They can also be modified and removed by hovering over the filter and selecting the edit or delete option.

**Note**: If a log matches several exclusion filters, only the first exclusion filter rule is applied. A log is not sampled or excluded multiple times by different exclusion filters.

## 4. Generate metrics to monitor excluded logs

{{< img src="logs/guide/generate-metric.png" alt="Log Patterns View" responsive="true" style="width:75%;">}}

When a subset of logs is excluded from your index, those logs are still available to view in [Live Tail][6]. Moreover, you can generate KPIs from those excluded logs over time at ingest level by creating a new [log-based metric][7]. This metric can then be used for example to create an [anomaly detection][8] monitor to notify you of any unexpected changes.

### Add a new log-based metric
To generate a new log-based metric based on your log pattern, go to the Logs Configuration page of your Datadog account and select the [Generate Metrics tab][9], then the **New Metric+** button.

1. Under Define Query, input the search query you got from the pattern in step 2.
2. Select the field you would like to track: Select `*` to generate a count of all logs matching your query or enter a measure (e.g., `@duration`) to aggregate a numeric value and create its corresponding count, min, max, sum, and avg aggregated metrics.
3. Add dimensions to group by: Select log attributes or tag keys to apply to the generated log-based metric to transform them into [tags][10] following the `<KEY>:<VALUE>` format. Log-based metrics are considered [custom metrics][11]. Avoid grouping by unbounded or extremely high cardinality attributes like timestamps, user IDs, request IDs, or session IDs to avert impacting your billing.
4. Name your metric: Log-based metric names must follow the [naming metric convention][12].

### Create an anomaly detection monitor
Anomaly detection is an algorithmic feature that identifies when a metric is behaving differently than it has in the past. Creating an anomaly detection monitor for your excluded logs will alert you of any changes based on your set alert conditions.

{{< img src="logs/guide/anomaly-alert.png" alt="Log Patterns View" responsive="true" style="width:75%;">}}

1. To set an anomaly detection monitor, go to [Monitors -> New Monitor -> Anomaly][13].
2. Enter the log-based metric you defined in the previous section.
3. Set the alert conditions and add any additional information needed to alert yourself and/or your team of what’s happening.
4. Save the monitor.

When an anomaly is detected, an alert will be sent to all who are tagged. This alert can also be found in [Monitors -> Trigger Monitors][14].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs
[2]: /logs/explorer/patterns
[3]: /logs/live_tail
[4]: /logs/archives
[5]: /logs/logs_to_metrics
[6]: /logs/live_tail/#overview
[7]: /logs/logs_to_metrics
[8]: /monitors/monitor_types/anomaly
[9]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[10]: /tagging
[11]: /developers/metrics/custom_metrics
[12]: /developers/metrics/#naming-metrics
[13]: https://app.datadoghq.com/monitors#create/anomaly
[14]: https://app.datadoghq.com/monitors/triggered
