---
title: Dnstap
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>host_key</td><td>Overrides the name of the log field used to add the source path to each event.

The value will be the socket path itself.

By default, the [global `log_schema.host_key` option][global_host_key] is used.

[global_host_key]: https://vector.dev/docs/reference/configuration/global-options/#log_schema.host_key</td></tr><tr><td>max_frame_handling_tasks</td><td>Maximum number of frames that can be processed concurrently.</td></tr><tr><td>max_frame_length</td><td>Maximum DNSTAP frame length that the source will accept.

If any frame is longer than this, it will be discarded.</td></tr><tr><td>multithreaded</td><td>Whether or not to concurrently process DNSTAP frames.</td></tr><tr><td>raw_data_only</td><td>Whether or not to skip parsing/decoding of DNSTAP frames.

If set to `true`, frames will not be parsed/decoded. The raw frame data will be set as a field on the event
(called `rawData`) and encoded as a base64 string.</td></tr><tr><td>socket_file_mode</td><td>Unix file mode bits to be applied to the unix socket file as its designated file permissions.

Note that the file mode value can be specified in any numeric format supported by your configuration
language, but it is most intuitive to use an octal number.</td></tr><tr><td>socket_path</td><td>Absolute path to the socket file to read DNSTAP data from.

The DNS server must be configured to send its DNSTAP data to this socket file. The socket file will be created
if it doesn't already exist when the source first starts.</td></tr><tr><td>socket_receive_buffer_size</td><td>The size, in bytes, of the receive buffer used for the socket.

This should not typically needed to be changed.</td></tr><tr><td>socket_send_buffer_size</td><td>The size, in bytes, of the send buffer used for the socket.

This should not typically needed to be changed.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>parse_errors_total</td><td>The total number of errors parsing metrics for this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Server Unix Domain Socket (UDS)
The `dnstap` source receives dnstap data through a Unix Domain Socket (aka UDS). The
path of the UDS must be explicitly specified in the source's configuration.

Upon startup, the `dnstap` source creates a new server UDS at the specified path.
If the path of UDS is already in use, Vector automatically deletes it before
creating a new path.

The default permissions of the UDS are determined by the current `umask` value.
To customize it to allow the local BIND server to send dnstap data to the UDS,
you can specify the desired UDS permissions (for example the file mode) explicitly
in the `dnstap` source configuration. To set its permissions to `0774`, for example,
add the `socket_file_mode` option:

```toml
[sources.my_dnstap_source]
type = "dnstap"
socket_file_mode: 0o774
# Other configs
```

## State
This component is stateless, meaning its behavior is consistent across each input.

## Manipulate UDS Buffer Size
The `dnstap` source supports configuring the UDS buffer for both receiving and
sending, which may be helpful for handling DNS traffic spikes more smoothly in
high-usage scenarios in which performance is of paramount concern.

To configure the send/receive buffer size for the server UDS, set the
[`socket_receive_buffer_size`](#socket_receive_buffer_size) and
[`socket_send_buffer_size`](#socket_send_buffer_size) parameters in the component's
configuration. Here's an example:

```toml
[sources.my_dnstap_source]
type = "dnstap"
socket_receive_buffer_size = 10_485_760
socket_send_buffer_size = 10_485_760
# Other configs
```

For the buffer size settings to take effect, you need to ensure that the system-wide
settings for send/receive buffer sizes (i.e. the values of
`/proc/sys/net/core/rmem_max` and `/proc/sys/net/core/wmem_max` on Linux) are
large enough.

## Context
By default, the `dnstap` source augments events with helpful
context keys.


