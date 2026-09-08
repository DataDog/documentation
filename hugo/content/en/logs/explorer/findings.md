---
title: Log Findings
description: 'Capture, organize, and reuse important context during log investigations in Log Explorer.'
private: true
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

With Findings, you can save log events, visualizations, and queries with the **Add Finding** button or the keyboard shortcut **Cmd**/**Ctrl** + **S** while investigating. **Double-click** on findings to go back to them in Log Explorer, or by using the **Open in Explorer** button on the finding. Track your investigation paths in the findings panel by arranging the findings. Branch into new questions without losing track of earlier observations.

Use Findings to checkpoint a useful base query to come back to, collect possible evidence, compare results, and build context as your investigation evolves. Select findings to use as context to [Ask Bits][2] questions, or send them to a [Notebook][3] to share with others.

Findings persist across page reloads and browser sessions until you delete them.

{{< img src="logs/explorer/findings_demo.mp4" alt="Findings demo in Log Explorer" video=true style="width:100%;" >}}

## Findings panel

Findings lives in the side panel on the left of Log Explorer. To open it:

1. Navigate to [Log Explorer][1].
2. Click the **Findings** tab on the top left.

This space is where you work with findings: arrange them, reopen them in Log Explorer, and select them to send elsewhere. It keeps findings and their layout across page reloads and browser sessions

## Capture a finding

Add a finding from anywhere in Log Explorer by pressing **Cmd**/**Ctrl** + **S**. This will capture the query and page to return to and the absolute time range it came from. You can rename the default title to identify what you captured with the Edit button on the top right of the finding card.

You can also add Notes to each finding at the bottom of the finding card.

### Queries and visualizations

In the toolbar above your results, click the {{< ui >}}Add a finding{{< /ui >}} icon, or press **Cmd**/**Ctrl** + **S**. You can also click {{< ui >}}Add current page as a finding{{< /ui >}} in the Findings panel.

The finding stores your search query, time range, and [visualization][4], including any group-by and aggregation you configured. Capture the same query as a list, a timeseries, or other visualization.

### Individual log events

Click a log event in your results to open the [log side panel][5]. Hover over the **Log Message** section and click the {{< ui >}}Add Finding{{< /ui >}} button, or press **Cmd**/**Ctrl** + **S**. This will capture thee whole log event side panel to return to later

Capturing the log event will also capture the query you got the log side panel from. When you return to the log side panel finding, it will return you to the log side panel and the corresponding query in the background.

### Specific text in a log message or attributes

To capture part of a log message, select the text in the **Log Message** section and press **Cmd**/**Ctrl** + **S**, or use the context menu option to {{< ui >}}Add Finding{{< /ui >}} that pops up with the selected text. 

To capture attribute values, select the text and press **Cmd**/**Ctrl** + **S**.

The finding for both of these will store\ the text you selected and you can return to the log log event side panel with it.

## Return to a finding

**Double-click** a finding to return to it in Log Explorer. Or hover over the finding and click the {{< ui >}}Open in Explorer{{< /ui >}} button. Log Explorer reloads the query, time range, and visualization that the finding was captured with. 

Each finding keeps its own query and time range. In the log explorer, you can change your search as often as you need, then come back to an earlier finding with a double-click without needing to rebuild the query.

## Use findings as context with Bits and add them to Notebooks

Select one or more findings to act on them together:

- To ask [Bits AI][2] about them, type your question in the selection bar and click {{< ui >}}Ask Bits{{< /ui >}}, or just click {{< ui >}}Ask Bits{{< /ui >}} in the menu below in the Findings panel after selecting the findings. Bits AI chat opens with the selected findings attached as context.
- To add findings to a [Notebook][3], click {{< ui >}}Open in Notebooks{{< /ui >}}. Choose a new or existing notebook. The findings you send remain in the Findings panel.

Send only the findings that relate to your question. If three of the eight findings on your canvas cover the error you're asking about, select those three. Notes on findings will also be sent.

## Organize the Findings

Hover over a finding to rename it, and drag it to move or resize it. Datadog saves the layout you build, so the organization looks the same the next time you open the panel.

To reset your organization, you can use the auto-organize option. This will group findings by the query they came from. Moving, resizing, or deleting a finding resets the grouping.
<!-- A screenshot of the canvas controls would make the auto-organize icon findable. Add one alongside the GA video. -->

The controls on the left of the canvas also zoom in and out, fit the canvas to your findings, and can open a full-screen view. The full-screen view gives you the same controls with more room.

## Delete findings

To delete one finding, hover over it and use the delete button on the card, or select the finding and press the **Delete** key. To delete several at once, select them and press **Delete**. To select every finding first, press **Cmd**/**Ctrl** + **A**.
<!-- Does a finding card have a delete control? Hovering a card shows Open in Explorer and rename only. Confirm how to delete one finding with the mouse. -->

The clear all button in the Findings panel deletes all findings.
<!-- Confirm the clear icon deletes rather than deselects, and whether it warns before emptying a full canvas. -->

Deleting is not permanent immediately. A toast appears with an {{< ui >}}Undo{{< /ui >}} option, and **Cmd**/**Ctrl** + **Z** restores what you removed. 
<!-- How long does a deleted finding stay recoverable? Confirm whether undo history survives a page reload or ends with the browser session. -->

## Keyboard shortcuts

| Action | Shortcut |
| ------ | -------- |
| Add a finding | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd> |
| Select all findings | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>A</kbd> |
| Delete selected findings | <kbd>Delete</kbd> |
| Undo | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Z</kbd> |
| Redo | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> |
| Pan | <kbd>Space</kbd> + <kbd>drag</kbd> |
| Auto-organize (by query) | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>O</kbd> |
 
<!-- Undo and redo bindings are unconfirmed. Confirm these, and add any shortcuts missing from this table. -->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/
[2]: /bits_ai/bits_chat/
[3]: /notebooks/
[4]: /logs/explorer/visualize/
[5]: /logs/explorer/side_panel/
