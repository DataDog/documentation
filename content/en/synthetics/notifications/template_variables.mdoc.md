---
title: Synthetic Monitoring Template Variables
aliases:
- /synthetics/notifications/template_variables_cdocs
content_filters:
- trait_id: platform
  option_group_id: synthetics_test_type_options
  label: "Test Type"
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

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. These variables are accessed using the `synthetics.attributes` prefix.

<!-- Test execution -->
{% if equals($synthetics_variables, "execution") %}

{% partial file="synthetics/notifications/test_execution_variables.mdoc.md" /%}

{% /if %}
<!-- end Test execution -->

<!-- Test metadata -->
{% if equals($synthetics_variables, "test_metadata") %}

{% partial file="synthetics/notifications/test_metadata.mdoc.md" /%}

{% /if %}
<!-- end Test metadata -->

<!-- Device info -->
{% if equals($synthetics_variables, "device_info") %}

### Device information

Path: `synthetics.attributes.device`

Use these variables to access device information for Browser and Mobile tests.

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
{% /if %}
{% if equals($platform, "browser") %}

**Browser-specific:**

`{{synthetics.attributes.device.browser.type}}`
: Browser type (for example, `chrome`)
{% /if %}
{% if equals($platform, "mobile") %}

**Mobile-specific:**

`{{synthetics.attributes.device.platform.name}}`, `{{synthetics.attributes.device.platform.version}}`
: Platform information (for example, `android`, `ios`)
{% /if %}

{% /if %}
<!-- end Device info -->

<!-- Execution results -->
{% if equals($synthetics_variables, "execution_results") %}

{% partial file="synthetics/notifications/execution_results.mdoc.md" /%}

{% /if %}
<!-- end Execution results -->

<!-- Failed step info -->
{% if equals($synthetics_variables, "failed_step_info") %}

### Failed step information

Path: `synthetics.failed_step`

Use these variables to access information about the step that caused a test failure.

{% if not(or(equals($platform, "browser"), equals($platform, "mobile"), equals($platform, "multistep"))) %}
{% alert level="info" %}
Failed step information is only available for Multistep API, Browser, and Mobile tests.
{% /alert %}
{% /if %}
{% if or(equals($platform, "browser"), equals($platform, "mobile"), equals($platform, "multistep")) %}

`{{synthetics.failed_step}}`
: The `failed_step` object provides a shortcut to the step that caused the test to fail, eliminating the need to reference `{{synthetics.attributes.result.steps.<step-index>}}` directly.

{% table %}
* Shortcut {% colspan=2 %}
* Test Type
* Maps To
---
* `{{synthetics.failed_step.name}}` {% colspan=2 %}
* Multistep API
* `{{synthetics.attributes.result.steps.<step-index>.name}}`
---
* `{{synthetics.failed_step.description}}` {% colspan=2 %}
* Browser, Mobile
* `{{synthetics.attributes.result.steps.<step-index>.description}}`
{% /table %}

{% alert level="tip" %}
Review the [conditional alerting](/synthetics/notifications/conditional_alerting/#send-alerts-to-a-specific-slack-channel-based-on-failed-step-using-a-variable-shortcut) page for an example of how to use the `synthetics.failed_step.description` shortcut variable in a Browser Test notification.
{% /alert %}

{% /if %}

{% /if %}
<!-- end Failed step info -->

<!-- Local & Global Variables -->
{% if equals($synthetics_variables, "local_global_variables") %}

{% partial file="synthetics/notifications/local_global_variables.mdoc.md" /%}

{% /if %}
<!-- end Local & Global Variables -->

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

{% if equals($platform, "browser") %}
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
{% /if %}

{% if equals($platform, "mobile") %}
**Mobile-specific:**

`synthetics.attributes.variables.extracted.application.versionId`
: Mobile application version identifier

`synthetics.attributes.variables.extracted.apiTest`
: API test data (for API test steps within mobile tests)

`synthetics.attributes.variables.extracted.description`
: Step description
{% /if %}

{% if equals($platform, "multistep") %}
**Multistep-specific:**

`synthetics.attributes.variables.extracted.name`
: Step name

`synthetics.attributes.variables.extracted.type`
: Step type

*Note: Follow regular API fields per subType*
{% /if %}
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
<!-- end Step -->

{% partial file="synthetics/notifications/step_summary.mdoc.md" /%}
