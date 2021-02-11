---
title: Integration Monitor
kind: documentation
description: "Monitor metric values or health status from a specific integration"
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

Use an integration monitor to check if an installed [integration][1] is running. For more detailed monitoring, a metric monitor can be used to gauge specific information about an integration.

## Monitor creation

To create an [integration monitor][2] in Datadog:

1. Use the main navigation: *Monitors --> New Monitor --> Integration*.
2. Search for an integration or select it from the list or images.
3. Choose an **Integration Metric** or **Integration Status** monitor:
    {{< img src="monitors/monitor_types/integration/metric_or_status.png" alt="Metric or Status"  style="width:90%;">}}

### Integration metric

Create an integration metric monitor by following the instructions in the [metric monitor][3] documentation. Using the integration metric monitor type ensures the monitor can be selected by the integration monitor type facet on the [Manage Monitors][4] page.

### Integration status

If the integration has a service check, the **Integration Status** tab is active.

**Note**: If the integration does not submit metrics or service checks, it will show up as "Misconfigured".

#### Pick a check

If there is only one check for the integration, no selection is necessary. Otherwise, select the check for your monitor.

#### Pick monitor scope

Select the scope to monitor by choosing host names, tags, or choose `All Monitored Hosts`. If you need to exclude certain hosts, use the second field to list names or tags.

* The include field uses `AND` logic. All listed host names and tags must be present on a host for it to be included.
* The exclude field uses `OR` logic. Any host with a listed host name or tag is excluded.

#### Set alert conditions

In this section, choose between a **Check Alert** or **Cluster Alert**:

{{< tabs >}}
{{% tab "Check Alert" %}}

A check alert tracks consecutive statuses submitted per check grouping and compares it to your thresholds.

Set up the check alert:

1. Trigger a separate alert for each `<GROUP>` reporting your check.

    Check grouping is specified either from a list of known groupings or by you. For integration monitors, the per-check grouping is explicitly known. For example, the Postgres integration is tagged with `db`, `host`, and `port`.
    
2. Trigger the alert after selected consecutive failures: `<NUMBER>`

    Each check run submits a single status of `OK`, `WARN`, `CRITICAL`, or `UNKNOWN`. Choose how many consecutive runs with the `CRITICAL` status trigger a notification. For example, your database might have a single blip where connection fails. If you set this value to `> 1`, the blip is ignored but a problem with more than one consecutive failure triggers a notification.

3. Resolve the alert after selected consecutive successes: `<NUMBER>`

    Choose how many consecutive runs with the `OK` status resolve the alert.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

A cluster alert calculates the percent of checks in a given status and compares it to your thresholds.

Set up a cluster alert:

1. Decide whether or not to group your checks according to a tag. `Ungrouped` calculates the status percentage across all sources. `Grouped` calculates the status percentage on a per group basis.

2. Select the percentage for the alert threshold.

{{% /tab %}}
{{< /tabs >}}

See the [metric monitor][3] documentation for information on [No data][5], [Auto resolve][6], and [Evaluation delay][7] options.

#### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][8] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: https://app.datadoghq.com/monitors#create/integration
[3]: /monitors/monitor_types/metric/
[4]: https://app.datadoghq.com/monitors/manage
[5]: /monitors/monitor_types/metric/#no-data
[6]: /monitors/monitor_types/metric/#auto-resolve
[7]: /monitors/monitor_types/metric/#evaluation-delay
[8]: /monitors/notifications/
