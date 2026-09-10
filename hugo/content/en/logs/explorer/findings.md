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

With Findings, you can save log events, visualizations, and queries while investigating, using the **Add Finding** button or the **Cmd**/**Ctrl** + **S** keyboard shortcut. To go back to a finding in Log Explorer, **double-click** it, or click **Open in Explorer** on the finding.

Use Findings to checkpoint your investigation paths with useful queries and logs to come back to. Backtrack to a query or aggregation you identified earlier, or refer back to information from those log results or the log event. Arrange the findings in the panel to represent your paths. Branch into new questions without losing track of earlier observations by saving them as findings along the way.

Collect possible evidence, compare results, and build context as your investigation evolves. Add notes to findings to keep track of your observations. Select findings to use as context for [Bits AI][2] questions, or send them to a [Notebook][3] to share with others.

Findings persist across page reloads and browser sessions until you delete them.

{{< img src="logs/explorer/findings_demo.mp4" alt="Findings demo in Log Explorer" video=true style="width:100%;" >}}

## Findings panel

Findings lives in the side panel on the left of Log Explorer. To open it:

1. Navigate to [Log Explorer][1].
2. Click the **Findings** tab on the top left.

This space is where you work with findings: arrange them, reopen them in Log Explorer, and select them to send elsewhere. The panel keeps the findings and their layout across page reloads and browser sessions.

## Capture a finding

Add a finding from anywhere in Log Explorer by pressing **Cmd**/**Ctrl** + **S**. This captures the query, the page to return to, and the absolute time range it came from. To rename the default title, click {{< ui >}}Edit{{< /ui >}} in the upper right corner of the finding card.

You can also add notes to each finding at the bottom of the finding card.

### Queries and visualizations

In the toolbar above your results, click the {{< ui >}}Add a finding{{< /ui >}} icon, or press **Cmd**/**Ctrl** + **S**. You can also click {{< ui >}}Add current page as a finding{{< /ui >}} in the Findings panel.

The finding stores your search query, time range, and [visualization][4], including any group-by and aggregation you configured. Capture the same query as a list, a timeseries, or other visualization.

### Individual log events

Click a log event in your results to open the [log side panel][5]. Hover over the **Log Message** section and click the {{< ui >}}Add Finding{{< /ui >}} button, or press **Cmd**/**Ctrl** + **S**. This captures the whole log event side panel to return to later.

Capturing the log event also captures the query that produced the log side panel. Returning to the finding reopens the log side panel, with the corresponding query in the background.

### Specific text in a log message or attributes

To capture part of a log message, select the text in the **Log Message** section and press **Cmd**/**Ctrl** + **S**. You can also select {{< ui >}}Add Finding{{< /ui >}} from the context menu that appears with the selected text.

To capture attribute values, select the text and press **Cmd**/**Ctrl** + **S**.

In both cases, the finding stores the text you selected, and you can use it to return to the log event side panel.

## Return to a finding

**Double-click** a finding to return to it in Log Explorer, or hover over the finding and click {{< ui >}}Open in Explorer{{< /ui >}}. Log Explorer reloads the query, time range, and visualization that the finding was captured with.

Each finding keeps its own query and time range. In Log Explorer, you can change your search as often as you need. Double-click an earlier finding to come back to it, with no query to rebuild.

## Send findings to Bits AI and Notebooks

Select one or more findings to act on them together:

- To ask [Bits AI][2] about them, type your question in the selection bar and click {{< ui >}}Ask Bits{{< /ui >}}. You can also click {{< ui >}}Ask Bits{{< /ui >}} in the menu at the bottom of the Findings panel. Bits AI chat opens with the selected findings attached as context.
- To add findings to a [Notebook][3], click {{< ui >}}Open in Notebooks{{< /ui >}}. Choose a new or existing notebook. The findings you send remain in the Findings panel.

Send only the findings that relate to your question. If three of the eight findings in your panel cover the error you're asking about, select those three. Notes on those findings are sent as well.

## Organize your findings

Hover over a finding to rename it, and drag it to move or resize it. Datadog saves the layout you build, so the organization looks the same the next time you open the panel.

To regroup findings by the query they came from, use the auto-organize option. Moving, resizing, or deleting a finding afterward clears that grouping.
<!-- A screenshot of the panel controls would make the auto-organize option findable. Add one alongside the GA video. -->

## Delete findings

To delete findings, select one or more and press **Delete**, or hover over a single finding and click the delete button on its card. To select every finding, press **Cmd**/**Ctrl** + **A**.

The clear all button in the Findings panel deletes all findings.
<!-- Does the clear all button warn before emptying a full panel? -->

Deleting is not immediately permanent. A toast appears with an {{< ui >}}Undo{{< /ui >}} option, and **Cmd**/**Ctrl** + **Z** restores what you removed.
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

<!-- Confirm the Undo and Redo bindings, which have not been verified against the build. -->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/
[2]: /bits_ai/bits_chat/
[3]: /notebooks/
[4]: /logs/explorer/visualize/
[5]: /logs/explorer/side_panel/
