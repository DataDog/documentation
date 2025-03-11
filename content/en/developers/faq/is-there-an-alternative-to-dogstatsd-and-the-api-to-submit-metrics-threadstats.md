---
title: Submit Metrics to Datadog with Threadstats

further_reading:
- link: "https://github.com/DataDog/datadogpy/blob/master/datadog/threadstats/"
  tag: "Source Code"
  text: "Threadstats Source code"
- link: "http://datadogpy.readthedocs.org/en/latest/#datadog-threadstats-module"
  tag: "External Site"
  text: "Threadstats Documentation"
---

Threadstats is an alternative method to DogStatsD and the API for submitting metrics to Datadog, but it is **only in Python**. Threadstats comes with the [Datadog Python Library][1] and includes:

1. API, a Python wrapper around [Datadog's API][2]
2. Dogshell, that makes it possible to make direct and simple API calls with "dog" shell commands as soon as you have installed datadogpy on your machine
3. DogStatsD, a client to send metrics and events to the [DogStatsD server][3] embedded with the Datadog Agent, it's the most efficient way to submit many metrics
4. Threadstats, a compromise between the simplicity of direct API calls and the performance of StatsD + Datadog Agent combination

## Threadstats

Threadstats monitors your application code. It collects metrics with little overhead and allows flushing metrics in process, in a thread or in a greenlet, depending on your application's needs.

In a nutshell, Threadstats doesn't slow down your code (contrary to direct API calls which wait for a response from the distant server before resuming the rest of the program) and provides some flexibility and doesn't require the Datadog Agent (contrary to DogStatsD).

Threadstats leverage the power of Python threads, to collect metrics asynchronously and flush them every 10 seconds thus avoiding multiple API calls and boosting performance.

To get started with Threadstats:

1. Install [datadogpy][4].
2. Initialize and start Threadstats, as shown in this example.
3. Use gauge/rate/increment/timing/etc. exactly as you would with DogStatsD.

Threadstats is good for you if...

1. You want asynchronous monitoring or performance close to DogStatsD to submit many metrics, and
2. You don't want to install the Datadog Agent
3. Or you want more flexibility than DogStatsD has to offer; for instance, you want to send metrics with timestamps

## Threadstats variations with DogStatsD

As in [DogStatsD][5], Threadstats performs data aggregation for performance reasons.

### Variations

* Unlike with DogStatsD, metrics received by Threadstats may already have timestamps.
* Metrics are not aggregated using a centralized server; rather, they are aggregated and flushed in a Python thread in your script. Thus, aggregation is per script rather than per host.

To handle timestamps, Threadstats uses 2 parameters: a flush interval and a roll-up interval.

* The flush interval defines the time interval between two consecutive data aggregation-and-submission events.
* The roll up interval defines the data granularity after aggregation.

### Example with flush_interval=10 and roll_up_interval=5

Consider an instance where, during a flush interval of 10 seconds (between 10:00:00 and 10:00:10), Threadstats receives 5 datapoints for the same metric name (a counter) and same tags, with the following {`timestamp`, `value`} pairs:

`{09:30:15, 1}, {10:00:00, 2}, {10:00:04,1}, {10:00:05,1}, {10:00:09,1} `
Next, every datapoint in the same `roll_up_interval` (5 seconds) gets the same timestamp:

`{09:30:10, 1}, {10:00:00, 2}, {10:00:00,1}, {10:00:05,1}, {10:00:05,1}`

Finally, data is aggregated by timestamp. The following 4 values are then submitted to Datadog: 
`{09:30:10, 1}, {10:00:00, 3}, {10:00:05,2}`

For more information, see the [Threadstats aggregation][6] documentation.

## Tips

### Rollup buckets

* By default, the default flush period is 10 seconds. At each flush, all data received during the flush period is aggregated in rollup buckets of 10 seconds. All datapoints within a bucket are rolled-up into a single value that is submitted.
* For gauge and rate, this module only sends the last value if there is more than one in the rollup bucket.
* You can modify the rollup interval and the flush period when initializing the Threadstats module.

### Custom timestamps

* Datadog doesn't accept data too far in the past or future; timestamps should not be more than 10 minutes in the future or more than 1 hour in the past.
* If you submit a datapoint during a flush interval, and then you submit a datapoint with same metric name and timestamp in another flush, only the last datapoint is stored in Datadog. If histogram data (with same timestamp) is expected to arrive at a different time for instance, Datadog strongly recommends using a large flush interval to capture them in the same flush.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadogpy/tree/master/datadog
[2]: /api/
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: https://github.com/DataDog/datadogpy
[5]: /developers/dogstatsd/
[6]: https://github.com/DataDog/datadogpy/blob/master/datadog/threadstats/metrics.py
