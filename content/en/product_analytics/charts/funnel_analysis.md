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
algolia:
  tags: ['funnel']
---

## Overview

Funnel analysis helps you track conversion rates across key workflows to identify and address any bottlenecks in end-to-end user journeys. Specifically, you can:

- See if customers drop off at a certain point due to poor website performance
- Track how the conversion rate changes over time as new features are built
- Measure how adding new steps to a workflow impacts drop off rate
- Understand how much time on average it takes for users to go through the funnel (time to convert)
- Filter on individual events (action or view) on different steps in your funnel
- Combine multiple events within a given step, as end users might have different ways to achieve the same outcome through different flows


## Build a funnel

To build a funnel, navigate to [**Product Analytics > Charts**][1] and click **Funnel**.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_overview.png" alt="Navigate to the Funnel Analysis tab within Product Analytics" style="width:100%;" >}}

From this page, choose your starting view or action and click on `+ Step` to build additional steps. You can also use drag and drop functionality to move steps around.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_video1.mp4" alt="Filtering network map with search" video=true >}}

If you aren't sure what your users did, the funnel step editor automatically loads common **views** and **actions** that you can choose to add as steps.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_dropoffs.png" alt="The funnel step editor automatically loads the top most common views and actions that users typically see and take next." style="width:50%;" >}}



### Add filters

When constructing your funnel, you can filter users globally, or for a specific step.

- **Global filters** are applied to the entire funnel.

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_filter_by-2.png" alt="Use attributes to filter information globally when constructing your funnel" style="width:50%;" >}}

