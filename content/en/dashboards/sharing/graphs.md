---
title: Share Graphs
kind: documentation
aliases:
    - /graphing/faq/is-there-a-way-to-share-graphs
    - /graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
    - /graphing/dashboards/shared_graph/
further_reading:
- link: "https://www.datadoghq.com/blog/dashboard-sharing/"
  tag: "Blog"
  text: "Share dashboards securely with anyone outside of your organization"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Create Dashboards in Datadog"
- link: "/dashboards/guide/embeddable-graphs-with-template-variables/"
  tag: "Guide"
  text: "Embeddable Graphs with Template Variables"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover Widgets for your Dashboard"
---

To share a graph:

1. From the graph you want to share, click the pencil icon in the upper right corner.
1. Under the *Graph your data* section, select the **Share** tab.
1. Pick a timeframe for your graph.
1. Pick a graph size.
1. Choose to include the legend or not.
1. Get the embed code with the **Generate embed code** button.

{{< img src="dashboards/sharing/graph_share_tab.png" alt="Share tab in a graphing editor" style="width:95%;">}}

## Revoke

To revoke the keys used to share individual (embedded) graphs:

1. Navigate to [**Organization Settings > Public Sharing > Shared Graphs**][1] to see a list of all shared graphs.
2. Find your graph by using the search bar or by sorting the table columns.
3. Click on the **Revoke** button next to the graph you want to stop sharing.

## Applying restrictions

You can restrict access on an IP address basis to your dashboard. Email [Datadog support][2] to enable the IP address include listing feature that allows administrators to provide a list of IP addresses that have access to shared dashboards. After it's enabled, manage your restrictions on your organization's [Public Sharing][3] page.

## API

Datadog has a [dedicated API][4] allowing you to interact with your shared graphs (embeds):

| Endpoint                 | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Get all embeds][5]     | Get a list of previously created embeddable graphs.                     |
| [Create embed][6]       | Creates a new embeddable graph.                                         |
| [Get specific embed][7] | Get the HTML fragment for a previously generated embed with `embed_id`. |
| [Enable embed][8]       | Enable the specified embed.                                             |
| [Revoke embed][9]       | Revoke the specified embed.                                             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/public-sharing/shared-graphs
[2]: /help/
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[4]: /api/latest/embeddable-graphs/
[5]: /api/latest/embeddable-graphs/#get-all-embeds
[6]: /api/latest/embeddable-graphs/#create-embed
[7]: /api/latest/embeddable-graphs/#get-specific-embed
[8]: /api/latest/embeddable-graphs/#enable-embed
[9]: /api/latest/embeddable-graphs/#revoke-embed