<!--
This partial contains test execution variables content that is reused across
template_variables.mdoc.md and api_template_variables.mdoc.md
-->

### Test execution variables

Path: `synthetics` (various shortcuts)

Use these variables to access common test execution data such as failure messages, step counts, duration, and tags.

`{{synthetics.failed_step.failure.message}}`
: The error message (for example, `Element's content should match the given regex`).

`{{synthetics.failed_step.url}}`
: The URL of the failed step (for example, `https://www.datadoghq.com/blog/`).

`{{synthetics.attributes.result.response.statusCode}}`
: The HTTP status code (for example, `403`).
: **Note:** Review the [conditional alerting](/synthetics/notifications/conditional_alerting/) page for an example of how to use this variable in a notification.

`{{synthetics.result.step_count}}`
: Number of steps (for example, `4`).

`{{synthetics.result.duration}}`
: Duration of the test run (in milliseconds) (for example, `9096`).

`{{tags}}`
: Lists all the tags added to the synthetics test.
: To access individual tag values, use `{{tags.<tag-key>}}`. For example, if your test is tagged with `env:prod`, use `{{tags.env}}` to return the tag value `prod`.
