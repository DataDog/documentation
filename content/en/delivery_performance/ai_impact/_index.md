---
title: AI Impact
description: "Measure the impact of AI coding assistants on your software delivery performance."
aliases:
- /dora_metrics/ai-impact/
- /dora_metrics/ai_impact/
further_reading:
- link: '/delivery_performance/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/delivery_performance/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up DORA Metrics'
- link: '/delivery_performance/dora_metrics/calculation/'
  tag: 'Documentation'
  text: 'Learn how DORA metrics are calculated'
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
AI Impact is available to all Datadog customers in Preview.
{{< /callout >}}

## Overview

AI Impact measures how AI coding assistants affect your software delivery performance. Measuring their impact requires configuring an integration with a supported provider.

## Setup

### Prerequisites

- [DORA Metrics][1] set up with deployment and commit data.
- An integration configured with a [supported AI coding tool provider](#supported-tools).

### Supported tools

| Tool | Per-Commit Granularity | User Activity Granularity |
|------|-----------|---------------|
| [Cursor][2] | &#x2714; | &#x2714; |
| [Claude Code API][3] |  | &#x2714; |
| GitHub Copilot (Coming soon) |  | &#x2714; |

### Granularity modes

AI Impact metrics can be analyzed at two levels of granularity. The granularity mode being used determines how commits are classified as "AI-assisted" or "non-AI" for all metrics.

By default, Datadog selects the most precise granularity mode that all integrated tools have in common, so that metrics are comparable across tools on an equal basis. For example, if you're using only Cursor, metrics are classified per-commit because that's the most precise method available. If you're using both Cursor and Claude Code, metrics are classified based on user activity because per-commit is not available for Claude Code.

Per-Commit
: A commit is classified as AI-assisted when there is evidence that AI directly contributed code to that specific commit (for example, Cursor reports AI-generated lines). Each commit is independently tagged. This is the most precise method, available for tools that provide commit-level data.

User Activity
: Compares delivery metrics between active and non-active users of the selected tool. A user is considered active on a given day if they performed any interaction with the tool (for example, accepted a suggestion, used chat, or triggered an agent). Commits are attributed to the active or non-active group based on their author's activity on the day the commit was created.

[1]: /delivery_performance/dora_metrics/setup/
[2]: /integrations/cursor/?tab=cursorintegrationindatadog#overview
[3]: /integrations/anthropic-usage-and-costs/

## Impact metrics

| Metric | Definition |
|--------|------------|
| AI-assisted PRs | PRs containing at least one AI-assisted commit, divided by total PRs. |
| PR Throughput | Number of PRs deployed per user per day for AI-assisted authors compared to non-assisted authors. |
| PR Cycle Time | Median time from a PR's first commit to merge for AI-assisted PRs compared to non-assisted PRs. |
| Change Failure Rate | Failure rate weighted by the proportion of AI-assisted commits in each deployment, compared to the weighted rate for non-assisted commits. For example, if a failed deployment has 3 out of 10 commits assisted by AI, only 30% of that failure is attributed to AI. |
| Recovery Time | Median recovery time of failed deployments containing AI-assisted commits compared to deployments without. |

<div class="alert alert-info">Change Failure Rate only includes deployments linked to code changes. Configuration-only or infrastructure deployments are excluded to help the comparison reflect the impact of AI on code-related failures. This differs from standard DORA Change Failure Rate, which counts all deployment types.</div>

<div class="alert alert-info">For GitHub only, PR-level metrics exclude PRs whose commits are entirely bot-authored. This keeps automated activity out of the non-AI baseline.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
