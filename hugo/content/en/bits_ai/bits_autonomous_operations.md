---
title: Bits Autonomous Operations
description: "Assign ongoing operational work to Bits so it can detect, investigate, and remediate issues in a single operational loop."
further_reading:
- link: "/bits_ai/"
  tag: "Documentation"
  text: "Bits AI Overview"
- link: "/bits_ai/bits_detection/"
  tag: "Documentation"
  text: "Bits Detection"
- link: "/bits_ai/bits_investigation/"
  tag: "Documentation"
  text: "Bits Investigation"
- link: "/bits_ai/bits_remediation/"
  tag: "Documentation"
  text: "Bits Remediation"
---

## Overview

Bits Autonomous Ops lets you assign ongoing operational work to Bits, instead of starting Bits on one incident at a time. Autonomous Ops connects [Bits Detection][1], [Bits Investigation][2], and [Bits Remediation][3] so that Bits can take an issue from detection through resolution.

With Autonomous Ops, Bits watches the system resources, monitor alerts, or Slack channels that you specify. Autonomous Ops handles service degradations, such as rising error rates or latency on an endpoint. It also handles infrastructure issues across Kubernetes, Amazon ECS, AWS Lambda, and hosts.

You can work with Autonomous Ops in Datadog, in Slack, or through the [Datadog MCP Server][4].

## How Autonomous Ops works

For each issue in a scope, Bits:

1. Triages the alert to decide whether it needs action.
1. Investigates the root cause. Bits forms and tests hypotheses using your telemetry and other context, such as service ownership, dependencies, and past investigations. For more information, see [How Bits investigates][5].
1. Recommends next steps, such as sharing the findings in Slack, patching a Kubernetes deployment, or opening a pull request with a code fix. Bits can take remediation actions within the guardrails that you define. For more information, see [Bits Remediation][3].
1. Verifies that the issue is resolved. For more information, see [Validate that issues are resolved][12].

## Prerequisites

Before you create a scope for Autonomous Ops, do the following:

- [Create monitors][7] for the services that you want Bits to cover. Bits triages alerts from these monitors.
- (Recommended) After Bits determines the root cause of an issue, it recommends next steps, such as code fixes or infrastructure actions. By default, you carry out these steps yourself. To let Bits take these actions for you after you approve them, set up each type of action:
  - **Code fixes**: See [Enable automatic code fixes][16].
  - **Infrastructure actions**: See [Infrastructure Actions][17]. Then, [create one or more guardrails][18] to authorize Bits to take action.

  For more information, see [Bits Remediation][3].
- (Recommended) Install the [Slack integration][19] and add Bits to your team's ops channel. With Slack, you can create scopes that watch alerts in a Slack channel, and approve remediation actions from Slack.  

## Create scopes for Autonomous Ops

You enable Autonomous Ops by creating one or more _scopes_. Each scope defines boundaries for where Bits can autonomously detect, triage, investigate, and remediate health and performance issues. For example, a scope can cover the services that your team owns, the monitors for those services, or your team's Slack ops channel.

### Create a scope

These steps describe how to create a scope for Autonomous Ops in Datadog. You can also ask Bits to create a scope from [Bits Chat][6] or Slack.

To create a scope for Autonomous Ops:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} and click {{< ui >}}Enable a DevOps scope{{< /ui >}}.
1. For {{< ui >}}Choose where Bits should work{{< /ui >}}, select what Bits monitors. Then, complete the fields for the option that you chose.
<!-- 1. For {{< ui >}}Choose what Bits should do for you{{< /ui >}}, leave both options selected. With both options selected, Bits detects, triages, and investigates issues in the scope, and proposes remediation actions. To prevent Bits from automatically investigating issues, turn off {{< ui >}}Investigate{{< /ui >}}. -->
1. (Slack channels only) For {{< ui >}}Give Bits guidance on how to operate{{< /ui >}}, describe which alerts are most important to your team.
1. Enter a name for the scope.
1. Click {{< ui >}}Create Scope{{< /ui >}}.

## Manage scopes

### Detection

See your detection coverage, including which services or Slack channels are covered for each scope and which monitors are set up to detect issues.

### Investigation

See all monitors for your defined scopes. For each monitor, trigger an investigation manually on recent alerts, or enable Bits auto-investigations. Review previous investigations and memories Bits saved from those investigations.

## Review Autonomous Ops activity

The {{< ui >}}Activity{{< /ui >}} page shows everything that Bits is working on in Autonomous Ops, including the actions that Bits has taken across your environment.

To review activity:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Activity{{< /ui >}}.
1. On the {{< ui >}}Needs review{{< /ui >}} tab, select the activity that you want to review.
1. Review the hypotheses, conclusion, and next steps from Bits. Use the thumbs-up or thumbs-down buttons to give Bits feedback.
1. For each proposed next step, either approve the action or follow the provided steps to resolve the issue yourself.
1. Click {{< ui >}}Verify resolution{{< /ui >}}. Bits checks whether the issue is resolved.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_detection/
[2]: /bits_ai/bits_investigation/
[3]: /bits_ai/bits_remediation/
[4]: /bits_ai/bits_investigation/mcp_api_cli/
[5]: /bits_ai/bits_investigation/investigate_issues/#how-bits-investigates
[6]: /bits_ai/bits_chat/
[7]: /monitors/configuration/
[12]: /bits_ai/bits_remediation/#validate-that-issues-are-resolved
[16]: /bits_ai/bits_remediation/#enable-automatic-code-fixes
[17]: /bits_ai/bits_remediation/infrastructure_actions/
[18]: /bits_ai/bits_remediation/guardrails/
[19]: /integrations/slack/
