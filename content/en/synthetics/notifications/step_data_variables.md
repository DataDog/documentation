---
title: Step Data Template Variables
description: Template variables for accessing step-level data in Synthetic test notifications
further_reading:
- link: "/synthetics/notifications/template_variables/"
  tag: "Documentation"
  text: "Synthetic Monitoring Template Variables"
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
---

## Overview

Step data template variables allow you to access detailed information about individual steps in multistep, browser, mobile, and API tests. Similar to standard API tests, the variables are listed in the `synthetics.attributes.variables.extracted` property, but inside steps themselves. These values are available as long as the step is successful.

## General steps

For multistep, browser, and mobile tests:

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.steps.allowFailure` | Whether the step is allowed to fail without failing the entire test |
| `synthetics.attributes.variables.extracted.steps.duration` | Step execution duration in milliseconds |
| `synthetics.attributes.variables.extracted.steps.failure` | Failure information object containing `.code` and `.message` |
| `synthetics.attributes.variables.extracted.steps.id` | Unique step identifier |
| `synthetics.attributes.variables.extracted.steps.isCritical` | Whether the step is critical to the test |
| `synthetics.attributes.variables.extracted.steps.status` | Step execution status |
| `synthetics.attributes.variables.extracted.steps.type` | Type of step being executed |

**Subtest information:**

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.variables.extracted.steps.subTest.id` | Subtest identifier |
| `synthetics.attributes.variables.extracted.steps.subStep.parentStep.id` | Parent step identifier |
| `synthetics.attributes.variables.extracted.steps.subStep.parentTest.id` | Parent test identifier |
| `synthetics.attributes.variables.extracted.steps.subStep.level` | Nesting level (1 for subtests, 2 for subtests of subtests) |

{{% collapse-content title="Example JSON" level="p" %}}

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

{{% /collapse-content %}}

## Browser tests

**General:**

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.result.startUrl}}` | URL from test configuration |

**Steps:**

| Variable | Description |
|----------|-------------|
| `.apiTest.request` | API test request configuration (only for "Run API Test" steps where `type` is `runApiTest`) |
| `.apiTest.result` | API test result data (similar to `attributes.result` for API tests) |
| `.assertionResult.expected` | Expected value for assertions |
| `.assertionResults.checkType` | Type of assertion check |
| `.assertionResults.actual` | Actual value found during assertion |
| `.browserErrors` | List of browser errors encountered |
| `.timings.firstByte` | Time to first byte |
| `.timings.tcp` | TCP connection timing |
| `.description` | Step description |

{{% collapse-content title="Example JSON" level="p" %}}

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

{{% /collapse-content %}}

{{% collapse-content title="Browser errors example" level="p" %}}

```json
[
  {
    "name": "Console error",
    "description": "Failed to load resource: the server responded with a status of 403 ()",
    "type": "js"
  },
  {
    "name": "[GET] 403 - https://accounts.google.com/v3/signin/identifier",
    "description": "https://accounts.google.com/v3/signin/identifier...",
    "type": "network",
    "status": 403
  }
]
```

{{% /collapse-content %}}

## Mobile tests

| Variable | Description |
|----------|-------------|
| `.application.versionId` | Mobile application version identifier |
| `.apiTest` | API test data (for API test steps within mobile tests) |
| `.description` | Step description |

{{% collapse-content title="Example JSON" level="p" %}}

```json
{
  "application": {
    "versionId": "4408df2e-9b7a-4665-9510-b9041b2ae1e8"
  },
  "description": "Tap on Button Sign In"
}
```

{{% /collapse-content %}}

## API tests

**Multistep:**

| Variable | Description |
|----------|-------------|
| `.name` | Step name |
| `.type` | Step type |

*Note: Follow regular API fields per subType*

**Non-Multistep:**

| Variable | Description |
|----------|-------------|
| `.assertions.actual` | Actual value from assertion |
| `.assertions.expected` | Expected value for assertion |
| `.assertions.operator` | Assertion operator |
| `.assertions.type` | Assertion type |
| `.dnsResolution.resolvedIp` | Resolved IP address |
| `.dnsResolution.server` | DNS server used |
| `.timings.dns` | DNS resolution time |
| `.timings.tcp` | TCP connection time |
| `.request.url` | Request URL |
| `.request.host` | Request host |
| `.response.body` | Response body content |
| `.response.statusCode` | HTTP status code |
| `.response.headers` | Response headers |
| `.response.httpVersion` | HTTP version |
| `.response.redirects` | Redirect information |

{{% collapse-content title="Example JSON" level="p" %}}

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
  "timings": {
    "tcp": 6.9,
    "download": 33.5,
    "total": 75,
    "dns": 7.5,
    "firstByte": 17.2,
    "ssl": 9.9
  },
  "request": {
    "url": "https://www.datadoghq.com",
    "host": "datadoghq.com",
    "method": "GET"
  },
  "response": {
    "body": "Example Page Content",
    "statusCode": 200,
    "headers": {
      "content-type": "text/html; charset=utf-8",
      "content-length": "250661"
    },
    "httpVersion": "1.1",
    "redirects": [
      {
        "location": "https://datadoghq.com",
        "statusCode": 302
      }
    ]
  }
}
```

