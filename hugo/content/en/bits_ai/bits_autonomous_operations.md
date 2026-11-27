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

With Autonomous Operations, Bits joins your team as a first responder for production alerts: Bits triages alerts, investigates the issues that need attention, and proposes next steps. When a remediation action is approved, Bits runs it and verifies whether the issue is resolved, reducing the time from alert to resolution and keeping your systems healthy.

Autonomous Ops connects [Bits Detection][1], [Bits Investigation][2], and [Bits Remediation][3]. It can handle application issues, such as rising error rates or latency on an endpoint, and infrastructure issues across hosts, containers, and serverless functions.

You can work with Autonomous Ops in Datadog, in Slack, or through the [Datadog MCP Server][4]. 

## Prerequisites

- [Create monitors][7] that alert when your systems might be unhealthy.
- (Optional) [Enable automatic code fixes][16] to let Bits create pull requests for code fixes.
- (Optional) To let Bits take infrastructure actions after you approve them:
  1. Set up the type of action that you want Bits to take:
     - For Kubernetes, see [Kubernetes actions][20].
     - For Amazon EC2, Amazon ECS, and AWS Lambda, see [AWS actions][21].
  1. [Create one or more guardrails][18] to authorize Bits to take action.
- (Recommended) Install the [Slack integration][19] and add Bits to your team's ops channel.

## Scopes

{{< callout url="#" btn_hidden="true" header="false" >}}
Some scope options are in Preview and might not be available in your organization. Contact your account manager for access.
{{< /callout >}}

You enable Autonomous Ops by creating one or more _scopes_. Each scope defines where Bits detects, triages, and investigates health and performance issues.

### Requirements

Creating and managing scopes requires the following permissions:

- Bits Investigations Read
- Bits Investigations Write
- Monitors Write

For information about the permissions available in Datadog, see [Datadog Role Permissions][9].

### Create a scope

These steps describe how to create a scope in Datadog. You can also ask Bits to create a scope from [Bits Chat][6], Slack, or the [Datadog MCP Server][4].

To create a scope:

1. Go to [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}}][24] and click {{< ui >}}Create scope{{< /ui >}}.
1. Select the type of scope and complete its fields:

   | Scope type | How to configure |
   |---|---|
   | {{< ui >}}Watch&nbsp;parts&nbsp;of&nbsp;my&nbsp;system{{< /ui >}} | <ol><li>Enter tags for the resources that you want Bits to watch.</li><li>Clear any resource types that you want Bits to skip.<div class="alert alert-info">The Hosts and Serverless resource types are in Preview.</div></li><li>(Optional) To turn off automatic investigations, clear {{< ui >}}Investigate{{< /ui >}}.</li><li>(Optional) (Preview) To let Bits create and manage monitors for your services, turn on {{< ui >}}Enable Bits Managed Monitors for services{{< /ui >}}.</li></ol> |
   | {{< ui >}}Watch&nbsp;monitor&nbsp;alerts{{< /ui >}} | Enter a tag or query for the monitors that you want Bits to watch. |
   | {{< ui >}}Watch&nbsp;a&nbsp;Slack&nbsp;channel{{< /ui >}} | Select the Slack channel for Bits to join. Optionally, exclude monitors by tag. |

1. Describe in natural language which alerts are most important to your team. You can also add specific runbook steps for Bits to follow.
1. Configure Bits to post to one or more Slack channels when there is activity in this scope.
1. Click {{< ui >}}Create Scope{{< /ui >}}.

   After you create a scope, Bits watches the monitors or Slack channel in the scope for issues. Bits triages and investigates issues, then creates a remediation plan. Bits can apply the remediation plan within the [guardrails][18] that you set.

