---
title: Metric Monitor
kind: documentation
description: "Compare values of a metric with a user defined threshold"
aliases:
- /monitors/monitor_types/metric
- /monitors/faq/what-is-the-do-not-require-a-full-window-of-data-for-evaluation-monitor-parameter
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/notify/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

Metric monitors are useful for a continuous stream of data. Any metric sent to Datadog can be alerted upon if they cross a threshold over a given period of time.

To create a [metric monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Metric*.

## Choose the detection method

{{< tabs >}}
{{% tab "Threshold" %}}

A threshold alert compares metric values to a static threshold.

On each alert evaluation, Datadog calculates the average/minimum/maximum/sum over the selected period and checks if it is above or below the threshold. This is the standard alert case where you know the expected values. The [distribution metric type][1] offers the additional threshold option of calculating percentiles over the selected period.

[1]: /metrics/distributions/
{{% /tab %}}
{{% tab "Change" %}}

A change alert compares the absolute or relative (%) change in value between `N` minutes ago and now against a given threshold. The compared data points aren't single points but are computed using the parameters in the *alert conditions* section.

On each alert evaluation, Datadog calculates the raw difference (a positive or negative value) between the series now and `N` minutes ago, then computes the average/minimum/maximum/sum over the selected period. An alert is triggered when this computed series crosses the threshold.

This type of alert is useful to track spikes, drops, or slow changes in a metric when there is not an unexpected threshold.

{{% /tab %}}
{{% tab "Anomaly" %}}

An anomaly detection alert uses past behavior to detect when a metric is behaving abnormally.

Anomaly alerts calculate an expected range of values for a series based on the past. Some of the anomaly algorithms use the time-of-day and day-of-week to determine the expected range, thus capturing abnormalities that could not be detected by a simple threshold alert. For example, the series is unusually high for 5AM even though it would be considered normal at 10 AM.

On each alert evaluation, Datadog calculates the percentage of the series that falls above, below, and outside of the expected range. An alert is triggered when this percentage crosses the configured threshold.

For more detailed information, see the [Anomaly Monitor][1] page.

[1]: /monitors/create/types/anomaly/
{{% /tab %}}
{{% tab "Outliers" %}}

Outlier monitors detect when a member of a group (hosts, availability zones, partitions, etc.) is behaving unusually compared to the rest.

On each alert evaluation, Datadog checks whether or not all groups are clustered together and exhibiting the same behavior. An alert is triggered when one or more groups diverges from the rest of the groups.

For more detailed information, see the [Outlier Monitor][1] page.

[1]: /monitors/create/types/outlier/
{{% /tab %}}
{{% tab "Forecast" %}}

A forecast alert predicts the future behavior of a metric and compares it to a static threshold. It is well-suited for metrics with strong trends or recurring patterns.

On each alert evaluation, a forecast alert predicts the future values of the metric along with the expected deviation bounds. An alert is triggered when any part of the bounds crosses the configured threshold.

For more detailed information, see the [Forecast Monitor][1] page.

[1]: /monitors/create/types/forecasts/
{{% /tab %}}
{{< /tabs >}}

## Define the metric

Any metric currently reporting to Datadog is available for monitors. Use the editor and these steps to define the metric:


| Step                | Required | Default    | Example           |
|---------------------|----------|------------|-------------------|
| Select a metric     | Yes      | None       | `system.cpu.user` |
| Define the from     | No       | Everywhere | `env:prod`        |
| Specify aggregation | Yes      | `avg by`   | `sum by`          |
| Group by            | No       | Everything | `host`            |

**Note**: Defining metrics for monitors is similar to defining metrics for graphs. For details on using the `Advanced...` option, see [Advanced graphing][2].

### Alert grouping

Alerts are grouped automatically based on your selection of the `group by` step when defining your metric. If no group is specified, grouping defaults to `Simple Alert`. If groups are selected, grouping defaults to `Multi Alert`.

Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions. This works best to monitor a metric from a single host or the sum of a metric across many hosts.

Multi alerts apply the alert to each source according to your group parameters. You receive an alert for each group that meets the set conditions. For example, you could group `system.disk.in_use` by `host` and `device` to receive a separate alert for each host device that is running out of space.
Note that if your metric is only reporting by `host` with no `device` tag, it would not be detected by a monitor group by both `host` and `device`. [Tag Variables][3] are available for every group evaluated in the multi-alert to dynamically fill in notifications with useful context.

## Set alert conditions

The alert conditions vary slightly based on the chosen detection method.

{{< tabs >}}
{{% tab "Threshold" %}}

* Trigger when the metric is `above`, `above or equal to`, `below`, or `below or equal to`. If the value is between zero and one, a leading zero is required. For example, `0.3`.
* the threshold `average`, `max`, `min`, `sum`, or `percentile` (`percentile` is only offered on distribution metrics with percentiles enabled).

    _Note that if you've chosen a distribution metric with a percentile aggregator in Step 2: Define the Metric, a matching percentile threshold is automatically specified._

* during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 1 minute and 730 hours (1 month).

The evaluation frequency changes based on the evaluation time frame you select:

* `timeframe < 24h`: evaluation performs every 1 minute.
* `24h <= timeframe < 48h`: evaluation performs every 10 minutes.
* `timeframe >= 48h`: evaluation performs every 30 minutes.

**Definitions**:

| Option                  | Description                                                                                                                                                                                                                   |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| on&nbsp;average         | The series is averaged to produce a single value that is checked against the threshold. It adds the `avg()` function to your monitor query.                                                                                   |
| at&nbsp;least&nbsp;once | If any single value in the generated series crosses the threshold, then an alert is triggered. This option adds a function to your monitor query based on your selection: `min()` for below or `max()` for above.              |
| at&nbsp;all&nbsp;times  | If all points in the evaluation window for your query cross the threshold, then an alert is triggered. This option adds a function to your monitor query based on your selection: `min()` for above or `max()` for below. |
| in&nbsp;total           | If the summation of every point in the series crosses the threshold, then an alert is triggered. It adds the `sum()` function to your monitor query.                                                                        |
| percentile(pXX)         | If pXX percentage of points in the evaluation window for your query cross the threshold, then an alert is triggered. This option adds a `percentile` function to your monitor query. Only available for the distribution metric type.


**Note**: There are different behaviors when utilizing `as_count()`. See [as_count() in Monitor Evaluations][1] for details.

[1]: /monitors/guide/as-count-in-monitor-evaluations/
{{% /tab %}}
{{% tab "Change" %}}

* The `average`, `maximum`, `minimum`, or `in total`
* of the `change` or `% change`
* over `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 1 minute and 48 hours.
* compared to `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 1 minute and 48 hours before.
* is `above`, `above or equal to`, `below`, or `below or equal to` the threshold.

**Definitions**:

| Option        | Description                                                                                                                                                        |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| change        | The absolute change of the value.                                                                                                                                  |
| %&nbsp;change | The percentage change of the value compared to its previous value. For example, the percentage change for a previous value of 2 with a current value of 4 is 100%. |

{{% /tab %}}
{{< /tabs >}}

### Thresholds

Use thresholds to set a numeric value for triggering an alert. Depending on your chosen metric, the editor displays the unit used (`byte`, `kibibyte`, `gibibyte`, etc).

Datadog has two types of notifications (alert and warning). Monitors recover automatically based on the alert or warning threshold but additional conditions can be specified. For additional information on recovery thresholds, see [What are recovery thresholds?][4].

| Option                     | Description                                                                     |
|----------------------------|---------------------------------------------------------------------------------|
| Alert threshold            | The value used to trigger an alert notification.                                |
| Warning threshold          | The value used to trigger a warning notification.                               |
| Alert recovery threshold   | An optional threshold to indicate an additional condition for alert recovery.   |
| Warning recovery threshold | An optional threshold to indicate an additional condition for warning recovery. |

As you change a threshold, the preview graph in the editor displays a marker showing the cutoff point.

**Note**: When entering decimal values for thresholds, if your value is `<1`, add a leading `0` to the number. For example, use `0.5`, not `.5`.

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

#### Other options

For detailed instructions on the advanced alert options (no data, auto resolve, etc.), see the [Monitor configuration][5] page.

## Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][6] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/metric
[2]: /dashboards/querying/#advanced-graphing
[3]: /monitors/notify/?tab=is_alert#tag-variables
[4]: /monitors/guide/recovery-thresholds/
[5]: /monitors/create/configuration/#advanced-alert-conditions
[6]: /monitors/notify/
