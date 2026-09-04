---
title: Build an Accessible Health-Status Tile
description: Build a dashboard health-status tile with Query Value or Wildcard, using status text and color to communicate healthy, failed, warning, and no-data states.
further_reading:
- link: "/dashboards/widgets/query_value/"
  tag: "Documentation"
  text: "Query Value Widget"
- link: "/dashboards/widgets/wildcard/"
  tag: "Documentation"
  text: "Wildcard Widget"
- link: "/dashboards/guide/context-links/"
  tag: "Guide"
  text: "Context Links"
---

## Overview

A health-status tile summarizes a query as a state such as **Healthy**, **Warning**, **Failed**, or **No data**. Use text in addition to color so that users do not have to perceive color to understand the state.

Choose a widget based on whether the underlying value can remain visible:

| Widget | Use when | Tradeoff |
|---|---|---|
| [Query Value][1] | A count or other value helps explain the status. | Uses a native widget and conditional formatting, but keeps the value visible. |
| [Wildcard][2] | The tile should display a status word without displaying the underlying value. | Provides full control over visible status text and the no-data state, but its canvas output does not expose the dynamic status to screen readers. |

The following examples summarize failed DAG runs. Adapt the query and status labels to the data source and service semantics.

## Before you begin

Define each state before configuring the widget. For this example:

| State | Definition | Display |
|---|---|---|
| Healthy | The failed-run count is `0`. | **Healthy** with a green background |
| Failed | The failed-run count is greater than `0`. | **Failed** with a red background |
| No data | The query does not return a valid value. | **No data** with a neutral background |

Do not map missing data to **Healthy** unless missing data is an expected success condition for the service.

Use a Logs query that counts events matching `"DagRun Finished" "state=Failed"`. Scope the query with tags or attributes, such as `env`, that identify the service or workflow. Keep the dashboard's global time frame unless the health definition requires a fixed evaluation window.

## Create the native pattern

Use this option when a visible count provides useful context, such as `0 failed runs`.

1. Add a [Query Value widget][1] to a dashboard.
1. Select **Logs** as the data source and enter `"DagRun Finished" "state=Failed"` as the search query.
1. Compute the count over the selected time frame.
1. Set the widget title to `DAG run health — failed runs`. The title and displayed value communicate the result without relying on color.
1. Add a green conditional formatting rule for values below `1`.
1. Add a red conditional formatting rule for values greater than or equal to `1`.
1. Verify the no-data output for the selected data source. Keep no data visually distinct from a count of `0`.
1. Add a [context link][3] to the relevant logs or workflow dashboard so that users can investigate a failure.

If the raw value should not appear, use the Wildcard pattern instead.

## Create a Wildcard health tile

Use this option to display an explicit status while keeping the failed-run count in a tooltip and context menu.

