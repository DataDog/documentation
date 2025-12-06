---
title: Setup Data Streams Monitoring for Ruby
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/software_catalog/'
      tag: 'Documentation'
      text: 'Software Catalog'
aliases:
  - /data_streams/ruby
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][10]

### Supported libraries

| Technology     | Library                                             | Minimal tracer version                                                 | Recommended tracer version                                                 |
|----------------|-----------------------------------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------------|
| Kafka          | [ruby-kafka](https://github.com/zendesk/ruby-kafka) | {{< dsm-tracer-version lang="ruby" lib="ruby-kafka" type="minimal" >}} | {{< dsm-tracer-version lang="ruby" lib="ruby-kafka" type="recommended" >}} |
| Kafka          | [karafka](https://karafka.io/docs/)                 | {{< dsm-tracer-version lang="ruby" lib="karafka" type="minimal" >}}    | {{< dsm-tracer-version lang="ruby" lib="karafka" type="recommended" >}}    |


### Installation

Ruby uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% data_streams/monitoring-kafka-pipelines %}}

### Manual instrumentation
Data Streams Monitoring propagates context through message headers. If you are using a message queue technology that is not supported by DSM, a technology without headers (such as Kinesis), use [manual instrumentation to set up DSM][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[10]: /agent
[2]: /tracing/trace_collection/dd_libraries/python
[3]: https://pypi.org/project/confluent-kafka/
[5]: https://pypi.org/project/kombu/
[6]: /data_streams/manual_instrumentation/?tab=ruby
