---
title: Create cluster alerts to notify when a percentage of groups are in critical state
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
---

## Overview

This guide shows how to create alerts that would not notify for each single group meeting the condition, but only when a given percent of them do.
This is helpful, for example, if you want a monitor that alerts only when a given percentage of hosts or containers reach a critical state.

### Example: Alert for a percentage of hosts with high CPU usage

In this example, you want to receive a notification when 40 percent of hosts have a CPU usage above 50 percent. Leverage the `min_cutoff` and `count_nonzero` functions:

* Use the `min_cutoff` function to count the number of hosts that have CPU usage above 50 percent.
* Use the `count_nonzero` function to count the total number of hosts.
* Divide one by the other for the resulting percentage of hosts with CPU usage above 50 percent.

{{< img src="monitors/faq/cluster-condition.png" alt="cluster-alert-condition" >}}

* Then, set the condition to alert if the percentage of hosts in that condition reaches 40 percent.

{{< img src="monitors/faq/cluster-trigger.png" alt="cluster-alert-trigger" >}}

This monitor tracks the percentage of host that have a CPU usage above 50 percent within the last ten minutes and generates a notification if more than 40 percent of those hosts meet the specified condition.

{{< img src="monitors/faq/cluster-status.png" alt="cluster-alert-status" >}}

{{< partial name="whats-next/whats-next.html" >}}

