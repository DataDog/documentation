---
title: Saved Views
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Search and Manage Synthetic Tests >
  Saved Views
sourceUrl: https://docs.datadoghq.com/synthetics/explore/saved_views/index.html
---

# Saved Views

## Overview{% #overview %}

Saved views allow you to save the state of the **Search and Manage** [Synthetic Tests page](https://app.datadoghq.com/synthetics/tests). They enable effective troubleshooting by providing you with quick access to scoped queries, relevant facets, [test coverage widgets](https://docs.datadoghq.com/synthetics/test_coverage/), and the time range.

You can also use saved views to share common queries and configurations with your teammates.

## Create a saved view{% #create-a-saved-view %}

To access your saved views, expand **> Views** to the left of **Synthetic Monitoring & Continuous Testing** in the [Synthetic Tests page](https://app.datadoghq.com/synthetics/tests). To create a saved view, search through your Synthetic tests and click **+ Save new view as**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/search/create_a_new_saved_view_2.403ace715fa43a20483407af02442dcd.png?auto=format"
   alt="Create a new saved view in the Synthetic Tests page" /%}

All saved views except for the default view are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the user's avatar who created the view. Enter a name and click **Save** to create a saved view from the current content in the Synthetic Tests page.

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

You can set a saved view to be your default landing page in the [Synthetic Tests page](https://docs.datadoghq.com/synthetics/search/). Default views are set per user and have no impact on your organization.

Temporarily override your default saved view by adding facets to your search query and clicking **Update your default view**. To create a new saved view, Click the **+ Save new view as** button.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/search/update_your_default_view_2.8e4a1553f5d7f75b950f3c4081e57004.png?auto=format"
   alt="Update your default view in the Synthetic Tests page" /%}

In the default view entry in the **Views** panel, you can:

- Click on the entry to reload your default view
- Update your default view with the current parameters
- Reset your default view back to the default setting for a fresh restart

## Further Reading{% #further-reading %}

- [Learn how to search and manage your Synthetic tests](https://docs.datadoghq.com/synthetics/explore/)
