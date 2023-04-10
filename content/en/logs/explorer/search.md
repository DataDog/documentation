---
title: Search Logs
kind: documentation
description: 'Filter logs; to narrow down, broaden, or shift your focus on the subset of logs of current interest.'
aliases:
    - /logs/search
further_reading:
    - link: 'logs/explorer/group'
      tag: 'Documentation'
      text: 'Group queried logs'
    - link: 'logs/explorer/visualize'
      tag: 'Documentation'
      text: 'Create visualizations from logs'
    - link: '/logs/explorer/export'
      tag: 'Documentation'
      text: 'Export Log Explorer views'
---

## Overview

Log Explorer search consists of a time range and a search query, mixing `key:value` and full-text search.

### Search query

For example, to filter on logs produced by a specific service, with a specific status, over the past five minutes, you can create a custom query such as `service:payment status:error rejected` and set the time range to the `Past 5 minutes`:

{{< img src="logs/explorer/search_filter.jpg" alt="Search Filter" style="width:100%;" >}}

[Indexed Logs][1] support both full-text search and `key:value` search queries.

**Note**: `key:value` queries **do not** require that you [declare a facet][2] beforehand.

### Search syntax

To begin searching for logs in Log Explorer, see the [Log Search Syntax documentation][3] and read the [time frame documentation][4] for more details on custom time frames.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/indexes
[2]: /logs/explorer/facets/
[3]: /logs/search-syntax
[4]: /dashboards/guide/custom_time_frames
