---
title: Characteristics of Datadog histograms.
kind: faq
customnav: developersnav
---

## Characteristics of Datadog histograms?

At the moment, Datadog cannot compute percentiles on the server side.
Thus, percentiles & histogram statistics are computed by each datadog-agent every 10 seconds, [for configuration see here](/graphing/faq/how-to-graph-percentiles-in-datadog).

So you cannot get the 95thpercentile of metric values over the past X hours, you will get the metric of the 95th percentile:

* computed on a fixed 10 second interval.
* computed by each datadog-agent (host per host basis).

Note: Veneur is an open-source project by Stripe, aiming at aggregating histograms globally instead of on a host per host basis. You can check it out here: https://github.com/stripe/veneur.

It means our histograms are great if you want to get an idea of how your 10-second 95th percentile of your host request time evolves over time, but not if you need to:

* get this 95th percentiel over a time period different than 10 sec.
* or get the overall 95th percentile of the request time across hosts.

**Consequence 1: the 10 second flush interval can make all histogram stats equal**

Every 10 seconds, the datadog-agent reviews all histogram dogstatsd packets it has received, it computes statistics (max/avg/95percentile/count/mean) and send the resulting statistics as metrics to Datadog.

If during the 10 second flush interval of the dogstatsd server of the datadog-agent, there is only 1 histogram value (value = 1) that has been sent to host:X with histogram name response_time, the datadog-agent of this host:X will report to Datadog the same value for response_time.avg / .max / .95percentile / .mean = 1

If you have more than 1 value during the 10 second flush interval, let's say values = {1, 9, 8}, the histogram statistics will start to make sense and be different: .avg <= 6, .median <= 8, .max = 9, .count = 3 (number of points) etc.

**Consequence 2: the host per host aggregation makes the average of the average different from the global average you may be expecting.**

When you have several host reporting histogram metrics, Datadog aggregates their data but cannot restitute global percentiles/ avg etc.

For instance, if you graph avg:response_time.avg{*}, our system will list all sources ( = unique tag combination & host) reporting this metric. Let's use an example where data is seen coming from:

* host:X, env:live, request:A
* host:Y, env:live, request:A
* host:Z, env:live, request:A
* host:Z, env:live, request:B

{{< img src="developers/faq/metric_histogram.png" alt="metric_histogram"  responsive="true" >}}

Since the avg: aggregation has been chosen, the graph will report:
(value(source1) + value(source2) + value(source3) + value(source4) )/ 4

Example with data sets source by source: source1 {10,10,10}, source2 {1}, source3 {1}, source4{1}.
response_time.avg{source1} will be 10, for the other sources it will be 1.
Datadog will return (10 + 1 + 1 + 1)/4 = 3.25 which is different from the global average = 5.5

Whether the histogram value of source 1 was computed on 100 statsd values or 1, it will have the same weight in the calculation, hence the difference with a centralized aggregation system.
