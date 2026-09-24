---
title: Bits Chat Skills
description: "Use Bits Chat skills to build dashboards and notebooks, analyze traces, investigate cloud costs, and write DDSQL queries."
further_reading:
- link: "/bits_ai/bits_chat/"
  tag: "Documentation"
  text: "Bits Chat"
- link: "/bits_ai/skills_library/"
  tag: "Documentation"
  text: "Skills Library"
- link: "/cloud_cost_management/cloud_cost_skill/"
  tag: "Documentation"
  text: "Cloud Cost Skill in Bits Chat"
---

## Overview
Bits Chat has a range of specialized skills for tasks across Datadog. The most commonly used skills are described below.

## Dashboards
Build [dashboards][1] and widgets from natural language descriptions.

Example prompts:
- `Show me a dashboard of high-impact alerts from the past week and which services they affected`
- `Add a widget about CPU usage in the payments service`

## Notebooks
Create investigation [notebooks][2] and enhance existing ones with summaries and analysis.

Example prompts:
- `Create an investigation for the recent spike of errors in the checkout service`
- `Add an executive summary for this cost spike report`

## APM

### Trace analysis
Investigate an individual [trace][3] to diagnose what failed, where, and why.

Example prompts:
- `Why did this request fail?`
- `Summarize this trace and identify the root cause of the error`

### Latency investigations
Investigate latency on a service to identify bottleneck resources and what changed in its slow traces.

Example prompts:
- `What caused the latency spike for this service?`
- `What's the latency bottleneck for this service?`

## Cloud Cost Management
Investigate [cloud cost][4] changes and identify the teams or resources responsible. See [Cloud Cost Skill in Bits Chat][5].

Example prompts:
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

## DDSQL
Generate and run [DDSQL][6] queries against Datadog [telemetry data][7] using natural language.

Example prompts:
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Query average request latency for the payments service broken down by status code`
- `Show me a DDSQL query for the number of RUM sessions by country over the past day`

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/
[2]: /notebooks/
[3]: /tracing/trace_explorer/
[4]: /cloud_cost_management/
[5]: /cloud_cost_management/cloud_cost_skill/
[6]: /ddsql_editor/
[7]: /ddsql_reference/data_directory/
