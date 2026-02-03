---
title: Synthetic Monitoring Template Variables
content_filters:
- trait_id: platform
  option_group_id: synthetics_test_type_options
  label: "Test Type"
- trait_id: synthetics_variables
  option_group_id: synthetics_variables_options
  label: "Variables"
---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. These variables are accessed using the `synthetics.attributes` prefix.

<!-- Test execution -->
{% if equals($synthetics_variables, "execution") %}

### Test execution variables

Path: `synthetics` (various shortcuts)

Use these variables to access common test execution data such as failure messages, step counts, duration, and tags.

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

`{{tags}}`
: Lists all the tags added to the synthetics test.
: To access individual tag values, use `{{tags.<tag-key>}}`. For example, if your test is tagged with `env:prod`, use `{{tags.env}}` to return the tag value `prod`.

{% /if %}
<!-- end Test execution -->

<!-- Result -->
{% if equals($synthetics_variables, "result") %}

### Result attributes

Path: `synthetics.attributes`

Use these variables to include details about the test, execution location, device, counts, and result status in your notification messages.

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
{% if not(or(equals($platform, "browser"), equals($platform, "mobile"))) %}
{% alert level="info" %}
Device information is not available for this test type. Device variables are only available for **Browser** and **Mobile** tests.
{% /alert %}
{% /if %}
{% if or(equals($platform, "browser"), equals($platform, "mobile")) %}
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

<!-- Result > Browser or Mobile > Browser -->
{% if equals($platform, "browser") %}
`{{synthetics.attributes.device.browser.type}}`
: Browser type (for example, `chrome`)

{% /if %}
<!-- end Result > Browser or Mobile > Browser -->
<!-- Result > Browser or Mobile > Mobile -->
{% if equals($platform, "mobile") %}
`{{synthetics.attributes.device.platform.name}}`, `{{synthetics.attributes.device.platform.version}}`
: Platform information (for example, `android`, `ios`)
{% /if %}
<!-- end Result > Browser or Mobile > Mobile -->
{% /if %}
{% /tab %}
{% tab label="Result" %}
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

{% /tab %}

<!-- Count -->
{% if or(equals($platform, "browser"), equals($platform, "mobile"), equals($platform, "multistep")) %}
{% tab label="Count" %}
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

{% /tab %}
{% /if %}
<!-- end Count -->
<!-- Failed step -->
{% if or(equals($platform, "browser"), equals($platform, "mobile"), equals($platform, "multistep")) %}
{% tab label="Failed step" %}
Applies to Multistep, Browser, and Mobile tests.
`{{synthetics.failed_step}}`
: The `failed_step` object provides a shortcut to the step that caused the test to fail, eliminating the need to reference `{{synthetics.attributes.result.steps.<step-index>}}` directly.

<!-- Result > Multistep -->
{% if equals($platform, "multistep") %}
`{{synthetics.failed_step.name}}`
: Maps to `{{synthetics.attributes.result.steps.<step-index>.name}}` (Multistep API)
{% /if %}
<!-- end Result > Multistep -->
<!-- Result > Browser or Mobile -->
{% if or(equals($platform, "browser"), equals($platform, "mobile")) %}
`{{synthetics.failed_step.description}}`
: Maps to `{{synthetics.attributes.result.steps.<step-index>.description}}` (Browser, Mobile)
{% /if %}
<!-- end Result > Browser or Mobile -->
{% /tab %}
{% /if %}
<!-- end Failed step -->
{% /tabs %}

{% /if %}
<!-- end Result -->

<!-- Local -->
{% if equals($synthetics_variables, "local") %}

### Local variables

Path: `synthetics.attributes.result.variables.config`

These are local variables configured for API tests or defined outside individual steps in step-based tests. This also includes variables created by JavaScript code execution.

`{{synthetics.attributes.result.variables.config.name}}`
: Variable name

`{{synthetics.attributes.result.variables.config.type}}`
: Variable type

`{{synthetics.attributes.result.variables.config.secure}}`
: Whether the variable value is obfuscated

`{{synthetics.attributes.result.variables.config.value}}`
: Variable value (non-obfuscated only)

{% /if %}
<!-- end Local -->

<!-- Global -->
{% if equals($synthetics_variables, "global") %}

### Global variables

Path: `synthetics.attributes.result.variables.extracted`

These are extracted variables whose value updates a global variable value.

Available only for **successful test results** and **recovery notifications**.

