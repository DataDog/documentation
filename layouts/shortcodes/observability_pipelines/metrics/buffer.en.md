Track buffer behavior with these metrics:

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
: Events discarded from the buffer (for example, due to overflow).