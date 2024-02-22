---
title: Sankey Diagrams
kind: documentation
---

## Overview

The Sankey diagram allows you to visualize all user journeys across your application to analyze the critical path.

<!-- default-sankey.png -->

Each node represents a view the user visited. The thickness of each node represents the count of user sessions on that page. A page with fewer visitors will have a thinner node in the diagram.

If a user visits the same page multiple times during their session, that page is only counted once.

Actions are not supported in Sankey diagrams.

## Build a Sankey diagram

### View the default diagram

1. Navigate to [**UX Monitoring > Product Analytics > User Journeys**][1].
2. Click **Sankey** if it's not already selected. This displays the default visualization, which represents the most popular user journeys in your application.

### Start or end the diagram at a given view

You can use the **Define Sankey** menu to customize this diagram to display
- the steps users took *after* visiting a given view.
- the steps users took *before* visiting a given view.

The example below displays the four steps that users in the United States take after visiting `/department/lightning`:

<!-- customized-sankey.png -->

### Graph all views containing a given phrase

Sankey diagrams support [Datadog wildcards][2], allowing you to build a diagram of all views containing a given phrase.

The example below displays the five steps that users take after visiting any view matching `/department/*`:

<!-- wildcard-sankey.png -->

## Analyze a Sankey diagram

You can hover over a diagram node to view the number of sessions that included visits to that view.

Click the node for a list of analysis options, such as viewing a sample [Session Replay][3] or building a Sankey diagram that starts with that view.

<!-- sankey-node-interaction.png -->

### Convert the diagram to a funnel

1. From the Sankey diagram page, click the **Build funnel** button.
2. In the Sankey diagram, click the nodes of the views you want to include in the funnel.
3. Click **Create funnel from selection**.

<!-- sankey-funnel-conversion.png -->

[1]: https://app.datadoghq.com/product-analytics/user-journey
[2]: /real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /real_user_monitoring/session_replay/
