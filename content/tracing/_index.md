---
title: APM and Distributed Tracing
kind: Documentation
description: Instrument your code to improve performance
further_reading:
- link: "/tracing/setup"
  tag: "Documentation"
  text: Instrument your code to send your first traces
- link: "/tracing/services"
  tag: "Documentation"
  text: Analyze your services
- link: "/tracing/product_specs/distributed_tracing"
  tag: "Documentation"
  text: "Getting started: Distributed tracing"
- link: "https://datadoghq.slack.com/messages/apm"
  tag: "Slack"
  text: "Join the APM channel in our Datadog Slack for additional help from Datadog staff "
---

{{< vimeo 203196972 >}}

## What is APM?

Datadog APM provides you deep insight into your application's performance - from automatically generated dashboards monitoring key metrics such request volume and latency, to detailed traces of individual requests - side by side with your infrastructure monitoring.

Datadog APM is offered as an upgrade to our Pro and Enterprise plans. A free 14-day trial is available. Registered users can visit the [APM page of the Datadog application](https://app.datadoghq.com/apm/home) to get started.

## Data collected

Datadog APM collects a variety of performance data at the service and endpoint level:

* Total request volume and rate
* Error volume and rate
* Latency (max, by percentile, overview of latency distribution)
* Apdex Score
* Distributed traces for individual transactions

## Example: Simple tracing

We have a Flask Python application that when called on `/doc` returns **42**

We instrumented our python code in order to generate traces from it:

```python
import time
import blinker as _

from flask import Flask, Response

from ddtrace import tracer
from ddtrace.contrib.flask import TraceMiddleware

# Tracer configuration
tracer.configure(hostname='datadog')
app = Flask('API')
traced_app = TraceMiddleware(app, tracer, service='doc_service')

@tracer.wrap(name='doc_work')
def work():
    time.sleep(0.5)
    return 42

@app.route('/doc/')
def doc_resource():
    time.sleep(0.3)
    res = work()
    time.sleep(0.3)
    return Response(str(res), mimetype='application/json')
```

Each time its called, the following code produces this **trace**:

{{< img src="tracing/simple_trace.png" alt="Simple Trace" responsive="true" popup="true">}}

## Terminology

In order to get the most from tracing, it’s important to understand the terms used, the data they represent and how they work together:

|Term|Definition|Note|
|:----|:-----|:---|
|[service](/tracing/services/service)| Set of processes that do the same job.| Services are displayed on the [Datadog services list](/tracing/services) and have [out of the box performances graphs](/tracing/services/service/#out-of-the-box-graphs).|
|[resource](/tracing/services/resource)|Particular action for a service|Resources are available on the [resources list for each service](/tracing/services/service/#resources) and have [out of the box performances graphs](/tracing/services/resource/#out-of-the-box-graphs)|
|[trace](/tracing/services/trace)|Representation of a request as it flows across a distributed system| A trace can be collected in [any language](/tracing/setup). Traces are found in the [traces list for each resources](/tracing/services/resource/#traces) or in the [trace search directly](/tracing/traces)|
|[span](/tracing/services/trace/#spans) |A logical unit of work in the system| Spans are associated with a [service](/tracing/services/service) and optionally a [resource](/tracing/services/resource). Each span consists of a start time, a duration, and optional tags.|

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
