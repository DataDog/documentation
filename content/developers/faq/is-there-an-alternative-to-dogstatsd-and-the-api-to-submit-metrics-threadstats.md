---
title: Is there an alternative to dogstatsd and the api to submit metrics? Threadstats.
kind: faq
customnav: developersnav
---

There is an alternative but it's **only in Python**.

Threadstats comes with our Python [datadogpy library](https://github.com/DataDog/datadogpy/tree/master/datadog) that includes:

1. api, a python wrapper around [our api](/api)
2. dogshell, that makes it possible to make direct and simple api calls with "dog" shell commands as soon as you have installed datadogpy on your machine
3. dogstatsd, a client to send metrics and events to the dogstatsd server embedded with the datadog-agent, it's the most efficient way to submit many metrics
4. threadstats, an excellent compromise between the simplicity of direct api calls and the performance of statsd + datadog-agent combination

## Threadstats

Threadstats is very good at monitoring your application code.
It collects metrics with very little overhead and allows flushing metrics in process, in a thread or in a greenlet, depending on your application’s needs.

In a nutshell, threadstats will not slow down your code (contrary to direct api calls which wait for a response from the distant server before resuming the rest of the program) and provides some flexibility and doesn't require the Datadog agent (contrary to dogstatsd).

Threadstats leverage the power of Python threads, to collect metrics asynchronously and flush them every 10 seconds thus avoiding multiple api calls and boosting performance.

To get started with Threadstats:

1. install [datadogpy](https://github.com/DataDog/datadogpy) 
2. initialize + start threadstats, as shown in this example
3. use gauge/rate/increment/timing/etc exactly as you would with dogstatsd! 

Threadstats is good for you if...

1. you want asynchronous monitoring or perfomance close to dogstatsd to submit many metrics and
2. you don't want to install the datadog-agent
3. or you want more flexibility than dogstatsd has to offer, for instance, send metrics with timestamps

## References

Documentation: http://datadogpy.readthedocs.org/en/latest/#datadog-threadstats-module

Source code: https://github.com/DataDog/datadogpy/blob/master/datadog/threadstats/ 

## Tips

### Rollup buckets

* By default the default flush period is 10 seconds. At each flush all data received during the flush period will be aggregated in rollup buckets of 10 seconds. All datapoints within a bucket will be rolled-up into a single value that will be submitted.
* For gauge/rate, this module will only sent the last value if there is more than one in the rollup bucket.
* You can modify the rollup interval and the flush period when initializing the Threadstats module.

### Custom timestamps

* Datadog doesn't accept data too far in the past/future, timestamps should not be more than 10 minutes in the future or more than 1 hour in the past.
* If you submit a datapoint during a flush interval, then you submit a datapoint with same metric name and timestamp in another flush, only the last datapoint will be stored in Datadog. If histogram data (with same timestamp) is expected to arrive at different time for instance, we strongly recommend using a large flush interval to capture them in the same flush for instance.