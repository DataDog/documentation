This metric is specific to the Reduce processor. For metrics common to all components, see the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- The `component_type` tag is `reduce` for these metrics.

`pipelines.stale_events_flushed_total`
: **Description**: The number of stale events that the processor has flushed.
: **Metric type**: count

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