`{{synthetics.attributes.result.variables.extracted.id}}`
: Global variable ID

`{{synthetics.attributes.result.variables.extracted.name}}`
: Variable name

`{{synthetics.attributes.result.variables.extracted.secure}}`
: Whether the variable value is obfuscated

`{{synthetics.attributes.result.variables.extracted.val}}`
: Variable value (note: uses `.val`, not `.value`)

{% /if %}
<!-- end Global -->

<!-- Extracted -->
{% if equals($synthetics_variables, "extracted") %}

### Extracted variable values

Path: `synthetics.attributes.result.steps.<step-index>.extractedValue`

{% if not(or(equals($platform, "browser"), equals($platform, "mobile"))) %}
{% alert level="info" %}
**Note:** Extracted variable values at the step level are only available for Browser and Mobile tests. Select **Browser** or **Mobile** from the Test Type dropdown to see these variables.
{% /alert %}
{% /if %}

{% if or(equals($platform, "browser"), equals($platform, "mobile")) %}

These are the actual variable values that a step captured during test execution. For example, if you have a Browser test step that extracts text from a page element into a variable, this is where you access that extracted value.

For information on how to access the `<step-index>`, see the step summary section.

`synthetics.attributes.result.steps.<step-index>.extractedValue.name`
: Variable name

`synthetics.attributes.result.steps.<step-index>.extractedValue.secure`
: Whether the variable value is obfuscated

`synthetics.attributes.result.steps.<step-index>.extractedValue.value`
: Variable value (if step was successful)

{% /if %}

{% /if %}
<!-- end Extracted -->

<!-- Step -->
{% if equals($synthetics_variables, "step") %}

### Step execution details

Path: `synthetics.attributes.variables.extracted`

These are step execution metadata and results containing detailed information about how each step ran, including response data, timing metrics, and protocol-specific details. These values are only available when the step completes successfully.

<!-- Alert for single-step API tests about step execution details -->
{% if not(or(equals($platform, "browser"), equals($platform, "mobile"), equals($platform, "multistep"))) %}
{% alert level="info" %}
**Note:** Step execution details are only available for Multistep API, Browser, and Mobile tests. Select one of these test types to see step execution variables.
{% /alert %}
{% /if %}

{% tabs %}
{% if or(equals($platform, "browser"), equals($platform, "mobile"), equals($platform, "multistep")) %}
{% tab label="General" %}
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

{% /tab %}
{% /if %}
{% if equals($platform, "browser") %}
{% tab label="Browser" %}
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

{% /tab %}
{% /if %}
{% if equals($platform, "mobile") %}
{% tab label="Mobile" %}
`synthetics.attributes.variables.extracted.application.versionId`
: Mobile application version identifier

`synthetics.attributes.variables.extracted.apiTest`
: API test data (for API test steps within mobile tests)

`synthetics.attributes.variables.extracted.description`
: Step description

{% /tab %}
{% /if %}
{% if equals($platform, "multistep") %}
{% tab label="API" %}
**Multistep:**

`synthetics.attributes.variables.extracted.name`
: Step name

`synthetics.attributes.variables.extracted.type`
: Step type

*Note: Follow regular API fields per subType*

{% /tab %}
{% /if %}
{% /tabs %}

### Step summary

Path: `synthetics.attributes.result.steps`

Access step data by index, name, or ID to reference specific steps in your notification messages.

Each step exposes the following properties: `.id`, `.status`, `.type`, `.duration`, `.description`, `.failure.message`, `.code`, and `.url`.

You can reference steps in three ways:

#### By index (0-based)

Use positive numbers to count from the beginning, or negative numbers to count from the end:

`synthetics.attributes.result.steps.0`
: First step

`synthetics.attributes.result.steps.1`
: Second step

`synthetics.attributes.result.steps.-1`
: Last step

`synthetics.attributes.result.steps.-2`
: Second to last step

#### By step name

Use the step name in brackets:

`.steps[Click button]`

#### By step ID

Use the step's unique identifier:

`.steps.abc-def-ghi`

#### Accessing step properties

Combine any reference method with a property:

- `{{synthetics.attributes.result.steps.-1.status}}` - Status of the last step
- `{{synthetics.attributes.result.steps[Click button].status}}` - Status of the step named "Click button"
- `{{synthetics.attributes.result.steps.abc-def-ghi.status}}` - Status of the step with step ID "abc-def-ghi"

{% /if %}
<!-- end Step -->
