---
title: Kafka
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled by this source.

This setting is **deprecated** in favor of enabling `acknowledgements` at the [global][global_acks] or sink level.

Enabling or disabling acknowledgements at the source level has **no effect** on acknowledgement behavior.

See [End-to-end Acknowledgements][e2e_acks] for more information on how event acknowledgement is handled.

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements
[e2e_acks]: https://vector.dev/docs/about/under-the-hood/architecture/end-to-end-acknowledgements/</td></tr><tr><td>acknowledgements.enabled</td><td>Whether or not end-to-end acknowledgements are enabled for this source.</td></tr><tr><td>auto_offset_reset</td><td>If offsets for consumer group do not exist, set them using this strategy.

See the [librdkafka documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md) for the `auto.offset.reset` option for further clarification.</td></tr><tr><td>bootstrap_servers</td><td>A comma-separated list of Kafka bootstrap servers.

These are the servers in a Kafka cluster that a client should use to "bootstrap" its connection to the cluster,
allowing discovering all other hosts in the cluster.

Must be in the form of `host:port`, and comma-separated.</td></tr><tr><td>commit_interval_ms</td><td>The frequency that the consumer offsets are committed (written) to offset storage.</td></tr><tr><td>decoding</td><td>Configures how events are decoded from raw bytes.</td></tr><tr><td>decoding.codec</td><td>The codec to use for decoding events.</td></tr><tr><td>fetch_wait_max_ms</td><td>Maximum time the broker may wait to fill the response.</td></tr><tr><td>framing</td><td>Framing configuration.

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
ensure that processing is not truly unbounded.</td></tr><tr><td>framing.octet_counting</td><td>Options for the octet counting decoder.</td></tr><tr><td>framing.octet_counting.max_length</td><td>The maximum length of the byte buffer.</td></tr><tr><td>group_id</td><td>The consumer group name to be used to consume events from Kafka.</td></tr><tr><td>headers_key</td><td>Overrides the name of the log field used to add the headers to each event.

The value will be the headers of the Kafka message itself.

By default, `"headers"` is used.</td></tr><tr><td>key_field</td><td>Overrides the name of the log field used to add the message key to each event.

The value will be the message key of the Kafka message itself.

By default, `"message_key"` is used.</td></tr><tr><td>librdkafka_options</td><td>Advanced options set directly on the underlying `librdkafka` client.

See the [librdkafka documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md) for details.</td></tr><tr><td>librdkafka_options.*</td><td>A librdkafka configuration option.</td></tr><tr><td>metrics</td><td>Metrics configuration.</td></tr><tr><td>metrics.topic_lag_metric</td><td>Expose topic lag metrics for all topics and partitions. Metric names are `kafka_consumer_lag`.</td></tr><tr><td>offset_key</td><td>Overrides the name of the log field used to add the offset to each event.

The value will be the offset of the Kafka message itself.

By default, `"offset"` is used.</td></tr><tr><td>partition_key</td><td>Overrides the name of the log field used to add the partition to each event.

The value will be the partition from which the Kafka message was consumed from.

By default, `"partition"` is used.</td></tr><tr><td>sasl</td><td>Configuration for SASL authentication when interacting with Kafka.</td></tr><tr><td>sasl.enabled</td><td>Enables SASL authentication.

Only `PLAIN` and `SCRAM`-based mechanisms are supported when configuring SASL authentication via `sasl.*`. For
other mechanisms, `librdkafka_options.*` must be used directly to configure other `librdkafka`-specific values
i.e. `sasl.kerberos.*` and so on.

See the [librdkafka documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md) for details.

SASL authentication is not supported on Windows.</td></tr><tr><td>sasl.mechanism</td><td>The SASL mechanism to use.</td></tr><tr><td>sasl.password</td><td>The SASL password.</td></tr><tr><td>sasl.username</td><td>The SASL username.</td></tr><tr><td>session_timeout_ms</td><td>The Kafka session timeout.</td></tr><tr><td>socket_timeout_ms</td><td>Timeout for network requests.</td></tr><tr><td>tls</td><td>Configures the TLS options for incoming/outgoing connections.</td></tr><tr><td>tls.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

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

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>topic_key</td><td>Overrides the name of the log field used to add the topic to each event.

The value will be the topic from which the Kafka message was consumed from.

By default, `"topic"` is used.</td></tr><tr><td>topics</td><td>The Kafka topics names to read events from.

Regular expression syntax is supported if the topic begins with `^`.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_failed_total</td><td>The total number of failures to read a Kafka message.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>consumer_offset_updates_failed_total</td><td>The total number of failures to update a Kafka consumer offset.</td></tr><tr><td>kafka_queue_messages</td><td>Current number of messages in producer queues.</td></tr><tr><td>kafka_queue_messages_bytes</td><td>Current total size of messages in producer queues.</td></tr><tr><td>kafka_requests_total</td><td>Total number of requests sent to Kafka brokers.</td></tr><tr><td>kafka_requests_bytes_total</td><td>Total number of bytes transmitted to Kafka brokers.</td></tr><tr><td>kafka_responses_total</td><td>Total number of responses received from Kafka brokers.</td></tr><tr><td>kafka_responses_bytes_total</td><td>Total number of bytes received from Kafka brokers.</td></tr><tr><td>kafka_produced_messages_total</td><td>Total number of messages transmitted (produced) to Kafka brokers.</td></tr><tr><td>kafka_produced_messages_bytes_total</td><td>Total number of message bytes (including framing, such as per-Message framing and MessageSet/batch framing) transmitted to Kafka brokers.</td></tr><tr><td>kafka_consumed_messages_total</td><td>Total number of messages consumed, not including ignored messages (due to offset, etc), from Kafka brokers.</td></tr><tr><td>kafka_consumed_messages_bytes_total</td><td>Total number of message bytes (including framing) received from Kafka brokers.</td></tr><tr><td>kafka_consumer_lag</td><td>The Kafka consumer lag.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## librdkafka
The `kafka` sink uses [`librdkafka`](https://github.com/edenhill/librdkafka) under the hood. This
is a battle-tested, high performance, and reliable library that facilitates
communication with Kafka. As Vector produces static MUSL builds,
this dependency is packaged with Vector, meaning you do not need to install it.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Transport Layer Security (TLS)
Vector uses [OpenSSL](https://www.openssl.org/) for TLS protocols. You can
adjust TLS behavior via the `tls.*` options.

## Azure Event Hubs
It is possible to use the `kafka` source and sink with [Azure Event Hubs](https://learn.microsoft.com/en-us/azure/event-hubs/)
for all tiers other than the [Basic tier](https://learn.microsoft.com/en-us/azure/event-hubs/compare-tiers). More details
can be found [here](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-for-kafka-ecosystem-overview). To configure the source and
sink to connect to Azure Event Hubs set the following options:
- `bootstrap_servers` - `<namespace name>.servicebus.windows.net:9093`
- `group_id` - The consumer group. Note that if the default group (`$Default`) is used it must
  be specified as `$$Default` to escape the `$` used for environment variables.
- `topics` - The event hub name.
- `sasl.enabled` - Set to `true`.
- `sasl.mechanism` - Set to `PLAIN`.
- `sasl.username` - Set to `$$ConnectionString` (note the double `$$`).
- `sasl.password` - Set to the connection string. See [here](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-get-connection-string).
- `tls.enabled` - Set to `true`.
- `tls.ca_file` - The certificate authority file.
- `tls.verify_certificate` - Set to `true`.

## Context
By default, the `kafka` source augments events with helpful
context keys.


