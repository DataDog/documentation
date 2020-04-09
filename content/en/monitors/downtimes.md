---
title: Downtimes
kind: documentation
description: "Schedule downtimes for your Datadog monitors to prevent alerts during specific time periods."
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: "Create a monitor"
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure monitor notifications"
- link: "monitors/manage_monitor"
  tag: "Documentation"
  text: "Manage monitors"
---

Schedule downtimes for system shutdowns, off-line maintenance, or upgrades without triggering your monitors.

Navigate to the [Manage Downtime][1] page by hovering over **Monitors** in the main menu, then select **Manage Downtime**.

The Manage Downtime page displays a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.

## Schedule downtime

To schedule downtime, click the **Schedule Downtime** button in the upper right.

### Choose what to silence

{{< tabs >}}
{{% tab "By Monitor Name" %}}

Search or use the drop-down to choose monitors to silence. If the field is left empty, all monitors are silenced by default. You can also select a scope to constrain your downtime to a specific host, device, or arbitrary tag. Refer to the [scope section][1] of the Graphing Primer using JSON for further information about scope.

[1]: /dashboards/graphing_json/#scope
{{% /tab %}}
{{% tab "By Monitor Tags" %}}

You can select one or more [monitor tags][1] to schedule downtimes on, but you must select at least one using this method. There is a limit of 32 tags, and each tag can be at most 256 characters long. Only monitors that have **ALL selected tags** are silenced. You can also select scopes for additional constraints.

For either method, if you choose to silence all monitors constrained by a scope, clicking *Preview affected monitors* shows which monitors are affected. Any monitors within your scope that are created or edited after the downtime is scheduled are also silenced. Note that if a multi-alert is included, it is only silenced for groups covered by the scope. For example, if a downtime is scoped for `host:X` and a multi-alert is triggered on both `host:X` and `host:Y`, Datadog generates a monitor notification for `host:Y`, but not `host:X`.

[1]: /monitors/manage_monitor/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

### Schedule

{{< tabs >}}
{{% tab "One Time" %}}

You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a [repeating schedule to accommodate regularly scheduled downtimes](#recurring-downtimes).

{{% /tab %}}
{{% tab "Recurring" %}}

Recurring downtimes allow you to create a downtime that is started and stopped at a recurring interval or pattern.

One use case for this would be if you have regularly scheduled maintenance windows and want to suppress what might become a noisy monitor due to your changes.

When a recurring downtime ends, the downtime is cancelled and a new downtime with the same constraints (with updated start and end times) is created in a rolling pattern.

**Note**: The original creator is associated to all of these newly created downtimes.

{{% /tab %}}
{{< /tabs >}}

### Add a message

Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting][2] as well as Datadog's @-notification syntax.

### Notify your team

Notify your team by specifying team members or send the message to a service [integration][3].

**Note**: Create the downtime before you create the monitor or before you mute the group.

## Search

Downtime history can be seen both on the Monitor Status Page as overlaid on the group transition history, as well as in the Event Stream by searching for `tags:audit,downtime`, or a specific downtime by ID with `tags:audit,downtime_id:<DOWNTIME_ID>`

## Muting monitors

Monitors trigger events when they change states: `ALERT`, `WARNING`, `RESOLVED`, and `NO DATA`. When a monitor is muted or has a scheduled downtime, transitions from `RESOLVED` to another state does **not** trigger an event or notifications.

**Note**: Muting or un-muting a monitor with the UI does not delete scheduled downtimes associated with that monitor. For that, use the Manage Downtimes feature or the [API][4].

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime on alert"  style="width:80%;">}}

If a monitor transitions states during a downtime (such as from `OK` to `ALERT`, `WARNING`, or `NO DATA`) and remains in that state once a scheduled downtime expires, it does **NOT** trigger a notification. However, it does trigger a recovery event once data returns for that scope or the monitor returns to an `OK` state.

This behavior is designed to prevent spammy `NO DATA` state alerts when using the *Autoresolve* feature. If you would prefer that the monitor trigger a `NO DATA` state event at the time that the silencing expires, [reach out to the Datadog support team][5] to request that this feature is enabled for your account. This only affects instances when a monitor exits a downtime period in a `NO DATA` state.

If a monitor triggers an alert **before** a downtime and recovers **during** that downtime, then a recovery event is sent during the downtime (if this is the first recovery during that downtime).

### Monitor report

All alerted states are included on the [weekly monitor report][6] even if the monitor is in a downtime.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/downtime
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: https://app.datadoghq.com/account/settings#integrations
[4]: /api/?lang=python#cancel-monitor-downtime
[5]: /help
[6]: /account_management/#preferences
