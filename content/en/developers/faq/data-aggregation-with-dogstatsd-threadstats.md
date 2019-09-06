---
title: Data aggregation with DogStatsD/Threadstats
kind: faq
---

The StatsD protocol enables you to fire many metrics and monitor your application code without blocking HTTP calls. Data is sampled in your application code, and then is transmitted via UDP to the [DogStatsD server][1] (embedded in the Datadog Agent) that aggregates and then sends data to Datadog's API endpoint. [Read more about the DogStatsD setup][1].

This article describes why and how the aggregation is performed.
Variations on the [Python threadstats library][2] are mentioned at the end of this article.

## Why aggregate metrics?

HTTP calls take time. The aggregation is meant to improve performance by reducing the number of API calls.

For instance, if you have a counter incremented 1,000 times (+1 each time) over a short amount of time, instead of making 1,000 separate API calls, the DogStatsD server aggregates it into a few API calls. Depending on the situation (see below), the library may submit—for instance—1 datapoint with value 1,000 or X aggregate datapoints with cumulated value 1,000.

## How is aggregation performed with the DogStatsD server?

[DogStatsD][1] uses a flush interval of 10 seconds. Every 10 seconds, [DogStatsD][1] checks all data received since the last flush (in the last 10 seconds). All values that corresponds to the same metric name and the same tags are aggregated together into a single value.

Note: with the StatsD protocol, the StatsD client doesn't send metrics with timestamps. The timestamp is added at the flush time. So for a flush occurring at 10:00:10, all data received by the [DogStatsD][1] server (embedded in the Datadog Agent) between 10:00:00 and 10:00:10 is rolled up in a single datapoint that gets 10:00:00 as timestamp.

### Aggregation rules per metric type

Among all values received during the same flush interval, the aggregated value is:

* Gauge: the most recent datapoint received.
* Count/Counter: the sum of the received values.
* Histogram: the min, max, sum, avg, 95 percentiles, count, median of all value received. See the [metrics documentation page][3] for more details.
* Set: the number of different values seen.
* Rate: the value difference divided by the time difference of the last 2 datapoints received.

[Find more information about each metric type][3].

## Threadstats variations

As in DogStatsD, Threadstats performs data aggregation for performance reasons.

### Variations

* the main difference is that metrics received by Threadstats may already have a timestamp
* metrics are not aggregated via a centralized server, but they are aggregated and flushed in a Python thread of your script. So you'll get a per-script aggregation instead of a per host aggregation

To handle timestamps, Threadstats uses 2 parameters: a flush interval and a roll-up interval.

* The flush interval defines the time interval between two consecutive {data aggregation + data submission}.
* The roll up interval defines the data granularity after aggregation.

### Example with flush_interval=10 and roll_up_interval=5

For instance, during the flush interval of 10 seconds (between 10:00:00 and 10:00:10), Threadstats receives 5 datapoints for the same metric name (a counter) and same tags, with {timestamps, values} being:

1. {09:30:15, 1}, {10:00:00, 2}, {10:00:04,1}, {10:00:05,1}, {10:00:09,1} # 1- original datapoints
2. {09:30:10, 1}, {10:00:00, 2}, {10:00:00,1}, {10:00:05,1}, {10:00:05,1} # 2- every datapoint in the same roll_up_interval (5 seconds) gets the same timestamp
3. {09:30:10, 1}, {10:00:00, 3}, {10:00:05,2} # 3- data is aggregated and only 4 values are eventually submitted to Datadog

For more information, see the [Threadstats aggregation][4] documentation.

[1]: /developers/metrics/dogstatsd_metrics_submission
[2]: /developers/faq/is-there-an-alternative-to-dogstatsd-and-the-api-to-submit-metrics-threadstats
[3]: /developers/metrics
[4]: https://github.com/DataDog/datadogpy/blob/master/datadog/threadstats/metrics.py
