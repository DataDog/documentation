---
title: Getting Started with the Wildcard Widget
further_reading:
- link: "/dashboards/widgets/wildcard/"
  tag: "Documentation"
  text: "Wildcard widget Overview"
- link: "/dashboards/guide/wildcard_examples/"
  tag: "Guide"
  text: "Wildcard widget example visualizations"
- link: "/dashboards/guide/using_vega_lite_in_wildcard_widgets/"
  tag: "Guide"
  text: "Using Vega-Lite in Wildcard widgets"
---

## Overview

The Wildcard widget is a powerful and flexible visualization tool in Datadog that lets you build custom visual representations using the [Vega-Lite grammar][4]. In this tutorial, you'll learn how to use Datadog's **Wildcard widget** to build a flexible visualization that compares **typical (P50)** versus **slow (P95)** latency across your services.

### Tutorial Objectives

By the end of this tutorial, you will be able to:

* Use Vega-Lite concepts to define visualizations in Wildcard widgets.
* Import a query from an existing widget.
* Visualize P50 vs. P5 latency as a scatterplot with labeled text.
* Enable inter-widget interaction using a context menu.

### Prerequisites

* A Datadog account with access to [Notebooks][1] or [Dashboards][2].
* You have telemetry such as APM trace data or request duration metrics.
* You are familiar with basic Datadog widgets and dashboards and can [add a widget and edit it][3].

## Understand the Key Concepts

Before building your first visualization, it's helpful to understand two core Vega-Lite concepts: **encoding** and **layering**.

Encodings
: An encoding maps data to a visual element. You define these mappings in the "Define visual" tab of the Wildcard widget. For example: <br>
    * X position → p50 latency
    * Y position → p95 latency
    * Color → endpoint
    * Shape → service

Layering
: Layering allows you to stack different mark types (text, points, bars) to create composite visualizations.

## Step 1: Import an existing query

Rather than starting from scratch, import a request from an existing widget. Copy the query from a widget you're interested in exploring further (such as a Top List). You can use widgets from your [prebuilt dashboards](https://app.datadoghq.com/dashboard/lists/preset/3?p=1).

1. Navigate to an existing dashboard with a useful widget (Top list of database queries)
2. Use the widget menu or use the keyboard shortcut (<kbd>Ctrl</kbd>/<kbd>CMD</kbd> + <kbd>C</kbd>) to copy the widget.
3. In a new dashboard, add a Wildcard widget.
4. In the editor, clear the default query ({{< img src="/icons/cancel-circle.png" alt="X icon to clear the query" inline="true" width="40px">}}).
5. Paste the copied request with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>. The query and associated fields carry over automatically.

{{< img src="/dashboards/guide/analyze_p50_vs_p95_latency_with_the_wildcard_widget/import_widget_walkthrough.mp4" alt="Walkthrough of importing a widget query into the Wildcard widget in Datadog" video=true >}}

## Step 2: Refine the query

In the query editor:

1. Expand the **Data Preview** to identify the fields returned from the query.
2. Add clarity by renaming field names. For example, rename `p50:trace.http.request{*} by {service}`→ `p50`
3. Click **Add Query** to add a second formula, and change the group by from `p50 by` → `p95 by` to compare outlier latency.

{{< img src="/dashboards/guide/analyze_p50_vs_p95_latency_with_the_wildcard_widget/refine_query_walkthrough.mp4" alt="Walkthrough of refining a query in the Wildcard widget, including renaming fields and adding a P95 formula" video=true >}}

## Step 3: Auto-generate a visualization

At the top of the query editor:

1. Click the **Define Visual** tab.
2. Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (Windows/Linux) to open the **Command Palette**.
3. Select **Auto-select chart**.

{{< img src="/dashboards/guide/analyze_p50_vs_p95_latency_with_the_wildcard_widget/command_palette.mp4" alt="Your image description" video=true >}}

Datadog automatically creates a scatterplot using the P50 and P95 metrics.

<div class="alert alert-info">
<strong>Tip:</strong> Use the Command Palette (<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) to auto-select a chart type based on your query, add or edit encodings, or rotate axes/switch chart types.
</div>

## Step 4:Add labels to the graph

To add text labels directly to the chart:

1. Add a `text` encoding:
   * Use the field dropdown or JSON to map `viz` or `endpoint` as the text value.
2. Change the **mark type** to `text`:
   * Use the command palette or enter it in JSON: `"mark": "text"`
3. Run the widget.

## Step 5: Add a context menu

To add interactivity to your graph, enable context menu support:

1. In the visual JSON editor, add the following:
   ```json
    "params": [
        {
            "name": "datadogPointSelection",
            "select": "point"
        }
    ]
   ```
2. Save and run the widget.
3. Click any data point in your wildcard widget to bring up a **context menu** with dynamic filters.

For more information, see [Using Vega-Lite with Wildcard Widgets in Datadog][5].

## Next Steps

* Customize mark types and layering further for complex composite charts.
* Take a look at [Wildcard widget examples][7] for inspiration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/dashboard/lists?p=1
[3]: /dashboards/widgets/wildcard/#setup
[4]: https://vega.github.io/vega-lite/
[5]: /dashboards/guide/using_vega_lite_in_wildcard_widgets/#context-menu-and-context-links
[6]: https://docs.datadoghq.com/dashboards/guide/using_vega_lite_in_wildcard_widgets/
[7]: https://docs.datadoghq.com/dashboards/guide/wildcard_examples/