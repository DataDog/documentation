These metrics are specific to source buffers, located downstream of a source. Each source emits its own respective buffer metrics. Available in Worker version 2.13 and later. **Note**: Source buffers are not configurable, but these metrics can help monitor backpressure as it propagates to your pipeline's source.

- Use the `component_id` tag to filter or group by individual components.
- Use the `component_type` tag to filter or group by the source type, such as `splunk_hec` for the Splunk HEC source.

`pipelines.source_buffer_utilization`
: **Description**: Event count in a source's buffer.
: **Metric type**: distribution

`pipelines.source_buffer_utilization_level`
: **Description**: Event count in a source's buffer.
: **Metric type**: gauge

`pipelines.source_buffer_utilization_mean`
: **Description**: The exponentially weighted moving average (EWMA) of the number of events in the source's buffer.
: **Metric type**: gauge

`pipelines.source_buffer_max_size_events`
: **Description**: A source buffer's maximum event capacity.
: **Metric type**: gauge

`pipelines.source_buffer_max_size_bytes`
: **Description**: A source buffer's maximum byte capacity.
: **Metric type**: gauge