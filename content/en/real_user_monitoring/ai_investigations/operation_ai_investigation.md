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

Operation AI Investigation runs an agentic root-cause analysis on a single operation in [Operations Monitoring][1]. The agent analyzes both the success rate and the latency of the operation, surfacing focused investigations for each failure mode (errors, timeouts, abandonment), for latency regressions, and for sustained high latency — so you can see at a glance why the operation is degraded.

## Prerequisites

- [RUM without Limits][2] must be enabled in your organization.

## Launch an investigation

1. Open the Operations page for your application from [Operations Monitoring][1].
2. Select an operation.
3. The Operations page surfaces two elements:
   - A **summary** at the top with a plain-language overview of the operation's health across success rate and latency.
   - A ranked list of **recommendation cards** — one per failure mode (errors, timeouts, abandonment), one for latency regression, and one for sustained high latency. Each card is tagged with a priority badge (**P0**, **P1**, or **P2**) reflecting relative severity.
4. Click **Investigate** on a card to open a detailed analysis. While the agent runs, the card button shows **View progress**; after it completes, it shows **See investigation**.

<!-- TODO: Screenshot — Operations page showing the summary and ranked recommendation cards. -->

## What the agent investigates

The agent looks at several modes of failure or degradation for the operation:

- **Errors** — operations that ended with an error.
- **Timeouts** — operations that did not complete within their expected duration.
- **Abandoned** — operations that the user gave up on.
- **Perf. regression** — operations whose latency degraded compared to the historical baseline.
- **Latency** — operations that are sustainably slow, independent of a recent regression.

For each card, the findings are grouped into three root-cause categories:

| Category   | What is examined                                                                                                |
|------------|-----------------------------------------------------------------------------------------------------------------|
| Frontend   | Client-side failures: JavaScript errors, broken event handlers, blocking scripts.                                |
| Backend    | Server-side failures: backend errors, slow responses, downstream service issues.                                 |
| Network    | Connectivity issues: CDN problems, slow connections, regional infrastructure.                                    |

When applicable, the agent surfaces frontend and backend error groups together with the affected endpoints and code locations.

## Read the results

When you launch an investigation, a side panel streams the analysis as it runs. Once complete, the panel shows:

- **A verdict** combining the investigation mode (Errors, Timeouts, Abandoned, Perf. regression, or Latency), the inferred root-cause category (Frontend, Backend, or Network), and a confidence level (**High**, **Medium**, or **Low**) indicating how confident the agent is in its conclusion.
- **A plain-language summary** of what the agent found.
- **Ranked findings**, where each finding includes:
  - **A summary** of the failure or degradation pattern.
  - **Code locations** with file path, line number, and surrounding snippet when source maps are available.
  - **Correlated APM endpoints**, each with a **View trace** link that opens the matching trace in APM.
  - **Error groups** with the affected session count and whether the error first appeared in a recent application version, plus a **View Sample Session** link that opens the session in the RUM Explorer.

<!-- TODO: Screenshot — Operation AI Investigation side panel with verdict, summary, and ranked findings. -->

## Take action

After an investigation completes, you can act on findings without leaving the panel:

- **Fix with Bits**: opens the Bits AI dev assistant with the investigation context pre-filled to generate a code fix from your IDE.
- **Copy Investigation Prompt**: copies the agent's prompt to your clipboard so you can rerun, refine, or share it.
- **View trace** on a correlated endpoint: opens the matching trace in APM.
- **View Sample Session** on an error group: opens the session in the RUM Explorer.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/operations_monitoring/
[2]: /real_user_monitoring/rum_without_limits/
