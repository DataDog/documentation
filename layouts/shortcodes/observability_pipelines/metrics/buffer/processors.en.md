
These metrics are specific to processor buffers, located upstream of a processor. Each processor emits its own respective buffer metrics. **Note**: Processor buffers are not configurable, but these metrics can help monitor backpressure as it propagates through your pipeline's processors.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the processor type, such as `quota` for the Quota processor.

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