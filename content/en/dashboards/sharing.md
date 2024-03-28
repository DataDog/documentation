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

Shared visualizations allow you to display metric, trace, and log visualizations outside of Datadog. You can share entire [dashboards](#dashboards) as well as individual [graphs](#graphs).

## Dashboards

When you share a dashboard by URL or email link, the shared page shows live, read-only contents of that dashboard. When you generate a URL, you enable *Sharing*, and the dashboard becomes a public dashboard.

### Share a dashboard by public URL

To share an entire dashboard publicly, generate a URL:

1. On the dashboard's page, click **Share** in the upper right.
2. Select **Generate public URL**, which opens a *Sharing: On* pop-up modal.
3. Under **Time & Variable Settings**, configure your desired options for the time frame and whether users can change it, as well as which tags are visible for selectable template variables. **Note**: At least one widget must be set to use [`Global Time`][1].
4. Copy the URL and click **Done**.

**Note**: Widgets based on APM traces queries do not display data on public dashboards. The Log Stream widget doesn't show data either, but other log-based queries do.

### Share a dashboard with individual email addresses

 To authorize one or more specific email addresses to view a dashboard page:

1. On the dashboard's page, click **Share** in the upper right.
2. Select **Configure public URL**, which opens a *Sharing: On* pop-up modal.
3. Select **Only specified people** for indicating who can access this dashboard.
4. Input the email addresses for people you would like to share your dashboard with.
5. Under **Time & Variable Settings**, configure your desired options for the time frame and whether users can change it, as well as which tags are visible for selectable template variables. **Note**: At least one widget must be set to use [`Global Time`][1].
6. (Optional) Copy the URL to share; the specified email addresses also receive an email with the link.
7. Click **Done**.

**Note**:
- Individuals who are added to the allowlist for a dashboard receive a link in their email. If the link isn't clicked on within one hour, they can request a new link on the dashboard landing page. If their email address is on the allowlist, a new email is sent.
- Once clicked, a device is authorized to see the dashboard for up to 30 days. After that time is expired, the user can request a new link on the dashboard landing page. If their email address is on the *allowlist*, a new email is sent.
- If a user is removed from the allowlist, access is removed.
- Widgets based on APM traces queries do not display data on shared dashboards. The Log Stream widget doesn't show data either, but other log-based queries do.

### Revoke

To revoke access to a shared dashboard:

1. Navigate to the [Dashboard List][2].
2. Select the dashboard you want to revoke access to.
3. Click **Share** in the upper right.
4. Click **Configure public URL**.
5. Click **Revoke URL**.

### Refresh interval

Publicly shared dashboards refresh every 30 seconds. This refresh interval cannot be customized.

## Graphs

### Share

To share a graph from a [Timeboard][3] or [Screenboard][4]:

2. For the graph you want to share, click the pencil icon in the upper right corner.
3. Under the *Graph your data* section, select the **Share** tab.
4. Pick a timeframe for your graph.
5. Pick a graph size.
6. Choose to include the legend or not.
7. Get the embed code with the **Generate embed code** button.

{{< img src="dashboards/sharing/graph_share_tab.png" alt="Share tab in a graphing editor" style="width:95%;">}}

### Revoke

To revoke the keys used to share individual (embedded) graphs:

1. Navigate to [**Organization Settings -> Public Sharing -> Shared Graphs**][5] to see a list of all shared graphs.
2. Click on the **Revoke** button next to the graph you want to stop sharing.
3. The graph is moved to the **Revoked** list.

### Applying restrictions

You can restrict access on an IP address basis to your dashboard. Email [Datadog support][6] to enable the IP address include listing feature that allows administrators to provide a list of IP addresses that have access to shared dashboards. After it's enabled, manage your restrictions on your organization's [Public Sharing][7] page.

### Dark mode

Dark mode is available on public dashboards for individual users. Click the sun or moon icon in the upper right to toggle between modes. Additionally, the URL parameter `theme` is available. The possible values are `dark` and `light`.

### TV mode

TV mode is available on public dashboards. Use the keyboard shortcut `F` or click **Configure** in the upper right and select **TV mode**.

## API

Datadog has a [dedicated API][8] allowing you to interact with your shared graphs (embeds):

| Endpoint                 | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Get all embeds][9]     | Get a list of previously created embeddable graphs.                     |
| [Create embed][10]       | Creates a new embeddable graph.                                         |
| [Get specific embed][11] | Get the HTML fragment for a previously generated embed with `embed_id`. |
| [Enable embed][12]       | Enable the specified embed.                                             |
| [Revoke embed][13]       | Revoke the specified embed.                                             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/#global-time-selector
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /dashboards/#timeboards
[4]: /dashboards/#screenboards
[5]: https://app.datadoghq.com/organization-settings/public-sharing/shared-graphs
[6]: /help/
[7]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[8]: /api/latest/embeddable-graphs/
[9]: /api/latest/embeddable-graphs/#get-all-embeds
[10]: /api/latest/embeddable-graphs/#create-embed
[11]: /api/latest/embeddable-graphs/#get-specific-embed
[12]: /api/latest/embeddable-graphs/#enable-embed
[13]: /api/latest/embeddable-graphs/#revoke-embed
