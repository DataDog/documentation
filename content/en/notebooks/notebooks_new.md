---
title: Notebooks (New)
aliases:
  - /graphing/notebooks/
further_reading:
- link: "https://www.datadoghq.com/blog/incident-management-templates-notebooks-list/"
  tag: "Blog"
  text: "Create and navigate a documentation library"
- link: "https://www.datadoghq.com/blog/collaborative-notebooks-datadog/"
  tag: "Blog"
  text: "Tell data-driven stories with Collaborative Notebooks"
- link: 'https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/'
  tag: 'Blog'
  text: 'Best practices for writing incident postmortems'
- link: "https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/"
  tag: "blog"
  text: "Transform and enrich your logs with Datadog Observability Pipelines"
code_lang: notebooks_new
type: multi-code-lang
weight: 1
---

{{< callout url="https://www.datadoghq.com/product-preview/notebooks-2.0/" btn_hidden="false" header="In Preview">}}
The provisional Notebooks product is in Preview. To request access, complete the form.
{{< /callout >}}

<div class="alert alert-info">If you are using the legacy Notebooks product, see the <a href="/notebooks/notebooks_legacy">Notebooks (Legacy)</a> documentation.</a></div>

## Overview

Notebooks are collaborative text editors that give you all the power of Datadog graphs inside your documents. Multiple users can work together to put together an investigation or postmortem featuring live data from your incident. Notebooks are also great for runbooks and documentation featuring real insights into your systems alongside your content.

## Creating a notebook

You can create a notebook in two places:

- From the left-hand navigation bar, click **Dashboards > New Notebook**.
- On the upper-right-hand corner of the [Notebooks List page][1], click **New Notebook**.

{{< img src="/notebooks/notebooks_new/new_legacy_notebook_dropdown.png" alt="Create legacy notebook through the New Notebook dropdown" style="width:100%;" >}}

To create a legacy notebook, click the **New Noteboook** dropdown and select **New Legacy Notebook**. 

### Notebook templates

In the [Template Gallery][2], see ready-to-use templates which you can create new notebooks from. Templates include an Incident Response postmortem, an Incident Report, and SLO Specification. You can also create a new custom template to build reusable notebook structures.

## Editing a notebook

With Notebooks, you can start typing using markdown shortcuts such as `#` for headers or <code>```</code> for code blocks. Notebooks comprise cells that can contain text or graphs. A new cell is created every time you press <kbd>Enter</kbd>. Notebooks automatically save your text content as you type. For graph cells, save all edits in the graph editor for the widget to be saved in the notebook.

### Cell types

Notebooks support the following cell types:
- [Graphs](#graphs-in-notebooks)
- Images
- Headers (H1 - H3)
- Lists (bullet lists, numbered lists, and checklists)
- Codeblocks
- Quotes
- [Markdown](#markdown-cells)

### Graphs in notebooks

Notebooks support the following graph types:

- [Timeseries][3] 
- [Top List][4] 
- [Table][5]
- [Query Value][6]
- [Heatmap][7]
- [Distribution][8]
- [List][9]
- [Profiling Flame Graph][10]
- [Funnel][11]
- [Pie][12]
- [Treemap][13]
- [Geomap][14]
- [SLO][15]
- Scatterplot  
- Change

The following graph types are expected to be available in Notebooks soon:
- Alert graph
- Alert value
- Check Status
- Retention
- Sankey
- Monitor Summary
- SLO List
- SLO Summary
- Host Map
- Topology Map
- Service Summary

In a notebook graph cell, hover over the widget to display options for editing and configuring the graph. 

To edit the query or configure the graph's display, click the pencil icon or hold down the <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> key and click on the graph to open the full graph editor. You can adjust the local timeframe or link the graph to the global notebook time by clicking the clock icon.

Additional graph configuration options are accessible under the three-dot ellipsis menu, depending on the graph type:
- **Graph size**: Adjust the graph height by selecting XS, S, M (default), L, or XL.
- **Graph legend**: Uncheck the box to hide the legend. Legends are automatically disabled for XS and S graphs.
- **Split graph**: Display one graph per tag value to view small multiples of your visualization.

### Rich text features

Notebooks support commonly used rich text features like bold, italics, inline code, and headers. Notebooks also support a variety of list types such as bullet, numbered, or check list. 

| Feature       | Description                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------------|
| **Bold**      | To bold text, select it and press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd>.                                 |
| *Italics*     | To italicize text, select it and press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.                            |
| `Inline code` | For inline code, type <code>`</code> at the beginning and at the end of the text.                                |
| Codeblocks    | Insert a codeblock by typing <code>```</code> and pressing <kbd>Enter</kbd>, or by using the slash command menu. |
| Quotes        | Insert a quote block by typing `>`, or by using the slash command menu.                                          |

### Slash commands

Slash commands are an interface for creating graphs or cells. On a new line, type `/` to open the slash command menu. Continue typing the name of the desired cell type and select the appropriate option.

{{< img src="/notebooks/notebooks_new/slash_command_menu.png" alt="Slash command menu that appears when you type / into a notebook cell" style="width:70%;" >}}

When you select a graph type, it opens the graph editor. After you click **Save**, the graph appears in your notebook.

### Markdown cells

Markdown cells allow you to use the legacy markdown experience in the new editor. They are most useful for the following features:

- Text Tables  
- Syntax Highlighting in codeblocks  
- Inline template variables  
- @Mentions

To create a markdown cell, type `/markdown` and press <kbd>Enter</kbd>.

### Moving cells

You can move cells by either cutting and pasting them (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>X</kbd>, <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>) or by hovering over a cell and using the drag handle on the left to move it to the desired location.

### Table of contents 

Notebooks automatically generate a table of contents from any headers you insert into your document. You can create a header using the markdown shortcut `#` or by selecting text and selecting **Header** in the toolbar.

