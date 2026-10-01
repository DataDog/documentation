---
title: Use Bits Chat in RUM
description: "Ask Bits Chat why a specific view is slow, analyze RUM charts, and complete RUM tasks in plain language."
aliases:
  - /real_user_monitoring/ai_investigations/single_view_ai_investigation/
further_reading:
  - link: "/real_user_monitoring/bits_ai/"
    tag: "Documentation"
    text: "Bits AI in RUM"
  - link: "/bits_ai/bits_chat/"
    tag: "Documentation"
    text: "Bits Chat"
  - link: "/real_user_monitoring/explorer/events/"
    tag: "Documentation"
    text: "View event side panel"
---

## Overview

[Bits Chat][1] is available on every RUM page. It knows which page you are on and what you are looking at, and it can query your RUM data alongside your traces, logs, and profiles. Use it to:

- [Find out why a specific view is slow](#find-out-why-a-view-is-slow)
- [Analyze a chart](#analyze-a-chart)
- [Ask questions and complete tasks](#ask-questions-and-complete-tasks)

## Find out why a view is slow

1. Open a view in the [RUM Explorer][2] or in [Session Replay][3].
2. In the performance section of the view side panel, click {{< ui >}}Ask Bits{{< /ui >}}.

Bits Chat opens and investigates that specific page load. It reconstructs the view's load timeline from its [resources][4], [long tasks][5], [errors][6], and [user actions][7], and examines four sources of root causes:

| Source | What Bits examines |
|---|---|
| App Performance | Client-side issues, such as main-thread contention, code execution, and rendering delays. |
| Third Party | The impact of third-party scripts and libraries loaded by the application. |
| Server Side | Backend latency and server-side errors that affected the view, using [correlated APM traces][8]. |
| Environment | The user's device and network conditions. |

Bits returns ranked findings with links to the underlying events. You can then ask follow-up questions, such as "Is this happening to other users on this page?" or "Which backend endpoint is the slowest here?"

<!-- TODO: screenshot of the view side panel with Ask Bits open, showing ranked findings -->

## Analyze a chart

On the RUM summary page, click {{< ui >}}Analyze with Bits AI{{< /ui >}} on a vital chart or on the error rate chart. Bits Chat summarizes how the metric is trending and what is driving it.

## Ask questions and complete tasks

You can ask Bits Chat about your frontend in plain language from any RUM page, and have it act on RUM for you. For example:

- "Which pages in this application have the worst INP right now, and which interactions cause it?"
- "Find sessions with 5xx errors on the checkout page in the last hour, grouped by error type." On the RUM Explorer, Bits applies the query for you.
- "Which functions are slowing down my LCP?" from the RUM Profiling page.
- "Create a retention filter that keeps 25% of sessions with errors."
- "Create an operation that tracks checkout from the cart page to the order confirmation page."

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: /real_user_monitoring/explorer/
[3]: /session_replay/
[4]: /real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[5]: /real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[6]: /real_user_monitoring/error_tracking/
[7]: /real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[8]: /real_user_monitoring/correlate_with_other_telemetry/apm/
