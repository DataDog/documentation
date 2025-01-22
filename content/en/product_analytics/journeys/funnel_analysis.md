---
title: Funnel Analysis
disable_toc: false
aliases:
- /real_user_monitoring/funnel_analysis
- /real_user_monitoring/product_analytics/funnel_analysis
further_reading:
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
algolia:
  tags: ['funnel']
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
All features in Product Analytics are in limited availability. To request access, complete the form.
{{< /callout >}}

## Overview

Funnel analysis helps you track conversion rates across key workflows to identify and address any bottlenecks in end-to-end user journeys. Specifically, you can:

- See if customers drop off at a certain point due to poor website performance
- Track how the conversion rate changes over time as new features are built
- Measure how adding new steps to a workflow impacts drop off rate
- Understand how much time on average it takes for users to go through the funnel (time to convert)
- Filter on individual events (action or view) on different steps in your funnel
- Combine multiple events within a given step, as end users might have different ways to achieve the same outcome through different flows

**Note**: The **conversion rate** is the number of visitors to your website that completed a desired goal (a conversion) out of the total number of visitors.

## Build a funnel

To build a funnel, navigate to [**Digital Experience > Product Analytics > Journeys**][1] and click **Funnel**.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-overview.png" alt="Navigate to the Funnel Analysis tab within Product Analytics" style="width:100%;" >}}

From this page, choose your starting view or action and click on the plus icon to build additional steps. You can also use drag and drop functionality to move steps around.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-start-view-action.mp4" alt="Filtering network map with search" video=true >}}

If you have a starting point in mind, but aren't sure what your users did next, the funnel step editor automatically loads the top most common **views** and **actions** that users typically see and take next. This allows you to build funnels quicker knowing the paths your users are taking in sequence.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-build-next-steps.png" alt="The funnel step editor automatically loads the top most common views and actions that users typically see and take next." style="width:50%;" >}}

**Note**: Any action or view that happens between two steps in a funnel does not impact the step-by-step or overall conversion rate. As long as step 1 and step 2 happen in the right order in a given session at least once, it counts as a single converted session.

### Filtering

When constructing your funnel, you can filter globally or on a step.

- **Global filters** are applied to the entire funnel.

  {{< img src="product_analytics/journeys/funnel_analysis/funnels-global-filters.png" alt="Use attributes to filter information globally when constructing your funnel" style="width:50%;" >}}

- **Filtering on a step** provides insight on how the step changes based on a particular constraint on that step. For example, you may want to see how a specific device, operating system, geolocation, or user impacts conversion between steps.

    {{< img src="product_analytics/journeys/funnel_analysis/funnels-step-filters.png" alt="Use attributes to filter information between steps when constructing your funnel" style="width:50%;" >}}

### Combining events

When constructing your funnel, you can combine multiple events within a given step, as end users may have different ways to achieve the same outcome through different flows. When combining events, any of the events in the step can represent the step. The numerical value you see is the combination of all steps within the combined step.

To combine an event, click the three dots next to an event and select **+ Combine Events**.

### Grouping

Use the Group by dropdown to group the data by a specific attribute.

**Note**: Group by does not work with the funnel steps visualization.

## Refine conversion

You can further analyze the information on the funnel page to understand the conversion rate. Conversion rate is a crucial metric that measures the effectiveness of your site or application.

You can analyze conversion by **session count** or **users**, which means you can understand how many sessions or users ended up completing the funnel.

You can measure conversion by the following attributes:

- **Conversion count** - A count of users who went through the funnel you've defined.
- **Conversion rate** - A conversion refers to the moment when a user responds to a call to action. This rate is the percentage of the total number of users that visited your site or application who converted.

  **Note**: Only completed RUM sessions contribute to conversion rates.

- **Time to convert** - The time it took for the user to complete the step events.

You can measure these attributes **across all steps** or between **specific steps**.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-across-steps.png" alt="Measure attributes across all steps or specific steps." style="width:60%;" >}}

Use the **filter** selector to filter by various criteria that you define.

From there, you can click a datapoint to **investigate the specific attributes** that may have affected conversion rates, such as page load speed, ease of navigation, or checkout experience.

## Changing the visualization

{{< img src="product_analytics/journeys/funnel_analysis/funnel-timeseries.mp4" alt="Click the visualization dropdown to select a different view" video=true >}}

After you've defined the step events and conversion measurement, you can switch to see a different visualization and better understand conversion of users for your app.

### Timeseries
Seeing the conversion as a timeseries can be helpful in understanding conversion trends. Each datapoint across the x-axis represents the conversion for the identified query.

You can select the time period for which you want to graph the conversion and view it in percentages or in absolute count.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-timeseries.png" alt="View conversion data as a timeseries." style="width:80%;" >}}

### Query value

Query values display the current value of the given usage metric.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-query-value.png" alt="View conversion data as a query value." style="width:80%;" >}}

### Top list

Visualize the top values from a facet based on your chosen measure.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-top-list.png" alt="View conversion data as a top list." style="width:80%;" >}}

## Share a funnel

Funnels can be shared with your teams on [dashboards][5] to analyze conversion alongside other telemetry metrics, or in a [Notebook][6] to be used for reporting.

You can share the entire visualization or individual widgets.

- Share the entire visualization to Notebooks and dashboards:

  {{< img src="product_analytics/journeys/funnel_analysis/funnels-share-visualization.png" alt="Share the entire visualization by clicking Export" style="width:90%;" >}}

- Share individual widgets from a dashboard:

  {{< img src="product_analytics/journeys/funnel_analysis/funnels-share.png" alt="Share a widget by clicking the export icon in the upper-right of the widget" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[2]: /real_user_monitoring/browser/data_collected/#default-attributes
[3]: /real_user_monitoring/browser/data_collected/#session-metrics
[4]: /real_user_monitoring/session_replay
[5]: /dashboards/
[6]: /notebooks/