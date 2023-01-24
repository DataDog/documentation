---
title: Saved Views
kind: documentation
further_reading:
- link: "/continuous_testing/explorer/search/"
  tag: "Documentation"
  text: "Create a search query for your CI batches"
---

## Overview

Saved views allow you to save the state of the **Search and Manage** [Synthetic Tests page][1] and enable effective troubleshooting by providing you with quick access to scoped queries, relevant facets, [test coverage widgets][3], and the time range. 

You can also use saved views to share common queries and configurations with your teammates.

## Create a saved view

To access your saved views, expand **> Views** to the left of **Synthetic Monitoring & Continuous Testing** in the [Synthetic Tests page][1]. 

To create a saved view, search through your Synthetic tests and click **+ Create a New Saved View**. Enter a name for the view and click **Save**.

All saved views except for the [default view](#default-views) are shared across the organization, including custom saved views created by users. These are editable by anyone in your organization and display the user's avatar who created the view. Click **Save** to create a custom saved view from the current content in your Synthetic Tests page.

You can: 

- Load or reload a saved view
- Update a saved view with the current view's configuration
- Rename or delete a saved view
- Share a saved view through a short link
- Favorite a saved view to add it to your Saved Views list accessible in the navigation menu

<div class="alert alert-info">Update, rename, and delete actions are disabled for read-only users.</div>

## Default views

You can set a [saved view](#create-a-saved-view) to be your default landing page in the [Synthetic Tests page][2]. Default views are set per user and have no impact on your organization. 

Temporarily override your default saved view by adding facets to your search query and clicking **Update your default view**. To create a new saved view, Click the **+ Create a New Saved View** button.

In the default view entry in the **Views** panel, you can:

- Click on the entry to reload your default view
- Update your default view with the current parameters
- Reset your default view back to the default setting for a fresh restart

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /synthetics/search/
[3]: /synthetics/test_coverage/