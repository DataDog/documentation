<!--
This partial contains local & global variables content that is reused across
template_variables.mdoc.md and api_template_variables.mdoc.md
-->

### Local & Global Variables

Use these variables to access locally configured variables and globally defined variables in your notifications.

{% tabs %}
{% tab label="Local" %}

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

{% /tab %}
{% tab label="Global" %}

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

{% /tab %}
{% /tabs %}
