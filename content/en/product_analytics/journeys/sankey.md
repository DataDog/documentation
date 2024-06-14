---
title: Sankey Diagram
kind: documentation
aliases:
- /real_user_monitoring/product_analytics/sankey
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
All features in Product Analytics are in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

The Sankey diagram allows you to visualize all user journeys across your application to analyze the critical path.

{{< img src="/product_analytics/sankey_diagrams/sankey-overview.png" alt="The default Sankey diagram for an app" style="width:90%;" >}}

Each node represents a view the user visited. The thickness of each node represents the count of user sessions on that page. A page with fewer visitors will have a thinner node in the diagram.

If a user visits the same page multiple times during their session, that page is only counted once.

Actions are not supported in the Sankey diagram.

## Build a Sankey diagram

### View the default diagram

1. Navigate to [**Digital Experience > Product Analytics > User Journeys**][1].
2. Click **Sankey** if it's not already selected. This displays the default visualization, which represents the most popular user journeys in your application.

### Start or end the diagram at a given view

You can use the **Define Sankey** menu to customize this diagram to display:
- the steps users took *after* visiting a given view
- the steps users took *before* visiting a given view

The example below displays the four steps that users in the United States take after visiting `/department/lightning`:

{{< img src="/product_analytics/sankey_diagrams/customized-sankey.png" alt="A customized Sankey diagram for an app" style="width:90%;" >}}

### Graph all views containing a given phrase

Sankey diagrams support [Datadog wildcards][2], allowing you to build a diagram of all views containing a given phrase.

To match multiple routes, type a wildcard instead of choosing a single view name. The example below displays the five steps that users take after visiting any view matching `/department/*`:

{{< img src="/product_analytics/sankey_diagrams/wildcard-sankey.png" alt="A Sankey diagram that uses a wildcard to match several routes" style="width:90%;" >}}

## Analyze a Sankey diagram

You can hover over a diagram node to view the number of sessions that included visits to that view.

Click a node for a list of analysis options, such as viewing a sample [Session Replay][3] or building a Sankey diagram that starts with that view.

{{< img src="/product_analytics/sankey_diagrams/sankey-node-interaction.png" alt="The actions menu of a Sankey diagram node" style="width:90%;" >}}


### Convert the diagram to a funnel

1. From the Sankey diagram page, click the **Build Funnel** button.
2. In the Sankey diagram, click the nodes of the views you want to include in the funnel.
3. Click **Create Funnel from Selection**.

{{< img src="/product_analytics/sankey_diagrams/sankey-funnel-conversion.png" alt="A Sankey to funnel conversion in process" style="width:90%;" >}}

## Troubleshooting

### The Sankey diagram and the funnel show different view counts for the same view

The algorithms for the Sankey diagram and the funnel rely on two different computations. You may notice a difference in the count of views for the first step of both visualizations. Imagine the use case of building a funnel and a Sankey diagram that both start with the same view: `/home`.

- The funnel counts all views that went to `/home`.
- The Sankey diagram only counts views to `/home` where another view follows. If a user goes to `/home` and stays on that page or leaves the app, the Sankey diagram does not include their sessions.

In addition, funnels do not include active sessions, while Sankey diagrams do include active sessions.

[1]: https://app.datadoghq.com/product-analytics/user-journey
[2]: /real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /real_user_monitoring/session_replay/
