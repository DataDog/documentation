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

Monitoring all of your infrastructure in one place wouldn't be complete without the ability to know when critical changes are occurring. Datadog gives you the ability to create monitors that actively check metrics, integration availability, network endpoints, and more.

## Overview

{{< whatsnext desc="This section includes the following topics:">}}
    {{< nextlink href="/monitors/monitor_types" >}}<u>Monitor Types</u>: Learn how to create monitors for metrics, integrations, tracing, logs, and more.{{< /nextlink >}}
    {{< nextlink href="/monitors/manage_monitor" >}}<u>Manage Monitor</u>: See all your monitors in one place. Search, delete, mute, resolve, or edit service tags for selected monitors in bulk.{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_status" >}}<u>Monitor Status</u>: See the status of a specific monitor status over time.{{< /nextlink >}}
    {{< nextlink href="/monitors/check_summary" >}}<u>Check Summary</u>: See the status of all your integration checks in one place.{{< /nextlink >}}
    {{< nextlink href="/monitors/notifications" >}}<u>Notifications</u>: Once a monitor is created, you are notified when its conditions are met. You can also notify team members by email, 3rd party services (e.g. Pagerduty), or other custom endpoints with Webhooks.{{< /nextlink >}}
    {{< nextlink href="/monitors/downtimes" >}}<u>Downtimes</u>: Scheduling downtime allows you to shut systems down or take them off-line to perform maintenance or upgrades without triggering monitors.{{< /nextlink >}}
    {{< nextlink href="/monitors/slo_widget" >}}<u>SLO Widget</u>: Track service level objectives (SLOs) with the SLO and uptime widget on dashboards.{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>Guides</u>: Additional helpful articles about monitors and alerting.{{< /nextlink >}}
{{< /whatsnext >}}

## Export your monitor

Export the JSON configuration for a monitor right from the create screen, or on your [monitor status page][1] in the upper right corner.
If you manage and deploy monitors programmatically, it's easier to define the monitor in the UI and export the JSON right away:

{{< img src="monitors/index/export_monitor_json.jpg" alt="export monitor" responsive="true" >}}

## Auditing Monitors

Any changes to monitors creates an event in the [event stream][2] that explains the change and shows the user that made the actual change.

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

[1]: /monitors/monitor_status
[2]: /graphing/event_stream
