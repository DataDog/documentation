---
title: Bits Guardrails
description: "Define which remediation actions Bits can take, where they apply, and who must approve them."
site_support_id: bits_remediation
---

{{< callout >}} Bits Guardrails are in Preview.{{< /callout >}}

Guardrails let admins define which remediation actions Bits can take, where those actions apply, and who needs to approve them. For example, an {{< ui >}}Ask{{< /ui >}} guardrail for `rollbackDeployment` scoped to `service:checkout` notifies predefined approvers before Bits rolls back a deployment for the checkout service.

Bits can take a remediation action only when a guardrail covers both the action and the resource it targets. If no guardrail covers an action, Bits can recommend the action but can't run it. For more information about how to enable Bits to take action on your infrastructure, see [Infrastructure Actions][5].

Guardrails authorize actions through [Execution Policies][2]. When you create an {{< ui >}}Ask{{< /ui >}} guardrail, Datadog automatically creates a matching `[Bits Guardrail]` execution policy.

## Requirements

- Creating guardrails requires the `guardrails_read` and `guardrails_write` permissions. Enable them in [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Roles{{< /ui >}}][3].
- To approve actions covered by guardrails, approvers need the `bits_investigations_write` and `guardrails_read` permissions in their role. Approvers must also be named on the {{< ui >}}Ask{{< /ui >}} guardrail, as a user or through a team or role.

## Create a guardrail

To create a guardrail:

1. Go to [{{< ui >}}Bits Guardrails{{< /ui >}}][1] and click {{< ui >}}Create guardrail{{< /ui >}}.
1. Select the type of infrastructure to target.
1. Select one or more available actions for the guardrail to target. For example, for a Kubernetes integration, you can select actions such as rolling back deployments and patching or deleting Kubernetes objects.
1. Add tags that identify the resources the guardrail applies to, such as `service:checkout` or `kube_deployment:checkout`. The tags must match the target resource's tags in Datadog.
1. For the selected actions and scope, decide when Bits can take action:
   - {{< ui >}}Ask{{< /ui >}}: Requires user approval before Bits executes actions. Choose at least one team, role, or individual who can approve.
   - {{< ui >}}Deny{{< /ui >}}: Bits can recommend an action but cannot take it.
1. (Optional) For an {{< ui >}}Ask{{< /ui >}} guardrail, turn on {{< ui >}}Notify when approval is needed{{< /ui >}}, and select the Slack workspace and channel where Bits posts approval requests. This requires the [Slack integration][4]. For a private channel, invite the Datadog app to the channel first. To approve from Slack, each approver must link their Slack account to Datadog.
1. In the review step, enter a name for the guardrail, then save it.

[1]: https://app.datadoghq.com/bits-ai/guardrails
[2]: /actions/private_actions/execution_policies/
[3]: https://app.datadoghq.com/organization-settings/roles
[4]: /integrations/slack/
[5]: /bits_ai/bits_remediation/infrastructure_actions/
