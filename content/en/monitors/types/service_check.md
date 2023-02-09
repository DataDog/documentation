---
title: Service Check Monitor
kind: documentation
description: "Monitor status of arbitrary service checks."
aliases :
    - /monitors/monitor_types/custom_check
    - /monitors/create/types/custom_check/
    - /monitors/types/custom_check/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/notify/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

Service check monitors include any service check not reported by one of the [more than {{< translate key="integration_count" >}} integrations][1] included with the Agent. Service checks can be sent to Datadog using a [custom Agent check][2], [DogStatsD][3], or the [API][4]. For more information, see the [Service Check Overview][5].

## Monitor creation

To create a [service check monitor][6] in Datadog, use the main navigation: **Monitors** --> **New Monitor** --> **Service Check**.

### Pick a service check

Choose a service check from the drop-down menu.

### Pick monitor scope

Select the scope to monitor by choosing host names, tags, or choose `All Monitored Hosts`. If you need to exclude certain hosts, use the second field to list names or tags.

* The include field uses `AND` logic. All listed hostnames and tags must be present on a host for it to be included.
* The exclude field uses `OR` logic. Any host with a listed hostname or tag is excluded.

### Set alert conditions

In this section, choose between a **Check Alert** or **Cluster Alert**:

{{< tabs >}}
{{% tab "Check Alert" %}}

A check alert tracks consecutive statuses submitted per check grouping and compares it to your thresholds.

Set up the check alert:

1. Trigger a separate alert for each `<GROUP>` reporting your check.
    * Check grouping is specified either from a list of known groupings or by you. For service check monitors, the per-check grouping is unknown, so you must specify it.

2. Trigger the alert after selected consecutive failures: `<NUMBER>`
    * Choose how many consecutive runs with the `CRITICAL` status trigger a notification. For example, to be notified immediately when your check fails, trigger the monitor alert on `1` critical status.

3. Select `Do not notify` or `Notify` for Unknown status.
    * If `Notify` is selected, a state transition to `UNKNOWN` triggers a notification. In the [monitor status page][1], the status bar of a group in `UNKNOWN` state uses `NODATA` grey. The overall status of the monitor stays in `OK`.

4. Resolve the alert after selected consecutive successes: `<NUMBER>`.
    * Choose how many consecutive runs with the `OK` status resolve the alert. For example, to ensure an issue is fixed, resolve the monitor on `4` `OK` statuses.


[1]: /monitors/manage/status
{{% /tab %}}
{{% tab "Cluster Alert" %}}

A cluster alert calculates the percent of checks in a given status and compares it to your thresholds.

Each check tagged with a distinct combination of tags is considered to be a distinct check in the cluster. Only the status of the last check of each combination of tags is taken into account in the cluster percentage calculation.

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="Cluster Check Thresholds" style="width:90%;">}}

For example, a cluster check monitor grouped by environment can alert if more that 70% of the checks on any of the environments submit a `CRITICAL` status, and warn if more that 70% of the checks on any of the environments submit a `WARN` status.

To set up a cluster alert:

1. Decide whether or not to group your checks according to a tag. `Ungrouped` calculates the status percentage across all sources. `Grouped` calculates the status percentage on a per-group basis.

2. Select the percentage for alert and warn thresholds. Only one setting (alert or warn) is required.
    
{{% /tab %}}
{{< /tabs >}}

#### Advanced alert conditions

See the [Monitor configuration][7] documentation for information on [No data][8], [Auto resolve][9], and [New group delay][10] options.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][11] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: /developers/custom_checks/write_agent_check/
[3]: /developers/dogstatsd/
[4]: /api/v1/service-checks/
[5]: /developers/service_checks/#overview
[6]: https://app.datadoghq.com/monitors/create/custom
[7]: /monitors/create/configuration/#advanced-alert-conditions
[8]: /monitors/create/configuration/#no-data
[9]: /monitors/create/configuration/#auto-resolve
[10]: /monitors/create/configuration/#new-group-delay
[11]: /monitors/notify/
