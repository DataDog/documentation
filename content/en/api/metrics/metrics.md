---
title: Metrics
type: apicontent
order: 26
external_redirect: /api/#metrics
---
## Metrics
The metrics end-point allows you to:

* Post metrics data so it can be graphed on Datadog's dashboards
* Query metrics from any time period

As occurs within the Datadog UI, a graph can only contain a set number of points and as the timeframe over which a metric is viewed increases, aggregation between points occurs to stay below that set number.

Thus, if you are querying for larger timeframes of data, the points returned is more aggregated. The max granularity within Datadog is one point per second, so if you had submitted points at that interval and requested a very small interval from the query API (in this case, probably less than 100 seconds), you could end up getting all of those points back. Otherwise, Datadog algorithm tries to return about 150 points per any given time window, so you'll see coarser and coarser granularity as the amount of time requested increases. We do this time aggregation via averages.

We store metric points at the 1 second resolution, but we'd prefer if you only
submitted points every 15 seconds. Any metrics with fractions of a second timestamps gets rounded to the nearest second, and if any points have the same timestamp, the latest point overwrites the previous ones.

We have a soft limit of 100 timeseries per host, where a timeseries is
defined as a unique combination of metric name and tag.
