---
title: Group RUM Events
kind: documentation
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Search for your events"
---

## Overview

Product Analytics events are valuable both individually and collectively. The search query contains information to aggregate a subset of events.

{{< img src="product_analytics/analytics/group/group-overview.png" alt="Group into fields section of the Search query" style="width:100%;" >}}

Your selection of fields to group, aggregate, and measure your events are preserved as you switch between visualization types.

## Aggregate by fields

All Product Analytics events that match your filter query are aggregated into groups based on the value of one or several event facets. You can extract the following measures in addition to the aggregates:

- Count of events per group

  {{< img src="product_analytics/analytics/group/group_count_of_events.png" alt="Group by count of events" style="width:90%;" >}}

- Unique count of coded values for a facet per group

  {{< img src="product_analytics/analytics/group/group-count-of-coded-values.png" alt="Group by unique count of coded values" style="width:90%;" >}}

- Statistical operations (such as minimum, maximum, average, and percentiles) on a facet's numerical values per group

  {{< img src="product_analytics/analytics/group/group-statistical-operations.png" alt="Group into fields using statistical operations" style="width:90%;" >}}

Individual events with multiple values for a single facet belong to that number of aggregates. For example, an event with the `country:france` and `browser:chrome` attributes are counted once in the `country:france` aggregate and once in the `browser:chrome` aggregate.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/visualize#top-list
[2]: /real_user_monitoring/explorer/visualize#timeseries
[3]: /real_user_monitoring/explorer/visualize#lists