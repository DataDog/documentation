---
title: Generate Metrics from Ingested Logs
kind: documentation
aliases:
    - /logs/processing/logs_to_metrics/
description: 'Generate Metrics from Ingested Logs.'
further_reading:
    - link: 'logs/processing/processors'
      tag: 'Documentation'
      text: 'Learn how to process your logs'
    - link: 'logs/logging_without_limits'
      tag: 'Documentation'
      text: 'Control the volume of logs indexed by Datadog'
---

## Overview

Datadog’s [Logging without Limits][1]\* lets you dynamically decide what to include or exclude from your indexes for storage and query, at the same time many types of logs are meant to be used for telemetry to track trends, such as KPIs, over long periods of time. Log-based metrics are a cost-efficient way to summarize log data from the entire ingest stream. This means that even if you use [exclusion filters][2] to limit what you store for exploration, you can still visualize trends and anomalies over all of your log data at 10s granularity for 15 months.

With log-based metrics, you can generate a count metric of logs that match a query or a [distribution metric][3] of a numeric value contained in the logs, such as request duration.

## Generate a log-based metric

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="Generate Logs to metric"  style="width:80%;">}}

To generate a new log-based metric, go to the [Configuration page][4] of your Datadog account and select the _[Generate Metrics][5]_ tab, then the **New Metric+** button.

You can also create metrics from an Analytics search by selecting the "Generate new metric" option from the Export menu.

{{< img src="logs/processing/logs_to_metrics/metrics_from_analytics.png" alt="Generate Logs to metric"  style="width:80%;">}}

### Add a new log-based metric

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics2.png" alt="Create a Logs to metric"  style="width:80%;">}}

1. **Input a query to filter the log stream**: The query syntax is the same as for the [Log Explorer Search][6]. Only logs ingested with a timestamp within the past 20 minutes are considered for aggregation.
2. **Select the field you would like to track**: Select `*` to generate a count of all logs matching your query or enter a log attribute (e.g., `@network.bytes_written`) to aggregate a numeric value and create its corresponding `count`, `min`, `max`, `sum`, and `avg` aggregated metrics. If the log attribute facet is a [measure][7], the value of the metric is the value of the log attribute.
3. **Add dimensions to `group by`**: By default, metrics generated from logs will not have any tags unless explicitly added. Any attribute or tag dimension that exists in your logs (for example, `@network.bytes_written`, `env`) can be used to create metric [tags][8]. Metric tags names are equal to the originating attribute or tag name, without the @. Log-based metrics are considered [custom metrics][9]. Avoid grouping by unbounded or extremely high cardinality attributes like timestamps, user IDs, request IDs, or session IDs to avert impacting your billing. See the [Log Security][10] page for more information on using this feature for HIPAA-enabled customers.
4. **Add percentile aggregations**: For distribution metrics, you can optionally generate p50, p75, p90, p95, and p99 percentiles. Percentile metrics are also considered custom metrics, and [billed accordingly][11].
5. **Name your metric**: Log-based metric names must follow the [naming metric convention][12].

**Note**: Data points for Log-based metrics are generated at ten second intervals.

### Update a log-based metric

After a metric is created, the following fields can be updated:

- Stream filter query: To change the set of matching logs to be aggregated into metrics
- Aggregation groups: To update the tags or manage the cardinality of the generated metrics
- Percentile selection: Check or uncheck the ‘Calculate percentiles’ box to remove or generate percentile metrics

To change the metric type or name, a new metric must be created.

## Recommended usage metrics

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="Recommended Usage Metrics" style="width:80%;">}}

Usage metrics are estimates of your current Datadog usage in near real-time. They enable you to:

- Graph your estimated usage.
- Create monitors around your estimated usage.
- Get instant alerts of spikes or drops in your usage.
- Assess the potential impact of code changes on your usage in near real-time.

Log Management usage metrics come with three tags that can be used for more granular monitoring:

| Tag                     | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
|  `datadog_index`        | Indicates the routing query that matches a log to an intended index.  |
|  `datadog_is_excluded`  | Indicates whether or not a log matches an exclusion query.            |
|  `service`              | The service attribute of the log event.                               |

An extra `status` tag is available on the `datadog.estimated_usage.logs.ingested_events` metric to reflect the log status (`info`, `warning`, etc.).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/
[2]: /logs/indexes/#exclusion-filters
[3]: /metrics/distributions/#overview
[4]: https://app.datadoghq.com/logs/pipelines
[5]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[6]: /logs/search_syntax/
[7]: /logs/explorer/facets/#quantitative-facets-measures
[8]: /getting_started/tagging/
[9]: /developers/metrics/custom_metrics/
[10]: /security/logs/#hipaa-enabled-customers
[11]: /account_management/billing/custom_metrics/?tab=countrategauge
[12]: /developers/metrics/#naming-metrics
