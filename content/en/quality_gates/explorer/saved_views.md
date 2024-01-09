---
title: Saved Views
kind: documentation
further_reading:
- link: "/quality_gates/explorer/search_syntax/"
  tag: "Documentation"
  text: "Learn how to create a search query"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Quality Gates is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates is in public beta.
{{< /callout >}}

## Overview

Saved views allow you to save the state of the [Quality Gates Explorer][2] on the [**Quality Gate Executions** page][1] and enable effective troubleshooting by providing you with access to scoped queries, relevant facets, visualization options, and the time range. 

Saved views can keep track of your:

- Quality Gate executions and rule executions
- Search queries 
- Column sort order
- Live time range (such as the past hour or the past week)
- Visualizations (such as a timeseries, top list, table, or funnel graph)
- Subset of facets

You can also use saved views to share common queries and configurations with your teammates.

## Saved views

To access your saved views, expand **> Views** to the left in the [Quality Gates Explorer][1].

All saved views except for the [default view](#default-views) are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the avatar of the view's creator. Click **Save** to create a saved view from the current content in your Explorer.

{{< img src="quality_gates/explorer/expand_view.png" text="Create a saved view in the Quality Gates Explorer" style="width:100%" >}}

You can:

- Load or reload a saved view
- Update a saved view with the current view's configuration
- Rename or delete a saved view
- Share a saved view through a short link
- Favorite a saved view to add it to your Saved Views list accessible in the navigation menu

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

## Default views

You can set a saved view to be your default landing page in the [Quality Gates Explorer][2]. Default views are set per-user and have no impact on your organization. 

{{< img src="quality_gates/explorer/default_view.png" text="Set a default view in the Quality Gates Explorer" style="width:100%" >}}

From your current default saved view, take actions to update the view to a different layout that you want as your default. In the **Views** panel, save the current view as your default saved view.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/quality-gates/executions
[2]: /quality_gates/explorer/