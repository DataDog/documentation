---
title: Generate Metrics from Ingested Logs
kind: documentation
beta: true
aliases:
 - /logs/processing/logs_to_metrics/
description: "Generate Metrics from Ingested Logs."
further_reading:
- link: "logs/processing/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: "Control the volume of logs indexed by Datadog"
---

<div class="alert alert-warning">
This feature is in private beta. Contact <a href="/help">Contact Datadog support</a> to enquire about enabling the feature for your account.
</div>

## Overview

Datadog’s [Logging without Limits][1]* lets you dynamically decide what to include or exclude from your indexes. Log-based metrics are a cost-efficient way to summarize log data from the entire ingest stream. This means that even if you use [exclusion filters][2] to limit indexes to operationally critical logs, you can still visualize trends and anomalies over all of your log data at full granularity for 15 months.

With log-based metrics, you can record a count of logs that match a query such as the number of error logs for a specific service. You can also summarize a numeric value contained in log events, such as request duration.

## Generate a log-based metric

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="Generate Logs to metric" responsive="true" style="width:80%;">}}

To generate a new log-based metric, go to the [Configuration page][3] of your Datadog account and select the *[Generate Metrics][4]* tab, then the **New Metric+** button.

### Add a new log-based metric

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics.png" alt="Create a Logs to metric" responsive="true" style="width:80%;">}}

1. **Input a query to filter the log stream**: The query syntax is the same as for the [Log Explorer Search][4]. Only logs ingested with a timestamp within the past 20 minutes are considered for aggregation.
2. **Select the field you would like to track**: Select the `*` to generate a count of all logs matching your query or enter a log attribute to aggregate a numeric value into `count`, `min`, `max`, `sum`, and `avg` metrics.
3. **Add dimensions to `group by`**: Add attributes or tag key to apply to the generated log-based metric to transform them into [Tags][5] following the `<KEY>:<VALUE>` format. Log-based metrics are considered as [custom metrics][6]. Avoid grouping by unbounded or extremely high cardinality attributes like timestamps, user IDs, request IDs, or session IDs to avert impacting your billing.
4. **Name your metric**: Log-based metric names must follow the [naming metric convention][7].

**Note**: Data points for Log-based metrics are generated at one minute intervals.

### Update a log-based metric

After a metric is created, only these fields can be updated:

* Stream filter query
* Aggregation groups

To change the metric type or name, a new metric must be created.

## Feedback

Datadog would love to receive your feedback on this feature. You can submit your feedback directly from [this form][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/logging_without_limits
[2]: /logs/logging_without_limits/#exclusion-filters
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[5]: /tagging
[6]: /logs/explorer/search/#search-syntax
[7]: /developers/metrics/custom_metrics
[8]: https://docs.google.com/forms/d/e/1FAIpQLSepcuHsNfJN7mpQp-8iBf9l6AslubKVSUHW21kmGg7VOJlxoA/viewform
