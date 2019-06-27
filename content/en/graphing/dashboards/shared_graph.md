---
title: Shared Graphs
kind: documentation
aliases:
    - /graphing/faq/is-there-a-way-to-share-graphs
    - /graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
further_reading:
- link: "graphing/dashboards/"
  tag: "Documentation"
  text: "Learn how to create Dashboards in Datadog"
- link: "graphing/dashboards/template_variables"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "graphing/widgets"
  tag: "Documentation"
  text: "Discover all available Widgets for your Dashboard"
---

## Overview

Shared Graphs and Screenboards allow you to display metric, trace, and log visualizations outside of Datadog while being able to apply access restriction to your Embeds.

## Sharing a particular Graph

To share a Graph from a [Timeboard][1] or a [Screenboard][2]:

1. Choose a graph.
2. Click the pencil icon in the upper right corner to edit it.
3. Under step 2: *Graph your data* select the **share** tab:
4. Pick a fixed timeframe for your graph.
5. Pick a graph size.
6. Choose to include the legend or not.
7. Get the embed code with the *Generate embed code* button.

{{< img src="graphing/dashboards/shared_graph/share_graph.png" alt="Shared graph" responsive="true" style="width:75%;">}}

**Note**: The Share functionality is not available for APM and Log queries.

## Sharing a Screenboard

Share a Screenboard entirely with the following process:

1. Click the settings cog in the upper right of the screen.
2. Click the *Generate public URL* option.
3. Use the created URL to have live and read-only access to just the contents of that Screenboard.

**Note**: If you've enabled [Templating][3], the template variable drop down isn't present in the shared views and widgets based of APM and Log queries won't display any data.

### Applying restrictions

You can restrict access on a per-IP address basis to your Embed. Email [the Datadog support team][4] to enable the IP address white listing feature that allows administrators to provide a list of IP addresses that have access to shared dashboards.

These shared graphs can be embedded in external-facing tools using the provided iframe as well as shared directly using the source URL provided in the text box. This can be used externally without additional authorization required for access. Once enabled, manage your restrictions on [your organisation security page][5].

**Note**: If you have enabled [Dashboard Template Variables][3], the template variable drop-downs will not be present in the shared views. We advise to avoid using these if you intend on sharing the views outside of your organization.

## Revoking shared graphs/Screenboard

### Revoking an embedded graphs
To revoke the keys used to share your graphs:

1. [Navigate to **Integrations -> Embeds**][6] to find a list of all the graphs that are shared.
2. Click on the **Revoke** button for the graph you want to stop sharing.
3. The graph moves then to the **Revoked** list.

{{< img src="graphing/dashboards/shared_graph/embedded_graphs.png" alt="Embedded graph" responsive="true" style="width:75%;">}}

### Revoking a Screenboard

To revoke a shared Screenboard:

1. Navigate to the Dashboard List.
2. Select the Screenboard you want to revoke access to.
3. Click on the cog to edit it.
4. Click **Revoke public URL**.

## API

Datadog has a [dedicated API][7] allowing you to interact with your Embeds:

| Endpoint                 | Description                                                           |
| :---                     | :----                                                                 |
| [Get all embeds][8]      | Gets a list of previously created embeddable graphs.                  |
| [Create embed][9]        | Creates a new embeddable graph.                                       |
| [Get specific embed][10] | Get the HTML fragment for a previously generated embed with embed_id. |
| [Enable embed][11]       | Enable a specified embed.                                             |
| [Revoke embed][12]       | Revoke a specified embed.                                             |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/dashboards/timeboard
[2]: /graphing/dashboards/screenboard
[3]: /graphing/dashboards/template_variables
[4]: /help
[5]: https://app.datadoghq.com/account/org_security
[6]: https://app.datadoghq.com/account/settings#embeds
[7]: /api/?lang=python#embeddable-graphs
[8]: /api/?lang=python#get-all-embeds
[9]: /api/?lang=python#create-embed
[10]: /api/?lang=python#get-specific-embed
[11]: /api/?lang=python#enable-embed
[12]: /api/?lang=python#revoke-embed
