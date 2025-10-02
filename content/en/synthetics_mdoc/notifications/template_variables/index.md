---
title: Synthetic Monitoring Template Variables
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Notifications >
  Synthetic Monitoring Template Variables
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/notifications/template_variables/index.html
---

# Synthetic Monitoring Template Variables

## Overview{% #overview %}

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. Access these variables using the `synthetics.attributes` prefix. For example:

```text
Test failed at step {{synthetics.failed_step.name}} with error: {{synthetics.failed_step.failure.message}}.
```

### Common variable shortcuts{% #common-variable-shortcuts %}

{% dl %}

{% dt %}
`{{synthetics.failed_step.name}}`
{% /dt %}

{% dd %}
The name of the failing step (for example, `Test div #title content`).
{% /dd %}

{% dt %}
`{{synthetics.failed_step.failure.message}}`
{% /dt %}

{% dd %}
The error message (for example, `Element's content should match the given regex`).
{% /dd %}

{% dt %}
`{{synthetics.failed_step.url}}`
{% /dt %}

{% dd %}
The URL of the failed step (for example, `https://www.datadoghq.com/blog/`).
{% /dd %}

{% dt %}
`{{synthetics.attributes.result.response.statusCode}}`
{% /dt %}

{% dd %}
The HTTP status code (for example, `403`).
{% /dd %}

{% dt %}
`{{synthetics.result.step_count}}`
{% /dt %}

{% dd %}
Number of steps (for example, `4`).
{% /dd %}

{% dt %}
`{{synthetics.result.duration}}`
{% /dt %}

{% dd %}
Duration of the test run (in milliseconds) (for example, `9096`).
{% /dd %}

{% dt %}
`{{tags.env}}`
{% /dt %}

{% dd %}
The environment tag value (for example, `prod`).
{% /dd %}

{% /dl %}

**Note:** Not all variables are available for every test type. You may need to test different outputs to verify the data returned.

### Result attributes{% #result-attributes %}

{% tab title="Test Info" %}

{% dl %}

{% dt %}
`.test`
{% /dt %}

{% dd %}
Info about the test
{% /dd %}

{% dt %}
`.test.id`
{% /dt %}

{% dd %}
Public ID (for example, `abc-def-ghi`)
{% /dd %}

{% dt %}
`.test.type`
{% /dt %}

{% dd %}
Test type (for example, `api`)
{% /dd %}

{% dt %}
`.test.subType`
{% /dt %}

{% dd %}
Subtype for API tests (for example, `http`)
{% /dd %}

{% /dl %}

{% /tab %}

{% tab title="Location" %}

{% dl %}

{% dt %}
`.location.id`
{% /dt %}

{% dd %}
Location ID (for example, `aws:eu-central-1`)
{% /dd %}

{% dt %}
`.location.privateLocation`
{% /dt %}

{% dd %}
`true` for Private Locations
{% /dd %}

{% /dl %}

{% /tab %}

{% tab title="Device" %}
Applies to browser and mobile tests.

{% dl %}

{% dt %}
`.device.id`
{% /dt %}

{% dd %}
Device identifier
{% /dd %}

{% dt %}
`.device.name`
{% /dt %}

{% dd %}
Human-readable device name
{% /dd %}

{% dt %}
`.device.type`
{% /dt %}

{% dd %}
Device type classification
{% /dd %}

{% dt %}
`.device.resolution.width`, `.device.resolution.height`
{% /dt %}

{% dd %}
Screen resolution dimensions
{% /dd %}

{% dt %}
`.device.browser.type`
{% /dt %}

{% dd %}
Browser type (browser tests only)
{% /dd %}

{% dt %}
`.device.platform.name`, `.device.platform.version`
{% /dt %}

{% dd %}
Platform information (mobile tests only)
{% /dd %}

{% /dl %}

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

{% /tab %}

{% tab title="Result" %}

{% dl %}

{% dt %}
`.result.id`
{% /dt %}

{% dd %}
Unique result ID
{% /dd %}

{% dt %}
`.result.status`
{% /dt %}

{% dd %}
Test execution status
{% /dd %}

{% dt %}
`.result.duration`
{% /dt %}

{% dd %}
Test duration in milliseconds
{% /dd %}

{% dt %}
`.result.testStartedAt`, `.result.testFinishedAt`, `.result.testTriggeredAt`
{% /dt %}

{% dd %}
Epoch timestamps in milliseconds
{% /dd %}

{% dt %}
`.result.failure.message`
{% /dt %}

{% dd %}
Description of failure
{% /dd %}

{% dt %}
`.result.failure.code`
{% /dt %}

{% dd %}
Error code
{% /dd %}

{% /dl %}

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

{% /tab %}

## Variables{% #variables %}

