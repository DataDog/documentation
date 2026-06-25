---
title: Bits Infrastructure Operations
description: Use Bits Infrastructure Operations to detect, prioritize, and automatically remediate infrastructure issues.
---

{{< callout url="https://www.datadoghq.com/product-preview/bits-infrastructure-operations/"
 btn_hidden="false" header="Join the Preview!">}}
Bits Infrastructure Operations is in Preview. Use this form to submit your request today.
{{< /callout >}}

Bits Infrastructure Operations detects infrastructure issues, ranks them by business impact, and executes or proposes remediations. Actions are gated by a configurable guardrail policy and logged to an audit trail. Bits Infrastructure Operations is accessible from the Datadog app, Slack, and the terminal or IDE via the MCP server.

To get started, explore [{{< ui >}}Open Issues{{< /ui >}}][1] in Datadog. See the [{{< ui >}}History{{< /ui >}}][3] tab for your audit trail.

{{< img src="bits_ai/infra/issue_list.png" alt="Your image description" style="width:100%;" >}}

## Using Bits Infrastructure across Datadog

### Kubernetes

Bits Infrastructure Operations detects the following Kubernetes issue types:

- OOMKilled pods
- CrashLoopBackOff
- ImagePullBackOff
- HPA at maxReplicas
- CPU/memory limits misconfigured

Each detected issue includes a confidence score, a summary of affected services and blast radius, and one or more proposed remediation actions. Depending on your guardrail policy, actions are either executed automatically or routed to an approval workflow.
After a remediation executes, Bits Infrastructure Operations displays before-and-after signals (replica count, p99 latency, error rate) and surfaces a {{< ui >}}Fix in IaC{{< /ui >}} option to open a Terraform PR for the change.

### Hosts

Bits Infrastructure Operations detects host issues including CPU saturation, memory pressure, and failed EC2 status checks.

### Serverless

Bits Infrastructure Operations detects serverless issues including high Lambda error rates, slow cold starts, and permission misconfigurations.

### ECS

Bits Infrastructure Operations detects ECS task-level issues and proposes remediation actions.

## Integrations

### Slack

Bits Infrastructure Operations sends two types of Slack messages:

- **Digest**: A summary of issues that were self-healed automatically, sent on a configurable schedule. Each entry links to the corresponding audit trail entry.
- **Approval card**: When an action requires human approval, an approval card is posted to Slack. Approvers can approve or reject directly from Slack without opening the Datadog app.

### MCP server

Bits Infrastructure Operations exposes MCP tools for use with Claude Code or any MCP-compatible client. You can list open issues, retrieve issue details, and approve or reject remediations from the terminal.

## Guardrails

Guardrails define which actions Bits Infrastructure Operations may execute automatically and which require human approval. Policies are evaluated per action based on confidence score, action type, and resource scope.
All actions—whether auto-approved or manually approved—are recorded in the audit trail.

### User approval

Actions that do not meet your auto-approve policy are routed to an approval workflow. The approval card displays:

- The detected issue
- The proposed action and confidence score
- The reasoning behind the confidence score
- {{< ui >}}Approve{{< /ui >}} and {{< ui >}}Reject{{< /ui >}} controls

Approved actions execute immediately. A rollback option is available for a configurable window after execution.

### Bits auto-approved

Actions that meet all auto-approve criteria in your guardrail policy execute without human review. A notification is sent (in-app or through Slack) for each autonomous action taken.

After the same action is manually approved a configurable number of times, Bits Infrastructure Operations prompts you to add it to your auto-approve policy.

## Remediation actions

| Action | Description | 
| ------ | ----------- |
| Restart | Rolling restart of a deployment, pod, or process |
| Rollback | Revert a deployment to the previous version |
| Scale | Adjust replica count, HPA maxReplicas, or resource limits/requests |
| Config change | Update a manifest, environment variable, or cloud resource configuration |
| IaC PR | Open a Terraform or Helm PR to persist a configuration change |
| Create monitor | Add a Datadog monitor for the detected failure mode |

When an action cannot be executed automatically, Bits Infrastructure Operations provides a recommended next step.

## Get started

{{< callout url=#
 btn_hidden="false" header="Join the Preview!">}}
Bits Infrastructure Operations is in Preview. Use this form to submit your request today.
{{< /callout >}}

1. In Datadog, go to [{{< ui >}}Open Issues{{< /ui >}}][1].
2. Configure [{{< ui >}}Guardrails{{< /ui >}}][2].
3. Connect Slack to receive approval cards and digests.
4. Optionally, install the Datadog MCP server to use Bits Infrastructure Operations from Claude Code or your IDE.

## Example workflows

### Incident response

1. A monitor fires on checkout-api (5xx errors, elevated p99 latency).
1. Bits SRE determines the checkout HPA has hit maxReplicas.
1. Bits Infrastructure Operations surfaces an approval card in the {{< ui >}}Open Issues{{< /ui >}} list and in Slack, showing the proposed HPA scale-up and its confidence score. The action requires approval because it targets a production namespace.
1. An on-call engineer approves from Slack.
1. Bits Infrastructure Operations executes the change and displays before-and-after metrics (replica count, p99 latency, error rate).
1. Bits Infrastructure Operations opens a Terraform PR to raise the maxReplicas cap and creates a monitor for the failure mode.
1. The detection, approval, action, and post-fix state are recorded in the audit trail.

### Proactive remediation

1. An engineer opens the {{< ui >}}Open Issues{{< /ui >}} page to review open issues.
1. Bits Infrastructure Operations displays a ranked list that includes a TLS certificate expiring on a service endpoint in six days.
1. The engineer selects the issue. Bits Infrastructure Operations shows the expiry date, affected service, and a proposed remediation (certificate rotation or an IaC PR to automate future rotation).
1. The engineer approves. Bits Infrastructure Operations executes the rotation, validates the new certificate is in place, and records the action.

[1]: https://app.datadoghq.com/infrastructure/health/open-issues
[2]: https://app.datadoghq.com/infrastructure/health/guardrails
[3]: https://app.datadoghq.com/infrastructure/health/history
