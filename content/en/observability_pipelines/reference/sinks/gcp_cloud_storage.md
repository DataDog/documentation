---
title: GCP Cloud Storage (GCS)
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

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements</td></tr><tr><td>acl</td><td>The Predefined ACL to apply to created objects.

For more information, see [Predefined ACLs][predefined_acls].

[predefined_acls]: https://cloud.google.com/storage/docs/access-control/lists#predefined-acl</td></tr><tr><td>api_key</td><td>An [API key][gcp_api_key].

Either an API key, or a path to a service account credentials JSON file can be specified.

If both are unset, the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is checked for a filename. If no
filename is named, an attempt is made to fetch an instance service account for the compute instance the program is
running on. If this is not on a GCE instance, then you must define it with an API key or service account
credentials JSON file.

[gcp_api_key]: https://cloud.google.com/docs/authentication/api-keys</td></tr><tr><td>batch</td><td>Event batching behavior.</td></tr><tr><td>batch.max_bytes</td><td>The maximum size of a batch that will be processed by a sink.

This is based on the uncompressed size of the batched events, before they are
serialized / compressed.</td></tr><tr><td>batch.max_events</td><td>The maximum size of a batch before it is flushed.</td></tr><tr><td>batch.timeout_secs</td><td>The maximum age of a batch before it is flushed.</td></tr><tr><td>bucket</td><td>The GCS bucket name.</td></tr><tr><td>compression</td><td>Compression configuration.

All compression algorithms use the default compression level unless otherwise specified.</td></tr><tr><td>credentials_path</td><td>Path to a [service account] credentials JSON file.

Either an API key, or a path to a service account credentials JSON file can be specified.

If both are unset, the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is checked for a filename. If no
filename is named, an attempt is made to fetch an instance service account for the compute instance the program is
running on. If this is not on a GCE instance, then you must define it with an API key or service account
credentials JSON file.

[gcp_service_account_credentials]: https://cloud.google.com/docs/authentication/production#manually</td></tr><tr><td>encoding</td><td>Configures how events are encoded into raw bytes.</td></tr><tr><td>encoding.avro</td><td>Apache Avro-specific encoder options.</td></tr><tr><td>encoding.avro.schema</td><td>The Avro schema.</td></tr><tr><td>encoding.codec</td><td>The codec to use for encoding events.</td></tr><tr><td>encoding.csv</td><td>The CSV Serializer Options.</td></tr><tr><td>encoding.csv.fields</td><td>Configures the fields that will be encoded, as well as the order in which they
appear in the output.

If a field is not present in the event, the output will be an empty string.

Values of type `Array`, `Object`, and `Regex` are not supported and the
output will be an empty string.</td></tr><tr><td>encoding.except_fields</td><td>List of fields that will be excluded from the encoded event.</td></tr><tr><td>encoding.metric_tag_values</td><td>Controls how metric tag values are encoded.

When set to `single`, only the last non-bare value of tags will be displayed with the
metric.  When set to `full`, all metric tags will be exposed as separate assignments.</td></tr><tr><td>encoding.only_fields</td><td>List of fields that will be included in the encoded event.</td></tr><tr><td>encoding.timestamp_format</td><td>Format used for timestamp fields.</td></tr><tr><td>filename_append_uuid</td><td>Whether or not to append a UUID v4 token to the end of the object key.

The UUID is appended to the timestamp portion of the object key, such that if the object key
being generated was `date=2022-07-18/1658176486`, setting this field to `true` would result
in an object key that looked like `date=2022-07-18/1658176486-30f6652c-71da-4f9f-800d-a1189c47c547`.

This ensures there are no name collisions, and can be useful in high-volume workloads where
object keys must be unique.</td></tr><tr><td>filename_extension</td><td>The filename extension to use in the object key.

If not specified, the extension will be determined by the compression scheme used.</td></tr><tr><td>filename_time_format</td><td>The timestamp format for the time component of the object key.

By default, object keys are appended with a timestamp that reflects when the objects are
sent to S3, such that the resulting object key is functionally equivalent to joining the key
prefix with the formatted timestamp, such as `date=2022-07-18/1658176486`.

This would represent a `key_prefix` set to `date=%F/` and the timestamp of Mon Jul 18 2022
20:34:44 GMT+0000, with the `filename_time_format` being set to `%s`, which renders
timestamps in seconds since the Unix epoch.

Supports the common [`strftime`][chrono_strftime_specifiers] specifiers found in most
languages.

When set to an empty string, no timestamp will be appended to the key prefix.

[chrono_strftime_specifiers]: https://docs.rs/chrono/latest/chrono/format/strftime/index.html#specifiers</td></tr><tr><td>framing</td><td>Framing configuration.</td></tr><tr><td>framing.character_delimited</td><td>Options for the character delimited encoder.</td></tr><tr><td>framing.character_delimited.delimiter</td><td>The ASCII (7-bit) character that delimits byte sequences.</td></tr><tr><td>framing.method</td><td>The framing method.</td></tr><tr><td>key_prefix</td><td>A prefix to apply to all object keys.

Prefixes are useful for partitioning objects, such as by creating an object key that
stores objects under a particular "directory". If using a prefix for this purpose, it must end
in `/` in order to act as a directory path: Vector will **not** add a trailing `/` automatically.</td></tr><tr><td>metadata</td><td>The set of metadata `key:value` pairs for the created objects.

For more information, see the [custom metadata][custom_metadata] documentation.

