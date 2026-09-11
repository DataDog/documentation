---
title: Monitor API Options
description: "Comprehensive reference for monitor API configuration options including common settings, permissions, anomaly alerts, and metric alerts."
---

This guide describes the options available when configuring monitors through the [Monitors API][7]. It covers options that: 
- Are common to all monitor types.
- Control edit permissions.
- Only apply to specific monitor types, such as metric, anomaly, log, service check, and Synthetic test monitors.

## Common options

`silenced`
: **Deprecated**: Reflects v1 downtimes only. Use the [Downtimes API][6] instead.<br>
**Default**: `null`<br>
Dictionary of scopes to timestamps, or `null` to mute forever.

  **Example**: `{'*': null}` mutes everything; `{'role:db': 1412798116}` mutes `role:db` until that timestamp.

`new_host_delay`
: **Deprecated**: Use `new_group_delay` instead.<br>
**Default**: `300`<br>
Time (in seconds) to allow a host to boot before evaluating monitor results.

`new_group_delay`
: **Default**: `60`<br>
Time (in seconds) before alerting on new groups, so new applications or containers have time to start. Non-negative integer. Prevents alerts on newly created group-by values, such as containers that spike CPU on startup.

`notify_no_data`
: **Default**: `false`<br>
A Boolean indicating whether the monitor notifies when data stops reporting.

`no_data_timeframe`
: **Default**: `null`<br>
Minutes before the monitor notifies after data stops reporting.<br>
Recommended: 2x the monitor time frame for query alerts, or 2 minutes for service checks.

`timeout_h`
: **Default**: `null`<br>
Hours without data before the monitor auto-resolves from a triggered state.<br>
Range: 0-24.

`renotify_interval`
: **Default**: `null`<br>
Minutes after the last notification before the monitor re-notifies, if unresolved.

`renotify_statuses`
: **Default**: `null`<br>
Statuses that trigger re-notification. Defaults to `alert` and `no data` when `renotify_interval` is set.

`renotify_occurrences`
: **Default**: `null`<br>
Number of re-notifications to send at the `renotify_interval`.<br>
Requires `renotify_interval`.

`escalation_message`
: **Default**: `null`<br>
Message to include with a re-notification. Supports `@username`.<br>
Requires `renotify_interval`.

`notify_audit`
: **Default**: `false`<br>
A Boolean indicating whether tagged users are notified of changes to the monitor.

`notify_by`
: **Default**: `null`<br>
Tags that control alert granularity for grouped monitors. Must be a subset of the query's group-by tags. Set to `["*"]` to notify as a simple alert.

`notification_preset_name`
: **Default**: `show_all`<br>
Controls how much extra content, such as the query or notified handles, appears in the notification. One of `show_all`, `hide_query`, `hide_handles`, `hide_all`, `hide_query_and_handles`, `show_only_snapshot`, `hide_handles_and_footer`.

`include_tags`
: **Default**: `true`<br>
A Boolean indicating whether notifications include the triggering tags in the title.<br>
**Example**: `true` results in `[Triggered on {host:h1}] Monitor Title`; `false` results in `[Triggered] Monitor Title`.

`evaluation_delay`
: **Default**: `null`<br>
Time (in seconds) to delay evaluation. Useful for backfilled data sources, such as AWS CloudWatch. Available on most monitor types; not supported on SLO monitors outside of burn rate alerts.

## Permissions options

`restricted_roles`
: An array listing the UUIDs of the roles allowed to edit the monitor. Monitor editing includes updates to the monitor configuration, deleting the monitor, and muting the monitor for any amount of time. Pull role UUIDs from the [Roles API][1].

**Note**: You can also set up permissions on monitors based on [Teams][4] and users, in addition to roles, with [Restriction Policies][5]. For more information on restricting permissions for monitors, see the [dedicated guide][2].

## Options by monitor type

{{% collapse-content title="Anomaly options" level="h3" %}}

_These options only apply to anomaly monitors and are ignored for other monitor types._

