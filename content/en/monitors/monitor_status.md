---
title: Monitor Status
kind: documentation
description: "Get an overview of your monitor status over time"
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
---

{{< img src="monitors/monitor_status/monitor_status_page.png" alt="monitor status page" responsive="true" >}}

## Overview
After [creating your monitor][1], use the monitor status page to view the status over time. This page contains the following sections:

* [Header](#header)
* [Properties](#properties)
* [Status and History](#status-and-history)
* [Events](#events)

These sections are open by default. The last three sections can be closed by using the toggle (&or;) icon to the left of the section name.

## Header
On the left, the header contains the monitor's status, time of status, and monitor title.

On the right, the header contains **Mute**, **Resolve**, and the **Settings** cog.

### Mute
Choose to mute a monitor directly on its status page. Use the **Scope** field to narrow your downtime. Refer to [Downtimes][2] to learn how to mute multiple scopes or multiple monitors at the same time.

**Note**: Muting or unmuting a monitor with the UI deletes all scheduled downtimes associated with that monitor.

### Resolve
If your monitor is in an alert state, the **Resolve** button is visible. Use this button to resolve your monitor manually.

The monitor `resolve` function is artificially switching the monitor status to `OK` for its next evaluation. The next monitor evaluation is performed normally on the data the monitor is based on.

If a monitor is alerting because its current data corresponds to its `ALERT` state, `resolve` has the monitor follow the state switch `ALERT -> OK -> ALERT`. Thus, it's not appropriate for acknowledging that you have seen the alert or telling Datadog to ignore the alert.

Manually `resolve`-ing a monitor is appropriate for cases where data is reported intermittently: after triggering an alert, the monitor doesn't receive further data so it can no longer evaluate alerting conditions and recover to the `OK` state. In that case, the `resolve` function or the `Automatically resolve monitor after X hours` switches the monitor back to `OK` state.

**Typical use case**: A monitor based on error metrics that are not generated when there are no errors (`aws.elb.httpcode_elb_5xx`, or any DogStatsD counter in your code reporting an error _only when there is an error_).

### Settings
Click the settings cog to display the options available:

| Option | Description                                                                                                                                                                                                                                |
|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Edit   | Edit the current monitor. More information is available in [Monitor Types][1].                                                                                                                                                             |
| Clone  | Make a copy of the current monitor.                                                                                                                                                                                                        |
| Export | Export the JSON configuration for the current monitor. This option is also available when [creating your monitor][1]. If you manage and deploy monitors programmatically, it's easier to define the monitor in the UI and export the JSON. |
| Delete | Delete the current monitor. You will be prompted to confirm the deletion.                                                                                                                                                                  |

## Properties

{{< img src="monitors/monitor_status/status_monitor_properties.png" alt="status monitor properties" responsive="true" style="width:80%;" >}}

The *Properties* section is the overview of your monitor:

* The status of your monitor
* The monitor creator
* The monitor ID ([for the monitor API][3])
* Tags attached to your monitor. *Edit the tag list by clicking on the pencil icon*.
* The monitor [query][4]
* The monitor message

Use the *cog* icon in the upper right corner of the page to [edit][1] your monitor properties.

## Status and History

The *Status and History* section reflect the query and state changes over time, while the **Evaluation Graph** represents the exact query behavior within the timeframe bracket *on the history graph*. The Evaluation Graph has a fixed zoomed window that corresponds to your monitor evaluation timesteps, to ensure the displayed points are [aggregated correctly][5]. Slide this bracket over the timeline to view previous monitor evaluation results:

{{< img src="monitors/monitor_status/status_monitor_history.mp4" alt="status monitor history" video="true" responsive="true" width="80%" >}}

For further investigation into your metrics evolution, use the [Metric Explorer][6] or a dedicated [Notebook][7].

**Note**: For the *Status* graph, if you see `None` or `no groups found` as group names, this is usually because:

* The monitor is newly created and has not evaluated yet.
* The monitor's query was recently changed.
* A host's name previously included in the query has changed. Hostname changes age out of the UI within 24 hours.

## Events

All events generated from your monitor are aggregated in this section. Those events are also displayed in your [event stream][8].

{{< img src="monitors/monitor_status/status_monitor_event.png" alt="status monitor event" responsive="true" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types
[2]: /monitors/downtimes
[3]: /api/?lang=python#monitors
[4]: /graphing/functions
[5]: /videos/datadog101-5-aggregation/?wtime=49s
[6]: https://app.datadoghq.com/metric/explorer
[7]: /graphing/notebooks
[8]: /graphing/event_stream
