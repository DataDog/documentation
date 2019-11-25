---
title: Shared Graphs
kind: documentation
aliases:
    - /graphing/faq/is-there-a-way-to-share-graphs
    - /graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
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

To share a Graph from a [Timeboard][1] or a [Screenboard][2]:

2. For the graph you want to share, click the pencil icon in the upper right corner.
3. Under *Graph your data* select the **Share** tab.
4. Pick a timeframe for your graph.
5. Pick a graph size.
6. Choose to include the legend or not.
7. Get the embed code with the *Generate embed code* button.

{{< img src="graphing/dashboards/shared_graph/share_graph.png" alt="Shared graph" responsive="true" style="width:75%;">}}

## Screenboards

Share an entire screenboard by generating a public URL:

1. On the screenboard's page, click the settings cog in the upper right.
2. Choose the **Generate public URL** option.
3. If the [global time selector][3] is active, choose the global time setting for the public screenboard.
4. Copy the URL and click **Done**.

The created URL has live, read-only access to the contents of that specific screenboard.

**Note**: Screenboard [template variables][4] selectors are not present on the public screenboard. The template variables' values are the default values set in Datadog. Additionally, widgets based on APM and log queries do not display data on the public screenboard.

### Applying restrictions

You can restrict access on a per-IP address basis to your Embed. Email [Datadog support][5] to enable the IP address white listing feature that allows administrators to provide a list of IP addresses that have access to shared dashboards.

These shared graphs can be embedded in external-facing tools using the provided iframe as well as shared directly using the source URL provided in the text box. This can be used externally without additional authorization required for access. Once enabled, manage your restrictions on [your organization security page][6].

### Dark mode

Dark mode is available on public screenboards for individual users. Click the sun or moon icon in the upper right to toggle between modes.

### TV mode

TV mode is available on public screenboards. Use the keyboard shortcut `F` or click the TV icon in the upper right.

## Revoke sharing

### Embedded graphs
To revoke the keys used to share your graphs:

1. [Navigate to **Integrations -> Embeds**][7] to find a list of all the graphs that are shared.
2. Click on the **Revoke** button for the graph you want to stop sharing.
3. The graph moves then to the **Revoked** list.

{{< img src="graphing/dashboards/shared_graph/embedded_graphs.png" alt="Embedded graph" responsive="true" style="width:75%;">}}

### Screenboards

To revoke a shared Screenboard:

1. Navigate to the Dashboard List.
2. Select the Screenboard you want to revoke access to.
3. Click on the cog to edit it.
4. Click **Revoke public URL**.

## API

Datadog has a [dedicated API][8] allowing you to interact with your Embeds:

| Endpoint                 | Description                                                           |
| :---                     | :----                                                                 |
| [Get all embeds][9]      | Gets a list of previously created embeddable graphs.                  |
| [Create embed][10]        | Creates a new embeddable graph.                                       |
| [Get specific embed][11] | Get the HTML fragment for a previously generated embed with embed_id. |
| [Enable embed][12]       | Enable a specified embed.                                             |
| [Revoke embed][13]       | Revoke a specified embed.                                             |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/dashboards/timeboard
[2]: /graphing/dashboards/screenboard
[3]: /graphing/dashboards/screenboard/#global-time-selector
[4]: /graphing/dashboards/template_variables
[5]: /help
[6]: https://app.datadoghq.com/account/org_security
[7]: https://app.datadoghq.com/account/settings#embeds
[8]: /api/?lang=python#embeddable-graphs
[9]: /api/?lang=python#get-all-embeds
[10]: /api/?lang=python#create-embed
[11]: /api/?lang=python#get-specific-embed
[12]: /api/?lang=python#enable-embed
[13]: /api/?lang=python#revoke-embed
