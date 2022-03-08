---
title: Configure Monitors
kind: documentation
description: Describes the monitor creation page.

---

## Overview

Once you’ve chosen a [monitor type][1], start configuring the monitor.
4 main steps must be completed before saving the monitor :

* **Define the search query:** Construct a query to count events, measure metrics, group by one or several dimensions, etc.
* **Set alert conditions:** Define alert and warning thresholds , evaluation time frames, and configure advanced alert options.
* **Say what's happening:** Write a custom notification title and message with variables.
* **Notify your team:** Choose how notifications are sent to your teams (email, Slack, PagerDuty, etc)

## Define the search query

To learn how to construct the search query, see the individual [monitor types][1] pages. As you define the search query, the preview graph above the search fields updates.

{{< img src="/monitors/create/preview_graph_monitor.mp4" alt="Preview Graph" video=true style="width:90%;">}}

### Alert grouping

Alerts are grouped automatically based on your selection of the `group by` step when defining your query. If no group is specified, grouping defaults to `Simple Alert`. If the query is grouped by any dimension, grouping defaults to `Multi Alert`.

`Simple Alert` mode aggregate over all reporting sources. You receive **one alert** when the aggregated value meets the set conditions.

`Multi Alert` mode apply the alert to each source according to your group parameters. You receive **an alert for each group** that meets the set conditions. For example, you could group a query looking at a capacity metric by `host` and `device` to receive a separate alert for each host device that is running out of space.
Note that if your metric is only reporting by `host` with no `device` tag, it would not be detected by a monitor group by both `host` and `device`. [Tag Variables][2] are available for every group evaluated in the multi-alert to dynamically fill in notifications with useful context.

| Group by                       | Simple alert mode | Multi alert mode |
|-------------------------------------|------------------------|-----------------------|
| _(everything)_                      | One single group triggering one notification | N/A |
| 1&nbsp;or&nbsp;more&nbsp;dimensions | One notification if one or more groups meet the alert conditions | One notification per group meeting the alert conditions |

## Set alert conditions

The alert conditions vary based on the [monitor type][1]. Configure monitors to trigger if the query value crosses a threshold, or if a certain number of consecutive checks failed.

{{< tabs >}}
{{% tab "Threshold alert" %}}

