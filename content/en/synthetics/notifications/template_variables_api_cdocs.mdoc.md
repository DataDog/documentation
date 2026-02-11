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

**Note:** Not all variables are available for every test type. You may need to test different outputs to verify the data returned. You can export the result as a JSON file from the **Actions** tab of a test run in the [Results Explorer][1], then reference the path directly within your monitor configuration.

Use the filters above to view variables by protocol type and variable category.

<!-- HTTP -->
{% if equals($protocol, "http") %}

### HTTP Protocol Variables

**Request:**

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.request` | Information about the request |
| `synthetics.attributes.variables.extracted.request.method` | The HTTP method |
| `synthetics.attributes.variables.extracted.request.body` | The request body if set |
| `synthetics.attributes.variables.extracted.request.headers` | The request headers |

**Response:**

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.response` | Information about the response |
| `synthetics.attributes.variables.extracted.response.body` | The response body as string (truncated if too big) |
| `synthetics.attributes.variables.extracted.response.bodySize` | The size of the full response body |
| `synthetics.attributes.variables.extracted.response.cacheHeaders` | A dictionary of caching-related headers |
| `synthetics.attributes.variables.extracted.response.cdn` | The response CDN info if any |
| `synthetics.attributes.variables.extracted.response.cdn.provider` | The CDN provider name (for example, `akamai`, `cloudflare`) |
| `synthetics.attributes.variables.extracted.response.cdn.cache` | The cache info |
| `synthetics.attributes.variables.extracted.response.cdn.cache.cached` | If the data was cached |
| `synthetics.attributes.variables.extracted.response.cdn.cache.status` | The cache status as provided in associated cache header |
| `synthetics.attributes.variables.extracted.response.headers` | The response headers |
| `synthetics.attributes.variables.extracted.response.httpVersion` | The HTTP version |
| `synthetics.attributes.variables.extracted.response.redirects` | A list of redirections if any |
| `synthetics.attributes.variables.extracted.response.redirects.statusCode` | The HTTP status code for the redirect |
| `synthetics.attributes.variables.extracted.response.redirects.location` | The returned location to redirect to |
| `synthetics.attributes.variables.extracted.response.statusCode` | The response HTTP status code |

**Timings:**

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.timings.authentication` | The time spent for the authentication challenge (for example, NTLM) |
| `synthetics.attributes.variables.extracted.timings.download` | The time spent downloading the response |
| `synthetics.attributes.variables.extracted.timings.firstByte` | The time spent waiting for the first byte of response to be received |
| `synthetics.attributes.variables.extracted.timings.redirect` | The time spent in HTTP redirections |
| `synthetics.attributes.variables.extracted.timings.ssl` | The duration of the TLS handshake (only when testing an HTTPS endpoint) |

{% /if %}

<!-- DNS -->
{% if equals($protocol, "dns") %}

### DNS Protocol Variables

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.response.records.type` | DNS record type |
| `synthetics.attributes.variables.extracted.response.records.values` | DNS record values |

{% /if %}

<!-- SSL -->
{% if equals($protocol, "ssl") %}

### SSL Protocol Variables

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.cert` | SSL certificate information |
| `synthetics.attributes.variables.extracted.cipher` | Cipher suite used |
| `synthetics.attributes.variables.extracted.issuer` | Certificate issuer |
| `synthetics.attributes.variables.extracted.subject` | Certificate subject |
| `synthetics.attributes.variables.extracted.valid.from` | Certificate valid from date |
| `synthetics.attributes.variables.extracted.valid.to` | Certificate valid to date |
| `synthetics.attributes.variables.extracted.ocsp` | OCSP (Online Certificate Status Protocol) information |
| `synthetics.attributes.variables.extracted.timings.handshake` | SSL handshake timing |

{% /if %}

<!-- WebSocket -->
{% if equals($protocol, "websocket") %}

### WebSocket Protocol Variables

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.timings.open` | Time to open connection (in milliseconds) |
| `synthetics.attributes.variables.extracted.timings.receive` | Time to receive response |
| `synthetics.attributes.variables.extracted.handshake.request` | Handshake request data |
| `synthetics.attributes.variables.extracted.handshake.response` | Handshake response data |
| `synthetics.attributes.variables.extracted.request.message` | WebSocket request message |
| `synthetics.attributes.variables.extracted.response.message` | WebSocket response message |
| `synthetics.attributes.variables.extracted.close.reason` | Connection close reason |
| `synthetics.attributes.variables.extracted.close.statusCode` | Connection close status code |

