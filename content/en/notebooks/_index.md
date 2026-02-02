---
title: Notebooks
description: "Create collaborative rich text documents with live Datadog graphs for investigations, postmortems, runbooks, and data-driven storytelling."
aliases:
  - /graphing/notebooks/
  - /notebooks_new/
  - /notebooks_legacy/
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Manage and optimize your OCI costs with Datadog Cloud Cost Management
- link: "https://www.datadoghq.com/blog/collaborative-notebooks-datadog/"
  tag: "Blog"
  text: "Tell data-driven stories with Collaborative Notebooks"
- link: 'https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/'
  tag: 'Blog'
  text: 'Best practices for writing incident postmortems'
- link: "https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/"
  tag: "blog"
  text: "Transform and enrich your logs with Datadog Observability Pipelines"
- link: "https://www.datadoghq.com/blog/advanced-analysis-tools/"
  tag: "Blog"
  text: "Explore your data with Sheets, DDSQL Editor, and Notebooks for advanced analysis in Datadog"
- link: "https://www.datadoghq.com/blog/finops-at-datadog/"
  tag: "Blog"
  text: "How we've created a successful FinOps practice at Datadog"
---

## Overview

Notebooks are collaborative rich text documents that give you all the power of Datadog graphs. Multiple users can work together to put together an investigation or postmortem featuring live data from your incident. Notebooks are also great for runbooks and documentation featuring real insights into your systems alongside your content.

## Creating a notebook

You can create a notebook in two places:

- From the left-hand navigation bar, click **Dashboards > New Notebook**.
- On the upper-right-hand corner of the [Notebooks List page][1], click **New Notebook**.

### Notebook templates

In the [Template Gallery][2], see ready-to-use templates which you can create new notebooks from. Templates include an Incident Response postmortem, an Incident Report, and SLO Specification. You can also create a new custom template to build reusable notebook structures.

## Editing a notebook

Notebooks offer a rich text editing experience to create and collaborate on content. You can freely type and format text using familiar toolbar options and keyboard shortcuts—such as bold, italic, headers, lists, and more—directly in the editor.

