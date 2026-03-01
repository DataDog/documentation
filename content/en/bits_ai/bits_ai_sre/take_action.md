---
title: Take Action
aliases:
- /bits_ai/bits_ai_sre/remediate_issues/
---

## Suggested code fixes from the Bits AI Dev Agent
{{< callout url="http://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
Suggested code fixes from the Bits AI Dev Agent is in Preview. Click <strong>Request Access</strong> to join the Preview program.
{{< /callout >}}

After Bits AI SRE helps you identify a root cause, it can also help you take action as quickly as possible.

Bits AI SRE integrates with Bits AI Dev Agent to automatically generate code fixes. The Dev Agent connects to GitHub to create production-ready pull requests, iterates on fixes using CI logs and developer feedback, and uses multiple Datadog products to generate contextual fixes.
1. [Set up the Bits AI Dev Agent][1]. Then, after Bits AI SRE has determined a code-related root cause, you can automatically receive suggested code fixes.
1. Create a pull request, review it in GitHub, validate the change through CI, and merge when ready to fix the underlying problem.

{{< img src="bits_ai/bits_ai_sre_suggested_code_fix.png" alt="Flowchart showing Bits' investigation conclusion and a suggested code fix" style="width:100%;" >}}

## Run triage actions via chat
From within chat, you can trigger triage actions without leaving the investigation workflow.

Supported actions include:
- Sending Slack and Microsoft Teams messages
- Creating incidents in Datadog and PagerDuty
- Paging engineers via Datadog On-Call
- Creating cases in Datadog Case Management
- Opening Jira tickets

Bits AI SRE automatically pulls relevant context from the investigation and your connected integrations to prefill messages, incident descriptions, and ticket metadata. This reduces manual effort, ensures consistency, and accelerates response time.

[1]: /bits_ai/bits_ai_dev_agent/setup/
