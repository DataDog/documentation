Use these metrics to analyze buffer performance. All metrics are emitted on a one second interval unless otherwise stated.

### Destination Buffer Metrics

These metrics are specific to destination buffers, which are located upstream of a destination. Each destination emits its own respective buffer metrics.

`pipelines.buffer_size_events`
: Gauge of the number of events currently in a destination's buffer.

`pipelines.buffer_size_bytes`
: Gauge of the number of bytes currently in a destination's buffer.

`pipelines.buffer_received_events_total`
: Counter of events received by a destination's buffer.

`pipelines.buffer_received_bytes_total`
: Counter of bytes received by a destination's buffer.

`pipelines.buffer_sent_events_total`
: Counter of events sent downstream by a destination's buffer.

`pipelines.buffer_sent_bytes_total`
: Counter of bytes sent downstream by a destination's buffer.

`pipelines.buffer_discarded_events_total`
: Counter of events discarded by the buffer. Use the `intentional` tag to filter or group by intentional or unintentional discards.

`pipelines.buffer_discarded_bytes_total`
: Counter of bytes discarded by the buffer. Use the `intentional` tag to filter or group by intentional or unintentional discards.

### Source Buffer Metrics

These metrics are specific to source buffers, located downstream of a source. Each source emits its own respective buffer metrics. Note that source buffers are not configurable, but these metrics can help monitor backpressure as it propagates to your pipeline's source.

`pipelines.source_buffer_utilization`
: Histogram of event count in a source's buffer.

`pipelines.source_buffer_utilization_level`
: Gauge of the number of events in a source's buffer.

`pipelines.source_buffer_utilization_mean`
: The exponentially weighted moving average (EWMA) of the number of events in the source's buffer.

`pipelines.source_buffer_max_size_events`
: A source buffer's maximum event capacity.

### Processor Buffer Metrics

These metrics are specific to processor buffers, located upstream of a processor.  Each processor emits its own respective buffer metrics. Note that processor buffers are not configurable, but these metrics can help monitor backpressure as it propagates through your pipeline's processors.

`pipelines.transform_buffer_utilization`
: Histogram of event count in a processor's buffer.

`pipelines.transform_buffer_utilization_level`
: Gauge of event count in a processor's buffer.

`pipelines.transform_buffer_utilization_mean`
: The exponentially weighted moving average (EWMA) of the number of events in a processor's respective buffer.

`pipelines.transform_buffer_max_size_events`
: A processor buffer's maximum event capacity.

### Deprecated Buffer Metrics

These metrics are still emitted by the Observability Pipelines Worker for backwards compatibility. Please use the recommended replacements when possible.

`pipelines.buffer_events`
: Gauge of the number of events currently in a destination's buffer. Use `pipelines.buffer_size_events` instead.

`pipelines.buffer_byte_size`
: Gauge of the number of bytes currently in a destination's buffer. Use `pipelines.buffer_size_bytes` instead.
