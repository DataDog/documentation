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
{{< callout url="https://www.datadoghq.com/product-preview/automated-analysis/" btn_hidden="false" header="Join the Preview!" >}}
Automated Analysis is in Preview.
{{< /callout >}}

## Overview
Automated Analysis automatically detects performance issues in your applications using Continuous Profiler data and provides actionable insights for resolution. When an issue is detected, Automated Analysis provides:

- A high-level summary explaining the issue and why it matters
- Contextual insights from profiling data (for example, affected methods, packages, or processes)
- Recommended next steps to help you resolve the issue

This reduces the profiling expertise needed to identify and resolve performance issues in your applications that might otherwise go unnoticed.

{{< img src="profiler/profiling_automated_analysis_detail.png" alt="The Profiler Thread Time line showing a Thrown Exception insight" style="width:100%;" >}}

## Explore insights
Access Automated Analysis from the [Profile explorer][1]. Insights are displayed:

- In the **Insights** section at the top of the page
{{< img src="profiler/profiling_automated_analysis_section.png" alt="The Automated Analysis banner displaying insights detected for a given service" style="width:100%;">}}

- Within a flame graph view
{{< img src="profiler/profiling_automated_analysis_flamegraph.png" alt="The Automated Analysis column displaying insights detected for a given service within a flamegraph" style="width:100%;">}}

- Within a timeline view
{{< img src="profiler/profiling_automated_analysis_thread_timeline.png" alt="The Automated Analysis column displaying insights detected for a given service within a timeline" style="width:100%;">}}

Click an insight to see a high-level summary that explains the issue, contextual insights from profiling data, and recommended next steps.
{{< img src="profiler/profiling_automated_analysis_detail.png" alt="Expanded Profiling Insights showing the details of a detected Issue" style="width:100%;">}}

The Insights list page provides a centralized view of all detected issues across your services. It helps teams understand what's happening in their environments, prioritize what to investigate, and track whether recurring problems are improving over time.

{{< img  src="profiler/profiling_automated_analysis_list_page_home.png" alt="The list page showing detected insights across services" style="width:100%;">}}

Each row represents an insight type, summarizing:

- Service and runtime affected
- Insight type (for example, GC Pauses or High Lock Contention)
- Severity (for example, Info or Warning)

You can filter insights by runtime, service, or environment to narrow the list to the most important insights. Teams often use this view to identify patterns, such as multiple services affected by the same inefficiency. Clicking on an insight opens its detail panel.

## Supported insights

Automated Analysis supports finding the following insights:

| Name                         | Priority   | Supported Runtime       | Description |
|------------------------------|------------|-------------------------|-------------|
| Virtual Thread Pinning       | High       | Java                    | Triggers if virtual threads were pinned to their carrier threads for a prolonged time. |
| Virtual Thread Submit Failure| High       | Java                    | Triggers if virtual threads could not be scheduled for execution. |
| Event Loop Blocking          | Medium     | Node                    | Triggers if callbacks were running for an extended period of time on the Main Event Loop thread. |
| Sync-over-Async Blocking     | Medium     | .NET                    | Triggers if async functions are detected in CPU samples. |
| Allocation Stall             | Medium     | Java                    | Triggers if a thread had to be paused due to insufficient available memory. |
| Explicit GC                  | Medium     | Java                    | Triggers if there are `System.gc()` calls. |
| GC Setup                     | Medium     | Java                    | Triggers when one of the following is detected: serial GC used on a multi-core machine, parallel GC on a single-core machine, more GC threads configured than available cores, or parallel GC configured to run in one thread. |
| Deadlocked Threads Detected  | Medium     | Java                    | Triggers if max number of deadlocked threads over query context is greater than 0. |
| GC Pauses                    | Medium     | Java                    | Triggers if more than 10% of time was spent in GC pauses. |
| GC Pause Peak Duration       | Medium     | Java                    | Triggers if there is a GC pause longer than 1 second. |
| Stackdepth Setting           | Medium     | Java                    | Triggers if events were found with truncated stacktraces which may make it hard to understand profiling data. |
| Thrown Exceptions            | Medium     | Java                    | Triggers when the rate of thrown (caught and uncaught) exceptions per minute goes above a threshold (defaults to 10K). |
| VMOperation Peak Duration    | Medium     | Java                    | Triggers if a blocking VM operation (or combination of operations close in time) takes more than two seconds. Reports details about the operation with the highest duration. |
| VMOperations Ratio           | Medium     | Java                    | Triggers if the total amount of blocking VM operations is a significant part of a 60 second window. |
| CPU Burst                    | Medium     | Java                    | Triggers if there is more than 75% CPU utilization across a 10s window. |
| CPU Burst Saturation         | Medium     | Java                    | Triggers if there is at least 1 second where CPU utilization is at 100%. |
| Blocking VMOperations        | Medium     | Java                    | Triggers if blocking VM operations (or combination of operations close in time) take more than 5% of a profile. |
| Code Cache Size              | Medium     | Java                    | Triggers if the Code Cache was filled during a profile. |
| Unbalanced Parallelism       | Low        | Java                    | Triggers if at least one peer thread is performing less than half the work of another in the same span. |
| High Lock Contention         | Low        | Java, Go, Python        | Triggers if there is a high ratio of time waiting on locks to time spent on-CPU. |
| Libuv Pool Overload          | Low        | Node                    | Triggers if there were more concurrent tasks scheduled to run on the libuv thread pool than it has threads. |
| Excessive String Concatenation | Low      | .NET                    | Triggers if there is a high ratio of CPU time spent concatenating strings. |
| Thread Pool Size             | Low        | Java                    | Triggers if a thread pool is CPU-bound but is set to a size larger than the number of available cores. |
| Head of line blocking        | Low        | Java                    | Triggers if a queue event gets stuck behind the given activity. |
| Primitive Value Boxing       | Low        | Java                    | Triggers if more than 5% of CPU time was spent converting values between primitive and object values. |
| Duplicated Flags             | Low        | Java                    | Triggers if duplicate flags were provided to the runtime (for example, `-Xmx2g -Xmx5g`). This is a problem as it may lead to changes not having the expected effect. |
| Command Line Options Check   | Low        | Java                    | Triggers if undocumented, deprecated, or non-recommended option flags were detected. |
| GC Overhead                  | Low        | Java, Ruby, Go, Node    | Triggers if more than 20% of CPU time is related to GC activities or allocation overhead. |
| Context Switches             | Low        | Java                    | Triggers if the rate of context switches on the underlying system is greater than 50k per second. |
| DebugNonSafepoints           | Low        | Java                    | Triggers if a service is run with potentially less accurate settings for the profiler. |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling/explorer

