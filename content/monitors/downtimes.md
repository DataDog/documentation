---
title: ダウンタイムをスケジュールする
kind: documentation
autotocdepth: 2
customnav: monitornav
---

You may occasionally need to shut systems down or take them offline to perform maintenance or upgrades. Scheduling downtime allows you to do this without triggering monitors.

## What happens to a monitor when it is muted (or has a downtime)?

You can schedule downtimes and/or mute your Datadog monitors so that they will not alert at specific times when you do not want them to. You can read how to schedule downtimes here and here. 

Monitors trigger events when they change state between ALERT, WARNING (if enabled), RESOLVED, and NO DATA (if enabled). But if a monitor has been silenced either by a downtime or muting, then any transition from RESOLVED to another state will not trigger an event (nor the notification channels that that event would have set off).

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime on alert" responsive="true">}}

If a monitor has a transition from the RESOLVED state to either ALERT or WARNING while it has been silenced, and if it then remains in that ALERT or WARNING state once the silence-time expires, then the monitor will trigger an ALERT or WARNING event at the time that the silencing expires.

{{< img src="monitors/downtimes/downtime_stop.png" alt="downtime stop" responsive="true">}}

By default, this is not true of NO DATA alerts: if a monitor has transitioned from the RESOLVED state to NO DATA while it has been silenced, and if it remains in a NO DATA state once the silence-time expires, then there will be no NO DATA alert. But once data returns for that monitor scope, the monitor will trigger a recovery event. 

This may seem unintuitive, but is the expected behavior today, and it has been made this way to protect from potentially spammy no-data alerts when using the "Autoresolve" feature. If in these circumstances you would prefer that the monitor trigger a NO DATA event at the time that the silencing expires, there is a feature you can have enabled for your account to enable that behavior. To have that enabled, you can reach out to the support team (add email link) to request it.

## Manage Downtime

Navigate to the [Manage Downtime](https://app.datadog.com/monitors#/downtime) page by highlighting the "Monitors" tab in the main menu and selecting the "Manage Downtime" link. You may also navigate to the "Manage Downtime" page from other Monitor related pages by clicking the link at the top of the page.

{{< img src="monitors/downtimes/downtime-nav.png" alt="downtime-nav" responsive="true">}}

The Manage Downtime page will display a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.

{{< img src="monitors/downtimes/downtime-manage.png" alt="downtime-manage" responsive="true">}}

## Schedule Downtime

To schedule downtime, click the "Schedule Downtime" button in the upper right.

1. Choose what to silence.

   {{< img src="monitors/downtimes/downtime-silence.png" alt="downtime-silence" responsive="true">}}

   You can select a specific monitor to silence, or leave this field empty to silence all monitors. You can also select a scope to constrain your downtime to a specific host, device or arbitrary tag.  Please refer to the [scope section](/graphing/miscellaneous/graphingjson/#scope) of the Graphing Primer using JSON for further information about scope.

   If you choose to silence all monitors constrained by a scope, clicking the "Preview affected monitors" will show which monitors are currently affected. Any monitors within your scope that are created or edited after the downtime is schedule will also be silenced.

   Note that if a multi alert is included, it will only be silenced for systems covered by the scope. For example, if a downtime scope is set for `host:X` and a multi alert is triggered on both `host:X` and `host:Y`, Datadog will generate a monitor notification for `host:Y`, but not `host:X`.

2. Set a schedule.

   {{< img src="monitors/downtimes/downtime-schedule.png" alt="downtime-schedule" responsive="true">}}

   You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a repeating schedule to accomimodate regularly scheduled downtimes.

3. Add an optional message to notify your team

   {{< img src="monitors/downtimes/downtime-notify.png" alt="downtime-notify" responsive="true">}}

   Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting](http://daringfireball.net/projects/markdown/syntax) as well as Datadog's @-notification syntax. The "Notify your team" field allows you to specify team members or send the message to a service [integration](https://app.datadoghq.com/account/settings#integrations).

## What's next ? 

* [Learn how to create a monitor](/monitors/monitor_types)
* [Configure your monitor notifications](/monitors/notifications)
* [Manage your monitors](/monitors/manage_monitor)
* [See all your checks into one place](/monitors/check_summary)
* [Consult our FAQ](/monitors/faq)