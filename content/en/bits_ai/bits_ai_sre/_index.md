---
title: Bits AI SRE
description: "Learn how Bits AI SRE autonomously investigates alerts and coordinates incident response to improve on-call operations."
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-ai-sre/"
    tag: "Blog"
    text: "Introducing Bits AI SRE, your AI on-call teammate"
cascade:
    site_support_id: bits_ai_sre
---

## Overview

Bits AI SRE is an autonomous AI agent that investigates alerts and coordinates incident response. When a monitor triggers, Bits proactively generates multiple hypotheses, queries relevant telemetry, and reasons over the data to help on-call engineers quickly identify the root cause. If the alert escalates to an incident, Bits supports the response by managing stakeholder communications, surfacing relevant knowledge base content, highlighting related incidents, and accelerating the postmortem and incident follow-up process. By reducing manual effort, Bits ensures smoother and more efficient on-call operations.

{{< img src="bits_ai/overview.png" alt="Bits AI analysis on a monitor alert" style="width:100%;" >}}

## Features

{{< whatsnext desc="Learn about how you can use Bits AI SRE:" >}}
   {{< nextlink href="bits_ai/bits_ai_sre/investigate_alerts" >}}Investigate alerts{{< /nextlink >}}
   {{< nextlink href="bits_ai/bits_ai_sre/coordinate_incidents" >}}Coordinate incidents{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}