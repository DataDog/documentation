---
title: (dog)statsd sample_rate parameter explained
kind: faq
customnav: developersnav
---

Here are the components involved when submitting data via (dog)statsd:

{{< img src="developers/faq/dogstatsd_schema.png" alt="dogstatsd_schema" responsive="true" >}}

1. your code. Where you sample metric values using a dogstatsd client, in charge of sampling metric values and sending them to 2.
2. the dogstatsd server (embedded with the datadog-agent), in charge of receiving the value sampled. Every 10 seconds, it aggregates data received into final metric values that are sent to 3.
3. the datadog service, from where you can graph your metric data.

Generally the dogstatsd client (i.e. your code) and the dogstatsd server (i.e. the datadog-agent) run on the same host, but they could be on different hosts as well:

many dogstatsd clients offer the possibility to configure the host and port to which send the dogstatsd UDP packets.

## What the purpose of the sample_rate parameter?

The sample rate is meant to reduce the traffic from your dogstatsd client and the datadog-agent. A sample rate of 0.5 will cut the number of UDP packets sent in half.

It's not useful in all cases, but can be interesting if you sample many many metrics and your dogstatsd client is not on the same host as the dogstatsd server.

Remember that it's a trade off: you decrease traffic but slightly lose in precision/granularity.

## How does it work?

Dogstatsd client side: If you sample a counter metrics ("increment") with a sample rate 0.5 in your code, the dogstatsd client is supposed to actually send this increment data only 50% of the times.

Dogstatsd server side: when receiving the counter value, the datadog-agent reads the sample_rate information and sees the value has actually been sampled twice. It performs a simple correction: it multiplies the value received by 2.

## Dogstatsd server corrections by metric type

Counter: values received are multiplied by (1/sample_rate), because it's reasonable to suppose in most cases that for 1 datapoint received, 1/sample_rate were actually sampled with the same value.

Gauge: no correction. The value received is kept as it is. 

Set: no correction. The value received is kept as it is.

Histogram: the histogram.count statistic is a counter metric, and receives the correction outlined above. Other statistics are gauge metrics and cannot be "corrected."

See datadog-agent aggregation code [here](https://github.com/DataDog/dd-agent/blob/master/aggregator.py)

## Code example

"How to divide the traffic by 2?" (python library code):
```python
from datadog import statsd
# half the increment will be sent; the dd-agent will compensate by multiplying by 2 the value it gets
statsd.increment('my.metric_name',1,sample_rate=0.5) 

# remember: for gauge metrics, half the values will be sent, but no good "compensation" can be done on the dd-agent side, you just lose in granularity.
statsd.gauge('foo', 42,sample_rate=0.5) 
```

Note 1: Don't change the value you send, only adjust the sample_rate.
Note 2: using low sample rates will decrease the precision of the collection. It's not recommended unless you really have a lot of data sampled by your code.