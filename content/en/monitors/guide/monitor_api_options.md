---
title: Monitor API Options
kind: guide
---

## Common options 

- **`silenced`** dictionary of scopes to timestamps or `None`. Each scope is muted until the given POSIX timestamp or forever if the value is `None`. Default: **None**. Examples:

  - To mute the alert completely: `{'*': None}`
  - To mute `role:db` for a short time: `{'role:db': 1412798116}`

- **`new_host_delay`** Time (in seconds) to allow a host to boot and applications to fully start before starting the evaluation of monitor results. Should be a non negative integer. Default: **300**
- **`notify_no_data`** a Boolean indicating whether this monitor notifies when data stops reporting. Default: **false**
- **`no_data_timeframe`** The number of minutes before a monitor notifies after data stops reporting. Datadog recommends at least 2x the monitor timeframe for metric alerts or 2 minutes for service checks.  **If omitted, 2x the evaluation timeframe is used for metric alerts, and 24 hours is used for service checks.**
- **`timeout_h`** the number of hours of the monitor not reporting data before it automatically resolves from a triggered state. Default: **None**.
-  **`require_full_window`** a Boolean indicating whether this monitor needs a full window of data before it's evaluated. We highly recommend you set this to `False` for sparse metrics, otherwise some evaluations are skipped. Default: **True** for "on average", "at all times" and "in total" aggregation. **False** otherwise.
- **`renotify_interval`** the number of minutes after the last notification before a monitor re-notifies on the current status. It only re-notifies if it's not resolved. Default: **None**.
- **`escalation_message`** a message to include with a re-notification. Supports the '@username' notification we allow elsewhere. Not applicable if `renotify_interval` is `None`. Default: **None**.
- **`notify_audit`** a Boolean indicating whether tagged users is notified on changes to this monitor. Default: **False**
- **`locked`** a Boolean indicating whether changes to to this monitor should be restricted to the creator or admins. Default: **False**
- **`include_tags`** a Boolean indicating whether notifications from this monitor automatically inserts its triggering tags into the title. Default: **True**. Examples:

  - `True`: `[Triggered on {host:h1}] Monitor Title`
  - `False`: `[Triggered] Monitor Title`

## Anomaly options

_These options only apply to anomaly monitors and are ignored for other monitor types._

- **`threshold_windows`** a dictionary containing `recovery_window` and `trigger_window`.

  - `recovery_window` describes how long an anomalous metric must be normal before the alert recovers
  - `trigger_window` describes how long a metric must be anomalous before an alert triggers

Example: `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

## Metric alert options

_These options only apply to metric alerts._

- **`thresholds`** a dictionary of thresholds by threshold type. There are two threshold types for metric alerts: *critical* and *warning*. *Critical* is defined in the query, but can also be specified in this option. *Warning* threshold can only be specified using the thresholds option. If you want to use [recovery thresholds][1] for your monitor, use the attributes `critical_recovery` and `warning_recovery`.

Example: `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`

- **`evaluation_delay`** Time (in seconds) to delay evaluation, as a non-negative integer. For example, if the value is set to 300 (5min), the timeframe is set to last_5m and the time is 7:00, the monitor evaluates data from 6:50 to 6:55. This is useful for AWS CloudWatch and other backfilled metrics to ensure the monitor always has data during evaluation.

## Service check options

_These options only apply to service checks and are ignored for other monitor types._

- **`thresholds`** a dictionary of thresholds by status. Because service checks can have multiple thresholds, we don't define them directly in the query.

Example: `{'ok': 1, 'critical': 1, 'warning': 1}`

## Logs alert options

_These options only apply to logs alerts._

- **`thresholds`** a dictionary of thresholds by status.

Example: `{'ok': 1, 'critical': 1, 'warning': 1}`

- **`aggregation`** a dictionary of `type`, `metric` and `groupeBy`:
  - `type`  3 types are supported: `count`, `cardinality` and `avg`
  - `metric`:  for `cardinality` name of the facet. For `avg` name of the metric. for `count`just put `count` as metric  
  - `groupeBy` name of the facet on which you want to group by.

Example: `{"metric": "count","type": "count","groupBy": "core_service"}`

- **`enable_logs_sample`** a Boolean to add samples or values to the notification message. Default: `True`

[1]: ../../faq/what-are-recovery-thresholds/
