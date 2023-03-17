---
title: AWS S3
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

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements</td></tr><tr><td>acl</td><td>Canned ACL to apply to the created objects.

For more information, see [Canned ACL][canned_acl].

[canned_acl]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl</td></tr><tr><td>auth</td><td>Configuration of the authentication strategy for interacting with AWS services.</td></tr><tr><td>auth.access_key_id</td><td>The AWS access key ID.</td></tr><tr><td>auth.assume_role</td><td>The ARN of an [IAM role][iam_role] to assume.

[iam_role]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html</td></tr><tr><td>auth.credentials_file</td><td>Path to the credentials file.</td></tr><tr><td>auth.imds</td><td>Configuration for authenticating with AWS through IMDS.</td></tr><tr><td>auth.imds.connect_timeout_seconds</td><td>Connect timeout for IMDS.</td></tr><tr><td>auth.imds.max_attempts</td><td>Number of IMDS retries for fetching tokens and metadata.</td></tr><tr><td>auth.imds.read_timeout_seconds</td><td>Read timeout for IMDS.</td></tr><tr><td>auth.load_timeout_secs</td><td>Timeout for successfully loading any credentials, in seconds.

Relevant when the default credentials chain is used or `assume_role`.</td></tr><tr><td>auth.profile</td><td>The credentials profile to use.

Used to select AWS credentials from a provided credentials file.</td></tr><tr><td>auth.region</td><td>The [AWS region][aws_region] to send STS requests to.

If not set, this will default to the configured region
for the service itself.

[aws_region]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints</td></tr><tr><td>auth.secret_access_key</td><td>The AWS secret access key.</td></tr><tr><td>batch</td><td>Event batching behavior.</td></tr><tr><td>batch.max_bytes</td><td>The maximum size of a batch that will be processed by a sink.

This is based on the uncompressed size of the batched events, before they are
serialized / compressed.</td></tr><tr><td>batch.max_events</td><td>The maximum size of a batch before it is flushed.</td></tr><tr><td>batch.timeout_secs</td><td>The maximum age of a batch before it is flushed.</td></tr><tr><td>bucket</td><td>The S3 bucket name.

This must not include a leading `s3://` or a trailing `/`.</td></tr><tr><td>compression</td><td>Compression configuration.

All compression algorithms use the default compression level unless otherwise specified.

Some cloud storage API clients and browsers will handle decompression transparently, so
files may not always appear to be compressed depending how they are accessed.</td></tr><tr><td>content_encoding</td><td>Overrides what content encoding has been applied to the object.

Directly comparable to the `Content-Encoding` HTTP header.

If not specified, the compression scheme used dictates this value.</td></tr><tr><td>content_type</td><td>Overrides the MIME type of the object.

Directly comparable to the `Content-Type` HTTP header.

If not specified, the compression scheme used dictates this value.
When `compression` is set to `none`, the value `text/x-log` is used.</td></tr><tr><td>encoding</td><td>Configures how events are encoded into raw bytes.</td></tr><tr><td>encoding.avro</td><td>Apache Avro-specific encoder options.</td></tr><tr><td>encoding.avro.schema</td><td>The Avro schema.</td></tr><tr><td>encoding.codec</td><td>The codec to use for encoding events.</td></tr><tr><td>encoding.csv</td><td>The CSV Serializer Options.</td></tr><tr><td>encoding.csv.fields</td><td>Configures the fields that will be encoded, as well as the order in which they
appear in the output.

If a field is not present in the event, the output will be an empty string.

Values of type `Array`, `Object`, and `Regex` are not supported and the
output will be an empty string.</td></tr><tr><td>encoding.except_fields</td><td>List of fields that will be excluded from the encoded event.</td></tr><tr><td>encoding.metric_tag_values</td><td>Controls how metric tag values are encoded.

When set to `single`, only the last non-bare value of tags will be displayed with the
metric.  When set to `full`, all metric tags will be exposed as separate assignments.</td></tr><tr><td>encoding.only_fields</td><td>List of fields that will be included in the encoded event.</td></tr><tr><td>encoding.timestamp_format</td><td>Format used for timestamp fields.</td></tr><tr><td>endpoint</td><td>Custom endpoint for use with AWS-compatible services.</td></tr><tr><td>filename_append_uuid</td><td>Whether or not to append a UUID v4 token to the end of the object key.

The UUID is appended to the timestamp portion of the object key, such that if the object key
being generated was `date=2022-07-18/1658176486`, setting this field to `true` would result
in an object key that looked like `date=2022-07-18/1658176486-30f6652c-71da-4f9f-800d-a1189c47c547`.

This ensures there are no name collisions, and can be useful in high-volume workloads where
object keys must be unique.</td></tr><tr><td>filename_extension</td><td>The filename extension to use in the object key.

This overrides setting the extension based on the configured `compression`.</td></tr><tr><td>filename_time_format</td><td>The timestamp format for the time component of the object key.