- **Filtering on a step** provides insight on how the step changes based on a particular constraint on that step. For example, you may want to see how a specific device, operating system, geolocation, or user impacts conversion between steps.

    {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_filter_by_step.png" alt="Use attributes to filter information between steps when constructing your funnel" style="width:50%;" >}}

### Combine events

When constructing your funnel, you can combine multiple events within a given step, as end users may have different ways to achieve the same outcome through different flows. When combining events, any of the events in the step can represent the step. The numerical value you see is the combination of all steps within the combined step.

To combine an event, click the three dots next to an event and select **+ Combine Events**.

### Group data

Use the **Group by** dropdown to group the data by a specific attribute.

**Note**: Grouping data is not supported for the funnel steps [visualization](#change-the-visualization); when applied, the visualization automatically changes to a top list.

## Refine conversion

You can further analyze the information on the funnel page to understand the conversion rate. Conversion rate is a crucial metric that measures the effectiveness of your site or application.

You can analyze conversion by **session**, **user** or **account**. This can be useful if you suspect, for instance, that a minority of your user base converts at a high rate.

- If you select **Session**, all steps must be completed within the same `@session.id` to count as a conversion.

- If you select **User**, the funnel requires the same individual user (`@user.id`) to complete every step for the conversion to count.

- If you select **Account**, different users within the same account can complete different steps and the conversion still counts. In this case, the funnel is tied to the `@account.id` facet.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_refine_conversion.png" alt="The section of the UI where you can select Session, User, or Account to analyze your conversion." style="width:50%;" >}}
 

A conversion refers to the moment when a user responds to a call to action. You can measure conversion by the following attributes:

- **Conversion count**: A count of users who went through the funnel you've defined.
- **Conversion rate**: This rate is the percentage of users who have entered the funnel and converted.
- **Time to convert**: The time it took for the user to complete the step events. This option is not available for the funnel steps [visualization](#change-the-visualization); if you select it, the visualization automatically changes to a timeseries.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_conversion_measures.png" alt="The section of the UI where you can select Session, User, or Account to analyze your conversion." style="width:50%;" >}}

You can measure these attributes **across all steps** or between **specific steps**.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_conversion.png" alt="Measure attributes across all steps or specific steps." style="width:60%;" >}}

Use the [**filter**](#add-filters) selector to filter data down to specific types of users. These filters are applied to all steps in your funnel.

Next, click a datapoint to **investigate the specific attributes** that might have affected conversion rates, such as page load speed, ease of navigation, or checkout experience.

## Conversion computing metrics

### How Datadog computes conversion metrics
Consider a funnel with events `A → B → C` and event steps `A, A, A, B, C, C`. 

In this case, Datadog counts one conversion. This is because the conversion calculation matches only the first occurrence of event **A** and the first occurrence of event **C** in the sequence. 

To further illustrate, if the user performs the event sequence `A, A, A, B, C, C, A, B, C`, Datadog counts two conversions. The first conversion completes with the sequence `A, A, A, B, C, C`, and the second conversion completes with the following sequence of `A, B, C`.

<div class="alert alert-info"> Any action or view that happens between two steps in a funnel does not impact the step-by-step or overall conversion rate. As long as step A and C happen in the right order in a given session at least once, it counts as a single converted session.</div>

Datadog calculates the average time between steps by averaging the total duration between the first and last step of each conversion over the total number of steps.

If you analyze your funnel by **user** or by **account**, you can define your conversion time frame in hours or days since the first event. The default time frame for conversions is one day (a 24-hour window, not a calendar date) to determine if a conversion happened.


### Choose a conversion counting method

When computing your conversion, select how conversions are counted by choosing **unique** or **total** beside **Conversion count** in your funnel settings. 

- **Unique**: Counts conversion only once per session, user, or account. For example, if the user completes the funnel sequence `A → B → C` multiple times within the same session (for example, `A, B, C, A, B, C`), it counts as **one conversion**. The `Unique` setting counts only the first conversion per session (or per user, depending on your analysis scope).

- **Total**: Counts a conversion each time the same session ID, user, or account completes the defined funnel. Using the same example (`A, B, C, A, B, C`), this method counts **two conversions**. The `Total` setting counts complete flows, not the number of times an intermediate step is repeated.


{{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_conversion.png" alt="Select a conversion measure, whether Unique or Total, to determine how your session conversions are counted." style="width:80%;" >}}


## Change the visualization
After you've defined the step events and conversion measurement, you can switch to a different visualization to better understand user conversions for your app.


{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_change_viz.mp4" alt="Click the visualization dropdown to select a different view" video=true >}}


### Timeseries
Seeing the conversion as a timeseries can be helpful in understanding conversion trends. Each datapoint across the x-axis represents the conversion for the identified query.

You can select the time period for graphing the conversion and view conversions in percentages or in absolute count.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_timeseries.png" alt="View conversion data as a timeseries." style="width:80%;" >}}

### Query value

Query values display the current value of the given usage metric.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_query_value.png" alt="View conversion data as a query value." style="width:80%;" >}}

### Top list

Visualize the top values from a facet based on your chosen measure.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_toplist.png" alt="View conversion data as a top list." style="width:80%;" >}}

## Navigate funnel charts
To get more context about user dropoffs, click on the funnel chart to open a side panel that contains additional information. Then, navigate between steps to see:

- **Step performance**: See metrics related to conversion (for example, conversion rate, dropped off sessions, and average conversion time).
- **Branching paths from the previous step**: Discover the other paths that users take instead of the ones you anticipate. This section is only available when looking at a step between two views in a funnel.
- **Issues that might be affecting conversion**: See the top issues that might be affecting conversions and investigate them further with the links to RUM, Error Tracking, and Session Replay.


{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_metrics.png" alt="Click on the funnel view to see additional context about user dropoffs." style="width:90%;" >}}

## Share a funnel

Funnels can be shared with your teams on [dashboards][5] to analyze conversion alongside other telemetry metrics, or in a [Notebook][6] to be used for reporting.

You can share the entire visualization or individual widgets.

- Share the entire visualization to Notebooks and dashboards:

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_funnel.png" alt="Share the entire visualization by clicking Export" style="width:90%;" >}}

- Share individual widgets from a dashboard:

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_dashboard.png" alt="Share a widget by clicking the export icon in the upper-right of the widget" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[5]: /product_analytics/dashboards/
[6]: /notebooks/