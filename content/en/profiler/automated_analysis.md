---
title: Automated Analysis
description: Automatically surface critical issues with contextual insights and recommended next steps
further_reading:
    - link: 'profiler/enabling'
      tag: 'Documentation'
      text: 'Enable continuous profiler for your application'
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tag: 'Blog'
      text: 'Introducing always-on production profiling in Datadog'
    - link: 'https://www.datadoghq.com/blog/continuous-profiler-timeline-view/'
      tag: 'Blog'
      text: "Diagnose runtime and code inefficiencies using Continuous Profiler's timeline view"
---
{{< callout url="https://corpsite-preview.datadoghq.com/fitzage/web-6620/product-preview/automated-analysis/" btn_hidden="false" header="Join the Preview!" >}}
Automated Analysis is in Preview.
{{< /callout >}}

## Overview
Automated Analysis automatically detects performance issues in your applications using Continuous Profiler data and provides actionable insights for resolution. When an issue is detected, Automated Analysis provides:

- A high-level summary explaining the issue and why it matters
- Contextual insights from profiling data (for example, affected methods, packages, or processes)
- Recommended next steps to help you resolve the issue

This reduces the profiling expertise needed to identify and resolve performance issues in your applications that might otherwise go unnoticed.

{{< img src="profiler/profiling_automated_analysis.png" alt="The Profiler Thread Time line showing a Thrown Exception insight" style="width:100%;" >}}

## Explore insights
Access Automated Analysis from the [Profile explorer][1]. Insights are displayed:

- In the **Top Insights** banner at the top of the page when you're scoped to a specific service
{{< img src="profiler/profiling_automated_analysis_banner.png" alt="The Automated Analysis banner displaying insights detected for a given service" style="width:100%;">}}

- In the **Insights** column within the service list
{{< img src="profiler/profiling_automated_analysis_column.png" alt="The Automated Analysis column displaying insights detected for a given service within the service list" style="width:100%;">}}

- Within a flame graph view
{{< img src="profiler/profiling_automated_analysis_flamegraph_viz.png" alt="The Automated Analysis column displaying insights detected for a given service within a flamegraph" style="width:100%;">}}

- Within a timeline view
{{< img src="profiler/profiling_automated_analysis.png" alt="The Automated Analysis column displaying insights detected for a given service within a timeline" style="width:100%;">}}

Click an insight to see a high-level summary that explains the issue, contextual insights from profiling data, and recommended next steps.
{{< img src="profiler/profiling_automated_analysis_details.png" alt="Expanded Profiling Insights showing the details of a detected Issue" style="width:100%;">}}

## Supported insights

Automated Analysis supports finding the following insights:

| Name                      | Severity | Description |
|---------------------------|----------|-------------|
| Duplicated Flags          | Info     | Triggers if duplicate flags were provided to the runtime (for example, `-Xmx2g -Xmx5g`). This is a problem as it may lead to changes not having the expected effect. |
| Explicit GC               | Info     | Triggers if there are System.gc() calls. |
| GC Pause Peak Duration    | Info     | Triggers if at least one GC pause took more than 1 second. |
| GC Setup                  | Info     | Triggers when one of the following is detected - serial GC used on a multi-core machine, parallel GC on a single-core machine, more GC threads were configured than available cores, or a parallel GC was configured to run in 1 thread |
| Head of line blocking     | Info     | Triggers if a queue event gets stuck behind the given activity. |
| Primitive Value Boxing    | Info     | Triggers if more than 5% of CPU time was spent doing primitive<>object value conversions. |
| Deadlocked Threads Detected | Warn   | Triggers if max number of deadlocked threads over query context is bigger than 0. |
| GC Pauses                 | Warn     | Triggers if more than 10% of time was spent in GC pauses. |
| Options                   | Warn     | Triggers if undocumented, deprecated or non-recommended option flags were detected. |
| Stackdepth Setting        | Warn     | Triggers if events were found with truncated stacktraces which may make it hard to understand profiling data. |
| Thrown Exceptions         | Warn     | Triggers when the rate of thrown (caught and uncaught) exceptions per minute goes above a threshold (defaults to 10K) |
| VMOperation Peak Duration | Warn     | Triggers if a blocking VM operation (or combination of operations close in time) takes more than 2 seconds. Reports details about the operation with the highest duration. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling/explorer

