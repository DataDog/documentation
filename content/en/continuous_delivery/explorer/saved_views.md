---
title: Saved Views
descriptions: Learn how to create and share saved views in the CD Visibility Explorer.
further_reading:
- link: "/continuous_delivery/explorer/search_syntax/"
  tag: "Documentation"
  text: "Learn how to create a search query"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility is in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

Saved views allow you to save the state of the [CD Visibility Explorer][2] and enable effective troubleshooting by providing you with access to scoped queries, relevant facets, visualization options, and the time range. 

Saved views can keep track of your:

- Deployment results and environment data
- Search queries (such as failed deployment executions with a specific CD provider, failing deployment executions in a given environment by their deployment status, deployment executions that required rollbacks, and deployment IDs or URLs)
- Live time range (such as the past hour or the past week)
- Visualizations (such as a timeseries, top list, table, or list)

You can also use saved views to share common queries and configurations with your teammates.

## Saved views

To access your saved views, expand **> Views** to the left in the [CD Visibility Explorer][1].

All saved views except for the [default view](#default-views) are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the user's avatar who created the view. Click **Save** to create a custom saved view from the current content in your Explorer.

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

{{< img src="continuous_delivery/explorer/saved_view.png" alt="Default view in the CD Visibility Explorer" width="100%" >}}

You can:

- Load or reload a saved view
- Update a saved view with the current view's configuration
- Rename or delete a saved view
- Share a saved view through a short link
- Favorite a saved view to add it to your Saved Views list accessible in the navigation menu

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

## Default views

You can set a saved view to be your default landing page in the [CD Visibility Explorer][2]. Default views are set per user and have no impact on your organization. 

{{< img src="continuous_delivery/explorer/default_view.png" alt="Default view in the CD Visibility Explorer" width="100%" >}}

Temporarily override your default saved view by completing an action in the UI or opening links in the Explorer that embeds a different configuration.

In the default view entry in the **Views** panel, you can:

- Click on the entry to reload your default view
- Update your default view with the current parameters
- Reset your default view back to the default setting for a fresh restart

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: /continuous_delivery/explorer/