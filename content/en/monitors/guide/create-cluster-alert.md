---
title: Create cluster alerts to notify when a percentage of groups are in critical state
kind: guide
further_reading:
- link: "/monitors/create/types/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
---

## Overview

The goal of this guide is to show how to create alerts that would not notify for each single group meeting the condition but only when a given percent of them do.
Indeed it might be needed to look at each individual group like hosts or containers but the situation might be fine until a given percentage of them reach a critical state.

Let's see this over a couple examples:

### Alert for a percentage of host with a high CPU

If you don't want to be notified for each host that have a high CPU but only if a given percentage is in that situation, the overall idea is to leverage the `min_cutoff` and `count_nonzero` function available on metrics to do this. 

For example, to get notified when 40% of hosts have a CPU above 50%, the idea is to split this in two parts:

* Use the `min_cutoff` function to count the number of host that have a CPU above 50%
* Use the `count_nonzero` function to count the total number of hosts
* Divide one by the other to get the percentage of host with a high CPU

{{< img src="monitors/faq/cluster-condition.png" alt="cluster-alert-condition"  >}}

* Then set the condition to alert if the percentage of hosts in that condition reaches 40%

{{< img src="monitors/faq/cluster-trigger.png" alt="cluster-alert-trigger"  >}}

This monitor then track the percentage of host that have a CPU above 50% within the last 10 minutes and generate a notification if more than 40% of those hosts meet the condition.


{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/
[2]: /monitors/create/types/#define-the-conditions
