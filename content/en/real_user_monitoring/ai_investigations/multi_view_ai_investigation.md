---
title: Multi-View AI Investigation
description: "Run an agentic investigation across views to find root causes for a slow performance vital."
further_reading:
  - link: "/real_user_monitoring/ai_investigations/"
    tag: "Documentation"
    text: "AI Investigations"
  - link: "/real_user_monitoring/ai_investigations/single_view_ai_investigation/"
    tag: "Documentation"
    text: "Single-View AI Investigation"
  - link: "/real_user_monitoring/application_monitoring/browser/optimizing_performance/"
    tag: "Documentation"
    text: "Optimize page performance with RUM"
---

{{< callout url="https://www.datadoghq.com/product-preview/rum-investigation-optimization/" header="Join the Preview!">}}
  Multi-View AI Investigation is in Preview.
{{< /callout >}}

## Overview

Multi-View AI Investigation runs an agentic root-cause analysis across a sample of views that share a slow performance vital. While [Single-View AI Investigation][1] explains why one view was slow, Multi-View AI Investigation explains why an entire (view × vital) pair is consistently slow across users. Use it from the Optimization page when you have identified a specific page and vital and want to know what to fix first.

The investigation runs at the (view × vital) granularity and is available for the following vitals:

- Loading Time
- Largest Contentful Paint
- First Contentful Paint
- Interaction to Next Paint

## Prerequisites

Multi-View AI Investigation is available for Browser RUM applications only.

## Launch an investigation

1. Open the [Optimization page][2] for your application.
2. Select a view and one of the supported vitals.
3. The Optimization page surfaces two elements for the selected (view × vital) pair:
   - A **summary** at the top with an at-a-glance overview of the issues detected.
   - Up to three **recommendation cards** below the summary. Each card represents a candidate root cause, ordered by impact.
4. Click **Investigate** on a card to launch the agent on that issue.

{{< img src="real_user_monitoring/ai_investigations/multi-view-ai-investigation-recommendations.png" alt="Optimization page for a Largest Contentful Paint metric, showing the p75 distribution, time series, and ranked recommendation cards with an Investigate button on each card." style="width:100%;" >}}

## What the agent investigates

The agent groups its findings into four diagnostic types:

| Source                  | What is examined                                                                                                               |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| Resource bottleneck     | Slow resources (HTML, scripts, images) impacting the vital across views.                                                       |
| Vital element           | DOM elements that contribute most to the Largest Contentful Paint (LCP) or Interaction to Next Paint (INP) score for the view. |
| Top JavaScript files    | Large JavaScript bundles or packages that dominate execution time.                                                             |
| Long tasks              | Long-running tasks that block the main thread during the vital window.                                                         |

The richer the data available, the more precise the analysis. Correlating RUM with [APM Traces][3] and enabling [Browser profiling][4] helps the agent attribute findings to specific code paths.

## Read the results

When you click **Investigate** on a recommendation card, a side panel opens and the agent streams its analysis in real time. Each investigation produces:

- **A step-by-step timeline** describing how the metric is built from your application code: which resources load, when scripts execute, and where time is spent during the vital window.
- **A root-cause explanation** with the supporting evidence the agent considered.
- **A code-level finding** when the agent can attribute the issue to a specific file or function.

{{< img src="real_user_monitoring/ai_investigations/multi-view-ai-investigation-code-finding.png" alt="A Code Investigation side panel showing the inspected DOM element, a timeline of layout and render events, the root-cause explanation, and the affected source code." style="width:100%;" >}}

## Take action

After an investigation completes, you can act on findings without leaving the panel:

- **Fix with Bits**: Opens the Bits AI dev assistant with the investigation context pre-filled to generate a code fix from your IDE.
- **Save to a Notebook**: Exports the full timeline and findings to a [Notebook][5] to share with your team.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ai_investigations/single_view_ai_investigation/
[2]: /real_user_monitoring/application_monitoring/browser/optimizing_performance/
[3]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[4]: /real_user_monitoring/correlate_with_other_telemetry/profiling/
[5]: /notebooks/
