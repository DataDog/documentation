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

## Data collected
### Metrics

| Metric name                                               | Exists for      | Tags                                                                    |
|-----------------------------------------------------------|-----------------|-------------------------------------------------------------------------|
| `trace.<OP_NAME>.duration`                                | Any APM service | Datadog Agent, env, service, resource, second primary, http.status_code |
| `trace.<OP_NAME>.duration.by_http_status`                 |                 |                                                                         |
| `trace.<OP_NAME>.duration.by_service`                     |                 |                                                                         |
| `trace.<OP_NAME>.duration.by_service.by_http_status`      |                 |                                                                         |
| `trace.<OP_NAME>.duration.by_type`                        |                 |                                                                         |
| `trace.<OP_NAME>.duration.by_type.by_http_status`         |                 |                                                                         |
| `trace.<OP_NAME>.hits`                                    |                 |                                                                         |
| `trace.<OP_NAME>.hits.by_http_status`                     |                 |                                                                         |
| `trace.<OP_NAME>.span_count`                              |                 |                                                                         |
| `trace.<OP_NAME>.span_count.by_http_status`               |                 |                                                                         |
| `trace.<OP_NAME>.apdex.by.resource_<SPT>_service`         |                 |                                                                         |
| `trace.<OP_NAME>.apdex.by.resource_service`               |                 |                                                                         |
| `trace.<OP_NAME>.apdex.by.<SPT>_service`                  |                 |                                                                         |
| `trace.<OP_NAME>.apdex.by.service`                        |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_<SPT>_service.100p` |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_<SPT>_service.50p`  |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_<SPT>_service.75p`  |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_<SPT>_service.90p`  |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_<SPT>_service.95p`  |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_<SPT>_service.99p`  |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_service.100p`       |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_service.50p`        |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_service.75p`        |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_service.90p`        |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_service.95p`        |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.resource_service.99p`        |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.<SPT>_service.100p`          |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.<SPT>_service.50p`           |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.<SPT>_service.75p`           |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.<SPT>_service.90p`           |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.<SPT>_service.95p`           |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.<SPT>_service.99p`           |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.service.100p`                |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.service.50p`                 |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.service.75p`                 |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.service.90p`                 |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.service.95p`                 |                 |                                                                         |
| `trace.<OP_NAME>.duration.by.service.99p`                 |                 |                                                                         |

Test

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
