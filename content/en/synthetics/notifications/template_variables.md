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

**Note:** Not all variables are available for every test type. You may need to test different outputs to verify the data returned. You can export the result as a JSON file from the **Actions** tab, then reference the path directly within your monitor configuration. See the [troubleshooting](#troubleshooting) section for more information.

## Available variables

### Test execution variables

Use these variables to include details about the test, execution location, device, and result status in your notification messages.

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

Located at `{{synthetics.attributes.result.variables.extracted}}`:

`{{synthetics.attributes.result.variables.extracted.id}}`
: Global variable ID

`{{synthetics.attributes.result.variables.extracted.name}}`
: Variable name

`{{synthetics.attributes.result.variables.extracted.secure}}`
: Whether the variable value is obfuscated

`{{synthetics.attributes.result.variables.extracted.val}}`
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

For tests with steps, step data is contained in `{{synthetics.attributes.result.steps.<step-index>.extractedValue}}`. For information on how to access the `<step-index>` see the [step summary](#step-summary) section below.

`synthetics.attributes.result.steps.<step-index>.extractedValue.name`
: Variable name

`synthetics.attributes.result.steps.<step-index>.extractedValue.secure`
: Whether the variable value is obfuscated

`synthetics.attributes.result.steps.<step-index>.extractedValue.value`
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

`synthetics.attributes.variables.extracted.application.versionId`
: Mobile application version identifier

`synthetics.attributes.variables.extracted.apiTest`
: API test data (for API test steps within mobile tests)

`synthetics.attributes.variables.extracted.description`
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

`synthetics.attributes.variables.extracted.request.message`
: UDP request message

`synthetics.attributes.variables.extracted.response.message`
: UDP response message

`synthetics.attributes.variables.extracted.timings.message`
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

`synthetics.attributes.variables.extracted.traceroute`
: Same structure as TCP traceroute

`synthetics.attributes.variables.extracted.request.host`
: Target host

`synthetics.attributes.variables.extracted.ping`
: Ping results

`synthetics.attributes.variables.extracted.latency.min`, `synthetics.attributes.variables.extracted.latency.max`, `synthetics.attributes.variables.extracted.latency.avg`, `synthetics.attributes.variables.extracted.latency.stddev`, `synthetics.attributes.variables.extracted.latency.values`
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

`synthetics.attributes.variables.extracted.response.records.type`
: DNS record type

`synthetics.attributes.variables.extracted.response.records.values`
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
{{< /tabs >}}

### Step summary

Access step data by index, name, or ID to reference specific steps in your notification messages. This section also includes summary counts for total steps, completed steps, and errors.

Each step exposes the following properties: `.id`, `.status`, `.type`, `.duration`, `.description`, `.failure.message`, `.code`, and `.url`.

You can reference steps in three ways:

#### By index (0-based)

Use positive numbers to count from the beginning, or negative numbers to count from the end:

| Syntax | Description |
|--------|-------------|
| `.steps.0` | First step |
| `.steps.1` | Second step |
| `.steps.-1` | Last step |
| `.steps.-2` | Second to last step |

#### By step name

Use the step name in brackets:

`.steps[Click button]`

#### By step ID

Use the step's unique identifier:

`.steps.abc-def-ghi`

#### Accessing step properties

Combine any reference method with a property:

- `{{synthetics.attributes.result.steps.-1.status}}` - Status of the last step
- `{{synthetics.attributes.result.steps[Click button].failure.message}}` - Failure message for a named step
- `{{synthetics.attributes.result.steps.abc-def-ghi.duration}}` - Duration of a specific step

#### Summary counts

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.result.steps.count.steps.total` | Total number of steps |
| `synthetics.attributes.result.steps.count.steps.completed` | Number of completed steps |
| `synthetics.attributes.result.steps.count.errors` | Number of errors |
| `synthetics.attributes.result.steps.count.hops` | Number of network hops (network tests only) |


## Troubleshooting

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
