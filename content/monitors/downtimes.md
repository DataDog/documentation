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

## Manage Downtime

Navigate to the [Manage Downtime][1] page by highlighting the *Monitors* tab in the main menu and selecting the *Manage Downtime* link. You may also navigate to the *Manage Downtime* page from other Monitor related pages by clicking the link at the top of the page.

{{< img src="monitors/downtimes/downtime-nav.png" alt="downtime-nav" responsive="true" >}}

The Manage Downtime page displays a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.

{{< img src="monitors/downtimes/downtime-manage.png" alt="downtime-manage" responsive="true" style="width:80%;">}}

## Schedule Downtime

To schedule downtime, click the "Schedule Downtime" button in the upper right.

1. Choose what to silence.
   {{< img src="monitors/downtimes/choose-what-to-silence.png" alt="downtime-silence" responsive="true" style="width:80%;">}}
   **Silencing by monitor name**  
   You must select at least one monitor. If you choose to leave the selection field empty, all monitors are silenced by default. You can also select a scope to constrain your downtime to a specific host, device, or arbitrary tag. Refer to the [scope section][2] of the Graphing Primer using JSON for further information about scope.  
   **Silencing by monitor tags**  
   You can select one or more [monitor tags][3] to schedule downtimes on, but you must select at least one using this method. There is a limit of 32 tags, and each tag can be at most 256 characters long. Only monitors that have **ALL selected tags** are silenced. You can also select scopes for additional constraints.  <br/><br/>
   For either method, if you choose to silence all monitors constrained by a scope, clicking *Preview affected monitors* shows which monitors are affected. Any monitors within your scope that are created or edited after the downtime is scheduled are also silenced. Note that if a multi-alert is included, it is only silenced for groups covered by the scope. For example, if a downtime is scoped for `host:X` and a multi-alert is triggered on both `host:X` and `host:Y`, Datadog will generate a monitor notification for `host:Y`, but not `host:X`.

2. Set a schedule.
  {{< img src="monitors/downtimes/downtime-schedule.png" alt="downtime-schedule" responsive="true" style="width:80%;">}}
  You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a repeating schedule to accommodate regularly scheduled downtimes.

3. Add an optional message to notify your team
  {{< img src="monitors/downtimes/downtime-notify.png" alt="downtime-notify" responsive="true" style="width:80%;">}}
  Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting][4] as well as Datadog's @-notification syntax. The *Notify your team* field allows you to specify team members or send the message to a service [integration][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/downtime
[2]: /graphing/graphing_json/#scope
[3]: /monitors/manage_monitor/#monitor-tags
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: https://app.datadoghq.com/account/settings#integrations