1. Add a [Wildcard widget][2] to a dashboard.
1. Set the widget title to `DAG run health` to give the tile a descriptive label outside the visualization canvas.
1. Select **Formulas (Scalar)** as the request type.
1. Add a Logs query that counts events matching `"DagRun Finished" "state=Failed"`.
1. Set the query alias to `failed_runs`.
1. Open **Data Preview** and confirm that `failed_runs` is a field in `table1`.
1. Open **Define Visual** and replace the specification with the following Vega-Lite configuration:

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "DAG run health. Healthy means zero failed runs; Failed means one or more failed runs; No data means the query did not return a valid value.",
  "width": "container",
  "height": 120,
  "config": {
    "view": {
      "stroke": null
    }
  },
  "layer": [
    {
      "data": {
        "values": [
          {
            "status": "No data",
            "status_color": "#E8E8E8",
            "status_text_color": "#1F1F1F",
            "status_description": "DAG run health: No data."
          }
        ]
      },
      "layer": [
        {
          "mark": {
            "type": "rect",
            "cornerRadius": 8,
            "aria": false
          },
          "encoding": {
            "color": {
              "field": "status_color",
              "type": "nominal",
              "scale": null,
              "legend": null
            }
          }
        },
        {
          "mark": {
            "type": "text",
            "fontSize": 24,
            "fontWeight": "bold",
            "aria": true
          },
          "encoding": {
            "text": {
              "field": "status",
              "type": "nominal"
            },
            "color": {
              "field": "status_text_color",
              "type": "nominal",
              "scale": null,
              "legend": null
            },
            "description": {
              "field": "status_description",
              "type": "nominal"
            }
          }
        }
      ]
    },
    {
      "data": {
        "name": "table1"
      },
      "transform": [
        {
          "calculate": "isValid(datum.failed_runs) ? (datum.failed_runs > 0 ? 'Failed' : 'Healthy') : 'No data'",
          "as": "status"
        },
        {
          "calculate": "datum.status === 'Failed' ? '#B3251E' : (datum.status === 'Healthy' ? '#2B7A3D' : '#E8E8E8')",
          "as": "status_color"
        },
        {
          "calculate": "datum.status === 'No data' ? '#1F1F1F' : '#FFFFFF'",
          "as": "status_text_color"
        },
        {
          "calculate": "datum.status === 'No data' ? 'DAG run health: No data.' : 'DAG run health: ' + datum.status + '. Failed runs: ' + datum.failed_runs + '.'",
          "as": "status_description"
        }
      ],
      "layer": [
        {
          "mark": {
            "type": "rect",
            "cornerRadius": 8,
            "aria": false
          },
          "params": [
            {
              "name": "datadogPointSelection_health",
              "select": "point"
            }
          ],
          "encoding": {
            "color": {
              "field": "status_color",
              "type": "nominal",
              "scale": null,
              "legend": null
            },
            "tooltip": [
              {
                "field": "status",
                "type": "nominal",
                "title": "Status"
              },
              {
                "field": "failed_runs",
                "type": "quantitative",
                "title": "Failed runs"
              }
            ]
          }
        },
        {
          "mark": {
            "type": "text",
            "fontSize": 24,
            "fontWeight": "bold",
            "aria": true
          },
          "encoding": {
            "text": {
              "field": "status",
              "type": "nominal"
            },
            "color": {
              "field": "status_text_color",
              "type": "nominal",
              "scale": null,
              "legend": null
            },
            "description": {
              "field": "status_description",
              "type": "nominal"
            }
          }
        }
      ]
    }
  ]
}
```

1. Click **Run** and verify the **Healthy**, **Failed**, and **No data** states.
1. Configure a [context link][3] so that selecting the tile opens the relevant logs or workflow dashboard.
1. Click **Save**.

The first layer provides the **No data** fallback. The second layer covers it when `table1` contains a valid result. The `description` encoding gives the status text an ARIA description when Vega-Lite renders the visualization as SVG.

Wildcard widgets render the custom visualization on a canvas. Keep the descriptive widget title and visible status text, and use Query Value if a screen reader must announce the dynamic value.

## Extend the pattern to warning or multiple states

Add another scalar query, such as a warning-event count with the alias `warning_runs`. Update the `status` calculation so that failures take precedence over warnings:

```text
datum.failed_runs > 0 ? 'Failed' : (datum.warning_runs > 0 ? 'Warning' : 'Healthy')
```

Add a distinct color for **Warning**, and keep the word **Warning** visible. If the data source returns categorical states, map every expected category and provide an **Unknown** fallback for unexpected values.

## Validate the tile

Before sharing the dashboard:

- Test healthy, failed, warning, mixed, missing, stale, and query-error inputs.
- Confirm that status text remains understandable in grayscale and with a color-vision simulator.
- Check text and background contrast at the widget sizes used on the dashboard.
- Navigate the dashboard with a keyboard and verify the widget title and Query Value status with a screen reader.
- Change the global time frame and each template variable to confirm that the tile follows the intended scope.
- Open the context link from each actionable state and confirm that it preserves the relevant scope.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/query_value/
[2]: /dashboards/widgets/wildcard/
[3]: /dashboards/guide/context-links/
