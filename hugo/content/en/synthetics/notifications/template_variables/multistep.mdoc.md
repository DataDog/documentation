---
title: Multistep API testing template variables
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

Template variables allow you to insert dynamic values from your multistep API test results and configuration into notification messages. These variables are accessed using the `synthetics.attributes` prefix.

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
{% /tabs %}

{% /if %}
<!-- end Test info -->

<!-- Step details -->
{% if equals($synthetics_variables, "step_details") %}

This section covers step-level variables organized by category:

- [Failed step information](#failed-step-information): Shortcuts for the step that caused a test failure.
- [Step execution details](#step-execution-details): Metadata and results for each step.

### Failed step information

Path: `synthetics.failed_step`

Use these variables to access information about the step that caused a test failure.

`{{synthetics.failed_step}}`
: The `failed_step` object provides a shortcut to the step that caused the test to fail, eliminating the need to reference `{{synthetics.attributes.result.steps.<step-index>}}` directly.

`{{synthetics.failed_step.name}}`
: Multistep API shortcut for `{{synthetics.attributes.result.steps.<step-index>.name}}`

`{{synthetics.failed_step.request.url}}`
: Shortcut for `{{synthetics.attributes.result.steps.<step-index>.request.url}}`, the URL that the failed step requested

`{{synthetics.failed_step.response.statusCode}}`
: Shortcut for `{{synthetics.attributes.result.steps.<step-index>.response.statusCode}}`, the HTTP status code that the failed step received (for example, `403`)

### Step execution details

Path: `synthetics.attributes.result.steps.<step-index>`

These variables contain metadata and results for each step that ran. For information on how to access the `<step-index>`, see [Step summary][1].

`synthetics.attributes.result.steps.<step-index>.allowFailure`
: Whether the step is allowed to fail without failing the entire test

`synthetics.attributes.result.steps.<step-index>.duration`
: Step execution duration in milliseconds

`synthetics.attributes.result.steps.<step-index>.failure`
: Failure information object containing `.code` and `.message`

`synthetics.attributes.result.steps.<step-index>.id`
: Unique step identifier

`synthetics.attributes.result.steps.<step-index>.isCritical`
: Whether the step is critical to the test

`synthetics.attributes.result.steps.<step-index>.status`
: Step execution status

`synthetics.attributes.result.steps.<step-index>.type`
: Type of step being executed (for example, `http`)

**Multistep-specific:**

`synthetics.attributes.result.steps.<step-index>.name`
: Step name

`synthetics.attributes.result.steps.<step-index>.request.method`, `synthetics.attributes.result.steps.<step-index>.request.url`
: HTTP method and URL of the step request

`synthetics.attributes.result.steps.<step-index>.response.statusCode`
: HTTP status code of the step response

`synthetics.attributes.result.steps.<step-index>.response.bodySize`, `synthetics.attributes.result.steps.<step-index>.response.httpVersion`
: Body size and HTTP version of the step response

`synthetics.attributes.result.steps.<step-index>.response.cacheHeaders`, `synthetics.attributes.result.steps.<step-index>.response.cdn`
: Caching headers and CDN information of the step response

{% alert level="info" %}
Step response headers and bodies aren't available in notifications.
{% /alert %}

{% /if %}
<!-- end Step details -->

<!-- Variables -->
{% if equals($synthetics_variables, "local_and_global") %}

{% partial file="synthetics/notifications/local_global_variables.mdoc.md" /%}

{% /if %}
<!-- end Variables -->

{% partial file="synthetics/notifications/step_summary.mdoc.md" /%}

[1]: #step-summary
