---
title: Trace Groups
description: "Trace Groups"
private: true
aliases:
further_reading:
- link: 'tracing/trace_explorer'
  tag: 'Documentation'
  text: 'Trace Explorer'
- link: '/tracing/trace_explorer/query_syntax/'
  tag: 'Documentation'
  text: 'Span Query Syntax'
---

{{< callout url="https://www.datadoghq.com/support/" header="Request access to the Preview!" >}}
Trace Groups are in Preview. To request access, contact Datadog support.
{{< /callout >}}

## Overview

Trace groups allow you to define custom grouping keys for your trace data, enabling you to discover request count trends, performance bottlenecks, and error hotspots by looking at aggregated data instead of individual spans and traces. 

From the Trace Explorer query editor, you can group your results by any span tag or attribute to observe:

- Request counts
- Error rates
- Latency distributions

These metrics are organized within each group based on the distinct values of your chosen grouping keys.

## Query editor

1. Navigate to the [Trace Explorer][1].
1. Enter your query in the search bar.
1. Select up to four dimensions in the **Group by** clause, using any span tag or attribute.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_clause.png" alt="Group by clause" style="width:90%;" >}}


After selecting a dimension to group by, you can specify where to get the dimension's values from using the **from** dropdown: 
- **Span**: Group by the dimension of the queried span (default). For example, `a`.
- **Parent of span**: Group by the specified dimension from the parent span of spans matching the query. For example, to visualize how an API endpoint performs based on the service calling it, group by `service` from `parent(a)`.
- **Root span**: Group by the specified dimension from the root span of the trace. For example, to analyze backend request patterns based on the frontend pages requests originate from, group by `@view.name` from `root`.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_root.png" alt="Group by from root" style="width:90%;" >}}

## View trace groups in the group list

Trace groups are displayed as unique values of the selected dimension. Each group is shown with three key metrics:
- **REQUESTS**: Count of spans within the group.
- **ERRORS**: Error rate and count of errors.
- **P95 Latency**: p95 latency of spans.

To view these metrics aggregated over the parent or root span instead of the queried span, select `parent(a)` or `root` in the **Show metrics from** statement.

Additionally, the `Latency Breakdown` surfaces how time is spent between different services within requests from each group, allowing you to visually spot latency bottlenecks for given groups.

{{< img src="/tracing/trace_explorer/trace_groups/group_list.png" alt="Group list" style="width:90%;" >}}

For deeper analysis, click any group to examine the individual span events that make up the aggregated metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: app.datadoghq.com/apm/traces