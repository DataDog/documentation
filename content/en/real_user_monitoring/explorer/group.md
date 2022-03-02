---
title: Group RUM Events
kind: documentation
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Search for your events"
---

## Overview

Real User Monitoring (RUM) events are valuable both individually and collectively. The search query contains information to aggregate a subset of events. 

{{< img src="real_user_monitoring/explorer/group_into_fields.png" alt="Group into fields section of the Search query" style="width:90%;" >}}

Your selection of fields to group, aggregate, and measure your events by do not change as you switch between visualization types.

## Aggregate by fields

All RUM events that match your filter query are aggregated into groups based on the value of one or several event facets. You can extract the following measures in addition to the aggregates:

- Count of events per group
- Unique count of coded values for a facet per group
- Statistical operations (such as minimum, maximum, average, and percentiles) on a facet's numerical values per group

Individual events with multiple values for a single facet belong to that number of aggregates. For example, a RUM event with the `country:france` and `browser:chrome` attributes are counted once in the `country:france` aggregate and once in the `browser:chrome` aggregate.

The **Group into fields** aggregation supports one dimension for the [Top list][1] visualization and up to three dimensions for [timeseries][2], [list][3], and [table][4] visualizations. When there are multiple dimensions, the top values are determined based on the first dimension, then the second dimension within the top values of the first dimension, then the third dimension within the top values of the second dimension, and so on.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/visualize#top-list
[2]: /real_user_monitoring/explorer/visualize#timeseries
[3]: /real_user_monitoring/explorer/visualize#lists
[4]: /real_user_monitoring/explorer/visualize#nested-tables
