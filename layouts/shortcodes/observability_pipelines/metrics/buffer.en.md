Use these metrics to analyze buffer performance. All metrics are emitted on a one-second interval, unless otherwise stated. Note that `counter` metrics such as `pipelines.buffer_received_events_total` represent the count per one-second interval, not a cumulative total.

### Destination buffer metrics

These metrics are specific to destination buffers, located upstream of a destination. Each destination emits its own respective buffer metrics.

`pipelines.buffer_size_events`
: **Description**: Number of events in a destination's buffer.
: **Metric type**: gauge

`pipelines.buffer_size_bytes`
: **Description**: Number of bytes in a destination's buffer.
: **Metric type**: gauge

`pipelines.buffer_received_events_total`
: **Description**: Events received by a destination's buffer.
: **Metric type**: counter

`pipelines.buffer_received_bytes_total`
: **Description**: Bytes received by a destination's buffer.
: **Metric type**: counter

`pipelines.buffer_sent_events_total`
: **Description**: Events sent downstream by a destination's buffer.
: **Metric type**: counter

`pipelines.buffer_sent_bytes_total`
: **Description**: Bytes sent downstream by a destination's buffer.
: **Metric type**: counter

`pipelines.buffer_discarded_events_total`
: **Description**: Events discarded by the buffer. Use the `intentional` tag to filter or group by intentional or unintentional discards.
: **Metric type**: counter

`pipelines.buffer_discarded_bytes_total`
: **Description**: Bytes discarded by the buffer. Use the `intentional` tag to filter or group by intentional or unintentional discards.
: **Metric type**: counter

### Source buffer metrics

These metrics are specific to source buffers, located downstream of a source. Each source emits its own respective buffer metrics. **Note**: Source buffers are not configurable, but these metrics can help monitor backpressure as it propagates to your pipeline's source.

`pipelines.source_buffer_utilization`
: **Description**: Event count in a source's buffer.
: **Metric type**: histogram

`pipelines.source_buffer_utilization_level`
: **Description**: Number of events in a source's buffer.
: **Metric type**: gauge

`pipelines.source_buffer_utilization_mean`
: **Description**: The exponentially weighted moving average (EWMA) of the number of events in the source's buffer.
: **Metric type**: gauge

`pipelines.source_buffer_max_size_events`
: **Description**: A source buffer's maximum event capacity.
: **Metric type**: gauge

### Processor buffer metrics

These metrics are specific to processor buffers, located upstream of a processor. Each processor emits its own respective buffer metrics. **Note**: Processor buffers are not configurable, but these metrics can help monitor backpressure as it propagates through your pipeline's processors.

`pipelines.transform_buffer_utilization`
: **Description**: Event count in a processor's buffer.
: **Metric type**: histogram

`pipelines.transform_buffer_utilization_level`
: **Description**: Event count in a processor's buffer.
: **Metric type**: gauge

`pipelines.transform_buffer_utilization_mean`
: **Description**: The exponentially weighted moving average (EWMA) of the number of events in a processor's buffer.
: **Metric type**: gauge

`pipelines.transform_buffer_max_size_events`
: **Description**: A processor buffer's maximum event capacity.
: **Metric type**: gauge

### Deprecated buffer metrics

These metrics are still emitted by the Observability Pipelines Worker for backwards compatibility. Datadog recommends using the replacements when possible.

`pipelines.buffer_events`
: **Description**: Number of events in a destination's buffer. Use `pipelines.buffer_size_events` instead.
: **Metric type**: gauge

`pipelines.buffer_byte_size`
: **Description**: Number of bytes in a destination's buffer. Use `pipelines.buffer_size_bytes` instead.
: **Metric type**: gauge
