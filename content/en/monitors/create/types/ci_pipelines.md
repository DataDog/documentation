---
title: CI Pipeline Monitor
kind: documentation
aliases:
- /monitors/monitor_types/ci_pipelines
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

## Overview

Once [CI Visibility is enabled][1] for your organization, you can create a CI Pipeline monitor to alert you when a specified type of CI Pipeline event exceeds a user-defined threshold over a given period of time.

<div class="alert alert-info"><strong>Note</strong>: Only available in closed beta on US1, EU, US3 and US5.</div>

## Monitor creation

To create a [CI Pipeline monitor][2] in Datadog, use the main navigation: *Monitors -> New Monitor --> CI Pipelines*.

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 CI Pipeline monitors per account. <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

### Define the search query

1. Construct a search query using the same logic as a CI Pipeline explorer search.
2. Select the CI Pipeline events level to monitor:
    * **Monitor over the `Pipeline` level**: If the `Pipeline` level is selected, the monitor will only evaluate the search query in the pipeline as a whole.
    * **Monitor over the `Stage` level**: If the `Stage` level is selected, the monitor will only evaluate the search query in the stages of every pipeline.
    * **Monitor over the `Job` level**: If the `Job` level is selected, the monitor will only evaluate the search query in the jobs of every pipeline.
    * **Monitor over the `Command` level**: If the `Command` level is selected, the monitor will only evaluate the search query in the custom commands executed in every pipeline.
    * **Monitor over all the levels**: If the `All` level is selected, the monitor will evaluate the search query in all the described levels before.
2. Choose to monitor over a CI Pipeline event count, facet, or measure:
    * **Monitor over a CI Pipeline event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of CI Pipeline events over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a dimension**: If a dimension (qualitative facet) is selected, the monitor alerts over the `Unique value count` of the facet.
    * **Monitor over a measure**: If a measure (quantitative facet) is selected, the monitor alerts over the numerical value of the CI Pipeline facet (similar to a metric monitor) and aggregation needs to be selected (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. Group CI Pipeline events by multiple dimensions (optional):
    All CI Pipeline events matching the query are aggregated into groups based on the value of up to four facets.
4. Configure the alerting grouping strategy (optional):
    * If the query has a `group by`, multi alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you could group a query by `@ci.pipeline.name` to receive a separate alert for each CI Pipeline name when the number of errors is high.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="Define the search query" style="width:80%;" >}}

#### Using Formulas & Functions

You can create CI Pipeline monitors based on Formulas & Functions. This is useful if you want to trigger alerts for monitors based on the error rate for some pipeline.

In the following example, we're creating an error rate monitor using the formula that calculates the ratio of `Failed CI Pipelines` / `Total CI Pipelines` grouped by `ci.pipeline.name`.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query-fnf.png" alt="Define the search query" style="width:80%;" >}}

<div class="alert alert-info"><strong>Note</strong>: Only up to 2 queries can be used to build the evaluation formula per monitor.</div>

### Set alert conditions

* Trigger when the metric is `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between `1 minute` and `2 days`.
* Alert threshold `<NUMBER>`
* Warning threshold `<NUMBER>`

#### Advanced alert conditions

For detailed instructions on the advanced alert options (evaluation delay, etc.), see the [Monitor configuration][3] page.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][4] page.

#### Enrich the monitor message with event attributes

You can use all the attributes stored in a CI Pipeline event in your notification message using the `{{cipipeline.attributes.<attribute>}}` syntax. You can use all the CI Pipeline facets to build your custom notification message.

In the following example, we're configuring a notification message using the Git repository URL stored in the CI Pipeline event attributes.

```text
{{#is_alert}}
This is a sample notification message for the repository {{cipipeline.attributes.git.repository_url}}
{{/is_alert}}
```

You can mix CI Pipeline event attributes with the variable populated through the facet used to group the alerts.

In the following example, we're configuring a notification message using the Git repository URL stored in the CI Pipeline event attributes and using the variable populated using the facet to group the alerts.

```text
{{#is_alert}}
This is a sample notification message for the repository {{cipipeline.attributes.git.repository_url}} in the {{[@ci.pipeline.name].name}}
{{/is_alert}}
```

#### Notifications behavior for monitors based on error rate

If you are using a CI Pipeline monitor based on an error rate formula, the current behavior when there is no data to calculate the rate in the evaluating time window is that the monitor will transition to the `RESOLVED` state.

This behavior might not be expected, especially if you want to track the status of the CI Pipelines that build integration branches.

In these cases, we recommend configuring the monitor notification to trigger only for alerts by wrapping the full message with the `{{#is_alert}}` and `{{/is_alert}}` directives.

```text
{{#is_alert}}
The monitor notification will only be shown for monitor alerts!
{{/is_alert}}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/
[2]: https://app.datadoghq.com/monitors/create/ci-pipelines
[3]: /monitors/create/configuration/#advanced-alert-conditions
[4]: /monitors/notify/

