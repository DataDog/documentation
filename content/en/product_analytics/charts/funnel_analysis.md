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

<div class="alert alert-info"> Any action or view that happens between two steps in a funnel does not impact the step-by-step or overall conversion rate. As long as step 1 and step 2 happen in the right order in a given session at least once, it counts as a single converted session.</div>


Click on the funnel chart to open a side panel with additional context about user dropoffs. Then, navigate between steps to see:

- **Step performance**: See metrics related to conversion (for example, conversion rate, dropped off sessions, and average conversion time).
- **Branching paths from the previous step**: Discover the other paths that users take instead of the ones you anticipate. This section is only available when looking at a step between two views in a funnel.
- **Issues that might be affecting conversion**: See the top issues that might be affecting conversions and investigate them further with the links to RUM, Error Tracking, and Session Replay.


{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_metrics.png" alt="Click on the funnel view to see additional context about user dropoffs." style="width:90%;" >}}



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

**Note**: The `Group by` option is not supported for the funnel steps visualization; when applied, the visualization automatically changes to a top list.

## Refine conversion

You can further analyze the information on the funnel page to understand the conversion rate. Conversion rate is a crucial metric that measures the effectiveness of your site or application.

You can analyze conversion by **session**, **users** or **accounts**. This can be useful if you suspect, for instance, that a minority of your user base converts at a high rate.

- If you select <strong>Session</strong>, all steps must be completed within the same <code>@session.id</code> to count as a conversion.

- If you select <strong>User</strong>, the funnel requires the same individual user (<code>@user.id</code>) to complete every step for the conversion to count.

- If you select <strong>Account</strong>, different users within the same account can complete different steps and the conversion still counts. In this case, the funnel is tied to the <code>@account.id</code> facet, which maps to org IDs in Datadog. 

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_refine_conversion.png" alt="Specify which facet you'd like to use to refine your conversion. The available options are Session, User, and Account." style="width:50%;" >}}
 



You can measure conversion by the following attributes:

- **Conversion count**: A count of users who went through the funnel you've defined.
- **Conversion rate**: A conversion refers to the moment when a user responds to a call to action. This rate is the percentage of users who have entered the funnel and converted.

  **Note**: Only completed RUM sessions contribute to conversion rates.
- **Time to convert**: The time it took for the user to complete the step events.


You can measure these attributes **across all steps** or between **specific steps**.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_conversion.png" alt="Measure attributes across all steps or specific steps." style="width:60%;" >}}

Use the **filter** selector to scope to the various criteria you want to define. These filters are applied to all steps in your funnel.

Next, click a datapoint to **investigate the specific attributes** that might have affected conversion rates, such as page load speed, ease of navigation, or checkout experience.

## Conversion computing metrics

### How Datadog computes conversion metrics
Consider a funnel with events `A → B → C` and event steps: 

```
A, A, A, B, C, C
```

In this case, Datadog counts one conversion. This is because the conversion calculations matches only the first occurence of event **A** and the first occurence of event **C** in the sequence. 

<div class="alert alert-info">
To further illustrate, if the user performs the event sequence <code>A, A, A, B, C, C, A,...</code>, Datadog counts two conversions. The first conversion completes with the sequence <code>A, A, A, B, C, C</code>, and the second conversion begins with the next occurence of <code>A</code>.
</div>

The average time between steps is calculated by looking at the average duration between each conversion and takes all conversions into account, regardless of whether you selected `unique` or `total` is selected for the counts.


### Select a conversion computing metric

When computing your conversion, you can choose between two counting methods: **Unique** or **Total**. 

- **Unique**: Counts conversion only once per session, user or account. For example, if the user completes the funnel sequence A → B → C multiple times within the same session or time frame, (A → B → C → A → B → C), it counts as **one conversion**.

- **Total**: Counts a conversion each time the same session, user or account completes the defined funnel. Using the same example, the funnel sequence A → B → C → A → B → C counts as **2 conversions**.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_conversion.png" alt="Select a conversion measure, whether Unique or Total, to determine how your session conversions are counted." style="width:80%;" >}}

<div class="alert alert-info">
The <strong>Total</strong> setting doesn’t multiply conversions for repeated steps within a single flow, instead it counts complete flows, not the number of times an intermediate step is repeated. 

<br>
<br

If you switch to <strong>Unique</strong>, then only the first conversion per session (or per user, depending on your analysis scope) is counted.
</div>

If you analyze your funnel by `user` or by `account`, you can define your conversion timeframe in hours or days of the first event. The default timeframe for conversions is onw day (a 24-hour window, not a calendar date) to determine if a conversion happened or not.


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