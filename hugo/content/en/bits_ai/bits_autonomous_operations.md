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

Bits Autonomous Operations (Autonomous Ops) connects [Bits Detection][1], [Bits Investigation][2], and [Bits Remediation][3] so that Bits can take an issue from detection through resolution. Autonomous Ops can handle application issues, such as rising error rates or latency on an endpoint, and infrastructure issues across hosts, containers, and serverless functions.

With Autonomous Ops, Bits watches a scope that you specify, and automatically triages and investigates issues in that scope. After Bits determines the root cause of an issue, it recommends next steps. These can be triage actions, such as opening an incident, or remediation actions, such as a code fix or an infrastructure action. You can let Bits take remediation actions within the guardrails that you define. After an action runs, Bits verifies that the issue is resolved.

You can work with Autonomous Ops in Datadog, in Slack, or through the [Datadog MCP Server][4]. 

## Prerequisites

- [Create monitors][7] for the services that you want Bits to cover. Bits triages alerts from these monitors.
- To let Bits create pull requests for code fixes, [enable automatic code fixes][16].
- To let Bits take infrastructure actions after you approve them:
  1. Set up the type of action that you want Bits to take:
     - For Kubernetes, see [Kubernetes actions][20].
     - For Amazon EC2, Amazon ECS, and AWS Lambda, see [AWS actions][21].
  1. [Create one or more guardrails][18] to authorize Bits to take action.
- (Recommended) Install the [Slack integration][19] and add Bits to your team's ops channel. With Slack, you can create scopes that watch alerts in a Slack channel, and approve remediation actions from Slack.

## Scopes

{{< callout url="#" btn_hidden="true" header="false" >}}
Some scope options are in Preview and might not be available in your organization. Contact your account manager for access.
{{< /callout >}}

You enable Autonomous Ops by creating one or more _scopes_. Each scope defines where Bits detects, triages, and investigates health and performance issues: parts of your system, monitor alerts, or a Slack channel. For example, a scope can cover the services that your team owns, the monitors for those services, or your team's Slack ops channel.

### Requirements

Creating and managing scopes requires the following permissions:

- Bits Investigations Read
- Bits Investigations Write
- Monitors Write

For information about the permissions available in Datadog, see [Datadog Role Permissions][9].

### Limitation

After you create a scope for Autonomous Ops, you can't change its type. For example, if you create a scope that watches monitor alerts, you can't edit that scope to watch parts of your system instead. To cover other services, monitors, or Slack channels, create additional scopes.

### Create a scope

These steps describe how to create a scope in Datadog. You can also ask Bits to create a scope from [Bits Chat][6] or Slack.

To create a scope:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} and click {{< ui >}}Create scope{{< /ui >}}.
1. Select the type of scope and complete its fields:
   - {{< ui >}}Watch parts of my system{{< /ui >}}: Enter tags for the resources that you want Bits to watch. Clear any resource types that you want Bits to skip. Then, choose what Bits does in the scope:
     - To turn off automatic investigations, clear {{< ui >}}Investigate{{< /ui >}}.
     - (Preview) To let Bits create and manage monitors for your services, turn on {{< ui >}}Enable Bits Managed Monitors for services{{< /ui >}}.

     <div class="alert alert-info">The Hosts and Serverless resource types are in Preview.</div>

   - {{< ui >}}Watch monitor alerts{{< /ui >}}: Enter a tag or query for the monitors that you want Bits to watch.
   - {{< ui >}}Watch a Slack channel{{< /ui >}}: Select the Slack channel for Bits to join. Optionally, exclude monitors by tag.
1. Under {{< ui >}}Give Bits guidance on how to operate{{< /ui >}}, describe in natural language which alerts are most important to your team.
1. Click {{< ui >}}Create Scope{{< /ui >}}.

After an investigation, Bits creates a remediation plan and can apply it within the [guardrails][18] that you set.

### View and manage scopes

To view your scopes, go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Scopes{{< /ui >}}. For each scope, the list shows its status, what it covers, its most recent issue, and how many runs Bits has for it. From the list, you can search, filter, and pin scopes, and open a scope to review its issues.

The page for each scope lists the issues that Bits handled in the scope, with the triage verdict or remediation steps for each issue. It also shows the scope's configuration. To change a scope's settings, click {{< ui >}}Edit scope{{< /ui >}}.

## Review Autonomous Ops issues

The {{< ui >}}Issues{{< /ui >}} view shows Bits activity on issues across your scopes.

To review issues:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} and click {{< ui >}}Issues{{< /ui >}}. You can also click {{< ui >}}Review issues{{< /ui >}} on a scope in the {{< ui >}}Scopes{{< /ui >}} view.
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
