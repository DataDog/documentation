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

## Overview

Monitoring all of your infrastructure in one place wouldn't be complete without the ability to know when critical changes are occurring. Datadog gives you the ability to create monitors that actively check metrics, integration availability, network endpoints, and more.

Once a monitor is created, you are notified when its conditions are met. You can also notify team members via email, 3rd party services (e.g. Pagerduty or Stride), or other custom endpoints via Webhooks.

Triggered monitors appear in the [event stream][1], allowing collaboration around active issues in your applications or infrastructure. Datadog provides a high-level view of open issues on the [Triggered Monitors][2] page as well as general monitor management on the [Manage Monitors][3] page.

Monitors can be managed programmatically, refer to the [Datadog API docs][4] for detailed information on managing monitors through the API using the available [libraries][5] or cURL.

In this section you can:

* [Learn how to create a monitor][6]
* [Configure your monitor notifications][7]
* [Manage your monitors][8]
* [Schedule a downtime to mute a monitor][9]
* [See all your checks into one place][10]

### Glossary

Here is a quick overview of the different terms used:

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one or more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: [Log][11], [Forecasts][12] [host][13], [metric][14], [integration][15], [process][16], [outlier][17], [anomaly][18], [apm][19], [composite][20], [network][21], [event][22] based, and [custom][23]. See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging][24] page for more details.

## Creating a Monitor

Navigate to the [Create Monitors][25] page by hovering over **Monitors** in the main menu and clicking **New Monitor** in the sub-menu (depending on your chosen theme and screen resolution, the main menu may be at the top or on the left). You are presented with a list of monitor types on the left. See the [Monitoring Reference][6] to learn more about all monitor types.

{{< img src="monitors/index/nav.png" alt="navigation" responsive="true" >}}

## Export your monitor

Export the JSON configuration for a monitor right from the create screen, or on your [monitor status page][26] in the upper right corner.
If you manage and deploy monitors programmatically, it's easier to define the monitor in the UI and export the JSON right away:

{{< img src="monitors/index/export_monitor_json.jpg" alt="export monitor" responsive="true" >}}

## Auditing Monitors

Any changes to monitors creates an event in the [event stream][27] that explains the change and shows the user that made the actual change.

Assuming you've made changes to your Monitors, you can see examples with the following event search:
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

We also provide you with the ability to be notified on changes to a monitor you create. At the bottom of the Monitor Editor there's an option to notify alert recipients for all changes to the monitor:

{{< img src="monitors/index/Monitor_Change_notifications.png" alt="Monitor_Change_notifications" responsive="true" >}}

Setting the above to **Notify** send an email for the monitor audit events to all people who are alerted in a specific monitor.

## Manually resolve your monitor

The monitor *Resolve* function is artificially switching the monitor status to `OK` for its next evaluation. The following monitor evaluation will be performed normally on the data the monitor is based on.

If a monitor is alerting because its current data corresponds to its `ALERT` state, *Resolve* will have the monitor follow the state switch `ALERT -> OK -> ALERT`. Thus, it's not appropriate for acknowledging that you have seen the alert or telling Datadog to ignore the alert.

Manually *Resolve*-ing a monitor is appropriate for cases where data is reported intermittently: after triggering an alert, the monitor doesn't receive further data so it can no longer evaluate alerting conditions and recover to the `OK` state. In that case the *Resolve* function or the *Automatically resolve monitor after X hours* switches the monitor back to `OK` state.

Typical use case: monitor based on error metrics that are not generated when there are no errors (e.g. `aws.elb.httpcode_elb_5xx`, or any DogStatsD counter in your code reporting an error _only when there is an error_)

## Managing Monitors

There are multiple community projects for maintaining or managing Monitors along with some other Datadog components via the API's:

* https://github.com/trueaccord/DogPush
* https://github.com/winebarrel/barkdog
* https://github.com/airbnb/interferon
* https://github.com/rapid7/dogwatch
* https://www.terraform.io/docs/providers/datadog/r/monitor.html

[1]: /graphing/event_stream
[2]: https://app.datadoghq.com/monitors/triggered
[3]: https://app.datadoghq.com/monitors
[4]: /api/#monitors
[5]: /developers/libraries
[6]: /monitors/monitor_types
[7]: /monitors/notifications
[8]: /monitors/manage_monitor
[9]: /monitors/downtimes
[10]: /monitors/check_summary
[11]: /monitors/monitor_types/log
[12]: /monitors/monitor_types/forecasts
[13]: /monitors/monitor_types/host
[14]: /monitors/monitor_types/metric
[15]: /monitors/monitor_types/integration
[16]: /monitors/monitor_types/process
[17]: /monitors/monitor_types/outlier
[18]: /monitors/monitor_types/anomaly
[19]: /monitors/monitor_types/apm
[20]: /monitors/monitor_types/composite
[21]: /monitors/monitor_types/network
[22]: /monitors/monitor_types/event
[23]: /monitors/monitor_types/custom_check
[24]: /tagging
[25]: https://app.datadoghq.com/monitors#/create
[26]: /monitors/monitor_status
[27]: /graphing/event_stream
