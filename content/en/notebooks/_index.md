---
title: Notebooks
kind: documentation
aliases:
  - /graphing/notebooks/
further_reading:
- link: "/dashboards/screenboard"
  tag: "Documentation"
  text: "Create a Screenboard"
- link: "/dashboards/timeboard"
  tag: "Documentation"
  text: "Create a Timeboard"
---

## Overview

Notebooks combine graphs and text in a linear, cell-based format. They are designed to help you explore and share stories with your data such as incident investigations, postmortems, runbooks, and infrastructure documentation.

{{< img src="graphing/notebooks/demo_notebook.png" alt="demo notebook"  style="width:100%;">}}

## Notebook List

The [Notebook List][1] allows you to view and search previously created notebooks. Each notebook's name, creator, and last modified date are displayed. The notebooks are grouped by:

* **My Notebooks**: Notebooks created by you.
* **Other Notebooks**: Notebooks created by other members of your team.

### Sharing and permissions

Everyone on your team can open or edit any notebook, but a notebook can only be deleted by the creator.

Edits to another user's notebook are not saved automatically. If you attempt to save changes to someone else's notebook, a copy is created unless you explicitly choose to overwrite the original.

## New Notebook

Create a [new notebook][2] from the main navigation: *Notebooks > New Notebook*.

A new notebook is not saved by default. You must click the **Save** button.

### Types of content

Notebooks support visualizations and text cells.

#### Visualization

Metrics in a notebook are graphed using the Datadog query editor. Notebooks support:

* [Timeseries][3]
* [Heatmap][4]
* [Distribution][5]
* [Log stream][6]

#### Text

Text in a notebook is formatted with Markdown, which enables the use of headings, subheadings, links, images, lists, and code blocks.

### Manipulating cells

When an existing notebook is opened, the cells are in a closed state. To open a cell for editing, click on it or navigate to it with the arrow keys and press `Enter`. To close a cell, click outside it or press `CMD + Enter`. Only one cell may be open at a time.

To insert, clone, or delete cells, click the gear icon that appears to the left of the cell number or use a keyboard shortcut. A list of all keyboard shortcuts is available by clicking the keyboard button in the notebook header.

### Time frames

By default, all graph cells adhere to the global time frame set in the notebook header. However, individual cells can be unlocked from the global time and set to an independent time frame. This allows for the comparison of metrics over multiple, distinct periods of time within a single notebook, which is suited for incident investigations.

To set an individual time frame, click the clock icon in the top-right corner of a graph cell. Then, uncheck *Lock this cell to global time frame* and set your preferred time frame:

{{< img src="graphing/notebooks/time_selector.png" alt="Time Selector"  style="width:60%;">}}

**Note**: Clicking and dragging to zoom in on a graph does not unlock the cell from the global time. It changes the notebook's global time instead.

### Expand

Expand the graph by clicking on the expand icon on the right side of the cell. More details about full screen mode is available on the [Widgets][7] page.

### Layout options

The following layout options are available by clicking the grid icon on the right side of the cell:

* **Graph size**: Choose between `XS`, `S`, `M` (default), `L`, and `XL`.
* **Graph legend**: Uncheck the box to hide the legend. Legends are automatically disabled for `XS` and `S` graphs.
* **Grouping**: Display one graph per source grouping.

{{< img src="graphing/notebooks/layout_options.png" alt="layout options"  style="width:50%;">}}

**Note**: Changing any of these settings only affects the targeted cell.

### Link to individual cells

Copy the URL for a specific cell by clicking the chain-link icon on the right side of the cell. Direct linking is available for both visualization and Markdown cells.

When a user visits the URL for a specific cell, the notebook is opened to show the cell at the top of the viewport. Links are absolute: a cell's URL remains the same even if it is moved to a new position within the notebook.

### Save, rename, clone, delete

Save a notebook with `CMD + S` or click the **Save** button in the notebook header. After a new notebook has been saved once, it continues to autosave at regular intervals. Also, a notebook can be saved manually at any time between autosaves. To ensure you don't lose work, you are prompted for confirmation if you attempt to leave a notebook with unsaved changes.

Rename a notebook by clicking the name field in the notebook header.

Clone any notebook from the individual notebook by using the settings cog at the top right.

Delete a notebook from the notebook list page, or inside the individual notebook by using the settings cog at the top right. You can only delete notebooks that you have created.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook
[3]: /widgets/timeseries
[4]: /widgets/heat_map
[5]: /widgets/distribution
[6]: /widgets/log_stream
[7]: /widgets/#full-screen
