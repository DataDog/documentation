---
title: Configure Monitors
kind: documentation
description: Describes the monitor creation page.
aliases:
  - /monitors/create/configuration
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor Notifications"
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Manage monitors"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Monitor Status"
---

## Overview

To start configuring the monitor, complete the following:

* **Define the search query:** Construct a query to count events, measure metrics, group by one or several dimensions, and more.
* **Set alert conditions:** Define alert and warning thresholds , evaluation time frames, and configure advanced alert options.
* **Configure notifications and automations:** Write a custom notification title and message with variables. Choose how notifications are sent to your teams (email, Slack, or PagerDuty). Include workflow automations or cases in the alert notification.
* **Define permissions and audit notifications:** Configure granular access controls and designate specific roles and users who can edit a monitor. Enable audit notifications to alert if a monitor is modified.

## Define the search query

To learn how to construct the search query, see the individual [monitor types][1] pages. As you define the search query, the preview graph above the search fields updates.

{{< img src="/monitors/create/preview_graph_monitor.mp4" alt="Preview Graph" video=true style="width:90%;">}}

## Set alert conditions

The alert conditions vary based on the [monitor type][1]. Configure monitors to trigger if the query value crosses a threshold, or if a certain number of consecutive checks failed.

{{< tabs >}}
{{% tab "Threshold alert" %}}

* Trigger when the `average`, `max`, `min`, or `sum` of the metric is
* `above`, `above or equal to`, `below`, or `below or equal to` the threshold
* during the last `5 minutes`, `15 minutes`, `1 hour`, or `custom` to set a value between 1 minute and 48 hours (1 month for metric monitors)

### Aggregation method

The query returns a series of points, but a single value is needed to compare to the threshold. The monitor must reduce the data in the evaluation window to a single value.

| Option                  | Description                                            |
|-------------------------|--------------------------------------------------------|
| average         | The series is averaged to produce a single value that is checked against the threshold. It adds the `avg()` function to your monitor query. |
| max | If any single value in the generated series crosses the threshold, then an alert is triggered. It adds the `max()` function to your monitor query.* |
| min  | If all points in the evaluation window for your query cross the threshold, then an alert is triggered. It adds the `min()` function to your monitor query.* |
| sum | If the summation of every point in the series crosses the threshold, then an alert is triggered. It adds the `sum()` function to your monitor query. |

\* These descriptions of max and min assume that the monitor alerts when the metric goes _above_ the threshold. For monitors that alert when _below_ the threshold, the max and min behavior is reversed. For more examples, see the [Monitor aggregators][1] guide.

**Note**: There are different behaviors when utilizing `as_count()`. See [as_count() in Monitor Evaluations][2] for details.

### Evaluation window

A monitor can be evaluated using cumulative time windows or rolling time windows. Cumulative time windows are best suited for questions that require historical context, such as "What's the sum of all the data available up to this point in time?" Rolling time windows are best suited for answering questions that do not require this context, such as "What's the average of the last _N_ data points?"

The figure below illustrates the difference between cumulative and rolling time windows.

{{< img src="/monitors/create/rolling_vs_expanding.png" alt="Two graphs showing cumulative vs. rolling time windows. Cumulative time windows continue to expand as time goes on. Rolling time windows cover particular moments in time." style="width:100%;">}}

#### Rolling time windows

A rolling time window has a fixed size and moves its starting point over time. Monitors support looking back at the last `5 minutes`, `15 minutes`, `1 hour`, or over a custom specified time window.

#### Cumulative time windows
A cumulative time window has a fixed starting point and expands over time. Monitors support three different cumulative time windows:

- `Current hour`: A time window with a maximum of one hour starting at a configurable minute of an hour. For example, monitor amount of calls an HTTP endpoint receives in one hour starting at minute 0.
- `Current day`: A time window with a maximum of 24 hours starting at a configurable hour and minute of a day. For example, monitor a [daily log index quota][3] by using the `current day` time window and letting it start at 2:00pm UTC.
- `Current month`: Looks back at the current month starting on the first of the month at midnight UTC. This option represents a month-to-date time window and is only available for metric monitors.

