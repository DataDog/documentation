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

## Log Explorer Default View

The default log explorer view is loaded where you land on Search, Pattern, or Analytics Pages from the main navigation menu (or using corresponding URL in your browser).

The default view includes:

* an empty query
* a list of visible facets in the facet list
* a basic page layout (e.g. table configuration for Search, vizualisation options for Analytics, etc.)

The default view comes a "factory" configuration, but all edits on the facet list (see caption hereafter) or in the page layout are automatically saved in this default view.

{{< img src="logs/explorer/saved_views/edit_facet_list.png" alt="Saved Views selection" responsive="true">}}


## Use Saved Views

When multiple teams share the same account, or when your logs have many different sources, it is critical to be able to promptly start investigating the right content. With Datadog, teams can define and share Log Explorer Views so everyone can start troubleshooting with the same predefined context.

Datadog Saved Views allow you to save search customizations in the Log Explorer, including:

* A [search query][1]
* A [selected subset of facets][2]
* A customized default visualization ([logstream][4], [log patterns][5] or [log analytic][6] along with their specific visualisation properties)


### Load a Saved View

Saved Views can then be selected directly in the left panel or in the search bar thanks to auto-completion, which matches on either search name or query. 

And for really recurring working context, saved views marked as favourites (starred) are available directly from the main navigation menu.

{{< img src="logs/explorer/saved_views/saved_view_load.gif" alt="Saved Views selection" responsive="true">}}

Saved views can be loaded directly from the search bar, either by title or by either element of its query. 

{{< img src="logs/explorer/saved_views/saved_view_load-from-bar.png" alt="Saved Views selection" responsive="true">}}


### Manage Saved Views

To create a new Saved View, click the *Save as* button at the top of the screen5. Give it a name, and click on *Save*. 

Slice and dice starting from a saved view. And update if needed this saved view to keep track of query or page layout configuration, clicking on the "Save As" button. 

{{< img src="logs/explorer/saved_views/saved_view_create-delete.gif" alt="Saved views creation" video="true" responsive="true" >}}

Saved Views can be removed directly from the Saved View list in the Logs Explorer. Hover over the name of the Saved View to reveal its **delete** button. Click on it and confirm.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/?tab=facets#setup
[3]: /logs/explorer/?tab=logstream#visualization
[4]: /logs/explorer/?tab=logstream#visualization
[5]: /logs/explorer/patterns
[6]: /logs/explorer/analytics
