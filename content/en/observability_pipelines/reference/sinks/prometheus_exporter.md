---
title: Prometheus Exporter
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

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements</td></tr><tr><td>address</td><td>The address to expose for scraping.

The metrics are exposed at the typical Prometheus exporter path, `/metrics`.</td></tr><tr><td>auth</td><td>Configuration of the authentication strategy for HTTP requests.

HTTP authentication should almost always be used with HTTPS only, as the authentication credentials are passed as an
HTTP header without any additional encryption beyond what is provided by the transport itself.</td></tr><tr><td>auth.password</td><td>The basic authentication password.</td></tr><tr><td>auth.strategy</td><td>The authentication strategy to use.</td></tr><tr><td>auth.token</td><td>The bearer authentication token.</td></tr><tr><td>auth.user</td><td>The basic authentication username.</td></tr><tr><td>buckets</td><td>Default buckets to use for aggregating [distribution][dist_metric_docs] metrics into histograms.

[dist_metric_docs]: https://vector.dev/docs/about/under-the-hood/architecture/data-model/metric/#distribution</td></tr><tr><td>default_namespace</td><td>The default namespace for any metrics sent.

This namespace is only used if a metric has no existing namespace. When a namespace is
present, it is used as a prefix to the metric name, and separated with an underscore (`_`).

It should follow the Prometheus [naming conventions][prom_naming_docs].

[prom_naming_docs]: https://prometheus.io/docs/practices/naming/#metric-names</td></tr><tr><td>distributions_as_summaries</td><td>Whether or not to render [distributions][dist_metric_docs] as an [aggregated histogram][prom_agg_hist_docs] or  [aggregated summary][prom_agg_summ_docs].

While distributions as a lossless way to represent a set of samples for a
metric is supported, Prometheus clients (the application being scraped, which is this sink) must
aggregate locally into either an aggregated histogram or aggregated summary.

[dist_metric_docs]: https://vector.dev/docs/about/under-the-hood/architecture/data-model/metric/#distribution
[prom_agg_hist_docs]: https://prometheus.io/docs/concepts/metric_types/#histogram
[prom_agg_summ_docs]: https://prometheus.io/docs/concepts/metric_types/#summary</td></tr><tr><td>flush_period_secs</td><td>The interval, in seconds, on which metrics are flushed.

On the flush interval, if a metric has not been seen since the last flush interval, it is
considered expired and is removed.

Be sure to configure this value higher than your client’s scrape interval.</td></tr><tr><td>quantiles</td><td>Quantiles to use for aggregating [distribution][dist_metric_docs] metrics into a summary.

[dist_metric_docs]: https://vector.dev/docs/about/under-the-hood/architecture/data-model/metric/#distribution</td></tr><tr><td>suppress_timestamp</td><td>Suppresses timestamps on the Prometheus output.

This can sometimes be useful when the source of metrics leads to their timestamps being too
far in the past for Prometheus to allow them, such as when aggregating metrics over long
time periods, or when replaying old metrics from a disk buffer.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

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
<table></tbody><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>buffer_byte_size</td><td>The number of bytes current in the buffer.</td></tr><tr><td>buffer_events</td><td>The number of events currently in the buffer.</td></tr><tr><td>buffer_received_events_total</td><td>The number of events received by this buffer.</td></tr><tr><td>buffer_received_event_bytes_total</td><td>The number of bytes received by this buffer.</td></tr><tr><td>buffer_sent_events_total</td><td>The number of events sent by this buffer.</td></tr><tr><td>buffer_sent_event_bytes_total</td><td>The number of bytes sent by this buffer.</td></tr><tr><td>buffer_discarded_events_total</td><td>The number of events dropped by this non-blocking buffer.</td></tr></tbody></table>

# How It Works
## Histogram Buckets
Choosing the appropriate buckets for Prometheus histograms is a complicated point of
discussion. The [Histograms and Summaries Prometheus guide](https://prometheus.io/docs/practices/histograms/)
provides a good overview of histograms, buckets, summaries, and how you should think
about configuring them. The buckets you choose should align with your known range
and distribution of values as well as how you plan to report on them. The
aforementioned guide provides examples on how you should align them.

## Memory Usage
Like other Prometheus instances, the `prometheus_exporter` sink aggregates
metrics in memory which keeps the memory footprint to a minimum if Prometheus
fails to scrape the Vector instance over an extended period of time. The
downside is that data will be lost if Vector is restarted. This is by design of
Prometheus' pull model approach, but is worth noting if restart Vector
frequently.

## State
This component is stateful, meaning its behavior changes based on previous inputs (events).
State is not preserved across restarts, therefore state-dependent behavior will reset between
restarts and depend on the inputs (events) received since the most recent restart.

## Buffers
This component buffers events as shown in
the diagram above. This helps to smooth out data processing if the downstream
service applies backpressure. Buffers are controlled via the
[`buffer.*`](#buffer) options.

## Duplicate tag names
Multiple tags with the same name are invalid within Prometheus and Prometheus
will reject a metric with duplicate tag names. When sending a tag with multiple
values for each name, Vector will only send the last value specified.


