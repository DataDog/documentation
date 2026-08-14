---
title: Tail-Based Sampling Processor
disable_toc: false
products:
- name: Traces
  icon: apm
  url: /observability_pipelines/configuration/?tab=traces#pipeline-types
---

{{< product-availability >}}

## Overview

The Tail-based Sampling processor determines whether the Worker keeps a completed trace based on sampling policies that you define. This processor can sample based on the full context of a trace, such as its status code, latency, or associated events.

## Setup

To set up the tail-based sampling processor:

1. Define a {{< ui >}}filter query{{< /ui >}}. See [APM Query Syntax][1] for more information.
    - Only traces that match the specified filter query are evaluated against your sampling policy groups.
1. Click {{< ui >}}Manage sampling policies{{< /ui >}} to add at least one policy group.

### Add a sampling policy group

1. Enter a {{< ui >}}Policy Group Name{{< /ui >}}.
1. Click to add a policy, and select a {{< ui >}}Policy Type{{< /ui >}}:
    - {{< ui >}}Condition{{< /ui >}}: Keep traces when any associated event matches the specified query.
    - {{< ui >}}Status code{{< /ui >}}: Keep traces that have the selected status code.
    - {{< ui >}}Latency{{< /ui >}}: Keep traces whose total duration falls within the specified bounds.
    - {{< ui >}}Sampling rate{{< /ui >}}: Keep this percentage of traces, sampled consistently by trace ID.
    - **Note**: If a trace matches a policy group, it's kept and sent to the next step in the pipeline. If a trace doesn't match any policy group, it's dropped.
1. (Optional) Click to add more policies to the policy group. A trace matches a policy group only if it satisfies all of the policies within that group.
1. (Optional) Repeat these steps to add more policy groups.
1. Click **Save**.

[1]: /tracing/trace_explorer/query_syntax/
