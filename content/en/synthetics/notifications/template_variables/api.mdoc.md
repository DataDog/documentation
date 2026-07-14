---
title: API testing template variables
content_filters:
- trait_id: protocol
  option_group_id: synthetics_protocol_options
  label: "Test type"
- trait_id: synthetics_variables
  option_group_id: synthetics_variables_api_options
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
`synthetics.attributes.result.request`
: Information about the request

`synthetics.attributes.result.request.method`
: The HTTP method

`synthetics.attributes.result.request.body`
: The request body if set

`synthetics.attributes.result.request.headers`
: The request headers
{% /tab %}

{% tab label="Response" %}
`synthetics.attributes.result.response`
: Information about the response

`synthetics.attributes.result.response.body`
: The response body as string (truncated if too big)

`synthetics.attributes.result.response.bodySize`
: The size of the full response body

`synthetics.attributes.result.response.cacheHeaders`
: A dictionary of caching-related headers

`synthetics.attributes.result.response.cdn`
: The response CDN info if any

`synthetics.attributes.result.response.cdn.provider`
: The CDN provider name (for example, `akamai`, `cloudflare`)

`synthetics.attributes.result.response.cdn.cache`
: The cache info

`synthetics.attributes.result.response.cdn.cache.cached`
: If the data was cached

`synthetics.attributes.result.response.cdn.cache.status`
: The cache status as provided in associated cache header

`synthetics.attributes.result.response.headers`
: The response headers

`synthetics.attributes.result.response.httpVersion`
: The HTTP version

`synthetics.attributes.result.response.redirects`
: A list of redirections if any

`synthetics.attributes.result.response.redirects.statusCode`
: The HTTP status code for the redirect

`synthetics.attributes.result.response.redirects.location`
: The returned location to redirect to

`synthetics.attributes.result.response.statusCode`
: The response HTTP status code
{% /tab %}

{% tab label="Timings" %}
`synthetics.attributes.result.timings.authentication`
: The time spent for the authentication challenge (for example, NTLM)

`synthetics.attributes.result.timings.download`
: The time spent downloading the response

`synthetics.attributes.result.timings.firstByte`
: The time spent waiting for the first byte of response to be received

`synthetics.attributes.result.timings.redirect`
: The time spent in HTTP redirections

`synthetics.attributes.result.timings.ssl`
: The duration of the TLS handshake (only when testing an HTTPS endpoint)
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > HTTP -->

<!-- Test results > DNS -->
{% if equals($protocol, "dns") %}

### DNS Protocol Variables

`synthetics.attributes.result.response.records.type`
: DNS record type

`synthetics.attributes.result.response.records.values`
: DNS record values

{% /if %}
<!-- END Test results > DNS -->

<!-- Test results > SSL -->
{% if equals($protocol, "ssl") %}

### SSL Protocol Variables

{% tabs %}
{% tab label="Certificate" %}
`synthetics.attributes.result.cert`
: SSL certificate information

`synthetics.attributes.result.cert.cipher`
: Cipher suite used (for example, `TLS_AES_128_GCM_SHA256`)

`synthetics.attributes.result.cert.extKeyUsage`
: Extended key usage data

`synthetics.attributes.result.cert.fingerprint`
: SHA-1 digest of the DER encoded certificate

`synthetics.attributes.result.cert.fingerprint256`
: SHA-256 digest of the DER encoded certificate

`synthetics.attributes.result.cert.issuer`
: Information about the certificate authority that signed the certificate

`synthetics.attributes.result.cert.issuer.C`
: Country code

`synthetics.attributes.result.cert.issuer.ST`
: Street

`synthetics.attributes.result.cert.issuer.L`
: Locality

`synthetics.attributes.result.cert.issuer.O`
: Organization

`synthetics.attributes.result.cert.issuer.OU`
: Organizational unit

`synthetics.attributes.result.cert.issuer.CN`
: Common name

`synthetics.attributes.result.cert.subject`
: Information about the certificate subject (same fields as issuer)

`synthetics.attributes.result.cert.subject.altName`
: All domains for which the certificate is valid (Subject Alternative Name)

`synthetics.attributes.result.cert.protocol`
: SSL/TLS protocol version

`synthetics.attributes.result.cert.serialNumber`
: Certificate serial number

`synthetics.attributes.result.cert.tlsVersion`
: TLS version parsed from protocol, if available

`synthetics.attributes.result.cert.valid.from`
: Certificate validity start date (millisecond-based epoch)

`synthetics.attributes.result.cert.valid.to`
: Certificate validity end date (millisecond-based epoch)

`synthetics.attributes.result.cert.exponent`
: RSA key exponent (for RSA keys)

`synthetics.attributes.result.cert.modulus`
: RSA key modulus as a hexadecimal string (for RSA keys)

`synthetics.attributes.result.ocsp`
: OCSP (Online Certificate Status Protocol) information
{% /tab %}

{% tab label="Timings" %}
`synthetics.attributes.result.timings.handshake`
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
`synthetics.attributes.result.timings.open`
: Time to open connection (in milliseconds)

`synthetics.attributes.result.timings.receive`
: Time to receive response
{% /tab %}

{% tab label="Handshake" %}
`synthetics.attributes.result.handshake.request`
: Handshake request data

`synthetics.attributes.result.handshake.request.headers`
: Headers sent during the handshake

`synthetics.attributes.result.handshake.response`
: Handshake response data

`synthetics.attributes.result.handshake.response.headers`
: Headers received during the handshake

`synthetics.attributes.result.handshake.response.statusCode`
: HTTP status code of the handshake response
{% /tab %}

{% tab label="Message" %}
`synthetics.attributes.result.request.message`
: WebSocket request message

