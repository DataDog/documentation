---
title: AI Investigations
description: "Datadog's agentic investigations bring structured, first-pass root-cause analysis directly into your RUM workflows."
further_reading:
  - link: "/real_user_monitoring/explorer/"
    tag: "Documentation"
    text: "Learn about the RUM Explorer"
---

## Overview

Datadog's agentic investigations bring structured, first-pass root-cause analysis directly into the RUM workflows you already use. Instead of manually parsing attributes and sub-events to understand what happened during a specific page load or interaction, you can trigger an agentic investigation and let Datadog's RUM agent surface the structured symptoms and the most plausible explanations.

Each investigation runs against a focused scope and produces a curated set of findings, each with a severity, a description, and links to the affected events. From there, you can iterate on the analysis through a lightweight chat interface to ask follow-up questions, request more detail, or explore related symptoms. When you're done, you can export the investigation to a [Notebook][1] for sharing with your team.

This page lists the investigation types available today. New investigation types are added as they ship.

## Single-View AI Investigation

Run an agentic investigation on a single RUM view to understand what contributed to a poor user experience on that specific page load. Datadog's RUM agent inspects the view event and its sub-events to identify root causes from sources spanning the browser, the backend, third-party scripts, and the user's network environment.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="A Single-View AI Investigation surfacing root cause findings for a RUM view." style="width:100%;" >}}

For more information, see [Single-View AI Investigation][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/
[2]: /real_user_monitoring/ai_investigations/single_view_ai_investigation/
