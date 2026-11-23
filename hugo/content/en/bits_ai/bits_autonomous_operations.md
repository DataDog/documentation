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

Bits Autonomous Operations (Autonomous Ops) is your agentic SRE teammate that can handle on-call for you. Bits watches a scope that you specify and takes each issue from detection through resolution. Bits triages the issue, investigates the root cause, and then recommends next steps or takes remediation actions within the guardrails that you set. After an action runs, Bits verifies that the issue is resolved.

Autonomous Ops connects [Bits Detection][1], [Bits Investigation][2], and [Bits Remediation][3]. It can handle application issues, such as rising error rates or latency on an endpoint, and infrastructure issues across hosts, containers, and serverless functions.

You can work with Autonomous Ops in Datadog, in Slack, or through the [Datadog MCP Server][4]. 

## Prerequisites

- [Create monitors][7] that alert when your systems might be unhealthy.
- [Enable automatic code fixes][16] to let Bits create pull requests for code fixes.
- To let Bits take infrastructure actions after you approve them:
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
