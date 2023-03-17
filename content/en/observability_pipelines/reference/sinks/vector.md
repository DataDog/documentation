---
title: Vector
---
Sends data to another downstream Vector instance via the Vector source.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled for this sink.

See [End-to-end Acknowledgements][e2e_acks] for more information on how event acknowledgement is handled.

[e2e_acks]: https://vector.dev/docs/about/under-the-hood/architecture/end-to-end-acknowledgements/</td></tr><tr><td>acknowledgements.enabled</td><td>Whether or not end-to-end acknowledgements are enabled.

When enabled for a sink, any source connected to that sink, where the source supports
end-to-end acknowledgements as well, will wait for events to be acknowledged by the sink
before acknowledging them at the source.

Enabling or disabling acknowledgements at the sink level takes precedence over any global
[`acknowledgements`][global_acks] configuration.

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements</td></tr><tr><td>address</td><td>The downstream Vector address to which to connect.

Both IP address and hostname are accepted formats.

The address _must_ include a port.</td></tr><tr><td>batch</td><td>Event batching behavior.</td></tr><tr><td>batch.max_bytes</td><td>The maximum size of a batch that will be processed by a sink.

This is based on the uncompressed size of the batched events, before they are
serialized / compressed.</td></tr><tr><td>batch.max_events</td><td>The maximum size of a batch before it is flushed.</td></tr><tr><td>batch.timeout_secs</td><td>The maximum age of a batch before it is flushed.</td></tr><tr><td>compression</td><td>Whether or not to compress requests.

If set to `true`, requests will be compressed with [`gzip`][gzip_docs].

[gzip_docs]: https://www.gzip.org/</td></tr><tr><td>request</td><td>Middleware settings for outbound requests.

Various settings can be configured, such as concurrency and rate limits, timeouts, etc.</td></tr><tr><td>request.adaptive_concurrency</td><td>Configuration of adaptive concurrency parameters.

These parameters typically do not require changes from the default, and incorrect values can lead to meta-stable or
unstable performance and sink behavior. Proceed with caution.</td></tr><tr><td>request.adaptive_concurrency.decrease_ratio</td><td>The fraction of the current value to set the new concurrency limit when decreasing the limit.

Valid values are greater than `0` and less than `1`. Smaller values cause the algorithm to scale back rapidly
when latency increases.

Note that the new limit is rounded down after applying this ratio.</td></tr><tr><td>request.adaptive_concurrency.ewma_alpha</td><td>The weighting of new measurements compared to older measurements.

Valid values are greater than `0` and less than `1`.

ARC uses an exponentially weighted moving average (EWMA) of past RTT measurements as a reference to compare with
the current RTT. Smaller values cause this reference to adjust more slowly, which may be useful if a service has
unusually high response variability.</td></tr><tr><td>request.adaptive_concurrency.rtt_deviation_scale</td><td>Scale of RTT deviations which are not considered anomalous.

Valid values are greater than or equal to `0`, and we expect reasonable values to range from `1.0` to `3.0`.

When calculating the past RTT average, we also compute a secondary “deviation” value that indicates how variable
those values are. We use that deviation when comparing the past RTT average to the current measurements, so we
can ignore increases in RTT that are within an expected range. This factor is used to scale up the deviation to
an appropriate range.  Larger values cause the algorithm to ignore larger increases in the RTT.</td></tr><tr><td>request.concurrency</td><td>Configuration for outbound request concurrency.</td></tr><tr><td>request.rate_limit_duration_secs</td><td>The time window used for the `rate_limit_num` option.</td></tr><tr><td>request.rate_limit_num</td><td>The maximum number of requests allowed within the `rate_limit_duration_secs` time window.</td></tr><tr><td>request.retry_attempts</td><td>The maximum number of retries to make for failed requests.

The default, for all intents and purposes, represents an infinite number of retries.</td></tr><tr><td>request.retry_initial_backoff_secs</td><td>The amount of time to wait before attempting the first retry for a failed request.

After the first retry has failed, the fibonacci sequence will be used to select future backoffs.</td></tr><tr><td>request.retry_max_duration_secs</td><td>The maximum amount of time to wait between retries.</td></tr><tr><td>request.timeout_secs</td><td>The time a request can take before being aborted.

It is highly recommended that you do not lower this value below the service’s internal timeout, as this could
create orphaned requests, pile on retries, and result in duplicate data downstream.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>buffer</td><td>Configures the buffering behavior for this sink.

More information about the individual buffer types, and buffer behavior, can be found in the
[Buffering Model][buffering_model] section.

[buffering_model]: /docs/about/under-the-hood/architecture/buffering-model/</td></tr><tr><td>buffer.max_events</td><td>The maximum number of events allowed in the buffer.</td></tr><tr><td>buffer.max_size</td><td>The maximum size of the buffer on disk.

Must be at least ~256 megabytes (268435488 bytes).</td></tr><tr><td>buffer.type</td><td>The type of buffer to use.</td></tr><tr><td>buffer.when_full</td><td>Event handling behavior when a buffer is full.</td></tr><tr><td>tls</td><td>Configures the TLS options for incoming/outgoing connections.</td></tr><tr><td>tls.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

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

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>healthcheck</td><td>Healthcheck configuration.</td></tr><tr><td>healthcheck.enabled</td><td>Whether or not to check the health of the sink when Vector starts up.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_sent_bytes_total</td><td>The number of raw bytes sent by this component to destination sinks.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>buffer_byte_size</td><td>The number of bytes current in the buffer.</td></tr><tr><td>buffer_events</td><td>The number of events currently in the buffer.</td></tr><tr><td>buffer_received_events_total</td><td>The number of events received by this buffer.</td></tr><tr><td>buffer_received_event_bytes_total</td><td>The number of bytes received by this buffer.</td></tr><tr><td>buffer_sent_events_total</td><td>The number of events sent by this buffer.</td></tr><tr><td>buffer_sent_event_bytes_total</td><td>The number of bytes sent by this buffer.</td></tr><tr><td>protobuf_decode_errors_total</td><td>The total number of [Protocol Buffers](https://developers.google.com/protocol-buffers) errors thrown during communication between Vector instances.</td></tr><tr><td>buffer_discarded_events_total</td><td>The number of events dropped by this non-blocking buffer.</td></tr></tbody></table>

# How It Works
## State
This component is stateless, meaning its behavior is consistent across each input.

## Health checks
Health checks ensure that the downstream service is
accessible and ready to accept data. This check is performed
upon sink initialization. If the health check fails an error
will be logged and Vector will proceed to start.

## Transport Layer Security (TLS)
Vector uses [OpenSSL](https://www.openssl.org/) for TLS protocols. You can
adjust TLS behavior via the `tls.*` options.

## Rate limits & adaptive concurrency
null

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

## Context
By default, the `vector` source augments events with helpful
context keys.

## Retry policy
Vector will retry failed requests (status == 429, >= 500, and != 501).
Other responses will not be retried. You can control the number of
retry attempts and backoff rate with the `request.retry_attempts` and
`request.retry_backoff_secs` options.


