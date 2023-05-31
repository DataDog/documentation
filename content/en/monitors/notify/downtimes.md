---
title: Downtimes
kind: documentation
description: "Schedule downtimes for your Datadog monitors to prevent alerts during specific time periods"
aliases:
    - /monitors/downtimes/
further_reading:
- link: "/monitors/guide/suppress-alert-with-downtimes"
  tag: "Guide"
  text: "Suppress alerts with downtimes"
- link: "/monitors/guide/scoping_downtimes"
  tag: "Guide"
  text: "Scoping downtimes schedules"
- link: "/monitors/"
  tag: "Documentation"
  text: "Create monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor notifications"
---

## Overview 

Schedule downtimes for system shutdowns, off-line maintenance, or upgrades without triggering your monitors. Downtimes silence all monitors' alerts and notifications, but do not prevent monitor states transitions.

## Create a new downtime schedule

To schedule a [monitor downtime][1] in Datadog use the main navigation: _Monitors –> Manage Downtime_. Then, click the **Schedule Downtime** button in the upper right.

To mute an individual monitor, click the **Mute** button at the top of the monitor status page. This creates a downtime schedule for the monitor.

## Choose what to silence

Apply downtime schedules to specific monitors by name or to a broad range of monitors by monitor tags. Apply additional filters through the *Group scope*. Click **Preview affected monitors** to see the monitors included. Any monitors created or edited after the downtime is scheduled are automatically included in the downtime if they match the scope.

### By Monitor Name

Search or use the dropdown menu to choose which monitors to silence. If the field is left empty, all monitors are silenced by default. You can also select a scope to constrain your downtime to a specific host, device, or arbitrary tag. Only monitors that have **ALL selected scopes** are silenced.

### By Monitor Tags

Schedule a downtime based on one or more [monitor tags][2]. The maximum number of tags that can be selected for a single downtime is 32. Each tag can be at most 256 characters long. Only monitors that have **ALL selected tags** are silenced. You can also select scopes for additional constraints.

### Downtime scope

If a downtime is scheduled for a [simple alert monitor][3], the `Group scope` field can be ignored since a simple alert monitor aggregates over all reporting sources to send a single alert.

If a multi alert monitor is included, it is only silenced for groups covered by the scope. For example, if a downtime is scoped for `host:X` and a multi alert is triggered on both `host:X` and `host:Y`, Datadog generates a monitor notification for `host:Y`, but not `host:X`.

To include all groups in the scope of a Downtime that applies to multi alert monitors, select `All` for the `Group scope`.

See the guide on [Scoping downtimes schedules][4] for more example use cases on how group scope is applied to multi alert monitors.

## Set a downtime schedule

### One Time

Set a one time downtime by entering the start date, time, and time zone. Optionally, set an end date and time.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="fields for scheduling one time downtime" style="width:90%;">}}

 ### Recurring

Recurring downtimes are useful for recurring maintenance windows. Set a recurring downtime by entering the start date, time, time zone, repeat, and duration. Optionally, specify an end date or number of occurrences.

When a single downtime of a recurring downtime ends, the single downtime is cancelled and a new downtime is created with the same constraints and updated start and end times. <br>
**Note**: The original creator is associated to all the newly created downtimes.

{{< img src="/monitors/downtimes/downtime_recurring_rrule.png" alt="Fields for scheduling recurring downtime with RRULE" style="width:90%;">}}

Use [recurrence rules][5] (RRULEs) to define downtimes schedules. Use the official [RRULE generator][6] as a tool to generate recurring rules. A common use case is to use RRULES to define downtimes on specific days of the month, for example, on the third Monday of each month.

**Note**: Attributes specifying the duration in RRULE are not supported (for example, `DTSTART`, `DTEND`, `DURATION`).

## Notifications
### Add a message

Enter a message to notify your team about this downtime. The message field allows standard markdown formatting and Datadog's `@-notification` syntax. See the [Notifications page][7] for more information on formatting options.

### Notify your team

Notify your team by specifying team members or send the message to a service [integration][8]. Datadog sends notifications to the specified destinations whenever the downtime is scheduled, started, cancelled, or expired. These audit notifications allows your team to be aware of the Downtimes in your system.

### Disable first recovery notification

By default, Datadog sends a recovery notification for monitors that trigger **before** a downtime and end up recovering **during** a downtime. This is useful when using third party integrations to automatically close opened incidents. Selecting the checkbox mutes these notifications.

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="mute first recovery notification" style="width:80%;">}}