{{< img src="/monitors/create/cumulative_window_example.png" alt="Screenshot of how a cumulative window is configured in the Datadog interface. The user has searched for aws.sqs.number_of_messages_received. The options are set to evaluate the SUM of the query over the CURRENT MONTH." style="width:100%;">}}

A cumulative time window is reset after its maximum time span is reached. For example, a cumulative time window looking at the `current month` resets itself on the first of each month at midnight UTC. Alternatively, a cumulative time window of `current hour`, which starts at minute 30, resets itself every hour. For example, at 6:30am, 7:30am, 8:30am.

### Evaluation frequency

The evaluation frequency defines how often Datadog performs the monitor query. For most configurations, the evaluation frequency is `1 minute`, which means that every minute, the monitor queries the [selected data](#define-the-search-query) over the [selected evaluation window](#evaluation-window) and compares the aggregated value against the [defined thresholds](#thresholds).

By default, evaluation frequencies depend on the [evaluation window](#evaluation-window) that is used. A longer window results in lower evaluation frequencies. The following table illustrates how the evaluation frequency is controlled by larger time windows:

| Evaluation Window Ranges        | Evaluation Frequency  |
|---------------------------------|-----------------------|
| window < 24 hours               | 1 minute              |
| 24 hours <= window < 48 hours   | 10 minutes            |
| window >= 48 hours              | 30 minutes            |

The evaluation frequency can also be configured so that the alerting condition of the monitor is checked on a daily, weekly, or monthly basis. In this configuration, the evaluation frequency is no longer dependent on the evaluation window, but on the configured schedule. 

For more information, see the guide on how to [Customize monitor evaluation frequencies][4].

### Thresholds

Use thresholds to set a numeric value for triggering an alert. Depending on your chosen metric, the editor displays the unit used (`byte`, `kibibyte`, `gibibyte`, etc).

Datadog has two types of notifications (alert and warning). Monitors recover automatically based on the alert or warning threshold but additional conditions can be specified. For additional information on recovery thresholds, see [What are recovery thresholds?][5]. For example, if a monitor alerts when the metric is above `3` and recovery thresholds are not specified, the monitor recovers once the metric value goes back below `3`.

| Option                                   | Description                    |
|------------------------------------------|--------------------------------|
| Alert&nbsp;threshold&nbsp;**(required)** | The value used to trigger an alert notification. |
| Warning&nbsp;threshold                   | The value used to trigger a warning notification. |
| Alert&nbsp;recovery&nbsp;threshold       | An optional threshold to indicate an additional condition for alert recovery. |
| Warning&nbsp;recovery&nbsp;threshold     | An optional threshold to indicate an additional condition for warning recovery. |

As you change a threshold, the preview graph in the editor displays a marker showing the cutoff point.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="Thresholds preview graph" style="width:100%;">}}

**Note**: When entering decimal values for thresholds, if your value is `<1`, add a leading `0` to the number. For example, use `0.5`, not `.5`.


[1]: /monitors/guide/monitor_aggregators/
[2]: /monitors/guide/as-count-in-monitor-evaluations/
[3]: https://docs.datadoghq.com/logs/log_configuration/indexes/#set-daily-quota
[4]: /monitors/guide/custom_schedules
[5]: /monitors/guide/recovery-thresholds/
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



[1]: /monitors/types/process_check/
[2]: /monitors/types/integration/?tab=checkalert#integration-status
[3]: /monitors/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### Advanced alert conditions

#### No data

Notifications for missing data are useful if you expect a metric to always be reporting data under normal circumstances. For example, if a host with the Agent must be up continuously, you can expect the  `system.cpu.idle` metric to always report data.

In this case, you should enable notifications for missing data. The sections below explain how to accomplish this with each option.

**Note**: The monitor must be able to evaluate data before alerting on missing data. For example, if you create a monitor for `service:abc` and data from that `service` is not reporting, the monitor does not send alerts.


