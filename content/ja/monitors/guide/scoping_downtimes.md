---
title: Scoping Downtime
disable_toc: false
further_reading:
- link: /monitors/downtimes
  tag: Documentation
  text: Downtimes Overview
- link: /monitors/manage/search
  tag: Documentation
  text: Query syntax to search monitors
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: Guide
  text: Suppress Alerts through the Downtimes API and UI
---

## Overview

Downtimes are scheduled for system shutdowns, off-line maintenance, or upgrades without triggering your monitors. Downtimes silence all monitor alerts and notifications, but do not prevent monitor state transitions.

In most cases, you don't want to completely mute **all** monitor notifications due to the risk of missing important alerts that are not related to any scheduled maintenance.

This guide illustrates how proper scoping of Downtimes can be done through the UI.Scoping Downtimes is a two-step process:
1. [Select the monitor or monitors you want to apply the downtime.](#choose-which-monitors-to-silence)
2. [Scope the query to filter the _exact_ notifications to mute for each of the monitors.](#granularly-scope-downtimes)

## Choose which monitors to silence

Define which monitors you want the downtime to target. There are three different options: target one specific monitor, multiple monitors, or all monitors.

### Target one specific monitor

You can choose to temporarily mute one specific monitor. For example, if the monitor is sending many alerts at the moment or if it is the only monitor impacted by an upcoming maintenance.

In the downtime configuration, select **By Monitor Name** and search for the monitor in question.

### Target multiple monitors based on monitor tags

<div class="alert alert-info">Monitor tags are independent of tags sent by the Agent or integrations and tags assigned to the data you are querying.</div>

Downtimes can be scheduled for monitors based on their monitor tags, and further scoped down by tags grouped in the monitor query. Select `By Monitor Tags` and enter the monitor tags that you want to target.

**Note**: Tags are additive, meaning that an input of `env:dev team:automations` will target monitors that are tagged with **both**, `env:dev` AND `team:automations`.

### Target all monitors

For both `By Monitor Name` or `By Monitor Tags` options, you can scope to target all monitors by selecting the first item in the dropdown menu labeled `All Monitors`.

## Granularly scope downtimes

Use group scope to apply additional filters to your downtime and have granular control over which monitors to mute. The group scope of a downtime is matched **after** the monitor specific target. If you target multiple monitors by using monitor tags, it first needs to find monitors that are tagged accordingly before it matches the group scope.

The examples in this guide show how the `Group scope` may be applied to monitors where [multi alert grouping][2] is configured

### Mute monitors for a specific tag

1. To schedule a downtime on only one group (in this case, `service:web-store`), enter that group in the `Group scope` field.
2. Click **Preview affected monitors** to verify that the monitor chosen is still in scope, so alerts for the group `service:web-store` are muted during the scheduled downtime.

{{< img src="monitors/downtimes/downtime_example_byname.png" alt="Downtime example of 'By Monitor Name' with preview of affected monitors" style="width:90%;">}}

After the scheduled downtime begins, only alerts for the group `service:web-store` are muted for this monitor.

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.png" alt="Evaluation graph showing downtime for group service:web-store" style="width:90%;">}}

This mutes any alerts that includes the tag `service:web-store`, for example:

| Monitor Group                | Muted |
| ---------------------------  | --- |
| `host:A`, `service:web-store`| Yes |
| `host:A`, `host:B`, `service:synthesizer`, `service:demo`, `service:web-store`| Yes |
| `host:A`, `host:B`, `service:synthesizer`| No (missing `service:web-store`) |


### Mute monitors scoped to multiple tags

1. To schedule a downtime on multiple groups (for example, `service:web-store` and `env:prod`), enter that group in the `Group scope` field.
2. Click **Preview affected monitors** to verify the monitors that are in scope.
3. After the scheduled downtime begins, alerts are muted for the group:
`env:prod` **AND** `service:web-store`

| Monitor Group                                                                    | Muted |
| -----------                                                                      | ----  |
| `env:prod`, `service:web-store`                                                  | Yes |
| `env:prod`, `env:dev`, `service:synthesizer`, `service:demo`, `service:web-store`| Yes |
| `env:dev`, `env:demo`, `service:web-store`                                       | No (missing `env:prod`) |
| `env:prod`, `env:demo`, `service:synthesizer`                                    | No (missing `service:web-store`) |


### Mute monitors by the union of tags

To combine multiple tag values into a more complex scope, use `OR` unions in a single downtime. For instance, you want to mute all notifications related to either your development or staging environments. Use `env:(dev OR staging)` as your scope query.

**Note**: The union of different tags (for example, `env:dev OR service:web-store`) is not supported. For such cases, you need to create a separate downtime for each tag.

Query `env:(dev OR staging)`
| Monitor Group                                                                    | Muted |
| -----------                                                                      | ----  |
| `env:staging`, `service:web-store`                                               | Yes |
| `env:dev`, `env:prod`, `service:web-store`                                       | Yes |
| `env:demo`, `env:staging`, `service:web-store`                                   | Yes |
| `env:demo`, `env:prod`, `service:web-store  `                                    | No (missing both `env:dev` and `env:staging`) |

### Mute monitors with wildcard scopes

Running large upgrades within your infrastructure is not uncommon. Downtimes can help mute all impacted entities, without much extra scripting. For instance, you could be upgrading all hosts of a given service. These hosts could follow certain naming conventions in your organization, such as being prefixed with their related application. This could result in hundreds of hosts named something like `host:mydemoapplication-host-1`and `host:mydemoapplication-host-2`.

Create a downtime scoped by `host:mydemoapplication-*`. This matches and mutes all hosts that are prefixed accordingly. You can also apply the inverse where the downtime is scoped by `host:*-mydemoapplication`. This matches and mutes all hosts that end with `mydemoapplication`.

### Exclude groups from being muted

If you are running your application and infrastructure on multiple environments, you likely have one production environment and multiple non-production environments (for example, testing, regression checks, or demo). To avoid receiving alerts for non-production environments, you could set up a downtime that is scoped with: `env:* -env:prod`. This scope targets all alerts that have the `env` tag set and then excludes your production environment as a secondary step.

### Multiple monitors scoped with the same tag

1. *Monitor A* is a multi alert monitor for hosts reporting a metric averaged across multiple `service` groups.
2. *Monitor B* is a multi alert monitor for hosts reporting the same metric for `service:web-store`.
3. Downtime is scheduled for any monitor that has the `downtime:true` monitor tag.
4. This downtime is constrained to the group `service:web-store`.
5. Click **Preview affected monitors** to verify the monitors that are in scope. In this example, it shows both monitors have the group `service:web-store` in scope.

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.png" alt="downtime example of 'By Monitor Tags' with preview of affected monitors" style="width:80%;">}}

6. *Monitor A* shows downtime has started, but only for the group in scope: `service:web-store`

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.png" alt="Evaluation graph showing downtime for group service:web-store" style="width:80%;">}}

7. *Monitor B* shows downtime has started for `service:web-store`. Because all the monitor's groups (by `host`) belong to `service:web-store`, the result is that all hosts are muted during downtime for this monitor.

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.png" alt="Evaluation graph showing downtime for group service:web-store and both affected hosts" style="width:80%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/#monitor-tags
[2]: /monitors/configuration/#multi-alert
[3]: /monitors/manage/search/