`synthetics.attributes.result.response.message`
: WebSocket response message
{% /tab %}

{% tab label="Close" %}
`synthetics.attributes.result.close.reason`
: Connection close reason

`synthetics.attributes.result.close.statusCode`
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
`synthetics.attributes.result.request.message`
: UDP request message
{% /tab %}

{% tab label="Response" %}
`synthetics.attributes.result.response.message`
: UDP response message
{% /tab %}

{% tab label="Timings" %}
`synthetics.attributes.result.timings.message`
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
`synthetics.attributes.result.connectionOutcome`
: Connection result (`established`, `refused`, or `timeout`)

`synthetics.attributes.result.netpath.routers.ip`
: Router IP addresses from network path data
{% /tab %}

{% tab label="Traceroute" %}
`synthetics.attributes.result.traceroute`
: Traceroute hop data, available when {% ui %}Track number of network hops (TTL){% /ui %} is enabled in the test

`synthetics.attributes.result.traceroute.routers.ip`
: Router IP address for the hop

`synthetics.attributes.result.traceroute.routers.resolvedHost`
: Resolved hostname for the router IP, if available

`synthetics.attributes.result.traceroute.packetsSent`
: Number of network packets sent

`synthetics.attributes.result.traceroute.packetsReceived`
: Number of packets received

`synthetics.attributes.result.traceroute.packetLossPercentage`
: Ratio of packet loss (float between 0 and 1)

`synthetics.attributes.result.traceroute.latency.min`
: Minimum latency

`synthetics.attributes.result.traceroute.latency.max`
: Maximum latency

`synthetics.attributes.result.traceroute.latency.avg`
: Average latency

`synthetics.attributes.result.traceroute.latency.stddev`
: Standard deviation

`synthetics.attributes.result.traceroute.latency.values`
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
`synthetics.attributes.result.traceroute`
: Traceroute data (same structure as TCP traceroute)
{% /tab %}

{% tab label="Ping" %}
`synthetics.attributes.result.request.host`
: Target host

`synthetics.attributes.result.ping`
: Ping result data

`synthetics.attributes.result.ping.packetsSent`
: Number of network packets sent

`synthetics.attributes.result.ping.packetsReceived`
: Number of packets received

`synthetics.attributes.result.ping.packetLossPercentage`
: Ratio of packet loss (float between 0 and 1)

`synthetics.attributes.result.ping.packetSize`
: Packet size

`synthetics.attributes.result.ping.resolvedIP`
: Resolved IP address of the pinged host

`synthetics.attributes.result.ping.latency.min`
: Minimum latency

`synthetics.attributes.result.ping.latency.max`
: Maximum latency

`synthetics.attributes.result.ping.latency.avg`
: Average latency

`synthetics.attributes.result.ping.latency.stddev`
: Standard deviation

`synthetics.attributes.result.ping.latency.values`
: Latency values array
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > ICMP -->

<!-- Test results > gRPC -->
{% if equals($protocol, "grpc") %}

### gRPC Protocol Variables

`synthetics.attributes.result.callType`
: Call type (`unary` or `healthcheck`)

`synthetics.attributes.result.timings.rpc`
: RPC call timing

{% tabs %}
{% tab label="Health check" %}
`synthetics.attributes.result.response.healthcheck.status`
: Health check status (`UNKNOWN = 0`, `SERVING = 1`, `NOT_SERVING = 2`, `SERVICE_UNKNOWN = 3`)

`synthetics.attributes.result.response.healthcheck.message.service`
: Name of the called service, if provided

`synthetics.attributes.result.response.metadata`
: Dictionary of gRPC response metadata
{% /tab %}

{% tab label="Unary" %}
`synthetics.attributes.result.request.message`
: gRPC request message

`synthetics.attributes.result.request.service`
: The called service

`synthetics.attributes.result.response.message`
: gRPC response message (as JSON string)

`synthetics.attributes.result.response.metadata`
: Dictionary of gRPC response metadata
{% /tab %}
{% /tabs %}

{% /if %}
<!-- END Test results > gRPC -->

### Common Variables

These variables are available for all API test protocols.

{% tabs %}
{% tab label="Assertions" %}
`synthetics.attributes.result.assertions`
: List of configured assertions for the test

`synthetics.attributes.result.assertions.actual`
: The evaluated value of the assertion

`synthetics.attributes.result.assertions.expected`
: The expected value configured for the assertion (for example, `1000`)

`synthetics.attributes.result.assertions.operator`
: The assertion operator (for example, `lessThan`)

`synthetics.attributes.result.assertions.type`
: The assertion type (for example, `responseTime`)

`synthetics.attributes.result.assertions.valid`
: Whether the assertion passed (boolean)
{% /tab %}

{% tab label="DNS resolution" %}
`synthetics.attributes.result.dnsResolution.resolvedIp`
: The IP address called for the test (available when testing a domain rather than an IP)

`synthetics.attributes.result.dnsResolution.server`
: The DNS server used for resolution
{% /tab %}

{% tab label="Timings" %}
`synthetics.attributes.result.timings.total`
: Total time of the test in milliseconds (same as `result.duration`)

`synthetics.attributes.result.timings.dns`
: Duration of the DNS lookup in milliseconds (available when testing a domain rather than an IP)

`synthetics.attributes.result.timings.tcp`
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

<!-- Variables -->
{% if equals($synthetics_variables, "local_and_global") %}

{% partial file="synthetics/notifications/local_global_variables.mdoc.md" /%}

{% alert level="tip" %}
Review the [advanced notifications][1] page for an example of how to use local variables in a notification.
{% /alert %}

{% /if %}
<!-- END Variables -->

[1]: /synthetics/notifications/advanced_notifications/#use-local-variables-in-a-notification
