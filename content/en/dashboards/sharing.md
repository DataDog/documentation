---
title: Sharing
kind: documentation
aliases:
    - /graphing/faq/is-there-a-way-to-share-graphs
    - /graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
    - /graphing/dashboards/shared_graph/
further_reading:
- link: "graphing/dashboards/"
  tag: "Documentation"
  text: "Create Dashboards in Datadog"
- link: "graphing/dashboards/template_variables"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "graphing/widgets"
  tag: "Documentation"
  text: "Discover Widgets for your Dashboard"
---

## Overview

Shared graphs and screenboards allow you to display metric, trace, and log visualizations outside of Datadog.

## Graphs
### Share

To share a graph from a [Timeboard][1] or [Screenboard][2]:

2. For the graph you want to share, click the pencil icon in the upper right corner.
3. Under the *Graph your data* section, select the **Share** tab.
4. Pick a timeframe for your graph.
5. Pick a graph size.
6. Choose to include the legend or not.
7. Get the embed code with the *Generate embed code* button.

{{< img src="graphing/dashboards/shared_graph/share_graph.png" alt="Shared graph"  style="width:75%;">}}

### Revoke

To revoke the keys used to share individual (embedded) graphs:

1. Navigate to [**Integrations -> Embeds**][3] to see a list of all shared graphs.
2. Click on the **Revoke** button next to the graph you want to stop sharing.
3. The graph is moved to the **Revoked** list.

## Screenboards
### Share

Share an entire screenboard by generating a public URL:

1. On the screenboard's page, click the settings cog in the upper right.
2. Choose the **Generate public URL** option.
3. If the [global time selector][4] is active, choose the global time setting for the public screenboard.
4. Copy the URL and click **Done**.

The created URL has live, read-only access to the contents of that specific screenboard.

**Note**: Screenboard [template variable][5] selectors are not present on the public screenboard. The template variables' values are the default values set in Datadog. Additionally, widgets based on APM and log queries do not display data on public screenboards.

### Revoke

To revoke a shared screenboard:

1. Navigate to the [Dashboard List][6].
2. Select the screenboard you want to revoke access to.
3. Click on the settings cog in the upper right.
4. Click **Configure sharing**.
5. Click **Revoke public URL**.

### Applying restrictions

You can restrict access on a per IP address basis to your screenboard. Email [Datadog support][7] to enable the IP address white listing feature that allows administrators to provide a list of IP addresses that have access to shared screenboards. Once enabled, manage your restrictions on your organization's [security page][8].

### Dark mode

Dark mode is available on public screenboards for individual users. Click the sun or moon icon in the upper right to toggle between modes. Additionally, the URL parameter `theme` is available. The possible values are `dark` and `light`.

### TV mode

TV mode is available on public screenboards. Use the keyboard shortcut `F` or click the TV icon in the upper right.

## API

Datadog has a [dedicated API][9] allowing you to interact with your shared graphs (embeds):

| Endpoint                 | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Get all embeds][10]      | Get a list of previously created embeddable graphs.                     |
| [Create embed][11]       | Creates a new embeddable graph.                                         |
| [Get specific embed][12] | Get the HTML fragment for a previously generated embed with `embed_id`. |
| [Enable embed][13]       | Enable the specified embed.                                             |
| [Revoke embed][14]       | Revoke the specified embed.                                             |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/dashboards/timeboard
[2]: /graphing/dashboards/screenboard
[3]: https://app.datadoghq.com/account/settings#embeds
[4]: /graphing/dashboards/screenboard/#global-time-selector
[5]: /graphing/dashboards/template_variables
[6]: https://app.datadoghq.com/dashboard/lists
[7]: /help
[8]: https://app.datadoghq.com/account/org_security
[9]: /api/?lang=python#embeddable-graphs
[10]: /api/?lang=python#get-all-embeds
[11]: /api/?lang=python#create-embed
[12]: /api/?lang=python#get-specific-embed
[13]: /api/?lang=python#enable-embed
[14]: /api/?lang=python#revoke-embed
