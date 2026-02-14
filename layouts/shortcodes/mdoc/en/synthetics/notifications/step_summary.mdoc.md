<!--
This partial contains step summary content that is reused across
template_variables.mdoc.md and api_template_variables.mdoc.md
-->

## Step summary

Path: `synthetics.attributes.result.steps`

Access step data by index, name, or ID to reference specific steps in your notification messages. Use these reference methods when working with step-related variables throughout this documentation.

Each step exposes the following properties: `.id`, `.status`, `.type`, `.duration`, `.description`, `.failure.message`, `.code`, and `.url`.

You can reference steps in three ways:

{% tabs %}
{% tab label="By index" %}
Use positive numbers to count from the beginning, or negative numbers to count from the end:

`synthetics.attributes.result.steps.0`
: First step

`synthetics.attributes.result.steps.1`
: Second step

`synthetics.attributes.result.steps.-1`
: Last step

`synthetics.attributes.result.steps.-2`
: Second to last step

**Example:** `{{synthetics.attributes.result.steps.-1.status}}` returns the status of the last step.
{% /tab %}

{% tab label="By name" %}
Use the step name in brackets:

`synthetics.attributes.result.steps[Click button]`
: References the step named "Click button"

**Example:** `{{synthetics.attributes.result.steps[Click button].status}}` returns the status of the step named "Click button".
{% /tab %}

{% tab label="By ID" %}
Use the step's unique identifier:

`synthetics.attributes.result.steps.abc-def-ghi`
: References the step with ID "abc-def-ghi"

**Example:** `{{synthetics.attributes.result.steps.abc-def-ghi.status}}` returns the status of the step with step ID "abc-def-ghi".
{% /tab %}
{% /tabs %}

{% alert level="tip" %}
Review the [conditional alerting](/synthetics/notifications/conditional_alerting/) page for an example of how to use the `synthetics.attributes.result.step` variable in a Slack notification based on a failed step.
{% /alert %}

### Accessing step properties

Combine any reference method with a property:

- `{{synthetics.attributes.result.steps.-1.status}}` - Status of the last step
- `{{synthetics.attributes.result.steps[Click button].status}}` - Status of the step named "Click button"
- `{{synthetics.attributes.result.steps.abc-def-ghi.status}}` - Status of the step with step ID "abc-def-ghi"
