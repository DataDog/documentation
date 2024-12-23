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
- Add multiple views or actions to your steps by using wildcards (*) or combining them with OR to define user journeys
- Filter individual steps in the funnel using any facet so that you can zoom in on notable views and actions
- Track conversions over time with Timeseries, so you can gain insight into long-term trends

**Note**: The conversion rate is the number of visitors to your website that completed a desired goal (a conversion) out of the total number of visitors.

## Build a funnel

To build a funnel, navigate to [**Digital Experience > Product Analytics > Journeys**][1] and click **Funnel**, then follow the steps below.

{{< img src="product_analytics/journeys/funnel_analysis/build-a-funnel-1.png" alt="Navigate to the Funnel Analysis tab within Product Analytics" style="width:100%;" >}}

### 1. Build step events

1. Choose at least two step events (view/action) to build a funnel.
2. Optionally, click the three dots to **filter on individual events** or **combine two events** into one.
   - You can **mix and match** views and actions
   - Click the input box to **search** for any view/action
   - When you have a starting point in mind, but aren't sure what your users next, clicking the input box also loads the **most common views/actions** that users are taking in sequence
   - Click **Delete Event** to delete an event
   - Click **More Filters** to see or search for additional filters
3. Click the plus icon to build additional steps

{{< img src="product_analytics/journeys/funnel_analysis/product-analytics-funnel-step-events.mp4" alt="To build step events, you can add or combine views and actions." video=true >}}

**Note**: Any action or view that happens between two steps in a funnel does not impact the step-by-step or overall conversion rate. As long as step 1 and step 2 happen in the right order in a given session at least once, it counts as a single converted session.

### 2. Optionally, define conversion metrics

Depending on the funnel visualization, you can choose to measure conversion by the following under **Define conversion metrics**.

| Metric Category | Metric | Definition | Visualization Type |
|-----------------|--------|------------|--------------|
| Funnel type | Sessions | Percentage of sessions on your website that result in a conversion, such as a purchase or form submission. It is calculated by dividing the number of sessions with a conversion by the total number of sessions. | Steps, Timeseries, Query Value, Top List |
| Funnel type | Users | Percentage of users who take a desired action. It is calculated by dividing the total number of users who converted by the total number of users who visit your site. | Steps, Timeseries, Query Value, Top List |
| Metric | Sessions | Count of unique sessions. | Timeseries, Top list |
| Metric | Users | Count of unique users. | Timeseries, Top List |

### 3. Optionally, filter on default attributes

When constructing your funnel, you can add [default attributes][2] (device type, environment, country, release version, and more), as well as [session-specific][3] attributes (such as session duration or view count) to analyze the data further.

- Click the **Add Filter** button to view or search the full list of available attributes.
- To **remove a filter**, click the filter, then the delete icon.
- To **clear all filters**, click **Clear**

{{< img src="product_analytics/journeys/funnel_analysis/funnels-filters.png" alt="Use attributes to filter information when constructing your funnel" style="width:60%;" >}}

### 4. Optionally, group by a specific attribute

When viewing a Timeseries or Top List of your funnel, you can group the data by a specific attribute, such as by country or browser name.

## Analyzing a funnel

After you build a funnel, click on **View Funnel Insights** to open the **Funnel Analysis** panel, which offers correlated data on performance and user behavior trends. This information helps you understand the conversion rate.

For high level trends, you can see the end-to-end conversion rate for your entire workflow and also see individual steps to step conversion to dropoff rates. If you want to understand what it looks like for someone who converted versus someone who dropped off, you can watch a [Session Replay][4] for each case.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-analyzing-funnel.jpg" alt="Use the Funnel Insights panel to review performance and user behavior trends" style="width:90%;" >}}

The **Performance** section allows you to understand if poor performance could have affected conversion. You can view a graph with a correlation between the load time of that page and the conversion rate and also see if any issues (detected by [Error Tracking][5]) occurred on that page.

The **User Behavior** section allows you to compare the average frustration count (from [frustration signals][6]) with the conversion rate, and further analyze the frustration signals detected from individual actions. Next to this section is a chart showing the conversion and drop off rate for specific countries, allowing you to understand if geographic region plays a role in a user converting. 

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-user-behavior.jpg" alt="User behavior section within funnel analysis" style="width:90%;" >}}

## Change funnel visualization

### Steps

This is the default visualization, which uses a bar graph to show the number and percentage of users or sessions that move to the next step in the funnel.

- As you add steps, the funnel refreshes with more bars.
- Click any bar to analyze the particular step further.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-bars.png" alt="The Steps view is a bar graph that visualizes your funnel." style="width:60%;" >}}

### Timeseries

View your funnel as a Timeseries to analyze conversion over time based on your funnel and an understanding of whether your end user experience is improving.

To view the conversion rate over time based on the funnel you've defined, click the **Timeseries** tab in the visualizer.

From the Timeseries view, you can:
- Decide the size of the rollup period (by day, week) by adjusting the time frame
- Toggle between the Steps and Timeseries view

{{< img src="product_analytics/journeys/funnel_analysis/funnels-timeseries-conversions.png" alt="Use the Timeseries view to visualize conversion rate over time" style="width:60%;" >}}

### Query value

View the raw number of sessions or users based on your funnel query.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-query-value.png" alt="The Query Value view shows the raw number of sessions or users based on your query." style="width:60%;" >}}

### Top list

Visualize the top values based on your funnel query.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-top-list.png" alt="The Top List view visualizes the top values based on your query." style="width:60%;" >}}

## Share a funnel

To share a funnel visualization, click the **Export** button in the upper-right of the widget.

{{< img src="product_analytics/journeys/funnel_analysis/funnels-export-1.png" alt="Share the entire visualization by clicking Export" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[2]: /real_user_monitoring/browser/data_collected/#default-attributes
[3]: /real_user_monitoring/browser/data_collected/#session-metrics
[4]: /real_user_monitoring/session_replay
[5]: /real_user_monitoring/error_tracking/
[6]: /real_user_monitoring/browser/frustration_signals/
[7]: /dashboards/
[8]: /notebooks/