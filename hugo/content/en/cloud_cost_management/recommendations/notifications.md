---
title: Notifications
description: Set up notification rules that send a recurring Slack summary of Cloud Cost Recommendations matching a scope you define.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/recommendations/"
  tag: "Documentation"
  text: "Cloud Cost Recommendations"
- link: "/cloud_cost_management/recommendations/cost_optimization_automation/"
  tag: "Documentation"
  text: "Cost Optimization Automations"

---

## Overview

A notification rule sends a recurring Slack summary of [Cloud Cost Recommendations][1] matching a scope you define, without taking any action on your resources. Use a notification rule when you want visibility into new savings opportunities without configuring Datadog to make changes automatically.

Notification rules are different from [Cost Optimization Automations][2], which act on recommendations directly on a recurring schedule.

## Prerequisites

- A Slack connection. See [Slack integration][3].
- The **Cloud Cost Management - Cloud Cost Management Write** permission to create or edit a notification rule.

## Set up a notification rule

To set up a notification rule:

1. Navigate to [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][4].
1. Select the {{< ui >}}Notification{{< /ui >}} tab.
1. In the {{< ui >}}Define scope{{< /ui >}} section, use the {{< ui >}}Team{{< /ui >}}, {{< ui >}}Recommendation Type{{< /ui >}}, and {{< ui >}}Env{{< /ui >}} filters to restrict the notification to matching resources. Click {{< ui >}}+ Filter{{< /ui >}} to add more filters. Leave the filters empty to include all resources.
1. In the {{< ui >}}Set schedule{{< /ui >}} section, select the notification frequency, execution day, execution time, and timezone.
1. In the {{< ui >}}Destination{{< /ui >}} section, select a Slack workspace connection and channel.
1. Enter a name for the notification rule.
1. (Optional) Turn off the {{< ui >}}Notification enabled{{< /ui >}} toggle to create the rule without activating it.
1. Click {{< ui >}}Save{{< /ui >}}.

## Manage notification rules

The {{< ui >}}Notification{{< /ui >}} tab lists every notification rule in your organization. From this page you can:

- Toggle a rule on or off without deleting it
- Edit a rule's scope, schedule, destination, or name
- Delete a rule

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/recommendations/
[2]: /cloud_cost_management/recommendations/cost_optimization_automation/
[3]: /integrations/slack/
[4]: https://app.datadoghq.com/cost/optimize/automations
