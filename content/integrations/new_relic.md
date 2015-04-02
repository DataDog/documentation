---
title: Datadog-New Relic Integration
integration_title: New Relic
kind: integration
---

#### Why do my application-level metrics have different values in New Relic and Datadog?

When New Relic computes the aggregate application-level value for
metrics that are measured at the host level (e.g. response time), they
compute a weighted average based on each host's measured throughput.

The closest thing you'll see in datadog is the `avg` aggregator, which
computes the arithmetic mean of the values. This is also the default
aggregator, and what you'll get for the simplest query, something like
`new_relic.web_transaction.average_response_time{*}`. If your hosts all
have approximately the same throughput, our average aggregation and NR's
throughput-weighted aggregation will yield similar numbers, but if
thoughput is not balanced, you will see different aggregate
application-level values in NR and Datadog.

For example, say you have an application with three hosts. At a
specific point in time, the hosts have the following values:

               throughput    response time
    hostA         305 rpm           240 ms
    hostB         310 rpm           250 ms
    hostC          30 rpm            50 ms

New Relic would compute the application-level response time as follows:

    hostA: 240 ms * 305 rpm = 73200 total time
    hostB: 250 ms * 310 rpm = 77500 total time
    hostC:  50 ms *  30 rpm =  1500 total time

    total throughput = 305 + 310 + 30 = 645 rpm
    average response time = (73200 + 77500 + 1500) / 645 = 236.0 ms

Whereas we would simply compute the arithmetic mean:

    average response time = (240 + 250 + 50) / 3 = 180.0 ms
