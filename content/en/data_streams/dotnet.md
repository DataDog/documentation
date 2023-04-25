---
title: Setup Data Streams Monitoring for .NET
kind: documentation
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring is not supported in the AP1 region.</a></div>
{{< /site-region >}}

### Prerequisites

To start with Data Streams Monitoring, you need recent versions of the Datadog Agent and .NET libraries:
* [Datadog Agent v7.34.0 or later][1]
* .NET Tracer v2.17.0 or later ([.NET Core][2], [.NET Framework][3])

### Installation

.NET uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/dotnet-core
[3]: /tracing/trace_collection/dd_libraries/dotnet-framework
