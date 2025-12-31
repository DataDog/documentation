---
title: Browser and Mobile Test Variables
further_reading:
- link: "/synthetics/notifications/template_variables/"
  tag: "Documentation"
  text: "Template Variables Overview"
- link: "/synthetics/notifications/template_variables/api/"
  tag: "Documentation"
  text: "API Test Variables"

multifiltersearch:
  headers:
    - name: Variable
      id: variable
    - name: Test Type
      id: test_type
      filter_by: true
    - name: Category
      id: category
      filter_by: true
    - name: Description
      id: description
  data:
    # Test Info - All test types
    - variable: '`{{synthetics.attributes.test}}`'
      test_type: All
      category: Test Info
      description: The test object containing name, type, subtype, and id
    - variable: '`{{synthetics.attributes.test.name}}`'
      test_type: All
      category: Test Info
      description: The name of the test
    - variable: '`{{synthetics.attributes.test.type}}`'
      test_type: All
      category: Test Info
      description: 'Test type (for example, `browser`)'
    - variable: '`{{synthetics.attributes.test.id}}`'
      test_type: All
      category: Test Info
      description: 'The test public ID (for example, `abc-def-ghi`)'

    # Location - All test types
    - variable: '`{{synthetics.attributes.location}}`'
      test_type: All
      category: Location
      description: The location object for where the test runs
    - variable: '`{{synthetics.attributes.location.id}}`'
      test_type: All
      category: Location
      description: 'Location ID (for example, `aws:eu-central-1`)'
    - variable: '`{{synthetics.attributes.location.name}}`'
      test_type: All
      category: Location
      description: 'Name of the location (for example, `Frankfurt (AWS)`)'
    - variable: '`{{synthetics.attributes.location.privateLocation}}`'
      test_type: All
      category: Location
      description: '`true` for Private Locations'

    # Device - Browser
    - variable: '`{{synthetics.attributes.device}}`'
      test_type: Browser
      category: Device
      description: The device object for the test environment
    - variable: '`{{synthetics.attributes.device}}`'
      test_type: Mobile
      category: Device
      description: The device object for the test environment
    - variable: '`{{synthetics.attributes.device.id}}`'
      test_type: Browser
      category: Device
      description: Device identifier
    - variable: '`{{synthetics.attributes.device.id}}`'
      test_type: Mobile
      category: Device
      description: Device identifier
    - variable: '`{{synthetics.attributes.device.name}}`'
      test_type: Browser
      category: Device
      description: Human-readable device name
    - variable: '`{{synthetics.attributes.device.name}}`'
      test_type: Mobile
      category: Device
      description: Human-readable device name
    - variable: '`{{synthetics.attributes.device.type}}`'
      test_type: Browser
      category: Device
      description: Device type classification
    - variable: '`{{synthetics.attributes.device.type}}`'
      test_type: Mobile
      category: Device
      description: Device type classification
    - variable: '`{{synthetics.attributes.device.width}}`'
      test_type: Browser
      category: Device
      description: Screen width in pixels
    - variable: '`{{synthetics.attributes.device.width}}`'
      test_type: Mobile
      category: Device
      description: Screen width in pixels
    - variable: '`{{synthetics.attributes.device.height}}`'
      test_type: Browser
      category: Device
      description: Screen height in pixels
    - variable: '`{{synthetics.attributes.device.height}}`'
      test_type: Mobile
      category: Device
      description: Screen height in pixels
    - variable: '`{{synthetics.attributes.device.browser.type}}`'
      test_type: Browser
      category: Device
      description: Browser type
    - variable: '`{{synthetics.attributes.device.platform.name}}`'
      test_type: Mobile
      category: Device
      description: Platform name (iOS, Android)
    - variable: '`{{synthetics.attributes.device.platform.version}}`'
      test_type: Mobile
      category: Device
      description: Platform version

    # Result - All test types
    - variable: '`{{synthetics.attributes.result}}`'
      test_type: All
      category: Result
      description: The result object for the executed test run
    - variable: '`{{synthetics.attributes.result.id}}`'
      test_type: All
      category: Result
      description: Unique result ID
    - variable: '`{{synthetics.attributes.result.status}}`'
      test_type: All
      category: Result
      description: 'Test execution status (`passed` or `failed`)'
    - variable: '`{{synthetics.attributes.result.duration}}`'
      test_type: All
      category: Result
      description: Test duration in milliseconds
    - variable: '`{{synthetics.attributes.result.testStartedAt}}`'
      test_type: All
      category: Result
      description: Epoch timestamp when test started (milliseconds)
    - variable: '`{{synthetics.attributes.result.testFinishedAt}}`'
      test_type: All
      category: Result
      description: Epoch timestamp when test finished (milliseconds)
    - variable: '`{{synthetics.attributes.result.testTriggeredAt}}`'
      test_type: All
      category: Result
      description: Epoch timestamp when test was triggered (milliseconds)
    - variable: '`{{synthetics.attributes.result.failure}}`'
      test_type: All
      category: Result
      description: The failure object with failure details
    - variable: '`{{synthetics.attributes.result.failure.message}}`'
      test_type: All
      category: Result
      description: The failure message
    - variable: '`{{synthetics.attributes.result.failure.code}}`'
      test_type: All
      category: Result
      description: The failure code
    - variable: '`{{synthetics.attributes.result.startUrl}}`'
      test_type: Browser
      category: Result
      description: URL from test configuration

    # Count
    - variable: '`{{synthetics.attributes.count}}`'
      test_type: Browser
      category: Count
      description: The count object with step statistics
    - variable: '`{{synthetics.attributes.count}}`'
      test_type: Mobile
      category: Count
      description: The count object with step statistics
    - variable: '`{{synthetics.attributes.count.steps.total}}`'
      test_type: Browser
      category: Count
      description: The total number of steps
    - variable: '`{{synthetics.attributes.count.steps.total}}`'
      test_type: Mobile
      category: Count
      description: The total number of steps
    - variable: '`{{synthetics.attributes.count.steps.completed}}`'
      test_type: Browser
      category: Count
      description: The number of steps that were run
    - variable: '`{{synthetics.attributes.count.steps.completed}}`'
      test_type: Mobile
      category: Count
      description: The number of steps that were run
    - variable: '`{{synthetics.attributes.count.errors}}`'
      test_type: Browser
      category: Count
      description: Total number of browser errors
    - variable: '`{{synthetics.attributes.count.errors}}`'
      test_type: Mobile
      category: Count
      description: Total number of failed steps

    # Local Config Variables
    - variable: '`{{synthetics.attributes.result.variables.config}}`'
      test_type: All
      category: Local Variables
      description: Local variables configured for the test
    - variable: '`{{synthetics.attributes.result.variables.config.name}}`'
      test_type: All
      category: Local Variables
      description: Variable name
    - variable: '`{{synthetics.attributes.result.variables.config.type}}`'
      test_type: All
      category: Local Variables
      description: Variable type
    - variable: '`{{synthetics.attributes.result.variables.config.secure}}`'
      test_type: All
      category: Local Variables
      description: Whether the variable value is obfuscated
    - variable: '`{{synthetics.attributes.result.variables.config.value}}`'
      test_type: All
      category: Local Variables
      description: Variable value (non-obfuscated only)

    # Global/Extracted Variables
    - variable: '`{{synthetics.attributes.result.variables.extracted}}`'
      test_type: All
      category: Global Variables
      description: Extracted variables that update global variable values
    - variable: '`{{synthetics.attributes.result.variables.extracted.id}}`'
      test_type: All
      category: Global Variables
      description: Global variable ID
    - variable: '`{{synthetics.attributes.result.variables.extracted.name}}`'
      test_type: All
      category: Global Variables
      description: Variable name
    - variable: '`{{synthetics.attributes.result.variables.extracted.secure}}`'
      test_type: All
      category: Global Variables
      description: Whether the variable value is obfuscated
    - variable: '`{{synthetics.attributes.result.variables.extracted.val}}`'
      test_type: All
      category: Global Variables
      description: 'Variable value (note: uses `.val`, not `.value`)'

    # Step Extracted Variables
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.name}}`'
      test_type: Browser
      category: Step Variables
      description: Extracted variable name from a specific step
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.name}}`'
      test_type: Mobile
      category: Step Variables
      description: Extracted variable name from a specific step
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.secure}}`'
      test_type: Browser
      category: Step Variables
      description: Whether the extracted value is obfuscated
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.secure}}`'
      test_type: Mobile
      category: Step Variables
      description: Whether the extracted value is obfuscated
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.value}}`'
      test_type: Browser
      category: Step Variables
      description: Extracted variable value (if step was successful)
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.value}}`'
      test_type: Mobile
      category: Step Variables
      description: Extracted variable value (if step was successful)

    # General Step Properties
    - variable: '`{{synthetics.attributes.result.steps.<index>.id}}`'
      test_type: Browser
      category: Steps
      description: Unique step identifier
    - variable: '`{{synthetics.attributes.result.steps.<index>.id}}`'
      test_type: Mobile
      category: Steps
      description: Unique step identifier
    - variable: '`{{synthetics.attributes.result.steps.<index>.status}}`'
      test_type: Browser
      category: Steps
      description: Step execution status
    - variable: '`{{synthetics.attributes.result.steps.<index>.status}}`'
      test_type: Mobile
      category: Steps
      description: Step execution status
    - variable: '`{{synthetics.attributes.result.steps.<index>.type}}`'
      test_type: Browser
      category: Steps
      description: Type of step being executed
    - variable: '`{{synthetics.attributes.result.steps.<index>.type}}`'
      test_type: Mobile
      category: Steps
      description: Type of step being executed
    - variable: '`{{synthetics.attributes.result.steps.<index>.duration}}`'
      test_type: Browser
      category: Steps
      description: Step execution duration in milliseconds
    - variable: '`{{synthetics.attributes.result.steps.<index>.duration}}`'
      test_type: Mobile
      category: Steps
      description: Step execution duration in milliseconds
    - variable: '`{{synthetics.attributes.result.steps.<index>.description}}`'
      test_type: Browser
      category: Steps
      description: Step description
    - variable: '`{{synthetics.attributes.result.steps.<index>.description}}`'
      test_type: Mobile
      category: Steps
      description: Step description
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.message}}`'
      test_type: Browser
      category: Steps
      description: Step failure message
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.message}}`'
      test_type: Mobile
      category: Steps
      description: Step failure message
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.code}}`'
      test_type: Browser
      category: Steps
      description: Step failure code
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.code}}`'
      test_type: Mobile
      category: Steps
      description: Step failure code
    - variable: '`{{synthetics.attributes.result.steps.<index>.url}}`'
      test_type: Browser
      category: Steps
      description: URL for the step
    - variable: '`{{synthetics.attributes.result.steps.<index>.allowFailure}}`'
      test_type: Browser
      category: Steps
      description: Whether the step can fail without failing the test
    - variable: '`{{synthetics.attributes.result.steps.<index>.allowFailure}}`'
      test_type: Mobile
      category: Steps
      description: Whether the step can fail without failing the test
    - variable: '`{{synthetics.attributes.result.steps.<index>.isCritical}}`'
      test_type: Browser
      category: Steps
      description: Whether the step is critical to the test
    - variable: '`{{synthetics.attributes.result.steps.<index>.isCritical}}`'
      test_type: Mobile
      category: Steps
      description: Whether the step is critical to the test

    # Subtest Information - Browser
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subTest.id}}`'
      test_type: Browser
      category: Subtests
      description: Subtest identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.parentStep.id}}`'
      test_type: Browser
      category: Subtests
      description: Parent step identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.parentTest.id}}`'
      test_type: Browser
      category: Subtests
      description: Parent test identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.level}}`'
      test_type: Browser
      category: Subtests
      description: Nesting level (1 for subtests, 2 for subtests of subtests)

    # Browser Test Specific
    - variable: '`{{synthetics.attributes.variables.extracted.apiTest.request}}`'
      test_type: Browser
      category: API Test Steps
      description: API test request configuration (for "Run API Test" steps)
    - variable: '`{{synthetics.attributes.variables.extracted.apiTest.result}}`'
      test_type: Browser
      category: API Test Steps
      description: API test result data
    - variable: '`{{synthetics.attributes.variables.extracted.assertionResult.expected}}`'
      test_type: Browser
      category: Assertions
      description: Expected value for assertions
    - variable: '`{{synthetics.attributes.variables.extracted.assertionResults.checkType}}`'
      test_type: Browser
      category: Assertions
      description: Type of assertion check
    - variable: '`{{synthetics.attributes.variables.extracted.assertionResults.actual}}`'
      test_type: Browser
      category: Assertions
      description: Actual value found during assertion
    - variable: '`{{synthetics.attributes.variables.extracted.browserErrors}}`'
      test_type: Browser
      category: Errors
      description: List of browser errors encountered
    - variable: '`{{synthetics.attributes.variables.extracted.timings.firstByte}}`'
      test_type: Browser
      category: Timings
      description: Time to first byte
    - variable: '`{{synthetics.attributes.variables.extracted.timings.tcp}}`'
      test_type: Browser
      category: Timings
      description: TCP connection timing
    - variable: '`{{synthetics.attributes.variables.extracted.description}}`'
      test_type: Browser
      category: Steps
      description: Step description
    - variable: '`{{synthetics.attributes.variables.extracted.description}}`'
      test_type: Mobile
      category: Steps
      description: Step description

    # Mobile Test Specific
    - variable: '`{{synthetics.attributes.variables.extracted.application.versionId}}`'
      test_type: Mobile
      category: Application
      description: Mobile application version identifier
    - variable: '`{{synthetics.attributes.variables.extracted.apiTest}}`'
      test_type: Mobile
      category: API Test Steps
      description: API test data (for API test steps within mobile tests)

