Track buffer behavior with these additional metrics:

`pipelines.buffer_events`
: Number of events currently in the buffer.

`pipelines.buffer_byte_size`
: Current buffer size in bytes.

`pipelines.buffer_received_events_total`
: Total events added to the buffer.

`pipelines.buffer_received_event_bytes_total`
: Total bytes added to the buffer.

`pipelines.buffer_sent_events_total`
: Total events successfully flushed from the buffer.

`pipelines.buffer_sent_event_bytes_total`
: Total bytes successfully flushed from the buffer.

`pipelines.buffer_discarded_events_total`
: Total number of events discarded from the buffer (for example, due to overflow).

`pipelines.source_buffer_utilization`
: The percentage of a source's buffer that is used.

`pipelines.source_buffer_utilization_level`
: The number of events in a source's buffer.

`pipelines.transform_buffer_utilization`
: The percentage of a transform's buffer that is used.

`pipelines.transform_buffer_utilization_level`
: The number of events in a transform's buffer.