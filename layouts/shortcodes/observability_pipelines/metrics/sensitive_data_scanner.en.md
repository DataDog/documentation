These metrics are specific to the Sensitive Data Scanner processor. They are emitted in addition to the [common component metrics][101].

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the processor type, such as `sensitive_data_scanner`.

`pipelines.sds_rule_matched_total`
: **Description**: The number of events that matched a Sensitive Data Scanner rule. Tagged with the matching rule name.
: **Metric type**: count

`pipelines.scanned_events`
: **Description**: The number of events scanned by the Sensitive Data Scanner engine.
: **Metric type**: count

`pipelines.scanning.match_count`
: **Description**: The number of matches found by the Sensitive Data Scanner.
: **Metric type**: count

`pipelines.scanning.suppressed_match_count`
: **Description**: The number of matches suppressed by the Sensitive Data Scanner.
: **Metric type**: count

`pipelines.scanning.duration`
: **Description**: Accumulated wall-clock time, in seconds, spent scanning events. Use this metric to benchmark processor performance and evaluate optimizations.
: **Metric type**: count

`pipelines.scanning.cpu_duration`
: **Description**: Accumulated CPU time, in seconds, spent scanning events.
: **Metric type**: count

`pipelines.scanner.total_count`
: **Description**: The number of Sensitive Data Scanner instances currently alive.
: **Metric type**: gauge

`pipelines.scanner.total_regexes`
: **Description**: The number of regexes held across all Sensitive Data Scanners.
: **Metric type**: gauge

[101]: /observability_pipelines/monitoring/metrics/#component-metrics
