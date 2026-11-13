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

Bits Autonomous Operations (Autonomous Ops) connects [Bits Detection][1], [Bits Investigation][2], and [Bits Remediation][3] so that Bits can take an issue from detection through resolution.

With Autonomous Ops, Bits watches a scope that you specify, and automatically triages and investigates issues in that scope. After Bits determines the root cause of an issue, it recommends next steps. These can be triage actions, such as opening an incident, or remediation actions, such as a code fix or an infrastructure action. You can let Bits take remediation actions within the guardrails that you define. After an action runs, Bits verifies that the issue is resolved.

Autonomous Ops handles application issues, such as rising error rates or latency on an endpoint, and infrastructure issues across hosts, containers, and serverless functions.

You can work with Autonomous Ops in Datadog, in Slack, or through the [Datadog MCP Server][4].

## Limitations

- After you create a scope for Autonomous Ops, you can't change its type. For example, if you create a scope that watches monitor alerts, you can't edit that scope to watch parts of your system instead. To cover other services, monitors, or Slack channels, create additional scopes. 

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
Some scope options are in Preview. Steps marked <strong>(Preview)</strong> might not be available in your organization. Contact your account manager for access.
{{< /callout >}}

You enable Autonomous Ops by creating one or more _scopes_. Each scope defines the specific system resources, monitor alerts, or Slack channels where Bits detects, triages, and investigates health and performance issues. For example, a scope can cover the services that your team owns, the monitors for those services, or your team's Slack ops channel.

### Requirements

Creating and managing scopes requires the following permissions:

- Bits Investigations Read
- Bits Investigations Write
- Monitors Write

For information about the permissions available in Datadog, see [Datadog Role Permissions][9].

### Create a scope

These steps describe how to create a scope in Datadog. You can also ask Bits to create a scope from [Bits Chat][6] or Slack.

To create a scope:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} and click {{< ui >}}Enable a DevOps scope{{< /ui >}}.
1. For {{< ui >}}Choose where Bits should work{{< /ui >}}, select where you want Bits to watch for issues. Then, complete the fields for the type of scope that you chose.
1. (Preview) To prevent Bits from automatically investigating issues, turn off {{< ui >}}Investigate{{< /ui >}} under {{< ui >}}Choose what Bits should do for you{{< /ui >}}.
1. (Preview) Toggle the {{< ui >}}Enable Bits Managed Monitors for services{{< /ui >}} option to control if Bits can create and manage additional monitors for this scope.
1. For {{< ui >}}Give Bits guidance on how to operate{{< /ui >}}, provide additional instructions to Bits in natural language. For example, you can describe which alerts are most important to your team.
1. Click {{< ui >}}Create Scope{{< /ui >}}.

### View and manage scopes

After you create a scope, you can review its coverage and findings, and change its settings.

To view and manage a scope:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Manage Scopes{{< /ui >}}.
1. In the {{< ui >}}Detection{{< /ui >}} table, click the scope that you want to view. A details panel opens.

    From the details panel, you can:

    - **Rename the scope**: Click {{< ui >}}Rename{{< /ui >}} next to the scope name.
    - **Add alert notifications**: Click {{< ui >}}Add Notifications{{< /ui >}}.
    - **Turn automatic investigations on or off**: Use the {{< ui >}}Auto Investigate{{< /ui >}} toggle. When it's enabled, Bits automatically starts an investigation when an alert fires in the scope.
    - **Review what the scope covers**: Use the tabs in the panel:
      - {{< ui >}}Covered Infrastructure{{< /ui >}}: The services that the scope covers.
      - {{< ui >}}Current Monitors{{< /ui >}}: The monitors that Bits watches in the scope.
      - {{< ui >}}Findings{{< /ui >}}: The issues that Bits found in the scope. Open issues appear under {{< ui >}}Needs Your Attention{{< /ui >}}, and other issues, such as resolved issues, appear under {{< ui >}}Other Issues{{< /ui >}}. For each issue, click {{< ui >}}Investigate this{{< /ui >}} to start an investigation, or {{< ui >}}Review fix{{< /ui >}} to review the fix that Bits proposed.
    - **Edit the scope**: Click {{< ui >}}Edit{{< /ui >}} to open the scope in the edit view.
    - **Delete the scope**: Click {{< ui >}}Delete{{< /ui >}}.