By default, object keys are appended with a timestamp that reflects when the objects are
sent to S3, such that the resulting object key is functionally equivalent to joining the key
prefix with the formatted timestamp, such as `date=2022-07-18/1658176486`.

This would represent a `key_prefix` set to `date=%F/` and the timestamp of Mon Jul 18 2022
20:34:44 GMT+0000, with the `filename_time_format` being set to `%s`, which renders
timestamps in seconds since the Unix epoch.

Supports the common [`strftime`][chrono_strftime_specifiers] specifiers found in most
languages.

When set to an empty string, no timestamp will be appended to the key prefix.

[chrono_strftime_specifiers]: https://docs.rs/chrono/latest/chrono/format/strftime/index.html#specifiers</td></tr><tr><td>framing</td><td>Framing configuration.</td></tr><tr><td>framing.character_delimited</td><td>Options for the character delimited encoder.</td></tr><tr><td>framing.character_delimited.delimiter</td><td>The ASCII (7-bit) character that delimits byte sequences.</td></tr><tr><td>framing.method</td><td>The framing method.</td></tr><tr><td>grant_full_control</td><td>Grants `READ`, `READ_ACP`, and `WRITE_ACP` permissions on the created objects to the named [grantee].

This allows the grantee to read the created objects and their metadata, as well as read and
modify the ACL on the created objects.

[grantee]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#specifying-grantee</td></tr><tr><td>grant_read</td><td>Grants `READ` permissions on the created objects to the named [grantee].

This allows the grantee to read the created objects and their metadata.

[grantee]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#specifying-grantee</td></tr><tr><td>grant_read_acp</td><td>Grants `READ_ACP` permissions on the created objects to the named [grantee].

This allows the grantee to read the ACL on the created objects.

[grantee]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#specifying-grantee</td></tr><tr><td>grant_write_acp</td><td>Grants `WRITE_ACP` permissions on the created objects to the named [grantee].

This allows the grantee to modify the ACL on the created objects.

[grantee]: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#specifying-grantee</td></tr><tr><td>key_prefix</td><td>A prefix to apply to all object keys.

Prefixes are useful for partitioning objects, such as by creating an object key that
stores objects under a particular "directory". If using a prefix for this purpose, it must end
in `/` to act as a directory path. A trailing `/` is **not** automatically added.</td></tr><tr><td>region</td><td>The [AWS region][aws_region] of the target service.

[aws_region]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints</td></tr><tr><td>request</td><td>Middleware settings for outbound requests.

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
create orphaned requests, pile on retries, and result in duplicate data downstream.</td></tr><tr><td>server_side_encryption</td><td>The Server-side Encryption algorithm used when storing these objects.</td></tr><tr><td>ssekms_key_id</td><td>Specifies the ID of the AWS Key Management Service (AWS KMS) symmetrical customer managed
customer master key (CMK) that will used for the created objects.

Only applies when `server_side_encryption` is configured to use KMS.

If not specified, Amazon S3 uses the AWS managed CMK in AWS to protect the data.</td></tr><tr><td>storage_class</td><td>The storage class for the created objects.

See the [S3 Storage Classes][s3_storage_classes] for more details.

[s3_storage_classes]: https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html</td></tr><tr><td>tags</td><td>The tag-set for the object.</td></tr><tr><td>tags.*</td><td>A single tag.</td></tr><tr><td>inputs</td><td>A list of upstream [source][sources] or [transform][transforms] IDs.

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
<table></tbody><tr><td>component_sent_bytes_total</td><td>The number of raw bytes sent by this component to destination sinks.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>events_discarded_total</td><td>The total number of events discarded by this component.</td></tr><tr><td>component_received_events_count</td><td>A histogram of the number of events passed in each internal batch in Vector's internal topology.

Note that this is separate than sink-level batching. It is mostly useful for low level debugging
performance issues in Vector due to small internal batches.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>utilization</td><td>A ratio from 0 to 1 of the load on a component. A value of 0 would indicate a completely idle component that is simply waiting for input. A value of 1 would indicate a that is never idle. This value is updated every 5 seconds.</td></tr><tr><td>buffer_byte_size</td><td>The number of bytes current in the buffer.</td></tr><tr><td>buffer_events</td><td>The number of events currently in the buffer.</td></tr><tr><td>buffer_received_events_total</td><td>The number of events received by this buffer.</td></tr><tr><td>buffer_received_event_bytes_total</td><td>The number of bytes received by this buffer.</td></tr><tr><td>buffer_sent_events_total</td><td>The number of events sent by this buffer.</td></tr><tr><td>buffer_sent_event_bytes_total</td><td>The number of bytes sent by this buffer.</td></tr><tr><td>processing_errors_total</td><td>The total number of processing errors encountered by this component. This metric is deprecated in favor of `component_errors_total`.</td></tr><tr><td>buffer_discarded_events_total</td><td>The number of events dropped by this non-blocking buffer.</td></tr></tbody></table>

