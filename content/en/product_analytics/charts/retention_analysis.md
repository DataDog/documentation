---
title: Retention Analysis
aliases:
- /product_analytics/user_retention/
- /product_analytics/charts/user_retention/
description: Measure user retention to understand overall user satisfaction with your application.
further_reading:
    - link: '/product_analytics/'
      tag: Documentation
      text: Product Analytics
    - link: 'real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#user-session'
      tag: Documentation
      text: Set user sessions
---

## Overview
Retention Analysis measures how often users are successfully returning to a page or action helping you assess the ongoing value of your products and features.

User retention is measured within a given cohort of users that you define. A cohort is a group of users who performed the start event, such as clicking a link. A user in the cohort is considered retained if they subsequently complete the configured return event, such as clicking the same link again or clicking a **Proceed to Payment** button. 

Only views and actions can act as events.

## Prerequisites

For user retention data to populate, you must set the `usr.id` attribute in your SDK. See the [instructions for sending unique user attributes][4].

## Measuring retention events
Product analytics support two types of retention event measurements:

{{< img src="product_analytics/chart_basics/pana_chart_basics_new.png" alt="The two types of retention measurements available with product analytics" style="width:100%;" >}}


### Return on
For each cohort and return period, `Return on` calculates the percentage of users who triggered the return event during that specific period.

`Return on` highlights the likelihood of users completing the return event, some period of time (for example, days or weeks), after the start event. This is especially helpful when assessing overall retention across your features and products.


### Return on or after
For each cohort and return period, `Return on or after` calculates the percentage of users who triggered the return event during that specific period or any subsequent period.

`Return on or after` highlights users who either fully leave your product or stop using key functionalities, which is helpful when assessing the effectiveness of onboarding experiences.

## Calculating retention events 
### What is a weighted average cohort
The weighted average cohort summarizes overall cohort behavior by accounting for cohort size. Larger cohorts have more influence on the final value, making the result more representative than an average.

This weighted average calculation is applied across all [visualization types](#visualization-types). For example, in the retention grid, the weighted average is used to populate the summary cell for each time interval. 

### How to calculate a weighted average cohort
To compute the value for a specific interval (such as Week 1 in the retention grid), multiply each cohort's value by its size, sum the results, and divide by the total cohort size. The formula is:

```
Weighted Average = (Σ (cohort_value × cohort_size)) / (Σ cohort_size)
```

The weighted average retention of **91% after 1 week** shown in the following retention graph is calculated as follows:

```
(99 * 1.8k + 92 * 2.35k + 81 * 1.75k) / (1.8k + 2.35k + 1.75k)
```

This means each cohort's retention rate is scaled by its number of users before contributing to the overall metric.


{{< img src="product_analytics/retention/pana_retention_weighed_avg.png" alt="Example Retention Analysis graph" style="width:80%;" >}}


<div class="alert alert-info">
<strong>Note:</strong> The retention chart displays greyed-out values when data is partial or incomplete. This occurs when the time period is ongoing and retention cannot yet be fully calculated.
</div>

## Grouping retention events
Use the `group by` function to break down retention based on events' attributes. This is helpful is you want to, for example, see how retention compares across user countries. The `group by` function is applied to the **start event**.


## Build a graph

To build a retention graph, navigate to **[Product Analytics > Charts][1]**, click the **Retention** tab, then follow the steps below.

### 1. Define the starting and return events
1. Select the view or action to act as the starting event for defining a group of users.<br>
2. Select the view or action to act as the return event.

### 2. Define the measures
1. Select `Retention rate` to see the data in percentages, or `Unique users` to see the absolute number of users. 
2. Scope the retention measure `Return on or after` or `Return on` based on when the return event occurs.
3. Choose the time frame for which you want to analyze user retention. Select a period size (day, week, or month) to define how return events are grouped in the analysis. Consider the following when selecting a period size: 
- **Daily retention**: Can be applied for up to a month.
- **Weekly retention**: Can be applied for up to a year.
- **Monthly retention**: Can be applied for up to 16 months.

{{< img src="product_analytics/retention/pana_retention_timeframes_ui.png" alt="Example Retention Analysis graph" style="width:100%;" >}}


### 3. Define users and add filters
Optionally, select a specific [segment][6] to measure the retention of its users. This defaults to all users. You can also add any desired filter criteria, such as `user country`, `device type`, or `operating system`.


### 4. Group by 
Optionally, `group by` event attributes to compare retention by device type, for example. 

## Analyze the graph
For insights on user retention week over week, read each row of the graph horizontally from left to right. 

You can click on an individual diagram cell to view a list of users, and export the list as a CSV:

{{< img src="product_analytics/retention/pana_retention_export_ui.png" alt="Details panel for a diagram cell" style="width:90%;" >}}

The graph displays slightly different information depending on whether the initial and return events match.

### Matching events 
If the starting and returning events match:
- **Week 0** is always 100%, since it represents all of the users who completed the initial event.
- The other cells compare the viewers in a given week to **Week 0**, displaying the percentage of the cohort who completed the event in that week.

{{< img src="real_user_monitoring/retention_analysis/matching-events-retention-graph.png" alt="Retention graph for matching events" style="width:90%;" >}}

Reading the **Dec 04 2023** row of the above graph from left to right:
- 94% of the people who completed the event in **Week 0** came back and completed it again in **Week 1**.
- 92% of the people who completed the event in **Week 0** came back and completed it again in **Week 2**.

### Differing events
If the starting and returning events differ:
- **Week 0** represents users who completed both the initial and return events.
- After **Week 0**, each cell displays the percentage of the **Users** column who completed the return event in that week.

{{< img src="real_user_monitoring/retention_analysis/differing-events-retention-graph.png" alt="Retention graph for differing events" style="width:90%;" >}}

Reading the **Dec 04 2023** row of the above graph from left to right:
- 144 users completed the initial event.
- In **Week 0**, 94% of those 144 users completed the return event.
- In **Week 1**, 92% of the 144 users completed the return event.


## Visualization types
After building your graph, select the relevant visualization type to surface the information you need under the search query.

Retention curve
: Shows the change in retention (including the weighted average) for all or specified cohorts.
{{< img src="product_analytics/retention/pana_retention_viz_curve2.png" alt="Retention curve visualization graph" style="width:90%;" >}}


Retention grid
: Displays detailed data on cohorts across time periods.
{{< img src="product_analytics/retention/pana_retention_viz_grid.png" alt="Retention grid visualization graph" style="width:90%;" >}}


Timeseries
: Shows the overall retention rate trend over time.
{{< img src="product_analytics/retention/pana_retention_viz_timeseries.png" alt="Timeseries visualization graph" style="width:90%;" >}}


Query value 
: Displays a single value that highlights the retention rate of a time period and cohort. 
{{< img src="product_analytics/retention/pana_retention_viz_query_value.png" alt="Query value visualization graph" style="width:90%;" >}}


Top list
: Shows an ordered ranking of tags by metric.
{{< img src="product_analytics/retention/pana_retention_viz_top_list.png" alt="Top List visualization graph" style="width:90%;" >}}


## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/retention-analysis
[2]: /real_user_monitoring/application_monitoring/browser/data_collected/#view-attributes
[3]: /real_user_monitoring/application_monitoring/browser/data_collected/#action-timing-metrics
[4]: /real_user_monitoring/application_monitoring/browser/advanced_configuration#user-session
[5]: /help
[6]: https://app.datadoghq.com/product-analytics/segments
real_user_monitoring/application_monitoring