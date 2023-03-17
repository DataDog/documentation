---
title: AWS Kinesis Firehose
---
undefined

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>access_key</td><td>An optional access key to authenticate requests against.

AWS Kinesis Firehose can be configured to pass along a user-configurable access key with each request. If
configured, `access_key` should be set to the same value. Otherwise, all requests will be allowed.</td></tr><tr><td>access_keys</td><td>An optional list of access keys to authenticate requests against.

AWS Kinesis Firehose can be configured to pass along a user-configurable access key with each request. If
configured, `access_keys` should be set to the same value. Otherwise, all requests will be allowed.</td></tr><tr><td>acknowledgements</td><td>Controls how acknowledgements are handled by this source.

This setting is **deprecated** in favor of enabling `acknowledgements` at the [global][global_acks] or sink level.

Enabling or disabling acknowledgements at the source level has **no effect** on acknowledgement behavior.

See [End-to-end Acknowledgements][e2e_acks] for more information on how event acknowledgement is handled.

[global_acks]: https://vector.dev/docs/reference/configuration/global-options/#acknowledgements
[e2e_acks]: https://vector.dev/docs/about/under-the-hood/architecture/end-to-end-acknowledgements/</td></tr><tr><td>acknowledgements.enabled</td><td>Whether or not end-to-end acknowledgements are enabled for this source.</td></tr><tr><td>address</td><td>The socket address to listen for connections on.</td></tr><tr><td>decoding</td><td>Configures how events are decoded from raw bytes.</td></tr><tr><td>decoding.codec</td><td>The codec to use for decoding events.</td></tr><tr><td>framing</td><td>Framing configuration.

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
ensure that processing is not truly unbounded.</td></tr><tr><td>framing.octet_counting</td><td>Options for the octet counting decoder.</td></tr><tr><td>framing.octet_counting.max_length</td><td>The maximum length of the byte buffer.</td></tr><tr><td>record_compression</td><td>The compression scheme to use for decompressing records within the Firehose message.

Some services, like AWS CloudWatch Logs, will [compress the events with gzip][events_with_gzip],
before sending them AWS Kinesis Firehose. This option can be used to automatically decompress
them before forwarding them to the next component.

Note that this is different from [Content encoding option][encoding_option] of the
Firehose HTTP endpoint destination. That option controls the content encoding of the entire HTTP request.

[events_with_gzip]: https://docs.aws.amazon.com/firehose/latest/dev/writing-with-cloudwatch-logs.html
[encoding_option]: https://docs.aws.amazon.com/firehose/latest/dev/create-destination.html#create-destination-http</td></tr><tr><td>store_access_key</td><td>Whether or not to store the AWS Firehose Access Key in event secrets.

If set to `true`, when incoming requests contains an Access Key sent by AWS Firehose, it will be kept in the
event secrets as "aws_kinesis_firehose_access_key".</td></tr><tr><td>tls</td><td>Configures the TLS options for incoming/outgoing connections.</td></tr><tr><td>tls.alpn_protocols</td><td>Sets the list of supported ALPN protocols.

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

Do NOT set this to `false` unless you understand the risks of not verifying the remote hostname.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>request_read_errors_total</td><td>The total number of request read errors for this component.</td></tr><tr><td>requests_received_total</td><td>The total number of requests received by this component.</td></tr><tr><td>request_automatic_decode_errors_total</td><td>The total number of request errors for this component when it attempted to automatically discover and handle the content-encoding of incoming request data.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Forwarding CloudWatch Log events
This source is the recommended way to ingest logs from AWS
CloudWatch logs via [AWS CloudWatch Log
subscriptions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html). To
set this up:

1. Deploy vector with a publicly exposed HTTP endpoint using
   this source. You will likely also want to use the
   [`parse_aws_cloudwatch_log_subscription_message`](/docs/reference/vrl/functions/#parse_aws_cloudwatch_log_subscription_message)
   function to extract the log events. Make sure to set
   the `access_keys` to secure this endpoint. Your
   configuration might look something like:

   ```toml
	[sources.firehose]
	# General
	type = "aws_kinesis_firehose"
	address = "127.0.0.1:9000"
	access_keys = ["secret"]

	[transforms.cloudwatch]
	type = "remap"
	inputs = ["firehose"]
	drop_on_error = false
	source = '''
	parsed = parse_aws_cloudwatch_log_subscription_message!(.message)
	. = unnest(parsed.log_events)
	. = map_values(.) -> |value| {
	  event = del(value.log_events)
	  value |= event
	  message = string!(del(.message))
	  merge(value, object!(parse_json!(message)))
	}
	'''

	[sinks.console]
	type = "console"
	inputs = ["cloudwatch"]
	encoding.codec = "json"
   ```

2. Create a Kinesis Firehose delivery stream in the region
   where the CloudWatch Logs groups exist that you want to
   ingest.
3. Set the stream to forward to your Vector instance via its
   HTTP Endpoint destination. Make sure to configure the
   same `access_keys` you set earlier.
4. Setup a [CloudWatch Logs
   subscription](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html) to
   forward the events to your delivery stream

## State
This component is stateless, meaning its behavior is consistent across each input.

## Transport Layer Security (TLS)
Vector uses [OpenSSL](https://www.openssl.org/) for TLS protocols. You can
adjust TLS behavior via the `tls.*` options.

## Context
By default, the `aws_kinesis_firehose` source augments events with helpful
context keys.


