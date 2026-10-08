---
title: Notifications
description: Set up notification rules that send a recurring Slack or Microsoft Teams summary of Cloud Cost Recommendations matching a scope you define.
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

A notification rule sends a recurring Slack or Microsoft Teams summary of [Cloud Cost Recommendations][1] matching a scope you define, without taking any action on your resources. Use a notification rule when you want visibility into new savings opportunities without configuring Datadog to make changes automatically.

Notification rules are different from [Cost Optimization Automations][2], which act on recommendations directly on a recurring schedule.

## Prerequisites

- The **Cloud Cost Management - Cloud Cost Management Write** permission to create or edit a notification rule.
- A Slack workspace or Microsoft Teams tenant with the Datadog app installed. See [Slack integration][3] or [Microsoft Teams integration][5]. For a private Slack channel, add the Datadog Slack app to that channel before you select it as a destination.

## Set up a notification rule

To set up a notification rule:

1. Navigate to [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][4].
1. Select the {{< ui >}}Notification{{< /ui >}} tab.
1. Enter a name for the notification rule.
1. In the {{< ui >}}Define scope{{< /ui >}} section, use the {{< ui >}}Team{{< /ui >}}, {{< ui >}}Recommendation Type{{< /ui >}}, and {{< ui >}}Env{{< /ui >}} filters to restrict the notification to matching resources. Click {{< ui >}}\+ Filter{{< /ui >}} to add more filters. Leave the filters empty to include all resources.
1. (Optional) In {{< ui >}}Monthly savings range{{< /ui >}}, set a minimum, a maximum, or both. Only recommendations with estimated monthly savings in this range are included. Each notification lists the five recommendations with the highest savings in the selected scope.
1. In the {{< ui >}}Set schedule{{< /ui >}} section, select the notification frequency, execution day, execution time, and timezone.
1. In the {{< ui >}}Set destination{{< /ui >}} section, select {{< ui >}}Slack{{< /ui >}} or {{< ui >}}Microsoft Teams{{< /ui >}}, then select a workspace and channel (Slack) or a tenant, team, and channel (Microsoft Teams). For Slack, you can optionally add {{< ui >}}@-mention targets{{< /ui >}} to mention specific users in the notification message.
1. (Optional) In the {{< ui >}}Customize message{{< /ui >}} section, choose which details to include:
   - Notification details: {{< ui >}}Notification name{{< /ui >}}, {{< ui >}}Total est. savings{{< /ui >}}, and {{< ui >}}Custom text{{< /ui >}}. Custom text supports up to 500 characters and the dynamic fields `{{total_savings}}`, `{{rec_count}}`, and `{{digest_date}}`.
   - Recommendation details: {{< ui >}}Why{{< /ui >}}, {{< ui >}}Risk{{< /ui >}}, and {{< ui >}}Effort{{< /ui >}}. Recommendation type and estimated savings are always included.
   - Tags: In {{< ui >}}Include tags{{< /ui >}}, select or enter up to 10 tag keys, such as `env` or `service`. Each recommendation shows only tags with matching keys. Leave the field empty to include all tags.
1. (Optional) Review the notification in the {{< ui >}}Preview{{< /ui >}} panel. See [Preview a notification](#preview-a-notification).
1. (Optional) Click {{< ui >}}Test Notification{{< /ui >}} to send a one-time message to the selected destination.
1. (Optional) Turn off the {{< ui >}}Enabled{{< /ui >}} toggle to create the rule without activating it.
1. Click {{< ui >}}Save{{< /ui >}}.

## Preview a notification

While you configure a rule, the {{< ui >}}Preview{{< /ui >}} panel updates as you edit:

- {{< ui >}}Recommendations{{< /ui >}}: The recommendations that match the rule's scope and monthly savings range.
- {{< ui >}}Notification message{{< /ui >}}: The Slack or Microsoft Teams message that the rule sends, including your message customization. Previewing does not save the rule or send a message.

To see the message in your channel before you save the rule, click {{< ui >}}Test Notification{{< /ui >}}.

## Manage notification rules

The {{< ui >}}Notification{{< /ui >}} tab lists every notification rule in your organization. From this page you can:

- Toggle a rule on or off without deleting it
- Edit a rule's name, scope, savings range, schedule, destination, or message customization
- Delete a rule

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/recommendations/
[2]: /cloud_cost_management/recommendations/cost_optimization_automation/
[3]: /integrations/slack/
[4]: https://app.datadoghq.com/cost/optimize/automations
[5]: /integrations/microsoft_teams/
