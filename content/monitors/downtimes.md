---
title: Downtimes
kind: documentation
autotocdepth: 2
hideguides: true
customnav: monitornav
---

You may occasionally need to shut systems down or take them offline to perform maintenance or upgrades. Scheduling downtime allows you to do this without triggering monitors.

## Manage Downtime

Navigate to the [Manage Downtime](https://app.datadog.com/monitors#/downtime) page by highlighting the "Monitors" tab in the main menu and selecting the "Manage Downtime" link. You may also navigate to the "Manage Downtime" page from other Monitor related pages by clicking the link at the top of the page.

{{< img src="monitors/downtimes/downtime-nav.png" alt="downtime-nav" >}}

The Manage Downtime page will display a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.

{{< img src="monitors/downtimes/downtime-manage.png" alt="downtime-manage" >}}

## Schedule Downtime

To schedule downtime, click the "Schedule Downtime" button in the upper right.

1. Choose what to silence.

   {{< img src="monitors/downtimes/downtime-silence.png" alt="downtime-silence" >}}

   You can select a specific monitor to silence, or leave this field empty to silence all monitors. You can also select a scope to constrain your downtime to a specific host, device or arbitrary tag.  Please refer to the [scope section](/graphingjson/#scope) of the Graphing Primer using JSON for further information about scope.

   If you choose to silence all monitors constrained by a scope, clicking the "Preview affected monitors" will show which monitors are currently affected. Any monitors within your scope that are created or edited after the downtime is schedule will also be silenced.

   Note that if a multi alert is included, it will only be silenced for systems covered by the scope. For example, if a downtime scope is set for `host:X` and a multi alert is triggered on both `host:X` and `host:Y`, Datadog will generate a monitor notification for `host:Y`, but not `host:X`.

2. Set a schedule.

   {{< img src="monitors/downtimes/downtime-schedule.png" alt="downtime-schedule" >}}

   You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a repeating schedule to accomimodate regularly scheduled downtimes.

3. Add an optional message to notify your team

   {{< img src="monitors/downtimes/downtime-notify.png" alt="downtime-notify" >}}

   Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting](http://daringfireball.net/projects/markdown/syntax) as well as Datadog's @-notification syntax. The "Notify your team" field allows you to specify team members or send the message to a service [integration](https://app.datadoghq.com/account/settings#integrations).

## What's next ? 

* [Learn how to create a monitor](/monitors/monitor_types)
* [Configure your monitor notifications](/monitors/notifications)
* [Manage your monitors](/monitors/manage_monitor)
* [See all your checks into one place](/monitors/check_summary)
* [Consult our FAQ](/monitors/faq)