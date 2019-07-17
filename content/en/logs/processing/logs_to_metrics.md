---
title: Generate Metrics from Ingested Logs
kind: documentation
beta: true
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

Datadog’s Log Management provides features that allow you to perform deep analytics on operationally critical logs retained in indexes. But many data sources such as servers, containers, and cloud services generate high volume logs that are low in individual value. For example, a typical web access log usually won't give you any insight into the health of your web server. But, in aggregate, access logs are high-value because they show trends in key indicators like request latency and server status. Logs-based metrics are a cost efficient way to visualize and track trends from the entire stream of log data at full granularity for 15 months, without requiring that you index all of your logs.

## Generate a log-based metric

{{< img src="logs/processing/logs_to_metrics/generate_logs_to_metric.png" alt="Generate Logs to metric" responsive="true" style="width:80%;">}}

With log-based metrics, teams generate custom metrics from the count of logs that match a filter query and can apply log attributes as a metric dimensions.

To generate a new metric, go to the Configuration page of your Datadog account and select the “Generate Metrics” tab, then the “New Metric” button.

### Add a new log-based metric

1. **Input a query to filter the log stream** (optional): The query syntax is the same as that of the Live Tail. Only logs ingested with a timestamp within the past 20 minutes will be considered for aggregation.
2. **Add dimensions to group by** (optional): Similar to the filter query, any attribute or tag key that exists in the filtered log stream can be applied to the generated metric as a dimension so they can be filtered, aggregated, and compared in Datadog visualizations. The number of time series created for a metric will depend on the different combinations of tag:values.
3. **Name your metric**: Metric names must begin with a letter and ASCII alphanumerics, underscores, and periods. Other characters, including spaces, are converted to underscores.


Data points for Log-based metrics are generated at 1 minute intervals and so will become available for graphic and monitors 1 minute from when they were created.

Avoid grouping by unbounded or extremely high cardinality attributes, such as timestamps, user IDs, request IDs, session IDs, etc. This may significantly increase the number of metrics for your organization and impact your billing.

See the custom metrics documentation for more details.

{{< img src="logs/processing/logs_to_metrics/create_custom_metrics.png" alt="Create a Logs to metric" responsive="true" style="width:80%;">}}

### Update a log-based metric

After a metric is created, only the following fields can be updated:
* Stream filter query
* Aggregation groups

To change the metric type or name, a new metric must be created.

##Permissions

Creating and editing log-based metrics is currently limited to admin users.

## Feedback

Datadog would love to receive your feedback on this feature. You can submit your feedback directly from this form.
