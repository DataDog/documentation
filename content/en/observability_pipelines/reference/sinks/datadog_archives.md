---
title: Datadog Log Archives
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>bucket</td><td>The bucket name. Do not include a leading `s3://` or a trailing `/`.</td></tr><tr><td>key_prefix</td><td>A prefix to apply to all object key names. This should be used to partition your objects in "folders".</td></tr><tr><td>service</td><td>An external storage service where archived logs are sent to.</td></tr><tr><td>aws_s3</td><td>AWS S3 specific configuration options. Required when `service` has the value `"aws_s3"`.</td></tr><tr><td>aws_s3.auth</td><td>Options for the authentication strategy. Check the [`auth`](/docs/reference/configuration/sinks/aws_s3/#auth) section of the AWS S3 sink for more details.</td></tr><tr><td>aws_s3.acl</td><td>Canned ACL to apply to the created objects.

For more information, see [Canned ACL][canned_acl].

[canned_acl]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl</td></tr><tr><td>aws_s3.grant_full_control</td><td>Grants `READ`, `READ_ACP`, and `WRITE_ACP` permissions on the created objects to the named [grantee].

This allows the grantee to read the created objects and their metadata, as well as read and
modify the ACL on the created objects.

[grantee]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#specifying-grantee</td></tr><tr><td>aws_s3.grant_read</td><td>Grants `READ` permissions on the created objects to the named [grantee].

This allows the grantee to read the created objects and their metadata.

[grantee]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#specifying-grantee</td></tr><tr><td>aws_s3.grant_read_acp</td><td>Grants `READ_ACP` permissions on the created objects to the named [grantee].

This allows the grantee to read the ACL on the created objects.

[grantee]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#specifying-grantee</td></tr><tr><td>aws_s3.grant_write_acp</td><td>Grants `WRITE_ACP` permissions on the created objects to the named [grantee].

This allows the grantee to modify the ACL on the created objects.

[grantee]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#specifying-grantee</td></tr><tr><td>aws_s3.server_side_encryption</td><td>The Server-side Encryption algorithm used when storing these objects.</td></tr><tr><td>aws_s3.ssekms_key_id</td><td>Specifies the ID of the AWS Key Management Service (AWS KMS) symmetrical customer managed
customer master key (CMK) that will used for the created objects.

Only applies when `server_side_encryption` is configured to use KMS.

If not specified, Amazon S3 uses the AWS managed CMK in AWS to protect the data.</td></tr><tr><td>aws_s3.storage_class</td><td>The storage class for the created objects. See [the S3 Storage Classes](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html) for more details.
Log Rehydration supports all storage classes except for Glacier and Glacier Deep Archive.</td></tr><tr><td>aws_s3.tags</td><td>The tag-set for the object.</td></tr><tr><td>aws_s3.tags.*</td><td>A single tag.</td></tr><tr><td>aws_s3.region</td><td>The [AWS region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) of the target service.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

Wildcards (`*`) are supported.

See [configuration][configuration] for more info.

[sources]: https://vector.dev/docs/reference/configuration/sources/
[transforms]: https://vector.dev/docs/reference/configuration/transforms/
[configuration]: https://vector.dev/docs/reference/configuration/</td></tr><tr><td>buffer</td><td>Configures the buffering behavior for this sink.

More information about the individual buffer types, and buffer behavior, can be found in the
[Buffering Model][buffering_model] section.

[buffering_model]: /docs/about/under-the-hood/architecture/buffering-model/</td></tr><tr><td>buffer.max_events</td><td>The maximum number of events allowed in the buffer.</td></tr><tr><td>buffer.max_size</td><td>The maximum size of the buffer on disk.

Must be at least ~256 megabytes (268435488 bytes).</td></tr><tr><td>buffer.type</td><td>The type of buffer to use.</td></tr><tr><td>buffer.when_full</td><td>Event handling behavior when a buffer is full.</td></tr><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled by this sink. When enabled, all connected sources that support end-to-end acknowledgements will wait for the destination of this sink to acknowledge receipt of events before providing acknowledgement to the sending source. These settings override the global `acknowledgement` settings.</td></tr><tr><td>acknowledgements.enabled</td><td>Controls if all connected sources will wait for this sink to deliver the events before acknowledging receipt.</td></tr><tr><td>request</td><td>Configures the sink request behavior.</td></tr><tr><td>request.adaptive_concurrency</td><td>Configure the adaptive concurrency algorithms. These values have been tuned by optimizing simulated results. In general you should not need to adjust these.</td></tr><tr><td>request.adaptive_concurrency.decrease_ratio</td><td>The fraction of the current value to set the new concurrency limit when decreasing the limit. Valid values are greater than 0 and less than 1. Smaller values cause the algorithm to scale back rapidly when latency increases. Note that the new limit is rounded down after applying this ratio.</td></tr><tr><td>request.adaptive_concurrency.ewma_alpha</td><td>The adaptive concurrency algorithm uses an exponentially weighted moving average (EWMA) of past RTT measurements as a reference to compare with the current RTT. This value controls how heavily new measurements are weighted compared to older ones. Valid values are greater than 0 and less than 1. Smaller values cause this reference to adjust more slowly, which may be useful if a service has unusually high response variability.</td></tr><tr><td>request.adaptive_concurrency.rtt_deviation_scale</td><td>When calculating the past RTT average, we also compute a secondary "deviation" value that indicates how variable those values are. We use that deviation when comparing the past RTT average to the current measurements, so we can ignore increases in RTT that are within an expected range. This factor is used to scale up the deviation to an appropriate range. Valid values are greater than or equal to 0, and we expect reasonable values to range from 1.0 to 3.0. Larger values cause the algorithm to ignore larger increases in the RTT.</td></tr><tr><td>request.concurrency</td><td>The maximum number of in-flight requests allowed at any given time, or "adaptive" to allow Vector to automatically set the limit based on current network and service conditions.</td></tr><tr><td>request.rate_limit_duration_secs</td><td>The time window, in seconds, used for the `rate_limit_num` option.</td></tr><tr><td>request.rate_limit_num</td><td>The maximum number of requests allowed within the `rate_limit_duration_secs` time window.</td></tr><tr><td>request.retry_attempts</td><td>The maximum number of retries to make for failed requests. The default, for all intents and purposes, represents an infinite number of retries.</td></tr><tr><td>request.retry_initial_backoff_secs</td><td>The amount of time to wait before attempting the first retry for a failed request. Once, the first retry has failed the fibonacci sequence will be used to select future backoffs.</td></tr><tr><td>request.retry_max_duration_secs</td><td>The maximum amount of time, in seconds, to wait between retries.</td></tr><tr><td>request.timeout_secs</td><td>The maximum time a request can take before being aborted. It is highly recommended that you do not lower this value below the service's internal timeout, as this could create orphaned requests, pile on retries, and result in duplicate data downstream.</td></tr><tr><td>tls</td><td>Configures the TLS options for incoming/outgoing connections.</td></tr><tr><td>tls.ca_file</td><td>Absolute path to an additional CA certificate file.

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

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>tls.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

Declare the supported ALPN protocols, which are used during negotiation with peer. Prioritized in the order
they are defined.</td></tr><tr><td>google_cloud_storage</td><td>GCP Cloud Storage specific configuration options. Required when `service` has the value `"google_cloud_storage"`.</td></tr><tr><td>google_cloud_storage.acl</td><td>The Predefined ACL to apply to created objects.

For more information, see [Predefined ACLs][predefined_acls].

[predefined_acls]: https://cloud.google.com/storage/docs/access-control/lists#predefined-acl</td></tr><tr><td>google_cloud_storage.credentials_path</td><td>Path to a [service account] credentials JSON file.

Either an API key, or a path to a service account credentials JSON file can be specified.

If both are unset, the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is checked for a filename. If no
filename is named, an attempt is made to fetch an instance service account for the compute instance the program is
running on. If this is not on a GCE instance, then you must define it with an API key or service account
credentials JSON file.

[gcp_service_account_credentials]: https://cloud.google.com/docs/authentication/production#manually</td></tr><tr><td>google_cloud_storage.metadata</td><td>The set of metadata `key:value` pairs for the created objects.

For more information, see the [custom metadata][custom_metadata] documentation.

[custom_metadata]: https://cloud.google.com/storage/docs/metadata#custom-metadata</td></tr><tr><td>google_cloud_storage.metadata.*</td><td>A key/value pair.</td></tr><tr><td>google_cloud_storage.storage_class</td><td>The storage class for created objects.

For more information, see the [storage classes][storage_classes] documentation.

[storage_classes]: https://cloud.google.com/storage/docs/storage-classes</td></tr><tr><td>healthcheck</td><td>Healthcheck configuration.</td></tr><tr><td>healthcheck.enabled</td><td>Whether or not to check the health of the sink when Vector starts up.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_sent_bytes_total</td><td>The number of raw bytes sent by this component to destination sinks.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>events_discarded_total</td><td>The total number of events discarded by this component.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>buffer_byte_size</td><td>The number of bytes current in the buffer.</td></tr><tr><td>buffer_events</td><td>The number of events currently in the buffer.</td></tr><tr><td>buffer_received_events_total</td><td>The number of events received by this buffer.</td></tr><tr><td>buffer_received_event_bytes_total</td><td>The number of bytes received by this buffer.</td></tr><tr><td>buffer_sent_events_total</td><td>The number of events sent by this buffer.</td></tr><tr><td>buffer_sent_event_bytes_total</td><td>The number of bytes sent by this buffer.</td></tr><tr><td>processing_errors_total</td><td>The total number of processing errors encountered by this component. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>buffer_discarded_events_total</td><td>The number of events dropped by this non-blocking buffer.</td></tr></tbody></table>

# How It Works
## Custom object key format
Objects written to the external archives have the following key format:
```text
/my/bucket/my/key/prefix/dt=<YYYYMMDD>/hour=<HH>/<UUID>.json.gz
```
For example:

```text
/my/bucket/my/key/prefix/dt=20180515/hour=14/7dq1a9mnSya3bFotoErfxl.json.gz
```

## Event format/pre-processing
Within the gzipped JSON file, each event’s content is formatted as follows:

```json
{
  "_id": "123456789abcdefg",
  "date": "2018-05-15T14:31:16.003Z",
  "host": "i-12345abced6789efg",
  "source": "source_name",
  "service": "service_name",
  "status": "status_level",
  "message": "2018-05-15T14:31:16.003Z INFO rid='acb-123' status=403 method=PUT",
  "attributes": { "rid": "abc-123", "http": { "status_code": 403, "method": "PUT" } },
  "tags": [ "env:prod", "team:acme" ]
}
```

Events are pre-processed as follows:

- `_id` is always generated in the sink
- `date` is set from the Global [Log Schema](/docs/reference/configuration/global-options/#log_schema)'s `timestamp_key` mapping,
or to the current time if missing
- `message`,`host` are also set from the corresponding Global [Log Schema](/docs/reference/configuration/global-options/#log_schema) mappings
- `source`, `service`, `status`, `tags` are left as is
- the rest of the fields is moved to `attributes`

Though only `_id` and `date` are mandatory,
most reserved attributes( `host`, `source`, `service`, `status`, `message`, `tags`) are expected
for a meaningful log processing by DataDog. Therefore users should make sure that these optional fields are populated
before they reach this sink.

## AWS S3 setup
For more details about AWS S3 configuration and how it works check out [AWS S3 sink](/docs/reference/configuration/sinks/aws_s3/#how-it-works).

## State
This component is stateless, meaning its behavior is consistent across each input.

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

## GCP Cloud Storage setup
For more details about GCP Cloud Storage configuration and how it works check out [GCS sink](/docs/reference/configuration/sinks/gcp_cloud_storage/#how-it-works).

## Retry policy
Vector will retry failed requests (status == 429, >= 500, and != 501).
Other responses will not be retried. You can control the number of
retry attempts and backoff rate with the `request.retry_attempts` and
`request.retry_backoff_secs` options.


