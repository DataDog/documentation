---
title: Downtimes
kind: documentation
description: "Schedule downtimes for your Datadog monitors to prevent alerts during specific time periods"
aliases:
    - /monitors/downtimes/
further_reading:
- link: "/monitors/create/"
  tag: "Documentation"
  text: "Create monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor notifications"
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Manage monitors"
---

Schedule downtimes for system shutdowns, off-line maintenance, or upgrades without triggering your monitors. Downtimes silence all monitors' alerts and notifications, but do not prevent monitor states transitions.

## Schedule

To schedule a [monitor downtime][1] in Datadog use the main navigation: _Monitors –> Manage Downtime_. Then, click the **Schedule Downtime** button in the upper right.

### Choose what to silence

{{< tabs >}}
{{% tab "By Monitor Name" %}}

Search or use the drop-down to choose monitors to silence. If the field is left empty, all monitors are silenced by default. You can also select a scope to constrain your downtime to a specific host, device, or arbitrary tag. Only monitors that have **ALL selected scopes** are silenced.

{{% /tab %}}
{{% tab "By Monitor Tags" %}}

Schedule a downtime based on one or more [monitor tags][1]. You must select at least one tag with a limit of 32 tags. Each tag can be at most 256 characters long. Only monitors that have **ALL selected tags** are silenced. You can also select scopes for additional constraints.

[1]: /monitors/manage_monitor/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

If you choose to silence monitors constrained by scope, click **Preview affected monitors** to see the monitors included. Any monitors created or edited after the downtime is scheduled are automatically included in the downtime if they match the scope.

#### Downtime scope

When constraining a downtime to a simple alert monitor, the `Group scope` field can be ignored since a simple alert monitor aggregates over all reporting sources to send a single alert.

If a multi-alert monitor is included, it is only silenced for groups covered by the scope. For example, if a downtime is scoped for `host:X` and a multi-alert is triggered on both `host:X` and `host:Y`, Datadog generates a monitor notification for `host:Y`, but not `host:X`.

The examples below show how `Group scope` may be applied to multi-alert monitors.

{{< tabs >}}
{{% tab "By Monitor Name" %}}

**Example 1: Mute notification for a specific service**

1. To schedule downtime on only one group (in this case, `service:web-store`), enter that group in the `Group scope` field.
2. **Preview affected monitors** indicates that the monitor chosen is still in scope, so alerts for the group `service:web-store` are muted during the scheduled downtime.

{{< img src="monitors/downtimes/downtime_examplebyname1_downtime.jpg" alt="downtime example"  style="width:80%;">}}

3. Scheduled downtime begins, with only alerts for the group `service:web-store` muted for this monitor.

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.jpg" alt="downtime example"  style="width:80%;">}}

4. To schedule a downtime on more than one group (such as `service:synthesizer` and `service:consul`), you can create an additional downtime per group.

**Example 2: Mute notifications for a specific environment of a monitor grouped by `env` and `service`**

1. To schedule downtime on one of the groups (in this case, `env:dev`), enter that group in the `Group scope` field.
2. **Preview affected monitors** indicates that the monitor chosen is still in scope, so alerts for the group `env:dev` are muted during the scheduled downtime.

{{< img src="monitors/downtimes/downtime_examplebyname2_downtime.jpg" alt="downtime by monitor name with dev environment in scope" style="width:80%;">}}

3. Scheduled downtime begins, and alerts are muted for the group `env:dev` **and** any service related to the `dev` environment.

{{< img src="monitors/downtimes/downtime_examplebyname2_monitor.jpg" alt="group status shows dev environment and related services muted during downtime" style="width:80%;">}}

4. To schedule a downtime on more than one “group by” (e.g. `env:dev` AND `service:web-store`), add the additional scope to the downtime.
{{% /tab %}}
{{% tab "By Monitor Tags" %}}

If a scheduled downtime is based on a common monitor tag and the monitors in scope are multi-alert monitors with one “group by” scope, the `Group scope` field can be used to silence a group that the monitors in scope have in common.

**Example 1: Two multi alert monitors, each with one “group by” scope, have the `downtime:true` monitor tag in common.**

1. *Monitor A* is a multi-alert monitor for hosts reporting a metric averaged across multiple `service` groups.
2. *Monitor B* is a multi-alert monitor for hosts reporting the same metric for `service:web-store`.
3. Downtime is scheduled for any monitor that has the `downtime:true` monitor tag.
4. This downtime is constrained to the group `service:web-store`.
5. Preview affected monitors shows both monitors have the group `service:web-store` in scope.

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.jpg" alt="downtime example"  style="width:80%;">}}

