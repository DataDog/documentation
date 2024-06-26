---
title: Customize your visualizations with unit override
disable_toc: false
further_reading:
- link: "metrics/units/"
  tag: "Documentation"
  text: "Metric Units"
- link: "logs/explorer/facets/#units"
  tag: "Documentation"
  text: "Event units"
- link: "dashboards/widgets/"
  tag: "Documentation"
  text: "List of Widgets"
algolia:
  tags: ["unit override", "custom units"]  
---

## Overview

The unit override feature in visualizations allows you to customize how your data is labeled. This guide covers the configuration options for unit override and how these options help you analyze your graphs.

**Note**: Many of the examples in this guide use the [Table widget][1], however, unit override is not exclusive to this widget.

{{< whatsnext desc="To set a unit at the org level, see the following documentation: ">}}
    {{< nextlink href="/metrics/units">}} Set Metrics Units{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} Set units for Event-based queries{{< /nextlink >}}
{{< /whatsnext >}}

## Configuration

In your Notebooks and Dashboard widgets, find the graph editor of the cell or the widget. For Notebooks, click **More Options** and for Dashboards, find the **Graph your data** section.

{{< img src="dashboards/guide/unit_override/unit_override_config.png" alt="Unit override option in the graph your data section for a Change widget" style="width:100%;" >}}

## How unit and scale attribution works

When a unit is detected, Datadog automatically chooses the most readable unit scale depending on the magnitude of your data. For example, if the source data is nanoseconds, the widget could display readable values in minutes and seconds instead of millions of nanoseconds.

{{< img src="dashboards/guide/unit_override/unit_override_with_autoscale.png" alt="Table widget showing values scaled to minutes and seconds, alongside unit override configuration with Autoscale unit enabled" style="width:100%;" >}}

With unit override, you can choose a single fixed scale to compare values. In the example below, all values are configured to scale to `minutes`. This is to directly compare values in the same scale. 

{{< img src="dashboards/guide/unit_override/unit_override_without_autoscale.png" alt="Table widget showing values all scaled to minute, alongside unit override configuration without Autoscale unit enabled" style="width:100%;" >}}

## Assign custom units

Assign custom units to a widget to add context to unit-less metrics (like counts). 

{{< img src="dashboards/guide/unit_override/custom_unit_tests.png" alt="Unit override configuration highlighting the Unit dropdown menu to assign custom units" style="width:100%;" >}}

Define completely custom units that are not included in the provided list of units. Instead of a generic count of events, you can specify that you are visualizing 10,000 tests, or 100 sessions. This gives you immediate context for what data you are analyzing.

**Note**: Autoscaling is not available for custom units as the unit family is not recognized.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/dashboards/widgets/table/