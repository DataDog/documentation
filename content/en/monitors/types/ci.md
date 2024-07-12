---
title: CI Monitor
aliases:
- /monitors/monitor_types/ci_pipelines/
- /monitors/create/types/ci_pipelines/
- /monitors/create/types/ci/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Check your monitor status"
- link: "https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/"
  tag: "Blog"
  text: "Configure pipeline alerts with Datadog CI monitors"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Once [CI Visibility is enabled][1] for your organization, you can create a CI Pipeline or CI Test monitor.

CI monitors allow you to visualize CI data and set up alerts on it. For example, create a CI Pipeline monitor to receive alerts on a failed pipeline or a job. Create a CI Test monitor to receive alerts on failed or slow tests.

## Monitor creation

To create a [CI monitor][2] in Datadog, use the main navigation: *Monitors -> New Monitor --> CI*.

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 CI monitors per account. <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

Choose between a **Pipelines** or a **Tests** monitor:

{{< tabs >}}
{{% tab "Pipelines" %}}

### Define the search query

1. Construct a search query using the same logic as a CI Pipeline explorer search.
2. Select the CI Pipeline events level:
    * **Pipeline**: Evaluates the execution of an entire pipeline, usually composed of one or more jobs.
    * **Stage**: Evaluates the execution of a group of one or more jobs in CI providers that support it.
    * **Job**: Evaluates the execution of a group of commands.
    * **Command**: Evaluates manually instrumented [custom command][1] events, which are individual commands being executed in a job.
    * **All**: Evaluates all types of events.
3. Choose to monitor over a CI Pipeline event count, facet, or measure:
    * **CI Pipeline event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of CI Pipeline events over a selected time frame, then compares it to the threshold conditions.
    * **Dimension**: Select dimension (qualitative facet) to alert over the `Unique value count` of the facet.
    * **Measure**: Select measure (quantitative facet) to alert over the numerical value of the CI Pipeline measure (similar to a metric monitor). Select the aggregation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
4. Group CI Pipeline events by multiple dimensions (optional):
    * All CI Pipeline events matching the query are aggregated into groups based on the value of up to four facets.
5. Configure the alerting grouping strategy (optional):
   * If the query has a `group by`, multi alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you could group a query by `@ci.pipeline.name` to receive a separate alert for each CI Pipeline name when the number of errors is high.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="A query for CI Status:Error that is being set to group by Test Name" style="width:100%;" >}}

#### Using formulas and functions

You can create CI Pipeline monitors using formulas and functions. This can be used, for example, to create monitors on the **rate** of an event happening, such as the rate of a pipeline failing (error rate).