{% tab title="Local config variables" %}
These are local variables configured for API tests or defined outside individual steps in step-based tests. This also includes variables created by JavaScript code execution.

Located at `{{synthetics.attributes.result.variables.config}}`:

{% dl %}

{% dt %}
`.name`
{% /dt %}

{% dd %}
Variable name
{% /dd %}

{% dt %}
`.type`
{% /dt %}

{% dd %}
Variable type
{% /dd %}

{% dt %}
`.secure`
{% /dt %}

{% dd %}
Whether the variable value is obfuscated
{% /dd %}

{% dt %}
`.value`
{% /dt %}

{% dd %}
Variable value (non-obfuscated only)
{% /dd %}

{% /dl %}

**Examples:**

```json
{
  "name": "RANDOM_NUMBER",
  "type": "text",
  "secure": false,
  "value": "133245995"
}
```

{% /tab %}

{% tab title="Global variables" %}
These are extracted variables whose value updates a global variable value.

Available only for **successful test results** and **recovery notifications**.

Located at `result.variables.extracted`:

{% dl %}

{% dt %}
`.id`
{% /dt %}

{% dd %}
Global variable ID
{% /dd %}

{% dt %}
`.name`
{% /dt %}

{% dd %}
Variable name
{% /dd %}

{% dt %}
`.secure`
{% /dt %}

{% dd %}
Whether the variable value is obfuscated
{% /dd %}

{% dt %}
`.val`
{% /dt %}

{% dd %}
Variable value (note: uses `.val`, not `.value`)
{% /dd %}

{% /dl %}

**Examples:**

```json
{
  "id": "ec734823-536e-4aba-8b5f-55733189d936",
  "name": "EXTRACTED_NUMBER",
  "secure": false,
  "val": "250661"
}
```

{% /tab %}

{% tab title="Step extracted variables" %}
For tests with steps, step data is contained in `.steps`.

{% dl %}

{% dt %}
`.extractedValue.name`
{% /dt %}

{% dd %}
Variable name
{% /dd %}

{% dt %}
`.extractedValue.secure`
{% /dt %}

{% dd %}
Whether the variable value is obfuscated
{% /dd %}

{% dt %}
`.extractedValue.value`
{% /dt %}

{% dd %}
Variable value (if step was successful)
{% /dd %}

{% /dl %}

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

{% /tab %}

### Variables extracted by steps{% #variables-extracted-by-steps %}

Similar to standard API tests, the variables are listed in the `variables.extracted` property, but inside steps themselves. These values are available as long as the step is successful.

{% tab title="General steps" %}
**For multistep/browser/mobile tests**:

{% dl %}

{% dt %}
`.steps.allowFailure`
{% /dt %}

{% dd %}
Whether the step is allowed to fail without failing the entire test
{% /dd %}

{% dt %}
`.steps.duration`
{% /dt %}

{% dd %}
Step execution duration in milliseconds
{% /dd %}

{% dt %}
`.steps.failure`
{% /dt %}

{% dd %}
Failure information object containing `.code` and `.message`
{% /dd %}

{% dt %}
`.steps.id`
{% /dt %}

{% dd %}
Unique step identifier
{% /dd %}

{% dt %}
`.steps.isCritical`
{% /dt %}

{% dd %}
Whether the step is critical to the test
{% /dd %}

{% dt %}
`.steps.status`
{% /dt %}

{% dd %}
Step execution status
{% /dd %}

{% dt %}
`.steps.type`
{% /dt %}

{% dd %}
Type of step being executed
{% /dd %}

{% /dl %}

**Subtest information:**

{% dl %}

{% dt %}
`.steps.subTest.id`
{% /dt %}

{% dd %}
Subtest identifier
{% /dd %}

{% dt %}
`.steps.subStep.parentStep.id`
{% /dt %}

{% dd %}
Parent step identifier
{% /dd %}

{% dt %}
`.steps.subStep.parentTest.id`
{% /dt %}

{% dd %}
Parent test identifier
{% /dd %}

{% dt %}
`.steps.subStep.level`
{% /dt %}

{% dd %}
Nesting level (1 for subtests, 2 for subtests of subtests)
{% /dd %}

{% /dl %}

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

{% /tab %}

{% tab title="Browser Tests" %}
**General:**

{% dl %}

{% dt %}
`.startUrl`
{% /dt %}

{% dd %}
URL from test configuration
{% /dd %}

{% /dl %}

**Steps:**

{% dl %}

{% dt %}
`.apiTest.request`
{% /dt %}

{% dd %}
API test request configuration (only for "Run API Test" steps where `type` is `runApiTest`)
{% /dd %}

{% dt %}
`.apiTest.result`
{% /dt %}

{% dd %}
API test result data (similar to `attributes.result` for API tests)
{% /dd %}

{% dt %}
`.assertionResult.expected`
{% /dt %}

