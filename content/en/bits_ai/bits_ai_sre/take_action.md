---
title: Take Action
aliases:
- /bits_ai/bits_ai_sre/remediate_issues/
---

After Bits AI SRE identifies a root cause, it can help you take action in three ways:

- Code Fixes help resolve code-related root causes.
- Remediation Recommendations provide corrective steps and fully configured commands.
- Triage Suggestions help coordinate the response through connected tools.

## Code Fixes

Bits AI SRE integrates with [Bits AI Dev Agent][2] to automatically generate code fixes. The Dev Agent connects to GitHub or GitLab to create production-ready pull requests and iterates on fixes using CI logs and developer feedback, and uses multiple Datadog products to generate contextual fixes.

To start receiving code fixes, [set up the Bits AI Dev Agent][1]. Then, if Bits AI SRE has determined a code-related root cause, you will automatically receive suggested code fixes.

{{< img src="bits_ai/bits_ai_sre_suggested_code_fix.png" alt="Flowchart showing Bits' investigation conclusion and a suggested code fix" style="width:100%;" >}}

## Remediation Recommendations

Bits AI SRE will recommend corrective steps when applicable for the root cause. These recommendations can include commands that are fully configured, so you can copy them and run in your CLI. For example, Bits AI SRE may provide a `kubectl` command to restart or patch an affected Kubernetes deployment.

Review each recommendation and command before running it in your environment.

## Triage Suggestions
Triage Suggestions help you coordinate the response without leaving the investigation page. Bits uses investigation context to prefill messages, incident descriptions, or ticket metadata, so you can take common response tasks with a single click.

Suggestions include but are not limited to
- Sending Slack messages to update your team on the investigation results
- Declaring incidents in Datadog
- Paging engineers via Datadog On-Call
- Opening Jira tickets

[1]: /bits_ai/bits_ai_dev_agent/setup/
[2]: /bits_ai/bits_ai_dev_agent
