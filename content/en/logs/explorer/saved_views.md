---
title: Saved Views
kind: documentation
description: 'Use Saved Views to automatically configure your Log Explorer.'
further_reading:
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Perform Log Analytics'
    - link: 'logs/processing'
      tag: 'Documentation'
      text: 'Learn how to process your logs'
---

## Overview

Efficient troubleshooting requires your data to be in the proper **scope** to permit exploration, have access to **visualization options** to surface meaningful information, and have relevant **[facets][1]** to enable analysis.

Troubleshooting is highly contextual, and Saved Views enable you and your teammates to easily switch between different troubleshooting contexts. You can access Saved Views in the upper left corner of the [Log Explorer][2].

{{< img src="logs/explorer/saved_views/overview.png" alt="Saved Views selection"  style="width:90%;" >}}

Technically, a Saved View keeps track of:

- A [search query][3] along with its time range. **Note**: Saved View is meant to track live time ranges (such as past hour, or past week) and fixed time ranges are converted as such on save. 
- A customized default visualization ([log stream][4], [log patterns][5], or [log analytics][6] along with their specific visualization properties).
- A [selected subset of facets][1] to be displayed in the facet list.

## Default view

{{< img src="logs/explorer/saved_views/default.png" alt="Default view"  style="width:50%;" >}}

Your existing Log Explorer view is your default saved view. This configuration is only accessible and viewable to you and updating this configuration does not have any impact on your organization.

You can **temporarily** override your default saved view by completing any action in the UI or when opening links to the Log Explorer that embed a different configuration.

At any moment, from the default view entry in the Views panel:

* **Reload** your default view by clicking on the entry.
* **Update** your default view with the current parameters.
* **Reset** your default view to Datadog's defaults for a fresh restart.

## Saved views

{{< img src="logs/explorer/saved_views/custom.png" alt="Saved views across organizations"  style="width:50%;" >}}

All saved views, that are not your default saved view, are shared across your organization:

* **Integration saved views** come out-of-the-box with most Datadog [Log Management Integrations][7]. These are read-only, and identified by the logo of the integration.
* **Custom saved views** are created by users. They are editable by any user in your organization (excepting [Read Only users][8]), and identified with the avatar of the user who created it. Hit the **save** button to create a new custom saved view from the current content of your explorer.

{{< img src="logs/explorer/saved_views/save.png" alt="Logs -- Save"  style="width:30%;" >}}

At any moment, from the saved view entry in the Views panel:

* **Load** or **reload** a saved view.
* **Update** a saved view with the configuration of the current view.
* **Rename** or **delete** a saved view.
* **Share** a saved view through a short-link.
* **Star** (turn into a favorite) a saved view so that it appears on top of your saved view list, and is accessible directly from the navigation menu.

{{< img src="logs/explorer/saved_views/star.png" alt="Starred views"  style="width:50%;" >}}

*Note*: Update, rename, and delete actions are disabled for integration saved views and [Read Only users][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets/
[2]: /logs/explorer
[3]: /logs/explorer/search/
[4]: /logs/explorer/?tab=logstream#visualization
[5]: /logs/explorer/patterns/
[6]: /logs/explorer/analytics/
[7]: /integrations/#cat-log-collection
[8]: /account_management/rbac/permissions?tab=ui#general-permissions
