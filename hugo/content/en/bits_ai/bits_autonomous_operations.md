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

<!-- DRAFT: Working draft for DOCS-16289. -->

## Overview

Bits Autonomous Operations (Autonomous Ops) lets you assign ongoing operational work to Bits, instead of starting Bits on one incident at a time. Autonomous Ops connects [Bits Detection][1], [Bits Investigation][2], and [Bits Remediation][3] so that Bits can take an issue from detection through resolution.

With Autonomous Ops, Bits watches the system resources, monitor alerts, or Slack channels that you specify. Autonomous Ops handles service degradations, such as rising error rates or latency on an endpoint. It also handles infrastructure issues across Kubernetes, Amazon ECS, AWS Lambda, and hosts.

You can work with Autonomous Ops in Datadog, in Slack, or through the [Datadog MCP Server][4].

## How Autonomous Ops works

### Triage

Bits detects issues from your existing telemetry and alerts, and adds monitoring where coverage is missing.

When alerts fire in a scope that Bits watches, Bits triages them first. For example, if several related alerts fire in a Slack channel, Bits groups the duplicates and starts one investigation instead of several.

### Investigate

Bits starts the investigation from the alert that triggered it. Bits then forms and tests hypotheses using your telemetry and other context, such as service ownership, dependencies, and past investigations. Bits summarizes its findings in a conclusion with the most likely root cause, the impact, and recommended next steps. To ask follow-up questions, use the chat panel in the investigation.

For more information, see [How Bits investigates][5].

### Remediate

Bits turns the investigation into recommended next steps. For example, Bits might recommend sharing the findings in Slack, patching a Kubernetes deployment, or opening a pull request with a code fix.

For more information, see [Bits Remediation][3].

### Verify

After a remediation action runs, Bits checks whether the issue is resolved. For more information, see [Validate that issues are resolved][12].

## Requirements

Autonomous Ops uses Bits Detection, Bits Investigation, and Bits Remediation, so the requirements for each product apply:

- **Bits Detection**: See [Enable Bits Detection][13].
- **Bits Investigation**: See [Supported monitors][14] and [Supported data sources][15].
- **Bits Remediation**: To let Bits take remediation actions, complete the setup for each type of action. See [Enable Bits to take remediation actions](#enable-bits-to-take-remediation-actions).

<!-- TODO: Confirm requirements specific to Autonomous Ops, such as:
- Permissions to create and manage scopes
- The Slack integration, for scopes that watch a Slack channel
- Whether creating a scope enables automatic investigations or Bits Detection
- Datadog site availability
-->

## Create scopes for Autonomous Ops

You enable Autonomous Ops by creating scopes. For each scope that you create, Bits detects, triages, and optionally investigates health and performance issues. In each scope, you define what Bits watches, choose what Bits is allowed to do, and give Bits guidance on how to operate.

### Create a scope in Datadog

To create a scope for Autonomous Ops from the UI:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} and click {{< ui >}}Enable a DevOps scope{{< /ui >}}.
1. For {{< ui >}}Choose where Bits should work{{< /ui >}}, select whether Bits watches system resources, monitor alerts, or a Slack channel. Then complete the fields for the option that you chose.
1. For {{< ui >}}Choose what Bits should do for you{{< /ui >}}, leave both options selected. With both options selected, Bits detects, triages, and investigates issues in the scope, and proposes remediations. To prevent Bits from investigating issues and proposing remediations, turn off {{< ui >}}Investigate{{< /ui >}}.
1. (Slack channels only) For {{< ui >}}Give Bits guidance on how to operate{{< /ui >}}, describe which alerts are most important to your team. To add more guidance, click {{< ui >}}Add a Runbook step{{< /ui >}}.
1. Enter a name for the scope.
1. Click {{< ui >}}Create Scope{{< /ui >}}.

### Create a scope from Bits Chat or Slack

You can also ask Bits to create a scope from [Bits Chat][6] or Slack. Tell Bits which Slack channels, services, or monitors to watch, and Bits creates the scope and starts triaging and investigating issues in it.

<!-- TODO: Add an example prompt and confirm the supported options. -->

## Manage scopes

### Detection

See your detection coverage, including which services or Slack channels are covered for each scope and which monitors are set up to detect issues.

### Investigation

See all monitors for your defined scopes. For each monitor, trigger an investigation manually on recent alerts, or enable Bits auto-investigations. Review previous investigations and memories Bits saved from those investigations.

## Enable Bits to take remediation actions

After Bits determines the root cause of an issue, it recommends next steps in the investigation, such as code fixes, triage actions, and infrastructure actions. By default, you carry out these steps yourself. To let Bits take these actions for you after you approve them, set up each type of remediation action that you want Bits to take.

For setup steps, see [Bits Remediation][3].

## Review and approve activity

The {{< ui >}}Activity{{< /ui >}} page shows everything that Bits is working on in Autonomous Ops, and the actions that Bits has taken across your environment.

To review and approve activity:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Activity{{< /ui >}}.
1. On the {{< ui >}}Needs review{{< /ui >}} tab, select the activity that you want to review.
1. Review the hypotheses, conclusion, and next steps from Bits. Use the thumbs-up or thumbs-down buttons to give Bits feedback.
1. For each proposed next step, either approve the action or follow the provided steps to resolve the issue yourself.
1. Click {{< ui >}}Verify resolution{{< /ui >}}. Bits checks whether the issue is resolved.

## Improve Autonomous Ops

Bits learns from your feedback. When you correct a conclusion with the actual root cause and supporting evidence, Bits saves that context as a memory. Bits applies memories in future investigations. Anywhere you see {{< ui >}}Review and help Bits learn{{< /ui >}}, you can give this feedback. For more information, see [Feedback and memories][8].

You can also improve Autonomous Ops by:

- Adding organization-specific instructions to [`bits.md`][9]. Use the snippets provided in the UI for suggestions.
- Creating or updating skills in the [Skills Library][10] for Bits to use during any phase of the operational loop.
- Linking runbooks or Confluence pages in your monitor messages.
- Connecting GitHub for source code and deployment context.
- Connecting third-party observability tools for more telemetry.
- Giving thumbs-up or thumbs-down feedback on the conclusion of an investigation.

For more ways to improve results, see [Improve Bits Investigation Accuracy][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_detection/
[2]: /bits_ai/bits_investigation/
[3]: /bits_ai/bits_remediation/
[4]: /bits_ai/bits_investigation/mcp_api_cli/
[5]: /bits_ai/bits_investigation/investigate_issues/#how-bits-investigates
[6]: /bits_ai/bits_chat/
[8]: /bits_ai/bits_investigation/knowledge_sources/#feedback-and-memories
[9]: /bits_ai/bits_investigation/knowledge_sources/#bitsmd
[10]: /bits_ai/skills_library/
[11]: /bits_ai/bits_investigation/improve_accuracy/
[12]: /bits_ai/bits_remediation/#validate-that-issues-are-resolved
[13]: /bits_ai/bits_detection/#enable-bits-detection
[14]: /bits_ai/bits_investigation/investigate_issues/#supported-monitors
[15]: /bits_ai/bits_investigation/investigate_issues/#supported-data-sources
