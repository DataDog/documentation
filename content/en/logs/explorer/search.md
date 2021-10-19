---
title: Search logs
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

The search filter consists of a timerange and a search query mixing `key:value` and full-text search. Refer to our [log search syntax][1] and [timerange][2] documentation for details on advanced use cases. For example, the search query `service:payment status:error rejected` over a `Past 5 minutes` timerange:

{{< img src="logs/explorer/search_filter.png" alt="Search Filter" style="width:100%;" >}}

[Indexed Logs][3] support both full-text search and `key:value` search queries.

{{< site-region region="gov,us3,us5" >}}
**Note**: `key:value` queries require that you [declare a facet][4] beforehand.


{{< /site-region >}}

{{< site-region region="us,eu" >}}
**Note**: `key:value` queries **do not** require that you [declare a facet][4] beforehand.


{{< /site-region >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/search-syntax
[2]: /dashboards/guide/custom_time_frames
[3]: /logs/indexes
[4]: /logs/explorer/facets/
