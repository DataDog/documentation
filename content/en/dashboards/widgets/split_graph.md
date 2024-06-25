---
title: Split Graph Widget
widget_type: split_group
further_reading:
- link: "/dashboards/guide/graphing_json/"
  tag: "Guide"
  text: "Build dashboards using JSON"
---

<div class="alert alert-info">Split graph widgets are not supported on screenboards and <a href="https://docs.datadoghq.com/dashboards/sharing/public_dashboards">public dashboards.</a></div>

## Overview

A split graph allows you to break down a query across multiple tag values to identify outliers and patterns. Use this feature to investigate metrics performance across multiple facets, compare events across multiple tags, or create dynamic visualizations. 

## Setup

### Create a split graph widget

Find the split graph widget in the widget tray, under the group section, and drag it on your dashboard to create a split graph from scratch. This allows you to define both the query and the split dimensions at the same time. For more information on configuration options, see the [Configuration](#configuration) section.

### Create a split graph from an existing widget

You can also create a split graph by taking an existing widget and splitting it on a tag value using the **Split Graph** tab. To open the **Split Graph** tab:
- Add a new widget to your dashboard and click the **Split Graph** tab at the top of the query editor.
- Open a widget in full screen mode by selecting either the edit or expand icons from the widget control options, then click on the **Split Graph** tab.
- Open the context menu of a widget on your dashboard and select **Split Graph**.

From the **Split Graph** tab, you can configure how your graph is split, set the limit on the number of graphs, and configure the order.  
1. Make configuration changes to the split by editing the split dimension, number of graphs displayed, or editing display options. Fore more information on the configuration options, see the [Configuration](#configuration) section.
2. Click **Save to Dashboard** to create a new split graph widget at the bottom of your dashboard. Your original widget remains unchanged on your dashboard. 

### Create a split graph from elsewhere in Datadog

Whenever a split across multiple values is displayed in the app, you can export it as a widget to a dashboard.
1. Click **Export to Dashboard**.
1. An export modal opens where you can either search for an existing dashboard to export to or create a new dashboard containing this widget.

## Configuration

If you create a split graph from scratch or edit an existing split graph on your dashboard, you have the option to configure the graph as well as the split. 

The split graph editor is composed of two separate sections: [**Edit Graph**](#edit-graph) and [**Split Graph**](#edit-split). To add a widget title, update the text input at the top of the editor.

**Note**: If you create a split graph from a widget, you only have the option to configure the split in the **Split Graph** tab. You can always click on the **Edit** tab to edit the query.

{{< img src="dashboards/widgets/split_graph/split_graph_tab.png" alt="Split graph tab displays split graph configuration options" style="width:100%;" >}}

### Edit graph

Configure your graph query before splitting. Choose any visualization type that supports splitting and make changes to how the graphs are displayed. You can also create your query from scratch, just like in the standard query editor experience. 

For more information on the individual configuration for these visualizations, see the respective documentation for supported widgets on the [Widgets][1] page.

Your changes are immediately reflected in the split graphs at the bottom of the split graph editor modal.  

{{< img src="dashboards/widgets/split_graph/split_graph_editor.png" alt="Split graph editor displays graph query configuration and split graph configuration options" style="width:100%;" >}}

### Edit split

There are several inputs that allow you to configure how to split the graph as well as split-specific display options.

| Configuration input | Description    | 
| ---  | ----------- | 
| One graph per | This dropdown defines the dimension to split your original graph on. |
| Limit to | Option to specify the number of graphs to display and which values should be selected. By default, the split graph widget dynamically selects values with highest average values. |
| Sort by | Choose a metric or an attribute/facet to sort your graphs by. Selecting **custom** lets you manually select tags to display. |
| Show Controls | Toggle to display a sidebar with all available tag values. Manually select tag values to change the split from dynamic to static and show only the values you have selected. To go back to a dynamic behavior, clear the selection or click the **Custom** button and select **Top** or **Bottom** to re-enable sorting.|
| Graph Setting | Display options that are specific to split graphs</br>`Graph Size`: Choose between 4 different sizes for the individual graphs within the split graph widget.</br>`Uniform Y-Axes`: Select whether the graphs in the widget show a consistent y-axis or if they independently adjust for maximum readability.|

## API

This widget can be used with the [Dashboards API][2]. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
