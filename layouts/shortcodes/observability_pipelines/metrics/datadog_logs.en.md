This metric is specific to the Datadog Logs destination. For metrics common to all components, see the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- The `component_type` tag is `datadog_logs` for these metrics.

`pipelines.datadog_logs_reserved_attribute_conflicts_total`
: **Description**: The number of conflicts encountered when relocating fields with semantic meaning to a Datadog reserved attribute. Available in Worker version 2.18 and later.
: **Metric type**: count

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