For information about how to add a quote for AI credit usage to your scopes, see the [Manage credit usage](#manage-credit-usage) section.

### Scope query syntax

For a {{< ui >}}Watch monitor alerts{{< /ui >}} scope, enter a tag or query to select monitors. Scope queries use the [Events search syntax][35], not the Manage Monitors search syntax.

| To select | Example |
|---|---|
| Monitors with a tag | `team:payments` |
| Monitors with a tag value that starts with a prefix | `team:payments*` |
| Monitors that notify a specific recipient | `@monitor_notifications:<HANDLE>` |
| Monitors that notify any of several recipients | `@monitor_notifications:(<HANDLE_1> OR <HANDLE_2>)` |
| Monitors that match several filters | `env:prod AND @monitor_notifications:<HANDLE>` |
| Monitors with a tag, excluding another tag | `team:payments -env:staging` |

Keep the following in mind:

- Notification recipients don't support wildcards. A query such as `@monitor_notifications:oncall-*` is rejected. List each handle in an `OR` group, or add a shared tag to the monitors and select that tag.
- Text without a field name, such as `checkout`, matches service names. Scope queries can't filter on the contents of a monitor's notification message. To select monitors by message content, tag those monitors and select the tag.

As you enter a query, the create form lists the monitors that match it. Review the matches before you save the scope. To preview matching monitors outside the create form, use the MCP tool [`preview_bits_detection_scope`][28].

<!-- TODO(reviewer): Confirm that Watch monitor alerts supports priority:p1 for P1 monitors; the public monitor search example does not establish scope query support. -->
<!-- TODO(reviewer): Confirm whether priority:p1 team:payments is supported and how to troubleshoot a scope preview with no matches when combining priority with other filters. -->

### View and manage scopes

To view your scopes, go to [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Scopes{{< /ui >}}][24]. For each scope, the list shows its status, what it covers, its most recent Bits activity, and how many runs Bits has for it. From the list, you can search, filter, and pin scopes, and open a scope to review its recent Bits activity.

The page for each scope lists recent Bits activity in the scope, with the triage verdict or remediation steps for each item. It also shows the scope's configuration. To change a scope's settings, click {{< ui >}}Edit scope{{< /ui >}}.

<div class="alert alert-info">After you create a scope, you can't change its type. For example, if you create a scope that watches monitor alerts, you can't edit that scope to watch parts of your system instead. To cover other services, monitors, or Slack channels, create additional scopes.</div>

## Manage credit usage

Autonomous Ops activity consumes [AI Credits][22].

To control how many AI Credits your scopes can use, set quotas in [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Credit Usage{{< /ui >}}][23].

You can set:

- A default quota that applies to each scope
- A quota for an individual scope
- A total quota for all Autonomous Ops activity

## Review Bits activity

The Autonomous Ops {{< ui >}}Issues{{< /ui >}} view shows Bits activity across your scopes.

To review Bits activity:

1. Go to [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Issues{{< /ui >}}][25]. You can also click {{< ui >}}Review issues{{< /ui >}} on a scope in the {{< ui >}}Scopes{{< /ui >}} view.
1. Find the issue that you want to review. To narrow the list, edit the search query, click {{< ui >}}Filters{{< /ui >}}, or change the time range.
1. Click the issue to open the investigation. Review the triage decision, the hypotheses that Bits tested, and the conclusion, which includes the root cause and impact.
1. Under {{< ui >}}Remediation{{< /ui >}}, review the next steps from Bits. For each step, either approve the action or follow the provided steps to resolve the issue yourself.
1. After the fixes are applied, click the {{< ui >}}Verify resolution{{< /ui >}} next step. Bits checks whether the issue is resolved. For more information, see [Validate that issues are resolved][12].
1. (Recommended) Use the thumbs-up or thumbs-down buttons on the conclusion and the next steps to give Bits feedback on the investigation.

## Adoption best practices

- **Start with a focused scope.** Choose one team's services, a set of production monitors, or an ops channel with clear ownership. Avoid mixing unrelated services and response procedures during the initial rollout.
- **Provide operational context.** Describe important customer workflows, checks to perform when an alert fires, and runbooks to follow. Update scope guidance when investigations miss context or focus on the wrong issues.
- **Review results before expanding coverage.** Check whether Bits prioritizes meaningful issues, supports its conclusions with evidence, and proposes appropriate fixes. Use feedback to refine guidance, and review credit usage before adding scopes.

For example, add scope guidance such as:

> Prioritize production errors affecting checkout. Check recent deployments and upstream dependencies. Follow the checkout incident runbook, and include the affected services and customer impact in the investigation conclusion.

## Frequently asked questions

### Do existing alert notifications continue?

Yes. Bits triages alerts alongside your existing notifications. Keep your team's notification and response procedures in place as you evaluate Autonomous Ops. If your team works in Slack, see [Set up Bits in Slack][26].

### Can investigations run without remediation actions?

Yes. You can use investigations and recommendations without enabling one-click infrastructure actions. Configure those actions when your team is ready. See [Infrastructure Actions][27] for requirements.

### What controls which actions Bits can run?

[Guardrails][18] define which infrastructure actions Bits can run, the resources they apply to, and who can approve them. A guardrail must cover both the action and its target resource. An {{< ui >}}Ask{{< /ui >}} guardrail requires approval from a designated approver before Bits runs an action. Scope guidance does not grant that authorization.

### How does this differ from automatic investigations on individual monitors?

[Scopes](#scopes) let you manage automated work across resources, monitor queries, or Slack channels, with shared guidance for the scope. Define coverage around your team's operational responsibilities instead of configuring automated work monitor by monitor.

### What happens to monitors with Auto-Investigate turned on?

Per-monitor Auto-Investigate settings are not converted to scopes. Monitors that already have Auto-Investigate turned on keep starting investigations until you turn it off. You can't turn on Auto-Investigate for additional individual monitors. To start automatic investigations for other monitors, [create a scope](#create-a-scope).

If your organization has monitors with Auto-Investigate turned on, you can view and turn them off in [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Manage Legacy Investigations{{< /ui >}}][36].

<!-- TODO(reviewer): Confirm with the Autonomous Ops team whether a retirement date for per-monitor Auto-Investigate will be announced. -->

### Does every alert in a scope start an investigation?

Bits triages alerts and investigates issues that need action. To review triage decisions, see [Review Bits activity][32] and [View and manage scopes][33].

<!-- TODO(reviewer): Confirm the triage verdict labels and behavior before adding a verdict table: only Action required proceeds to investigation; Watching alerts are re-checked; Dismissed and Inconclusive stop at triage. Distinguish the Inconclusive triage verdict from an inconclusive investigation conclusion. -->
<!-- TODO(reviewer): Confirm whether there is no scope option to always investigate every alert, regardless of the triage verdict. -->
<!-- TODO(reviewer): Confirm whether scope guidance and runbook steps inform the investigation itself as well as triage. -->

### Can I use Microsoft Teams?

For setup instructions, see [Send investigation findings to Microsoft Teams][29] and [Use Bits Chat in Microsoft Teams][30]. Bits Chat in Microsoft Teams cannot start or steer investigations.

<!-- TODO(reviewer): Confirm support for scope notifications, Autonomous Ops notifications, and remediation approvals in Microsoft Teams, and document any limitations. Confirm Preview status for investigation findings and Bits Chat in Teams; the linked pages do not label these features as Preview. -->

### How do triage and investigations consume AI Credits?

Autonomous Ops activity consumes [AI Credits][22]. To control usage, see [Manage credit usage][34].

<!-- TODO(reviewer): Confirm how triage, Watching re-checks, and investigations consume AI Credits, including alerts that stop at triage. Add only publicly approved billing details. -->

### Can I manage scopes programmatically?

The Datadog MCP Server's `investigator` toolset includes tools to [list, inspect, preview, create, update, and delete scopes][31]. These scope tools are separate from tools that trigger an individual investigation.

Scopes are not available through the Datadog API or the Datadog Terraform provider.

### What happens when a scope reaches its credit limit?

The scope completes work already in progress and pauses new runs until the applicable limit increases or the next billing cycle begins. For instructions on managing quotas, see [Manage credit usage](#manage-credit-usage).

### What if Bits dismisses an important alert or recommends an inappropriate action?

Review the alert and relevant telemetry using your team's response procedures, and update scope guidance with missing context. For investigations, give feedback using the [review workflow](#review-bits-activity). If a proposed action is inappropriate, do not approve it; follow your team's procedures to resolve the issue.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_detection/
[2]: /bits_ai/bits_investigation/
[3]: /bits_ai/bits_remediation/
[4]: /mcp_server/
[6]: /bits_ai/bits_chat/
[7]: /monitors/configuration/
[9]: /account_management/rbac/permissions/
[12]: /bits_ai/bits_remediation/#validate-that-issues-are-resolved
[16]: /bits_ai/bits_remediation/#enable-automatic-code-fixes
[18]: /bits_ai/bits_remediation/guardrails/
[19]: /integrations/slack/
[20]: /bits_ai/bits_remediation/infrastructure_actions/#kubernetes-actions
[21]: /bits_ai/bits_remediation/infrastructure_actions/#aws-actions
[22]: /account_management/billing/ai_credits/
[23]: https://app.datadoghq.com/bits/settings/usage
[24]: https://app.datadoghq.com/bits/autonomous-ops/scopes
[25]: https://app.datadoghq.com/bits/autonomous-ops/activity
[26]: /bits_ai/bits_chat/usage/#slack
[27]: /bits_ai/bits_remediation/infrastructure_actions/
[28]: /mcp_server/tools/#preview_bits_detection_scope
[29]: /bits_ai/bits_investigation/configure/#microsoft-teams
[30]: /bits_ai/bits_chat/usage/#microsoft-teams
[31]: /mcp_server/tools/#list_bits_detection_scopes
[32]: #review-bits-activity
[33]: #view-and-manage-scopes
[34]: #manage-credit-usage
[35]: /events/explorer/searching/
[36]: https://app.datadoghq.com/bits/settings/legacy-monitor-investigations
