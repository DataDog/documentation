---
title: Downtimes
kind: documentation
description: "Schedule downtimes for your Datadog monitors to prevent alerts during specific time periods."
further_reading:
- link: "/monitors/monitor_types/"
  tag: "Documentation"
  text: "Create a monitor"
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure monitor notifications"
- link: "/monitors/manage_monitor/"
  tag: "Documentation"
  text: "Manage monitors"
---

Schedule downtimes for system shutdowns, off-line maintenance, or upgrades without triggering your monitors.

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

**Note**: If a multi-alert monitor is included, it is only silenced for groups covered by the scope. For example, if a downtime is scoped for `host:X` and a multi-alert is triggered on both `host:X` and `host:Y`, Datadog generates a monitor notification for `host:Y`, but not `host:X`.

### Schedule

{{< tabs >}}
{{% tab "One Time" %}}

Set a one time downtime by entering the start date, time, and time zone. Optionally, set an end date and time.

{{% /tab %}}
{{% tab "Recurring" %}}

Recurring downtimes are useful for recurring maintenance windows.

Set a recurring downtime by entering the start date, time, time zone, repeat, and duration. Optionally, specify an end date or number of occurrences.

When a single downtime of a recurring downtime ends, the single downtime is cancelled and a new downtime is created with the same constraints and updated start and end times. **Note**: The original creator is associated to all the newly created downtimes.

{{% /tab %}}
{{< /tabs >}}

### Add a message

Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting][2] and Datadog's `@-notification` syntax.

### Notify your team

Notify your team by specifying team members or send the message to a service [integration][3].

## Manage

The Manage Downtime page displays the list of active and scheduled downtimes. Select a downtime to view details, edit, or delete it. Use the _Filter downtimes_ text box to search your downtimes.
By default this text box searches on the `monitor_name`, `scopes`, `monitor_tags`, `message`, and `status` parameter of the downtines.

### History

Downtime history is viewable on the [Monitor Status][4] page as overlaid on the group transition history, and the [Event stream][5] by searching for `tags:audit,downtime`, or a specific downtime by ID with `tags:audit,downtime_id:<DOWNTIME_ID>`.

### Muting

Monitors trigger events when they change between possible states: `ALERT`, `WARNING`, `RESOLVED`, and `NO DATA`. When a monitor is muted or has a scheduled downtime, transitions from `RESOLVED` to another state do **not** trigger events or notifications.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime on alert"  style="width:80%;">}}

**Note**: Muting or un-muting a monitor with the UI does not delete scheduled downtimes associated with the monitor. To edit or delete a downtime, use the [Manage Downtimes][1] page or the [API][6].

If a monitor is in an alert-worthy state (`ALERT`, `WARNING`, or `NO DATA`) when downtime expires, the monitor is forced to recover and quickly triggers again if alert conditions are met. This applies to monitors that change state during downtime (such as from `OK` to `ALERT`, `WARNING`, or `NO DATA`), and also to monitors that already have an alert-worthy state when downtime begins. 

**Example 1:** If a monitor is in an alert state *before* downtime starts and *continues* for the duration of downtime:
1. During downtime, notifications for this alert are suppressed.
2. The monitor remains in an alert state (because the conditions are still met).
3. The downtime ends.
4. The monitor is forced to recover.
5. The alert conditions are met, so a notification is sent.
 
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
