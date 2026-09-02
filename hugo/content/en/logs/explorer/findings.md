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

The Findings canvas lives in the side panel on the left of Log Explorer, next to your saved views. To open it:

1. Navigate to [Log Explorer][1].
2. Click {{< ui >}}Views{{< /ui >}} in the upper left corner to open the side panel.
3. Click the **Findings** tab. The tab shows how many findings are on the canvas.

Click {{< ui >}}Pin{{< /ui >}} to dock the panel next to your log results, or {{< ui >}}Hide{{< /ui >}} to collapse it.

## Capture a finding

Add a finding from anywhere in Log Explorer that shows results. Datadog names each finding after what you captured, and records the query and time range it came from.

### A query and its visualization

In the toolbar above your results, click the {{< ui >}}Add a finding{{< /ui >}} icon, or press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd>.

The finding stores your search query, time range, and [visualization][4], including any group-by and aggregation you configured. Capture the same query as a list and as a timeseries to keep both views side by side.

### An individual log event

1. Click a log event in your results to open the [log side panel][5].
2. Hover over the **Log Message** section and click the {{< ui >}}Add a finding{{< /ui >}} icon, or press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd>.

### Specific text in a log message

To capture part of a log message, such as an error string or an identifier, select the text in the **Log Message** section and press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd>. The finding stores the text you selected.

## Organize the canvas

Hover over a finding to rename it, and drag it to move or resize it. Datadog saves the layout you build, so the canvas looks the same the next time you open the panel.

To group findings by the query they came from, click the auto-organize icon on the left of the canvas. Moving, resizing, or deleting a finding resets the grouping.

Use the remaining canvas controls to zoom in and out, fit the canvas to your findings, and open a full-screen view. On the full-screen canvas, you can pan, zoom, rename, and delete findings the same way.

**Note**: Undo and redo cover your last ten actions on the canvas, including deletions.

## Return to a finding

Double-click a finding, or hover over it and click the {{< ui >}}Open in Explorer{{< /ui >}} icon. Log Explorer reloads the query, time range, and visualization that the finding was captured with. The rest of your findings stay on the canvas.

This makes Findings useful as a set of checkpoints. When you land on a query that scopes an investigation well, capture it before you pivot. If a pivot leads nowhere, reopen that finding to get back to where you started instead of rebuilding the query.

## Use findings as context

Select one or more findings on the canvas to act on them together:

- To ask about them, type your question in the selection bar and click {{< ui >}}Ask Bits{{< /ui >}}. [Bits AI][2] opens with the selected findings attached as context.
- To keep them, click {{< ui >}}Open in Notebooks{{< /ui >}} and choose a new or existing [Notebook][3].

Select only the findings that matter for the question you're asking. A postmortem might need two of the five findings you captured, and a narrow selection gives Bits AI a narrower problem to reason about.

## Keyboard shortcuts

| Action | Shortcut |
| ------ | -------- |
| Add a finding | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd> |
| Undo | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Z</kbd> |
| Redo | <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> |

Findings also includes a tutorial you can reopen at any time to walk through the canvas.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/
[2]: /bits_ai/bits_chat/
[3]: /notebooks/
[4]: /logs/explorer/visualize/
[5]: /logs/explorer/side_panel/
