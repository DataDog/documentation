---
title: Monitor Status
kind: documentation
description: "Get an overview of your monitor status over time"
further_reading:
- link: "/monitors/monitor_types/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime for a monitor"
---

## Overview

After [creating your monitor][1], use the monitor status page to view the status over time.

The page sections are expanded by default. All sections (except the header) can be closed by using the toggle (&or;) icon to the left of each section name.

{{< img src="monitors/monitor_status/monitor_status_page.png" alt="monitor status page"  >}}

## Header

The header contains the monitor's status, time of status, and monitor title. On the right are the **Mute**, **Resolve**, and settings cog buttons.

### Mute

Use the mute button to mute the entire monitor or partially mute it by setting a **Scope**. The available scopes are based on the monitor's group tags. See [Downtimes][2] for details on muting multiple scopes or monitors at the same time.

**Note**: Muting or unmuting a monitor with the UI deletes all scheduled downtimes associated with that monitor.

### Resolve

If your monitor is in an alert state, the **Resolve** button is visible. Use this button to resolve your monitor manually.

The monitor `resolve` function is artificially switching the monitor status to `OK` for its next evaluation. The next monitor evaluation is performed normally on the data the monitor is based on.

If a monitor is alerting because its current data corresponds to the `ALERT` state, `resolve` has the monitor follow the state switch `ALERT -> OK -> ALERT`. Therefore, using `resolve` is not appropriate for acknowledging the alert or telling Datadog to ignore the alert.

Manually resolving a monitor is appropriate for cases where data is reported intermittently. For example, after triggering an alert the monitor doesn't receive further data so it can no longer evaluate alerting conditions and recover to the `OK` state. In that case, the `resolve` function or the `Automatically resolve monitor after X hours` changes the monitor back to an `OK` state.

**Typical use case**: A monitor based on error metrics that are not generated when there are no errors (`aws.elb.httpcode_elb_5xx`, or any DogStatsD counter in your code reporting an error _only when there is an error_).

### Settings

Click the settings cog to display the options available:

| Option | Description                                                                                                                                                                                                    |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Edit   | Edit the current monitor. See details in the [Monitors][1] section.                                                                                                                                            |
| Clone  | Make a copy of the current monitor.                                                                                                                                                                            |
| Export | Export the JSON configuration for the current monitor. This option is also available when [creating your monitor][1]. If you manage monitors programmatically, define a monitor in the UI and export the JSON. |
| Delete | Delete the current monitor. You will be prompted to confirm the deletion.                                                                                                                                      |

## Properties

The properties section is the overview of your monitor's:

| Property     | Description                                                                           |
|--------------|---------------------------------------------------------------------------------------|
| Status       | Alert, Warn, No Data, or OK                                                           |
| Type         | Learn more about [monitor types][1].                                                  |
| ID           | Used for the [monitor API][3].                                                        |
| Date created | The date the monitor was created.                                                     |
| Author       | The person who created the monitor.                                                   |
| Tags         | The tags attached at the monitor level. Edit the tags by clicking on the pencil icon. |
| Query        | Learn more about [querying][4].                                                       |
| Message      | The message specified in the [notification][5] section of the monitor.                |

## Status and history

The status and history section displays the query and state changes of your monitor over time. To filter the information, use the search box, statuses, and time selector above the section.

### Status

The status graph shows your monitor's status over time, broken out by group. **Note**: If you see `None` or `no groups found`, one of the following situations may apply:

* The monitor is newly created and has not evaluated yet.
* The monitor's query was recently changed.
* The monitor's timeframe is too short for a metric that provides data infrequently.
* A host's name previously included in the query has changed. Hostname changes age out of the UI within 2 hours.

### History

The history graph shows the collected data aligned with the status graph.

The evaluation graph represents the exact query behavior within the timeframe bracket on the history graph. It has a fixed, zoomed window that corresponds to your monitor evaluation time steps to ensure the displayed points are aggregated correctly. Slide this bracket over the timeline to view previous monitor evaluation results:

{{< img src="monitors/monitor_status/status_monitor_history.mp4" alt="status monitor history" video="true"  width="80%" >}}

For further investigation into your metrics evolution, use a [dashboard][6] or [notebook][7].

## Events

Events generated from your monitor (alerts, warnings, recoveries, etc.) are shown in this section based on the time selector above the **Status & History** section. The events are also displayed in your [event stream][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/
[2]: /monitors/downtimes/
[3]: /api/v1/monitors/
[4]: /dashboards/querying/
[5]: /monitors/notifications/
[6]: /dashboards/
[7]: /notebooks/
[8]: /events/
