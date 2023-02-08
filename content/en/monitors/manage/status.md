---
title: Monitor Status
kind: documentation
description: "Get an overview of your monitor status over time"
aliases:
- /monitors/monitor_status/
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Create monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor Notifications"
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Manage monitors"
---

## Overview

After [creating your monitor][1], use the monitor status page to view the status over time.

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

### Create an incident
Create an incident from a monitor by selecting **Declare incident**. Configure the *Declare Incident* popup modal with the severity level, notifications, and additional notes. For more information, see the [Incident Management][3] documentation.

### Settings

Click the settings cog to display the options available:

| Option | Description                                                                                                                                                                                                    |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Edit   | Edit the current monitor. See details in the [Configure Monitors][1] section.                                                                                                                                            |
| Clone  | Make a copy of the current monitor.                                                                                                                                                                            |
| Export | Export the JSON configuration for the current monitor. This option is also available when [creating your monitor][1]. If you manage monitors programmatically, define a monitor in the UI and export the JSON. |
| Delete | Delete the current monitor. You will be prompted to confirm the deletion.                                                                                                                                      |

## Properties

The properties section is the overview of your monitor's:

| Property     | Description                                                                           |
|--------------|---------------------------------------------------------------------------------------|
| Status       | Alert, Warn, No Data, or OK                                                           |
| Type         | Learn more about [monitor types][4].                                                  |
| ID           | Used for the [monitor API][5].                                                        |
| Date created | The date the monitor was created.                                                     |
| Author       | The person who created the monitor.                                                   |
| Tags         | The tags attached at the monitor level. Edit the tags by clicking on the pencil icon. |
| Query        | Learn more about [querying][6].                                                       |
| Message      | The message specified in the [notification][7] section of the monitor.                |

## Status and history

The status and history section displays the query and state changes of your monitor over time. To filter the information, use the search box, statuses, and time selector above the section.

### Status

The status graph shows your monitor's status over time, broken out by group. **Note**: If you see `None` or `no groups found`, one of the following situations may apply:

* The monitor is newly created and has not evaluated yet.
* The monitor's query was recently changed.
* The monitor's timeframe is too short for a metric that provides data infrequently.
* A host's name previously included in the query has changed. Hostname changes age out of the UI within 2 hours.

#### Investigate a Monitor in a Notebook

For further investigation into your metrics evolution, click **Open in a notebook** by the status graph. This generates an investigation [notebook][8] with a formatted graph of the monitor query.

{{< img src="monitors/monitor_status/notebook-button.png" alt="Open in notebook button" style="width:90%;">}}

The notebook matches the monitor evaluation period time range and includes related logs where relevant.

### History

The history graph shows the collected data aligned with the status graph. It shows the raw data points being submitted for the metric query in the monitor. The monitor status page uses the same timeseries graph widget that is used in Notebooks and Dashboards.

### Evaluation graph

The evaluation graph is specific to the monitor. It uses the same query logic as the history graph, however it is scoped to the timeframe bracket on the history graph. It has a fixed, zoomed window that corresponds to your monitor [evaluation window][9] to ensure the displayed points are aggregated correctly. For example, if the monitor is configured to evaluate the average of the query over the last 15 minutes, each datapoint in the evaluation graph shows the aggregate value of the metric for the previous 15 minute evaluation window.

This graph shows the results from the raw data points of a metric applied against the evaluation conditions you configure in the monitor. This visualization is different from the History graph because it's showing the value of the data after it has gone through the monitor query. 

{{< img src="monitors/monitor_status/status_monitor_history.mp4" alt="status monitor history" video="true" width="100%" >}}

## Events

Events generated from your monitor (alerts, warnings, recoveries, etc.) are shown in this section based on the time selector above the **Status & History** section. The events are also displayed in your [Events Explorer][10].

### Audit events

For all monitor types, monitor changes (monitor edits for instance) create an event in the Events Explorer. This event explains the change and displays the user that made the change. For more information, see the [Events][11] documentation.

If you made changes to a monitor, you can see examples with the following event search:

```text
https://app.datadoghq.com/event/stream?per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20monitor%20modified
```

Datadog also provides a notification option for changes to monitors you create. At the bottom of the monitor editor, under **Define permissions and audit notifications**, select **Notify** in the drop-down next to: *If this monitor is modified, notify monitor creator and alert recipients.*.

The notify setting sends an email with the monitor audit event to all people who are alerted in the specific monitor as well as to the monitor creator. The monitor audit event also appears in the [Events Explorer][10].

## Export and import

You can obtain a JSON export of any monitor from the monitor's status page. Click the settings cog (top right) and choose **Export** from the menu.

[Import a monitor][12] to Datadog with JSON using the main navigation: *Monitors --> New Monitor --> Import*.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /monitors/configuration/
[2]: /monitors/notify/downtimes/
[3]: /monitors/incident_management/#from-a-monitor
[4]: /monitors/types/
[5]: /api/v1/monitors/
[6]: /dashboards/querying/
[7]: /monitors/notify/
[8]: /notebooks
[9]: /monitors/configuration/?tab=thresholdalert#evaluation-window
[10]: https://app.datadoghq.com/event/explorer
[11]: /events/
[12]: https://app.datadoghq.com/monitors#create/import
