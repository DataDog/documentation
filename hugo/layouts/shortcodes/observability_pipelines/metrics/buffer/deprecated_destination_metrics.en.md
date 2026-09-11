These metrics are still emitted by the Observability Pipelines Worker for backwards compatibility. Datadog recommends using the replacements when possible.

`pipelines.buffer_events`
: **Description**: Number of events in a destination's buffer. Use `pipelines.buffer_size_events` instead.
: **Metric type**: gauge

`pipelines.buffer_byte_size`
: **Description**: Number of bytes in a destination's buffer. Use `pipelines.buffer_size_bytes` instead.
: **Metric type**: gauge