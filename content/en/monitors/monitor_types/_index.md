---
title: Monitors
kind: documentation
aliases:
    - /monitoring
    - /monitors/faq/can-i-set-up-a-monitor-for-a-metric-that-hasn-t-been-reported-to-datadog-yet/
---

## Create

To [create a monitor][1] in Datadog, hover over **Monitors** in the main menu and click **New Monitor** in the sub-menu. To create a monitor programmatically, see the [Datadog API][2] or [community maintained libraries][3].

Select a monitor type:

* [Host][4] - Check if one or more hosts are reporting to Datadog.
* [Metric][5] - Compare values of a metric with a user-defined threshold.
* [Anomaly][6] - Detect anomalous behavior for a metric based on historical data.
* [Outlier][7] - Alert on members of a group behaving differently than the others.
* [Forecast][8] - Alert when a metric is projected to cross a threshold.
* [Integration][9] - Monitor metric values or health status from a specific integration.
* [Live Process][10] - Check if one or more processes are running on a host.
* [Process Check][11] - Watch the status produced by the `process.up` service check.
* [Network][12] - Check the status of TCP/HTTP endpoints.
* [Custom Check][13] - Monitor the status of arbitrary custom checks.
* [Event][14] - Monitor events gathered by Datadog.
* [Logs][15] - Monitor logs gathered by Datadog.
* [APM][16] - Compare an APM metric to a user-defined threshold.
* [Real User Monitoring][17] - Monitor real user data gathered by Datadog.
* [Watchdog][18] - Get notified when Watchdog detects anomalous behavior.
* [Composite][19] - Alert on an expression combining multiple monitors.

## Import

[Import a monitor][20] to Datadog with JSON using the main navigation: *Monitors --> New Monitor --> Import*.

You can obtain a JSON export of any monitor from the monitor's status page. Click the settings cog (top right) and choose **Export** from the menu.

## Audit

For all monitor types, monitor changes create an event in the [event stream][21]. This event explains the change and displays the user that made the change.

If you made changes to a monitor, you can see examples with the following event search:

```text
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog also provides a notification option for changes to monitors you create. At the bottom of the monitor editor, under **Notify your team**, choose **Notify** in the drop-down next to: *alert recipients when this alert is modified*.

The notify setting sends an email with the monitor audit event to all people who are alerted in the specific monitor. The monitor audit event also appears in the [event stream][20].

[1]: https://app.datadoghq.com/monitors#/create
[2]: /api/v1/monitors/
[3]: /developers/libraries/#managing-monitors
[4]: /monitors/monitor_types/host/
[5]: /monitors/monitor_types/metric/
[6]: /monitors/monitor_types/anomaly/
[7]: /monitors/monitor_types/outlier/
[8]: /monitors/monitor_types/forecasts/
[9]: /monitors/monitor_types/integration/
[10]: /monitors/monitor_types/process/
[11]: /monitors/monitor_types/process_check/
[12]: /monitors/monitor_types/network/
[13]: /monitors/monitor_types/custom_check/
[14]: /monitors/monitor_types/event/
[15]: /monitors/monitor_types/log/
[16]: /monitors/monitor_types/apm/
[17]: /monitors/monitor_types/real_user_monitoring/
[18]: /monitors/monitor_types/watchdog/
[19]: /monitors/monitor_types/composite/
[20]: https://app.datadoghq.com/monitors#create/import
[21]: /events/
