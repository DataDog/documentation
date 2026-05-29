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

Single-View AI Investigation runs an agentic root-cause analysis on a single RUM view. When you find a session with poor performance, such as a page or screen that loaded slowly or threw errors, click **Investigate with AI**. Datadog's RUM agent inspects all the data attached to that view: errors, slow network requests, main-thread blocking, backend traces, CPU profiles, and device context.

Instead of manually combing through RUM events to figure out whether the cause was a slow API call, a heavy client-side computation, or a CDN issue, you get a ranked list of findings grouped by root-cause category: App Performance, Server Side, Third Party, and Environment. From there, you can follow up through a chat interface or save the results to a [Notebook][1] to share with your team.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="The Single-View AI Investigation panel showing categorized findings for a RUM view." style="width:100%;" >}}

## Launch an investigation

1. Open a RUM view side panel.
2. Click the **Investigate with AI** button.

   **Note**: The button can take up to 15 minutes to become available after a view ends.

The investigation runs and streams results into the side panel as they become available, so you can start reading the first findings before the analysis is complete.

## Data analyzed

To investigate a view, Datadog's RUM agent inspects the data Datadog has collected for that view and accesses correlated telemetry when it's available:

- **The view event** and its sub-events: [resources][2], [long tasks][3], [errors][4], and [user actions][5].
- **Aggregated performance signals** across the view, including auto-detected problems such as uncompressed resources, excessive script evaluation, and bandwidth inefficiencies.
- **Device and environment context** captured by the SDK (browser or operating system, geography, connection type, and other [RUM attributes][6]).
- **APM traces**, when the view's resources are correlated with backend traces. The agent uses the trace data to attribute server-side delays to specific spans and services. For more information, see [Correlate RUM with APM Traces][7].
- **Profiling data**, when [RUM profiling correlation][8] is enabled for the application. The agent uses CPU profiles to attribute App Performance findings to specific functions in your code.

The richer the data available for the view, the more precise the analysis. Correlating RUM with APM and enabling profiling helps the agent investigate beyond the client-side timeline.

## Sources of root causes

Datadog's RUM agent looks at four sources to identify the root causes of poor performance on a view:

| Source            | What is examined                                                                                              |
|-------------------|---------------------------------------------------------------------------------------------------------------|
| App Performance   | Client-side issues, such as main-thread contention, code execution, and rendering delays.               |
| Server Side       | Backend latency and server-side errors that affected the view.                                                |
| Third Party       | Performance impact from third-party scripts and libraries loaded by the application.                                 |
| Environment       | Network and infrastructure conditions that affected the user's experience.                                    |

## Read the results

Each finding is shown as a card with a title, a description of the issue, a severity level, and links to the affected events. Multiple findings appear ranked by impact so you can focus on the highest-impact issues first.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-results.png" alt="Results panel showing ranked findings with severity, descriptions, and links to the affected events." style="width:70%;" >}}

A lightweight chat interface lets you follow up on the analysis: ask for more detail on a specific finding, request additional context, or explore related symptoms.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-chat.png" alt="A chat interface inviting the user to ask follow-up questions about the issues found in the view." style="width:70%;" >}}

## Take action

After an investigation completes, you can act on findings without leaving the panel:

- **Save to a Notebook**: Exports the full timeline and findings to a [Notebook][1] to share with your team.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/
[2]: /real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[3]: /real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[4]: /real_user_monitoring/error_tracking/
[5]: /real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[6]: /real_user_monitoring/explorer/search/
[7]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[8]: /real_user_monitoring/correlate_with_other_telemetry/profiling/
