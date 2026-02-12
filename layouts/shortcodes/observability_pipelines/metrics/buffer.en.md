Track buffer behavior with these metrics:

`pipelines.buffer_size_events`
: Number of events currently in the buffer.

`pipelines.buffer_size_bytes`
: Number of bytes currently in the buffer.

`pipelines.buffer_received_events_total`
: Cumulative number of events written to the buffer.

`pipelines.buffer_received_event_bytes_total`
: Cumulative number of bytes written to the buffer.

`pipelines.buffer_sent_events_total`
: Cumulative number of events read from the buffer and sent downstream.

`pipelines.buffer_sent_event_bytes_total`
: Cumulative number of bytes read from the buffer and sent downstream.

`pipelines.buffer_discarded_events_total`
: Cumulative number of events dropped by a buffer.

`pipelines.source_buffer_utilization`
: Histogram of event count in a source's buffer. Sources ingest events, then write them to this buffer.

`pipelines.source_buffer_utilization_level`
: Current event count in a source's buffer. Sources ingest events, then write them to this buffer.

`pipelines.source_buffer_utilization_mean`
: The exponentially weighted moving average (EWMA) of the number of events in the source's buffer.

`pipelines.source_buffer_max_size_events`
: A source's maximum buffer size, defined as the number of events.

`pipelines.transform_buffer_utilization`
: Histogram of event count in a processor's buffer. Processors pull from this buffer, transform the event, and then send it downstream.

`pipelines.transform_buffer_utilization_level`
: Current event count in a processor's buffer. Processors pull from this buffer, transform the event, and then send it downstream.

`pipelines.transform_buffer_utilization_mean`
: The exponentially weighted moving average (EWMA) of the number of events in the processor's buffer.

`pipelines.transform_buffer_max_size_events`
: A processor's maximum buffer size, defined as the number of events.