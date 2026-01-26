Track buffer behavior with these additional metrics:

`pipelines.buffer_events`
: Number of events currently in the buffer.

`pipelines.buffer_size_byte`
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
: Cumulative number of events dropped by a buffer (for example, due to overflow).

`pipelines.source_buffer_utilization`
: The percentage of a source's buffer that is used.

`pipelines.source_buffer_utilization_level`
: Current event count in a source's buffer. The buffer is downstream of a source, which means the source receives the event and then puts it in the buffer.

`pipelines.source_buffer_max_size_event`
: A source's maximum buffer size, defined as the number of events.

`pipelines.transform_buffer_utilization`
: The percentage of a transform's (processor's) buffer that is used.

`pipelines.transform_buffer_utilization_level`
: Current event count in a processor's buffer. The buffer is upstream of the processor, which means the event is put into the buffer before it gets processed.

`pipelines.transform_buffer_max_size_event`
: A processor's maximum buffer size, defined as the number of events.