{{< tabs >}}
{{% tab "Metric-based monitors" %}}

If you are monitoring a metric over an auto-scaling group of hosts that stops and starts automatically, notifying for `no data` produces a lot of notifications. In this case, you should not enable notifications for missing data. This option does not work unless it is enabled at a time when data has been reporting for a long period.

| Option                                                     | Description                                                                                                                                        | Notes        |
| ---------------------------------------------------------  | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **Do not notify** if data is missing                       | No notification is sent if data is missing                                                                                                         | <u>Simple Alert</u>: the monitor skips evaluations and stays green until data returns that would change the status from OK <br> <u>Multi Alert</u>: if a group does not report data, the monitor skips evaluations and eventually drops the group. During this period, the bar in the results page stays green. When there is data and groups start reporting again, the green bar shows an OK status and backfills to make it look like there was no interruption.|
| **Notify** if data is missing for more than **N** minutes. | You are notified if data is missing. The notification occurs when no data was received during the configured time window.| Datadog recommends that you set the missing data window to at least two times the evaluation period. |


{{% /tab %}}

{{% tab "Other monitor types" %}}

If data is missing for `N` minutes, select an option from the dropdown menu:

{{< img src="/monitors/create/on_missing_data.png" alt="No Data Options" style="width:70%;">}}

- `Evaluate as zero` / `Show last known status`
- `Show NO DATA`
- `Show NO DATA and notify`
- `Show OK`.

The selected behavior is applied when a monitor's query does not return any data. Contrary to the `Do not notify` option, the missing data window is **not** configurable.

| Option                    | Monitor status & notification                                             |
|---------------------------|---------------------------------------------------------------------------|
| `Evaluate as zero`        | Empty result is replaced with zero and is compared to the alert/warning thresholds. For example, if the alert threshold is set to `> 10`, a zero would not trigger that condition, and the monitor status is set to `OK`.   |
| `Show last known status`  | The last known status of the group or monitor is set.                        |
| `Show NO DATA`            | Monitor status is set to `NO DATA`.                                       |
| `Show NO DATA and notify` | Monitor status is set to `NO DATA` and a notification is sent out.        |
| `Show OK`                 | Monitor is resolved and status is set to `OK`.                            |

The `Evaluate as zero` and `Show last known status` options are displayed based on the query type:

- **Evaluate as zero:** This option is available for monitors using `Count` queries without the `default_zero()` function.
- **Show last known status:** This option is available for monitors using any other query type than `Count`, for example `Gauge`, `Rate`, and `Distribution`, as well as for `Count` queries with `default_zero()`.

{{% /tab %}}
{{< /tabs >}}

#### Auto resolve

`[Never]`, `After 1 hour`, `After 2 hours` and so on. automatically resolve this event from a triggered state.

Auto-resolve works when data is no longer being submitted. Monitors do not auto-resolve from an ALERT or WARN state if data is still reporting. If data is still being submitted, the [renotify][2] feature can be utilized to let your team know when an issue is not resolved.

For some metrics that report periodically, it may make sense for triggered alerts to auto-resolve after a certain time period. For example, if you have a counter that reports only when an error is logged, the alert never resolves because the metric never reports `0` as the number of errors. In this case, set your alert to resolve after a certain time of inactivity on the metric. **Note**: If a monitor auto-resolves and the value of the query does not meet the recovery threshold at the next evaluation, the monitor triggers an alert again.

In most cases this setting is not useful because you only want an alert to resolve after it is actually fixed. So, in general, it makes sense to leave this as `[Never]` so alerts only resolve when the metric is above or below the set threshold.

#### Group retention time

You can drop the group from the monitor status after `N` hours of missing data. The length of time can be at minimum 1 hour, and at maximum 72 hours. For multi alert monitors, select **Remove the non-reporting group after `N (length of time)`**.

{{< img src="/monitors/create/group_retention_time.png" alt="Group Retention Time Option" style="width:70%;">}}

