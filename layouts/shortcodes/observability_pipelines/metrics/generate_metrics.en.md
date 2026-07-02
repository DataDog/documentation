This metric is specific to the Generate Metrics processor. It is emitted in addition to the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the processor type.

`pipelines.generated_metrics_from_logs_total`
: **Description**: The number of metrics generated from log events by the processor.
: **Metric type**: count

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
