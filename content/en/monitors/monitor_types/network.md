---
title: Network Monitor
kind: documentation
description: "Check the status of TCP/HTTP endpoints"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

Network monitors cover the TCP and HTTP checks available in the Agent. Read the [HTTP check][1] documentation for details on Agent configuration.

## Monitor creation

To create a [network monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Network*.

### Network Status

#### Pick a check

1. Choose a network check type (`ssl`, `http`, or `tcp`).
2. Choose a specific check or `All monitored <TYPE> endpoints`.

#### Pick monitor scope

Select the scope to monitor by choosing host names, tags, or choose `All Monitored Hosts`. If you need to exclude certain hosts, use the second field to list names or tags.

* The include field uses `AND` logic. All listed host names and tags must be present on a host for it to be included.
* The exclude field uses `OR` logic. Any host with a listed host name or tag is excluded.

Select **alerting options**:

**Note**: Contrary to [metric monitors][3], it's not possible to get alerted after the endpoint is unavailable for `X` min. Instead you can only be alerted after 5 max consecutive bad statuses. Unless a high timeout value is used in the Agent configuration, if a site goes down this translates into 5 * ~15-20 seconds (Agent collection period) or 90 seconds without data.

### Network Metric

Create a network metric monitor by following the instructions in the [metric monitor][4] documentation. Using the network metric monitor type ensures the monitor can be selected by the integration monitor type facet on the [Manage Monitors][5] page.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/http_check
[2]: https://app.datadoghq.com/monitors#create/network
[3]: /monitors/monitor_types/metric
[4]: /monitors/notifications
[5]: https://app.datadoghq.com/monitors/manage
