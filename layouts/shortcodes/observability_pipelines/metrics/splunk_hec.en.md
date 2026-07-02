This metric is specific to the Splunk HEC destination. It is emitted in addition to the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the destination type.

`pipelines.splunk_pending_acks`
: **Description**: The number of outstanding Splunk HEC indexer acknowledgements awaiting response.
: **Metric type**: gauge

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
