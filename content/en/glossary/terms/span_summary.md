---
title: span summary
core_product:
  - apm
---

The span summary table in APM shows metrics for spans aggregated across all traces, including how often the span shows up among all traces, what percent of traces contain the span, the average duration for the span, and its typical share of total execution time of the requests. This helps you detect N+1 problems in your code so you can improve your application performance.

{{< img src="tracing/visualization/span-summary.png" alt="Span summary table" style="width:50%" >}}

The span summary table is only available for resources containing service entry spans, and contains the following information:

Average spans per trace
: Average number of occurrences of the span for traces, including the current resource, where the span is present at least once.

Percentage of traces
: Percentage of traces, including the current resource, where the span is present at least once.

Average duration
: Average duration of the span for traces, including the current resource, where the span is present at least once.

Average percentage of execution time
: Average ratio of execution time for which the span was active for traces, including the current resource, where the span is present at least once.

[1]: /glossary/#span
