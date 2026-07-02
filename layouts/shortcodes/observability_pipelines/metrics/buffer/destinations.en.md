These metrics are specific to destination buffers, located upstream of a destination. Each destination emits its own respective buffer metrics.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the destination type, such as `datadog_logs` for the Datadog Logs destination.

`pipelines.buffer_size_events`
: **Description**: Number of events in a destination's buffer.
: **Metric type**: gauge

`pipelines.buffer_size_bytes`
: **Description**: Number of bytes in a destination's buffer.
: **Metric type**: gauge

`pipelines.buffer_received_events_total`
: **Description**: Count of events received by a destination's buffer in a time interval. Use the `cumsum` function to represent the cumulative total.
: **Metric type**: counter

`pipelines.buffer_received_bytes_total`
: **Description**: Count of bytes received by a destination's buffer in a time interval. Use the `cumsum` function to represent the cumulative total.
: **Metric type**: counter

`pipelines.buffer_sent_events_total`
: **Description**: Count of events sent downstream by a destination's buffer in a time interval. Use the `cumsum` function to represent the cumulative total.
: **Metric type**: counter

`pipelines.buffer_sent_bytes_total`
: **Description**: Count of bytes sent downstream by a destination's buffer in a time interval. Use the `cumsum` function to represent the cumulative total.
: **Metric type**: counter

`pipelines.buffer_discarded_events_total`
: **Description**: Count of events discarded by the buffer in a time interval. Use the `cumsum` function to represent the cumulative total.
: **Metric type**: counter
: **Additional tags**: `intentional:true` means an incoming event was dropped because the buffer was configured to drop the newest logs when it's full. `intentional:false` means the event was dropped due to an error.

`pipelines.buffer_discarded_bytes_total`
: **Description**: Count of bytes discarded by the buffer in a time interval. Use the `cumsum` function to represent the cumulative total.
: **Metric type**: counter
: **Additional tags**: `intentional:true` means an incoming event was dropped because the buffer was configured to drop the newest logs when it's full. `intentional:false` means the event was dropped due to an error.
