---
title: Trace Metrics Namespace
kind: guide
disable_toc: true
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
aliases:
  - /tracing/getting_further/metrics_namespace
---

The trace metrics namespace is `trace.<NAME>.<METRIC>{<TAGS>}` where:

| Parameter  | Description                                                                                                             |
|------------|-------------------------------------------------------------------------------------------------------------------------|
| `<NAME>`   | The name of the operation or `span.name` (examples: *redis.command*, *pylons.request*, *rails.request*, *mysql.query*). |
| `<METRIC>` | The name of the metric (examples: *hits*, *errors*, *latency*).                                                         |
| `<TAGS>`   | The tags attached to the metric (examples: *service*, *resource*).                                                      |

So for pylons it might be `trace.pylons.request.hits{service:web_server}`.

Test

## Data collected
### Metrics

{{< get-metrics-from-git "tracing" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
