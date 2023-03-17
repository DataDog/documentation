---
title: STDIN
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>decoding</td><td>Configures how events are decoded from raw bytes.</td></tr><tr><td>decoding.codec</td><td>The codec to use for decoding events.</td></tr><tr><td>framing</td><td>Framing configuration.

Framing deals with how events are separated when encoded in a raw byte form, where each event is
a "frame" that must be prefixed, or delimited, in a way that marks where an event begins and
ends within the byte stream.</td></tr><tr><td>framing.character_delimited</td><td>Options for the character delimited decoder.</td></tr><tr><td>framing.character_delimited.delimiter</td><td>The character that delimits byte sequences.</td></tr><tr><td>framing.character_delimited.max_length</td><td>The maximum length of the byte buffer.

This length does *not* include the trailing delimiter.

By default, there is no maximum length enforced. If events are malformed, this can lead to
additional resource usage as events continue to be buffered in memory, and can potentially
lead to memory exhaustion in extreme cases.

If there is a risk of processing malformed data, such as logs with user-controlled input,
consider setting the maximum length to a reasonably large value as a safety net. This will
ensure that processing is not truly unbounded.</td></tr><tr><td>framing.method</td><td>The framing method.</td></tr><tr><td>framing.newline_delimited</td><td>Options for the newline delimited decoder.</td></tr><tr><td>framing.newline_delimited.max_length</td><td>The maximum length of the byte buffer.

This length does *not* include the trailing delimiter.

By default, there is no maximum length enforced. If events are malformed, this can lead to
additional resource usage as events continue to be buffered in memory, and can potentially
lead to memory exhaustion in extreme cases.

If there is a risk of processing malformed data, such as logs with user-controlled input,
consider setting the maximum length to a reasonably large value as a safety net. This will
ensure that processing is not truly unbounded.</td></tr><tr><td>framing.octet_counting</td><td>Options for the octet counting decoder.</td></tr><tr><td>framing.octet_counting.max_length</td><td>The maximum length of the byte buffer.</td></tr><tr><td>host_key</td><td>Overrides the name of the log field used to add the current hostname to each event.

By default, the [global `log_schema.host_key` option][global_host_key] is used.

[global_host_key]: https://vector.dev/docs/reference/configuration/global-options/#log_schema.host_key</td></tr><tr><td>max_length</td><td>The maximum buffer size, in bytes, of incoming messages.

Messages larger than this are truncated.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>stdin_reads_failed_total</td><td>The total number of errors reading from stdin.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Line Delimiters
Each line is read until a new line delimiter, the `0xA` byte, is found.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Context
By default, the `stdin` source augments events with helpful
context keys.


