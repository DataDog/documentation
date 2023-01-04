---
title: Setup Data Streams Monitoring for Java
kind: documentation
further_reading:
    - link: '/data_streams/glossary/'
      tag: 'Documentation'
      text: 'Data Streams Glossary'
---

### Prerequisites

To start with Data Streams Monitoring, you need recent versions of the Datadog Agent and Java libraries:
* [Datadog Agent v7.34.0+][1]
* [APM enabled with the Java Agent v0.105+][2]

### Installation

Java uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the environment variable `DD_DATA_STREAMS_ENABLED` to `true` on services sending messages to (or consuming messages from) Kafka or RabbitMQ.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

As an alternative, you can instead set the system property `-Ddd.data.streams.enabled=true` by running the following when you start your Java application:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -jar path/to/your/app.jar
```


[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/java/
