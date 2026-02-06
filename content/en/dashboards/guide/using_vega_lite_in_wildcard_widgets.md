---
title: Using Vega-Lite with Wildcard Widgets in Datadog
description: Create advanced custom visualizations using Vega-Lite grammar in Wildcard widgets with context menus and interactivity.
further_reading:
- link: "https://docs.datadoghq.com/dashboards/widgets/wildcard/"
  tag: "Documentation"
  text: "Learn more about the Wildcard widget"
- link: "https://docs.datadoghq.com/dashboards/guide/wildcard_examples"
  tag: "Documentation"
  text: "Wildcard Widget Examples"
- link: "https://docs.datadoghq.com/dashboards/guide/context-links/#context-links-variables"
  tag: "Documentation"
  text: "Using Context Links in Dashboards"
---

## Overview

When using Vega-Lite with Wildcard widgets in Datadog, you'll find extensions to the Vega-Lite specification which are unique to Datadog. This guide outlines the necessary configurations and considerations for effectively using Vega-Lite for data visualization in Datadog, ensuring compatibility with its unique specifications. By understanding and leveraging these specifications, you can create visually appealing and interactive data visualizations that are both effective and responsive to your thematic preferences.

**Note**: Some extensions in Vega-Lite are exclusive to Datadog and might not function in the same way if exported to other tools that have Vega-lite.

## Customizing the theming and color palettes

Datadog provides a range of theming and color palette options to enhance the visual appeal of widgets. You can specify custom colors so that they blend in with the styling choices used by native Datadog widgets. If you set custom colors, the graph will not adjust colors when the app theme changes. By default, Datadog graphs adjust colors for text and axis marks to ensure readable contrast when viewed in dark mode. It's best to avoid setting custom colors for graph axes.

Customized color, font, spacing, and other design settings are available. These settings apply automatically when using the theme switcher (`CTRL + OPT + D`).

### Custom color palette

While you can create custom color palettes using hex codes, using the Datadog color palette ensures automated switching between light and dark modes.

Datadog offers additional color palettes beyond the public Vega color schemes, including:
- `dog_classic_area`
- `datadog16`
- `hostmap_blues`

{{< whatsnext desc="Additional resources:" >}}
    {{< nextlink href="/dashboards/guide/widget_colors/" >}}Learn more about Datadog color schemes and themes{{< /nextlink >}}
    {{< nextlink href="https://vega.github.io/vega/docs/schemes/" >}}See Vega color schemes{{< /nextlink >}}
{{< /whatsnext >}}


## Customize visualization units

Datadog offers unit-aware number formatting for [over 150 units][1], enabling you to easily format values such as 3600 (seconds) as 1 (hour). To use this feature in your Vega-Lite definition, add the `"config": {"customFormatTypes": true}` parameter to the root of your JSON block.

Next, wherever you set a `format` key, use `formatType: hoverFormatter` and define your units as an array.  For example:

{{% collapse-content title="Example Vega-Lite Spec with custom units" level="h4" %}}
{{< highlight json "hl_lines=11 19-20" >}}
{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple bar chart with embedded data.",
    "data": {
    "values": [
        {"grade": "A", "total": 28},
        {"grade": "B", "total": 55},
        {"grade": "C", "total": 43}
    ]
    },
    "config": {"customFormatTypes": true},
    "mark": "bar",
    "encoding": {
        "x": {"field": "total", "type": "quantitative"},
        "y": {
            "field": "grade",
            "type": "nominal",
            "axis": {
                "formatType": "hoverFormatter",
                "format": {"units": ["second", null]}
            }
        }
    }
}
{{< /highlight >}}


{{% /collapse-content %}}

The second element of the "units" array represents a "per" unit, such as in "bits per second." Units should be provided in singular form (such as, "second" instead of "seconds"). Regular number formatting, such as specifying precision, scientific notation, or integers, is possible using [d3-format][2] tokens. Two popular formats include:

* `~s`: scientific prefix (for example, 2000 -> 2k), with trailing zeros removed
* `.2f`: floating point to 2 decimals

The `hoverFormatter` may also be called in [Vega expressions][3]. This function has the signature of:

```
# `CanonicalUnitName` refers to any of the strings listed as a Datadog unit.

(
   datum: number,
   params?: {
       units?: [CanonicalUnitName, CanonicalUnitName];
   },
)
```

 {{< whatsnext desc="Additional resources:" >}}
    {{< nextlink href="/metrics/units/#unit-list" >}}Full list of Datadog units{{< /nextlink >}}
    {{< nextlink href="https://vega.github.io/vega-lite/docs/format.html" >}}Vega-Lite format customization{{< /nextlink >}}
    {{< nextlink href="https://vega.github.io/vega/docs/expressions/" >}}Vega Expression Language for writing basic formulas{{< /nextlink >}}
{{< /whatsnext >}}


## Responsive sizing

