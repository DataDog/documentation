---
title: DogStatsD "Sample Rate" Parameter Explained
kind: faq
---

Here are the components involved when submitting data via DogStatsD:

{{< img src="developers/faq/dogstatsd_schema.png" alt="dogstatsd_schema" responsive="true" >}}

1. Your code, where you sample metric values using a [DogStatsD][1] client, in charge of sampling metric values and sending them to the DogStatsD server.
2. the DogStatsD server (embedded with the Datadog Agent), in charge of receiving the value sampled. Every 10 seconds, it aggregates data received into final metric values that are sent to the Datadog service.
3. the Datadog service, from where you can graph your metric data.

Generally the DogStatsD client (i.e. your code) and the [DogStatsD server][1] (i.e. the Agent) run on the same host, but they could be on different hosts as well: many DogStatsD clients offer the possibility to configure the host and port to which send the [DogStatsD][1] UDP packets.

## What the purpose of the sample_rate parameter?

The sample rate is meant to reduce the traffic from your [DogStatsD client][1] and the Agent. A sample rate of 0.5 cuts the number of UDP packets sent in half.

It's not useful in all cases, but can be interesting if you sample many metrics, and your [DogStatsD client][1] is not on the same host as the [DogStatsD server][1]. This is a trade off: you decrease traffic but slightly lose in precision/granularity.

## How does it work?

DogStatsD client side: If you sample counter metrics ("increment") with a sample rate 0.5 in your code, the [DogStatsD client][1] actually sends this increment data only 50% of the time.

DogStatsD server side: when receiving the counter value, the Datadog Agent reads the sample rate information and sees the value has actually been sampled twice. It performs a simple correction: it multiplies the value received by 2.

## DogStatsD server corrections by metric type

**Counter**: values received are multiplied by (1/sample_rate), because it's reasonable to suppose in most cases that for 1 datapoint received, 1/sample_rate were actually sampled with the same value.

**Gauge**: no correction. The value received is kept as it is.

**Set**: no correction. The value received is kept as it is.

**Histogram**: the `histogram.count` statistic is a counter metric, and receives the correction outlined above. Other statistics are gauge metrics and cannot be "corrected."

[See Datadog Agent aggregation code][2].

## Code example

Dividing the traffic by 2 using the Python StatsD library:
```python
from datadog import statsd
# half the increment is sent; the dd-agent compensates by multiplying by 2 the value it gets
statsd.increment('my.metric_name',1,sample_rate=0.5) 

# remember: for gauge metrics, half the values are sent, but no good "compensation" can be done on the dd-agent side, you just lose in granularity.
statsd.gauge('foo', 42,sample_rate=0.5) 
```

Note 1: Don't change the value you send, only adjust the sample_rate.
Note 2: Using low sample rates decreases the precision of the collection. It's not recommended unless you have a lot of data sampled by your code.

[1]: /developers/dogstatsd
[2]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
