---
title: Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?
kind: faq
---

There are two important distinctions to be aware of:

1. In AWS for counters, a graph that is set to 'sum' '1minute' shows the total number of occurrences in one minute leading up to that point, i.e. the rate per 1 minute. Datadog is displaying the raw data from AWS normalized to per second values, regardless of the timeframe selected in AWS, which is why you probably see our value as lower.
2. Overall, min/max/avg have a different meaning within AWS than in Datadog. In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog pulls metrics from AWS Cloudwatch, we only get the average latency as a single timeseries per ELB. Within Datadog, when you are selecting 'min', 'max', or 'avg', you are controlling how multiple timeseries are combined. For example, requesting system.cpu.idle without any filter would return one series for each host that reports that metric and those series need to be combined to be graphed. On the other hand, if you requested system.cpu.idle from a single host, no aggregation would be necessary and switching between average and max would yield the same result.

How do I conform my data on Datadog to what I am seeing on CloudWatch? Can I use Rollup()?

1. Using the example above, AWS CloudWatch reports metrics at 1 minute granularity normalized to per minute data, so it is as easy as multiplying by 60 because we report metrics at 1 minute granularity normalized to per second data.
2. Rollups don't display similar results; the attempted rollup call would be rollup(sum, 60), where the server groups all data points in minute bins and return the sum of each bin as a datapoint. However, the granularity of AWS metrics is 1 minute, so there is only one datapoint per bin leading to no change.

