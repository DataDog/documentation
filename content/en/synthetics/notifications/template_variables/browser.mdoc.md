---
title: Browser testing template variables
content_filters:
- trait_id: synthetics_variables
  option_group_id: synthetics_variables_options
  label: "Variables"
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

Template variables allow you to insert dynamic values from your browser test results and configuration into notification messages. These variables are accessed using the `synthetics.attributes` prefix.

{% alert level="info" %}
Use the filter above to view variables by category.
{% /alert %}

<!-- Test results -->
{% if equals($synthetics_variables, "test_results") %}

This section covers two categories of variables:

- [Test execution variables](#test-execution-variables): Shortcuts for commonly used values such as failure messages, step counts, duration, and tags.
- [Execution results](#execution-results): The full result object with status, timestamps, failure codes, and step counts.

{% partial file="synthetics/notifications/test_execution_variables.mdoc.md" /%}

{% partial file="synthetics/notifications/execution_results.mdoc.md" /%}

{% /if %}
<!-- end Test results -->

<!-- Test info -->
{% if equals($synthetics_variables, "test_info") %}

### Test metadata

Path: `synthetics.attributes`

Use these variables to access test configuration and execution location information.

{% tabs %}
{% tab label="Test Info" %}
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
{% /tab %}
{% tab label="Location" %}
`{{synthetics.attributes.location}}`
: The `location` object contains information about the location of where the test is run from

`{{synthetics.attributes.location.id}}`
: Location ID (for example, `aws:eu-central-1`)

`{{synthetics.attributes.location.name}}`
: Name of the location (for example, `Frankfurt (AWS)`)

`{{synthetics.attributes.location.privateLocation}}`
: `true` for Private Locations
{% /tab %}
{% tab label="Device" %}
Path: `synthetics.attributes.device`

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

**Browser-specific:**

`{{synthetics.attributes.device.browser.type}}`
: Browser type (for example, `chrome`)
{% /tab %}
{% /tabs %}

{% /if %}
<!-- end Test info -->

<!-- Step details -->
{% if equals($synthetics_variables, "step_details") %}

This section covers step-level variables organized by category:

- [Failed step information](#failed-step-information): Shortcuts for the step that caused a test failure.
- [Step execution details](#step-execution-details): Metadata and results for each step, including extracted variable values.

### Failed step information

Path: `synthetics.failed_step`

Use these variables to access information about the step that caused a test failure.

`{{synthetics.failed_step}}`
: The `failed_step` object provides a shortcut to the step that caused the test to fail, eliminating the need to reference `{{synthetics.attributes.result.steps.<step-index>}}` directly.

`{{synthetics.failed_step.description}}`
: Shortcut for `{{synthetics.attributes.result.steps.<step-index>.description}}`

{% alert level="tip" %}
Review the [conditional alerting][1] page for an example of how to use the `synthetics.failed_step.description` shortcut variable in a browser test notification.
{% /alert %}

### Step execution details

Path: `synthetics.attributes.variables.extracted`

These are step execution metadata and results containing detailed information about how each step ran, including response data, timing metrics, and protocol-specific details. These values are only available when the step completes successfully.

{% tabs %}
{% tab label="General steps" %}
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

**Browser-specific:**

`{{synthetics.attributes.result.startUrl}}`
: URL from test configuration

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

`synthetics.attributes.variables.extracted.warnings`
: List of warnings, each containing `.message` (the warning message) and `.type` (the warning type: `invalid_config`, `user_locator`, or `unable_to_compute_tti`)
{% /tab %}

{% tab label="Extracted values" %}
Path: `synthetics.attributes.result.steps.<step-index>.extractedValue`

These are the actual variable values that a step captured during test execution. For example, if you have a browser test step that extracts text from a page element into a variable, this is where you access that extracted value.

For information on how to access the `<step-index>`, see the step summary section.

`synthetics.attributes.result.steps.<step-index>.extractedValue.name`
: Variable name

`synthetics.attributes.result.steps.<step-index>.extractedValue.secure`
: Whether the variable value is obfuscated

`synthetics.attributes.result.steps.<step-index>.extractedValue.value`
: Variable value (if step was successful)
{% /tab %}

{% tab label="Sub-tests" %}
`synthetics.attributes.variables.extracted.steps.subTest.id`
: Subtest identifier

`synthetics.attributes.variables.extracted.steps.subStep.parentStep.id`
: Parent step identifier

`synthetics.attributes.variables.extracted.steps.subStep.parentTest.id`
: Parent test identifier

`synthetics.attributes.variables.extracted.steps.subStep.level`
: Nesting level (1 for subtests, 2 for subtests of subtests)
{% /tab %}
{% /tabs %}

{% /if %}
<!-- end Step details -->

<!-- Variables -->
{% if equals($synthetics_variables, "local_and_global") %}

{% partial file="synthetics/notifications/local_global_variables.mdoc.md" /%}

{% /if %}
<!-- end Variables -->

{% partial file="synthetics/notifications/step_summary.mdoc.md" /%}

[1]: /synthetics/notifications/conditional_alerting/#send-alerts-to-a-specific-slack-channel-based-on-failed-step-using-a-variable-shortcut
