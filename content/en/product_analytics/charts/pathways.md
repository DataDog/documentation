---
title: Pathways
aliases:
- /real_user_monitoring/product_analytics/sankey
- /product_analytics/sankey
- /product_analytics/journeys/sankey
further_reading:
- link: '/product_analytics/journeys'
  tag: Documentation
  text: Journeys
- link: '/dashboards/widgets/sankey/'
  tag: Documentation
  text: Build Sankey widgets in Dashboards
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
All features in Product Analytics are in limited availability. To request access, complete the form.
{{< /callout >}}

## Overview

You can use Pathway diagrams to visualize all user journeys across your application to analyze the critical path.

{{< img src="/product_analytics/journeys/pathways/pathways-overview.png" alt="The default Pathways diagram for an app" style="width:90%;" >}}

Each node represents a view the user visited. The thickness of each node represents the count of user sessions on that page. A page with fewer visitors has a thinner node in the diagram.

If a user visits the same page multiple times during their session, that page is only counted once.

Actions are not supported in the Pathways diagram.

## Build a Pathways diagram

### View the default diagram

1. Navigate to [**Product Analytics > User Journeys**][1].
2. Click **Pathways** if it's not already selected. This displays the default visualization that represents the most popular user journeys in your application.

### Start or end the diagram at a given view

You can use the left menu to customize this diagram and display:
- the steps users took *after* visiting a given view
- the steps users took *before* visiting a given view

The example below displays the four steps that users in the United States take after visiting `/department/lighting`:

{{< img src="/product_analytics/journeys/pathways/customized-pathways.png" alt="A customized Pathways diagram for an app" style="width:90%;" >}}

### Graph all views containing a given phrase

Pathways diagrams support [Datadog wildcards][2], allowing you to build a diagram of all views containing a given phrase.

To match multiple routes, type a wildcard instead of choosing a single view name. The example below displays the five steps that users take after visiting any view matching `/department/*`:

{{< img src="/product_analytics/journeys/pathways/pathways-wildcard.png" alt="A Pathways diagram that uses a wildcard to match several routes" style="width:90%;" >}}

## Analyze a Pathways diagram

You can hover over a diagram node to view the number of sessions that included visits to that view.

Click a node for a list of analysis options, such as viewing a sample [Session Replay][3] or building a Pathways diagram that starts with that view.

{{< img src="/product_analytics/journeys/pathways/pathways-node.png" alt="The actions menu of a Pathways diagram node" style="width:90%;" >}}

### Convert the diagram to a funnel

1. From the Pathways diagram page, click the **Build Funnel** button.
2. In the Pathways diagram, click the nodes of the views you want to include in the funnel.
3. Click **Create Funnel from Selection**.

{{< img src="/product_analytics/journeys/pathways/pathways-build-funnel.png" alt="A Pathway to funnel conversion in process" style="width:90%;" >}}

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey
[2]: /real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /real_user_monitoring/session_replay/
