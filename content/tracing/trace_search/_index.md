---
title: Getting Started with Trace Search
kind: Documentation
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performance and traces
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

With Trace Search & Analytics, you can filter application performance metrics and traces by user-defined tags, allowing deep exploration of the web requests flowing through your service.

Trace Search & Analytics can be enabled per APM service and per host. A service on which it’s enabled will expose all its APM Events to Datadog.

What are APM Events?

APM Events are generated from traces, and one event is logged per web request. 

Any tagging and filtering performed on a trace via Datadog’s Client APIs will influence the event extracted by the Datadog Agent. This means APM Events can be enriched with custom metadata, like customer, service, country, billing plan, request duration, and product type. You then can filter and query on this metadata in the Trace Search & Analytics UI.

You might add some tags in your HTTP middleware. For example, in a Rails middleware you can:

```
class Middleware
def initialize(app)
@app = app
end

def call(env)
# retrieve the current active Span
tracer = Datadog.configuration[:rack][:tracer]
span = tracer.active_span
# set your tags
span.set_tag(“customer_id”, 42)
span.set_tag(“customer_name”, “AcmeCorp”)

@app.call(env)
end
End
```

Alternatively, you can use a Tracer Processor before traces are flushed to the Datadog Agent. In your Rails initializer:

```
Datadog::Pipeline.before_flush(
# alter the Span updating tags only for 'rack.request'
Datadog::Pipeline::SpanProcessor.new do |span|
span.set_tag(“customer_id”, 42) if span.name == 'rack.request'
end
)
```

Each unique request generates an APM Event. These are sent to Datadog unsampled so you can explore the full volume of requests received by your service.