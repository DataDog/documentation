---
title: AWS S3
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled by this source.

This setting is **deprecated** in favor of enabling `acknowledgements` at the [global][global_acks] or sink level.

Enabling or disabling acknowledgements at the source level has **no effect** on acknowledgement behavior.

See [End-to-end Acknowledgements][e2e_acks] for more information on how event acknowledgement is handled.

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements
[e2e_acks]: https://vector.dev/docs/about/under-the-hood/architecture/end-to-end-acknowledgements/</td></tr><tr><td>acknowledgements.enabled</td><td>Whether or not end-to-end acknowledgements are enabled for this source.</td></tr><tr><td>auth</td><td>Configuration of the authentication strategy for interacting with AWS services.</td></tr><tr><td>auth.access_key_id</td><td>The AWS access key ID.</td></tr><tr><td>auth.assume_role</td><td>The ARN of an [IAM role][iam_role] to assume.

[iam_role]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html</td></tr><tr><td>auth.credentials_file</td><td>Path to the credentials file.</td></tr><tr><td>auth.imds</td><td>Configuration for authenticating with AWS through IMDS.</td></tr><tr><td>auth.imds.connect_timeout_seconds</td><td>Connect timeout for IMDS.</td></tr><tr><td>auth.imds.max_attempts</td><td>Number of IMDS retries for fetching tokens and metadata.</td></tr><tr><td>auth.imds.read_timeout_seconds</td><td>Read timeout for IMDS.</td></tr><tr><td>auth.load_timeout_secs</td><td>Timeout for successfully loading any credentials, in seconds.

Relevant when the default credentials chain is used or `assume_role`.</td></tr><tr><td>auth.profile</td><td>The credentials profile to use.

Used to select AWS credentials from a provided credentials file.</td></tr><tr><td>auth.region</td><td>The [AWS region][aws_region] to send STS requests to.

If not set, this will default to the configured region
for the service itself.

[aws_region]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints</td></tr><tr><td>auth.secret_access_key</td><td>The AWS secret access key.</td></tr><tr><td>compression</td><td>The compression scheme used for decompressing objects retrieved from S3.</td></tr><tr><td>endpoint</td><td>Custom endpoint for use with AWS-compatible services.</td></tr><tr><td>multiline</td><td>Multiline aggregation configuration.

If not specified, multiline aggregation is disabled.</td></tr><tr><td>multiline.condition_pattern</td><td>Regular expression pattern that is used to determine whether or not more lines should be read.

This setting must be configured in conjunction with `mode`.</td></tr><tr><td>multiline.mode</td><td>Aggregation mode.

This setting must be configured in conjunction with `condition_pattern`.</td></tr><tr><td>multiline.start_pattern</td><td>Regular expression pattern that is used to match the start of a new message.</td></tr><tr><td>multiline.timeout_ms</td><td>The maximum amount of time to wait for the next additional line, in milliseconds.

Once this timeout is reached, the buffered message is guaranteed to be flushed, even if incomplete.</td></tr><tr><td>region</td><td>The [AWS region][aws_region] of the target service.

[aws_region]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints</td></tr><tr><td>sqs</td><td>Configuration options for SQS.</td></tr><tr><td>sqs.client_concurrency</td><td>Number of concurrent tasks to create for polling the queue for messages.

Defaults to the number of available CPUs on the system.

Should not typically need to be changed, but it can sometimes be beneficial to raise this
value when there is a high rate of messages being pushed into the queue and the objects
being fetched are small. In these cases, system resources may not be fully utilized without
fetching more messages per second, as the SQS message consumption rate affects the S3 object
retrieval rate.</td></tr><tr><td>sqs.delete_message</td><td>Whether to delete the message once it is processed.

It can be useful to set this to `false` for debugging or during the initial setup.</td></tr><tr><td>sqs.poll_secs</td><td>How long to wait while polling the queue for new messages, in seconds.

Generally should not be changed unless instructed to do so, as if messages are available,
they will always be consumed, regardless of the value of `poll_secs`.</td></tr><tr><td>sqs.queue_url</td><td>The URL of the SQS queue to poll for bucket notifications.</td></tr><tr><td>sqs.tls_options</td><td>TLS configuration.</td></tr><tr><td>sqs.tls_options.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

Declare the supported ALPN protocols, which are used during negotiation with peer. Prioritized in the order
they are defined.</td></tr><tr><td>sqs.tls_options.ca_file</td><td>Absolute path to an additional CA certificate file.

The certificate must be in the DER or PEM (X.509) format. Additionally, the certificate can be provided as an inline string in PEM format.</td></tr><tr><td>sqs.tls_options.crt_file</td><td>Absolute path to a certificate file used to identify this server.

The certificate must be in DER, PEM (X.509), or PKCS#12 format. Additionally, the certificate can be provided as
an inline string in PEM format.

If this is set, and is not a PKCS#12 archive, `key_file` must also be set.</td></tr><tr><td>sqs.tls_options.key_file</td><td>Absolute path to a private key file used to identify this server.

