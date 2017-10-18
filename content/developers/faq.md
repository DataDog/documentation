---
title: Developers FAQ
kind: documentation
customnav: developersnav
---
### What are valid metric names?


Metric names must start with a letter, and after that may contain ascii alphanumerics, underscore and periods.
Other characters will get converted to underscores. There is no max length. Unicode is not supported.
We recommend avoiding spaces.
Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`).
We say pseudo-hierarchical because we’re not actually enforcing a hierarchy or doing anything with it,
but we have aspirations to use it to infer things about servers (e.g. “hey, I see hostA and hostB are
reporting `http.nginx.*`, those must be web frontends”).


### What are valid tags?


Tags must start with a letter, and after that may contain alphanumerics,
underscores, minuses, colons, periods and slashes. Other characters will get
converted to underscores. Tags can be up to 200 characters long and support
unicode. Tags will be converted to lowercase as well.

Note: An exception to this is with trailing underscores, which will be trimmed off of tags (e.g. path:thing_ becomes path:thing).

### I'm submitting points to the API- anything I should know?


We store metric points at the 1 second resolution, but we’d prefer if you only
submitted points every 15 seconds. Any metrics with fractions of a second timestamps
will get rounded to the nearest second, and if any points have the same timestamp,
the latest point will overwrite the previous ones.

We have a soft limit of 100 time series per host, where a time series is
defined as a unique combination of metric name and tag.

### Tell me about tagging!


Tagging within Datadog is a powerful way to easily gather your metrics
and makes scaling your infrastructure a breeze.

For a quick example to demonstrate the power of tagging, perhaps you're
looking for a sum of two metrics, which you might normally define as follows:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example.com")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example.com")
~~~

What we recommend doing is leaving off the hostname; it will then default to the host
that is sending that point, since they’re different hosts it will be treated as different points:

~~~
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
~~~

With these tags you can then do:

~~~
sum:page.views{domain:example.com}
~~~

which should give the desired result.

To get a breakdown by host, you can do:

~~~
sum:page.views{domain:example.com} by {host}
~~~

Further tagging info can be found [here][architecture-2].

For information on AWS tagging, please see [here][architecture-3].

[architecture-3]: /integrations/aws/
[architecture-2]: /guides/metrics/#tags

## Metrics

### How do I submit custom metrics?

You can submit your custom metrics with the DogStatsD client. You can read more about this [here][metrics-1].


### Why is my counter metric showing decimal values?

StatsD counters are normalized over the flush interval to report per-second units. You can read more about this [here][metrics-2].


### Is there a way to submit metrics from my log data?

Yes there is! We detail log parsing [here][metrics-3].


### I’d like to add historical data to my account. Is there a way to do that?

Unfortunately, we do not allow adding historical data at this time.

### Correct metric syntax (JSON)?

This depends on the medium you use to send metrics.

* For an Agent Check, see this [link][metrics-4].
* For DogStatsD, see this [link][metrics-5].
* For the API, see this [link][metrics-6].


### Is there a way I can get metric reports?

We offer reporting in a variety of ways so far, which include:

* The ability to embed any chart anywhere. Pick a graph on a dashboard, click on
the pencil to edit it and you’ll find the “share” tab that will generate an IFRAME.
* For certain sources (e.g. pagerduty), you’ll get a report in your mailbox once
a week to go over past alerts.
* Metric alerts provide a way to report changes that are outside of what you define
as “normal”.

### How do I get disk usage as a percentage instead of in bytes?

The Datadog Agent emits a metric named `system.disk.in_use` which will give you disk
usage as a percentage.

### How is data aggregated in graphs


Within Datadog, a graph can only contain a set number of points and, as the timeframe
over which a metric is viewed increases, aggregation between points will occur to
stay below that set number.

Thus, if you are querying for larger timeframes of data, the points
returned will be more aggregated. The max granularity within Datadog
is one point per second, so if you had submitted points at that interval
and requested a very small time interval (in this case, probably less
than two minutes), you could end up getting all of those exact points
displayed. Otherwise, you'll see coarser and coarser granularity as the
amount of time requested increases. We do this time aggregation via
average,sum,  min, max, or count.

### What's the difference between system.load.1, system.load.5, and system.load.15?

When you run uptime on a *nix system, the three numbers at the end represent
system.load.1, system.load.5, and system.load.15. System.load.1 is the system load
for the past 1 minute for a single core. Related to these is system.load.norm.1, which
is the system.load for the past 1 minute on divided by the number of cores on that
machine.

### Any other things about metrics?

When using the 'sum/min/max/avg' aggregator, we're looking across series,
not at points within a single series. So if it is scoped to it's most granular
level, it's possible that switching between those aggregators will not change
the values you're seeing.

For example, let's say you break down used memory by host, you'll get one
time series for each host. If you don't break down by host,
by default you'll get the average across all hosts.

[metrics-1]: /guides/metrics/
[metrics-2]: /guides/metrics/#counters
[metrics-3]: /guides/logs/
[metrics-4]: /guides/agent_checks/#sending-metrics
[metrics-5]: /guides/dogstatsd/#metrics
[metrics-6]: /api/#metrics-post