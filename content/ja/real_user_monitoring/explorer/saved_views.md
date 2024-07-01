---
title: Saved Views
kind: documentation
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Search for your events
---

## Overview

Saved views allow you to save the state of the RUM Explorer and enable effective troubleshooting by providing you with quick access to scoped queries, relevant facets, visualization options, and the time range. 

Saved views can keep track of your:

- RUM events (such as sessions, views, errors, actions, resources, and long tasks)
- Search queries (such as top users and app version adoption)
- Column sort order
- Live time range (such as the past hour or the past week)
- Visualizations (such as a timeseries, toplist, table, or funnel graph)
- Subset of facets

You can also use saved views to share common queries and configurations with your teammates.

## Saved views

To access your saved views, expand **> Views** to the left above the **Sessions & Replays** tab in the [RUM Explorer][1].

All saved views except for the [default view](#default-views) are shared across the organization, including:

- Custom saved views created by users. These are editable by anyone in your organization and display the user's avatar who created the view. Click **Save** to create a custom saved view from the current content in your RUM Explorer.
- Saved view templates are out-of-the-box saved views that are predefined in the RUM Explorer. You can use these templates to create a saved view with a Datadog avatar. Scroll to the bottom of the list of saved views to access the templates.
<br /><br />
  {{< img src="real_user_monitoring/explorer/rum-saved-views-2.png" alt="Access Saved Views by clicking the tab to the left of Real User Monitoring" width="90%" >}}

You can:

- Load or reload a saved view
- Update a saved view with the current view's configuration
- Rename or delete a saved view
- Share a saved view through a short link
- Favorite a saved view to add it to your Saved Views list accessible in the navigation menu

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

## Default views

You can set a [saved view](#saved-views) to be your default landing page in the [RUM Explorer][2]. Default views are set per user and have no impact on your organization. 

Temporarily override your default saved view by completing an action in the UI or opening links in the RUM Explorer that embeds a different configuration.

In the default view entry in the **Views** panel, you can:

- Click on the entry to reload your default view
- Update your default view with the current parameters
- Reset your default view back to the default setting for a fresh restart

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /real_user_monitoring/explorer/
