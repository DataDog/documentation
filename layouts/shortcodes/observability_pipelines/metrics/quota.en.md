These metrics are specific to the Quota processor. For metrics common to all components, see the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the processor type, such as `quota`.

`pipelines.quota_reached_events_total`
: **Description**: The number of events dropped because they exceeded a configured quota limit.
: **Metric type**: count

`pipelines.quota_reached_event_bytes_total`
: **Description**: The number of bytes of events dropped because they exceeded a configured quota limit.
: **Metric type**: count

`pipelines.quota_overflow_destination_sent_events_total`
: **Description**: The number of events routed to a secondary overflow destination when a quota limit was exceeded.
: **Metric type**: count

`pipelines.quota_fill`
: **Description**: The current fill level of a rate-limiting quota bucket, from 0 to 100.
: **Metric type**: gauge

`pipelines.quotas_usage`
: **Description**: Aggregate fill level across all quota buckets, from 0 to 100.
: **Metric type**: gauge

`pipelines.quota_limit_events`
: **Description**: The configured maximum event throughput per interval for a quota rule.
: **Metric type**: gauge

`pipelines.quota_limit_bytes`
: **Description**: The configured maximum byte throughput per interval for a quota rule.
: **Metric type**: gauge

`pipelines.quotas_count`
: **Description**: The number of active rate-limiting quota buckets currently being tracked.
: **Metric type**: gauge

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
