---
title: Wildcard Widget
description: Build custom visualizations using Vega-Lite grammar for advanced charting and data representation beyond standard widgets.
widget_type: wildcard
further_reading:
- link: "dashboards/guide/getting_started_with_wildcard_widget/"
  tag: "Guide"
  text: "Getting Started with the Wildcard Widget Tutorial"
- link: "/dashboards/guide/using_vega_lite_in_wildcard_widgets/"
  tag: "Documentation"
  text: "Learn more about using Vega-Lite with Wildcard widgets"
- link: "https://docs.datadoghq.com/dashboards/guide/wildcard_examples"
  tag: "Documentation"
  text: "Wildcard Widget Examples"
- link: "https://vega.github.io/vega-lite/tutorials/getting_started.html"
  tag: "Vega Tutorial"
  text: "Introduction to Vega-Lite"
- link: "https://www.datadoghq.com/blog/wildcard-widget/"
  tag: "Blog"
  text: "Build Vega-Lite visualizations natively in Datadog with the Wildcard widget"
---

## Overview

The Wildcard widget in Datadog extends the flexibility of the [open-source Vega-Lite][1] "Grammar of Graphics" language, and integrates it with the Datadog platform. The Wildcard widget allows you to create graphs that are not available within native Datadog widgets and query systems.

Use the Wildcard widget in [Dashboards][2] and [Notebooks][3].

## Best Practices

