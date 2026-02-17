---
title: Synthetic Monitoring Template Variables
aliases:
  - /synthetics/guide/synthetic-test-monitors/
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

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. These variables are accessed using the `synthetics.attributes` prefix. 

**Note:** Not all variables are available for every test type. You may need to test different outputs to verify the data returned. You can export the result as a JSON file from the **Actions** tab of a test run in the [Results Explorer][1], then reference the path directly within your monitor configuration. Additionally, when running synthetic tests on a private location, ensure the private location is on version 1.59.0 or later, as earlier versions may not fully support all of the variables.

{{< img src="synthetics/notifications/action_tab.png" alt="Actions tab from the Synthetics Result Explorer with Export Result JSON highlighted" style="width:90%;" >}}

The following table provides a reference to the available variable categories and their base paths:

| Section | Path |
|---------|------|
| [Test execution variables](#test-execution-variables) | `synthetics` (various shortcuts) |
| [Result attributes](#result-attributes) | `synthetics.attributes` |
| [Local and global variables](#local-and-global-variables) | `synthetics.attributes.result.variables` |
| [Extracted variable values](#extracted-variable-values) | `synthetics.attributes.result.steps.<step-index>.extractedValue` (Browser/Mobile) |
| [Step execution details](#step-execution-details) | `synthetics.attributes.variables.extracted` |
| [Step summary](#step-summary) | `synthetics.attributes.result.steps` |

## Available variables

### Test execution variables

Path: `synthetics` (various shortcuts)

Use these variables to access common test execution data such as failure messages, step counts, duration, and tags.

`{{synthetics.failed_step.failure.message}}`
: The error message (for example, `Element's content should match the given regex`).

`{{synthetics.failed_step.url}}`
: The URL of the failed step (for example, `https://www.datadoghq.com/blog/`).

`{{synthetics.attributes.result.response.statusCode}}`
: The HTTP status code (for example, `403`). </br>
<strong>Tip:</strong> Review the <a href="/synthetics/notifications/conditional_alerting#send-alerts-based-on-status-code">conditional alerting</a> page for an example of how to use this variable in a notification.

`{{synthetics.result.step_count}}`
: Number of steps (for example, `4`).

`{{synthetics.result.duration}}`
: Duration of the test run (in milliseconds) (for example, `9096`).

`{{tags}}`
: Lists all the tags added to the synthetics test.
: To access individual tag values, use `{{tags.<tag-key>}}`. For example, if your test is tagged with `env:prod`, use `{{tags.env}}` to return the tag value `prod`.

### Result attributes

Path: `synthetics.attributes`

Use these variables to include details about the test, execution location, device, counts, and result status in your notification messages.

{{< tabs >}}
{{% tab "Test Info" %}}

`{{synthetics.attributes.test}}`
: The `test` object contains information about the test like its `name`, `type`, `subtype`, and `id`

`{{synthetics.attributes.test.name}}`
: The name of the test

`{{synthetics.attributes.test.type}}`
: Test type (for example, `api`)

`{{synthetics.attributes.test.subType}}`
: Subtype for API tests (for example, `http`, `dns`, and `multi`)

`{{synthetics.attributes.test.id}}`
: The test's public ID (for example, `abc-def-ghi`)

{{% /tab %}}
{{% tab "Location" %}}

`{{synthetics.attributes.location}}`
: The `location` object contains information about the location of where the test is run from

`{{synthetics.attributes.location.id}}`
: Location ID (for example, `aws:eu-central-1`)

`{{synthetics.attributes.location.name}}`
: Name of the location (for example, `Frankfurt (AWS)`)

`{{synthetics.attributes.location.privateLocation}}`
: `true` for Private Locations

{{% /tab %}}
{{% tab "Device" %}}

Applies to Browser and Mobile tests.

`{{synthetics.attributes.device}}`
: The `device` object contains information about the device on which the test is run on

`{{synthetics.attributes.device.id}}`
: Device identifier

`{{synthetics.attributes.device.name}}`
: Human-readable device name

`{{synthetics.attributes.device.type}}`
: Device type classification

`{{synthetics.attributes.device.width}}`, `{{synthetics.attributes.device.height}}`
: Screen resolution dimensions

`{{synthetics.attributes.device.browser.type}}`
: Browser type (browser tests only)

`{{synthetics.attributes.device.platform.name}}`, `{{synthetics.attributes.device.platform.version}}`
: Platform information (mobile tests only)

{{% /tab %}}
{{% tab "Result" %}}

`{{synthetics.attributes.result}}`
: The `result` object contains information about the executed test run

`{{synthetics.attributes.result.id}}`
: Unique result ID

`{{synthetics.attributes.result.status}}`
: Test execution status (for example, `passed` or `failed`)

`{{synthetics.attributes.result.duration}}`
: Test duration in milliseconds

`{{synthetics.attributes.result.testStartedAt}}`, `{{synthetics.attributes.result.testFinishedAt}}`, `{{synthetics.attributes.result.testTriggeredAt}}`
: Epoch timestamps in milliseconds

`{{synthetics.attributes.result.failure}}`
: The `failure` object contains information about why the test failed

`{{synthetics.attributes.result.failure.message}}`
: The failure message

`{{synthetics.attributes.result.failure.code}}`
: The failure code

<p>For a complete list of API test error codes, see <a href="/synthetics/api_tests/errors/">API Testing Errors</a>. Review the <a href="/synthetics/notifications/conditional_alerting#send-alerts-based-on-an-error-code">conditional alerting</a> page for an example of how to use the <code>synthetics.attributes.result.failure</code> variable in a notification.</p>

{{% /tab %}}
{{% tab "Count" %}}

Applies to Multistep, Browser, and Mobile tests.

`{{synthetics.attributes.count}}`
: The `count` object contains step statistics about the test

`{{synthetics.attributes.count.steps.total}}`
: The total number of steps

`{{synthetics.attributes.count.steps.completed}}`
: The number of steps that were run

`{{synthetics.attributes.count.errors}}`
: The total number of errors that occurred while running the test. For multistep and mobile tests, this is the number of failed steps. For browser tests, this is the sum of all browser errors. 

`{{synthetics.attributes.count.hops}}`
: The number of traceroute hops for TCP and ICMP tests

{{% /tab %}}
{{% tab "Failed Step" %}}

Applies to Multistep, Browser, and Mobile tests.

`{{synthetics.failed_step}}`
: The `failed_step` object provides a shortcut to the step that caused the test to fail, eliminating the need to reference `{{synthetics.attributes.result.steps.<step-index>}}` directly. </br>

<table>
<thead>
<tr>
<th style="min-width: 240px;">Shortcut</th>
<th>Test Type</th>
<th>Maps To</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>{{synthetics.failed_step.name}}</code></td>
<td>Multistep API</td>
<td><code>{{synthetics.attributes.result.steps.&lt;step-index&gt;.name}}</code></td>
</tr>
<tr>
<td><code>{{synthetics.failed_step.description}}</code></td>
<td>Browser, Mobile</td>
<td><code>{{synthetics.attributes.result.steps.&lt;step-index&gt;.description}}</code></td>
</tr>
</tbody>
</table>

<div class="alert alert-tip">Review the <a href="/synthetics/notifications/conditional_alerting/#send-alerts-to-a-specific-slack-channel-based-on-failed-step-using-a-variable-shortcut">conditional alerting</a> page for an example of how to use the <code>synthetics.failed_step.description</code> shortcut variable in a Browser Test notification.</div>

{{% /tab %}}
{{< /tabs >}}

### Local and global variables

Path: `synthetics.attributes.result.variables`

These variables provide access to local and global variable values used during test execution. Use them to include variable names, types, and values in your notifications.

{{< tabs >}}
{{% tab "Local config variables" %}}

These are local variables configured for API tests or defined outside individual steps in step-based tests. This also includes variables created by JavaScript code execution.

Located at `{{synthetics.attributes.result.variables.config}}`:

`{{synthetics.attributes.result.variables.config.name}}`
: Variable name

`{{synthetics.attributes.result.variables.config.type}}`
: Variable type

`{{synthetics.attributes.result.variables.config.secure}}`
: Whether the variable value is obfuscated

`{{synthetics.attributes.result.variables.config.value}}`
: Variable value (non-obfuscated only)

<div class="alert alert-tip">Review the <a href="/synthetics/notifications/advanced_notifications/#use-local-variables-in-a-notification">advanced notifications</a> page for an example of how to use local variables in a notification.</div>

{{% /tab %}}
{{% tab "Global variables" %}}

These are extracted variables whose value updates a global variable value. 

Available only for **successful test results** and **recovery notifications**.

Located at `{{synthetics.attributes.result.variables.extracted}}`:

`{{synthetics.attributes.result.variables.extracted.id}}`
: Global variable ID

`{{synthetics.attributes.result.variables.extracted.name}}`
: Variable name

`{{synthetics.attributes.result.variables.extracted.secure}}`
: Whether the variable value is obfuscated

`{{synthetics.attributes.result.variables.extracted.val}}`
: Variable value (note: uses `.val`, not `.value`)

{{% /tab %}}
{{< /tabs >}}

### Extracted variable values

Path: `synthetics.attributes.result.steps.<step-index>.extractedValue`

**Applies to:** Browser and Mobile tests.

These are the actual variable values that a step captured during test execution. For example, if you have a Browser test step that extracts text from a page element into a variable, this is where you access that extracted value.

For information on how to access the `<step-index>`, see the [step summary](#step-summary) section below.

**Note:** For Multistep API tests, use [API tests][2] instead.

`synthetics.attributes.result.steps.<step-index>.extractedValue.name`
: Variable name

`synthetics.attributes.result.steps.<step-index>.extractedValue.secure`
: Whether the variable value is obfuscated

`synthetics.attributes.result.steps.<step-index>.extractedValue.value`
: Variable value (if step was successful)

### Step execution details

Path: `synthetics.attributes.variables.extracted`

These are step execution metadata and results containing detailed information about how each step ran, including response data, timing metrics, and protocol-specific details. These values are only available when the step completes successfully.

{{< tabs >}}
{{% tab "General steps" %}}

**For multistep/browser/mobile tests**:

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

**Subtest information:**

`synthetics.attributes.variables.extracted.steps.subTest.id`
: Subtest identifier

`synthetics.attributes.variables.extracted.steps.subStep.parentStep.id`
: Parent step identifier

`synthetics.attributes.variables.extracted.steps.subStep.parentTest.id`
: Parent test identifier

`synthetics.attributes.variables.extracted.steps.subStep.level`
: Nesting level (1 for subtests, 2 for subtests of subtests)

{{% /tab %}}
{{% tab "Browser Tests" %}}

**General:**

`{{synthetics.attributes.result.startUrl}}`
: URL from test configuration

**Steps:**

`synthetics.attributes.variables.extracted.apiTest.request`
: API test request configuration (only for "Run API Test" steps where `type` is `runApiTest`)

`synthetics.attributes.variables.extracted.apiTest.result`
: API test result data (similar to `attributes.result` for API tests)

`synthetics.attributes.variables.extracted.assertionResult.expected`
: Expected value for assertions

`synthetics.attributes.variables.extracted.assertionResults.checkType`
: Type of assertion check

`synthetics.attributes.variables.extracted.assertionResults.actual`
: Actual value found during assertion

`synthetics.attributes.variables.extracted.browserErrors`
: List of browser errors encountered

`synthetics.attributes.variables.extracted.timings.firstByte`
: Time to first byte

`synthetics.attributes.variables.extracted.timings.tcp`
: TCP connection timing

`synthetics.attributes.variables.extracted.description`
: Step description

{{% /tab %}}
{{% tab "Mobile Tests" %}}

`synthetics.attributes.variables.extracted.application.versionId`
: Mobile application version identifier

`synthetics.attributes.variables.extracted.apiTest`
: API test data (for API test steps within mobile tests)

`synthetics.attributes.variables.extracted.description`
: Step description

{{% /tab %}}
{{% tab "API Tests" %}}

**Multistep:**

`synthetics.attributes.variables.extracted.name`
: Step name

`synthetics.attributes.variables.extracted.type`
: Step type

*Note: Follow regular API fields per subType*

{{% /tab %}}
{{% tab "Network tests" %}}

{{% collapse-content title="Websocket" level="h4" expanded=false %}}

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

{{< /collapse-content >}}

{{% collapse-content title= "gRPC" level="h4" expanded=false %}}

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

{{< /collapse-content >}}

{{% collapse-content title= "UDP" level="h4" expanded=false %}}

`synthetics.attributes.variables.extracted.request.message`
: UDP request message

`synthetics.attributes.variables.extracted.response.message`
: UDP response message

`synthetics.attributes.variables.extracted.timings.message`
: Message timing

{{< /collapse-content >}}

{{% collapse-content title= "TCP" level="h4" expanded=false %}}

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

{{< /collapse-content >}}

{{% collapse-content title= "ICMP" level="h4" expanded=false %}}

`synthetics.attributes.variables.extracted.traceroute`
: Same structure as TCP traceroute

`synthetics.attributes.variables.extracted.request.host`
: Target host

`synthetics.attributes.variables.extracted.ping`
: Ping results

`synthetics.attributes.variables.extracted.latency.min`, `synthetics.attributes.variables.extracted.latency.max`, `synthetics.attributes.variables.extracted.latency.avg`, `synthetics.attributes.variables.extracted.latency.stddev`, `synthetics.attributes.variables.extracted.latency.values`
: Latency measurements (same as TCP)

{{< /collapse-content >}}

{{% /tab %}}
{{% tab "Protocol tests" %}}

{{% collapse-content title= "SSL" level="h4" expanded=false %}}

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

{{< /collapse-content >}}

{{% collapse-content title= "DNS" level="h4" expanded=false %}}

`synthetics.attributes.variables.extracted.response.records.type`
: DNS record type

`synthetics.attributes.variables.extracted.response.records.values`
: DNS record values

{{< /collapse-content >}}

{{% collapse-content title= "HTTP" level="h4" expanded=false %}}

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

{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

### Step summary

Path: `synthetics.attributes.result.steps`

Access step data by index, name, or ID to reference specific steps in your notification messages.

Each step exposes the following properties: `.id`, `.status`, `.type`, `.duration`, `.description`, `.failure.message`, `.code`, and `.url`.

You can reference steps in three ways:

#### By index (0-based)

Use positive numbers to count from the beginning, or negative numbers to count from the end:

| Syntax | Description |
|--------|-------------|
| `synthetics.attributes.result.steps.0` | First step |
| `synthetics.attributes.result.steps.1` | Second step |
| `synthetics.attributes.result.steps.-1` | Last step |
| `synthetics.attributes.result.steps.-2` | Second to last step |

#### By step name

Use the step name in brackets:

`.steps[Click button]`

#### By step ID

Use the step's unique identifier:

`.steps.abc-def-ghi`

<div class="alert alert-tip">Review the <a href="/synthetics/notifications/conditional_alerting#send-alerts-to-a-specific-slack-channel-based-on-failed-step">conditional alerting</a> page for an example of how to use the <code>synthetics.attributes.result.step</code> variable in a Slack notification based on a failed step.</div>

#### Accessing step properties

Combine any reference method with a property:

- `{{synthetics.attributes.result.steps.-1.status}}` - Status of the last step
- `{{synthetics.attributes.result.steps[Click button].status}}` - Status of the step named "Click button"
- `{{synthetics.attributes.result.steps.abc-def-ghi.status}}` - Status of the step with step ID "abc-def-ghi"

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/explore/results_explorer
[2]: /synthetics/notifications/template_variables/?tab=apitests#step-execution-details
[3]: /synthetics/notifications/conditional_alerting#send-alerts-based-on-an-error-code
[4]: /synthetics/api_tests/errors/
[5]: /synthetics/notifications/conditional_alerting#send-alerts-based-on-status-code
[6]: /synthetics/notifications/conditional_alerting#send-alerts-to-a-specific-slack-channel-based-on-failed-step

