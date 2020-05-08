---
title: Host Monitor
kind: documentation
description: "Check if one or more hosts are reporting to Datadog"
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

Every Datadog Agent reports a service check called `datadog.agent.up` with the status `OK`. You can monitor this check across one or more hosts by using a host monitor.

## Monitor creation

To create a [host monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Host*.

### Pick hosts by name or tag

Select the hosts to monitor by choosing host names, tags, or choose `All Monitored Hosts`. If you need to exclude certain hosts, use the second field to list names or tags.

* The include field uses `AND` logic. All listed names and tags must be present on a host for it to be included.
* The exclude field uses `OR` logic. Any host with a listed name or tag is excluded.

### Set alert conditions

In this section, choose between a **Check Alert** or **Cluster Alert**:

{{< tabs >}}
{{% tab "Check Alert" %}}

A check alert tracks if a host stops reporting for a given amount of time. Too much time following a check run can be a sign of problems with data submission from the host.

Enter the number of minutes to check for missing data. The default value is 2 minutes.

If `datadog.agent.up` stops reporting an `OK` status for more than the minutes specified, an alert is triggered.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

A cluster alert tracks if some percentage of hosts have stopped reporting for a given amount of time.

To set up a cluster alert:

1. Decide whether or not to group your hosts according to a tag. `Ungrouped` calculates the status percentage across all included hosts. `Grouped` calculates the status percentage on a per group basis.
2. Select the percentage for alert and warn thresholds. Only one setting (alert or warn) is required.
3. Enter the number of minutes to check for missing data. The default value is 2 minutes.

If `datadog.agent.up` stops reporting an `OK` status for more than the minutes specified and the percentage threshold is reached, an alert is triggered.

{{% /tab %}}
{{< /tabs >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][2] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/host
[2]: /monitors/notifications/