`threshold_windows`
: A dictionary containing `recovery_window` and `trigger_window`.

  - `recovery_window`: How long an anomalous metric must be normal before the alert recovers.
  - `trigger_window`: How long a metric must be anomalous before an alert triggers.

  **Example**: `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

{{% /collapse-content %}}

{{% collapse-content title="Metric alert options" level="h3" %}}

_These options only apply to metric alerts._

`thresholds`
: A dictionary of thresholds by threshold type. There are two threshold types for metric alerts: *critical* and *warning*. *Critical* is defined in the query, but can also be specified in this option. *Warning* threshold can only be specified using the thresholds option. If you want to use [recovery thresholds][3] for your monitor, use the attributes `critical_recovery` and `warning_recovery`.

  **Example**: `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`

`require_full_window`
: **Default**: `false`<br>
A Boolean indicating whether this monitor needs a full window of data before it's evaluated. Datadog recommends you set this to `false` for sparse metrics; otherwise some evaluations are skipped.

{{% /collapse-content %}}

{{% collapse-content title="Service check options" level="h3" %}}

_These options only apply to service checks and are ignored for other monitor types._

`thresholds`
: A dictionary of thresholds by status. Because service checks can have multiple thresholds, they aren't defined directly in the query.

  **Example**: `{'ok': 1, 'critical': 1, 'warning': 1}`

{{% /collapse-content %}}

{{% collapse-content title="Logs alert options" level="h3" %}}

_These options only apply to logs alerts._

`thresholds`
: A dictionary of thresholds by status.

  **Example**: `{'ok': 1, 'critical': 1, 'warning': 1}`

`aggregation`
: A dictionary of `type`, `metric`, and `groupBy`.

  **Example**: `{"metric": "count","type": "count","groupBy": "core_service"}`

  - `type`: Three types are supported: `count`, `cardinality`, and `avg`.
  - `metric`: For `cardinality`, use the name of the facet. For `avg`, use the name of the metric. For `count`, put `count` as metric.
  - `groupBy`: Name of the facet on which you want to group by.

`enable_logs_sample`
: **Default**: `false`<br>
A Boolean to add samples or values to the notification message.

{{% /collapse-content %}}

{{% collapse-content title="Synthetic test monitor options" level="h3" %}}

_These options only apply to Synthetic test monitors._

`min_failure_duration`
: **Default**: `0`<br>
How long, in seconds, a test must be in failure before alerting. Maximum: `7200`.

`min_location_failed`
: **Default**: `1`<br>
The minimum number of test locations that must be in failure at the same time during the `min_failure_duration` window before alerting. Used with `min_failure_duration` as part of the advanced alerting rules.

{{% /collapse-content %}}

{{% collapse-content title="Options for APM Trace Analytics, Audit Trail, CI, Error Tracking, Event, Logs, and RUM monitors" level="h3" %}}

_These options only apply to the monitor types listed in this section's title._

`group_retention_duration`
: The time span after which groups with missing data is dropped from the monitor state. Minimum: one hour. Maximum: 72 hours.

  **Example values**: `60m`, `1h`, `2d`.

`on_missing_data`
: Controls how groups or monitors behave when an evaluation returns no datapoints. The default behavior depends on the query type: monitors using a count query treat an empty evaluation as `0` and compare it to the threshold conditions, and monitors using another query type, such as gauge, measure, or rate, show the last known status. One of `default`, `show_no_data`, `show_and_notify_no_data`, or `resolve`.

`enable_samples`
: A Boolean to send a list of samples when the monitor triggers. Only available for CI Test and CI Pipeline monitors.

{{% /collapse-content %}}

[1]: /api/latest/roles/
[2]: /monitors/guide/how-to-set-up-rbac-for-monitors/
[3]: /monitors/guide/recovery-thresholds/
[4]: /account_management/teams/
[5]: /api/latest/restriction-policies/
[6]: /api/latest/downtimes/
[7]: /api/latest/monitors/
