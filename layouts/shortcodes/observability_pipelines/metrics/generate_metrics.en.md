This metric is specific to the Generate Metrics processor. For metrics common to all components, see the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- The `component_type` tag is `generate_metrics` for these metrics.

`pipelines.generated_metrics_from_logs_total`
: **Description**: The number of metrics generated from log events by the processor.
: **Metric type**: count

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
