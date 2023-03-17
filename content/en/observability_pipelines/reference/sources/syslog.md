---
title: Syslog
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>address</td><td>The socket address to listen for connections on, or `systemd{#N}` to use the Nth socket passed by
systemd socket activation.

If a socket address is used, it _must_ include a port.</td></tr><tr><td>connection_limit</td><td>The maximum number of TCP connections that will be allowed at any given time.</td></tr><tr><td>host_key</td><td>Overrides the name of the log field used to add the peer host to each event.

If using TCP or UDP, the value will be the peer host's address, including the port i.e. `1.2.3.4:9000`. If using
UDS, the value will be the socket path itself.

By default, the [global `log_schema.host_key` option][global_host_key] is used.

[global_host_key]: https://vector.dev/docs/reference/configuration/global-options/#log_schema.host_key</td></tr><tr><td>keepalive</td><td>TCP keepalive settings for socket-based components.</td></tr><tr><td>keepalive.time_secs</td><td>The time to wait before starting to send TCP keepalive probes on an idle connection.</td></tr><tr><td>max_length</td><td>The maximum buffer size of incoming messages, in bytes.

Messages larger than this are truncated.</td></tr><tr><td>mode</td><td>The type of socket to use.</td></tr><tr><td>path</td><td>The Unix socket path.

This should be an absolute path.</td></tr><tr><td>receive_buffer_bytes</td><td>The size of the receive buffer used for each connection.

This should not typically needed to be changed.</td></tr><tr><td>socket_file_mode</td><td>Unix file mode bits to be applied to the unix socket file as its designated file permissions.

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
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>connection_read_errors_total</td><td>The total number of errors reading datagram.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>utf8_convert_errors_total</td><td>The total number of errors converting bytes to a UTF-8 string in UDP mode.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Line Delimiters
Each line is read until a new line delimiter, the `0xA` byte, is found.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Transport Layer Security (TLS)
Vector uses [OpenSSL](https://www.openssl.org/) for TLS protocols. You can
adjust TLS behavior via the `tls.*` options.

## Parsing
Vector makes a _best effort_ to parse the various Syslog formats out in the wild.
This includes [RFC 6587](https://tools.ietf.org/html/rfc6587), [RFC 5424](https://tools.ietf.org/html/rfc5424),
[RFC 3164](https://tools.ietf.org/html/rfc3164), and other common variations (such as the Nginx
Syslog style). It's unfortunate that the Syslog specification isn't more
accurately followed, but we hope that Vector insulates you from these deviations.

If parsing fails, Vector will raise an error. If you find this happening often,
we recommend using the [`socket` source](/docs/reference/configuration/sources/socket) combined with
[regex parsing](/docs/reference/vrl/functions/#parse_regex) to implement your own custom
ingestion and parsing scheme, or [syslog parsing](/docs/reference/vrl/functions/#parse_syslog) and
manually handle any errors. Alternatively, you can [open an
issue](https://github.com/vectordotdev/vector/issues/new?labels=type%3A+new+feature) to request support for your specific format.

## Context
By default, the `syslog` source augments events with helpful
context keys.


