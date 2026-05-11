---
title: Operation AI Investigation
description: "Run an agentic investigation on a single operation to find root causes for failures or latency regressions."
further_reading:
  - link: "/real_user_monitoring/ai_investigations/"
    tag: "Documentation"
    text: "AI Investigations overview"
  - link: "/real_user_monitoring/operations_monitoring/"
    tag: "Documentation"
    text: "Operations Monitoring"
  - link: "/real_user_monitoring/ai_investigations/single_view_ai_investigation/"
    tag: "Documentation"
    text: "Single-View AI Investigation"
---

{{< callout url="https://www.datadoghq.com/product-preview/rum-operation-ai-investigation/" header="Join the Preview!">}}
  Operation AI Investigation is in Preview.
{{< /callout >}}

## Overview

Operation AI Investigation runs an agentic root-cause analysis on a single operation in [Operations Monitoring][1]. The agent analyzes both the success rate and the latency of the operation, surfacing one focused investigation per failure mode and one for latency regressions, so you can see at a glance whether the operation is failing because of errors, timeouts, abandonment, or a performance regression.

## Prerequisites

- [RUM without Limits][2] must be enabled in your organization.
- Operation AI Investigation is available for Browser RUM applications only. Mobile applications are not supported in the current preview.

## Launch an investigation

1. Open the Operations page for your application from [Operations Monitoring][1].
2. Select an operation.
3. The Operation summary surfaces a list of investigation cards — one per failure mode and one for latency regression. Each card is ranked by severity.
4. Click **Investigate** on a card to drill into a detailed analysis.

## What the agent investigates

The agent looks at several modes of failure or degradation for the operation:

- **Errors** — operations that ended with an error.
- **Timeouts** — operations that did not complete within their expected duration.
- **Abandoned** — operations that the user gave up on.
- **Performance regression** — operations whose latency degraded compared to the historical baseline.

For each card, the findings are grouped into three root-cause categories:

| Category   | What is examined                                                                                                |
|------------|-----------------------------------------------------------------------------------------------------------------|
| Frontend   | Client-side failures: JavaScript errors, broken event handlers, blocking scripts.                                |
| Backend    | Server-side failures: backend errors, slow responses, downstream service issues.                                 |
| Network    | Connectivity issues: CDN problems, slow connections, regional infrastructure.                                    |

When applicable, the agent surfaces frontend and backend error groups together with the affected endpoints and code locations.

## Read the results

When you launch an investigation, a side panel streams the analysis as it runs. Once complete, the panel shows:

- **A verdict** with the investigation mode (Errors, Timeouts, Abandoned, or Performance regression), the inferred root-cause category, and a confidence level.
- **A plain-language summary** of what the agent found.
- **Ranked findings** with frontend and backend error details, code locations, and the correlated endpoints.

## Take action

When a finding has actionable code-level information, you can copy the investigation context with one click and open **Fix with Bits dev** to generate a code fix from your IDE.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/operations_monitoring/
[2]: /real_user_monitoring/rum_without_limits/
