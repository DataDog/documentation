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

{{< callout url="https://www.datadoghq.com/product-preview/findings" btn_hidden="false" header="Join the Preview!" >}}
Findings for Log Explorer is in Preview. Use this form to submit your request.
{{< /callout >}}

## Overview

Findings helps you capture, organize, and reuse important context during log investigations in [Log Explorer][1].

With Findings, you can save log events, visualizations, and queries to a canvas with the **Add a finding** button or a keyboard shortcut while investigating. Each finding stores the context it was captured in. You can return to it or branch into new questions without losing track of earlier observations or investigative paths. Findings persist across page reloads and browser sessions until you delete them.

Use Findings to collect possible evidence, compare results, and build context as your investigation evolves. Select findings to use as context for [Bits AI][2] questions, or send them to a [Notebook][3] to share with others.

{{< img src="logs/explorer/findings_demo.mp4" alt="Findings demo in Log Explorer" video=true style="width:100%;" >}}

## Findings panel

Findings lives in the side panel on the left of Log Explorer, next to your saved views. To open it:

1. Navigate to [Log Explorer][1].
2. Click {{< ui >}}Views{{< /ui >}} in the upper left corner to open the side panel.
3. Click the **Findings** tab. The tab shows how many findings you have.

The panel contains the canvas, the workspace where each finding appears as a card. The canvas is where you work with findings: arrange them, reopen them in Log Explorer, and select them to send elsewhere. It keeps its contents and layout across page reloads and browser sessions.

To dock the panel next to your log results, click {{< ui >}}Pin{{< /ui >}}. To collapse it, click {{< ui >}}Hide{{< /ui >}}.

Findings includes a walkthrough of the canvas that you can reopen at any time.
<!-- Which control opens the walkthrough, and where does it live? Naming it here would make this step actionable. -->


## Capture a finding

Add a finding from anywhere in Log Explorer that shows results. Datadog names each finding after what you captured, and records the query and time range it came from.

### Queries and visualizations

In the toolbar above your results, click the {{< ui >}}Add a finding{{< /ui >}} icon, or press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd>. You can also click {{< ui >}}Add current page as finding{{< /ui >}} in the Findings panel.

The finding stores your search query, time range, and [visualization][4], including any group-by and aggregation you configured. Capture the same query as a list and as a timeseries to keep both views side by side.

### Individual log events

Click a log event in your results to open the [log side panel][5]. Hover over the **Log Message** section and click the {{< ui >}}Add a finding{{< /ui >}} icon, or press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd>.

### Specific text in a log message

To capture part of a log message, such as an error string or an identifier, select the text in the **Log Message** section and press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd>. The finding stores the text you selected instead of the whole event.
<!-- Is the keyboard shortcut the only way to capture selected text, or does a button appear on selection? -->


## Organize the canvas

Hover over a finding to rename it, and drag it to move or resize it. Datadog saves the layout you build, so the canvas looks the same the next time you open the panel.

To group findings by the query they came from, click the auto-organize icon on the left of the canvas. Moving, resizing, or deleting a finding resets the grouping.
<!-- A screenshot of the canvas controls would make the auto-organize icon findable. Add one alongside the GA video. -->

The controls on the left of the canvas also zoom in and out, fit the canvas to your findings, and open a full-screen view. The full-screen view gives you the same controls with more room, and you can drag the background to pan across it.

## Delete findings

To delete one finding, hover over it and use the delete control on the card. To delete several at once, select them and press <kbd>Delete</kbd>. To select every finding first, press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>A</kbd>.
<!-- Does a finding card have a delete control? Hovering a card shows Open in Explorer and rename only. Confirm how to delete one finding with the mouse. -->

The clear icon in the Findings panel deletes findings; it does not clear your selection. It removes the findings you have selected, or every finding when nothing is selected.
<!-- Confirm the clear icon deletes rather than deselects, and whether it warns before emptying a full canvas. -->

Deleting is not permanent. A toast appears with an {{< ui >}}Undo{{< /ui >}} option, and <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Z</kbd> restores what you removed. Undo covers your last ten actions on the canvas.
<!-- How long does a deleted finding stay recoverable? Confirm whether undo history survives a page reload or ends with the browser session. -->


## Return to a finding

Double-click a finding, or hover over it and click the {{< ui >}}Open in Explorer{{< /ui >}} icon. Log Explorer reloads the query, time range, and visualization that the finding was captured with. The rest of your findings stay on the canvas.

Each finding keeps its own query and time range. You can change your search as often as you need, then come back to an earlier result in one click with no query to rebuild.

## Use findings as context

Select one or more findings on the canvas to act on them together:

- To ask [Bits AI][2] about them, type your question in the selection bar and click {{< ui >}}Ask Bits{{< /ui >}}. Bits AI chat opens with the selected findings attached as context.
- To copy them into a [Notebook][3], click {{< ui >}}Open in Notebooks{{< /ui >}} and choose a new or existing notebook. The findings you send stay on the canvas.

Send only the findings that relate to your question. If three of the eight findings on your canvas cover the error you're asking about, select those three.

## Keyboard shortcuts

| Action | Shortcut |
| ------ | -------- |
| Add a finding | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd> |
| Select all findings | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>A</kbd> |
| Delete selected findings | <kbd>Delete</kbd> |
| Undo | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Z</kbd> |
| Redo | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> |

<!-- Undo and redo bindings are unconfirmed. Confirm these, and add any shortcuts missing from this table. -->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/
[2]: /bits_ai/bits_chat/
[3]: /notebooks/
[4]: /logs/explorer/visualize/
[5]: /logs/explorer/side_panel/
