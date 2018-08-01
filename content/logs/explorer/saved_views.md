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
  text: Learn how to process your logs
---

## Overview

When multiple teams are sharing the same account or when there are a lot of different log sources, it is critical to be able to start investigating with the right content. 
In Datadog, teams can now define and share Log Explorer Views so everyone starts troubleshooting with the same predefined context.

Datadog Saved Views allow you to save search customizations in the Log Explorer, including:

* A search query
* A selected subset of facets
* A set of columns
* A customized default visualization

Saved Views can then be selected directly in the left panel or in the search bar thanks to the auto-complete matching whether the search name or query.

{{< img src="logs/explorer/saved_views/saved_views_selection.png" alt="Saved Views selection" responsive="true">}}

## Log Explorer Default View

By default, all facets are displayed for all users.

Each user can define their own list of default Facets and Facet Groups to display by using the *manage facets* button and then selecting the desired one.

{{< img src="logs/explorer/saved_views/default_saved_views.png" alt="Saved Views selection" responsive="true">}}

Once this has been done, every time the Log Explorer is opened the default list of facets is used. This also works when clicking on *Log Explorer - Default view* from the list of Saved Views:

{{< img src="logs/explorer/saved_views/default_views_selection.png" alt="Saved Views selection" responsive="true" style="width:50%;">}}

## Create a Saved View

To create a new Saved View:

1. Enter a query in the search bar
2. Select the columns to display 
3. Select the list of facets to display
4. Click the *Save as* button at the top of the screen
5. Name it and click on *Save*

{{< img src="logs/explorer/saved_views/saved_views_creation.gif" alt="Saved Views creation" responsive="true">}}

## Update or remove an existing Saved View

### Remove a Saved View

Saved Views can be removed directly from the Log Explorer. Hover on the name of the Saved View to remove in the Saved views list to access to the delete button.

{{< img src="logs/explorer/saved_views/remove_saved_views.png" alt="remove Saved Views" responsive="true" style="width:50%;">}}

### Update a Saved View

To update an existing Saved View, proceed exactly if you were to create a new one but instead of saving it, select an existing Saved View from the drop down, click on *replace*, and confirm.

{{< img src="logs/explorer/saved_views/update_saved_views.gif" alt="Saved Views selection" responsive="true" style="width:50%;">}}

## Revert modification on a Saved View  

When using a Saved View, you can continue to refine and modify your search and keep on the troubleshooting. It is also possible to revert all modifications and come back to the original Saved View thanks to the *Revert* button. 

{{< img src="logs/explorer/saved_views/revert_saved_views.png" alt="revert Saved Views" responsive="true" style="width:50%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}