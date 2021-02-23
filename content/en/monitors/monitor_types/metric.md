---
title: Metric Monitor
kind: documentation
description: "Compare values of a metric with a user defined threshold"
further_reading:
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/monitor_status/"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

Metric monitors are useful for a continuous stream of data. Any metric sent to Datadog can be alerted upon if they cross a threshold over a given period of time.

## Monitor creation

To create a [metric monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Metric*.

### Choose the detection method

{{< tabs >}}
{{% tab "Threshold" %}}

A threshold alert compares metric values to a static threshold.

On each alert evaluation, Datadog calculates the average/minimum/maximum/sum over the selected period and checks if it is above or below the threshold. This is the standard alert case where you know the expected values.

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

[1]: /monitors/monitor_types/anomaly/
{{% /tab %}}
{{% tab "Outliers" %}}

Outlier monitors detect when a member of a group (hosts, availability zones, partitions, etc.) is behaving unusually compared to the rest.

On each alert evaluation, Datadog checks whether or not all groups are clustered together and exhibiting the same behavior. An alert is triggered when one or more groups diverges from the rest of the groups.

For more detailed information, see the [Outlier Monitor][1] page.

[1]: /monitors/monitor_types/outlier/
{{% /tab %}}
{{% tab "Forecast" %}}

A forecast alert predicts the future behavior of a metric and compares it to a static threshold. It is well-suited for metrics with strong trends or recurring patterns.

On each alert evaluation, a forecast alert predicts the future values of the metric along with the expected deviation bounds. An alert is triggered when any part of the bounds crosses the configured threshold.

For more detailed information, see the [Forecast Monitor][1] page.

[1]: /monitors/monitor_types/forecasts/
{{% /tab %}}
{{< /tabs >}}

### Define the metric

Any metric currently reporting to Datadog is available for monitors. Use the editor and these steps to define the metric:
{{< img src="monitors/monitor_types/metric/metric_scope.png" alt="metric scope"  >}}

| Step                | Required | Default    | Example           |
|---------------------|----------|------------|-------------------|
| Select a metric     | Yes      | None       | `system.cpu.user` |
| Define the from     | No       | Everywhere | `env:prod`        |
| Exclude [tags][2]        | No       | None       | `role:testing`    |
| Specify aggregation | Yes      | `avg by`   | `sum by`          |
| Group by            | No       | Everything | `host`            |

**Note**: Defining metrics for monitors is similar to defining metrics for graphs. For details on using the `Advanced...` option, see [Advanced graphing][3].

#### Alert grouping

Alerts are grouped automatically based on your selection of the `group by` step when defining your metric. If no group is specified, grouping defaults to `Simple Alert`. If groups are selected, grouping defaults to `Multi Alert`.

Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions. This works best to monitor a metric from a single host or the sum of a metric across many hosts.

Multi alerts apply the alert to each source according to your group parameters. You receive an alert for each group that meets the set conditions. For example, you could group `system.disk.in_use` by `host` and `device` to receive a separate alert for each host device that is running out of space.

### Set alert conditions

The alert conditions vary slightly based on the chosen detection method.

{{< tabs >}}
{{% tab "Threshold" %}}

* Trigger when the metric is `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold `on average`, `at least once`, `at all times`, or `in total`
* during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 1 minute and 48 hours.

**Definitions**:

| Option                  | Description                                                                                                                                                                                                                   |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| on&nbsp;average         | The series is averaged to produce a single value that is checked against the threshold. It adds the `avg()` function to your monitor query.                                                                                   |
| at&nbsp;least&nbsp;once | If any single value in the generated series crosses the threshold, then an alert is triggered. This option adds a function to your monitor query based on your selection: `min()` for below or `max()` for above.              |
| at&nbsp;all&nbsp;times  | If all points in the evaluation window for your query cross the threshold, then an alert is triggered. This option adds a function to your monitor query based on your selection: `min()` for above or `max()` for below. |
| in&nbsp;total           | If the summation of every point in the series crosses the threshold, then an alert is triggered. It adds the `sum()` function to your monitor query.                                                                        |

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

#### Thresholds

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

#### Data window

`Require` or `Do not require` a full window of data for evaluation.

This setting allows you to change when the alerting engine considers a monitor as a candidate for evaluation.

**Require** (default) - A monitor is not evaluated until the evaluation window is filled with data. For example, if a new host is provisioned it may have high CPU for a minute or two. You don't want alerts to trigger if the CPU drops shortly after.

**Do not require** - A monitor is evaluated as soon as it is recognized. Consider using this value if your data points are very sparse. Otherwise, the monitor may not be evaluated because the window is never considered "full".

#### No data

`Do not notify` if data is missing or `Notify` if data is missing for more than `N` minutes.

Notifications for missing data are useful if you expect a metric to always be reporting data under normal circumstances. For example, if a host with the Agent must be up continuously, you can expect the metric `system.cpu.idle` to always report data. For this case, you should enable notifications for missing data.

**Note**: It is recommended that you set the missing data window to at least two times the evaluation period.

Alternatively, if you are monitoring a metric over an auto-scaling group of hosts that stop and start automatically, notifying for no data would produce a lot of notifications. For this case, you should not enable notifications for missing data. This option does not work if it is enabled at a time when data has not been reporting for a long period.

##### Grouping

For a monitor that does not notify on missing data, if a group does not report data, the monitor skips evaluations and eventually drops the group. During this period, the bar in the results page stays green. When there is data and groups start reporting again, the green bar shows an OK status and backfills to make it look like there was no interruption.

#### Auto resolve

`[Never]`, `After 1 hour`, `After 2 hours`, etc. automatically resolve this event from a triggered state.

For some metrics that report periodically, it may make sense for triggered alerts to auto-resolve after a certain time period. For example, if you have a counter that reports only when an error is logged, the alert never resolves because the metric never reports `0` as the number of errors. In this case, set your alert to resolve after a certain time of inactivity on the metric. **Note**: If a monitor auto-resolves and the value of the query does not meet the recovery threshold at the next evaluation, the monitor triggers an alert again.

In most cases this setting is not useful because you only want an alert to resolve once it is actually fixed. So, in general, it makes sense to leave this as `[Never]` so alerts only resolve when the metric is above or below the set threshold.

#### Evaluation delay

Delay evaluation by `N` seconds.

The time (in seconds) to delay evaluation. This should be a non-negative integer. So, if the delay is set to 900 seconds (15 minutes), the monitor evaluation is during the last `5 minutes`, and the time is 7:00, the monitor evaluates data from 6:40 to 6:45.

**Note**: A 15 minute delay is recommended for cloud metrics which are backfilled by service providers. Additionally, when using a division formula, a 60 second delay is helpful to ensure your monitor evaluates on complete values.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][5] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/metric
[2]: /getting_started/tagging/using_tags/?tab=assignment
[3]: /dashboards/querying/#advanced-graphing
[4]: /monitors/faq/what-are-recovery-thresholds/
[5]: /monitors/notifications/