{% dd %}
Expected value for assertions
{% /dd %}

{% dt %}
`.assertionResults.checkType`
{% /dt %}

{% dd %}
Type of assertion check
{% /dd %}

{% dt %}
`.assertionResults.actual`
{% /dt %}

{% dd %}
Actual value found during assertion
{% /dd %}

{% dt %}
`.browserErrors`
{% /dt %}

{% dd %}
List of browser errors encountered
{% /dd %}

{% dt %}
`.timings.firstByte`
{% /dt %}

{% dd %}
Time to first byte
{% /dd %}

{% dt %}
`.timings.tcp`
{% /dt %}

{% dd %}
TCP connection timing
{% /dd %}

{% dt %}
`.description`
{% /dt %}

{% dd %}
Step description
{% /dd %}

{% /dl %}

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

{% /tab %}

{% tab title="Mobile Tests" %}

{% dl %}

{% dt %}
`.application.versionId`
{% /dt %}

{% dd %}
Mobile application version identifier
{% /dd %}

{% dt %}
`.apiTest`
{% /dt %}

{% dd %}
API test data (for API test steps within mobile tests)
{% /dd %}

{% dt %}
`.description`
{% /dt %}

{% dd %}
Step description
{% /dd %}

{% /dl %}

**Examples:**

```json
{
  "application": {
    "versionId": "4408df2e-9b7a-4665-9510-b9041b2ae1e8"
  },
  "description": "Tap on Button Sign In"
}
```

{% /tab %}

{% tab title="API Tests" %}
**Multistep:**

{% dl %}

{% dt %}
`.name`
{% /dt %}

{% dd %}
Step name
{% /dd %}

{% dt %}
`.type`
{% /dt %}

{% dd %}
Step type
{% /dd %}

{% /dl %}

*Note: Follow regular API fields per subType*

**Non-Multistep:**

{% dl %}

{% dt %}
`.assertions.actual`
{% /dt %}

{% dd %}
Actual value from assertion
{% /dd %}

{% dt %}
`.assertions.expected`
{% /dt %}

{% dd %}
Expected value for assertion
{% /dd %}

{% dt %}
`.assertions.operator`
{% /dt %}

{% dd %}
Assertion operator
{% /dd %}

{% dt %}
`.assertions.type`
{% /dt %}

{% dd %}
Assertion type
{% /dd %}

{% dt %}
`.dnsResolution.resolvedIp`
{% /dt %}

{% dd %}
Resolved IP address
{% /dd %}

{% dt %}
`.dnsResolution.server`
{% /dt %}

{% dd %}
DNS server used
{% /dd %}

{% dt %}
`.timings.dns`
{% /dt %}

{% dd %}
DNS resolution time
{% /dd %}

{% dt %}
`.timings.tcp`
{% /dt %}

{% dd %}
TCP connection time
{% /dd %}

{% dt %}
`.request.url`
{% /dt %}

{% dd %}
Request URL
{% /dd %}

{% dt %}
`.request.host`
{% /dt %}

{% dd %}
Request host
{% /dd %}

{% dt %}
`.response.body`
{% /dt %}

{% dd %}
Response body content
{% /dd %}

{% dt %}
`.response.statusCode`
{% /dt %}

{% dd %}
HTTP status code
{% /dd %}

{% dt %}
`.response.headers`
{% /dt %}

{% dd %}
Response headers
{% /dd %}

{% dt %}
`.response.httpVersion`
{% /dt %}

{% dd %}
HTTP version
{% /dd %}

{% dt %}
`.response.redirects`
{% /dt %}

{% dd %}
Redirect information
{% /dd %}

{% /dl %}

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

{% /tab %}

{% tab title="Network tests" %}

{% collapsible-section %}
#### Websocket

{% dl %}

{% dt %}
`.timings.open`
{% /dt %}

{% dd %}
Time to open connection (in milliseconds)
{% /dd %}

{% dt %}
`.timings.receive`
{% /dt %}

{% dd %}
Time to receive response
{% /dd %}

{% dt %}
`.handshake.request`
{% /dt %}

{% dd %}
Handshake request data
{% /dd %}

{% dt %}
`.handshake.response`
{% /dt %}

{% dd %}
Handshake response data
{% /dd %}

{% dt %}
`.request.message`
{% /dt %}

{% dd %}
WebSocket request message
{% /dd %}

{% dt %}
`.response.message`
{% /dt %}

{% dd %}
WebSocket response message
{% /dd %}

{% dt %}
`.close.reason`
{% /dt %}

{% dd %}
Connection close reason
{% /dd %}

{% dt %}
`.close.statusCode`
{% /dt %}

{% dd %}
Connection close status code
{% /dd %}

{% /dl %}

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

{% /collapsible-section %}

{% collapsible-section %}
#### gRPC

{% dl %}

