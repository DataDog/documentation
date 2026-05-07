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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ai_investigations/single_view_ai_investigation/
