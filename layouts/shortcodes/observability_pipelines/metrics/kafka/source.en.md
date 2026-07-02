These metrics are specific to the Kafka source. For metrics common to all components, see the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- The `component_type` tag is `kafka` for these metrics.

`pipelines.kafka_consumer_lag`
: **Description**: Kafka consumer lag per topic and partition. High values indicate the source is falling behind the incoming message rate.
: **Metric type**: gauge

`pipelines.kafka_consumed_messages_total`
: **Description**: The number of messages consumed from Kafka brokers.
: **Metric type**: count

`pipelines.kafka_consumed_messages_bytes_total`
: **Description**: The number of message bytes consumed from Kafka brokers.
: **Metric type**: count

`pipelines.kafka_requests_total`
: **Description**: The number of requests sent to Kafka brokers.
: **Metric type**: count

`pipelines.kafka_requests_bytes_total`
: **Description**: The number of bytes transmitted to Kafka brokers.
: **Metric type**: count

`pipelines.kafka_responses_total`
: **Description**: The number of responses received from Kafka brokers.
: **Metric type**: count

`pipelines.kafka_responses_bytes_total`
: **Description**: The number of bytes received from Kafka brokers.
: **Metric type**: count

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
