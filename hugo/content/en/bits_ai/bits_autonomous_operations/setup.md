---
title: Set Up and Manage Bits Autonomous Operations
description: "Create a scope, add guidance, configure remediation approvals, and manage ongoing Bits Autonomous Operations activity and credit usage."
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

Start with a small set of production alerts that your team knows well. Use [Bits Autonomous Operations][1] (Autonomous Ops) to triage those alerts, investigate issues that need attention, and propose next steps. As you review the results, refine the scope and guidance before expanding coverage.

Your existing alert notifications continue to work alongside Bits. You can start with investigations and recommendations, then configure approval-based infrastructure actions when your team is ready.

## Before you begin

- [Create monitors][2] for the systems you want Bits to watch.
- Confirm that you have the permissions to manage scopes: Bits Investigations Read, Bits Investigations Write, and Monitors Write. See [Datadog Role Permissions][3].
- (Recommended) [Set up Bits in Slack][4] if your team reviews alerts there.

Some scope options and remediation capabilities are in Preview. See [Autonomous Ops scopes][5] and [Infrastructure Actions][6] for availability and setup requirements.

## Create your first scope

A scope defines where Bits watches for issues. Start with one team's services, a set of monitors, or an ops channel that has clear ownership.

1. Go to [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Scopes{{< /ui >}}][7] and click {{< ui >}}Create scope{{< /ui >}}.
1. Choose the scope type. Select resources by tag, monitors by tag or query, or a Slack channel.
1. Add guidance about the alerts your team prioritizes and the runbooks Bits should follow. See [Add guidance](#add-guidance).
1. Select the Slack channels where Bits posts activity for the scope.
1. Click {{< ui >}}Create Scope{{< /ui >}}.

For all scope options, including Bits-managed monitors, see [Create a scope][8].

### Add guidance

Give Bits the context you would share with an engineer joining your on-call rotation. Describe:

- Which customer workflows and services matter most.
- What to check when an alert fires, such as recent deployments or dependencies.
- Runbooks to follow and information your team needs when reviewing an issue.

For example:

> Prioritize production errors affecting checkout. Check recent deployments and upstream dependencies. Follow the checkout incident runbook, and include the affected services and customer impact in the investigation conclusion.

Guidance provides operational context. [Guardrails][9] determine which infrastructure actions Bits can run and who can approve them.

## Set credit limits

Autonomous Ops activity consumes [AI Credits][10]. To view and change credit limits, you need the `billing_edit` permission.

In [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Credit Usage{{< /ui >}}][11], configure the limits that fit your rollout:

- A default quota for each scope.
- An override for an individual scope.
- A total quota for Autonomous Ops activity.

Review the organization-wide limit as well. Usage from Autonomous Ops is attributed to {{< ui >}}Autonomous Agents{{< /ui >}}. For more information, see [AI Credit Limits][12].

When a scope reaches its quota, it finishes work already in progress and pauses new runs. Increase the applicable limit or wait for the next billing cycle to resume new runs. AI Credits reset on the first day of each calendar month.

## Enable remediation with approval

This step is optional. Bits can investigate and recommend next steps before you configure infrastructure actions.

One-click infrastructure actions are in Preview. To let Bits run supported Kubernetes or AWS actions after approval:

1. Follow the setup instructions for [Kubernetes actions][13] or [AWS actions][14]. Kubernetes actions require an ownerless Private Action Runner. AWS actions require the Datadog AWS integration and IAM permissions for the actions you enable.
1. [Create an {{< ui >}}Ask{{< /ui >}} guardrail][15] that covers the actions and target resources. Choose the people, teams, or roles that can approve them.
1. Turn on {{< ui >}}Notify when approval is needed{{< /ui >}} and select the Slack channel for approval requests. To approve from Slack, approvers must link their Slack accounts to Datadog.
1. Open an investigation with a supported infrastructure action. Confirm that an authorized approver can use {{< ui >}}Approve{{< /ui >}} for an action covered by the guardrail.

Creating guardrails and approving actions require additional permissions. See [Bits Guardrails requirements][16].

To let Bits propose code fixes through pull requests, [set up automatic code fixes][17]. Review and merge those pull requests through your team's code review process.

## Review issues and verify recovery

1. Go to [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Issues{{< /ui >}}][18], or open a scope and click {{< ui >}}Review issues{{< /ui >}}.
1. Review the triage verdict. Bits checks impact, whether the issue persists, and whether it duplicates an issue already under investigation. Verdicts include {{< ui >}}Action required{{< /ui >}}, {{< ui >}}Watching{{< /ui >}}, {{< ui >}}Dismissed{{< /ui >}}, and {{< ui >}}Inconclusive{{< /ui >}}.
1. Open an issue to review the investigation, including the root cause, impact, and supporting evidence.
1. Under {{< ui >}}Remediation{{< /ui >}}, review the proposed next steps. Approve an infrastructure action when it is appropriate, or follow the instructions to resolve the issue yourself.
1. Review whether the issue is resolved after Bits runs an action. To check recovery manually, click {{< ui >}}Verify resolution{{< /ui >}}. If the monitor has not recovered, check again after it recovers. See [Validate that issues are resolved][19].
1. Use the thumbs-up or thumbs-down buttons to give feedback on the conclusion and proposed next steps.

## Manage ongoing activity

Use the [{{< ui >}}Scopes{{< /ui >}} view][7] to search, filter, and pin scopes relevant to your team. Open a scope to review recent activity and configuration, or click {{< ui >}}Edit scope{{< /ui >}} to update its settings.

As your team uses Autonomous Ops:

- Review issues that need attention and decide whether to approve proposed actions.
- Refine guidance when investigations miss context or prioritize the wrong issues.
- Check [Action History][20] for the actions Bits ran, their results, the applicable guardrails, and who approved them.
- Review credit usage and applicable limits before expanding coverage.
- Add scopes as your team gains confidence in the investigations and remediation results.

A scope's type cannot change after creation. Create another scope to watch a different type of source.

## Troubleshoot setup

### The Approve button is unavailable

Confirm that a guardrail covers both the action and target resource, and that the approver has the required permissions and is named on the guardrail. See [Bits Guardrails][9].

### An action requires a connection

For Kubernetes actions, confirm that an ownerless Private Action Runner is active and configured for the target environment. For AWS actions, check the integration and IAM permissions. See [Infrastructure Actions][6].

### A recommendation only shows commands

A one-click action might not be available for the recommendation. Review and run the commands with your own access, following your team's operational procedures.

### Approval requests do not appear in Slack

Enable notifications on the {{< ui >}}Ask{{< /ui >}} guardrail and check the selected workspace and channel. For private channels, invite Datadog to the channel. See [Create a guardrail][15].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_autonomous_operations/
[2]: /monitors/configuration/
[3]: /account_management/rbac/permissions/
[4]: /bits_ai/bits_chat/usage/#slack
[5]: /bits_ai/bits_autonomous_operations/#scopes
[6]: /bits_ai/bits_remediation/infrastructure_actions/
[7]: https://app.datadoghq.com/bits/autonomous-ops/scopes
[8]: /bits_ai/bits_autonomous_operations/#create-a-scope
[9]: /bits_ai/bits_remediation/guardrails/
[10]: /account_management/billing/ai_credits/
[11]: https://app.datadoghq.com/bits/settings/usage
[12]: /account_management/billing/ai_credit_limits/
[13]: /bits_ai/bits_remediation/infrastructure_actions/#kubernetes-actions
[14]: /bits_ai/bits_remediation/infrastructure_actions/#aws-actions
[15]: /bits_ai/bits_remediation/guardrails/#create-a-guardrail
[16]: /bits_ai/bits_remediation/guardrails/#requirements
[17]: /bits_ai/bits_remediation/#enable-automatic-code-fixes
[18]: https://app.datadoghq.com/bits/autonomous-ops/activity
[19]: /bits_ai/bits_remediation/#validate-that-issues-are-resolved
[20]: https://app.datadoghq.com/bits-ai/settings/action-history
