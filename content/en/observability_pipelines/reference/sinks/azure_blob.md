---
title: Azure Blob Storage
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
serialized / compressed.</td></tr><tr><td>batch.max_events</td><td>The maximum size of a batch before it is flushed.</td></tr><tr><td>batch.timeout_secs</td><td>The maximum age of a batch before it is flushed.</td></tr><tr><td>blob_append_uuid</td><td>Whether or not to append a UUID v4 token to the end of the blob key.

The UUID is appended to the timestamp portion of the object key, such that if the blob key
being generated was `date=2022-07-18/1658176486`, setting this field to `true` would result
in an blob key that looked like
`date=2022-07-18/1658176486-30f6652c-71da-4f9f-800d-a1189c47c547`.

This ensures there are no name collisions, and can be useful in high-volume workloads where
blob keys must be unique.</td></tr><tr><td>blob_prefix</td><td>A prefix to apply to all blob keys.

Prefixes are useful for partitioning objects, such as by creating an blob key that
stores blobs under a particular "directory". If using a prefix for this purpose, it must end
in `/` to act as a directory path. A trailing `/` is **not** automatically added.</td></tr><tr><td>blob_time_format</td><td>The timestamp format for the time component of the blob key.

By default, blob keys are appended with a timestamp that reflects when the blob are sent to
Azure Blob Storage, such that the resulting blob key is functionally equivalent to joining
the blob prefix with the formatted timestamp, such as `date=2022-07-18/1658176486`.

This would represent a `blob_prefix` set to `date=%F/` and the timestamp of Mon Jul 18 2022
20:34:44 GMT+0000, with the `filename_time_format` being set to `%s`, which renders
timestamps in seconds since the Unix epoch.

Supports the common [`strftime`][chrono_strftime_specifiers] specifiers found in most
languages.

When set to an empty string, no timestamp will be appended to the blob prefix.

[chrono_strftime_specifiers]: https://docs.rs/chrono/latest/chrono/format/strftime/index.html#specifiers</td></tr><tr><td>compression</td><td>Compression configuration.

All compression algorithms use the default compression level unless otherwise specified.</td></tr><tr><td>connection_string</td><td>The Azure Blob Storage Account connection string.

Authentication with access key is the only supported authentication method.

Either `storage_account`, or this field, must be specified.</td></tr><tr><td>container_name</td><td>The Azure Blob Storage Account container name.</td></tr><tr><td>encoding</td><td>Configures how events are encoded into raw bytes.</td></tr><tr><td>encoding.avro</td><td>Apache Avro-specific encoder options.</td></tr><tr><td>encoding.avro.schema</td><td>The Avro schema.</td></tr><tr><td>encoding.codec</td><td>The codec to use for encoding events.</td></tr><tr><td>encoding.csv</td><td>The CSV Serializer Options.</td></tr><tr><td>encoding.csv.fields</td><td>Configures the fields that will be encoded, as well as the order in which they
appear in the output.

If a field is not present in the event, the output will be an empty string.

Values of type `Array`, `Object`, and `Regex` are not supported and the
output will be an empty string.</td></tr><tr><td>encoding.except_fields</td><td>List of fields that will be excluded from the encoded event.</td></tr><tr><td>encoding.metric_tag_values</td><td>Controls how metric tag values are encoded.

When set to `single`, only the last non-bare value of tags will be displayed with the
metric.  When set to `full`, all metric tags will be exposed as separate assignments.</td></tr><tr><td>encoding.only_fields</td><td>List of fields that will be included in the encoded event.</td></tr><tr><td>encoding.timestamp_format</td><td>Format used for timestamp fields.</td></tr><tr><td>endpoint</td><td>The Azure Blob Storage Endpoint URL.

This is used to override the default blob storage endpoint URL in cases where you are using
credentials read from the environment/managed identities or access tokens without using an
explicit connection_string (which already explicitly supports overriding the blob endpoint
URL).

This may only be used with `storage_account` and will be ignored when used with
`connection_string`.</td></tr><tr><td>framing</td><td>Framing configuration.</td></tr><tr><td>framing.character_delimited</td><td>Options for the character delimited encoder.</td></tr><tr><td>framing.character_delimited.delimiter</td><td>The ASCII (7-bit) character that delimits byte sequences.</td></tr><tr><td>framing.method</td><td>The framing method.</td></tr><tr><td>request</td><td>Middleware settings for outbound requests.

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

