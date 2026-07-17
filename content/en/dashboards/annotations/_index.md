---
title: Annotations
description: Learn how to add, customize, and manage annotations on timeseries widgets in dashboards and notebooks to highlight important events.
---

## Overview

Annotations let you manually place markers with descriptions on timeseries widgets to highlight key events like deploys, incidents, or outages. Two annotation types are available:

- **Point annotation**: Marks a single moment in time with a vertical line.
- **Timerange annotation**: Highlights a span of time across the widget.

{{< img src="dashboards/annotations-12-2025.png" alt="Timeseries showing a drop-off in availability with a vertical annotation line at the end of the drop-off and a comment that says 'Rollback completed — service availability restored.'" style="width:100%;" >}}

Annotations are available in both dashboards and notebooks. If you export a widget from a dashboard to a notebook, any annotations you've added to the widget persist.

## Adding an annotation

1. Create an annotation by:
    - Left-clicking anywhere on a timeseries widget and selecting {{< ui >}}Add annotation{{< /ui >}} from the context menu that appears, or
    - Clicking the x-axis on a timeseries graph
2. Type your comment. To add a hyperlink, select text in your comment and enter a URL.
3. (Optional) Click the timestamp field to adjust the time. To annotate a span of time, set both a start and end time.
4. (Optional) Change the color of the annotation from the dropdown in the bottom left.
5. Click {{< ui >}}Save{{< /ui >}}.

## Adding multiple annotations

To apply an annotation to multiple timeseries at once:

1. Follow steps 1-4 in [Adding an annotation](#adding-an-annotation) to create an annotation.
2. From the {{< ui >}}Applying to{{< /ui >}} dropdown, choose {{< ui >}}All widgets{{< /ui >}} or {{< ui >}}Selected widgets{{< /ui >}}.
    <br>
    If you choose {{< ui >}}Selected widgets{{< /ui >}}, you see a list of all the widgets in the dashboard or notebook and can check or uncheck the widgets you want to apply the annotation to.
3. Click {{< ui >}}Save{{< /ui >}}.

## Editing an annotation

To edit an annotation, hover over the annotation line, click the three dots menu, and choose {{< ui >}}Edit{{< /ui >}} or {{< ui >}}Edit for all widgets{{< /ui >}}.

## Deleting an annotation

To delete an annotation you've created, hover over the annotation line, click the three dots menu, and choose {{< ui >}}Delete{{< /ui >}} or {{< ui >}}Delete from all widgets{{< /ui >}}.