{{% /collapse-content %}}

## Network tests

{{% collapse-content title="WebSocket" level="h3" %}}

| Variable | Description |
|----------|-------------|
| `.timings.open` | Time to open connection (in milliseconds) |
| `.timings.receive` | Time to receive response |
| `.handshake.request` | Handshake request data |
| `.handshake.response` | Handshake response data |
| `.request.message` | WebSocket request message |
| `.response.message` | WebSocket response message |
| `.close.reason` | Connection close reason |
| `.close.statusCode` | Connection close status code |

**Example:**

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

{{% /collapse-content %}}

{{% collapse-content title="gRPC" level="h3" %}}

| Variable | Description |
|----------|-------------|
| `.callType` | Call type (`unary` or `healthcheck`) |
| `.timings.rpc` | RPC call timing |
| `.response.healthcheck.status` | Health check status |
| `.request.message` | gRPC request message |
| `.response.message` | gRPC response message |

**Example:**

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
    "message": "Pong"
  }
}
```

{{% /collapse-content %}}

{{% collapse-content title="UDP" level="h3" %}}

| Variable | Description |
|----------|-------------|
| `.request.message` | UDP request message |
| `.response.message` | UDP response message |
| `.timings.message` | Message timing |

**Example:**

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

{{% /collapse-content %}}

{{% collapse-content title="TCP" level="h3" %}}

| Variable | Description |
|----------|-------------|
| `.connectionOutcome` | Connection result |
| `.netpath.routers.ip` | Router IP addresses |
| `.traceroute.latency.min` | Minimum latency |
| `.traceroute.latency.max` | Maximum latency |
| `.traceroute.latency.avg` | Average latency |
| `.traceroute.latency.stddev` | Standard deviation |
| `.traceroute.latency.values` | Latency values array |

**Example:**

```json
[
  {
    "packetLossPercentage": 0,
    "packetsReceived": 2,
    "latency": {
      "avg": 0.2375,
      "min": 0.189,
      "max": 0.286,
      "values": [0.189, 0.286],
      "stddev": 0.048
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

{{% /collapse-content %}}

{{% collapse-content title="ICMP" level="h3" %}}

| Variable | Description |
|----------|-------------|
| `.traceroute` | Same structure as TCP traceroute |
| `.request.host` | Target host |
| `.ping` | Ping results |
| `.latency.min`, `.latency.max`, `.latency.avg`, `.latency.stddev`, `.latency.values` | Latency measurements |

**Example:**

```json
{
  "ping": {
    "packetLossPercentage": 0,
    "packetsReceived": 4,
    "latency": {
      "avg": 1.47375,
      "min": 1.442,
      "max": 1.516,
      "values": [1.467, 1.442, 1.47, 1.516],
      "stddev": 0.0267
    },
    "resolvedIp": "18.245.199.70",
    "packetsSent": 4,
    "packetSize": 56
  }
}
```

{{% /collapse-content %}}

## Protocol tests

{{% collapse-content title="SSL" level="h3" %}}

| Variable | Description |
|----------|-------------|
| `.cert` | SSL certificate information |
| `.cipher` | Cipher suite used |
| `.issuer` | Certificate issuer |
| `.subject` | Certificate subject |
| `.valid.from` | Certificate valid from date |
| `.valid.to` | Certificate valid to date |
| `.ocsp` | OCSP (Online Certificate Status Protocol) information |
| `.timings.handshake` | SSL handshake timing |

**Example:**

```json
{
  "cipher": "TLS_AES_128_GCM_SHA256",
  "issuer": {
    "C": "US",
    "CN": "DigiCert Global G2 TLS RSA SHA256 2020 CA1",
    "O": "DigiCert Inc"
  },
  "valid": {
    "from": 1751414400000,
    "to": 1783036799000
  }
}
```

{{% /collapse-content %}}

{{% collapse-content title="DNS" level="h3" %}}

| Variable | Description |
|----------|-------------|
| `.response.records.type` | DNS record type |
| `.response.records.values` | DNS record values |

**Example:**

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

{{% /collapse-content %}}

## Step summary

**Accessing steps by index (0-based):**

| Syntax | Description |
|--------|-------------|
| `.steps.0` | First step |
| `.steps.1` | Second step |
| `.steps.-1` | Last step |
| `.steps.-2` | Step before last |

**Accessing steps by name or ID:**

| Syntax | Description |
|--------|-------------|
| `.steps[Click button]` | By step name |
| `.steps.abc-def-ghi` | By step ID |

Then access data as usual: `.steps.-1.status`, `.steps[Click button].status`, `.steps.abc-def-ghi.status`

**Step properties:**

| Variable | Description |
|----------|-------------|
| `.id` | Step identifier |
| `.status` | Step status |
| `.type` | Step type |
| `.duration` | Step duration |
| `.description` | Step description |
| `.failure.message` | Failure message |
| `.failure.code` | Failure code |
| `.url` | Step URL |

**Summary data:**

| Variable | Description |
|----------|-------------|
| `.count.steps.total` | Total number of steps |
| `.count.steps.completed` | Completed steps count |
| `.count.errors` | Error count |
| `.count.hops` | Hop count |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

