---
title: Metric Types
kind: documentation
---

A metric's Datadog in-app type affects how its data is interpreted in query results and graph visualizations across the app. The metric type visible on the metric summary page is the Datadog in-app type. You should only change the type if you have started submitting this metric with a new type, and should be aware that changing the type may render historical data nonsensical.

## How do submission types relate to Datadog in-app types?
Datadog accepts metrics submitted from a variety of sources, and as a result the submission type does not always map exactly to the Datadog in-app type:

| Submission Source | Submission Method (python) | Submission Type | Datadog In-App Type |
|-------------------|-------------------|-----------------|--------------|
| [API](http://docs.datadoghq.com/api/#metrics) | `api.Metric.send(...)` | gauge | gauge |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.gauge(...)` | gauge | gauge |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.increment(...)` | counter | rate |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.histogram(...)` | histogram | gauge, rate |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.set(...)` | set | gauge |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.gauge(...)` | gauge | gauge |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.increment(...)` | counter | rate |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.rate(...)` | rate | gauge |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.count(...)` | count | count |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.monotonic_count(...)` | monotonic_count | count |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.histogram(...)` | histogram | gauge, rate |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.set(...)` | set | gauge |
{:.table}

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
