---
title: AI Impact
description: "Measure the impact of AI coding assistants on your software delivery performance."
aliases:
- /dora_metrics/ai-impact/
- /dora_metrics/ai_impact/
further_reading:
- link: '/delivery_performance/ai_impact/setup'
  tag: 'Documentation'
  text: 'Set up AI Impact' 
- link: '/delivery_performance/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/delivery_performance/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up DORA Metrics'
- link: '/delivery_performance/dora_metrics/calculation/'
  tag: 'Documentation'
  text: 'Learn how DORA metrics are calculated'
- link: "https://www.datadoghq.com/blog/devex-measurement-pitfalls-ai-era/"
  tag: "Blog"
  text: "5 pitfalls to avoid when measuring developer experience in the AI era"
- link: "https://www.datadoghq.com/blog/ai-impact/"
  tag: "Blog"
  text: "Measure the real impact of AI coding tools on software delivery with Datadog AI Impact"
- link: "https://www.datadoghq.com/blog/how-to-measure-developer-experience-in-the-ai-era/"
  tag: "Blog"
  text: "How to measure developer experience in the AI era"
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
AI Impact is available to all Datadog customers in Preview.
{{< /callout >}}

## Overview

AI Impact measures how AI coding assistants affect your software delivery performance. Datadog detects AI contribution from several types of sources. Sources include co-author patterns in commit metadata, provider integrations, pull request labels, and data you send yourself.

## Setup

AI Impact requires [DORA Metrics][1] set up with deployment, commit, and pull request data. Datadog then detects some AI activity automatically from co-author patterns. To measure a coding assistant more fully, configure a source for it. For the recommended source per coding assistant and the configuration steps, see [Set Up AI Impact][2].

## AI attribution

AI Impact classifies each pull request as AI-assisted or non-AI, and every metric is built on that classification. A PR is AI-assisted when at least one of its commits is AI-assisted.

Two attribution modes are available, depending on the signal your tools provide.

| | Direct attribution | Inferred from user activity |
|---|---|---|
| A commit is AI-assisted when | The tool reports AI contribution to that specific commit, for example, Cursor integration reporting AI-generated lines | The commit author created lines of code with the AI tool on the day the commit was created |
| Evidence is tied to | The commit | The author and the calendar day |
| What the metrics tell you | How AI-assisted code performs compared to code written without AI, and how users of one tool compare to users of another | How developers working with AI perform against those working without it, and how users of one tool compare to users of another |

Direct attribution is the more precise of the two, because the signal is attached to the change itself. The inferred from user activity mode covers tools that report usage without per-commit detail, and classifies every commit an active author made that day as AI-assisted. A user is active only on days the tool reports lines of code created by that user.

The two modes have trade-offs against each other:

- **Direct attribution** rarely labels a commit as AI-assisted when it was not, but it can miss AI-assisted commits whose source reports no per-commit signal.
- **Inference from user activity** rarely misses an AI-assisted commit, but it can label commits that an active author wrote without AI assistance that day.

By default, Datadog selects the most precise attribution mode that all integrated tools have in common, so that metrics are comparable across tools on an equal basis. For example, if you're using only Cursor, metrics use direct attribution because that's the most precise method available. If you're using both Cursor and Claude Code, metrics are inferred from user activity because direct attribution is not available for Claude Code.

To select the default attribution mode used for metrics in the AI Impact dashboard, set the {{< ui >}}Default AI attribution UI filter{{< /ui >}} in AI Impact settings. The setting applies to your whole organization and changes only what queries return, not what Datadog ingests. For more information, see [Set the AI attribution mode for the UI][3].

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
[2]: /delivery_performance/ai_impact/setup/
[3]: /delivery_performance/ai_impact/setup/#set-the-ai-attribution-mode-for-the-ui