{% /if %}

<!-- UDP -->
{% if equals($protocol, "udp") %}

### UDP Protocol Variables

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.request.message` | UDP request message |
| `synthetics.attributes.variables.extracted.response.message` | UDP response message |
| `synthetics.attributes.variables.extracted.timings.message` | Message timing |

{% /if %}

<!-- TCP -->
{% if equals($protocol, "tcp") %}

### TCP Protocol Variables

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.connectionOutcome` | Connection result |
| `synthetics.attributes.variables.extracted.netpath.routers.ip` | Router IP addresses |
| `synthetics.attributes.variables.extracted.traceroute.latency.min` | Minimum latency |
| `synthetics.attributes.variables.extracted.traceroute.latency.max` | Maximum latency |
| `synthetics.attributes.variables.extracted.traceroute.latency.avg` | Average latency |
| `synthetics.attributes.variables.extracted.traceroute.latency.stddev` | Standard deviation |
| `synthetics.attributes.variables.extracted.traceroute.latency.values` | Latency values array |

{% /if %}

<!-- ICMP -->
{% if equals($protocol, "icmp") %}

### ICMP Protocol Variables

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.traceroute` | Traceroute data (same structure as TCP traceroute) |
| `synthetics.attributes.variables.extracted.request.host` | Target host |
| `synthetics.attributes.variables.extracted.ping` | Ping results |
| `synthetics.attributes.variables.extracted.latency.min` | Minimum latency |
| `synthetics.attributes.variables.extracted.latency.max` | Maximum latency |
| `synthetics.attributes.variables.extracted.latency.avg` | Average latency |
| `synthetics.attributes.variables.extracted.latency.stddev` | Standard deviation |
| `synthetics.attributes.variables.extracted.latency.values` | Latency values array |

{% /if %}

<!-- gRPC -->
{% if equals($protocol, "grpc") %}

### gRPC Protocol Variables

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.callType` | Call type (`unary` or `healthcheck`) |
| `synthetics.attributes.variables.extracted.timings.rpc` | RPC call timing |
| `synthetics.attributes.variables.extracted.response.healthcheck.status` | Health check status |
| `synthetics.attributes.variables.extracted.request.message` | gRPC request message |
| `synthetics.attributes.variables.extracted.response.message` | gRPC response message |

{% /if %}

<!-- Test execution variables -->
{% if equals($synthetics_variables, "execution") %}

### Test Execution Variables

Path: `synthetics` (various shortcuts)

Use these variables to access common test execution data such as failure messages, step counts, duration, and tags.

| Variable | Description |
|----------|-------------|
| `{{synthetics.failed_step.failure.message}}` | The error message (for example, `Element's content should match the given regex`). |
| `{{synthetics.failed_step.url}}` | The URL of the failed step (for example, `https://www.datadoghq.com/blog/`). |
| `{{synthetics.attributes.result.response.statusCode}}` | The HTTP status code (for example, `403`). </br><strong>Tip:</strong> Review the <a href="/synthetics/notifications/conditional_alerting#send-alerts-based-on-status-code">conditional alerting</a> page for an example of how to use this variable in a notification. |
| `{{synthetics.result.step_count}}` | Number of steps (for example, `4`). |
| `{{synthetics.result.duration}}` | Duration of the test run (in milliseconds) (for example, `9096`). |
| `{{tags}}` | Lists all the tags added to the synthetics test. To access individual tag values, use `{{tags.<tag-key>}}`. For example, if your test is tagged with `env:prod`, use `{{tags.env}}` to return the tag value `prod`. |

{% /if %}

<!-- Test metadata variables -->
{% if equals($synthetics_variables, "test_metadata") %}

### Test Metadata Variables

Path: `synthetics.attributes.test`

