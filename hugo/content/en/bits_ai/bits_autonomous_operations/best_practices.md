---
title: Best Practices for Adopting Bits Autonomous Operations
description: "Start with focused scopes, write useful guidance, review outcomes, and find answers to common questions about adopting Bits Autonomous Operations."
further_reading:
- link: "/bits_ai/bits_autonomous_operations/"
  tag: "Documentation"
  text: "Bits Autonomous Operations"
- link: "/bits_ai/bits_remediation/guardrails/"
  tag: "Documentation"
  text: "Bits Guardrails"
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
---

## Overview

Adopt Bits Autonomous Operations (Autonomous Ops) gradually, starting with alerts your team knows well. Use the recommendations below to evaluate results and decide where to expand coverage. For prerequisites and setup instructions, see [Bits Autonomous Operations][1].

## Start with a focused scope

Choose one team's services, a set of production monitors, or an ops channel with clear ownership. Start with alerts that your team can assess against known incidents and runbooks. This makes it easier to judge whether Bits identifies the issues that matter.

Avoid broad scopes that mix unrelated services and response procedures during the initial rollout. Expand coverage after the team has reviewed investigations and understands where Bits is useful. See [Create a scope][2] for configuration options.

## Write guidance that adds context

Give Bits the context you would share with an engineer joining your on-call rotation:

- Which customer workflows and services matter most.
- What to check when an alert fires, such as recent deployments or dependencies.
- Which runbooks to follow and what information helps your team assess an issue.

For example:

> Prioritize production errors affecting checkout. Check recent deployments and upstream dependencies. Follow the checkout incident runbook, and include the affected services and customer impact in the investigation conclusion.

Update guidance when investigations miss context or focus on the wrong issues. Guidance provides operational context; it does not grant permission to run infrastructure actions. See [What controls which actions Bits can run?](#what-controls-which-actions-bits-can-run).

## Introduce remediation with approval

Review proposed fixes with the engineers who own the affected services. Start with actions whose effects and recovery procedures your team understands. Use {{< ui >}}Ask{{< /ui >}} guardrails so designated approvers can review each action before Bits runs it.

For configuration and permission requirements, see [Bits Guardrails][3] and [Infrastructure Actions][4].

## Review outcomes before expanding coverage

Review a sample of activity from the initial scope and assess:

- Whether the issues Bits prioritizes need your team's attention.
- Whether the investigation conclusions include evidence that supports the proposed root cause.
- Whether proposed actions are appropriate and resolve the issue when applied.
- What context your team still needs to supply.

Use those findings to refine guidance and decide which services or alerts to add next. See [Review Bits activity][5] for the review workflow and [Action History][6] for records of actions Bits ran.

## Plan credit usage as coverage grows

Review credit usage during the initial rollout and before expanding coverage. Choose limits that fit the operational work your team wants Bits to handle. See [Manage credit usage][7] for scope quotas and [AI Credit Limits][8] for organization-wide controls and usage attribution.

## Frequently asked questions

### Do existing alert notifications continue?

Yes. Bits triages alerts alongside your existing notifications. Keep your team's notification and response procedures in place as you evaluate Autonomous Ops. If your team works in Slack, see [Set up Bits in Slack][9].

### Can investigations run without remediation actions?

Yes. You can use investigations and recommendations without enabling one-click infrastructure actions. Configure those actions when your team is ready, following the requirements in [Infrastructure Actions][4].

### What controls which actions Bits can run?

[Guardrails][3] define which infrastructure actions Bits can run, the resources they apply to, and who can approve them. A guardrail must cover both the action and its target resource. An {{< ui >}}Ask{{< /ui >}} guardrail requires approval from a designated approver before Bits runs an action. Adding scope guidance does not grant that authorization.

### How does this differ from automatic investigations on individual monitors?

Autonomous Ops scopes let you manage automated work across resources, monitor queries, or Slack channels, with shared guidance for the scope. This lets you define coverage around your team's operational responsibilities instead of configuring automated work monitor by monitor. See [Scopes][10] for the available options.

### What happens when a scope reaches its credit limit?

The scope completes work already in progress and pauses new runs until the applicable limit increases or the next billing cycle begins. For instructions on managing quotas, see [Manage credit usage][7].

### What if Bits dismisses an important alert or recommends an inappropriate action?

Review the alert and relevant telemetry using your team's response procedures. Update scope guidance with missing context. For investigations, give feedback on the conclusion and proposed next steps using the [review workflow][5]. If a proposed action is inappropriate, do not approve it; follow your team's procedures to resolve the issue.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_autonomous_operations/
[2]: /bits_ai/bits_autonomous_operations/#create-a-scope
[3]: /bits_ai/bits_remediation/guardrails/
[4]: /bits_ai/bits_remediation/infrastructure_actions/
[5]: /bits_ai/bits_autonomous_operations/#review-bits-activity
[6]: /bits_ai/bits_remediation/#review-action-history
[7]: /bits_ai/bits_autonomous_operations/#manage-credit-usage
[8]: /account_management/billing/ai_credit_limits/
[9]: /bits_ai/bits_chat/usage/#slack
[10]: /bits_ai/bits_autonomous_operations/#scopes
