---
title: APM Events
kind: Documentation
further_reading:
- link: "tracing/search"
  tag: "Documentation"
  text: Global search of all your traces with tags
- link: "tracing/analytics"
  tag: "Documentation"
  text: Analytics on your APM data at infinite cardinality
---

## What are APM Events?

An APM event is generated every time a trace is generated. It corresponds to all the metadata of the trace, plus the [top span][3] of the trace.

Why aren't APM events just traces? Because traces [get sampled][4] and APM events don't, and we only keep the top span information for the APM event, not the full trace.

APM Events can be enriched with custom metadata, like `customer`, `service`, `country`, `billing plan`, `request duration`, and `product` type.  You can then [filter][1] and query on this metadata in the [Trace Search & Analytics UI][2].

## Enriching your APM events

To add some tags to your APM events, add tags in your HTTP middleware in order to attach them to the first span. For example, in Rails you would do:

```ruby
class Middleware
def initialize(app)
@app = app
end

def call(env)
# retrieve the current active Span
tracer = Datadog.configuration[:rack][:tracer]
span = tracer.active_span
# set your tags
span.set_tag("customer_id", 42)
span.set_tag("customer_name", "AcmeCorp")

@app.call(env)
end
End
```

Alternatively, use a Tracer Processor before traces are flushed to the Datadog Agent. In your Rails initializer add:

```ruby
Datadog::Pipeline.before_flush(
# alter the Span updating tags only for 'rack.request'
Datadog::Pipeline::SpanProcessor.new do |span|
span.set_tag("customer_id", 42) if span.name == 'rack.request'
end
)
```

Each unique request generates an APM Event. These are sent to Datadog un-sampled so you can explore the full volume of requests received by your service.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/search/#search
[2]: /tracing/search/#overview
[3]: /tracing/visualization/#spans
[4]: /tracing/getting_further/trace_sampling_and_storage