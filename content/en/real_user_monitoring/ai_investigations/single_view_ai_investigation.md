---
title: Single-View AI Investigation
description: "Run an agentic investigation on a single RUM view to surface root causes of poor user experience."
further_reading:
  - link: "/real_user_monitoring/ai_investigations/"
    tag: "Documentation"
    text: "AI Investigations overview"
  - link: "/real_user_monitoring/explorer/"
    tag: "Documentation"
    text: "RUM Explorer"
  - link: "/real_user_monitoring/explorer/events/"
    tag: "Documentation"
    text: "View event side panel"
---

## Overview

Single-View AI Investigation runs an agentic root-cause analysis on a single RUM view. Datadog's RUM agent inspects the view event and its sub-events to surface structured symptoms and the most plausible explanations for why the user's experience was poor — long tasks blocking the main thread, slow backend responses, expensive third-party scripts, and so on.

The goal is to compress the path from signal to plausible explanation. Instead of manually parsing attributes and sub-events to understand what happened, you get a curated set of findings — ranked by impact — directly in the view side panel where you already work. From there, you can iterate through a chat interface and save the result to a [Notebook][1] for sharing.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="The Single-View AI Investigation panel showing categorized findings for a RUM view." style="width:100%;" >}}

## Data analyzed

To investigate a view, Datadog's RUM agent inspects the data Datadog has collected for that view, and reaches out to correlated telemetry when it's available:

- **The view event** and its sub-events: [resources][2], [long tasks][3], [errors][4], and [user actions][5].
- **Aggregated performance signals** across the view, including auto-detected problems such as uncompressed resources, excessive script evaluation, and bandwidth inefficiencies.
- **Device and environment context** captured by the SDK (browser, geography, connection type, and other [RUM attributes][6]).
- **APM traces**, when the view's resources are correlated with backend traces. The agent uses the trace data to attribute server-side delays to specific spans and services. For more information, see [Correlate RUM with APM Traces][7].
- **Browser profiling data**, when [Browser profiling][8] is enabled for the application. The agent uses CPU profiles to attribute App Performance findings to specific JavaScript functions in your code.

The richer the data available for the view, the more precise the analysis. Correlating RUM with APM and enabling Browser profiling helps the agent investigate beyond the frontend timeline.

## Launch an investigation

1. Open a RUM view side panel.
2. Click **Investigate**.

The investigation runs and streams results into the side panel as they become available, so you can start reading the first findings before the analysis is complete.

## Sources of root causes

Datadog's RUM agent looks at four sources to identify the root causes of poor performance on a view:

| Source            | What is examined                                                                                              |
|-------------------|---------------------------------------------------------------------------------------------------------------|
| App Performance   | Browser and client-side issues, such as long tasks, JavaScript execution, and rendering delays.               |
| Server Side       | Backend latency and server-side errors that affected the view.                                                |
| Third Party       | Performance impact from third-party scripts and libraries loaded on the page.                                 |
| Environment       | Network and infrastructure conditions that affected the user's experience.                                    |

## Read the results

Each finding is shown as a card with a title, a description of the issue, a severity level, and links to the affected events. When multiple findings are surfaced, they are ranked so you can focus on the highest-impact issues first.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-results.png" alt="Results panel showing ranked findings with severity, descriptions, and links to the affected events." style="width:100%;" >}}

A lightweight chat interface lets you follow up on the analysis: ask for more detail on a specific finding, request additional context, or explore related symptoms.

When you're done, save the investigation to a [Notebook][1] for sharing with your team or for future reference.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/
[2]: /real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[3]: /real_user_monitoring/application_monitoring/browser/data_collected/#view-timing-attributes
[4]: /real_user_monitoring/error_tracking/
[5]: /real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[6]: /real_user_monitoring/explorer/search/
[7]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[8]: /real_user_monitoring/correlate_with_other_telemetry/profiling/
