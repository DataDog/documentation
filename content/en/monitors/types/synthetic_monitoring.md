---
title: Synthetic Monitoring enhanced monitor messages and notifications
aliases:
  - /synthetics/guide/synthetic-test-monitors/
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/guide/integrate-monitors-with-statuspage/"
  tag: "Documentation"
  text: "Learn how to integrate monitors with Statuspage"
- link: "/synthetics/guide/synthetic-test-monitors/"
  tag: "Guide"
  text: "Use Synthetic test monitors"
products:
- name: Browser Tests
  url: /synthetics/browser_tests/
  icon: browser
- name: API Tests
  url: /synthetics/api_tests/
  icon: api
- name: Mobile Application Tests
  url: /synthetics/mobile_app_testing/
  icon: device-mobile
- name: Multistep API Tests
  url: /synthetics/multistep/
  icon: cog-multi
---

{{< product-availability names="Browser Tests,API Tests,Mobile Application Tests,Multistep API Tests" >}}
## Overview

Customize your Synthetic Monitoring monitor notifications to provide meaningful context for on-call responders. Datadog's message templating system enables you to enrich alerts with test details, extract data from test results, and route notifications conditionally based on the failure.

Monitor messages in Synthetic Monitoring consist of:

- **Title**: The name of the monitor.
- **Custom message**: Optional text written when creating the monitor.
- **Auto-appended summary**: Includes failing locations, error messages, and links to the test.
- **Footer**: Includes details from the last failed test run.

