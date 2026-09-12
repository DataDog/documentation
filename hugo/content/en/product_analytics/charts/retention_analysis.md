---
title: Retention
aliases:
- /product_analytics/user_retention/
- /product_analytics/charts/user_retention/
description: Measure user retention to understand overall user satisfaction with your application.
---

Retention charts visualize how often users return to a page or action, helping you assess the ongoing value of your products and features.

{{< img src="/product_analytics/retention/retention_chart.png" alt="An example Retention Analysis chart." style="width:90%;" >}}

User retention is measured within a *cohort*, a group of users who performed a defined start event, such as clicking a specified link. A user in the cohort is *retained* if they subsequently complete the specified return event, such as clicking the same link again or proceeding to payment.

Only views and actions can act as events.

## Prerequisites

To populate retention data, set the `usr.id` attribute in your SDK. See [instructions for sending unique user attributes][1].

## Calculating retention events

Retention values are calculated as a weighted average cohort, which summarizes overall cohort behavior by accounting for cohort size. Larger cohorts have more influence on the final value, making the result more representative than an average. Datadog applies this calculation across all visualization types. For example, in the retention grid, the weighted average populates the summary cell for each time interval.

To calculate the value for a specific interval, such as week 1 in the retention grid, multiply each cohort's value by its size. Sum the results, then divide by the total cohort size:

```
Weighted Average = (Σ (cohort_value × cohort_size)) / (Σ cohort_size)
```

For example, the weighted average retention of 91% after 1 week is calculated as:

```
(99 * 1.8k + 92 * 2.35k + 81 * 1.75k) / (1.8k + 2.35k + 1.75k)
```

Each cohort's retention rate is scaled by its number of users before it contributes to the overall metric.

{{< img src="/product_analytics/retention/pana_retention_weighed_avg.png" alt="Example Retention Analysis graph showing a weighted average retention value." style="width:90%;" >}}

{{< alert level="info" >}}
The retention chart displays disabled values when data is partial or incomplete. This occurs when the time period is ongoing and retention can't yet be fully calculated.
{{< /alert >}}

## Create a retention chart

1. In {{< ui >}}Product Analytics{{< /ui >}}, select {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Retention{{< /ui >}}.

2. Define start and return steps that you want to understand retention for.

3. (Optional) Filter or group chart results based on properties such as country or device type using {{< ui >}}Filter by{{< /ui >}} or {{< ui >}}Compare by{{< /ui >}}.

## Analyze a retention chart

After you build a retention chart, it displays retention as a percentage or count for each cohort, broken down by the return periods you defined.

{{< img src="/product_analytics/retention/retention_analysis.png" alt="A Retention chart with numbered callouts for the Advanced options return setting, the viewing and grouping controls, the chart type selector, the time range selector, and a cohort cell tooltip." style="width:90%;" >}}

1. Use {{< ui >}}Advanced options{{< /ui >}} to scope which return events count toward retention.

   - {{< ui >}}Returned on{{< /ui >}}: Calculates the percentage of users who triggered the return event during a specific return period. Use this to see the likelihood of users completing the return event some period of time (for example, days or weeks) after the start event, which is useful for assessing overall retention across your features and products.
   - {{< ui >}}Returned on or after{{< /ui >}}: Calculates the percentage of users who triggered the return event during a specific return period or any subsequent period. Use this to see users who either fully leave your product or stop using key functionality, which is useful for assessing the effectiveness of onboarding experiences.

2. Use the {{< ui >}}Viewing{{< /ui >}} row to control what displays.

   - {{< ui >}}All Cohorts{{< /ui >}}, {{< ui >}}Weighted Average{{< /ui >}}, or a specific cohort: Selects which cohort is plotted. See [Calculating retention events](#calculating-retention-events) for how the weighted average is calculated.
   - {{< ui >}}Unique users{{< /ui >}} or {{< ui >}}Unique accounts{{< /ui >}}: Selects whether retention is measured by `@usr.id`, which can reset when a user clears cookies or switches devices, or by `@account.id`, which tracks the same signed-in account across a longer period.
   - {{< ui >}}Rate{{< /ui >}} or {{< ui >}}Count{{< /ui >}}: Selects whether to display retention as a percentage or an absolute number.
   - {{< ui >}}Each day{{< /ui >}}, {{< ui >}}Each week{{< /ui >}}, or {{< ui >}}Each month{{< /ui >}}: Selects the time frame that groups return events. Daily retention can be applied for up to a month, weekly retention for up to a year, and monthly retention for up to 16 months.

3. Use the chart type selector to switch between chart types.

   - {{< ui >}}Retention{{< /ui >}}: Includes both a retention curve, showing the change in retention for specified cohorts, and a retention grid, showing detailed data on cohorts across time periods.
   - {{< ui >}}Timeseries{{< /ui >}}: Shows retention over calendar time for a single return period you choose, without a specific cohort focus.
   - {{< ui >}}Query value{{< /ui >}}: Shows a single number, as a rate or count, for a single return period you choose, using whichever cohort is selected: the weighted average across cohorts, or one specific cohort.
   - {{< ui >}}Top list{{< /ui >}}: If a {{< ui >}}Compare{{< /ui >}} property is specified, shows an ordered ranking of grouped results by retention rate or count for the specified period.

4. Use the time range selector to change the period of data the chart analyzes.

5. Hover over a cell to view the exact number of users who returned during that period, the return rate, and how it changed from the previous period. Click a cell to view a list of users, and export the list as a CSV.

### Using matching vs. differing events

You can configure retention charts with the same or different start and return events.

If the events match, week 0 is always 100%, since it represents everyone who completed the initial event. Every other cell compares that week's viewers back to week 0, showing the percentage of the original cohort who completed the event again in that week.

{{< img src="/product_analytics/retention/retention_matching_events.png" alt="Retention graph for matching events" style="width:90%;" >}}

Reading the **Aug 17 2026** row of the above graph from left to right:
- 23% of the 10.43k users who completed the event that week returned to complete it again after 1 week.
- 21% of those users returned to complete it again after 2 weeks.
- 11% of those users returned to complete it again after 3 weeks.

If the events differ, week 0 represents users who completed both the initial and return events. Every cell after that shows the percentage of the original cohort who completed the return event in that week.

{{< img src="/product_analytics/retention/retention_differing_events.png" alt="Retention graph for differing events" style="width:90%;" >}}

Reading the **Aug 17 2026** row of the above graph from left to right:
- 10.43k users completed the start event that week.
- 41% of those users also completed the return event within the same week.
- 23% completed the return event after 1 week, 20% after 2 weeks, and 11% after 3 weeks.

[1]: /real_user_monitoring/application_monitoring/browser/advanced_configuration#user-session
