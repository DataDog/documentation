---
title: Alerting
kind: documentation
aliases:
    - /guides/monitors/
    - /guides/monitoring/
    - /guides/alerting/
    - /guides/monitors/the-conditions
description: Create & manage your notifications
---

Intro sentence

## Overview

* [Monitor Types][1] - Learn how to create a monitor. The different monitor types available are [anomaly][2], [APM][3], [composite][4], [custom check][5], [event][6], [forecast][7] [host][8], [integration][9], [log][10], [metric][11], [network][12], [outlier][13], [process][14], and [Watchdog][15].

* [Manage Monitor][16] - See all your monitors in one place. Search, delete, mute, resolve, or edit service tags for selected monitors in bulk.

* [Monitor Status][17] -

* [Check Summary][18] -

* [Notifications][19] -

* [Downtimes][20] -

* [SLO Widget][21] -

* [Guides][22] -


Monitoring all of your infrastructure in one place wouldn't be complete without the ability to know when critical changes are occurring. Datadog gives you the ability to create monitors that actively check metrics, integration availability, network endpoints, and more.

Once a monitor is created, you are notified when its conditions are met. You can also notify team members via email, 3rd party services (e.g. Pagerduty), or other custom endpoints via Webhooks.

Triggered monitors appear in the [event stream][23], allowing collaboration around active issues in your applications or infrastructure. Datadog provides a high-level view of open issues on the [Triggered Monitors][24] page as well as general monitor management on the [Manage Monitors][25] page.

Monitors can be managed programmatically, refer to the [Datadog API docs][26] for detailed information on managing monitors through the API using the available [libraries][27] or cURL.

In this section you can:

* [Learn how to create a monitor][1]
* [Configure your monitor notifications][19]
* [Manage your monitors][16]
* [Schedule a downtime to mute a monitor][20]
* [See all your checks into one place][18]

### Glossary

Here is a quick overview of the different terms used:

| Term             | Description                                                                                                                                                                                                                          |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Status**       | Each check run submits a status of OK, WARNING or CRITICAL.                                                                                                                                                                          |
| **Check**        | Emits one or more statuses.                                                                                                                                                                                                          |
| **Monitor**      | Sends notifications based on a sequence of check statuses, metric threshold or other alerting conditions.                                                                                                                            |
| **Tags**         | Configurable labels that can be applied to each metric and host. See the [Tagging][28] page for more details.                                                                                                                        |

## Creating a Monitor

Navigate to the [Create Monitors][29] page by hovering over **Monitors** in the main menu and clicking **New Monitor** in the sub-menu (depending on your chosen theme and screen resolution, the main menu may be at the top or on the left). You are presented with a list of monitor types on the left. See the [Monitoring Reference][1] to learn more about all monitor types.

{{< img src="monitors/index/nav.png" alt="navigation" responsive="true" >}}

## Export your monitor

Export the JSON configuration for a monitor right from the create screen, or on your [monitor status page][17] in the upper right corner.
If you manage and deploy monitors programmatically, it's easier to define the monitor in the UI and export the JSON right away:

{{< img src="monitors/index/export_monitor_json.jpg" alt="export monitor" responsive="true" >}}

## Auditing Monitors

Any changes to monitors creates an event in the [event stream][30] that explains the change and shows the user that made the actual change.

Assuming you've made changes to your monitors, you can see examples with the following event search:
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog also provides the ability to be notified on changes to a monitor you create. At the bottom of the monitor editor, there's an option to notify alert recipients for all changes to the monitor:

{{< img src="monitors/index/Monitor_Change_notifications.png" alt="Monitor Change Notifications" responsive="true" >}}

Setting the above to **Notify** sends an email for the monitor audit events to all people who are alerted in a specific monitor.

## Manually resolve your monitor

The monitor *Resolve* function is artificially switching the monitor status to `OK` for its next evaluation. The following monitor evaluation is performed normally on the data the monitor is based on.

If a monitor is alerting because its current data corresponds to its `ALERT` state, *Resolve* has the monitor follow the state switch `ALERT -> OK -> ALERT`. Thus, it's not appropriate for acknowledging that you have seen the alert or telling Datadog to ignore the alert.

Manually *Resolve*-ing a monitor is appropriate for cases where data is reported intermittently: after triggering an alert, the monitor doesn't receive further data so it can no longer evaluate alerting conditions and recover to the `OK` state. In that case the *Resolve* function or the *Automatically resolve monitor after X hours* switches the monitor back to `OK` state.

Typical use case: monitor based on error metrics that are not generated when there are no errors (e.g. `aws.elb.httpcode_elb_5xx`, or any DogStatsD counter in your code reporting an error _only when there is an error_)

[1]: /monitors/monitor_types
[2]: /monitors/monitor_types/anomaly
[3]: /monitors/monitor_types/apm
[4]: /monitors/monitor_types/composite
[5]: /monitors/monitor_types/custom_check
[6]: /monitors/monitor_types/event
[7]: /monitors/monitor_types/forecasts
[8]: /monitors/monitor_types/host
[9]: /monitors/monitor_types/integration
[10]: /monitors/monitor_types/log
[11]: /monitors/monitor_types/metric
[12]: /monitors/monitor_types/network
[13]: /monitors/monitor_types/outlier
[14]: /monitors/monitor_types/process
[15]: /monitors/monitor_types/watchdog
[16]: /monitors/manage_monitor
[17]: /monitors/monitor_status
[18]: /monitors/check_summary
[19]: /monitors/notifications
[20]: /monitors/downtimes
[21]: /monitors/slo_widget
[22]: /monitors/guide
[23]: /graphing/event_stream
[24]: https://app.datadoghq.com/monitors/triggered
[25]: https://app.datadoghq.com/monitors
[26]: /api/#monitors
[27]: /developers/libraries
[28]: /tagging
[29]: https://app.datadoghq.com/monitors#/create
[30]: /graphing/event_stream