The option to disable the first recovery notification is additive between multiple downtimes. For example, if multiple downtimes overlap and mute the same monitor, the first recovery notification is muted if **at least one** downtime checked the option to disable it.

**Note**: This option mutes the **first** recovery notification. If a monitor proceeds to trigger and recover again during a downtime, then the corresponding notifications are always muted, regardless of this option's settings.

## Manage

The [Manage Downtime page][9] displays the list of active and scheduled downtimes. Select a downtime to view details, edit, or delete it. Details include its creator, its scope, and a list of the monitors it applies to.
Use the facets panel and the search bar to filter the list on the `Creator`, the `Scope`, `Monitor Tags`, or `Active`, `Automuted`, `Recurring` parameters.

{{< img src="monitors/downtimes/downtime_manage.png" alt="manage downtime page" style="width:100%;">}}

### History

Downtime history is viewable on the [Monitor Status][10] page as overlaid on the group transition history, and the [Events explorer][11] by searching for `tags:audit downtime`, or a specific downtime by ID with `tags:audit downtime_id:<DOWNTIME_ID>`.

### Muting

Monitors trigger events when they change between possible states: `ALERT`, `WARNING`, `RESOLVED`, and `NO DATA`. When a monitor is muted or has a scheduled downtime, transitions from `RESOLVED` to another state do **not** trigger events or notifications.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="Monitor status graph showing state transition to alert during downtime, will not create an alert event" style="width:80%;">}}

**Note**: Muting or un-muting a monitor from the monitor status page does not delete scheduled downtimes associated with the monitor. To edit or delete a downtime, use the [Manage Downtimes][1] page or the [API][12].

### Expiration

By default, if a monitor is in an alert-worthy state (`ALERT`, `WARNING`, or `NO DATA`) when a downtime expires, the monitor triggers a new notification. This applies to monitors that change state during downtime (such as from `OK` to `ALERT`, `WARNING`, or `NO DATA`), and to monitors that already have an alert-worthy state when downtime begins. If a downtime is manually canceled, notifications are not sent, even if the monitor has entered an alert-worthy state.

To override the default behavior, specify which notifications should be sent at the end of downtimes with the options in the "Notify Your Team" section.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="Configure Notify your team section of a monitor with specific downtime conditions" style="width:100%;">}}

**Example 1:** If a monitor is in an alert state *before* downtime starts and *continues* for the duration of downtime:
1. During downtime, notifications for this alert are suppressed.
2. The monitor remains in an alert state (because the conditions are still met).
3. The downtime ends.
4. The alert conditions are still met, so a notification is sent.

**Example 2:** If a monitor is in an alert state *before* a downtime commences and recovers *during* that downtime:
1. The state transitions from `ALERT` to `OK`.
2. The recovery notification is sent during the downtime, but only for the first recovery during that downtime.

### Monitor report

All alerted states are included on the [weekly monitor report][13] even if the monitor is in a downtime.

## Auto-muting

Datadog can proactively mute monitors related to the manual shutdown of certain cloud workloads. The following scenarios of auto-muting for shutdown are supported:

- **[AWS EC2 instances][14]** and instance termination by AWS autoscaling based on host statuses from the CloudWatch API.
- **[Google Compute Engine (GCE)][15]** instances and instance termination triggered by GCE autoscaling based on host statuses from the GCE API.
- **[Azure VMs][16]**, whether the shutdown was triggered manually or by Azure autoscaling, based on health statuses available through the Azure Resource Health API.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/downtime
[2]: /monitors/manage/#monitor-tags
[3]: /monitors/configuration/?tab=thresholdalert#alert-grouping
[4]: /monitors/guide/scoping_downtimes
[5]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[6]: https://icalendar.org/rrule-tool.html
[7]: /monitors/notify/#overview
[8]: /integrations/#cat-notification
[9]: https://app.datadoghq.com/monitors/downtimes
[10]: /monitors/manage/status/
[11]: /service_management/events/explorer
[12]: /api/v1/downtimes/#cancel-a-downtime
[13]: /account_management/#preferences
[14]: /integrations/amazon_ec2/#ec2-automuting
[15]: /integrations/google_compute_engine/#gce-automuting
[16]: /integrations/azure_vm/#automuting-monitors
