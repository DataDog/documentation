---
title: Saved Views
kind: documentation
description: "Use Saved Views to automatically configure your Log Explorer."
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
---

## Overview

When multiple teams share the same account, or when your logs have many different sources, it is critical to be able to promptly start investigating the right content.
With Datadog, teams can define and share Log Explorer Views so everyone can start troubleshooting with the same predefined context.

Datadog Saved Views allow you to save search customizations in the Log Explorer, including:

* A [search query][1]
* A [selected subset of facets][2]
* A set of [columns][3]
* A customized default visualization ([logstream][4] or [log analytic][5])

Saved Views can then be selected directly in the left panel or in the search bar thanks to auto-completion, which matches on either search name or query.

{{< img src="logs/explorer/saved_views/saved_views_selection.png" alt="Saved Views selection" responsive="true">}}

## Log Explorer Default View

By default, all facets are displayed for all users.

Each user can define their own list of default facets and facet groups to display by using the *Manage Facets* button and then selecting the desired facets.

{{< img src="logs/explorer/saved_views/default_saved_views.png" alt="Saved Views selection" responsive="true">}}

Once this has been done, the Log Explorer uses the default list of facets whenever it is opened. This also works when clicking on *Log Explorer - Default view* from the list of Saved Views:

{{< img src="logs/explorer/saved_views/default_views_selection.png" alt="Saved Views selection" responsive="true" style="width:50%;">}}

## Create a Saved View

To create a new Saved View:

1. Enter a query in the [search bar][1]
2. Select the columns to display (from the cog icon at the top-right of the page, or from a log's contextual panel)
3. Select the list of [facets][2] to display
4. Click the *Save as* button at the top of the screen
5. Name it and click on *Save*

{{< img src="logs/explorer/saved_views/saved_views_creation.gif" alt="Saved Views creation" responsive="true">}}

## Update or remove an existing Saved View

### Remove a Saved View

Saved Views can be removed directly from the Saved View list in the Logs Explorer. Hover over the name of the Saved View to reveal its **delete** button. Click on it and confirm.

{{< img src="logs/explorer/saved_views/remove_saved_views.png" alt="remove Saved Views" responsive="true" style="width:50%;">}}

### Update a Saved View

To update an existing Saved View, proceed exactly as if you were creating a new one but instead of saving it, select an existing Saved View from the drop down, click on *replace*, and confirm.

{{< img src="logs/explorer/saved_views/update_saved_views.gif" alt="Saved Views selection" responsive="true" style="width:50%;">}}

## Revert a modification to a Saved View

After selecting a Saved View, you can continue to refine and modify your search as needed for your troubleshooting purposes. After changing the view, you can always revert to the most recent saved version of the Saved View by selecting the **Revert** button.

**Note**: The Revert button does not undo changes after they have been saved.

{{< img src="logs/explorer/saved_views/revert_saved_views.png" alt="revert Saved Views" responsive="true" style="width:50%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/?tab=facets#setup
[3]: /logs/explorer/?tab=logstream#visualization
[4]: /logs/explorer/?tab=logstream#visualization
[5]: /logs/explorer/analytics