* Trigger when the metric is `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold `on average`, `at least once`, `at all times`, or `in total`
* during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 1 minute and 48 hours (1 month for metric monitors)

<h3>Aggregation method</h3>

The query returns a series of points, but a single value is needed to compare to the threshold. The monitor must reduce the data in the evaluation window to a single value.

| Option                  | Description                                            |
|-------------------------|--------------------------------------------------------|
| on&nbsp;average         | The series is averaged to produce a single value that is checked against the threshold. It adds the `avg()` function to your monitor query. |
| at&nbsp;least&nbsp;once | If any single value in the generated series crosses the threshold, then an alert is triggered. This option adds a function to your monitor query based on your selection: `min()` for below or `max()` for above. |
| at&nbsp;all&nbsp;times  | If all points in the evaluation window for your query cross the threshold, then an alert is triggered. This option adds a function to your monitor query based on your selection: `min()` for above or `max()` for below. |
| in&nbsp;total           | If the summation of every point in the series crosses the threshold, then an alert is triggered. It adds the `sum()` function to your monitor query. |

**Note**: There are different behaviors when utilizing `as_count()`. See [as_count() in Monitor Evaluations][1] for details.

<h3>Evaluation window</h3>

Monitors are evaluated at a certain frequency (every minute most of the time) looking back at the last `5 minutes`, `15 minutes`, `1 hour`, etc.

<h3>Thresholds</h3>

Use thresholds to set a numeric value for triggering an alert. Depending on your chosen metric, the editor displays the unit used (`byte`, `kibibyte`, `gibibyte`, etc).

Datadog has two types of notifications (alert and warning). Monitors recover automatically based on the alert or warning threshold but additional conditions can be specified. For additional information on recovery thresholds, see [What are recovery thresholds?][2]. For example, if a monitor alerts when the metric is above `3` and recovery thresholds are not specified, the monitor recovers once the metric value goes back below `3`.

| Option                                   | Description                    |
|------------------------------------------|--------------------------------|
| Alert&nbsp;threshold&nbsp;**(required)** | The value used to trigger an alert notification. |
| Warning&nbsp;threshold                   | The value used to trigger a warning notification. |
| Alert&nbsp;recovery&nbsp;threshold       | An optional threshold to indicate an additional condition for alert recovery. |
| Warning&nbsp;recovery&nbsp;threshold     | An optional threshold to indicate an additional condition for warning recovery. |

As you change a threshold, the preview graph in the editor displays a marker showing the cutoff point.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="Thresholds preview graph" style="width:100%;">}}

**Note**: When entering decimal values for thresholds, if your value is `<1`, add a leading `0` to the number. For example, use `0.5`, not `.5`.


[1]: /monitors/guide/as-count-in-monitor-evaluations/
[2]: /monitors/faq/what-are-recovery-thresholds/
{{% /tab %}}
{{% tab "Check alert" %}}

A check alert tracks consecutive statuses submitted per check grouping and compares it to your thresholds. Set up the check alert to:

1. Trigger the alert after selected consecutive failures: `<NUMBER>`

    Each check run submits a single status of `OK`, `WARN`, or `CRITICAL`. Choose how many consecutive runs with the `WARN` and `CRITICAL` status trigger a notification. For example, your process might have a single blip where connection fails. If you set this value to `> 1`, the blip is ignored but a problem with more than one consecutive failure triggers a notification.

    {{< img src="/monitors/create/check_thresholds_alert_warn.png" alt="Check thresholds Alert/Warn" style="width:90%;">}}

2. Resolve the alert after selected consecutive successes: `<NUMBER>`

    Choose how many consecutive runs with the `OK` status resolves the alert.

    {{< img src="/monitors/create/check_thresholds_recovery.png" alt="Check thresholds Recovery" style="width:90%;">}}

See the documentation for [process check][1], [integration check][2], and [custom check][3] monitors for more information on configuring check alerts.



[1]: /monitors/create/types/process_check/
[2]: /monitors/create/types/integration/?tab=checkalert#integration-status
[3]: /monitors/create/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### Advanced alert conditions

#### No data

`Do not notify` if data is missing or `Notify` if data is missing for more than `N` minutes.

Notifications for missing data are useful if you expect a metric to always be reporting data under normal circumstances. For example, if a host with the Agent must be up continuously, you can expect the metric `system.cpu.idle` to always report data. For this case, you should enable notifications for missing data.

**Note**: It is recommended that you set the missing data window to at least two times the evaluation period.

Alternatively, if you are monitoring a metric over an auto-scaling group of hosts that stop and start automatically, notifying for no data would produce a lot of notifications. For this case, you should not enable notifications for missing data. This option does not work if it is enabled at a time when data has not been reporting for a long period.

##### Grouping

For a monitor that does not notify on missing data, if a group does not report data, the monitor skips evaluations and eventually drops the group. During this period, the bar in the results page stays green. When there is data and groups start reporting again, the green bar shows an OK status and backfills to make it look like there was no interruption.

#### Auto resolve

`[Never]`, `After 1 hour`, `After 2 hours`, etc. automatically resolve this event from a triggered state.

Auto-resolve works when data is no longer being submitted. Monitors do not auto-resolve from an ALERT or WARN state if data is still reporting. If data is still being submitted, the [renotify][3] feature can be utilized to let your team know when an issue is not resolved.

For some metrics that report periodically, it may make sense for triggered alerts to auto-resolve after a certain time period. For example, if you have a counter that reports only when an error is logged, the alert never resolves because the metric never reports `0` as the number of errors. In this case, set your alert to resolve after a certain time of inactivity on the metric. **Note**: If a monitor auto-resolves and the value of the query does not meet the recovery threshold at the next evaluation, the monitor triggers an alert again.

In most cases this setting is not useful because you only want an alert to resolve once it is actually fixed. So, in general, it makes sense to leave this as `[Never]` so alerts only resolve when the metric is above or below the set threshold.

#### New group delay

Delay the evaluation start by `N` seconds for new groups.

The time (in seconds) to wait before starting alerting, to allow newly created groups to boot and applications to fully start. This should be a non-negative integer.

For example, if you are using containerized architecture, setting a group delay prevents monitor groups scoped on containers from triggering due to high resource usage or high latency when a new container is created. The delay is applied to every new group (which has not been seen in the last 24 hours) and defaults to `60` seconds.

The option is available with multi-alert mode.

#### Evaluation delay

Delay evaluation by `N` seconds.

The time (in seconds) to delay evaluation. This should be a non-negative integer. So, if the delay is set to 900 seconds (15 minutes), the monitor evaluation is during the last `5 minutes`, and the time is 7:00, the monitor evaluates data from 6:40 to 6:45.

**Note**: A 15 minute delay is recommended for cloud metrics which are backfilled by service providers. Additionally, when using a division formula, a 60 second delay is helpful to ensure your monitor evaluates on complete values.


[1]: /monitors/create/types
[2]: /monitors/notify/variables/?tab=is_alert#tag-variables
[3]: /monitors/notify/#renotify
