---
title: Metric Types
kind: documentation
customnav: developersnav
aliases:
   - /metricstypes/
---

A metric's Datadog in-app type affects how its data is interpreted in query results and graph visualizations across the app. The metric type visible on the metric summary page is the Datadog in-app type. You should only change the type if you have started submitting this metric with a new type, and should be aware that changing the type may render historical data nonsensical.

## How do submission types relate to Datadog in-app types?
Datadog accepts metrics submitted from a variety of sources, and as a result the submission type does not always map exactly to the Datadog in-app type:

| Submission Source | Submission Method (python) | Submission Type | Datadog In-App Type |
|-------------------|-------------------|-----------------|--------------|
| [API][3] | `api.Metric.send(...)` | gauge | gauge |
| [dogstatsd][1] | `dog.gauge(...)` | gauge | gauge |
| [dogstatsd][1] | `dog.increment(...)` | counter | rate |
| [dogstatsd][1] | `dog.histogram(...)` | histogram | gauge, rate |
| [dogstatsd][1] | `dog.set(...)` | set | gauge |
| [agent check][2] | `self.gauge(...)` | gauge | gauge |
| [agent check][2] | `self.increment(...)` | counter | rate |
| [agent check][2] | `self.rate(...)` | rate | gauge |
| [agent check][2] | `self.count(...)` | count | count |
| [agent check][2] | `self.monotonic_count(...)` | monotonic_count | count |
| [agent check][2] | `self.histogram(...)` | histogram | gauge, rate |
| [agent check][2] | `self.set(...)` | set | gauge |

## Metric Types During Submission

### Agent Check Submission

Here is some information about metric submission in an agent check:

[Writing Agent Checks](/agent/agent_checks) && [Aggregator source](https://github.com/DataDog/dd-agent/blob/master/aggregator.py)

#### self.gauge( ... )

* If called multiple times during a check's execution for a metric only the last sample will be used.
* Stored as a Web App GAUGE type

#### self.increment( ... )
Used to modify a count of events identified by the metric key string.

* Can be called multiple times during a check's execution.
* Stored as a RATE type in the datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for agent checks - so the value is generally the raw count value).
* Handled by the aggregator Counter class

#### self.decrement( ... )
Used to modify a count of events identified by the metric key string.

* Can be called multiple times during a check's execution.
* Stored as RATE type in the datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for agent checks - so the value is generally the raw count value).
* Handled by the aggregator Counter class

#### self.rate( ... )
Submit the sampled raw value of your counter. Don't normalize the values to a rate, or calculate the deltas before submitting - the agent does both for you.

* Should only be called once during a check.
* Throws away any value that is less than a previously submitted value. IE the counter should be monotonically increasing.
* Stored as a GAUGE type in the datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value between samples.

#### self.count( ... )

Submit the number of events that occurred during the check interval. If you're tracking a counter value that persists between checks, this means you must calculate the delta before submission.

* Should only be called once during a check.
* Stored as a COUNT type in the datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).

#### self.monotonic_count( ... )

Submit the sampled raw value of your counter. Don't normalize the values to a rate, or calculate the deltas before submitting. If the value of your counter ever decreases between submissions the resulting stored value for that submission is 0.

* Should only be called once during a check.
Throws away any value that is less than a previously submitted value. IE the counter should be monotonically increasing.
* Stored as a COUNT type in the datadog web application. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).

#### self.histogram( ... )
Used to track the statistical distribution of a set of values.

* Should be called multiple times during an agent check (otherwise you have no distribution).
* Actually submits as multiple metrics:

|||
|Name | Web App type|
|:-----|:------------|
|metric.max | GAUGE |
|metric.avg | GAUGE |
|metric.median | GAUGE|
|metric.95percentile | GAUGE |
|metric.count | RATE|

#### self.set( ... )
Used count the number of unique elements in a group.

* Should be called multiple times during an agent check.
* Stored as a GAUGE type in the datadog web application

### Dogstatsd Submission

Here is some information about metric submission in an agent check:

[Sending metrics with dogstatsd](/developers/metrics) && [Client Libraries](/developers/libraries)

