---
title: Downtimes
kind: documentation
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: Learn how to create a monitor
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configure your monitor notifications
- link: "monitors/manage_monitor"
  tag: "Documentation"
  text: Manage your monitors
- link: "monitors/faq"
  tag: "FAQ"
  text: Monitors FAQ
---

You may occasionally need to shut systems down or take them off-line to perform maintenance or upgrades. Scheduling downtime allows you to do this without triggering monitors.

## What happens to a monitor when it is muted (or has a downtime)?

You can schedule downtimes and/or mute your Datadog monitors so that they do not alert at specific times when you do not want them to.

Monitors trigger events when they change state between ALERT, WARNING (if enabled), RESOLVED, and NO DATA (if enabled). But if a monitor has been silenced either by a downtime or muting, then any transition from RESOLVED to another state won't trigger an event (nor the notification channels that the event would have set off).

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime on alert" responsive="true" popup="true" style="width:80%;">}}

By default, this is not true of NO DATA alerts: if a monitor has transitioned from the RESOLVED state to NO DATA while it has been silenced, and if it remains in a NO DATA state once the silence-time expires, then there is no NO DATA alert. But once data returns for that monitor scope, the monitor triggers a recovery event.

This may seem unintuitive, but it is the expected behavior today, and it has been made this way to protect from potentially spammy no-data alerts when using the "Autoresolve" feature. If in these circumstances you would prefer that the monitor triggers a NO DATA event at the time that the silencing expires, there is a feature you can have enabled for your account to enable that behavior. To have that enabled, you can reach out to the support team (add email link) to request it.

## Manage Downtime

Navigate to the [Manage Downtime][1] page by highlighting the "Monitors" tab in the main menu and selecting the "Manage Downtime" link. You may also navigate to the "Manage Downtime" page from other Monitor related pages by clicking the link at the top of the page.

{{< img src="monitors/downtimes/downtime-nav.png" alt="downtime-nav" responsive="true" popup="true" >}}

The Manage Downtime page displays a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.

{{< img src="monitors/downtimes/downtime-manage.png" alt="downtime-manage" responsive="true" popup="true" style="width:80%;">}}

## Schedule Downtime

To schedule downtime, click the "Schedule Downtime" button in the upper right.

1. Choose what to silence.
  {{< img src="monitors/downtimes/downtime-silence.png" alt="downtime-silence" responsive="true" popup="true" style="width:80%;">}}
  You can select a specific monitor to silence, or leave this field empty to silence all monitors. You can also select a scope to constrain your downtime to a specific host, device or arbitrary tag.
  Refer to the [scope section][2] of the Graphing Primer using JSON for further information about scope.
  If you choose to silence all monitors constrained by a scope, clicking the "Preview affected monitors" shows which monitors are currently affected. Any monitors within your scope that are created or edited after the downtime is schedule is also silenced.
  Note that if a multi alert is included, it is only silenced for systems covered by the scope. For example, if a downtime scope is set for `host:X` and a multi alert is triggered on both `host:X` and `host:Y`, Datadog generates a monitor notification for `host:Y`, but not `host:X`.

2. Set a schedule.
  {{< img src="monitors/downtimes/downtime-schedule.png" alt="downtime-schedule" responsive="true" popup="true" style="width:80%;">}}
  You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a repeating schedule to accommodate regularly scheduled downtimes.

3. Add an optional message to notify your team
  {{< img src="monitors/downtimes/downtime-notify.png" alt="downtime-notify" responsive="true" popup="true" style="width:80%;">}}
  Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting][3] as well as Datadog's @-notification syntax. The "Notify your team" field allows you to specify team members or send the message to a service [integration][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadog.com/monitors#/downtime
[2]: /graphing/miscellaneous/graphingjson/#scope
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: https://app.datadoghq.com/account/settings#integrations
