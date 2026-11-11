### Test execution variables

Path: `synthetics` (various shortcuts)

Use these variables to access common test execution data such as failure messages, step counts, duration, and tags.

`{{synthetics.failed_step.failure.message}}`
: The error message (for example, `Element's content should match the given regex`).

`{{synthetics.result.step_count}}`
: Number of steps (for example, `4`).

`{{synthetics.result.duration}}`
: Duration of the test run (in milliseconds) (for example, `9096`).

`{{tags}}`
: Lists all the tags added to the synthetics test.
: To access individual tag values, use `{{tags.<tag-key>}}`. For example, if your test is tagged with `env:prod`, use `{{tags.env}}` to return the tag value `prod`.
