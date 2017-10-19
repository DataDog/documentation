---
title: Metrics
type: apicontent
order: 5
---
## Metrics
The metrics end-point allows you to:

* Post metrics data so it can be graphed on Datadog's dashboards
* Query metrics from any time period

As occurs within the Datadog UI, a graph can only contain a set number of points and as the timeframe over which a metric is viewed increases, aggregation between points will occur to stay below that set number.

Thus, if you are querying for larger timeframes of data, the points returned will be more aggregated. The max granularity within Datadog is one point per second, so if you had submitted points at that interval and requested a very small interval from the query API (in this case, probably less than 100 seconds), you could end up getting all of those points back. Otherwise, our algorithm tries to return about 150 points per any given time window, so you'll see coarser and coarser granularity as the amount of time requested increases. We do this time aggregation via averages.
