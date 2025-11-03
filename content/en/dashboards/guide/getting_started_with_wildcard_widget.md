---
title: Getting Started with the Wildcard Widget
description: Learn to build custom visualizations using the Wildcard widget with Vega-Lite grammar and imported queries.
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

The Wildcard widget is a powerful and flexible visualization tool in Datadog that lets you build custom visual representations using the [Vega-Lite grammar][1].

### Tutorial Objectives

By the end of this tutorial, you will be able to:

* Use Vega-Lite concepts to define visualizations in Wildcard widgets.
* Import a query from an existing widget.

### Prerequisites

* A Datadog account with access to [Notebooks][2] or [Dashboards][3].
* You have telemetry such as APM trace data or request duration metrics.
* You are familiar with basic Datadog widgets and dashboards and can [add a widget and edit it][4].

## Step 1: Import an existing query

Rather than starting from scratch, import a request from an existing widget. Copy the query from a widget you're interested in exploring further (such as a Top List). To get started, you can use widgets from your [prebuilt dashboards][5].

1. Navigate to an existing dashboard with a useful widget (Top List of database queries).
2. Use the widget menu or use the keyboard shortcut (<kbd>Ctrl</kbd>/<kbd>CMD</kbd> + <kbd>C</kbd>) to copy the widget.
3. In a new dashboard, add a Wildcard widget.
4. In the editor, clear the default query ({{< img src="/icons/cancel-circle.png" alt="X icon to clear the query" inline="true" width="40px">}}).
5. Paste the copied request with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>. The query and associated fields carry over automatically.

{{< img src="/dashboards/guide/analyze_p50_vs_p95_latency_with_the_wildcard_widget/import_widget_walkthrough.mp4" alt="Walkthrough of importing a widget query into the Wildcard widget in Datadog" video=true >}}

## Step 2: Refine the query

In the query editor:

1. Expand the **Data Preview** to identify the fields returned from the query.
2. Next to your query, click **As** to add an alias to your query. This adds clarity, for example, rename `p50:trace.http.request{*} by {service}`→ `p50`.

{{< img src="/dashboards/guide/analyze_p50_vs_p95_latency_with_the_wildcard_widget/refine_query_walkthrough.mp4" alt="Walkthrough of refining a query in the Wildcard widget, including renaming fields and adding a P95 formula" video=true >}}

## Step 3: Auto-generate a visualization

At the top of the query editor:

1. Click the **Define Visual** tab.
2. Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (Windows/Linux) to open the **Command Palette**.
3. Select **Auto-select chart**.

{{< img src="/dashboards/guide/analyze_p50_vs_p95_latency_with_the_wildcard_widget/command_palette.mp4" alt="Your image description" video=true >}}

Datadog automatically creates a visualization based on your query.

<div class="alert alert-tip">
Use the Command Palette (<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) to auto-select a chart type based on your query, add or edit encodings, or rotate axes/switch chart types.
</div>

{{% collapse-content title="Guided example of Auto-generate" level="h4" expanded=false %}}
1. In a new Wildcard widget, click the JSON tab of the query editor and paste the following query:
    ```json
    {
      "response_format": "scalar",
      "queries": [
        {
          "query":       "avg:system.cpu.user{*} by {env}",
          "data_source": "metrics",
          "name":        "query1",
          "aggregator":  "last"
        },
        {
          "query":       "max:system.cpu.user{*} by {env}",
          "data_source": "metrics",
          "name":        "query2",
          "aggregator":  "last"
        }
      ],
      "formulas": [
        { "formula": "query1" },
        { "formula": "query2" }
      ],
      "sort": {
        "count": 15,
        "order_by": [
          {
            "type":   "formula",
            "index":  0,
            "order":  "desc"
          }
        ]
      }
    }
    ```
1. Click **Save Edits**.
2. At the top of your query editor, click the **Define Visual** tab.
3. Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (Windows/Linux) to open the **Command Palette**.
4. Select **Auto-select chart**. The graph should automatically change from a bar chart to a scatterplot.

{{% /collapse-content %}}

## Step 4: Add a context menu

To add interactivity to your graph, enable context menu support.

1. In the visual JSON editor, copy and paste the following example bar chart widget to see how to add a context menu. This example includes a Tooltip and Context Menu configurations.
   {{< highlight json "hl_lines=37-41" >}}
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Bar chart showing CPU usage by environment with Datadog context menu support",
  "data": {
    "name": "table1"
  },
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "env",
      "type": "nominal",
      "sort": "-y",
      "title": "Environment"
    },
    "y": {
      "field": "query1",
      "type": "quantitative",
      "title": "CPU Usage (%)"
    },
    "tooltip": [
      {
        "field": "env",
        "type": "nominal"
      },
      {
        "field": "query1",
        "type": "quantitative",
        "title": "CPU Usage (%)"
      },
      {
        "field": "timestamp",
        "type": "temporal",
        "title": "Timestamp"
      }
    ]
  },
  "params": [
    {
      "name": "datadogPointSelection",
      "select": "point"
    }
  ]
}
{{< /highlight >}}
2. Run and save the widget.
3. On your dashboard, find the widget you just created and click any data point in graph to bring up a **context menu**.

For more information, see [Using Vega-Lite with Wildcard Widgets in Datadog][6].

## Next Steps

Wildcard widgets support a wide range of customizations, including:
- [Adjusting the thickness of lines to show weight and intensity][7]
- [Adding images to visually represent values][8]
- [Layering visualizations for richer context][9]

For more inspiration, see [Datadog Wildcard widget examples][10] and [Vega-Lite Examples][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vega.github.io/vega-lite/
[2]: https://app.datadoghq.com/notebook/list
[3]: https://app.datadoghq.com/dashboard/lists?p=1
[4]: /dashboards/widgets/wildcard/#setup
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?p=1
[6]: /dashboards/guide/using_vega_lite_in_wildcard_widgets/#context-menu-and-context-links
[7]: https://vega.github.io/vega-lite/examples/trail_color.html
[8]: https://vega.github.io/vega-lite/examples/isotype_bar_chart_emoji.html
[9]: https://vega.github.io/vega-lite/examples/layer_line_rolling_mean_point_raw.html
[10]: /dashboards/guide/wildcard_examples/
[11]: https://vega.github.io/vega-lite/examples/
