---
title: Network Monitor
description: "Check the status of TCP/HTTP endpoints."
aliases:
- /monitors/monitor_types/network
- /monitors/create/types/network/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule downtime to mute a monitor.
- link: /monitors/manage/status/
  tag: Documentation
  text: Check your monitor status
---

## Overview

Network monitors cover the TCP and HTTP checks available in the Agent. For details on Agent configuration, see the [HTTP check][1] or [TCP check][2] documentation.

## Monitor creation

To create a [network monitor][3] in Datadog, use the main navigation: *Monitors --> New Monitor --> Network*.

### Network status

#### Pick a check

* Choose a network check type (`ssl`, `http`, or `tcp`).
* Choose a specific endpoint or `All monitored <TYPE> endpoints`.

#### Pick monitor scope

Select the scope to monitor by choosing host names, tags, or choose `All Monitored Hosts`. If you need to exclude certain hosts, use the second field to list names or tags.

* The include field uses `AND` logic. All listed hostnames and tags must be present on a host for it to be included.
* The exclude field uses `OR` logic. Any host with a listed hostname or tag is excluded.

#### Set alert conditions

In this section, choose between a **Check Alert** or **Cluster Alert**:

{{< tabs >}}
{{% tab "Check Alert" %}}

A check alert tracks consecutive statuses submitted per check grouping and compares it to your thresholds.

Set up the check alert:

1. Trigger a separate alert for each `<GROUP>` reporting your check.

    Check grouping is specified either from a list of known groupings or by you. For network monitors, the per-check grouping is explicitly known. For example, the HTTP check is tagged with `host`, `instance`, and `url`.

2. Trigger the alert after selected consecutive failures: `<NUMBER>`

    Each check run submits a single status of `OK`, `WARN`, or `CRITICAL`. Choose how many consecutive runs with the `CRITICAL` status trigger a notification. For example, your HTTP check might have a single blip where the connection fails. If you set this value to `> 1`, the blip is ignored, but a problem with more than one consecutive failure triggers a notification.

3. Resolve the alert after selected consecutive successes: `<NUMBER>`

    Choose how many consecutive runs with the `OK` status resolve the alert.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

A cluster alert calculates the percent of checks in a given status and compares it to your thresholds.

Set up a cluster alert:

1. Decide whether or not to group your checks according to a tag. `Ungrouped` calculates the status percentage across all sources. `Grouped` calculates the status percentage on a per-group basis.

2. Select the percentage for the alert threshold.

{{% /tab %}}
{{< /tabs >}}

#### Advanced alert conditions

See the [Monitor configuration][4] documentation for information on [No data][5], [Auto resolve][6], and [New group delay][7] options.

#### Notifications

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][8] page.

### Network metric

Create a network metric monitor by following the instructions in the [metric monitor][10] documentation. Using the network metric monitor type ensures the monitor can be selected by the network monitor type facet on the [Manage Monitors][9] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/http_check/
[2]: /integrations/tcp_check/
[3]: https://app.datadoghq.com/monitors#create/network
[4]: /monitors/configuration/#advanced-alert-conditions
[5]: /monitors/configuration/#no-data
[6]: /monitors/configuration/#auto-resolve
[7]: /monitors/configuration/#new-group-delay
[8]: /monitors/notify/
[9]: https://app.datadoghq.com/monitors/manage
[10]: /monitors/types/metric
