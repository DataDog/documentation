---
title: Scoping Downtime
kind: Guide
disable_toc: false
further_reading:
- link: "/monitors/downtimes"
  tag: "Documentation"
  text: "Downtimes Overview"
- link: "/monitors/manage/search"
  tag: "Documentation"
  text: "Query syntax to search monitors"
- link: "/monitors/guide/suppress-alert-with-downtimes"
  tag: "Guide"
  text: "Suppress Alerts through the Downtimes API and UI"
---

## Overview

Downtimes are scheduled for system shutdowns, off-line maintenance, or upgrades without triggering your Monitors. Downtimes silence all Monitors’ alerts and notifications, but do not prevent Monitor state transitions.

In most cases, you don't want to completely mute **all** Monitor notifications due to the risk of missing important alerts that are not related to any scheduled maintenance.

This guide illustrates how proper scoping of Downtimes can be done via the UI. Scoping Downtimes is a two-step process. First, you select which Monitors should the Downtime look. Once that's set, you can use a scoping query to filter more granularly which _exact_ notifications shall be muted for each of the Monitors.

## Choose which Monitors to silence

Define which Monitors you want to target with your Downtime as the first step. Overall, there are three different options: target one specific Monitor, multiple Monitors, or all Monitors.

### Target one specific Monitor

You can choose to temporarily mute exactly one specific Monitors, e.g. if it's being too noisy at the moment or if that is the only one impacted by an upcoming maintenance.

To do so, simply select `By Monitor Name` and search for the Monitor in question.

### Target multiple Monitors based on Tags

<div class="alert alert-info">Monitor tags are independent of tags sent by the Agent or integrations and tags assigned to the data you are querying.</div>

A Downtime can be scheduled for Monitors based on their Monitor tags, and further scoped down by tags grouped in the monitor query. To do so, select `By Monitor Tags` and enter the Monitor tags that you want to target. Note, tags are additive, meaning that an input of `env:dev team:automations` will target Monitors that are tagged with **both**, `env:dev` and `team:automations`.

### Target all Monitors

Either via `By Monitor Name` or `By Monitor Tags`, you can select to target all Monitors. To do so, simply select the first item in the dropdown menu labeled `All Monitors`.

## Granularly scope Downtimes

Use group scope to apply additional filters to your Downtime and have more granular control over which Monitors to mute. The group scope of a Downtime is matched **after** the Monitor specific target, meaning if you target multiple Monitors by using tags above, it first needs to find Monitors that are tagged accordingly before matching the group scope.

The examples in this guide show how the `Group scope` may be applied to monitors where [multi alert grouping][2] is configured

### Mute monitors for a specific tag

1. To schedule a downtime on only one group (in this case, `service:web-store`), enter that group in the `Group scope` field.
2. Click **Preview affected monitors** to verify that the monitor chosen is still in scope, so alerts for the group `service:web-store` are muted during the scheduled downtime.

{{< img src="monitors/downtimes/downtime_example_byname.png" alt="Downtime example of 'By Monitor Name' with preview of affected monitors" style="width:90%;">}}

After the scheduled downtime begins, only alerts for the group `service:web-store` are muted for this monitor.

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.jpg" alt="Evaluation graph showing downtime for group service:web-store" style="width:90%;">}}

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

To combine multiple tags into a more complex scope, use `OR` unions and avoid creating multiple Downtimes. For instance, yo would like to mute all notifications that relate to your development and staging environment. Do do so, use `env:(dev OR staging)` as your scope query.

| Monitor Group                                                                    | Muted |
| -----------                                                                      | ----  |
| `env:dev`, `service:web-store`                                                   | Yes |
| `env:prod`, `env:dev`, `service:synthesizer`,                                    | Yes |
| `env:dev`, `env:staging`, `service:web-store`                                    | Yes |
| `env:prod`, `env:demo`, `service:synthesizer`                                    | No |
| `env:demo`, `service:synthesizer`                                                | No (missing both `env:prod` and `service:web-store`) |

The union of different tags (e.g. `env:dev OR service:web-store`) is not supported. For such cases, you need to create a separate Downtime for each tag.

### Mute monitors by wildcard scopes

Running large upgrades within your infrastructure is not uncommon. Downtimes can help muting all impacted entities, without much extra scripting. For instance, you could be upgrading all hosts of a given service. These hosts could follow certain naming conventions in your organisation, e.g. being prefixed with their related application. Consequently, you could have hundreds of hosts named something like `host:mydemoapplication-host-1`, `host:mydemoapplication-host-2`, and so forth.

To avoid muting all hosts separately, simply create a Downtime scoped by `host:mydemoapplication-*`. This will match all hosts that are prefixed accordingly. If you convention does the inverse, meaning it ends host names with their related application, can inverse the scope above as well, leading to: `host:*-mydemoapplication`.

### Exclude groups from being muted

If you are running your application and infrastructure on multiple environments, you likely have (at least) one production environment. All other environments might be build for testing, regression checks, or demo purposes. If you would like to avoid receiving alerts for non-production environments, you could set up a Downtime that is scopes as: `env:* -env:prod`. This scope first targets all alerts that have the `env` tag set and then excludes your production environment as a secondary step.

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
