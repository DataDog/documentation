---
title: Create Monitors
kind: documentation
description: "Create monitors"
aliases:
- /monitors/monitor_types/
- /monitors/create/types/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor notifications"
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Manage monitors"
---

## Overview

To create a monitor in Datadog:

1. In the main navigation, select *Monitors --> New Monitor*. 
2. Select a [monitor type](#monitor-types) corresponding to the kind of telemetry you want to alert on.
3. [Configure the monitor][1].

To create a monitor programmatically, see the [Datadog API][2] or [community maintained libraries][3].

## Exporting and importing monitors

You can download a JSON file containing the definition of a monitor from the monitor's status page. Click the settings cog (top right) and choose **Export** from the menu.

[Import a JSON monitor definition][4] into Datadog by selecting *Monitors --> New Monitor --> Import* in the main navigation.

## Monitor types

{{< whatsnext desc="Choose your monitor type:">}}
{{< nextlink href="/monitors/create/types/host" >}}<u>Host</u>: Check if one or more hosts are reporting to Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/metric" >}}<u>Metric</u>: Compare values of a metric with a user-defined threshold.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/anomaly" >}}<u>Anomaly</u>: Detect anomalous behavior for a metric based on historical data.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/apm" >}}<u>APM</u>: Compare an APM metric to a user-defined threshold.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/audit_logs" >}}<u>Audit Logs</u>: Alert when a specified type of audit log exceeds a user-defined threshold over a given period of time.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/ci_pipelines" >}}<u>CI Pipelines</u>: Monitor CI pipelines data gathered by Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/composite" >}}<u>Composite</u>: Alert on an expression combining multiple monitors.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/custom_check" >}}<u>Custom Check</u>: Monitor the status of arbitrary custom checks.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/event" >}}<u>Event</u>: Monitor events gathered by Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/forecasts" >}}<u>Forecast</u>: Alert when a metric is projected to cross a threshold.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/integration" >}}<u>Integration</u>: Monitor metric values or health status from a specific integration.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process" >}}<u>Live Process</u>: Check if one or more processes are running on a host.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/log" >}}<u>Logs</u>: Alert when a specified type of log exceeds a user-defined threshold over a given period of time.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/network" >}}<u>Network</u>: Check the status of TCP/HTTP endpoints.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/outlier" >}}<u>Outlier</u>: Alert on members of a group behaving differently than the others.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process_check" >}}<u>Process Check</u>: Watch the status produced by the process.up service check.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/real_user_monitoring" >}}<u>Real User Monitoring</u>: Monitor real user data gathered by Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/watchdog" >}}<u>Watchdog</u>: Get notified when Watchdog detects anomalous behavior.{{< /nextlink >}}
{{< /whatsnext >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/create/configuration
[2]: /api/v1/monitors/
[3]: /developers/community/libraries/#managing-monitors
[4]: https://app.datadoghq.com/monitors#create/import
