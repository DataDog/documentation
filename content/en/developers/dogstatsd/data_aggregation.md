---
title: DogStatsD Data Aggregation
kind: documentation
description: Learn how the DogStatsD server aggregates your data before sending it to Datadog
alias:
- /developer/faq/data-aggregation-with-dogstatsd-threadstats
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community created API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

Datadog DogStatsD implements the StatsD protocol [with some differences][1]. It enables you to fire metrics and monitor your application code without blocking it. Data is transmitted from your application via UDP to the local [DogStatsD server][2] (embedded in the Datadog Agent) that aggregates and then sends it to Datadog's API endpoint. [Read more about the DogStatsD setup][2].

This article describes why and how the aggregation is performed over your data.

## Why aggregate metrics ?

HTTP calls take time. The aggregation is meant to improve performance by reducing the number of API calls.

For instance, if you have a [COUNT metric][3] that is incremented 1,000 times (+1 each time) over a short amount of time, instead of making 1,000 separate API calls, the DogStatsD server aggregates it into a few API calls. Depending on the situation (see below), the library may submit—for instance—1 datapoint with value 1,000 or X aggregate datapoints with a cumulated value of 1,000.

## How is aggregation performed with the DogStatsD server ?

[DogStatsD][2] uses a *flush interval* of 10 seconds. Every 10 seconds, [DogStatsD][2] checks all data received since the last flush (in the last 10 seconds). All values that corresponds to the same metric name and the same tags are aggregated together into a single value.

**Note**: With the StatsD protocol, the StatsD client doesn't send metrics with timestamps. The timestamp is added at the flush time. So for a flush occurring at 10:00:10, all data received by the [DogStatsD][2] server (embedded in the Datadog Agent) between 10:00:00 and 10:00:10 is rolled up in a single datapoint that gets 10:00:00 as timestamp.

### Aggregation rules per metric type

Among all values received during the same flush interval, the aggregated value send depends of the [metric type][4]:

| Metric Type    | Aggregation performed over one flush interval                                                                                                                  |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [GAUGE][5]     | The latest datapoint received is sent.                                                                                                                         |
| [COUNT][3]     | The sum of all received datapoint is sent.                                                                                                                     |
| [HISTOGRAM][6] | The min, max, sum, avg, 95 percentiles, count and median of all datapoint received is sent. See the [HISTOGRAM metric documentation page][7] for more details. |
| [SET][8]       | The number of different datapoint is sent.                                                                                                                     |
| [RATE][9]      | The value difference divided by the time difference of the last 2 datapoints received.                                                                         |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /developers/metrics/dogstatsd_metrics_submission
[3]: /developers/metrics/metrics_type/?tab=count#metric-submission-types
[4]: /developers/metrics/metrics_type
[5]: /developers/metrics/metrics_type/?tab=gauge#metric-submission-types
[6]: /developers/metrics/metrics_type/?tab=histogram#metric-submission-types
[7]: /developers/metrics/metrics_type/?tab=histogram#metric-submission-types
[8]: /developers/metrics/metrics_type/?tab=set#metric-submission-types
[9]: /developers/metrics/metrics_type/?tab=rate#metric-submission-types