{% dt %}
`.callType`
{% /dt %}

{% dd %}
Call type (`unary` or `healthcheck`)
{% /dd %}

{% dt %}
`.timings.rpc`
{% /dt %}

{% dd %}
RPC call timing
{% /dd %}

{% dt %}
`.response.healthcheck.status`
{% /dt %}

{% dd %}
Health check status
{% /dd %}

{% dt %}
`.request.message`
{% /dt %}

{% dd %}
gRPC request message
{% /dd %}

{% dt %}
`.response.message`
{% /dt %}

{% dd %}
gRPC response message
{% /dd %}

{% /dl %}

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

{% /collapsible-section %}

{% collapsible-section %}
#### UDP

{% dl %}

{% dt %}
`.request.message`
{% /dt %}

{% dd %}
UDP request message
{% /dd %}

{% dt %}
`.response.message`
{% /dt %}

{% dd %}
UDP response message
{% /dd %}

{% dt %}
`.timings.message`
{% /dt %}

{% dd %}
Message timing
{% /dd %}

{% /dl %}

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

{% /collapsible-section %}

{% collapsible-section %}
#### TCP

{% dl %}

{% dt %}
`.connectionOutcome`
{% /dt %}

{% dd %}
Connection result
{% /dd %}

{% dt %}
`.netpath.routers.ip`
{% /dt %}

{% dd %}
Router IP addresses
{% /dd %}

{% dt %}
`.traceroute.latency.min`
{% /dt %}

{% dd %}
Minimum latency
{% /dd %}

{% dt %}
`.traceroute.latency.max`
{% /dt %}

{% dd %}
Maximum latency
{% /dd %}

{% dt %}
`.traceroute.latency.avg`
{% /dt %}

{% dd %}
Average latency
{% /dd %}

{% dt %}
`.traceroute.latency.stddev`
{% /dt %}

{% dd %}
Standard deviation
{% /dd %}

{% dt %}
`.traceroute.latency.values`
{% /dt %}

{% dd %}
Latency values array
{% /dd %}

{% /dl %}

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

{% /collapsible-section %}

{% collapsible-section %}
#### ICMP

{% dl %}

{% dt %}
`.traceroute`
{% /dt %}

{% dd %}
Same structure as TCP traceroute
{% /dd %}

{% dt %}
`.request.host`
{% /dt %}

{% dd %}
Target host
{% /dd %}

{% dt %}
`.ping`
{% /dt %}

{% dd %}
Ping results
{% /dd %}

{% dt %}
`.latency.min`, `.latency.max`, `.latency.avg`, `.latency.stddev`, `.latency.values`
{% /dt %}

{% dd %}
Latency measurements (same as TCP)
{% /dd %}

{% /dl %}

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

{% /collapsible-section %}

{% /tab %}

{% tab title="Protocol tests" %}

{% collapsible-section %}
#### SSL

{% dl %}

{% dt %}
`.cert`
{% /dt %}

{% dd %}
SSL certificate information
{% /dd %}

{% dt %}
`.cipher`
{% /dt %}

{% dd %}
Cipher suite used
{% /dd %}

{% dt %}
`.issuer`
{% /dt %}

{% dd %}
Certificate issuer
{% /dd %}

{% dt %}
`.subject`
{% /dt %}

{% dd %}
Certificate subject
{% /dd %}

{% dt %}
`.valid.from`
{% /dt %}

{% dd %}
Certificate valid from date
{% /dd %}

{% dt %}
`.valid.to`
{% /dt %}

{% dd %}
Certificate valid to date
{% /dd %}

{% dt %}
`.ocsp`
{% /dt %}

{% dd %}
OCSP (Online Certificate Status Protocol) information
{% /dd %}

{% dt %}
`.timings.handshake`
{% /dt %}

{% dd %}
SSL handshake timing
{% /dd %}

{% /dl %}

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

{% /collapsible-section %}

{% collapsible-section %}
#### DNS

{% dl %}

{% dt %}
`.response.records.type`
{% /dt %}

{% dd %}
DNS record type
{% /dd %}

{% dt %}
`.response.records.values`
{% /dt %}

{% dd %}
DNS record values
{% /dd %}

{% /dl %}

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

{% /collapsible-section %}

{% /tab %}

{% tab title="Step summary" %}
**Step Summary:**

- `.result.steps.<step_id>`
  - `.id`, `.status`, `.type`, `.duration`, `.description`, `.failure.message`, `.code`, `.url`

The step summary contains the same data as described in steps, but you can access it in several ways:

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

**Service Tag:** If `service` tag is set:

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

{% /tab %}

## Further Reading{% #further-reading %}

- [Learn how to manage monitors](https://docs.datadoghq.com/monitors/manage/)
- [Learn more about monitor templates](https://docs.datadoghq.com/monitors/templates/)
