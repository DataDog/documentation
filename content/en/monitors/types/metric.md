---
title: Metric Monitor
kind: documentation
description: "Compare values of a metric with a user defined threshold"
aliases:
- /monitors/monitor_types/metric
- /monitors/faq/what-is-the-do-not-require-a-full-window-of-data-for-evaluation-monitor-parameter
- /monitors/create/types/metric
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Consult your monitor status"
- link: "/monitors/types/change-alert"
  tag: "Documentation"
  text: "Troubleshoot change alert monitors"
---

## Overview

Metric monitors are useful for a continuous stream of data. Any metric sent to Datadog can be alerted upon if they cross a threshold over a given period of time.

To create a metric monitor in Datadog, navigate to [**Monitors > New Monitor**][1] and select the **Metric** monitor type.

## Choose the detection method

{{< tabs >}}
{{% tab "Threshold" %}}

A threshold alert compares metric values to a static threshold.

On each alert evaluation, Datadog calculates the average, minimum, maximum, or sum over the selected period and checks if it is above, below, equal to, or not equal to the threshold. This is for standard alert cases where you know the expected values. The [distribution metric type][1] offers the additional threshold option of calculating percentiles over the selected period.

For more information, see the [Set alert conditions](#set-alert-conditions) section.

[1]: /metrics/distributions/
{{% /tab %}}
{{% tab "Change" %}}

A change alert compares the absolute or relative (%) change in value between `N` minutes ago and now against a given threshold. The compared data points aren't single points but are computed using the parameters in the *define the metric* section.

On each alert evaluation, Datadog calculates the raw difference (a positive or negative value) between the series now and `N` minutes ago, then computes the average/minimum/maximum/sum over the selected period. An alert is triggered when this computed series crosses the threshold.

This type of alert is useful to track spikes, drops, or slow changes in a metric when there is not an unexpected threshold.

For more information, see the [Change alert monitors][1] guide.

[1]: /monitors/types/change-alert/
{{% /tab %}}
{{% tab "Anomaly" %}}

An anomaly detection alert uses past behavior to detect when a metric is behaving abnormally.

Anomaly alerts calculate an expected range of values for a series based on the past. Some of the anomaly algorithms use the time-of-day and day-of-week to determine the expected range, thus capturing abnormalities that could not be detected by a simple threshold alert. For example, the series is unusually high for 5AM even though it would be considered normal at 10 AM.

On each alert evaluation, Datadog calculates the percentage of the series that falls above, below, and outside of the expected range. An alert is triggered when this percentage crosses the configured threshold.

For more information, see the [Anomaly Monitor][1] page.

[1]: /monitors/types/anomaly/
{{% /tab %}}
{{% tab "Outliers" %}}

Outlier monitors detect when a member of a group (hosts, availability zones, partitions, etc.) is behaving unusually compared to the rest.

On each alert evaluation, Datadog checks whether or not all groups are clustered together and exhibiting the same behavior. An alert is triggered when one or more groups diverges from the rest of the groups.

For more information, see the [Outlier Monitor][1] page.

[1]: /monitors/types/outlier/
{{% /tab %}}
{{% tab "Forecast" %}}

A forecast alert predicts the future behavior of a metric and compares it to a static threshold. It is well-suited for metrics with strong trends or recurring patterns.

On each alert evaluation, a forecast alert predicts the future values of the metric along with the expected deviation bounds. An alert is triggered when any part of the bounds crosses the configured threshold.

For more information, see the [Forecast Monitor][1] page.

[1]: /monitors/types/forecasts/
{{% /tab %}}
{{< /tabs >}}

## Define the metric

Any metric reporting to Datadog is available for monitors. Use the editor and the steps below to define the metric. The query parameters vary slightly based on the chosen detection method.

{{< tabs >}}
{{% tab "Threshold" %}}

{{< img src="monitors/monitor_types/metric/metric_threshold_config.png" alt="define the metric for threshold detection metric monitor" style="width:100%;">}}

| Step                              | Required | Default        | Example           |
|-----------------------------------|----------|----------------|-------------------|
| Select a metric                   | Yes      | None           | `system.cpu.user` |
| Define the `from`                 | No       | Everywhere     | `env:prod`        |
| Specify metric aggregation        | Yes      | `avg by`       | `sum by`          |
| Group by                          | No       | Everything     | `host`            |
| Specify monitor query aggregation | No       | `average`      | `sum`             |
| Evaluation window                 | No       | `5 minutes`    | `1 day`           |

**Definitions**

| Option           | Description                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| average          | The series is averaged to produce a single value that is checked against the threshold. It adds the `avg()` function to your monitor query.                                   |
| max              | If any single value in the generated series crosses the threshold, then an alert is triggered. It adds the max() function to your monitor query. See the Notes section for additional threshold behavior. |
| min              | If all points in the evaluation window for your query cross the threshold, then an alert is triggered. It adds the min() function to your monitor query. See the Notes section for additional threshold behavior.|
| sum              | If the summation of every point in the series crosses the threshold, an alert is triggered. It adds the `sum()` function to your monitor query.                               |
| percentile(pXX)  | If pXX percentage of points in the evaluation window for your query cross the threshold, then an alert is triggered. This option adds a `percentile` function to your monitor query. Only available for the distribution metric type.
| Evaluation window| The time period the monitor evaluates. Use preset time windows like `5 minutes`, `15 minutes`, `1 hour`, or `custom` to set a value between 1 minute and 730 hours (1 month). |

{{% /tab %}}
{{% tab "Change" %}}

{{< img src="monitors/monitor_types/metric/metric_change_alert_config.png" alt="define the metric for change detection metric monitor" style="width:100%;">}}

| Step                              | Required | Default        | Example           |
|-----------------------------------|----------|----------------|-------------------|
| Select a metric                   | Yes      | None           | `system.cpu.user` |
| Define the `from`                 | No       | Everywhere     | `env:prod`        |
| Specify metric aggregation        | No       | `avg by`       | `sum by`          |
| Group by                          | No       | Everything     | `host`            |
| Specify monitor query aggregation | No       | `average`      | `sum`             |
| Select a change type              | No       | `change `      | `% change`        |
| Evaluation window                 | No       | `5 minutes`    | `1 day`           |
| Comparison window                 | No       | `5 minutes`    | `1 month`         |

**Definitions**

| Option           | Description                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| change           | The absolute change of the value.                                                                                                                                             |
| %&nbsp;change    | The percentage change of the value compared to its previous value. For example, the percentage change for a previous value of 2 with a current value of 4 is 100%.            |
| average          | The series is averaged to produce a single value that is checked against the threshold. It adds the `avg()` function to your monitor query.                                   |
| max              | If any single value in the generated series crosses the threshold, then an alert is triggered. It adds the max() function to your monitor query. See the Notes section for additional threshold behavior. |
| min              | If all points in the evaluation window for your query cross the threshold, then an alert is triggered. It adds the min() function to your monitor query. See the Notes section for additional threshold behavior. |
| sum              | If the summation of every point in the series crosses the threshold, an alert is triggered. It adds the `sum()` function to your monitor query.                               |
| percentile(pXX)  | If pXX percentage of points in the evaluation window for your query cross the threshold, then an alert is triggered. This option adds a `percentile` function to your monitor query. Only available for the distribution metric type.
| Evaluation window| The time period the monitor evaluates. Use preset time windows like `5 minutes`, `15 minutes`, `1 hour`, or `custom` to set a value between 1 minute and 730 hours (1 month). |

{{% /tab %}}
{{< /tabs >}}

**Notes:**
  - If using a distribution metric with a percentile aggregator, a matching percentile threshold is automatically specified. Metrics with percentile aggregators do not generate a snapshot graph in the notifications message.
  - **max/min**: These descriptions of max and min assume that the monitor alerts when the metric goes above the threshold. For monitors that alert when below the threshold, the max and min behavior is reversed.
  - Defining metrics for monitors is similar to defining metrics for graphs. For details on using the `Advanced...` option, see [Advanced graphing][2].
  - There are different behaviors when utilizing `as_count()`. See [as_count() in Monitor Evaluations][3] for details.

## Set alert conditions

Trigger when the metric is one of the following:
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

If the value is between zero and one, a leading zero is required. For example, `0.3`.

### Advanced alert conditions

#### Data window

`Require` or `Do not require` a full window of data for evaluation.

This setting allows you to change when the alerting engine considers a monitor as a candidate for evaluation.

**Do not require** (Default): A monitor is evaluated as soon as it is recognized. Consider using this value if your data points might be sparse. With this configuration, the monitor evaluates even if there is a single data point in the evaluation timeframe.

**Require**: A monitor is not evaluated until the evaluation window is considered to be `filled` with data. To be notified if there is data over the entire evaluation timeframe, use this option.

To define if the evaluation timeframe is `filled` with data, the timeframe is split into smaller buckets.

The following logic determines the bucket size:

* Evaluation timeframe in minutes: bucket size is 1 minute
* Evaluation timeframe in hours: bucket size is 10 minutes
* Evaluation timeframe in days: bucket size is 1 hour
* Evaluation timeframe in month: bucket size is 4 hours

In order to be considered as a "full window", the monitor requires:

1. At least one data point in the first bucket. The first bucket is chronologically the earliest bucket in the window.
2. At most three buckets in total with no data points (including the first one).

If the conditions are met, the monitor is evaluated. Otherwise, the evaluation is canceled and the monitor state is unchanged.

For example, a monitor that evaluates over the last `2h` is split in 12 buckets of 10 minutes. The monitor is considered full if the first bucket has data and at most three buckets in total are empty.

| data   | B0 | B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9 | B10 | B11 | Full window?|
|--------|----|----|----|----|----|----|----|----|----|----|-----|-----|-------------|
| case 1 | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | Yes         |
| case 2 | x  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | No          |
| case 3 | 1  | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | Yes         |
| case 4 | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | x  | x  | 1   | 1   | No          |

For more information on the Evaluation Window, see the [Monitor configuration][5] page.

#### Other options

For instructions on the advanced alert options (no data, auto resolve), see the [Monitor configuration][6] page.

## Notifications

For instructions on the **Configure notifications and automations** section, see the [Notifications][7] and [Monitor configuration][8] pages.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: /dashboards/querying/#advanced-graphing
[3]: /monitors/guide/as-count-in-monitor-evaluations/
[5]: /monitors/configuration/?tab=thresholdalert#evaluation-window
[6]: /monitors/configuration/#advanced-alert-conditions
[7]: /monitors/notify/
[8]: /monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
