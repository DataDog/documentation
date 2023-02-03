---
title: Funnel Widget
kind: documentation
aliases:
    - /graphing/widgets/funnel/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Notebooks"
- link: "https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/"
  tag: "Blog"
  text: "Use funnel analysis to understand and optimize key user flows"
---

The funnel widget visualizes conversion rates across user workflows and end-to-end user journeys.

{{< img src="dashboards/widgets/funnel/funnel.png" alt="Funnel widget visualizing drop-off rates of a user on an e-commerce site" >}}

## Setup

{{< img src="dashboards/widgets/funnel/funnel_setup.png" alt="Funnel widget setup screen" >}}

### Configuration

1. Choose the data to graph:
    * RUM: See the [Search RUM Events documentation][1] to configure a RUM query.
2. Select **View** or **Action** and choose a query from the dropdown menu.
3. Click the **+** button and select another query from the dropdown menu to visualize the funnel. See the [RUM Visualize documentation][2] for more information on visualizing Funnel analysis.

### Options

#### Global time

On screenboards and notebooks, choose whether your widget has a custom timeframe or uses the global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/search/
[2]: /real_user_monitoring/funnel_analysis