### Notebook tags

{{< img src="/notebooks/notebooks_new/notebook_tags.png" alt="Notebook tag options to favorite a notebook, add a team, or add a type" style="width:80%;" >}}

| Tag action                | Description                                                                                                          |
|------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Favorite a Notebook** | Favorite a notebook to pin it to the top of your results in the Notebook List page. To toggle a notebook as a favorite, click the star icon in the header of the notebook.                                                                     |
| **Tag by Team**         | Tagging a notebook with a team allows you to use it as a filter when searching for a notebook. You can tag a notebook with up to 5 teams. To tag a notebook, click on the **Team** option in the notebook header and select the desired teams. |
| **Tag by Type**         | You can tag your notebooks with type tags for easier searching, such as: Postmortem, Runbook, Investigation, Documentation, Report. To tag a notebook, click **Type** and select a type.                                           |

### Add images to notebooks

<div class="alert alert-info">Only PNG, JPG, JPEG, and GIF file types are supported. Uploads have a max file size of 4MB.</a></div>

You can add images to your notebook using either the [image cell](#image-cell) or the [Markdown editor](#markdown-editor).

#### Image cell

This approach places the image in a separate cell from your text, and provides options for resizing, aligning, and captioning the image. Images uploaded by the image cell are hosted by Datadog.

To add an image, click the **Image** cell option in the **Add New Cell** menu. 

<!-- TODO Add updated image from new notebooks -->

You can use any of the following options to upload an image to be hosted by Datadog:
- Drop an image file into the upload area
- Click **Choose File** and locate the image in your file directory
- Paste a publicly accessible URL for the image

Click the icons on the cell action tray to adjust the size, alignment, add a caption for the image cell, or view the image in full screen mode.

<!-- TODO Add updated image from new notebooks -->

#### Markdown editor

This approach places the image inline with your text, but does not provide options for resizing the image.

Enter edit mode on any Markdown cell and use any of the following options to add the image:
- Drop an image file into the text cell area.
- Copy and paste the image directly into the text cell area.
- Hyperlink an external image using the image widget in the header or by referencing the [official Markdown guide][16].

  **Note**: This option does not upload the image to be hosted by Datadog. 

You can preview the image in the Preview tab before saving it to your notebook.

## Adding comments to a notebook

You can add comments on content in the body of the notebook. To comment on text, highlight the text and click on the comment icon in the toolbar. 

<!-- TODO Add updated image from new notebooks -->

To comment on a graph or an image, select the cell and click on the comment icon to the right of the cell.

| Feature                  | Description                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Navigating to Comments** | Saved comments appear in the right margin of the notebook. Click a comment highlight in the text to open it in the margin, or click a comment in the margin to scroll to its location in the cell. |
| **Responding to Comments** | Respond to comments by clicking on them in the right margin, which opens a comment box. You can write text, `@mention` a Datadog user, or resolve a comment by clicking **Resolve**. |
| **Linking to Comments**    | Link to a specific comment by clicking the link icon in the top right corner of the comment to copy its link.      |
| **Editing or Deleting Comments** | Edit or delete your comments by clicking the three-dot ellipsis menu in the top right corner of the comment.                 |
| **Comment Notifications** | By default, email notifications are sent to the notebook author for new comments by others. Users in a comment thread receive notifications for each reply. To adjust notifications, in the cog menu, select **Notifications**. |

## Multiplayer experience in Notebooks

Notebooks are collaborative, allowing multiple users to edit simultaneously. If a collaborator opens your notebook, their cursor appears. Hover over a cursor to see the collaborator's name.

<!-- TODO Add updated image from new notebooks -->

### Widgets

When another user is editing a widget, an outline appears around the widget. Since widgets are saved as last write wins, avoid editing a widget that someone else is working on.

<!-- TODO Add updated image from new notebooks -->

#### Presence

At the top of the notebook, you can see avatar images of all of the users currently viewing the notebook. Hover over an avatar to see the name of the associated collaborator.

<!-- TODO Add updated image from new notebooks -->

## Configuring a notebook

### Template variables

Notebooks support template variables. Dynamically scope visualizations by adding and selecting template variable values. For more information, see [Template Variables][17].

### Time controls

By default, all graph cells are linked to the global time frame set in the notebook header.

To view a different time frame, select an option in the global time picker, or scrub on a graph directly. The notebook URL updates to reflect this new time frame without saving it to the notebook.

**Note**: Clicking and dragging to zoom in on a graph does not unlock the cell from the global time. It changes the notebook's global time instead.

<!-- TODO Add updated image from new notebooks -->

To save this time as the notebook's default, click **Set Default Time**. To reset your global time back to the previously saved default global time, click the reset button.

Individual cells can be unlinked from the global time and set to an independent time frame.

<!-- TODO Add updated image from new notebooks -->

To view a different time frame on a single cell, edit the cell and use the toggle to unlink it from Global Time. Change the time frame using the time picker or by scrubbing on the graph. Changes made in edit mode are saved automatically when you click **Done**. To discard your changes, click **Cancel** instead of **Done**.

### Modes

You can switch between modes from within the notebook by selecting the dropdown at the top right of your notebook.

- **Editing**: Make changes to the notebook.
- **Viewing**: Contents are Read Only, preventing users from making unwanted edits to existing configurations and information.

### Version history

From a notebook, click the cog icon and click **Version history** to open the Version History side panel. You can preview, restore, or clone your notebook's version history. For more information, see the [Version History guide][18].

### Graph snapshots

Notebooks can be set to automatically take snapshots of graphs that might expire. Enable this by clicking **Turn on snapshots** in the cog menu of any notebook. Use the cog menu to view snapshots or turn off automatic snapshots. Turn off automatic snapshots to remove access to existing snapshots.

{{< img src="notebooks/cog_snapshots.png" alt="Cog menu option to turn on snapshots" style="width:100%;">}}

 Notebooks with snapshots enabled automatically capture a static image of any graphs with a fixed time range (for example, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). These snapshots update when the graph is updated, as long as the new graph also has a fixed time range. Changing the graph to a global time range (like `Past 1 Hour`) removes the snapshot.

 You can preview the existing snapshot on any fixed-time graph by hovering over the camera icon while in edit mode.

To share a version of your notebook with snapshots, from the cog menu, click **View snapshots**. Copy the URL, or append `&view=snapshots` to the URL of any notebook that has snapshots enabled.

### Permissions

By default, all users have full access to notebooks.

Use granular access controls to limit the [roles][19] that may edit a particular notebook:
1. While viewing a notebook, click on the cog in the upper right. The settings menu opens.
1. Select **Permissions**.
1. Click **Restrict Access**.
1. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the dropdown to select one or more roles, teams, or users that may edit the notebook.
1. Click **Add**.
1. The dialog box updates to show that the role you selected has the **Editor** permission.
1. Click **Save**.

**Note:** To maintain your edit access to the notebook, the system requires you to include at least one role that you are a member of before saving. 

You must have edit access to restore general access to a restricted notebook. Complete the following steps:
1. While viewing the notebook, click on the cog in the upper right. The settings menu opens.
1. Select **Permissions**.
1. Click **Restore Full Access**.
1. Click **Save**.

## Finding notebooks

The [Notebooks List][1] page is the place to find all of your notebooks.

<!-- TODO Add updated image from new notebooks -->

### Search

The search field supports text search. Type your query to display the relevant notebooks as results.

### Filtering

You can filter notebooks with the following methods:
| Filter Type      | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Author**       | To filter by author, select the author dropdown and enter names to filter by. |
| **Team**         | To filter by team, select the team dropdown and enter team names to filter by. |
| **Notebook Type**| Filter by investigation, postmortem, runbook, report, or documentation.     |
| **Modified Date**| Filter based on how recently a notebook was edited using the modified date dropdown. |

There are also quick filters to access your notebooks and notebooks tagged with your teams.

### Jump back in

If no filters are enabled, the Jump Back In section appears, displaying the most recent notebooks you've viewed or edited.

<!-- TODO Add updated image from new notebooks -->

### Sorting notebooks

You can sort notebooks by selecting the ⭐, details, or modified headers to sort by those values.

## API access

Notebooks APIs are currently being updated to support the new Notebooks product. Creating notebooks through the API places them in "compatibility mode," supporting only markdown and widget cells. 

You cannot read or edit new notebooks using the notebooks API; attempts to do so result in a 400 error.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook/template-gallery
[3]: /dashboards/widgets/timeseries/
[4]: /dashboards/widgets/top_list/
[5]: /dashboards/widgets/table/
[6]: /dashboards/widgets/query_value/
[7]: /dashboards/widgets/heatmap/
[8]: /dashboards/widgets/distribution/
[9]: /dashboards/widgets/list/
[10]: /dashboards/widgets/profiling_flame_graph/
[11]: /dashboards/widgets/funnel/
[12]: /dashboards/widgets/pie_chart/ 
[13]: /dashboards/widgets/treemap/
[14]: /dashboards/widgets/geomap/
[15]: /dashboards/widgets/slo/
[16]: https://www.markdownguide.org/basic-syntax/#images-1
[17]: /dashboards/template_variables/
[18]: /notebooks/guide/version_history
[19]: /account_management/rbac/
