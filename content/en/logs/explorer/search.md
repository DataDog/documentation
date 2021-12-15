---
title: Search Logs
kind: documentation
description: 'Filter logs; to narrow down, broaden, or shift your focus on the subset of logs of current interest.'
aliases:
    - /logs/explorer/search
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

[Indexed Logs][3] support both full-text search and `key:value` search queries.

{{< site-region region="gov,us3,us5" >}}
**Note**: `key:value` queries require that you [declare a facet][1] beforehand.

[1]: /logs/explorer/facets/
{{< /site-region >}}

{{< site-region region="us,eu" >}}
**Note**: `key:value` queries **do not** require that you [declare a facet][1] beforehand.

[1]: /logs/explorer/facets/
{{< /site-region >}}

### Search syntax

To begin searching for logs in Log Explorer, see the [Log Search Syntax documentation][1] and read the [time frame documentation][2] for more details on custom time frames.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/search-syntax
[2]: /dashboards/guide/custom_time_frames
[3]: /logs/indexes
