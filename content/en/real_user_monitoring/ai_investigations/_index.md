---
title: AI Investigations
description: "Datadog's agentic investigations bring structured, first-pass root-cause analysis directly into your RUM workflows."
further_reading:
  - link: "/real_user_monitoring/explorer/"
    tag: "Documentation"
    text: "Learn about the RUM Explorer"
---

## Overview

Investigating poor user experience in RUM typically means switching between session replays, error panels, traces, and performance timelines to piece together what went wrong. AI Investigations automate that first-pass triage. Datadog's RUM agent inspects the data attached to your views and surfaces ranked, categorized root-cause findings directly in your RUM workflow.

This page lists the available investigation types.

## Single-view AI investigation

Run an agentic investigation on a single RUM view to investigate performance issues or identify optimization opportunities on that specific page or screen. Datadog's RUM agent inspects the view event and its sub-events to identify root causes from sources spanning the application, the backend, third-party libraries, and the user's network environment.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="A Single-View AI Investigation surfacing root cause findings for a RUM view." style="width:100%;" >}}

For more information, see [Single-View AI Investigation][1].

## Multi-view AI investigation

Run an agentic investigation across a sample of views that share a slow Core Web Vital. Multi-View AI Investigation extends the same agentic analysis to a population of views, helping you identify what to fix when an entire (view × vital) pair is consistently slow across users. Available from the Optimization page for Loading Time, Largest Contentful Paint, First Contentful Paint, and Interaction to Next Paint.

{{< img src="real_user_monitoring/ai_investigations/multi-view-ai-investigation-recommendations.png" alt="The Optimization page for a Core Web Vital, showing ranked recommendation cards with an Investigate button on each." style="width:100%;" >}}

For more information, see [Multi-View AI Investigation][2].

## Operation AI investigation

Run an agentic investigation on a single operation in [Operations Monitoring][3]. The agent analyzes both the success rate and the latency of the operation, surfacing focused investigations for each failure mode (errors, timeouts, abandonment) and for latency regressions.

{{< img src="real_user_monitoring/ai_investigations/operation-ai-investigation-recommendations.png" alt="The Operations page for an operation, showing a plain-language health summary and ranked recommendation cards tagged with priority badges." style="width:100%;" >}}

For more information, see [Operation AI Investigation][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ai_investigations/single_view_ai_investigation/
[2]: /real_user_monitoring/ai_investigations/multi_view_ai_investigation/
[3]: /real_user_monitoring/operations_monitoring/
[4]: /real_user_monitoring/ai_investigations/operation_ai_investigation/