Datadog recommends using an existing [dashboard widget][4] to meet your use case. All native widgets have design and performance optimizations which are not available in the Wildcard widget. For known limitations, see the [Additional information](#additional-information) section.

However, if none of the Datadog widgets meets your visualization needs, a Wildcard widget is a fast way to get a new capability added to your Dashboards without waiting for a new feature or graph type to be added.

1. **Don't start from scratch**. Vega-Lite maintains a public gallery with over [150 official examples][5]. If you're not sure what type of graph you want to use, fork an existing example to test the visualization. Use Vega-Lite over Vega for simplicity and ease of debugging.
1. **Test the Wildcard widget**. The flexibility of the Wildcard widget comes with the risk of creating slow, unappealing, or inconsistent visualizations. Test the Wildcard widget on a scratchpad or empty dashboard before adding Wildcard widgets to production.
1. **Validate your query**. Datadog widgets guarantee that the data visualizations are semantically aligned with the query, which ensures the configuration builds the expected graph. With the Wildcard widget, you're adding a custom Vega-Lite specification that defines how the request maps to visual elements. This creates the potential that you'll fetch a data field that isn't used in your visualization. Use the [Data Preview](#data-preview) to help debug mismatches.

## Setup

After you create a Wildcard widget, you can configure the widget either as a [new configuration](#configure-a-new-wildcard-widget) or by [importing a configuration from an existing widget](#import-data-from-an-existing-widget).

### Configure a new Wildcard widget

1. [Check native widgets][4]. See if a Datadog widget can fulfill your requirements.
1. If no Datadog widget meets your requirements, in a new or pre-existing dashboard, click **Add Widgets**.
1. Click and drag the Wildcard Widget icon from the widget tray.
1. Select from the **Request Type** dropdown. For more information on Scalar and Timeseries types, see the [Formulas Scalar vs. Formulas Timeseries](#formulas-scalar-vs-formulas-timeseries) section of this page.
1. Copy a Vega-Lite Definition from the [public gallery][5] to find a starter Vega-Lite specification.
1. Open the Wildcard widget [full screen editor][6] and click **Define Visual**.
1. Paste the copied Vega-Lite definition.
1. Click **Run** to apply your configuration changes, see a preview of the visualization, and iterate on your design.
   **Note**: You must click **Run** to add your changes, however this does not save your configuration.
1. (Optional) Debug Vega-Lite specification mismatches with [Data Preview](#data-preview). Make sure the query in your Vega-Lite specification maps to the Datadog query.
1. Click **Save**.

#### Formulas Scalar vs. Formulas Timeseries

In Datadog dashboards, visualizations are powered by a multiple _request types_, including scalar and timeseries. Each _request type_ changes the number and type of fields available for the data in a Wildcard widget.

**Timeseries**
: This data format is designed to display how your data changes over time.
   - **Use-cases**: It's ideal for monitoring metrics that fluctuate, such as CPU usage, memory consumption, or request rates. It helps identify trends, patterns, and anomalies over a specified time range.

**Scalar**
: This data format aggregates your data producing 1 value per "group". The scalar format is used for the toplist, treemap, pie chart, and table widget, where each group refers to 1 shape (bar, rectangle, slice, or row respectively) in your graph.
   - **Use-cases**: It's best for displaying key performance indicators (KPIs) or summary statistics such as averages, sums, or percentiles. It provides a summary view of the current state or a specific metric. If you are not describing changes over time, use Scalar.

The Timeseries data format emphasizes data trends over time, while the Scalar format focuses on presenting single, computed values for quick assessments. Choose the Timeseries type if you need to visualize time on an axis or require individual time buckets. If not visualizing against time, select the Scalar type for performance.

**Note**: The "Formulas" prefix is used specifically for Scalar and Timeseries formats because they are compatible with the [Functions API][18]. The other formats, such as Histogram and List, do not support this API.

### Import data from an existing widget

1. Copy from an existing Datadog widget using `cmd+c`.
1. Open the Wildcard widget [full screen editor][6].
1. Paste with `cmd+v`.
1. Click Save.

## Command palette

{{< img src="/dashboards/widgets/wildcard/command_palette.png" alt="Command palette modal showing the ability to search commands and autoselect chart" style="width:100%;" >}}

The command palette provides quick access to Wildcard widget tools. Activate with `cmd + shift + p` or click the info icon at the top of the page.

## Data Preview

{{< img src="/dashboards/widgets/wildcard/data_preview_arrow_icon.png" alt="Highlighting the arrow icon to access the Data Preview panel" style="width:100%;" >}}

The Data Preview table shows the response, fields, and values from your data request that are available to use in your Vega-lite specification. To access, click the arrow at the bottom of the Wildcard widget editor to *Show data preview*. There are three types of tables in the preview:
- Request Rows: Displays your actual data.
- Request Columns: Displays column summary statistics and data types.
- Internal Tables: Displays transformed data stored by Vega-Lite.

## Map Datadog data to Vega-Lite specifications

Datadog native widgets automatically map the query results to the visualization elements, but the Wildcard widget requires you to add a custom Vega-Lite specification that defines how the Datadog query maps to visual elements. This creates the potential for a mismatch. With [Data Preview](#data-preview), you can verify that the Vega-Lite specification maps to the correct query response.

To see how Datadog values map to the Vega-Lite specification, start with the example metric query of `system.cpu.user` averaged by `env`:

{{< img src="/dashboards/widgets/wildcard/example_configuration_query.png" alt="Example widget configuration metric query for system.cpu.user grouped by env" style="width:100%;" >}}

Click on the **Define Visual** tab to view how this query maps to Vega-Lite. Open the Data Preview panel and notice the matching **query1** and **env** fields listed in the Vega-Lite specification and the Data Preview column.

{{< highlight json "hl_lines=8 12" >}}
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
      "name": "table1"
    },
    "encoding": {
      "x": {
        "field": "env",
        "type": "nominal"
      },
      "y": {
        "field": "query1",
        "type": "quantitative"
      }
    },
    "mark": {
      "type": "rect",
      "tooltip": {
        "content": "data"
      }
    }
  }
{{< /highlight >}}

| Select data configuration  | Define Visual Specification |
| ---  | ----------- |
|{{< img src="/dashboards/widgets/wildcard/example_configuration_no_alias.png" alt="Example widget configuration, showing open data preview" style="width:100%;" >}} | {{< img src="/dashboards/widgets/wildcard/define_visual_run_button.png" alt="Vega specification mapping the widget configuration field query1 to the vega field" style="width:100%;" >}}|

To demonstrate a mismatch between the Datadog data and the Vega-Lite specification, add an alias to the query. The visualization does not work because the Vega-lite specification still points to "query1", but the Data Preview column shows that the new query is now the new alias "example". To fix this visualization, you need to replace `field:"query1"` with `field:"example"`.

| Select data configuration  | Define Visual Specification |
| ---  | ----------- |
|{{< img src="/dashboards/widgets/wildcard/example_config_with_alias.png" alt="Example widget configuration where query has an alias" style="width:100%;" >}} | {{< img src="/dashboards/widgets/wildcard/define_visual_example_run_button.png" alt="Mismatched mapping between widget configuration and Vega specification" style="width:100%;" >}}|

## Compatible data formats

The Wildcard Widget supports data requests from all data sources supported in native widgets:
| Request Type | Widgets that use this Request Type |
|-----------------------|-------------------------------------------------------------------------------------------------------------|
| Scalar Requests | Change, Pie Chart, Query Value, Scatter Plot, Table, Treemap, Top List, Distribution (of groups), Geomap |
| Timeseries Requests | Timeseries, Heatmap |
| Distribution Requests | Distribution (of points) |
| List requests | All “event” oriented data in the List widget |

## Additional information
### Choosing Between Vega and Vega-Lite
For simplicity and brevity, opt for Vega-Lite. The system supports Vega-Lite version 5.18.1. Reserve Vega for more complex or advanced visualization needs.

### Terraform Integration
Use the [`datadog_dashboard_json`][19] resource when working with Wildcard widgets in Terraform dashboards.

### Known Limitations
Avoid using Wildcard widgets for the following scenarios:
- Visualizations with high cardinality. If your visualizations have more than 5000 rows per request, consider pre-aggregating data on the backend before graphing.
- Network or hierarchical visualizations.
- Visuals requiring physics-based layouts.
- Advanced geographic mapping.
- 3D graphical representations.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vega.github.io/vega-lite/
[2]: /dashboards/
[3]: /notebooks/
[4]: /dashboards/widgets/
[5]: https://vega.github.io/vega-lite/examples/
[6]: /dashboards/widgets/#full-screen
[16]: /api/latest/dashboards/
[17]: /dashboards/graphing_json/widget_json/
[18]: /dashboards/functions/
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard_json