6. *Monitor A* shows downtime has started, but only for the group in scope: `service:web-store`

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.jpg" alt="downtime example"  style="width:80%;">}}

7. *Monitor B* shows downtime has started for `service:web-store`. Because all the monitor’s groups (by `host`) belong to `service:web-store`, the result is that all hosts are muted during downtime for this monitor.

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.jpg" alt="downtime example"  style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### Schedule

{{< tabs >}}
{{% tab "One Time" %}}

Set a one time downtime by entering the start date, time, and time zone. Optionally, set an end date and time.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="downtime on alert"  style="width:80%;">}}

{{% /tab %}}
{{% tab "Recurring" %}}

Recurring downtimes are useful for recurring maintenance windows.

Set a recurring downtime by entering the start date, time, time zone, repeat, and duration. Optionally, specify an end date or number of occurrences.

When a single downtime of a recurring downtime ends, the single downtime is cancelled and a new downtime is created with the same constraints and updated start and end times. **Note**: The original creator is associated to all the newly created downtimes.

{{< img src="monitors/downtimes/downtime_recurring.jpg" alt="downtime on alert"  style="width:80%;">}}

Use RRULEs - or [recurrence rules][1] - to define downtimes schedules. Use the official [RRULE generator][2] as a tool to generate recurring rules.

A common use case is to use RRULES to define downtimes on specific days of the month. For example, on the third Monday of each month:

{{< img src="monitors/downtimes/downtime_rrule.jpg" alt="downtime on alert"  style="width:80%;">}}

**Note**: Attributes specifying the duration in RRULE are not supported (for example, `DTSTART`, `DTEND`, `DURATION`).


[1]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[2]: https://icalendar.org/rrule-tool.html
{{% /tab %}}
{{< /tabs >}}

### Add a message

Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting][2] and Datadog's `@-notification` syntax.

### Notify your team

Notify your team by specifying team members or send the message to a service [integration][3].

## Manage

The Manage Downtime page displays the list of active and scheduled downtimes. Select a downtime to view details, edit, or delete it. Details include its creator, its scope, and a list of the monitors it applies to.
Use the facets panel and the search bar to filter the list on the `Creator`, the `Scope`, `Monitor Tags`, or `Active`, `Automuted`, `Recurring` parameters.

{{< img src="monitors/downtimes/downtime_manage.png" alt="manage downtime page" style="width:100%;">}}

### History

Downtime history is viewable on the [Monitor Status][4] page as overlaid on the group transition history, and the [Event stream][5] by searching for `tags:audit,downtime`, or a specific downtime by ID with `tags:audit,downtime_id:<DOWNTIME_ID>`.

### Muting

Monitors trigger events when they change between possible states: `ALERT`, `WARNING`, `RESOLVED`, and `NO DATA`. When a monitor is muted or has a scheduled downtime, transitions from `RESOLVED` to another state do **not** trigger events or notifications.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime on alert"  style="width:80%;">}}

**Note**: Muting or un-muting a monitor from the monitor status page does not delete scheduled downtimes associated with the monitor. To edit or delete a downtime, use the [Manage Downtimes][1] page or the [API][6].

### Expiration

If a monitor is in an alert-worthy state (`ALERT`, `WARNING`, or `NO DATA`) when a downtime expires, the monitor triggers a new notification. This applies to monitors that change state during downtime (such as from `OK` to `ALERT`, `WARNING`, or `NO DATA`), and to monitors that already have an alert-worthy state when downtime begins.

**Example 1:** If a monitor is in an alert state *before* downtime starts and *continues* for the duration of downtime:
1. During downtime, notifications for this alert are suppressed.
2. The monitor remains in an alert state (because the conditions are still met).
3. The downtime ends.
4. The alert conditions are still met, so a notification is sent.

**Example 2:** If a monitor is in an alert state *before* a downtime commences and recovers *during* that downtime:
1. The state transitions from alert to `OK`.
2. The recovery notification is sent during the downtime, but only for the first recovery during that downtime.

### Monitor report

All alerted states are included on the [weekly monitor report][7] even if the monitor is in a downtime.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/downtime
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /integrations/#cat-notification
[4]: /monitors/monitor_status/
[5]: /events/#event-stream
[6]: /api/v1/downtimes/#cancel-a-downtime
[7]: /account_management/#preferences
