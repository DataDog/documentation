---
title: File
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled for this sink.

See [End-to-end Acknowledgements][e2e_acks] for more information on how event acknowledgement is handled.

[e2e_acks]: https://vector.dev/docs/about/under-the-hood/architecture/end-to-end-acknowledgements/</td></tr><tr><td>acknowledgements.enabled</td><td>Whether or not end-to-end acknowledgements are enabled.

When enabled for a sink, any source connected to that sink, where the source supports
end-to-end acknowledgements as well, will wait for events to be acknowledged by the sink
before acknowledging them at the source.

Enabling or disabling acknowledgements at the sink level takes precedence over any global
[`acknowledgements`][global_acks] configuration.

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements</td></tr><tr><td>compression</td><td>Compression configuration.</td></tr><tr><td>encoding</td><td>Configures how events are encoded into raw bytes.</td></tr><tr><td>encoding.avro</td><td>Apache Avro-specific encoder options.</td></tr><tr><td>encoding.avro.schema</td><td>The Avro schema.</td></tr><tr><td>encoding.codec</td><td>The codec to use for encoding events.</td></tr><tr><td>encoding.csv</td><td>The CSV Serializer Options.</td></tr><tr><td>encoding.csv.fields</td><td>Configures the fields that will be encoded, as well as the order in which they
appear in the output.

If a field is not present in the event, the output will be an empty string.

Values of type `Array`, `Object`, and `Regex` are not supported and the
output will be an empty string.</td></tr><tr><td>encoding.except_fields</td><td>List of fields that will be excluded from the encoded event.</td></tr><tr><td>encoding.metric_tag_values</td><td>Controls how metric tag values are encoded.

When set to `single`, only the last non-bare value of tags will be displayed with the
metric.  When set to `full`, all metric tags will be exposed as separate assignments.</td></tr><tr><td>encoding.only_fields</td><td>List of fields that will be included in the encoded event.</td></tr><tr><td>encoding.timestamp_format</td><td>Format used for timestamp fields.</td></tr><tr><td>framing</td><td>Framing configuration.</td></tr><tr><td>framing.character_delimited</td><td>Options for the character delimited encoder.</td></tr><tr><td>framing.character_delimited.delimiter</td><td>The ASCII (7-bit) character that delimits byte sequences.</td></tr><tr><td>framing.method</td><td>The framing method.</td></tr><tr><td>idle_timeout_secs</td><td>The amount of time that a file can be idle and stay open.

After not receiving any events in this amount of time, the file will be flushed and closed.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>buffer</td><td>Configures the buffering behavior for this sink.

More information about the individual buffer types, and buffer behavior, can be found in the
[Buffering Model][buffering_model] section.

[buffering_model]: /docs/about/under-the-hood/architecture/buffering-model/</td></tr><tr><td>buffer.max_events</td><td>The maximum number of events allowed in the buffer.</td></tr><tr><td>buffer.max_size</td><td>The maximum size of the buffer on disk.

Must be at least ~256 megabytes (268435488 bytes).</td></tr><tr><td>buffer.type</td><td>The type of buffer to use.</td></tr><tr><td>buffer.when_full</td><td>Event handling behavior when a buffer is full.</td></tr><tr><td>path</td><td>File path to write events to.

Compression format extension must be explicit.</td></tr><tr><td>healthcheck</td><td>Healthcheck configuration.</td></tr><tr><td>healthcheck.enabled</td><td>Whether or not to check the health of the sink when Vector starts up.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_sent_bytes_total</td><td>The number of raw bytes sent by this component to destination sinks.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>events_discarded_total</td><td>The total number of events discarded by this component.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>buffer_byte_size</td><td>The number of bytes current in the buffer.</td></tr><tr><td>buffer_events</td><td>The number of events currently in the buffer.</td></tr><tr><td>buffer_received_events_total</td><td>The number of events received by this buffer.</td></tr><tr><td>buffer_received_event_bytes_total</td><td>The number of bytes received by this buffer.</td></tr><tr><td>buffer_sent_events_total</td><td>The number of events sent by this buffer.</td></tr><tr><td>buffer_sent_event_bytes_total</td><td>The number of bytes sent by this buffer.</td></tr><tr><td>processing_errors_total</td><td>The total number of processing errors encountered by this component. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>buffer_discarded_events_total</td><td>The number of events dropped by this non-blocking buffer.</td></tr></tbody></table>

# How It Works
## File & Directory Creation
Vector will attempt to create the entire directory structure
and the file when emitting events to the file sink. This
requires that the Vector agent have the correct permissions
to create and write to files in the specified directories.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Health checks
Health checks ensure that the downstream service is
accessible and ready to accept data. This check is performed
upon sink initialization. If the health check fails an error
will be logged and Vector will proceed to start.

## Durability of Created Files
Vector makes no attempt to ensure the files output by
this sink are durably written to disk by using any of
the "sync" write modes. As such, this sink only
ensures that the operating system does not generate an
error, it does not wait until the data is written to
disk before acknowledging the events.


