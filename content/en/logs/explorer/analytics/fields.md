---
title: Grouping Logs Into Fields
kind: documentation
description: 'Group queried logs into fields.'
further_reading:
- link: 'logs/explorer/'
  tag: 'Documentation'
  text: 'Learn about the Log Explorer'
- link: 'logs/explorer/analytics'
  tag: 'Documentation'
  text: 'Learn how to analyze your logs'
---

## Overview

When aggregating indexed logs by **Fields**, all logs matching your query filter are aggregated into groups based on the value of one or multiple log facets. 

{{< img src="logs/explorer/aggregations.jpg" alt="A bar graph displaying logs and the option to group into fields, patterns, and transactions" style="width:100%;" >}}

On top of these aggregates, you can extract the following measures:

- **count of logs** per group
- **unique count** of coded values for a facet per group
- **statistical operations** (`min`, `max`, `avg`, and `percentiles`) on numerical values of a facet per group

Individual logs with multiple values for a single facet belong to that many aggregates. For instance, a log with the `team:sre` and the `team:marketplace` tags are counted once in the `team:sre` aggregate and once in the `team:marketplace` aggregate.

## Visualize logs as fields

The **Fields** aggregation supports one dimension for the [Top List][1] visualization, and up to four dimensions for the [Timeseries][2] and [Table][3] visualizations. 

When there are multiple dimensions, the top values are determined according to the first dimension, then according to the second dimension within the top values of the first dimension, then according to the third dimension within the top values of the second dimension.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/explorer/visualize/#top-list
[2]: /logs/explorer/visualize/#timeseries
[3]: /logs/explorer/visualize/#nested-tables