The following example is of a pipeline error rate monitor using a formula that calculates the ratio of "number of failed pipeline events" (`ci.status=error`) over "number of total pipeline events" (no filter), grouped by `ci.pipeline.name` (to be alerted once per pipeline). To learn more, see the [Functions Overview][2].
{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query-fnf.png" alt="Monitor being defined with steps a, b, and c, where steps a and b are queries and step c calculates the rate from them." style="width:1000%;" >}}

<div class="alert alert-info"><strong>Note</strong>: Only up to 2 queries can be used to build the evaluation formula per monitor.</div>

[1]: /continuous_integration/pipelines/custom_commands/
[2]: /dashboards/functions/#overview
{{% /tab %}}
{{% tab "Tests" %}}

### Define the search query

1. Common monitor types: (optional) Provides a template query for each of the **New Flaky Test**, **Test Failures**, and **Test Performance** common monitor types, which you can then customize. Learn more about this feature by reading [Track new flaky tests](#track-new-flaky-tests).
2. Construct a search query using the same logic as a CI Test explorer search. For example, you can search failed tests for the `main` branch of the `myapp` test service using the following query: `@test.status:fail @git.branch:main @test.service:myapp`.
3. Choose to monitor over a CI Test event count, facet, or measure:
    * **CI Test event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of CI Pipeline test events over a selected time frame, then compares it to the threshold conditions.
    * **Dimension**: Select dimension (qualitative facet) to alert over the `Unique value count` of the facet.
    * **Measure**: Select measure (quantitative facet) to alert over the numerical value of the CI Pipeline facet (similar to a metric monitor). Select the aggregation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
4. Group CI Test events by multiple dimensions (optional):
    * All CI Test events matching the query are aggregated into groups based on the value of up to four facets.
5. Configure the alerting grouping strategy (optional):
    * If the query has a `group by`, an alert is sent for every source according to the group parameters. An alerting event is generated for each group that meets the set conditions. For example, you could group a query by `@test.full_name` to receive a separate alert for each CI Test full name when the number of errors is high. Test full name is a combination of a test suite and test name, for example: `MySuite.myTest`. In Swift, test full name is a combination of a test bundle, and suite and name, for example: `MyBundle.MySuite.myTest`.

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query.png" alt="A query for CI Status:Error that is being set to group by Pipeline Name" style="width:100%;" >}}

#### Test runs with different parameters or configurations
Use `@test.fingerprint` in the monitor `group by` when you have tests with the same test full name, but different test parameters or configurations. This way, alerts trigger for test runs with specific test parameters or configurations. Using `@test.fingerprint` provides the same granularity level as the Test Stats, Failed, and Flaky Tests section on the **Commit Overview** page.

For example, if a test with the same full name failed on Chrome, but passed on Firefox, then using the fingerprint only triggers the alert on the Chrome test run.

Using `@test.full_name` in this case triggers the alert, even though the test passed on Firefox.

#### Formulas and functions

You can create CI Test monitors using formulas and functions. For example, this can be used to create monitors on the **rate** of an event happening, such as the rate of a test failing (error rate).

The following example is a test error rate monitor using a formula that calculates the ratio of "number of failed test events" (`@test.status:fail`) over "number of total test events" (no filter), grouped by `@test.full_name` (to be alerted once per test). To learn more, see the [Functions Overview][1].

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query-fnf.png" alt="Monitor being defined with steps a, b, and c, where steps a and b are queries and step c calculates the rate from them." style="width:100%;" >}}

#### Using CODEOWNERS for notifications

You can send the notification to different teams using the `CODEOWNERS` information available in the test event.

The example below configures the notification with the following logic:
* If the test code owner is `MyOrg/my-team`, then send the notification to the `my-team-channel` Slack channel.
* If the test code owner is `MyOrg/my-other-team`, then send the notification to the `my-other-team-channel` Slack channel.

{{< code-block lang="text" >}}
{{#is_match "citest.attributes.test.codeowners" "MyOrg/my-team"}}
  @slack-my-team-channel
{{/is_match}}
{{#is_match "citest.attributes.test.codeowners" "MyOrg/my-other-team"}}
  @slack-my-other-team-channel
{{/is_match}}
{{< /code-block >}}

In the `Notification message` section of your monitor, add text similar to the code snippet above to configure monitor notifications. You can add as many `is_match` clauses as you need. For more information on Notification variables, see [Monitors Conditional Variables][2].

[1]: /dashboards/functions/#overview
[2]: /monitors/notify/variables/?tab=is_match#conditional-variables
{{% /tab %}}
{{< /tabs >}}
### Set alert conditions

* Trigger when the metric is `above`, `above or equal to`, `below`, or `below or equal to`
* The threshold during the last `5 minutes`, `15 minutes`, `1 hour`, or `custom` to set a value between `1 minute` and `2 days`
* Alert threshold `<NUMBER>`
* Warning threshold `<NUMBER>`

#### Advanced alert conditions

For detailed instructions on the advanced alert options (such as evaluation delay), see the [Monitor configuration][3] page.

### Notifications

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][4] page.

#### Samples and breaching values top list

When a CI Test or Pipeline monitor is triggered, samples or values can be added to the notification message.

| Monitor Setup                    | Can be added to notification message |
|----------------------------------|--------------------------------------|
| Ungrouped Simple-Alert count     | Up to 10 samples.                    |
| Grouped Simple-Alert count       | Up to 10 facet or measure values.    |
| Grouped Multi-Alert count        | Up to 10 samples.                    |
| Ungrouped Simple-Alert measure   | Up to 10 samples.                    |
| Grouped Simple-Alert measure     | Up to 10 facet or measure values.    |
| Grouped Multi-Alert measure        | Up to 10 facet or measure values.    |

These are available for notifications sent to Slack, Jira, webhooks, Microsoft Teams, Pagerduty, and email. **Note**: Samples are not displayed for recovery notifications.

To disable samples, uncheck the box at the bottom of the **Say what's happening** section. The text next to the box is based on your monitor's grouping (as stated above).

#### Sample examples

Include a table of CI Test 10 samples in the alert notification:
{{< img src="monitors/monitor_types/ci_tests/10_ci_tests_samples.png" alt="Top 10 CI Test samples" style="width:60%;" >}}

Include a table of CI Pipeline 10 samples in the alert notification:
{{< img src="monitors/monitor_types/ci_pipelines/10_ci_pipelines_samples.png" alt="Top 10 CI Pipeline samples" style="width:60%;" >}}

#### Notifications behavior when there is no data

A monitor that uses an event count for its evaluation query will resolve after the specified evaluation period with no data, triggering a notification. For example, a monitor configured to alert on the number of pipeline errors with an evaluation window of five minutes will automatically resolve after five minutes without any pipeline executions.

As an alternative, Datadog recommends using rate formulas. For example, instead of using a monitor on the number of pipeline failures (count), use a monitor on the rate of pipeline failures (formula), such as `(number of pipeline failures)/(number of all pipeline executions)`. In this case, when there's no data, the denominator `(number of all pipeline executions)` will be `0`, making the division `x/0` impossible to evaluate. The monitor will keep the previous known state instead of evaluating it to `0`.

This way, if the monitor triggers because there's a burst of pipeline failures that makes the error rate go above the monitor threshold, it will not clear until the error rate goes below the threshold, which can be at any time afterwards.

## Example monitors
Common monitor use cases are outlined below. Monitor queries can be modified to filter for specific branches, authors, or any other in-app facet.

### Trigger alerts for performance regressions
The `duration` metric can be used to identify pipeline and test performance regressions for any branch. Alerting on this metric can prevent performance regressions from being introduced into your codebase.

{{< img src="ci/regression_monitor.png" alt="CI pipeline regression monitor" style="width:100%;">}}

### Track new flaky tests
Test monitors have the `New Flaky Test`, `Test Failures`, and `Test Performance` common monitor types for simple monitor setup. This monitor sends alerts when new flaky tests are added to your codebase. The query is grouped by `Test Full Name` so you don't get alerted on the same new flaky test more than once.

A test run is marked as `flaky` if it exhibits flakiness within the same commit after some retries. If it exhibits flakiness multiple times (because multiple retries were executed), the `is_flaky` tag is added to the first test run that is detected as flaky.

A test run is marked as `new flaky` if that particular test has not been detected to be flaky within the same branch or default branch. Only the first test run that is detected as new flaky is marked with the `is_new_flaky` tag (regardless of the number of retries).

{{< img src="ci/flaky_test_monitor.png" alt="CI flaky test monitor" style="width:100%;">}}

For more information, see [Search and Manage CI Tests][6].

### Maintain code coverage percentage
[Custom metrics][5], such as code coverage percentage, can be created and used within monitors. The monitor below sends alerts when code coverage dips below a certain percentage, which can help with maintaining test performance over time.

{{< img src="ci/codecoveragepct_monitor_light.png" alt="CI flaky test monitor" style="width:100%;">}}

For more information, see [Code Coverage][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/
[2]: https://app.datadoghq.com/monitors/create/ci-pipelines
[3]: /monitors/configuration/#advanced-alert-conditions
[4]: /monitors/notify/
[5]: /continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[6]: /continuous_integration/search/#new-flaky-tests
[7]: /continuous_integration/tests/code_coverage