---
title: Synthetic Monitoring Template Variables
aliases:
  - /synthetics/guide/synthetic-test-monitors/
further_reading:
- link: "/synthetics/notifications/step_data_variables/"
  tag: "Documentation"
  text: "Step Data Template Variables"
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/templates/"
  tag: "Documentation"
  text: "Learn more about monitor templates"
---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. Access these variables using the `synthetics.attributes` prefix.

<div class="alert alert-info">Not all variables are available for every test type. You can export test results as a JSON file from the <strong>Actions</strong> tab to verify available data and reference paths directly in your monitor configuration.</div>

## Test execution attributes

Use the following template variables to customize your Synthetic Monitoring alert notifications. Each section contains variables for different attributes that you can reference in your notification messages.

### Test info
| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.test}}` | The `test` object containing `name`, `type`, `subtype`, and `id` |
| `{{synthetics.attributes.test.name}}` | The name of the test |
| `{{synthetics.attributes.test.type}}` | Test type (for example, `api`) |
| `{{synthetics.attributes.test.subType}}` | Subtype for API tests (for example, `http`, `dns`, `multi`) |
| `{{synthetics.attributes.test.id}}` | The test's public ID (for example, `abc-def-ghi`) |

### Location
| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.location}}` | The `location` object containing test execution location data |
| `{{synthetics.attributes.location.id}}` | Location ID (for example, `aws:eu-central-1`) |
| `{{synthetics.attributes.location.name}}` | Name of the location (for example, `Frankfurt (AWS)`) |
| `{{synthetics.attributes.location.privateLocation}}` | `true` for Private Locations |

### Device

Applies to browser and mobile tests.

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.device}}` | The `device` object containing device information |
| `{{synthetics.attributes.device.id}}` | Device identifier |
| `{{synthetics.attributes.device.name}}` | Human-readable device name |
| `{{synthetics.attributes.device.type}}` | Device type classification |
| `{{synthetics.attributes.device.width}}`, `{{synthetics.attributes.device.height}}` | Screen resolution dimensions |
| `{{synthetics.attributes.device.browser.type}}` | Browser type (browser tests only) |
| `{{synthetics.attributes.device.platform.name}}`, `{{synthetics.attributes.device.platform.version}}` | Platform information (mobile tests only) |

{{% collapse-content title="Example JSON" level="p" %}}

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

{{% /collapse-content %}}

### Result
| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.result}}` | The `result` object containing test execution data |
| `{{synthetics.attributes.result.id}}` | Unique result ID |
| `{{synthetics.attributes.result.status}}` | Test execution status (for example, `passed` or `failed`) |
| `{{synthetics.attributes.result.duration}}` | Test duration in milliseconds |
| `{{synthetics.attributes.result.testStartedAt}}` | Test start time (epoch milliseconds) |
| `{{synthetics.attributes.result.testFinishedAt}}` | Test finish time (epoch milliseconds) |
| `{{synthetics.attributes.result.testTriggeredAt}}` | Test trigger time (epoch milliseconds) |
| `{{synthetics.attributes.result.failure}}` | The `failure` object with failure details |
| `{{synthetics.attributes.result.failure.message}}` | The failure message |
| `{{synthetics.attributes.result.failure.code}}` | The failure code |

{{% collapse-content title="Example JSON" level="p" %}}

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

{{% /collapse-content %}}

## Variable attributes

### Local config variables

Local variables configured for API tests or defined outside individual steps in step-based tests. This also includes variables created by JavaScript code execution.

Located at `{{synthetics.attributes.result.variables.config}}`:

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.result.variables.config.name}}` | Variable name |
| `{{synthetics.attributes.result.variables.config.type}}` | Variable type |
| `{{synthetics.attributes.result.variables.config.secure}}` | Whether the variable value is obfuscated |
| `{{synthetics.attributes.result.variables.config.value}}` | Variable value (non-obfuscated only) |

{{% collapse-content title="Example JSON" level="p" %}}

```json
{
  "name": "RANDOM_NUMBER",
  "type": "text",
  "secure": false,
  "value": "133245995"
}
```

{{% /collapse-content %}}

### Global variables

Extracted variables whose value updates a global variable value. Available only for **successful test results** and **recovery notifications**.

Located at `{{synthetics.attributes.result.variables.extracted}}`:

| Variable | Description |
|----------|-------------|
| `{{synthetics.attributes.result.variables.extracted.id}}` | Global variable ID |
| `{{synthetics.attributes.result.variables.extracted.name}}` | Variable name |
| `{{synthetics.attributes.result.variables.extracted.secure}}` | Whether the variable value is obfuscated |
| `{{synthetics.attributes.result.variables.extracted.val}}` | Variable value (note: uses `.val`, not `.value`) |

{{% collapse-content title="Example JSON" level="p" %}}

```json
{
  "id": "ec734823-536e-4aba-8b5f-55733189d936",
  "name": "EXTRACTED_NUMBER",
  "secure": false,
  "val": "250661"
}
```

{{% /collapse-content %}}

### Step extracted variables

For tests with steps, step data is contained in `{{synthetics.attributes.result.steps}}`.

| Variable | Description |
|----------|-------------|
| `synthetics.attributes.result.steps.extractedValue.name` | Variable name |
| `synthetics.attributes.result.steps.extractedValue.secure` | Whether the variable value is obfuscated |
| `synthetics.attributes.result.steps.extractedValue.value` | Variable value (if step was successful) |

{{% collapse-content title="Example JSON" level="p" %}}

```json
{
  "extractedValue": {
    "name": "EXTRACTED_COUNT",
    "secure": false,
    "value": "12"
  }
}
```

{{% /collapse-content %}}

## Step data

For detailed template variables related to individual test steps, including browser tests, mobile tests, API tests, network tests, and protocol tests, see [Step Data Template Variables][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/notifications/step_data_variables/
