---
title: Custom Charts
description: Create custom charts in apps using Vega-Lite specifications to visualize data from queries with various chart types and styles.
disable_toc: false
aliases:
- /service_management/app_builder/custom_charts/
- /service_management/app_builder/components/custom_charts
further_reading:
- link: "/actions/app_builder/components/"
  tag: "Documentation"
  text: "Components"
- link: "/incident_response/workflows/build/"
  tag: "Documentation"
  text: "Build Apps"
---

This page provides an example of how to use the custom chart component in your App Builder apps.

The basic workflow for creating a custom chart is as follows:

1. Create or choose a query that contains the data you want to graph.
1. Add the custom chart component and choose a chart style from the App Builder UI or the [Vega-Lite example gallery][1].
1. Replace the values in the example with your query data.

Alternatively, you can use Bits AI to get started with a custom chart:
   1. Click the **Build with AI** icon (**<i class="icon-bits-ai"></i>**).
   1. Enter a custom prompt, or try the prompt `Can you help me create a custom chart?`.

## Example setup flow

The following example shows how to create a histogram chart illustrating Datadog Logs grouped by service.

### Set up your data source

1. Click **+ New Query**.
1. Search for "search logs" and choose the Datadog **Search logs** action to create a query called `searchLogs0`.
1. Choose an existing Datadog Account Connection, or create a new one.
1. Under **Inputs**, for **Time period**, choose **Past 2 Days**.
1. Click **Run**.<br>A panel displays the outputs of your query in the bottom-left.
1. Under `logs`, expand `0`, then expand `content`. This shows the available properties for each log.


### Add the custom chart component and choose a chart style

1. Click **+ All Components** and select **Custom Chart** to add a component called `customChart0`.
1. Click **Show Chart Examples**.
1. Select **Simple Histogram** and click **Confirm**.<br>The following value populates in the Vega Specification:

   {{< code-block lang="json" disable_copy="true" collapsible="true" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "url": "https://vega.github.io/editor/data/movies.json"
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "bin": true,
            "field": "IMDB Rating"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}{{< /code-block >}}


### Replace example values with your data

Replace the auto-populated Vega Specification with the following to change the data source and the value being graphed on the x-axis:

{{< highlight json "hl_lines=4 12" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "values": searchLogs0.outputs.logs
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "field": "content.service"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}
{{< /highlight >}}

A histogram chart with your Datadog Logs data displays.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][0].

[0]: https://chat.datadoghq.com/
[1]: https://vega.github.io/vega-lite/examples/