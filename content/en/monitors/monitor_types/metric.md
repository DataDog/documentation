---
title: Metric Monitor
kind: documentation
description: "Compare values of a metric with a user defined threshold"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
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

On each alert evaluation, Datadog calculates the raw difference (a positive or negative value) between the series now and `N` minutes ago then computes the average/minimum/maximum/sum over the selected period. An alert is triggered when this computed series crosses the threshold.

This type of alert is useful to track spikes, drops, or slow changes in a metric when there is not an unexpected threshold.

{{% /tab %}}
{{% tab "Anomaly" %}}

An anomaly detection alert uses past behavior to detect when a metric is behaving abnormally.

Anomaly alerts calculate an expected range of values for a series based on the past. Some of the anomaly algorithms use the time-of-day and day-of-week to determine the expected range, thus capturing abnormalities that could not be detected by a simple threshold alert (e.g. the series is unusually high for 5AM even though it would be considered normal at 10 AM).

On each alert evaluation, Datadog calculates the percentage of the series that falls above/below/outside of the expected range. An alert is triggered when this percentage crosses the configured threshold.

For more detailed information, see the [Anomaly Monitor][1] page.


[1]: /monitors/monitor_types/anomaly
{{% /tab %}}
{{% tab "Outliers" %}}

Outlier monitors detect when a member of a group (e.g., hosts, availability zones, partitions) is behaving unusually compared to the rest.

On each alert evaluation, Datadog checks whether or not all groups are clustered together and exhibiting the same behavior. An alert is triggered whenever at least one group diverges from the rest of the groups.

For more detailed information, see the [Outlier Monitor][1] page.


[1]: /monitors/monitor_types/outlier
{{% /tab %}}
{{% tab "Forecast" %}}

A forecast alert predicts the future behavior of a metric and compares it to a static threshold. It is well-suited for metrics with strong trends or recurring patterns.

On each alert evaluation, a forecast alert predicts the future values of the metric along with the expected deviation bounds. An alert is triggered when any part of the bounds crosses the configured threshold.

For more detailed information, see the [Forecast Monitor][1] page.


[1]: /monitors/monitor_types/forecasts
{{% /tab %}}
{{< /tabs >}}

### Define the metric

Monitors can be created on any metrics that you are currently sending to Datadog.

Select the metric and scope you want to monitor

{{< img src="monitors/monitor_types/metric/metric_scope.png" alt="metric scope" responsive="true" >}}

Select the alert grouping:

* **Simple Alert** - aggregates over all reporting sources. You receive one alert when the aggregated value meets the set conditions. This works best to monitor a metric from a single host, like `avg` of `system.cpu.iowait` over `host:bits`, or for an aggregate metric across many hosts, like sum of `nginx.bytes.net` over `region:us-east`.

* **Multi Alert** - applies the alert to each source according to your group parameters. For example, to alert on disk space you might group by host and device by creating the query: `avg:system.disk.in_use{*} by {host,device}`. This triggers a separate alert for each device on each host that is running out of space. **Note**: Anything reporting this metric that does not have the chosen groups is ignored during alert evaluation.

### Set alert conditions

{{< tabs >}}
{{% tab "Threshold" %}}

The **threshold** options vary slightly depending on what alert type you choose. For either case, input a threshold and comparison type based on your metric. As you change the threshold, the graph updates with a marker showing the cutoff point.

{{< img src="monitors/monitor_types/metric/metric_threshold.png" alt="metric threshold" responsive="true" >}}

Formatted values can be used in this input based on the metric itself. For example, the threshold for `system.disk.used` can be entered as `20GB`.

For a **threshold alert** you are able to chose a *time aggregation* of the data. The alerting engine generates a single series and performs selected aggregation.

The details of each option:

* **on average**: The series is averaged to produce a single value that is checked against the threshold. It adds the `avg()` [functions][1] at the beginning of your monitor query.

* **at least once**: If any single value in the generated series crosses the threshold then an alert is triggered. This option adds a [function][1] to the beginning of your monitor query based on your selection: `min()` for below or `max()` for above.

* **at all times**: If every point in the generated series is outside the threshold then an alert is triggered. This option adds a [function][1] to the beginning of your monitor query based on your selection: `min()` for above or `max()` for below.

* **in total**: If the summation of every point in the series is outside the threshold then an alert is triggered. It adds the `sum()` [functions][1] at the beginning of your monitor query.

[1]: 
{{% /tab %}}
{{% tab "Change" %}}

When you select the **change alert** option, these additional parameters are available:

*change* is an absolute change of the value whereas *% change* is the percentage change of your value compared to its previous value (so if it was a value of 2 and now 4, the *% change* is 100%).

Compare the change of the value during a given time frame by selecting the period you want to compare against. This can range from 5 minutes to 2 days.

Like the **threshold alert**, select the *time aggregation* and a *time window* on which the change is calculated.

{{% /tab %}}
{{< /tabs >}}

Select your **evaluation_delay** Time (in seconds) to delay evaluation, as a non-negative integer. For example, if the value is set to 300 (5min), the time frame is set to last_5m and the time is 7:00, the monitor evaluates data from 6:50 to 6:55. This is useful for AWS CloudWatch and other backfilled metrics to ensure the monitor always has data during evaluation.

Optionally **notify on no data** after a configurable time frame. At the minimum, your chosen time frame must be greater than 2x the alerting window. For example, if you are alerting over the last 5 minutes then you would need to wait at least 10 minutes before notifying on missing data.

**Note:** No Data Alerts have a default max of 24 hours. Reach out to support to discuss increasing this value.

Opt to **automatically resolve the monitor from a triggered state**. By enabling this option, the monitor resolves after a certain amount of time rather than meeting its defined recovery threshold. In general, you want to leave this option off so the alert only resolves when it's fixed.

The most common use-case for this option is when you have very sparse counters, e.g. for errors. When errors stop occurring, the metric stops reporting. This prevents the monitor from resolving because there are no more values to trigger a resolution. A [recovery threshold][2] can also be set.

However, if the monitor auto-resolves and the value of the query does not meet the recovery threshold at the next evaluation, the monitor triggers an alert again.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][3] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/metric
[2]: /monitors/faq/what-are-recovery-thresholds
[3]: /monitors/notifications