These variables provide information about the test configuration.

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.test}}` | The `test` object contains information about the test like its `name`, `type`, `subtype`, and `id` |
| `{{synthetics.attributes.test.name}}` | The name of the test |
| `{{synthetics.attributes.test.type}}` | Test type (for example, `api`) |
| `{{synthetics.attributes.test.subType}}` | Subtype for API tests (for example, `http`, `dns`, and `multi`) |
| `{{synthetics.attributes.test.id}}` | The test's public ID (for example, `abc-def-ghi`) |

**Location Information:**

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.location}}` | The `location` object contains information about the location of where the test is run from |
| `{{synthetics.attributes.location.id}}` | Location ID (for example, `aws:eu-central-1`) |
| `{{synthetics.attributes.location.name}}` | Name of the location (for example, `Frankfurt (AWS)`) |
| `{{synthetics.attributes.location.privateLocation}}` | `true` for Private Locations |

{% /if %}

<!-- Device information variables -->
{% if equals($synthetics_variables, "device_info") %}

### Device Information Variables

**Note:** Device information is not applicable to API tests. This section is relevant for Browser and Mobile tests only.

{% /if %}

<!-- Execution results variables -->
{% if equals($synthetics_variables, "execution_results") %}

### Execution Results Variables

Path: `synthetics.attributes.result`

These variables contain information about the executed test run and failure details.

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.result}}` | The `result` object contains information about the executed test run |
| `{{synthetics.attributes.result.id}}` | Unique result ID |
| `{{synthetics.attributes.result.status}}` | Test execution status (for example, `passed` or `failed`) |
| `{{synthetics.attributes.result.duration}}` | Test duration in milliseconds |
| `{{synthetics.attributes.result.testStartedAt}}` | Test start timestamp (epoch milliseconds) |
| `{{synthetics.attributes.result.testFinishedAt}}` | Test finish timestamp (epoch milliseconds) |
| `{{synthetics.attributes.result.testTriggeredAt}}` | Test trigger timestamp (epoch milliseconds) |

**Failure Information:**

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.result.failure}}` | The `failure` object contains information about why the test failed |
| `{{synthetics.attributes.result.failure.message}}` | The failure message |
| `{{synthetics.attributes.result.failure.code}}` | The failure code |

<p>For a complete list of API test error codes, see <a href="/synthetics/api_tests/errors/">API Testing Errors</a>. Review the <a href="/synthetics/notifications/conditional_alerting#send-alerts-based-on-an-error-code">conditional alerting</a> page for an example of how to use the <code>synthetics.attributes.result.failure</code> variable in a notification.</p>

**Step Counts (Multistep API Tests):**

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.count}}` | The `count` object contains step statistics about the test |
| `{{synthetics.attributes.count.steps.total}}` | The total number of steps |
| `{{synthetics.attributes.count.steps.completed}}` | The number of steps that were run |
| `{{synthetics.attributes.count.errors}}` | The total number of errors that occurred while running the test |
| `{{synthetics.attributes.count.hops}}` | The number of traceroute hops for TCP and ICMP tests |

{% /if %}

<!-- Failed step information variables -->
{% if equals($synthetics_variables, "failed_step_info") %}

### Failed Step Information Variables

**Applies to:** Multistep API tests

The `{{synthetics.failed_step}}` object provides a shortcut to the step that caused the test to fail, eliminating the need to reference `{{synthetics.attributes.result.steps.<step-index>}}` directly.

| Shortcut | Maps To |
|----------|---------|
| `{{synthetics.failed_step.name}}` | `{{synthetics.attributes.result.steps.<step-index>.name}}` |
| `{{synthetics.failed_step.failure.message}}` | `{{synthetics.attributes.result.steps.<step-index>.failure.message}}` |
| `{{synthetics.failed_step.url}}` | `{{synthetics.attributes.result.steps.<step-index>.url}}` |

{% /if %}

<!-- Local & Global variables -->
{% if equals($synthetics_variables, "local_global_variables") %}

### Local & Global Variables

Path: `synthetics.attributes.result.variables`

These variables provide access to local and global variable values used during test execution.

**Local Config Variables:**

These are local variables configured for API tests or defined outside individual steps in Multistep API tests. This also includes variables created by JavaScript code execution.

Located at `{{synthetics.attributes.result.variables.config}}`:

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.result.variables.config.name}}` | Variable name |
| `{{synthetics.attributes.result.variables.config.type}}` | Variable type |
| `{{synthetics.attributes.result.variables.config.secure}}` | Whether the variable value is obfuscated |
| `{{synthetics.attributes.result.variables.config.value}}` | Variable value (non-obfuscated only) |

