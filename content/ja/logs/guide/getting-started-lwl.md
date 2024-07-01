---
title: Logging Without LimitsTM Guide
kind: guide
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Learn more about Log Explorer
- link: "/logs/explorer/#patterns"
  tag: Documentation
  text: Get familiar with the Logs pattern view
- link: /logs/live_tail/
  tag: Documentation
  text: Explore Live Tail
- link: /logs/logs_to_metrics/
  tag: Documentation
  text: Learn how to generate metrics from ingested logs
algolia:
  tags: [logging without limits]
---

{{< img src="logs/lwl_marketecture_20231030.png" alt="Logging without LimitsTM" >}}

## Overview

Cloud-based applications can generate logs at a rate of millions per minute. But because your logs are not all and equally valuable at any moment, Datadog [Logging without LimitsTM][1] provides flexibility by decoupling [log ingestion and indexing][2].

This guide identifies key components of Logging Without LimitsTM such as [Patterns](#2-identify-high-volume-logging-patterns), [Exclusion Filters](#3-create-a-log-pattern-exclusion-filter), [Custom log-based metrics](#4-generate-metrics-to-track-excluded-logs), and [Monitors](#create-an-anomaly-detection-monitor) that can help you better organize Log Explorer and monitor your KPIs over time.

## 1. Identify your most logged service status

Your most logged service contains several logs, some of which may be irrelevant for troubleshooting. For example, you may want to investigate every 4xx and 5xx response code log, but excluded every 200 response code log from Log Explorer to expedite troubleshooting during a major outage or event. By identifying the corresponding service first, you can quickly track down which service status produces the most logs and is best to exclude from the [Log Explorer view][3].

{{< img src="logs/guide/getting-started-lwl/identify_logging_service.mp4" alt="Identify a most logging service status" video=true style="width:100%;">}}

**To identify your most logged service status**:

1. In Log Explorer, select **graph view** located next to the search bar.
2. Below the search bar, set count `*` group by `service` and limit to `top 10`.
3. Select **Top List** from the dropdown menu next to hide controls.
4. Click on the first listed service and select **search for** in the populated menu. This generates a search, which is visible in the search bar above, based on your service facet.
5. Switch group by `service` to group by `status`. This generates a top statuses list for your service.
6. Click on the first listed status and select **search for** in the populated menu. This adds your status facet to the search.

**Note**: These steps are applicable to any high volume logging query to generate a top list. You can group by any facet, such as `host` or `network.client.ip` versus `service` or `status`.

## 2. Identify high volume logging patterns

Now that you have identified your most logging service status, switch to the [patterns view][4], located next to the graph view in the top left of Log Explorer, to automatically see your log patterns for the selected context.

A context is composed of a time range and a search query. Each pattern comes with highlights to get you straight to its characteristic features. A mini graph displays a rough timeline for the volume of its logs to help you identify how that pattern differs from other patterns. Sections of logs that vary within the pattern are highlighted to help you quickly identify differences across log lines.

Click on the log pattern that you would like to exclude to see a sample of underlying logs.

{{< img src="logs/guide/getting-started-lwl/patterns_context_panel.jpg" alt="Patterns Context" style="width:100%;">}}

The patterns view is helpful when identifying and filtering noisy patterns. It shows the number of logs matching a pattern, split by service and status. Click on the first pattern to view a detailed log of events relating to your status. A contextual panel is populated with information about your noisiest status pattern.

## 3. Create a log pattern exclusion filter

The pattern context panel lists every instance (event) of a log pattern and creates a custom search query based on the selected pattern. Use this query in an exclusion filter to remove those logs from your index.

**To create an exclusion filter**:

1. Click on a pattern from the pattern view list.
2. Click the **Add Exclusion Filter** button in the top right corner. This button is disabled if less than half of the logs in this pattern fall into a single index.
3. The Log Index Configuration page opens in a new tab with a pre-filled exclusion filter for the index where the majority of the logs for that pattern show up.
4. The exclusion filter is populated with an automatically generated search query associated with the pattern. Input the filter name and set an exclusion percentage and then save the new exclusion filter.

{{< img src="logs/guide/getting-started-lwl/exclusion_filter_new.mp4" alt="Exclusion Filter" video=true style="width:100%;">}}

**Note**: If a log matches several exclusion filters, only the first exclusion filter rule is applied. A log is not sampled or excluded multiple times by different exclusion filters.

In this example, the service `email-api-py`, status `INFO` pattern `response code from ses 200` is filtered with an exclusion filter. Removing any high volume logging pattern similar to this one from Log Explorer helps you reduce noise and identify issues quicker. However, these logs are **only** excluded from indexing. They are still ingested and available to view in [Live Tail][5] and can be sent to [log archives][6] or used to [generate metrics][7].

{{< img src="logs/guide/getting-started-lwl/live_tail.png" alt="The Live Tail page showing a list of logs and the time frame dropdown" style="width:100%;">}}

Exclusion filters can be disabled at any time by toggling the disable option to the right of the filter. They can also be modified and removed by hovering over the filter and selecting the edit or delete option.

## 4. Generate metrics to track excluded logs

Once a log pattern is excluded from Log Explorer, you can still track KPIs over time at the ingest level by creating a new [custom log-based metric][8].

### Add a new log-based metric

**To generate a new log-based metric based on your log pattern**:

1. Navigate to the [Generate Metrics][9] page.
1. Click **New Metric** in the top right corner.
1. Enter a name for your metric. Log-based metric names must follow the naming metric convention.
1. Under **Define Query**, input the search query you copied and pasted into the pattern exclusion filter. For example, as per the example above: `service:web-store status:info "updating recommendations with customer_id" "url shops"`.
1. Select the field you would like to track: Select `*` to generate a count of all logs matching your query or enter a measure (for example, `@duration`) to aggregate a numeric value and create its corresponding count, min, max, sum, and avg aggregated metrics.
1. Add dimensions to group: Select log attributes or tag keys to apply to the generated log-based metric to transform them into tags following the `<KEY>:<VALUE>` format. Log-based metrics are considered custom metrics. Avoid grouping by unbounded or extremely high cardinality attributes like timestamps, user IDs, request IDs, or session IDs to avoid negatively impacting your billing.

### Create an anomaly detection monitor

[Anomaly detection][10] is an algorithmic feature that identifies when a metric is behaving differently than it has in the past. Creating an anomaly detection monitor for your excluded logs alerts you of any changes based on your set alert conditions.

**To set an anomaly detection monitor**:

1. Navigate to the [New Monitor][11] page.
1. Select **Anomaly**.
1. Enter the log-based metric you defined in the previous section.
1. Set the alert conditions and add any additional information needed to alert yourself and/or your team of what's happening.
1. Click **Create**.

When an anomaly is detected, an alert is sent to all who are tagged. This alert can also be found in the [Triggered Monitors][12] page.

## Review

In this guide, you learned how to use Logging without LimitsTM to:

1. [Identify your most logging service status](#1-identify-your-most-logged-service-status)
2. [Identify high volume logging patterns](#2-identify-high-volume-logging-patterns)
3. [Create a log pattern exclusion filter](#3-create-a-log-pattern-exclusion-filter)
4. [Generate metrics to track excluded logs](#4-generate-metrics-to-track-excluded-logs)
  * [Add a new log-based metric](#add-a-new-log-based-metric)
  * [Create an anomaly detection monitor](#create-an-anomaly-detection-monitor)

To learn more about Logging Without LimitsTM and how to better utilize features like Log Explorer, Live Tail, and Log Patterns, view the links below.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/logging-without-limits/
[2]: /logs/
[3]: https://app.datadoghq.com/logs
[4]: https://app.datadoghq.com/logs/patterns
[5]: /logs/live_tail/
[6]: /logs/archives/
[7]: /metrics/
[8]: /logs/logs_to_metrics/
[9]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[10]: /monitors/types/anomaly/
[11]: https://app.datadoghq.com/monitors/create
[12]: https://app.datadoghq.com/monitors#/triggered
