---
title: AI Impact
description: "Measure the impact of AI coding assistants and AI review agents on your software delivery performance with DORA Metrics."
aliases:
- /dora_metrics/ai-impact/
is_beta: true
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up DORA Metrics'
- link: '/dora_metrics/calculation/'
  tag: 'Documentation'
  text: 'Learn how DORA metrics are calculated'
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
AI Impact is in Preview.
{{< /callout >}}

## Overview

AI Impact measures how AI tools affect your software delivery performance. It tracks two categories of tools:

AI coding assistants
: Tools that impact how code is written, such as Cursor and Claude Code. Measuring their impact requires configuring an integration with a supported provider.

AI review agents
: Tools that impact how code is validated, such as Codex, CodeRabbit, and Copilot review. These are detected automatically from pull request metadata.

## Measure AI Impact

{{< tabs >}}
{{% tab "AI Coding Assistants" %}}

### Prerequisites

- [DORA Metrics][1] set up with deployment and commit data.
- An integration configured with a [supported AI coding tool provider](#supported-tools).

### Supported tools

| Tool | Per-Commit Granularity | User Activity Granularity |
|------|-----------|---------------|
| Cursor | &#x2714; | &#x2714; |
| Claude Code |  | &#x2714; |

### Granularity modes

AI Impact metrics can be viewed at two levels of granularity. The active mode determines how commits are classified as "AI" or "non-AI" for all metrics.

By default, Datadog selects the most precise granularity mode that all integrated tools have in common, so that metrics are comparable across tools on an equal basis.

Per-Commit
: A commit is classified as AI-assisted when there is evidence that AI directly contributed code to that specific commit (for example, Cursor reports AI-generated lines). Each commit is independently tagged. This is the most precise method, available for tools that provide commit-level data.

User Activity
: Compares delivery metrics between active and non-active users of the selected tool. A user is considered active on a given day if they performed any interaction with the tool (for example, accepted a suggestion, used chat, or triggered an agent). Commits are attributed to the active or non-active group based on their author's activity on the day the commit was created.

[1]: /dora_metrics/setup/

{{% /tab %}}
{{% tab "AI Review Agents" %}}

### Prerequisites

- [DORA Metrics][1] set up with deployment and commit data.
- A Git provider integration ([GitHub][2], [GitLab][3] or [Azure DevOps][4]) configured with PR permissions.

**Note**: No separate integration is required for review agents. Detection is automatic.

### How it works

AI review agents are detected automatically from pull request metadata. When a known AI agent (such as Codex, CodeRabbit, or Copilot review) participates in a PR review, Datadog enriches that PR with AI review data.

Enrichment happens at the PR level, not the commit level. All commits within a PR reviewed by an AI agent inherit the AI review classification.

[1]: /dora_metrics/setup/
[2]: /dora_metrics/setup/?tab=github
[3]: /dora_metrics/setup/?tab=gitlab
[4]: /dora_metrics/setup/?tab=azure-devops

{{% /tab %}}
{{< /tabs >}}

## Impact metrics

### AI Coding Assistants

{{< tabs >}}
{{% tab "Per-Commit" %}}

| Metric | Definition |
|--------|------------|
| AI Assisted Commits | Commits where the selected tool directly contributed code, divided by total commits. |
| AI Assisted Deployments | Deployments containing at least one AI-assisted commit, divided by total deployments. |
| Change Lead Time | Median lead time of AI-assisted commits compared to non-assisted commits. |
| PR Review Time | Median review time of PRs containing at least one AI-assisted commit compared to PRs without. |
| Change Failure Rate | Failure rate weighted by the proportion of AI-assisted commits in each deployment, compared to the weighted rate for non-assisted commits. For example, if a failed deployment has 3 out of 10 commits assisted by AI, only 30% of that failure is attributed to AI. |
| Recovery Time | Median recovery time of failed deployments containing AI-assisted commits compared to deployments without. |

{{% /tab %}}
{{% tab "User Activity" %}}

| Metric | Definition |
|--------|------------|
| AI Assisted Commits | Commits authored on a day where the author was active with the selected tool, divided by total commits. |
| AI Assisted Deployments | Deployments containing at least one commit from an active user, divided by total deployments. |
| Change Lead Time | Median lead time of commits by active users compared to non-active users. |
| PR Review Time | Median review time of PRs where at least one commit author was active compared to PRs where no author was active. |
| Change Failure Rate | Failure rate weighted by the proportion of active-user commits in each deployment, compared to the weighted rate for non-active users. |
| Recovery Time | Median recovery time of failed deployments involving active users compared to deployments without. |

{{% /tab %}}
{{< /tabs >}}

**Note**: Change Failure Rate only includes deployments linked to code changes. Configuration-only or infrastructure deployments are excluded to help the comparison reflect the impact of AI on code-related failures. This differs from standard DORA Change Failure Rate, which counts all deployment types.

### AI Review Agents

| Metric | Definition |
|--------|------------|
| AI Reviewed PRs | Number of PRs reviewed by an AI agent, divided by total PRs. |
| Review Time | Median time from PR creation to approval or merge, split by AI-reviewed PRs compared to human-only PRs. |
| Change Failure Rate | Rate of deployments that cause a failure requiring intervention, weighted by the proportion of PRs reviewed by an AI agent in each deployment. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
