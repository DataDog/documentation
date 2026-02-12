---
title: Synthetic Monitoring API Template Variables
content_filters:
- trait_id: protocol
  option_group_id: synthetics_protocol_options
  label: "Protocol"
- trait_id: synthetics_variables
  option_group_id: synthetics_variables_options
  label: "Variables"
---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages for API tests. These variables are accessed using the `synthetics.attributes` prefix.

Use the filters above to view variables by protocol type and variable category.

<!-- HTTP -->
{% if equals($protocol, "http") %}

### HTTP Protocol Variables

**Request:**

`synthetics.attributes.variables.extracted.request`
: Information about the request

`synthetics.attributes.variables.extracted.request.method`
: The HTTP method

`synthetics.attributes.variables.extracted.request.body`
: The request body if set

`synthetics.attributes.variables.extracted.request.headers`
: The request headers

**Response:**

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

**Timings:**

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

{% /if %}

<!-- DNS -->
{% if equals($protocol, "dns") %}

### DNS Protocol Variables

`synthetics.attributes.variables.extracted.response.records.type`
: DNS record type

`synthetics.attributes.variables.extracted.response.records.values`
: DNS record values

{% /if %}

<!-- SSL -->
{% if equals($protocol, "ssl") %}

### SSL Protocol Variables

`synthetics.attributes.variables.extracted.cert`
: SSL certificate information

`synthetics.attributes.variables.extracted.cipher`
: Cipher suite used

`synthetics.attributes.variables.extracted.issuer`
: Certificate issuer

`synthetics.attributes.variables.extracted.subject`
: Certificate subject

`synthetics.attributes.variables.extracted.valid.from`
: Certificate valid from date

`synthetics.attributes.variables.extracted.valid.to`
: Certificate valid to date

`synthetics.attributes.variables.extracted.ocsp`
: OCSP (Online Certificate Status Protocol) information

`synthetics.attributes.variables.extracted.timings.handshake`
: SSL handshake timing

{% /if %}

<!-- WebSocket -->
{% if equals($protocol, "websocket") %}

### WebSocket Protocol Variables

`synthetics.attributes.variables.extracted.timings.open`
: Time to open connection (in milliseconds)

`synthetics.attributes.variables.extracted.timings.receive`
: Time to receive response

`synthetics.attributes.variables.extracted.handshake.request`
: Handshake request data

`synthetics.attributes.variables.extracted.handshake.response`
: Handshake response data

`synthetics.attributes.variables.extracted.request.message`
: WebSocket request message

`synthetics.attributes.variables.extracted.response.message`
: WebSocket response message

`synthetics.attributes.variables.extracted.close.reason`
: Connection close reason

`synthetics.attributes.variables.extracted.close.statusCode`
: Connection close status code

{% /if %}

<!-- UDP -->
{% if equals($protocol, "udp") %}

### UDP Protocol Variables

`synthetics.attributes.variables.extracted.request.message`
: UDP request message

`synthetics.attributes.variables.extracted.response.message`
: UDP response message

`synthetics.attributes.variables.extracted.timings.message`
: Message timing

{% /if %}

<!-- TCP -->
{% if equals($protocol, "tcp") %}

### TCP Protocol Variables

`synthetics.attributes.variables.extracted.connectionOutcome`
: Connection result

`synthetics.attributes.variables.extracted.netpath.routers.ip`
: Router IP addresses

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

{% /if %}

<!-- ICMP -->
{% if equals($protocol, "icmp") %}

### ICMP Protocol Variables

`synthetics.attributes.variables.extracted.traceroute`
: Traceroute data (same structure as TCP traceroute)

`synthetics.attributes.variables.extracted.request.host`
: Target host

`synthetics.attributes.variables.extracted.ping`
: Ping results

`synthetics.attributes.variables.extracted.latency.min`
: Minimum latency

`synthetics.attributes.variables.extracted.latency.max`
: Maximum latency

`synthetics.attributes.variables.extracted.latency.avg`
: Average latency

`synthetics.attributes.variables.extracted.latency.stddev`
: Standard deviation

`synthetics.attributes.variables.extracted.latency.values`
: Latency values array

{% /if %}

<!-- gRPC -->
{% if equals($protocol, "grpc") %}

### gRPC Protocol Variables

`synthetics.attributes.variables.extracted.callType`
: Call type (`unary` or `healthcheck`)

`synthetics.attributes.variables.extracted.timings.rpc`
: RPC call timing

`synthetics.attributes.variables.extracted.response.healthcheck.status`
: Health check status

`synthetics.attributes.variables.extracted.request.message`
: gRPC request message

`synthetics.attributes.variables.extracted.response.message`
: gRPC response message

{% /if %}

<!-- Test execution variables -->
{% if equals($synthetics_variables, "execution") %}

{% partial file="synthetics/notifications/test_execution_variables.mdoc.md" /%}

{% /if %}

<!-- Test metadata variables -->
{% if equals($synthetics_variables, "test_metadata") %}

{% partial file="synthetics/notifications/test_metadata.mdoc.md" /%}

{% /if %}

<!-- Device information variables -->
{% if equals($synthetics_variables, "device_info") %}

### Device Information Variables

**Note:** Device information is not applicable to API tests. This section is relevant for Browser and Mobile tests only.

{% /if %}

<!-- Execution results variables -->
{% if equals($synthetics_variables, "execution_results") %}

{% partial file="synthetics/notifications/execution_results.mdoc.md" /%}

{% /if %}

<!-- Failed step information variables -->
{% if equals($synthetics_variables, "failed_step_info") %}

### Failed Step Information Variables

**Applies to:** Multistep API tests

The `{{synthetics.failed_step}}` object provides a shortcut to the step that caused the test to fail, eliminating the need to reference `{{synthetics.attributes.result.steps.<step-index>}}` directly.

`{{synthetics.failed_step.name}}`
: Maps to `{{synthetics.attributes.result.steps.<step-index>.name}}`

`{{synthetics.failed_step.failure.message}}`
: Maps to `{{synthetics.attributes.result.steps.<step-index>.failure.message}}`

`{{synthetics.failed_step.url}}`
: Maps to `{{synthetics.attributes.result.steps.<step-index>.url}}`

{% /if %}

<!-- Local & Global variables -->
{% if equals($synthetics_variables, "local_global_variables") %}

{% partial file="synthetics/notifications/local_global_variables.mdoc.md" /%}

{% alert level="tip" %}
Review the [advanced notifications](/synthetics/notifications/advanced_notifications/#use-local-variables-in-a-notification) page for an example of how to use local variables in a notification.
{% /alert %}

{% /if %}

<!-- Extracted variables -->
{% if equals($synthetics_variables, "extracted") %}

### Extracted Variables

Path: `synthetics.attributes.variables.extracted`

These are step execution metadata and results containing detailed information about how each step ran, including response data, timing metrics, and protocol-specific details. These values are only available when the step completes successfully.

**General Step Properties:**

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

**Multistep API Tests:**

`synthetics.attributes.variables.extracted.name`
: Step name

`synthetics.attributes.variables.extracted.type`
: Step type

**Protocol-Specific Variables:**

Refer to the Protocol filter above to view variables specific to HTTP, DNS, SSL, WebSocket, UDP, TCP, ICMP, or gRPC tests.

{% /if %}

<!-- Step variables -->
{% if equals($synthetics_variables, "step") %}

{% partial file="synthetics/notifications/step_summary.mdoc.md" /%}

{% /if %}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/explore/results_explorer
