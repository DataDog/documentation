---
title: API testing template variables
content_filters:
- trait_id: protocol
  option_group_id: synthetics_protocol_options
  label: "Test type"
- trait_id: synthetics_variables
  option_group_id: synthetics_variables_options
  label: "Variables"
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/templates/"
  tag: "Documentation"
  text: "Learn more about monitor templates"
- link: "/synthetics/guide/how-synthetics-monitors-trigger-alerts/"
  tag: "Guide"
  text: "Understanding Synthetic Monitor Alerting"
---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages for API tests. These variables are accessed using the `synthetics.attributes` prefix.

Use the filters above to view variables by protocol type and variable category.

<!-- Test results variables -->
{% if equals($synthetics_variables, "test_results") %}

This section covers three categories of variables:

- [Protocol-specific variables](#http-protocol-variables): Request, response, and timing data specific to the selected protocol.
- [Common variables](#common-variables): Assertions, DNS resolution, and shared timing data available across all protocols.
- [Execution results](#execution-results): Test status, duration, failure details, and step counts.

<!-- Test results > HTTP -->
{% if equals($protocol, "http") %}

### HTTP Protocol Variables

{% tabs %}
{% tab label="Request" %}
`synthetics.attributes.variables.extracted.request`
: Information about the request

`synthetics.attributes.variables.extracted.request.method`
: The HTTP method

`synthetics.attributes.variables.extracted.request.body`
: The request body if set

`synthetics.attributes.variables.extracted.request.headers`
: The request headers
{% /tab %}

{% tab label="Response" %}
`synthetics.attributes.variables.extracted.response`
: Information about the response

`synthetics.attributes.variables.extracted.response.body`
: The response body as string (truncated if too big)

`synthetics.attributes.variables.extracted.response.bodySize`
: The size of the full response body

`synthetics.attributes.variables.extracted.response.cacheHeaders`
: A dictionary of caching-related headers

`synthetics.attributes.variables.extracted.response.cdn`
: The response CDN info if any

`synthetics.attributes.variables.extracted.response.cdn.provider`
: The CDN provider name (for example, `akamai`, `cloudflare`)

`synthetics.attributes.variables.extracted.response.cdn.cache`
: The cache info

`synthetics.attributes.variables.extracted.response.cdn.cache.cached`
: If the data was cached

`synthetics.attributes.variables.extracted.response.cdn.cache.status`
: The cache status as provided in associated cache header

`synthetics.attributes.variables.extracted.response.headers`
: The response headers

`synthetics.attributes.variables.extracted.response.httpVersion`
: The HTTP version

`synthetics.attributes.variables.extracted.response.redirects`
: A list of redirections if any

`synthetics.attributes.variables.extracted.response.redirects.statusCode`
: The HTTP status code for the redirect

`synthetics.attributes.variables.extracted.response.redirects.location`
: The returned location to redirect to

`synthetics.attributes.variables.extracted.response.statusCode`
: The response HTTP status code
{% /tab %}

{% tab label="Timings" %}
`synthetics.attributes.variables.extracted.timings.authentication`
: The time spent for the authentication challenge (for example, NTLM)

`synthetics.attributes.variables.extracted.timings.download`
: The time spent downloading the response

`synthetics.attributes.variables.extracted.timings.firstByte`
: The time spent waiting for the first byte of response to be received

`synthetics.attributes.variables.extracted.timings.redirect`
: The time spent in HTTP redirections

`synthetics.attributes.variables.extracted.timings.ssl`
: The duration of the TLS handshake (only when testing an HTTPS endpoint)
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > HTTP -->

<!-- Test results > DNS -->
{% if equals($protocol, "dns") %}

### DNS Protocol Variables

`synthetics.attributes.variables.extracted.response.records.type`
: DNS record type

`synthetics.attributes.variables.extracted.response.records.values`
: DNS record values

{% /if %}
<!-- END Test results > DNS -->

<!-- Test results > SSL -->
{% if equals($protocol, "ssl") %}

### SSL Protocol Variables

{% tabs %}
{% tab label="Certificate" %}
`synthetics.attributes.variables.extracted.cert`
: SSL certificate information

`synthetics.attributes.variables.extracted.cert.cipher`
: Cipher suite used (for example, `TLS_AES_128_GCM_SHA256`)

`synthetics.attributes.variables.extracted.cert.extKeyUsage`
: Extended key usage data

`synthetics.attributes.variables.extracted.cert.fingerprint`
: SHA-1 digest of the DER encoded certificate

`synthetics.attributes.variables.extracted.cert.fingerprint256`
: SHA-256 digest of the DER encoded certificate

`synthetics.attributes.variables.extracted.cert.issuer`
: Information about the certificate authority that signed the certificate

`synthetics.attributes.variables.extracted.cert.issuer.C`
: Country code

`synthetics.attributes.variables.extracted.cert.issuer.ST`
: Street

`synthetics.attributes.variables.extracted.cert.issuer.L`
: Locality

`synthetics.attributes.variables.extracted.cert.issuer.O`
: Organization

`synthetics.attributes.variables.extracted.cert.issuer.OU`
: Organizational unit

`synthetics.attributes.variables.extracted.cert.issuer.CN`
: Common name

`synthetics.attributes.variables.extracted.cert.subject`
: Information about the certificate subject (same fields as issuer)

`synthetics.attributes.variables.extracted.cert.subject.altName`
: All domains for which the certificate is valid (Subject Alternative Name)

`synthetics.attributes.variables.extracted.cert.protocol`
: SSL/TLS protocol version

`synthetics.attributes.variables.extracted.cert.serialNumber`
: Certificate serial number

`synthetics.attributes.variables.extracted.cert.tlsVersion`
: TLS version parsed from protocol, if available

`synthetics.attributes.variables.extracted.cert.valid.from`
: Certificate validity start date (millisecond-based epoch)

`synthetics.attributes.variables.extracted.cert.valid.to`
: Certificate validity end date (millisecond-based epoch)

`synthetics.attributes.variables.extracted.cert.exponent`
: RSA key exponent (for RSA keys)

`synthetics.attributes.variables.extracted.cert.modulus`
: RSA key modulus as a hexadecimal string (for RSA keys)

`synthetics.attributes.variables.extracted.ocsp`
: OCSP (Online Certificate Status Protocol) information
{% /tab %}

{% tab label="Timings" %}
`synthetics.attributes.variables.extracted.timings.handshake`
: SSL handshake timing
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > SSL -->

<!-- Test results > WebSocket -->
{% if equals($protocol, "websocket") %}

### WebSocket Protocol Variables

{% tabs %}
{% tab label="Timings" %}
`synthetics.attributes.variables.extracted.timings.open`
: Time to open connection (in milliseconds)

`synthetics.attributes.variables.extracted.timings.receive`
: Time to receive response
{% /tab %}

{% tab label="Handshake" %}
`synthetics.attributes.variables.extracted.handshake.request`
: Handshake request data

`synthetics.attributes.variables.extracted.handshake.request.headers`
: Headers sent during the handshake

`synthetics.attributes.variables.extracted.handshake.response`
: Handshake response data

`synthetics.attributes.variables.extracted.handshake.response.headers`
: Headers received during the handshake

`synthetics.attributes.variables.extracted.handshake.response.statusCode`
: HTTP status code of the handshake response
{% /tab %}

{% tab label="Message" %}
`synthetics.attributes.variables.extracted.request.message`
: WebSocket request message

`synthetics.attributes.variables.extracted.response.message`
: WebSocket response message
{% /tab %}

{% tab label="Close" %}
`synthetics.attributes.variables.extracted.close.reason`
: Connection close reason

`synthetics.attributes.variables.extracted.close.statusCode`
: Connection close status code
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > WebSocket -->

<!-- Test results > UDP -->
{% if equals($protocol, "udp") %}

### UDP Protocol Variables

{% tabs %}
{% tab label="Request" %}
`synthetics.attributes.variables.extracted.request.message`
: UDP request message
{% /tab %}

{% tab label="Response" %}
`synthetics.attributes.variables.extracted.response.message`
: UDP response message
{% /tab %}

{% tab label="Timings" %}
`synthetics.attributes.variables.extracted.timings.message`
: Message timing
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > UDP -->

<!-- Test results > TCP -->
{% if equals($protocol, "tcp") %}

### TCP Protocol Variables

{% tabs %}
{% tab label="Connection" %}
`synthetics.attributes.variables.extracted.connectionOutcome`
: Connection result (`established`, `refused`, or `timeout`)

`synthetics.attributes.variables.extracted.netpath.routers.ip`
: Router IP addresses from network path data
{% /tab %}

{% tab label="Traceroute" %}
`synthetics.attributes.variables.extracted.traceroute`
: Traceroute hop data, available when **Track number of network hops (TTL)** is enabled in the test

`synthetics.attributes.variables.extracted.traceroute.routers.ip`
: Router IP address for the hop

`synthetics.attributes.variables.extracted.traceroute.routers.resolvedHost`
: Resolved hostname for the router IP, if available

`synthetics.attributes.variables.extracted.traceroute.packetsSent`
: Number of network packets sent

`synthetics.attributes.variables.extracted.traceroute.packetsReceived`
: Number of packets received

`synthetics.attributes.variables.extracted.traceroute.packetLossPercentage`
: Ratio of packet loss (float between 0 and 1)

`synthetics.attributes.variables.extracted.traceroute.latency.min`
: Minimum latency

`synthetics.attributes.variables.extracted.traceroute.latency.max`
: Maximum latency

`synthetics.attributes.variables.extracted.traceroute.latency.avg`
: Average latency

`synthetics.attributes.variables.extracted.traceroute.latency.stddev`
: Standard deviation

`synthetics.attributes.variables.extracted.traceroute.latency.values`
: Latency values array
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > TCP -->

<!-- Test results > ICMP -->
{% if equals($protocol, "icmp") %}

### ICMP Protocol Variables

{% tabs %}
{% tab label="Traceroute" %}
`synthetics.attributes.variables.extracted.traceroute`
: Traceroute data (same structure as TCP traceroute)
{% /tab %}

{% tab label="Ping" %}
`synthetics.attributes.variables.extracted.request.host`
: Target host

`synthetics.attributes.variables.extracted.ping`
: Ping result data

`synthetics.attributes.variables.extracted.ping.packetsSent`
: Number of network packets sent

`synthetics.attributes.variables.extracted.ping.packetsReceived`
: Number of packets received

`synthetics.attributes.variables.extracted.ping.packetLossPercentage`
: Ratio of packet loss (float between 0 and 1)

`synthetics.attributes.variables.extracted.ping.packetSize`
: Packet size

`synthetics.attributes.variables.extracted.ping.resolvedIP`
: Resolved IP address of the pinged host

`synthetics.attributes.variables.extracted.ping.latency.min`
: Minimum latency

`synthetics.attributes.variables.extracted.ping.latency.max`
: Maximum latency

`synthetics.attributes.variables.extracted.ping.latency.avg`
: Average latency

`synthetics.attributes.variables.extracted.ping.latency.stddev`
: Standard deviation

`synthetics.attributes.variables.extracted.ping.latency.values`
: Latency values array
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > ICMP -->

<!-- Test results > gRPC -->
{% if equals($protocol, "grpc") %}

### gRPC Protocol Variables

`synthetics.attributes.variables.extracted.callType`
: Call type (`unary` or `healthcheck`)

`synthetics.attributes.variables.extracted.timings.rpc`
: RPC call timing

{% tabs %}
{% tab label="Health check" %}
`synthetics.attributes.variables.extracted.response.healthcheck.status`
: Health check status (`UNKNOWN = 0`, `SERVING = 1`, `NOT_SERVING = 2`, `SERVICE_UNKNOWN = 3`)

`synthetics.attributes.variables.extracted.response.healthcheck.message.service`
: Name of the called service, if provided

`synthetics.attributes.variables.extracted.response.metadata`
: Dictionary of gRPC response metadata
{% /tab %}

{% tab label="Unary" %}
`synthetics.attributes.variables.extracted.request.message`
: gRPC request message

`synthetics.attributes.variables.extracted.request.service`
: The called service

`synthetics.attributes.variables.extracted.response.message`
: gRPC response message (as JSON string)

`synthetics.attributes.variables.extracted.response.metadata`
: Dictionary of gRPC response metadata
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > gRPC -->

### Common Variables

These variables are available for all API test protocols.

{% tabs %}
{% tab label="Assertions" %}
`synthetics.attributes.variables.extracted.assertions`
: List of configured assertions for the test

`synthetics.attributes.variables.extracted.assertions.actual`
: The evaluated value of the assertion

`synthetics.attributes.variables.extracted.assertions.expected`
: The expected value configured for the assertion (for example, `1000`)

`synthetics.attributes.variables.extracted.assertions.operator`
: The assertion operator (for example, `lessThan`)

`synthetics.attributes.variables.extracted.assertions.type`
: The assertion type (for example, `responseTime`)

`synthetics.attributes.variables.extracted.assertions.valid`
: Whether the assertion passed (boolean)
{% /tab %}

{% tab label="DNS resolution" %}
`synthetics.attributes.variables.extracted.dnsResolution.resolvedIp`
: The IP address called for the test (available when testing a domain rather than an IP)

`synthetics.attributes.variables.extracted.dnsResolution.server`
: The DNS server used for resolution
{% /tab %}

{% tab label="Timings" %}
`synthetics.attributes.variables.extracted.timings.total`
: Total time of the test in milliseconds (same as `result.duration`)

`synthetics.attributes.variables.extracted.timings.dns`
: Duration of the DNS lookup in milliseconds (available when testing a domain rather than an IP)

`synthetics.attributes.variables.extracted.timings.tcp`
: Time to establish the TCP connection in milliseconds (HTTP, TCP, SSL, and WebSocket subtypes)
{% /tab %}
{% /tabs %}

{% partial file="synthetics/notifications/execution_results.mdoc.md" /%}

{% /if %}
<!-- END Test results variables -->

<!-- Test info variables -->
{% if equals($synthetics_variables, "test_info") %}

{% partial file="synthetics/notifications/test_metadata.mdoc.md" /%}

{% /if %}
<!-- END Test info variables -->

<!-- Step details variables -->
{% if equals($synthetics_variables, "step_details") %}

### Extracted variables

Path: `synthetics.attributes.variables.extracted`

These are step execution metadata and results containing detailed information about how each step ran, including response data, timing metrics, and protocol-specific details. These values are only available for successful test results and can only be used in Recovery notifications.

**General step properties:**

`synthetics.attributes.variables.extracted.steps.allowFailure`
: Whether the step is allowed to fail without failing the entire test

`synthetics.attributes.variables.extracted.steps.duration`
: Step execution duration in milliseconds

`synthetics.attributes.variables.extracted.steps.failure`
: Failure information object containing `.code` and `.message`

`synthetics.attributes.variables.extracted.steps.id`
: Unique step identifier

`synthetics.attributes.variables.extracted.steps.isCritical`
: Whether the step is critical to the test

`synthetics.attributes.variables.extracted.steps.status`
: Step execution status

`synthetics.attributes.variables.extracted.steps.type`
: Type of step being executed

{% partial file="synthetics/notifications/step_summary.mdoc.md" /%}

{% /if %}
<!-- END Step details variables -->

<!-- Variables -->
{% if equals($synthetics_variables, "local_and_global") %}

{% partial file="synthetics/notifications/local_global_variables.mdoc.md" /%}

{% alert level="tip" %}
Review the [advanced notifications][1] page for an example of how to use local variables in a notification.
{% /alert %}

{% /if %}
<!-- END Variables -->

[1]: /synthetics/notifications/advanced_notifications/#use-local-variables-in-a-notification