### View all monitors

The {{< ui >}}Investigation{{< /ui >}} tab lists the monitors that Bits Investigation supports. From this tab, you can start an investigation for a recent alert, turn on automatic investigations, and review past investigations and memories for each monitor.

To view all monitors:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Manage Scopes{{< /ui >}}.
1. Click the {{< ui >}}Investigation{{< /ui >}} tab.
1. (Optional) To narrow the list, search for a monitor or use the filters, such as {{< ui >}}Service{{< /ui >}} or {{< ui >}}Team{{< /ui >}}. To show only monitors with automatic investigations turned on, turn on {{< ui >}}Auto-Investigate Only{{< /ui >}}.

For each monitor in the list, you can:

- **Investigate a recent alert**: Click {{< ui >}}Investigate{{< /ui >}} to see the monitor's recent alerts. Then, click {{< ui >}}Investigate{{< /ui >}} next to the alert that you want Bits to investigate. If the monitor has no recent alerts, the button shows {{< ui >}}No Recent Alerts{{< /ui >}}.
- **Turn automatic investigations on or off**: Use the {{< ui >}}Auto-Investigate{{< /ui >}} toggle. When it's on, Bits automatically starts an investigation when the monitor alerts.
- **Review past investigations**: The {{< ui >}}Total Investigations{{< /ui >}} column shows how many investigations Bits has run for the monitor. Click the count to see them.
- **View memories**: To see what Bits learned from past investigations of the monitor, click the more options menu ({{< ui >}}⋮{{< /ui >}}). Then, click {{< ui >}}View Memories{{< /ui >}}. For more information about memories, see [Feedback and memories][8].

## Review Autonomous Ops activity

The {{< ui >}}Activity{{< /ui >}} tab shows everything that Bits is working on in Autonomous Ops, including the actions that Bits has taken across your environment. Issues that need your input appear on the {{< ui >}}Needs Review{{< /ui >}} tab. All other issue activity appears on the {{< ui >}}All Others{{< /ui >}} tab.

To review activity:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Autonomous Ops{{< /ui >}} > {{< ui >}}Activity{{< /ui >}}.
1. On the {{< ui >}}Needs Review{{< /ui >}} tab, find the issue that you want to review. To narrow the list, use the filters, such as {{< ui >}}Scope{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, or {{< ui >}}Monitor{{< /ui >}}.
1. Click the issue to open the investigation.
1. Review the triage decision, the hypotheses that Bits tested, and the conclusion, which includes the root cause and impact.
1. Give Bits feedback on the investigation. Under {{< ui >}}Did Bits find the root cause?{{< /ui >}}, click {{< ui >}}Yes{{< /ui >}} or {{< ui >}}Not quite{{< /ui >}}. You can also use the thumbs-up or thumbs-down buttons on the conclusion and the next steps.
1. Under {{< ui >}}Remediation{{< /ui >}}, review the next steps from Bits. For each step, either approve the action or follow the provided steps to resolve the issue yourself.
1. After the fixes are applied, click the {{< ui >}}Verify resolution{{< /ui >}} next step. Bits checks whether the issue is resolved. For more information, see [Validate that issues are resolved][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_detection/
[2]: /bits_ai/bits_investigation/
[3]: /bits_ai/bits_remediation/
[4]: /mcp_server/
[6]: /bits_ai/bits_chat/
[7]: /monitors/configuration/
[8]: /bits_ai/bits_investigation/knowledge_sources/#feedback-and-memories
[9]: /account_management/rbac/permissions/
[12]: /bits_ai/bits_remediation/#validate-that-issues-are-resolved
[16]: /bits_ai/bits_remediation/#enable-automatic-code-fixes
[18]: /bits_ai/bits_remediation/guardrails/
[19]: /integrations/slack/
[20]: /bits_ai/bits_remediation/infrastructure_actions/#kubernetes-actions
[21]: /bits_ai/bits_remediation/infrastructure_actions/#aws-actions