<div class="alert alert-tip">Review the <a href="/synthetics/notifications/advanced_notifications/#use-local-variables-in-a-notification">advanced notifications</a> page for an example of how to use local variables in a notification.</div>

**Global Variables:**

These are extracted variables whose value updates a global variable value.

Available only for **successful test results** and **recovery notifications**.

Located at `{{synthetics.attributes.result.variables.extracted}}`:

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.result.variables.extracted.id}}` | Global variable ID |
| `{{synthetics.attributes.result.variables.extracted.name}}` | Variable name |
| `{{synthetics.attributes.result.variables.extracted.secure}}` | Whether the variable value is obfuscated |
| `{{synthetics.attributes.result.variables.extracted.val}}` | Variable value (note: uses `.val`, not `.value`) |

{% /if %}

<!-- Extracted variables -->
{% if equals($synthetics_variables, "extracted") %}

### Extracted Variables

Path: `synthetics.attributes.variables.extracted`

These are step execution metadata and results containing detailed information about how each step ran, including response data, timing metrics, and protocol-specific details. These values are only available when the step completes successfully.

**General Step Properties:**

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.steps.allowFailure` | Whether the step is allowed to fail without failing the entire test |
| `synthetics.attributes.variables.extracted.steps.duration` | Step execution duration in milliseconds |
| `synthetics.attributes.variables.extracted.steps.failure` | Failure information object containing `.code` and `.message` |
| `synthetics.attributes.variables.extracted.steps.id` | Unique step identifier |
| `synthetics.attributes.variables.extracted.steps.isCritical` | Whether the step is critical to the test |
| `synthetics.attributes.variables.extracted.steps.status` | Step execution status |
| `synthetics.attributes.variables.extracted.steps.type` | Type of step being executed |

**Multistep API Tests:**

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.name` | Step name |
| `synthetics.attributes.variables.extracted.type` | Step type |

**Protocol-Specific Variables:**

Refer to the Protocol filter above to view variables specific to HTTP, DNS, SSL, WebSocket, UDP, TCP, ICMP, or gRPC tests.

{% /if %}

<!-- Step variables -->
{% if equals($synthetics_variables, "step") %}

### Step Variables

Path: `synthetics.attributes.result.steps`

**Applies to:** Multistep API tests

Access step data by index, name, or ID to reference specific steps in your notification messages.

Each step exposes the following properties: `.id`, `.status`, `.type`, `.duration`, `.description`, `.failure.message`, `.code`, and `.url`.

**Accessing Steps:**

You can reference steps in three ways:

**By index (0-based):**

Use positive numbers to count from the beginning, or negative numbers to count from the end:

| Syntax | Description |
|--------|-------------|
| `synthetics.attributes.result.steps.0` | First step |
| `synthetics.attributes.result.steps.1` | Second step |
| `synthetics.attributes.result.steps.-1` | Last step |
| `synthetics.attributes.result.steps.-2` | Second to last step |

**By step name:**

Use the step name in brackets:

`.steps[Step Name]`

**By step ID:**

Use the step's unique identifier:

`.steps.abc-def-ghi`

**Accessing Step Properties:**

Combine any reference method with a property:

- `{{synthetics.attributes.result.steps.-1.status}}` - Status of the last step
- `{{synthetics.attributes.result.steps[HTTP Request].status}}` - Status of the step named "HTTP Request"
- `{{synthetics.attributes.result.steps.abc-def-ghi.status}}` - Status of the step with step ID "abc-def-ghi"

{% /if %}

<div class="alert alert-tip">Review the <a href="/synthetics/notifications/conditional_alerting#send-alerts-to-a-specific-slack-channel-based-on-failed-step">conditional alerting</a> page for an example of how to use the <code>synthetics.attributes.result.steps</code> variable in a Slack notification based on a failed step.</div>



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/explore/results_explorer
