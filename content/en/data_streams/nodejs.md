---
title: Setup Data Streams Monitoring for Node.js
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
* [Node.js Tracer][2]
  * Kafka: v2.39.0, v3.26.0, v4.5.0, or later
  * Amazon SQS: v4.21.0
  * RabbitMQ: v3.48.0, v4.27.0, v5.3.0 or later

### Installation

Node.js uses auto-instrumentation to inject and extract additional metadata required by Data Streams Monitoring for measuring end-to-end latencies and the relationship between queues and services. To enable Data Streams Monitoring, set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on services sending messages to (or consuming messages from) Kafka.

For example:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### Supported libraries
Data Streams Monitoring supports the [confluent-kafka library][3], [amqplib package][5], and [rhea package][6].

### Monitoring SQS pipelines
Data Streams Monitoring uses one [message attribute][4] to track a message's path through an SQS queue. As Amazon SQS has a maximum limit of 10 message attributes allowed per message, all messages streamed through the data pipelines must have 9 or fewer message attributes set, allowing the remaining attribute for Data Streams Monitoring.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/nodejs
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: https://www.npmjs.com/package/amqplib
[6]: https://www.npmjs.com/package/rhea
