---
title: Monitor API Options
description: "Comprehensive reference for monitor API configuration options including common settings, permissions, anomaly alerts, and metric alerts."
---

## Common options

| Option | Description | Default |
|--------|--------------|---------|
| `silenced` | Dictionary of scopes to timestamps, or `null`. Each scope is muted until the given POSIX timestamp, or forever if the value is `null`. For example, `{'*': null}` mutes the alert completely, and `{'role:db': 1412798116}` mutes `role:db` until the given timestamp. **Deprecated**: reflects v1 downtimes only. Use the [Downtimes API][6] to schedule downtimes. | `null` |
| `new_group_delay` | Time (in seconds) before starting alerting on new groups, so newly created applications or containers have time to fully start. Must be a non-negative integer. For example, in a containerized architecture, setting a delay prevents a monitor's group-by containers from triggering when a new container starts, which can cause latency or a CPU spike in the first few minutes. | `60` |
| `new_host_delay` | Time (in seconds) to allow a host to boot and applications to fully start before evaluating monitor results. **Deprecated**: use `new_group_delay` instead. | `300` |
| `notify_no_data` | Boolean indicating whether the monitor notifies when data stops reporting. | `false` |
| `no_data_timeframe` | Number of minutes before the monitor notifies after data stops reporting. Datadog recommends at least 2x the monitor timeframe for query alerts, or 2 minutes for service checks. If omitted, defaults to 2x the evaluation timeframe for query alerts, or 24 hours for service checks. | `null` |
| `timeout_h` | Number of hours the monitor can go without reporting data before it automatically resolves from a triggered state. Range: 0-24. | `null` |
| `renotify_interval` | Number of minutes after the last notification before the monitor re-notifies on the current status. Only re-notifies if the monitor is unresolved. | `null` |
| `renotify_statuses` | Statuses that trigger re-notification. If `renotify_interval` is set and this option is omitted, defaults to `alert` and `no data`. | `null` |
| `renotify_occurrences` | Number of times to send re-notifications at the `renotify_interval`. Requires `renotify_interval` to be set. | `null` |
| `escalation_message` | Message to include with a re-notification. Supports `@username` notifications. Not applicable if `renotify_interval` is `null`. | `null` |
| `notify_audit` | Boolean indicating whether tagged users are notified of changes to the monitor. | `false` |
| `notify_by` | Tags that control the granularity a monitor alerts on. Only available for monitors with groupings. For example, a monitor grouped by `cluster` and `namespace` can be set to notify on each new `cluster` alone by setting `notify_by` to `["cluster"]`. Tags in `notify_by` must be a subset of the query's group-by tags. Set to `["*"]` to notify as a simple alert. | `null` |
| `notification_preset_name` | Controls how much additional content, such as the triggering query or notified handles, appears in the notification. One of `show_all`, `hide_query`, `hide_handles`, `hide_all`, `hide_query_and_handles`, `show_only_snapshot`, or `hide_handles_and_footer`. | `show_all` |
| `include_tags` | Boolean indicating whether notifications automatically include the triggering tags in the title. For example, `true` results in `[Triggered on {host:h1}] Monitor Title`, and `false` results in `[Triggered] Monitor Title`. | `true` |
| `evaluation_delay` | Time (in seconds) to delay evaluation, as a non-negative integer. For example, if the value is `300` (5 minutes), the timeframe is `last_5m`, and the time is 7:00, the monitor evaluates data from 6:50 to 6:55. This is commonly used with metric alerts for backfilled data sources, such as AWS CloudWatch, but is available on most monitor types. Not supported on SLO monitors outside of burn rate alerts. | `null` |

## Permissions options

- **`restricted_roles`** an array listing the UUIDs of the roles allowed to edit the monitor. Monitor editing includes updates to the monitor configuration, deleting the monitor, and muting the monitor for any amount of time. Pull role UUIDs from the [Roles API][1].

**Note**: You can also set up permissions on monitors based on [Teams][4] and users, in addition to roles, with [Restriction Policies][5]. For more information on restricting permissions for monitors, see the [dedicated guide][2].

## Anomaly options

_These options only apply to anomaly monitors and are ignored for other monitor types._

- **`threshold_windows`** a dictionary containing `recovery_window` and `trigger_window`.

  - `recovery_window` describes how long an anomalous metric must be normal before the alert recovers
  - `trigger_window` describes how long a metric must be anomalous before an alert triggers

Example: `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

## Metric alert options

_These options only apply to metric alerts._

- **`thresholds`** a dictionary of thresholds by threshold type. There are two threshold types for metric alerts: *critical* and *warning*. *Critical* is defined in the query, but can also be specified in this option. *Warning* threshold can only be specified using the thresholds option. If you want to use [recovery thresholds][3] for your monitor, use the attributes `critical_recovery` and `warning_recovery`. To use a dynamic threshold based on a formula, use `critical_query` and `critical_recovery_query` with a formula query and the `variables` option. This is in preview.

Example: `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`

- **`require_full_window`** a boolean indicating whether this monitor needs a full window of data before it's evaluated. Datadog recommends you set this to `False` for sparse metrics, otherwise some evaluations are skipped. Default: **False**.

## Service check options

_These options only apply to service checks and are ignored for other monitor types._

- **`thresholds`** a dictionary of thresholds by status. Because service checks can have multiple thresholds, they aren't defined directly in the query.

Example: `{'ok': 1, 'critical': 1, 'warning': 1}`

## Logs alert options

_These options only apply to logs alerts._

- **`thresholds`** a dictionary of thresholds by status.

Example: `{'ok': 1, 'critical': 1, 'warning': 1}`

- **`aggregation`** a dictionary of `type`, `metric`, and `groupBy`.
  - `type`: Three types are supported: `count`, `cardinality`, and `avg`.
  - `metric`: For `cardinality`, use the name of the facet. For `avg`, use the name of the metric. For `count`, put `count` as metric.
  - `groupBy`: Name of the facet on which you want to group by.

Example: `{"metric": "count","type": "count","groupBy": "core_service"}`

- **`enable_logs_sample`** a boolean to add samples or values to the notification message. Default: `False`

## Synthetic test monitor options

_These options only apply to Synthetic test monitors._

- **`min_failure_duration`** how long, in seconds, a test must be in failure before alerting. Maximum: `7200`. Default: **0**.
- **`min_location_failed`** the minimum number of test locations that must be in failure at the same time during the `min_failure_duration` window before alerting. Used with `min_failure_duration` as part of the advanced alerting rules. Default: **1**.

## Options for APM Trace Analytics, Audit Trail, CI, Error Tracking, Event, Logs, and RUM monitors

_These options only apply to the monitor types listed in this section's title._

- **`group_retention_duration`** the time span after which groups with missing data are dropped from the monitor state. Minimum: one hour. Maximum: 72 hours. Example values: `60m`, `1h`, `2d`.
- **`on_missing_data`** controls how groups or monitors behave when an evaluation returns no data points. The default behavior depends on the query type: monitors using a count query treat an empty evaluation as `0` and compare it to the threshold conditions, and monitors using another query type, such as gauge, measure, or rate, show the last known status. One of `default`, `show_no_data`, `show_and_notify_no_data`, or `resolve`.
- **`enable_samples`** a boolean to send a list of samples when the monitor triggers. Only available for CI Test and CI Pipeline monitors.

[1]: /api/latest/roles/
[2]: /monitors/guide/how-to-set-up-rbac-for-monitors/
[3]: /monitors/guide/recovery-thresholds/
[4]: /account_management/teams/
[5]: /api/latest/restriction-policies/
[6]: /api/latest/downtimes/
