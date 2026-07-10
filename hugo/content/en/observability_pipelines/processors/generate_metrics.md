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

Many types of logs are meant to be used for telemetry to track trends, such as KPIs, over long periods of time. Generating metrics from your logs is a cost-effective way to summarize log data from high-volume logs, such as CDN logs, VPC flow logs, firewall logs, and network logs. Use the Generate Metrics processor to generate count, gauge, or distribution metrics from logs that match a query, and send the metrics to your destination.

**Note**: The metrics generated from logs and routed to Datadog are [custom metrics][1] and billed accordingly. See [Custom Metrics Billing][2] for more information.

## Setup

To set up the processor:

Click {{< ui >}}Manage Metrics{{< /ui >}} to create new metrics or edit existing metrics. This opens a side panel.

- If you have not created any metrics yet, enter the metric parameters as described in the [Add a metric](#add-a-metric) section to create a metric.
- If you have already created metrics, click on the metric's row in the overview table to edit or delete it. Use the search bar to find a specific metric by its name, and then select the metric to edit or delete it. Click {{< ui >}}Add Metric{{< /ui >}} to add another metric.

### Add a metric

<div class="alert alert-warning">The Generate Metrics processor uses the <code>timestamp</code> field on a log to set the metric's timestamp. If the log <code>timestamp</code> field is a string value, the log's processing time is used instead. See <a href="#convert-string-timestamp-to-timestamp-format">Convert string timestamp to timestamp format</a> for more information.</div>

 1. Enter a filter query. Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline. See [Search Syntax][5] for more information. **Note**: Since a single processor can generate multiple metrics, you can define a different filter query for each metric.
1. Enter a name for the metric.
1. In the {{< ui >}}Define parameters{{< /ui >}} section, select the metric type (count, gauge, or distribution). See the [Count metric example](#count-metric-example) and [Distribution metric example](#distribution-metric-example). Also see [Metrics Types](#metrics-types) for more information.
    - For gauge and distribution metric types, select a log field which has a numeric (or parseable numeric string) value that is used for the value of the generated metric.
    - For the distribution metric type, the log field's value can be an array of (parseable) numerics, which is used for the generated metric's sample set.
    - The {{< ui >}}Group by{{< /ui >}} field determines how the metric values are grouped together. For example, if you have hundreds of hosts spread across four regions, grouping by region allows you to graph one line for every region. The fields listed in the {{< ui >}}Group by{{< /ui >}} setting are set as tags on the configured metric.
1. Click {{< ui >}}Add Metric{{< /ui >}}.

### Configure a metrics destination

{{< callout url="#" btn_hidden="true" header="Join the Preview!">}}
Sending metrics generated from logs to the Splunk HEC, Elasticsearch, or HTTP/S Client destination is in Preview. Contact your account manager to request access.
{{< /callout >}}

<div class="alert alert-info">The option to send generated metrics to a destination other than <a href="/observability_pipelines/destinations/datadog_metrics/">Datadog Metrics</a> is available for Worker versions 2.18 and later.<br><br>If you upgrade to Worker version 2.18 or later for an existing pipeline that already has a Generate Metrics processor and you want to select a destination other than Datadog Metrics, you must:<br>&nbsp;&nbsp;&nbsp;&nbsp;1. Delete the previous Generate Metrics processor.<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Add and configure a new Generate Metrics processor.</div>

{{< img src="observability_pipelines/processors/generate_metrics_destination.png" alt="The Generate Metrics processor with the select a destination highlighted." style="width:50%;" >}}

1. On the Generate Metrics processor, click **Add Metrics Destination**.<br>**Note**: If you are using Pipeline Simulation, return to the pipeline page to configure your metrics destination. Click **Back to pipeline** on the top-right corner of the Pipeline Simulation page.
1. [Datadog Metrics][6] is the default destination. To select a different destination, click the pencil icon on the Datadog Metrics destination and select **Change metrics destination**.
1. Select your destination and follow the setup instructions for the specific [destination][7].

## Metrics types

You can generate these types of metrics for your logs. See the [Metrics types][3] and [Distributions][4] documentation for more details.

| Metric type  | Description                                                                                                                                         | Example                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| COUNT        | The total number of event occurrences in one time interval. Can be reset to zero, but cannot be decreased.                                          | You want to count the number of logs with `status:error`.                                     |
| GAUGE        | A snapshot of a value at the time it is reported.                                                                                                   | You want to track the latest CPU utilization per host.                                        |
| DISTRIBUTION | Raw values sent to Datadog so percentile aggregations (such as p95, p99) are computed server-side, globally across every host reporting the metric. | You want the global p95 of `response_time_seconds` across every host serving an API endpoint. |

### Count metric example

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

### Distribution metric example

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

## Convert string timestamp to timestamp format

The Generate Metrics processor can only use the log `timestamp` field to set the metric timestamp if the log field is a timestamp type. If the `timestamp` field is a string, the time when the log is processed is used instead. To use the log `timestamp`, you must convert the string to a timestamp type before sending logs to the Generate Metrics processor.

To convert a string timestamp to timestamp format:

1. Add a [Custom Processor][8] to your pipeline before the Generate Metrics processor.
1. Add a function with the following custom script:
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][9] for more information.

[1]: /metrics/custom_metrics/
[2]: /account_management/billing/custom_metrics/
[3]: /metrics/types/
[4]: /metrics/distributions/
[5]: /observability_pipelines/search_syntax/logs/
[6]: /observability_pipelines/destinations/datadog_metrics/
[7]: /observability_pipelines/destinations/?tab=metrics#destinations
[8]: /observability_pipelines/processors/custom_processor/#setup
[9]: /observability_pipelines/processors/custom_processor/#parse_timestamp
