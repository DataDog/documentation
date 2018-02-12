---
title: APM (Tracing)
kind: Documentation
description: Instrument your code to improve performance
further_reading:
- link: "/tracing/setup"
  tag: "Documentation"
  text: Instrument your code to send your first traces
- link: "/tracing/services"
  tag: "Documentation"
  text: Analyse your services
- link: "/tracing/miscellaneous/distributed_tracing"
  tag: "Documentation"
  text: "Getting started: Distributed tracing"
- link: "https://datadoghq.slack.com/messages/apm"
  tag: "Slack"
  text: "Join the APM channel in our Datadog Slack for additional help from Datadog staff "
---

## Overview

Datadog's integrated APM tool eliminates the traditional separation between infrastructure and application performance monitoring. This not only provides greater visibility, but also allows you to see the relationship between application code and the underlying infrastructure.

Datadog APM is offered as an upgrade to our Pro and Enterprise plans. A free 14-day trial is available.
Registered users can visit the [APM page of the Datadog application](https://app.datadoghq.com/apm/home) to get started.

## Simple tracing

We have a Flask Python application that when called on `/doc` returns **42**

We [instrumented our python code](/tracing/setup) in order to generate traces from it:

```python
import blinker as _
import time

from flask import Flask, Response
from flask import jsonify
from flask import request as flask_request

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

Each time its called, the following code would produce the following **trace**:

{{< img src="tracing/simple_trace.png" alt="Simple Trace" responsive="true" popup="true">}}

[Learn more about traces with the dedicated Trace documentation](/tracing/services/trace)

The Datadog APM product defines those terms as:

* Service: **Name of a set of processes that do the same job**  
* Resource: **Particular action for a service**
* Trace: **Used to track the time spent by an application processing a single operation, Each trace consists of one or more spans.** 
* Span: **A logical unit of work in the system**  


Analise them in Datadog:

* Services are displayed on the [Datadog Services list](/tracing/services) and have [out of the box performances graphs](/tracing/services/service/#out-of-the-box-graphs)
* Resources are available on the [Resources list for each service](/tracing/services/service/#resources) and have [out of the box performances graphs](/tracing/services/resource/#out-of-the-box-graphs)
* Traces are found in the [Traces list for each resources](/tracing/services/resource/#traces) or in the [Trace search directly](/tracing/traces)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
