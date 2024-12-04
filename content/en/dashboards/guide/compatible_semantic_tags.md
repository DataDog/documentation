---
title: Compatible semantic tags
aliases:
- /dashboards/guide/semantic_colors
further_reading:
- link: "/dashboards/guide/widget_colors/#categorical-palettes"
  tag: "Documentation"
  text: "Selecting the right colors for your graphs"
---

## Overview

For compatible series of data, Datadog can map colors to meaning. When a compatible tag is detected, Datadog suggests the Semantic color palette. This automatically maps data to meaning-driven colors.

**Note**: To use the Semantic color palette, a query must be grouped with a single set of tags.

### Map compatible tags to colors based on their meaning

For example, an error status code is mapped to red, and success to green.

{{< img src="/dashboards/guide/compatible_semantic_tags/semantic_option.png" alt="Semantic color option in the graph editor" style="width:100%;" >}}

### Ensure consistent coloring across charts

Charts with a semantic palette use the same, stable color for each tag. This allows you to easily trace a given tag across different graphs.

### Grouping behavior

Queries grouped with a single set of tags are supported. If multiple groupers are used with the semantic palette, coloring is consistent, but not meaning-driven.

{{< img src="/dashboards/guide/compatible_semantic_tags/multiple_tags.png" alt="Example of multiple tag graph using semantic palette" style="width:100%;" >}}

For example, consider a query that uses both the `Status` and `Service` tags. Even if the semantic palette is selected, the colors in the chart no longer correspond to a specific meaning (as in, red no longer necessarily indicates "bad"). However, each status/service combination retains consistent coloring for all charts.

## Supported tag keys

{{% semantic-color %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}