---
title: Trace Groups
description: "Trace Groups"
aliases:
further_reading:
- link: 'tracing/trace_explorer'
  tag: 'Documentation'
  text: 'Trace Explorer'
- link: '/tracing/trace_explorer/query_syntax/'
  tag: 'Documentation'
  text: 'Span Query Syntax'
---

## Overview

Trace Groups allow you to define custom grouping keys for their trace data, enabling you to discover request count trends, performance bottlenecks, and error hotspots by looking at aggregated data instead of viewing individual spans and traces. 
From the trace explorer query editor, group your results by any span tag or attribute to observe request counts, error rates, and latency distributions within each group, defined by the distinct values of the grouping key.

## Query editor

First specify your query from the [trace explorer][1] query bar, then select up to 4 dimensions in the `Group by` clause, using any span tag or attribute.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_clause.png" alt="Group by clause" style="width:90%;" >}}


Optionally, after selecting a dimension to group by, select the target span to use to define the group by within: 
- **span**: Simple group by clause, using the dimension of the queried span.
- **parent of span**: Group by the specified dimension from the parent span of the queried span. For instance, to visualise how an API endpoint performs based on the service calling it, group by `service` from `parent(a)`.
- **root span**: Group by the specified dimension from the root span of the trace. For instance, to analyse request rates patterns on a backend server based on the frontend application pages requests originate from, group by `@view.name` from `root`.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_root.png" alt="Group by from root" style="width:90%;" >}}

## Group list

Trace groups are displayed as unique values of the selected dimension. Each group is shown with three key metrics:
- **Requests**: Count of spans within the group.
- **Errors**: Error rate and count of errors.
- **p95 Latency**: p95 latency of spans.

To view metrics (requests, errors, and p95 latency) aggregated over the parent or root span instead of the span identified by the query, select `parent(a)` or `root` in the `Show metrics from` statement.

Additionally, the `Latency Breakdown` surfaces how time is spent between different services within requests from each group, allowing you to visually spot latency bottlenecks for given groups.

{{< img src="/tracing/trace_explorer/trace_groups/group_list.png" alt="Group list" style="width:90%;" >}}

Click on any group to drill down from aggregated metrics to individual span events for deeper analysis.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: app.datadoghq.com/apm/traces