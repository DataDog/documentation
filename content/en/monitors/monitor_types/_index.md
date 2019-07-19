---
title: Monitors
kind: documentation
aliases:
    - /monitoring
---

To [create a monitor][1] in Datadog, hover over **Monitors** in the main menu and click **New Monitor** in the sub-menu. To create a monitor programmatically, see the [Datadog API][2] or [community maintained libraries][3].

{{< whatsnext desc="Select a monitor type:">}}
    {{< nextlink href="/monitors/monitor_types/anomaly" >}}Anomaly{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/apm" >}}APM{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/composite" >}}Composite{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/custom_check" >}}Custom Check{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/event" >}}Event{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/host" >}}Host{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/forecasts" >}}Forecasts{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/integration" >}}Integration{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/log" >}}Log{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/metric" >}}Metric{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/network" >}}Network{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/outlier" >}}Outlier{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/process" >}}Process{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/watchdog" >}}Watchdog{{< /nextlink >}}
{{< /whatsnext >}}

## Auditing Monitors

For all monitor types, monitor changes create an event in the [event stream][4]. This event explains the change and displays the user that made the change.

If you made changes to a monitor, you can see examples with the following event search:
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog also provides the ability to be notified on changes to a monitor you create. At the bottom of the monitor editor, there's an option to **Notify** recipients for all changes to the monitor:

{{< img src="monitors/index/Monitor_Change_notifications.png" alt="Monitor Change Notifications" responsive="true" >}}

Setting the above to **Notify** sends an email with the monitor audit event to all people who are alerted in the specific monitor. The monitor audit event also appears in the [event stream][4].


[1]: https://app.datadoghq.com/monitors#/create
[2]: /api/#monitors
[3]: /developers/libraries/#managing-monitors
[4]: /graphing/event_stream
