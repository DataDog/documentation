---
title: Monitor API Options
kind: guide
---

## Common options

- **`silenced`** dictionary of scopes to timestamps or `null`. Each scope is muted until the given POSIX timestamp or forever if the value is `null`. Default: **null**. Examples:

  - To mute the alert completely: `{'*': null}`
  - To mute `role:db` for a short time: `{'role:db': 1412798116}`

- **`new_group_delay`** time (in seconds) before starting alerting on new groups, to allow newly created applications or containers to fully start. Should be a non negative integer. Default: **60**. Example: If you are using a containerized architecture, setting an evaluation delay prevents your monitor's group-by containers from triggering when a new container is created, which may cause some latency or a spike in CPU usage in the first minutes.

- **`new_host_delay`** time (in seconds) to allow a host to boot and applications to fully start before starting the evaluation of monitor results. Should be a non negative integer. **Deprecated: Use `new_group_delay` instead.**

- **`notify_no_data`** a boolean indicating whether this monitor notifies when data stops reporting. Default: **False**.
- **`no_data_timeframe`** the number of minutes before a monitor notifies after data stops reporting. Datadog recommends at least 2x the monitor timeframe for metric alerts or 2 minutes for service checks.  **If omitted, 2x the evaluation timeframe is used for metric alerts, and 24 hours is used for service checks.**
- **`timeout_h`** the number of hours of the monitor not reporting data before it automatically resolves from a triggered state. The minimum allowed value is 0 hours. The maximum allowed value is 24 hours. Default: **null**.

-  **`require_full_window`** a boolean indicating whether this monitor needs a full window of data before it's evaluated. Datadog recommends you set this to `False` for sparse metrics, otherwise some evaluations are skipped. Default: **False**.
- **`renotify_interval`** the number of minutes after the last notification before a monitor re-notifies on the current status. It only re-notifies if it's not resolved. Default: **null**.
- **`renotify_statuses`** the states from which a monitor re-notifies. Default: *null* if `renotify_interval` is **null**. If `renotify_interval` is set, defaults to re-notify on `Alert` and `No Data`.
- **`renotify_occurrences`** the number of times a monitor re-notifies. It can only be set if `renotify_interval` is set. Default: **null**, it renotifies without a limit.
- **`escalation_message`** a message to include with a re-notification. Supports the '@username' notification that is allowed elsewhere. Not applicable if `renotify_interval` is `null`. Default: **null**.
- **`notify_audit`** a boolean indicating whether tagged users are notified on changes to this monitor. Default: **False**
- **`include_tags`** a boolean indicating whether notifications from this monitor automatically inserts its triggering tags into the title. Default: **True**. Examples:

  - `True`: `[Triggered on {host:h1}] Monitor Title`
  - `False`: `[Triggered] Monitor Title`

### Permissions options

- **`locked`** a boolean indicating whether changes to this monitor should be restricted to the creator or users with the Org Management (`org_management`) permission. Default: **False**. **Deprecated: Use `restricted_roles` instead.**
- **`restricted_roles`** an array listing the UUIDs of the roles allowed to edit the monitor. Monitor editing includes updates to the monitor configuration, deleting the monitor, and muting of the monitor for any amount of time. Role UUIDs can be pulled from the [Roles API][1]. `restricted_roles` is the successor to `locked`.

**Note:** Do not set both the `locked` and `restricted_roles` parameters on the same monitor. If both are set, the more restrictive parameter applies. Any role set in `restricted_roles` is considered more restrictive than `locked:true`.

The following examples demonstrate how the `locked` and `restricted_roles` parameters interact:
- If a monitor is set to `locked:false` and `"restricted_roles": [ "er6ec1b6-903c-15ec-8686-da7fd0960002" ]`, the `restricted_roles` parameter applies.
- If a monitor is set to `locked:true` and `"restricted_roles": [ "er6ec1b6-903c-15ec-8686-da7fd0960002" ]`, the `restricted_roles` parameter applies.
- If a monitor is set to `locked:true` and no `"restricted_roles"` parameter is set, the `locked:true` parameter applies.

For more information on setting up RBAC for Monitors and migrating monitors from the locked setting to using role restrictions, see the [dedicated guide][2].

## Anomaly options

_These options only apply to anomaly monitors and are ignored for other monitor types._

- **`threshold_windows`** a dictionary containing `recovery_window` and `trigger_window`.

  - `recovery_window` describes how long an anomalous metric must be normal before the alert recovers
  - `trigger_window` describes how long a metric must be anomalous before an alert triggers

Example: `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

## Metric alert options

_These options only apply to metric alerts._

- **`thresholds`** a dictionary of thresholds by threshold type. There are two threshold types for metric alerts: *critical* and *warning*. *Critical* is defined in the query, but can also be specified in this option. *Warning* threshold can only be specified using the thresholds option. If you want to use [recovery thresholds][3] for your monitor, use the attributes `critical_recovery` and `warning_recovery`.

Example: `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`

- **`evaluation_delay`** time (in seconds) to delay evaluation, as a non-negative integer. For example, if the value is set to 300 (5min), the timeframe is set to last_5m and the time is 7:00, the monitor evaluates data from 6:50 to 6:55. This is useful for AWS CloudWatch and other backfilled metrics to ensure the monitor always has data during evaluation.

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

[1]: /api/latest/roles/
[2]: /monitors/guide/how-to-set-up-rbac-for-monitors/
[3]: /monitors/guide/recovery-thresholds/
