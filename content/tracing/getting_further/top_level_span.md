---
title: APM Top-Level Spans
kind: documentation
further_reading:
- link: "tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/"
  tag: "FAQ"
  text: "Resource/Trace doesn't show up under correct service"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

## Definition 

A top-level span is the entry point into the instrumented resources of a Service. It describes an action that links the resources together and allows you to aggregate service statistics under the same action. 

{{< img src="tracing/product_specs/top_level_span/top_level_span.png" alt="Top level span" responsive="true" style="width:90%;">}}

For the trace above, for the service `coffee-house`, the top-level span is `servlet.request` and the coffee-house service metrics are calculated on resources that have `servlet.request` as the top-level span.

As an other example, a `webapp` service can have multiple endpoints which are instrumented as resources. These resources then share the same top-level span as the entry-point into these resources is consistent, i.e. the resources `/user/home` and `/user/new` should both have the same top-level span `web.request`. In different languages a top-level span for a service may look like:

| Service Type | Top-level span example                                   |
| --------     | ---------                                                |
| Web          | `servlet.request`, `flask.request`, `express.request`... |
| DB           | `mongo.query`, `postgres.query`, `redis.command`...      |

**Note**: When there are multiple top-level spans for a Service the default is determined by the highest request throughput.

## Troubleshooting

When manually instrumenting your code, to ensure that resources are grouped together with the same top-level span, confirm that the span name is not being dynamically set but rather statically (i.e.`web.request`). If the span is being named dynamically, this should be set as the Resource name.

The name of a span is assigned when calling `Trace.trace({name})` or can be provided by Datadog’s clients libraries, while the top-level span is determined based on the throughput of requests. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
