---
title: Saved Views
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Search and Manage Synthetic Tests >
  Synthetic Monitoring & Testing Results Explorer > Saved Views
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/explore/results_explorer/saved_views/index.html
---

# Saved Views

## Overview{% #overview %}

Saved views allow you to save the state of the [Synthetic Monitoring & Testing Results Explorer](https://docs.datadoghq.com/continuous_testing/explorer/) and enable effective troubleshooting by providing you with access to scoped queries, relevant facets, visualization options, and the time range.

Saved views can keep track of your:

- CI batches and test runs
- Search queries (such as failed test runs with HTTP error status codes, failing test runs in the CI by their blocking status, test runs that required retries, and test IDs to add to your CI pipeline)
- Live time range (such as the past hour or the past week)
- Visualizations (such as a timeseries, top list, table, or list)

You can also use saved views to share common queries and configurations with your teammates.

## Saved views{% #saved-views %}

To access your saved views, expand **> Views** to the left in the [Synthetic Monitoring & Testing Results Explorer](https://app.datadoghq.com/synthetics/explorer).

All saved views except for the default view are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the user's avatar who created the view. Click **Save** to create a custom saved view from the current content in your Explorer.

You can:

- Load or reload a saved view
- Update a saved view with the current view's configuration
- Rename or delete a saved view
- Share a saved view through a short link
- Favorite a saved view to add it to your Saved Views list accessible in the navigation menu

{% alert level="info" %}
Update, rename, and delete actions are disabled for read-only users.
{% /alert %}

## Default views{% #default-views %}

You can set a saved view to be your default landing page in the [Synthetic Monitoring & Testing Results Explorer](https://docs.datadoghq.com/continuous_testing/explorer/). Default views are set per user and have no impact on your organization.

{% image
   source="https://datadog-docs.imgix.net/images/continuous_testing/saved_view.98673ab1608183e4a4d193c525d77e79.png?auto=format"
   alt="Saved Views in the Synthetic Monitoring & Testing Results Explorer" /%}

Temporarily override your default saved view by completing an action in the UI or opening links in the Results Explorer that embeds a different configuration.

In the default view entry in the **Views** panel, you can:

- Click on the entry to reload your default view
- Update your default view with the current parameters
- Reset your default view back to the default setting for a fresh restart

## Further reading{% #further-reading %}

- [Learn how to create a search query](https://docs.datadoghq.com/synthetics/explore/results_explorer/search_syntax/)
