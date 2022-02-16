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

## Monitor creation

To create a [CI Pipeline monitor][2] in Datadog, use the main navigation: *Monitors -> New Monitor --> CI Pipelines*.

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 CI Pipeline monitors per account. <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

### Define the search query

1. Construct a search query using the same logic as a CI Pipeline explorer search.
2. Choose to monitor over a CI Pipeline event count, facet, or measure:
  * **Monitor over a CI Pipeline event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of CI Pipeline events over a selected time frame, then compares it to the threshold conditions.
  * **Monitor over a facet**: If a facet is selected, the monitor alerts over the `Unique value count` of the facet.
  * **Monitor over measure**: If a measure is selected, the monitor alerts over the numerical value of the CI Pipeline facet (similar to a metric monitor) and aggregation needs to be selected (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. Group CI Pipeline events by multiple dimensions (optional):
    All CI Pipeline events matching the query are aggregated into groups based on the value of up to four facets.
4. Configure the alerting grouping strategy (optional):
  * **Simple alert**: Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions.</br>
  If the query has a `group by` and you select simple-Alert mode, you get **one** alert when one or multiple groups values breach the threshold. This strategy may be selected to reduce notification noise.
  * **Multi alert**: Multi alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you could group a query by `@ci.pipeline.name` to receive a separate alert for each CI Pipeline name when the number of errors is high.


### Set alert conditions

* Trigger when the metric is `above`, `above or equal to`, `below`, or `below or equal to`
* the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between `1 minute` and `2 days`.
* Alert threshold `<NUMBER>`
* Warning threshold `<NUMBER>`

#### Advanced alert conditions

For detailed instructions on the advanced alert options (evaluation delay, etc.), see the [Monitor configuration][3] page.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][4] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/
[2]: https://app.datadoghq.com/monitors/create/ci-pipelines
[3]: /monitors/create/configuration/#advanced-alert-conditions
[4]: /monitors/notify/

