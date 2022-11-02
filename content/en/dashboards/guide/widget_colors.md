---
title: Selecting the right colors for your graphs
kind: guide
---

In Datadog graphs, color is the primary method by which you can distinguish between series of data. Selecting the right color for your graph ensures that your teammates can parse data in your graphs, draw insights, and troubleshoot effectively. 

<!-- <img width="500" alt="image" src="https://user-images.githubusercontent.com/19559239/194149975-b0ad4fb9-5521-42a3-955d-eea0c07a0fbf.png"> -->
{{< img src="dashboards/guide/colors/colors_top.png" alt="TK" style="width:80%;" >}}

## Types of color palettes

### Categorical 

Categorical palettes are best used for data that needs to be differentiated, but does not follow a natural order—for example, availability zones.

<!-- <img width="300" alt="image" src="https://user-images.githubusercontent.com/19559239/194394992-87aefa6e-5774-45a5-8632-b9751d6d7924.png"> -->
{{< img src="dashboards/guide/colors/2_alphabet.png" alt="TK" style="width:40%;" >}}

#### Classic

The default Classic palette uses a set of six distinct colors optimized for readability. Colors assigned to series repeat if the number of series exceeds six. Adjacent series have distinct colors. 

The Classic color palette has visual accessibility support.

<!-- <img width="500" alt="image" src="https://user-images.githubusercontent.com/19559239/194170680-fc860aef-e916-47ac-8872-2228caad3c11.png"> -->
{{< img src="dashboards/guide/colors/3_classic_palette.png" alt="TK" style="width:80%;" >}}

#### Consistent/Semantic

The Consistent palette allows you to assign the same color consistently to a series of data, making it easier to correlate data across charts. Unlike the Classic palette, the Consistent palette does not guarantee that adjacent data series use the same color, and does not have accessibility support.

<!-- <img width="500" alt="image" src="https://user-images.githubusercontent.com/19559239/194396077-0e2858b5-57dd-4710-9c0a-91e0d3c4d910.png"> -->
{{< img src="dashboards/guide/colors/4_consistent_palette.png" alt="TK" style="width:70%;" >}}
<!-- <img width="900" alt="image" src="https://user-images.githubusercontent.com/19559239/194404128-d46d53dd-8072-4922-a958-35bbad77ed10.png"> -->
{{< img src="dashboards/guide/colors/5_consistent_interface.png" alt="TK" style="width:80%;" >}}

For a small subset of compatible tags, Datadog automatically recognizes the meaning behind each series of data. In this case, the Consistent color palette appears as a Semantic color palette, which uses color to represent meaning. For instance, the color red may represent an error.

<!-- <img width="600" alt="image" src="https://user-images.githubusercontent.com/19559239/194404072-253cf0cd-fc6a-4080-ac8c-f2e931e7680c.png"> -->
{{< img src="dashboards/guide/colors/6_semantic_interface.png" alt="TK" style="width:80%;" >}}

### Diverging 

Use a Diverging palette when you need to emphasize the difference in values within a data set. Diverging palettes are best suited to data that has a natural order and a natural midpoint. For example: the amount of change in memory utilization, from -100% to +100%, with a natural midpoint at 0%. 

There are two Diverging palette options: cool (green and blue) or warm (interpolates between yellow and orange).

<!-- <img width="300" alt="image" src="https://user-images.githubusercontent.com/19559239/194396296-2024a00a-3091-4439-8ff9-175ba134a5f5.png"> -->
<!-- <img width="900" alt="image" src="https://user-images.githubusercontent.com/19559239/194403795-b6835f46-a12e-4f80-9d04-c3f7d577c82c.png"> -->

{{< img src="dashboards/guide/colors/7_divergent_palette.png" alt="TK" style="width:80%;" >}}
{{< img src="dashboards/guide/colors/8_divergent_graphs.png" alt="TK" style="width:80%;" >}}

### Sequential Palettes

Use a Sequential palettes when you need to emphasize that different series in your dataset have something in common. This palette works well for data that has a natural order, such as the CPU utilization (from 0% to 100%) of a group of hosts.

Color options include purple, orange, gray, red, green, and blue.

When combined with [color overrides](#color-overrides), the Sequential palettes help you to distinguish results from multiple queries in a single chart.

<!-- <img width="300" alt="image" src="https://user-images.githubusercontent.com/19559239/194396351-71af5084-a78b-4b39-b23f-79d4a26d495a.png"> -->
<!-- <img width="900" alt="image" src="https://user-images.githubusercontent.com/19559239/194399372-2ba161d8-7965-485a-aea0-e021641e974a.png"> -->

{{< img src="dashboards/guide/colors/9_sequential_palette.png" alt="TK" style="width:30%;" >}}
{{< img src="dashboards/guide/colors/10_sequential_graphs.png" alt="TK" style="width:80%;" >}}

## Color overrides

Color overrides allow you to assign a single color of your choice to each query. This is particularly useful when distinguishing the results from multiple queries in a single chart.

<!-- <img width="900" alt="image" src="https://user-images.githubusercontent.com/19559239/194158463-475e4571-0322-489f-a9a6-d7e753f8314e.png"> -->

{{< img src="dashboards/guide/colors/11_overrides.png" alt="TK" style="width:80%;" >}}

## Accessibility settings

Datadog offers accessible color modes for graphs to cater to visual needs, including color vision deficiency, low visual acuity, and contrast sensitivity. Selecting an accessible color mode renders all graphs with the Classic palette in a set of accessible colors catered to a specific vision need. You can set an accessible color mode from the [User Preferences page][1].

{{< img src="dashboards/guide/colors/visual_accessibility.png" alt="TK" style="width:80%;" >}}

[1]: https://app.datadoghq.com/personal-settings/preferences
