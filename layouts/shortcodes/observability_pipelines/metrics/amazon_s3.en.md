These metrics are specific to the Amazon S3 source, which processes S3 objects using Amazon SQS notifications. For metrics common to all components, see the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the source type.

`pipelines.sqs_message_received_messages_total`
: **Description**: The number of SQS messages received.
: **Metric type**: count

`pipelines.sqs_message_processing_succeeded_total`
: **Description**: The number of SQS messages successfully processed.
: **Metric type**: count

`pipelines.sqs_message_delete_succeeded_total`
: **Description**: The number of successful deletions of SQS messages.
: **Metric type**: count

`pipelines.sqs_message_defer_succeeded_total`
: **Description**: The number of SQS messages for which visibility-timeout deferral succeeded.
: **Metric type**: count

`pipelines.sqs_s3_event_record_ignored_total`
: **Description**: The number of S3 event records in an SQS message that were ignored because they were not `ObjectCreated` event kinds.
: **Metric type**: count

`pipelines.s3_object_processing_succeeded_duration_seconds`
: **Description**: Time, in seconds, taken to successfully process an S3 object.
: **Metric type**: gauge

`pipelines.s3_object_processing_failed_duration_seconds`
: **Description**: Time, in seconds, taken to process an S3 object that failed.
: **Metric type**: gauge

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
