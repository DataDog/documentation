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

For example, you may not find it beneficial to monitor every 200 response code log from a web server, as you know this is not relevant for troubleshooting. It’s more beneficial to filter these logs so when an issue occurs, you can quickly drill down to the source of the problem and resolve it.

This guide uses Logging without Limits&trade; to identify a noisy logging service and status, exclude irrelevant status logs, and set custom metrics from the excluded logs to continue to track data over time.

## 1. Identify a noisy logging service and status

Your noisiest logging service contains several logs, some of which may be irrelevant for troubleshooting. By identifying your noisiest logging service, you can quickly find the information you need to filter irrelevant logs by status.

**To identify your noisiest logging service and status**:

1. In Log Explorer, select graph view located next to the search bar. 
2. Below the search bar, set `count` * group by `service` and `limit` to top 10.
3. Select `Top List` from the dropdown menu next to `hide controls`.
4. Click on the first listed service and select `search for` in the populated menu. This generates a search, which is visible in the search bar above, based on your `service` facet.
5. Switch group by `service` to group by `status`. This generates a top statuses list for your service.
6. Click on the first listed status and select `search for` in the populated menu. This will add your `status` facet to the search.

**Note**: These steps are applicable to any high volume logging query to generate a top list. You can group by any facet, such as `host` or `client name` versus `service` or `status`.

## 2. Identify noisy logs with log patterns
Switch to the [patterns][2] view, located next to the graph view, to view the patterns associated with your service and status.

{{< img src="logs/guide/log-patterns.png" alt="Log Patterns View" responsive="true" style="width:75%;">}}

The patterns view is helpful when identifying and filtering noisy patterns. It shows the number of logs matching a pattern, split by service and status. Click on the first pattern to view a detailed log of events relating to your status. A contextual panel will populate with information about your noisiest status pattern.

## 3. Set an exclusion filter for noisy logs

The selected pattern contextual panel lists every instance (event) of a log pattern and creates a custom parsing rule based on the selected pattern. This parsing rule is required when creating an [exclusion filter][3]. Exclusion filters remove noisy logs from your Log Explorer, but these logs still have the ability to be tracked with custom metrics.

**To create an exclusion filter for your top log pattern**:

1. Click on your top pattern from the pattern view list.
2. Click the parsing rule button in the top right corner to automatically generate a parsing rule associated with this pattern.
3. Copy the parsing rule and navigate to the Configuration page under Logs in the main left hand navigation.
4. Select indexes and click on your associated index. This will populate the option to add an exclusion filter.
5. Select “Add an Exclusion Filter”.
6. Input the filter name, define the exclusion query by pasting the parsing rule you copied, and set an exclusion percentage.

You can also generate the parsing rule by clicking the **View All** button in the pattern contextual panel and selecting the **</>** option next to the search bar.

Exclusion filters can be disabled at any time by toggling the disable option to the right of the filter. They can also be modified and removed by hovering over the filter and selecting the edit or delete option.

**Note**: If a log matches several exclusion filters, only the first exclusion filter rule is applied. A log is not sampled or excluded multiple times by different exclusion filters.

## 4. Generate metrics to monitor excluded logs

When a log pattern is excluded from Log Explorer, it still is available to view in [Live Tail][4]. However, you can continue to monitor excluded logs over time to generate KPIs from logs at ingest level by creating a new [log-based metric][5]. You can also create an [anomaly detection][6] monitor to notify you of any important changes to an excluded status.

### Add a new log-based metric

To generate a new log-based metric based on your log pattern, go to the Logs Configuration page of your Datadog account and select the [Generate Metrics tab][7], then the **New Metric+** button.

1. Under Define Query, select the **</>** option and input your parsing rule.
2. Select the field you would like to track: Select `*` to generate a count of all logs matching your query or enter a log attribute (e.g., `@network.bytes_written`) to aggregate a numeric value and create its corresponding count, min, max, sum, and avg aggregated metrics.
3. Add dimensions to group by: Select log attributes or tag keys to apply to the generated log-based metric to transform them into [tags][8] following the <KEY>:<VALUE> format. Log-based metrics are considered [custom metrics][9]. Avoid grouping by unbounded or extremely high cardinality attributes like timestamps, user IDs, request IDs, or session IDs to avert impacting your billing.
4. Name your metric: Log-based metric names must follow the [naming metric convention][10].

### Create an anomaly detection monitor
{{< img src="logs/guide/anomaly-detection-monitor.gif" alt="Anomaly Detection Monitor" responsive="true" style="width:75%;">}}

Anomaly detection is an algorithmic feature that identifies when a metric is behaving differently than it has in the past. Creating an anomaly detection monitor for your excluded logs will alert you of any changes based on your set alert conditions.

1. To set an anomaly detection monitor, go to [Monitors -> New Monitor -> Anomaly][11].
2. Set the detection method as anomaly detection.
3. Define your metric by selecting the **</>** option and paste your parsing rule into the search bar.
4. Set the alert conditions and add any additional information needed to alert yourself and/or your team of what’s happening.
5. Save the monitor.

When an anomaly is detected, an alert will appear in [Monitors -> Trigger Monitors][12].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs
[2]: /logs/explorer/patterns
[3]: /logs/indexes/#exclusion-filters
[4]: /logs/live_tail/#overview
[5]: /logs/logs_to_metrics
[6]: /monitors/monitor_types/anomaly
[7]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[8]: /tagging
[9]: /developers/metrics/custom_metrics
[10]: /developers/metrics/#naming-metrics
[11]: https://app.datadoghq.com/monitors#create/anomaly
[12]: https://app.datadoghq.com/monitors/triggered
