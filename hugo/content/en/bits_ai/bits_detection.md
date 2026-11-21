---
title: Bits Detection
description: "Learn how Bits Detection autonomously identifies critical services and manages monitor coverage as your system evolves."
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-detection/"
    tag: "Blog"
    text: "Autonomously monitor for impactful degradations with Bits Detection"
---

{{< callout url="#" btn_hidden="true" header="false">}}
  Bits Detection is in Preview. Contact your Datadog representative to request access.
{{< /callout >}}

## Overview

Monitoring coverage drifts as engineers add endpoints, move dependencies, and change user flows. A service can look healthy at the top level while one critical path is failing. Bits Detection identifies which endpoints need coverage, sets detection logic from observed production behavior, and keeps that coverage current. Your existing monitors stay in place, and Bits Detection works alongside them.

Bits Detection manages monitoring in three stages:

- **Identify critical resources**: Bits Detection evaluates supported services and resources to determine which endpoints, dependencies, or flows are likely to be important to your users and business.
- **Detect meaningful degradations**: Bits Detection creates and tunes managed monitors for critical resources.
- **Adapt as services change**: Bits Detection keeps monitoring aligned with production by reassessing resource criticality, monitoring coverage, and alerting behavior as your services evolve.

Bits Detection is the detection stage of [Bits Autonomous Operations][6] (Autonomous Ops). When Bits Detection flags an issue, Bits triages it and, if it needs action, investigates it with [Bits Investigation][4] and addresses it with [Bits Remediation][9].

## Enable Bits Detection

You enable Bits Detection by creating an Autonomous Ops scope. When you create a scope, Bits Detection provisions monitoring for the infrastructure resources in the scope. For services, Bits provisions monitoring when you turn on the Bits Managed Monitors option in the scope.

For information about how to create scopes, see [Create a scope][7].

## Permissions {#permissions}

Bits Detection uses existing Datadog role-based access control (RBAC) permissions. There are no permissions specific to Bits Detection.

| Action                                                                  | Required permissions |
|:------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------- |
| View Autonomous Ops scopes and scope details                           | Bits Investigations Read (`bits_investigations_read`) |
| View critical endpoints                                                 | APM Read (`apm_read`) |
| View Bits Detection monitors                                            | Monitors Read (`monitors_read`) |
| Enable, edit, rename, or remove detection coverage for a scope, including auto-investigate | Bits Investigations Write (`bits_investigations_write`) and Monitors Write (`monitors_write`) |
| Mark an endpoint as critical or not critical                            | APM Read (`apm_read`) and Monitors Write (`monitors_write`) |
| Set up or change alert notifications for a scope                        | Monitor Configuration Policy Write (`monitor_config_policy_write`) |

To set up notifications while enabling or editing a scope, you need Monitor Configuration Policy Write in addition to Bits Investigations Write and Monitors Write.

For details on assigning permissions to roles, see [Access Control][12].

## Review Bits activity

To review the scopes where Bits is active, go to [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Scopes{{< /ui >}}][5]. Open a scope to review its recent Bits activity and its configuration. For more information, see [View and manage scopes][8].

## Manage Bits Detection notifications

Bits Detection monitors are tuned to production behavior, not static thresholds. Use alert notification rules to route alerts to the right teams.

Creating or editing a notification rule requires the Monitor Configuration Policy Write permission. For details, see the [Permissions](#permissions) section.

To set up a rule, go to the [service monitoring overview][2] and click {{< ui >}}Set Up Alert Notification Rules{{< /ui >}}.

1. In {{< ui >}}Match notifications with specific tags{{< /ui >}}, review the query. Datadog pre-fills the rule with tags for the selected service and Bits Detection-managed monitors. You can filter further.
1. In {{< ui >}}Choose routing conditions and recipients{{< /ui >}}, select {{< ui >}}Manual Routing{{< /ui >}} or {{< ui >}}Dynamic Routing{{< /ui >}}.
1. Add the recipients that should receive matching monitor notifications.
1. Name the rule.
1. Define permissions for the rule.
1. Click {{< ui >}}Create Rule{{< /ui >}}.

The notification rule applies to monitors that match the tag query. The side panel shows how many monitors match the rule and lists examples of matching monitors.

## Help Bits learn

Use feedback and guidance to tune how Bits detects and handles issues in your environment. You can flag alerts as useful or noisy, update which endpoints are considered critical, give Bits guidance for a scope, and give feedback on the investigations that follow.

### Provide feedback on an alert

1. Open the Bits Detection alert.
1. In the feedback prompt, click {{< ui >}}Yes{{< /ui >}} if Bits should have alerted you, or click {{< ui >}}No, Because…{{< /ui >}} if it should not have.
1. If you clicked {{< ui >}}No, Because…{{< /ui >}}, select a reason.
1. Click {{< ui >}}Send Feedback{{< /ui >}}.

### Provide feedback on resource criticality

Bits Detection uses criticality to determine which resources should have managed monitoring coverage. From the [service monitoring overview][2], click {{< ui >}}Mark as Not Critical{{< /ui >}} next to an endpoint that should not have critical coverage, or {{< ui >}}Add a New Endpoint{{< /ui >}} to mark one as critical.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/apm/services
[4]: /bits_ai/bits_investigation/
[5]: https://app.datadoghq.com/bits/autonomous-ops/scopes
[6]: /bits_ai/bits_autonomous_operations/
[7]: /bits_ai/bits_autonomous_operations/#create-a-scope
[8]: /bits_ai/bits_autonomous_operations/#view-and-manage-scopes
[9]: /bits_ai/bits_remediation/
[10]: https://app.datadoghq.com/bits/settings/memories
[11]: /bits_ai/bits_investigation/knowledge_sources/#feedback-and-memories
[12]: /account_management/rbac
