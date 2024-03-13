---
title: Setup Data Streams Monitoring for Java
kind: documentation
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/service_catalog/'
      tag: 'Documentation'
      text: 'Service Catalog'
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring is not supported in the AP1 region.</a></div>
{{< /site-region >}}

### Prerequisites

To start with Data Streams Monitoring, you need recent versions of the Datadog Agent and Java libraries:
* [Datadog Agent v7.34.0 or later][1]
* [APM enabled with the Java Agent v1.9.0 or later][2] (v1.27.0 or later for Amazon SQS)

### Installation

Java uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka or RabbitMQ.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

As an alternative, you can set the `-Ddd.data.streams.enabled=true` system property by running the following when you start your Java application:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -jar path/to/your/app.jar
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/java/
