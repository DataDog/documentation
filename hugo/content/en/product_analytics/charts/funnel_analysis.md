---
title: Funnel
disable_toc: false
aliases:
- /real_user_monitoring/funnel_analysis
- /real_user_monitoring/product_analytics/funnel_analysis
- /product_analytics/journeys/funnel_analysis/
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Learning Center
  text: Getting Started with Product Analytics
algolia:
  tags: ['funnel']
---

Funnel analysis helps you track conversion rates across key workflows to identify and address any bottlenecks in end-to-end journey paths. Specifically, you can:

- See if customers drop off at a certain point due to poor website performance
- Track how the conversion rate changes over time as new features are built
- Assess how adding new steps to a workflow impacts dropoff rate
- Measure the average time to convert
- Filter on individual events at different steps in your funnel
- Combine multiple events within a given step, as end users might have different ways to achieve the same outcome through different flows

## Create a funnel chart

1. In {{< ui >}}Product Analytics{{< /ui >}}, select {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Funnel{{< /ui >}}.

1. Select the user steps that start the funnel, and use {{< ui >}}Add step{{< /ui >}} to add additional steps. Drag and drop steps to reorder them in the funnel.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_add_step_video.mp4" alt="Using the Add step button to add a step to an existing funnel, and using drag and drop to move the new step to the correct place in the funnel." video=true >}}

### Add filters

You can filter users globally, or for specific steps:

- To apply global filters to the entire funnel, select {{< ui >}}Filter by{{< /ui >}} and choose your options.

- To filter users on an individual step, select the **filter icon** for that step and choose your options. Filtering on a step provides insight into how user behavior changes based on a particular constraint on that step. For example, you may want to see how a specific device, operating system, or geolocation impacts conversion at a particular step.

### Combine events

You can combine multiple events within a single funnel step, to account for end users achieving the same outcome through different flows. When combining events, any included event can trigger step conversion, using "or" logic. The Funnel Chart for a combined step shows data for all events that it contains.

To add multiple events to a step, click the {{< ui >}}or{{< /ui >}} button next to an existing event.

### Compare data

Select {{< ui >}}Compare{{< /ui >}}, then choose one of the options below to compare funnel data in different ways:

{{< ui >}}By breakdown{{< /ui >}}: Group data by a specific attribute, like device type or geolocation. You can also adjust whether to show the top (most common) or bottom (least common) values within the attribute, and how many values to include.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_compare_by_country.png" alt="The Compare by breakdown view, configured to show the top five conversion sources by country." >}}

{{< ui >}}By property or segment{{< /ui >}}: Compare multiple user segments or user attributes side by side.

- To compare user segments, select the segments you want to compare.
- To compare a user attribute, select a property (such as Browser Name or Country), then choose the values you want to compare (such as Firefox, Chrome, and Safari).

{{< img src="product_analytics/journeys/funnel_analysis/funnel_side_by_side.png" alt="The Compare by property or segment view, showing side-by-side comparison of five selected Browser Name values." >}}

{{< ui >}}By time{{< /ui >}}: Compare conversion data side by side between time periods.

## Refine conversion insights

You can further analyze the information on the funnel page to understand your site's effectiveness in driving conversions. A [conversion](#conversion-computing-metrics) occurs when a user completes the last step defined in the funnel.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_conversion_dropdown.png" alt="The conversion refinement dropdown with options for analysis by unique or total conversions." style="width:100%;" >}}

Use the dropdown above the chart side panel to select different conversion analysis views. Conversion analysis is available by:

- {{< ui >}}Unique converted sessions{{< /ui >}}: Conversions where all steps were completed with the same `@session.id`.

- {{< ui >}}Unique converted users{{< /ui >}}: Conversions where the same individual user, tracked by `@user.id`, completed all steps.

- {{< ui >}}Unique converted accounts{{< /ui >}}: Conversions where the same account, tracked by `@account.id`, completed all steps. This analysis is useful for identifying conversions completed by signed-in users across a longer period of time than the `@user.id` facet persists.

- {{< ui >}}Total conversions{{< /ui >}}: Total conversions across sessions, users, or accounts.

- {{< ui >}}Time to convert{{< /ui >}}: A timeseries view of conversions by sessions, users, or accounts.

For any conversion analysis view, you can choose to view conversions by count or rate, and view data for all steps or individual steps. For conversion views by user or account, you can adjust the time frame within which a conversion must occur.

## Conversion computing metrics

### How Datadog computes conversion metrics
Consider a funnel with events `A → B → C` and event steps **A**, A, A, **B**, **C**, C.

In this case, Datadog counts one conversion. Each **A** starts an independent attempt. Because all three attempts complete on the same **C** event, Datadog counts only the earliest attempt.

To further illustrate, if the user performs the event sequence **A**, A, A, **B**, **C**, C, **A**, **B**, **C**, Datadog counts two conversions. The first conversion completes with the sequence **A**, A, A, **B**, **C**, and the second conversion completes with the following sequence of **A**, **B**, **C**.

<div class="alert alert-info"> Any action or view that does not match a funnel step does not impact the step-by-step or overall conversion rate. If all funnel steps occur in the right order within the conversion window, Datadog counts the session as a single converted session.</div>

Datadog calculates the average time between steps by averaging the total duration between the first and last step of each conversion over the total number of steps.

If you analyze your funnel by **user** or by **account**, you can define your conversion time frame in hours or days since the first event. The default time frame for conversions is one day (a 24-hour window, not a calendar date) to determine if a conversion happened.


### Conversion counting methods

When computing your conversions, select how conversions are counted by choosing a **unique** conversion option (sessions, users, or accounts) or the {{< ui >}}Total Conversion Count{{< /ui >}} option in your conversion visualization. 

- {{< ui >}}Unique{{< /ui >}}: Counts a conversion only once per session, user, or account. For example, if the user completes the funnel sequence `A → B → C` multiple times within the same session (`A, B, C, A, B, C`), it counts as **one conversion**.

- {{< ui >}}Total{{< /ui >}}: Counts a conversion each time the same session ID, user, or account completes the defined funnel. Using the same example (`A, B, C, A, B, C`), this method counts **two conversions**. The {{< ui >}}Total{{< /ui >}} setting counts complete flows, not the number of times an intermediate step is repeated.

## Change the visualization

By default, a funnel displays as steps. Change the visualization to see the same conversion data in a different format.

- Timeseries: Plot the conversion metric over time.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_timeseries_view.png" alt="A funnel's conversion data displayed as a timeseries." style="width:90%;" >}}

- Query value: Display the conversion metric as a single number.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_query_value.png" alt="The query value visualization, configured to show the total number of unique converted sessions over the past week." style="width:80%;" >}}

- Top list: Rank the conversion metric by a breakdown, such as country or browser.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_top_list.png" alt="A funnel's conversion data broken down by country, displayed as a top list." style="width:90%;" >}}

- Bar chart: Compare the conversion metric across a breakdown's values, displayed as columns.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_bar_chart.png" alt="A funnel's conversion data broken down by country, displayed as a bar chart." style="width:90%;" >}}

Top list and bar chart require a breakdown. Add one under [Compare](#compare-data) if the funnel doesn't already have one.

## View conversion drivers

To gain more context about user conversions and dropoffs, click on a funnel step to access conversion analysis.

View conversion drivers, user journeys, available user replays for conversions and dropoffs, and user details.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_side_panel.png" alt="The side panel view after clicking a funnel step, showing conversion drivers, available replays, and converted users." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}