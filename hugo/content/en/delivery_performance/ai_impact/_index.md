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

## Getting started

Datadog detects some AI activity automatically after [DORA Metrics][1] is set up with deployment, commit, and pull request data. To measure your coding tools more fully, see [Set Up AI Impact][2] to configure tools and sources for AI Impact.

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
