---
title: Funnel Analysis
disable_toc: false
aliases:
- /real_user_monitoring/funnel_analysis
- /real_user_monitoring/product_analytics/funnel_analysis
- /product_analytics/journeys/funnel_analysis/
further_reading:
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Learning Center
  text: Getting Started with Product Analytics
algolia:
  tags: ['funnel']
---

## Overview

Funnel analysis helps you track conversion rates across key workflows to identify and address any bottlenecks in end-to-end journey paths. Specifically, you can:

- See if customers drop off at a certain point due to poor website performance
- Track how the conversion rate changes over time as new features are built
- Assess how adding new steps to a workflow impacts dropoff rate
- Measure the average time to convert
- Filter on individual events at different steps in your funnel
- Combine multiple events within a given step, as end users might have different ways to achieve the same outcome through different flows


## Build a funnel

To start building a funnel, navigate to [{{< ui >}}Product Analytics{{< /ui >}}][1], then select [{{< ui >}}Create New{{< /ui >}} > {{< ui >}}Funnel{{< /ui >}}][2].

{{< img src="product_analytics/journeys/funnel_analysis/funnel_overview.png" alt="The funnel option highlighted in the Create New dialog in Product Analytics" style="width:100%;" >}}

Select the user steps that start the funnel, and use {{< ui >}}Add step{{< /ui >}} to add additional steps. Drag and drop steps to reorder them in the funnel.

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
Consider a funnel with events `A → B → C` and event steps `A, A, A, B, C, C`. 

In this case, Datadog counts one conversion. This is because the conversion calculation matches only the first occurrence of event **A** and the first occurrence of event **C** in the sequence. 

To further illustrate, if the user performs the event sequence `A, A, A, B, C, C, A, B, C`, Datadog counts two conversions. The first conversion completes with the sequence `A, A, A, B, C, C`, and the second conversion completes with the following sequence of `A, B, C`.

<div class="alert alert-info"> Any action or view that happens between two steps in a funnel does not impact the step-by-step or overall conversion rate. As long as step A and C happen in the right order in a given session at least once, it counts as a single converted session.</div>

Datadog calculates the average time between steps by averaging the total duration between the first and last step of each conversion over the total number of steps.

If you analyze your funnel by **user** or by **account**, you can define your conversion time frame in hours or days since the first event. The default time frame for conversions is one day (a 24-hour window, not a calendar date) to determine if a conversion happened.


### Conversion counting methods

When computing your conversions, select how conversions are counted by choosing a **unique** conversion option (sessions, users, or accounts) or the {{< ui >}}Total Conversion Count{{< /ui >}} option in your conversion visualization. 

- {{< ui >}}Unique{{< /ui >}}: Counts a conversion only once per session, user, or account. For example, if the user completes the funnel sequence `A → B → C` multiple times within the same session (`A, B, C, A, B, C`), it counts as **one conversion**.

- {{< ui >}}Total{{< /ui >}}: Counts a conversion each time the same session ID, user, or account completes the defined funnel. Using the same example (`A, B, C, A, B, C`), this method counts **two conversions**. The {{< ui >}}Total{{< /ui >}} setting counts complete flows, not the number of times an intermediate step is repeated.


## Change the visualization
After you've defined the step events and conversion measurement, you can switch to a different visualization to better understand user conversions for your app.


{{< img src="product_analytics/journeys/funnel_analysis/funnel_visualization_video.mp4" alt="Changing the visualization from Steps to Timeseries using a dropdown." video=true >}}


### Timeseries
Viewing the funnel as a timeseries can be helpful in understanding conversion trends. You can select the time period for graphing the conversion, and can view conversions as an absolute count or a rate.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_timeseries_view.png" alt="The timeseries visualization, configured to show daily unique converted users over the past week." style="width:80%;" >}}

### Query value

The query value visualization displays the current value of a metric.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_query_value.png" alt="The query value visualization, configured to show the total number of unique conversted sessions over the past week." style="width:80%;" >}}

### Top list

The top list visualization identifies the top values from a facet based on a chosen measure.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_top_list.png" alt="The top list visualization, configured to show the top four conversion sources by continent." style="width:80%;" >}}

## View conversion drivers and journey paths

To gain more context about user conversions and dropoffs, click on a funnel step to access conversion analysis and journey paths.

<div class="alert alert-info">Conversion analysis is in Preview.</div>

- **Conversion analysis**: View conversion drivers, user journeys, available user replays for conversions and dropoffs, and user details.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_side_panel.png" alt="The side panel view after clicking a funnel step, showing conversion drivers, available replays, and converted users." style="width:100%;" >}}

- **Journey paths**: View conversion and dropoff user paths for the selected step sequence, including branching paths to other steps outside of the funnel.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_journey_paths.png" alt="A journey path showing the top five dropoff paths following step 1 in the funnel." style="width:100%;" >}}

## Share a funnel

Funnels can be shared with your teams on [dashboards][3] to analyze conversion alongside other telemetry metrics, or in a [Notebook][4] to be used for reporting.

You can share the entire visualization or individual widgets.

- Share the entire visualization to Notebooks and dashboards:

  {{< img src="product_analytics/journeys/funnel_analysis/funnels_share_export.png" alt="The expanded visualization Share option, showing the additional option to Export to PNG " style="width:100%;" >}}

- Share individual widgets from a dashboard:

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_dashboard.png" alt="Share a widget by clicking the export icon in the upper-right of the widget" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/
[2]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[3]: /product_analytics/dashboards/
[4]: /notebooks/