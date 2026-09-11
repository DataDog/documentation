These metrics are specific to destination buffers, located upstream of a destination. Each destination emits its own respective buffer metrics.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the destination type, such as `datadog_logs` for the Datadog Logs destination.

**Note**: Metrics ending in `_total` report a count for each time interval, so their raw value does not increase monotonically.

`pipelines.buffer_size_events`
: **Description**: Number of events in a destination's buffer.
: **Metric type**: gauge

`pipelines.buffer_size_bytes`
: **Description**: Number of bytes in a destination's buffer.
: **Metric type**: gauge

`pipelines.buffer_max_size_events`
: **Description**: A destination buffer's maximum event capacity.
: **Metric type**: gauge

`pipelines.buffer_max_size_bytes`
: **Description**: A destination buffer's maximum byte capacity.
: **Metric type**: gauge

`pipelines.buffer_send_duration_seconds`
: **Description**: The time spent sending a payload to a destination's buffer.
: **Metric type**: distribution

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
: **Description**: Events discarded by the buffer.
: **Metric type**: counter
: **Additional tags**: `intentional:true` means an incoming event was dropped because the buffer was configured to drop the newest logs when it's full. `intentional:false` means the event was dropped due to an error.

`pipelines.buffer_discarded_bytes_total`
: **Description**: Bytes discarded by the buffer.
: **Metric type**: counter
: **Additional tags**: `intentional:true` means an incoming event was dropped because the buffer was configured to drop the newest logs when it's full. `intentional:false` means the event was dropped due to an error.
