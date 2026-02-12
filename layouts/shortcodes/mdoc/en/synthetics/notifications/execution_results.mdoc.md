<!--
This partial contains execution results content that is reused across
template_variables.mdoc.md and api_template_variables.mdoc.md
-->

### Execution results

Path: `synthetics.attributes`

Use these variables to access test execution results, status, duration, and step counts.

{% tabs %}
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

For a complete list of API test error codes, see [API Testing Errors](/synthetics/api_tests/errors/). Review the [conditional alerting](/synthetics/notifications/conditional_alerting#send-alerts-based-on-an-error-code) page for an example of how to use the `synthetics.attributes.result.failure` variable in a notification.
{% /tab %}

<!-- Count -->
{% tab label="Count" %}

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
<!-- end Count -->
{% /tabs %}
