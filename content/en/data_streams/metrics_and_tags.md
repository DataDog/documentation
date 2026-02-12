---
title: Metrics and Tags
aliases:
  - "/data_streams/guide/metrics-and-tags"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Data Streams Monitoring is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

This document discusses the following Data Streams Monitoring metrics and their tags:

- `data_streams.latency`
- `data_streams.kafka.lag_seconds`
- `data_streams.kafka.lag_messages`
- `data_streams.sqs.dead_letter_queue.messages`
- `data_streams.payload_size`

### data_streams.latency

This metric measures latency between two points in the pipeline. The value can represent different types of latency, depending on its tags.

`pathway_type`
: What information the metric value represents. Possible pathway types:
  <br/>
  - `full`: end-to-end latency between data origin (`start`) and another point (`end`) in the pipeline
     - `start` tag: data origin
     - `end` tag: arbitrary point where data is last tracked
  - `edge`: latency between two services, connected through a queue or directly over HTTP/gRPC. Measures duration between time of produce in the producer (`start`) and time of consume in the consumer (`end`)
     - `start` tag: the upstream producer service
     - `end` tag: the downstream consumer service
  - `partial_edge`: latency between a service and a queue, if the producer or consumer is not known (that is, not instrumented with Data Streams Monitoring)
     - `start` tag: the upstream producer service/queue
     - `end` tag: the downstream consumer service/queue
  - `internal`: latency within the service. Measures time between _consume_ and the folllowing _produce_ operation.

`start`
: The name of the node where Data Streams Monitoring first detects the payload. This node can be a service (the original producer) or a queue (the original producer is not known to Data Streams Monitoring).
  <br/><br/>
  When the `pathway_type` tag is set to `full` (end-to-end latency), `start` always refers to the start of the pipeline.
  <br/><br/>
  For example:
  <br/>
  {{< img src="data_streams/dsm_pipeline.png" alt="Diagram of a pipeline that flows from 'Service A' to 'Queue A' to 'Service B' to 'Queue B' to 'Service C'." >}}
  <br/>
  The query `start:serviceA and end:serviceC and pathway_type:full` measures end-to-end latency for this pipeline.
  <br/>
  The query `start:serviceB and end:serviceC and pathway_type:full` **does not** measure latency for this pipeline, as there is no data originating at Service B.

`end`
: The name of a node where the pipeline ends. You can use `end` to get data for partial pipelines.
  <br/><br/>
  For example:
  <br/>
  {{< img src="data_streams/dsm_pipeline.png" alt="Diagram of a pipeline that flows from 'Service A' to 'Queue A' to 'Service B' to 'Queue B' to 'Service C'." >}}
  <br/>
  You can use `start:serviceA and end:serviceB and pathway_type:full` to measure the first part of this pipeline.
  <br/>

`service`
: The name of the service where data is collected.

`type`
: The name of the queueing technology for which the data is generated, for example: Kafka, RabbitMQ, SQS. For HTTP and gRPC, `type` is set to `http` or `grpc`.

`topic`
: The name of the topic the data is produced to or consumed from, if any.

`direction`
: The direction of data flow for a particular `service`. Possible values:
  <br/>
  - `in`: the consume operation or serving data over HTTP/gRPC
  - `out`: the produce operation or sending data over HTTP/gRPC

`env`
: Environment in which the service is running

`pathway`
: An ordered list of services, separated by `/`, that the data travels through. If the data goes through the same service multiple times consecutively, the service name is added only once.

`detailed_pathway`
: An ordered list of services and queues, separated by `/`, that the data travels through. The same as `pathway` but with queues in addition to services.

`visited_queues`
: Represents all queues the data goes through. (Queues directly at the start or end of the pipeline are excluded.) You can use this tag to make your query more specific if your data is flowing through multiple queues.
  <br/><br/>
  Consider the following pipeline:
  <br/>
  {{< img src="data_streams/visited-queues-disambiguation.png" alt="Diagram of a pipeline that flows from 'Service A', splits into two ('Queue A' and 'Queue B'), and merges at 'Service B'." >}}
  <br/><br/>
  To measure data flow from Service A to Queue A to Service B, you can query `start:serviceA and end:serviceB and visited_queues:queueA`.
  <br/>
  To measure data flow from Service A to Queue B to Service B, you can query `start:serviceA and end:serviceB and visited_queues:queueB`.

`visited_services`
: Represents all services the data goes through. (Services directly at the start or end of the pipeline are excluded.)

`upstream_service`
: The name of the service upstream from a particular `service`.

`exchange`
: For RabbitMQ, the name of the exchange the data went to.

`hash`
: A unique identifier, computed using various tag values (`type`, `service`, `direction`, `parent_hash`, and others).

`parent_hash`
: The `hash` of the node upstream from the node on the pathway.

### data_streams.kafka.lag_seconds

This metric represents the lag (in seconds) between the last produce and consume operations.

`partition`
: The Kafka partition.

`env`
: The environment in which the consumer service is running.

`topic`
: The Kafka topic.

`consumer_group`
: The Kafka consumer group.

### data_streams.kafka.lag_messages

This metric represents the lag (in offsets) between the last produce and consume operations.

`partition`
: The Kafka partition.

`env`
: The environment in which the consumer service is running.

`topic`
: The Kafka topic.

`consumer_group`
: The Kafka consumer group.

### data_streams.payload_size

This metric is a distribution metric representing the message size distribution in bytes of messages going through the Data Streams.
The tags are the same as for the `data_streams.latency` metric.

### data_streams.sqs.dead_letter_queue.messages

This metric represents the number of a messages in an SQS dead-letter queue. It is used to to measure the number of dead-lettered messages for a given queue.

`arn`
: The ARN (Amazon Resource Name) of the queue.

`aws_account`
: The AWS Account number of the queue (and dead-letter queue).

`dlq`
: The ARN of the dead letter queue that messages are being sent to.

`queue`
: The name of the queue.

`region`
: The AWS region of the queue (and dead-letter queue).
