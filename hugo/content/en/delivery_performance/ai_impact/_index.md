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

- [DORA Metrics][1] set up with deployment, commit, and pull request data.
- An integration configured with a [supported AI coding tool provider](#supported-tools).

### Supported tools

| Tool | Direct attribution | Inferred from user activity |
|------|-------------------|----------------------------|
| [Cursor][2] | {{< X >}} | {{< X >}} |
| [Claude Code Platform (API)][3] | | {{< X >}} |
| [Claude Code Enterprise][6] | | {{< X >}} |
| [GitHub Copilot][4] | | {{< X >}} |
| [Codex][5] | | {{< X >}} |

### AI attribution

AI Impact classifies each pull request as AI-assisted or non-AI, and every metric is built on that classification. A PR is AI-assisted when at least one of its commits is AI-assisted.

Two attribution modes are available, depending on the signal your tools provide.

| | Direct attribution | Inferred from user activity |
|---|---|---|
| A commit is AI-assisted when | The tool reports AI contribution to that specific commit, for example, Cursor integration reporting AI-generated lines | The commit author created lines of code with the AI tool on the day the commit was created |
| Evidence is tied to | The commit | The author and the calendar day |
| What the metrics tell you | How AI-assisted code performs compared to code written without AI, and how users of one tool compare to users of another | How developers working with AI perform against those working without it, and how users of one tool compare to users of another |

Direct attribution is the more precise of the two, because the signal is attached to the change itself. The inferred from user activity mode covers tools that report usage without per-commit detail, and classifies every commit an active author made that day as AI-assisted. A user is active only on days the tool reports lines of code created by that user.

By default, Datadog selects the most precise attribution mode that all integrated tools have in common, so that metrics are comparable across tools on an equal basis. For example, if you're using only Cursor, metrics use direct attribution because that's the most precise method available. If you're using both Cursor and Claude Code, metrics are inferred from user activity because direct attribution is not available for Claude Code.

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

[1]: /delivery_performance/dora_metrics/setup/
[2]: /integrations/cursor/?tab=cursorintegrationindatadog#overview
[3]: /integrations/anthropic-usage-and-costs/
[4]: /integrations/github-copilot/
[5]: /integrations/openai-codex/
[6]: https://app.datadoghq.com/integrations?search=claude&integrationId=claude-enterprise-user-analytics
