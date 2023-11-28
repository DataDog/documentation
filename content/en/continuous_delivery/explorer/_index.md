---
title: Continuous Delivery Visibility Explorer
kind: documentation
description: Learn about the CD Visibility Explorer for pipeline executions.
further_reading:
  - link: "/continuous_delivery/pipelines/"
    tag: "Documentation"
    text: "Explore pipeline data to resolve build problems"
---

## Overview

The CI Visibility Explorer allows you to [search and filter](#search-and-filter), [analyze](#analyze) [visualize](#visualize) and [export](#export) pipeline executions at multiple levels using any tag.

## Search and filter

You can narrow down, broaden, or shift your focus on a subset of pipeline executions by clicking on the facets to the left or writing your own custom query in the search bar. When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch in the search bar to select and deselect the facets on the left.

- To learn how to search for tests and pipelines, see [Search and Manage][1].
- To learn how to create queries, see [Search Syntax][2].

## Analyze

Group your queried pipeline executions into higher-level entities such as fields, patterns and transactions, in order to derive or consolidate information. By using [facets][3], which you do not need to create to search for attributes, you can accomplish the following actions:

- Search and keep track of the progress of tests running in a CI/CD pipeline.
- Investigate every CI/CD job execution to identify and troubleshoot failing pipelines.
- Identify flaky tests to fix.

## Visualize

Select a visualization type to visualize the outcomes of your filters and aggregations and better understand your  pipeline executions. For example, you can view your test results in a list to organize your test data into columns, or in a timeseries graph to measure your pipeline data over time.

## Export

Export your view in the [CD Visibility Explorer][4] to reuse it later or in different contexts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_delivery/search
[2]: /continuous_delivery/explorer/search_syntax
[3]: /continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/cd/executions
