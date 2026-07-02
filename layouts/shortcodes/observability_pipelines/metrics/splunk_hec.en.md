This metric is specific to the Splunk HEC destination. For metrics common to all components, see the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- The `component_type` tag is `splunk_hec` for these metrics.

`pipelines.splunk_pending_acks`
: **Description**: The number of outstanding Splunk HEC indexer acknowledgements awaiting response.
: **Metric type**: gauge

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
