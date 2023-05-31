---
title: Scoping downtimes schedules
kind: Guide
disable_toc: false
further_reading:
- link: "/monitors/notify/downtimes"
  tag: "Documentation"
  text: "Downtimes Overview"
- link: "/monitors/guide/suppress-alert-with-downtimes"
  tag: "Guide"
  text: "Suppress Alerts through the Downtimes API and UI"
---

## Overview

Use group scope to apply additional filters to your downtime schedule and have more control over which monitors to mute. 

The examples in this guide show how the `Group scope` may be applied to multi alert monitors.

## By Monitor Name

### Mute notification for a specific service

1. To schedule downtime on only one group (in this case, `service:web-store`), enter that group in the `Group scope` field.
2. **Preview affected monitors** indicates that the monitor chosen is still in scope, so alerts for the group `service:web-store` are muted during the scheduled downtime.

{{< img src="monitors/downtimes/downtime_examplebyname1_downtime.jpg" alt="downtime example of 'By Monitor Name' with preview of affected monitors" style="width:80%;">}}

3. Scheduled downtime begins, with only alerts for the group `service:web-store` muted for this monitor.

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.jpg" alt="Evaluation graph showing downtime for group service:web-store" style="width:80%;">}}

4. To schedule a downtime on more than one group (such as `service:synthesizer` and `service:consul`), you can create an additional downtime per group.

### Mute notifications for a specific environment of a monitor grouped by `env` and `service`

1. To schedule downtime on one of the groups (in this case, `env:dev`), enter that group in the `Group scope` field.
2. **Preview affected monitors** indicates that the monitor chosen is still in scope, so alerts for the group `env:dev` are muted during the scheduled downtime.

{{< img src="monitors/downtimes/downtime_examplebyname2_downtime.jpg" alt="downtime by monitor name with dev environment in scope" style="width:80%;">}}

3. Scheduled downtime begins, and alerts are muted for the group `env:dev` **and** any service related to the `dev` environment.

{{< img src="monitors/downtimes/downtime_examplebyname2_monitor.jpg" alt="group status shows dev environment and related services muted during downtime" style="width:80%;">}}

4. To schedule a downtime on more than one "group by" (for example, `env:dev` AND `service:web-store`), add the additional scope to the downtime.

## By Monitor Tags

If a scheduled downtime is based on a common monitor tag, and the monitors in scope are multi alert monitors with one group by scope, the `Group scope` field can be used to silence a group that the monitors in scope have in common.

### Two multi alert monitors, each with one "group by" scope, have the `downtime:true` monitor tag in common

1. *Monitor A* is a multi alert monitor for hosts reporting a metric averaged across multiple `service` groups.
2. *Monitor B* is a multi alert monitor for hosts reporting the same metric for `service:web-store`.
3. Downtime is scheduled for any monitor that has the `downtime:true` monitor tag.
4. This downtime is constrained to the group `service:web-store`.
5. Preview affected monitors shows both monitors have the group `service:web-store` in scope.

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.jpg" alt="downtime example of 'By Monitor Tags' with preview of affected monitors" style="width:80%;">}}

6. *Monitor A* shows downtime has started, but only for the group in scope: `service:web-store`

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.jpg" alt="Evaluation graph showing downtime for group service:web-store" style="width:80%;">}}

7. *Monitor B* shows downtime has started for `service:web-store`. Because all the monitor's groups (by `host`) belong to `service:web-store`, the result is that all hosts are muted during downtime for this monitor.

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.jpg" alt="Evaluation graph showing downtime for group service:web-store and both affected hosts" style="width:80%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}