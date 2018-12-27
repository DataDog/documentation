---
title: Downtimes
kind: documentation
description: "Schedule downtimes to ensure your Datadog monitors do not alert during specific time periods."
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/manage_monitor"
  tag: "Documentation"
  text: "Manage your monitors"
---

You may occasionally need to shut systems down or take them off-line to perform maintenance or upgrades. Scheduling downtime allows you to do this without triggering monitors.

## What happens to a monitor when it is muted (or has a scheduled downtime)?

You can schedule downtimes and/or mute your Datadog monitors so that they do not alert at specific times when you do not want them to.

Monitors trigger events when they change state between `ALERT`, `WARNING` (if enabled), `RESOLVED`, and `NO DATA` (if enabled). If a monitor has been silenced either by a downtime or muting, then any transition from `RESOLVED` to another state will **neither trigger an event**, nor activate any associated notification channels. 

**Note**: Muting or un-muting a monitor via the UI deletes all scheduled downtimes associated with that monitor.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime on alert" responsive="true" style="width:80%;">}}

If a monitor transitions states during downtime (such as from `OK` to `ALERT`, `WARNING`, or `NO DATA`) and remains in that state once a scheduled downtime expires, it will **NOT** trigger a notification. 
**However it WILL trigger a recovery event once data returns for that scope or the monitor returns to an `OK` state.**

This behavior is designed to prevent spammy `NO DATA` state alerts when using the *Autoresolve* feature. If you would prefer that the monitor trigger a `NO DATA` state event at the time that the silencing expires, [reach out to the Datadog support team][1] to request that this feature is enabled for your account. This will only affect instances when a monitor exits a downtime period in a `NO DATA` state.

## Manage Downtime

Navigate to the [Manage Downtime][2] page by highlighting the *Monitors* tab in the main menu and selecting the *Manage Downtime* link. You may also navigate to the *Manage Downtime* page from other Monitor related pages by clicking the link at the top of the page.

{{< img src="monitors/downtimes/downtime-nav.png" alt="downtime-nav" responsive="true" >}}

The Manage Downtime page displays a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.

{{< img src="monitors/downtimes/downtime-manage.png" alt="downtime-manage" responsive="true" style="width:80%;">}}

## Schedule Downtime

To schedule downtime, click the "Schedule Downtime" button in the upper right.

1. Choose what to silence.
   {{< img src="monitors/downtimes/choose-what-to-silence.png" alt="downtime-silence" responsive="true" style="width:80%;">}}
   **Silencing by monitor name**  
   You must select at least one monitor. If you choose to leave the selection field empty, all monitors are silenced by default. You can also select a scope to constrain your downtime to a specific host, device, or arbitrary tag. Refer to the [scope section][3] of the Graphing Primer using JSON for further information about scope.  
   **Silencing by monitor tags**  
   You can select one or more [monitor tags][4] to schedule downtimes on, but you must select at least one using this method. There is a limit of 32 tags, and each tag can be at most 256 characters long. Only monitors that have **ALL selected tags** are silenced. You can also select scopes for additional constraints.  <br/><br/>
   For either method, if you choose to silence all monitors constrained by a scope, clicking *Preview affected monitors* shows which monitors are affected. Any monitors within your scope that are created or edited after the downtime is scheduled are also silenced. Note that if a multi-alert is included, it is only silenced for groups covered by the scope. For example, if a downtime is scoped for `host:X` and a multi-alert is triggered on both `host:X` and `host:Y`, Datadog will generate a monitor notification for `host:Y`, but not `host:X`.

2. Set a schedule.
  {{< img src="monitors/downtimes/downtime-schedule.png" alt="downtime-schedule" responsive="true" style="width:80%;">}}
  You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a repeating schedule to accommodate regularly scheduled downtimes.

3. Add an optional message to notify your team
  {{< img src="monitors/downtimes/downtime-notify.png" alt="downtime-notify" responsive="true" style="width:80%;">}}
  Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting][5] as well as Datadog's @-notification syntax. The *Notify your team* field allows you to specify team members or send the message to a service [integration][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://app.datadoghq.com/monitors#/downtime
[3]: /graphing/graphing_json/#scope
[4]: /monitors/manage_monitor/#monitor-tags
[5]: http://daringfireball.net/projects/markdown/syntax
[6]: https://app.datadoghq.com/account/settings#integrations