Because dogstatsd flushes at a regular interval (**default 10s**) all metrics submitted via this method will be stored with associated interval metadata.

#### dog.gauge(...)

* Stored as a GAUGE type in the datadog web application. Each value in the stored timeseries is the last gauge value submitted for that metric during the statsd flush period.

#### dog.increment(...)
Used to increment a counter of events.

* Stored as a RATE type in the datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that statsd flush period.

#### dog.decrement(...)
Used to decrement a counter of events.

* Stored as a RATE type in the datadog web application. Each value in the stored timeseries is a time-normalized delta of the counter's value over that statsd flush period.

#### dog.histogram(...)
Used to track the statistical distribution of a set of values over a statsd flush period.

Actually submits as multiple metrics:

|||
|name | Web App type|
|:-----|:------------|
|metric.max | GAUGE|
|metric.avg | GAUGE|
|metric.median | GAUGE|
|metric.95percentile | GAUGE|
|metric.count | RATE|

#### dog.set(...)

Usage: Used count the number of unique elements in a group.
Stored as GAUGE type in the datadog web application. Each value in the stored timeseries is the count of unique values submitted to statsd for a metric over that flush period.

##  HTTP API Submission

[API Documentation](/api)

For the API all metrics are submitted the same way, with the type specified as a parameter.

### Gauge

Stored in Web App as GAUGE type

## Metric Types in the web application

In the web app there are 3 metric types: GAUGE, RATE, COUNT (and COUNTER, now deprecated). A metric's type is stored as metrics metadata and is used to determine how a metric is interpreted throughout the app by determining default time aggregation function and as_rate()/as_count() behavior.

#### The as_count() and as_rate() modifiers

The as_count() and as_rate() modifiers behave differently for different Web App metric types.

#### GAUGE

* Effect of as_count(): None
* Effect of as_rate(): None

#### RATE:

* Effect of as_count():
    
    * Sets the time aggregator to SUM.
    * Uses the metadata interval to convert from raw rates to counts. Does not work if no metadata interval exists for the metric.

* Effect of as_rate():
    * Sets the time aggregator to SUM.
    * Uses the query interval and metadata interval to calculate the time-aggregated rate. Does not work if no metadata interval exists for the metric.

* Known Issue: Agent check submitted RATE metrics have no interval metadata, so as_rate() and as_count() don't work.

#### COUNT:

* Effect of as_count():
    
    * Sets the time aggregator to SUM.
* Effect of as_rate():
    
    * Sets the time aggregator to SUM
    * Normalizes the input timeseries values by the query (rollup) interval. For example [1,1,1,1].as_rate() for rollup interval of 20s produces [0.05, 0.05, 0.05, 0.05].

* The raw metric itself will default to the time aggregator AVG, so querying the metric without either as_rate() or as_count()will become non-sensical when time aggregation is applied.

* Note that on very small intervals when no time-aggregation occurs, there is no normalization, and you get the raw metric value counts.

## What's a use case for changing a metric's type?

1. A user has a metric `app.requests.served` that counts requests served, she accidently submits it via dogstatsd as a `gauge`. The metric's Datadog type is therefore `gauge`.

2. She realizes she should have submitted it as a dogstatsd `counter` metric, that way she can do time aggregation to answer questions like "How many total requests were served in the past day?" by querying `sum:app.requests.served{*}` (this would not make sense for a `gauge`-type  metric.)

3. She likes the name `app.requests.served` so rather than submitting a new metric name with the more appropriate `counter` type, she'll change the type of `app.requests.served`.

    a. She updates her submission code, calling `dogstatsd.increment('app.requests.served', N)` after N requests are served.

    b. She updates the Datadog in-app type via the metric summary page to `rate`.

This will cause data submitted before the type change for `app.requests.served` to behave incorrectly because it
was stored in a format to be interpreted as an in-app `gauge` not a `rate`. Data submitted after steps 3a and 3b
will be interpreted properly. If she was not willing to lose the historical data submitted as a `gauge` she would
have created a new metric name with the new type, leaving the type of `app.requests.served` unchanged.

[1]: /developers/dogstatsd
[2]: /agent/agent_checks
[3]: /api/#metrics