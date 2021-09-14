---
title: Create Monitors
kind: documentation
description: "Create monitors"
aliases:
- /monitors/monitor_types/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor notifications"
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Manage monitors"
---

## Overview

To [create a monitor][1] in Datadog, hover over **Monitors** in the main menu and click [**New Monitor**][2] in the sub-menu. To create a monitor programmatically, see the [Datadog API][3] or [community maintained libraries][4].

## Monitor Types

Select a [monitor type][5] in the list.

{{< img src="/monitors/create/choose_monitor_type.gif" alt="Choose monitor type" style="width:90%;">}}

{{< whatsnext desc="Choose the monitor type depending on what you want to alert on :">}}
{{< nextlink href="/monitors/create/types/host" >}}Host: Check if one or more hosts are reporting to Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/metric" >}}Metric: Compare values of a metric with a user-defined threshold.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/anomaly" >}}Anomaly: Detect anomalous behavior for a metric based on historical data.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/outlier" >}}Outlier: Alert on members of a group behaving differently than the others.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/forecasts" >}}Forecast: Alert when a metric is projected to cross a threshold.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/integration" >}}Integration: Monitor metric values or health status from a specific integration.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process" >}}Live Process: Check if one or more processes are running on a host.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process_check" >}}Process Check: Watch the status produced by the process.up service check.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/network" >}}Network: Check the status of TCP/HTTP endpoints.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/custom_check" >}}Custom Check: Monitor the status of arbitrary custom checks.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/event" >}}Event: Monitor events gathered by Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/log" >}}Logs: Monitor logs gathered by Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/apm" >}}APM: Compare an APM metric to a user-defined threshold.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/real_user_monitoring" >}}Real User Monitoring: Monitor real user data gathered by Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/watchdog" >}}Watchdog: Get notified when Watchdog detects anomalous behavior.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/composite" >}}Composite: Alert on an expression combining multiple monitors.{{< /nextlink >}}
 {{< /whatsnext >}}

### Import a monitor

[Import a monitor][6] to Datadog with JSON using the main navigation: *Monitors --> New Monitor --> Import*.

You can obtain a JSON export of any monitor from the monitor's status page. Click the settings cog (top right) and choose **Export** from the menu.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/create/configuration
[2]: https://app.datadoghq.com/monitors#/create
[3]: /api/v1/monitors/
[4]: /developers/community/libraries/#managing-monitors
[5]: /monitors/create/types
[6]: https://app.datadoghq.com/monitors#create/import
