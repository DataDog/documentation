This metric is specific to the Reduce processor. It is emitted in addition to the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the processor type.

`pipelines.stale_events_flushed_total`
: **Description**: The number of stale events that the processor has flushed.
: **Metric type**: count

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
