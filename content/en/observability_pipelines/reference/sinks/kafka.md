---
title: Kafka
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

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements</td></tr><tr><td>batch</td><td>Event batching behavior.</td></tr><tr><td>batch.max_bytes</td><td>The maximum size of a batch that will be processed by a sink.

This is based on the uncompressed size of the batched events, before they are
serialized / compressed.</td></tr><tr><td>batch.max_events</td><td>The maximum size of a batch before it is flushed.</td></tr><tr><td>batch.timeout_secs</td><td>The maximum age of a batch before it is flushed.</td></tr><tr><td>bootstrap_servers</td><td>A comma-separated list of Kafka bootstrap servers.

These are the servers in a Kafka cluster that a client should use to "bootstrap" its
connection to the cluster, allowing discovering all other hosts in the cluster.

Must be in the form of `host:port`, and comma-separated.</td></tr><tr><td>compression</td><td>Supported compression types for Kafka.</td></tr><tr><td>encoding</td><td>Configures how events are encoded into raw bytes.</td></tr><tr><td>encoding.avro</td><td>Apache Avro-specific encoder options.</td></tr><tr><td>encoding.avro.schema</td><td>The Avro schema.</td></tr><tr><td>encoding.codec</td><td>The codec to use for encoding events.</td></tr><tr><td>encoding.csv</td><td>The CSV Serializer Options.</td></tr><tr><td>encoding.csv.fields</td><td>Configures the fields that will be encoded, as well as the order in which they
appear in the output.

If a field is not present in the event, the output will be an empty string.

Values of type `Array`, `Object`, and `Regex` are not supported and the
output will be an empty string.</td></tr><tr><td>encoding.except_fields</td><td>List of fields that will be excluded from the encoded event.</td></tr><tr><td>encoding.metric_tag_values</td><td>Controls how metric tag values are encoded.

When set to `single`, only the last non-bare value of tags will be displayed with the
metric.  When set to `full`, all metric tags will be exposed as separate assignments.</td></tr><tr><td>encoding.only_fields</td><td>List of fields that will be included in the encoded event.</td></tr><tr><td>encoding.timestamp_format</td><td>Format used for timestamp fields.</td></tr><tr><td>headers_key</td><td>The log field name to use for the Kafka headers.

If omitted, no headers will be written.</td></tr><tr><td>key_field</td><td>The log field name or tags key to use for the topic key.

If the field does not exist in the log or in tags, a blank value will be used. If
unspecified, the key is not sent.

Kafka uses a hash of the key to choose the partition or uses round-robin if the record has
no key.</td></tr><tr><td>librdkafka_options</td><td>A map of advanced options to pass directly to the underlying `librdkafka` client.

For more information on configuration options, see [Configuration properties][config_props_docs].

[config_props_docs]: https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md</td></tr><tr><td>librdkafka_options.*</td><td>A librdkafka configuration option.</td></tr><tr><td>message_timeout_ms</td><td>Local message timeout, in milliseconds.</td></tr><tr><td>sasl</td><td>Configuration for SASL authentication when interacting with Kafka.</td></tr><tr><td>sasl.enabled</td><td>Enables SASL authentication.

Only `PLAIN` and `SCRAM`-based mechanisms are supported when configuring SASL authentication via `sasl.*`. For
other mechanisms, `librdkafka_options.*` must be used directly to configure other `librdkafka`-specific values
i.e. `sasl.kerberos.*` and so on.

See the [librdkafka documentation](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md) for details.

SASL authentication is not supported on Windows.</td></tr><tr><td>sasl.mechanism</td><td>The SASL mechanism to use.</td></tr><tr><td>sasl.password</td><td>The SASL password.</td></tr><tr><td>sasl.username</td><td>The SASL username.</td></tr><tr><td>socket_timeout_ms</td><td>Default timeout, in milliseconds, for network requests.</td></tr><tr><td>tls</td><td>Configures the TLS options for incoming/outgoing connections.</td></tr><tr><td>tls.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

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

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>buffer</td><td>Configures the buffering behavior for this sink.

More information about the individual buffer types, and buffer behavior, can be found in the
[Buffering Model][buffering_model] section.

