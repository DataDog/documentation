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

If you have a starting point in mind, but aren't sure what your users did next, the funnel step editor automatically loads the top most common **views** and **actions** that users typically see.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_dropoffs.png" alt="The funnel step editor automatically loads the top most common views and actions that users typically see and take next." style="width:50%;" >}}

### Filtering

When constructing your funnel, you can filter globally or on a step.

- **Global filters** are applied to the entire funnel.

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_filter_by-2.png" alt="Use attributes to filter information globally when constructing your funnel" style="width:50%;" >}}

- **Filtering on a step** provides insight on how the step changes based on a particular constraint on that step. For example, you may want to see how a specific device, operating system, geolocation, or user impacts conversion between steps.

    {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_filter_by_step.png" alt="Use attributes to filter information between steps when constructing your funnel" style="width:50%;" >}}

### Combining events

When constructing your funnel, you can combine multiple events within a given step, as end users may have different ways to achieve the same outcome through different flows. When combining events, any of the events in the step can represent the step. The numerical value you see is the combination of all steps within the combined step.

To combine an event, click the three dots next to an event and select **+ Combine Events**.

### Grouping

Use the Group by dropdown to group the data by a specific attribute.

**Note**: Group by does not work with the funnel steps visualization, your visualization will automatically change to a top list.

## Refine conversion

You can further analyze the information on the funnel page to understand the conversion rate. Conversion rate is a crucial metric that measures the effectiveness of your site or application.

You can analyze conversion by **session**, **users** or **accounts**, which means you can understand conversion across all sessions, or by distinct users/accounts. This can be useful if you suspect, for instance, that a minority of your user base converts at a high rate.

You can measure conversion by the following attributes:

- **Conversion count** - A count of users who went through the funnel you've defined.
- **Conversion rate** - A conversion refers to the moment when a user responds to a call to action. This rate is the percentage of users who have entered the funnel and converted.

  **Note**: Only completed RUM sessions contribute to conversion rates.

- **Time to convert** - The time it took for the user to complete the step events.

You can measure these attributes **across all steps** or between **specific steps**.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_conversion.png" alt="Measure attributes across all steps or specific steps." style="width:60%;" >}}

Use the **filter** selector to filter by various criteria that you define. These filters will be applied to all steps of the funnel.

Next, click a datapoint to **investigate the specific attributes** that might have affected conversion rates, such as page load speed, ease of navigation, or checkout experience.

## How Datadog computes conversion metrics

Consider a funnel with events `A → B → C` and event steps: 

```
A, A, A, B, C, C
```

If a user performs the actions as in the example above, Datadog counts it as one conversion. This is because the conversion calculations only look at the first element **A** matched and the first element **C** matched. 
**`(WHY? does it only look for the first and last? if yes, should we include it?)`**

If you select the **unique** conversion measure, then a conversion (session, user, or account) is counted only once per session, user or account. So, if the user performs  A → B → C → A → B → C during the session or timeframe then unique will count 1 conversion.


If total is selected, then in the example above we will count 2 conversions. 
If you analyze your funnel by user or account, you can define your conversion timeframe (default: 1 day). This means that we use a 24-hour window (not calendar dates) to determine if a conversion happened or not.
The average time between steps is calculated by looking at the average duration between each conversion. Note that this takes all conversions into account, no matter if unique or total is selected for the counts.
The conversion rate takes all the users/accounts/sessions that enter the funnel on one hand, all the conversions on the other hand, and computes the ratio between the two.


## Changing the visualization

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_change_viz.mp4" alt="Click the visualization dropdown to select a different view" video=true >}}

After you've defined the step events and conversion measurement, you can switch to a different visualization to better understand user conversions for your app.

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