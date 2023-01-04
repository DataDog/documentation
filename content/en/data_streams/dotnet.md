---
title: Setup Data Streams Monitoring for .NET
kind: documentation
further_reading:
    - link: '/data_streams/glossary/'
      tag: 'Documentation'
      text: 'Data Streams Glossary'
---

### Prerequisites

To start with Data Streams Monitoring, you need recent versions of the Datadog Agent and .NET libraries:
* [Datadog Agent v7.34.0+][1]
* .NET Tracer v2.17.0+ ([.NET Core][2], [.NET Framework][3])

### Installation

.NET uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the environment variable `DD_DATA_STREAMS_ENABLED` to `true` on services sending messages to (or consuming messages from) Kafka.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/dotnet-core
[3]: /tracing/trace_collection/dd_libraries/dotnet-framework
