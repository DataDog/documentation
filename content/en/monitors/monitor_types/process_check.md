---
title: Process Check Monitor
kind: documentation
description: "Check if a process is running on a host"
further_reading:
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/monitor_status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

A process check monitor watches the status produced by the Agent check `process.up`. At the Agent level you can [configure your check thresholds][1] based on the number of matching processes.

## Monitor creation

To create a [process check monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Process Check*.

### Pick a process

From the drop-down list, select a process to monitor. Filter the list by entering your search criteria.

### Pick monitor scope

Select the hosts to monitor by choosing host names, tags, or choose `All Monitored Hosts`.  Only hosts or tags reporting a status for the selected process are displayed. If you need to exclude certain hosts, use the second field to list names or tags.

* The include field uses `AND` logic. All listed host names and tags must be present on a host for it to be included.
* The exclude field uses `OR` logic. Any host with a listed name or tag is excluded.

### Set alert conditions

{{< tabs >}}
{{% tab "Check Alert" %}}

A check alert tracks consecutive statuses submitted per check grouping and compares it to your thresholds. For process check monitors, the groups are static: `host` and `process`.

Set up the check alert:

1. Trigger the alert after selected consecutive failures: `<NUMBER>`

    Each check run submits a single status of `OK`, `WARN`, or `CRITICAL`. Choose how many consecutive runs with the `WARN` and `CRITICAL` status trigger a notification. For example, your process might have a single blip where connection fails. If you set this value to `> 1`, the blip is ignored but a problem with more than one consecutive failure triggers a notification.

2. Resolve the alert after selected consecutive successes: `<NUMBER>`

    Choose how many consecutive runs with the `OK` status resolves the alert.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

A cluster alert calculates the percent of process checks in a given status and compares it to your thresholds.

Set up a cluster alert:

1. Decide whether or not to group your process checks according to a tag. `Ungrouped` calculates the status percentage across all sources. `Grouped` calculates the status percentage on a per group basis.

2. Select the percentage for alert and warn thresholds. Only one setting (alert or warn) is required.

{{% /tab %}}
{{< /tabs >}}

See the [metric monitor][3] documentation for information on [No data][4], [Auto resolve][5], and [Evaluation delay][6] options.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][7] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/process/
[2]: https://app.datadoghq.com/monitors#create/process
[3]: /monitors/monitor_types/metric/
[4]: /monitors/monitor_types/metric/#no-data
[5]: /monitors/monitor_types/metric/#auto-resolve
[6]: /monitors/monitor_types/metric/#evaluation-delay
[7]: /monitors/notifications/
