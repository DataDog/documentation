---
title: How is data aggregated in graphs?
kind: faq
---

Within Datadog, a graph can only contain a set number of points and, as the timeframe over which a metric is viewed increases, aggregation between points occurs to stay below that set number.

Thus, if you are querying for larger timeframes of data, the points returned are more aggregated. The max granularity within Datadog is one point per second, so if you had submitted points at that interval and requested a very small time interval (in this case, probably less than two minutes), you could end up getting all of those exact points displayed. Otherwise, you'll see coarser and coarser granularity as the amount of time requested increases. We do this time aggregation via average, sum, min, max, or count.