---

## Overview

Use the filters below to find template variables for Browser and Mobile tests. Replace `<index>` in step variables with a step number (0-based), step name in brackets, or step ID. See the [step reference methods](#step-reference-methods) section for more information.

{{< multifilter-search >}}

## Step reference methods

For tests with steps (Browser, Mobile, and Multistep API tests), you can reference steps in three ways:

### By index (0-based)

Use positive numbers to count from the beginning, or negative numbers to count from the end:

| Syntax | Description |
|--------|-------------|
| `synthetics.attributes.result.steps.0` | First step |
| `synthetics.attributes.result.steps.1` | Second step |
| `synthetics.attributes.result.steps.-1` | Last step |
| `synthetics.attributes.result.steps.-2` | Second to last step |

### By step name

Use the step name in brackets:

```shell
synthetics.attributes.result.steps[Click button].status
```

### By step ID

Use the step's unique identifier:

```shell
synthetics.attributes.result.steps.abc-def-ghi.status
```

## Examples

Combine any reference method with a property:

```shell
- {{synthetics.attributes.result.steps.-1.status}} - Status of the last step
- {{synthetics.attributes.result.steps[Click button].status}} - Status of step named "Click button"
- {{synthetics.attributes.result.steps.abc-def-ghi.status}} - Status of step with ID "abc-def-ghi"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/notifications/template_variables/#step-reference-methods

