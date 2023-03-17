---
title: Splunk HTTP Event Collector (HEC)
---
This source exposes three HTTP endpoints at a configurable address that jointly implement the [Splunk HEC API](https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/UsetheHTTPEventCollector): `/services/collector/event`, `/services/collector/raw`, and `/services/collector/health`.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>acknowledgements</td><td>Acknowledgement configuration for the `splunk_hec` source.</td></tr><tr><td>acknowledgements.ack_idle_cleanup</td><td>Whether or not to remove channels after idling for `max_idle_time` seconds.

A channel is idling if it is not used for sending data or querying ack statuses.</td></tr><tr><td>acknowledgements.enabled</td><td>Enables end-to-end acknowledgements.</td></tr><tr><td>acknowledgements.max_idle_time</td><td>The amount of time, in seconds, a channel is allowed to idle before removal.

Channels can potentially idle for longer than this setting but clients should not rely on such behavior.

Minimum of `1`.</td></tr><tr><td>acknowledgements.max_number_of_ack_channels</td><td>The maximum number of Splunk HEC channels clients can use with this source.

Minimum of `1`.</td></tr><tr><td>acknowledgements.max_pending_acks</td><td>The maximum number of ack statuses pending query across all channels.

Equivalent to the `max_number_of_acked_requests_pending_query` Splunk HEC setting.

Minimum of `1`.</td></tr><tr><td>acknowledgements.max_pending_acks_per_channel</td><td>The maximum number of ack statuses pending query for a single channel.

Equivalent to the `max_number_of_acked_requests_pending_query_per_ack_channel` Splunk HEC setting.

Minimum of `1`.</td></tr><tr><td>address</td><td>The socket address to listen for connections on.

The address _must_ include a port.</td></tr><tr><td>store_hec_token</td><td>Whether or not to forward the Splunk HEC authentication token with events.

If set to `true`, when incoming requests contain a Splunk HEC token, the token used will kept in the
event metadata and be preferentially used if the event is sent to a Splunk HEC sink.</td></tr><tr><td>tls</td><td>Configures the TLS options for incoming/outgoing connections.</td></tr><tr><td>tls.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

Declare the supported ALPN protocols, which are used during negotiation with peer. Prioritized in the order
they are defined.</td></tr><tr><td>tls.ca_file</td><td>Absolute path to an additional CA certificate file.

The certificate must be in the DER or PEM (X.509) format. Additionally, the certificate can be provided as an inline string in PEM format.</td></tr><tr><td>tls.crt_file</td><td>Absolute path to a certificate file used to identify this server.

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

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>token</td><td>Optional authorization token.

If supplied, incoming requests must supply this token in the `Authorization` header, just as a client would if
it was communicating with the Splunk HEC endpoint directly.

If _not_ supplied, the `Authorization` header will be ignored and requests will not be authenticated.</td></tr><tr><td>valid_tokens</td><td>Optional list of valid authorization tokens.

If supplied, incoming requests must supply one of these tokens in the `Authorization` header, just as a client
would if it was communicating with the Splunk HEC endpoint directly.

If _not_ supplied, the `Authorization` header will be ignored and requests will not be authenticated.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>http_request_errors_total</td><td>The total number of HTTP request errors for this component.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>requests_received_total</td><td>The total number of requests received by this component.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Indexer Acknowledgements
With acknowledgements enabled, the source uses the [Splunk HEC indexer acknowledgements protocol](https://docs.splunk.com/Documentation/Splunk/8.2.3/Data/AboutHECIDXAck) to allow clients to verify data has been delivered to destination sinks.
To summarize the protocol, each request to the source is associated with an integer identifier (an ack id) that the client is given and can use to query for the status of the request.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Transport Layer Security (TLS)
Vector uses [OpenSSL](https://www.openssl.org/) for TLS protocols. You can
adjust TLS behavior via the `tls.*` options.

## Context
By default, the `splunk_hec` source augments events with helpful
context keys.