Similar to the [Auto-resolve option][3], the group retention works when data is no longer being submitted. This option controls how long the group is kept in the monitor's status once data stops reporting. By default, a group keeps the status for 24 hours before it is dropped. The start time of the group retention and the Auto-resolve option are **identical** as soon as the monitor query returns no data.

Some use cases to define a group retention time include:

- When you would like to drop the group immediately or shortly after data stops reporting
- When you would like to keep the group in the status for as long as you usually take for troubleshooting

**Note**: The group retention time option requires a multi alert monitor that supports the [`On missing data`][4] option. These monitor types are APM Trace Analytics, Audit Logs, CI Pipelines, Error Tracking, Events, Logs, and RUM monitors.

#### New group delay

Delay the evaluation start by `N` seconds for new groups.

The time (in seconds) to wait before starting alerting, to allow newly created groups to boot and applications to fully start. This should be a non-negative integer.

For example, if you are using containerized architecture, setting a group delay prevents monitor groups scoped on containers from triggering due to high resource usage or high latency when a new container is created. The delay is applied to every new group (which has not been seen in the last 24 hours) and defaults to `60` seconds.

The option is available with multi alert mode.

#### Evaluation delay

<div class="alert alert-info"> Datadog recommends a 15-minute delay for cloud metrics, which are backfilled by service providers. Additionally, when using a division formula, a 60-second delay is helpful to ensure your monitor evaluates on complete values. See the <a href="https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
">Cloud Metric Delay</a> page for estimated delay times.</div>

Delay evaluation by `N` seconds.

The time (in seconds) to delay evaluation. This should be a non-negative integer. So, if the delay is set to 900 seconds (15 minutes), the monitor evaluation is during the last `5 minutes`, and the time is 7:00, the monitor evaluates data from 6:40 to 6:45. The maximum configurable evaluation delay is 86400 seconds (24 hours).

## Configure notifications and automations

Configure your notification messages to include the information you are most interested in. Specify which teams to send these alerts to as well as which attributes to trigger alerts for.

### Message

Use this section to configure notifications to your team and configure how to send these alerts:

  - [Configure your notification with Template Variables][5]
  - [Send notifications to your team through email, Slack, or PagerDuty][6]

For more information on the configuration options for the notification message, see [Alerting Notifications][7].

### Add metadata

<div class="alert alert-info">Monitor tags are independent of tags sent by the Agent or integrations. See the <a href="/monitors/manage/">Manage Monitors documentation</a>.</div>

1. Use the **Tags** dropdown to associate [tags][8] with your monitor.
1. Use the **Teams** dropdown to associate [teams][9] with your monitor.
1. Choose a **Priority**.

### Set alert aggregation

Alerts are grouped automatically based on your selection of the `group by` step when defining your query. If the query has no grouping, it defaults to `Simple Alert`. If the query is grouped by any dimension, grouping changes to `Multi Alert`.

{{< img src="/monitors/create/notification-aggregation.png" alt="Configurations options for monitor notification aggregation" style="width:100%;">}}

#### Simple alert

`Simple Alert` mode triggers a notification by aggregating over all reporting sources. You receive **one alert** when the aggregated value meets the set conditions. For example, you might set up a monitor to notify you if the average CPU usage of all servers exceeds a certain threshold. If that threshold is met, you'll receive a single notification, regardless of the number of individual servers that met the threshold. This can be useful for monitoring broad system trends or behaviors.


{{< img src="/monitors/create/simple-alert.png" alt="Diagram showing how monitor notifications are sent in simple alert mode" style="width:90%;">}}

#### Multi alert

A `Multi Alert` monitor triggers individual notifications for each entity in a monitor that meets the alert threshold.

{{< img src="/monitors/create/multi-alert.png" alt="Diagram of how monitor notifications are sent in multi alert mode" style="width:90%;">}}

For example, when setting up a monitor to notify you if the P99 latency, aggregated by service, exceeds a certain threshold, you would receive a **separate** alert for each individual service whose P99 latency exceeded the alert threshold. This can be useful for identifying and addressing specific instances of system or application issues. It allows you to track problems on a more granular level.

