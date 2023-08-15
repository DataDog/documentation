---
title: Setup Data Streams Monitoring for Node.js
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

To start with Data Streams Monitoring, you need recent versions of the Datadog Agent and Node.js libraries:
* [Datadog Agent v7.34.0 or later][1]
* [Node.js Tracer v2.39.0, v3.26.0, v4.5.0, or later][2]

### Installation

Node.js uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/nodejs

