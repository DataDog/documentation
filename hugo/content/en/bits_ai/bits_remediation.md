---
title: Bits Remediation
description: "Learn how Bits provides actionable remediation next steps for root cause investigations."
aliases:
- /bits_ai/bits_ai_sre/remediate_issues/
- /bits_ai/bits_investigation/remediate_issues/
- /bits_ai/bits_ai_sre/take_action/
- /bits_ai/bits_investigation/take_action/
site_support_id: bits_remediation
---

{{< callout url="https://www.datadoghq.com/product-preview/bits-remediation/" >}}
  Bits Remediation includes capabilities in Preview. Click <strong>Request Access</strong> to join the Preview program.
{{< /callout >}}

## Overview of Bits Remediation

Bits Remediation helps on-call engineers, SREs, and platform teams act on the root cause that [Bits Investigation][1] finds. From an investigation, Bits can generate code fixes, run triage actions, and take action on your infrastructure. Admins govern which actions Bits can take and who must approve them. After you approve and apply the changes, Bits verifies that the issue is resolved.

For example, Bits might trace rising error rates to a faulty Kubernetes deployment. From the investigation, you can use Bits to open an incident, roll back the deployment, and generate a pull request that fixes the underlying error. Afterward, Bits can verify that error rates returned to normal.

This image shows a Bits Investigation remediation plan with suggested next steps:

{{< img src="bits_ai/bits_remediation/remediation_plan.png" alt="A Bits Investigation remediation plan with five suggested next steps: declare an incident, update a Kubernetes deployment, create a Jira issue, fix the code, and verify resolution, which is marked complete. Below it, the issue status shows Resolved after the monitor returned to OK." style="width:100%;" >}}

## Automatic code fixes

Bits integrates with [Bits Code][2] to generate code fixes as part of the remediation plan for an investigation. Bits Code connects to your source code provider to create, update, and iterate on production-ready pull requests, based on existing issues detected by Datadog. This allows you to resolve issues with code-related root causes directly from an investigation.

### Enable automatic code fixes

To enable code fixes:

1. [Set up Bits Code][3].
1. (Optional) To have Bits open pull requests for you, enable [auto-push][4]. By default, you create the pull request from the suggested fix.

   After Bits determines a code-related root cause for an issue, Bits automatically generates a suggested code fix.

### Disable automatic code fixes

By default, when Bits Code is configured, Bits automatically generates code fixes for investigations with code-related root causes.

To manually generate code fixes instead:
* Disable automatic code fix generation in [{{< ui >}}Settings{{< /ui >}}][5].

### Review and approve code fixes

To review and approve code fixes from an investigation:

1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Investigations{{< /ui >}} and open the target investigation.
1. In the investigation, under {{< ui >}}Next Steps{{< /ui >}}, review the suggested code fix:
   {{< img src="bits_ai/bits_remediation/code_fix.png" alt="A suggested code fix in Next Steps with a summary of the changes, a diff of login_controller.rb, and buttons to create a pull request or view the session in Bits Code" style="width:100%;" >}}
1. (Optional) Chat with Bits within the code session to update the suggested code fix.
1. If [auto-push][4] is disabled, create the pull request from the suggested fix.
1. Review and merge the pull request when ready.

## Triage actions

During an investigation, Bits pulls relevant context from the investigation and your connected integrations to prefill Slack messages, incident descriptions, and ticket metadata. This reduces manual effort, helps ensure consistency, and accelerates response time.

### Supported triage actions

Supported triage actions include:

- Sending Slack messages
- Creating incidents in Datadog and PagerDuty
- Paging engineers using Datadog On-Call
- Creating work items in Datadog Work Management
- Opening Jira tickets

### Run triage actions

To run triage actions from an investigation:
1. Go to {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Investigations{{< /ui >}} and open the target investigation.
1. In the investigation, under {{< ui >}}Next Steps{{< /ui >}}, review and run the triage action.

## Infrastructure actions

{{< callout >}} One-click actions are in Preview. {{< /callout >}}

When Bits determines that the root cause of an investigation is infrastructure-related, it can recommend a remediation action on your infrastructure. For example, Bits might recommend rolling back a deployment, restarting a pod, or invoking an AWS Lambda function. For more information about the available actions, see the [Action Catalog][6].

### Manual recommendations and one-click actions

Bits supports the following options for infrastructure actions:

- **Manual recommendations**: From the {{< ui >}}Next Steps{{< /ui >}} section of an investigation, copy the suggested command (for example, a `kubectl patch` command) and run it in your own CLI.
- **One-click actions (Preview)**: From the {{< ui >}}Next Steps{{< /ui >}} section of an investigation, click {{< ui >}}Approve{{< /ui >}} to let Bits execute the suggested remediation action directly from the investigation context. You can also configure Slack notifications to approve the remediation action from Slack. One-click actions are available for Kubernetes and AWS infrastructure. For information about how to enable one-click infrastructure actions, see [One-click Infrastructure Actions][7].

  {{< img src="bits_ai/bits_remediation/kubernetes_action_approve.png" alt="A suggested Kubernetes remediation step that patches the same deployment across four production clusters, with an Approve button for each patch" style="width:100%;" >}}

## Validate that issues are resolved

Bits can verify whether a remediation action was applied successfully, and whether the original issue was resolved:

{{< img src="bits_ai/bits_remediation/verify_resolution.png" alt="A completed Verify resolution step with an issue status of Resolved, explaining that the monitor returned to OK and showing a graph of the error rate back at baseline levels" style="width:100%;" >}}

To verify that issues are resolved:
* In the target investigation, click {{< ui >}}Verify resolution{{< /ui >}}.

If you verify right after an action runs, the status might show **Not resolved yet** while pre-fix errors are still in that window. Wait for the related monitor to recover, then click {{< ui >}}Check Again{{< /ui >}}.

## Review action history

[{{< ui >}}Action History{{< /ui >}}][8] in Bits Settings is an auditable record of every action Bits has taken, including triage actions and infrastructure actions. Filter the list by action, integration, or investigation, and click an action to see:

- **Execution details**: The status, start and end time, duration, and connection used.
- **Scope and policy**: The guardrail that covered the action and who initiated it.
- **Original investigation**: The root cause and impact that led to the action, with a link to the investigation.

[1]: /bits_ai/bits_investigation/
[2]: /bits_ai/bits_code/
[3]: /bits_ai/bits_code/setup/
[4]: /bits_ai/bits_code/setup/#enable-auto-push
[5]: https://app.datadoghq.com/bits-ai/settings/source-code-integration
[6]: /actions/actions_catalog/
[7]: /bits_ai/bits_remediation/one_click_infrastructure_actions/
[8]: https://app.datadoghq.com/bits-ai/settings/action-history
