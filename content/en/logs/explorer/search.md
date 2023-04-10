---
title: Search Logs
kind: documentation
description: 'Filter logs to narrow down, broaden, or shift your focus on the subset of logs of current interest.'
aliases:
    - /logs/search
further_reading:
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Learn how to group logs'
    - link: 'logs/explorer/visualize'
      tag: 'Documentation'
      text: 'Create visualizations from logs'
    - link: '/logs/explorer/export'
      tag: 'Documentation'
      text: 'Export views from the Log Explorer'
---

## Overview

While information from individual logs can be useful visualized as a list, sometimes valuable information can be accessed through aggregation. To access this information, search for logs in the [Log Explorer][1] and display them as timeseries, top lists, tree maps, pie charts, or tables.

Log Explorer search consists of a time range and a search query, mixing `key:value` and full-text search. 

## Search query

For example, to filter on logs produced by a web store service, with an error status, over the past fifteen minutes, create a custom query like `service:payment status:error rejected` and set the time range to the `Past 15 minutes`:

{{< img src="logs/explorer/search_filter.png" alt="Create a search query in the Log Explorer that filters for error logs of rejected payments for a web store service" style="width:100%;" >}}

[Indexed Logs][2] support both full-text search and `key:value` search queries.

**Note**: `key:value` queries **do not** require that you [declare a facet][3] beforehand.

## Search syntax

To start searching for logs and customizing the time frame in the Log Explorer, read the [Search Syntax documentation][4] and the [Custom Time Frames documentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/
[2]: /logs/indexes
[3]: /logs/explorer/facets/
[4]: /logs/search-syntax
[5]: /dashboards/guide/custom_time_frames
