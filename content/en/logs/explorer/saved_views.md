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

The default log explorer view is loaded where you land on the Logs Search, Analytics, or Patterns pages from the main navigation menu, or enter the corresponding URLs into your browser.

The default view includes:

* an empty query
* a list of visible facets in the facet list
* a basic page layout (e.g. table configuration for search, visualization options for analytics, etc.)

All edits on the facet list (see below) or in the page layout are automatically saved in this default view.

{{< img src="logs/explorer/saved_views/edit_facet_list.png" alt="Saved Views selection" responsive="true" style="width:90%;" >}}


## Saved Views

Saved Views allow you to save search customizations in the Log Explorer, including:

* A [search query][1]
* A [selected subset of facets][2]
* A customized default visualization ([log stream][3], [log patterns][4], or [log analytics][5] along with their specific visualization properties)


### Load a Saved View

Select Saved Views directly in the left panel or in the search bar with autocompletion, which matches on either search name or query.

{{< img src="logs/explorer/saved_views/saved_view_load-from-bar.png" alt="Saved Views selection" responsive="true" style="width:90%;" >}}

Star Saved Views to marked them as favorites. Starred Saved Views are available directly from the main navigation menu.

{{< img src="logs/explorer/saved_views/saved_view_load.mp4" alt="Saved Views load" video="true" responsive="true" >}}

### Share a Saved View

Copy-paste a Saved View short-link to share it with your teammates.

{{< img src="logs/explorer/saved_views/saved_view_share.png" alt="Saved Views selection" responsive="true" style="width:30%;" >}}

### Manage Saved Views

To create a new Saved View, click the *Save as* button at the top of the screen. Give it a name, and click on *Save*.

Slice and dice starting from a Saved View. If needed, update this saved view to keep track of query or page layout configuration—use the "Save As" button.

{{< img src="logs/explorer/saved_views/saved_view_create-delete.mp4" video="true" alt="Saved views creation" responsive="true" style="width:90%;" >}}

Saved Views can be removed directly from the Saved View list in the Logs Explorer. Hover over the name of the Saved View to reveal its **delete** button. Click on it and confirm.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/?tab=facets#setup
[3]: /logs/explorer/?tab=logstream#visualization
[4]: /logs/explorer/patterns
[5]: /logs/explorer/analytics
