---
title: Process Check Monitor
description: "Check if a process is running on a host"
aliases:
- /monitors/monitor_types/process_check
- /monitors/create/types/process_check/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

A process check monitor watches the status produced by the Agent check `process.up`. At the Agent level you can [configure your check thresholds][1] based on the number of matching processes.

## Monitor creation

To create a [process check monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Process Check*.

### Pick a process

From the dropdown list, select a process to monitor. Filter the list by entering your search criteria.

### Pick monitor scope

Select the hosts to monitor by choosing host names, tags, or choose `All Monitored Hosts`. Only hosts or tags reporting a status for the selected process are displayed. If you need to exclude certain hosts, use the second field to list names or tags.

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

Each check tagged with a distinct combination of tags is considered to be a distinct check in the cluster. Only the status of the last check of each combination of tags is taken into account in the cluster percentage calculation.

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="Cluster Check Thresholds" style="width:90%;">}}

For example, a cluster check monitor grouped by environment can alert if more that 70% of the checks on any of the environments submit a `CRITICAL` status, and warn if more that 70% of the checks on any of the environments submit a `WARN` status.
{{% /tab %}}
{{< /tabs >}}

#### Advanced alert conditions

See the [Monitor configuration][3] documentation for information on [No data][4], [Auto resolve][5], and [New group delay][6] options.

### Notifications

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][7] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/process/
[2]: https://app.datadoghq.com/monitors#create/process
[3]: /monitors/configuration/#advanced-alert-conditions
[4]: /monitors/configuration/#no-data
[5]: /monitors/configuration/#auto-resolve
[6]: /monitors/configuration/#new-group-delay
[7]: /monitors/notify/
