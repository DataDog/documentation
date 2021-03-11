---
title: Custom Check Monitor
kind: documentation
description: "Monitor status of arbitrary custom checks."
further_reading:
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/monitor_status/"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

Custom check monitors include any service check not reported by one of the [more than {{< translate key="integration_count" >}} integrations][1] included with the Agent. Custom service checks can be sent to Datadog using a [custom Agent check][2], [DogStatsD][3], or the [API][4].

## Monitor creation

To create a [custom check monitor][5] in Datadog, use the main navigation: *Monitors --> New Monitor --> Custom Check*.

### Pick a custom check

Choose a custom check from the drop-down box.

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

    Check grouping is specified either from a list of known groupings or by you. For custom check monitors, the per-check grouping is unknown, so you must specify it.

2. Trigger the alert after selected consecutive failures: `<NUMBER>`

    Each check run submits a single status of `OK`, `WARN`, `CRITICAL`, or `UNKNOWN`. Choose how many consecutive runs with the `WARN` and `CRITICAL` status trigger a notification. For example, to be notified immediately when your check fails, trigger the monitor alert on `1` critical status or `1` warning status.

3. Choose `Do not notify` or `Notify` for Unknown status.

4. Resolve the alert after selected consecutive successes: `<NUMBER>`.

    Choose how many consecutive runs with the `OK` status resolve the alert. For example, to ensure an issue is fixed, resolve the monitor on `4` OK statuses.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

A cluster alert calculates the percent of checks in a given status and compares it to your thresholds.

Set up a cluster alert:

1. Decide whether or not to group your checks according to a tag. `Ungrouped` calculates the status percentage across all sources. `Grouped` calculates the status percentage on a per-group basis.

2. Select the percentage for alert and warn thresholds. Only one setting (alert or warn) is required.

{{% /tab %}}
{{< /tabs >}}

See the [metric monitor][6] documentation for information on [No data][7], [Auto resolve][8], and [Evaluation delay][9] options.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][10] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: /developers/write_agent_check/
[3]: /developers/dogstatsd/
[4]: /api/v1/service-checks/
[5]: https://app.datadoghq.com/monitors#create/custom
[6]: /monitors/monitor_types/metric/
[7]: /monitors/monitor_types/metric/#no-data
[8]: /monitors/monitor_types/metric/#auto-resolve
[9]: /monitors/monitor_types/metric/#evaluation-delay
[10]: /monitors/notifications/
