---
title: Understanding Duplicate Colors in the Consistent Palette
description: "Learn why duplicate colors can appear in the Consistent color palette, and how to address this limitation in dashboards with many tag values."
further_reading:
- link: "dashboards/guide/widget_colors"
  tag: "Documentation"
  text: "Selecting the right colors for your graphs"
- link: "dashboards/guide/compatible_semantic_tags"
  tag: "Documentation"
  text: "Compatible Semantic Tags"
---

## Overview

The **Consistent** color palette is designed to assign stable, repeatable colors to tag values, making it easier to correlate data across charts over time. However, it does not track which colors are already in use within a given widget. This can result in duplicate colors appearing in a single graph, especially when many tag values are displayed.

This guide explains why duplicate tag colors occur when using the Consistent palette and outlines options for mitigating this behavior.

## Why duplicate colors occur

{{< img src="/dashboards/guide/consistent_color_palette/duplicate_color_tags.png" alt="Example of duplicate tag colors in a dashboard pie chart" style="width:100%;" >}}

The Consistent palette maps tag values to colors using a deterministic hashing algorithm. This ensures that a specific tag value always appears with the same color across all dashboards, notebooks, and timeframes. However, the palette:

- **Does not track which colors have already been used** in a specific graph.
- **Uses a limited set of 16-20 curated colors**, chosen for accessibility, color contrast, and dark mode compatibility.

Because the color mapping is fixed and the palette is limited, multiple tag values may be assigned the same color, particularly when the number of tag groups exceeds the number of available colors.

This trade-off prioritizes color consistency across time and views over uniqueness within a single widget.

## Use color overrides

If your graph displays a small and relatively fixed number of tag values (fewer than 15), such as data centers or regions, you can assign a unique color to each series using the color override feature. For more details, see [Color overrides][1].

{{% collapse-content title="Example dashboard tiledef" level="h4" expanded=false %}}
```json
{
    "viz": "timeseries",
    "requests": [
        {
            "style": {
                "palette": "semantic",
                "type": "solid",
                "width": "normal"
            },
            "type": "area",
            "formulas": [
                {
                    "style": {
                        "palette": "classic",
                        "palette_index": 0
                    },
                    "alias": "ap1",
                    "formula": "query2"
                },
                {
                    "style": {
                        "palette": "classic",
                        "palette_index": 4
                    },
                    "alias": "eu1",
                    "formula": "query1"
                },
                {
                    "style": {
                        "palette": "green",
                        "palette_index": 3
                    },
                    "alias": "us1",
                    "formula": "query3"
                },
                {
                    "style": {
                        "palette": "warm",
                        "palette_index": 3
                    },
                    "alias": "us3",
                    "formula": "query4"
                },
                {
                    "style": {
                        "palette": "purple",
                        "palette_index": 5
                    },
                    "alias": "us5",
                    "formula": "query5"
                }
            ],
            "queries": [
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:ap1.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query2"
                },
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:eu1.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query1"
                },
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:us1.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query3"
                },
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:us3.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query4"
                },
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:us5.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query5"
                }
            ],
            "response_format": "timeseries"
        }
    ],
    "yaxis": {
        "include_zero": true,
        "scale": "linear",
        "label": "",
        "min": "auto",
        "max": "auto"
    },
    "markers": []
}
```
{{% /collapse-content %}}

## Limitations and maintenance challenges

This color duplication behavior is a known limitation of the Consistent palette. In dashboards with many group-by values or dynamic tags, duplicate colors can reduce visual clarity.

While you can manually override colors per series using the color override feature, this can be time-consuming to maintain, especially when:
- The number of tag values changes frequently.
- The same logic needs to be applied across many widgets.

To simplify this process, consider automating widget creation ([Terraform][2]) or updates through scripting instead of maintaining static JSON definitions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/widget_colors/#color-overrides
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard
