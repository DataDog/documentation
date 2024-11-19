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

**Note**: The conversion rate is the number of visitors to your website that completed a desired goal (a conversion) out of the total number of visitors.
## Build a funnel

To build a funnel, navigate to [**Digital Experience > Product Analytics > Journeys**][1] and click **Funnel**.

{{< img src="product_analytics/journeys/funnel_analysis/overview.png" alt="Navigate to the Funnel Analysis tab within Product Analytics" style="width:100%;" >}}

From this page, choose your starting view or action and click on the plus icon to build additional steps. You can also use drag and drop functionality to move steps around.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-building-a-funnel-1.mp4" alt="Filtering network map with search" video=true >}}

### Suggested next steps

When you have a starting point in mind, but aren't sure what your users did next, expand the **Quickly add a step** panel (available in a drawer on the right) to view suggested next steps. After inputting steps, this panel automatically loads the top five most common **views** and **actions** that users typically see and take next. This allows you to build funnels quicker knowing the paths your users are taking in sequence.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-suggested-next-steps.jpg" alt="Build a funnel" style="width:90%;" >}}

**Note**: Any action or view that happens between two steps in a funnel does not impact the step-by-step or overall conversion rate. As long as step 1 and step 2 happen in the right order in a given session at least once, it counts as a single converted session.

### Filtering

When constructing your funnel, you can add [default attributes][2] (core, device, operating system, geo-location, and user) and [session-specific][3] attributes to analyze the data further. Click the **Add Filter** button to view the full list of available attributes.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-filtering.png" alt="Use attributes to filter information when constructing your funnel" style="width:80%;" >}}

## Analyzing a funnel

After you build a funnel, click on **View Funnel Insights** to open the **Funnel Analysis** panel, which offers correlated data on performance and user behavior trends. This information helps you understand the conversion rate.

For high level trends, you can see the end-to-end conversion rate for your entire workflow and also see individual steps to step conversion to dropoff rates. If you want to understand what it looks like for someone who converted versus someone who dropped off, you can watch a [Session Replay][4] for each case.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-analyzing-funnel.jpg" alt="Use the Funnel Insights panel to review performance and user behavior trends" style="width:90%;" >}}

The **Performance** section allows you to understand if poor performance could have affected conversion. You can view a graph with a correlation between the load time of that page and the conversion rate and also see if any issues (detected by [Error Tracking][5]) occurred on that page.

The **User Behavior** section allows you to compare the average frustration count (from [frustration signals][6]) with the conversion rate, and further analyze the frustration signals detected from individual actions. Next to this section is a chart showing the conversion and drop off rate for specific countries, allowing you to understand if geographic region plays a role in a user converting. 

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-user-behavior.jpg" alt="User behavior section within funnel analysis" style="width:90%;" >}}

## Share a funnel

Funnels can be shared with your teams on [dashboards][7] to analyze conversion alongside other telemetry metrics, or in a [Notebook][8] to be used for reporting.

You can share the entire visualization or individual widgets.

- Share the entire visualization to Notebooks and dashboards:

  {{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-share-entire-visualization.jpg" alt="Share the entire visualization by clicking Export" style="width:90%;" >}}

- Share individual widgets:

  {{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-share-individual-widgets-1.mp4" alt="Share a widget by clicking the export icon in the upper-right of the widget" video="true" width=90% >}}

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