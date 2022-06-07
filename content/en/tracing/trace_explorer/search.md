---
title: Search Spans
kind: documentation
description: 'Filter spans; to narrow down, broaden, or shift your focus on the subset of logs of current interest.'
aliases:
    - /tracing/explorer/search
    - /tracing/search
further_reading:
    - link: 'tracing/trace_explorer/query_syntax'
      tag: 'Documentation'
      text: 'Query Syntax'
---

## Overview

Use the Trace Explorer to search for **spans**. Trace Explorer search consists of a time range and a search query, mixing `key:value` and full-text search.

Spans can be valuable as individual events visualised as a **list**, but sometimes valuable information lives in an aggregation of events. In order to expose this information, pivot to **timeseries** view, **top list** view or **table** view. Choose which dimension to visualise (count of spans, count of unique values, measure of a quantitative dimension) and group the query by one or multiple dimensions.

## Search query

For example, to filter on spans from a specific service, with a specific status, over the past thirty minutes, you can create a custom query such as `service:web-store status:error` and set the time range to the `Past 30 minutes`:

{{< img src="tracing/trace_explorer/search/trace_explorer_list_search.png" alt="Trace Explorer list search"  style="width:100%;">}}

Pivot to a top list view, and group the query by `resource` to see which specific resources are most affected.

{{< img src="tracing/trace_explorer/search/trace_explorer_top_list_search.png" alt="Trace Explorer list search"  style="width:100%;">}}

{{< site-region region="us,eu,gov,us3,us5" >}}
**Note**: `key:value` queries **do not** require that you [declare a facet][1] beforehand.

## Query Syntax

To begin searching for spans in the Trace Explorer, see the [query syntax][2] documentation and the [time frame][3] documentation for more details on custom time frames.

{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/query_syntax#facets
[2]: /tracing/trace_explorer/query_syntax
[3]: /dashboards/guide/custom_time_frames
