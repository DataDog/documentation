---
title: Search Spans
description: 'Filter spans to narrow down, broaden, or shift your focus on the subset of spans of current interest.'
further_reading:
    - link: 'tracing/trace_explorer/query_syntax'
      tag: 'Documentation'
      text: 'Query Syntax'
    - link: "/getting_started/search/"
      tag: "Documentation"
      text: "Getting Started with Search in Datadog"
---

## Overview

While information from individual spans can be useful visualized as a list, sometimes valuable information can be accessed through aggregation. To access this information, search spans in the Trace Explorer and display them as timeseries, top lists, or tables.

Trace Explorer search consists of a time range and a search query that combines `key:value` and full-text search. Choose which dimension to visualize (count of spans, count of unique values, measure of a quantitative dimension), select a time frame, and group the query by one or multiple dimensions.

## Search query

For example, to find spans from a web store service and production environment, over the past thirty minutes, create a custom query like `service:web-store env:prod`, and set the time range to the `Past 30 minutes`:

{{< img src="tracing/trace_explorer/search/trace_explorer_search.png" alt="Trace Explorer list search, where user has searched for 'service:web-store' and 'env:prod'" style="width:100%;">}}

Group the query by `http.route` to see which specific endpoints are most affected. Read more in trace groups.

{{< img src="tracing/trace_explorer/search/trace_explorer_group_by.png" alt="Trace Explorer list search. The Visualize As option is set to Top List." style="width:100%;">}}

## Query Syntax

To begin searching for spans in the Trace Explorer, read the [query syntax documentation][2] and the [time frame documentation][3] for more details on custom time frames.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/query_syntax/#facets
[2]: /tracing/trace_explorer/query_syntax
[3]: /dashboards/guide/custom_time_frames
