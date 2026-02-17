---
title: Generate Log-based Metrics Processor
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Many types of logs are meant to be used for telemetry to track trends, such as KPIs, over long periods of time. Generating metrics from your logs is a cost-effective way to summarize log data from high-volume logs, such as CDN logs, VPC flow logs, firewall logs, and networks logs. Use the generate metrics processor to generate either a count metric of logs that match a query or a distribution metric of a numeric value contained in the logs, such as a request duration.

**Note**: The metrics generated are [custom metrics][1] and billed accordingly. See [Custom Metrics Billing][2] for more information.

## Setup

To set up the processor:

Click **Manage Metrics** to create new metrics or edit existing metrics. This opens a side panel.

- If you have not created any metrics yet, enter the metric parameters as described in the [Add a metric](#add-a-metric) section to create a metric.
- If you have already created metrics, click on the metric's row in the overview table to edit or delete it. Use the search bar to find a specific metric by its name, and then select the metric to edit or delete it. Click **Add Metric** to add another metric.

##### Add a metric

 1. Enter a [filter query](#filter-query-syntax). Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline. **Note**: Since a single processor can generate multiple metrics, you can define a different filter query for each metric.
1. Enter a name for the metric.
1. In the **Define parameters** section, select the metric type (count, gauge, or distribution). See the [Count metric example](#count-metric-example) and [Distribution metric example](#distribution-metric-example). Also see [Metrics Types](#metrics-types) for more information.
    - For gauge and distribution metric types, select a log field which has a numeric (or parseable numeric string) value that is used for the value of the generated metric.
    - For the distribution metric type, the log field's value can be an array of (parseable) numerics, which is used for the generated metric's sample set.
    - The **Group by** field determines how the metric values are grouped together. For example, if you have hundreds of hosts spread across four regions, grouping by region allows you to graph one line for every region. The fields listed in the **Group by** setting are set as tags on the configured metric.
1. Click **Add Metric**.

##### Metrics types

You can generate these types of metrics for your logs. See the [Metrics types][3] and [Distributions][4] documentation for more details.

| Metric type  | Description                                                                                                                                     | Example                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| COUNT        | Represents the total number of event occurrences in one time interval. This value can be reset to zero, but cannot be decreased.                | You want to count the number of logs with `status:error`.                                         |
| GAUGE        | Represents a snapshot of events in one time interval.                                                                                           | You want to measure the latest CPU utilization per host for all logs in the production environment. |
| DISTRIBUTION | Represent the global statistical distribution of a set of values calculated across your entire distributed infrastructure in one time interval. | You want to measure the average time it takes for an API call to be made.                           |

##### Count metric example

For this `status:error` log example:

```
{"status": "error", "env": "prod", "host": "ip-172-25-222-111.ec2.internal"}
```

To create a count metric that counts the number of logs that contain `"status":"error"` and groups them by `env` and `host`, enter the following information:

| Input parameters | Value               |
|------------------|---------------------|
| Filter query     | `@status:error`     |
| Metric name      | `status_error_total`|
| Metric type      | Count               |
| Group by         | `env`, `prod`       |

##### Distribution metric example

For this example of an API response log:

```
{
    "timestamp": "2018-10-15T17:01:33Z",
    "method": "GET",
    "status": 200,
    "request_body": "{"information"}",
    "response_time_seconds: 10
}
```

To create a distribution metric that measures the average time it takes for an API call to be made, enter the following information:

| Input parameters       | Value                   |
|------------------------|-------------------------|
| Filter query           | `@method`               |
| Metric name            | `status_200_response`   |
| Metric type            | Distribution            |
| Select a log attribute | `response_time_seconds` |
| Group by               | `method`                |

[1]: /metrics/custom_metrics/
[2]: /account_management/billing/custom_metrics/
[3]: /metrics/types/
[4]: /metrics/distributions/

{{% observability_pipelines/processors/filter_syntax %}}