---
title: Monitors
kind: documentation
aliases:
    - /monitoring
---

## Create

To [create a monitor][1] in Datadog, hover over **Monitors** in the main menu and click **New Monitor** in the sub-menu. To create a monitor programmatically, see the [Datadog API][2] or [community maintained libraries][3].

Select a monitor type:

* [Host][4]
* [Metric][5]
* [Anomaly][6]
* [Outlier][7]
* [Forecast][8]
* [Integration][9]
* [Live Process][10]
* [Network][11]
* [Custom Check][12]
* [Event][13]
* [Logs][14]
* [APM Metrics][15]
* [APM Trace Analytics][16]
* [Watchdog][17]
* [Composite][18]

## Import

[Import a monitor][19] to Datadog with JSON using the main navigation: *Monitors --> New Monitor --> Import*.

You can obtain a JSON export of any monitor from the monitor's status page. Click the settings cog (top right) and choose **Export** from the menu.

## Audit

For all monitor types, monitor changes create an event in the [event stream][20]. This event explains the change and displays the user that made the change.

If you made changes to a monitor, you can see examples with the following event search:
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog also provides a notification option for changes to monitors you create. At the bottom of the monitor editor, under **Notify your team**, choose **Notify** in the drop-down next to: *alert recipients when this alert is modified*.

The notify setting sends an email with the monitor audit event to all people who are alerted in the specific monitor. The monitor audit event also appears in the [event stream][20].


[1]: https://app.datadoghq.com/monitors#/create
[2]: /api/#monitors
[3]: /developers/libraries/#managing-monitors
[4]: /monitors/monitor_types/host
[5]: /monitors/monitor_types/metric
[6]: /monitors/monitor_types/anomaly
[7]: /monitors/monitor_types/outlier
[8]: /monitors/monitor_types/forecasts
[9]: /monitors/monitor_types/integration
[10]: /monitors/monitor_types/process
[11]: /monitors/monitor_types/network
[12]: /monitors/monitor_types/custom_check
[13]: /monitors/monitor_types/event
[14]: /monitors/monitor_types/log
[15]: /monitors/monitor_types/apm
[16]: /monitors/monitor_types/trace_analytics
[17]: /monitors/monitor_types/watchdog
[18]: /monitors/monitor_types/composite
[19]: https://app.datadoghq.com/monitors#create/import
[20]: /graphing/event_stream