Widgets typically use responsive sizing by default, adjusting automatically to fit the available space. However, you have the option to set a fixed height for each data element, particularly if you want to enable scrolling within a bar chart. Similar to customizing colors, customizing sizing disables automatic responsive sizing.

For example, you can use the following configuration to specify a height increment for each element:

{{% collapse-content title="Example Vega-Lite Spec with custom height" level="h4" %}}
{{< highlight json "hl_lines=3" >}}
{
    "width": 120,
    "height": 120,
    "data": {"url": "data/cars.json"},
    "mark": "bar",
    "encoding": {
        "x": {
            "field": "Name",
            "scale": {"round": false}
        },
        "y": {"aggregate": "count"}
    }
}
{{< /highlight >}}


{{% /collapse-content %}}

## Referencing Datadog Data in Vega-Lite

In Datadog, each "request" or query corresponds to a Vega [named data source][4]. The numbering for these sources starts at one. This means if your widget makes multiple requests, it generates corresponding datasets named `table1`, `table2`, and so forth.

{{< img src="/dashboards/guide/using_vega_lite_in_wildcard_widgets/wildcard_multiple_requests.png" alt="Example wildcard widget with multiple requests" style="width:100%;" >}}

Whenever possible, Datadog widgets preserve tag names from your request's "group by" field. For formula and function requests, such as Scalar or Timeseries, "Formula Aliases" are used as field names. For an example, see the [Wildcard widget][5] documentation.

### Additional Field Information

- Timeseries requests include a `_time` field for timestamps in milliseconds.
- Histogram request rows consist of three fields: `start`, `end`, and `count`.
- List request responses vary by data source. Use the [DataPreview][6] to determine available fields.

### Field names with special characters

Special considerations apply to field names that contain non-alphanumeric characters. Datadog Metrics tags [prohibit most non-alphanumeric characters][7]. However, not all products have this constraint and they allow characters in attribute names that may have dual meanings in Vega-Lite. These characters include square brackets `[]` and periods `.` which are used to access nested properties in object-shaped data. They need to be escaped because the backend flattens the data before returning it to you for /scalar and /timeseries data.

To ensure these characters are interpreted correctly by the Wildcard widget, you must escape these characters with `\\`. For example, when using the RUM query field `@view.name`, write it as `@view\\.name` in the Vega-Lite specification.

For more information on supported data formats, see the [Wildcard widget][11] documentation.

## Context menu and context links

With Datadog widgets, you have the ability to click on a graph datapoint to open a [graph context menu][8] with context links. You can enable this feature on Wildcard widgets by adding specific parameters to your widget's configuration.

To enable the context menu feature, include the following parameters in your Vega-Lite configuration:

```json
"params": [
  {
    "name": "datadogPointSelection",
    "select": "point"
  }
]
```

If the graph contains the `layer` key, the param  must be added to one of the layer objects, not to the root of the spec. This is because parameters at the root are applied to all layers, which can cause conflicts. To avoid this, give each layer a uniquely named parameter by prefixing it with`datadogPointSelection_`, such as`datadogPointSelection_squares` or`datadogPointSelection_circles`. For example:

```json
"layer": [
  {
    "mark": "line",
    "encoding": {
      "x": { "field": "_time", "type": "temporal" },
      "y": { "field": "cpu", "type": "quantitative" },
      "color": { "field": "host", "type": "nominal" },
      "opacity": { "value": 0.4 }
    },
    "params": [
      {
        "name": "datadogPointSelection_lines",
        "select": { "type": "point", "on": "click" }
      }
    ]
  },
  {
    "mark": "point",
    "encoding": {
      "x": { "field": "_time", "type": "temporal" },
      "y": { "field": "cpu", "type": "quantitative" },
      "color": { "field": "host", "type": "nominal" },
      "size": { "value": 50 }
    },
    "params": [
      {
        "name": "datadogPointSelection_circles",
        "select": { "type": "point", "on": "click" }
      }
    ]
  }
],
```


After you enable this feature, you can click on datapoints in the widget to open a context menu. Use the graph context menu with the context links of the graph editor. Context links bridge dashboard widgets with other pages in Datadog, as well as the third-party applications you have integrated into your workflows. For more information, see [Context Links][9].

You can also add dynamic custom links through the [`href` encoding][10]. This is useful if you do not need a full context menu of choices.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/units/#unit-list
[2]: https://d3js.org/d3-format#locale_format
[3]: https://vega.github.io/vega/docs/expressions/
[4]: https://vega.github.io/vega-lite/docs/data.html#named
[5]: /dashboards/widgets/wildcard/#map-datadog-data-to-vega-lite-specifications
[6]: /dashboards/widgets/wildcard/#data-preview
[7]: /getting_started/tagging/#define-tags
[8]: /dashboards/widgets/#graph-menu
[9]: /dashboards/guide/context-links/#context-links-variables
[10]: https://vega.github.io/vega-lite/docs/encoding.html
[11]: /dashboards/widgets/wildcard/#compatible-data-formats
