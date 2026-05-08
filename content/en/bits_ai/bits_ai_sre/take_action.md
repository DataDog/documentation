---
title: Take Action
aliases:
- /bits_ai/bits_ai_sre/remediate_issues/
---

After Bits AI SRE identifies a root cause, it can help you take action in three ways:

- Code Fixes help resolve code-related root causes.
- Remediation Recommendations provide corrective steps and fully configured commands.
- Triage Suggestions help coordinate the response through connected tools.

## Code fixes

Bits AI SRE integrates with [Bits AI Dev Agent][2] to automatically generate code fixes. The Dev Agent connects to GitHub or GitLab to create production-ready pull requests, iterate on fixes using CI logs and developer feedback, and apply context from multiple Datadog products.

To start receiving code fixes, [set up the Bits AI Dev Agent][1]. Then, if Bits AI SRE determines a code-related root cause, you receive suggested code fixes automatically.

{{< img src="bits_ai/bits_ai_sre_suggested_code_fix.png" alt="Flowchart showing Bits' investigation conclusion and a suggested code fix" style="width:100%;" >}}

## Remediation Recommendations
Triage Suggestions help you coordinate the response without leaving the investigation page. Bits AI SRE uses investigation context to prefill messages, incident descriptions, or ticket metadata, so you can complete common response tasks with a single click.
Bits AI SRE recommends corrective steps when applicable to the root cause. These recommendations can include fully configured commands that you copy and run in your terminal — for example, a `kubectl` command to restart a Kubernetes deployment, an AWS CLI call to adjust a resource, or a Terraform change to update infrastructure.

Review each recommendation and command before running it in your environment.

## Triage Suggestions

Triage Suggestions help you coordinate the response without leaving the investigation page. Bits AI SRE uses investigation context to prefill messages, incident descriptions, or ticket metadata, so you can complete common response tasks with a single click.

Suggestions include but are not limited to:
- Sending Slack messages to update your team on the investigation results
- Declaring incidents in Datadog
- Paging engineers through Datadog On-Call
- Opening Jira tickets

[1]: /bits_ai/bits_ai_dev_agent/setup/
[2]: /bits_ai/bits_ai_dev_agent