[custom_metadata]: https://cloud.google.com/storage/docs/metadata#custom-metadata</td></tr><tr><td>metadata.*</td><td>A key/value pair.</td></tr><tr><td>request</td><td>Middleware settings for outbound requests.

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
create orphaned requests, pile on retries, and result in duplicate data downstream.</td></tr><tr><td>storage_class</td><td>The storage class for created objects.

For more information, see the [storage classes][storage_classes] documentation.

[storage_classes]: https://cloud.google.com/storage/docs/storage-classes</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>buffer</td><td>Configures the buffering behavior for this sink.

More information about the individual buffer types, and buffer behavior, can be found in the
[Buffering Model][buffering_model] section.

[buffering_model]: /docs/about/under-the-hood/architecture/buffering-model/</td></tr><tr><td>buffer.max_events</td><td>The maximum number of events allowed in the buffer.</td></tr><tr><td>buffer.max_size</td><td>The maximum size of the buffer on disk.

Must be at least ~256 megabytes (268435488 bytes).</td></tr><tr><td>buffer.type</td><td>The type of buffer to use.</td></tr><tr><td>buffer.when_full</td><td>Event handling behavior when a buffer is full.</td></tr><tr><td>proxy</td><td>Proxy configuration.

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

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>healthcheck</td><td>Healthcheck configuration.</td></tr><tr><td>healthcheck.enabled</td><td>Whether or not to check the health of the sink when Vector starts up.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>events_discarded_total</td><td>The total number of events discarded by this component.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>buffer_byte_size</td><td>The number of bytes current in the buffer.</td></tr><tr><td>buffer_events</td><td>The number of events currently in the buffer.</td></tr><tr><td>buffer_received_events_total</td><td>The number of events received by this buffer.</td></tr><tr><td>buffer_received_event_bytes_total</td><td>The number of bytes received by this buffer.</td></tr><tr><td>buffer_sent_events_total</td><td>The number of events sent by this buffer.</td></tr><tr><td>buffer_sent_event_bytes_total</td><td>The number of bytes sent by this buffer.</td></tr><tr><td>processing_errors_total</td><td>The total number of processing errors encountered by this component. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>buffer_discarded_events_total</td><td>The number of events dropped by this non-blocking buffer.</td></tr></tbody></table>

# How It Works
## Object access control list (ACL)
GCP Cloud Storage supports access control lists (ACL) for buckets and
objects. In the context of Vector, only object ACLs are relevant (Vector
does not create or modify buckets). You can set the object level ACL by
using the `acl` option, which allows you to set one of the [predefined
ACLs](https://cloud.google.com/storage/docs/access-control/lists#predefined-acl) on each created object.

## Object naming
By default, Vector names your GCS objects in accordance with one of two formats.

If compression *is* enabled, this format is used:

```text
key_prefix><timestamp>-<uuidv4>.log.gz
```

Here's an example name in the compression-enabled format:

```text
date=2019-06-18/1560886634-fddd7a0e-fad9-4f7e-9bce-00ae5debc563.log.gz
```

If compression is *not* enabled, this format is used:

```text
<key_prefix><timestamp>-<uuidv4>.log
```

Here's an example name in the compression-disabled format:

```text
date=2019-06-18/1560886634-fddd7a0e-fad9-4f7e-9bce-00ae5debc563.log
```

Vector appends a [UUIDV4](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)) token to ensure there are no name
conflicts in the unlikely event that two Vector instances are writing data at the same
time.

You can control the resulting name via the [`key_prefix`](#key_prefix),
[`filename_time_format`](#filename_time_format),
and [`filename_append_uuid`](#filename_append_uuid) options.

For example, to store objects at the root GCS folder, without a timestamp or UUID use
these configuration options:

```text
key_prefix = "{{ my_file_name }}"
filename_time_format = ""
filename_append_uuid = false
```

## Storage Class
GCS offers [storage classes](https://cloud.google.com/storage/docs/storage-classes). You can apply
defaults, and rules, at the bucket level or set the storage class at the
object level. In the context of Vector only the object level is relevant
(Vector does not create or modify buckets). You can set the storage
class via the `storage_class` option.

## State
This component is stateless, meaning its behavior is consistent across each input.

## GCP Authentication
GCP offers a [variety of authentication methods](https://cloud.google.com/docs/authentication/) and
Vector is concerned with the [server to server methods](https://cloud.google.com/docs/authentication/production)
and will find credentials in the following order:

1. If the [`credentials_path`](#credentials_path) option is set.
1. If the `api_key` option is set.
1. If the [`GOOGLE_APPLICATION_CREDENTIALS`](#google_application_credentials) environment variable is set.
1. Finally, Vector will check for an [instance service account](https://cloud.google.com/docs/authentication/production#obtaining_and_providing_service_account_credentials_manually).

If credentials aren't found, Vector's health checks fail and an error is
[logged](/docs/administration/monitoring).

## Health checks
Health checks ensure that the downstream service is
accessible and ready to accept data. This check is performed
upon sink initialization. If the health check fails an error
will be logged and Vector will proceed to start.

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

## Tags & Metadata
Vector supports adding [custom metadata](https://cloud.google.com/storage/docs/metadata#custom-metadata) to
created objects. These metadata items are a way of associating extra
data items with the object that are not part of the uploaded data.

## Retry policy
Vector will retry failed requests (status == 429, >= 500, and != 501).
Other responses will not be retried. You can control the number of
retry attempts and backoff rate with the `request.retry_attempts` and
`request.retry_backoff_secs` options.


