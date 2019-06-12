---
title: Notebooks
kind: documentation
---

Notebooks combine graphs and text in a linear, cell-based format. They're designed to help you explore and share stories with your data.

You can use a notebook to create and share data-driven stories with teammates, such as incident investigations, postmortems, runbooks, and infrastructure documentation. 

## Sharing and permissions

Anyone on your team can open or edit any notebook, but a notebook can only be deleted by its creator.

Edits to another user's notebook are not saved automatically. If you attempt to save changes to someone else's notebook, a copy is created unless you explicitly choose to overwrite the original.

A new notebook is unsaved by default.

## Important features

### Multiple time frames

By default, all graph cells adhere to the global time frame set in the notebook header. However, individual cells can be unlocked from the global time and set to an independent time frame.

This allows for the comparison of metrics over multiple, distinct periods of time within a single notebook. It allows you to build a coherent timeline of an event and makes notebooks suited for incident investigations.

### Types of content

Metrics in a notebook are graphed using the standard query editor that appears throughout Datadog. Notebooks support three types of visualizations: timeseries, heatmaps, and distributions.

Like in the Metrics Explorer, a metric can be compared across different groups in your infrastructure. For example, if a metric is reporting across multiple hosts, a notebook lets you generate separate graphs that show the metric's behavior on each host.

Text in a notebook is formatted with Markdown, which means notebooks can include headings and subheadings, links, images, bulleted and numbered lists, and code blocks.

## Specific usage instructions

### Manipulating cells

When an existing notebook is opened, its cells are in a closed state. To open a cell for editing, click on it or navigate to it with the arrow keys and press "Enter". To close a cell, click outside it or press `⌘ + Enter`. Only one cell may be open at any time.

{{< img src="graphing/notebooks/states.png" alt="states" responsive="true" >}}

To insert, clone, or delete cells, click the gear icon that appears to the left of the cell number—or use a keyboard shortcut. A list of all keyboard shortcuts is available by clicking the keyboard button in the notebook header.

Cells also may be re-ordered by using keyboard shortcuts.

### Changing time frames

A time indicator appears in the top-right corner of each graph cell. If the cell is locked to the global time, it reads "Global Time." Otherwise, it specifies the cell's independent time frame.

To unlock a cell from global time, click this time indicator.

{{< img src="graphing/notebooks/timerange.png" alt="timerange" responsive="true" style="width:40%;">}}

Note that clicking and dragging to zoom in on a graph does not unlock that cell from global time. It changes the notebook's global time frame instead.

### Splitting by tag and other graph options

To split a graph by tag, change a graph's size, or toggle the visibility of a graph legend, click the grid icon at the right edge of the cell.

Legends are disabled automatically when the graph size has been set to XS or S. Changing these settings affects only the target cell; the layout of other graph cells is unaffected.

{{< img src="graphing/notebooks/options.png" alt="options" responsive="true" style="width:40%;">}}

### Linking to individual cells

To copy the URL for a specific cell, click the link icon at the right edge of the cell. Direct linking is available for both graph and Markdown cells.

When a user visits the URL for a specific cell, its notebook is opened to show the cell in question at the top of the viewport. Links are absolute, which means a cell's URL remains the same if it's moved to a new position within its notebook.

{{< img src="graphing/notebooks/directlink.png" alt="directlink" responsive="true" style="width:40%;">}}

### Saving, renaming, and deleting a notebook

To save a notebook, press `⌘ + S` or click the "Save" button in the notebook header. After a new notebook has been saved once, it continues to autosave at regular intervals. A notebook also may be saved manually at any time between autosaves. To ensure you don't lose work, you'll be prompted for confirmation if you attempt to leave a notebook with unsaved changes.

To rename a notebook, click the name field in the notebook header.

To delete a notebook that you've created, delete it from the Notebook List page, or from the individual notebook page using the settings cog.

