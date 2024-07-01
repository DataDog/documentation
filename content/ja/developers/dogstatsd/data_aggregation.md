---
title: DogStatsD Data Aggregation
kind: documentation
description: Learn how the DogStatsD server aggregates your data before sending it to Datadog
aliases:
    - /developers/faq/data-aggregation-with-dogstatsd-threadstats
further_reading:
    - link: developers/dogstatsd
      tag: Documentation
      text: Introduction to DogStatsD
    - link: developers/libraries
      tag: Documentation
      text: Official and Community created API and DogStatsD client libraries
---

Datadog DogStatsD implements the StatsD protocol [with some differences][1]. DogStatsD enables you to send metrics and monitor your application code without blocking it. Data is transmitted from your application through UDP to the local [DogStatsD server][2] (embedded in the Datadog Agent), which aggregates and then sends it to Datadog's API endpoint. Read more about the [DogStatsD setup][2].

This article describes why and how the aggregation is performed over your data.

## Why aggregate metrics?

Aggregation improves performance by reducing the number of API calls, each of which takes a certain amount of time.

Consider a [COUNT metric][3] that is incremented 1,000 times (+1 each time) over a short amount of time. Instead of making 1,000 separate API calls, the DogStatsD server aggregates it into a few API calls. Depending on the situation (see below), the library may submit—for instance—1 datapoint with value 1,000 or X aggregate datapoints with a cumulated value of 1,000.

## How is aggregation performed with the DogStatsD server?

[DogStatsD][2] uses a _flush interval_ of 10 seconds. Every 10 seconds, [DogStatsD][2] checks all data received since the last flush. All values that correspond to the same metric name and the same tags are aggregated together into a single value.

**Note**: With the StatsD protocol, the StatsD client doesn't send metrics with timestamps. The timestamp is added at the flush time. So for a flush occurring at 10:00:10, all data received by the [DogStatsD][2] server (embedded in the Datadog Agent) between 10:00:00 and 10:00:10 is rolled up in a single datapoint that gets 10:00:00 as timestamp.

## Aggregation rules per metric type

Among all values received during the same flush interval, the aggregated value send depends on the [metric type][4]:

| Metric Type       | Aggregation performed over one flush interval                                                 |
|-------------------|-----------------------------------------------------------------------------------------------|
| [GAUGE][5]        | The latest datapoint received is sent.                                                        |
| [COUNT][3]        | The sum of all received datapoints is sent.                                                   |
| [HISTOGRAM][6]    | The min, max, sum, avg, 95 percentiles, count, and median of all datapoints received is sent. |
| SET               | The number of different datapoints is sent.                                                   |
| [DISTRIBUTION][7] | Aggregated as global distributions.                                                           |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: /metrics/types/?tab=count#metric-types
[4]: /metrics/types/
[5]: /metrics/types/?tab=gauge#metric-types
[6]: /metrics/types/?tab=histogram#metric-types
[7]: /metrics/types/?tab=distribution#metric-types
