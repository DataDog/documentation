---
title: Socket
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>address</td><td>The socket address to listen for connections on, or `systemd{#N}` to use the Nth socket passed by
systemd socket activation.

If a socket address is used, it _must_ include a port.</td></tr><tr><td>connection_limit</td><td>The maximum number of TCP connections that will be allowed at any given time.</td></tr><tr><td>decoding</td><td>Configures how events are decoded from raw bytes.</td></tr><tr><td>decoding.codec</td><td>The codec to use for decoding events.</td></tr><tr><td>framing</td><td>Framing configuration.

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
ensure that processing is not truly unbounded.</td></tr><tr><td>framing.octet_counting</td><td>Options for the octet counting decoder.</td></tr><tr><td>framing.octet_counting.max_length</td><td>The maximum length of the byte buffer.</td></tr><tr><td>host_key</td><td>Overrides the name of the log field used to add the peer host to each event.

The value will be the peer host's address, including the port i.e. `1.2.3.4:9000`.

By default, the [global `log_schema.host_key` option][global_host_key] is used.

Set to `""` to suppress this key.

[global_host_key]: https://vector.dev/docs/reference/configuration/global-options/#log_schema.host_key</td></tr><tr><td>keepalive</td><td>TCP keepalive settings for socket-based components.</td></tr><tr><td>keepalive.time_secs</td><td>The time to wait before starting to send TCP keepalive probes on an idle connection.</td></tr><tr><td>max_connection_duration_secs</td><td>Maximum duration to keep each connection open. Connections open for longer than this duration are closed.

This is helpful for load balancing long-lived connections.</td></tr><tr><td>max_length</td><td>The maximum buffer size of incoming messages.

Messages larger than this are truncated.</td></tr><tr><td>mode</td><td>The type of socket to use.</td></tr><tr><td>path</td><td>The Unix socket path.

This should be an absolute path.</td></tr><tr><td>port_key</td><td>Overrides the name of the log field used to add the peer host's port to each event.

The value will be the peer host's port i.e. `9000`.

By default, `"port"` is used.

Set to `""` to suppress this key.</td></tr><tr><td>receive_buffer_bytes</td><td>The size of the receive buffer used for each connection.

Generally this should not need to be configured.</td></tr><tr><td>shutdown_timeout_secs</td><td>The timeout before a connection is forcefully closed during shutdown.</td></tr><tr><td>socket_file_mode</td><td>Unix file mode bits to be applied to the unix socket file as its designated file permissions.

Note that the file mode value can be specified in any numeric format supported by your configuration
language, but it is most intuitive to use an octal number.</td></tr><tr><td>tls</td><td>TlsEnableableConfig for `sources`, adding metadata from the client certificate</td></tr><tr><td>tls.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

Declare the supported ALPN protocols, which are used during negotiation with peer. Prioritized in the order
they are defined.</td></tr><tr><td>tls.ca_file</td><td>Absolute path to an additional CA certificate file.

The certificate must be in the DER or PEM (X.509) format. Additionally, the certificate can be provided as an inline string in PEM format.</td></tr><tr><td>tls.client_metadata_key</td><td>Event field for client certificate metadata.</td></tr><tr><td>tls.crt_file</td><td>Absolute path to a certificate file used to identify this server.

The certificate must be in DER, PEM (X.509), or PKCS#12 format. Additionally, the certificate can be provided as
an inline string in PEM format.

If this is set, and is not a PKCS#12 archive, `key_file` must also be set.</td></tr><tr><td>tls.enabled</td><td>Whether or not to require TLS for incoming/outgoing connections.

When enabled and used for incoming connections, an identity certificate is also required. See `tls.crt_file` for
more information.</td></tr><tr><td>tls.key_file</td><td>Absolute path to a private key file used to identify this server.

The key must be in DER or PEM (PKCS#8) format. Additionally, the key can be provided as an inline string in PEM format.</td></tr><tr><td>tls.key_pass</td><td>Passphrase used to unlock the encrypted key file.

This has no effect unless `key_file` is set.</td></tr><tr><td>tls.verify_certificate</td><td>Enables certificate verification.

If enabled, certificates must be valid in terms of not being expired, as well as being issued by a trusted
issuer. This verification operates in a hierarchical manner, checking that not only the leaf certificate (the
certificate presented by the client/server) is valid, but also that the issuer of that certificate is valid, and
so on until reaching a root certificate.

Relevant for both incoming and outgoing connections.

Do NOT set this to `false` unless you understand the risks of not verifying the validity of certificates.</td></tr><tr><td>tls.verify_hostname</td><td>Enables hostname verification.

If enabled, the hostname used to connect to the remote host must be present in the TLS certificate presented by
the remote host, either as the Common Name or as an entry in the Subject Alternative Name extension.

Only relevant for outgoing connections.

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>connection_errors_total</td><td>The total number of connection errors for this Vector instance.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>connection_failed_total</td><td>The total number of times a connection has failed.</td></tr><tr><td>connection_established_total</td><td>The total number of times a connection has been established.</td></tr><tr><td>connection_send_errors_total</td><td>The total number of errors sending data via the connection.</td></tr><tr><td>connection_send_ack_errors_total</td><td>The total number of protocol acknowledgement errors for this Vector instance for source protocols that support acknowledgements.</td></tr><tr><td>connection_shutdown_total</td><td>The total number of times the connection has been shut down.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## State
This component is stateless, meaning its behavior is consistent across each input.

## Transport Layer Security (TLS)
Vector uses [OpenSSL](https://www.openssl.org/) for TLS protocols. You can
adjust TLS behavior via the `tls.*` options.

## Context
By default, the `socket` source augments events with helpful
context keys.


