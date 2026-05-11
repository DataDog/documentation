---
title: Multi-View AI Investigation
description: "Run an agentic investigation across views to find root causes for a slow Core Web Vital."
further_reading:
  - link: "/real_user_monitoring/ai_investigations/"
    tag: "Documentation"
    text: "AI Investigations overview"
  - link: "/real_user_monitoring/ai_investigations/single_view_ai_investigation/"
    tag: "Documentation"
    text: "Single-View AI Investigation"
  - link: "/real_user_monitoring/application_monitoring/browser/optimizing_performance/"
    tag: "Documentation"
    text: "Optimize page performance with RUM"
---

{{< callout url="https://www.datadoghq.com/product-preview/rum-multi-view-ai-investigation/" header="Join the Preview!">}}
  Multi-View AI Investigation is in Preview.
{{< /callout >}}

## Overview

Multi-View AI Investigation runs an agentic root-cause analysis across a sample of views that share a slow Core Web Vital. Where [Single-View AI Investigation][1] explains why one session was slow, Multi-View AI Investigation explains why an entire (view × vital) pair is consistently slow across users. Use it from the Optimization page when you are looking at a specific page and a specific vital and want to know what to fix first.

The investigation runs at the (view × vital) granularity and is available for the following vitals:

- Loading Time
- Largest Contentful Paint
- First Contentful Paint
- Interaction to Next Paint

**Note**: Cumulative Layout Shift is not currently supported. CLS is a sum of unexpected layout shifts rather than a metric built up linearly over the page lifetime, so it does not fit the timeline-driven investigation pattern used for the other vitals. A CLS-specific investigation shape, focused on culprit elements and shift triggers, is on the roadmap.

## Launch an investigation

1. Open the [Optimization page][2] for your application.
2. Select a view and one of the supported vitals.
3. The Optimization page surfaces a ranked list of issue cards detected for that (view × vital) pair. Each card represents a candidate root cause.
4. Click **Investigate** on a card to launch the agent on that issue.

## Data analyzed

The agent groups its findings into four diagnostic types:

| Diagnostic              | What is examined                                                                                              |
|-------------------------|---------------------------------------------------------------------------------------------------------------|
| Resource bottleneck     | Slow resources (HTML, scripts, images) impacting the vital across views.                                       |
| Vital element           | DOM elements that contribute most to the LCP or INP score for the view.                                        |
| Top JavaScript files    | Large JavaScript bundles or packages that dominate execution time.                                             |
| Long tasks              | Long-running tasks that block the main thread during the vital window.                                         |

The richer the data available, the more precise the analysis. Correlating RUM with [APM Traces][3] and enabling [Browser profiling][4] helps the agent attribute findings to specific code paths.

## Read the results

When you click **Investigate** on an issue card, a side panel opens and the agent streams its analysis in real time. Each investigation produces:

- **A step-by-step timeline** describing how the metric is built from your application code: which resources load, when scripts execute, and where time is spent during the vital window.
- **A root-cause explanation** with the supporting evidence the agent considered.
- **A code-level finding** when the agent can attribute the issue to a specific file or function.

## Take action

After an investigation completes, you can act on the findings without leaving the panel:

- **Open in Fix with Bits dev**: launch the Bits AI dev assistant with the investigation context pre-filled to generate a code fix.
- **Save to a Notebook**: export the full timeline and findings to a [Notebook][5] to share with your team.

## Platform support

Multi-View AI Investigation is available for Browser RUM applications only. Mobile applications use the dedicated [Mobile Optimization page][2] instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ai_investigations/single_view_ai_investigation/
[2]: /real_user_monitoring/application_monitoring/browser/optimizing_performance/
[3]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[4]: /real_user_monitoring/correlate_with_other_telemetry/profiling/
[5]: /notebooks/
