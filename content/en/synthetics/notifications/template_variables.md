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
---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. These variables are accessed using the `synthetics.attributes` prefix. 

**Note:** Not all variables are available for every test type. You may need to test different outputs to verify the data returned. You can export the result as a JSON file from the **Actions** tab of a test run in the [Results Explorer][1], then reference the path directly within your monitor configuration. 

{{< img src="synthetics/notifications/action_tab.png" alt="Actions tab from the Synthetics Result Explorer with Export Result JSON highlighted" style="width:90%;" >}}

## Available variables

### Test execution variables

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

Applies to browser and mobile tests.

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
{{< /tabs >}}

### Result variables

These variables provide access to local and global variable values used during test execution. Use them to include variable names, types, and values in your notifications. These variables are accessed with the `{{synthetics.attributes.result}}` prefix.

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
{{% tab "Step extracted variables" %}}

For tests with steps, step data is contained in `{{synthetics.attributes.result.steps.<step-index>.extractedValue}}`. For information on how to access the `<step-index>` see the [step summary](#step-summary) section below.

`synthetics.attributes.result.steps.<step-index>.extractedValue.name`
: Variable name

`synthetics.attributes.result.steps.<step-index>.extractedValue.secure`
: Whether the variable value is obfuscated

`synthetics.attributes.result.steps.<step-index>.extractedValue.value`
: Variable value (if step was successful)

{{% /tab %}}
{{< /tabs >}}

### Variables extracted by steps

For multistep API, browser, and mobile tests, extracted variables are available at the step level within the `synthetics.attributes.variables.extracted` property. These values are only available when the step completes successfully.

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

**Non-Multistep:**

`synthetics.attributes.variables.extracted.assertions.actual`
: Actual value from assertion

`synthetics.attributes.variables.extracted.assertions.expected`
: Expected value for assertion

`synthetics.attributes.variables.extracted.assertions.operator`
: Assertion operator

`synthetics.attributes.variables.extracted.assertions.type`
: Assertion type

`synthetics.attributes.variables.extracted.dnsResolution.resolvedIp`
: Resolved IP address

`synthetics.attributes.variables.extracted.dnsResolution.server`
: DNS server used

`synthetics.attributes.variables.extracted.timings.dns`
: DNS resolution time

`synthetics.attributes.variables.extracted.timings.tcp`
: TCP connection time

`synthetics.attributes.variables.extracted.request.url`
: Request URL

`synthetics.attributes.variables.extracted.request.host`
: Request host

`synthetics.attributes.variables.extracted.response.body`
: Response body content

`synthetics.attributes.variables.extracted.response.statusCode`
: HTTP status code

`synthetics.attributes.variables.extracted.response.headers`
: Response headers

`synthetics.attributes.variables.extracted.response.httpVersion`
: HTTP version

`synthetics.attributes.variables.extracted.response.redirects`
: Redirect information

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

{{% /tab %}}
{{< /tabs >}}

### Step summary

Access step data by index, name, or ID to reference specific steps in your notification messages. This section also includes summary counts for total steps, completed steps, and errors.

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

#### Accessing step properties

Combine any reference method with a property:

- `{{synthetics.attributes.result.steps.-1.status}}` - Status of the last step
- `{synthetics.attributes.result.steps[Click button].status}}` - Status of the step named "Click button"
- `{{synthetics.attributes.result.steps.abc-def-ghi.status}}` - Status of the step with step ID "abc-def-ghi"

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/explore/results_explorer