You can use [pre-filled content](#pre-filled-monitor-messages) to start with a structured starting point, [templated variables](#template-variables) to enrich your notifications, and [conditional logic](#conditional-alerting) to adapt alert messages across different test types and workflows. For more complex customization, [advanced usage](#advanced-usage) offers the ability to structure complex messages using handlebars templating.

## Use cases

Synthetic Monitoring templating system supports a range of use cases:

- **Basic context**: Include the test name, time, and locations.
- **Failure specifics**: Add the failing step, error message, test duration, or response body.
- **Step metadata**: Reference step names, order, execution time, and status.
- **Variable values**: Insert test variables (for example, status code, response content).
- **Conditional routing**: Route alerts to specific teams based on which step failed.
- **Screenshots**: Browser and Mobile tests include screenshots in the message footer.
- **Location metadata**: Include the failing location (for example, `private` or `managed`) in the message.

## Create a Synthetic test monitor

Create a monitor in the **Monitor** section to send notifications when a Synthetic Monitoring test is failing. Monitors are associated with the Synthetic test you create and link to the alerting conditions set in your Synthetic test configuration.

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_2.png" alt="Creating a monitor in your Synthetic test" style="width:90%;">}}

- Customize the monitor name to search for it on the [**Manage Monitors**][2] page. To find a Synthetic test monitor, filter on `type:synthetics` in the search bar. You can use monitor [conditional variables][3] to characterize the notification message based on test state. 

- The Synthetic test monitor integrates with notification channels such as email, Slack, Pagerduty, and Microsoft Teams. For more information, see [Notifications][4].

- If you have multiple layers of notifications (for example, notifying more teams the longer a Synthetic test is alerting), Datadog recommends enabling [renotification][5] on your Synthetic monitors.

### Tailor monitor notifications

Depending on your incident management strategy, you may want to involve multiple teams when a Synthetic test alerts. To notify Team B only on subsequent alerts after the first alert, surround the notification to Team B with `{{#is_renotify}}` and `{{/is_renotify}`. Use [conditional variables][3] to further characterize the notification message based on monitor attributes. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle_2.png" alt="Select the amount of time for the alerting monitor to renotify" style="width:90%;">}}

To enable renotification, toggle **Enable renotification** and select a time interval from the dropdown menu.

## Pre-filled monitor messages

Synthetic Monitoring provides pre-filled messages with metadata such as:

- Test name
- Monitor ID
- Failing locations
- Last failed test run information
- Time the test started failing

These values appear by default in most notification channels. You can override or extend the message using [templating](#template-variables).

   {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Synthetic Monitoring monitor section, highlighting the pre-filled monitor messages" style="width:100%;" >}}

Examples:

{{< tabs >}}
{{% tab "API request response" %}}

**Request:**
```handlebars
{{#with synthetics.attributes.result.request}}
We made a {{method}} request to `{{{url}}}`{{#if headers}} with the following headers:

{{#each headers}}
{{@key}}={{this}}
{{/each}}

{{/if}}
{{#if body}}And the body:

{{{body}}}

{{/if}}
{{/with}}
```

**Response:**
```handlebars
{{#with synthetics.attributes.result.response}}
We received an HTTP {{httpVersion}} response with a {{statusCode}} status code{{#if headers}} with the following headers:

{{#each headers}}
{{@key}}={{this}}
{{/each}}

{{/if}}
{{#if redirects}}
Redirections:
{{#each redirects}}
* {{statusCode}} redirect to `{{{location}}}`
{{/each}}
{{/if}}
The body's size was {{eval "humanize_bytes(bodySize)"}}{{#if body}} and contained:

{{{body}}}

{{/if}}
{{/with}}
```

{{% /tab %}}
{{% tab "WebSocket tests" %}}

```handlebars
{{! Websocket request and response details }}
{{#with synthetics.attributes.result}}
{{#if handshake }}
The handshake received a response with the {{handshake.response.statusCode}} status code.
{{/if}}
{{#if request}}
A WebSocket request was made with the message:

{{{request.message}}}

{{/if}}
{{#if response}}
and the response closed with status code {{response.close.statusCode}} and reason `{{response.close.reason}}`
{{#if response.message}}, containing the message:

{{{response.message}}}

{{else}}.{{/if}}
{{/if}}
{{/with}}
```

{{% /tab %}}
{{% tab "API tests variables" %}}

Iterate over extracted variables for API tests:

**Config variables:**
```handlebars
{{#each synthetics.attributes.result.variables.config}}
* **Name:** {{name}}
  Type: {{type}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{value}}{{/if}}
{{/each}}
```

**Extracted Variables (Only visible for recovery notifications):**
```handlebars
{{#each synthetics.attributes.result.variables.extracted}}
* **Name:** {{name}}
  Global Variable ID: {{id}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{val}}{{/if}}
{{/each}}
```

{{% /tab %}}
{{% tab "Multistep API variables" %}}

Iterate over steps extracting variables for multistep API tests:

```handlebars
{{! List extracted variables across all successful steps }}
# Extracted Variables
{{#each synthetics.attributes.result.steps}}
  {{#each variables.extracted}}
  * **Name**: `{{name}}`
    Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}`{{{val}}}`{{/if}}
  {{/each}}
{{/each}}
```

{{% /tab %}}
{{% tab "Browser and mobile test variables" %}}

Iterate over steps extracting variables for browser and mobile tests:

```handlebars
{{#each synthetics.attributes.result.steps}}
  {{#if extractedValue}}
  * **Name**: {{extractedValue.name}}
    **Value:** {{#if extractedValue.secure}}*Obfuscated (value hidden)*{{else}}{{extractedValue.value}}{{/if}}
  {{/if}}
{{/each}}
```

{{% /tab %}}
{{< /tabs >}}

## Template variables

Template variables allow you to insert values from the test results and configuration into the message and are accessed using the standard `synthetics.attributes` prefix. For example:

```handlebars
Test failed at step {{synthetics.failed_step.name}} with error: {{synthetics.failed_step.failure.message}}.
```

### Common variable shortcuts

`{{synthetics.failed_step.name}}`
: The name of the failing step (for example, `Test div #title content`).

`{{synthetics.failed_step.failure.message}}`
: The error message (for example, `Element's content should match the given regex`).

`{{synthetics.failed_step.url}}`
: The URL of the failed step (for example, `https://www.datadoghq.com/blog/`).

`{{synthetics.attributes.result.response.statusCode}}`
: The HTTP status code (for example, `403`).

`{{synthetics.result.step_count}}`
: Number of steps (for example, `4`).

`{{synthetics.result.duration}}`
: Duration of the test run (in milliseconds) (for example, `9096`).

`{{tags.env}}`
: The environment tag value (for example, `prod`).

**Note:** Not all variables are available for every test type. You may need to test different outputs to verify the data returned.

### Result attributes

{{< tabs >}}
{{% tab "Test Info" %}}

`.test`
: Info about the test

`.test.id`
: Public ID (for example, `abc-def-ghi`)

`.test.type`
: Test type (for example, `api`)

`.test.subType`
: Subtype for API tests (for example, `http`)

{{% /tab %}}
{{% tab "Location" %}}

`.location.id`
: Location ID (for example, `aws:eu-central-1`)

`.location.privateLocation`
: `true` for Private Locations

{{% /tab %}}
{{% tab "Device" %}}

Applies to browser and mobile tests.

`.device.id`
: Device identifier

`.device.name`
: Human-readable device name

`.device.type`
: Device type classification

`.device.resolution.width`, `.device.resolution.height`
: Screen resolution dimensions

`.device.browser.type`
: Browser type (browser tests only)

`.device.platform.name`, `.device.platform.version`
: Platform information (mobile tests only)

**Example values:**
```json
{
  "device": {
    "id": "chrome.laptop_large",
    "name": "Laptop Large",
    "type": "laptop",
    "resolution": {"width": 1440, "height": 1100},
    "browser": {"type": "Chrome"},
    "platform": {"name": "Android", "version": "14"}
  }
}
```

{{% /tab %}}
{{% tab "Result" %}}

`.result.id`
: Unique result ID

`.result.status`
: Test execution status

`.result.duration`
: Test duration in milliseconds

`.result.testStartedAt`, `.result.testFinishedAt`, `.result.testTriggeredAt`
: Epoch timestamps in milliseconds

`.result.failure.message`
: Description of failure

`.result.failure.code`
: Error code

**Example values:**
```json
{
  "result": {
    "id": "3015485096247415772",
    "status": "failed",
    "duration": 9096,
    "testStartedAt": 1743760758904,
    "testFinishedAt": 1743760772025,
    "testTriggeredAt": 1743760758593,
    "failure": {
      "message": "Error: Element's content should match the given regex",
      "code": "ASSERTION_FAILURE"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Variables

{{< tabs >}}
{{% tab "Local config variables" %}}

These are local variables configured for API tests or defined outside individual steps in step-based tests. This also includes variables created by JavaScript code execution.

Located at `{{synthetics.attributes.result.variables.config}}`:

`.name`
: Variable name

`.type`
: Variable type

`.secure`
: Whether the variable value is obfuscated

`.value`
: Variable value (non-obfuscated only)

**Examples:**
```json
{
  "name": "RANDOM_NUMBER",
  "type": "text",
  "secure": false,
  "value": "133245995"
}
```

{{% /tab %}}
{{% tab "Global variables" %}}

These are extracted variables whose value updates a global variable value. 

Available only for **successful test results** and **recovery notifications**.

Located at `result.variables.extracted`:

`.id`
: Global variable ID

`.name`
: Variable name

`.secure`
: Whether the variable value is obfuscated

`.val`
: Variable value (note: uses `.val`, not `.value`)

**Examples:**
```json
{
  "id": "ec734823-536e-4aba-8b5f-55733189d936",
  "name": "EXTRACTED_NUMBER",
  "secure": false,
  "val": "250661"
}
```

{{% /tab %}}
{{% tab "Step extracted variables" %}}

For tests with steps, step data is contained in `.steps`.

`.extractedValue.name`
: Variable name

`.extractedValue.secure`
: Whether the variable value is obfuscated

`.extractedValue.value`
: Variable value (if step was successful)

**Examples:**
```json
{
  "extractedValue": {
    "name": "EXTRACTED_COUNT",
    "secure": false,
    "value": "12"
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Variables extracted by steps

Similar to standard API tests, the variables are listed in the `variables.extracted` property, but inside steps themselves. These values are available as long as the step is successful.

{{< tabs >}}
{{% tab "General steps" %}}

For multistep/browser/mobile tests:

`.steps.allowFailure`
: Whether the step is allowed to fail without failing the entire test

`.steps.duration`
: Step execution duration in milliseconds

`.steps.failure`
: Failure information object containing `.code` and `.message`

`.steps.id`
: Unique step identifier

`.steps.isCritical`
: Whether the step is critical to the test

`.steps.status`
: Step execution status

`.steps.type`
: Type of step being executed

**Subtest information:**

`.steps.subTest.id`
: Subtest identifier

`.steps.subStep.parentStep.id`
: Parent step identifier

`.steps.subStep.parentTest.id`
: Parent test identifier

`.steps.subStep.level`
: Nesting level (1 for subtests, 2 for subtests of subtests)

**Examples:**
```json
{
  "steps": [
    {
      "allowFailure": false,
      "duration": 10955,
      "failure": {
        "code": "ASSERTION_FAILURE",
        "message": "Element's content should not equal given value."
      },
      "id": "g8e-q4a-fix",
      "isCritical": true,
      "status": "failed",
      "type": "assertElementContent",
      "subTest": {
        "id": "m2i-fcy-eva"
      },
      "subStep": {
        "parentStep": {"id": "ikj-juk-z2u"},
        "parentTest": {"id": "th5-wic-5mj"},
        "level": 1
      }
    }
  ]
}
```

{{% /tab %}}
{{% tab "Browser Tests" %}}

**General:**

`.startUrl`
: URL from test configuration

**Steps:**

`.apiTest.request`
: API test request configuration (only for "Run API Test" steps where `type` is `runApiTest`)

`.apiTest.result`
: API test result data (similar to `attributes.result` for API tests)

`.assertionResult.expected`
: Expected value for assertions

`.assertionResults.checkType`
: Type of assertion check

`.assertionResults.actual`
: Actual value found during assertion

`.browserErrors`
: List of browser errors encountered

`.timings.firstByte`
: Time to first byte

`.timings.tcp`
: TCP connection timing

`.description`
: Step description

**Examples:**
```json
{
  "startUrl": "https://datadoghq.com",
  "apiTest": {
    "request": {
      "subType": "http",
      "method": "GET",
      "url": "https://datadoghq.com"
    },
    "result": {
      "statusCode": 200
    }
  },
  "assertionResults": {
    "expected": "100",
    "checkType": "equals",
    "actual": "200"
  },
  "timings": {
    "firstByte": 7.1,
    "tcp": 5.2
  }
}
```

Examples for `.browserErrors`:

```json
{
    "name": "Console error",
    "description": "Failed to load resource: the server responded with a status of 403 ()",
    "type": "js"
},
{
    "name": "[GET] 403 - https://accounts.google.com/v3/signin/identifier?dsh=S688774280%3A1687962864348747&conti",
    "description": "https://accounts.google.com/v3/signin/identifier?dsh=S688774280%3A1687962864348747&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3D%252Fsignin_passive%26feature%3Dpassive&hl=en&ifkv=AeDOFXjMKzxp0wt-b9IzWKz6RS9Kk-VmW5z_fzLP_cjbSWd4hWeP5g53fvdrhX6b2cDVQrNtJ5B7vA&passive=true&service=youtube&uilel=3&flowName=GlifWebSignIn&flowEntry=ServiceLogin\n<html lang=en><meta charset=utf-8><meta name=viewport content=\"initial-scale=1, minimum-sca",
    "type": "network",
    "status": 403
},
{
    "method": "POST",
    "name": "https://8b61d74c.datadoghq.com/api/v2/rum?batch_time=1752830394872&dd-request-id=8c0e7b8c-3d52-4b96-",
    "description": "Request was pending when step timed out: POST - https://8b61d74c.datadoghq.com/api/v2/rum?batch_time=1752830394872&dd-request-id=8c0e7b8c-3d52-4b96-b1a0-627e7070b863&dd-evp-origin=browser&dd-evp-origin-version=5.27.0&dd-api-key=pub0b466265cd4de08394d4e1979fb79787&ddtags=sdk_version%3A5.27.0%2Capi%3Abeacon%2Cenv%3Alive%2Cservice%3Acorp%2Cversion%3Ae0fdd625&ddsource=browser",
    "type": "network",
    "url": {
        "protocol": "https:",
        "search": "?batch_time=1752830394872&dd-request-id=8c0e7b8c-3d52-4b96-b1a0-627e7070b863&dd-evp-origin=browser&dd-evp-origin-version=5.27.0&dd-api-key=pub0b466265cd4de08394d4e1979fb79787&ddtags=sdk_version%3A5.27.0%2Capi%3Abeacon%2Cenv%3Alive%2Cservice%3Acorp%2Cversion%3Ae0fdd625&ddsource=browser",
        "domain": "datadoghq.com",
        "origin": "https://8b61d74c.datadoghq.com",
        "full": "https://8b61d74c.datadoghq.com/api/v2/rum?batch_time=1752830394872&dd-request-id=8c0e7b8c-3d52-4b96-b1a0-627e7070b863&dd-evp-origin=browser&dd-evp-origin-version=5.27.0&dd-api-key=pub0b466265cd4de08394d4e1979fb79787&ddtags=sdk_version%3A5.27.0%2Capi%3Abeacon%2Cenv%3Alive%2Cservice%3Acorp%2Cversion%3Ae0fdd625&ddsource=browser",
      "pathname": "/api/v2/rum"
    }
},
```
{{% /tab %}}
{{% tab "Mobile Tests" %}}

`.application.versionId`
: Mobile application version identifier

`.apiTest`
: API test data (for API test steps within mobile tests)

`.description`
: Step description

**Examples:**
```json
{
  "application": {
    "versionId": "4408df2e-9b7a-4665-9510-b9041b2ae1e8"
  },
  "description": "Tap on Button Sign In"
}
```

{{% /tab %}}
{{% tab "API Tests" %}}

**Multistep:**

`.name`
: Step name

`.type`
: Step type

*Note: Follow regular API fields per subType*

**Non-Multistep:**

`.assertions.actual`
: Actual value from assertion

`.assertions.expected`
: Expected value for assertion

`.assertions.operator`
: Assertion operator

`.assertions.type`
: Assertion type

`.dnsResolution.resolvedIp`
: Resolved IP address

`.dnsResolution.server`
: DNS server used

`.timings.dns`
: DNS resolution time

`.timings.tcp`
: TCP connection time

`.request.url`
: Request URL

`.request.host`
: Request host

`.response.body`
: Response body content

`.response.statusCode`
: HTTP status code

`.response.headers`
: Response headers

`.response.httpVersion`
: HTTP version

`.response.redirects`
: Redirect information

**Examples:**
```json
{
  "name": "Check API endpoint",
  "type": "http",
  "assertions": {
    "actual": 1.5145,
    "expected": 1000,
    "operator": "moreThan",
    "type": "latency"
  },
  "dnsResolution": {
    "resolvedIp": "18.245.199.78",
    "server": "8.8.4.4"
  },
  "timings": { //Dependent on the sub-type
    "tcp": 6.9,
      "download": 33.5,
      "total": 75,
      "dns": 7.5,
      "firstByte": 17.2,
      "ssl": 9.9
    },
  },
  "request": {
    "url": "https://www.datadogh.com",
    "host": "datadoghq.com",
    "method": "GET"
  },
  "response": {
    "body": "Example Page Content", // Raw text (even if it's JSON, its contents can't be accessed individually), and it's truncated if too big (only the start is available)
    "statusCode": 200,
    "headers": { // Object/dictionary of headers, the key is the header name and the value its value
      "content-type": "text/html; charset=utf-8",
      "content-length": "250661"
    },
    "httpVersion": "1.1",
    "redirects": [ // List of redirect items
      {
        "location": "https://datadoghq.com",
        "statusCode": 302
      }
    ]
  }
```

{{% /tab %}}
{{% tab "Network tests" %}}

{{% collapse-content title="Websocket" level="h4" expanded=false %}}

`.timings.open`
: Time to open connection (in milliseconds)

`.timings.receive`
: Time to receive response

`.handshake.request`
: Handshake request data

`.handshake.response`
: Handshake response data

`.request.message`
: WebSocket request message

`.response.message`
: WebSocket response message

`.close.reason`
: Connection close reason

`.close.statusCode`
: Connection close status code

**Examples:**
```json
{
  "timings": {
    "tcp": 96,
    "receive": 97,
    "download": 0,
    "total": 201.9,
    "dns": 7.7,
    "firstByte": 0,
    "ssl": 1,
    "open": 0.2
  },
  "handshake": {
    "response": {
      "statusCode": 101
    }
  },
  "request": {
    "message": "Ping"
  },
  "response": {
    "message": "Pong"
  },
  "close": {
    "reason": "message_received",
    "statusCode": 1000
  }
}
```

{{< /collapse-content >}}

{{% collapse-content title= "gRPC" level="h4" expanded=false %}}

`.callType`
: Call type (`unary` or `healthcheck`)

`.timings.rpc`
: RPC call timing

`.response.healthcheck.status`
: Health check status

`.request.message`
: gRPC request message

`.response.message`
: gRPC response message

**Examples:**
```json
{
  "callType": "healthcheck",
  "timings": {
    "total": 55.3,
    "rpc": 9.2,
    "dns": 46.1
  },
  "response": {
    "healthcheck": {
      "status": 1
    }
  },
  "request": {
    "message": "Ping"
  },
  "response": {
    "message": "Pong" // Responses can be truncated if too big (only the start is available)
  }
}
```

{{< /collapse-content >}}

{{% collapse-content title= "UDP" level="h4" expanded=false %}}

`.request.message`
: UDP request message

`.response.message`
: UDP response message

`.timings.message`
: Message timing

**Examples:**
```json
{
  "timings": {
    "total": 135.3,
    "dns": 14.4,
    "message": 120.9
  },
  "request": {
    "message": "Ping"
  },
  "response": {
    "message": "Pong"
  }
}
```

{{< /collapse-content >}}

{{% collapse-content title= "TCP" level="h4" expanded=false %}}

`.connectionOutcome`
: Connection result

`.netpath.routers.ip`
: Router IP addresses

`.traceroute.latency.min`
: Minimum latency

`.traceroute.latency.max`
: Maximum latency

`.traceroute.latency.avg`
: Average latency

`.traceroute.latency.stddev`
: Standard deviation

`.traceroute.latency.values`
: Latency values array

**Examples:**
```json
[
      {
        "packetLossPercentage": 1,
        "packetsReceived": 0,
        "packetsSent": 2,
        "routers": [
          {
            "ip": "???"
          }
        ]
      },
      {
        "packetLossPercentage": 0,
        "packetsReceived": 2,
        "latency": {
          "avg": 0.2375,
          "min": 0.189,
          "max": 0.286,
          "values": [
            0.189,
            0.286
          ],
          "stddev": 0.04849999999999999
        },
        "packetsSent": 2,
        "routers": [
          {
            "ip": "10.241.134.75"
          }
        ]
      }
]
```

{{< /collapse-content >}}

{{% collapse-content title= "ICMP" level="h4" expanded=false %}}

`.traceroute`
: Same structure as TCP traceroute

`.request.host`
: Target host

`.ping`
: Ping results

`.latency.min`, `.latency.max`, `.latency.avg`, `.latency.stddev`, `.latency.values`
: Latency measurements (same as TCP)

**Examples:**
```json
{
  "ping": {
    "packetLossPercentage": 0,
    "packetsReceived": 4,
    "latency": {
      "avg": 1.47375,
      "min": 1.442,
      "max": 1.516,
      "values": [
        1.467,
        1.442,
        1.47,
        1.516
      ],
      "stddev": 0.02670557057993708
    },
    "resolvedIp": "18.245.199.70",
    "packetsSent": 4,
    "packetSize": 56
  }
}
```

{{< /collapse-content >}}

{{% /tab %}}
{{% tab "Protocol tests" %}}

{{% collapse-content title= "SSL" level="h4" expanded=false %}}

`.cert`
: SSL certificate information

`.cipher`
: Cipher suite used

`.issuer`
: Certificate issuer

`.subject`
: Certificate subject

`.valid.from`
: Certificate valid from date

`.valid.to`
: Certificate valid to date

`.ocsp`
: OCSP (Online Certificate Status Protocol) information

`.timings.handshake`
: SSL handshake timing

**Examples:**
```json
      "cipher": TLS_AES_128_GCM_SHA256,
      "issuer": {
        "C": "US",
        "CN": "DigiCert Global G2 TLS RSA SHA256 2020 CA1",
        "O": "DigiCert Inc"
      },
```
```json
{
  "issuer": {
    "C": "US",
    "CN": "DigiCert Global G2 TLS RSA SHA256 2020 CA1",
    "O": "DigiCert Inc"
  },
  "valid.from": 1751414400000, //milliseconds
  "valid.to": 1783036799000 //milliseconds
}     
```

{{< /collapse-content >}}

{{% collapse-content title= "DNS" level="h4" expanded=false %}}

`.response.records.type`
: DNS record type

`.response.records.values`
: DNS record values

**Examples:**
```json
{
  "dns": {
    "response": {
      "records": {
        "type": "A",
        "values": ["192.0.2.1", "192.0.2.2"]
      }
    }
  }
}
```

{{< /collapse-content >}}

{{% /tab %}}
{{% tab "Summary and shortcuts" %}}

**Step Summary:**
- `.result.steps.<step_id>`
  - `.id`, `.status`, `.type`, `.duration`, `.description`, `.failure.message`, `.code`, `.url`

The step summary contains the same data as described in [steps](#variables-extracted-by-steps), but you can access it in several ways:

By step index (0-based):
- `.steps.0` - first step
- `.steps.1` - second step
- `.steps.-1` - last step
- `.steps.-2` - step before last

By step name:
- `.steps[Click button]`

By step id:
- `.steps.abc-def-ghi`

Then you access the data as usual, for example:
- `.steps.-1.status`
- `.steps[Click button].status`
- `.steps.abc-def-ghi.status`

**Summary Data:**
- `.count.steps.{total,completed}`, `.count.errors`, `.count.hops` (for example, `4`)

**Shortcuts:**
- `synthetics.failed_step` points to the first non-skippable failed step

**Tags:**
- `{{tags}}`: All tags
- `{{tag.<key>}}`: Specific tag

**Service Tag:**
If `service` tag is set:
- `{{service.name}}`
- `{{service.team}}`
- `{{service.docs}}`, `{{service.links}}`

**Examples**:
```json
{
  "service.name": "API Server",
  "service.team": "Backend team",
  "service.docs": "https://docs.datadoghq.com/api/"
}
```

{{% /tab %}}
{{< /tabs >}}

## Conditional alerting

Use conditional templating to change messages, set notification handles, or override alert priority based on test results. This is especially useful when routing alerts to specific teams.

<div class="alert alert-warning">

To ensure notifications are delivered properly, always include a notification handle in your conditional logic. Notifications are dropped if no handle is provided. Make sure to:

- Include a catch-all condition using `{{else}}` to handle any unmatched scenarios.
- Provide notification handles for both alert and recovery notifications.

For more detailed information, see the <a href="https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert#examples">Monitor documentation.</a></div>

### Examples

**Send alerts to a specific Slack channel based on failed step:**

```handlebars
{{#is_match "synthetics.failed_step.description" "Checkout"}}
@notify-slack-payments
{{/is_match}}
```

**Send alerts based on status code:**

```handlebars
{{#is_exact_match "synthetics.attributes.result.response.statusCode" "500"}}
@notify-slack-backend
{{/is_exact_match}}
```

**Set different alert priorities:**

```handlebars
{{#if synthetics.failed_step.name}}
{{override_priority "P2"}}
{{else}}
{{override_priority "P4"}}
{{/if}}
```

## Advanced usage

You can customize Synthetic monitor messages using handlebars templating. The following examples cover advanced techniques such as comments, list access, conditions, and iterations.

**Note:** Always test your syntax directly in the monitor message editor, as template behavior may vary slightly across versions.

### Comments

Use comments to explain what the template is doing. Comments are removed from the final rendered message.

```handlebars
{{! This is a comment }}
{{!
This is a
multi-line comment
}}
```

### Raw strings

To display raw values without HTML escaping (for example, URLs, or HTTP responses in code blocks), use triple curly braces:

```handlebars
{{{my_var}}}
```

### Accessing list data

You can loop over lists (like steps or variables) or access items directly:

```handlebars
{{list.2.name}}                {{! third item }}
{{list.-1.status}}            {{! last item }}
{{list[My Complex Name]url}}  {{! use bracket notation for complex keys }}
{{list[My Complex Name]failure.code}}
{{list.abc-def-ghi}}          {{! access via ID (case-insensitive) }}
```

### Human-readable formatting

**Note**: All durations are in milliseconds.

- **Durations:**

  ```handlebars
  {{eval "synthetics.attributes.result.duration/1000"}}
  ```

- **Data Sizes:**

  ```handlebars
  {{eval "humanize_bytes(bodySize)"}}
  ```

### Conditions

<div class="alert alert-info">Use <code>#if</code>, <code>#is_match</code>, and <code>#is_exact_match</code> for logic-based rendering.</div>

#### Boolean check:

```handlebars
{{#if synthetics.attributes.variable.config.CONFIG_VAR.secure}}
  The CONFIG_VAR variable is obfuscated
{{else}}
  The CONFIG_VAR variable isn't obfuscated
{{/if}}
```

#### Conditional alerting based on step ID:

```handlebars
{{#is_exact_match synthetics.failed_step.id "svn-yrx-3xg"}}
  A backend-related step failed!
  @slack-backend-team
{{else}}
  Another step failed, probably Frontend related
  @slack-frontend-team
{{/is_exact_match}}
```
   <div class="alert alert-info">Use <code>#if</code> over <code>#is_exact_match</code> for checking if a variable is empty or unset.</div>

### Iteration

Use `#each` to loop over dictionaries or lists. You can access:

- `this` → the current item
- `@key` → the current key (for dictionaries)
- `@index`, `@first`, `@last` → loop metadata

#### Dictionary example:

```handlebars
{{#each users}}
  # User `{{@key}}`
  Name: {{name}}
  Permissions: {{permissions}}
{{/each}}

Users: {{#each users}}`{{@key}}` ({{name}}){{#unless @last}}, {{/unless}}{{/each}}
```

#### Steps loop (Synthetics-specific):

```handlebars
{{#each synthetics.attributes.result.steps}}
* Step name: {{description}}
* Step status: {{status}}
* Step type: {{type}}
{{/each}}
```

## Display custom notifications message

Synthetic Monitoring monitors support the ability to display **only the custom notification message** in alert notifications, hiding all default enriched content such as query details, tags, screenshots, and footers.

By default, all monitors include enriched details in the alert message. This may include:
- Test metadata
- Failing step information
- Screenshots
- Tags
- Links to Datadog resources

### Notification presets

You can select from the following options to hide or display the information relevant to you:

| Preset            | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `show_all`        | (Default) Includes all enriched data and metadata.                          |                                |
| `hide_handles`    | Hides `@notification` handles (for example, `@slack-channel`).                         |
| `hide_all`        | Hides all additional content except for the custom message and event link.  |

{{< img src="/monitors/monitor_types/synthetic_monitoring/content_in_notification.png" alt="Synthetic Monitoring monitor page, highlighting the content displayed in notification drop-down" style="width:80%;" >}}

### Example

| Channel | `show_all`  | `hide_all` |
|---------|--------------------|---------------------|
| Email   | Full test detail, screenshot, step info | Only custom message and event link |
| Slack   | Rich content + preview of failed run | Custom message only |

See [Monitor Notifications][9] for more information.

## Integrate your Synthetic test monitor with Statuspage

If you use [Atlassian Statuspage][6] for visibility into your applications' and services' uptime, you can update the status of your systems with Synthetic test monitor notifications.

{{< img src="synthetics/guide/synthetics_test_monitors/statuspage_monitor_setup.png" alt="Add a Statuspage email address and status to the monitor name in your Synthetic test" style="width:95%;">}}

1. See the [Statuspage documentation][7] to generate a component-specific email address.
2. Add the generated email address into your test's notification message. For example, `@custom-statuspage-email@notifications.statuspage.io`.
3. Customize the monitor name to return `UP` or `DOWN` depending on the test state. For example, `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`.
4. Fill out the monitor notification section and add a summary in the monitor name. For example, `Shopist Checkout Functionality`.
5. After you have configured your monitor, click **Save & Exit**.

For more information, see [Integrating Monitors with Statuspage][8].

### Best practices

- Always include a default `@notification` (outside any conditions) to prevent dropped messages.
- Avoid complex logic for paging tools like PagerDuty, which require consistent routing for recovery.
- Use conditional logic to override alert text, change priority, or split notifications between teams.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/metric/
[2]: /monitors/manage/
[3]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /monitors/notify/#notification-recipients
[5]: /monitors/notify/#renotify
[6]: https://support.atlassian.com/statuspage/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /monitors/guide/integrate-monitors-with-statuspage/
[9]: /monitors/notifications

