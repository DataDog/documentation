---
title: Take Action
aliases:
- /bits_ai/bits_ai_sre/remediate_issues/
---

## Suggested code fixes from Bits Code
After Bits Investigation helps you identify a root cause, it can also help you take action as quickly as possible.

Bits Investigation integrates with [Bits Code][2] to automatically generate code fixes. Bits Code connects to GitHub to create production-ready pull requests, iterates on fixes using CI logs and developer feedback, and uses multiple Datadog products to generate contextual fixes.
1. [Set up Bits Code][1]. Then, after Bits Investigation has determined a code-related root cause, you will automatically receive suggested code fixes.
1. Ask Bits Code to make any additional updates as needed, create a pull request for review in GitHub, and merge when ready to fix the underlying problem.

{{< img src="bits_ai/bits_ai_sre_suggested_code_fix.png" alt="Flowchart showing Bits' investigation conclusion and a suggested code fix" style="width:100%;" >}}

## Run triage actions via chat
From chat, you can trigger triage actions without leaving the investigation workflow.

Supported actions include:
- Sending Slack and Microsoft Teams messages
- Creating incidents in Datadog and PagerDuty
- Paging engineers via Datadog On-Call
- Creating cases in Datadog Case Management
- Opening Jira tickets

Bits Investigation automatically pulls relevant context from the investigation and your connected integrations to prefill messages, incident descriptions, and ticket metadata. This reduces manual effort, ensures consistency, and accelerates response time.

[1]: /bits_ai/bits_ai_dev_agent/setup/
[2]: /bits_ai/bits_ai_dev_agent
