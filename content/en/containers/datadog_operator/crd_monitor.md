---
title: DatadogMonitor CRD
description: Deploy and manage Datadog monitors using the DatadogMonitor custom resource definition with the Datadog Operator
further_reading:
  - link: "https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor"
    tag: "Datadog API"
    text: "API Reference: Create a Datadog monitor"
  - link: "https://github.com/DataDog/helm-charts/blob/main/crds/datadoghq.com_datadogmonitors.yaml"
    tag: "GitHub"
    text: "DatadogMonitor CRD"
---

To deploy a Datadog monitor, you can use the Datadog Operator and `DatadogMonitor` custom resource definition (CRD).

## Prerequisites
- [Helm][1]
- [`kubectl` CLI][2]
- [Datadog Operator][3] v0.6+

## Setup

1. Create a file with the spec of your `DatadogMonitor` deployment configuration.

   **Example**:

   The following spec creates a [metric monitor][4] that alerts on the query `avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5`.

   {{< code-block lang="yaml" filename="datadog-metric-monitor.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogMonitor
   metadata:
     name: datadog-monitor-test
     namespace: datadog
   spec:
     query: "avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5"
     type: "metric alert"
     name: "Test monitor made from DatadogMonitor"
     message: "1-2-3 testing"
     tags:
       - "test:datadog"
     priority: 5
     controllerOptions:
       disableRequiredTags: false
     options:
       evaluationDelay: 300
       includeTags: true
       locked: false
       newGroupDelay: 300
       notifyNoData: true
       noDataTimeframe: 30
       renotifyInterval: 1440
       thresholds:
         critical: "0.5"
         warning: "0.28"
   {{< /code-block >}}

   See the [complete list of configuration fields](#all-available-configuration-fields).

2. Deploy your `DatadogMonitor`:

   ```shell
   kubectl apply -f /path/to/your/datadog-metric-monitor.yaml
   ```

## Additional examples

### Metric monitors
- [A pod is in CrashLoopBackOff][6]
- [A pod is in ImagePullBackOff][8]
- [More than one deployment replica's pods are down][7]
- [More than one StatefulSet replica's pods are down][12]
- [More than 20% of nodes on a cluster are unschedulable][9]
- [More than 10 pods are failing in a cluster][10]
- [Pods are restarting multiple times in the last five minutes][11]


### Other monitors
- [Audit monitor][13]
- [Event monitor][14]
- [Event V2 monitor][15]
- [Log monitor][16]
- [Process monitor][17]
- [RUM monitor][18]
- [Service check monitor][19]
- [SLO monitor][20]
- [Trace analytics monitor][21]

## All available configuration fields

The following table lists all available configuration fields for the `DatadogMonitor` custom resource.

`message`
: **required** - _string_
<br/>A message to include with notifications for this monitor.

`name`
: **required** - _string_
<br/>The monitor name.

`query`
: **required** - _string_
<br/>The monitor query.

`type`
: **required** - _enum_
<br/>The type of the monitor. 
<br/>Allowed enum values: `metric alert`, `query alert`, `service check`, `event alert`, `log alert`, `process alert`, `rum alert`, `trace-analytics alert`, `slo alert`, `event-v2 alert`, `audit alert`, `composite`

`controllerOptions.disableRequiredTags`
: _boolean_
<br/>Disables the automatic addition of required tags to monitors.

`priority`
: _int64_
<br/>An integer from 1 (high) to 5 (low) indicating alert severity.

`restrictedRoles`
: _[string]_
<br/>A list of unique role identifiers to define which roles are allowed to edit the monitor. The unique identifiers for all roles can be pulled from the [Roles API][22] and are located in the `data.id` field.

`tags`
: _[string]_
<br/>Tags associated to your monitor.

`options`
: _object_
<br/>List of options associated with your monitor. See [Options](#options).

### Options

The following fields are set in the `options` property.

For example:

{{< highlight yaml "hl_lines=11-15" >}}
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMonitor
metadata:
  name: datadog-monitor-test
  namespace: datadog
spec:
  query: "avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5"
  type: "metric alert"
  name: "Test monitor made from DatadogMonitor"
  message: "1-2-3 testing"
  options:
    enableLogsSample: true
    thresholds:
      critical: "0.5"
      warning: "0.28"
{{< /highlight >}}

`enableLogsSample`
: _boolean_
<br/>Whether or not to send a log sample when the log monitor triggers.

`escalationMessage`
: _string_
<br/>A message to include with a re-notification.

`evaluationDelay`
: _int64_
<br/>Time (in seconds) to delay evaluation, as a non-negative integer. For example: if the value is set to 300 (5min), the timeframe is set to `last_5m`, and the time is 7:00, then the monitor evaluates data from 6:50 to 6:55. This is useful for AWS CloudWatch and other backfilled metrics to ensure the monitor always has data during evaluation.

`groupRetentionDuration`
: _string_
<br/>The time span after which groups with missing data are dropped from the monitor state. The minimum value is one hour, and the maximum value is 72 hours. Example values are: `60m`, `1h`, and `2d`. This option is only available for APM Trace Analytics, Audit Trail, CI, Error Tracking, Event, Logs, and RUM monitors.

`groupbySimpleMonitor`
: _boolean_
<br/>DEPRECATED: Whether the log alert monitor triggers a single alert or multiple alerts when any group breaches a threshold. Use `notifyBy` instead.

`includeTags`
: _boolean_
<br/>A Boolean indicating whether notifications from this monitor automatically inserts its triggering tags into the title.

`locked`
: _boolean_
<br/>DEPRECATED: Whether or not the monitor is locked (only editable by creator and admins). Use `restrictedRoles` instead.

`newGroupDelay`
: _int64_
<br/>Time (in seconds) to allow a host to boot and applications to fully start before starting the evaluation of monitor results. Should be a non-negative integer.

`noDataTimeframe`
: _int64_
<br/>The number of minutes before a monitor notifies after data stops reporting. Datadog recommends at least 2x the monitor timeframe for metric alerts or 2 minutes for service checks. If omitted, 2x the evaluation timeframe is used for metric alerts, and 24 hours is used for service checks.

`notificationPresetName`
: _enum_
<br/>Toggles the display of additional content sent in the monitor notification. 
<br/>Allowed enum values: `show_all`, `hide_query`, `hide_handles`, `hide_all`
<br/>Default: `show_all`

`notifyAudit`
: _boolean_
<br/>A Boolean indicating whether tagged users are notified on changes to this monitor.

`notifyBy`
: _[string]_
<br/>A string indicating the granularity a monitor alerts on. Only available for monitors with groupings. For example, if you have a monitor grouped by cluster, namespace, and pod, and you set `notifyBy` to `["cluster"]`, then your monitor only notifies on each new cluster violating the alert conditions. 
<br/>Tags mentioned in `notifyBy` must be a subset of the grouping tags in the query. For example, a query grouped by cluster and namespace cannot notify on region. 
<br/>Setting `notifyBy` to `[*]` configures the monitor to notify as a simple-alert.

`notifyNoData`
: _boolean_
<br/>A Boolean indicating whether this monitor notifies when data stops reporting. 
<br/>Default: `false`.

`onMissingData`
: _enum_
<br/>Controls how groups or monitors are treated if an evaluation does not return any data points. The default option results in different behavior depending on the monitor query type. For monitors using Count queries, an empty monitor evaluation is treated as 0 and is compared to the threshold conditions. For monitors using any query type other than Count, for example Gauge, Measure, or Rate, the monitor shows the last known status. This option is only available for APM Trace Analytics, Audit Trail, CI, Error Tracking, Event, Logs, and RUM monitors. 
<br/>Allowed enum values: `default`, `show_no_data`, `show_and_notify_no_data`, `resolve`

`renotifyInterval`
: _int64_
<br/>The number of minutes after the last notification before a monitor re-notifies on the current status. It only re-notifies if it's not resolved.

`renotifyOccurrences`
: _int64_
<br/>The number of times re-notification messages should be sent on the current status at the provided re-notification interval.

`renotifyStatuses`
: _[string]_
<br/>The types of monitor statuses for which re-notification messages are sent. 
<br/>If `renotifyInterval` is null, defaults to null. 
<br/>If `renotifyInterval` is not null, defaults to `["Alert", "No Data"]`
<br/>Values for monitor status: `Alert`, `No Data`, `Warn`

`requireFullWindow`
: _boolean_
<br/>A Boolean indicating whether this monitor needs a full window of data before it's evaluated. Datadog highly recommends you set this to `false` for sparse metrics, otherwise some evaluations are skipped. 
<br/>Default: `false`.

`schedulingOptions`
: _object_
<br/>Configuration options for scheduling:

  `customSchedule`
  : _object_
  <br/>Configuration options for the custom schedule:

    `recurrence`
    : _[object]_
    <br/>Array of custom schedule recurrences.

      `rrule`
      : _string_
      <br/>The recurrence rule in iCalendar format. For example, `FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1`.

      `start`
      : _string_
      <br/>The start date of the recurrence rule defined in `YYYY-MM-DDThh:mm:ss` format. If omitted, the monitor creation time is used.

      `timezone`
      : _string_
      <br/>The timezone in `tz database` format, in which the recurrence rule is defined. For example, `America/New_York` or `UTC`.

  `evaluationWindow`
  : _object_
  <br/>Configuration options for the evaluation window. If `hour_starts` is set, no other fields may be set. Otherwise, `day_starts` and `month_starts` must be set together.

    `dayStarts`
    : _string_
    <br/>The time of the day at which a one day cumulative evaluation window starts. Must be defined in UTC time in `HH:mm `format.

    `hourStarts`
    : _integer_
    <br/>The minute of the hour at which a one hour cumulative evaluation window starts.

    `monthStarts`
    : _integer_
    <br/>The day of the month at which a one month cumulative evaluation window starts.

`thresholdWindows`
: _object_
<br/>Alerting time window options:

  `recoveryWindow`
  : _string_
  <br/>Describes how long an anomalous metric must be normal before the alert recovers.

  `triggerWindow`
  : _string_
  <br/>Describes how long a metric must be anomalous before an alert triggers.

`thresholds`
: _object_
<br/>List of the different monitor thresholds available:

  `critical`
  : _string_
  <br/>The monitor CRITICAL threshold.

  `criticalRecovery`
  : _string_
  <br/>The monitor CRITICAL recovery threshold.

  `ok`
  : _string_
  <br/>The monitor OK threshold.

  `unknown`
  : _string_
  <br/>The monitor UNKNOWN threshold.

  `warning`
  : _string_
  <br/>The monitor WARNING threshold.

  `warningRecovery`
  : _string_
  <br/>The monitor WARNING recovery threshold.

`timeoutH`
: _int64_
<br/>The number of hours of the monitor not reporting data before it automatically resolves from a triggered state.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /containers/kubernetes/installation?tab=datadogoperator#installation
[4]: /monitors/types/metric/?tab=threshold
[5]: /api/latest/monitors/#create-a-monitor
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-crashloopbackoff.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-deployment-replicas.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-imagepullbackoff.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-nodes-unavailable.yaml
[10]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-pods-failed-state.yaml
[11]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-pods-restarting.yaml
[12]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-statefulset-replicas.yaml
[13]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/audit-alert-monitor-test.yaml
[14]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/event-alert-monitor-test.yaml
[15]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/event-v2-alert-monitor-test.yaml
[16]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/log-alert-monitor-test.yaml
[17]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/process-alert-monitor-test.yaml
[18]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/rum-alert-monitor-test.yaml
[19]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/service-check-monitor-test.yaml
[20]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/slo-alert-monitor-test.yaml
[21]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/trace-analytics-alert-monitor-test.yaml
[22]: /api/latest/roles/#list-roles