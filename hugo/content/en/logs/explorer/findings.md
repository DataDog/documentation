---
title: Log Findings
description: 'Capture, organize, and reuse important context during log investigations in Log Explorer.'
private: false
further_reading:
    - link: 'logs/explorer/'
      tag: 'Documentation'
      text: 'Search and analyze your logs in Log Explorer'
    - link: 'logs/explorer/saved_views/'
      tag: 'Documentation'
      text: 'Automatically configure your Log Explorer'
    - link: 'bits_ai/bits_chat/'
      tag: 'Documentation'
      text: 'Ask questions about your data with Bits AI chat'
    - link: 'notebooks/'
      tag: 'Documentation'
      text: 'Build and share investigations with Notebooks'
---

## Overview

Findings helps you capture, organize, and reuse important context during log investigations in [Log Explorer][1].

Use findings as checkpoints in an investigation. Save a query or aggregation worth returning to, then branch into new questions and backtrack if a path doesn't provide helpful results. Arrange findings in the panel to map how your paths relate, and add notes to record what you observed. Select findings to use as context for [Bits AI][2] questions, or send them to a [Notebook][3] to share with others.

To save log events, visualizations, and queries as findings while investigating, use the **Add Finding** button or the **Cmd**/**Ctrl** + **S** keyboard shortcut. To go back to a finding in Log Explorer, **double-click** it, or click **Open in Explorer** on the finding.

{{< img src="logs/explorer/findings_demo-2.mp4" alt="Findings demo in Log Explorer" video=true style="width:100%;" >}}

## Findings panel

Findings appears in the side panel on the left of Log Explorer. To open it:

1. Navigate to [Log Explorer][1].
2. Click the **Findings** tab on the top left.

{{< img src="logs/explorer/findings/panel_location.png" alt="The Findings tab beside My View in the Log Explorer header" style="width:50%;" >}}

The Findings panel is where you work with findings: arrange them, reopen them in Log Explorer, and select them to send elsewhere. The panel keeps the findings and their layout across page reloads and browser sessions until you delete them.

## Capture a finding

Add a finding from anywhere in Log Explorer by pressing **Cmd**/**Ctrl** + **S**. This captures the query, the page to return to, and the absolute time range you were viewing. To rename the default title, click {{< ui >}}Edit{{< /ui >}} in the upper right corner of the finding card in the Findings panel. You can also add notes to each finding at the bottom of the finding card.

### Queries and visualizations

In the toolbar above your results, click the {{< ui >}}Add Finding{{< /ui >}} button, or press **Cmd**/**Ctrl** + **S**. You can also click {{< ui >}}Add current page as a finding{{< /ui >}} in the Findings panel.

{{< img src="logs/explorer/findings/add_finding_toolbar.png" alt="The Add Finding button in the results toolbar, with a tooltip showing the keyboard shortcut" style="width:80%;" >}}

The **Add Finding** button appears in the same place for every visualization.

The finding stores your search query, time range, and [visualization][4], including any group-by and aggregation you configured. Capture the same query as a list, a timeseries, or other visualization.

### Individual log events

Click a log event in your results to open the [log side panel][5]. Hover over the **Log Message** section and click the {{< ui >}}Add a finding{{< /ui >}} icon, or press **Cmd**/**Ctrl** + **S**. This captures the whole log event side panel to return to later.

{{< img src="logs/explorer/findings/add_finding_log_event.png" alt="The add a finding icon in the Log Message section of the log side panel" style="width:80%;" >}}

Capturing the log event also captures the query that produced the log side panel. Returning to the finding reopens the log side panel with the corresponding query in the background.

### Specific text in a log message or attributes

To capture part of a log message, select the text in the **Log Message** section and press **Cmd**/**Ctrl** + **S**. You can also select {{< ui >}}Add Finding{{< /ui >}} from the context menu that appears with the selected text.

To capture attribute values, select the text and press **Cmd**/**Ctrl** + **S**.

In both cases, the finding stores the text you selected. You can use the text to return to the log event side panel.

## Return to a finding

**Double-click** a finding to return to it in Log Explorer, or hover over the finding and click {{< ui >}}Open in Explorer{{< /ui >}}. Log Explorer reloads the query, time range, and visualization that the finding was captured with.

Each finding keeps its own query and time range. Change your search as often as you need, then return to any earlier finding without rebuilding its query.

## Send findings to Bits AI and Notebooks

Select one or more findings to act on them together:

- To ask [Bits AI][2] about them, type your question in the selection bar and click {{< ui >}}Ask Bits{{< /ui >}}. You can also click {{< ui >}}Ask Bits{{< /ui >}} in the menu at the bottom of the Findings panel. Bits AI chat opens with the selected findings attached as context.
- To add findings to a [Notebook][3], click {{< ui >}}Open in Notebooks{{< /ui >}}. Choose a new or existing notebook. The findings you send remain in the Findings panel.

Send only the findings that relate to your question. For example, if three of the eight findings in your panel cover the error you're asking about, select those three. Log Explorer also sends notes on those findings.

## Organize your findings

Drag a finding to move or resize it. Datadog saves the layout you build, so the organization looks the same the next time you open the panel.

Auto-organize groups the findings that share a query into labeled columns, one column per query. Use the auto-organize control in the panel, or press **Cmd**/**Ctrl** + **O**. Moving, resizing, or deleting a finding afterward clears the grouping.
<!-- A screenshot of the panel controls would make the auto-organize option findable. Add one alongside the GA video. -->

## Delete findings

To delete one finding, hover over it and click the delete icon on its card. To delete several, select them and press the **Delete** key. To select every finding, press **Cmd**/**Ctrl** + **A**.

The clear all button in the Findings panel deletes all findings.
<!-- Does the clear all button warn before emptying a full panel? -->

To restore a finding right after deleting it, click {{< ui >}}Undo{{< /ui >}} in the message that appears, or press **Cmd**/**Ctrl** + **Z**.

## Keyboard shortcuts

| Action | Shortcut |
| ------ | -------- |
| Add a finding | **Cmd**/**Ctrl** + **S** |
| Select all findings | **Cmd**/**Ctrl** + **A** |
| Delete selected findings | **Delete** |
| Undo | **Cmd**/**Ctrl** + **Z** |
| Redo | **Cmd**/**Ctrl** + **Shift** + **Z** |
| Pan | **Space** + **drag** |
| Auto-organize (by query) | **Cmd**/**Ctrl** + **O** |

<!-- Confirm the Undo and Redo bindings, which have not been verified against the build. -->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/
[2]: /bits_ai/bits_chat/
[3]: /notebooks/
[4]: /logs/explorer/visualize/
[5]: /logs/explorer/side_panel/