Must be at least ~256 megabytes (268435488 bytes).</td></tr><tr><td>buffer.type</td><td>The type of buffer to use.</td></tr><tr><td>buffer.when_full</td><td>Event handling behavior when a buffer is full.</td></tr><tr><td>storage_account</td><td>The Azure Blob Storage Account name.

Attempts to load credentials for the account in the following ways, in order:

- read from environment variables ([more information][env_cred_docs])
- looks for a [Managed Identity][managed_ident_docs]
- uses the `az` CLI tool to get an access token ([more information][az_cli_docs])

Either `connection_string`, or this field, must be specified.

[env_cred_docs]: https://docs.rs/azure_identity/latest/azure_identity/struct.EnvironmentCredential.html
[managed_ident_docs]: https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview
[az_cli_docs]: https://docs.microsoft.com/en-us/cli/azure/account?view=azure-cli-latest#az-account-get-access-token</td></tr><tr><td>healthcheck</td><td>Healthcheck configuration.</td></tr><tr><td>healthcheck.enabled</td><td>Whether or not to check the health of the sink when Vector starts up.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>events_discarded_total</td><td>The total number of events discarded by this component.</td></tr><tr><td>processing_errors_total</td><td>The total number of processing errors encountered by this component. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>http_error_response_total</td><td>The total number of HTTP error responses for this component.</td></tr><tr><td>http_request_errors_total</td><td>The total number of HTTP request errors for this component.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>buffer_byte_size</td><td>The number of bytes current in the buffer.</td></tr><tr><td>buffer_events</td><td>The number of events currently in the buffer.</td></tr><tr><td>buffer_received_events_total</td><td>The number of events received by this buffer.</td></tr><tr><td>buffer_received_event_bytes_total</td><td>The number of bytes received by this buffer.</td></tr><tr><td>buffer_sent_events_total</td><td>The number of events sent by this buffer.</td></tr><tr><td>buffer_sent_event_bytes_total</td><td>The number of bytes sent by this buffer.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>buffer_discarded_events_total</td><td>The number of events dropped by this non-blocking buffer.</td></tr></tbody></table>

# How It Works
## Object naming
By default, Vector names your blobs different based on whether or not the blobs are compressed.

Here is the format without compression:

```text
<key_prefix><timestamp>-<uuidv4>.log
```

Here's an example blob name *without* compression:

```text
blob/2021-06-23/1560886634-fddd7a0e-fad9-4f7e-9bce-00ae5debc563.log
```

And here is the format *with* compression:

```text
<key_prefix><timestamp>-<uuidv4>.log.gz
```

An example blob name with compression:

```text
blob/2021-06-23/1560886634-fddd7a0e-fad9-4f7e-9bce-00ae5debc563.log.gz
```

Vector appends a [UUIDV4](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)) token to ensure there are no name
conflicts in the unlikely event that two Vector instances are writing data at the same
time.

You can control the resulting name via the [`blob_prefix`](#blob_prefix),
[`blob_time_format`](#blob_time_format), and [`blob_append_uuid`](#blob_append_uuid) options.

For example, to store objects at the root Azure storage folder, without a timestamp or UUID use
these configuration options:

```text
blob_prefix = "{{ my_file_name }}"
blob_time_format = ""
blob_append_uuid = false
```

## State
This component is stateless, meaning its behavior is consistent across each input.

## Health checks
Health checks ensure that the downstream service is
accessible and ready to accept data. This check is performed
upon sink initialization. If the health check fails an error
will be logged and Vector will proceed to start.

## Rate limits & adaptive concurrency
null

## Buffers and batches
This component buffers & batches data as shown in the diagram above. You'll notice that
Vector treats these concepts differently, instead of treating them as global concepts,
Vector treats them as sink specific concepts. This isolates sinks, ensuring services
disruptions are contained and delivery guarantees are honored.

*Batches* are flushed when 1 of 2 conditions are met:

1. The batch age meets or exceeds the configured `timeout_secs`.
2. The batch size meets or exceeds the configured `max_bytes` or `max_events`.

*Buffers* are controlled via the [`buffer.*`](#buffer) options.

## Retry policy
Vector will retry failed requests (status == 429, >= 500, and != 501).
Other responses will not be retried. You can control the number of
retry attempts and backoff rate with the `request.retry_attempts` and
`request.retry_backoff_secs` options.


