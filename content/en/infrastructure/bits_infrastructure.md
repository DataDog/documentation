---
title: Bits Infrastructure Operations
description: Use Bits Infrastructure Operations to automatically detect, investigate, and remediate infrastructure issues.
---

{{< callout url="https://www.datadoghq.com/product-preview/bits-infrastructure-operations/"
 btn_hidden="false" header="Join the Preview!">}}
Bits Infrastructure Operations is in Preview. Use this form to submit your request today.
{{< /callout >}}

Bits Infrastructure Operations detects and investigates infrastructure issues, ranks them by impact, and executes or proposes remediations. Actions are gated by a configurable guardrail policy and logged to history with full issue and user context. Bits Infrastructure Operations is accessible from the Datadog app, Slack, and the terminal or IDE via the Datadog MCP server.

To get started, explore [{{< ui >}}Open Issues{{< /ui >}}][1] in Datadog. See the [{{< ui >}}History{{< /ui >}}][3] tab for actions taken on issues.

{{< img src="bits_ai/infra/issue_list.png" alt="Your image description" style="width:100%;" >}}

## Using Bits Infrastructure Operations across Datadog

Bits Infrastructure Operations can detect, investigate, and remediate issues across your entire infrastructure stack, including Kubernetes, serverless, AWS ECS, hosts, and networks. Each detected issue includes a summary of the root cause investigation, supporting evidence, and one or more proposed remediation actions. Depending on your guardrail policy, actions are either executed automatically or surfaced to a user for approval. 

## Integrations

### Slack

Bits Infrastructure Operations can notify you on Slack when issues are automatically resolved or when an issue requires user approval for a proposed remediation action. You can configure what Slack channel to route notifications to via your guardrail policy. When an action requires user approval, you can approve or reject directly from Slack without opening the Datadog app.

### MCP server

Bits Infrastructure Operations exposes MCP tools via the Datadog MCP Server for use with Claude Code or any MCP-compatible client. You can list open issues, retrieve issue details, and approve or reject remediations from the terminal.

## Guardrails

Guardrails define which actions Bits Infrastructure Operations may execute automatically and which require user approval. You can configure guardrail scope by resource tags, action type, and environment. If a remediation action for an issue matches an existing guardrail, the action will be executed or surfaced for approval. 
All actions—whether auto-approved or manually approved—are recorded in History.

### User approval

Actions that do not meet your auto-approve policy are routed to an approval workflow. The approval card displays:

- The detected issue
- The reasoning from the issue investigation
- The proposed remediation action
- {{< ui >}}Approve{{< /ui >}} and {{< ui >}}Reject{{< /ui >}} controls

Approved actions execute immediately. 

### Bits auto-approved

Actions that meet all auto-approve criteria in your guardrail execute automatically without user approval required. Each autonomous action taken is logged in History, and a notification is sent to the Slack channel configured in your guardrail.

## Remediation actions
Bits Infrastructure Operations supports remediation actions that can make changes directly on your infrastructure (for example, patching a Kubernetes manifest) or creating a pull request to apply changes in code. 

When a proposed remediation action cannot be executed directly on your infrastructure, Bits Infrastructure Operations provides recommended next steps.

## Get started

{{< callout url="https://www.datadoghq.com/product-preview/bits-infrastructure-operations/"
 btn_hidden="false" header="Join the Preview!">}}
Bits Infrastructure Operations is in Preview. Use this form to submit your request today.
{{< /callout >}}

1. In Datadog, go to [{{< ui >}}Open Issues{{< /ui >}}][1].
2. Configure [{{< ui >}}Guardrails{{< /ui >}}][2].
3. Connect Slack to receive notifications for issues.
4. Optionally, install the Datadog MCP server to use Bits Infrastructure Operations from Claude Code or your IDE.

## Example workflow

1. Bits Infrastructure Operations detects that the checkout-api service has pods repeatedly being OOMKilled.
1. Bits Infrastructure Operations determines the memory limit is set too low for current traffic load.
1. Bits Infrastructure Operations surfaces an issue approval card in the {{< ui >}}Open Issues{{< /ui >}} list and in Slack, showing the proposed remediation (patch the deployment to increase memory limit). The action requires approval because it targets a production namespace.
1. An on-call engineer approves from Slack.
1. Bits Infrastructure Operations executes the change.
1. The on-call engineer opens a PR to update deployment memory limits in code so the changes are persisted.
1. The issue, action taken, and post-fix state are recorded in History.
1. The engineer updates the guardrail so next time checkout-api experiences the same issue, the patch action is auto-approved.

[1]: https://app.datadoghq.com/infrastructure/health/open-issues
[2]: https://app.datadoghq.com/infrastructure/health/guardrails
[3]: https://app.datadoghq.com/infrastructure/health/history