# How It Works
## AWS authentication
Vector checks for AWS credentials in the following order:

1. The [`auth.access_key_id`](#auth.access_key_id) and [`auth.secret_access_key`](#auth.secret_access_key) options.
2. The [`AWS_ACCESS_KEY_ID`](#auth.access_key_id) and [`AWS_SECRET_ACCESS_KEY`](#auth.secret_access_key) environment variables.
3. The [AWS credentials file](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) (usually located at `~/.aws/credentials`).
4. The [IAM instance profile](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html) (only works if running on an EC2 instance
   with an instance profile/role). Requires IMDSv2 to be enabled. For EKS, you may need to increase the
   metadata token response hop limit to 2.

If no credentials are found, Vector's health check fails and an error is [logged](/docs/administration/monitoring).
If your AWS credentials expire, Vector will automatically search for up-to-date
credentials in the places (and order) described above.

## Cross account object writing
If you're using Vector to write objects across AWS accounts then you should
consider setting the `grant_full_control` option to the bucket owner's
canonical user ID. AWS provides a
[full tutorial](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access-example3.html) for this use case. If
don't know the bucket owner's canonical ID you can find it by following
[this tutorial](https://docs.aws.amazon.com/general/latest/gr/acct-identifiers.html#FindingCanonicalId).

## Object Access Control List (ACL)
AWS S3 supports [access control lists (ACL)](https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html) for buckets and
objects. In the context of Vector, only object ACLs are relevant (Vector does
not create or modify buckets). You can set the object level ACL by using one
of the `acl`, `grant_full_control`, `grant_read`, `grant_read_acp`, or
`grant_write_acp` options.

## Object naming
Vector uses two different naming schemes for S3 objects. If you set the
[`compression`](#compression) parameter to `true` (this is the default), Vector uses
this scheme:

```text
<key_prefix><timestamp>-<uuidv4>.log.gz
```

If compression isn't enabled, Vector uses this scheme (only the file extension
is different):

```text
<key_prefix><timestamp>-<uuidv4>.log
```

Some sample S3 object names (with and without compression, respectively):

```text
date=2019-06-18/1560886634-fddd7a0e-fad9-4f7e-9bce-00ae5debc563.log.gz
date=2019-06-18/1560886634-fddd7a0e-fad9-4f7e-9bce-00ae5debc563.log
```

Vector appends a [UUIDV4](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)) token to ensure there are no naming
conflicts in the unlikely event that two Vector instances are writing data at the
same time.

You can control the resulting name via the [`key_prefix`](#key_prefix),
[`filename_time_format`](#filename_time_format), and
[`filename_append_uuid`](#filename_append_uuid) options.

For example, to store objects at the root S3 folder, without a timestamp or UUID use
these configuration options:

```text
key_prefix = "{{ my_file_name }}"
filename_time_format = ""
filename_append_uuid = false
```

## Object Tags & metadata
Vector currently only supports [AWS S3 object tags](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/add-object-tags.html) and does
_not_ support [object metadata](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#object-metadata). If you require metadata
support see [issue #1694](https://github.com/vectordotdev/vector/issues/1694).

We believe tags are more flexible since they are separate from the actual S3
object. You can freely modify tags without modifying the object. Conversely,
object metadata requires a full rewrite of the object to make changes.

## Server-Side Encryption (SSE)
AWS S3 offers [server-side encryption](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html). You can apply defaults
at the bucket level or set the encryption at the object level. In the context,
of Vector only the object level is relevant (Vector does not create or modify
buckets). Although, we recommend setting defaults at the bucket level when
possible. You can explicitly set the object level encryption via the
`server_side_encryption` option.

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

## Buffers and batches
This component buffers & batches data as shown in the diagram above. You'll notice that
Vector treats these concepts differently, instead of treating them as global concepts,
Vector treats them as sink specific concepts. This isolates sinks, ensuring services
disruptions are contained and delivery guarantees are honored.

*Batches* are flushed when 1 of 2 conditions are met:

1. The batch age meets or exceeds the configured `timeout_secs`.
2. The batch size meets or exceeds the configured `max_bytes` or `max_events`.

*Buffers* are controlled via the [`buffer.*`](#buffer) options.

## Storage class
AWS S3 offers [storage classes](https://aws.amazon.com/s3/storage-classes/). You can apply
defaults, and rules, at the bucket level or set the storage class at the object
level. In the context of Vector only the object level is relevant (Vector does
not create or modify buckets). You can set the storage class via the
`storage_class` option.

## Retry policy
Vector will retry failed requests (status == 429, >= 500, and != 501).
Other responses will not be retried. You can control the number of
retry attempts and backoff rate with the `request.retry_attempts` and
`request.retry_backoff_secs` options.


