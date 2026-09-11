---
title: Operation AI Investigation
description: "Run an agentic investigation on a single operation to find root causes for failures or latency regressions."
further_reading:
  - link: "/real_user_monitoring/ai_investigations/"
    tag: "Documentation"
    text: "AI Investigations"
  - link: "/real_user_monitoring/operations_monitoring/"
    tag: "Documentation"
    text: "Operations Monitoring"
  - link: "/real_user_monitoring/ai_investigations/single_view_ai_investigation/"
    tag: "Documentation"
    text: "Single-View AI Investigation"
---

{{< callout url="https://www.datadoghq.com/product-preview/rum-investigation-operations/" header="Join the Preview!">}}
  Operation AI Investigation is in Preview.
{{< /callout >}}

## Overview

Operation AI Investigation runs an agentic root-cause analysis on a single operation in [Operations Monitoring][1]. The agent analyzes both the success rate and the latency of the operation. It surfaces focused investigations for each failure mode (errors, timeouts, abandonment), for latency regressions, and for sustained high latency, so you can see at a glance why the operation is degraded.

## Prerequisites

- [RUM without Limits][2] must be enabled in your organization.

## Launch an investigation

1. Open the Operations page for your application from [Operations Monitoring][1].
2. Select an operation.
3. The Operations page surfaces two elements:
   - A **summary** at the top with a plain-language overview of the operation's health across success rate and latency.
   - A ranked list of **recommendation cards** — one per failure mode (errors, timeouts, abandonment), one for latency regression, and one for sustained high latency. Each card is tagged with a priority badge ({{< ui >}}P0{{< /ui >}}, {{< ui >}}P1{{< /ui >}}, or {{< ui >}}P2{{< /ui >}}) reflecting relative severity.
4. Click {{< ui >}}Investigate{{< /ui >}} on a card to open a detailed analysis.

{{< img src="real_user_monitoring/ai_investigations/operation-ai-investigation-recommendations.png" alt="Operations page for an Add to Cart operation, showing execution volume, success rate, and completion time charts, with a plain-language health summary and ranked recommendation cards tagged with P1 and P2 priority badges." style="width:100%;" >}}

## What the agent investigates

The agent looks at several modes of failure or degradation for the operation:

- {{< ui >}}Errors{{< /ui >}}: Operations that ended with an error.
- {{< ui >}}Timeouts{{< /ui >}}: Operations that did not complete within their expected duration.
- {{< ui >}}Abandoned{{< /ui >}}: Operations that the user gave up on.
- {{< ui >}}Performance regression{{< /ui >}}: Operations whose latency degraded compared to the historical baseline.
- {{< ui >}}Latency{{< /ui >}}: Operations that are consistently slow, independent of a recent regression.

For each card, the findings are grouped into three root-cause categories:

| Source   | What is examined                                                                                                |
|------------|-----------------------------------------------------------------------------------------------------------------|
| Frontend   | Client-side failures: JavaScript errors, broken event handlers, blocking scripts.                                |
| Backend    | Server-side failures: backend errors, slow responses, downstream service issues.                                 |
| Network    | Connectivity issues: CDN problems, slow connections, regional infrastructure.                                    |

When applicable, the agent surfaces frontend and backend error groups together with the affected endpoints and code locations.

## Read the results

When you launch an investigation, a side panel streams the analysis as it runs. Once complete, the panel shows the inferred root cause and a ranked list of findings.

### Root cause

The agent categorizes the root cause as {{< ui >}}Frontend{{< /ui >}}, {{< ui >}}Backend{{< /ui >}}, or {{< ui >}}Network{{< /ui >}}, with a confidence level of {{< ui >}}High{{< /ui >}}, {{< ui >}}Medium{{< /ui >}}, or {{< ui >}}Low{{< /ui >}}.

### Ranked findings

Each finding includes:

- {{< ui >}}Summary{{< /ui >}}: A description of the failure or degradation pattern.
- {{< ui >}}Code locations{{< /ui >}}: File path, line number, and surrounding snippet when source maps are available.
- {{< ui >}}Correlated APM endpoints{{< /ui >}}: Each with a {{< ui >}}View trace{{< /ui >}} link that opens the matching trace in APM.
- {{< ui >}}Error groups{{< /ui >}}: Affected session count, whether the error first appeared in a recent application version, and a {{< ui >}}View Sample Session{{< /ui >}} link that opens the session in the RUM Explorer.

{{< img src="real_user_monitoring/ai_investigations/operation-ai-investigation-finding.png" alt="An Operation AI Investigation side panel showing the investigation summary with confidence and category badges, a ranked Findings section with a frontend code-level finding, and the affected source code snippet." style="width:100%;" >}}

## Take action

After an investigation completes, you can act on findings without leaving the panel:

- {{< ui >}}Fix with Bits{{< /ui >}}: Opens the Bits AI dev assistant with the investigation context pre-filled to generate a code fix from your IDE.
- {{< ui >}}Copy Investigation Prompt{{< /ui >}}: Copies the agent's prompt to your clipboard so you can rerun, refine, or share it.
- {{< ui >}}View trace{{< /ui >}} on a correlated endpoint: Opens the matching trace in APM.
- {{< ui >}}View Sample Session{{< /ui >}} on an error group: Opens the session in the RUM Explorer.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/operations_monitoring/
[2]: /real_user_monitoring/rum_without_limits/