For users who prefer shortcuts, Notebooks also supports Markdown syntax. For example, typing `#` followed by a space creates a header, and using triple backticks (<code>```</code>) starts a code block.

Text content is automatically saved as you type. For embedded graphs, be sure to save your changes in the graph editor to apply them within the notebook.

### Content types

Notebooks support various rich-text and embedded content types, including but not limited to:

- [Graphs](#graphs-in-notebooks)
- Images
- Headers (H1 - H3)
- Lists (bullet lists, numbered lists, and checklists)
- Codeblocks
- Block quotes
- Markdown cells

For the full list, type <kbd>/</kbd> into a notebook.

### Graphs in notebooks

Notebooks support all widget types. For the full list, see [Widgets][3].

Hover over the widget to display options for editing and configuring graphs.

To edit the query or configure the graph's display, use the **Quick Edit** feature to make most changes inline. For more advanced configuration, click the pencil icon or hold down the <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> key and click on the graph to open the full graph editor. You can adjust the local timeframe or link the graph to the global notebook time by clicking the clock icon.

Additional graph configuration options are accessible under the three-dot ellipsis menu, depending on the graph type:
- **Graph size**: Adjust the graph height by selecting XS, S, M (default), L, or XL.
- **Graph legend**: Uncheck the box to hide the legend. Legends are automatically disabled for XS and S graphs.

### Rich text features

Notebooks support commonly used rich text features like bold, italics, inline code, and headers. Notebooks also support a variety of list types such as bullet, numbered, or check list.

| Feature       | Description                                                                                                                |
|---------------|----------------------------------------------------------------------------------------------------------------------------|
| **Bold**      | To bold text, select it and press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd>.                                           |
| *Italics*     | To italicize text, select it and press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.                                      |
| `Inline code` | For inline code, type <code>`</code> at the beginning and at the end of the text.                                          |
| Codeblocks    | Insert a codeblock by typing <code>```</code> and pressing <kbd>Enter</kbd>, or by using the slash command menu.           |
| Quotes        | Insert a quote block by typing `>`, or by using the slash command menu.                                                    |
| Text tables   | Insert a table by typing `/table` or using the **Add Cell** menu.                                                          |
| Callouts      | Insert a callout by typing `/table` or typing `!NOTE`, `!TIP`, `!WARNING`, `!IMPORTANT`, or `!CAUTION` and then pressing <kbd>Space</kbd>.   |

### Smart chips

| Feature    | Description                                                                |
|------------|----------------------------------------------------------------------------|
| `@Mention` | To mention another user, type `@` followed by their name or email address. |
| `$TemplateVariable` | Type `$` followed by the name of your existing template variable. |
| `/date` | Add a date chip by typing `/date`. You can edit the date or time in the popover whenever you click the chip. Also try out `/today` and `/now`! |

### Slash commands

Slash commands are an interface for creating graphs or inserting other content. On a new line, type `/` to open the slash command menu. Continue typing the name of the desired content type and select the appropriate option.

{{< img src="/notebooks/notebooks_new/slash_command_menu.png" alt="Slash command menu that appears when you type / into a notebook" style="width:70%;" >}}

When you select a graph type, it opens the [graph editor][3]. After you click **Save**, the graph appears in your notebook.

### Keyboard shortcuts

{{< img src="/notebooks/notebook_keyboard_shortcuts.png" alt="Keyboard shortcuts menu for Datadog notebooks" style="width:70%;" >}}

At the bottom-left corner of a notebook, click the keyboard icon to view a list of keyboard shortcuts for editing.

Additionally, you can use the following shortcuts to cut and paste widgets (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>X</kbd>, <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>).

### Table of contents

Notebooks automatically generate a table of contents from any headers or graphs you insert into your document. You can create a header using the markdown shortcut `#` or by selecting text and clicking **Header** in the toolbar.

### Notebook tags

{{< img src="/notebooks/notebooks_new/notebook_tags.png" alt="Notebook tag options to favorite a notebook, add a team, or add a type" style="width:80%;" >}}

| Tag action                | Description                                                                                                          |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Favorite a Notebook**   | Favorite a notebook to pin it to the top of your results in the Notebook List page. To toggle a notebook as a favorite, click the star icon in the header of the notebook.                                                                     |
| **Tag by Team**           | Tagging a notebook with a team allows you to use it as a filter when searching for a notebook. You can tag a notebook with up to 5 teams. To tag a notebook, click on the **Team** option in the notebook header and select the desired teams. |
| **Tag by Type**           | You can tag your notebooks with type tags for easier searching, such as: Postmortem, Runbook, Investigation, Documentation, Report. To tag a notebook, click **Type** and select a type.                                                     |

### Add images to notebooks

<div class="alert alert-info">Only PNG, JPG, JPEG, and GIF file types are supported. Uploads have a max file size of 4MB.</a></div>

You can add images to your notebook using `/image` or the **Add Cell** menu. This provides options for resizing, aligning, and captioning the image. Uploaded images are hosted by Datadog.

<!-- TODO Add updated image from new notebooks -->

You can use any of the following options to upload an image to be hosted by Datadog:
- Drop an image file into the upload area
- Click **Choose File** and locate the image in your file directory
- Paste a publicly accessible URL for the image

Click the icons on the image action tray to adjust the size, alignment, add a caption for the image, or view the image in full screen mode.


## Adding comments to a notebook

You can add comments on content in the body of the notebook. To comment on text, highlight the text and click on the comment icon in the toolbar.

<!-- TODO Add updated image from new notebooks -->

To comment on a graph or an image, click on the comment icon to the right of the graph.

| Feature                  | Description                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Navigating to Comments** | Saved comments appear in the right margin of the notebook. Click a comment highlight in the text to open it in the margin, or click a comment in the margin to scroll to its location. |
| **Responding to Comments** | Respond to comments by clicking on them in the right margin, which opens a comment box. You can write text, `@mention` a Datadog user, or resolve a comment by clicking **Resolve**. |
| **Linking to Comments**    | Link to a specific comment by clicking the link icon in the top right corner of the comment to copy its link.      |
| **Editing or Deleting Comments** | Edit or delete your comments by clicking the three-dot ellipsis menu in the top right corner of the comment.                 |
| **Comment Notifications** | By default, email notifications are sent to the notebook author for new comments by others. Users in a comment thread receive notifications for each reply. To adjust notifications, in the cog menu, select **Notifications**. |

## Multiplayer experience in Notebooks

Notebooks support full collaboration, allowing multiple users to edit simultaneously. When a collaborator opens your notebook, their cursor appears in real time. Hover over a cursor to see the collaborator's name.

<!-- TODO Add updated image from new notebooks -->

### Widgets

When another user is editing a widget, an outline appears around the widget. Since widgets are saved as last write wins, avoid editing a widget that someone else is working on.

<!-- TODO Add updated image from new notebooks -->

#### Presence

At the top of the notebook, you can see avatar images of all of the users currently viewing the notebook. Hover over an avatar to see the name of the associated collaborator.

<!-- TODO Add updated image from new notebooks -->

## Configuring a notebook

### Template variables

Notebooks support template variables. Dynamically scope visualizations by adding and selecting template variable values. For more information, see [Template Variables][5].

<div class="alert alert-danger">Some Analysis features have limited or no support for template variables. For more information, see <a href="/notebooks/guide/template_variables_analysis_notebooks">Template Variable Support in Analysis Notebooks</a>.</div>

### Time controls

By default, all graphs are linked to the global time frame set in the notebook header.

To view a different time frame, select an option in the global time picker, or scrub on a graph directly. The notebook URL updates to reflect this new time frame without saving it to the notebook.

**Note**: Clicking and dragging to zoom in on a graph does not unlock the graph from the global time. It changes the notebook's global time instead.

<!-- TODO Add updated image from new notebooks -->

To save this time as the notebook's default, click **Set Default Time**. To reset your global time back to the previously saved default global time, click the reset button.

Individual graphs can be unlinked from the global time and set to an independent time frame.

<!-- TODO Add updated image from new notebooks -->

To view a different time frame on a single graph, edit the graph and use the toggle to unlink it from Global Time. Change the time frame using the time picker or by scrubbing on the graph. Changes made in edit mode are saved automatically when you click **Done**. To discard your changes, click **Cancel** instead of **Done**.

### Modes

You can switch between modes from within the notebook by selecting the dropdown at the top right of your notebook.

- **Editing**: Make changes to the notebook.
- **Viewing**: Contents are Read Only, preventing users from making unwanted edits to existing configurations and information.

### Version history

From a notebook, click the cog icon and click **Version history** to open the Version History side panel. You can preview, restore, or clone a previous version of your notebook. For more information, see the [Version History guide][6].

### Graph snapshots

Notebooks automatically snapshot graphs with fixed time ranges to preserve the view before data retention limits apply. No setup is required. Use the kebab menu next to a graph to view or download a snapshot.

{{< img src="notebooks/kebab_snapshots.png" alt="Kebab menu option to view or download a snapshot" style="width:100%;">}}

Snapshots are a static image of any graphs with a fixed time range (for example, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). These snapshots update when the graph is updated, as long as the new graph also has a fixed time range. Changing the graph to a global time range (like `Past 1 Hour`) removes the snapshot.

You can preview how many snapshots have been successfully created on a notebook by hovering over the graph snapshot indicator under the notebook title. You can see the time the last snapshot was updated and how many snapshots have been successfully created.

{{< img src="notebooks/hover_graph_snapshots.png" alt="Snapshot indicator to determine how many snapshots have been generated" style="width:100%;">}}

Once a notebook contains a graph with data that is past its data retention limits, the notebook will display a snapshot of the graph in-line. The snapshot itself is a static image – if you edit the underlying graph, the image will be updated and replaced.

### Permissions

By default, all users have full access to notebooks.

Use our access controls to restrict view and edit access to only yourself:
1. While viewing a notebook, click the **Share** button in the upper right.
1. Select **Private to me**.
1. Click **Save**.

Use granular access controls to limit the [roles][7] that may edit a particular notebook:
1. While viewing a notebook, click the **Share** button in the upper right.
1. Select **Custom**.
1. Update the Organization access to **Viewer** to revoke edit access from the rest of the organization.
1. Use the dropdown to select one or more roles, teams, or users that may edit the notebook.
1. Click **Add**.
1. The dialog box updates to show that the role you selected has the **Editor** permission.
1. Click **Save**.

**Note:** To maintain your edit access to the notebook, the system requires you to include at least one role that you are a member of before saving.

You must have edit access to restore general access to a restricted notebook. Complete the following steps:
1. While viewing a notebook, click the **Share** button in the upper right.
1. Select **My Org**.
1. Click **Save**.

## Finding notebooks

The [Notebooks List][1] page is the place to find all of your notebooks.

<!-- TODO Add updated image from new notebooks -->

### Search

The search field supports full-text search. Type your query to display the relevant notebooks as results.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook/template-gallery
[3]: /dashboards/querying/#graphing-editor
[4]: https://www.markdownguide.org/basic-syntax/#images-1
[5]: /dashboards/template_variables/
[6]: /notebooks/guide/version_history
[7]: /account_management/rbac/