When monitoring a large group of entities, multi alerts can lead to noisy monitors. To mitigate this, customize which dimensions trigger alerts. This reduces the noise and allows you to focus on the alerts that matter most. For instance, you are monitoring the average CPU usage of all your hosts. If you group your query by `service` and `host` but only want alerts to be sent once for each `service` attribute meeting the threshold, remove the `host` attribute from your multi alert options and reduce the number of notifications that are sent.

{{< img src="/monitors/create/multi-alert-aggregated.png" alt="Diagram of how notifications are sent when set to specific dimensions in multi alerts" style="width:90%;">}}

When aggregating notifications in `Multi Alert` mode, the dimensions that are not aggregated on become `Sub Groups` in the UI.

**Note**: If your metric is only reporting by `host` with no `service` tag, it is not detected by the monitor. Metrics with both `host` and `service` tags are detected by the monitor.

If you configure tags or dimensions in your query, these values are available for every group evaluated in the multi alert to dynamically fill in notifications with useful context. See [Attribute and tag variables][10] to learn how to reference tag values in the notification message.

| Group by                       | Simple alert mode | Multi alert mode |
|-------------------------------------|------------------------|-----------------------|
| _(everything)_                      | One single group triggering one notification | N/A |
| 1&nbsp;or&nbsp;more&nbsp;dimensions | One notification if one or more groups meet the alert conditions | One notification per group meeting the alert conditions |

## Permissions

All users can view all monitors, regardless of the role they are associated with. By default, only users attached to roles with the [Monitors Write permission][11] can edit monitors. [Datadog Admin Role and Datadog Standard Role][12] have the Monitors Write permission by default. If your organization uses [Custom Roles][13], other custom roles may have the Monitors Write permission. For more information on setting up RBAC for Monitors and migrating monitors from the locked setting to using role restrictions, see the guide on [How to set up RBAC for Monitors][14].

You can further restrict your monitor by specifying a list of [roles][15] allowed to edit it. The monitor's creator can always edit the monitor. Editing includes any updates to the monitor configuration, deleting the monitor, and muting the monitor for any amount of time.

**Note**: The limitations are applied both in the UI and API.

### Granular access controls

Use [granular access controls][16] to limit the roles that can edit a monitor:
1. While editing or configuring a monitor, find the **Define permissions and audit notifications** section.
  {{< img src="monitors/configuration/define_permissions_audit_notifications.png" alt="Monitor configuration options to define permissions" style="width:70%;" >}}
1. Click **Edit Access**.
1. Click **Restrict Access**.
1. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the dropdown to select one or more roles, teams, or users that may edit the monitor.
1. Click **Add**.
1. The dialog box updates to show that the role you selected has the **Editor** permission.
1. Click **Done**.

**Note:** To maintain your edit access to the monitor, the system requires you to include at least one role that you are a member of before saving. For more information about roles, see the [RBAC documentation][15].

To restore general access to a monitor with restricted access, follow the steps below:
1. While viewing a monitor, click the **More** dropdown menu.
1. Select **Permissions**.
1. Click **Restore Full Access**.
1. Click **Save**.

Edit-restricted monitors display the roles that have Editor access at the top of the page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types
[2]: /monitors/notify/#renotify
[3]: /monitors/configuration/?tab=thresholdalert#auto-resolve
[4]: /monitors/configuration/?tabs=othermonitortypes#no-data
[5]: /monitors/notify/variables/
[6]: /monitors/notify/#configure-notifications-and-automations
[7]: /monitors/notify/#say-whats-happening
[8]: /getting_started/tagging/
[9]: /account_management/teams/
[10]: /monitors/notify/variables/?tab=is_alert#attribute-and-tag-variables
[11]: /account_management/rbac/permissions/#monitors
[12]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[13]: /account_management/rbac/?tab=datadogapplication#custom-roles
[14]: /monitors/guide/how-to-set-up-rbac-for-monitors/
[15]: /account_management/rbac/
[16]: /account_management/rbac/granular_access