The key must be in DER or PEM (PKCS#8) format. Additionally, the key can be provided as an inline string in PEM format.</td></tr><tr><td>sqs.tls_options.key_pass</td><td>Passphrase used to unlock the encrypted key file.

This has no effect unless `key_file` is set.</td></tr><tr><td>sqs.tls_options.verify_certificate</td><td>Enables certificate verification.

If enabled, certificates must be valid in terms of not being expired, as well as being issued by a trusted
issuer. This verification operates in a hierarchical manner, checking that not only the leaf certificate (the
certificate presented by the client/server) is valid, but also that the issuer of that certificate is valid, and
so on until reaching a root certificate.

Relevant for both incoming and outgoing connections.

Do NOT set this to `false` unless you understand the risks of not verifying the validity of certificates.</td></tr><tr><td>sqs.tls_options.verify_hostname</td><td>Enables hostname verification.

If enabled, the hostname used to connect to the remote host must be present in the TLS certificate presented by
the remote host, either as the Common Name or as an entry in the Subject Alternative Name extension.

Only relevant for outgoing connections.

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>sqs.visibility_timeout_secs</td><td>The visibility timeout to use for messages, in seconds.

This controls how long a message is left unavailable after it is received. If a message is received, and
takes longer than `visibility_timeout_secs` to process and delete the message from the queue, it is made available again for another consumer.

This can happen if there is an issue between consuming a message and deleting it.</td></tr><tr><td>proxy</td><td>Proxy configuration.

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

[cidr]: https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing</td></tr><tr><td>tls_options</td><td>TLS configuration.</td></tr><tr><td>tls_options.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

Declare the supported ALPN protocols, which are used during negotiation with peer. Prioritized in the order
they are defined.</td></tr><tr><td>tls_options.ca_file</td><td>Absolute path to an additional CA certificate file.

The certificate must be in the DER or PEM (X.509) format. Additionally, the certificate can be provided as an inline string in PEM format.</td></tr><tr><td>tls_options.crt_file</td><td>Absolute path to a certificate file used to identify this server.

The certificate must be in DER, PEM (X.509), or PKCS#12 format. Additionally, the certificate can be provided as
an inline string in PEM format.

If this is set, and is not a PKCS#12 archive, `key_file` must also be set.</td></tr><tr><td>tls_options.key_file</td><td>Absolute path to a private key file used to identify this server.

The key must be in DER or PEM (PKCS#8) format. Additionally, the key can be provided as an inline string in PEM format.</td></tr><tr><td>tls_options.key_pass</td><td>Passphrase used to unlock the encrypted key file.

This has no effect unless `key_file` is set.</td></tr><tr><td>tls_options.verify_certificate</td><td>Enables certificate verification.

If enabled, certificates must be valid in terms of not being expired, as well as being issued by a trusted
issuer. This verification operates in a hierarchical manner, checking that not only the leaf certificate (the
certificate presented by the client/server) is valid, but also that the issuer of that certificate is valid, and
so on until reaching a root certificate.

Relevant for both incoming and outgoing connections.

Do NOT set this to `false` unless you understand the risks of not verifying the validity of certificates.</td></tr><tr><td>tls_options.verify_hostname</td><td>Enables hostname verification.

If enabled, the hostname used to connect to the remote host must be present in the TLS certificate presented by
the remote host, either as the Common Name or as an entry in the Subject Alternative Name extension.

Only relevant for outgoing connections.

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>sqs_message_delete_failed_total</td><td>The total number of failures to delete SQS messages.</td></tr><tr><td>sqs_message_delete_succeeded_total</td><td>The total number of successful deletions of SQS messages.</td></tr><tr><td>sqs_message_processing_failed_total</td><td>The total number of failures to process SQS messages.</td></tr><tr><td>sqs_message_processing_succeeded_total</td><td>The total number of SQS messages successfully processed.</td></tr><tr><td>sqs_message_receive_failed_total</td><td>The total number of failures to receive SQS messages.</td></tr><tr><td>sqs_message_receive_succeeded_total</td><td>The total number of times successfully receiving SQS messages.</td></tr><tr><td>sqs_message_received_messages_total</td><td>The total number of received SQS messages.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>sqs_s3_event_record_ignored_total</td><td>The total number of times an S3 record in an SQS message was ignored (for an event that was not `ObjectCreated`).</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

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

## Handling events from the `aws_s3` source
This source behaves very similarly to the `file` source in that
it will output one event per line (unless the `multiline`
configuration option is used).

You will commonly want to use [transforms](/docs/reference/configuration/transforms) to
parse the data. For example, to parse VPC flow logs sent to S3 you can
chain the `remap` transform:

```toml
[transforms.flow_logs]
type = "remap" # required
inputs = ["s3"]
drop_on_error = false
source = '''
. = parse_aws_vpc_flow_log!(string!(.message))
'''
```

To parse AWS load balancer logs, the `remap` transform can be used:

```toml
[transforms.elasticloadbalancing_fields_parsed]
type = "remap" # required
inputs = ["s3"]
drop_on_error = false
source = '''
. = parse_aws_alb_log!(string!(.message))
.request_url_parts = parse_url!(.request_url)
'''
```

## State
This component is stateless, meaning its behavior is consistent across each input.

## Transport Layer Security (TLS)
Vector uses [OpenSSL](https://www.openssl.org/) for TLS protocols. You can
adjust TLS behavior via the `tls.*` options.

## Context
By default, the `aws_s3` source augments events with helpful
context keys.


