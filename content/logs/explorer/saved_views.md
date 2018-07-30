---
title: Saved Views
kind: documentation
description: "Saved views"
further_reading:
- link: "logs/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

## Overview

When multiple teams are sharing the same account or when there are a lot of different log sources, it is critical to be able to start investigating without being overwhelmed by the number of possibilities offered by the user interface. 
Teams can now define and share Views so everyone starts troubleshooting on the best conditions possible.

If the use of the [recommended naming convention](/logs/processing/attributes_naming_convention/) in the logs can reduce the number of different attributes, we provide the Saved Views to let user build their own environment including:

* A search query
* A selected subset of facets
* A set of columns
* A customized default visualization

Saved Views can then be selected directly in the left panel or in the search bar thanks to the auto-complete matching whether the search name or query.

{{< img src="logs/explorer/saved_views/saved_views_selection.png" alt="Saved views selection" responsive="true">}}


## Log Explorer Default View

By default, all facets are displayed for all users.

Each user can define its own list of default Facet and Facet Group to display by using the “manage facets” button and then select the wanted one.

{{< img src="logs/explorer/saved_views/default_saved_views.png" alt="Saved views selection" responsive="true">}}

Once this has been done, every time the log explorer is opened the default list of facet will be used.

This works as well when clicking on “Log Explorer - Default view” from the list of Saved views:

{{< img src="logs/explorer/saved_views/default_views_selection.png" alt="Saved views selection" responsive="true" style="width:50%;">}}

## Create a Saved View

To create a new Saved views follow those steps:

1. Enter the wanted query in the search bar
2. Select the columns to display 
3. Select the list of facet to display
4. Hit the “save as” button at the top of the screen
5. Name it and click on “Save”

{{< img src="logs/explorer/saved_views/saved_views_creation.gif" alt="Saved views creation" responsive="true">}}


## Update or remove an existing Saved View

### Remove a Saved View

Saved views can be removed directly from the log explorer. Simply hover on the one to remove in the list to access to the delete button.

{{< img src="logs/explorer/saved_views/remove_saved_views.png" alt="remove Saved views" responsive="true" style="width:50%;">}}


### Update a Saved View

To update an existing Saved View, proceed exactly if you were to create a new one but when you save it select an existing one from the drop down and click on “replace” and confirm.

{{< img src="logs/explorer/saved_views/update_saved_views.gif" alt="Saved views selection" responsive="true" style="width:50%;">}}

## Revert modification on a Saved View  

When using a saved view, the search can be refined to slice and dice even more in the Data and keep on the troubleshooting.

It is also possible to revert all the modifications and come back to the original state thanks to the revert button. 

{{< img src="logs/explorer/saved_views/revert_saved_views.png" alt="revert saved views" responsive="true" style="width:50%;">}}