[buffering_model]: /docs/about/under-the-hood/architecture/buffering-model/</td></tr><tr><td>buffer.max_events</td><td>The maximum number of events allowed in the buffer.</td></tr><tr><td>buffer.max_size</td><td>The maximum size of the buffer on disk.

Must be at least ~256 megabytes (268435488 bytes).</td></tr><tr><td>buffer.type</td><td>The type of buffer to use.</td></tr><tr><td>buffer.when_full</td><td>Event handling behavior when a buffer is full.</td></tr><tr><td>topic</td><td>The Kafka topic name to write events to.</td></tr><tr><td>healthcheck</td><td>Healthcheck configuration.</td></tr><tr><td>healthcheck.enabled</td><td>Whether or not to check the health of the sink when Vector starts up.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_sent_bytes_total</td><td>The number of raw bytes sent by this component to destination sinks.</td></tr><tr><td>events_discarded_total</td><td>The total number of events discarded by this component.</td></tr><tr><td>processing_errors_total</td><td>The total number of processing errors encountered by this component. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>kafka_queue_messages</td><td>Current number of messages in producer queues.</td></tr><tr><td>kafka_queue_messages_bytes</td><td>Current total size of messages in producer queues.</td></tr><tr><td>kafka_requests_total</td><td>Total number of requests sent to Kafka brokers.</td></tr><tr><td>kafka_requests_bytes_total</td><td>Total number of bytes transmitted to Kafka brokers.</td></tr><tr><td>kafka_responses_total</td><td>Total number of responses received from Kafka brokers.</td></tr><tr><td>kafka_responses_bytes_total</td><td>Total number of bytes received from Kafka brokers.</td></tr><tr><td>kafka_produced_messages_total</td><td>Total number of messages transmitted (produced) to Kafka brokers.</td></tr><tr><td>kafka_produced_messages_bytes_total</td><td>Total number of message bytes (including framing, such as per-Message framing and MessageSet/batch framing) transmitted to Kafka brokers.</td></tr><tr><td>kafka_consumed_messages_total</td><td>Total number of messages consumed, not including ignored messages (due to offset, etc), from Kafka brokers.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>buffer_byte_size</td><td>The number of bytes current in the buffer.</td></tr><tr><td>buffer_events</td><td>The number of events currently in the buffer.</td></tr><tr><td>buffer_received_events_total</td><td>The number of events received by this buffer.</td></tr><tr><td>buffer_received_event_bytes_total</td><td>The number of bytes received by this buffer.</td></tr><tr><td>buffer_sent_events_total</td><td>The number of events sent by this buffer.</td></tr><tr><td>buffer_sent_event_bytes_total</td><td>The number of bytes sent by this buffer.</td></tr><tr><td>kafka_consumed_messages_bytes_total</td><td>Total number of message bytes (including framing) received from Kafka brokers.</td></tr><tr><td>buffer_discarded_events_total</td><td>The number of events dropped by this non-blocking buffer.</td></tr></tbody></table>

# How It Works
## librdkafka
The `kafka` sink uses [`librdkafka`](https://github.com/edenhill/librdkafka) under the hood. This
is a battle-tested, high performance, and reliable library that facilitates
communication with Kafka. As Vector produces static MUSL builds,
this dependency is packaged with Vector, meaning you do not need to install it.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Health checks
Health checks ensure that the downstream service is
accessible and ready to accept data. This check is performed
upon sink initialization. If the health check fails an error
will be logged and Vector will proceed to start.

## Transport Layer Security (TLS)
Vector uses [OpenSSL](https://www.openssl.org/) for TLS protocols due to OpenSSL's maturity. You can
enable and adjust TLS behavior using the [`tls.*`](#tls) options.

## Buffers and batches
This component buffers & batches data as shown in the diagram above. You'll notice that
Vector treats these concepts differently, instead of treating them as global concepts,
Vector treats them as sink specific concepts. This isolates sinks, ensuring services
disruptions are contained and delivery guarantees are honored.

*Batches* are flushed when 1 of 2 conditions are met:

1. The batch age meets or exceeds the configured `timeout_secs`.
2. The batch size meets or exceeds the configured `max_bytes` or `max_events`.

*Buffers* are controlled via the [`buffer.*`](#buffer) options.

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


