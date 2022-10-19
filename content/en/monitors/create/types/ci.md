---
title: CI Monitor
kind: documentation
aliases:
- /monitors/monitor_types/ci_pipelines/
- /monitors/create/types/ci_pipelines/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/notify/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">CI monitors are in alpha.
</div>

## Overview

Once [CI Visibility is enabled][1] for your organization, you can create a CI Pipeline or CI Test monitor.

CI monitors allow you to visualize CI data and set up alerts on it. For example, create a CI Pipeline monitor to receive alerts on a failed pipeline or a job. Create a CI Test monitor to receive alerts on failed or slow tests.

## Monitor creation

To create a [CI monitor][2] in Datadog, use the main navigation: *Monitors -> New Monitor --> CI*.

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 CI monitors per account. <a href="/help/">Contact Support</a> to lift this limit for your account.</div>


{{< tabs >}}
{{% tab "Pipelines" %}}

To create a CI Pipeline monitor:
### Define the search query

1. Construct a search query using the same logic as a CI Pipeline explorer search.
2. Select the CI Pipeline events level to:
    * **Monitor over the `Pipeline` level**: If the `Pipeline` level is selected, the monitor will only include pipeline events for evaluation, which represent the execution of an entire pipeline, usually composed of one or more jobs.
    * **Monitor over the `Stage` level**: If the `Stage` level is selected, the monitor will only include stage events for evaluation, which represent the execution of a group of one or more jobs in CI providers that support it.
    * **Monitor over the `Job` level**: If the `Job` level is selected, the monitor will only include job events for evaluation, which represent the execution of a group of commands.
    * **Monitor over the `Command` level**: If the `Command` level is selected, the monitor will only include manually instrumented [custom command][1] events for evaluation, which represent individual commands being executed in a job.
    * **Monitor over all levels**: If the `All` level is selected, the monitor will include all types of events for evaluation.

3. Choose to monitor over a CI Pipeline event count, facet, or measure:
    * **Monitor over a CI Pipeline event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of CI Pipeline events over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a dimension**: If a dimension (qualitative facet) is selected, the monitor alerts over the `Unique value count` of the facet.
    * **Monitor over a measure**: If a measure (quantitative facet) is selected, the monitor alerts over the numerical value of the CI Pipeline facet (similar to a metric monitor) and aggregation needs to be selected (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
4. Group CI Pipeline events by multiple dimensions (optional):
   All CI Pipeline events matching the query are aggregated into groups based on the value of up to four facets.
5. Configure the alerting grouping strategy (optional):
   * If the query has a `group by`, multi alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you could group a query by `@ci.pipeline.name` to receive a separate alert for each CI Pipeline name when the number of errors is high.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="A query for CI Status:Error that is being set to group by Pipeline Name" style="width:80%;" >}}

#### Using formulas and functions

You can create CI Pipeline monitors using formulas and functions. This can be used for example to create monitors on the **rate** of an event happening, such as the rate of a pipeline failing (error rate).

The following example is of a pipeline error rate monitor using a formula that calculates the ratio of "number of failed pipeline events" (`ci.status=error`) over "number of total pipeline events" (no filter), grouped by `ci.pipeline.name` (to be alerted once per pipeline).

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query-fnf.png" alt="Monitor being defined with steps a, b, and c, where steps a and b are queries and step c calculates the rate from them." style="width:80%;" >}}

<div class="alert alert-info"><strong>Note</strong>: Only up to 2 queries can be used to build the evaluation formula per monitor.</div>

[1]: /continuous_integration/pipelines/custom_commands/
{{% /tab %}}
{{% tab "Tests" %}}

To create a CI Test monitor:
### Define the search query

1. Construct a search query using the same logic as a CI Test explorer search. For example, you can search failed tests for the `main` branch of the `myapp` test service using the following query: `@test.status:fail @git.branch:main @test.service:myapp`
2. Choose to monitor over a CI Test event count, facet, or measure:
    * **Monitor over a CI Test event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of CI Test events over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a dimension**: If a dimension (qualitative facet) is selected, the monitor alerts over the `Unique value count` of the facet.
    * **Monitor over a measure**: If a measure (quantitative facet) is selected, the monitor alerts over the numerical value of the CI Test facet (similar to a metric monitor) and an aggregation needs to be selected (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).

3. Group CI Test events by multiple dimensions (optional):
   All CI Test events matching the query are aggregated into groups based on the value of up to four facets.
4. Configure the alerting grouping strategy (optional):
   * If the query has a `group by`, an alert is sent for every source according to the group parameters. An alerting event is generated for each group that meets the set conditions. For example, you could group a query by `@test.full_name` to receive a separate alert for each CI Test full name when the number of errors is high. Test full name is a combination of a test suite and test name, for example: `MySuite.myTest`. In Swift, test full name is a combination of a test bundle, and suite and name, for example: `MyBundle.MySuite.myTest`.

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query.png" alt="A query for CI Status:Error that is being set to group by Pipeline Name" style="width:80%;" >}}

#### Test runs with different parameters or configurations
If you run tests with the same test full name, but different test parameters or configurations, it's recommended to use `@test.fingerprint` in the monitor group by. This way, alerts trigger for test runs with specific test parameters or configurations. Using `@test.fingerprint` provides the same granularity level as the Test Stats, Failed and Flaky Tests section on the **Commit Overview** page.

For example, if a test with the same full name failed on Chrome, but passed on Firefox, then using the fingerprint only triggers the alert on the Chrome test run.

Using `@test.full_name` in this case triggers the alert, even though the test passed on Firefox.

#### Formulas and functions

You can create CI Test monitors using formulas and functions. For example, this can be used to create monitors on the **rate** of an event happening, such as the rate of a test failing (error rate).

The following example is a test error rate monitor using a formula that calculates the ratio of "number of failed test events" (`@test.status:fail`) over "number of total test events" (no filter), grouped by `@test.full_name` (to be alerted once per test).

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query-fnf.png" alt="Monitor being defined with steps a, b, and c, where steps a and b are queries and step c calculates the rate from them." style="width:80%;" >}}

<div class="alert alert-info"><strong>Note</strong>: A maximum of two queries can be used to build the evaluation formula per monitor.</div>

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

In the `Notification message` section of your monitor, add text similar to the code snippet above to configure monitor notifications. You can add as many `is_match` clauses as you need.

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

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][4] page.

#### Notifications behavior when there is no data

A monitor that uses an event count, or a formula for its evaluation query will resolve after the specified evaluation period with no data, triggering a notification. For example, a monitor using a formula to alert on pipeline error rate with an evaluation window of five minutes will automatically resolve after five minutes without any data.

As CI pipeline data is usually sparse and can have relatively long periods with no data, this can result in monitor recovery notifications that might not be desired.

In these cases, Datadog recommends configuring the monitor notification to trigger only for alerts by wrapping the full message with the `{{#is_alert}}` and `{{/is_alert}}` directives.

```text
{{#is_alert}}
This notification will only be sent for monitor alerts!
{{/is_alert}}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/
[2]: https://app.datadoghq.com/monitors/create/ci-pipelines
[3]: /monitors/create/configuration/#advanced-alert-conditions
[4]: /monitors/notify/
