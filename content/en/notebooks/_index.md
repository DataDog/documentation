---
title: Notebooks
kind: documentation
aliases:
  - /graphing/notebooks/
further_reading:
- link: "https://www.datadoghq.com/blog/collaborative-notebooks-datadog/"
  tag: "Blog"
  text: "Tell data-driven stories with Collaborative Notebooks"
- link: "/dashboards/screenboard/"
  tag: "Documentation"
  text: "Create a Screenboard"
- link: "/dashboards/timeboard/"
  tag: "Documentation"
  text: "Create a Timeboard"
---

## Overview

Notebooks combine graphs and text in a linear, cell-based format. They are help you explore and share stories with your data by creating postmortems, investigations, runbooks, documentation, and more.

{{< img src="notebooks/demo_notebook.png" alt="demo notebook"  style="width:90%;">}}

## Live collaboration

Notebooks support real-time collaboration. Presence indicators show who is viewing your notebook at any time; indicators also appear beside any cell that another user is currently editing.

{{< img src="notebooks/live_editing.png" alt="live collaboration in notebooks"  style="width:90%;">}}

Changes made to a notebook appear automatically, without the need to refresh.

Everyone on your team can open or edit any notebook, but a notebook can only be deleted by the creator or by an administrator.

## Commenting

To add a comment, select some text or hover over a graph. The **Add comment** button will appear to the right of the cell.

{{< img src="notebooks/add_comment.png" alt="add a comment to text"  style="width:90%;">}}

To edit or delete a comment you wrote, click the menu on the top-right of your comment.

{{< img src="notebooks/edit_comment.png" alt="edit comment in notebook"  style="width:90%;">}}

View or re-open resolved comments in the Comment History, available in the Notebook cog menu.

{{< img src="notebooks/comment_history.png" alt="edit comment in notebook"  style="width:90%;">}}

Notebook authors receive email notifications for new comments on their notebooks, and commenters are notified for replies to their comments. Manage your notification settings through `Notifications` in the notebook cog menu.


## Notebook List

The [Notebook List][1] allows you to view and search previously created notebooks. Each notebook's name, creator, and last modified date are displayed. Notebooks are grouped by:

* **My Notebooks**: Notebooks created by you.
* **Other Notebooks**: Notebooks created by other members of your team.

The Notebook List also displays preset templates and tutorials. Edit these templates directly, and click **Clone** to save your changes.

{{< img src="notebooks/templates.png" alt="templates on the notebook list page"  style="width:80%;">}}

## New Notebook

Create a [new notebook][2] from the main navigation: *Notebooks > New Notebook*.

A new notebook is not saved by default. You must click the **Save** button.

### Types of content

Notebooks support visualizations and text cells.

#### Visualization

Graphs in notebooks support all Datadog data sources: metrics, log events, Indexed Spans, live processes, network traffic, RUM events, profiling metrics, and security signals.

{{< img src="notebooks/data_sources.png" alt="live collaboration in notebooks"  style="width:50%;">}}

Graphs are created with the Datadog query editor. Notebooks support:

* [Timeseries][3]
* [Top List][4]
* [Heatmap][5]
* [Distribution][6]
* [Log stream][7]

#### Text

Text in a notebook is formatted with [Markdown][8], which enables the use of headings, subheadings, links, images, lists, and code blocks.

### Manipulating cells

When an existing notebook is opened, the cells are in a closed state. To open a cell for editing, mouse over it and use `CMD + Click`, or click **Edit**. To close a cell, click outside it, press `ESC`, or press `CMD + Enter`. Only one cell may be open at a time.

To insert cells, use the **+** button that appears to the left of the cell. To share, clone, or delete cells, use the action tray that appears above the cell on hover, or use a keyboard shortcut. A list of all keyboard shortcuts is available by clicking the keyboard button in the notebook header.

### Time frames

By default, all graph cells are linked to the global time frame set in the notebook header.

To view a different time frame, select an option in the global time picker, or scrub on a graph directly. The Notebook URL will update to reflect this new time frame without saving it to the Notebook.

**Note**: Clicking and dragging to zoom in on a graph does not unlock the cell from the global time. It changes the notebook's global time instead.

{{< img src="notebooks/global_time.png" alt="Notebook Time Selector"  style="width:90%;">}}


To save this time as the Notebook’s default, click **Update Default**. The reset button will discard your changes to time.

Individual cells can be unlinked from the global time and set to an independent time frame.

{{< img src="notebooks/cell_time.png" alt="Cell Time Selector"  style="width:90%;">}}

To view a different time frame on a single cell, edit the cell and use the toggle to unlink it from Global Time. Change the time frame using the time picker or by scrubbing on the graph. Changes made in edit mode are saved automatically when you click **Done**. To discard your changes, click **Cancel** instead of **Done**.

### Expand

Expand the graph by clicking on the expand icon on the right side of the cell. More details about full screen mode is available on the [Widgets][9] page.

### Layout options

The following layout options are available by clicking the grid icon on the right side of the cell in edit mode:

* **Graph size**: Choose between `XS`, `S`, `M` (default), `L`, and `XL`.
* **Graph legend**: Uncheck the box to hide the legend. Legends are automatically disabled for `XS` and `S` graphs.
* **Grouping**: Display one graph per tag value to see small multiples of your visualization.

{{< img src="notebooks/layout_options.png" alt="layout options"  style="width:50%;">}}

**Note**: Changing any of these settings only affects the targeted cell.

<!--- KEEP- WILL RE-IMPLEMENT
### Link to individual cells

Copy the URL for a specific cell by clicking the chain-link icon on the right side of the cell. Direct linking is available for both visualization and Markdown cells.

When a user visits the URL for a specific cell, the notebook is opened to show the cell at the top of the viewport. Links are absolute: a cell's URL remains the same even if it is moved to a new position within the notebook.--->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook
[3]: /dashboards/widgets/timeseries/
[4]: /dashboards/widgets/top_list/
[5]: /dashboards/widgets/heat_map/
[6]: /dashboards/widgets/distribution/
[7]: /dashboards/widgets/log_stream/
[8]: https://daringfireball.net/projects/markdown/
[9]: /dashboards/widgets/#full-screen
