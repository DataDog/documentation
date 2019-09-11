---
title: Monitors
kind: documentation
aliases:
    - /monitoring
---

To [create a monitor][1] in Datadog, hover over **Monitors** in the main menu and click **New Monitor** in the sub-menu. To create a monitor programmatically, see the [Datadog API][2] or [community maintained libraries][3].

{{< whatsnext desc="Select a monitor type:">}}
    {{< nextlink href="/monitors/monitor_types/host" >}}Host{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/metric" >}}Metric{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/anomaly" >}}Anomaly{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/outlier" >}}Outlier{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/forecasts" >}}Forecast{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/integration" >}}Integration{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/process" >}}Live Process{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/network" >}}Network{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/custom_check" >}}Custom Check{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/event" >}}Event{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/log" >}}Logs{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/apm" >}}APM Metrics{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/trace_analytics" >}}APM Trace Analytics{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/watchdog" >}}Watchdog{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/composite" >}}Composite{{< /nextlink >}}
{{< /whatsnext >}}

## Auditing monitors

For all monitor types, monitor changes create an event in the [event stream][4]. This event explains the change and displays the user that made the change.

If you made changes to a monitor, you can see examples with the following event search:
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog also provides a notification option for changes to monitors you create. At the bottom of the monitor editor, under **Notify your team**, choose **Notify** in the drop-down next to: *alert recipients when this alert is modified*.

The notify setting sends an email with the monitor audit event to all people who are alerted in the specific monitor. The monitor audit event also appears in the [event stream][4].


[1]: https://app.datadoghq.com/monitors#/create
[2]: /api/#monitors
[3]: /developers/libraries/#managing-monitors
[4]: /graphing/event_stream
