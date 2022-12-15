---
title: Funnel Analysis
kind: documentation
disable_toc: false
further_reading:
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "RUM Explorer"
---

## Overview

Funnel analysis helps you track conversion rates across key workflows to identify and address any bottlenecks. Specifically, you can:

- See if customers drop off at a certain point due to poor website performance
- Track how conversion rate changes over time as new features are built
- Measure the impact of how adding new steps to a workflow impacts dropoff rate

## Building a funnel

To build a funnel, select your starting view or action and click on the plus icon to proceed in building additional steps. You can also use drag and drop functionality to move steps around. 

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-building-a-funnel.mp4" alt="Build a funnel" video="true" style="width:100%;">}}

### Suggested next steps

When you have a starting point in mind, but aren't sure what your users did next, suggested next steps helps remove the guesswork. After inputting steps, the suggested next steps panel shows you the top five most common views that users typically have next, as well as the top five most common actions that users typically take next. This allows you to build funnels quicker knowing the paths your users are taking in sequence.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-suggested-next-steps.jpg" alt="Add a next step to your funnel using suggested next steps" style="width:90%;" >}}

### Filtering

When constructing your funnel, you can add all [default attributes][1] (core, device, operating system, geo-location, and user) and [session-specific][2] attributes to analyze the data further.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-filtering.jpg" alt="Use filters to drill down information when constructing your funnel" style="width:50%;" >}}

## Analyzing a funnel

After building a funnel, to understand why you see the conversion rate you do, the Funnel Insights panel offers correlated data on performance and user behavior trends.

For high level trends, you can see the end-to-end conversion rate for your entire workflow and also see individual steps to step conversion to dropoff rates. If you want to understand what it looks like for someone who converted versus someone who dropped off, you can watch a session replay for each case.

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-analyzing-funnel.jpg" alt="Use the Funnel Insights panel to review performance and user behavior trends" style="width:90%;" >}}

The performance section allows you to understand if poor performance could have affected conversion. You can view a graph with a correlation between the load time of that page and the conversion rate and also see if any issues (detected by Error Tracking) occurred on that page.

The user behavior section allows you to compare the average frustration count (from [frustration signals][3]) with the conversion rate, and even drill into the frustration signals detected from individual actions. Next to this section is a chart showing the conversion and dropoff rate for specific countries, allowing you to understand if geographic region plays a role in a user converting. 

{{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-user-behavior.jpg" alt="User behavior section within funnel analysis" style="width:90%;" >}}

## Sharing a funnel

Funnels can be shared with your teams on dashboards to analyze conversion alongside other telemetry metrics, or in a [Notebook][4] to be used for reporting.

Note that you have a few options when it comes to sharing:

- Share the entire visualization 

  [ ADD IMAGE TK ]

- Share specific widgets

  {{< img src="real_user_monitoring/funnel_analysis/funnel-analysis-share-specific-widgets.mp4" alt="Share specific widgets" video="true" style="width:100%;">}}

- Add your funnel as a saved view

  [ ADD IMAGE TK ]

## Alerting on conversion

Setting up alerts on conversion/dropoff rates allows you to be notified when conversion drops below a predefined threshold. You can export the conversion rate query to a monitor in a few ways:

- From the visualization: This option takes the end-to-end workflow's query, allowing you to alert on the conversion rate for an entire workflow. 
- From the Funnel Insights panel: This allows you to take individual queries and alert on them. While this could be the overall workflow, you also have the option to alert on individual steps' dropoff and conversion.
  - For example, if you want to alert on the dropoff rate between steps 3 and 4, you can do that from the Funnel Insights panel as shown below:

    [ ADD VIDEO TK ]
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/data_collected/#default-attributes
[2]: /real_user_monitoring/browser/data_collected/#session-metrics
[3]: /real_user_monitoring/frustration_signals/
[4]: /notebooks/