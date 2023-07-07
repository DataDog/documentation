---
title: Scoping downtimes schedules
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

Use group scope to apply additional filters to your downtime schedule and have more control over which monitors to mute. The examples in this guide show how the `Group scope` may be applied to monitors where [multi alert grouping][2] is configured.

{{< tabs >}}
{{% tab "Monitor Name" %}}
## By Monitor Name

As an example use case, you have a monitor "Average CPU for {{service.name}} hosts in high" that you want to mute. In the monitor configurations, you set up multi alerts to be sent for each `host` and `service`. 

### Mute monitors for a specific tag

1. To schedule a downtime on only one group (in this case, `service:web-store`), enter that group in the `Group scope` field.
2. Click **Preview affected monitors** to verify that the monitor chosen is still in scope, so alerts for the group `service:web-store` are muted during the scheduled downtime.

{{< img src="monitors/downtimes/downtime_examplebyname1_downtime.jpg" alt="downtime example of 'By Monitor Name' with preview of affected monitors" style="width:90%;">}}

After the scheduled downtime begins, only alerts for the group `service:web-store` are muted for this monitor.

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.jpg" alt="Evaluation graph showing downtime for group service:web-store" style="width:90%;">}}

This mutes any alerts that includes the tag `service:web-store`, for example:

| Monitor Group                | Muted |
| ---------------------------  | --- |
| `host:A`, `service:web-store`| Yes |
| `host:A`, `host:B`, `service:synthesizer`, `service:demo`, `service:web-store`| Yes |
| `host:A`, `host:B`, `service:synthesizer`| No (missing `service:web-store`) |

{{% /tab %}}

{{% tab "Monitor Tag" %}}
## By Monitor Tags

<div class="alert alert-info">Monitor tags are independent of tags sent by the Agent or integrations and tags assigned to the data you are querying.</div>

A downtime can be scheduled for monitors based on their monitor tags, and further scoped down by tags grouped in the monitor query. The `Group scope` field filters the downtime to the data that matches the tags listed. For more information on monitor tags, see the documentation on how to [Manage Monitors][1].

As an example use case, you  have several monitors with the same monitor tag `downtime:true` that you want to mute. In the monitor configurations, you set up multi alerts to be sent for each `host` and `service`.

### Multiple monitors scoped with the same tag

1. *Monitor A* is a multi alert monitor for hosts reporting a metric averaged across multiple `service` groups.
2. *Monitor B* is a multi alert monitor for hosts reporting the same metric for `service:web-store`.
3. Downtime is scheduled for any monitor that has the `downtime:true` monitor tag.
4. This downtime is constrained to the group `service:web-store`.
5. Click **Preview affected monitors** to verify the monitors that are in scope. In this example, it shows both monitors have the group `service:web-store` in scope.

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.jpg" alt="downtime example of 'By Monitor Tags' with preview of affected monitors" style="width:80%;">}}

6. *Monitor A* shows downtime has started, but only for the group in scope: `service:web-store`

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.jpg" alt="Evaluation graph showing downtime for group service:web-store" style="width:80%;">}}

7. *Monitor B* shows downtime has started for `service:web-store`. Because all the monitor's groups (by `host`) belong to `service:web-store`, the result is that all hosts are muted during downtime for this monitor.

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.jpg" alt="Evaluation graph showing downtime for group service:web-store and both affected hosts" style="width:80%;">}}

[1]: /monitors/manage/#monitor-tags

{{% /tab %}}
{{< /tabs >}}

### Mute monitors scoped to multiple tags

1. To schedule a downtime on multiple groups (for example, `service:web-store` and `env:prod`), enter that group in the `Group scope` field. By default, multiple tags added to the field result in a boolean *AND* logic query: `service:web-store` AND `env:prod`. However, you can specify *OR* logic as well: `service:web-store` OR `env:prod`.
2. Click **Preview affected monitors** to verify the monitors that are in scope.
3. After the scheduled downtime begins, alerts are muted for the group:
`env:prod` **AND** `service:web-store`

| Monitor Group                                                                    | Muted |
| -----------                                                                      | ----  |
| `env:prod`, `service:web-store`                                                  | Yes |
| `env:prod`, `env:dev`, `service:synthesizer`, `service:demo`, `service:web-store`| Yes |
| `env:dev`, `env:demo`, `service:web-store`                                       | No (missing `env:prod`) |
| `env:prod`, `env:demo`, `service:synthesizer`                                    | No (missing `service:web-store`) |

`env:prod` **OR** `service:web-store`

| Monitor Group                                                                    | Muted |
| -----------                                                                      | ----  |
| `env:prod`, `service:web-store`                                                  | Yes |
| `env:prod`, `env:dev`, `service:synthesizer`, `service:demo`, `service:web-store`| Yes |
| `env:dev`, `env:demo`, `service:web-store`                                       | Yes |
| `env:prod`, `env:demo`, `service:synthesizer`                                    | Yes |
| `env:demo`, `service:synthesizer`                                                | No (missing both `env:prod` and `service:web-store`) |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/#monitor-tags
[2]: /monitors/configuration/#multi-alert
[3]: /monitors/manage/search/
