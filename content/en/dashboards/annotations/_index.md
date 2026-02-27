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
    - Left-clicking anywhere on a timeseries widget and selecting <span class="ui">Add annotation</span> from the context menu that appears, or
    - Clicking the x-axis on a timeseries graph
3. Type your comment, and optionally click the timestamp field to manually adjust to the precise time you want to annotate.
4. (Optional) Change the color of the annotation from the dropdown in the bottom left.
5. Click <span class="ui">Save</span>.

## Adding multiple annotations

To apply an annotation to multiple timeseries at once:

1. Follow steps 1-4 in [Adding an annotation](#adding-an-annotation) to create an annotation.
2. From the <span class="ui">Applying to</span> dropdown, choose <span class="ui">All widgets</span> or <span class="ui">Selected widgets</span>.
    <br>
    If you choose <span class="ui">Selected widgets</span>, you see a list of all the widgets in the dashboard or notebook and can check or uncheck the widgets you want to apply the annotation to.
3. Click <span class="ui">Save</span>.

## Editing an annotation

To edit an annotation, hover over the annotation line, click the three dots menu, and choose <span class="ui">Edit</span> or <span class="ui">Edit for all widgets</span>.

## Deleting an annotation

To delete an annotation you've created, hover over the annotation line, click the three dots menu, and choose <span class="ui">Delete</span> or <span class="ui">Delete from all widgets</span>.