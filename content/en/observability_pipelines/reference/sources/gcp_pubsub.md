---
title: GCP Pub/Sub
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>ack_deadline_seconds</td><td>The acknowledgement deadline, in seconds, to use for this stream.

Messages that are not acknowledged when this deadline expires may be retransmitted.</td></tr><tr><td>ack_deadline_secs</td><td>The acknowledgement deadline, in seconds, to use for this stream.

Messages that are not acknowledged when this deadline expires may be retransmitted.</td></tr><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled by this source.

This setting is **deprecated** in favor of enabling `acknowledgements` at the [global][global_acks] or sink level.

Enabling or disabling acknowledgements at the source level has **no effect** on acknowledgement behavior.

See [End-to-end Acknowledgements][e2e_acks] for more information on how event acknowledgement is handled.

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements
[e2e_acks]: https://vector.dev/docs/about/under-the-hood/architecture/end-to-end-acknowledgements/</td></tr><tr><td>acknowledgements.enabled</td><td>Whether or not end-to-end acknowledgements are enabled for this source.</td></tr><tr><td>api_key</td><td>An [API key][gcp_api_key].

Either an API key, or a path to a service account credentials JSON file can be specified.

If both are unset, the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is checked for a filename. If no
filename is named, an attempt is made to fetch an instance service account for the compute instance the program is
running on. If this is not on a GCE instance, then you must define it with an API key or service account
credentials JSON file.

[gcp_api_key]: https://cloud.google.com/docs/authentication/api-keys</td></tr><tr><td>credentials_path</td><td>Path to a [service account] credentials JSON file.

Either an API key, or a path to a service account credentials JSON file can be specified.

If both are unset, the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is checked for a filename. If no
filename is named, an attempt is made to fetch an instance service account for the compute instance the program is
running on. If this is not on a GCE instance, then you must define it with an API key or service account
credentials JSON file.

[gcp_service_account_credentials]: https://cloud.google.com/docs/authentication/production#manually</td></tr><tr><td>decoding</td><td>Configures how events are decoded from raw bytes.</td></tr><tr><td>decoding.codec</td><td>The codec to use for decoding events.</td></tr><tr><td>endpoint</td><td>The endpoint from which to pull data.</td></tr><tr><td>framing</td><td>Framing configuration.

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
ensure that processing is not truly unbounded.</td></tr><tr><td>framing.octet_counting</td><td>Options for the octet counting decoder.</td></tr><tr><td>framing.octet_counting.max_length</td><td>The maximum length of the byte buffer.</td></tr><tr><td>full_response_size</td><td>The number of messages in a response to mark a stream as
"busy". This is used to determine if more streams should be
started.

The GCP Pub/Sub servers send responses with 100 or more messages when
the subscription is busy.</td></tr><tr><td>keepalive_secs</td><td>The amount of time, in seconds, with no received activity
before sending a keepalive request. If this is set larger than
`60`, you may see periodic errors sent from the server.</td></tr><tr><td>max_concurrency</td><td>The maximum number of concurrent stream connections to open at once.</td></tr><tr><td>poll_time_seconds</td><td>How often to poll the currently active streams to see if they
are all busy and so open a new stream.</td></tr><tr><td>project</td><td>The project name from which to pull logs.</td></tr><tr><td>retry_delay_seconds</td><td>The amount of time, in seconds, to wait between retry attempts after an error.</td></tr><tr><td>retry_delay_secs</td><td>The amount of time, in seconds, to wait between retry attempts after an error.</td></tr><tr><td>subscription</td><td>The subscription within the project which is configured to receive logs.</td></tr><tr><td>proxy</td><td>Proxy configuration.

Configure to proxy traffic through an HTTP(S) proxy when making external requests.

Similar to common proxy configuration convention, users can set different proxies
to use based on the type of traffic being proxied, as well as set specific hosts that
should not be proxied.</td></tr><tr><td>proxy.enabled</td><td>Enables proxying support.</td></tr><tr><td>proxy.http</td><td>Proxy endpoint to use when proxying HTTP traffic.

Must be a valid URI string.</td></tr><tr><td>proxy.https</td><td>Proxy endpoint to use when proxying HTTPS traffic.

Must be a valid URI string.</td></tr><tr><td>proxy.no_proxy</td><td>A list of hosts to avoid proxying.

Multiple patterns are allowed:

| Pattern             | Example match                                                               |
| ------------------- | --------------------------------------------------------------------------- |
| Domain names        | `example.com` matches requests to `example.com`                     |
| Wildcard domains    | `.example.com` matches requests to `example.com` and its subdomains |
| IP addresses        | `127.0.0.1` matches requests to `127.0.0.1`                         |
| [CIDR][cidr] blocks | `192.168.0.0/16` matches requests to any IP addresses in this range     |
| Splat               | `*` matches all hosts                                                   |

[cidr]: https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing</td></tr><tr><td>tls</td><td>TLS configuration.</td></tr><tr><td>tls.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

Declare the supported ALPN protocols, which are used during negotiation with peer. Prioritized in the order
they are defined.</td></tr><tr><td>tls.ca_file</td><td>Absolute path to an additional CA certificate file.

The certificate must be in the DER or PEM (X.509) format. Additionally, the certificate can be provided as an inline string in PEM format.</td></tr><tr><td>tls.crt_file</td><td>Absolute path to a certificate file used to identify this server.

The certificate must be in DER, PEM (X.509), or PKCS#12 format. Additionally, the certificate can be provided as
an inline string in PEM format.

If this is set, and is not a PKCS#12 archive, `key_file` must also be set.</td></tr><tr><td>tls.key_file</td><td>Absolute path to a private key file used to identify this server.

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
<table></tbody><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## GCP Pub/Sub
The `gcp_pubsub` source streams messages from [GCP Pub/Sub](https://cloud.google.com/pubsub).
This is a highly scalable / durable queueing system with at-least-once queuing semantics.
Messages are received in a stream and are either acknowledged immediately after receiving
or after it has been fully processed by the sink(s), depending on if any of the sink(s)
have the `acknowledgements` setting enabled.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Transport Layer Security (TLS)
Vector uses [OpenSSL](https://www.openssl.org/) for TLS protocols. You can
adjust TLS behavior via the `tls.*` options.

## Automatic Concurrency Management
	The `gcp_pubsub` source automatically manages the number of concurrent active streams by
	monitoring the traffic flowing over the streams.
	When a stream receives full responses (as determined by the `full_response_size` setting),
	it marks itself as being "busy".
	Periodically, the source will poll all the active connections and will start a new stream
	if all the active streams are marked as busy and fewer than `max_concurrency` streams are
	active.
	Conversely, when a stream passes an idle interval (configured by the
	`idle_timeout_seconds` setting) with no traffic and no outstanding acknowledgements,
	it will drop the connection unless there are no other streams active.
	This combination of actions allows this source to respond dynamically to high load levels
	without opening up extra connections at startup.

## Context
By default, the `gcp_pubsub` source augments events with helpful
context keys.


