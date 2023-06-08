---
title: Sharing Dashboards
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
- link: "/dashboards/template_variables/"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover Widgets for your Dashboard"
---

## Overview

Shared dashboards and graphs allow you to display metric, trace, and log visualizations outside of Datadog.

## Dashboards
When you share a dashboard by URL or email link, the shared page shows live, read-only contents of that dashboard.

### Share a dashboard by public URL

To share an entire dashboard publicly, generate a URL:


1. On the dashboard's page, click the export icon in the upper right.
2. Select **Generate public URL**, which opens up a *Sharing: On* pop-up modal.
3. Under **Time & Variable Settings**, configure your desired options for the time frame and whether users can change it, as well as which tags are visible for selectable template variables.
4. Copy the URL and click **Done**.

**Note**: Widgets based on APM traces queries do not display data on public dashboards. The Log Stream widget doesn't show data either, but other log-based queries do.

### Share a dashboard with individual email addresses

 To authorize one or more specific email addresses to view a dashboard page:

1. On the dashboard's page, click the export icon in the upper right.
2. Select **Generate public URL**, which opens up a *Sharing: On* pop-up modal.
3. Select **Only specified people** for indicating who can access this dashboard.
4. Input the email addresses for people you would like to share your dashboard with.
5. Under **Time & Variable Settings**, configure your desired options for the time frame and whether users can change it, as well as which tags are visible for selectable template variables.
6. (Optional) Copy the URL to share; the specified email addresses also receive an email with the link.
7. Click **Done**.

**Note**:
- Individuals who are added to the allowlist for a dashboard receive a link in their email. If the link isn't clicked on within one hour, they can request a new link on the dashboard landing page. If their email address is on the allowlist, a new email is sent.
- Once clicked, a device is authorized to see the dashboard for up to 30 days. Once that time is expired, the user can request a new link on the dashboard landing page. If their email address is on the allowlist, a new email is sent.
- If a user is removed from the allowlist, access is removed.
- Widgets based on APM traces queries do not display data on shared dashboards. The Log Stream widget doesn't show data either, but other log-based queries do.

### Revoke

To revoke a shared dashboard:

1. Navigate to the [Dashboard List][1].
2. Select the dashboard you want to revoke access to.
3. Click on the export icon in the upper right.
4. Click **Configure public URL**.
5. Click **Revoke URL**.

### Refresh interval

Publicly shared dashboards refresh every 30 seconds. This refresh interval cannot be customized.

## Graphs

### Share

To share a graph from a [Timeboard][2] or [Screenboard][3]:

2. For the graph you want to share, click the pencil icon in the upper right corner.
3. Under the *Graph your data* section, select the **Share** tab.
4. Pick a timeframe for your graph.
5. Pick a graph size.
6. Choose to include the legend or not.
7. Get the embed code with the **Generate embed code** button.

{{< img src="dashboards/sharing/share_graph.png" alt="Shared graph" style="width:75%;">}}

### Revoke

To revoke the keys used to share individual (embedded) graphs:

1. Navigate to [**Organization Settings -> Public Sharing -> Shared Graphs**][4] to see a list of all shared graphs.
2. Click on the **Revoke** button next to the graph you want to stop sharing.
3. The graph is moved to the **Revoked** list.

### Applying restrictions

You can restrict access on a per IP address basis to your dashboard. Email [Datadog support][5] to enable the IP address include listing feature that allows administrators to provide a list of IP addresses that have access to shared dashboards. Once enabled, manage your restrictions on your organization's [Public Sharing][6] page.

### Dark mode

Dark mode is available on public dashboards for individual users. Click the sun or moon icon in the upper right to toggle between modes. Additionally, the URL parameter `theme` is available. The possible values are `dark` and `light`.

### TV mode

TV mode is available on public screenboards. Use the keyboard shortcut `F` or click the TV icon in the upper right.

## API

Datadog has a [dedicated API][7] allowing you to interact with your shared graphs (embeds):

| Endpoint                 | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Get all embeds][8]     | Get a list of previously created embeddable graphs.                     |
| [Create embed][9]       | Creates a new embeddable graph.                                         |
| [Get specific embed][10] | Get the HTML fragment for a previously generated embed with `embed_id`. |
| [Enable embed][11]       | Enable the specified embed.                                             |
| [Revoke embed][12]       | Revoke the specified embed.                                             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /dashboards/#timeboards
[3]: /dashboards/#screenboard
[4]: https://app.datadoghq.com/organization-settings/public-sharing/shared-graphs
[5]: /help/
[6]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[7]: /api/v1/embeddable-graphs/
[8]: /api/v1/embeddable-graphs/#get-all-embeds
[9]: /api/v1/embeddable-graphs/#create-embed
[10]: /api/v1/embeddable-graphs/#get-specific-embed
[11]: /api/v1/embeddable-graphs/#enable-embed
[12]: /api/v1/embeddable-graphs/#revoke-embed
