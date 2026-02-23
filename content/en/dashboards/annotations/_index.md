---
title: Annotations
description: Learn how to add, customize, and manage annotations on timeseries widgets in dashboards and notebooks to highlight important events.
disable_toc: false
---

## Overview

Annotations let you manually place vertical markers with descriptions on timeseries widgets. Adding annotations can be useful to visually call out key events like deploys, incidents, or spikes. Click any point in time and add a note.

{{< img src="dashboards/annotations-12-2025.png" alt="Timeseries showing a drop-off in availability with a vertical annotation line at the end of the drop-off and a comment that says 'Rollback completed — service availability restored.'" style="width:100%;" >}}

Annotations are available in both dashboards and notebooks. If you export a widget from a dashboard to a notebook, any annotations you've added to the widget persist.

## Adding an annotation

1. Create an annotation by:
    - Left-clicking anywhere on a timeseries widget and selecting **Add annotation** from the context menu that appears, or
    - Clicking the x-axis on a timeseries graph
3. Type your comment, and optionally click the timestamp field to manually adjust to the precise time you want to annotate.
4. (Optional) Change the color of the annotation from the dropdown in the bottom left.
5. Click **Save**.

## Adding multiple annotations

To apply an annotation to multiple timeseries at once:

1. Follow steps 1-4 in [Adding an annotation](#adding-an-annotation) to create an annotation.
2. From the **Applying to** dropdown, choose **All widgets** or **Selected widgets**.
    <br>
    If you choose **Selected widgets**, you see a list of all the widgets in the dashboard or notebook and can check or uncheck the widgets you want to apply the annotation to.
3. Click **Save**.

## Editing an annotation

To edit an annotation, hover over the annotation line, click the three dots menu, and choose **Edit** or **Edit for all widgets**.

## Deleting an annotation

To delete an annotation you've created, hover over the annotation line, click the three dots menu, and choose **Delete** or **Delete from all widgets**.