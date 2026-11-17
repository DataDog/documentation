---
title: Bits Detection
description: "Learn how Bits Detection autonomously identifies critical services and manages monitor coverage as your system evolves."
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-detection/"
    tag: "Blog"
    text: "Autonomously monitor for impactful degradations with Bits Detection"
---

## Overview

Monitoring coverage drifts as engineers add endpoints, move dependencies, and change user flows. A service can look healthy at the top level while one critical path is failing. Bits Detection identifies which endpoints need coverage, sets detection logic from observed production behavior, and keeps that coverage current. Your existing monitors stay in place, and Bits Detection works alongside them.

Bits Detection is the detection stage of [Bits Autonomous Operations][6] (Autonomous Ops). When Bits Detection flags an issue, Bits triages it and, if it needs action, investigates it with [Bits Investigation][4] and addresses it with [Bits Remediation][9].

## Enable Bits Detection in an Autonomous Ops scope

Bits Detection coverage is part of [Bits Autonomous Operations][6]. To enable it, create a scope that watches parts of your system.

1. Go to [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}}][5] and click {{< ui >}}Create scope{{< /ui >}}.
1. Select {{< ui >}}Watch parts of my system{{< /ui >}}, and enter tags for the services that you want Bits to cover.
1. Turn on {{< ui >}}Enable Bits Managed Monitors for services{{< /ui >}}.
1. Complete the rest of the scope, then click {{< ui >}}Create Scope{{< /ui >}}.

For more information, see [Create a scope][7].

## Review Bits activity

To review the scopes where Bits is active, go to [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Scopes{{< /ui >}}][5]. Open a scope to review its recent Bits activity and its configuration. For more information, see [View and manage scopes][8].

## Manage Bits Detection notifications

Bits Detection monitors are tuned to production behavior, not static thresholds. Use alert notification rules to route alerts to the right teams. To set up a rule, go to the [service monitoring overview][2] and click {{< ui >}}Set Up Alert Notification Rules{{< /ui >}}.

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

### Give Bits guidance for a scope

When you create or edit an Autonomous Ops scope, use {{< ui >}}Give Bits guidance on how to operate{{< /ui >}} to describe in natural language which alerts are most important to your team. Bits uses this guidance when it triages issues in the scope. To update the guidance for an existing scope, open the scope and click {{< ui >}}Edit scope{{< /ui >}}. For more information, see [Create a scope][7].

### Give feedback on investigations

When Bits investigates an issue, use the thumbs-up or thumbs-down buttons on the conclusion and next steps to tell Bits whether it got the issue right. Bits saves your feedback as memories and applies them in future investigations. To review or delete memories, go to [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Memories{{< /ui >}}][10]. For more information, see [Feedback and memories][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://app.datadoghq.com/apm/services
[3]: https://app.datadoghq.com/monitors/manage?bits_monitors=true
[4]: /bits_ai/bits_investigation/
[5]: https://app.datadoghq.com/bits/autonomous-ops/scopes
[6]: /bits_ai/bits_autonomous_operations/
[7]: /bits_ai/bits_autonomous_operations/#create-a-scope
[8]: /bits_ai/bits_autonomous_operations/#view-and-manage-scopes
[9]: /bits_ai/bits_remediation/
[10]: https://app.datadoghq.com/bits/settings/memories
[11]: /bits_ai/bits_investigation/knowledge_sources/#feedback-and-memories
