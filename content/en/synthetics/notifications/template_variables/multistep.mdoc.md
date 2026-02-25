---
title: Multistep API test template variables
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

Template variables allow you to insert dynamic values from your Multistep API test results and configuration into notification messages. These variables are accessed using the `synthetics.attributes` prefix.

{% partial file="synthetics/notifications/test_execution_variables.mdoc.md" /%}

{% partial file="synthetics/notifications/execution_results.mdoc.md" /%}

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
{% alert level="info" %}
Device information is not available for Multistep API tests. Device variables are only available for **Browser** and **Mobile** tests.
{% /alert %}
{% /tab %}
{% /tabs %}

### Failed step information

Path: `synthetics.failed_step`

Use these variables to access information about the step that caused a test failure.

`{{synthetics.failed_step}}`
: The `failed_step` object provides a shortcut to the step that caused the test to fail, eliminating the need to reference `{{synthetics.attributes.result.steps.<step-index>}}` directly.

`{{synthetics.failed_step.name}}`
: Multistep API shortcut for `{{synthetics.attributes.result.steps.<step-index>.name}}`

### Step execution details

Path: `synthetics.attributes.variables.extracted`

These are step execution metadata and results containing detailed information about how each step ran, including response data, timing metrics, and protocol-specific details. These values are only available when the step completes successfully.

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

**Multistep-specific:**

`synthetics.attributes.variables.extracted.name`
: Step name

`synthetics.attributes.variables.extracted.type`
: Step type

{% partial file="synthetics/notifications/local_global_variables.mdoc.md" /%}

{% partial file="synthetics/notifications/step_summary.mdoc.md" /%}
