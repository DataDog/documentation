---
title: Selecting the right colors for your graphs
---

In Datadog graphs, color is the primary method by which you can distinguish between series of data. Selecting the right color for your graph ensures that your teammates can parse data in your graphs, draw insights, and troubleshoot effectively.

{{< img src="dashboards/guide/colors/colors_top.png" alt="Under the heading 'Graph your data', the user is selecting from a list of color palettes." style="width:90%;" >}}

## Types of color palettes

### Categorical palettes

Categorical palettes are best used for data that needs to be differentiated, but does not follow a natural order—for example, availability zones.

{{< img src="dashboards/guide/colors/2_alphabet.png" alt="A palette showing letters A B C D E F G, where each letter is a different hue." style="width:40%;" >}}

#### Classic

The default Classic palette uses a set of six distinct colors optimized for readability. Colors assigned to series repeat if the number of series exceeds six. Adjacent series typically have distinct colors. However, in rare conditions, adjacent series could use the same color if intermediate series have no value for partial timeframes.

The Classic color palette has visual accessibility support.

{{< img src="dashboards/guide/colors/3_classic_palette.png" alt="An overview of what the Classic palette looks like for a donut graph and a stacked bar graph." style="width:80%;" >}}

#### Consistent/Semantic

The Consistent palette allows you to assign the same color consistently to a series of data, making it easier to correlate data across charts. The Consistent palette does not guarantee that adjacent data series do not use the same color, and it does not have accessibility support.


{{< img src="dashboards/guide/colors/4_consistent_palette.png" alt="A color palette for the Consistent/Semantic palette." style="width:70%;" >}}

{{< img src="dashboards/guide/colors/5_consistent_interface.png" alt="Consistent palette bar graphs." style="width:90%;" >}}

For a small subset of compatible tags, Datadog automatically recognizes the meaning behind each series of data. In this case, the Consistent color palette appears as a Semantic color palette, which uses color to represent meaning. For instance, the color red may represent an error. See [Compatible Semantic Tags][2] for a list of supported tags.

{{< img src="dashboards/guide/colors/6_semantic_interface.png" alt="Semantic palette bar graph." style="width:90%;" >}}

### Diverging palettes

Use a Diverging palette when you need to emphasize the difference in values within a data set. Diverging palettes are best suited to data that has a natural order and a natural midpoint. For example: the amount of change in memory utilization, from -100% to +100%, with a natural midpoint at 0%.

There are two Diverging palette options: cool (green and blue) or warm (interpolates between yellow and orange).

{{< img src="dashboards/guide/colors/7_divergent_palette.png" alt="A palette showing -3 -2 -1 0 1 2 3, with different color gradients on both ends." style="width:40%;" >}}
{{< img src="dashboards/guide/colors/8_divergent_graphs.png" alt="Diverging palette graphs." style="width:80%;" >}}

### Sequential palettes

Use a Sequential palettes when you need to emphasize that different series in your dataset have something in common. This palette works well for data that has a natural order, such as the CPU utilization (from 0% to 100%) of a group of hosts.

Color options include purple, orange, gray, red, green, and blue.

When combined with [color overrides](#color-overrides), the Sequential palettes help you to distinguish results from multiple queries in a single chart.

{{< img src="dashboards/guide/colors/9_sequential_palette.png" alt="A palette showing 1 2 3 4 5 6 7, where the colors are a gradient." style="width:r0%;" >}}
{{< img src="dashboards/guide/colors/10_sequential_graphs.png" alt="Sequential palette graphs." style="width:80%;" >}}

## Color overrides

Color overrides allow you to assign a single color of your choice to each query. This is particularly useful when distinguishing the results from multiple queries in a single chart.

{{< img src="dashboards/guide/colors/11_overrides.png" alt="The panel that allows a user to configure color overrides." style="width:80%;" >}}

**Note**: If your query aggregates by a tag (for instance, using 'sum by' or 'avg by'), you can only select a palette override. This prevents different series from using the same color, preserving readability.

{{< img src="dashboards/guide/colors/12_palette_and_color_override_comparison.png" alt="A side-by-side comparison of the color override and palette override dropdown panels." style="width:80%;" >}}

## Accessibility settings

Datadog offers accessible color modes for graphs to cater to visual needs, including color vision deficiency, low visual acuity, and contrast sensitivity. Selecting an accessible color mode renders all graphs with the Classic palette in a set of accessible colors catered to a specific vision need. You can set an accessible color mode from the [User Preferences page][1].

{{< img src="dashboards/guide/colors/visual_accessibility.png" alt="Available visual accessibility options: Default, protanopia (difficulty distinguishing greens and reds), deuteranopia (difficulty distinguishing between reds, greens, and yellows), tritanopia (difficulty distinguishing blues and greens), high contrast (increased separation between colors for lower visual acuity), low saturation (decreased contrast for visual contrast sensitivity)." style="width:90%;" >}}

[1]: https://app.datadoghq.com/personal-settings/preferences
[2]: /dashboards/guide/compatible_semantic_tags
